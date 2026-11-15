"""Build the UGREEN Skill package from data/ and skill-src/.

    uv run build/build.py            # validate, render, run the kit checker, zip
    uv run build/build.py --links    # also confirm every source address still loads
    uv run build/build.py --release  # versioned zip for upload; refuses to overwrite a different release

Output: skill/passport-mobility-planner/ (committed, so reviewers see the real package)
        dist/passport-mobility-planner.zip (the file to upload)
"""

from __future__ import annotations

import argparse
import datetime as dt
import json
import re
import shutil
import subprocess
import sys
import zipfile
from collections import defaultdict
from pathlib import Path
from urllib.parse import urlparse

import pycountry
import yaml

ROOT = Path(__file__).resolve().parent.parent
NAME = "passport-mobility-planner"
SRC = ROOT / "skill-src"
OUT = ROOT / "skill" / NAME
DIST = ROOT / "dist"
KIT_CHECKER = Path.home() / ".claude/skills/uliya-skill-kit/scripts/check-skill.mjs"

BENEFITS = {
    "visa-free entry", "visa on arrival", "e-visa", "electronic travel authorisation",
    "visa-free transit", "stopover program", "working holiday visa", "long-term residence", "other",
}
HOLDS = {"passport", "visa", "residence-permit", "ticket", "citizenship"}
OPTION_DOCS = {"visa", "electronic travel authorisation", "residence-permit", "citizenship"}
DOC_ITEMS = {
    "passport", "passport-photo", "national-id", "birth-certificate", "marriage-certificate", "degree-certificate",
    "transcript", "cv", "employment-letter", "employment-contract", "payslips", "bank-statements", "tax-return",
    "business-registration", "sponsor-letter", "invitation-letter", "police-clearance", "medical-certificate",
    "health-insurance", "travel-insurance", "flight-booking", "accommodation-proof", "residence-permit", "visa",
    "tenancy-contract", "proof-of-income", "application-form", "other",
}
SETTLE_CATEGORIES = {
    "residence-registration", "identity", "tax-number", "bank-account", "health-insurance", "driving-licence",
    "phone", "business-registration", "address-registration", "housing", "other",
}
MATRIX_CSV = ROOT / "data/baseline/passport-index-matrix-iso2.csv"
MATRIX_CHUNK = 25
CONFIDENCE = {"verified", "partial"}
STALE_DAYS = 180
MAX_FILES, MAX_FILE_BYTES, MAX_TOTAL_BYTES = 100, 1024 * 1024, 10 * 1024 * 1024
# A rule's source must be official. Reject obvious non-official hosts; the rest is reviewed by hand.
UNOFFICIAL_HOSTS = re.compile(r"wikipedia|blog|medium\.com|visaguide|visahq|ivisa|reddit|tripadvisor|sherpa", re.I)
ID_RE = re.compile(r"^[a-z0-9]+(?:-[a-z0-9]+)*$")
SPECIAL_CODES = {"SCHENGEN": "any Schengen state", "EU": "any EU state", "GCC": "any GCC state", "XK": "Kosovo"}


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


class BuildError(Exception):
    pass


def country_name(code: str) -> str:
    code = str(code).upper()
    if code in SPECIAL_CODES:
        return SPECIAL_CODES[code]
    c = pycountry.countries.get(alpha_2=code)
    if not c:
        raise BuildError(f"unknown country code {code!r}")
    return getattr(c, "common_name", None) or c.name


def as_date(value, where: str) -> dt.date:
    if isinstance(value, dt.date):
        return value
    try:
        return dt.date.fromisoformat(str(value))
    except ValueError as e:
        raise BuildError(f"{where}: checked must be YYYY-MM-DD, got {value!r}") from e


def load_rules(today: dt.date) -> tuple[list[dict], list[str]]:
    groups, warnings, seen = [], [], set()
    for path in sorted((ROOT / "data/rules").glob("*.yaml")):
        doc = load_yaml(path) or {}
        group = doc.get("group") or path.stem
        if group != path.stem:
            raise BuildError(f"{path.name}: group {group!r} must match the file name")
        rules = doc.get("rules") or []
        for r in rules:
            where = f"{path.name}:{r.get('id', '?')}"
            for field in ("id", "country", "benefit", "unlocked_by", "source", "source_owner", "checked", "confidence"):
                if not r.get(field):
                    raise BuildError(f"{where}: missing {field}")
            if not ID_RE.match(r["id"]) or r["id"] in seen:
                raise BuildError(f"{where}: id must be unique and lowercase-hyphenated")
            seen.add(r["id"])
            country_name(r["country"])
            if r["benefit"] not in BENEFITS:
                raise BuildError(f"{where}: benefit {r['benefit']!r} not one of {sorted(BENEFITS)}")
            if r["confidence"] not in CONFIDENCE:
                raise BuildError(f"{where}: confidence must be verified or partial")
            host = urlparse(str(r["source"])).hostname or ""
            if not str(r["source"]).startswith("https://") or UNOFFICIAL_HOSTS.search(host):
                raise BuildError(f"{where}: source must be an official https page, got {r['source']}")
            for item in r["unlocked_by"]:
                if item.get("holds") not in HOLDS:
                    raise BuildError(f"{where}: holds must be one of {sorted(HOLDS)}")
                for code in item.get("issued_by") or []:
                    country_name(code)
            for code in (r.get("nationality_excluded") or []) + (r.get("nationality_only") or []):
                country_name(code)
            r["checked"] = as_date(r["checked"], where)
            if (today - r["checked"]).days > STALE_DAYS:
                warnings.append(f"{where}: checked {r['checked']} is older than {STALE_DAYS} days")
        groups.append({"group": group, "title": doc.get("title") or group, "rules": rules})
    return groups, warnings


def check_source(where: str, item: dict, today: dt.date, warnings: list[str]) -> None:
    for field in ("source", "source_owner", "checked"):
        if not item.get(field):
            raise BuildError(f"{where}: missing {field}")
    host = urlparse(str(item["source"])).hostname or ""
    if not str(item["source"]).startswith("https://") or UNOFFICIAL_HOSTS.search(host):
        raise BuildError(f"{where}: source must be an official https page, got {item['source']}")
    item["checked"] = as_date(item["checked"], where)
    if (today - item["checked"]).days > STALE_DAYS:
        warnings.append(f"{where}: checked {item['checked']} is older than {STALE_DAYS} days")


def check_items(where: str, items) -> None:
    bad = [i for i in items or [] if i not in DOC_ITEMS]
    if bad:
        raise BuildError(f"{where}: unknown document items {bad}; use one of {sorted(DOC_ITEMS)}")


def load_options(today: dt.date, seen: set) -> tuple[list[dict], list[str]]:
    groups, warnings = [], []
    for path in sorted((ROOT / "data/visas").glob("*.yaml")):
        doc = load_yaml(path) or {}
        if (doc.get("group") or path.stem) != path.stem:
            raise BuildError(f"{path.name}: group must match the file name")
        for o in doc.get("options") or []:
            where = f"{path.name}:{o.get('id', '?')}"
            for field in ("id", "country", "document", "name", "confidence"):
                if not o.get(field):
                    raise BuildError(f"{where}: missing {field}")
            if not ID_RE.match(o["id"]) or o["id"] in seen:
                raise BuildError(f"{where}: id must be unique and lowercase-hyphenated")
            seen.add(o["id"])
            country_name(o["country"])
            if o["document"] not in OPTION_DOCS:
                raise BuildError(f"{where}: document must be one of {sorted(OPTION_DOCS)}")
            if o["confidence"] not in CONFIDENCE:
                raise BuildError(f"{where}: confidence must be verified or partial")
            for key in ("fee_usd", "processing_days", "minimum_investment_usd"):
                if o.get(key) is not None and not isinstance(o[key], (int, float)):
                    raise BuildError(f"{where}: {key} must be a number or null")
            check_items(where, o.get("required_documents"))
            for code in (o.get("nationality_excluded") or []) + (o.get("nationality_only") or []):
                country_name(code)
            check_source(where, o, today, warnings)
        funds = doc.get("funds_reference") or []
        for f in funds:
            where = f"{path.name}:funds:{f.get('country', '?')}"
            country_name(f.get("country", "?"))
            if not f.get("amount"):
                raise BuildError(f"{where}: missing amount")
            check_source(where, f, today, warnings)
        section = doc.get("section") or "country"
        if section not in ("country", "living"):
            raise BuildError(f"{path.name}: section must be country or living")
        groups.append({"group": path.stem, "title": doc.get("title") or path.stem, "section": section,
                       "options": doc.get("options") or [], "funds": funds})
    return groups, warnings


def load_settle(today: dt.date, seen: set) -> tuple[list[dict], list[str]]:
    countries, warnings = [], []
    for path in sorted((ROOT / "data/settle").glob("*.yaml")):
        doc = load_yaml(path) or {}
        code = str(doc.get("country", "")).upper()
        if code.lower() != path.stem:
            raise BuildError(f"{path.name}: country must match the file name")
        country_name(code)
        for st in doc.get("steps") or []:
            where = f"{path.name}:{st.get('id', '?')}"
            for field in ("id", "category", "step", "confidence"):
                if not st.get(field):
                    raise BuildError(f"{where}: missing {field}")
            if not ID_RE.match(st["id"]) or st["id"] in seen:
                raise BuildError(f"{where}: id must be unique and lowercase-hyphenated")
            seen.add(st["id"])
            if st["category"] not in SETTLE_CATEGORIES:
                raise BuildError(f"{where}: category must be one of {sorted(SETTLE_CATEGORIES)}")
            if st["confidence"] not in CONFIDENCE:
                raise BuildError(f"{where}: confidence must be verified or partial")
            check_items(where, st.get("needs"))
            check_source(where, st, today, warnings)
        for c in doc.get("customs") or []:
            where = f"{path.name}:customs:{c.get('topic', '?')}"
            if not c.get("topic") or not c.get("summary"):
                raise BuildError(f"{where}: customs entries need topic and summary")
            check_source(where, c, today, warnings)
        countries.append({"code": code, "title": doc.get("title") or f"Settling in {country_name(code)}",
                          "steps": sorted(doc.get("steps") or [], key=lambda s: (s.get("order", 99), s["id"])),
                          "customs": doc.get("customs") or []})
    return countries, warnings


def load_matrix() -> tuple[list[tuple[str, dict]], str]:
    """Community passport matrix (ilyankou/passport-index-dataset, MIT). Optional screening layer."""
    if not MATRIX_CSV.exists():
        return [], ""
    import csv

    with MATRIX_CSV.open(newline="") as f:
        rows = list(csv.reader(f))
    header, out = rows[0], []
    for row in rows[1:]:
        passport, cells = row[0], dict(zip(header[1:], row[1:]))
        out.append((passport, cells))
    when = dt.date.fromtimestamp(MATRIX_CSV.stat().st_mtime).isoformat()
    meta = ROOT / "data/baseline/SOURCE.md"
    if meta.exists():
        m = re.search(r"dataset date: (\S+)", meta.read_text())
        when = m.group(1) if m else when
    return out, when


def load_sources() -> list[dict]:
    out = []
    for path in sorted((ROOT / "data/sources").glob("*.yaml")):
        for s in load_yaml(path) or []:
            for field in ("id", "country", "owner", "url", "kind"):
                if not s.get(field):
                    raise BuildError(f"{path.name}:{s.get('id', '?')}: missing {field}")
            if s["kind"] not in {"page", "rss", "atom"}:
                raise BuildError(f"{path.name}:{s['id']}: kind must be page, rss or atom")
            out.append(s)
    return out


def codes(items) -> str:
    return ", ".join(country_name(c) for c in items)


NUMBER_WORDS = {"one": 1, "two": 2, "three": 3, "four": 4, "five": 5, "six": 6, "twelve": 12}


def min_validity(condition: str) -> str | None:
    """'valid at least 1 year on the day of entry' -> 'entry date plus 1 year'."""
    m = re.search(r"(?:at least|minimum of|no less than)\s+(\d+|" + "|".join(NUMBER_WORDS) + r")\s+(year|month|day)s?",
                  condition, re.I)
    if not m:
        return None
    n = int(NUMBER_WORDS.get(m.group(1).lower(), m.group(1)))
    unit = m.group(2).lower() + ("s" if n != 1 else "")
    base = "the last day of the stay" if re.search(r"beyond|after the (planned )?stay|from departure", condition, re.I) else "the entry date"
    return f"{base} plus {n} {unit}"


def rule_checks(r: dict) -> list[str]:
    """The rule's conditions as yes/no questions, so a small model applies each one instead of skimming."""
    out = []
    if r.get("nationality_only"):
        out.append(f"Is the traveller a national of one of: {codes(r['nationality_only'])}?")
    if r.get("nationality_excluded"):
        out.append(f"Is the traveller a national of none of: {codes(r['nationality_excluded'])}?")
    for item in r["unlocked_by"]:
        doc = item["holds"].replace("-", " ")
        q = f"Does the traveller hold a {doc}"
        if item.get("issued_by"):
            q += f" issued by {codes(item['issued_by'])}"
        q += "?"
        cond = " ".join(str(item.get("condition") or "").split())
        if cond:
            q += f" It must meet: {cond}."
        need = min_validity(cond)
        if need:
            q += f" Work it out: {need} = (date). The {doc}'s expiry must be on or after that date; write both dates."
        elif doc in {"visa", "residence permit", "passport"}:
            q += f" Its expiry must be after the last day of the stay; write the expiry date."
        out.append(q)
    if r.get("age"):
        out.append(f"Does the traveller meet the age limit: {r['age']}?")
    return out


def render_rule(r: dict) -> str:
    lines = [f"### {r['benefit'].capitalize()} - {r['id']}", ""]
    if r.get("stay"):
        lines.append(f"- Stay: {r['stay']}")
    if r.get("purpose"):
        lines.append(f"- Purpose: {r['purpose']}")
    lines.append("- Applies only if every check is yes. Write each check and its answer in your reply; one no means this rule does not apply.")
    lines += [f"  {n}. {q}" for n, q in enumerate(rule_checks(r), 1)]
    if r.get("confidence") == "partial":
        lines.append("- Partial rule: if it applies, tell the traveller to confirm it on the source below.")
    if r.get("notes"):
        lines.append(f"- Notes (if the rule applies, copy every form to fill and every caveat into the reply): {' '.join(str(r['notes']).split())}")
    lines.append(f"- Source: {r['source']} ({r['source_owner']})")
    lines.append(f"- Checked: {r['checked']:%d %b %Y}, {r['confidence']}")
    return "\n".join(lines)


def option_unlocks(o: dict, rule_groups: list[dict]) -> list[str]:
    """Benefit rules elsewhere that list this option's document type and issuing country as a key."""
    hits = []
    for g in rule_groups:
        for r in g["rules"]:
            if r["country"] == o["country"]:
                continue
            for item in r["unlocked_by"]:
                issuers = [str(c).upper() for c in item.get("issued_by") or []]
                if item.get("holds") == o["document"] and str(o["country"]).upper() in issuers:
                    cond = f" ({item['condition']})" if item.get("condition") else ""
                    who = ""
                    if r.get("nationality_only"):
                        who += f" Only for nationals of {', '.join(map(str, r['nationality_only']))}."
                    if r.get("nationality_excluded"):
                        who += f" Not for nationals of {', '.join(map(str, r['nationality_excluded']))}."
                    hits.append(f"{country_name(r['country'])}: {r['benefit']}{cond}.{who} Rule {r['id']} in countries/{r['country'].lower()}.md")
                    break
    return sorted(set(hits))


def render_option(o: dict, rule_groups: list[dict]) -> str:
    lines = [f"### {o['name']} - {o['id']}", "", f"- Document: {o['document']}"]
    for key, label in (("purpose", "Purpose"), ("fee", "Fee"), ("minimum_investment", "Minimum investment"),
                       ("processing", "Waiting time"), ("validity", "Validity"), ("stay", "Stay"),
                       ("apply", "How to apply"), ("eligibility", "Eligibility"), ("proof_of_funds", "Proof of funds")):
        if o.get(key):
            lines.append(f"- {label}: {' '.join(str(o[key]).split())}")
    nums = [f"fee about USD {o['fee_usd']:,.0f}" if o.get("fee_usd") is not None else "fee unknown",
            f"{o['processing_days']} days" if o.get("processing_days") is not None else "waiting days unknown"]
    if o.get("minimum_investment_usd") is not None:
        nums.append(f"investment about USD {o['minimum_investment_usd']:,.0f}")
    lines.append(f"- For ranking: {', '.join(nums)}")
    if o.get("required_documents"):
        lines.append(f"- Required documents: {', '.join(o['required_documents'])}")
    if o.get("nationality_only"):
        lines.append(f"- Only for nationals of: {codes(o['nationality_only'])}")
    if o.get("nationality_excluded"):
        lines.append(f"- Not for nationals of: {codes(o['nationality_excluded'])}")
    unlocks = option_unlocks(o, rule_groups)
    if unlocks:
        lines.append("- Also unlocks:")
        lines += [f"  - {u}" for u in unlocks]
    if o.get("notes"):
        lines.append(f"- Notes: {' '.join(str(o['notes']).split())}")
    lines.append(f"- Source: {o['source']} ({o['source_owner']})")
    lines.append(f"- Checked: {o['checked']:%d %b %Y}, {o['confidence']}")
    return "\n".join(lines)


def render_country(code: str, rule_groups: list[dict], option_groups: list[dict]) -> str:
    """Everything about entering one country, so a trip reads only the countries on its route."""
    parts = [f"# {country_name(code)}", "",
             "Generated from the Skill's rule and option data: what documents already held unlock here, transit and stopover "
             "rules at its airports, then visas and authorisations to apply for. Each entry is a dated snapshot of an official page.", "",
             "Go through the rules in order. Rules for named nationalities come first: when one names the traveller's "
             "nationality, it decides, and a general rule after it cannot override its no.", ""]
    for g in rule_groups:
        rules = sorted((r for r in g["rules"] if r["country"] == code), key=lambda r: (not r.get("nationality_only"), r["id"]))
        if rules:
            parts += [f"## {g['title']}", ""] + [x for r in rules for x in (render_rule(r), "")]
    for g in option_groups:
        if g["section"] != "country":
            continue
        opts = sorted((o for o in g["options"] if o["country"] == code), key=lambda o: o["id"])
        if opts:
            parts += [f"## {g['title']}", ""] + [x for o in opts for x in (render_option(o, rule_groups), "")]
    return "\n".join(parts)


def option_file(o: dict, group: dict) -> str:
    return f"{'settle' if group['section'] == 'living' else 'countries'}/{o['country'].lower()}.md"


def render_benefit_index(rule_groups: list[dict]) -> str:
    """One line per rule: enough to match holdings against every rule without opening every country file."""
    parts = ["# Benefits index", "",
             "One row per rule. Every item in Unlocked by must hold. Open the country file for the rule's notes before "
             "presenting a row marked notes, and for its official source.", "",
             "| Rule id | Country | Benefit | Stay | Unlocked by, all of | Nationality limits | Checked | Notes |",
             "| --- | --- | --- | --- | --- | --- | --- | --- |"]
    for g in rule_groups:
        for r in sorted(g["rules"], key=lambda r: (country_name(r["country"]), r["id"])):
            items = []
            for item in r["unlocked_by"]:
                t = item["holds"].replace("-", " ")
                if item.get("issued_by"):
                    t += f" issued by {codes(item['issued_by'])}"
                if item.get("condition"):
                    t += f" ({' '.join(str(item['condition']).split())})"
                items.append(t)
            limits = "; ".join(x for x in (f"only {codes(r['nationality_only'])}" if r.get("nationality_only") else "",
                                           f"not {codes(r['nationality_excluded'])}" if r.get("nationality_excluded") else "",
                                           f"age {r['age']}" if r.get("age") else "") if x) or "-"
            parts.append(f"| {r['id']} | {country_name(r['country'])} | {r['benefit']} | {' '.join(str(r.get('stay') or '-').split())} "
                         f"| {'; '.join(items)} | {limits} | {r['checked']:%Y-%m-%d} {r['confidence']} | {'notes' if r.get('notes') else '-'} |")
    return "\n".join(parts + [""])


def render_option_index(option_groups: list[dict], rule_groups: list[dict]) -> str:
    """One line per option: enough to screen and rank without opening every country file."""
    parts = ["# Options index", "",
             "One row per option. Open the file in the File column for fees in local currency, required documents, proof of "
             "funds and conditions before recommending one.", "",
             "| Option id | Country | Document | Name | Fee USD | Days | Nationality limits | Also unlocks (countries) | File |",
             "| --- | --- | --- | --- | --- | --- | --- | --- | --- |"]
    for g in option_groups:
        for o in sorted(g["options"], key=lambda o: (country_name(o["country"]), o["id"])):
            fee = f"{o['fee_usd']:,.0f}" if o.get("fee_usd") is not None else "unknown"
            days = str(o["processing_days"]) if o.get("processing_days") is not None else "unknown"
            limits = "; ".join(x for x in (f"only {codes(o['nationality_only'])}" if o.get("nationality_only") else "",
                                           f"not {codes(o['nationality_excluded'])}" if o.get("nationality_excluded") else "") if x) or "-"
            unlocked = sorted({u.split(":", 1)[0] for u in option_unlocks(o, rule_groups)})
            parts.append(f"| {o['id']} | {country_name(o['country'])} | {o['document']} | {o['name']} | {fee} | {days} | {limits} "
                         f"| {', '.join(unlocked) or '-'} | {option_file(o, g)} |")
    return "\n".join(parts + [""])


def render_funds(option_groups: list[dict]) -> str:
    funds = [f for g in option_groups for f in g["funds"]]
    parts = ["# Schengen reference amounts", "",
             "Minimum means of subsistence each Schengen state publishes for short stays.", ""]
    for f in sorted(funds, key=lambda f: country_name(f["country"])):
        parts.append(f"- {country_name(f['country'])}: {' '.join(str(f['amount']).split())}. "
                     f"Source: {f['source']} ({f['source_owner']}), checked {f['checked']:%d %b %Y}")
    return "\n".join(parts + [""])


def render_settle(c: dict, option_groups: list[dict] = (), rule_groups: list[dict] = ()) -> str:
    """Living in one country: long-term residence routes, then the steps after arrival and local customs."""
    living = [(g, sorted((o for o in g["options"] if o["country"] == c["code"]), key=lambda o: o["id"]))
              for g in option_groups if g["section"] == "living"]
    living = [(g, opts) for g, opts in living if opts]
    contents = [g["title"] for g, _ in living] + (["Steps in order"] if c["steps"] else []) + (["Local customs"] if c["customs"] else [])
    parts = [f"# Living in {country_name(c['code'])}", "",
             "Generated from the Skill's data: long-term residence routes, then the steps to settle in after arrival. "
             "Each entry is a dated snapshot of an official page. Entry rules for visits are in the country file.", "",
             "## Contents", "", ", ".join(contents), ""]
    for g, opts in living:
        parts += [f"## {g['title']}", ""] + [x for o in opts for x in (render_option(o, rule_groups), "")]
    if c["steps"]:
        parts += ["## Steps in order", ""]
    for i, st in enumerate(c["steps"], 1):
        parts += [f"### {i}. {st['step']} - {st['id']}", "", f"- Category: {st['category']}"]
        for key, label in (("who", "Who"), ("deadline", "Deadline"), ("fee", "Fee"), ("how", "How"), ("notes", "Notes")):
            if st.get(key):
                parts.append(f"- {label}: {' '.join(str(st[key]).split())}")
        if st.get("needs"):
            parts.append(f"- Needs: {', '.join(st['needs'])}")
        parts += [f"- Source: {st['source']} ({st['source_owner']})",
                  f"- Checked: {st['checked']:%d %b %Y}, {st['confidence']}", ""]
    if c["customs"]:
        parts += ["## Local customs", ""]
        for cu in sorted(c["customs"], key=lambda x: x["topic"]):
            parts.append(f"- {cu['topic']}: {' '.join(str(cu['summary']).split())} "
                         f"Source: {cu['source']} ({cu['source_owner']}), checked {cu['checked']:%d %b %Y}")
        parts.append("")
    return "\n".join(parts)


MATRIX_LABELS = [("visa free", "Visa-free"), ("visa on arrival", "Visa on arrival"),
                 ("e-visa", "E-visa"), ("eta", "Electronic travel authorisation"), ("visa required", "Visa required"),
                 ("no admission", "No admission")]


def render_matrix_chunk(chunk: list[tuple[str, dict]], when: str) -> str:
    first, last = chunk[0][0], chunk[-1][0]
    parts = [f"# Passport matrix: passports {first} to {last}", "",
             f"Community dataset (passport-index-dataset by Ilya Ilyankou, MIT licence), dataset date {when}. "
             "Screening layer only: official benefit rules win, and every result says to confirm on the official page. "
             "Numbers after a code are visa-free days.", "",
             "## Contents", "", ", ".join(f"{p} {country_name(p)}" for p, _ in chunk), ""]
    for passport, cells in chunk:
        groups = defaultdict(list)
        for dest, val in sorted(cells.items()):
            v = val.strip().lower()
            if v in {"-1", ""} or dest == passport:
                continue
            if v.isdigit():
                groups["visa free"].append(f"{dest} {v}")
            elif v in dict(MATRIX_LABELS):
                groups[v].append(dest)
            else:
                groups["visa required"].append(dest)
        parts += [f"## {passport} {country_name(passport)}", ""]
        for key, label in MATRIX_LABELS:
            if groups[key]:
                parts.append(f"- {label} ({len(groups[key])}): {', '.join(groups[key])}")
        parts.append("")
    return "\n".join(parts)


SOURCE_SPLITS = [("a-c", "ABC"), ("d-i", "DEFGHI"), ("j-n", "JKLMN"), ("o-s", "OPQRS"), ("t-z", "TUVWXYZ")]


def source_file(name: str) -> str:
    """Which alphabetical file a country goes in; "any EU state" and the like go with t-z's neighbours by their first letter."""
    first = name[:1].upper()
    return next((f for f, letters in SOURCE_SPLITS if first in letters), SOURCE_SPLITS[-1][0])


def render_sources(sources: list[dict]) -> dict[str, str]:
    """official-sources.md (an index) plus one address file per letter range, so a lookup reads one small file."""
    by_country = defaultdict(list)
    for s in sources:
        by_country[country_name(s["country"])].append(s)
    files = {f: [] for f, _ in SOURCE_SPLITS}
    for name in sorted(by_country):
        part = files[source_file(name)]
        part += [f"## {name}", ""]
        for s in sorted(by_country[name], key=lambda s: s["topic"] if s.get("topic") else ""):
            topic = f" ({s['topic']})" if s.get("topic") else ""
            line = f"- {s['owner']}{topic}: {s['url']}"
            if line not in part:
                part.append(line)
        part.append("")
    out = {}
    index = ["# Official sources", "",
             "Addresses only, by country: where the companion researches rules and where the person confirms them. "
             "No rules, fees or waiting times are kept here; those are fetched live (research.md). "
             "Open only the file for the country's first letter.", ""]
    for f, letters in SOURCE_SPLITS:
        names = [n for n in sorted(by_country) if source_file(n) == f]
        index += [f"- [sources/{f}.md](sources/{f}.md): {', '.join(names)}"]
        out[f"sources/{f}.md"] = "\n".join([f"# Official sources {f.upper()}", "",
                                            "Addresses only; no rules. Index: official-sources.md.", ""] + files[f])
    out["official-sources.md"] = "\n".join(index + [""])
    return out


def directory_sources(groups, option_groups, settle) -> list[dict]:
    """The official pages the data cites, as addresses only: owner, topic and URL per country."""
    out, seen = [], set()

    def add(url, country, topic, owner):
        if url and url not in seen:
            seen.add(url)
            out.append({"url": url, "country": country, "topic": topic, "owner": owner or "official page"})

    for g in groups:
        for r in g["rules"]:
            add(r["source"], r["country"], "entry", r.get("source_owner"))
    for g in option_groups:
        for o in g["options"]:
            add(o["source"], o["country"], "visas" if g["section"] == "country" else "residence", o.get("source_owner"))
    for c in settle:
        for st in c["steps"]:
            add(st["source"], c["code"], "settle-in", st.get("source_owner"))
    return out


def expand_includes(root: Path) -> None:
    """Fill {{include:name}} in reference files from skill-src/snippets, so each route's file carries its own commands."""
    for path in root.rglob("*.md"):
        text = path.read_text()
        for name in re.findall(r"\{\{include:([a-z-]+)\}\}", text):
            snippet = SRC / "snippets" / f"{name}.md"
            if not snippet.exists():
                raise BuildError(f"{path.name}: no snippet {name}")
            text = text.replace(f"{{{{include:{name}}}}}", snippet.read_text().rstrip())
        path.write_text(text)


def build(check_links: bool, release: bool = False) -> None:
    today = dt.date.today()
    groups, warnings = load_rules(today)
    seen = {r["id"] for g in groups for r in g["rules"]}
    option_groups, w2 = load_options(today, seen)
    settle, w3 = load_settle(today, seen)
    matrix, matrix_date = load_matrix()
    warnings += w2 + w3
    sources = load_sources()

    if OUT.exists():
        shutil.rmtree(OUT)
    shutil.copytree(SRC / "references", OUT / "references")
    expand_includes(OUT / "references")
    # The package carries no country facts: rules, fees and waiting times are researched live by the companion
    # (references/research.md). data/ stays the directory of official pages and the eval mock's stand-in for the web.
    for rel, text in render_sources(sources + directory_sources(groups, option_groups, settle)).items():
        (OUT / "references" / rel).parent.mkdir(parents=True, exist_ok=True)
        (OUT / "references" / rel).write_text(text)
    skill = (SRC / "SKILL.md.tmpl").read_text()
    if "{{" in skill:
        raise BuildError("SKILL.md.tmpl has an unfilled {{...}} marker")
    (OUT / "SKILL.md").write_text(skill)
    leaked = [p.name for p in OUT.rglob("*.md") if re.search(r"\b(USD|EUR|GBP|JPY)\s?\d", p.read_text())]
    if leaked:
        raise BuildError(f"country facts (fees) in the package: {leaked}")

    files = [p for p in OUT.rglob("*") if p.is_file()]
    total = sum(p.stat().st_size for p in files)
    if len(files) > MAX_FILES or total > MAX_TOTAL_BYTES:
        raise BuildError(f"package has {len(files)} files / {total} bytes; limits are {MAX_FILES} / {MAX_TOTAL_BYTES}")
    for p in files:
        if p.stat().st_size > MAX_FILE_BYTES:
            raise BuildError(f"{p.relative_to(OUT)} is over 1 MB")

    if check_links:
        warnings += link_problems([r["source"] for g in groups for r in g["rules"]]
                                  + [o["source"] for g in option_groups for o in g["options"]]
                                  + [s["source"] for c in settle for s in c["steps"] + c["customs"]]
                                  + [s["url"] for s in sources])

    result = run_kit_checker()
    DIST.mkdir(exist_ok=True)
    version = re.search(r'^version = "([^"]+)"', (ROOT / "pyproject.toml").read_text(), re.M).group(1)
    zpath = DIST / (f"{NAME}-{version}.zip" if release else f"{NAME}-dev.zip")
    if release and zpath.exists() and not release_matches(zpath, files):
        raise BuildError(f"{zpath.name} already exists with different content; bump the version in pyproject.toml")
    with zipfile.ZipFile(zpath, "w", zipfile.ZIP_DEFLATED) as z:
        for p in sorted(files):
            z.write(p, Path(NAME) / p.relative_to(OUT))

    n_rules = sum(len(g["rules"]) for g in groups)
    n_opts = sum(len(g["options"]) for g in option_groups)
    print(f"built {OUT.relative_to(ROOT)}: {len(files)} files, {total / 1024:.0f} KB, source directory from data/ "
          f"({n_rules} rules, {n_opts} options, {len(settle)} settle-in countries, {len(matrix)} matrix passports; "
          f"none of their facts are in the package)")
    print(f"zip: {zpath.relative_to(ROOT)} ({zpath.stat().st_size / 1024:.0f} KB)")
    print(f"kit checker: {result['status']} ({result['summary']})")
    for d in result["diagnostics"]:
        print(f"  {d['severity']}: {d['code']} {d.get('file', '')}:{d.get('line', '')} {d['message']}")
    for w in warnings:
        print(f"  warning: {w}")
    if result["status"] == "not-uploadable":
        sys.exit(1)


def release_matches(zpath: Path, files: list[Path]) -> bool:
    """A versioned release is never overwritten with different content."""
    with zipfile.ZipFile(zpath) as z:
        old = {i.filename: z.read(i) for i in z.infolist()}
    new = {str(Path(NAME) / p.relative_to(OUT)): p.read_bytes() for p in files}
    return old == new


def run_kit_checker() -> dict:
    if not KIT_CHECKER.exists():
        raise BuildError(f"UGREEN kit checker not found at {KIT_CHECKER}")
    proc = subprocess.run(["node", str(KIT_CHECKER), str(OUT)], capture_output=True, text=True)
    if proc.returncode == 2:
        raise BuildError(f"kit checker failed: {proc.stderr.strip()}")
    return json.loads(proc.stdout)


def link_problems(urls: list[str]) -> list[str]:
    import httpx

    problems = []
    with httpx.Client(follow_redirects=True, timeout=20, headers={"User-Agent": "passport-benefits-tracker-build/0.1"}) as client:
        for url in sorted(set(urls)):
            try:
                status = client.get(url).status_code
            except httpx.HTTPError as e:
                problems.append(f"{url}: {type(e).__name__}")
                continue
            if status >= 400:
                problems.append(f"{url}: HTTP {status}")
    return problems


if __name__ == "__main__":
    ap = argparse.ArgumentParser()
    ap.add_argument("--links", action="store_true", help="confirm every source address loads")
    ap.add_argument("--release", action="store_true", help="write the versioned zip; never overwrites a release")
    try:
        args = ap.parse_args()
        build(args.links, args.release)
    except BuildError as e:
        sys.exit(f"build failed: {e}")
