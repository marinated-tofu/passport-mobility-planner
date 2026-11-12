# benefits

**Household:** maria (medium passport)

**Request:** My documents are in Personal/Travel. With what I hold now, where can I go without applying for a visa in advance?

## Checks

- PASS no full document numbers
- PASS only NAS agents as targets
- PASS instructions are one plain line
- PASS no delete, move or send requests
- PASS called file-agent
- PASS called document-agent
- PASS answer matches /Mexico/
- PASS answer matches /Georgia/
- PASS answer matches /Armenia/
- PASS answer avoids /Schengen visa (unlocks|gives|lets)/

## Rubric

- PASS The answer credits the valid US visa with visa-free entry to Mexico, and lists at least three more of Georgia, Panama, Dominican Republic, Albania, Serbia, Bosnia and Herzegovina, North Macedonia.  
  _It credits the valid US visa for Mexico and also lists Georgia, Panama, Dominican Republic, Serbia, Bosnia and Herzegovina, and North Macedonia._
- PASS The answer credits the UAE residence permit with entry to at least two of Georgia, Armenia, Qatar, Oman, Saudi Arabia (including e-visa or visa on arrival).  
  _It credits UAE residence with access routes for Georgia, Armenia, Oman, Qatar, and Saudi Arabia._
- PASS The expired Schengen and Japanese visas are not counted as unlocking anything.  
  _It explicitly identifies the Schengen and Japanese visas as expired and does not use them to unlock entry._
- FAIL Conditions are kept, such as Mexico's FMMd form or Oman's approved-profession condition, and benefits marked partial confidence are labelled as needing checking.  
  _Although it preserves Oman's profession condition, it omits Mexico's FMMd requirement and presents some partial-confidence findings, including Armenia and Mexico, outside the Needs checking section._
- PASS The answer cites official sources or tells the user to confirm on the official page before travelling.  
  _It cites official government sources and advises confirming current rules on official pages before travel._

## Delegate calls

1. `file-agent` -> completed: In the folder Personal/Travel, find PDF, JPG, JPEG, PNG and HEIC files whose names, tags or contents suggest a passport, visa, residence permit, residence card or national ID, including files tagged with a name starting with dossier. Search subfolders. Return each match with its real path, file type, tags and modified date. Do not open, move or change any file. If there are no matches, return an empty list and say so.
2. `document-agent` -> completed: From each of these passport, visa, residence permit or national ID files: Personal/Travel/Passport/passport-maria-reyes.pdf, Personal/Travel/Visas/us-visa-b1b2.pdf, Personal/Travel/Visas/schengen-visa-france-2025.pdf, Personal/Travel/UAE/residence-visa.pdf, extract one record per document with these fields: document type, issuing country, holder surname, given names, nationality, date of birth, sex, place of birth, the last three characters of the document number, date of issue, date of expiry, issuing authority, and for visas the visa type, entries allowed, duration of stay and valid-from date. Compare the machine readable zone with the printed fields yourself and do not return the machine readable zone lines: say for each document whether the name, document number, date of birth, nationality and expiry in the zone agree with the printed page, and for each field that differs, which character positions differ and the two characters at each. Return a field as empty when it is not visible; never guess. Report each file you could not read.
3. `photo-agent` -> completed: Run text recognition on each of these images: Personal/Travel/Visas/japan-visa-2024.jpg, Personal/Travel/UAE/emirates-id-front-back.jpg, and return the full recognised text for each image, keeping the two or three machine readable zone lines at the bottom intact and in order. Report each image where no text was recognised.
4. `document-agent` -> completed: Return the full text of the file Personal/Travel/Requests/index-all-ph-2026-11-07.answer.md exactly as written. If the file does not exist, say only that it does not exist. Do not change any file.
5. `document-agent` -> completed: Return the full text of the file Personal/Travel/Requests/entry-all-ph-us-ae-2026-11-07.answer.md exactly as written. If the file does not exist, say only that it does not exist. Do not change any file.
6. `file-agent` -> completed: Create the folder Personal/Travel/Requests, with its parent folders, if it does not exist, and create in it a new text file named index-all-ph-2026-11-07.request.md containing exactly this one line: question: where a Philippine passport holder may enter without applying for a visa in advance, including visa-free and visa on arrival, with stay length · topic: index · countries: ALL · nationality: PH · residence: AE residence permit valid · held: US B1/B2 multiple entry visa valid · dates: none · purpose: tourism. Do not overwrite an existing file and do not change any other file. Return the saved file path.
7. `file-agent` -> completed: Create the folder Personal/Travel/Requests, with its parent folders, if it does not exist, and create in it a new text file named entry-all-ph-us-ae-2026-11-07.request.md containing exactly this one line: question: which countries allow entry without applying for a visa in advance to holders of a valid US B1/B2 multiple-entry visa or a valid UAE residence permit, including visa-free, visa on arrival and eligible e-visa, with stay length and conditions · topic: entry · countries: ALL · nationality: PH · residence: AE residence permit · held: US B1/B2 multiple entry · dates: none · purpose: tourism. Do not overwrite an existing file and do not change any other file. Return the saved file path.
8. `document-agent` -> completed: Return the full text of the file Personal/Travel/Requests/index-all-ph-2026-11-07.answer.md exactly as written. If the file does not exist, say only that it does not exist. Do not change any file.
9. `document-agent` -> completed: Return the full text of the file Personal/Travel/Requests/entry-all-ph-us-ae-2026-11-07.answer.md exactly as written. If the file does not exist, say only that it does not exist. Do not change any file.
10. `document-agent` -> completed: Return the full text of the file Personal/Travel/Requests/index-all-ph-2026-11-07.answer.md exactly as written. If the file does not exist, say only that it does not exist. Do not change any file.
11. `document-agent` -> completed: Return the full text of the file Personal/Travel/Requests/entry-all-ph-us-ae-2026-11-07.answer.md exactly as written. If the file does not exist, say only that it does not exist. Do not change any file.

**Model in replies:** composer-2.5. **Credential source:** none.

## References read

- SKILL.md
- references/workflows/benefits.md
- references/research.md
- references/report-format.md
- references/topics/document-fields.md
- references/official-sources.md
- /Users/leoangelocabibihan/.claude/projects/-private-tmp-claude-501--Users-leoangelocabibihan-Documents-cf78e2d5-e715-4e8c-8ccd-48d9b4ce2b19-scratchpad-eval-benefits-6rg549fr-skill/c9778205-a5cd-426e-86a6-fe2eb3357ac6/tool-results/bsm8iribg.txt

## Answer

Here is what your **Personal/Travel** documents support today for **Maria Clara Santos Reyes** (Philippine nationality), for places you can enter **without a consular visa application in advance** — mainly **visa-free entry** and **visa on arrival**. Electronic travel authorisations and e-visas that you still apply for online before flying are called out separately.

**Checks on your folder**  
Name, date of birth (12 Apr 1991) and nationality align on the passport, US visa, UAE residence, and Emirates ID.  
**France Schengen visa** (ending **827**) expired **1 Oct 2025** — not counted.  
**Japan temporary visitor** (ending **873**) expired **28 Jan 2025** — not counted.  
**Philippine passport** ending **96B** is valid until **15 Mar 2031** (machine readable zone matches the printed page).

**What counts as valid today**  
- Philippine passport  
- US **B1/B2 multiple-entry** visa until **1 Jun 2030**  
- UAE **residence permit** until **14 Jan 2028** (Software Engineer; Emirates ID matches)

The **passport-only “where can Filipinos go visa-free?” index did not load** in today’s research, so the list below is from **official entry rules matched to your US visa and UAE residence**, not a full Philippine-passport-only worldwide list.

---

## Person: Maria Clara Santos Reyes

### Unlocked (soonest document expiry first)

**Lost on 14 Jan 2028** (UAE residence is the limiting document for these GCC-linked rules)

- **Georgia — visa-free entry**, 90 days in any 180-day period (tourism/general visit)  
  **Unlocked by:** UAE residence valid on entry (GCC residence route) **and/or** valid US B1/B2 on the US-visa route.  
  **Source:** https://matsne.gov.ge/en/document/view/2867377?publication=1 (checked **2026-11-07**); https://uae.mfa.gov.ge/visa-information (checked **2026-11-07**)

- **Armenia — visa-free entry**, up to 180 days within one year  
  **Unlocked by:** UAE residence valid at least 6 months from entry, shown on card/sticker with required fields.  
  **Source:** https://www.mfa.am/en/visa/ (checked **2026-11-07** partial)

- **Oman — visa on arrival**, 28 days from entry (renewable once for one week)  
  **Unlocked by:** valid GCC residence (UAE), passport valid 6 months, plus routing/profession conditions on the official page.  
  **Source:** https://www.rop.gov.om/arabic/Visas.aspx?VisaName=AgccVisa (checked **2026-11-07** verified) — see **Needs checking** for profession and “arriving from GCC” routing.

**Lost on 1 Jun 2030** (US B1/B2 is the main limiter)

- **Mexico — visa-free entry** with a **valid (unexpired) US visa** (any nationality)  
  **Unlocked by:** US B1/B2 valid at entry. Stay length not fully quoted in the index row — confirm on the consular page.  
  **Source:** https://consulmex.sre.gob.mx/montreal/index.php/es/enterate/7-servicios-consulares/servicios-a-extranjeros/159-turistasnuevoesp (checked **2026-11-07** partial)

- **Panama — visa-free entry**, tourist stays up to **90 days**  
  **Unlocked by:** valid US visa.  
  **Source:** https://www.migracion.gob.pa/plantilla-tramite-migratorio-v-tet-variante-273-borrador-2/ (checked **2026-11-07** verified)

- **Dominican Republic — visa-free entry**  
  **Unlocked by:** valid **multiple-entry** US visa.  
  **Source:** https://servicios360.mirex.gob.do/visas/ (checked **2026-11-07** verified)

- **Serbia — visa-free entry**, up to **90 days** within six months (within visa validity)  
  **Unlocked by:** valid US visa in a national passport.  
  **Source:** https://mfa.gov.rs/en/citizens/travel-serbia/visa-requirements (checked **2026-11-07** verified)

- **Bosnia and Herzegovina — visa-free entry**, **90 days in any 180 days** (one continuous stay max **30 days**)  
  **Unlocked by:** valid US **multiple-entry** visa; stay within visa validity.  
  **Source:** https://granpol.gov.ba/en/faq (checked **2026-11-07** verified)

- **North Macedonia — visa-free entry**, up to **15 days** per entry  
  **Unlocked by:** valid US **multiple-entry** visa, valid at least 5 days beyond planned stay.  
  **Source:** https://mfa.gov.mk/en-GB/konzularni-uslugi/informacii-za-vlez-vo-rsm (checked **2026-11-07** verified)

- **Georgia — visa-free entry**, 90 days in any 180 days (also available on US visa if UAE residence is not used)  
  **Unlocked by:** US B1/B2 valid on entry.  
  **Source:** same as above (checked **2026-11-07** verified)

- **South Korea — visa-free entry under third-country transit scheme**, up to **30 days** (B-2 status)  
  **Unlocked by:** Philippine passport (not on the excluded list), valid US visa, confirmed onward flight within 30 days, eligible itinerary (to/from the US or via Korea as rules describe).  
  **Source:** https://www.mofa.go.kr/be-en/brd/m_7440/view.do?seq=748988 (checked **2026-11-07** partial); https://overseas.mofa.go.kr/us-chicago-en/brd/m_26753/view.do?seq=11 (checked **2026-11-07** partial)

---

### Apply online before travel (not a consular visa, but not “no application”)

- **Argentina — Electronic Travel Authorisation (AVE)**, **3 months** from first entry, multiple entries (for **Philippines** with valid US B1/B2 class visa)  
  **Unlocked by:** US B1/B2 valid through processing and planned stay.  
  **Source:** https://www.migraciones.gob.ar/ave/index.htm (checked **2026-11-07** verified)

---

### Needs checking

- **Albania — visa-free entry** with valid US/EU/Schengen **multiple-entry** visa — rule requires the visa to have **already been used** to enter the issuing country or Schengen; your documents do not show travel history.  
  **Missing:** proof the US visa was used at least once.  
  **Source:** https://ambasadat.gov.al/united-kingdom/en/newsroom/pyetje-te-shpeshta/ (checked **2026-11-07** partial)

- **Oman — visa on arrival** — **Missing:** whether **Software Engineer** is on the approved profession list and whether you **arrive from the UAE (or another GCC state) as required**.  
  **Source:** https://www.rop.gov.om/arabic/Visas.aspx?VisaName=AgccVisa (checked **2026-11-07** verified)

- **Saudi Arabia — tourist e-visa for GCC residents** — **Missing:** whether your profession appears on the Ministry of Tourism list and full e-visa conditions (this is **apply online**, not walk-in without prior application).  
  **Source:** https://www.visitsaudi.com/en/plan-your-trip/visa-regulations (checked **2026-11-07** partial)

- **Qatar — Hayya e-visa / visa on arrival for GCC residents** — GCC residence conditions are met in principle; stay and on-arrival details were **partial** in research — confirm before travel.  
  **Source:** https://hayya.qa/en/faq?tab=a2 (checked **2026-11-07** verified); https://www.visitqatar.com/intl-en/practical-info/visas (checked **2026-11-07** partial)

- **Türkiye — e-visa** with valid US or Schengen visa (**Philippines** is on the nationality list) — requires **online e-visa application** before travel.  
  **Source:** https://www.mfa.gov.tr/visa-information-for-foreigners.en.mfa (checked **2026-11-07** partial)

---

### Not covered today

- **Philippine passport alone — visa-free / visa-on-arrival worldwide list** (passport index could not be fetched). To screen destinations by passport only, ask again after the research file fills in, or use official Philippine/destination pages — e.g. DFA: https://dfa.gov.ph/dfa-news/dfa-releasesupdate  

- **Schengen area** — your **France Schengen visa is expired**; you do **not** currently hold a valid Schengen visa for entry without a new application.

---

**Practical summary:** With **no new visa**, your strongest unlocked options are **Georgia, Armenia (GCC residence), Mexico, Panama, Dominican Republic, Serbia, Bosnia, North Macedonia**, and **Korea (30-day scheme)** via the **US B1/B2**, plus **GCC-linked** options (**Georgia, Armenia, Oman VOA** subject to checks) via **UAE residence** until **Jan 2028**.

Rules change. Confirm on the official page before you apply, pay, book or travel.
