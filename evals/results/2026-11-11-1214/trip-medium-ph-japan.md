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
  _The answer says she must apply for a new Japanese short-stay visa and explicitly states that her 2024 Japan visa expired on 2025-01-28 and is not valid for April 2027._
- PASS The answer gives the bundled fee (about JPY 15,000 single entry), the processing time (five working days after the application is accepted) and where to apply (a Japanese embassy or consulate, or JAPAN eVISA where available).  
  _The answer gives an estimated single-entry fee of JPY 15,000, processing of five working days after acceptance, and application through the competent Japanese consulate or JAPAN eVISA where available._
- PASS The answer checks the visa's documents against her dossier, saying at least that the passport is there and that no flight booking to Japan is on the NAS (the one saved is Dubai to Lisbon), or that the passport photo from 2025-12-01 may be too old.  
  _The answer marks the passport as present and states that no Japan flight booking is on the NAS, identifying the saved Dubai–Lisbon booking as a different trip._
- PASS The answer gives a start-by date that allows the processing time plus margin before 1 April 2027.  
  _The answer gives a start-by date of approximately 20 March 2027, allowing five working days of processing plus a margin before 1 April, and recommends applying earlier._
- PASS Document numbers are masked to their last three characters or left out.  
  _The only document numbers shown are masked to their last three characters, …96B and …873, and other document numbers are omitted._

## Delegate calls

1. `file-agent` -> completed: In the folder Personal/Travel, find PDF, JPG, JPEG, PNG and HEIC files whose names, tags or contents suggest a passport, visa, residence permit, residence card or national ID, including files tagged with a name starting with dossier. Search subfolders. Return each match with its real path, file type, tags and modified date. Do not open, move or change any file. If there are no matches, return an empty list and say so.
2. `document-agent` -> completed: From each of these passport, visa, residence permit or national ID files: Personal/Travel/Passport/passport-maria-reyes.pdf, Personal/Travel/Visas/us-visa-b1b2.pdf, Personal/Travel/Visas/schengen-visa-france-2025.pdf, Personal/Travel/UAE/residence-visa.pdf, extract one record per document with these fields: document type, issuing country, holder surname, given names, nationality, date of birth, sex, place of birth, the last three characters of the document number, date of issue, date of expiry, issuing authority, and for visas the visa type, entries allowed, duration of stay and valid-from date. Compare the machine readable zone with the printed fields yourself and do not return the machine readable zone lines: say for each document whether the name, document number, date of birth, nationality and expiry in the zone agree with the printed page, and for each field that differs, which character positions differ and the two characters at each. Return a field as empty when it is not visible; never guess. Report each file you could not read.
3. `photo-agent` -> completed: Run text recognition on each of these images: Personal/Travel/Visas/japan-visa-2024.jpg, Personal/Travel/UAE/emirates-id-front-back.jpg, and return the full recognised text for each image, keeping the two or three machine readable zone lines at the bottom intact and in order. Report each image where no text was recognised.
4. `file-agent` -> completed: In the folder Personal/Travel, find PDF and image files whose names, tags or contents suggest a birth certificate, marriage certificate, degree certificate, transcript, CV, employment letter, employment contract, payslip, bank statement, tax return, business registration, police clearance, medical certificate, health or travel insurance, tenancy contract, flight booking, accommodation booking or invitation letter. Search subfolders. Return each match with its real path, file type, tags and modified date. Do not open, move or change any file. If there are no matches, return an empty list and say so.
5. `document-agent` -> completed: For each of these files: Personal/Travel/Supporting/birth-certificate-psa.pdf, Personal/Travel/Supporting/degree-bs-computer-science.pdf, Personal/Travel/Supporting/employment-letter-2026-10.pdf, Personal/Travel/Supporting/payslips-2026-08-to-10.pdf, Personal/Travel/Supporting/police-clearance-uae.pdf, Personal/Travel/Supporting/health-insurance-daman.pdf, Personal/Travel/Bookings/flight-dxb-lis-2027-03.pdf, extract one record per document. Set the document type to one of: birth-certificate, marriage-certificate, degree-certificate, transcript, cv, employment-letter, employment-contract, payslips, bank-statements, tax-return, business-registration, sponsor-letter, invitation-letter, police-clearance, medical-certificate, health-insurance, travel-insurance, flight-booking, accommodation-proof, tenancy-contract, proof-of-income, or other with the title as printed. Always return the holder or person names as printed, the issuing body, the issue date, any expiry or validity dates, and whether an apostille, attestation or certified translation stamp is visible. Also return, when printed: dates and places of birth or marriage and registry numbers for certificates; institution, degree, field and award date for degrees and transcripts; employer, job title, start date, salary and currency for employment documents and payslips; bank, currency, period start and end, opening and closing balance for bank statements; cover period, territory and cover amount for insurance; names, addresses, dates, rent and deposit for tenancy contracts and bookings. For any account, booking or registry number return only its last three characters. Return a field as empty when it is not printed; never guess. Report each file you could not read.

**Model in replies:** composer-2.5. **Credential source:** none.

## References read

- SKILL.md
- references/workflows/plan.md
- references/countries/jp.md
- references/topics/entry-conditions.md
- references/topics/document-fields.md

## Answer

## Japan trip plan (1–10 April 2027)

**Trip:** Japan, **1 Apr 2027 – 10 Apr 2027**, traveller **Maria Clara Reyes** (only passport holder found under `Personal/Travel`).  
**Photo library:** not searched; say if you want scans from photos included.

---

**Maria Clara Reyes — Needs action for these dates**  
Philippine passport is fine through the trip, but the **Japan visa on file expired 28 Jan 2025**, so you need a **new short-stay visa** before travel. There is **no Japan flight booking** in the folder (only Dubai–Lisbon in March 2027).

---

### Documents read

- **Passport (Philippines):** nationality PHL, number ending **…96B**, expires **15 Mar 2031**, PDF; **MRZ: agrees** with the printed page.
- **US B1/B2:** expires **1 Jun 2030**, multiple entries — does not replace a Japan visa for tourism.
- **France Schengen (C):** expired **1 Oct 2025** — not usable for this trip.
- **Japan temporary visitor (photo):** single entry, 15 days, number ending **…873**, expired **28 Jan 2025** — **not valid** for Apr 2027; MRZ expiry matches print.
- **UAE residence permit:** expires **14 Jan 2028** — supports applying locally in the UAE; not a Japan entry document.

---

### Passport validity (expires **2031-03-15**; arrival **2027-04-01**; last departure **2027-04-10**)

- Arrival + 6 months → **2027-10-01** — **met** (passport expires after that).
- Departure + 3 months → **2027-07-10** — **met**.
- Whole stay — **met**.  
Japan’s bundled file does not state which rule Japan uses; confirm on the official visa page before you travel.

---

### Country: **Japan** (1–10 Apr 2027)

**Path:** **jp-short-term-visa** — short-stay visa for tourism / visits (up to stay granted on the visa; visa-exempt nationals get up to 90 days without a visa; **Philippines is not listed as visa-exempt** in the bundled data, so this path applies).

**Checks:** No Philippines-specific visa-free rule in the bundle — prior path does not apply.  
**Held Japan visa:** expired **2027-04-01** — **no**.  
**Path used:** apply for **jp-short-term-visa**.

**Also required (from notes):** Fees from **1 Jul 2026** (~JPY 15,000 single / ~JPY 30,000 multiple, local currency); waiver possible; **no fee if refused**. Confirm nationality-specific rules on the source. Use **JAPAN eVISA** if offered for your post.

**Fee / waiting:** about **JPY 15,000** single; **5 working days** after acceptance (bundled).  
Source: https://www.mofa.go.jp/j_info/visit/visa/procedure/pagewe_000001_00391.html (checked **07 Nov 2026**, partial).

**Documents for the application (bundled):**

| Item | Status |
|------|--------|
| Passport | **Have** |
| Passport photo | **Have** (`passport-photo.jpg`) |
| Application form | **Missing** in folder (complete per embassy / eVISA) |
| Flight booking | **Missing** for Japan (only DXB–LIS Mar 2027) |

**Supporting on NAS (often requested, confirm at consulate):** employment letter (Oct 2026), payslips Aug–Oct 2026, UAE police clearance (Jun 2026), degree + birth certificate, UAE residence + Emirates ID — **have**. Bank statements in `Personal/Travel/Bank/` exist but were not parsed for this plan.

**Proof of funds:** not in the bundled required list for **jp-short-term-visa** — **not checked** against a published rule.

---

### Connections

None identified for **Japan Apr 2027** (no saved Japan routing).  
Saved booking: **DXB → LIS**, departs **10 Mar 2027** — different trip; not used as Japan entry evidence.

---

### Names

- Passport: **REYES / MARIA CLARA** (middle name **SANTOS** on birth certificate and Emirates ID, not in passport given-names line).  
- Flight (Lisbon): **REYES/MARIA CLARA MS** — consistent with passport for airline use.  
- Use the **passport spelling** on the Japan application and any new Japan flights; if an embassy form asks for full legal name, follow birth certificate + passport guidance from the consulate.

---

### Money

- **Visa (estimate):** ~JPY 15,000 single ≈ **USD 100** bundled ranking — **1 person**; household total **same** (one traveller).  
- Live exchange rates and fares are **not** available from this Skill.

---

### Checklist (from **7 Nov 2026**)

- **As soon as practical:** Confirm whether **Consulate-General of Japan in Dubai** (or your competent post) accepts your UAE residence + employment set; check **eVISA** eligibility for Philippines passport holders in the UAE.  
- **Before booking Japan:** Start visa prep (itinerary, hotel outline, sponsor/employer letter if they ask).  
- **By ~20 Mar 2027:** Latest bundled “start-by” for a **5-day** process with **7-day** buffer before **1 Apr** departure — prefer applying **weeks or months earlier** (peak season, passport submission).  
- **Book** round-trip or onward **flights to/from Japan** for **1–10 Apr 2027** (required for the bundled application list).  
- **Complete** visa application + photo; submit passport if the post keeps it — plan timing so passport is back before departure.  
- **Health cover:** Daman policy in folder runs to **31 Jan 2027** and territory **UAE only** — arrange **travel/medical insurance for Japan** for April if the consulate or airline requires it.  
- **Carry:** valid passport, **new Japan visa**, UAE residence/ID if useful, employment letter copy, itinerary, insurance.  
- **1 Apr 2027:** Travel with passport and visa as issued.

Optional: add **Personal/Travel** flight and hotel confirmations for Japan to the NAS so a later plan pass can check readiness automatically.

---

**Rules change.** Confirm every requirement, fee, and processing time on the **Ministry of Foreign Affairs / embassy** pages before you apply, pay, book, or travel.

If anyone else is travelling with you, put their documents in `Personal/Travel` (or tell me the folder) and I can extend this plan.
