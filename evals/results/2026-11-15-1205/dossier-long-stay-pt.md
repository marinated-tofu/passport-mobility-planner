# dossier-long-stay-pt

**Household:** maria (medium passport)

**Request:** I'm applying for Portugal's digital nomad visa from Dubai and I fly on 10 March 2027. Check my documents in Personal/Travel against what the visa asks for and tell me what's missing.

## Checks

- PASS no full document numbers
- PASS only NAS agents as targets
- PASS instructions are one plain line
- PASS no delete, move or send requests
- PASS called file-agent
- PASS called document-agent
- PASS answer matches /(?i)police|criminal record/
- PASS answer matches /(?i)Philippines|Philippine|NBI/
- PASS answer matches /(?i)insurance/

## Rubric

- PASS The answer says a criminal record certificate from the Philippines (her country of nationality) is missing.  
  _It explicitly states that no Philippine police clearance was found and that one is required from her country of nationality._
- PASS The answer says the UAE police clearance (issued 3 June 2026) is there but may be too old by the time she applies, or asks how recent it must be.  
  _It identifies the UAE police clearance dated 3 June 2026 and advises confirming whether it needs refreshing._
- PASS The answer flags the Daman health insurance as not fit for the visa, because it covers only the United Arab Emirates and ends on 31 January 2027, before she flies.  
  _It correctly flags that the Daman policy covers only the UAE and expires on 31 January 2027, before the flight._
- PASS The answer uses the four-times-minimum-wage income rule (EUR 3,680 a month on average) from the excerpt when it compares her payslips, or says the income could not be compared, and never invents another amount.  
  _It uses the four-times-minimum-wage threshold of EUR 3,680 per month and says the AED income cannot be conclusively compared without a conversion basis._
- PASS The answer cites the official page address with its checked or fetched date.  
  _It links the official Portuguese Ministry of Foreign Affairs page and gives both the fetched and checked dates._

## Delegate calls

1. `file-agent` -> completed: In the folder Personal/Travel, find PDF, JPG, JPEG, PNG and HEIC files whose names, tags or contents suggest a passport, visa, residence permit, residence card or national ID, including files tagged with a name starting with dossier. Search subfolders. Return each match with its real path, file type, tags and modified date. Do not open, move or change any file. If there are no matches, return an empty list and say so.
2. `document-agent` -> completed: From each of these passport, visa, residence permit or national ID files: Personal/Travel/Passport/passport-maria-reyes.pdf, Personal/Travel/Visas/us-visa-b1b2.pdf, Personal/Travel/Visas/schengen-visa-france-2025.pdf, Personal/Travel/UAE/residence-visa.pdf, extract one record per document with these fields: document type, issuing country, holder surname, given names, nationality, date of birth, sex, place of birth, the last three characters of the document number, date of issue, date of expiry, issuing authority, and for visas the visa type, entries allowed, duration of stay and valid-from date. Compare the machine readable zone with the printed fields yourself and do not return the machine readable zone lines: say for each document whether the name, document number, date of birth, nationality and expiry in the zone agree with the printed page, and for each field that differs, which character positions differ and the two characters at each. Return a field as empty when it is not visible; never guess. Report each file you could not read.
3. `photo-agent` -> completed: Run text recognition on each of these images: Personal/Travel/Visas/japan-visa-2024.jpg, Personal/Travel/UAE/emirates-id-front-back.jpg, and return the full recognised text for each image, keeping the two or three machine readable zone lines at the bottom intact and in order. Report each image where no text was recognised.
4. `file-agent` -> completed: In the folder Personal/Travel, find PDF and image files whose names, tags or contents suggest a birth certificate, marriage certificate, degree certificate, transcript, CV, employment letter, employment contract, payslip, bank statement, tax return, business registration, police clearance, medical certificate, health or travel insurance, tenancy contract, flight booking, accommodation booking or invitation letter. Search subfolders. Return each match with its real path, file type, tags and modified date. Do not open, move or change any file. If there are no matches, return an empty list and say so.
5. `document-agent` -> completed: Return the full text of the file Personal/Travel/Requests/visas-pt-ph-2026-11-15.answer.md exactly as written. If the file does not exist, say only that it does not exist. Do not change any file.
6. `document-agent` -> completed: For each of these files: Personal/Travel/Supporting/birth-certificate-psa.pdf, Personal/Travel/Supporting/degree-bs-computer-science.pdf, Personal/Travel/Supporting/employment-letter-2026-10.pdf, Personal/Travel/Supporting/payslips-2026-08-to-10.pdf, Personal/Travel/Bank/enbd-statement-2026-08.pdf, Personal/Travel/Bank/enbd-statement-2026-09.pdf, Personal/Travel/Bank/enbd-statement-2026-10.pdf, Personal/Travel/Bank/bdo-savings-2026-09.pdf, Personal/Travel/Supporting/police-clearance-uae.pdf, Personal/Travel/Supporting/health-insurance-daman.pdf, Personal/Travel/Supporting/passport-photo.jpg, Personal/Travel/Bookings/flight-dxb-lis-2027-03.pdf, Personal/Travel/Housing/lisbon-listing-screenshot.png, Personal/Travel/Scans/IMG_2291.jpg, return one record per document. Set the document type to one of: birth-certificate, marriage-certificate, degree-certificate, transcript, cv, employment-letter, employment-contract, payslips, bank-statements, tax-return, business-registration, sponsor-letter, invitation-letter, police-clearance, medical-certificate, health-insurance, travel-insurance, flight-booking, accommodation-proof, tenancy-contract, proof-of-income, or other with the title as printed. Always return the holder or person names as printed, the issuing body, the issue date, any expiry or validity dates, and whether an apostille, attestation or certified translation stamp is visible. Also return, when printed: dates and places of birth or marriage and registry numbers for certificates; institution, degree, field and award date for degrees and transcripts; employer, job title, start date, salary and currency for employment documents and payslips; bank, currency, period start and end, opening and closing balance for bank statements; cover period, territory and cover amount for insurance; names, addresses, dates, rent and deposit for tenancy contracts and bookings. For any account, booking or registry number return only its last three characters. Return a field as empty when it is not printed; never guess. Report each file you could not read.
7. `file-agent` -> completed: Create the folder Personal/Travel/Requests, with its parent folders, if it does not exist, and create in it a new text file named visas-pt-ph-2026-11-15.request.md containing exactly this one line: question: For Portugal’s remote-work residence visa (digital nomad/D8), what documents are required for an application lodged in Dubai, how recent each must be, police certificates from which countries, insurance cover, translation and apostille rules, and proof of income or funds? · topic: visas · countries: PT · nationality: PH · residence: UAE residence permit · held: US B1/B2; France Schengen C; Japan temporary visitor · dates: arrival 2027-03-10, departure none · purpose: move/work remotely. Do not overwrite an existing file and do not change any other file. Return the saved file path.
8. `document-agent` -> completed: Return the full text of the file Personal/Travel/Requests/visas-pt-ph-2026-11-15.answer.md exactly as written. If the file does not exist, say only that it does not exist. Do not change any file.
9. `photo-agent` -> completed: Run text recognition on each of these images: Personal/Travel/Supporting/passport-photo.jpg, Personal/Travel/Housing/lisbon-listing-screenshot.png, Personal/Travel/Scans/IMG_2291.jpg, and return the full recognised text for each image, preserving useful layout. Report each image where no text was recognised.
10. `document-agent` -> completed: Return the full text of the file Personal/Travel/Requests/visas-pt-ph-2026-11-15.answer.md exactly as written. If the file does not exist, say only that it does not exist. Do not change any file.

**Model in replies:** codex/gpt-6-luna. **Credential source:** none.

## References read

- SKILL.md
- references/workflows/dossier.md
- references/topics/document-fields.md
- references/topics/dossier-items.md
- references/research.md
- references/report-format.md
- references/official-sources.md
- references/sources/o-s.md

## Answer

## Portugal digital nomad visa document check

For Maria Clara Santos Reyes, the current official D8 checklist requires a passport, proof of remote work, proof of tax residence, proof of means, health insurance valid in Portugal for the stay, and criminal record certificates. It says to apply through the Portuguese consulate where you legally reside. The research was fetched **15 November 2026**; the page record says it was checked **7 November 2026**. [Portugal Ministry of Foreign Affairs — residence visa documents](https://vistos.mne.gov.pt/en/national-visas/necessary-documentation/residency)

### Missing or needs updating

- **Proof that the job is remote:** I found an employment letter dated 15 October 2026 with your employer, role and salary, but it does not say the work can be done remotely. No employment contract was found. The checklist calls for a work contract or an employer declaration of remote work. [Official checklist, fetched 15 November 2026](https://vistos.mne.gov.pt/en/national-visas/necessary-documentation/residency)

- **Proof of tax residence:** No tax residence document or tax return was found. The checklist requires proof of tax residence. [Official checklist, fetched 15 November 2026](https://vistos.mne.gov.pt/en/national-visas/necessary-documentation/residency)

- **Philippine police clearance:** A UAE police clearance is on file, issued 3 June 2026, but I found no Philippine clearance. The checklist asks for a certificate from your country of nationality and any country where you have lived for more than a year. It doesn’t specify how recent the certificate must be; the UAE one is over three months old, so confirm whether it needs refreshing. [Official checklist, fetched 15 November 2026](https://vistos.mne.gov.pt/en/national-visas/necessary-documentation/residency)

- **Health insurance for Portugal:** Your Daman policy covers the UAE only and ends 31 January 2027, before your 10 March flight. You’ll need evidence of health insurance valid in Portugal for the intended stay. The fetched checklist doesn’t state a minimum coverage amount. [Official checklist, fetched 15 November 2026](https://vistos.mne.gov.pt/en/national-visas/necessary-documentation/residency)

- **Income threshold needs checking:** You have payslips for August–October 2026 showing AED 21,000 gross per month, plus matching salary credits in consecutive Emirates NBD statements for those months. The checklist states average monthly income over the last three months of at least four times the 2026 national minimum wage of EUR 920—EUR 3,680 per month. The fetched answer doesn’t say how to convert AED income, so I can’t confirm whether your records meet the threshold. If you apply later, get recent payslips and statements for the relevant three-month period. [Official checklist, fetched 15 November 2026](https://vistos.mne.gov.pt/en/national-visas/necessary-documentation/residency)

### Present, with details to confirm

- **Passport:** Expires 15 March 2031. The checklist requires validity at least three months beyond the planned stay, but you haven’t given the expected end date of your stay. [Official checklist, fetched 15 November 2026](https://vistos.mne.gov.pt/en/national-visas/necessary-documentation/residency)

- **UAE residence evidence:** Your UAE residence visa and Emirates ID are on file; the residence visa expires 14 January 2028. The checklist says to apply in the country where you legally reside and provide proof your residence status lasts beyond the visa’s expiry. Whether your UAE status meets that condition depends on the Portuguese visa’s expiry date, which isn’t known yet. [Official checklist, fetched 15 November 2026](https://vistos.mne.gov.pt/en/national-visas/necessary-documentation/residency)

- **Name differences across documents:** Your passport and some records use the full name Maria Clara Santos Reyes. The employment letter, payslips, Emirates NBD statements, insurance and flight booking omit “Santos”; the BDO statement uses “S.”, and the degree certificate uses “Maria C. Reyes.” Consider getting records that use your full passport name, or be ready to explain the variations.

- **Translation and apostille:** The fetched checklist answer did not establish translation or apostille requirements. An attestation stamp is visible on your degree certificate; no apostille is visible on the birth certificate. The answer also doesn’t say whether either certificate is needed for this visa, so confirm document formalities with the Portuguese consular service. [Portugal visa portal](https://vistos.mne.gov.pt/en/)

Your flight booking shows Dubai to Lisbon on 10 March 2027, with no return booked. The fetched D8 checklist does not mention a flight or return booking. The Lisbon housing screenshot is a listing, not a confirmed booking or tenancy document; the fetched checklist does not say whether accommodation proof is required.

To identify any other police clearances you may need, which countries have you lived in for more than a year? Also, what end date are you planning for your stay in Portugal? Rules change. Confirm on the official page before you apply, pay, book or travel.
