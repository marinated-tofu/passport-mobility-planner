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

- PASS The answer flags that the passport expires on 2027-03-19, before the trip, so it must be renewed first, and does not plan the visa on the current passport.  
  _The answer flags the passport’s 2027-03-19 expiry before the trip and explicitly requires renewal before applying for the visa._
- FAIL The answer says he needs a Schengen short-stay (type C) visa, applied for at the consulate of Portugal (main destination by nights) or its provider, with the bundled fee (EUR 90), processing time (15 calendar days, up to 45) and when he can apply (no earlier than 6 months before travel, or a start-by date that leaves the processing time).  
  _Although it gives the correct visa type, fee and processing times, it fails to select Portugal as the main destination and incorrectly treats six months before travel as an application deadline._
- PASS The answer checks the visa's documents against the dossier and says travel insurance, accommodation proof and a flight booking are missing, while the bank statements and employment letter are present.  
  _The answer marks travel insurance, accommodation proof and flight bookings as missing while identifying bank statements and an employment letter as present in the dossier._
- FAIL The answer compares his funds with the bundled Portugal reference amount (EUR 75 per entry plus EUR 40 per day) and handles INR versus EUR with a break-even exchange rate or a stated rate, without inventing one.  
  _The answer lists an INR bank balance but never compares it with Portugal’s EUR 75 per entry plus EUR 40 per day requirement or provides an exchange-rate basis._
- FAIL The answer orders the steps with dates (passport renewal, then the visa application at least 15 days before 8 May 2027 plus margin) and does not give financial advice.  
  _Although renewal precedes the visa application and no financial advice is given, the dated sequence is inconsistent and uses an erroneous November 2026 application deadline instead of a coherent schedule allowing at least 15 days plus margin before 8 May 2027._

## Delegate calls

1. `file-agent` -> completed: In the folder Personal/Travel, find PDF, JPG, JPEG, PNG and HEIC files whose names, tags or contents suggest a passport, visa, residence permit, residence card or national ID, including files tagged with a name starting with dossier. Search subfolders. Return each match with its real path, file type, tags and modified date. Do not open, move or change any file. If there are no matches, return an empty list and say so.
2. `document-agent` -> completed: From the file Personal/Travel/Passport/passport-arjun.pdf, extract one record with these fields: document type, issuing country, holder surname, given names, nationality, date of birth, sex, place of birth, document number, date of issue, date of expiry, issuing authority, and for visas the visa type, entries allowed, duration of stay and valid-from date. Also extract the machine readable zone lines exactly as printed, and say for each document whether the name, document number, date of birth, nationality and expiry in the machine readable zone agree with the printed fields. Return a field as empty when it is not visible; never guess. Report each file you could not read.
3. `file-agent` -> completed: In the folder Personal/Travel, find PDF and image files whose names, tags or contents suggest a birth certificate, marriage certificate, degree certificate, transcript, CV, employment letter, employment contract, payslip, bank statement, tax return, business registration, police clearance, medical certificate, health or travel insurance, tenancy contract, flight booking, accommodation booking or invitation letter. Search subfolders. Return each match with its real path, file type, tags and modified date. Do not open, move or change any file. If there are no matches, return an empty list and say so.
4. `document-agent` -> completed: For each of these bank statement files: Personal/Travel/Bank/kaveri-bank-2026-08-to-10.pdf, return the account holder name, bank name, last three characters of the account number, currency, statement period start and end dates, statement issue date, opening balance, closing balance, the lowest balance shown in the period, total credits and total debits. Also list every credit at or above the threshold amount given, with its date, amount and description, and every credit that repeats each month from the same payer. Return empty for any field not printed. Never return full account numbers.
5. `document-agent` -> completed: For each of these files: Personal/Travel/Supporting/employment-letter-2026-10.pdf, Personal/Travel/Supporting/salary-slips-2026-08-to-10.pdf, Personal/Travel/Supporting/itr-ay-2026-27.pdf, return one record per document. Set the document type to one of the specified types. Always return the holder or person names as printed, the issuing body, the issue date, any expiry or validity dates, and whether an apostille, attestation or certified translation stamp is visible. Also return, when printed: dates and places of birth or marriage and registry numbers for certificates; institution, degree, field and award date for degrees and transcripts; employer, job title, start date, salary and currency for employment documents and payslips; bank, currency, period start and end, opening and closing balance for bank statements; cover period, territory and cover amount for insurance; names, addresses, dates, rent and deposit for tenancy contracts and bookings. For any account, booking or registry number return only its last three characters. Return a field as empty when it is not printed; never guess. Report each file you could not read.

## References read

- SKILL.md
- workflows/plan.md
- references/workflows/plan.md
- references/countries/pt.md
- references/countries/es.md
- references/topics/entry-conditions.md
- references/countries/schengen.md

## Answer

I now have the full picture. Let me compile the trip plan.

## **CRITICAL ISSUE: Passport Expiry**

**Arjun Mehta's Indian passport expires March 19, 2027**, but you're planning to travel **May 8-22, 2027**. 

Schengen rules require your passport to be valid **at least 3 months beyond your departure date**. Since you'll leave on May 22, 2027, your passport must be valid until **August 22, 2027** (or later). **Your current passport will NOT be valid for Schengen travel.**

---

## **Trip Plan: Portugal (Lisbon) + Spain (Madrid) - May 8-22, 2027**

### **1. Passport Renewal - URGENT**
- **Apply immediately** for a new Indian passport
- Processing time: Typically 60-90 days from application
- Cost: ~INR 1,000 (first time)
- You need the passport by **April 1, 2027** (earliest possible)

### **2. Schengen Visa Application**
- **Type**: Schengen Short-Stay Visa (Type C) for tourism
- **Fee**: EUR 90 (~₹7,500)
- **Processing**: 15 calendar days (can extend to 45)
- **Application deadline**: At least 6 months before travel → **before November 8, 2026**
- **Apply**: At the consulate of the main destination country (Spain or Portugal)

### **3. Required Documents for Schengen Visa**
| Document | Status |
|----------|--------|
| Passport application (new) | ⚠️ URGENT - Apply now |
| Passport photo | Need |
| Travel insurance | Need (min EUR 30,000 coverage) |
| Flight booking (Lisbon-Madrid + return) | Need |
| Accommodation proof | Need |
| Bank statements | ✅ Have (Kaveri Bank, INR ~5.26 lakhs closing) |
| Employment letter | ✅ Have (Senior QA Engineer, Lalbagh Software) |
| Payslips | ✅ Have (Aug-Oct 2026, INR 1,85,000/month gross) |
| ITR | ✅ Have (2026-27) |

### **4. Schengen Rules Apply**
- **Passport validity**: 3 months beyond departure (August 22, 2027 minimum)
- **Valid entries**: Unlimited for short-stay visa
- **90/180 rule**: Max 90 days in any 180-day period (your trip is 14 days, so compliant)

### **5. Travel Itinerary (14 days)**
- **May 8-16, 2027**: Lisbon, Portugal (8 nights)
- **May 17-22, 2027**: Madrid, Spain (5 days)
- **Total**: 14 days within Schengen area

### **6. ETIAS**
- Not yet operational (expected Q4 2026)
- Will cost EUR 20 (~₹1,650) when active
- Will be required for visa-exempt travel after your visa is issued

---

## **Summary & Next Steps**

| Item | Status | Action Required |
|------|--------|-----------------|
| **Passport** | ❌ Expires March 19, 2027 | **Apply immediately** for new passport |
| **Schengen Visa** | ❌ Not applied | Apply after new passport is issued (before Nov 2026) |
| **Flight booking** | ❌ Not found | Book Lisbon-Madrid flights |
| **Accommodation** | ❌ Not found | Book hotels for Lisbon & Madrid |
| **Travel insurance** | ❌ Not found | Purchase EUR 30,000+ coverage |

**Do you want me to:**
1. Save this report to the NAS?
2. Help you with the passport application details?
3. Check if there are any updates or changes to these rules?
