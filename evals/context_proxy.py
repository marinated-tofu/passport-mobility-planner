"""A context manager for small models: a proxy between Claude Code and a llama-server.

    uv run evals/context_proxy.py --upstream http://127.0.0.1:18080 --budget 28000 --port 18081

Claude Code keeps every tool result in the conversation. On a 4B model with a 32K window, a trip that reads
a few large country files runs out of room and the request fails. This proxy counts the prompt of each
/v1/messages request and, when it is over the budget, replaces old tool results with a one-line stub until it
fits. It never touches:

- the newest tool results (KEEP_LAST of them), which the model is working on;
- results of Read calls on files that hold the instructions (SKILL.md, workflows/*.md), since the model
  still needs the steps and the reply template.

Trimming starts with the oldest result. Each trim is logged, so a run can report what the model lost.
The eval runner starts one proxy per scenario with --context-budget; this file also runs on its own.

Whether the NAS runtime manages context like this is unknown, so report runs with and without it.
"""

from __future__ import annotations

import argparse
import copy
import json
import re
import threading
import urllib.error
import urllib.request
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer

KEEP_LAST = 2
PROTECTED = re.compile(r"(^|/)(SKILL\.md|workflows/[^/]+\.md)$")
HOP = {"connection", "keep-alive", "transfer-encoding", "content-length", "host", "accept-encoding"}


def blocks(content) -> list:
    return content if isinstance(content, list) else []


def text_of(content) -> str:
    if isinstance(content, str):
        return content
    out = []
    for b in blocks(content):
        if b.get("type") == "text":
            out.append(b.get("text", ""))
        elif b.get("type") == "tool_use":
            out.append(json.dumps(b.get("input", {})))
        elif b.get("type") == "tool_result":
            out.append(text_of(b.get("content", "")))
    return "\n".join(out)


def prompt_text(body: dict) -> str:
    system = body.get("system", "")
    parts = [text_of(system) if isinstance(system, list) else str(system), json.dumps(body.get("tools", []))]
    parts += [text_of(m.get("content", "")) for m in body.get("messages", [])]
    return "\n".join(parts)


def trim(body: dict, budget: int, count) -> tuple[dict, list[dict]]:
    """Return a copy of the request with old tool results stubbed until count(prompt) <= budget."""
    tokens = count(prompt_text(body))
    if tokens <= budget:
        return body, []
    body = copy.deepcopy(body)
    calls = {b["id"]: b for m in body.get("messages", []) if m.get("role") == "assistant"
             for b in blocks(m.get("content")) if b.get("type") == "tool_use"}
    results = [b for m in body.get("messages", []) if m.get("role") == "user"
               for b in blocks(m.get("content")) if b.get("type") == "tool_result"]
    trims = []
    for b in results[:-KEEP_LAST] if KEEP_LAST else results:
        if tokens <= budget:
            break
        call = calls.get(b.get("tool_use_id"), {})
        path = str(call.get("input", {}).get("file_path", ""))
        if call.get("name") == "Read" and PROTECTED.search(path):
            continue
        old = text_of(b.get("content", ""))
        if len(old) < 400:
            continue
        what = f"Read {path}" if call.get("name") == "Read" else f"{call.get('name', 'tool')} call"
        b["content"] = (f"[Removed to fit the context window: the output of {what}, {len(old):,} characters. "
                        "Use what you already wrote down from it; read it again only if you must.]")
        before, tokens = tokens, count(prompt_text(body))
        trims.append({"what": what, "chars": len(old), "tokens_before": before, "tokens_after": tokens})
    return body, trims


def counter(upstream: str):
    def count(text: str) -> int:
        try:
            req = urllib.request.Request(f"{upstream}/tokenize", json.dumps({"content": text}).encode(),
                                         {"Content-Type": "application/json"})
            with urllib.request.urlopen(req, timeout=30) as r:
                return len(json.loads(r.read())["tokens"])
        except (urllib.error.URLError, KeyError, ValueError, TimeoutError):
            return int(len(text) / 3.5)  # no tokenizer upstream: a cautious estimate
    return count


def serve(upstream: str, budget: int, port: int = 0, log: list | None = None) -> ThreadingHTTPServer:
    """Start the proxy in a background thread; returns the server (its port is server.server_address[1])."""
    upstream = upstream.rstrip("/")
    count = counter(upstream)
    log = log if log is not None else []
    seen, lock = set(), threading.Lock()

    class Handler(BaseHTTPRequestHandler):
        def log_message(self, *a):
            pass

        def forward(self, method: str):
            data = self.rfile.read(int(self.headers.get("Content-Length") or 0)) if method == "POST" else None
            if method == "POST" and self.path.split("?")[0].endswith("/v1/messages") and data:
                body, trims = trim(json.loads(data), budget, count)
                if trims:
                    with lock:  # every later request trims the same results again; log each one once
                        log.extend(t for t in trims if (t["what"], t["chars"]) not in seen)
                        seen.update((t["what"], t["chars"]) for t in trims)
                    data = json.dumps(body).encode()
            headers = {k: v for k, v in self.headers.items() if k.lower() not in HOP}
            req = urllib.request.Request(upstream + self.path, data, headers, method=method)
            try:
                resp = urllib.request.urlopen(req, timeout=2400)
            except urllib.error.HTTPError as e:
                resp = e
            self.send_response(resp.status)
            for k, v in resp.headers.items():
                if k.lower() not in HOP:
                    self.send_header(k, v)
            self.end_headers()  # HTTP/1.0: the body ends when the connection closes, so streams pass through
            while chunk := resp.read1(65536) if hasattr(resp, "read1") else resp.read(65536):
                self.wfile.write(chunk)
                self.wfile.flush()

        def do_GET(self):
            self.forward("GET")

        def do_POST(self):
            self.forward("POST")

    server = ThreadingHTTPServer(("127.0.0.1", port), Handler)
    server.log = log
    threading.Thread(target=server.serve_forever, daemon=True).start()
    return server


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--upstream", required=True, help="llama-server base URL")
    ap.add_argument("--budget", type=int, required=True, help="most prompt tokens to send upstream")
    ap.add_argument("--port", type=int, default=18081)
    a = ap.parse_args()
    s = serve(a.upstream, a.budget, a.port)
    print(f"context proxy on http://127.0.0.1:{s.server_address[1]} -> {a.upstream}, budget {a.budget} tokens")
    seen = 0
    try:
        while True:
            threading.Event().wait(2)
            for t in s.log[seen:]:
                print(f"trimmed {t['what']} ({t['chars']:,} chars): {t['tokens_before']} -> {t['tokens_after']} tokens")
            seen = len(s.log)
    except KeyboardInterrupt:
        s.shutdown()


if __name__ == "__main__":
    main()
