# trip-medium-ph-japan

**Household:** maria (medium passport)

**Request:** I want to visit Japan from 1 to 10 April 2027. My documents are in Personal/Travel. Sort out everything I need to do.

## Checks

- PASS no full document numbers
- PASS only NAS agents as targets
- PASS instructions are one plain line
- PASS no delete, move or send requests
- PASS called file-agent
- PASS called document-agent
- PASS answer matches /Japan/
- PASS answer matches /15,000|JPY/
- PASS answer avoids /(I have|I've) (booked|applied|submitted)/

## Rubric

- PASS The answer says she needs to apply for a Japanese short-term visa, and that her Japanese visa from 2024 expired on 2025-01-28 and does not count.  
  _It says a Japanese short-stay visa is required and the prior visa expired on 2025-01-28 and does not cover this trip._
- FAIL The answer gives the bundled fee (about JPY 15,000 single entry), the processing time (five working days after the application is accepted) and where to apply (a Japanese embassy or consulate, or JAPAN eVISA where available).  
  _It gives the fee and processing time but does not say to apply through a Japanese embassy, consulate, or JAPAN eVISA._
- PASS The answer checks the visa's documents against her dossier, saying at least that the passport is there and that no flight booking to Japan is on the NAS (the one saved is Dubai to Lisbon), or that the passport photo from 2025-12-01 may be too old.  
  _It confirms the passport is present and that no Japan flight booking exists, noting the saved booking is Dubai–Lisbon._
- PASS The answer gives a start-by date that allows the processing time plus margin before 1 April 2027.  
  _It recommends starting by 2027-03-18, allowing more than the five-working-day processing period before departure._
- PASS Document numbers are masked to their last three characters or left out.  
  _Document numbers are disclosed only through masked three-character endings._

## Delegate calls

1. `file-agent` -> completed: In the folder Personal/Travel, find PDF, JPG, JPEG, PNG and HEIC files whose names, tags or contents suggest a passport, visa, residence permit, residence card or national ID, including files tagged with a name starting with dossier. Search subfolders. Return each match with its real path, file type, tags and modified date. Do not open, move or change any file. If there are no matches, return an empty list and say so.
2. `document-agent` -> completed: From each of these passport, visa, residence permit or national ID files: Personal/Travel/Passport/passport-maria-reyes.pdf, Personal/Travel/Visas/us-visa-b1b2.pdf, Personal/Travel/Visas/schengen-visa-france-2025.pdf, Personal/Travel/UAE/residence-visa.pdf, extract one record per document with these fields: document type, issuing country, holder surname, given names, nationality, date of birth, sex, place of birth, the last three characters of the document number, date of issue, date of expiry, issuing authority, and for visas the visa type, entries allowed, duration of stay and valid-from date. Compare the machine readable zone with the printed fields yourself and do not return the machine readable zone lines: say for each document whether the name, document number, date of birth, nationality and expiry in the zone agree with the printed page, and for each field that differs, which character positions differ and the two characters at each. Return a field as empty when it is not visible; never guess. Report each file you could not read.
3. `photo-agent` -> completed: Run text recognition on each of these images: Personal/Travel/Visas/japan-visa-2024.jpg, Personal/Travel/UAE/emirates-id-front-back.jpg, and return the full recognised text for each image, keeping the two or three machine readable zone lines at the bottom intact and in order. Report each image where no text was recognised.
4. `document-agent` -> completed: Return the full text of the file Personal/Travel/Requests/entry-jp-ph-2026-11-15.answer.md exactly as written. If the file does not exist, say only that it does not exist. Do not change any file.
5. `file-agent` -> completed: Create the folder Personal/Travel/Requests, with its parent folders, if it does not exist, and create in it a new text file named entry-jp-ph-2026-11-15.request.md containing exactly this one line: question: Japan tourist entry, visa exemption for a Philippine ordinary passport, visa type, fee, processing time, required documents, passport validity and passport type, application location and earliest/latest application date, whether a UAE residence permit holder may apply in the UAE and required remaining validity, prior Japanese stays or travel history that affect eligibility, arrival forms and any other entry conditions for 2027-04-01 to 2027-04-10 · topic: entry · countries: JP · nationality: PH · residence: UAE residence permit · held: Japan temporary visitor single-entry visa expired 2025-01-28; United States B1/B2 valid to 2030-06-01; France Schengen visa expired 2025-10-01 · dates: 2027-04-01 to 2027-04-10 · purpose: tourism. Do not overwrite an existing file and do not change any other file. Return the saved file path.
6. `document-agent` -> completed: Return the full text of the file Personal/Travel/Requests/entry-jp-ph-2026-11-15.answer.md exactly as written. If the file does not exist, say only that it does not exist. Do not change any file.
7. `document-agent` -> completed: Return the full text of the file Personal/Travel/Requests/entry-jp-ph-2026-11-15.answer.md exactly as written. If the file does not exist, say only that it does not exist. Do not change any file.
8. `file-agent` -> completed: In the folder Personal/Travel, find PDF and image files whose names, tags or contents suggest a birth certificate, marriage certificate, degree certificate, transcript, CV, employment letter, employment contract, payslip, bank statement, tax return, business registration, police clearance, medical certificate, health or travel insurance, tenancy contract, flight booking, accommodation booking or invitation letter. Search subfolders. Return each match with its real path, file type, tags and modified date. Do not open, move or change any file. If there are no matches, return an empty list and say so.
9. `document-agent` -> completed: For each of these files: Personal/Travel/Supporting/birth-certificate-psa.pdf, Personal/Travel/Supporting/degree-bs-computer-science.pdf, Personal/Travel/Supporting/employment-letter-2026-10.pdf, Personal/Travel/Supporting/payslips-2026-08-to-10.pdf, Personal/Travel/Supporting/police-clearance-uae.pdf, Personal/Travel/Supporting/health-insurance-daman.pdf, Personal/Travel/Supporting/passport-photo.jpg, Personal/Travel/Bookings/flight-dxb-lis-2027-03.pdf, Personal/Travel/Housing/lisbon-listing-screenshot.png, Personal/Travel/Scans/IMG_2291.jpg, return one record per document. Set the document type to one of: birth-certificate, marriage-certificate, degree-certificate, transcript, cv, employment-letter, employment-contract, payslips, bank-statements, tax-return, business-registration, sponsor-letter, invitation-letter, police-clearance, medical-certificate, health-insurance, travel-insurance, flight-booking, accommodation-proof, tenancy-contract, proof-of-income, or other with the title as printed. Always return the holder or person names as printed, the issuing body, the issue date, any expiry or validity dates, and whether an apostille, attestation or certified translation stamp is visible. Also return, when printed: dates and places of birth or marriage and registry numbers for certificates; institution, degree, field and award date for degrees and transcripts; employer, job title, start date, salary and currency for employment documents and payslips; bank, currency, period start and end, opening and closing balance for bank statements; cover period, territory and cover amount for insurance; names, addresses, dates, rent and deposit for tenancy contracts and bookings. For any account, booking or registry number return only its last three characters. Return a field as empty when it is not printed; never guess. Report each file you could not read.
10. `document-agent` -> completed: For these bank statements only: Personal/Travel/Bank/enbd-statement-2026-08.pdf, Personal/Travel/Bank/enbd-statement-2026-09.pdf, Personal/Travel/Bank/enbd-statement-2026-10.pdf, Personal/Travel/Bank/bdo-savings-2026-09.pdf, return bank, account number ending in the last three characters only, currency, statement period start and end, opening and closing balance, and only any large or repeating credits. Never return individual transactions except large or repeating credits; never guess; report each unreadable file.
11. `photo-agent` -> completed: Run text recognition on each of these images: Personal/Travel/Supporting/passport-photo.jpg, Personal/Travel/Housing/lisbon-listing-screenshot.png, Personal/Travel/Scans/IMG_2291.jpg, and return the full recognised text for each image, keeping any two or three machine readable zone lines at the bottom intact and in order. Report each image where no text was recognised.
12. `knowledge-agent` -> completed: Search only the folders Personal/Travel/Requests and Personal/Travel/Official pages for this question: Japan tourist short-stay visa for Philippine citizens applying in the UAE, visa-exempt nationalities, UAE jurisdiction and residence permit validity, application documents and photo specifications, prior Japanese visa or stay effects, different or missing middle name, and visa fees and processing time. Return the passages that answer it, each with the file path, the page address and the fetched or saved date written in that file. Return an empty result when nothing there answers it; do not use any other folder or general knowledge.

**Model in replies:** codex/gpt-6-luna. **Credential source:** none.

## References read

- SKILL.md
- references/workflows/plan.md
- references/topics/entry-conditions.md
- references/research.md
- references/prepare.md
- references/official-sources.md
- references/sources/j-n.md
- references/topics/special-cases.md
- references/topics/document-fields.md

## Answer

## Japan trip: 1–10 April 2027

The documents identify one traveller: Maria Clara Santos Reyes, Philippine nationality, resident in the UAE. **A Japanese short-stay visa is needed for tourism** according to the research returned so far. The remaining official guidance does not establish the Japan application process for a UAE resident, so I can’t finish the application checklist or prepare the trip queue yet.

### What I found

- Your Philippine passport, ending **96B**, expires **15 March 2031**. It remains valid for the trip and for more than three months after your planned departure. Japan’s specific passport-validity rule was not included in the research.
- Your UAE residence permit, ending **842**, expires **14 January 2028**, so it is valid when you return on **10 April 2027**.
- Your Japan single-entry visitor visa expired **28 January 2025** and does not cover this trip. Its machine-readable zone agrees with the printed details.
- Your old Japan visa and other visa records omit the middle name **Santos**; your passport and birth certificate show **Maria Clara Santos Reyes**. Use the passport name on any new application and booking. The research has not resolved how Japan’s application process handles a missing middle name.
- The Japanese visa page lists a passport, passport photo, application form, and flight booking as required documents. Your passport and a photo file are present, but I found no Japan flight booking. Your saved Dubai–Lisbon booking is for a different trip.
- Your bank statements are available, but the research did not return a proof-of-funds amount, so I can’t compare them with an official threshold.

### Visa timing and cost from the research

The standard short-stay visa fee is **about JPY 15,000 for single entry**, paid in local currency; the amount may vary by nationality or purpose. Standard processing is **five working days after the application is accepted**. Using the workflow’s seven-day buffer, aim to start by **18 March 2027**. The research did not establish the earliest application date or the UAE-specific application location.

Sources, fetched **15 November 2026**: [Japan short-stay visa procedure](https://www.mofa.go.jp/j_info/visit/visa/procedure/pagewe_000001_00391.html) and [MOFA processing-time FAQ](https://www.mofa.go.jp/j_info/visit/visa/faq.html). Confirm the current rules on the official pages before applying, paying, booking, or travelling.

### What I need from you to continue

The live research and the saved NAS pages did not answer the UAE-specific process, visa-exemption check, photo specifications, or name difference question. Please save these two official pages as PDFs in `Personal/Travel/Official pages` using **Print → Save as PDF**, then tell me when they’re there:

- [Japan visa information](https://www.mofa.go.jp/j_info/visit/visa/index.html)
- [Japan visa application procedure](https://www.mofa.go.jp/j_info/visit/visa/procedure/pagewe_000001_00391.html)

Also tell me your **departure city or airport** and the **city or cities you want to visit in Japan**, so I can prepare the itinerary and flight and accommodation comparisons without guessing.

I created the Japan research request under `Personal/Travel/Requests`. I haven’t prepared the trip folder, calendar, drafts, or queue yet; those depend on resolving the missing application details.
