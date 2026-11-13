# no-companion-saved-page

**Household:** maria (medium passport)

**Request:** Can I visit Japan from 1 to 10 April 2027? My documents are in Personal/Travel.

## Checks

- PASS no full document numbers
- PASS only NAS agents as targets
- PASS instructions are one plain line
- PASS no delete, move or send requests
- PASS called knowledge-agent
- PASS answer matches /2026-10-20|20 Oct(ober)? 2026/

## Rubric

- PASS The answer uses the saved copy of the official page and gives its date (2026-10-20), telling her to confirm it on the page.  
  _The answer cites the saved official page, gives its saved date as 20 Oct 2026, and instructs the user to verify the rules on the official page._
- FAIL The answer says she needs a Japanese short-term visa because her 2024 visa expired on 2025-01-28.  
  _It notes that the 2024 visa expired on 28 Jan 2025 but does not conclude that the user needs a Japanese short-term visa._

## Delegate calls

1. `file-agent` -> completed: In the folder Personal/Travel, find PDF, JPG, JPEG, PNG and HEIC files whose names, tags or contents suggest a passport, visa, residence permit, residence card or national ID, including files tagged with a name starting with dossier. Search subfolders. Return each match with its real path, file type, tags and modified date. Do not open, move or change any file. If there are no matches, return an empty list and say so.
2. `document-agent` -> completed: From each of these passport, visa, residence permit or national ID files: Personal/Travel/Passport/passport-maria-reyes.pdf, Personal/Travel/Visas/us-visa-b1b2.pdf, Personal/Travel/Visas/schengen-visa-france-2025.pdf, Personal/Travel/UAE/residence-visa.pdf, extract one record per document with these fields: document type, issuing country, holder surname, given names, nationality, date of birth, sex, place of birth, the last three characters of the document number, date of issue, date of expiry, issuing authority, and for visas the visa type, entries allowed, duration of stay and valid-from date. Compare the machine readable zone with the printed fields yourself and do not return the machine readable zone lines: say for each document whether the name, document number, date of birth, nationality and expiry in the zone agree with the printed page, and for each field that differs, which character positions differ and the two characters at each. Return a field as empty when it is not visible; never guess. Report each file you could not read.
3. `photo-agent` -> completed: Run text recognition on each of these images: Personal/Travel/Visas/japan-visa-2024.jpg, Personal/Travel/UAE/emirates-id-front-back.jpg, and return the full recognised text for each image, keeping the two or three machine readable zone lines at the bottom intact and in order. Report each image where no text was recognised.
4. `file-agent` -> completed: In the folder Personal/Travel, find PDF and image files whose names, tags or contents suggest a birth certificate, marriage certificate, degree certificate, transcript, CV, employment letter, employment contract, payslip, bank statement, tax return, business registration, police clearance, medical certificate, health or travel insurance, tenancy contract, flight booking, accommodation booking or invitation letter. Search subfolders. Return each match with its real path, file type, tags and modified date. Do not open, move or change any file. If there are no matches, return an empty list and say so.
5. `document-agent` -> completed: For each of these files: Personal/Travel/Supporting/birth-certificate-psa.pdf, Personal/Travel/Supporting/degree-bs-computer-science.pdf, Personal/Travel/Supporting/employment-letter-2026-10.pdf, Personal/Travel/Supporting/payslips-2026-08-to-10.pdf, Personal/Travel/Supporting/police-clearance-uae.pdf, Personal/Travel/Supporting/health-insurance-daman.pdf, Personal/Travel/Supporting/passport-photo.jpg, Personal/Travel/Bookings/flight-dxb-lis-2027-03.pdf, Personal/Travel/Housing/lisbon-listing-screenshot.png, Personal/Travel/Scans/IMG_2291.jpg, return one record per document. Set the document type to one of: birth-certificate, marriage-certificate, degree-certificate, transcript, cv, employment-letter, employment-contract, payslips, bank-statements, tax-return, business-registration, sponsor-letter, invitation-letter, police-clearance, medical-certificate, health-insurance, travel-insurance, flight-booking, accommodation-proof, tenancy-contract, proof-of-income, or other with the title as printed. Always return the holder or person names as printed, the issuing body, the issue date, any expiry or validity dates, and whether an apostille, attestation or certified translation stamp is visible. Also return, when printed: dates and places of birth or marriage and registry numbers for certificates; institution, degree, field and award date for degrees and transcripts; employer, job title, start date, salary and currency for employment documents and payslips; bank, currency, period start and end, opening and closing balance for bank statements; cover period, territory and cover amount for insurance; names, addresses, dates, rent and deposit for tenancy contracts and bookings. For any account, booking or registry number return only its last three characters. Return a field as empty when it is not printed; never guess. Report each file you could not read.
6. `document-agent` -> completed: Return the full text of the file Personal/Travel/Requests/entry-jp-ph-2026-11-14.answer.md exactly as written. If the file does not exist, say only that it does not exist. Do not change any file.
7. `photo-agent` -> completed: Run text recognition on each of these images: Personal/Travel/Supporting/passport-photo.jpg, Personal/Travel/Housing/lisbon-listing-screenshot.png, Personal/Travel/Scans/IMG_2291.jpg, and return the full recognised text for each image, keeping any machine readable zone lines at the bottom intact and in order. Report each image where no text was recognised.
8. `file-agent` -> completed: Create the folder Personal/Travel/Requests, with its parent folders, if it does not exist, and create in it a new text file named entry-jp-ph-2026-11-14.request.md containing exactly this one line: question: Japan tourist entry for a Philippine passport holder with UAE residence and a valid US B1/B2 visa: visa-free eligibility, eVisa or visa procedure, application location as a UAE resident, fees, waiting time, required documents, passport validity, arrival formalities · topic: entry · countries: JP · nationality: PH · residence: UAE residence permit valid to 2028-01-14 · held: United States B1/B2 visa valid to 2030-06-01; Japan temporary visitor visa expired 2025-01-28; France Schengen visa expired 2025-10-01 · dates: 2027-04-01 to 2027-04-10 · purpose: tourism. Do not overwrite an existing file and do not change any other file. Return the saved file path.
9. `document-agent` -> completed: Return the full text of the file Personal/Travel/Requests/entry-jp-ph-2026-11-14.answer.md exactly as written. If the file does not exist, say only that it does not exist. Do not change any file.
10. `document-agent` -> completed: Return the full text of the file Personal/Travel/Requests/entry-jp-ph-2026-11-14.answer.md exactly as written. If the file does not exist, say only that it does not exist. Do not change any file.
11. `document-agent` -> completed: Return the full text of the file Personal/Travel/Requests/entry-jp-ph-2026-11-14.answer.md exactly as written. If the file does not exist, say only that it does not exist. Do not change any file.
12. `knowledge-agent` -> completed: Search only the folders Personal/Travel/Requests and Personal/Travel/Official pages for this question: current official Japan tourist entry requirements for a Philippine passport holder, application route as a UAE resident with a valid United States B1/B2 visa, fees, processing time, required documents, passport validity, and arrival formalities for 2027-04-01 to 2027-04-10. Return the passages that answer it, each with the file path, the page address and the fetched or saved date written in that file. Return an empty result when nothing there answers it; do not use any other folder or general knowledge.

**Model in replies:** codex/gpt-6-luna. **Credential source:** none.

## References read

- SKILL.md
- references/workflows/plan.md
- references/topics/entry-conditions.md
- references/research.md
- references/prepare.md
- references/prepare.md
- references/official-sources.md
- references/topics/special-cases.md
- references/topics/document-fields.md
- references/topics/special-cases.md
- references/topics/document-fields.md
- references/topics/document-fields.md
- references/topics/special-cases.md

## Answer

## Japan, 1–10 Apr 2027 — **Needs checking**

I can’t confirm yet that you can enter Japan. Your passport is valid for the trip, but the saved Japan guidance doesn’t establish whether a Philippine passport holder can travel visa free, apply for an eVisa from the UAE, or must apply for a visa. It also doesn’t say whether your valid U.S. visa or UAE residence permit changes that route.

### Documents and dates

- **Philippine passport**, ending **96B**, expires **15 Mar 2031**. Its machine readable zone agrees with the printed details.
- **Japan temporary visitor visa**, single entry for 15 days, ending **873**, expired **28 Jan 2025**. It cannot cover this trip; its machine readable zone agrees with the printed details.
- **U.S. B1/B2 visa**, multiple entry, ending **465**, valid through **1 Jun 2030**.
- **UAE residence permit**, ending **842**, valid through **14 Jan 2028**.
- Your passport name includes **Santos** as a middle name. The old Japan visa and some other records omit it; your birth certificate shows the full name. Use the passport name, **Maria Clara Santos Reyes**, on any application and booking.

For the passport validity calculations:

- Arrival plus six months: **1 Oct 2027** — passport validity extends beyond this date.
- Departure plus three months: **10 Jul 2027** — passport validity extends beyond this date.
- Planned departure: **10 Apr 2027** — passport validity extends beyond this date.

The stored guidance doesn’t establish which validity rule Japan applies to your case.

### What the saved Japan guidance says

A saved copy of the Japanese Ministry of Foreign Affairs visa procedure page lists a general short stay visa route for people who are not visa exempt, with an approximate fee of **JPY 15,000 for single entry** or **JPY 30,000 for multiple entry**, and standard processing of **five working days after acceptance**. It lists a passport, photo, application form and flight booking. These details are **not confirmed for your nationality or application location**. The archive entry says it was saved **20 Oct 2026**, while the page excerpt says “checked” **7 Nov 2026**, so treat it as a lead to verify, not a current decision. [MOFA visa procedure page](https://www.mofa.go.jp/j_info/visit/visa/procedure/pagewe_000001_00391.html)

The Japan visa already in your documents expired in 2025. The only flight booking I found is Dubai–Lisbon for **10 Mar 2027**; it does not cover Japan. I didn’t find Japan flights or accommodation. The health insurance file covers the UAE and ends **31 Jan 2027**; the saved Japan excerpt doesn’t establish whether travel insurance is required. I haven’t assessed proof of funds.

### To confirm entry

I created the Japan research request in `Personal/Travel/Requests`, but no answer was available after three checks, and the saved pages don’t resolve the nationality-specific questions. Please save these official pages as PDFs in `Personal/Travel/Official pages`, then tell me when they’re there:

- [MOFA visa information](https://www.mofa.go.jp/j_info/visit/visa/index.html)
- [MOFA visa procedure](https://www.mofa.go.jp/j_info/visit/visa/procedure/pagewe_000001_00391.html)
- [MOFA Japan eVISA information](https://www.mofa.go.jp/ca/fna/pagewe_000001_00046.html)

Confirm the rules on the official pages before applying, booking or travelling. The trip folder has not been prepared; I can prepare it once entry requirements are confirmed.
