# trip-strong-sg-uk-us

**Household:** strong-sg (strong passport)

**Request:** I'm doing London from 1 to 5 March 2027, then New York from 5 to 14 March, then flying home to Singapore. Documents are in Personal/Travel. What do I need to do, and in what order?

## Checks

- PASS no full document numbers
- PASS only NAS agents as targets
- PASS instructions are one plain line
- PASS no delete, move or send requests
- PASS called file-agent
- PASS called document-agent
- PASS answer matches /ETA/
- PASS answer matches /ESTA/
- PASS answer matches /2027-05-20|20 May 2027/
- PASS answer avoids /(I have|I've) (booked|applied|submitted)/

## Rubric

- FAIL The answer flags that the passport expires on 2027-05-20, about ten weeks after the trip, and shows which validity patterns it meets (valid for the whole stay) and which it fails (six months beyond arrival), without inventing which one each country applies.  
  _The answer gives the expiry date and compares whole-stay and six-month validity, but asserts that the UK applies the whole-stay rule and the US requires six months beyond departure without establishing those country-specific requirements._
- FAIL The answer recommends renewing the passport before applying for the UK ETA and the ESTA, because each is valid only until the passport expires (or is linked to the passport), so applying on the old one would mean applying again.  
  _It recommends renewal before both applications and explains the UK ETA’s passport link, but does not explain that ESTA is also tied to the passport or that applying on the old passport would require applying again._
- PASS The UK step names the UK ETA with its bundled fee (GBP 20) and timing (usually 1 working day, up to 3), and the US step names the ESTA with its bundled fee (USD 40.62); any claim that Singapore citizens qualify is sourced or marked to confirm.  
  _It names the UK ETA with GBP 20 and usually one working day, allowing up to three, and ESTA with USD 40.62, while marking Singapore-specific eligibility for confirmation._
- PASS The Frankfurt connection on the way home is mentioned, with transit rules either covered or marked as not covered by the bundled data.  
  _It identifies the Frankfurt connection on the return journey and explicitly states that Germany-specific airport-transit rules are not covered by the bundled data._
- FAIL The answer includes a dated order of steps, with the passport renewal first and both authorisations dated before 1 March 2027.  
  _It puts passport renewal first and dates the UK ETA start-by deadline as 19 February 2027, but provides no dated ESTA application step before 1 March 2027._

## Delegate calls

1. `file-agent` -> completed: In the folder Personal/Travel, find PDF, JPG, JPEG, PNG and HEIC files whose names, tags or contents suggest a passport, visa, residence permit, residence card or national ID, including files tagged with a name starting with dossier. Search subfolders. Return each match with its real path, file type, tags and modified date. Do not open, move or change any file. If there are no matches, return an empty list and say so.
2. `document-agent` -> completed: From each of these passport, visa, residence permit or national ID files: Personal/Travel/Passport/passport-tan-wei-ling.pdf, extract one record per document with these fields: document type, issuing country, holder surname, given names, nationality, date of birth, sex, place of birth, the last three characters of the document number, date of issue, date of expiry, issuing authority, and for visas the visa type, entries allowed, duration of stay and valid-from date. Compare the machine readable zone with the printed fields yourself and do not return the machine readable zone lines: say for each document whether the name, document number, date of birth, nationality and expiry in the zone agree with the printed page, and for each field that differs, which character positions differ and the two characters at each. Return a field as empty when it is not visible; never guess. Report each file you could not read.
3. `file-agent` -> completed: In the folder Personal/Travel, find PDF and image files whose names, tags or contents suggest a birth certificate, marriage certificate, degree certificate, transcript, CV, employment letter, employment contract, payslip, bank statement, tax return, business registration, police clearance, medical certificate, health or travel insurance, tenancy contract, flight booking, accommodation booking or invitation letter. Search subfolders. Return each match with its real path, file type, tags and modified date. Do not open, move or change any file. If there are no matches, return an empty list and say so.
4. `document-agent` -> completed: For each of these files: Personal/Travel/Bookings/sin-lhr-jfk-sin-2027-03.pdf, return one record per document. Set the document type to one of: birth-certificate, marriage-certificate, degree-certificate, transcript, cv, employment-letter, employment-contract, payslips, bank-statements, tax-return, business-registration, sponsor-letter, invitation-letter, police-clearance, medical-certificate, health-insurance, travel-insurance, flight-booking, accommodation-proof, tenancy-contract, proof-of-income, or other with the title as printed. Always return the holder or person names as printed, the issuing body, the issue date, any expiry or validity dates, and whether an apostille, attestation or certified translation stamp is visible. Also return, when printed: dates and places of birth or marriage and registry numbers for certificates; institution, degree, field and award date for degrees and transcripts; employer, job title, start date, salary and currency for employment documents and payslips; bank, currency, period start and end, opening and closing balance for bank statements; cover period, territory and cover amount for insurance; names, addresses, dates, rent and deposit for tenancy contracts and bookings. For any account, booking or registry number return only its last three characters. Return a field as empty when it is not printed; never guess. Report each file you could not read.
5. `document-agent` -> completed: For each of these files: Personal/Travel/Supporting/payslips-2026-08-to-10.pdf, return one record per document. Set the document type to one of: birth-certificate, marriage-certificate, degree-certificate, transcript, cv, employment-letter, employment-contract, payslips, bank-statements, tax-return, business-registration, sponsor-letter, invitation-letter, police-clearance, medical-certificate, health-insurance, travel-insurance, tenancy-contract, flight-booking, accommodation-proof, proof-of-income, or other with the title as printed. Always return the holder or person names as printed, the issuing body, the issue date, any expiry or validity dates, and whether an apostille, attestation or certified translation stamp is visible. Also return, when printed: dates and places of birth or marriage and registry numbers for certificates; institution, degree, field and award date for degrees and transcripts; employer, job title, start date, salary and currency for employment documents and payslips; bank, currency, period start and end, opening and closing balance for bank statements; cover period, territory and cover amount for insurance; names, addresses, dates, rent and deposit for tenancy contracts and bookings. For any account, booking or registry number return only its last three characters. Return a field as empty when it is not printed; never guess. Report each file you could not read.

**Model in replies:** gpt-5.6-luna. **Credential source:** none.

## References read

- SKILL.md
- references/workflows/plan.md
- references/topics/entry-conditions.md
- references/countries/gb.md
- references/countries/us.md
- references/countries/sg.md
- references/countries/schengen.md
- references/official-sources.md

## Answer

## Bottom line

You are not ready to travel on the current passport because it expires on 20 May 2027. The bundled U.S. rule requires the passport to remain valid for at least six months after the planned U.S. stay, which means validity through 14 September 2027. Renew the passport first, then apply for the travel authorisations.

The trip appears workable if the new passport and required authorisations are obtained in time.

## Documents found

- Singapore passport for Tan Wei Ling, ending **15K**, expiring **20 May 2027**. The machine-readable zone agrees with the printed details.
- Singapore Airlines booking, reference ending **8KD**:
  - Singapore–London, 1 March 2027
  - London–New York, 5 March 2027
  - New York–Singapore via Frankfurt, 14 March 2027
- Payslips for August–October 2026 from Marina Ledger Pte Ltd, showing gross pay of SGD 9,200 per month.

No visa, residence permit, bank statements, employment letter, accommodation booking, travel insurance, or passport photograph was found in `Personal/Travel`.

## Do this in order

1. **Renew the Singapore passport now.**

   The passport currently expires before both relevant six-month dates:

   - U.S. arrival, 5 March 2027 + six months: **5 September 2027** — not met.
   - Planned U.S. departure, 14 March 2027 + six months: **14 September 2027** — not met.

   The passport does cover the UK stay under the whole-stay test, since it remains valid after 5 March 2027, but that does not solve the U.S. requirement.

   The renewal process, fee and processing time are not in the bundled data. Confirm them with Singapore ICA: <https://www.ica.gov.sg/about-ica/news-and-publications>

2. **After receiving the new passport, confirm the U.S. entry route.**

   The bundled file does not include a passport matrix or a Singapore-specific statement confirming Visa Waiver Program eligibility. Therefore the ESTA route is a candidate, but should be confirmed on the official ESTA page.

   - If eligible for the Visa Waiver Program: apply for **ESTA** for tourism/transit, valid for visits of up to 90 days.
   - ESTA fee: **USD 40.62** for fiscal year 2027.
   - Processing time is not stated in the bundled data, so apply as soon as the new passport is issued rather than waiting for the departure date.
   - Official source: <https://www.cbp.gov/travel/international-visitors/esta/frequently-asked-questions-about-visa-waiver-program-vwp-and-electronic-system-travel> — checked 7 November 2026, partial.
   - Fee source: <https://www.federalregister.gov/d/2026-20185> — checked 7 November 2026.

   If ESTA is not available, apply for a **B1/B2 visitor visa** instead:

   - Fee: **USD 185**
   - DS-160, passport photograph and interview required
   - Evidence of trip purpose, ability to pay and intent to leave
   - Waiting time is not provided in the bundled data
   - Your payslips may help, but no bank statements or employment letter were found, and both are listed as required supporting documents in the bundled rule.

   Source: <https://common.usembassy.gov/en/b1-visa/> — checked 7 November 2026, partial.

3. **Apply for the UK ETA using the new passport.**

   The bundled UK route identifies an **ETA** as the appropriate authorisation for nationals who do not need a short-visit visa. The nationality-specific eligibility check for a Singapore passport is not included in the bundled data, so confirm that condition on GOV.UK before applying.

   - Purpose: tourism or transit, up to six months per visit
   - Fee: **GBP 20**
   - Usually decided within one working day; allow up to three working days
   - Apply online through the UK ETA app or GOV.UK
   - It is linked to the passport and lasts only until that passport expires if sooner

   Using the workflow’s seven-day safety margin, the latest calculated start-by date is **19 February 2027**. Apply earlier, immediately after the passport renewal, if possible.

   Source: <https://www.gov.uk/eta/apply> — checked 7 November 2026.

   If the ETA route is not available, the bundled alternative is a Standard Visitor visa costing **GBP 135**, usually decided within three weeks after biometrics. Source: <https://www.gov.uk/standard-visitor/apply-standard-visitor-visa> — checked 7 November 2026.

4. **Check the Frankfurt connection separately.**

   The 14 March flight connects through Frankfurt, Germany. The bundled data does not contain Germany-specific airport-transit rules, so it cannot confirm whether you need an airport transit visa or whether you can remain airside without one.

   Confirm all of these with the airline and the official German/Schengen source:

   - Whether the connection remains airside
   - Whether the bags are checked through to Singapore
   - Whether you change terminals or airports
   - Whether the itinerary requires passing German border control
   - Whether an authorisation such as ETIAS applies to this particular transit

   The Schengen file says ETIAS was not yet accepting applications as at 7 November 2026, but that does not by itself decide airport-transit requirements. General source: <https://home-affairs.ec.europa.eu/policies/schengen/visa-policy/applying-schengen-visa_en> — checked 7 November 2026.

5. **Complete the missing travel preparations.**

   Obtain or confirm:

   - Accommodation evidence for London and New York
   - Travel insurance
   - A recent passport photograph if required by the applications
   - Bank statements if a U.S. visitor-visa application becomes necessary
   - An employment letter if a U.S. visitor-visa application becomes necessary
   - That the airline booking is updated with the new passport details
   - That the ticket name remains consistent with the passport: `TAN WEI LING` / `TAN/WEI LING MS`

6. **Before departure, re-check all official rules.**

   Rules, fees and processing times in the skill are snapshots checked on 7 November 2026. Confirm the UK ETA, U.S. ESTA or visa, Frankfurt transit requirements, passport validity, and Singapore re-entry requirements before applying, paying, booking or travelling.

## Validity summary

- **UK:** planned stay 1–5 March 2027; current passport is valid for the whole stay, but the UK authorisation should be placed on the renewed passport.
- **United States:** planned stay 5–14 March 2027; current passport fails the bundled six-month validity requirement. Renewal is required before the U.S. application.
- **Singapore:** return on 14 March 2027; the current passport remains valid on that date, but use the renewed passport if renewal has been completed.
- **Frankfurt:** transit rules are not covered by the bundled data and must be confirmed.

## Known fees

For one traveller, excluding passport renewal and any transit requirements:

- UK ETA: **GBP 20**
- U.S. ESTA, if eligible: **USD 40.62**
- Alternative U.S. B1/B2 visa: **USD 185**

These currencies should not be added together. Proof of funds was not assessed because no bank statement with a closing balance was found.
