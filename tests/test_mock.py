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
