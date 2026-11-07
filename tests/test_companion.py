import datetime as dt
from pathlib import Path

import httpx
import yaml

import watcher


def make_data(tmp: Path) -> Path:
    data = tmp / "data"
    (data / "sources").mkdir(parents=True)
    (data / "settle").mkdir()
    (data / "sources" / "news.yaml").write_text(yaml.safe_dump([
        {"id": "qa-news", "country": "QA", "owner": "Ministry of Interior", "topic": "immigration",
         "url": "https://gov.example/news", "kind": "page"}]))
    (data / "settle" / "qa.yaml").write_text(yaml.safe_dump({"country": "QA", "steps": [
        {"id": "qa-rp", "category": "residence-registration", "step": "Get a residence permit",
         "source": "https://gov.example/residence", "source_owner": "MOI"}]}))
    return data


class Site:
    def __init__(self):
        self.news = ["Visa on arrival rules updated for 2026 travellers"]
        self.residence = "Bring your passport and medical certificate."

    def handler(self, request: httpx.Request) -> httpx.Response:
        path = request.url.path
        if path == "/robots.txt":
            return httpx.Response(404)
        if path == "/news":
            links = "".join(f"<li><a href='/n/{i}'>{t}</a></li>" for i, t in enumerate(self.news))
            return httpx.Response(200, html=f"<main><a href='/x'>Home</a><ul>{links}</ul></main>")
        if path == "/residence":
            return httpx.Response(200, html=f"<title>Residence permit</title><main><h1>Residence permit</h1>"
                                            f"<p>{self.residence}</p><a href='/residence/fees'>Residence permit fees and documents</a></main>")
        if path == "/residence/fees":
            return httpx.Response(200, html="<main><h2>Fees</h2><table><tr><td>Permit</td><td>QAR 500</td></tr></table></main>")
        return httpx.Response(404)


def make(tmp: Path, site: Site) -> watcher.Watcher:
    client = httpx.Client(transport=httpx.MockTransport(site.handler))
    return watcher.Watcher(make_data(tmp), tmp / "state", tmp / "out", client=client, delay=0,
                           library_dir=tmp / "library")


def test_first_run_is_baseline_then_reports_new(tmp_path):
    site = Site()
    w = make(tmp_path, site)
    first = w.run_once(dt.date(2026, 11, 7))
    assert first["entries"] == 0 and first["baselined"] == 1
    assert not list((tmp_path / "out").glob("passport-updates-*.md"))

    site.news.append("New residence permit renewal process announced")
    site.residence = "Bring your passport, medical certificate and a police clearance."
    second = w.run_once(dt.date(2026, 11, 8))
    assert second["entries"] == 2 and second["changed_pages"] == 1
    text = (tmp_path / "out" / "passport-updates-2026-11-08.md").read_text()
    assert "New residence permit renewal process announced" in text
    assert "police clearance" in text and "[page text changed]" in text
    assert "Home" not in text  # short menu links are ignored


def test_library_copies_pages_and_searches(tmp_path):
    w = make(tmp_path, Site())
    w.run_once(dt.date(2026, 11, 7))
    files = sorted(p.relative_to(tmp_path / "library").as_posix() for p in (tmp_path / "library").rglob("*.md"))
    assert len(files) == 2 and all(f.startswith("QA/residence-registration/") for f in files)
    page = next(p for p in (tmp_path / "library").rglob("*.md") if "fees" in p.name)
    head = page.read_text()
    assert "source: https://gov.example/residence/fees" in head and "| Permit | QAR 500 |" in head
    hits = w.library.search("permit fees")
    assert hits and hits[0]["country"] == "QA"


def test_seconds_until_next_day():
    now = dt.datetime(2026, 11, 7, 4, 0)
    assert watcher.seconds_until("03:00", now) == 23 * 3600
