One build throughout: a968657. Same model and settings as 2026-11-08-0404.

Change from 0404: plan.md lists the only files a trip reads, shows how to compare two dates, and computes passport validity from the arrival and departure dates.

Hard checks 60/67, rubric 8/45 (same as 0404). The Philippines trip, which overflowed in 0404 and 0102, now finishes and scores 3/5. Two others overflowed instead:
- Nigeria (36,391 tokens) read countries/nl.md and fr.md, which do not exist, plus benefits/index.md and official-sources.md.
- Pakistan (32,823 tokens, 54 turns) read es.md, ee.md and is.md, which are not on the route, then tried to Read the passport PDF on the NAS 16 times.
At temperature 0.6, nine trips move by about two rubric points between runs of the same build, so 6, 8 and 8 across the last three builds are not clearly different.
