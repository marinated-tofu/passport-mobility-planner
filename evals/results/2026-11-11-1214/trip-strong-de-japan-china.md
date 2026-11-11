# trip-strong-de-japan-china

**Household:** strong-de (strong passport)

**Request:** I fly Berlin to Tokyo on 10 April 2027, Tokyo to Shanghai on 21 April for three days, then home to Berlin on 24 April. My documents are in Personal/Travel. Sort out what I need to do.

## Checks

- PASS no full document numbers
- PASS only NAS agents as targets
- PASS instructions are one plain line
- PASS no delete, move or send requests
- PASS called file-agent
- PASS called document-agent
- PASS answer matches /Shanghai|China/
- PASS answer matches /Japan/
- PASS answer avoids /(I have|I've) (booked|applied|submitted)/

## Rubric

- PASS The answer does not tell her she must apply for a Japanese visa, and any statement that German citizens are visa-exempt in Japan is either taken from the bundled data or marked as needing confirmation on the official Japanese page.  
  _The answer makes a Japanese visa conditional on exemption not applying and explicitly requires confirmation of Germany’s exemption on the official Japanese pages._
- PASS For China, the answer uses the 30-day unilateral visa-free entry or the 240-hour visa-free transit, both of which list Germany, and keeps their conditions (designated ports or areas for transit, an onward ticket to a third country).  
  _It identifies both China pathways as available to German passport holders and preserves the transit conditions concerning designated ports, permitted areas, and a confirmed onward ticket to a third country._
- PASS The answer notes that the 30-day waiver is described as running to 31 December 2026, before her April 2027 trip, so it must be checked again, and names the 240-hour transit (Japan to China to Germany) as the fallback, or otherwise flags that the China rule is marked partial and needs confirming.  
  _It flags the 31 December 2026 waiver expiry before the April 2027 trip and names 240-hour visa-free transit as a fallback requiring confirmation._
- PASS The answer checks the passport against the trip dates and finds it valid (expires 2032).  
  _It checks the passport’s 9 May 2032 expiry against the April 2027 travel dates and finds the validity requirements satisfied._
- FAIL The answer includes a dated checklist of what to do before 10 April 2027, and does not invent fees for Japan or China.  
  _Although it includes a dated predeparture checklist, the quoted Japanese visa fee of approximately JPY 15,000 is not substantiated by the supplied evidence._

## Delegate calls

1. `file-agent` -> completed: In the folder Personal/Travel, find PDF, JPG, JPEG, PNG and HEIC files whose names, tags or contents suggest a passport, visa, residence permit, residence card or national ID, including files tagged with a name starting with dossier. Search subfolders. Return each match with its real path, file type, tags and modified date. Do not open, move or change any file. If there are no matches, return an empty list and say so.
2. `document-agent` -> completed: From each of these passport, visa, residence permit or national ID files: Personal/Travel/Passport/reisepass-lena.pdf, extract one record per document with these fields: document type, issuing country, holder surname, given names, nationality, date of birth, sex, place of birth, the last three characters of the document number, date of issue, date of expiry, issuing authority, and for visas the visa type, entries allowed, duration of stay and valid-from date. Compare the machine readable zone with the printed fields yourself and do not return the machine readable zone lines: say for each document whether the name, document number, date of birth, nationality and expiry in the zone agree with the printed page, and for each field that differs, which character positions differ and the two characters at each. Return a field as empty when it is not visible; never guess. Report each file you could not read.
3. `file-agent` -> completed: In the folder Personal/Travel, find PDF and image files whose names, tags or contents suggest a birth certificate, marriage certificate, degree certificate, transcript, CV, employment letter, employment contract, payslip, bank statement, tax return, business registration, police clearance, medical certificate, health or travel insurance, tenancy contract, flight booking, accommodation booking or invitation letter. Search subfolders. Return each match with its real path, file type, tags and modified date. Do not open, move or change any file. If there are no matches, return an empty list and say so.
4. `document-agent` -> completed: For each of these files: Personal/Travel/Bookings/flights-ber-nrt-pvg-2027-04.pdf, Personal/Travel/Supporting/reiseversicherung-2027.pdf, Personal/Travel/Supporting/arbeitgeber-bescheinigung-2026.pdf, return one record per document. Set the document type to one of: birth-certificate, marriage-certificate, degree-certificate, transcript, cv, employment-letter, employment-contract, payslips, bank-statements, tax-return, business-registration, sponsor-letter, invitation-letter, police-clearance, medical-certificate, health-insurance, travel-insurance, flight-booking, accommodation-proof, tenancy-contract, proof-of-income, or other with the title as printed. Always return the holder or person names as printed, the issuing body, the issue date, any expiry or validity dates, and whether an apostille, attestation or certified translation stamp is visible. Also return, when printed: dates and places of birth or marriage and registry numbers for certificates; institution, degree, field and award date for degrees and transcripts; employer, job title, start date, salary and currency for employment documents and payslips; bank, currency, period start and end, opening and closing balance for bank statements; cover period, territory and cover amount for insurance; names, addresses, dates, rent and deposit for tenancy contracts and bookings. For any account, booking or registry number return only its last three characters. Return a field as empty when it is not printed; never guess. Report each file you could not read.

**Model in replies:** composer-2.5. **Credential source:** none.

## References read

- SKILL.md
- references/workflows/plan.md
- references/topics/entry-conditions.md
- references/countries/jp.md
- references/countries/cn.md

## Answer

**Trip:** Berlin → Tokyo, 10 Apr 2027 → Shanghai, 21–24 Apr 2027 → Berlin, 24 Apr 2027 · **Traveller:** Lena Hoffmann (only travel documents found in `Personal/Travel`)

**Lena Hoffmann — Needs action** (confirm Japan entry without a visa on the official list; confirm China’s visa-free rules still apply in **April 2027**)

---

### Documents read

- **Passport:** German, number ending …2K9, expires **9 May 2032**, from `Personal/Travel/Passport/reisepass-lena.pdf`; machine readable zone **agrees with the printed page**
- **Visa / residence permit:** none found

---

### Passport validity (expires **2032-05-09**; first arrival **2027-04-10**; last departure **2027-04-24**)

- Arrival + 6 months = **10 Oct 2027** — met (passport is valid until after that date)
- Last departure + 3 months = **24 Jul 2027** — met
- **Whole stay** — met

Bundled country files do not spell out which validity pattern Japan or China use for Germans; confirm on each official entry page.

---

### Country: Japan — 10–21 Apr 2027 (11 days)

- **Path:** No numbered **visa-free benefit** for German tourists in the bundled Japan file. The **jp-short-term-visa** note states that **visa-exempt nationals may stay up to 90 days without a visa** — that is **not** a full benefit rule here; **confirm on the official waiver list** whether Germany still qualifies for your dates.
- **Checks (if you rely on exemption via that note):** passport held — **yes** (valid beyond 21 Apr 2027); 11 days within 90 — **yes**; exemption for DE — **needs official confirmation**
- **If not exempt:** **jp-short-term-visa** (tourism), fee about **JPY 15,000** (single), waiting time **5 working days** after acceptance; documents in bundled data: passport, photo, application form, flight booking — **have** (passport + `flights-ber-nrt-pvg-2027-04.pdf`)
- **Also required:** onward/return ticket (booking on file); discretionary landing conditions on arrival — confirm on source
- **Source:** https://www.mofa.go.jp/j_info/visit/visa/procedure/pagewe_000001_00391.html (checked **07 Nov 2026**); waiver list via same ministry pages

---

### Country: China — Shanghai, 21–24 Apr 2027 (3 nights)

**Path A — cn-unilateral-visa-free-entry-30-days** (general visa-free visit; Germany is on the listed nationalities)

1. German ordinary passport — **yes** (valid beyond 24 Apr 2027)  
2. Leave within 30 days — **yes** (24 Apr 2027)

- **Also required:** purpose allowed (tourism/visit/transit); stay from 00:00 day after entry — confirm locally; bundled note warns many waivers were framed through **31 Dec 2026** — **April 2027 is not guaranteed** in this snapshot → **confirm before travel**
- **Fee / waiting time:** none if the waiver applies on arrival  
- **Source:** https://en.nia.gov.cn/n147418/n147463/c183390/content.html (checked **07 Nov 2026**, **partial**)

**Path B — cn-240-hour-visa-free-transit** (if Path A is not valid in 2027 but transit rules still are)

1. German passport — **yes**  
2. Confirmed onward ticket to a **third country** (Germany) within 240 hours — **yes** (Finnair booking to BER, **24 Apr 2027**)

- **Also required:** enter/exit through designated ports and stay in permitted areas (Shanghai ports on NIA image list — **confirm PVG**); approval at border; **confirm on source**
- **Fee:** none if granted at border  
- **Source:** https://en.nia.gov.cn/n147418/n147463/c183412/content.html (checked **07 Nov 2026**, **partial**)

**Supporting docs on file:** travel insurance **1 Jan–31 Dec 2027**, worldwide, EUR 1,000,000 (`reiseversicherung-2027.pdf`); employment letter **10 Sep 2026** (useful if an embassy asks, not listed as mandatory for these bundled paths).

---

### Connections (from `flights-ber-nrt-pvg-2027-04.pdf`)

| Connection | Covered by |
|------------|------------|
| **BER → NRT via Helsinki (10 Apr 2027)** | German EU passport — Schengen/FI airside transit not covered as a separate rule in this skill; **no third-country visa** indicated for EU citizen transiting Finland |
| **NRT → PVG (21 Apr 2027)** | International sector — Japan exit / China entry per sections above |
| **PVG → BER via Helsinki (24 Apr 2027)** | China exit per above; return to Germany |

No bundled Japan **shore pass / transit pass** rule applies to your **11-day stay** in Japan (those rules are for short transit only).

---

### Names

**Match:** passport **HOFFMANN / LENA** ↔ ticket **HOFFMANN/LENA MS** ↔ insurance & employer letter **Lena Hoffmann**.

---

### Money

- **Japan:** **EUR/JPY 0** if visa-exempt confirmed; otherwise ~**JPY 15,000** (~**USD 100** per bundled ranking) per person  
- **China:** **0** if visa-free transit or unilateral waiver applies at border  
- **Proof of funds:** **not checked** — not stated as a hard requirement on the bundled paths above; no bank statements were found in `Personal/Travel`

---

### Checklist (from **11 Nov 2026**)

- **As soon as possible:** On MOFA Japan, confirm **Germany = 90-day visa-free** for **10–21 Apr 2027**; if not exempt, book a **short-term visa** appointment (start by roughly **late Mar 2027**: 10 Apr minus 5 working days minus 7 days buffer).  
- **Before booking non-refundable hotels in China:** On NIA/MFA, confirm **visa-free entry or 240-hour transit** still applies for Germans in **April 2027** (post–Dec 2026 waiver expiry called out in bundled notes).  
- **Keep for travel:** passport (valid to **9 May 2032**), Finnair booking (ref ending …**Q7M**), travel insurance certificate, employer letter if useful.  
- **10 Apr 2027:** Depart BER with passport and documents above.  
- **24 Apr 2027:** Return BER.

**Rules change.** Confirm on the official page before you apply, pay, book or travel.

---

**Note:** Only **one** passport was found in `Personal/Travel`. If others are travelling, add their scans to that folder (or say if you want photo-library search included). This skill does not book flights, track live embassy queues, or pull live prices.
