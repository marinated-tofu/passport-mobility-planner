# Passport mobility planner

A Skill for the UGREEN AI NAS (Uliya). It reads the passports, visas, residence permits and supporting documents
stored on the NAS and answers, privately:

- what each person holds, with gaps and consistency checks (dossier);
- how strong each passport is, plus what their visas and permits add (passport power);
- what those documents unlock right now (benefits);
- which visa or permit to get next for the most new countries per dollar and per week of waiting (next document);
- the cheapest, fastest document path to reach chosen countries, with a timeline (plan);
- whether stored bank statements meet a visa's proof-of-funds rule (proof of funds);
- how to settle in a country: residence, ID, tax number, bank, insurance, housing, customs (settle in);
- what expires soon, what official sources announced, and the exact official wording (expiry, updates, library).

No document, bank or identity data leaves the NAS. The Skill only delegates to the NAS's own agents.

## Layout

| Path | What |
| --- | --- |
| `data/` | Source of truth: benefit rules, options (visas, permits, investment routes), settle-in steps, news sources. Official sources only, each with a checked date. See `data/SCHEMA.md`. |
| `skill-src/` | Hand-written router `SKILL.md.tmpl` and workflow references. |
| `build/build.py` | Validates the data, renders references, runs the UGREEN kit checker, zips the package. |
| `skill/passport-mobility-planner/` | The generated package, committed so it can be reviewed. |
| `companion/` | Optional container for the NAS: nightly official-news watcher, rules library of official page copies, local full-text search page. |
| `tests/` | pytest for the build checks and the companion. |

## Build

```bash
uv run build/build.py            # validate, render, kit checker, dist/passport-mobility-planner.zip
uv run build/build.py --links    # also confirm every source address loads
uv run pytest
```

## Companion on the NAS

```bash
UPDATES_DIR=/path/to/updates LIBRARY_DIR=/path/to/library docker compose -f companion/compose.yml up -d --build
```

It only fetches the public official pages the data cites (respecting robots.txt, 2 seconds between requests).
Optional summaries use a local model through any OpenAI-compatible endpoint such as Ollama on the NAS.
