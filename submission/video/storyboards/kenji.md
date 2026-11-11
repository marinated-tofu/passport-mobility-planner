# Demo video storyboard: Kenji plans Seoul and Vancouver

About 100 seconds, 1920×1080, narrated. Every screen in the video shows what the Skill really did in eval run `evals/results/2026-11-11-1214/trip-strong-jp-korea-canada.md` (Composer 2.5, mock NAS, passed every check, scored 5/5), shortened. Kenji and his documents are the synthetic household in `evals/households/strong-jp.yaml`. The video says so on screen.

## Who he is

Kenji Sato, born 1985, lives in Osaka. He has a Japanese passport, valid to 2034. His scans sit in `Personal/Travel` on the family NAS: a phone photo of his passport page, a Korean Air booking (Osaka to Seoul, Seoul to Vancouver, Vancouver to Osaka) and a Vancouver hotel booking.

He flies to Seoul on 2 May 2027 for three days, then on to Vancouver from 5 to 19 May. Neither country needs a visa from him, but each wants an electronic travel authorisation, and he doesn't know which. He won't upload his passport photo to a cloud chatbot.

## Scenes

| # | Time | Picture | Narration |
| --- | --- | --- | --- |
| 1 | 0:00 | Night. Kenji at his desk. His phone shows a saved idea: "Seoul and Vancouver in May?", 2 to 19 May 2027. Caption: Kenji Sato, lives in Osaka, Japanese passport. | This is Kenji. He lives in Osaka, he has a Japanese passport, and in May he's flying to Seoul and then on to Vancouver. |
| 2 | 0:11 | The `Personal/Travel` folder opens: passport (phone photo), Korean Air booking KIX, ICN, YVR, Harbourline Suites Vancouver 5 to 19 May. Browser tabs pile up: K-ETA guide, K-ETA waived nationalities, Canada eTA fees, IRCC eTA or visa, IRCC visitor visa. The cloud chatbot card: "Not with his passport." | His scans are on the family NAS: a photo of his passport, a Korean Air booking, a hotel in Vancouver. What does each country need? The rules sit on official sites in two countries, and he won't upload his passport to a cloud chatbot. |
| 3 | 0:29 | The NAS assistant's chat window. His request types itself out: "I'm going from Osaka to Seoul on 2 May 2027 for three days, then Seoul to Vancouver on 5 May until the 19th. My documents are in Personal/Travel. What paperwork do I need?" | So he asks the assistant on his NAS. |
| 4 | 0:34 | Four agent calls, each turning to "completed": file-agent finds the passport photo, no visas or permits; photo-agent reads the photo, passport …273, machine-readable zone agrees with the page; file-agent finds 2 supporting files; document-agent reads them, Korean Air ref …2RT, hotel 5 to 19 May. Badge: runs on the NAS, numbers masked. | The Skill hands the work to the NAS's own agents. One finds the documents, one reads the passport photo and checks the machine-readable zone, one reads the bookings. Document numbers come back masked, and nothing leaves the NAS. |
| 5 | 0:50 | Rule checks: passport expires 11 Jun 2034, arrival plus six months is 2 Nov 2027; Korea, K-ETA not a visa, some nationalities waived and the list not checked; Canada, eTA for arrival by air, visa-exempt to confirm on IRCC. Card `kr-k-eta · ca-eta`: KRW 10,000 + 3%, usually within 72 hours; CAD 7, most in minutes. Source k-eta.go.kr · canada.ca, checked 7 Nov 2026. | Then it checks the bundled rules. His passport is fine. Korea needs a K E T A, about ten thousand won, though some nationalities are waived, so he should confirm. Canada needs an E T A, seven Canadian dollars, most approved in minutes, with the official sources and checked dates. |
| 6 | 1:11 | The document lists next to his folder: passport (have), flight booking (have), Vancouver hotel (have), K-ETA and eTA (missing, highlighted). Note: no proof of a place to stay in Seoul; no travel insurance or bank statements either. | It holds the document lists against his folder. The passport, flights and hotel are there. Neither authorisation is there yet, and nothing shows where he'll stay in Seoul. |
| 7 | 1:23 | A timeline dated from 11 Nov 2026: now, apply for the Canada eTA; by ~28 Apr 2027, apply for the K-ETA; before 2 May, confirm both on the same passport; before Korea, proof of a stay in Seoul; 2 May 2027, fly to Seoul. | Last, a dated plan. Apply for the Canadian E T A now and the K E T A by the twenty-eighth of April, then fly to Seoul on the second of May. |
| 8 | 1:37 | Kenji standing, maple-red leaves falling. Title: Passport mobility planner, a Skill for the UGREEN AI NAS. Footnote: real Skill run on mock NAS data. | Passport mobility planner. Official rules, checked against your own documents, on your own NAS. |

## Notes

- One narrator voice (Kokoro `af_heart`). Scene lengths follow the narration; times above are estimates until the TTS runs.
- Narration spells the authorisations as letters ("K E T A", "E T A") so Kokoro says them as acronyms.
- The run's checklist is dated 11 Nov 2026, so the timeline uses that date, not the 7 Nov eval date.
- Left out for length: the 19 May return flight, the travel insurance suggestion, the fee total (about USD 12), the Incheon transit tour note, the visitor-visa fallback if he were not eTA-eligible.
- Colours: night navy, cream, spring green; green for met, amber for missing.
