import importlib.util
from pathlib import Path

spec = importlib.util.spec_from_file_location("mock_delegate", Path(__file__).parents[1] / "evals/mock_delegate.py")
mock = importlib.util.module_from_spec(spec)
spec.loader.exec_module(mock)

REC = {"document number": "A01938274", "date of birth": "1987-12-05", "date of expiry": "2030-04-22",
       "holder surname": "OKAFOR",
       "machine readable zone": ["P<NGAOKAFOR<<CHINEDU<<<<<<<<<<<<<<<<<<<<<<<<", "AO19382740NGA8712057M3004227<<<<<<<<<<<<<<04"]}


def test_masks_numbers_and_reports_zone_differences():
    out = mock.masked(REC, "the last three characters of the document number ... do not return the machine readable zone lines")
    assert out["document number"] == "ending 274"
    assert "machine readable zone" not in out
    assert "character 2: zone O, printed 0" in out["machine readable zone check"]


def test_leaves_record_alone_when_not_asked():
    assert mock.masked(REC, "extract every field") == REC


WORLD = {"overrides": {},  # no override: the NAS gateway asks for approval
         "files": [{"path": "Personal/Travel/passport-maria.pdf", "kind": "pdf", "looks_like": "passport", "modified": "2026-01-01"}]}
TRIP = "Personal/Travel/Trips/japan-2027-04"


def test_trip_folder_copy_waits_for_approval_then_completes():
    text = f"Create the folder {TRIP}, with its parent folders, if it does not exist. Copy each of these files into it: Personal/Travel/passport-maria.pdf."
    assert mock.file_agent(WORLD, text, text.lower())["status"] == "waiting_approval"
    done = mock.file_agent({**WORLD, "overrides": {"pack": "completed"}}, text, text.lower())
    assert done["status"] == "completed" and done["result"]["copied"] == [f"{TRIP}/passport-maria.pdf"]


def test_calendar_and_drafts_need_the_trip_folder():
    cal = "Create a new file named trip-deadlines.ics in iCalendar format"
    assert mock.file_agent(WORLD, cal, cal.lower())["status"] == "waiting_user"
    draft = f"draft each of these: cover letter, itinerary. Save each draft as a new file in the folder {TRIP}"
    out = mock.document_agent({**WORLD, "overrides": {"pack": "completed"}}, draft, draft.lower())
    assert out["result"]["saved"] == [f"{TRIP}/draft-cover-letter.md", f"{TRIP}/draft-itinerary.md"]


def test_research_request_is_answered_on_the_second_read(tmp_path, monkeypatch):
    import json
    log = tmp_path / "calls.jsonl"
    monkeypatch.setenv("EVAL_LOG", str(log))
    world = {**WORLD, "documents_folder": "Personal/Travel",
             "research": {"entry:JP": "Visa exemption: 90 days (checked 2026-11-07)", "entry:SCHENGEN": "Schengen rules"}}

    def call(target, text):
        fn = mock.file_agent if target == "file-agent" else mock.document_agent
        out = fn(world, text, text.lower())
        with log.open("a") as f:
            f.write(json.dumps({"target": target, "instruction": text, "status": out["status"]}) + "\n")
        return out

    read = "Return the full text of the file Personal/Travel/Requests/entry-jp-fr-ng-2026-11-12.answer.md exactly as written."
    assert "does not exist" in call("document-agent", read)["message"]
    write = ("Create the folder Personal/Travel/Requests, with its parent folders, if it does not exist, and create in it a "
             "new text file named entry-jp-fr-ng-2026-11-12.request.md containing exactly this one line: question: visit visa "
             "· topic: entry · countries: JP, FR, QQ · nationality: NG. Do not overwrite an existing file.")
    assert call("file-agent", write)["status"] == "completed"
    assert "does not exist" in call("document-agent", read)["message"]  # the companion is still fetching
    text = call("document-agent", read)["result"]["text"]
    assert "## JP" in text and "90 days" in text and "Schengen rules" in text
    assert "## QQ" in text and "Not covered" in text


def test_trip_queue_waits_for_approval():
    text = f"Create a new text file named trip-queue.md in the folder {TRIP}: a1 · apply · 2027-01-10 · Visa · https://x.example · one NEXT m1 · contact · 2026-11-20 · Letter · none · to: (to fill), draft: employer"
    out = mock.file_agent(WORLD, text, text.lower())
    assert out["status"] == "waiting_approval" and "2 items" in out["message"]
