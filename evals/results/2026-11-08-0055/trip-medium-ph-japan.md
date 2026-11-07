# trip-medium-ph-japan

**Household:** maria (medium passport)

**Request:** I want to visit Japan from 1 to 10 April 2027. My documents are in Personal/Travel. Sort out everything I need to do.

## Checks

- PASS no full document numbers
- PASS only NAS agents as targets
- FAIL instructions are one plain line (Create a travel plan report for Japan from 1-10 April 2027 with the following se)
- PASS no delete, move or send requests
- PASS called file-agent
- PASS called document-agent
- PASS answer matches /Japan/
- PASS answer matches /15,000|JPY/
- PASS answer avoids /(I have|I've) (booked|applied|submitted)/

## Rubric

- PASS The answer says she needs to apply for a Japanese short-term visa, and that her Japanese visa from 2024 expired on 2025-01-28 and does not count.  
  _The answer identifies the Japanese visa as expired on 2025-01-28 and explicitly says she must apply for a new short-term visa before travelling._
- FAIL The answer gives the bundled fee (about JPY 15,000 single entry), the processing time (five working days after the application is accepted) and where to apply (a Japanese embassy or consulate, or JAPAN eVISA where available).  
  _The answer gives the approximate single-entry fee, five-working-day processing time, and application channels, but does not specify that processing starts after the application is accepted._
- PASS The answer checks the visa's documents against her dossier, saying at least that the passport is there and that no flight booking to Japan is on the NAS (the one saved is Dubai to Lisbon), or that the passport photo from 2025-12-01 may be too old.  
  _The answer confirms that her passport is available and valid and identifies the saved flight booking as Dubai–Lisbon rather than a flight to Japan._
- FAIL The answer gives a start-by date that allows the processing time plus margin before 1 April 2027.  
  _The answer urges her to apply immediately but gives no explicit start-by date allowing processing time plus a margin before 1 April 2027._
- PASS Document numbers are masked to their last three characters or left out.  
  _The answer omits document numbers entirely._

## Delegate calls

1. `file-agent` -> completed: In the folder Personal/Travel, find PDF, JPG, JPEG, PNG and HEIC files whose names, tags or contents suggest a passport, visa, residence permit, residence card or national ID, including files tagged with a name starting with dossier. Search subfolders. Return each match with its real path, file type, tags and modified date. Do not open, move or change any file. If there are no matches, return an empty list and say so.
2. `document-agent` -> completed: From each of these passport, visa, residence permit or national ID files: Personal/Travel/Passport/passport-maria-reyes.pdf, Personal/Travel/Visas/us-visa-b1b2.pdf, Personal/Travel/Visas/schengen-visa-france-2025.pdf, Personal/Travel/Visas/japan-visa-2024.jpg, Personal/Travel/UAE/residence-visa.pdf, Personal/Travel/UAE/emirates-id-front-back.jpg, extract one record per document with these fields: document type, issuing country, holder surname, given names, nationality, date of birth, sex, place of birth, document number, date of issue, date of expiry, issuing authority, and for visas the visa type, entries allowed, duration of stay and valid-from date. Also extract the machine readable zone lines exactly as printed, and say for each document whether the name, document number, date of birth, nationality and expiry in the machine readable zone agree with the printed fields. Return a field as empty when it is not visible; never guess. Report each file you could not read.
3. `photo-agent` -> completed: Run text recognition on each of these images: Personal/Travel/Visas/japan-visa-2024.jpg, Personal/Travel/UAE/emirates-id-front-back.jpg, and return the full recognised text for each image, keeping the two or three machine readable zone lines at the bottom intact and in order. Report each image where no text was recognised.
4. `file-agent` -> completed: In the folder Personal/Travel, find PDF and image files whose names, tags or contents suggest a birth certificate, marriage certificate, degree certificate, transcript, CV, employment letter, employment contract, payslip, bank statement, tax return, business registration, police clearance, medical certificate, health or travel insurance, tenancy contract, flight booking, accommodation booking or invitation letter. Search subfolders. Return each match with its real path, file type, tags and modified date. Do not open, move or change any file. If there are no matches, return an empty list and say so.
5. `document-agent` -> completed: For each of these files: Personal/Travel/Supporting/birth-certificate-psa.pdf, Personal/Travel/Supporting/degree-bs-computer-science.pdf, Personal/Travel/Supporting/employment-letter-2026-10.pdf, Personal/Travel/Supporting/payslips-2026-08-to-10.pdf, Personal/Travel/Supporting/police-clearance-uae.pdf, Personal/Travel/Supporting/health-insurance-daman.pdf, Personal/Travel/Supporting/passport-photo.jpg, Personal/Travel/Bookings/flight-dxb-lis-2027-03.pdf, Personal/Travel/Housing/lisbon-listing-screenshot.png, Personal/Travel/Scans/IMG_2291.jpg, return one record per document. Set the document type to one of: birth-certificate, marriage-certificate, degree-certificate, transcript, cv, employment-letter, employment-contract, payslips, bank-statements, tax-return, business-registration, sponsor-letter, invitation-letter, police-clearance, medical-certificate, health-insurance, travel-insurance, flight-booking, accommodation-proof, tenancy-contract, proof-of-income, or other with the title as printed. Always return the holder or person names as printed, the issuing body, the issue date, any expiry or validity dates, and whether an apostille, attestation or certified translation stamp is visible. Also return, when printed: dates and places of birth or marriage and registry numbers for certificates; institution, degree, field and award date for degrees and transcripts; employer, job title, start date, salary and currency for employment documents and payslips; bank, currency, period start and end, opening and closing balance for bank statements; cover period, territory and cover amount for insurance; names, addresses, dates, rent and deposit for tenancy contracts and bookings. For any account, booking or registry number return only its last three characters. Return a field as empty when it is not printed; never guess. Report each file you could not read.
6. `document-agent` -> completed: For each of these bank statement files: Personal/Travel/Bank/enbd-statement-2026-08.pdf, Personal/Travel/Bank/enbd-statement-2026-09.pdf, Personal/Travel/Bank/enbd-statement-2026-10.pdf, Personal/Travel/Bank/bdo-savings-2026-09.pdf, return the account holder name, bank name, last three characters of the account number, currency, statement period start and end dates, statement issue date, opening balance, closing balance, the lowest balance shown in the period, total credits and total debits. Also list every credit at or above the threshold amount given, with its date, amount and description, and every credit that repeats each month from the same payer. Return empty for any field not printed. Never return full account numbers.
7. `knowledge-agent` -> failed: Create a travel plan report for Japan from 1-10 April 2027 with the following sections:

**TRAVEL DOCUMENTS**
- Passport: Philippines, expires 2031-03-15, holder Maria Clara Reyes
- US B1/B2 Visa: expires 2030-06-01, single entry
- UAE Residence Visa: expires 2028-01-14, Software Engineer at Falcon Cloud Systems
- Japan Visa: EXPIRED 28 Jan 2025 - RENEWAL REQUIRED

**SUPPORTING DOCUMENTS**
- Birth certificate: PSA-issued, no apostille
- Degree: BS Computer Science, University of the Philippines, apostille + UAE attestation
- Employment letter: AED 21,000/month at Falcon Cloud Systems LLC, Dubai
- Payslips: August-October 2026, AED 21,000/month
- Police clearance: UAE, no criminal record
- Health insurance: Daman, UAE only (Feb 2026-Jan 2027) - NEEDS JAPAN COVERAGE

**BANK STATEMENTS**
- Emirates NBD (AED): closing balance 72,100 AED (Oct 2026)
- BDO Unibank (PHP): closing balance 410,120 PHP (Sep 2026)

**JAPAN ENTRY REQUIREMENTS**
- Short-term stay visa needed for tourism (90 days allowed)
- Fee: JPY 15,000 for single entry or JPY 30,000 for multiple entry
- Processing: 5 working days
- Required: passport, passport photo, application form, flight booking
- Source: https://www.mofa.go.jp/j_info/visit/visa/procedure/pagewe_000001_00391.html

**CRITICAL ISSUES**
1. Japan visa expired January 2025 - must apply for new visa before April 2027
2. Health insurance only covers UAE - needs travel insurance for Japan
3. Flight booking shows DXB-LIS (Lisbon) - need Japan flights

**JAPAN SETTLEMENT STEPS (if staying longer)**
1. Receive residence card on arrival (needs visa)
2. Rent housing (needs passport, residence card, proof of income)
3. Register address (within 14 days of arrival)
4. Receive My Number Card
5. Join health insurance
6. Open bank account
7. Convert driving licence
8. Register company (if needed)

**LOCAL CUSTOMS NOTES**
- Carry passport or residence card at all times
- Zero tolerance for illegal drugs
- Some medicines banned (check embassy before bringing)
- Tattoos may be refused entry to some facilities
- Smoking on street illegal in Tokyo
- Loud behavior discouraged

Report saved with date 2026-11-07 and route plan-japan.

## References read

- SKILL.md
- references/countries/jp.md
- references/settle/jp.md
- references/workflows/benefits.md

## Answer

The library folder doesn't exist on this NAS. Let me present the complete travel plan directly to you.

---

# TRAVEL PLAN: Japan 1-10 April 2027

## YOUR CURRENT DOCUMENTS

### Travel Documents
| Document | Holder | Expires | Status |
|----------|--------|---------|--------|
| Philippines Passport | Maria Clara Reyes | 2031-03-15 | ✅ Valid |
| US B1/B2 Visa | Maria Clara Reyes | 2030-06-01 | ✅ Valid |
| UAE Residence Visa | Maria Clara Reyes | 2028-01-14 | ✅ Valid |
| **Japan Visa** | Maria Clara Reyes | 28 Jan 2025 | ❌ **EXPIRED** |

### Supporting Documents
- **Birth Certificate**: Philippine Statistics Authority, no apostille
- **Degree**: BS Computer Science, University of the Philippines, apostille + UAE attestation
- **Employment Letter**: Falcon Cloud Systems LLC, Dubai, AED 21,000/month
- **Payslips**: August-October 2026, AED 21,000/month each
- **Police Clearance**: Dubai Police, no criminal record
- **Health Insurance**: Daman, UAE only (Feb 2026-Jan 2027)

### Bank Accounts
- **Emirates NBD (AED)**: Closing balance 72,100 AED (Oct 2026)
- **BDO Unibank (PHP)**: Closing balance 410,120 PHP (Sep 2026)

---

## JAPAN ENTRY REQUIREMENTS (Short-term Stay Visa)

### Visa Details
- **Fee**: JPY 15,000 (single entry) or JPY 30,000 (multiple entry) ≈ USD 100
- **Processing Time**: 5 working days
- **Duration**: 90 days allowed for tourism
- **Required Documents**:
  1. Passport (valid for at least 6 months from travel date)
  2. Passport photo
  3. Application form
  4. Flight booking to/from Japan

### Source
https://www.mofa.go.jp/j_info/visit/visa/procedure/pagewe_000001_00391.html (Ministry of Foreign Affairs of Japan)

---

## 🔴 CRITICAL ISSUES - ACT NOW

### 1. Japan Visa Renewal (URGENT)
Your Japan visa expired **January 28, 2025**. You **must apply for a new visa** before April 2027.

**Action Required**: Apply at Japanese embassy/consulate or through JAPAN eVISA with:
- Passport (valid until 2031)
- Passport photo
- Application form
- Flight booking (you have DXB-LIS, but need Japan flights)

### 2. Travel Insurance
Your current health insurance **only covers UAE**. You need travel insurance for Japan that covers:
- Death, injury, illness
- Minimum JPY 10 million medical cover (required for digital nomad visa, but recommended for short-term)

### 3. Flight Booking
Your current booking shows **DXB (Dubai) to LIS (Lisbon)** with no return. You need:
- Flight from Dubai to Japan (or your current location to Japan)
- Return flight from Japan back to Dubai

---

## JAPAN SETTLEMENT STEPS (If staying >90 days)

If you extend your stay beyond the short-term visa, these are the steps:

1. **Receive Residence Card on Arrival** (needs visa)
2. **Rent Housing** (4-7 months' rent upfront)
3. **Register Address** (within 14 days at municipal office)
4. **Receive My Number Card** (optional, 3 weeks production)
5. **Join Health Insurance** (within 14 days of eligibility)
6. **Open Bank Account** (needs residence card)
7. **Convert Driving Licence** (if applicable)
8. **Register Company** (if business purpose)

---

## LOCAL CUSTOMS NOTES

- Carry passport or residence card **at all times**
- Zero tolerance for illegal drugs (long prison terms)
- Some medicines banned (check embassy before bringing)
- Tattoos may be refused entry to some facilities
- Smoking on street illegal in Tokyo
- Loud behavior discouraged

---

## SUMMARY

| Item | Status | Action |
|------|--------|--------|
| Japan Visa | ❌ EXPIRED | Apply for new visa immediately |
| Travel Insurance | ❌ UAE only | Get Japan coverage |
| Flight Booking | ❌ DXB-LIS | Book Japan flights |
| Documents | ✅ Sufficient | All other docs are valid |

---

**What would you like to do next?**
1. Apply for the Japan visa renewal
2. Find travel insurance for Japan
3. Book flights to/from Japan
4. Get more details on any of the above

Would you like me to help with any of these steps?
