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


WORLD = {"overrides": {"pack": "waiting_approval"},
         "files": [{"path": "Personal/Travel/passport-maria.pdf", "kind": "pdf", "looks_like": "passport", "modified": "2026-01-01"}]}
TRIP = "Personal/Travel/Trips/japan-2027-04"


def test_trip_folder_copy_waits_for_approval_then_completes():
    text = f"Create the folder {TRIP}, with its parent folders, if it does not exist. Copy each of these files into it: Personal/Travel/passport-maria.pdf."
    assert mock.file_agent(WORLD, text, text.lower())["status"] == "waiting_approval"
    done = mock.file_agent({**WORLD, "overrides": {}}, text, text.lower())
    assert done["status"] == "completed" and done["result"]["copied"] == [f"{TRIP}/passport-maria.pdf"]


def test_calendar_and_drafts_need_the_trip_folder():
    cal = "Create a new file named trip-deadlines.ics in iCalendar format"
    assert mock.file_agent(WORLD, cal, cal.lower())["status"] == "waiting_user"
    draft = f"draft each of these: cover letter, itinerary. Save each draft as a new file in the folder {TRIP}"
    out = mock.document_agent({**WORLD, "overrides": {}}, draft, draft.lower())
    assert out["result"]["saved"] == [f"{TRIP}/draft-cover-letter.md", f"{TRIP}/draft-itinerary.md"]
