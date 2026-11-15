import datetime as dt
import threading
import urllib.request
from pathlib import Path

import httpx
import pytest
import yaml

import agent

TODAY = dt.date(2026, 11, 12)
RULE_PAGE = """<html><head><title>Visit visas</title></head><body><main>
<h1>Visit visas</h1>
<p>Nationals of the listed countries need a visit visa before they travel. The fee is 120 dollars and a decision
takes about 15 working days after the appointment at the visa centre.</p>
<p>You must show bank statements for the last three months and a return flight booking with the application.</p>
<p>Our offices are closed on public holidays and the cafeteria serves lunch from noon.</p>
<a href="/visas/documents">Documents you need for a visa</a> <a href="/about/history">History of the office</a>
</main></body></html>"""
DOCS_PAGE = """<html><head><title>Documents</title></head><body><main><p>Each applicant needs a passport valid for six
months after the visa expires, two photos and an employment letter signed by the employer.</p></main></body></html>"""


def site(request: httpx.Request) -> httpx.Response:
    pages = {"/visas": RULE_PAGE, "/visas/documents": DOCS_PAGE}
    if request.url.path in pages:
        return httpx.Response(200, text=pages[request.url.path], headers={"content-type": "text/html"})
    return httpx.Response(404, text="")


def make_world(tmp: Path) -> tuple[Path, Path]:
    data = tmp / "data"
    (data / "visas").mkdir(parents=True)
    (data / "visas" / "zz.yaml").write_text(yaml.safe_dump({"options": [
        {"id": "zz-visit", "country": "ZZ", "source": "https://gov.example/visas", "source_owner": "Ministry"}]}))
    docs = tmp / "docs"
    trip = docs / "Trips" / "zz-2027-04"
    trip.mkdir(parents=True)
    (trip / "trip-plan.md").write_text(
        "# Plan\n\nVisit visa for ZZ.\n\n## Form answers\n\n"
        "- Surname: OKAFOR\n- Given names: CHINEDU EMEKA\n- Date of birth: 1990-03-14\n- Nationality: Nigerian\n"
        "- Passport number: ends 417, copy the full number from the passport\n- Home address: 12 Allen Avenue, Ikeja\n"
        "- Address of stay: Hotel Sora, 3-1 Ginza\n- Employer: Delta Logistics\n- Employer address: (to fill)\n"
        "- Occupation: Engineer\n- Phone: (the number you use abroad)\n\n## Notes\n\n- Surname check: done\n")
    (trip / "passport-photo.jpg").write_bytes(b"fake")
    (trip / "passport-scan.pdf").write_bytes(b"%PDF-1.4 fake")
    (trip / "bank-statement.pdf").write_bytes(b"%PDF-1.4 fake")
    (trip / "draft-cover-letter.md").write_text("Dear officer,\nI plan to visit from 3 to 17 April.\n")
    (trip / "trip-queue.md").write_text(
        "# Trip queue\n\n"
        "- [ ] r1 · research · 2026-11-20 · Visit visa documents · https://gov.example/visas · what to bring\n"
        "- [ ] c1 · compare · 2026-12-01 · Flights LOS to NRT · https://flights.example/search · https://flights.example/search\n"
        "- [ ] a1 · apply · 2027-01-15 · Visit visa application · https://gov.example/apply · official form\n"
        "- [ ] m1 · contact · 2026-11-25 · Employment letter request · https://mail.example · to: hr@delta.example; draft: draft-cover-letter.md\n"
        "- [x] d1 · book · 2026-11-01 · Hotel · https://hotel.example · done earlier\n")
    return data, docs


def make_agent(tmp, **kw):
    data, docs = make_world(tmp)
    web = agent.Web(httpx.Client(transport=httpx.MockTransport(site)), delay=0)
    return agent.Agent(docs, data, web=web, today=lambda: TODAY, **kw)


def test_queue_parse_and_status_change_keep_other_lines(tmp_path):
    a = make_agent(tmp_path)
    q = a.queues()[0]
    items = agent.parse_queue(q.read_text())
    assert [i.id for i in items] == ["r1", "c1", "a1", "m1", "d1"]
    assert items[3].detail.startswith("to: hr@delta.example")
    before = q.read_text().splitlines()
    agent.set_status(q, "a1", "~", "log in first")
    agent.set_status(q, "a1", "x", "done 2026-11-12")
    after = q.read_text().splitlines()
    assert [l for l in after if " a1 " not in l] == [l for l in before if " a1 " not in l]
    a1 = next(i for i in agent.parse_queue(q.read_text()) if i.id == "a1")
    assert (a1.status, a1.note) == ("x", "done 2026-11-12")


def test_an_empty_link_field_keeps_the_fields_after_it(tmp_path):
    q = tmp_path / "trip-queue.md"
    q.write_text("Trip queue\n- [~] k1 · contact · 2026-11-25 · Ask HR · · to: hr@delta.example, draft: employer\n")
    k1 = agent.parse_queue(q.read_text())[0]
    assert (k1.url, k1.detail) == ("", "to: hr@delta.example, draft: employer")
    agent.set_status(q, "k1", "x", "sent")
    assert agent.parse_queue(q.read_text())[0].detail == "to: hr@delta.example, draft: employer"


def test_form_answers_match_the_longest_label_and_skip_placeholders(tmp_path):
    a = make_agent(tmp_path)
    answers = agent.parse_answers((a.docs / "Trips/zz-2027-04/trip-plan.md").read_text())
    assert "surname check" not in answers  # the Notes section is not part of the answers
    assert agent.match_answer("Surname / Family name *", answers) == "OKAFOR"
    assert agent.match_answer("Address during your stay (hotel address)", answers) == "Hotel Sora, 3-1 Ginza"
    assert agent.match_answer("Home address", answers) == "12 Allen Avenue, Ikeja"
    assert agent.match_answer("Employer address", answers) == ""  # (to fill) is never typed into a form
    assert agent.match_answer("Passport number", answers) == ""  # only the last three are on the NAS
    assert agent.match_answer("Phone number", answers) == ""  # any note in brackets is a placeholder
    assert agent.iso_date("14 Mar 1990") == "1990-03-14"


def test_research_request_is_answered_live_with_dated_sources(tmp_path):
    a = make_agent(tmp_path)
    req = a.docs / "Requests"
    req.mkdir()
    (req / "zz-visa.request.md").write_text(
        "question: visa for a visit, fee, waiting time and documents · countries: ZZ, QQ · nationality: NG")
    assert [p.name for p in a.answer_requests()] == ["zz-visa.answer.md"]
    text = (req / "zz-visa.answer.md").read_text()
    assert "Source: https://gov.example/visas, fetched 2026-11-12" in text
    assert "Source: https://gov.example/visas/documents" in text  # followed the rule link
    assert "120 dollars" in text and "six\nmonths" not in text
    assert "cafeteria" not in text
    assert "## QQ" in text and "Not covered" in text
    assert a.answer_requests() == []  # answered once


def test_work_starts_items_and_never_books_or_sends(tmp_path):
    sent = []
    a = make_agent(tmp_path, mailer=sent.append)
    assert a.work() == 4
    trip = a.docs / "Trips/zz-2027-04"
    st = {i.id: i.status for i in agent.parse_queue((trip / "trip-queue.md").read_text())}
    assert st == {"r1": "x", "c1": "~", "a1": "~", "m1": "~", "d1": "x"}
    assert "120 dollars" in (trip / "research-r1.md").read_text()
    assert "Nothing was booked" in (trip / "compare-c1.md").read_text()
    assert sent == []
    assert a.work() == 0


def test_send_goes_only_through_the_queue_page_button(tmp_path):
    sent = []
    a = make_agent(tmp_path, mailer=sent.append)
    a.work()
    server = agent.serve(a, 0, "http://nas:6080/vnc.html")
    threading.Thread(target=server.serve_forever, daemon=True).start()
    base = f"http://127.0.0.1:{server.server_address[1]}"
    try:
        page = urllib.request.urlopen(base).read().decode()
        assert "hr@delta.example" in page and "I plan to visit" in page and ">Send<" in page
        assert sent == []
        urllib.request.urlopen(base, data=b"trip=zz-2027-04&id=m1&action=send")
        assert len(sent) == 1 and sent[0]["To"] == "hr@delta.example"
        assert "I plan to visit" in sent[0].get_content()
        q = a.docs / "Trips/zz-2027-04/trip-queue.md"
        m1 = next(i for i in agent.parse_queue(q.read_text()) if i.id == "m1")
        assert m1.status == "x" and "sent to hr@delta.example" in m1.note
        urllib.request.urlopen(base, data=b"trip=../..&id=m1&action=send")
        assert len(sent) == 1
    finally:
        server.shutdown()


def test_send_without_mail_setup_sends_nothing(tmp_path):
    a = make_agent(tmp_path)
    item = next(i for i in agent.parse_queue(a.queues()[0].read_text()) if i.id == "m1")
    with pytest.raises(RuntimeError, match="SMTP_HOST"):
        a.send(a.queues()[0].parent, item)


FORM = """<!doctype html><form id=f action="/submitted" onsubmit="window.submitted=(window.submitted||0)+1">
<label for=s>Surname / Family name</label><input id=s>
<label>Given name(s) <input name=g></label>
<label for=d>Date of birth</label><input id=d type=date>
<label for=n>Nationality</label><select id=n><option></option><option>Japanese</option><option>Nigerian</option></select>
<label for=h>Hotel address during your stay</label><input id=h>
<label for=e>Employer address</label><input id=e>
<label for=p>Passport number</label><input id=p>
<label for=pw>Password</label><input id=pw type=password>
<label><input type=checkbox id=c> I declare the information is true</label>
<label for=u>Upload passport scan</label><input id=u type=file>
<button type=submit>Submit and pay</button></form>"""


def test_fill_types_what_the_nas_knows_and_never_submits(tmp_path):
    pytest.importorskip("playwright.sync_api")
    a = make_agent(tmp_path)
    try:
        a.browser = agent.Browser(headless=True, profile=str(tmp_path / "profile"))
    except Exception as e:  # no browser binary on this machine
        pytest.skip(str(e))
    try:
        page = a.browser.ctx.new_page()
        page.set_content(FORM)
        result = a.fill(a.docs / "Trips/zz-2027-04")
        v = lambda sel: page.eval_on_selector(sel, "e => e.value")
        assert v("#s") == "OKAFOR" and v("[name=g]") == "CHINEDU EMEKA"
        assert v("#d") == "1990-03-14" and v("#n") == "Nigerian" and v("#h") == "Hotel Sora, 3-1 Ginza"
        assert v("#e") == "" and v("#p") == "" and v("#pw") == ""
        assert page.eval_on_selector("#c", "e => e.checked") is False
        assert page.eval_on_selector("#u", "e => e.files[0].name") == "passport-scan.pdf"
        assert page.evaluate("window.submitted || 0") == 0 and page.url == "about:blank"
        assert "Employer address" in result["left for you"]
    finally:
        a.browser.ctx.close()
        a.browser.pw.stop()


def test_passport_index_request_lists_where_a_passport_gets_in(tmp_path):
    csv_text = "Passport,JP,ZZ,NG,TH\nNG,visa required,e-visa,-1,visa on arrival\nJP,-1,90,visa required,30\n"

    def index_site(request):
        if request.url.path.endswith(".csv"):
            return httpx.Response(200, text=csv_text)
        return site(request)

    data, docs = make_world(tmp_path)
    web = agent.Web(httpx.Client(transport=httpx.MockTransport(index_site)), delay=0)
    a = agent.Agent(docs, data, web=web, today=lambda: TODAY, index_url="https://index.example/m.csv")
    text = a.research_request("question: where can I go without a visa · topic: index · countries: ALL · nationality: NG")
    assert "community dataset" in text and "Source: https://index.example/m.csv, fetched 2026-11-12" in text
    assert "- visa on arrival: 1: TH" in text and "- e-visa: 1: ZZ" in text and "- visa required: 1: JP" in text
    assert "Passport JP" not in text and "## ZZ" not in text  # index only, for the nationality asked
    entry = a.research_request("question: visit visa · topic: entry · countries: ZZ · nationality: NG")
    assert "## ZZ" in entry and "Passport index" not in entry


def test_skill_written_queue_without_boxes_and_address_typed_on_the_page(tmp_path):
    sent = []
    a = make_agent(tmp_path, mailer=sent.append)
    trip = a.docs / "Trips/zz-2027-04"
    (trip / "draft-employer-letter-request.md").write_text("Dear HR, please write a leave letter.\n")
    (trip / "trip-queue.md").write_text(
        "Trip queue\n- m2 · contact · 2026-11-20 · Leave letter request · none · to: (to fill), draft: employer\n"
        "- a2 · apply · 2027-01-10 · Visa form · javascript:alert(1) · traveller one\n")
    items = agent.parse_queue((trip / "trip-queue.md").read_text())
    assert [(i.id, i.status) for i in items] == [("m2", " "), ("a2", " ")]
    a.work()
    server = agent.serve(a, 0, "http://nas:6080/vnc.html")
    threading.Thread(target=server.serve_forever, daemon=True).start()
    base = f"http://127.0.0.1:{server.server_address[1]}"
    try:
        page = urllib.request.urlopen(base).read().decode()
        assert "please write a leave letter" in page and "javascript:" not in page
        urllib.request.urlopen(base, data=b"trip=zz-2027-04&id=m2&action=send&to=")
        assert sent == [] and "type the address" in urllib.request.urlopen(base).read().decode()
        urllib.request.urlopen(base, data=b"trip=zz-2027-04&id=m2&action=send&to=hr%40delta.example")
        assert sent[0]["To"] == "hr@delta.example" and "leave letter" in sent[0].get_content()
    finally:
        server.shutdown()


def test_queue_dates_keep_compare_book_apply_order():
    text = "\n".join([
        "- [ ] c1 · compare · 2026-11-29 · Flights · https://flights.example/q · round trip",
        "- [ ] b1 · book · 2027-03-20 · Flights · https://flights.example/q · after comparing",
        "- [ ] a1 · apply · 2027-03-18 · Japan visa · https://visa.example · Maria",
        "- [ ] p1 · photo · 2026-11-14 · Photo of the passport page · none · Personal/Travel",
    ])
    due = {i.id: i.due for i in agent.parse_queue(text)}
    assert due == {"b1": "2027-03-11", "c1": "2026-11-29", "a1": "2027-03-18", "p1": "2026-11-14"}
    late = agent.parse_queue(text.replace("2026-11-29", "2027-03-10"))
    assert next(i for i in late if i.id == "c1").due == "2027-03-08"


def test_queue_page_dates_titles_and_classic_view(tmp_path):
    today = dt.date(2026, 11, 15)
    assert agent.trip_title("japan-2027-04") == "Japan, April 2027"
    assert agent.trip_title("my-trip") == "my-trip" and agent.trip_title("x-2027-13") == "x-2027-13"
    assert agent.due_parts("2026-12-01", today) == ("1 Dec", "2026", "in 16 days", "")
    assert agent.due_parts("2026-11-20", today)[2:] == ("in 5 days", "soon")
    assert agent.due_parts("2026-11-12", today)[2:] == ("3 days late", "late")
    assert agent.due_parts("next week", today) == ("next week", "", "", "")
    a = make_agent(tmp_path)
    a.work()
    server = agent.serve(a, 0, "http://nas:6080/vnc.html")
    threading.Thread(target=server.serve_forever, daemon=True).start()
    base = f"http://127.0.0.1:{server.server_address[1]}"
    try:
        new = urllib.request.urlopen(base).read().decode()
        old = urllib.request.urlopen(base + "/classic").read().decode()
        assert "Your turn" in new and "<table>" in old and ">Send<" in new and ">Send<" in old
    finally:
        server.shutdown()
