# no-companion

**Household:** maria (medium passport)

**Request:** Can I visit Japan from 1 to 10 April 2027? My documents are in Personal/Travel.

## Checks

- PASS no full document numbers
- PASS only NAS agents as targets
- PASS instructions are one plain line
- PASS no delete, move or send requests
- PASS called document-agent
- PASS called knowledge-agent
- PASS answer matches /Japan/
- PASS answer matches /Official pages|save (it|them|each page)? as (a )?PDF/
- PASS answer avoids /15,000|JPY|five working days/

## Rubric

- PASS The answer still reports what the documents show, such as her passport expiry in 2031 and that her 2024 Japanese visa expired on 2025-01-28.  
  _It reports the passport’s March 2031 expiry and the Japanese visa’s 28 January 2025 expiry._
- PASS The answer does not state a Japanese entry rule, fee or waiting time, and says the rules could not be checked yet.  
  _It states that Japan’s rules, fees, and requirements remain unchecked without asserting a Japanese entry rule, fee, or waiting time._
- PASS The answer gives official Japanese pages and asks her to save them as PDFs into a folder on the NAS so it can read them, or offers the companion.  
  _It links official Japanese Ministry of Foreign Affairs pages and asks the user to save them as PDFs in `Personal/Travel/Official pages`._

## Delegate calls

1. `file-agent` -> completed: In the folder Personal/Travel, find PDF, JPG, JPEG, PNG and HEIC files whose names, tags or contents suggest a passport, visa, residence permit, residence card or national ID, including files tagged with a name starting with dossier. Search subfolders. Return each match with its real path, file type, tags and modified date. Do not open, move or change any file. If there are no matches, return an empty list and say so.
2. `document-agent` -> completed: From each of these passport, visa, residence permit or national ID files: Personal/Travel/Passport/passport-maria-reyes.pdf, Personal/Travel/Visas/us-visa-b1b2.pdf, Personal/Travel/Visas/schengen-visa-france-2025.pdf, Personal/Travel/UAE/residence-visa.pdf, extract one record per document with these fields: document type, issuing country, holder surname, given names, nationality, date of birth, sex, place of birth, the last three characters of the document number, date of issue, date of expiry, issuing authority, and for visas the visa type, entries allowed, duration of stay and valid-from date. Compare the machine readable zone with the printed fields yourself and do not return the machine readable zone lines: say for each document whether the name, document number, date of birth, nationality and expiry in the zone agree with the printed page, and for each field that differs, which character positions differ and the two characters at each. Return a field as empty when it is not visible; never guess. Report each file you could not read.
3. `photo-agent` -> completed: Run text recognition on each of these images: Personal/Travel/Visas/japan-visa-2024.jpg, Personal/Travel/UAE/emirates-id-front-back.jpg, and return the full recognised text for each image, keeping the two or three machine readable zone lines at the bottom intact and in order. Report each image where no text was recognised.
4. `file-agent` -> completed: In the folder Personal/Travel, find PDF and image files whose names, tags or contents suggest a birth certificate, marriage certificate, degree certificate, transcript, CV, employment letter, employment contract, payslip, bank statement, tax return, business registration, police clearance, medical certificate, health or travel insurance, tenancy contract, flight booking, accommodation booking or invitation letter. Search subfolders. Return each match with its real path, file type, tags and modified date. Do not open, move or change any file. If there are no matches, return an empty list and say so.
5. `document-agent` -> completed: For each of these files: Personal/Travel/Supporting/birth-certificate-psa.pdf, Personal/Travel/Supporting/degree-bs-computer-science.pdf, Personal/Travel/Supporting/employment-letter-2026-10.pdf, Personal/Travel/Supporting/payslips-2026-08-to-10.pdf, Personal/Travel/Supporting/police-clearance-uae.pdf, Personal/Travel/Supporting/health-insurance-daman.pdf, Personal/Travel/Supporting/passport-photo.jpg, Personal/Travel/Bookings/flight-dxb-lis-2027-03.pdf, Personal/Travel/Housing/lisbon-listing-screenshot.png, Personal/Travel/Scans/IMG_2291.jpg, return one record per document. Set the document type to one of: birth-certificate, marriage-certificate, degree-certificate, transcript, cv, employment-letter, employment-contract, payslips, bank-statements, tax-return, business-registration, sponsor-letter, invitation-letter, police-clearance, medical-certificate, health-insurance, travel-insurance, flight-booking, accommodation-proof, tenancy-contract, proof-of-income, or other with the title as printed. Always return the holder or person names as printed, the issuing body, the issue date, any expiry or validity dates, and whether an apostille, attestation or certified translation stamp is visible. Also return, when printed: dates and places of birth or marriage and registry numbers for certificates; institution, degree, field and award date for degrees and transcripts; employer, job title, start date, salary and currency for employment documents and payslips; bank, currency, period start and end, opening and closing balance for bank statements; cover period, territory and cover amount for insurance; names, addresses, dates, rent and deposit for tenancy contracts and bookings. For any account, booking or registry number return only its last three characters. Return a field as empty when it is not printed; never guess. Report each file you could not read.
6. `document-agent` -> completed: Return the full text of the file Personal/Travel/Requests/entry-jp-ph-2026-11-15.answer.md exactly as written. If the file does not exist, say only that it does not exist. Do not change any file.
7. `file-agent` -> completed: Create the folder Personal/Travel/Requests, with its parent folders, if it does not exist, and create in it a new text file named entry-jp-ph-2026-11-15.request.md containing exactly this one line: question: visit visa or visa-free entry, electronic travel authorization, e-visa or visa to apply for Japan for a Philippine passport holder living in the UAE, fee, waiting time, documents, passport validity, and a visa or booking whose name omits the passport middle name · topic: entry · countries: JP · nationality: PH · residence: United Arab Emirates residence permit · held: Japan temporary visitor visa expired 2025-01-28; US B1/B2 visa; France Schengen C visa expired 2025-10-01 · dates: 2027-04-01 to 2027-04-10 · purpose: tourism. Do not overwrite an existing file and do not change any other file. Return the saved file path.
8. `document-agent` -> completed: Return the full text of the file Personal/Travel/Requests/entry-jp-ph-2026-11-15.answer.md exactly as written. If the file does not exist, say only that it does not exist. Do not change any file.
9. `document-agent` -> completed: Return the full text of the file Personal/Travel/Requests/entry-jp-ph-2026-11-15.answer.md exactly as written. If the file does not exist, say only that it does not exist. Do not change any file.
10. `document-agent` -> completed: Return the full text of the file Personal/Travel/Requests/entry-jp-ph-2026-11-15.answer.md exactly as written. If the file does not exist, say only that it does not exist. Do not change any file.
11. `knowledge-agent` -> completed: Search only the folders Personal/Travel/Requests and Personal/Travel/Official pages for this question: current official Japan entry requirements for a Philippine passport holder living in the UAE, visiting 2027-04-01 to 2027-04-10 for tourism; visa or visa-free eligibility, fee, waiting time, required documents, passport validity and name mismatch from an omitted passport middle name. Return the passages that answer it, each with the file path, the page address and the fetched or saved date written in that file. Return an empty result when nothing there answers it; do not use any other folder or general knowledge.

**Model in replies:** codex/gpt-6-luna. **Credential source:** none.

## References read

- SKILL.md
- references/workflows/plan.md
- references/topics/entry-conditions.md
- references/research.md
- references/prepare.md
- references/topics/special-cases.md
- references/official-sources.md
- references/sources/j-n.md

## Answer

## Japan trip: 1–10 April 2027

**Status: Needs checking.** I can’t confirm whether you can enter Japan yet because the live rules request produced no answer after three checks, and no saved official guidance was found. Your existing Japan visa expired on **28 January 2025**, so it does not cover this trip.

Your Philippine passport, ending **96B**, expires **15 March 2031**. Its machine readable zone agrees with the printed page. It remains valid for the whole trip, and it also meets these date calculations:

- Six months after arrival, **1 October 2027**: met.
- Three months after departure, **10 July 2027**: met.

Japan’s specific passport validity rule still needs confirmation. Your UAE residence permit is valid through 14 January 2028. The US visa is valid through 1 June 2030; the France Schengen visa expired 1 October 2025.

The names and birth dates on your passport, visas, residence permit, Emirates ID and the saved flight booking match in the fields checked. The flight booking on file is **Dubai to Lisbon on 10 March 2027**; I found no Japan flight or accommodation booking. Your saved health insurance covers the UAE only and ends 31 January 2027. Fees, required documents and proof of funds for a Japan visit remain unchecked.

## What to do next

Please open these official Japanese Ministry of Foreign Affairs pages, save each as a PDF, and put them in `Personal/Travel/Official pages`:

- [Visa information](https://www.mofa.go.jp/j_info/visit/visa/index.html)
- [Visa procedures](https://www.mofa.go.jp/j_info/visit/visa/procedure/pagewe_000001_00391.html)
- [Visa exemption information](https://www.mofa.go.jp/ca/fna/pagewe_000001_00046.html)

You can use **Print → Save as PDF**. When you tell me they’re saved, I’ll read them and finish checking your eligibility. The research request is saved at `Personal/Travel/Requests/entry-jp-ph-2026-11-15.request.md`.

**Done on the NAS:** The travel documents and available supporting documents were read, and the Japan rules request was saved. I haven’t prepared a trip folder because you asked whether you can go; I can prepare it once the entry requirements are checked.

Rules can change, so confirm them on the official pages before applying, paying, booking or travelling.
