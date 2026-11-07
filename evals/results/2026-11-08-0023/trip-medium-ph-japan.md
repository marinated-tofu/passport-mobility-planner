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
  _The answer says the existing Japan visa expired on 2025-01-28 and that she must apply for a new short-term stay visa before travelling._
- FAIL The answer gives the bundled fee (about JPY 15,000 single entry), the processing time (five working days after the application is accepted) and where to apply (a Japanese embassy or consulate, or JAPAN eVISA where available).  
  _It quotes about JPY 10,000 instead of the required bundled fee of about JPY 15,000 and does not specify that the five working days begin after application acceptance._
- PASS The answer checks the visa's documents against her dossier, saying at least that the passport is there and that no flight booking to Japan is on the NAS (the one saved is Dubai to Lisbon), or that the passport photo from 2025-12-01 may be too old.  
  _It confirms the passport is available and identifies the saved Dubai–Lisbon booking as belonging to a different trip, with the Japan itinerary still needing confirmation._
- PASS The answer gives a start-by date that allows the processing time plus margin before 1 April 2027.  
  _The instruction to apply at least four months before the trip sets a deadline of 1 December 2026 or earlier, allowing ample processing time and margin before 1 April 2027._
- PASS Document numbers are masked to their last three characters or left out.  
  _The answer omits all document numbers._

## Delegate calls

1. `file-agent` -> completed: In the Personal/Travel folder, find PDF, JPG, JPEG, PNG and HEIC files whose names, tags or contents suggest a passport, visa, residence permit, residence card or national ID, including files tagged with a name starting with dossier. Search subfolders. Return each match with its real path, file type, tags and modified date. Do not open, move or change any file. If there are no matches, return an empty list and say so.
2. `file-agent` -> completed: In the Personal/Travel folder, find PDF and image files whose names, tags or contents suggest a birth certificate, marriage certificate, degree certificate, transcript, CV, employment letter, employment contract, payslip, bank statement, tax return, business registration, police clearance, medical certificate, health or travel insurance, tenancy contract, flight booking, accommodation booking or invitation letter. Search subfolders. Return each match with its real path, file type, tags and modified date. Do not open, move or change any file. If there are no matches, return an empty list and say so.
3. `document-agent` -> completed: From the file path Personal/Travel/Passport/passport-maria-reyes.pdf, extract one record with these fields: document type, issuing country, holder surname, given names, nationality, date of birth, sex, place of birth, document number, date of issue, date of expiry, issuing authority, and for visas the visa type, entries allowed, duration of stay and valid-from date. Also extract the machine readable zone lines exactly as printed, and say for each document whether the name, document number, date of birth, nationality and expiry in the machine readable zone agree with the printed fields. Return a field as empty when it is not visible; never guess. Report each file you could not read.
4. `document-agent` -> completed: From the file path Personal/Travel/Visas/japan-visa-2024.jpg, run text recognition and return the full recognised text for the image, keeping the two or three machine readable zone lines at the bottom intact and in order. Report each image where no text was recognised.
5. `photo-agent` -> completed: Run text recognition on the image path Personal/Travel/Visas/japan-visa-2024.jpg and return the full recognised text for the image, keeping the two or three machine readable zone lines at the bottom intact and in order. Report each image where no text was recognised.
6. `document-agent` -> completed: From the file path Personal/Travel/Visas/us-visa-b1b2.pdf, extract one record with these fields: document type, issuing country, holder surname, given names, nationality, date of birth, sex, place of birth, document number, date of issue, date of expiry, issuing authority, and for visas the visa type, entries allowed, duration of stay and valid-from date. Also extract the machine readable zone lines exactly as printed, and say for each document whether the name, document number, date of birth, nationality and expiry in the machine readable zone agree with the printed fields. Return a field as empty when it is not visible; never guess. Report each file you could not read.
7. `document-agent` -> completed: From the file path Personal/Travel/UAE/residence-visa.pdf, extract one record with these fields: document type, issuing country, holder surname, given names, nationality, date of birth, sex, place of birth, document number, date of issue, date of expiry, issuing authority, and for visas the visa type, entries allowed, duration of stay and valid-from date. Also extract the machine readable zone lines exactly as printed, and say for each document whether the name, document number, date of birth, nationality and expiry in the machine readable zone agree with the printed fields. Return a field as empty when it is not visible; never guess. Report each file you could not read.
8. `document-agent` -> completed: From the file path Personal/Travel/Visas/schengen-visa-france-2025.pdf, extract one record with these fields: document type, issuing country, holder surname, given names, nationality, date of birth, sex, place of birth, document number, date of issue, date of expiry, issuing authority, and for visas the visa type, entries allowed, duration of stay and valid-from date. Also extract the machine readable zone lines exactly as printed, and say for each document whether the name, document number, date of birth, nationality and expiry in the machine readable zone agree with the printed fields. Return a field as empty when it is not visible; never guess. Report each file you could not read.
9. `document-agent` -> completed: For the file path Personal/Travel/Supporting/employment-letter-2026-10.pdf, return one record with document type set to employment-letter. Always return the holder or person names as printed, the issuing body, the issue date, any expiry or validity dates, and whether an apostille, attestation or certified translation stamp is visible. Also return, when printed: employer, job title, start date, salary and currency for employment documents. Return a field as empty when it is not printed; never guess. Report each file you could not read.
10. `document-agent` -> completed: For the file path Personal/Travel/Supporting/payslips-2026-08-to-10.pdf, return one record with document type set to payslips. Always return the holder or person names as printed, the issuing body, the issue date, any expiry or validity dates, and whether an apostille, attestation or certified translation stamp is visible. Also return, when printed: dates and places of birth or marriage and registry numbers for certificates; institution, degree, field and award date for degrees and transcripts; employer, job title, start date, salary and currency for employment documents and payslips; bank, currency, period start and end, opening and closing balance for bank statements; cover period, territory and cover amount for insurance; names, addresses, dates, rent and deposit for tenancy contracts and bookings. For any account, booking or registry number return only its last three characters. Return a field as empty when it is not printed; never guess. Report each file you could not read.
11. `document-agent` -> completed: For the file path Personal/Travel/Bank/enbd-statement-2026-10.pdf, return one record with document type set to bank-statements. Always return the holder or person names as printed, the issuing body, the issue date, any expiry or validity dates, and whether an apostille, attestation or certified translation stamp is visible. Also return, when printed: dates and places of birth or marriage and registry numbers for certificates; institution, degree, field and award date for degrees and transcripts; employer, job title, start date, salary and currency for employment documents and payslips; bank, currency, period start and end, opening and closing balance for bank statements; cover period, territory and cover amount for insurance; names, addresses, dates, rent and deposit for tenancy contracts and bookings. For any account, booking or registry number return only its last three characters. Return a field as empty when it is not printed; never guess. Report each file you could not read.

## References read

- SKILL.md
- references/countries/jp.md
- references/benefits/index.md
- references/settle/jp.md

## Answer

Now I have all the information needed. Let me provide you with a comprehensive travel plan:

---

## Japan Trip Plan - April 1-10, 2027

### ✅ Documents You Hold

| Document | Status | Key Details |
|----------|--------|-------------|
| **Passport** | Valid until 2031-03-15 | Maria Clara Reyes, Philippines |
| **Japan Visa** | ⚠️ EXPIRED (2025-01-28) | **Needs renewal** |
| **US B1/B2 Visa** | Valid until 2030-06-01 | Single entry, good for travel |
| **UAE Residence Permit** | Valid until 2028-01-14 | Good for GCC benefits |
| **Birth Certificate** | Available | PSA |
| **Degree (BS Computer Science)** | Available | 2024 |
| **Employment Letter** | Available | Falcon Cloud Systems LLC, AED 21,000/month gross |
| **Payslips** | Available | Aug-Oct 2026, consistent income |
| **Bank Statements** | Available | ENBD & BDO, balances 30k-72k AED |
| **Police Clearance** | Available | UAE |
| **Health Insurance** | Available | Daman |

---

### ❗ Critical Action Required: Japan Visa

**Your current Japan visa expired on January 28, 2025** - you will need to apply for a new visa before traveling.

**Japan Short-Term Stay Visa Requirements:**
- **Fee:** ~JPY 10,000 (≈ USD 100)
- **Processing time:** 5 working days
- **Apply at:** Japanese embassy or consulate in Dubai/UAE

**Required Documents:**
1. Passport (valid until 2031) ✅
2. Passport photo ✅
3. Application form
4. Flight booking (you already have Dxb-Lis 2027) ✅

---

### 📋 Supporting Documents Checklist

For the Japan visa application, you have:
- ✅ Employment letter (AED 21,000/month)
- ✅ Recent payslips
- ✅ Bank statements (ENBD & BDO)
- ✅ Police clearance
- ✅ Flight booking (already booked)

---

### ⚠️ Important Notes

1. **Your flight booking** shows Dxb-Lis (Dubai to Lisbon) for March 2027 - this appears to be for a different trip. Please confirm your actual Japan itinerary.

2. **UAE residence permit** is valid until 2028, but your Japan visa must be renewed first.

3. **US B1/B2 visa** is valid and can be used for travel purposes.

4. **GCC benefits:** Your UAE residence permit unlocks visa-free travel to Georgia, Mexico, Panama, and Singapore transit benefits.

---

### 📝 Next Steps

1. **Apply for Japan visa** - Contact Japanese embassy/consulate in Dubai
2. **Confirm flight itinerary** - Verify your Japan travel plans
3. **Book return flight** - Japan visa requires confirmed return ticket
4. **Apply for visa 4+ months before** - Processing may take time

Would you like me to:
- Save this report to your documents folder?
- Search for any additional visa requirements for countries on your route?
- Help with anything else for your Japan trip?
