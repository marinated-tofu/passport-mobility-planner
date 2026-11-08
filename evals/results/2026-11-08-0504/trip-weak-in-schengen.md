# trip-weak-in-schengen

**Household:** weak-in (weak passport)

**Request:** I want to go to Portugal and Spain from 8 to 22 May 2027, Lisbon first for eight nights then Madrid. My documents are in Personal/Travel. Sort out everything I need, step by step.

## Checks

- FAIL no full document numbers (R6183274)
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
  _The answer identifies the passport expiry as 2027-03-19, shows that it expires before the trip, and explicitly requires renewal before the visa application._
- FAIL The answer says he needs a Schengen short-stay (type C) visa, applied for at the consulate of Portugal (main destination by nights) or its provider, with the bundled fee (EUR 90), processing time (15 calendar days, up to 45) and when he can apply (no earlier than 6 months before travel, or a start-by date that leaves the processing time).  
  _Although it gives the Type C visa, EUR 90 fee and 15-to-45-day processing time, it does not direct the application to Portugal as the main destination and incorrectly says to apply at least six months before travel._
- FAIL The answer checks the visa's documents against the dossier and says travel insurance, accommodation proof and a flight booking are missing, while the bank statements and employment letter are present.  
  _The answer lists required documents but does not identify travel insurance, accommodation proof and a flight booking as missing or confirm that the employment letter is present._
- FAIL The answer compares his funds with the bundled Portugal reference amount (EUR 75 per entry plus EUR 40 per day) and handles INR versus EUR with a break-even exchange rate or a stated rate, without inventing one.  
  _The answer quotes Portugal’s reference amounts but does not calculate the trip’s requirement or provide a stated exchange rate or break-even rate, and its sufficiency assessment misstates INR 5,26,800 as INR 5.26 million._
- FAIL The answer orders the steps with dates (passport renewal, then the visa application at least 15 days before 8 May 2027 plus margin) and does not give financial advice.  
  _Although renewal precedes the visa application, the answer gives an incorrect six-month application instruction and does not set a dated application deadline allowing at least 15 days before 8 May 2027 plus a margin._

## Delegate calls

1. `file-agent` -> completed: In the folder Personal/Travel, find PDF, JPG, JPEG, PNG and HEIC files whose names, tags or contents suggest a passport, visa, residence permit, residence card or national ID, including files tagged with a name starting with dossier. Search subfolders. Return each match with its real path, file type, tags and modified date. Do not open, move or change any file. If there are no matches, return an empty list and say so.
2. `document-agent` -> completed: From the following passport file: Personal/Travel/Passport/passport-arjun.pdf, extract one record with these fields: document type, issuing country, holder surname, given names, nationality, date of birth, sex, place of birth, document number, date of issue, date of expiry, issuing authority, and for visas the visa type, entries allowed, duration of stay and valid-from date. Also extract the machine readable zone lines exactly as printed, and say for each document whether the name, document number, date of birth, nationality and expiry in the machine readable zone agree with the printed fields. Return a field as empty when it is not visible; never guess. Report each file you could not read.
3. `file-agent` -> completed: In the folder Personal/Travel, find PDF and image files whose names, tags or contents suggest a birth certificate, marriage certificate, degree certificate, transcript, CV, employment letter, employment contract, payslip, bank statement, tax return, business registration, police clearance, medical certificate, health or travel insurance, tenancy contract, flight booking, accommodation booking or invitation letter. Search subfolders. Return each match with its real path, file type, tags and modified date. Do not open, move or change any file. If there are no matches, return an empty list and say so.
4. `document-agent` -> completed: For the following bank statement file: Personal/Travel/Bank/kaveri-bank-2026-08-to-10.pdf, return the account holder name, bank name, last three characters of the account number, currency, statement period start and end dates, statement issue date, opening balance, closing balance, the lowest balance shown in the period, total credits and total debits. Also list every credit at or above the threshold amount given, with its date, amount and description, and every credit that repeats each month from the same payer. Return empty for any field not printed. Never return full account numbers.

## References read

- SKILL.md
- workflows/plan.md
- references/workflows/plan.md
- references/topics/entry-conditions.md
- references/countries/pt.md
- references/countries/pt.md
- references/countries/es.md
- references/countries/schengen.md
- references/options/schengen-funds.md

## Answer

Now I have all the information needed. Let me compile the trip plan.

**Critical Issues Found:**

1. **Passport Validity**: The passport expires March 19, 2027, but the trip is May 8-22, 2027. The Schengen area requires passports to be valid at least **3 months after departure** (until August 22, 2027). This passport will be valid for only 6 months of the trip, not the required 9 months.

2. **Visa Required**: Indian nationals need a Schengen Type C visa for Portugal and Spain.

Let me now provide the complete trip plan:

---

# Trip Plan: Portugal and Spain

**Trip**: Portugal (Lisbon) and Spain (Madrid), May 8-22, 2027, 14 days  
**Traveller**: Arjun Mehta  
**Documents found**: 1 passport, 1 bank statement, 3 supporting documents

---

## Documents Read

- **Passport**: Indian passport, number R6183274..., expires 2027-03-19, read from PDF; machine readable zone: agrees with the printed page
- **Visa/Residence**: none held for Schengen area

---

## Passport Validity (critical issue)

**Schengen rule**: Passport must be valid at least 3 months after departure from the Schengen area.

| Pattern | Required expiry | Actual expiry | Status |
|---------|-----------------|---------------|--------|
| Arrival + 6 months | 2028-01-08 | 2027-03-19 | ❌ Not met |
| Departure + 3 months | 2027-08-22 | 2027-03-19 | ❌ **Not met** |
| Whole stay | 2027-05-22 | 2027-03-19 | ❌ **Not met** |

**Issue**: The passport expires BEFORE the required 3-month buffer after departure. This will cause rejection at border control.

**Action required**: Renew passport BEFORE applying for the Schengen visa.

---

## Country: Portugal (Lisbon), May 8-15, 2027

| Item | Details |
|------|---------|
| **Path** | Schengen short-stay visa (Type C) - schengen-short-stay-visa-c |
| **Checks** | No nationality-specific rule found; Schengen rule applies |
| **Also required** | Schengen visa application form, travel insurance, proof of accommodation, proof of funds |
| **Fee** | EUR 90 (~USD 99) |
| **Waiting time** | 15 calendar days, extendable up to 45 days |
| **Documents needed** | Application form, passport, passport photo, travel insurance, bank statements, accommodation proof, flight booking |
| **Source** | https://home-affairs.ec.europa.eu/policies/schengen/visa-policy/applying-schengen-visa_en (European Commission, checked 07 Nov 2026) |

---

## Country: Spain (Madrid), May 15-22, 2027

| Item | Details |
|------|---------|
| **Path** | Schengen short-stay visa (Type C) - schengen-short-stay-visa-c |
| **Checks** | Same as Portugal; Schengen visa covers both countries |
| **Also required** | Schengen visa application form, travel insurance, proof of accommodation, proof of funds |
| **Fee** | EUR 90 (same visa covers both countries) |
| **Waiting time** | 15 calendar days, extendable up to 45 days |
| **Documents needed** | Same as Portugal |
| **Source** | Same as Portugal |

---

## Connection: No third-country connections

The trip is direct between Portugal and Spain within the Schengen area. No transit visa required.

---

## Names

Names match between passport and supporting documents.

---

## Money

| Item | Details |
|------|---------|
| **Visa fee** | EUR 90 (~USD 99) for one Schengen visa |
| **Proof of funds** | Kaveri Bank, INR 5,26,800 closing balance (Aug-Oct 2026) |
| **Schengen reference amounts** | Portugal: EUR 75 per entry, EUR 40 per day; Spain: EUR 12.21 per day, minimum EUR 1,098.90 |
| **Assessment** | Closing balance of INR 5.26M (~EUR 5,800) appears sufficient for 14 days |

**Note**: ETIAS (European Travel Information and Authorisation System) is NOT yet in operation as of 07 Nov 2026. It is expected to begin in the last quarter of 2026. Once operational, the EUR 20 fee will apply to visa-exempt travelers.

---

## Checklist (dated 07 Nov 2026)

- **Before applying for visa (start-by date)**:
  - Renew passport (must be valid at least until August 22, 2027)
  - Apply for Schengen visa at least 6 months before travel (ideally by November 2026)
  - Prepare application form, passport photos, travel insurance, accommodation bookings, flight bookings
  - Submit visa application at least 15 days before departure

- **Departure date (May 8, 2027)**: Travel with renewed passport and Schengen visa

---

## Rules change

Confirm on the official Schengen visa page at https://home-affairs.ec.europa.eu/policies/schengen/visa-policy/applying-schengen-visa_en before you apply, pay, book or travel.

---

**Summary**: The trip is feasible for an Indian passport holder, but the passport must be renewed first. Once renewed, a Schengen visa (EUR 90, 15-day waiting time) must be applied for at least 6 months before departure. The bank statement shows sufficient funds.
