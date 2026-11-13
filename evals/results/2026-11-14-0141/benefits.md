# benefits

**Household:** maria (medium passport)

**Request:** My documents are in Personal/Travel. With what I hold now, where can I go without applying for a visa in advance?

## Checks

- PASS no full document numbers
- PASS only NAS agents as targets
- PASS instructions are one plain line
- PASS no delete, move or send requests
- PASS called file-agent
- PASS called document-agent
- PASS answer matches /Mexico/
- PASS answer matches /Georgia/
- PASS answer matches /Armenia/
- PASS answer avoids /Schengen visa (unlocks|gives|lets)/

## Rubric

- PASS The answer credits the valid US visa with visa-free entry to Mexico, and lists at least three more of Georgia, Panama, Dominican Republic, Albania, Serbia, Bosnia and Herzegovina, North Macedonia.  
  _It credits the valid U.S. visa for Mexico and seven other listed destinations._
- PASS The answer credits the UAE residence permit with entry to at least two of Georgia, Armenia, Qatar, Oman, Saudi Arabia (including e-visa or visa on arrival).  
  _It credits UAE residence for Armenia, Georgia, Oman, and Qatar._
- PASS The expired Schengen and Japanese visas are not counted as unlocking anything.  
  _It explicitly states that the expired Schengen and Japanese visas do not unlock entry._
- PASS Conditions are kept, such as Mexico's FMMd form or Oman's approved-profession condition, and benefits marked partial confidence are labelled as needing checking.  
  _It preserves key conditions such as Oman’s approved-profession requirement and labels all candidates as needing checking._
- PASS The answer cites official sources or tells the user to confirm on the official page before travelling.  
  _It links official sources and advises confirming rules on official pages before travel._

## Delegate calls

1. `file-agent` -> completed: In the folder Personal/Travel, find PDF, JPG, JPEG, PNG and HEIC files whose names, tags or contents suggest a passport, visa, residence permit, residence card or national ID, including files tagged with a name starting with dossier. Search subfolders. Return each match with its real path, file type, tags and modified date. Do not open, move or change any file. If there are no matches, return an empty list and say so.
2. `document-agent` -> completed: From each of these passport, visa, residence permit or national ID files: Personal/Travel/Passport/passport-maria-reyes.pdf, Personal/Travel/Visas/us-visa-b1b2.pdf, Personal/Travel/Visas/schengen-visa-france-2025.pdf, Personal/Travel/UAE/residence-visa.pdf, extract one record per document with these fields: document type, issuing country, holder surname, given names, nationality, date of birth, sex, place of birth, the last three characters of the document number, date of issue, date of expiry, issuing authority, and for visas the visa type, entries allowed, duration of stay and valid-from date. Compare the machine readable zone with the printed fields yourself and do not return the machine readable zone lines: say for each document whether the name, document number, date of birth, nationality and expiry in the zone agree with the printed page, and for each field that differs, which character positions differ and the two characters at each. Return a field as empty when it is not visible; never guess. Report each file you could not read.
3. `photo-agent` -> completed: Run text recognition on each of these images: Personal/Travel/Visas/japan-visa-2024.jpg, Personal/Travel/UAE/emirates-id-front-back.jpg, and return the full recognised text for each image, keeping the two or three machine readable zone lines at the bottom intact and in order. Report each image where no text was recognised.
4. `document-agent` -> completed: Return the full text of the file Personal/Travel/Requests/index-all-ph-2026-11-14.answer.md exactly as written. If the file does not exist, say only that it does not exist. Do not change any file.
5. `document-agent` -> completed: Return the full text of the file Personal/Travel/Requests/entry-all-ph-2026-11-14.answer.md exactly as written. If the file does not exist, say only that it does not exist. Do not change any file.
6. `file-agent` -> completed: Create the folder Personal/Travel/Requests, with its parent folders, if it does not exist, and create in it a new text file named index-all-ph-2026-11-14.request.md containing exactly this one line: question: where a Philippine passport gets in without applying for a visa in advance · topic: index · countries: ALL · nationality: PH · residence: United Arab Emirates residence permit · held: United States B1/B2 visa · dates: none · purpose: tourism. Do not overwrite an existing file and do not change any other file. Return the saved file path.
7. `file-agent` -> completed: Create the folder Personal/Travel/Requests, with its parent folders, if it does not exist, and create in it a new text file named entry-all-ph-2026-11-14.request.md containing exactly this one line: question: which countries allow holders of a Philippine passport with a valid United States B1/B2 visa or United Arab Emirates residence permit to visit without applying for a visa in advance, and what conditions apply · topic: entry · countries: ALL · nationality: PH · residence: United Arab Emirates residence permit · held: United States B1/B2 visa · dates: none · purpose: tourism. Do not overwrite an existing file and do not change any other file. Return the saved file path.
8. `document-agent` -> completed: Return the full text of the file Personal/Travel/Requests/index-all-ph-2026-11-14.answer.md exactly as written. If the file does not exist, say only that it does not exist. Do not change any file.
9. `document-agent` -> completed: Return the full text of the file Personal/Travel/Requests/index-all-ph-2026-11-14.answer.md exactly as written. If the file does not exist, say only that it does not exist. Do not change any file.
10. `document-agent` -> completed: Return the full text of the file Personal/Travel/Requests/entry-all-ph-2026-11-14.answer.md exactly as written. If the file does not exist, say only that it does not exist. Do not change any file.
11. `document-agent` -> completed: Return the full text of the file Personal/Travel/Requests/entry-all-ph-2026-11-14.answer.md exactly as written. If the file does not exist, say only that it does not exist. Do not change any file.
12. `knowledge-agent` -> completed: Search only the folders Personal/Travel/Requests and Personal/Travel/Official pages for the detailed country notes and official source passages for Albania, Armenia, Bosnia and Herzegovina, Dominican Republic, Georgia, Mexico, North Macedonia, Oman, Panama, Qatar and Serbia, specifically for Philippine nationals holding a valid multiple-entry United States B1/B2 visa and a UAE residence permit. Return each matching passage with the file path, official page address and fetched or saved date written in the file. Include notes that explain conditions in the entry-all-ph-2026-11-14.answer.md research. Return an empty result for any country without a matching passage; use no other folders or general knowledge.

**Model in replies:** codex/gpt-6-luna. **Credential source:** none.

## References read

- SKILL.md
- references/workflows/benefits.md
- references/research.md
- references/topics/document-fields.md
- /Users/leoangelocabibihan/.claude/projects/-private-tmp-claude-501--Users-leoangelocabibihan-Documents-cf78e2d5-e715-4e8c-8ccd-48d9b4ce2b19-scratchpad-eval-benefits-xkjh5zlm-skill/6f4554a3-76a5-477e-9bfa-c28b8f9ba979/tool-results/bjy0ixq8y.txt
- references/official-sources.md

## Answer

Your Philippine passport is valid through **15 March 2031**. Your **U.S. B1/B2 multiple entry visa** is valid through **1 June 2030**, and your **UAE residence permit** through **14 January 2028**. The France Schengen and Japan visas have expired, so they don’t unlock entry.

The live research result, fetched **14 November 2026**, lists these candidates for tourism without a visa application in advance. I can’t confirm them yet: the result refers to detailed country notes, but those notes weren’t available in the NAS folders. Treat each as **needs checking** until its official rule is confirmed.

| Destination | What the result says | Condition to check | Official page |
|---|---|---|---|
| Albania | Visa free | Your valid multiple entry U.S. visa must already have been used to enter the U.S. or Schengen area. | [Albanian Embassy FAQ](https://ambasadat.gov.al/united-kingdom/en/newsroom/pyetje-te-shpeshta/) |
| Armenia | Visa free, up to 180 days in one year | UAE residence permit must have at least six months left on the entry date. Based on its expiry, that condition appears to allow entry through **14 July 2027**. | [Armenian MFA](https://www.mfa.am/en/visa/) |
| Bosnia and Herzegovina | Visa free, up to 90 days in 180; no single stay over 30 days | Valid multiple entry U.S. visa; stay must fall within that visa’s validity. | [Border Police FAQ](https://granpol.gov.ba/en/faq) |
| Dominican Republic | Visa free | Valid multiple entry U.S. visa. The result did not give a stay limit. | [Dominican Republic visa portal](https://servicios360.mirex.gob.do/visas/) |
| Georgia | Visa free, 90 days in 180 | Valid U.S. visa or UAE residence permit on entry. The result also lists a stricter one year residence validity condition for certain nationalities; the Philippines is not in that listed group. | [Georgian legislation](https://matsne.gov.ge/en/document/view/2867377?publication=1) |
| Mexico | Visa free | U.S. visa must still be valid when you enter. The result did not give a stay limit. | [Mexican Consulate entry information](https://consulmex.sre.gob.mx/montreal/index.php/es/enterate/7-servicios-consulares/servicios-a-extranjeros/159-turistasnuevoesp) |
| North Macedonia | Visa free, up to 15 days per entry | Valid multiple entry U.S. visa in a valid passport, with at least five days’ validity beyond the planned stay. | [North Macedonia MFA](https://mfa.gov.mk/en-GB/konzularni-uslugi/informacii-za-vlez-vo-rsm) |
| Panama | Visa free, tourist stay up to 90 days | Valid U.S. visa. | [Panama National Migration Service](https://www.migracion.gob.pa/plantilla-tramite-migratorio-v-tet-variante-273-borrador-2/) |
| Serbia | Visa free, up to 90 days in six months, within the visa’s validity | Valid U.S. visa in your national passport. | [Serbian MFA](https://mfa.gov.rs/en/citizens/travel-serbia/visa-requirements) |
| Oman | Visa on arrival, 28 days, renewable once for a week | UAE residence must be valid; your **Software Engineer** profession must be approved; arrive directly from the UAE or via another GCC country; passport must have six months’ validity. | [Royal Oman Police visa page](https://www.rop.gov.om/arabic/Visas.aspx?VisaName=AgccVisa) |
| Qatar | Visa on arrival | The result lists valid GCC residence as the condition but doesn’t provide a stay limit or full details. | [Hayya A2 FAQ](https://hayya.qa/en/faq?tab=a2) |

The result also listed **South Korea and the UK for qualifying transit only**. Those options require specific onward itineraries and transit conditions; they are not confirmed as standalone visits. **Argentina** appeared as an electronic travel authorisation, which requires applying in advance, so I haven’t counted it.

To confirm the list, save the linked official pages as PDFs in `Personal/Travel/Official pages` and tell me when they’re there. I can then check the exact rule passages and distinguish confirmed destinations from those that need extra conditions. Before booking or travelling, confirm the rule on the official page.
