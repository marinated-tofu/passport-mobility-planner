"""Rules library: keeps clean Markdown copies of official requirement pages on the NAS, plus a local search index.

Every night it reads every official page the Skill's data cites (rules, options, settle-in steps, customs), follows
a few links on the same official site whose text looks like requirements, and saves each page as Markdown in the
library folder. The NAS's own document search indexes that folder, so the Skill can search it offline. A SQLite
full-text index in the state folder powers a small search page for people on the home network.

When a page's text changes, the change is written to the daily updates file the Skill's updates route reads.
"""

from __future__ import annotations

import datetime as dt
import difflib
import hashlib
import html
import json
import logging
import re
import sqlite3
import time
from dataclasses import dataclass
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import parse_qs, urljoin, urlparse

import httpx
import yaml
from bs4 import BeautifulSoup

log = logging.getLogger("library")
FOLLOW_WORDS = re.compile(
    r"visa|permit|residen|requirement|document|eligib|fee|apply|application|entry|transit|stay|registration|"
    r"tenan|rent|customs|local laws|bank account|tax number|insurance", re.I)
SKIP_PATHS = re.compile(
    r"/(?:blog|news|press|media|events?|stories|story|subscribe|newsletter|login|signin|sign-in|register-account|"
    r"search|tag|tags|category|author|careers|jobs|contact|sitemap|privacy|cookies?|accessibility)(?:/|$|\?)|"
    r"\.(?:pdf|docx?|xlsx?|zip|jpe?g|png)$", re.I)
MAX_FOLLOW_PER_PAGE = 8
MAX_PAGE_CHARS = 200_000
MIN_PAGE_CHARS = 200  # less than this is a page built by scripts in the browser, not readable here


class _Loader(yaml.SafeLoader):
    """YAML 1.1 reads NO (Norway) and ON as booleans; only true and false are booleans here."""


_Loader.yaml_implicit_resolvers = {
    k: [(tag, rx) for tag, rx in v if tag != "tag:yaml.org,2002:bool"]
    for k, v in yaml.SafeLoader.yaml_implicit_resolvers.items()
}
_Loader.add_implicit_resolver("tag:yaml.org,2002:bool", re.compile(r"^(?:true|True|TRUE|false|False|FALSE)$"),
                              list("tTfF"))


def load_yaml(path):
    return yaml.load(path.read_text(), Loader=_Loader)


@dataclass
class Target:
    url: str
    country: str
    topic: str
    owner: str
    follow: bool = True


def slug(url: str) -> str:
    p = urlparse(url)
    base = re.sub(r"[^a-z0-9]+", "-", f"{p.hostname}{p.path}".lower()).strip("-")[:80]
    return f"{base}-{hashlib.sha1(url.encode()).hexdigest()[:6]}"


def targets_from_data(data_dir: Path) -> list[Target]:
    """Every official page the bundled data cites, with its country and topic."""
    out: dict[str, Target] = {}

    def add(url, country, topic, owner, follow=True):
        if url and str(url).startswith("https://") and url not in out:
            out[url] = Target(url, str(country).upper(), topic, owner or "", follow)

    for path in sorted((data_dir / "rules").glob("*.yaml")):
        for r in (load_yaml(path) or {}).get("rules") or []:
            add(r.get("source"), r.get("country", ""), "entry", r.get("source_owner"))
    for path in sorted((data_dir / "visas").glob("*.yaml")):
        doc = load_yaml(path) or {}
        for o in doc.get("options") or []:
            add(o.get("source"), o.get("country", ""), "visas", o.get("source_owner"))
        for f in doc.get("funds_reference") or []:
            add(f.get("source"), f.get("country", ""), "proof-of-funds", f.get("source_owner"), follow=False)
    for path in sorted((data_dir / "settle").glob("*.yaml")):
        doc = load_yaml(path) or {}
        for s in doc.get("steps") or []:
            add(s.get("source"), doc.get("country", ""), s.get("category", "settle-in"), s.get("source_owner"))
        for c in doc.get("customs") or []:
            add(c.get("source"), doc.get("country", ""), "customs", c.get("source_owner"), follow=False)
    return list(out.values())


def page_to_markdown(page_html: str) -> tuple[str, str, list[tuple[str, str]]]:
    """Return (title, markdown body, links) from the main content of an official page."""
    soup = BeautifulSoup(page_html, "html.parser")
    title = " ".join((soup.title.get_text() if soup.title else "").split())
    # Not <form>: ASP.NET sites wrap the whole page in one form. Drop only its controls.
    for tag in soup(["nav", "header", "footer", "script", "style", "aside", "noscript", "svg",
                     "input", "select", "button", "textarea", "template"]):
        tag.decompose()
    scope = next((el for el in (soup.find("main"), soup.find(attrs={"role": "main"}), soup.find("article"))
                  if el is not None and len(el.get_text(" ", strip=True)) >= MIN_PAGE_CHARS),
                 soup.body or soup)
    lines: list[str] = []
    for el in scope.find_all(["h1", "h2", "h3", "h4", "p", "li", "tr", "dt", "dd"]):
        if el.name in {"p", "li", "dt", "dd"} and el.find_parent(["li", "tr"]) is not None:
            continue  # already included in the enclosing list item or table row
        text = " ".join(el.get_text(" ").split())
        if not text:
            continue
        if el.name in {"h1", "h2", "h3", "h4"}:
            lines += ["", "#" * (int(el.name[1]) + 1) + " " + text, ""]
        elif el.name == "li":
            lines.append(f"- {text}")
        elif el.name == "tr":
            cells = [" ".join(c.get_text(" ").split()) for c in el.find_all(["th", "td"])]
            lines.append("| " + " | ".join(cells) + " |")
        else:
            lines += [text, ""]
    body = re.sub(r"\n{3,}", "\n\n", "\n".join(lines)).strip()
    if len(body) < MIN_PAGE_CHARS:  # text sits in plain divs: keep its lines as paragraphs
        text_lines = [" ".join(l.split()) for l in scope.get_text("\n").splitlines()]
        fallback = "\n\n".join(l for l in text_lines if len(l) >= 30)
        if len(fallback) > len(body):
            body = fallback
    body = body[:MAX_PAGE_CHARS]
    links = [(" ".join(a.get_text(" ").split()), a["href"]) for a in scope.find_all("a", href=True)]
    return title, body, links


class Library:
    def __init__(self, data_dir: Path, library_dir: Path, state_dir: Path, client: httpx.Client, allowed, delay: float):
        self.data_dir, self.library_dir, self.state_dir = data_dir, library_dir, state_dir
        self.client, self.allowed, self.delay = client, allowed, delay
        library_dir.mkdir(parents=True, exist_ok=True)
        self.db = sqlite3.connect(state_dir / "library.sqlite", check_same_thread=False)
        self.db.executescript(
            "CREATE TABLE IF NOT EXISTS pages(url TEXT PRIMARY KEY, path TEXT, hash TEXT, fetched TEXT, changed TEXT);"
            "CREATE VIRTUAL TABLE IF NOT EXISTS search USING fts5(url UNINDEXED, path UNINDEXED, country, topic, title, body);")

    def _save(self, t: Target, title: str, body: str, today: dt.date) -> tuple[bool, str]:
        digest = hashlib.sha256(body.encode()).hexdigest()
        row = self.db.execute("SELECT path, hash FROM pages WHERE url=?", (t.url,)).fetchone()
        rel = Path(t.country or "XX") / t.topic / f"{slug(t.url)}.md"
        path = self.library_dir / rel
        old_body = ""
        if row and row[1] == digest:
            self.db.execute("UPDATE pages SET fetched=? WHERE url=?", (today.isoformat(), t.url))
            return False, ""
        if row and path.exists():
            old_body = path.read_text().split("\n---\n", 1)[-1]
        path.parent.mkdir(parents=True, exist_ok=True)
        head = (f"---\nsource: {t.url}\nowner: {t.owner}\ncountry: {t.country}\ntopic: {t.topic}\n"
                f"title: {json.dumps(title)}\ncopied: {today.isoformat()}\n---\n")
        path.write_text(head + f"\n# {title or t.url}\n\n" + body + "\n")
        self.db.execute("INSERT OR REPLACE INTO pages VALUES(?,?,?,?,?)",
                        (t.url, str(rel), digest, today.isoformat(), today.isoformat()))
        self.db.execute("DELETE FROM search WHERE url=?", (t.url,))
        self.db.execute("INSERT INTO search VALUES(?,?,?,?,?,?)", (t.url, str(rel), t.country, t.topic, title, body))
        if not row:
            return False, ""  # first copy is the baseline, not news
        return True, change_summary(old_body, body)

    def run(self, today: dt.date) -> tuple[list[dict], list[tuple[str, str]]]:
        changes, errors, done = [], [], set()
        queue = targets_from_data(self.data_dir)
        while queue:
            t = queue.pop(0)
            if t.url in done:
                continue
            done.add(t.url)
            try:
                if not self.allowed(t.url):
                    raise RuntimeError("robots.txt does not allow this page")
                r = self.client.get(t.url)
                r.raise_for_status()
                if "html" not in r.headers.get("content-type", "html"):
                    continue
                title, body, links = page_to_markdown(r.text)
                if len(body) < MIN_PAGE_CHARS:
                    raise RuntimeError("no readable text in the page; it is probably built by scripts in a browser")
            except Exception as e:
                errors.append((t.url, (str(e) or type(e).__name__).splitlines()[0]))
                continue
            finally:
                time.sleep(self.delay)
            changed, summary = self._save(t, title, body, today)
            if changed:
                changes.append({"country": t.country, "topic": t.topic, "url": t.url, "owner": t.owner,
                                "title": title, "summary": summary})
            if t.follow:
                host, n = urlparse(t.url).hostname, 0
                for text, href in links:
                    link = urljoin(t.url, href).split("#")[0]
                    if (n < MAX_FOLLOW_PER_PAGE and urlparse(link).hostname == host and link not in done
                            and len(text) >= 12 and FOLLOW_WORDS.search(text)
                            and not SKIP_PATHS.search(urlparse(link).path)):
                        queue.append(Target(link, t.country, t.topic, t.owner, follow=False))
                        n += 1
        self.db.commit()
        return changes, errors

    def search(self, query: str, limit: int = 20) -> list[dict]:
        terms = " ".join(f'"{w}"' for w in re.findall(r"\w+", query))
        if not terms:
            return []
        rows = self.db.execute(
            "SELECT url, path, country, topic, title, snippet(search, 5, '[', ']', ' ... ', 24) "
            "FROM search WHERE search MATCH ? ORDER BY rank LIMIT ?", (terms, limit)).fetchall()
        return [dict(zip(("url", "path", "country", "topic", "title", "snippet"), r)) for r in rows]


def change_summary(old: str, new: str, max_lines: int = 6) -> str:
    added = [l for l in difflib.unified_diff(old.splitlines(), new.splitlines(), lineterm="", n=0)
             if l.startswith("+") and not l.startswith("+++") and len(l) > 20]
    removed = [l for l in difflib.unified_diff(old.splitlines(), new.splitlines(), lineterm="", n=0)
               if l.startswith("-") and not l.startswith("---") and len(l) > 20]
    head = f"Page text changed: {len(added)} lines added, {len(removed)} removed."
    sample = "; ".join(l[1:].strip()[:160] for l in added[:max_lines])
    return f"{head} New text includes: {sample}" if sample else head


def serve(library: Library, port: int) -> ThreadingHTTPServer:
    """A plain search page for the home network. Read-only; no external requests."""

    class Handler(BaseHTTPRequestHandler):
        def do_GET(self):  # noqa: N802
            q = parse_qs(urlparse(self.path).query).get("q", [""])[0]
            results = library.search(q) if q else []
            items = "".join(
                f"<li><a href='{html.escape(r['url'])}'>{html.escape(r['title'] or r['url'])}</a> "
                f"<small>{html.escape(r['country'])} / {html.escape(r['topic'])} / {html.escape(r['path'])}</small>"
                f"<p>{html.escape(r['snippet'])}</p></li>" for r in results)
            page = (f"<!doctype html><meta charset=utf-8><title>Rules library</title>"
                    f"<form><input name=q value='{html.escape(q)}' size=50 autofocus> <button>Search</button></form>"
                    f"<ol>{items}</ol>")
            self.send_response(200)
            self.send_header("Content-Type", "text/html; charset=utf-8")
            self.end_headers()
            self.wfile.write(page.encode())

        def log_message(self, *args):
            pass

    server = ThreadingHTTPServer(("0.0.0.0", port), Handler)
    return server
