# Demo video storyboard: Emre plans Mexico and Panama

About 105 seconds, 1920×1080, narrated. Every screen in the video shows what the Skill really did in eval run `evals/results/2026-11-11-1214/trip-medium-tr-mexico-panama.md` (Composer 2.5, mock NAS, passed every check, rubric 5/5), shortened. Emre and his documents are the synthetic household in `evals/households/medium-tr.yaml`. The video says so on screen.

## Who he is

Emre Yilmaz, 36, a logistics manager at Bosphorus Freight in Istanbul. He has a Turkish passport and a US B1/B2 visa, multiple entry, valid to 10 April 2029. His scans sit in `Personal/Travel` on the family NAS: the passport, the US visa and an employment letter from October 2026.

He wants to fly from Istanbul to Mexico City on 10 February 2027, go on to Panama City until the 26th, then fly home. The cheap flights connect in Frankfurt or in Houston, and he doesn't know which one his documents allow. He won't upload passport scans to a cloud chatbot.

## Scenes

| # | Time | Picture | Narration |
| --- | --- | --- | --- |
| 1 | 0:00 | Night. Emre at his desk by a window. His phone shows a saved idea: "Mexico and Panama?", 10 to 26 February 2027. Caption: Emre Yilmaz, logistics manager in Istanbul, Turkish passport. | This is Emre. He's a logistics manager in Istanbul, he has a Turkish passport, and he wants to see Mexico City and Panama City in February. |
| 2 | 0:11 | The `Personal/Travel` folder opens and its three files fan out as cards: passport (Turkey), US visa B1/B2 (to 10 Apr 2029), employment letter (Bosphorus Freight). Browser tabs pile up beside them: Mexican consulate, FMMd form, Panama migration service, Schengen visa, US transit. A cloud chatbot card: "Upload a photo of your passport". Not with his passport. | His scans are on the family NAS: a passport, a U S visa and a letter from his employer. Should he connect in Frankfurt or in Houston? The answers are spread over many official pages, and he won't upload his passport to a cloud chatbot. |
| 3 | 0:30 | The NAS assistant's chat window. His request types itself out: "I want to go from Istanbul to Mexico City on 10 February 2027 for ten days, then to Panama City until the 26th, then home. The cheap flights connect in Frankfurt or in Houston. Which should I book, and what do I need? Documents are in Personal/Travel." | So he asks the assistant on his NAS. |
| 4 | 0:35 | The Skill hands work to the NAS agents, one card at a time, each turning to "completed": file-agent finds the passport and US visa; document-agent reads them and checks the machine-readable zones (passport …938, zone agrees); file-agent finds one supporting document; document-agent reads the employment letter (Bosphorus Freight, 18 Oct 2026). Badge: runs on the NAS, numbers masked. | The Skill hands the work to the NAS's own agents. One finds his documents and another reads them, first the passport and U S visa, then a letter from his employer. Document numbers come back masked, and nothing leaves the NAS. |
| 5 | 0:52 | The rule checks tick down: passport to 1 Aug 2030 and US B1/B2 to 10 Apr 2029, both last the trip; Houston connection covered by the B1/B2; Frankfurt not covered, no Schengen visa on file and no transit rule in the bundled data. Card `mx-entry-with-us-visa`: digital FMMd before travel; no fee in the bundled data; rule is partial, ask the consulate; Panama visa-free up to 90 days with the US visa. Source consulmex.sre.gob.mx, checked 7 Nov 2026. | Then it checks the bundled rules, one by one. His passport and U S visa last the whole trip. The visa covers a stop in Houston, but not Frankfurt. It also lets him into Mexico with the online F M M D form, and into Panama for up to ninety days. |
| 6 | 1:12 | What Mexico and Panama ask for, next to his folder: passport (have), US visa (have), FMMd form (missing, highlighted), onward tickets (missing). Two notes: no travel insurance or bank statements on the NAS; Frankfurt could mean a Schengen visa, about EUR 90 and 15 calendar days. | It holds what Mexico and Panama ask for against his folder. The F M M D form is still to do, and there are no onward tickets, travel insurance or bank statements. |
| 7 | 1:26 | A timeline dated from 11 Nov 2026: now, compare Houston and Frankfurt with the Schengen visa included; by ~19 Jan 2027, Schengen visa only if he picks Frankfurt; before 10 Feb, confirm the Mexico rule and book onward tickets; before 10 Feb, complete the FMMd; 10 Feb, fly from Istanbul via Houston. | Last, a dated plan. Compare the routes now, confirm the Mexico rule with the consulate, and fill in the F M M D form before the tenth of February. |
| 8 | 1:38 | Emre standing, petals falling. Title: Passport mobility planner, a Skill for the UGREEN AI NAS. Three lines: official rules with checked dates; numbers masked; documents stay home. Footnote: real Skill run on mock NAS data. | Passport mobility planner. Official rules, checked against your own documents, on your own NAS. |

## Notes

- One narrator voice (Kokoro `af_heart`). Scene lengths follow the narration; times above use the placeholder durations and shift once the real audio is made.
- The run's answer recommends the Houston connection. Frankfurt is shown as not covered, not as refused: the bundled data has no transit rule for Turkish citizens, so the Skill says to check the official page.
- The card shows Mexico's source only. Panama's rule (`pa-entry-with-visa`) has its own source in the answer, migracion.gob.pa, checked 07 Nov 2026, verified.
- Left out for length: the Türkiye return-home section, the name check (names match), and the optional Copa Panama stopover.
- The chat window is a plain mock-up labelled "NAS assistant", not UGREEN's real interface.
- Colours: the shared night navy and cream; tropical sky and green hills on the phone; bougainvillea pink petals at the close.
