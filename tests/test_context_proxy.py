import importlib.util
import json
import threading
import urllib.request
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

spec = importlib.util.spec_from_file_location("context_proxy", Path(__file__).parent.parent / "evals" / "context_proxy.py")
cp = importlib.util.module_from_spec(spec)
spec.loader.exec_module(cp)


def chars(text):  # stand-in tokenizer: one token per character
    return len(text)


def conversation():
    msgs = [{"role": "user", "content": "plan my trip"}]
    reads = ["SKILL.md", "references/workflows/plan.md", "references/countries/gb.md",
             "references/countries/us.md", "references/countries/jp.md", "references/countries/mx.md"]
    for i, path in enumerate(reads):
        msgs.append({"role": "assistant", "content": [{"type": "tool_use", "id": f"t{i}", "name": "Read",
                                                       "input": {"file_path": f"/tmp/x/skill/{path}"}}]})
        msgs.append({"role": "user", "content": [{"type": "tool_result", "tool_use_id": f"t{i}",
                                                  "content": [{"type": "text", "text": path[0] * 5000}]}]})
    return {"model": "m", "system": "s", "messages": msgs}


def test_under_budget_is_untouched():
    body = conversation()
    out, trims = cp.trim(body, 10**6, chars)
    assert out is body and trims == []


def test_trims_oldest_unprotected_results_first_and_keeps_newest():
    body = conversation()
    out, trims = cp.trim(body, 21000, chars)
    assert [t["what"].rsplit("/", 1)[-1] for t in trims] == ["gb.md", "us.md"]
    assert cp.prompt_text(out).__len__() <= 21000
    results = {b["tool_use_id"]: b["content"] for m in out["messages"] if m["role"] == "user"
               for b in cp.blocks(m["content"]) if b.get("type") == "tool_result"}
    assert isinstance(results["t0"], list) and isinstance(results["t1"], list)  # SKILL.md and plan.md kept
    assert results["t2"].startswith("[Removed to fit the context window")
    assert isinstance(results["t4"], list) and isinstance(results["t5"], list)  # newest two kept
    assert body["messages"][6]["content"][0]["content"][0]["text"].startswith("r")  # original not modified


def test_proxy_forwards_trimmed_request_and_streams_reply():
    got = {}

    class Upstream(BaseHTTPRequestHandler):
        def log_message(self, *a):
            pass

        def do_POST(self):
            data = json.loads(self.rfile.read(int(self.headers["Content-Length"])))
            if self.path == "/tokenize":
                reply = json.dumps({"tokens": [0] * len(data["content"])}).encode()
            else:
                got["body"] = data
                reply = b"event: message_stop\ndata: {}\n\n"
            self.send_response(200)
            self.send_header("Content-Length", str(len(reply)))
            self.end_headers()
            self.wfile.write(reply)

    up = ThreadingHTTPServer(("127.0.0.1", 0), Upstream)
    threading.Thread(target=up.serve_forever, daemon=True).start()
    proxy = cp.serve(f"http://127.0.0.1:{up.server_address[1]}", 21000)
    try:
        for _ in range(2):  # the second request trims the same results again but logs them once
            req = urllib.request.Request(f"http://127.0.0.1:{proxy.server_address[1]}/v1/messages",
                                         json.dumps(conversation()).encode(), {"Content-Type": "application/json"})
            with urllib.request.urlopen(req) as r:
                assert r.read() == b"event: message_stop\ndata: {}\n\n"
        assert len(cp.prompt_text(got["body"])) <= 21000
        assert len(proxy.log) == 2
    finally:
        proxy.shutdown()
        up.shutdown()


def test_best_effort_when_protected_and_newest_results_do_not_fit():
    out, trims = cp.trim(conversation(), 1000, chars)
    assert len(trims) == 2 and len(cp.prompt_text(out)) > 1000  # sends what it can; the server reports any overflow
