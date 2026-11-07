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
  _The answer flags the passport expiry of 2027-03-19 as preceding the trip and explicitly places passport renewal before the visa application._
- FAIL The answer says he needs a Schengen short-stay (type C) visa, applied for at the consulate of Portugal (main destination by nights) or its provider, with the bundled fee (EUR 90), processing time (15 calendar days, up to 45) and when he can apply (no earlier than 6 months before travel, or a start-by date that leaves the processing time).  
  _Although it gives the type C visa, EUR 90 fee and 15–45 day processing time, it incorrectly directs the application to Spain despite Portugal having more nights and misstates the six-month application window as a deadline._
- FAIL The answer checks the visa's documents against the dossier and says travel insurance, accommodation proof and a flight booking are missing, while the bank statements and employment letter are present.  
  _It confirms bank statements and an employment letter are present and explicitly marks insurance as missing, but does not clearly identify accommodation proof and a flight booking as missing from the dossier._
- FAIL The answer compares his funds with the bundled Portugal reference amount (EUR 75 per entry plus EUR 40 per day) and handles INR versus EUR with a break-even exchange rate or a stated rate, without inventing one.  
  _It declares the INR balance sufficient without comparing it with EUR 75 per entry plus EUR 40 per day or providing an exchange rate or break-even calculation._
- FAIL The answer orders the steps with dates (passport renewal, then the visa application at least 15 days before 8 May 2027 plus margin) and does not give financial advice.  
  _It orders passport renewal before the visa application but provides no dated renewal schedule and gives an erroneous November 2026 visa deadline instead of a correctly dated application schedule allowing at least 15 days plus margin before departure._

## Delegate calls

1. `file-agent` -> completed: In the Personal/Travel folder, find PDF, JPG, JPEG, PNG and HEIC files whose names, tags or contents suggest a passport, visa, residence permit, residence card or national ID, including files tagged with a name starting with dossier. Search subfolders. Return each match with its real path, file type, tags and modified date. Do not open, move or change any file. If there are no matches, return an empty list and say so.
2. `document-agent` -> completed: From the file path Personal/Travel/Passport/passport-arjun.pdf, extract one record with these fields: document type, issuing country, holder surname, given names, nationality, date of birth, sex, place of birth, document number, date of issue, date of expiry, issuing authority, and for visas the visa type, entries allowed, duration of stay and valid-from date. Also extract the machine readable zone lines exactly as printed, and say for each document whether the name, document number, date of birth, nationality and expiry in the machine readable zone agree with the printed fields. Return a field as empty when it is not visible; never guess. Report each file you could not read.
3. `file-agent` -> completed: In the Personal/Travel folder, find PDF and image files whose names, tags or contents suggest a birth certificate, marriage certificate, degree certificate, transcript, CV, employment letter, employment contract, payslip, bank statement, tax return, business registration, police clearance, medical certificate, health or travel insurance, tenancy contract, flight booking, accommodation booking or invitation letter. Search subfolders. Return each match with its real path, file type, tags and modified date. Do not open, move or change any file. If there are no matches, return an empty list and say so.
4. `document-agent` -> waiting_user: For each file path given, return one record per document. Set the document type to one of: birth-certificate, marriage-certificate, degree-certificate, transcript, cv, employment-letter, employment-contract, payslips, bank-statements, tax-return, business-registration, sponsor-letter, invitation-letter, police-clearance, medical-certificate, health-insurance, travel-insurance, flight-booking, accommodation-proof, tenancy-contract, proof-of-income, or other with the title as printed. Always return the holder or person names as printed, the issuing body, the issue date, any expiry or validity dates, and whether an apostille, attestation or certified translation stamp is visible. Also return, when printed: dates and places of birth or marriage and registry numbers for certificates; institution, degree, field and award date for degrees and transcripts; employer, job title, start date, salary and currency for employment documents and payslips; bank, currency, period start and end, opening and closing balance for bank statements; cover period, territory and cover amount for insurance; names, addresses, dates, rent and deposit for tenancy contracts and bookings. For any account, booking or registry number return only its last three characters. Return a field as empty when it is not printed; never guess. Report each file you could not read.
5. `document-agent` -> waiting_user: For each file path given, return one record per document. Set the document type to one of: birth-certificate, marriage-certificate, degree-certificate, transcript, cv, employment-letter, employment-contract, payslips, bank-statements, tax-return, business-registration, sponsor-letter, invitation-letter, police-clearance, medical-certificate, health-insurance, travel-insurance, flight-booking, accommodation-proof, tenancy-contract, proof-of-income, or other with the title as printed. Always return the holder or person names as printed, the issuing body, the issue date, any expiry or validity dates, and whether an apostille, attestation or certified translation stamp is visible. Also return, when printed: dates and places of birth or marriage and registry numbers for certificates; institution, degree, field and award date for degrees and transcripts; employer, job title, start date, salary and currency for employment documents and payslips; bank, currency, period start and end, opening and closing balance for bank statements; cover period, territory and cover amount for insurance; names, addresses, dates, rent and deposit for tenancy contracts and bookings. For any account, booking or registry number return only its last three characters. Return a field as empty when it is not printed; never guess. Report each file you could not read.
6. `document-agent` -> completed: Personal/Travel/Bank/kaveri-bank-2026-08-to-10.pdf, Personal/Travel/Supporting/salary-slips-2026-08-to-10.pdf, Personal/Travel/Supporting/employment-letter-2026-10.pdf, Personal/Travel/Supporting/itr-ay-2026-27.pdf
7. `file-agent` -> completed: Personal/Travel/Bank/kaveri-bank-2026-08-to-10.pdf, Personal/Travel/Supporting/salary-slips-2026-08-to-10.pdf, Personal/Travel/Supporting/employment-letter-2026-10.pdf, Personal/Travel/Supporting/itr-ay-2026-27.pdf

## References read

- SKILL.md
- references/countries/pt.md
- references/countries/es.md
- references/benefits/index.md
- references/countries/schengen.md

## Answer

I now have all the documents and country information. Let me compile the complete trip plan.

---

# TRIP PLAN: Portugal (Lisbon) + Spain (Madrid) - May 8-22, 2027

## 1. DOCUMENTS FOUND IN Personal/Travel Folder

### Travel Documents
| Document | File Path | Key Details |
|----------|-----------|-------------|
| **Indian Passport** | `Personal/Travel/Passport/passport-arjun.pdf` | Holder: **ARJUN MEHTA**; Issuing: India; Expiry: **19 MAR 2027** |

### Supporting Documents
| Document | File Path | Key Details |
|----------|-----------|-------------|
| Bank Statement | `Personal/Travel/Bank/kaveri-bank-2026-08-to-10.pdf` | Kaveri Bank; INR; Aug-Oct 2026; Opening: 4.12L; Closing: **5.27L** |
| Salary Slips | `Personal/Travel/Supporting/salary-slips-2026-08-to-10.pdf` | Lalbagh Software Pvt Ltd; Net pay: **INR 1.4L/month** |
| Employment Letter | `Personal/Travel/Supporting/employment-letter-2026-10.pdf` | Senior QA Engineer; Salary: INR 22.2L/year |
| Tax Return | `Personal/Travel/Supporting/itr-ay-2026-27.pdf` | Assessment Year 2026-27 |

---

## 2. CRITICAL ISSUE: PASSPORT EXPIRY

⚠️ **YOUR PASSPORT EXPIRES ON 19 MARCH 2027**

Your planned trip is **May 8-22, 2027**. At that time, your passport will have expired approximately **1.5 months ago**.

**Schengen entry rules require:** Your passport must be valid **at least 3 months beyond your return date**. You need to return on May 22, so your passport must be valid until **August 22, 2027** (or at minimum, the date you depart from the Schengen area).

**Action Required: RENEW YOUR PASSPORT IMMEDIATELY**

---

## 3. VISA REQUIREMENTS FOR INDIAN CITIZENS

### Schengen Visa (Type C) Required for Both Portugal and Spain

| Requirement | Details |
|-------------|---------|
| **Fee** | EUR 90 (adults); ~USD 99 |
| **Waiting Time** | 15 days (extendable up to 45 days) |
| **Application Deadline** | At least 6 months and 15 days before travel (so by **November 2026**) |
| **Application Location** | Spanish consulate (Spain is main destination) |
| **Documents Required** | Application form, passport, passport photo, travel insurance, bank statements, accommodation proof, flight booking |

**Also Required:**
- **Health Insurance**: Must cover emergencies, hospital care, and repatriation in Schengen area (minimum EUR 30,000 coverage)
- **Proof of Purpose**: Flight itinerary, accommodation bookings for May 8-22, 2027

---

## 4. AIRLINE/STOPOVER BENEFITS

### TAP Portugal Stopover
- **Benefit**: Up to 10 days stop in Lisbon or Porto at no extra airfare
- **How to Use**: Book a TAP ticket with Lisbon/Porto as a connection point; stopover option added at booking
- **Note**: Schengen entry rules apply

---

## 5. TRIP LOGISTICS SUMMARY

| Item | Details |
|------|---------|
| **Trip Dates** | May 8-22, 2027 (14 days total) |
| **Lisbon** | 8 nights (May 8-16) |
| **Madrid** | 6 nights (May 16-22) |
| **Route** | Fly into Lisbon → Lisbon (8 nights) → Fly to Madrid → Madrid (6 nights) → Fly home |
| **Passport Validity Required** | Until **August 22, 2027** (minimum 3 months beyond return) |
| **Visa Application Deadline** | By **November 2026** |

---

## 6. NEXT STEPS

### Step 1: Passport Renewal (URGENT)
1. Apply for passport renewal at the Indian Passport Office
2. Processing time: ~1-2 months (expedited available)
3. Expected cost: ~₹1,500 (current Indian passport renewal fee)

### Step 2: Flight Bookings
1. Book TAP flights with stopover option for Lisbon (if eligible)
2. Flight to Madrid from Lisbon
3. Flight home from Madrid
4. Book flight bookings before applying for visa

### Step 3: Visa Application
1. Apply for Schengen visa via appointment with Spanish consulate
2. Submit all documents (bank statement, employment letter, ITR, salary slips)
3. Attend biometric appointment
4. Wait ~15-45 days for decision

### Step 4: Accommodation Bookings
1. Book Lisbon accommodation for 8 nights (May 8-16)
2. Book Madrid accommodation for 6 nights (May 16-22)
3. Include proof of payment in visa application

---

## 7. DOCUMENTS YOU HAVE FOR VISA APPLICATION

| Document | Status | Notes |
|----------|--------|-------|
| Indian Passport | ❌ **EXPIRED** | Must renew before travel |
| Bank Statement | ✅ Available | Shows INR 5.27L balance; sufficient for proof of funds |
| Employment Letter | ✅ Available | Confirms senior QA Engineer position |
| Salary Slips | ✅ Available | 3 months of consistent income (INR 1.4L/month net) |
| ITR 2026-27 | ✅ Available | Tax compliance proof |
| Travel Insurance | ❌ Not found | Need to purchase Schengen-compliant insurance |

---

**Do you want me to save this trip plan report to your NAS documents folder?**
