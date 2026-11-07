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
uv run build/build.py            # validate, render, kit checker, dist/passport-mobility-planner-dev.zip
uv run build/build.py --release  # dist/passport-mobility-planner-<version>.zip for upload, never overwritten
uv run build/build.py --links    # also confirm every source address loads
uv run pytest
```

## Companion on the NAS

```bash
UPDATES_DIR=/path/to/updates LIBRARY_DIR=/path/to/library docker compose -f companion/compose.yml up -d --build
```

It only fetches the public official pages the data cites (respecting robots.txt, 2 seconds between requests).
Optional summaries use a local model through any OpenAI-compatible endpoint such as Ollama on the NAS.

## Evals

```bash
uv run evals/run.py                       # all scenarios; asks claude for sonnet to run and grade
uv run evals/run.py dossier injection     # chosen scenarios
uv run evals/run.py --model opus --jobs 3
```

Each scenario runs the built Skill with `claude -p` in a scratch folder. It has two tools: Read, and a `delegate` command that `evals/mock_delegate.py` answers on behalf of the NAS agents, using the invented household in `evals/household.yaml`. The mock agents see only the instruction text, as on the NAS, so an instruction that leaves out the folder or the file paths gets a `waiting_user` reply. Hard checks look for unmasked document numbers, unknown agents, malformed or risky instructions, and pending saves reported as done. A grader model scores each scenario's rubric. Reports go to `evals/results/<run>/`.

Scenarios cover every route, nine end-to-end trips for strong, medium and weak passports (see `evals/processes.md`), plus a prompt injection hidden in a scanned note, a failing agent, saves waiting for approval, an unsupported request and a missing folder.

Which model actually answers depends on how `claude` is set up on the machine. On the development Mac, `~/.claude/settings.json` points `claude` at a local router (Magpie, `127.0.0.1:3425`) that sent every `sonnet` request from these runs to GPT-6.1-Sol through Codex. So every run listed below was answered and graded by GPT-6.1-Sol, not Sonnet, whatever its summary says; the reported costs are not real API costs. Each summary now records the endpoint it ran against.

Latest full run, on version 0.3.1 (`evals/results/2026-11-07-1817`): rubric 53/53 and hard checks 100/101. The one failed check was a harness bug: the claim check read "No report was saved" as a claim, and the mock treated a search that said "do not save" as a save request. Both are fixed, and the two affected scenarios pass in `2026-11-07-1824`. The first run, `2026-11-07-1753` on 0.3.0, scored 41/53.
