# benefits

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
  _The answer credits the valid US visa with visa-free entry to Mexico and also lists Georgia, Panama, the Dominican Republic, Serbia, and Bosnia and Herzegovina._
- PASS The answer credits the UAE residence permit with entry to at least two of Georgia, Armenia, Qatar, Oman, Saudi Arabia (including e-visa or visa on arrival).  
  _The answer credits UAE residence with visa-free entry to Georgia and conditional access to Armenia, Oman, and Qatar, including visa-on-arrival routes._
- PASS The expired Schengen and Japanese visas are not counted as unlocking anything.  
  _The answer explicitly identifies the Schengen and Japanese visas as expired and states that neither counts toward the listed options._
- PASS Conditions are kept, such as Mexico's FMMd form or Oman's approved-profession condition, and benefits marked partial confidence are labelled as needing checking.  
  _The answer preserves conditions including Mexico’s FMMd form and Oman’s approved-profession requirement, and explicitly flags partial-confidence benefits and unresolved eligibility details as needing confirmation._
- PASS The answer cites official sources or tells the user to confirm on the official page before travelling.  
  _The answer links official government sources for the destinations and instructs the user to confirm on the official page before travelling._

## Delegate calls

1. `file-agent` -> completed: In Personal/Travel, find PDF, JPG, JPEG, PNG and HEIC files whose names, tags or contents suggest a passport, visa, residence permit, residence card or national ID, including files tagged with a name starting with dossier. Search subfolders. Return each match with its real path, file type, tags and modified date. Do not open, move or change any file. If there are no matches, return an empty list and say so.
2. `document-agent` -> completed: From Personal/Travel/Passport/passport-maria-reyes.pdf, Personal/Travel/Visas/us-visa-b1b2.pdf, Personal/Travel/Visas/schengen-visa-france-2025.pdf, and Personal/Travel/UAE/residence-visa.pdf, extract one record per document with these fields: document type, issuing country, holder surname, given names, nationality, date of birth, sex, place of birth, document number, date of issue, date of expiry, issuing authority, and for visas the visa type, entries allowed, duration of stay and valid-from date. Also extract occupation if printed on the residence permit, any prior-use evidence or entry stamps visible, and the machine readable zone lines exactly as printed. Say for each document whether name, document number, date of birth, nationality and expiry in the machine readable zone agree with printed fields. Return a field as empty when not visible; never guess. Report each file you could not read.
3. `photo-agent` -> completed: Run text recognition on Personal/Travel/Visas/japan-visa-2024.jpg and Personal/Travel/UAE/emirates-id-front-back.jpg and return the full recognised text for each image, keeping the two or three machine readable zone lines at the bottom intact and in order. Report each image where no text was recognised.
4. `document-agent` -> completed: Complete the missing extraction checks for Personal/Travel/Passport/passport-maria-reyes.pdf, Personal/Travel/Visas/us-visa-b1b2.pdf, Personal/Travel/Visas/schengen-visa-france-2025.pdf, and Personal/Travel/UAE/residence-visa.pdf. For each file say whether the printed name, nationality, birth date, document number and expiry agree with any visible machine readable zone, or say no zone is visible or the comparison cannot be completed. For the US visa, check whether it is in or linked to the current passport file and whether there is visible evidence it has been used to enter the United States. Return only matching status and evidence descriptions, not full document numbers or machine readable zone lines; never guess when not visible.

## References read

- SKILL.md
- references/workflows/benefits.md
- references/report-format.md
- references/benefits/visa-held.md
- references/benefits/gcc-residence.md
- references/topics/document-fields.md
- references/official-sources.md

## Answer

**Your current documents unlock six destinations without a new visa application under the bundled rules: Bosnia and Herzegovina, the Dominican Republic, Georgia, Mexico, Panama, and Serbia.** North Macedonia and several other options need additional checks.

This assessment is for **Maria Clara Reyes**, as of **7 Nov 2026**, using the documents found in **Personal/Travel**. It covers the extra access your visas and residence permit provide; the skill has no complete list of destinations accessible with a Philippine passport alone.

Your current holdings are:

- **Philippine passport:** expires **15 Mar 2031**.
- **US B1/B2 visa:** multiple entry, expires **1 Jun 2030**.
- **UAE residence permit and Emirates ID:** expire **14 Jan 2028**; occupation shown as Software Engineer.
- **Expired:** Schengen visa on **1 Oct 2025**, Japan visa on **28 Jan 2025**. Neither counts toward the options below.

**Destinations unlocked by your current documents**

These are document-based visa exemptions. Where the official snapshot omits a stay limit or flags conflicting guidance, I’ve kept that limitation visible.

| Destination | What your documents unlock | Validity and remaining details | Official source / checked |
|---|---|---|---|
| **Bosnia and Herzegovina** | Your multiple-entry US visa replaces a Bosnian visa. **90 days in any 180 days**, with each continuous stay **no longer than 30 days**. | The stay must fall within your US visa’s validity, ending **1 Jun 2030**. | [Border Police](https://granpol.gov.ba/en/faq) — 7 Nov 2026 |
| **Dominican Republic** | Your multiple-entry US visa replaces a Dominican visa **for tourism only**. | A **Tourist Card** is still required. The source does not specify the stay limit. This benefit depends on your US visa remaining valid, until **1 Jun 2030**. | [Foreign Ministry](https://servicios360.mirex.gob.do/visas/) — 7 Nov 2026 |
| **Georgia** | Either your **US visa** or **UAE residence permit** provides visa-free entry for **90 days in any 180-day period**. | The US visa route requires validity on entry and remains available until **1 Jun 2030**. Your UAE residence provides an alternative until **14 Jan 2028**; the UAE embassy guidance also requires residence valid through departure and a passport valid at least 90 days. | [Government ordinance](https://matsne.gov.ge/en/document/view/2867377?publication=1), [Georgian Embassy in UAE](https://uae.mfa.gov.ge/visa-information) — 7 Nov 2026 |
| **Mexico** | Your valid US visa provides an exemption for **tourism, business, or transit**. | The source requires the digital migration form **FMMd**, passport validity throughout the visit, and possible proof of purpose. It gives no stay limit. **Consular guidance differs**, including on prior use of the US visa, so confirm with the Mexican consulate serving you. Benefit depends on US visa validity, until **1 Jun 2030**. | [Mexican Consulate](https://consulmex.sre.gob.mx/montreal/index.php/es/enterate/7-servicios-consulares/servicios-a-extranjeros/159-turistasnuevoesp) — 7 Nov 2026, partial |
| **Panama** | Your current US visa replaces a Panamanian visa for a **tourist stay up to 90 days**. | Depends on your US visa remaining valid, until **1 Jun 2030**. | [National Migration Service](https://www.migracion.gob.pa/plantilla-tramite-migratorio-v-tet-variante-273-borrador-2/) — 7 Nov 2026 |
| **Serbia** | Your US visa provides visa-free **entry, transit, and stay for up to 90 days within six months**. | The stay must remain within the visa’s validity, ending **1 Jun 2030**. Carry the national passport and visa. | [Foreign Ministry](https://mfa.gov.rs/en/citizens/travel-serbia/visa-requirements) — 7 Nov 2026 |

**Needs checking before counting these as available**

| Destination | Potential access | What is still unknown | Official source / checked |
|---|---|---|---|
| **North Macedonia** | **Up to 15 days per entry** using a valid multiple-entry US visa. | The rule requires the visa to be **in a valid passport**; the extraction did not confirm its passport linkage. The visa must remain valid at least five days beyond the stay. This temporary rule ends **31 Dec 2026**, unless renewed. | [Foreign Ministry](https://mfa.gov.mk/en-GB/konzularni-uslugi/informacii-za-vlez-vo-rsm) — 7 Nov 2026 |
| **Albania** | Visa-free access using your multiple-entry US visa. | It must have **already been used to enter the US**. No evidence of prior use was returned. The source does not state a maximum stay and has ambiguous wording about departure near visa expiry. | [Albanian Embassy FAQ](https://ambasadat.gov.al/united-kingdom/en/newsroom/pyetje-te-shpeshta/) — 7 Nov 2026, partial |
| **Armenia** | Your UAE residence could provide **up to 180 days within one year** under a temporary exemption running **1 Jul 2026–1 Jul 2027**. | Confirm that **Philippine nationals are on the 111-country eligibility list** and carry the qualifying physical residence card or sticker. Residence must have at least six months left on entry. The bundled snapshot did not verify the nationality list. | [Foreign Ministry](https://www.mfa.am/en/visa/) — 7 Nov 2026, partial |
| **Oman** | GCC-resident **visa on arrival**, for tourism: **28 days**, renewable once for one week; **OMR 5**. | Confirm that **Software Engineer is an approved profession**. You must arrive from the UAE directly or through another GCC state, with proof of profession and at least six months’ passport validity. | [Royal Oman Police](https://www.rop.gov.om/arabic/Visas.aspx?VisaName=AgccVisa) — 7 Nov 2026 |
| **Qatar** | A **visa on arrival** route is mentioned for GCC residents. | The official snapshot omits its stay length, profession rules, and detailed validity conditions, so I cannot confirm your eligibility from it. | [Hayya FAQ](https://hayya.qa/en/faq?tab=a2) — 7 Nov 2026, partial |
| **South Korea** | Your US visa could support a **transit visit of up to 30 days**. | Requires a qualifying journey **to or from the US**, a confirmed onward flight within 30 days, and compliance with stopover and immigration-history conditions. Your documents alone do not establish those. | [Korean Consulate](https://overseas.mofa.go.kr/us-chicago-en/brd/m_26753/view.do?seq=11) — 7 Nov 2026 |

Argentina’s AVE and Türkiye’s conditional e-visa still require an application before travel, so they do not meet your request. Qatar’s Hayya A2 and Saudi Arabia’s GCC-resident e-visa also require advance applications. Sources: [Argentina](https://www.migraciones.gob.ar/ave/index.htm), [Türkiye](https://www.mfa.gov.tr/visa-information-for-foreigners.en.mfa), [Qatar](https://hayya.qa/en/faq?tab=a2), [Saudi Arabia](https://www.visitsaudi.com/en/plan-your-trip/visa-regulations) — all checked 7 Nov 2026.

All six files were readable. The names, birth dates, and nationalities are consistent, with **Santos** shown as a middle name on the passport and included in the Emirates ID name. The extraction did not complete all requested machine-readable-zone checks, so document verification remains incomplete.

Rules change. Confirm on the official page before you apply, pay, book or travel.
