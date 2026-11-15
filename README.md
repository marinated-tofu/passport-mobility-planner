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

For a trip it then does the paperwork: a trip folder with copies of the documents, the form answers, drafts of the
letters, a calendar file of the deadlines, and a trip queue of bookings, applications and emails. The trip companion
works through the queue: it compares prices, opens each application or booking page in a browser you can see, fills
in the form and attaches the copies, and shows each email with a Send button. You log in, check, pay, submit and
press Send. It never does those itself.

The Skill holds no country rules. Visa rules, fees and waiting times change often, so every route asks the companion
to read the official pages live, and answers from the dated excerpts it writes back.

No document, bank or identity data leaves the NAS; research requests carry only countries, nationalities, dates and
purpose. The Skill only delegates to the NAS's own agents.

## Layout

| Path | What |
| --- | --- |
| `data/` | Where the official pages are: the companion's list of pages to research per country, and the eval mock's stand-in for the live web (benefit rules, options, settle-in steps, news sources, each with a checked date; see `data/SCHEMA.md`). None of its rules go into the package. |
| `skill-src/` | Hand-written router `SKILL.md.tmpl` and workflow references. |
| `build/build.py` | Validates the data, writes the package (workflows and a list of official page addresses, no rules), runs the UGREEN kit checker, zips it. |
| `skill/passport-mobility-planner/` | The generated package, committed so it can be reviewed. |
| `companion/` | Containers for the NAS: the trip agent (live research, price comparison, the trip queue with form filling and the Send gate), the nightly official-news watcher, and the rules library of page copies. |
| `evals/` | Eval harness: scenarios, mock NAS agents, the context proxy for small models, results by run. |
| `tests/` | pytest for the build, the eval mock and proxy, and the companion. |

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

The trip agent is a second service:

```bash
DOCS_DIR=/path/to/documents VNC_PASSWORD=choose-one docker compose -f companion/compose.yml --profile agent up -d --build agent
```

- Research: the Skill writes `Requests/<name>.request.md` in the documents folder; the agent fetches the official
  pages for those countries and writes `<name>.answer.md` with quoted excerpts, each with its address and the date
  it was fetched. Countries missing from `data/` are searched through an optional SearXNG instance (`SEARCH_URL`).
  "Where can I go" uses the community passport index, fetched the same way and labelled as screening data.
- Trip queue: `http://<nas>:8089` lists each trip's `trip-queue.md`. Compare items list options and prices from the
  search pages. Apply and book items open the page in the browser at `http://<nas>:6080/vnc.html`; after you log in
  and reach the form, "Fill this page" types every field it can match from `trip-plan.md` and attaches the trip
  folder's copies. It skips passwords, ticks, declarations and anything you already typed, and never clicks. Contact
  items show the draft and an address box; the email goes out through your SMTP account only when you press Send.

## Evals

```bash
uv run evals/run.py                       # all scenarios; asks claude for sonnet to run and grade
uv run evals/run.py dossier injection     # chosen scenarios
uv run evals/run.py --model opus --jobs 3
```

Each scenario runs the built Skill with `claude -p` in a scratch folder. It has two tools: Read, and a `delegate` command that `evals/mock_delegate.py` answers on behalf of the NAS agents, using the invented household in `evals/household.yaml`. The mock agents see only the instruction text, as on the NAS, so an instruction that leaves out the folder or the file paths gets a `waiting_user` reply. Hard checks look for unmasked document numbers, unknown agents, malformed or risky instructions, and pending saves reported as done. A grader model scores each scenario's rubric. Reports go to `evals/results/<run>/`.

Scenarios cover every route, nine end-to-end trips for strong, medium and weak passports (see `evals/processes.md`), plus a prompt injection hidden in a scanned note, a failing agent, saves waiting for approval, an unsupported request and a missing folder.

Which model actually answers depends on how `claude` is set up on the machine. On the development Mac, `~/.claude/settings.json` points `claude` at a local router (Magpie, `127.0.0.1:3425`) that sent every `sonnet` request from these runs to GPT-6.1-Sol through Codex. So every run listed below was answered and graded by GPT-6.1-Sol, not Sonnet, whatever its summary says; the reported costs are not real API costs. Each summary now records the endpoint it ran against.

### On the small model the NAS runs

`--skill-endpoint` sends only the Skill's turns to an Anthropic-compatible server; the grader keeps the default endpoint. The test PC runs llama-server (llama.cpp b12189, Vulkan) with Qwen3.5-4B-Q4_K_M, two slots of 32K context each, Qwen's recommended sampling (temperature 0.6, top-p 0.95, top-k 20, min-p 0) and a copy of Qwen's chat template that accepts a system message after the first one (Claude Code sends one). The server listens on the PC's localhost only; the Mac reaches it through an SSH tunnel:

```bash
ssh -L 18080:127.0.0.1:8080 leoca@192.168.1.13 'powershell -NoProfile -Command -' < evals/pcserve.ps1
uv run evals/run.py --jobs 2 --skill-endpoint http://127.0.0.1:18080 trip-medium-ph-japan
```

A run that exceeds the model's context is recorded as a failed check, with the files read up to that point.

Two things keep a trip inside 32K. In the package, country files hold only what a visit needs (benefit rules, transit, short-stay visas and authorisations); long-term residence and citizenship routes sit in the living files (`settle/<cc>.md`) with the settle-in steps, so Portugal's trip file went from 13.4 KB to 4 KB. In the harness, `--context-budget 28000` puts `evals/context_proxy.py` between Claude Code and llama-server: when a prompt is over budget it replaces the oldest tool results with a one-line stub, never SKILL.md, the workflow files or the two newest results, and each scenario report lists what was trimmed. Whether Uliya's runtime trims context like this is unknown, so runs are reported with and without it.

```bash
uv run evals/run.py --jobs 2 --skill-endpoint http://127.0.0.1:18080 --context-budget 28000 trip-medium-ph-japan
```

Nine trips on the 4B model, by build (hard checks, rubric, runs that ran out of context):

| Run | Build | Hard | Rubric | Overflows | Change |
| --- | --- | --- | --- | --- | --- |
| 2026-11-08-0012 | 0.3.1 | 34/51 | 4/45 | 4 | baseline: options files of 20K and 30K tokens; 4 runs searched the local disk instead of calling file-agent |
| 2026-11-08-0023 | c53d3d6 | 55/58 | 7/45 | 3 | one file per country, benefit and option indexes |
| 2026-11-08-0055 | 62473b4 | 55/76 | 10/45 | 1 | indexes linked only from the routes that use them, [SLOT] placeholders, stop rule for countries with no file |
| 2026-11-08-0102 | 7693d7d | 64/74 | 6/45 | 1 | ready-to-run file-agent command at the top of SKILL.md: every trip now calls it |
| 2026-11-08-0404 | 359d13e | 69/75 | 8/45 | 1 | rules as numbered yes/no checks with the date arithmetic; Plan reply is a fill-in template |
| 2026-11-08-0504 | a968657 | 60/67 | 8/45 | 2 | trip read list, date comparison spelled out; Philippines finishes (3/5), Nigeria and Pakistan overflow |
| 2026-11-08-1129 | 1100ab9 | 66/74 | 10/45 | 1 | SKILL.md cut from 5,268 to 3,925 tokens; route-only commands moved into workflow files |

The same nine trips score 29/45 on GPT-6.1-Sol (`2026-11-07-2015`, build 0.3.1). On build 73cd8b3, run from the Windows PC with each model on its own subscription through Magpie and GPT-6.1-Sol grading:

| Run | Skill model | Subscription | Hard | Rubric | Passes |
| --- | --- | --- | --- | --- | --- |
| 2026-11-11-1213 | GPT-5.6-Luna (lightest Codex model) | ChatGPT Plus | 81/82 | 34/45 | 1/9 |
| 2026-11-11-1214 | Composer 2.5 (Cursor's own model) | Cursor Pro | 81/83 | 34/45 | 3/9 |

Both miss ETIAS on the Mexico trip and the passport-expiry point on the Singapore trip. `--skill-endpoint` and `--grader-endpoint` point either side at any Anthropic-compatible server; `$EVAL_AUTH_TOKEN` is sent as its bearer token. Each report records the model named in the replies and Claude Code's credential source. Between runs of one build, nine trips move by about two rubric points, so the last three builds are not clearly apart. The 4B's remaining failures are reasoning and reading: it reads the right country file and still skips a condition (Georgia's one-year permit rule, Mexico's FMMd form), leaves transit unassessed, opens country files that are not on the route, and retries Read on NAS paths until the context runs out.

Version 0.4.1 (15 Nov) splits the official page addresses into an index and five files by first letter (each 15 KB or less), so a lookup on the NAS reads one small file instead of 44 KB. The Skill text is otherwise the same as 0.4.0.

Version 0.4.0 (14 Nov), on codex/gpt-6-luna graded by GPT-5.6-Sol: the latest run of each of the 14 hardest scenarios (no companion, saved pages, missing documents, name change, two nationalities, a child with one parent, refugee travel document, passport renewal, no appointment slots, benefits, Japan, London, injection, unsupported) passed 106/106 hard checks and 45/47 rubric points (`2026-11-14-0132` to `2026-11-14-0159`). The two misses: the two-nationality answer drops one of its two passport sentences, and the no-slots answer gives no latest date when the research has no waiting time.

Earlier full run, on version 0.3.1 (`evals/results/2026-11-07-1817`): rubric 53/53 and hard checks 100/101. The one failed check was a harness bug: the claim check read "No report was saved" as a claim, and the mock treated a search that said "do not save" as a save request. Both are fixed, and the two affected scenarios pass in `2026-11-07-1824`. The first run, `2026-11-07-1753` on 0.3.0, scored 41/53.
