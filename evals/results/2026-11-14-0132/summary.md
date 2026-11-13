# Eval run 2026-11-14-0132

Skill model requested: codex/gpt-6-luna. Grader requested: cursor/gpt-5.6-sol@272k. Skill version: 0.3.1.

Skill endpoint: http://127.0.0.1:3425. Grader endpoint: http://127.0.0.1:3425.

Model in Skill replies: codex/gpt-6-luna. Credential source: none.

Hard checks 63/65, rubric 17/26, cost USD 5.81.

| Scenario | Passport | Result | Checks | Rubric | Delegate calls | Turns |
| --- | --- | --- | --- | --- | --- | --- |
| [no-companion](no-companion.md) | medium | pass | 9/9 | 3/3 | 12 | 21 |
| [no-companion-saved-page](no-companion-saved-page.md) | medium | fail | 6/6 | 1/2 | 12 | 26 |
| [missing-passport-photo](missing-passport-photo.md) | medium | fail | 9/9 | 2/3 | 15 | 26 |
| [name-change](name-change.md) | medium | fail | 7/7 | 2/3 | 11 | 19 |
| [dual-nationality](dual-nationality.md) | medium | fail | 6/7 | 1/3 | 12 | 19 |
| [child-one-parent](child-one-parent.md) | medium | fail | 6/7 | 2/3 | 13 | 22 |
| [refugee-travel-document](refugee-travel-document.md) | medium | pass | 7/7 | 3/3 | 12 | 22 |
| [passport-renewal](passport-renewal.md) | medium | fail | 7/7 | 2/3 | 21 | 30 |
| [no-appointment-slots](no-appointment-slots.md) | medium | fail | 6/6 | 1/3 | 10 | 19 |
