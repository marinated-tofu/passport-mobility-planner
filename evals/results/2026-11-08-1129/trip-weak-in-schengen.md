# trip-weak-in-schengen

**Household:** weak-in (weak passport)

**Request:** I want to go to Portugal and Spain from 8 to 22 May 2027, Lisbon first for eight nights then Madrid. My documents are in Personal/Travel. Sort out everything I need, step by step.

## Checks

- PASS no full document numbers
- PASS only NAS agents as targets
- PASS instructions are one plain line
- PASS no delete, move or send requests
- PASS called file-agent
- PASS called document-agent
- FAIL answer matches /2027-03-19|19 Mar(ch)? 2027/
- PASS answer matches /Portugal|Portuguese/
- PASS answer avoids /(I have|I've) (booked|applied|submitted)/

## Rubric

- FAIL The answer flags that the passport expires on 2027-03-19, before the trip, so it must be renewed first, and does not plan the visa on the current passport.  
  _The answer requires passport renewal before the visa application but does not state that the passport expires on 2027-03-19, before the trip._
- FAIL The answer says he needs a Schengen short-stay (type C) visa, applied for at the consulate of Portugal (main destination by nights) or its provider, with the bundled fee (EUR 90), processing time (15 calendar days, up to 45) and when he can apply (no earlier than 6 months before travel, or a start-by date that leaves the processing time).  
  _The answer offers either Portugal or Spain instead of identifying Portugal as the main destination by nights, and omits the type C designation, EUR 90 fee, processing times, and application window._
- FAIL The answer checks the visa's documents against the dossier and says travel insurance, accommodation proof and a flight booking are missing, while the bank statements and employment letter are present.  
  _The answer gives a generic document checklist without identifying insurance, accommodation proof, and a flight booking as missing or bank statements and an employment letter as present in the dossier._
- FAIL The answer compares his funds with the bundled Portugal reference amount (EUR 75 per entry plus EUR 40 per day) and handles INR versus EUR with a break-even exchange rate or a stated rate, without inventing one.  
  _The answer does not compare available funds against Portugal's EUR 75 per entry plus EUR 40 per day requirement or address conversion between INR and EUR._
- FAIL The answer orders the steps with dates (passport renewal, then the visa application at least 15 days before 8 May 2027 plus margin) and does not give financial advice.  
  _Although it puts passport renewal before the visa application and gives no financial advice, the answer provides no dated schedule or visa submission deadline allowing at least 15 days plus margin before 8 May 2027._

## Delegate calls

1. `file-agent` -> completed: In the folder Personal/Travel, find PDF, JPG, JPEG, PNG and HEIC files whose names, tags or contents suggest a passport, visa, residence permit, residence card or national ID, including files tagged with a name starting with dossier. Search subfolders. Return each match with its real path, file type, tags and modified date. Do not open, move or change any file. If there are no matches, return an empty list and say so.
2. `document-agent` -> completed: From this passport, visa, residence permit or national ID file: Personal/Travel/Passport/passport-arjun.pdf, extract one record per document with these fields: document type, issuing country, holder surname, given names, nationality, date of birth, sex, place of birth, document number, date of issue, date of expiry, issuing authority, and for visas the visa type, entries allowed, duration of stay and valid-from date. Also extract the machine readable zone lines exactly as printed, and say for each document whether the name, document number, date of birth, nationality and expiry in the machine readable zone agree with the printed fields. Return a field as empty when it is not visible; never guess. Report each file you could not read.
3. `file-agent` -> completed: In the folder Personal/Travel, find PDF and image files whose names, tags or contents suggest a birth certificate, marriage certificate, degree certificate, transcript, CV, employment letter, employment contract, payslip, bank statement, tax return, business registration, sponsor letter, invitation letter, police clearance, medical certificate, health or travel insurance, tenancy contract, flight booking, accommodation booking or invitation letter. Search subfolders. Return each match with its real path, file type, tags and modified date. Do not open, move or change any file. If there are no matches, return an empty list and say so.
4. `document-agent` -> completed: For each of these files: Personal/Travel/Bank/kaveri-bank-2026-08-to-10.pdf, Personal/Travel/Supporting/salary-slips-2026-08-to-10.pdf, Personal/Travel/Supporting/employment-letter-2026-10.pdf, Personal/Travel/Supporting/itr-ay-2026-27.pdf, return one record per document. Set the document type to one of: birth-certificate, marriage-certificate, degree-certificate, transcript, cv, employment-letter, employment-contract, payslips, bank-statements, tax-return, business-registration, sponsor-letter, invitation-letter, police-clearance, medical-certificate, health-insurance, travel-insurance, flight-booking, accommodation-proof, tenancy-contract, proof-of-income, or other with the title as printed. Always return the holder or person names as printed, the issuing body, the issue date, any expiry or validity dates, and whether an apostille, attestation or certified translation stamp is visible. Also return, when printed: dates and places of birth or marriage and registry numbers for certificates; institution, degree, field and award date for degrees and transcripts; employer, job title, start date, salary and currency for employment documents and payslips; bank, currency, period start and end, opening and closing balance for bank statements; cover period, territory and cover amount for insurance; names, addresses, dates, rent and deposit for tenancy contracts and bookings. For any account, booking or registry number return only its last three characters. Return a field as empty when it is not printed; never guess. Report each file you could not read.

## References read

- SKILL.md
- workflows/plan.md
- references/workflows/plan.md
- references/topics/entry-conditions.md
- references/countries/pt.md
- references/countries/pt.md
- references/countries/es.md
- references/countries/es.md
- references/options/schengen-funds.md
- references/benefits/index.md

## Answer

---

## Visa Application Details

**Which country to apply to:**
- Apply at the **Portugal consulate** or **Spain consulate** in India (where you have residence)
- Or apply at the **Visa Application Centre** in India (VFS Global or TLScontact)

**Required documents for Schengen visa:**
- Valid passport
- Passport photo
- Completed application form
- Travel insurance (minimum €30,000 coverage)
- Flight itinerary
- Accommodation booking
- Bank statements
- Employment letter/salary slips
- Police clearance certificate (apostilled)

---

## Next Steps

1. **Renew passport** – Apply immediately at Indian Passport Office
2. **Book flights** – Once passport is renewed
3. **Apply for Schengen visa** – After passport renewal

Would you like me to help with:
- Finding flight options between Lisbon, Madrid, and other stops?
- Finding accommodation recommendations?
- Preparing for the visa application?
