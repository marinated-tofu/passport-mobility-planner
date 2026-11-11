# trip-strong-jp-korea-canada

**Household:** strong-jp (strong passport)

**Request:** I'm going from Osaka to Seoul on 2 May 2027 for three days, then Seoul to Vancouver on 5 May until the 19th. My documents are in Personal/Travel. What paperwork do I need?

## Checks

- PASS no full document numbers
- PASS only NAS agents as targets
- PASS instructions are one plain line
- PASS no delete, move or send requests
- PASS called file-agent
- PASS called photo-agent
- PASS answer matches /eTA/
- PASS answer matches /K-ETA/
- PASS answer avoids /(I have|I've) (booked|applied|submitted)/

## Rubric

- PASS The passport is read from the photo by text recognition, and the answer confirms the machine readable zone agrees with the printed page or reports that it checked it.  
  _The completed photo-agent call requests text recognition including the MRZ, and the answer explicitly confirms that the MRZ agrees with the printed passport page._
- PASS For Canada, the answer names the eTA for arrival by air with its bundled fee (CAD 7) and timing (most approved within minutes), and says to get it before booking or before flying; any claim that Japanese citizens are visa-exempt is sourced or marked to confirm.  
  _The answer identifies Canada's eTA for arrival by air, gives the CAD 7 fee and approval timing of minutes for most applications, requires application before flying, and marks Japanese visa-exempt eligibility for confirmation with IRCC._
- PASS For Korea, the answer names the K-ETA (KRW 10,000 plus a payment charge) and passes on the bundled caveat that Korea has waived it for some nationalities and the current exemption list was not checked, so he should confirm.  
  _The answer identifies K-ETA, gives the KRW 10,000 fee plus a 3% charge, and explicitly says some nationalities have waivers and the current exemption list was not checked and must be confirmed._
- PASS Neither country is turned into a visa application.  
  _The answer uses K-ETA and eTA as the applicable paths and mentions a Canadian visitor visa only as a conditional alternative if eTA eligibility does not apply._
- PASS The answer includes a dated checklist, with the K-ETA done before the 2 May flight and the eTA before the 5 May flight.  
  _The checklist is dated 11 November 2026 and requires both authorisations to be approved before 2 May 2027, covering the Korea flight that day and the Canada flight on 5 May._

## Delegate calls

1. `file-agent` -> completed: In the folder Personal/Travel, find PDF, JPG, JPEG, PNG and HEIC files whose names, tags or contents suggest a passport, visa, residence permit, residence card or national ID, including files tagged with a name starting with dossier. Search subfolders. Return each match with its real path, file type, tags and modified date. Do not open, move or change any file. If there are no matches, return an empty list and say so.
2. `photo-agent` -> completed: Run text recognition on each of these images: Personal/Travel/Passport/passport-photo-page.jpg, and return the full recognised text for each image, keeping the two or three machine readable zone lines at the bottom intact and in order. Report each image where no text was recognised.
3. `file-agent` -> completed: In the folder Personal/Travel, find PDF and image files whose names, tags or contents suggest a birth certificate, marriage certificate, degree certificate, transcript, CV, employment letter, employment contract, payslip, bank statement, tax return, business registration, police clearance, medical certificate, health or travel insurance, tenancy contract, flight booking, accommodation booking or invitation letter. Search subfolders. Return each match with its real path, file type, tags and modified date. Do not open, move or change any file. If there are no matches, return an empty list and say so.
4. `document-agent` -> completed: For each of these files: Personal/Travel/Bookings/kix-icn-yvr-2027-05.pdf, Personal/Travel/Supporting/hotel-vancouver-2027-05.pdf, return one record per document. Set the document type to one of: birth-certificate, marriage-certificate, degree-certificate, transcript, cv, employment-letter, employment-contract, payslips, bank-statements, tax-return, business-registration, sponsor-letter, invitation-letter, police-clearance, medical-certificate, health-insurance, travel-insurance, flight-booking, accommodation-proof, tenancy-contract, proof-of-income, or other with the title as printed. Always return the holder or person names as printed, the issuing body, the issue date, any expiry or validity dates, and whether an apostille, attestation or certified translation stamp is visible. Also return, when printed: dates and places of birth or marriage and registry numbers for certificates; institution, degree, field and award date for degrees and transcripts; employer, job title, start date, salary and currency for employment documents and payslips; bank, currency, period start and end, opening and closing balance for bank statements; cover period, territory and cover amount for insurance; names, addresses, dates, rent and deposit for tenancy contracts and bookings. For any account, booking or registry number return only its last three characters. Return a field as empty when it is not printed; never guess. Report each file you could not read.

**Model in replies:** composer-2.5. **Credential source:** none.

## References read

- SKILL.md
- references/workflows/plan.md
- references/topics/entry-conditions.md
- references/countries/jp.md
- references/countries/kr.md
- references/countries/ca.md
- references/topics/document-fields.md
- references/benefits/index.md

## Answer

Here is your trip paperwork check based on **Personal/Travel** (photo library was not searched; say if you want document photos included too).

---

**Trip:** Japan (Osaka) → South Korea (Seoul) 2 May 2027–5 May 2027 (3 days), then South Korea → Canada (Vancouver) 5 May 2027–19 May 2027; return Osaka 19 May 2027 — **traveller: Kenji Sato**

**Person: Kenji Sato — Needs action** (passport and bookings look fine; you still need **K-ETA** for Korea and **eTA** for Canada before travel.)

---

### Documents read

- **Passport:** Japan, number ending **273**, expires **11 Jun 2034**, read from photo `Personal/Travel/Passport/passport-photo-page.jpg`; **MRZ: agrees** with the printed page (name, number, DOB, nationality, expiry).
- **Visas / residence permits:** none found in Personal/Travel.

**Supporting files read**

- **Flight booking** (`Personal/Travel/Bookings/kix-icn-yvr-2027-05.pdf`): KIX–ICN 2 May 2027, ICN–YVR 5 May 2027, YVR–KIX 19 May 2027; passenger **SATO/KENJI MR**; ref ending **2RT** (Korean Air).
- **Accommodation** (`Personal/Travel/Supporting/hotel-vancouver-2027-05.pdf`): Vancouver **5–19 May 2027** for **KENJI SATO**.

**Not found in the folder:** bank statements, travel/health insurance, Seoul accommodation proof, birth certificate, or other visa-support papers.

---

### Passport validity  
*(passport expires **E = 2034-06-11**; first foreign arrival **A = 2027-05-02** Korea; last departure **D = 2027-05-19** from Canada)*

| Check | Date | Met? |
|--------|------|------|
| A + 6 months | 2027-11-02 | **Yes** (E is after this) |
| D + 3 months | 2027-08-19 | **Yes** |
| Valid through whole trip | through 19 May 2027 | **Yes** |

Canada’s bundled visitor-visa note says a passport is **often expected valid at least 6 months**; the **eTA** page should be checked for the exact rule you must meet.  
Source pattern: IRCC visitor guidance (checked **07 Nov 2026**, partial) — https://www.canada.ca/en/immigration-refugees-citizenship/services/visit-canada/apply-visitor-visa.html

---

### Country: Japan  
*You only **leave** from Osaka; no inbound Japan stop is on this itinerary except **return 19 May 2027**.*

- **Path:** Japanese national returning home — **not spelled out as a separate “benefit” rule** in the bundled Japan file; routine re-entry as a citizen is outside what this skill verifies.
- **Documents:** passport — **have**.

---

### Country: South Korea — **2 May 2027–5 May 2027** (Seoul)

- **Path:** No bundled **visa-free entry rule for Japanese nationals** appears in `countries/kr.md`. Next applicable option: **K-ETA** — `kr-k-eta` (electronic travel authorisation for nationals who may enter visa-free / under waiver; **confirm that Japan is on the current K-ETA nationality list on the official site**).
- **Checks (conceptual):** passport through stay — **yes** (expiry 2034-06-11 > 2027-05-05); onward ticket to Canada — **yes** (ICN–YVR 5 May); purpose tourism — matches trip.
- **Also required (from bundled notes):** apply **online before boarding**; fee **not refunded** if refused; **K-ETA waivers for some nationalities** — current list **not checked** in the bundle — confirm on source.
- **Fee and waiting time:** about **KRW 10,000 + 3%** online charge; usually within **72 hours**.  
  Source: https://www.k-eta.go.kr/portal/guide/viewetaapplication.do (checked **07 Nov 2026**, verified)
- **Bundled required documents:** passport, passport photo, application form — **passport: have**; **K-ETA application / approval: missing** (not in your folder).
- **Seoul hotel / local accommodation proof:** **missing** in NAS (officers often ask for stay details even when no visa sticker is required — worth carrying or having ready).

**Optional extra:** Incheon transit tour (`kr-incheon-airport-transit-tour`) is for **short layover tours**, not a substitute for a normal 3-day Seoul stay.

---

### Country: Canada — **5 May 2027–19 May 2027** (Vancouver)

- **Path:** **eTA** — `ca-eta` (visa-exempt nationals **arriving by air**).
- **Checks:** flying to YVR — **yes**; Japanese passport is commonly visa-exempt for visits — **confirm on IRCC**; passport tied to eTA — must use the **same** passport you used to apply (your current passport is fine until 2034).
- **Also required:** apply **before the flight**; **not** for land/sea arrival (you are flying — eTA applies).
- **Fee and waiting time:** **CAD 7**; most approvals in minutes, some take **several days**.  
  Source: https://www.canada.ca/en/immigration-refugees-citizenship/services/visit-canada/eta/facts.html (checked **07 Nov 2026**, verified)
- **Bundled required documents:** passport, application form — **passport: have**; **eTA approval: missing**.
- **You have:** flight ICN–YVR, Vancouver hotel **5–19 May** — **have**.
- **If you ever needed a visitor visa instead** (only if you were not eTA-eligible): proof of funds and **6 months** of bank statements per bundled rule — **not checked** (no statements in folder).

---

### Connection: **ICN → YVR**, 5 May 2027  
- **Covered by:** planned **entry to Canada** with eTA (not airside-only transit). No third-country airport stop bundled on this leg.

---

### Names  
**Names match:** passport **SATO / KENJI**; ticket **SATO/KENJI MR**; hotel **KENJI SATO** — normal airline/hotel formatting; no mismatch to fix.

---

### Money (fees only; one traveller)

| Item | Fee |
|------|-----|
| K-ETA (Korea) | ~KRW 10,000 + 3% (~USD 7 bundled estimate) |
| eTA (Canada) | CAD 7 (~USD 5 bundled estimate) |
| **Household total (fees)** | **~USD 12** order of magnitude |

**Proof of funds:** **not checked** — no bank statements in Personal/Travel; not listed as required for K-ETA/eTA in the bundled required-document lists.

---

### Checklist (from **11 Nov 2026**)

- **As soon as practical:** Apply for **Canada eTA** (IRCC) using passport ending **273** — keep approval email/number for check-in.
- **By ~28 Apr 2027 (≥7 days before Korea, allowing up to ~72 h for K-ETA):** Apply for **K-ETA**; allow for possible nationality waiver changes on the official list.
- **Before 2 May 2027:** Confirm **K-ETA** and **eTA** are **approved** and linked to the **same** passport; re-apply if you renew the passport.
- **Before Korea:** Arrange **Seoul accommodation** proof (booking or host details) — **not on NAS today**.
- **Recommended (not found on NAS):** **Travel medical insurance** for Canada/Korea if your insurers or carriers require it.
- **2 May 2027:** Travel with **physical passport**, **eTA** and **K-ETA** confirmations (digital or print), **flight PDF**, **Vancouver hotel PDF**, and any **Seoul stay** details you add.
- **19 May 2027:** Return flight YVR–KIX — carry same passport + any return documents Japan may ask for (bundled data does not list extra paperwork for your nationality entering Japan).

---

**Rules change.** Confirm every requirement on the **official K-ETA and IRCC eTA pages** before you apply, pay, book, or travel.

If you want, we can next tag these files on the NAS or turn this into a saved report (that would need your okay first).
