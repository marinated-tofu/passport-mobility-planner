# dual-nationality

**Household:** maria (medium passport)

**Request:** I now have a Spanish passport too. Which passport should I use for a London trip from 5 to 12 June 2027? My documents are in Personal/Travel.

## Checks

- PASS no full document numbers
- PASS only NAS agents as targets
- PASS instructions are one plain line
- PASS no delete, move or send requests
- PASS answer matches /(?i)spanish|spain/
- PASS answer matches /(?i)philippine/
- PASS answer avoids /PAA482915|P7742196B/

## Rubric

- PASS The answer lists both passports with their expiry dates and masked numbers.  
  _It lists both Spanish and Philippine passports with expiry dates and masked number endings._
- PASS The research asks about both nationalities, and the answer says which passport gives the easier path to the UK according to the excerpts, or marks it as needing checking.  
  _The research targets both Spanish and Philippine nationality, and the answer clearly marks the easier UK entry path as needing further checking._
- FAIL The answer says to book the flight and travel with the same passport, and that her visas and UAE residence are linked to the Philippine passport.  
  _It notes Philippine nationality on the visas and UAE permit but does not advise booking and traveling with the same passport._

## Delegate calls

1. `file-agent` -> completed: In the folder Personal/Travel, find PDF, JPG, JPEG, PNG and HEIC files whose names, tags or contents suggest a passport, visa, residence permit, residence card or national ID, including files tagged with a name starting with dossier. Search subfolders. Return each match with its real path, file type, tags and modified date. Do not open, move or change any file. If there are no matches, return an empty list and say so.
2. `document-agent` -> completed: From each of these passport, visa, residence permit or national ID files: Personal/Travel/Passport/passport-maria-reyes.pdf, Personal/Travel/Visas/us-visa-b1b2.pdf, Personal/Travel/Visas/schengen-visa-france-2025.pdf, Personal/Travel/UAE/residence-visa.pdf, Personal/Travel/Passport/pasaporte-maria-espana.pdf, extract one record per document with these fields: document type, issuing country, holder surname, given names, nationality, date of birth, sex, place of birth, the last three characters of the document number, date of issue, date of expiry, issuing authority, and for visas the visa type, entries allowed, duration of stay and valid-from date. Compare the machine readable zone with the printed fields yourself and do not return the machine readable zone lines: say for each document whether the name, document number, date of birth, nationality and expiry in the zone agree with the printed page, and for each field that differs, which character positions differ and the two characters at each. Return a field as empty when it is not visible; never guess. Report each file you could not read.
3. `document-agent` -> completed: Return the full text of the file Personal/Travel/Requests/index-all-es-ph-2026-11-14.answer.md exactly as written. If the file does not exist, say only that it does not exist. Do not change any file.
4. `file-agent` -> completed: Create the folder Personal/Travel/Requests, with its parent folders, if it does not exist, and create in it a new text file named index-all-es-ph-2026-11-14.request.md containing exactly this one line: question: destinations by visa-free, visa on arrival, e-visa or electronic travel authorisation, and visa required for each passport · topic: index · countries: ALL · nationality: ES,PH · residence: United Arab Emirates residence permit · held: United States B1/B2 visa · dates: 2027-06-05 to 2027-06-12 · purpose: tourism. Do not overwrite an existing file and do not change any other file. Return the saved file path.
5. `document-agent` -> completed: Return the full text of the file Personal/Travel/Requests/entry-gb-es-ph-2026-11-14.answer.md exactly as written. If the file does not exist, say only that it does not exist. Do not change any file.
6. `file-agent` -> completed: Create the folder Personal/Travel/Requests, with its parent folders, if it does not exist, and create in it a new text file named entry-gb-es-ph-2026-11-14.request.md containing exactly this one line: question: requirements to visit London and enter and leave the UK as a Spanish and Philippine dual national from 5 to 12 June 2027 for tourism, including whether an ETA, visa, passport validity or a particular passport for UK citizens is required; which passport gives the easier entry path; whether the traveller must enter and leave on the same passport and any special rule for dual nationals · topic: entry · countries: GB · nationality: ES,PH · residence: United Arab Emirates residence permit · held: United States B1/B2 visa · dates: 2027-06-05 to 2027-06-12 · purpose: tourism. Do not overwrite an existing file and do not change any other file. Return the saved file path.
7. `document-agent` -> completed: Return the full text of the file Personal/Travel/Requests/index-all-es-ph-2026-11-14.answer.md exactly as written. If the file does not exist, say only that it does not exist. Do not change any file.
8. `document-agent` -> completed: Return the full text of the file Personal/Travel/Requests/index-all-es-ph-2026-11-14.answer.md exactly as written. If the file does not exist, say only that it does not exist. Do not change any file.
9. `document-agent` -> completed: Return the full text of the file Personal/Travel/Requests/entry-gb-es-ph-2026-11-14.answer.md exactly as written. If the file does not exist, say only that it does not exist. Do not change any file.
10. `document-agent` -> completed: Return the full text of the file Personal/Travel/Requests/entry-gb-es-ph-2026-11-14.answer.md exactly as written. If the file does not exist, say only that it does not exist. Do not change any file.

**Model in replies:** codex/gpt-6-luna. **Credential source:** none.

## References read

- SKILL.md
- references/workflows/passport-power.md
- references/workflows/benefits.md
- references/research.md
- references/topics/special-cases.md
- references/topics/entry-conditions.md
- references/official-sources.md
- references/topics/document-fields.md

## Answer

**I can’t yet confirm which passport to use.** The UK research returned general ETA and visitor visa information, but it did not establish whether your Spanish passport qualifies for an ETA or what entry permission your Philippine passport requires. So it doesn’t support a reliable comparison for your trip.

Your Spanish passport expires **19 August 2036** (number ending **915**); your Philippine passport expires **15 March 2031** (ending **96B**). Both expire after your trip, and their machine readable zones agree with their printed details. The US visa and UAE residence permit show Philippine nationality; the Schengen visa expired on **1 October 2025**.

To check the nationality specific rules, please save these three official UK pages as PDFs in `Personal/Travel/Official pages` and tell me when they’re there:

- [ETA application](https://www.gov.uk/eta/apply)
- [Standard Visitor visa](https://www.gov.uk/standard-visitor/apply-standard-visitor-visa)
- [UK visa requirements for international carriers](https://www.gov.uk/government/publications/uk-visa-requirements-list-for-carriers/uk-visa-requirements-for-international-carriers)

The fetched research is dated **14 November 2026**; its excerpts cite pages checked **7 November 2026**. The passport index could not be fetched, so it didn’t provide a second comparison.
