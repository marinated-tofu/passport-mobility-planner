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
  _The answer identifies the passport expiry as 2027-03-19, states that it expires before the trip, and requires renewal before applying for the visa._
- PASS The answer says he needs a Schengen short-stay (type C) visa, applied for at the consulate of Portugal (main destination by nights) or its provider, with the bundled fee (EUR 90), processing time (15 calendar days, up to 45) and when he can apply (no earlier than 6 months before travel, or a start-by date that leaves the processing time).  
  _The answer specifies a Schengen type C visa through Portugal as the main destination by nights, EUR 90, processing of 15 calendar days up to 45, and the six-month application window._
- PASS The answer checks the visa's documents against the dossier and says travel insurance, accommodation proof and a flight booking are missing, while the bank statements and employment letter are present.  
  _The answer identifies travel insurance, accommodation proof, and flight bookings as missing while confirming that bank statements and an employment letter are present._
- FAIL The answer compares his funds with the bundled Portugal reference amount (EUR 75 per entry plus EUR 40 per day) and handles INR versus EUR with a break-even exchange rate or a stated rate, without inventing one.  
  _The answer lists Portugal's reference amounts but compares funds against Spain's minimum using an unsupported approximate INR 90/EUR rate, rather than calculating the Portugal requirement and a supported conversion or break-even exchange rate._
- PASS The answer orders the steps with dates (passport renewal, then the visa application at least 15 days before 8 May 2027 plus margin) and does not give financial advice.  
  _The dated checklist places passport renewal before the visa application and sets submission for 16 April 2027, allowing 15 days plus a margin before 8 May, without giving financial advice._

## Delegate calls

1. `file-agent` -> completed: In the folder Personal/Travel, find PDF, JPG, JPEG, PNG and HEIC files whose names, tags or contents suggest a passport, visa, residence permit, residence card or national ID, including files tagged with a name starting with dossier. Search subfolders. Return each match with its real path, file type, tags and modified date. Do not open, move or change any file. If there are no matches, return an empty list and say so.
2. `document-agent` -> completed: From each of these passport, visa, residence permit or national ID files: Personal/Travel/Passport/passport-arjun.pdf, extract one record per document with these fields: document type, issuing country, holder surname, given names, nationality, date of birth, sex, place of birth, the last three characters of the document number, date of issue, date of expiry, issuing authority, and for visas the visa type, entries allowed, duration of stay and valid-from date. Compare the machine readable zone with the printed fields yourself and do not return the machine readable zone lines: say for each document whether the name, document number, date of birth, nationality and expiry in the zone agree with the printed page, and for each field that differs, which character positions differ and the two characters at each. Return a field as empty when it is not visible; never guess. Report each file you could not read.
3. `file-agent` -> completed: In the folder Personal/Travel, find PDF and image files whose names, tags or contents suggest a birth certificate, marriage certificate, degree certificate, transcript, CV, employment letter, employment contract, payslip, bank statement, tax return, business registration, police clearance, medical certificate, health or travel insurance, tenancy contract, flight booking, accommodation booking or invitation letter. Search subfolders. Return each match with its real path, file type, tags and modified date. Do not open, move or change any file. If there are no matches, return an empty list and say so.
4. `document-agent` -> completed: For each of these files: Personal/Travel/Supporting/salary-slips-2026-08-to-10.pdf, Personal/Travel/Supporting/employment-letter-2026-10.pdf, Personal/Travel/Supporting/itr-ay-2026-27.pdf, return one record per document. Set the document type to one of: birth-certificate, marriage-certificate, degree-certificate, transcript, cv, employment-letter, employment-contract, payslips, bank-statements, tax-return, business-registration, sponsor-letter, invitation-letter, police-clearance, medical-certificate, health-insurance, travel-insurance, flight-booking, accommodation-proof, tenancy-contract, proof-of-income, or other with the title as printed. Always return the holder or person names as printed, the issuing body, the issue date, any expiry or validity dates, and whether an apostille, attestation or certified translation stamp is visible. Also return, when printed: dates and places of birth or marriage and registry numbers for certificates; institution, degree, field and award date for degrees and transcripts; employer, job title, start date, salary and currency for employment documents and payslips; bank, currency, period start and end, opening and closing balance for bank statements; cover period, territory and cover amount for insurance; names, addresses, dates, rent and deposit for tenancy contracts and bookings. For any account, booking or registry number return only its last three characters. Return a field as empty when it is not printed; never guess. Report each file you could not read.
5. `document-agent` -> completed: For each of these files: Personal/Travel/Bank/kaveri-bank-2026-08-to-10.pdf, return one record per document. Set the document type to bank-statements. Always return the holder or person names as printed, the issuing body, the issue date, any expiry or validity dates. Return bank, currency, period start and end, opening and closing balance for bank statements. For any account number return only its last three characters. Return a field as empty when it is not printed; never guess. Report each file you could not read.

**Model in replies:** composer-2.5. **Credential source:** none.

## References read

- SKILL.md
- references/workflows/plan.md
- references/topics/entry-conditions.md
- references/countries/pt.md
- references/countries/es.md
- references/countries/schengen.md
- references/options/schengen-funds.md

## Answer

Your documents are in **Personal/Travel** (photo library was not searched; say if you want that included). Here is your step-by-step plan.

---

## Trip overview

**Route:** Lisbon (Portugal) → Madrid (Spain), **8 May 2027 – 22 May 2027**  
**Traveller:** Arjun Mehta (Indian passport)  
**Stay split:** 8 nights Lisbon (arrive **8 May**, leave **16 May**), then Madrid until departure **22 May 2027** (about 6 nights).

**Overall status: Needs action** — passport expires **before** the trip; you will need a **Schengen short-stay visa** (no visa-free rule for Indian nationals in the bundled Portugal/Spain data).

---

## Step 1 — Documents we read

| Item | Detail |
|------|--------|
| **Passport** | India, number ending **274**, expires **19 Mar 2027**, read from `Personal/Travel/Passport/passport-arjun.pdf` |
| **MRZ** | Agrees with the printed page |
| **Visa / permit** | None found in the folder |

**Supporting (on NAS):** payslips Aug–Oct 2026, employment letter (Oct 2026), ITR AY 2026-27, Kaveri Bank statement Aug–Oct 2026 (closing **INR 5,26,800**).

**Not in folder:** flight bookings, accommodation proof, travel insurance, Schengen application form, passport photos.

---

## Step 2 — Passport validity (must fix first)

Passport expiry **E = 2027-03-19** · Arrival **A = 2027-05-08** · Last departure **D = 2027-05-22**

| Rule | Required | Met? |
|------|----------|------|
| A + 6 months | **2027-11-08** | **No** (E is earlier) |
| D + 3 months (Schengen pattern) | **2027-08-22** | **No** |
| Valid for whole stay (E ≥ D) | **2027-05-22** | **No** |

Schengen bundled rules also require the passport to be **issued within the last 10 years** at entry and **valid at least 3 months after leaving** the Schengen area.  
**Action:** Renew the Indian passport **before** any Schengen application. A visa is tied to the passport you apply with.

---

## Step 3 — How you enter Portugal & Spain

**Portugal (8 May – 16 May 2027)** and **Spain (16 May – 22 May 2027)** are both Schengen. The bundled files do not list a benefit rule that lets an **Indian** passport enter without a visa.

**Path:** **schengen-short-stay-visa-c** (Type C, up to 90 days in any 180-day period).  
**Where to apply:** Consulate (or visa centre) of the **main destination** — **Portugal** (longer stay: 8 nights vs ~6 in Madrid).  
**Fee:** EUR **90** · **Waiting time:** **15 calendar days** (up to 45 in individual cases).  
**Source:** https://home-affairs.ec.europa.eu/policies/schengen/visa-policy/applying-schengen-visa_en (European Commission; checked **07 Nov 2026**).

**Also required (from bundled notes):** application form, passport photo, **travel medical insurance** (emergency, hospital, repatriation), **bank statements**, **accommodation proof**, **flight booking**, proof you intend to return; fingerprints at application.

**Documents vs checklist**

| Required | Status |
|----------|--------|
| Application form, passport photo | **Missing** |
| Passport (valid per rules) | **Too old / expires too soon** — renew first |
| Travel insurance | **Missing** |
| Bank statements | **Have** (Kaveri, Aug–Oct 2026) |
| Accommodation proof | **Missing** |
| Flight booking | **Missing** |
| Payslips / employment / ITR | **Have** (supporting) |

---

## Step 4 — Connections & extras

No flight bookings were found, so **connections are not assessed**. When you book, check any non-Schengen transit separately on the official page.

**TAP Portugal stopover (Lisbon/Porto, up to 10 days):** only if you hold a qualifying **TAP** ticket with stopover — **not applicable** until you have tickets.  
Source: https://www.flytap.com/en-us/stopover (checked **07 Nov 2026**).

---

## Step 5 — Names

**Arjun Mehta** on passport, employment letter, payslips, and bank — **names match** (use exactly as in the passport for bookings and visa).

---

## Step 6 — Money

| Item | Amount |
|------|--------|
| Schengen visa (adult) | **EUR 90** (~USD 99 in bundled ranking) |
| Household total (1 traveller) | **EUR 90** |
| Passport renewal fee | **Not in bundled data** |

**Proof of funds (indicative, not advice):**  
Reference amounts include **Portugal** EUR **75** per entry + EUR **40** per day in country, and **Spain** at least EUR **1,098.90** minimum available and about EUR **122.10** per day (Commission reference table; checked **07 Nov 2026**).  
Your statement **closing INR 5,26,800** (lowest in period **INR 3,98,750**) is **above** a rough break-even near **INR ~99,000** if EUR **1,099** at about **90 INR/EUR** — confirm the consulate’s exact threshold and use fresh statements closer to application. **Do not add currencies**; the officer may ask for EUR equivalents.

---

## Step 7 — Dated checklist (from **7 Nov 2026**)

1. **As soon as possible:** Start **Indian passport renewal** (current passport useless for May 2027 travel).
2. **After new passport is in hand:** Book **flights** and **hotels** (Lisbon 8 nights, Madrid remainder); buy **Schengen-compliant travel insurance**.
3. **Earliest visa application:** No earlier than **6 months** before travel → from about **8 Nov 2026** (only once the **new** passport exists).
4. **Start-by for visa submission:** **16 Apr 2027** (departure **8 May** − 15 days processing − 7-day buffer). Submit at the **Portuguese** consulate/centre for your residence.
5. **Before appointment:** Print forms, photos, itinerary, bookings, insurance, bank statements, payslips, employment letter, ITR; bring **old and new** passports if applicable.
6. **Track Schengen 90/180:** This trip is **15 days** in Schengen — stay within your **90 days in any 180-day period** including any other Schengen trips.
7. **8 May 2027:** Travel with **passport**, **Schengen visa**, insurance, and copies of bookings.

---

## What this skill cannot do

Live prices, booking, applying, or paying fees — only preparation from your NAS documents and bundled rules.

**Rules change.** Confirm every requirement on the **official** pages before you apply, pay, book, or travel.

If you share a **budget cap** or **how you plan to fly** (e.g. direct vs via Dubai), the checklist can be tightened around timing and transit — still without live fares.
