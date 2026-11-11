# trip-weak-pk-georgia-armenia

**Household:** weak-pk (weak passport)

**Request:** I live in Dubai. I want to go to Tbilisi from 18 to 24 December 2026, then overland to Yerevan until the 29th, then fly back to Dubai. Could I add Istanbul on the way back too? My documents are in Personal/Travel.

## Checks

- PASS no full document numbers
- PASS only NAS agents as targets
- PASS instructions are one plain line
- PASS no delete, move or send requests
- PASS called file-agent
- PASS called document-agent
- PASS answer matches /Georgia/
- PASS answer matches /Armenia/
- PASS answer avoids /(I have|I've) (booked|applied|submitted)/

## Rubric

- FAIL For Georgia, the answer applies the rule for Pakistani citizens with UAE residence (permit valid at least one year on the day of entry), sees that her permit ends 2027-06-30, about six months after entry, and says she needs a Georgian C1 e-visa instead of visa-free entry.  
  _It correctly calculates that the permit fails Georgia’s one-year requirement, but leaves a generic visa-free route open and makes the C1 e-visa requirement conditional instead of clearly concluding that she needs it._
- PASS For Armenia, the answer uses the GCC residence exemption, checks that the permit is valid at least six months from entry (2027-06-30 against entry on 2026-12-24) and says the 111-country list was not checked so she must confirm Pakistan is on it.  
  _It applies the GCC residence exemption, compares the 2027-06-30 expiry with the six-month threshold of 2027-06-24, and explicitly requires confirmation that Pakistan appears on the unchecked 111-country list._
- PASS For Istanbul, the answer says her UAE residence does not unlock Turkey's conditional e-visa (that needs a Schengen, US, UK or Irish visa or permit) and that a Turkish visa is outside the bundled data or needs the official source.  
  _It explains that UAE residence does not qualify for Türkiye’s conditional e-visa, identifies the required Schengen, US, UK or Irish documents, and directs her to official sources for the visa requirement._
- PASS The answer flags that the UAE residence permit expires on 2027-06-30 and that renewing it matters for these benefits and for returning to Dubai.  
  _It highlights the 2027-06-30 residence expiry, explains renewal’s importance for Georgia’s exemption, and states that returning to Dubai depends on valid UAE residence._
- PASS The answer includes a dated checklist starting now, given the trip is about six weeks away.  
  _It includes a checklist dated 7 November 2026 with immediate action, pre-departure deadlines, and travel-day tasks for the December trip._

## Delegate calls

1. `file-agent` -> completed: In the folder Personal/Travel, find PDF, JPG, JPEG, PNG and HEIC files whose names, tags or contents suggest a passport, visa, residence permit, residence card or national ID, including files tagged with a name starting with dossier. Search subfolders. Return each match with its real path, file type, tags and modified date. Do not open, move or change any file. If there are no matches, return an empty list and say so.
2. `document-agent` -> completed: From each of these passport, visa, residence permit or national ID files: Personal/Travel/Passport/passport-ayesha.pdf, Personal/Travel/UAE/residence-permit.pdf, extract one record per document with these fields: document type, issuing country, holder surname, given names, nationality, date of birth, sex, place of birth, the last three characters of the document number, date of issue, date of expiry, issuing authority, and for visas the visa type, entries allowed, duration of stay and valid-from date. Compare the machine readable zone with the printed fields yourself and do not return the machine readable zone lines: say for each document whether the name, document number, date of birth, nationality and expiry in the zone agree with the printed page, and for each field that differs, which character positions differ and the two characters at each. Return a field as empty when it is not visible; never guess. Report each file you could not read.
3. `photo-agent` -> completed: Run text recognition on each of these images: Personal/Travel/UAE/emirates-id.jpg, and return the full recognised text for each image, keeping the two or three machine readable zone lines at the bottom intact and in order. Report each image where no text was recognised.
4. `file-agent` -> completed: In the folder Personal/Travel, find PDF and image files whose names, tags or contents suggest a birth certificate, marriage certificate, degree certificate, transcript, CV, employment letter, employment contract, payslip, bank statement, tax return, business registration, police clearance, medical certificate, health or travel insurance, tenancy contract, flight booking, accommodation booking or invitation letter. Search subfolders. Return each match with its real path, file type, tags and modified date. Do not open, move or change any file. If there are no matches, return an empty list and say so.
5. `document-agent` -> completed: For each of these files: Personal/Travel/Bank/statement-2026-10.pdf, return one record per document. Set the document type to one of: birth-certificate, marriage-certificate, degree-certificate, transcript, cv, employment-letter, employment-contract, payslips, bank-statements, tax-return, business-registration, sponsor-letter, invitation-letter, police-clearance, medical-certificate, health-insurance, travel-insurance, flight-booking, accommodation-proof, tenancy-contract, proof-of-income, or other with the title as printed. Always return the holder or person names as printed, the issuing body, the issue date, any expiry or validity dates, and whether an apostille, attestation or certified translation stamp is visible. Also return, when printed: dates and places of birth or marriage and registry numbers for certificates; institution, degree, field and award date for degrees and transcripts; employer, job title, start date, salary and currency for employment documents and payslips; bank, currency, period start and end, opening and closing balance for bank statements; cover period, territory and cover amount for insurance; names, addresses, dates, rent and deposit for tenancy contracts and bookings. For any account, booking or registry number return only its last three characters. Return a field as empty when it is not printed; never guess. Report each file you could not read.

**Model in replies:** composer-2.5. **Credential source:** none.

## References read

- SKILL.md
- references/workflows/plan.md
- references/topics/entry-conditions.md
- references/countries/ge.md
- references/countries/am.md
- references/countries/tr.md
- references/countries/ae.md
- references/countries/ge.md
- references/countries/am.md
- references/countries/tr.md
- references/countries/tr.md

## Answer

Your **Personal/Travel** folder only shows travel documents for **Ayesha Khan** (Pakistani passport, UAE residence in Dubai). The plan below is for her. If you are a different traveller or others are coming, add their scans to that folder or say who is travelling—I cannot read documents that are not there. I did not search the photo library; say if you want photos included.

Live flight prices, timetables, and booking are **not** supported here—only entry rules from your NAS documents and the bundled country data.

---

**Trip:** Dubai → Tbilisi **18–24 Dec 2026** → overland → Yerevan **until 29 Dec 2026** → fly back to Dubai (optional **Istanbul** stopover on return). **Traveller:** Ayesha Khan (documents on NAS).

**Person:** Ayesha Khan — **Needs action** (Georgia entry likely needs a Georgian visa unless UAE residence is renewed to meet the one-year rule; Türkiye entry for a city stop is **not** unlocked by UAE residence alone in the bundled data).

---

### Documents read

- **Passport:** Pakistan, number ending **918**, expires **3 Sep 2031**, read from PDF; machine readable zone: **agrees with the printed page**
- **UAE residence permit:** United Arab Emirates, number ending **120**, expires **30 Jun 2027**, GDRFA Dubai (read from PDF)
- **Emirates ID:** Pakistan nationality, expiry **30 Jun 2027** (read from photo); aligns with permit

---

### Passport validity (passport expires **E = 2031-09-03**; arrival **A = 2026-12-18**; last departure **D = 2026-12-29**)

- **A + 6 months = 2027-06-18.** Met (**E** on or after this date): **yes**
- **D + 3 months = 2027-03-29.** Met: **yes**
- **Whole stay** (through **29 Dec 2026**): **yes**
- **Which pattern each country uses:** not spelled out in the bundled Georgia/Armenia files for Pakistani passports; confirm on each official source before travel.

---

### Country: **Georgia** — **18–24 Dec 2026**

**Path (first fully checked rule that failed, then next):**  
1) **ge-visa-free-uae-residence-restricted-nationalities** — does **not** apply (one check **no**).  
2) **ge-visa-free-gcc-visa-or-residence** — all checks **yes**, but **partial** (must confirm on source; embassy text for Pakistan points to a visa if the one-year UAE rule fails).

**Checks — ge-visa-free-uae-residence-restricted-nationalities (Embassy of Georgia in the UAE):**

1. National of Afghanistan, Bangladesh, … **Pakistan**, … Yemen? **Yes** (Pakistani).
2. UAE residence valid **at least 1 year on day of entry**? Entry **2026-12-18** + 1 year = **2027-12-18**; permit expires **2027-06-30** → **2027-06-30** is **before** **2027-12-18** → **No**.

**Checks — ge-visa-free-gcc-visa-or-residence (if you rely on it after confirming):**

1. UAE GCC residence valid on entry and expiry after last day in Georgia (**2026-12-24**)? Permit to **2027-06-30** → **Yes** (confirm on ordinance source).

**Also required:** Embassy note for the restricted rule: if UAE residence has **less than a year left** on entry, you need a **C1 tourist visa** via Georgia’s **e-visa** system. For other nationalities the page mentions passport validity **at least 90 days**—confirm for your case. Copy **e-visa / arrival** requirements from the official site before applying.

**Fee and waiting time:** **not in the bundled data** (no Georgia visa option file in the Skill).

**Documents:** Passport **have**; UAE residence **have**; Georgian visa **missing** if the embassy one-year rule stands; flight/accommodation bookings **not found** in Personal/Travel.

**Source:** https://uae.mfa.gov.ge/visa-information (Embassy of Georgia in the UAE, checked **07 Nov 2026**); https://matsne.gov.ge/en/document/view/2867377?publication=1 (Legislative Herald of Georgia, checked **07 Nov 2026**, partial).

---

### Country: **Armenia** — **~24–29 Dec 2026** (after overland from Georgia)

**Path:** **am-temporary-visa-exemption-gcc-residence** (GCC rule; all checks appear **yes**, rule **partial**).

**Checks:**

1. UAE GCC residence? **Yes**.
2. Valid **≥ 6 months from entry**; card/sticker with Latin script? Entry **2026-12-24** + 6 months = **2027-06-24**; expiry **2027-06-30** ≥ **2027-06-24** → **Yes** (carry physical permit + Emirates ID).

**Also required:** Scheme is temporary **1 Jul 2026 – 1 Jul 2027**; nationality must be on the ministry’s **111-country PDF** (list **not** opened in the Skill)—**confirm Pakistan on that list** on https://www.mfa.am/en/visa/ before travel. Overland border formalities are **not** in the bundled data.

**Fee and waiting time:** exemption path—**not in the bundled data** as a fee; confirm on source.

**Documents:** Passport and UAE residence **have**; **confirm** list eligibility.

**Source:** https://www.mfa.am/en/visa/ (Ministry of Foreign Affairs of Armenia, checked **07 Nov 2026**, partial).

---

### Connection: **Yerevan → Istanbul (IST) → Dubai** — return **~29 Dec 2026** (if you add Istanbul)

**Covered by:** **not covered by the bundled data** for Pakistani passport + UAE residence only (no Schengen/US/UK/Irish visa/residence for **tr-evisa-with-residence** / **tr-evisa-with-visa**).

**Checks — tr-evisa-with-residence:**

1. Pakistani national? **Yes**.
2. Schengen / US / UK / Irish residence? UAE only → **No** → rule does **not** apply.

**Also required for leaving the airport:** Bundled Türkiye file has **no airside transit rule** for Pakistanis. If you **enter** Istanbul (Touristanbul **6–24 h** or Stopover hotel **20 h–7 days** on Turkish Airlines), notes say **you arrange a Turkish visa**; Stopover hotel needs **72 h** advance request, eligible TK international–international via IST, once per journey—https://www.turkishairlines.com/en-int/flights/stopover/ (checked **07 Nov 2026**).

**Could you add Istanbul?** **Maybe:**  
- **Airside only** (no immigration): **needs checking** on the official MFA/transit page—not in bundled data.  
- **City stop / free hotel tour:** **yes in principle** on Turkish Airlines programs, but you likely need a **Turkish visa or another eligible document** first; UAE residence does **not** unlock the bundled e-visa path.

**Source:** https://www.mfa.gov.tr/visa-information-for-foreigners.en.mfa (checked **07 Nov 2026**, partial).

---

### Connection: **Dubai (outbound / return home)**

UAE **home** re-entry as a resident normally depends on a valid **UAE residence** (yours runs to **30 Jun 2027**)—confirm GDRFA/ICP rules before travel. No separate UAE tourist visa needed for this resident return in the bundled data.

---

### Names

**Names match** across passport, UAE permit, Emirates ID, and bank statement (**Ayesha Khan** / **KHAN AYESHA**).

---

### Money

- **Visa fees:** Georgia C1 / Armenia exemption / Türkiye visa—**fees not in the bundled data** for this plan.
- **Proof of funds:** Latest statement found: **AED 24,650** closing balance (**Oct 2026**, Creek Commercial Bank, account ending **174**) for **Ayesha Khan**—**not checked** against any specific visa rule (no fee/threshold in bundle for Georgia C1 here).

---

### Checklist (from **07 Nov 2026**)

- **As soon as possible:** Decide Georgia strategy: **(a)** renew/extend UAE residence so it is valid **≥ 1 year on 18 Dec 2026** (expiry on or after **18 Dec 2027**) and re-check **ge-visa-free-uae-residence-restricted-nationalities**, **or (b)** apply for **Georgia C1 e-visa** (start-by date: **18 Dec 2026 − waiting time − 7 days**—waiting time **unknown** in bundle).
- **Before 18 Dec 2026:** Confirm **Armenia 111-country list** for Pakistan; carry **UAE residence card/sticker + Emirates ID** for Armenia GCC exemption.
- **If Istanbul stop:** Confirm **transit vs entry** visa on official Türkiye pages; if entering, obtain visa **before** booking Stopover/Touristanbul; request Stopover **≥ 72 h** before flight if using the hotel program.
- **Ongoing:** Add **return/onward tickets**, **accommodation**, and **insurance** to Personal/Travel if you want them reflected in a future check (none found now).
- **18 Dec 2026:** Travel with **passport**, **UAE residence**, **Georgian visa** (if required), and documents Armenia/Türkiye officials may ask for (**return ticket**, **funds**, **insurance**—confirm per official sources).

---

**Rules change.** Confirm on the official page before you apply, pay, book, or travel.

If Istanbul is only a **few-hour layover** vs **1–2 nights**, say which you prefer and whether you’d fly **Turkish Airlines**—that changes the visa and Stopover checks, still without live schedules or prices from here.
