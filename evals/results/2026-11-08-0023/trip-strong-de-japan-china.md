# trip-strong-de-japan-china

**Household:** strong-de (strong passport)

**Request:** I fly Berlin to Tokyo on 10 April 2027, Tokyo to Shanghai on 21 April for three days, then home to Berlin on 24 April. My documents are in Personal/Travel. Sort out what I need to do.

## Checks

- FAIL stayed within the model's context window (API Error: 400 request (33005 tokens) exceeds the available context size (32768 tokens), try increasing it)

## Rubric

- FAIL The answer does not tell her she must apply for a Japanese visa, and any statement that German citizens are visa-exempt in Japan is either taken from the bundled data or marked as needing confirmation on the official Japanese page.  
  _no answer: context window exceeded_
- FAIL For China, the answer uses the 30-day unilateral visa-free entry or the 240-hour visa-free transit, both of which list Germany, and keeps their conditions (designated ports or areas for transit, an onward ticket to a third country).  
  _no answer: context window exceeded_
- FAIL The answer notes that the 30-day waiver is described as running to 31 December 2026, before her April 2027 trip, so it must be checked again, and names the 240-hour transit (Japan to China to Germany) as the fallback, or otherwise flags that the China rule is marked partial and needs confirming.  
  _no answer: context window exceeded_
- FAIL The answer checks the passport against the trip dates and finds it valid (expires 2032).  
  _no answer: context window exceeded_
- FAIL The answer includes a dated checklist of what to do before 10 April 2027, and does not invent fees for Japan or China.  
  _no answer: context window exceeded_

## Delegate calls

1. `file-agent` -> completed: In the Personal/Travel folder, find PDF, JPG, JPEG, PNG and HEIC files whose names, tags or contents suggest a passport, visa, residence permit, residence card or national ID, including files tagged with a name starting with dossier. Search subfolders. Return each match with its real path, file type, tags and modified date. Do not open, move or change any file. If there are no matches, return an empty list and say so.
2. `document-agent` -> waiting_user: From each passport, visa, residence permit or national ID file path given, extract one record per document with these fields: document type, issuing country, holder surname, given names, nationality, date of birth, sex, place of birth, document number, date of issue, date of expiry, issuing authority, and for visas the visa type, entries allowed, duration of stay and valid-from date. Also extract the machine readable zone lines exactly as printed, and say for each document whether the name, document number, date of birth, nationality and expiry in the machine readable zone agree with the printed fields. Return a field as empty when it is not visible; never guess. Report each file you could not read.
3. `document-agent` -> completed: From the file path Personal/Travel/Passport/reisepass-lena.pdf, extract one record with these fields: document type, issuing country, holder surname, given names, nationality, date of birth, sex, place of birth, document number, date of issue, date of expiry, issuing authority, and for visas the visa type, entries allowed, duration of stay and valid-from date. Also extract the machine readable zone lines exactly as printed, and say for each document whether the name, document number, date of birth, nationality and expiry in the machine readable zone agree with the printed fields. Return a field as empty when it is not visible; never guess. Report each file you could not read.
4. `file-agent` -> completed: In the Personal/Travel folder, find PDF and image files whose names, tags or contents suggest a birth certificate, marriage certificate, degree certificate, transcript, CV, employment letter, employment contract, payslip, bank statement, tax return, business registration, police clearance, medical certificate, health or travel insurance, tenancy contract, flight booking, accommodation booking or invitation letter. Search subfolders. Return each match with its real path, file type, tags and modified date. Do not open, move or change any file. If there are no matches, return an empty list and say so.
5. `document-agent` -> waiting_user: For each file path given, return one record per document. Set the document type to one of: birth-certificate, marriage-certificate, degree-certificate, transcript, cv, employment-letter, employment-contract, payslips, bank-statements, tax-return, business-registration, sponsor-letter, invitation-letter, police-clearance, medical-certificate, health-insurance, travel-insurance, flight-booking, accommodation-proof, tenancy-contract, proof-of-income, or other with the title as printed. Always return the holder or person names as printed, the issuing body, the issue date, any expiry or validity dates, and whether an apostille, attestation or certified translation stamp is visible. Also return, when printed: dates and places of birth or marriage and registry numbers for certificates; institution, degree, field and award date for degrees and transcripts; employer, job title, start date, salary and currency for employment documents and payslips; bank, currency, period start and end, opening and closing balance for bank statements; cover period, territory and cover amount for insurance; names, addresses, dates, rent and deposit for tenancy contracts and bookings. For any account, booking or registry number return only its last three characters. Return a field as empty when it is not printed; never guess. Report each file you could not read.
6. `document-agent` -> completed: For the file paths Personal/Travel/Bookings/flights-ber-nrt-pvg-2027-04.pdf, Personal/Travel/Supporting/reiseversicherung-2027.pdf, and Personal/Travel/Supporting/arbeitgeber-bescheinigung-2026.pdf, return one record per document. Set the document type to one of: birth-certificate, marriage-certificate, degree-certificate, transcript, cv, employment-letter, employment-contract, payslips, bank-statements, tax-return, business-registration, sponsor-letter, invitation-letter, police-clearance, medical-certificate, health-insurance, travel-insurance, flight-booking, accommodation-proof, tenancy-contract, proof-of-income, or other with the title as printed. Always return the holder or person names as printed, the issuing body, the issue date, any expiry or validity dates, and whether an apostille, attestation or certified translation stamp is visible. Also return, when printed: dates and places of birth or marriage and registry numbers for certificates; institution, degree, field and award date for degrees and transcripts; employer, job title, start date, salary and currency for employment documents and payslips; bank, currency, period start and end, opening and closing balance for bank statements; cover period, territory and cover amount for insurance; names, addresses, dates, rent and deposit for tenancy contracts and bookings. For any account, booking or registry number return only its last three characters. Return a field as empty when it is not printed; never guess. Report each file you could not read.

## References read

- SKILL.md
- references/workflows/plan.md
- references/countries/jp.md
- references/benefits/index.md
- references/countries/cn.md
- references/options/index.md

## Answer

API Error: 400 request (33005 tokens) exceeds the available context size (32768 tokens), try increasing it
