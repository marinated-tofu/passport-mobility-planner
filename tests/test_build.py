import datetime as dt

import pytest

import build


def test_rejects_unofficial_source():
    with pytest.raises(build.BuildError):
        build.check_source("x", {"source": "https://www.visahq.com/mexico", "source_owner": "a", "checked": "2026-11-07"},
                           dt.date(2026, 11, 7), [])


def test_accepts_official_source_with_news_in_path():
    item = {"source": "https://www.gov.uk/foreign-travel-advice/qatar/entry-requirements", "source_owner": "FCDO",
            "checked": "2026-11-07"}
    build.check_source("x", item, dt.date(2026, 11, 7), [])
    assert item["checked"] == dt.date(2026, 11, 7)


def test_stale_source_warns():
    warnings = []
    build.check_source("x", {"source": "https://www.gov.uk/a", "source_owner": "a", "checked": "2025-01-01"},
                       dt.date(2026, 11, 7), warnings)
    assert warnings


def test_unknown_document_item():
    with pytest.raises(build.BuildError):
        build.check_items("x", ["passport", "birth-cert"])


def test_option_unlocks_finds_rules_keyed_by_that_visa():
    rules = [{"group": "visa-held", "rules": [
        {"id": "mx-us-visa", "country": "MX", "benefit": "visa-free entry",
         "unlocked_by": [{"holds": "visa", "issued_by": ["US", "GB"], "condition": "valid"}]},
        {"id": "us-own", "country": "US", "benefit": "other", "unlocked_by": [{"holds": "visa", "issued_by": ["US"]}]},
        {"id": "sa-res", "country": "SA", "benefit": "e-visa", "unlocked_by": [{"holds": "residence-permit", "issued_by": ["US"]}]},
    ]}]
    hits = build.option_unlocks({"country": "US", "document": "visa"}, rules)
    assert len(hits) == 1 and hits[0].startswith("Mexico: visa-free entry (valid).")


def test_matrix_chunk_groups_destinations():
    md = build.render_matrix_chunk([("PH", {"PH": "-1", "JP": "visa required", "TH": "30", "KH": "visa on arrival"})],
                                   "2025-01-01")
    assert "- Visa-free (1): TH 30" in md
    assert "- Visa on arrival (1): KH" in md
    assert "- Visa required (1): JP" in md


def test_ids_must_be_hyphenated():
    assert build.ID_RE.match("ae-golden-visa")
    assert not build.ID_RE.match("AE_golden")


def _opt(id_, country, **kw):
    return {"id": id_, "country": country, "document": "visa", "name": id_.upper(), "confidence": "verified",
            "source": "https://www.gov.uk/x", "source_owner": "a", "checked": dt.date(2026, 11, 7), **kw}


def test_country_files_and_indexes():
    rules = [{"group": "visa-held", "title": "Visa held", "rules": [
        {"id": "mx-us-visa", "country": "MX", "benefit": "visa-free entry", "unlocked_by": [{"holds": "visa", "issued_by": ["US"]}]}]}]
    groups = [{"group": "visitor-and-nomad", "title": "Visitor visas", "funds": [], "options": [
        _opt("us-b1b2", "US", fee_usd=185, processing_days=60, nationality_excluded=["CA"]), _opt("jp-visit", "JP")]},
              {"group": "residence-and-investment", "title": "Residence", "funds": [], "options": [_opt("us-eb5", "US")]}]
    for r in rules[0]["rules"]:
        r.update(source="https://www.gob.mx/x", source_owner="a", checked=dt.date(2026, 11, 7), confidence="verified")
    us = build.render_country("US", rules, groups)
    assert "us-b1b2" in us and "us-eb5" in us and "jp-visit" not in us
    assert us.index("## Visitor visas") < us.index("## Residence")
    mx = build.render_country("MX", rules, groups)
    assert "mx-us-visa" in mx and "us-b1b2" not in mx
    row = next(l for l in build.render_benefit_index(rules).splitlines() if l.startswith("| mx-us-visa "))
    assert "visa issued by United States" in row and "| Mexico |" in row
    row = next(l for l in build.render_option_index(groups, rules).splitlines() if l.startswith("| us-b1b2 "))
    assert "| 185 | 60 |" in row and "not Canada" in row and row.endswith("| Mexico |")
