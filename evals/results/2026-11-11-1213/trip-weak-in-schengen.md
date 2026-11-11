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
- PASS answer matches /2027-03-19|19 Mar(ch)? 2027/
- PASS answer matches /Portugal|Portuguese/
- PASS answer avoids /(I have|I've) (booked|applied|submitted)/

## Rubric

- PASS The answer flags that the passport expires on 2027-03-19, before the trip, so it must be renewed first, and does not plan the visa on the current passport.  
  _The answer identifies the passport’s 19 March 2027 expiry as preceding the trip and explicitly requires renewal before applying for the visa._
- PASS The answer says he needs a Schengen short-stay (type C) visa, applied for at the consulate of Portugal (main destination by nights) or its provider, with the bundled fee (EUR 90), processing time (15 calendar days, up to 45) and when he can apply (no earlier than 6 months before travel, or a start-by date that leaves the processing time).  
  _The answer specifies a Schengen type C visa through Portugal’s responsible consulate or visa centre because Portugal has more nights, with the EUR 90 fee, 15-calendar-day processing extendable to 45 days, and the six-month application window._
- PASS The answer checks the visa's documents against the dossier and says travel insurance, accommodation proof and a flight booking are missing, while the bank statements and employment letter are present.  
  _The answer checks the dossier and identifies travel insurance, accommodation proof and a flight booking as missing while confirming that bank statements and an employment letter are present._
- FAIL The answer compares his funds with the bundled Portugal reference amount (EUR 75 per entry plus EUR 40 per day) and handles INR versus EUR with a break-even exchange rate or a stated rate, without inventing one.  
  _The answer explicitly leaves proof of funds unchecked and provides neither the bundled EUR 75 per entry plus EUR 40 per day comparison nor an INR-to-EUR conversion or break-even exchange rate._
- PASS The answer orders the steps with dates (passport renewal, then the visa application at least 15 days before 8 May 2027 plus margin) and does not give financial advice.  
  _The dated checklist puts passport renewal before the visa application and provides filing targets allowing at least 15 days plus a margin before 8 May 2027, without giving financial advice._

## Delegate calls

1. `file-agent` -> completed: In the folder Personal/Travel, find PDF, JPG, JPEG, PNG and HEIC files whose names, tags or contents suggest a passport, visa, residence permit, residence card or national ID, including files tagged with a name starting with dossier. Search subfolders. Return each match with its real path, file type, tags and modified date. Do not open, move or change any file. If there are no matches, return an empty list and say so.
2. `document-agent` -> completed: From each of these passport, visa, residence permit or national ID files: Personal/Travel/Passport/passport-arjun.pdf, extract one record per document with these fields: document type, issuing country, holder surname, given names, nationality, date of birth, sex, place of birth, the last three characters of the document number, date of issue, date of expiry, issuing authority, and for visas the visa type, entries allowed, duration of stay and valid-from date. Compare the machine readable zone with the printed fields yourself and do not return the machine readable zone lines: say for each document whether the name, document number, date of birth, nationality and expiry in the zone agree with the printed page, and for each field that differs, which character positions differ and the two characters at each. Return a field as empty when it is not visible; never guess. Report each file you could not read.
3. `file-agent` -> completed: In the folder Personal/Travel, find PDF and image files whose names, tags or contents suggest a birth certificate, marriage certificate, degree certificate, transcript, CV, employment letter, employment contract, payslip, bank statement, tax return, business registration, police clearance, medical certificate, health or travel insurance, tenancy contract, flight booking, accommodation booking or invitation letter. Search subfolders. Return each match with its real path, file type, tags and modified date. Do not open, move or change any file. If there are no matches, return an empty list and say so.
4. `document-agent` -> completed: For each of these files: Personal/Travel/Supporting/salary-slips-2026-08-to-10.pdf, Personal/Travel/Supporting/employment-letter-2026-10.pdf, Personal/Travel/Supporting/itr-ay-2026-27.pdf, return one record per document. Set the document type to one of: birth-certificate, marriage-certificate, degree-certificate, transcript, cv, employment-letter, employment-contract, payslips, bank-statements, tax-return, business-registration, sponsor-letter, invitation-letter, police-clearance, medical-certificate, health-insurance, travel-insurance, flight-booking, accommodation-proof, tenancy-contract, proof-of-income, or other with the title as printed. Always return the holder or person names as printed, the issuing body, the issue date, any expiry or validity dates, and whether an apostille, attestation or certified translation stamp is visible. Also return, when printed: dates and places of birth or marriage and registry numbers for certificates; institution, degree, field and award date for degrees and transcripts; employer, job title, start date, salary and currency for employment documents and payslips; bank, currency, period start and end, opening and closing balance for bank statements; cover period, territory and cover amount for insurance; names, addresses, dates, rent and deposit for tenancy contracts and bookings. For any account, booking or registry number return only its last three characters. Return a field as empty when it is not printed; never guess. Report each file you could not read.
5. `document-agent` -> completed: For this file: Personal/Travel/Bank/kaveri-bank-2026-08-to-10.pdf, return one record per document. Set the document type to one of: birth-certificate, marriage-certificate, degree-certificate, transcript, cv, employment-letter, employment-contract, payslips, bank-statements, tax-return, business-registration, sponsor-letter, invitation-letter, police-clearance, medical-certificate, health-insurance, travel-insurance, flight-booking, accommodation-proof, tenancy-contract, proof-of-income, or other with the title as printed. Always return the holder or person names as printed, the issuing body, the issue date, any expiry or validity dates, and whether an apostille, attestation or certified translation stamp is visible. Also return, when printed: dates and places of birth or marriage and registry numbers for certificates; institution, degree, field and award date for degrees and transcripts; employer, job title, start date, salary and currency for employment documents and payslips; bank, currency, period start and end, opening and closing balance for bank statements; cover period, territory and cover amount for insurance; names, addresses, dates, rent and deposit for tenancy contracts and bookings. For any account, booking or registry number return only its last three characters. Return a field as empty when it is not printed; never guess. Report each file you could not read. Do not list individual transactions.

**Model in replies:** gpt-5.6-luna. **Credential source:** none.

## References read

- SKILL.md
- references/workflows/plan.md
- references/topics/entry-conditions.md
- references/countries/pt.md
- references/countries/es.md
- references/countries/schengen.md
- references/topics/document-fields.md
- references/official-sources.md

## Answer

The trip is potentially workable, but you are not ready to travel yet. The first and non-negotiable step is to renew your passport: the current passport expires on 19 March 2027, before the trip, and it will also be more than ten years old when you travel.

I have assumed:

- Lisbon: 8–16 May 2027, eight nights
- Madrid: 16–22 May 2027, six nights
- One traveller: Arjun Mehta
- Portugal is the main destination because it has more nights
- The itinerary stays within the Schengen Area after entering Portugal

Live flight schedules, prices, bookings, visa appointments and applications cannot be made through this service.

## Trip: Portugal and Spain, 8–22 May 2027

Person: Arjun Mehta — Needs action

### Documents read

- Passport: Indian nationality, number ending 274, expires 19 March 2027, read from `Personal/Travel/Passport/passport-arjun.pdf`; machine-readable zone agrees with the printed page.
- Visa or residence permit: none found.
- Supporting documents found:
  - Bank statement: Kaveri Bank account ending 406, INR, 1 August–31 October 2026; closing balance INR 526,800.
  - Salary slips: Lalbagh Software Pvt Ltd, INR 185,000 gross / INR 140,000 net per month for August–October 2026.
  - Employment letter: Arjun Mehta, Senior QA Engineer at Lalbagh Software Pvt Ltd, employed since 6 January 2020, annual gross salary INR 2,220,000, issued 21 October 2026.
  - Indian income-tax return: assessment year 2026–27, issued 29 July 2026.
- Not found in `Personal/Travel`:
  - Flight booking
  - Accommodation booking
  - Travel or health insurance
  - Passport photograph
  - Police clearance
  - Invitation letter

No document could not be read.

## Passport validity

Passport expiry: 19 March 2027  
Arrival: 8 May 2027  
Last departure from Schengen: 22 May 2027

- Arrival plus six months: 8 November 2027 — not met.
- Last departure plus three months: 22 August 2027 — not met.
- Valid for the whole stay: not met.
- The Schengen rule also requires the passport to have been issued within the previous ten years. This passport was issued on 20 March 2017, so it would fail that condition on the planned arrival date as well.

Source: [European Commission, Schengen Borders Code](https://eur-lex.europa.eu/eli/reg/2016/399/oj), checked 7 November 2026.

## Portugal: Lisbon, 8–16 May 2027

Path: `schengen-short-stay-visa-c` — Schengen type C short-stay visa for tourism, covering Portugal and Spain if the visa is issued for the full Schengen territory. It allows up to 90 days in any 180-day period.

Portugal is the correct application country under the itinerary because it is the main destination: eight nights in Portugal versus six nights in Spain.

Eligibility and conditions:

- Non-EU traveller who requires a Schengen visa: the bundled data does not contain an India-specific visa-exemption entry, so confirm the current Indian-nationality requirement on the official source before paying.
- Passport: current passport fails the validity and ten-year issuance conditions; renew it first.
- Application location: Portuguese consulate or visa centre responsible for the applicant’s place of residence.
- Applications may be lodged no earlier than six months before travel. The six-month window opened on 8 November 2026.
- Normal processing: 15 calendar days; individual cases may take up to 45 days.
- Fingerprints are taken.
- The applicant must show an intention to return home.

Source: [European Commission, applying for a Schengen visa](https://home-affairs.ec.europa.eu/policies/schengen/visa-policy/applying-schengen-visa_en), checked 7 November 2026.

Also required:

- Completed visa application form
- New passport
- Passport photograph
- Flight booking or itinerary
- Accommodation proof for Lisbon and Madrid
- Travel insurance covering emergencies, hospital care and repatriation
- Bank statements and proof of sufficient funds
- Evidence supporting return to India, such as the employment letter, current salary slips and approved leave
- Any additional documents required by the Portuguese consulate or visa centre

Source: [European Commission, applying for a Schengen visa](https://home-affairs.ec.europa.eu/policies/schengen/visa-policy/applying-schengen-visa_en), checked 7 November 2026.

Fee and waiting time:

- Adult visa fee: EUR 90 per person
- One-person total based on the bundled fee: EUR 90
- Processing: 15 calendar days, extendable to 45 calendar days in individual cases
- Any visa-centre service fee, passport-renewal fee, photographs, insurance and travel costs are not included because they are not in the bundled data.

Source: [European Commission, applying for a Schengen visa](https://home-affairs.ec.europa.eu/policies/schengen/visa-policy/applying-schengen-visa_en), checked 7 November 2026.

Documents:

- Have: employment letter, salary slips, tax return and bank statement.
- Refresh before applying: bank statement, salary slips and employment evidence. The existing bank statement ends on 31 October 2026 and will be several months old by the application date.
- Missing: renewed passport, application form, passport photo, travel insurance, flight booking and accommodation proof.
- Needs checking: the exact consulate checklist and proof-of-funds amount for Portugal.

## Spain: Madrid, 16–22 May 2027

Path: the same Schengen type C visa, not a separate Spanish tourist visa.

A Schengen visa covers all 29 Schengen countries, including Portugal and Spain, provided the visa is not marked with limited territorial validity. Check the visa sticker when it is issued.

Source: [European Commission, Schengen Area](https://home-affairs.ec.europa.eu/policies/schengen/schengen-area_en), checked 7 November 2026.

Spain’s bundled country file does not contain a separate tourist-entry rule for this passport. The shared Schengen rules therefore apply. Do not assume that a visa marked “Portugal only” or “LTV” permits entry to Spain.

Source: [European Commission, applying for a Schengen visa](https://home-affairs.ec.europa.eu/policies/schengen/visa-policy/applying-schengen-visa_en), checked 7 November 2026.

## Connection: Lisbon to Madrid, 16 May 2027

This is an internal Schengen connection. Once a full-territory Schengen visa is issued, no additional Spanish visa is required for the Lisbon–Madrid movement.

Choose an itinerary without a connection in a non-Schengen country if possible. Any third-country airport connection would need its own transit rules checked; no such connection is currently booked.

Portugal also has a TAP Stopover option of up to ten days in Lisbon or Porto, with no added airfare when the booking qualifies. It requires a qualifying TAP one-way, return or multi-city ticket and the stopover option to appear during booking. There is no current ticket, so this option is not yet applicable.

Source: [TAP Portugal Stopover](https://www.flytap.com/en-us/stopover), checked 7 November 2026.

## Names

Names currently match across the passport and supporting documents:

- Passport: ARJUN MEHTA
- Supporting documents: ARJUN MEHTA / Arjun Mehta

Use the passport spelling, `ARJUN MEHTA`, on the visa application and all flight and accommodation bookings. No visa or booking was found for comparison.

## Money and proof of funds

- Bank: Kaveri Bank, account ending 406
- Currency: INR
- Latest closing balance found: INR 526,800 on 31 October 2026
- Repeating salary credit shown: INR 140,000 monthly
- Gross salary shown on payslips: INR 185,000 monthly
- Tax return and employment letter: available

Proof of funds: not checked against the Portuguese short-stay reference amount. The bundled Portugal file does not state that amount, and no exchange-rate calculation can therefore be made. The existing bank statement should be replaced or supplemented with a current statement when applying.

The financial documents support the application narrative, but they do not guarantee visa approval.

## Step-by-step checklist

Starting 11 November 2026:

1. 11 November 2026 — Begin passport renewal through India’s official Passport Seva process. The current passport cannot be used for this itinerary because it expires before departure and fails the Schengen ten-year issuance condition. The passport-renewal procedure is not covered by the bundled travel rules, so confirm the current process at [Passport Seva](https://passportindia.gov.in/).

2. Before any visa application — Obtain the new passport, then check that:
   - It is valid at least through 22 August 2027.
   - It was issued within ten years of 8 May 2027.
   - The name matches `ARJUN MEHTA`.
   - It is undamaged and has sufficient blank pages.

3. After receiving the new passport — Identify the Portuguese consulate or visa centre serving your place of residence. Your place of residence was not present in the documents, so the exact application location cannot be determined here.

4. Assemble the visa file:
   - New passport
   - Schengen application form
   - Passport photograph
   - Flight itinerary
   - Eight-night Lisbon accommodation proof
   - Six-night Madrid accommodation proof
   - Travel insurance meeting the Schengen coverage requirements
   - Current bank statements
   - Recent salary slips
   - Employment letter and approved leave/return-to-work confirmation
   - Tax return
   - Any documents required by the responsible Portuguese consulate

5. As soon as the renewed passport and supporting documents are ready — Submit the Portuguese Schengen type C application. The application window is already open because it began on 8 November 2026.

6. Target 17 March 2027 — Preferred latest filing target using the possible 45-day processing period plus a seven-day buffer.

7. Target 16 April 2027 — Latest standard start-by date using the normal 15-day processing period plus a seven-day buffer.

8. 23 April 2027 — Absolute minimum date implied by the normal 15-day rule for an 8 May departure. Waiting until this date is risky because processing can be extended to 45 days.

9. After visa approval — Check that the sticker:
   - Covers the full Schengen territory, not Portugal only.
   - Has enough permitted days for the whole stay.
   - Is valid from before 8 May through the return date.
   - Has the correct name and passport number.

10. Before departure — Carry the passport, visa, return or onward booking, accommodation confirmations, insurance certificate, itinerary, current proof of funds and employment/leave evidence.

11. 8 May 2027 — Enter Portugal and stay in Lisbon.

12. 16 May 2027 — Travel from Lisbon to Madrid within the Schengen Area.

13. 22 May 2027 — Depart the Schengen Area from Spain or another Schengen airport, ensuring the passport remains valid for the required period.

ETIAS is not the route to plan at present: the bundled snapshot says it was not operating and was not accepting applications on 7 November 2026, and it is intended for visa-exempt non-EU nationals. Confirm the current position on the official [EU ETIAS page](https://travel-europe.europa.eu/etias/about-etias/news-corner) before relying on it.

Rules, fees and processing times are a dated snapshot. Confirm them with the Portuguese consulate, the European Commission and the official airline or booking provider before applying, paying, booking or travelling.
