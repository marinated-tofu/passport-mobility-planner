# Demo video storyboard: Maria plans Japan

About 100 seconds, 1920×1080, narrated. Every screen in the video shows what the Skill really did in eval run `evals/results/2026-11-11-1214/trip-medium-ph-japan.md` (Composer 2.5, mock NAS, scored 5/5), shortened. Maria and her documents are the synthetic household in `evals/household.yaml`. The video says so on screen.

## Who she is

Maria Clara Reyes, 35, a software engineer at a cloud company in Dubai. She has a Philippine passport and a UAE residence permit. Her scans sit in `Personal/Travel` on the family NAS: passport, a US visa, an expired French Schengen visa, a photo of a 2024 Japanese visa, the UAE permit, payslips, bank statements, a flight to Lisbon.

She wants to see the cherry blossoms in Tokyo, 1 to 10 April 2027. A Philippine passport needs a visa for Japan, and she can't tell which of her old documents still count. She won't upload passport scans to a cloud chatbot.

## Scenes

| # | Time | Picture | Narration |
| --- | --- | --- | --- |
| 1 | 0:00 | Night. Maria at her desk by a window, Dubai skyline outside. Her phone shows a cherry-blossom photo: "Tokyo in April?" Caption: Maria Reyes, software engineer in Dubai, Philippine passport. | This is Maria. She's a software engineer in Dubai, she has a Philippine passport, and she wants to see the cherry blossoms in Tokyo in April. |
| 2 | 0:08 | The `Personal/Travel` folder opens and its files fan out as cards: passport, US visa, Schengen visa (expired), Japan visa 2024 (photo), UAE residence permit, payslips, bank statements, Dubai–Lisbon flight. Browser tabs pile up behind them. | Her scans are on the family NAS: a passport, three old visas, a UAE residence permit, payslips. Which of them still count for Japan? The answers are spread over a dozen official pages, and she won't upload her passport to a cloud chatbot. |
| 3 | 0:21 | The NAS assistant's chat window. Her request types itself out: "I want to visit Japan from 1 to 10 April 2027. My documents are in Personal/Travel. Sort out everything I need to do." | So she asks the assistant on her NAS. |
| 4 | 0:27 | The Skill hands work to the NAS agents, one card at a time, each turning to "completed": file-agent finds 4 identity documents; document-agent reads them and checks the machine-readable zones; photo-agent reads the old Japanese visa; file-agent finds 7 supporting documents; document-agent reads those. Badge: number ending …96B. | The Skill hands the work to the NAS's own agents. One finds the documents, one reads them, one reads the photo of her old Japanese visa. Document numbers come back masked, and nothing leaves the NAS. |
| 5 | 0:41 | The rule checks tick down one by one: passport expires 15 Mar 2031, six months after arrival met; Japan visa 2024 expired 28 Jan 2025, doesn't count; Philippines not visa-exempt, so a short-term visa; about JPY 15,000; 5 working days; source mofa.go.jp, checked 7 Nov 2026. | Then it checks the bundled rules, one by one. Her passport is fine. The 2024 visa expired in January 2025, so it doesn't count. She needs a new short-stay visa: about fifteen thousand yen and five working days, with the official source and the date it was checked. |
| 6 | 0:56 | The visa's document list next to her folder: passport (have), photo (have), application form (missing), flight to Japan (missing; only Dubai–Lisbon saved). A note: health insurance covers the UAE only and ends 31 Jan 2027. | It holds the visa's document list against her folder. There's no flight to Japan, the only booking is Dubai to Lisbon, and her health insurance covers the UAE only. |
| 7 | 1:07 | A timeline from November 2026 to 1 April 2027: now, check the consulate in Dubai and JAPAN eVISA; book flights; buy travel insurance; 20 March, last day to apply; 1 April, fly. | Last, a dated plan. Check the consulate and eVISA now, book the flights, add travel insurance, and apply by the twentieth of March at the latest. |
| 8 | 1:18 | Maria under the cherry blossoms. Title: Passport mobility planner, a Skill for the UGREEN AI NAS. Three lines: official rules with checked dates; numbers masked; documents stay home. Footnote: real Skill run on mock NAS data. | Passport mobility planner. Official rules, checked against your own documents, on your own NAS. |

## Notes

- One narrator voice (Kokoro `af_heart`). Scene lengths follow the narration.
- The chat window is a plain mock-up labelled "NAS assistant", not UGREEN's real interface.
- Colours: night navy, cream, cherry-blossom pink; green for met, amber for missing, red for expired.
