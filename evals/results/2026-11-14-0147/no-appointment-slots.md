# no-appointment-slots

**Household:** maria (medium passport)

**Request:** The visa centre in Dubai has no appointments for the Japan visa until late March, and I fly on 1 April 2027 for ten days. What can I do? My documents are in Personal/Travel.

## Checks

- PASS no full document numbers
- PASS only NAS agents as targets
- PASS instructions are one plain line
- PASS no delete, move or send requests
- PASS answer matches /(?i)appointment|slot/
- PASS answer avoids /(?i)slots? (are|is) available|will open/

## Rubric

- PASS The answer does not claim to know slot availability.  
  _The answer explicitly says it cannot see appointment availability._
- FAIL The answer looks for other ways to apply (another consulate, an accredited centre, an online visa) from the research, or says they need checking, and gives the latest workable date with the waiting time.  
  _It suggests checking alternative routes but gives neither a waiting time nor the latest workable application date._
- FAIL The answer says the dates may need to move if no alternative fits, and offers to queue repeated checks of the booking page.  
  _It neither recommends moving the travel dates if needed nor offers repeated booking-page checks._

## Delegate calls

1. `file-agent` -> completed: In the folder Personal/Travel, find PDF, JPG, JPEG, PNG and HEIC files whose names, tags or contents suggest a passport, visa, residence permit, residence card or national ID, including files tagged with a name starting with dossier. Search subfolders. Return each match with its real path, file type, tags and modified date. Do not open, move or change any file. If there are no matches, return an empty list and say so.
2. `document-agent` -> completed: From each of these passport, visa, residence permit or national ID files: Personal/Travel/Passport/passport-maria-reyes.pdf, Personal/Travel/Visas/us-visa-b1b2.pdf, Personal/Travel/Visas/schengen-visa-france-2025.pdf, Personal/Travel/UAE/residence-visa.pdf, return one record per document with these fields: document type, issuing country, holder surname, given names, nationality, date of birth, sex, place of birth, the last three characters of the document number, date of issue, date of expiry, issuing authority, and for visas the visa type, entries allowed, duration of stay and valid-from date. Compare the machine readable zone with the printed fields yourself and do not return the machine readable zone lines: say for each document whether the name, document number, date of birth, nationality and expiry in the zone agree with the printed page, and for each field that differs, which character positions differ and the two characters at each. Return a field as empty when it is not visible; never guess. Report each file you could not read.
3. `photo-agent` -> completed: Run text recognition on each of these images: Personal/Travel/Visas/japan-visa-2024.jpg, Personal/Travel/UAE/emirates-id-front-back.jpg, and return the full recognised text for each image, keeping the two or three machine readable zone lines at the bottom intact and in order. Report each image where no text was recognised.
4. `file-agent` -> completed: In the folder Personal/Travel, find PDF and image files whose names, tags or contents suggest a birth certificate, marriage certificate, degree certificate, transcript, CV, employment letter, employment contract, payslip, bank statement, tax return, business registration, police clearance, medical certificate, health or travel insurance, tenancy contract, flight booking, accommodation booking or invitation letter. Search subfolders. Return each match with its real path, file type, tags and modified date. Do not open, move or change any file. If there are no matches, return an empty list and say so.
5. `document-agent` -> completed: For each of these files: Personal/Travel/Supporting/birth-certificate-psa.pdf, Personal/Travel/Supporting/degree-bs-computer-science.pdf, Personal/Travel/Supporting/employment-letter-2026-10.pdf, Personal/Travel/Supporting/payslips-2026-08-to-10.pdf, Personal/Travel/Supporting/police-clearance-uae.pdf, Personal/Travel/Supporting/health-insurance-daman.pdf, Personal/Travel/Bookings/flight-dxb-lis-2027-03.pdf, Personal/Travel/Housing/lisbon-listing-screenshot.png, return one record per document. Set the document type to one of: birth-certificate, marriage-certificate, degree-certificate, transcript, cv, employment-letter, employment-contract, payslips, bank-statements, tax-return, business-registration, sponsor-letter, invitation-letter, police-clearance, medical-certificate, health-insurance, travel-insurance, flight-booking, accommodation-proof, tenancy-contract, proof-of-income, or other with the title as printed. Always return the holder or person names as printed, the issuing body, the issue date, any expiry or validity dates, and whether an apostille, attestation or certified translation stamp is visible. Also return, when printed: dates and places of birth or marriage and registry numbers for certificates; institution, degree, field and award date for degrees and transcripts; employer, job title, start date, salary and currency for employment documents and payslips; bank, currency, period start and end, opening and closing balance for bank statements; cover period, territory and cover amount for insurance; names, addresses, dates, rent and deposit for tenancy contracts and bookings. For any account, booking or registry number return only its last three characters. Return a field as empty when it is not printed; never guess. Report each file you could not read.
6. `document-agent` -> completed: Return the full text of the file Personal/Travel/Requests/entry-jp-ae-ph-2026-11-14.answer.md exactly as written. If the file does not exist, say only that it does not exist. Do not change any file.
7. `file-agent` -> completed: Create the folder Personal/Travel/Requests, with its parent folders, if it does not exist, and create in it a new text file named visas-jp-ae-ph-2026-11-14.request.md containing exactly this one line: question: As of today, requirements, fee, current processing time, documents, application location and booking method for a Philippine ordinary passport holder resident in the UAE visiting Japan for tourism from 2027-04-01 through 2027-04-11; alternatives when the Dubai Japan visa centre has no appointments, including other consulates or accredited visa centres, online application, and requests for an earlier appointment; how to handle a previous Japanese temporary visitor visa that omitted the passport middle name; whether that expired visa affects a new application · topic: visas · countries: JP,AE · nationality: PH · residence: United Arab Emirates residence permit valid to 2028-01-14 · held: Japan temporary visitor visa expired 2025-01-28 · dates: 2027-04-01 to 2027-04-11 · purpose: tourism. Do not overwrite an existing file and do not change any other file. Return the saved file path.
8. `photo-agent` -> completed: Run text recognition on each of these images: Personal/Travel/Housing/lisbon-listing-screenshot.png, Personal/Travel/Scans/IMG_2291.jpg, and return the full recognised text for each image, keeping the two or three machine readable zone lines at the bottom intact and in order. Report each image where no text was recognised.
9. `document-agent` -> completed: Return the full text of the file Personal/Travel/Requests/visas-jp-ae-ph-2026-11-14.answer.md exactly as written. If the file does not exist, say only that it does not exist. Do not change any file.
10. `document-agent` -> completed: Return the full text of the file Personal/Travel/Requests/visas-jp-ae-ph-2026-11-14.answer.md exactly as written. If the file does not exist, say only that it does not exist. Do not change any file.
11. `knowledge-agent` -> completed: Search only the folders Personal/Travel/Requests and Personal/Travel/Official pages for this question: Japan short-stay tourism visa requirements and processing timing for a Philippine passport holder resident in the UAE travelling 2027-04-01 to 2027-04-11; alternatives when no Dubai visa-centre appointments are available, how to request an earlier appointment, and handling a prior Japan visa with an omitted middle name. Return passages that answer it, each with the file path, page address and fetched or saved date written in that file. Return an empty result when nothing there answers it; do not use any other folder or general knowledge.

**Model in replies:** codex/gpt-6-luna. **Credential source:** none.

## References read

- SKILL.md
- references/workflows/plan.md
- references/topics/entry-conditions.md
- references/research.md
- references/prepare.md
- references/topics/special-cases.md
- references/official-sources.md
- references/official-sources.md

## Answer

Your **passport itself looks fine for these dates**: it expires 15 March 2031. It would also be valid past 1 October 2027 (six months after a 1 April arrival) and 11 July 2027 (three months after an assumed 11 April return). I couldn’t confirm which validity rule Japan applies, though.

Your saved Japan visitor visa expired on **28 January 2025**, so it won’t cover this trip. It also omits **SANTOS**, which appears as your middle name in your passport. Use the passport’s name for a new application, and ask the visa office how they want the middle name entered and whether the old visa’s name difference needs explanation. Your birth certificate has your full name.

I can’t see appointment availability. The live official research returned no Japan or UAE guidance, so I can’t verify whether another application centre, an online route, or an earlier appointment request is available, or calculate the latest safe application date. A late March appointment could leave very little time before you fly; don’t rely on it without confirming the processing time with the official office.

I created a Japan visa research request in `Personal/Travel/Requests`. To check the alternatives and timing, please save these official Japan pages as PDFs in `Personal/Travel/Official pages`:

- [Japan Ministry of Foreign Affairs: Visa information](https://www.mofa.go.jp/j_info/visit/visa/index.html)
- [Japan Ministry of Foreign Affairs: Visa procedures](https://www.mofa.go.jp/j_info/visit/visa/procedure/pagewe_000001_00391.html)
- [Japan Ministry of Foreign Affairs: Visa exemption arrangements](https://www.mofa.go.jp/ca/fna/pagewe_000001_00046.html)

The pages weren’t reachable in the live check on **14 November 2026**. In the meantime, contact the official visa office to ask about cancellations, urgent appointments, or any other authorized application location for UAE residents; these are questions to check, not options I’ve verified.

Please tell me when the PDFs are saved, and confirm your return date—is it **10 or 11 April 2027**?
