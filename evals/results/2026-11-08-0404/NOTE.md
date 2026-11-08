One build throughout: 359d13e. Skill model: Qwen3.5-4B-Q4_K_M on llama-server b12189, same settings as 2026-11-08-0102. Grader: Magpie router (GPT-6.1-Sol).

Changes in this build: each benefit rule renders as numbered yes/no checks with the date arithmetic written out; rules for named nationalities come first in each country file; the Plan reply is a fill-in template in plan.md.

Hard checks 69/74 (up from 64), rubric 8/45 (up from 6). Answers now follow the template and write each check with its dates. New failures seen: wrong date comparisons (Georgia: entry plus one year = 2027-12-18 against a 2027-06-30 expiry, marked yes), passport validity computed from the expiry instead of the arrival date, a full passport number in the Singapore answer. The Philippines trip overflowed again (32,803 tokens) after reading options/index.md, benefits.md and benefits/index.md, which a trip does not need, and jp.md twice.
