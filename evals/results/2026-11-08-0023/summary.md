# Eval run 2026-11-08-0023

Skill model requested: sonnet. Grader requested: sonnet. Skill version: 0.3.1.

Skill endpoint: http://127.0.0.1:18080 (the model name above is ignored there). Grader endpoint: http://127.0.0.1:3425, set in ~/.claude/settings.json or the environment: a router there may answer with another model than the one requested

Hard checks 55/58, rubric 7/45, cost USD 1.21.

| Scenario | Passport | Result | Checks | Rubric | Delegate calls | Turns |
| --- | --- | --- | --- | --- | --- | --- |
| [trip-strong-de-japan-china](trip-strong-de-japan-china.md) | strong | fail | 0/1 | 0/5 | 6 | 16 |
| [trip-strong-sg-uk-us](trip-strong-sg-uk-us.md) | strong | fail | 10/10 | 0/5 | 3 | 8 |
| [trip-strong-jp-korea-canada](trip-strong-jp-korea-canada.md) | strong | fail | 0/1 | 0/5 | 4 | 11 |
| [trip-medium-mx-spain-portugal-uk](trip-medium-mx-spain-portugal-uk.md) | medium | fail | 0/1 | 0/5 | 11 | 31 |
| [trip-medium-tr-mexico-panama](trip-medium-tr-mexico-panama.md) | medium | fail | 9/9 | 0/5 | 3 | 12 |
| [trip-medium-ph-japan](trip-medium-ph-japan.md) | medium | fail | 9/9 | 4/5 | 11 | 20 |
| [trip-weak-in-schengen](trip-weak-in-schengen.md) | weak | fail | 9/9 | 1/5 | 7 | 13 |
| [trip-weak-ng-london](trip-weak-ng-london.md) | weak | fail | 9/9 | 2/5 | 8 | 15 |
| [trip-weak-pk-georgia-armenia](trip-weak-pk-georgia-armenia.md) | weak | fail | 9/9 | 0/5 | 3 | 11 |
