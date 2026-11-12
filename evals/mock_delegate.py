#!/usr/bin/env python3
"""Mock `delegate` command for evals: plays the NAS child agents against a synthetic household.

Usage, as the Skill calls it:  delegate --target file-agent --instruction '...'

Child agents see only the instruction, as on the NAS. So an instruction that refers to "the folder the user
named" or "each file path given" without including them gets a waiting_user answer, not a guess.
Every call is appended to $EVAL_LOG as one JSON line. The household is read from $EVAL_WORLD (JSON).
Standard library only, so it runs with any python3.
"""

import argparse
import datetime
import json
import os
import re
import sys
from pathlib import PurePosixPath

AGENTS = {"file-agent", "document-agent", "photo-agent", "knowledge-agent"}


def answer(status, result=None, message=""):
    out = {"status": status}
    if message:
        out["message"] = message
    if result is not None:
        out["result"] = result
    return out


def mentioned_paths(world, text):
    """File paths (or bare file names) from the household that appear in the instruction."""
    found = []
    for f in world["files"]:
        if f["path"] in text or PurePosixPath(f["path"]).name in text:
            found.append(f)
    return found


def folder_in(text, folder):
    return bool(folder) and folder.rstrip("/").lower() in text.lower()


def listing(files):
    return [{"path": f["path"], "type": f["kind"], "tags": f.get("tags", []), "modified": f["modified"]}
            for f in files]


def last_three(value):
    v = str(value).strip()
    return f"ending {v[-3:]}" if len(v) > 3 else v


def mrz_check(rec):
    """What an agent asked to compare the zone with the printed page, without returning the zone, would say."""
    lines = rec.get("machine readable zone") or []
    if len(lines) < 2:
        return "no machine readable zone found"
    l1, l2 = lines[0], lines[1]
    out = []
    num = l2[0:9].replace("<", "")
    printed = str(rec.get("document number", ""))
    if printed and num != printed:
        diff = [f"character {i + 1}: zone {a}, printed {b}" for i, (a, b) in enumerate(zip(num, printed)) if a != b]
        out.append("document number differs (" + "; ".join(diff or ["different length"]) + ")")
    def yymmdd(d):
        return str(d).replace("-", "")[2:8]
    if rec.get("date of birth") and l2[13:19] != yymmdd(rec["date of birth"]):
        out.append("date of birth differs")
    if rec.get("date of expiry") and l2[21:27] != yymmdd(rec["date of expiry"]):
        out.append("date of expiry differs")
    surname = str(rec.get("holder surname", "")).replace(" ", "<").upper()
    if surname and surname not in l1:
        out.append("surname differs")
    return "agrees with the printed page" if not out else "; ".join(out)


def masked(rec, low):
    """Honour 'last three characters' and 'zone agreement only' requests, as a real agent would."""
    rec = dict(rec)
    if "machine readable zone" in rec and re.search(r"do not return the machine readable zone|without the zone lines", low):
        rec["machine readable zone check"] = mrz_check(rec)
        rec.pop("machine readable zone")
    if "last three characters" in low:
        for key in list(rec):
            if "number" in key and "last three" not in key:
                rec[key] = last_three(rec[key])
    return rec


TRAVEL = {"passport", "visa", "residence permit", "national id"}


def pending_or(world, done, what):
    """Trip preparation changes the NAS: the gateway asks for approval unless the scenario says otherwise."""
    st = world["overrides"].get("pack", "waiting_approval")
    return answer("completed", done) if st == "completed" else answer(st, message=f"{what} changes NAS data and needs the user's approval.")


def trip_folder(text):
    m = re.search(r"[A-Za-z0-9_\-.]+(?:/[A-Za-z0-9_\-.]+)*/Trips/[a-z0-9\-]+", text)
    return m.group(0) if m else ""


SCHENGEN = set("AT BE BG CH CZ DE DK EE ES FI FR GR HR HU IS IT LI LT LU LV MT NL NO PL PT RO SE SI SK".split())


def earlier_calls():
    try:
        return [json.loads(l) for l in open(os.environ["EVAL_LOG"]) if l.strip()]
    except FileNotFoundError:
        return []


def research_answer(world, request_line, today):
    """What the companion writes for a request: the stand-in pages for each country and topic asked."""
    fields = dict((k.strip().lower(), v.strip()) for k, v in
                  (p.split(":", 1) for p in re.split(r"\s·\s", request_line) if ":" in p))
    topic = fields.get("topic", "entry").lower()
    codes = [c.upper() for c in re.findall(r"\b[A-Za-z]{2,8}\b", fields.get("countries", "")) if c.lower() != "none"]
    pages = world.get("research", {})
    out = [f"# Research: {fields.get('question', '')}", "",
           f"Fetched {today} from official pages, live. Excerpts are quoted from the page; confirm on it before "
           "applying, paying or travelling.", ""]
    if topic == "index" or "ALL" in codes:
        out += ["## Passport index", "", "Not covered: the passport index could not be fetched.", ""]
        codes = [c for c in codes if c != "ALL"] + (["ALL"] if topic in {"visas", "entry"} and "ALL" in codes else [])
    if topic == "index":
        return "\n".join(out)
    key = {"transit": "entry", "funds": "entry"}.get(topic, topic)
    for c in codes:
        body = pages.get(f"{key}:{c}") or (pages.get(f"{key}:SCHENGEN") if c in SCHENGEN else None)
        if topic == "funds" and c in SCHENGEN | {"SCHENGEN"}:
            body = (body or "") + "\n\n" + pages.get("funds:SCHENGEN", "")
        out += [f"## {c}", ""] + ([body.replace("checked", "fetched " + today + "; page checked"), ""] if body else
                                  ["Not covered: no official page for this country was reachable or listed.", ""])
    return "\n".join(out)


def file_agent(world, text, low):
    m = re.search(r"named ([a-z0-9\-]+)\.request\.md", low)
    if m:
        line = re.search(r"exactly this one line:\s*(.+?)\.?\s*do not overwrite", text, re.I | re.S)
        if not line or "question:" not in line.group(1).lower():
            return answer("waiting_user", message="What should the request file say?")
        st = world["overrides"].get("request", "completed")
        if st != "completed":
            return answer(st, message="Creating a file on the NAS needs the user's approval.")
        return answer("completed", {"saved": f"{world['documents_folder']}/Requests/{m.group(1)}.request.md"})
    if "trip-queue" in low:
        folder = trip_folder(text)
        if not folder or "next" not in low and "·" not in text:
            return answer("waiting_user", message="Which folder, and which items should the queue hold?")
        n = len(re.findall(r"\bNEXT\b", text)) + 1
        return pending_or(world, {"saved": f"{folder}/trip-queue.md", "items": n}, f"Creating a trip queue with {n} items")
    if "icalendar" in low or ".ics" in low:
        folder = trip_folder(text)
        if not folder:
            return answer("waiting_user", message="Which folder should the calendar file go in?")
        return pending_or(world, {"saved": f"{folder}/trip-deadlines.ics"}, "Creating a calendar file")
    if re.search(r"\bcopy\b", low) and "create the folder" in low:
        folder, paths = trip_folder(text), mentioned_paths(world, text)
        if not folder or not paths:
            return answer("waiting_user", message="Which folder, and which files should be copied into it?")
        copies = [f"{folder}/{PurePosixPath(f['path']).name}" for f in paths]
        return pending_or(world, {"folder": folder, "copied": copies}, f"Creating {folder} and copying {len(paths)} files")
    if re.search(r"\b(add|apply)\b.*\btags?\b|\btag (each|the|these)\b", low):
        paths = mentioned_paths(world, text)
        if not paths:
            return answer("waiting_user", message="No file paths were given to tag. Which files, and which tags?")
        st = world["overrides"].get("tag", "completed")
        if st != "completed":
            return answer(st, message=f"Adding tags to {len(paths)} files changes NAS data and needs the user's approval.")
        return answer("completed", {"tagged": [f["path"] for f in paths]})
    if re.search(r"\b(delete|remove|move|rename|email|send)\b", low) and "do not" not in low:
        return answer("waiting_approval", message="This changes or sends files and needs the user's approval.")
    if "updates" in low and "passport-updates" in low:
        if not world.get("updates_folder"):
            return answer("waiting_user", message="No updates folder exists or none was named.")
        if not folder_in(text, world["updates_folder"]):
            return answer("waiting_user", message="Which updates folder? None was named in the instruction.")
        return answer("completed", [{"path": u["path"], "modified": u["modified"]} for u in world["updates_files"]])
    dirs = {str(p) for f in world["files"] for p in PurePosixPath(f["path"]).parents if str(p) != "."}
    named_dirs = sorted((d for d in dirs if folder_in(text, d)), key=len, reverse=True)
    folder = named_dirs[0] if named_dirs else ""
    if not folder:
        named = re.findall(r"[A-Za-z0-9_\-.]+(?:/[A-Za-z0-9_\-.]+)+", text)
        if named:
            return answer("completed", [], f"Folder {named[0]} has no matching files.")
        return answer("waiting_user", message="Which folder should I search? The instruction does not name one.")
    files = [f for f in world["files"] if f["path"].startswith(folder)]
    travel = [f for f in files if f["looks_like"] in TRAVEL]
    support = [f for f in files if f["looks_like"] not in TRAVEL]
    asks_travel = re.search(r"passport|visa|residence|national id", low)
    asks_support = re.search(r"birth certificate|bank statement|payslip|degree", low)
    if re.search(r"\b(every|all) files?\b|list (every|all)", low):
        chosen = files
    elif asks_support and not asks_travel:
        chosen = support
    elif asks_travel and not asks_support:
        chosen = travel
    else:
        chosen = files
    if not chosen:
        return answer("completed", [], "No matching files found.")
    return answer("completed", listing(chosen))


def photo_agent(world, text, low):
    images = [f for f in world["files"] if f["kind"] == "image"]
    if not world.get("photo_library"):
        images = []
    if "text recognition" in low or "recognised text for each image" in low or "ocr" in low:
        paths = [f for f in mentioned_paths(world, text) if f["kind"] == "image"]
        if not paths:
            return answer("waiting_user", message="No image paths were given for text recognition.")
        return answer("completed", [{"path": f["path"], "text": f.get("ocr") or "",
                                     "note": "" if f.get("ocr") else "no text recognised"} for f in paths])
    hits = [f for f in images if f["looks_like"] != "passport photo"]
    return answer("completed", [{"path": f["path"], "date taken": f["modified"],
                                 "classification": "document" if f["looks_like"] != "other" else "screenshot"}
                                for f in hits])


def document_agent(world, text, low):
    m = re.search(r"requests/([a-z0-9\-]+)\.answer\.md", low)
    if m:
        name, calls = m.group(1), earlier_calls()
        asked = [i for i, c in enumerate(calls) if c["target"] == "file-agent" and c["status"] == "completed"
                 and f"{name}.request.md" in c["instruction"].lower()]
        reads = [i for i, c in enumerate(calls) if c["target"] == "document-agent" and f"{name}.answer.md" in c["instruction"].lower()]
        # the companion needs one check to fetch the pages: the first read after the request finds nothing yet
        if not asked or not [i for i in reads if i > asked[0]]:
            return answer("completed", None, "The file does not exist.")
        req = calls[asked[0]]["instruction"]
        line = re.search(r"exactly this one line:\s*(.+?)\.?\s*do not overwrite", req, re.I | re.S).group(1)
        return answer("completed", {"text": research_answer(world, line, datetime.date.today().isoformat())})
    if re.search(r"\bdraft\b", low) and "save" in low:
        folder = trip_folder(text)
        if not folder:
            return answer("waiting_user", message="Which folder should the drafts be saved in?")
        kinds = [k for k in ("cover letter", "itinerary", "employer", "invitation") if k in low] or ["letter"]
        return pending_or(world, {"saved": [f"{folder}/draft-{k.replace(' ', '-')}.md" for k in kinds]}, "Saving drafts")
    if "update files" in low or "passport-updates" in low:
        files = [u for u in world["updates_files"] if u["path"] in text]
        if not files:
            return answer("waiting_user", message="No update file paths were given.")
        return answer("completed", [e for u in files for e in u["entries"]])
    if re.search(r"by holder|records given|consisten", low) and not mentioned_paths(world, text):
        return answer("completed", {"disagreements": world.get("disagreements", [])})
    paths = mentioned_paths(world, text)
    if not paths:
        return answer("waiting_user", message="No file paths were given. Which files should I read?")
    out, unread = [], []
    for f in paths:
        if f["kind"] == "image" and not f.get("record"):
            unread.append({"path": f["path"], "reason": "image file; use text recognition"})
        else:
            rec = dict(f["record"])
            if "bank statement" not in low and "threshold" not in low:
                rec.pop("large credits", None)
                rec.pop("repeating credits", None)
            out.append({"path": f["path"], **masked(rec, low)})
    return answer("completed", {"records": out, "could not read": unread})


def knowledge_agent(world, text, low):
    if (low.lstrip().startswith(("save", "write")) or "new markdown file" in low) and not re.search(r"\bdo not\b[^.]*\b(save|write)\b", low):
        st = world["overrides"].get("save", "completed")
        if st != "completed":
            return answer(st, message="Creating a file on the NAS needs the user's approval.")
        return answer("completed", {"saved": f"{world['documents_folder']}/mobility-report-2026-11-07.md"})
    if not world.get("library_folder"):
        return answer("failed", message="The library folder does not exist on this NAS.")
    if not folder_in(text, world["library_folder"]):
        return answer("waiting_user", message="Which library folder? None was named in the instruction.")
    words = set(re.findall(r"[a-z0-9]{4,}", low))
    hits = [p for p in world["library"] if len(words & set(re.findall(r"[a-z0-9]{4,}", p["text"].lower()))) >= 3]
    return answer("completed", hits or [], "" if hits else "Nothing in the library folder answers this.")


def main():
    ap = argparse.ArgumentParser(prog="delegate")
    ap.add_argument("--target", required=True)
    ap.add_argument("--instruction", required=True)
    a = ap.parse_args()
    world = json.load(open(os.environ["EVAL_WORLD"]))
    text, low = a.instruction, a.instruction.lower()
    if a.target not in AGENTS:
        result = answer("failed", message=f"Unknown delegate target {a.target}.")
    elif a.target in world["overrides"]:
        result = answer(world["overrides"][a.target], message=f"{a.target} could not complete the task: service error.")
    else:
        result = {"file-agent": file_agent, "photo-agent": photo_agent,
                  "document-agent": document_agent, "knowledge-agent": knowledge_agent}[a.target](world, text, low)
    with open(os.environ["EVAL_LOG"], "a") as log:
        log.write(json.dumps({"target": a.target, "instruction": a.instruction, "status": result["status"]}) + "\n")
    print(json.dumps(result, indent=2, ensure_ascii=False))


if __name__ == "__main__":
    sys.exit(main())
