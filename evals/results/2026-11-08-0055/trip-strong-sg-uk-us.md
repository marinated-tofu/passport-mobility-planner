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
  _The answer identifies the expiry date but falsely claims it is six-plus months after US departure, rather than showing that the passport fails a six-month-beyond-arrival validity pattern._
- FAIL The answer recommends renewing the passport before applying for the UK ETA and the ESTA, because each is valid only until the passport expires (or is linked to the passport), so applying on the old one would mean applying again.  
  _The answer does not recommend passport renewal before applying for either authorisation or explain that renewing would require new applications._
- PASS The UK step names the UK ETA with its bundled fee (GBP 20) and timing (usually 1 working day, up to 3), and the US step names the ESTA with its bundled fee (USD 40.62); any claim that Singapore citizens qualify is sourced or marked to confirm.  
  _The answer names the UK ETA with GBP 20 and usually one working day, allowing up to three, and ESTA with USD 40.62, with official sources cited for both entry-requirement claims._
- PASS The Frankfurt connection on the way home is mentioned, with transit rules either covered or marked as not covered by the bundled data.  
  _The answer identifies the Frankfurt connection on the journey home and discusses airside transit rules._
- FAIL The answer includes a dated order of steps, with the passport renewal first and both authorisations dated before 1 March 2027.  
  _The timeline omits passport renewal and sets authorisation deadlines of 1 March and 5 March rather than dating both before 1 March 2027._

## Delegate calls

1. `file-agent` -> completed: In the folder Personal/Travel, find PDF, JPG, JPEG, PNG and HEIC files whose names, tags or contents suggest a passport, visa, residence permit, residence card or national ID, including files tagged with a name starting with dossier. Search subfolders. Return each match with its real path, file type, tags and modified date. Do not open, move or change any file. If there are no matches, return an empty list and say so.
2. `document-agent` -> completed: From this passport file: Personal/Travel/Passport/passport-tan-wei-ling.pdf, extract one record with these fields: document type, issuing country, holder surname, given names, nationality, date of birth, sex, place of birth, document number, date of issue, date of expiry, issuing authority, and for visas the visa type, entries allowed, duration of stay and valid-from date. Also extract the machine readable zone lines exactly as printed, and say for each document whether the name, document number, date of birth, nationality and expiry in the machine readable zone agree with the printed fields. Return a field as empty when it is not visible; never guess. Report each file you could not read.
3. `file-agent` -> completed: In the folder Personal/Travel, find PDF and image files whose names, tags or contents suggest a birth certificate, marriage certificate, degree certificate, transcript, CV, employment letter, employment contract, payslip, bank statement, tax return, business registration, police clearance, medical certificate, health or travel insurance, tenancy contract, flight booking, accommodation booking or invitation letter. Search subfolders. Return each match with its real path, file type, tags and modified date. Do not open, move or change any file. If there are no matches, return an empty list and say so.
4. `document-agent` -> completed: For each of these files: Personal/Travel/Bookings/sin-lhr-jfk-sin-2027-03.pdf, Personal/Travel/Supporting/payslips-2026-08-to-10.pdf, return one record per document. Set the document type to one of: birth-certificate, marriage-certificate, degree-certificate, transcript, cv, employment-letter, employment-contract, payslips, bank-statements, tax-return, business-registration, sponsor-letter, invitation-letter, police-clearance, medical-certificate, health-insurance, travel-insurance, flight-booking, accommodation-proof, tenancy-contract, proof-of-income, or other with the title as printed. Always return the holder or person names as printed, the issuing body, the issue date, any expiry or validity dates, and whether an apostille, attestation or certified translation stamp is visible. Also return, when printed: dates and places of birth or marriage and registry numbers for certificates; institution, degree, field and award date for degrees and transcripts; employer, job title, start date, salary and currency for employment documents and payslips; bank, currency, period start and end, opening and closing balance for bank statements; cover period, territory and cover amount for insurance; names, addresses, dates, rent and deposit for tenancy contracts and bookings. For any account, booking or registry number return only its last three characters. Return a field as empty when it is not printed; never guess. Report each file you could not read.

## References read

- SKILL.md
- Personal/Travel
- workflows/plan.md
- references/workflows/plan.md
- references/countries/gb.md
- references/countries/us.md
- references/topics/entry-conditions.md
- references/countries/de.md
- references/countries/schengen.md

## Answer

Now I have all the information needed. Let me compile the trip plan for you.

## Trip Plan Summary

**Traveler:** TAN WEI LING (Singapore citizen)  
**Passport:** Singapore, expires 2027-05-20

### Route
1. **Singapore → London (LHR)**: March 1, 2027
2. **London (LHR) → New York (JFK)**: March 5, 2027
3. **New York (JFK) → Singapore (SIN) via Frankfurt**: March 14, 2027

---

## 1. Entry Requirements

### United Kingdom (London) - March 1 to 5, 2027
| Item | Details |
|------|---------|
| **Required document** | UK Electronic Travel Authorisation (ETA) |
| **Fee** | GBP 20 (~USD 26) |
| **Processing time** | Usually 1 working day; allow up to 3 working days |
| **Validity** | 2 years, multiple trips |
| **How to apply** | Online through UK ETA app or GOV.UK |
| **Required documents** | Passport, passport photo, application form |
| **Source** | https://www.gov.uk/eta/apply (checked 07 Nov 2026) |

**Passport validity:** Your passport expires 2027-05-20, which is about 1.5 months after your UK departure (March 5, 2027). The UK requires passport valid for the whole stay. Your passport meets this requirement.

---

### United States (New York) - March 5 to 14, 2027
| Item | Details |
|------|---------|
| **Required document** | ESTA (Electronic System for Travel Authorization) |
| **Fee** | USD 40.62 |
| **Processing time** | Usually faster than a visa; apply before travel |
| **Validity** | 2 years, or until passport expires |
| **Stay allowed** | 90 days or less per visit |
| **How to apply** | Online through official ESTA website or ESTA Mobile app |
| **Required documents** | Passport, application form |
| **Source** | https://www.cbp.gov/travel/international-visitors/esta (checked 07 Nov 2026) |

**Passport validity:** Your passport is valid for 6+ months beyond your US departure (March 14, 2027). The US requires 6 months beyond planned stay. Your passport meets this requirement.

---

## 2. Transit (Frankfurt, Germany)
- Singapore citizens can transit **airside** (without clearing border control) through Frankfurt without a Schengen visa, as long as:
  - You have a confirmed onward flight leaving the same day from the same airport
  - You hold documents needed for the destination (UK ETA and US ESTA)

---

## 3. Application Order and Timeline

Working backward from your departure date (March 14, 2027):

| Application | Start by | Deadline | Notes |
|-------------|----------|----------|-------|
| **UK ETA** | February 2027 | March 1, 2027 | Can apply online; usually approved within 1-3 days |
| **US ESTA** | January 2027 | March 5, 2027 | Can apply online; usually approved within 72 hours |

Both applications can be done online without in-person appointments.

---

## 4. Documents Checklist

**Required to carry:**
- ✅ Singapore passport (valid until 2027-05-20)
- ⏳ UK ETA (apply before March 1)
- ⏳ US ESTA (apply before March 5)
- ✅ Flight booking confirmation (booking ref ends in 8KD)

**Supporting documents in your folder:**
- Payslips: SGD 9,200/month (Aug-Oct 2026) - shows employment and income

---

## 5. Verdict

**Ready (with action items):**
- UK ETA: Apply online soon (before March 1)
- US ESTA: Apply online soon (before March 5)

Both are online applications with no in-person requirements. Once approved, you'll have all the documents needed for your trip.

---

**Important:** Before applying, confirm the latest rules on the official UK ETA and US CBP/ESTA websites.
