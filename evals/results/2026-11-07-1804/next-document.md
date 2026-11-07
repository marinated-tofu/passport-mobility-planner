# next-document

**Request:** Documents are in Personal/Travel. I can spend up to USD 500 on fees. Which visa or travel authorisation should I get next to open up the most new countries?

## Checks

- PASS no full document numbers
- PASS only NAS agents as targets
- PASS instructions are one plain line
- PASS no delete, move or send requests
- PASS called file-agent
- PASS called document-agent
- PASS answer avoids /Start-up Visa|Immigrant Investor Programme|Business Innovation and Investment/

## Rubric

- PASS The answer ranks a few options with the fee in US dollars and the number of new destinations each one adds.  
  _The answer ranks five options and gives each one's fee in US dollars and number of additional destinations._
- PASS Every recommended option's fee fits the USD 500 budget.  
  _Every recommended option has a stated fee below USD 500, and the suggested combination totals approximately USD 400 with additional charges explicitly flagged._
- PASS The answer does not recommend options she already holds a valid one of (another US visa).  
  _The answer recognizes the valid US visa and UAE residence documents and recommends renewing Schengen and Japan access only after identifying their previous visas as expired._
- PASS The answer explains why the top option ranks first, in terms of new destinations per cost or per waiting time.  
  _The answer explains that Schengen adds the most destinations and quantifies its advantage as 29.3 destinations per USD 100 and 13.5 per week of processing._
- PASS Closed or paused programmes and investment routes above the budget are not recommended.  
  _The recommended options contain no closed or paused programmes or investment routes above the budget._

## Delegate calls

1. `file-agent` -> completed: In Personal/Travel, find PDF, JPG, JPEG, PNG and HEIC files whose names, tags or contents suggest a passport, visa, residence permit, residence card or national ID, including files tagged with a name starting with dossier. Search subfolders. Return each match with its real path, file type, tags and modified date. Do not open, move or change any file. If there are no matches, return an empty list and say so.
2. `document-agent` -> completed: Read Personal/Travel/Passport/passport-maria-reyes.pdf, Personal/Travel/Visas/us-visa-b1b2.pdf, Personal/Travel/Visas/schengen-visa-france-2025.pdf and Personal/Travel/UAE/residence-visa.pdf. Extract one record per document with document type, issuing country, holder surname, given names, nationality, date of birth, sex, place of birth, document number, date of issue, date of expiry, issuing authority, and for visas visa type, entries allowed, duration of stay and valid-from date; for residence permits include occupation if printed. Extract machine readable zone lines exactly as printed and say whether name, document number, birth date, nationality and expiry agree with printed fields. Return empty for fields not visible, never guess, and report unreadable files. Report any visible evidence of prior visa use.
3. `photo-agent` -> completed: Run text recognition on Personal/Travel/Visas/japan-visa-2024.jpg and Personal/Travel/UAE/emirates-id-front-back.jpg and return the full recognised text for each image, keeping the two or three machine readable zone lines at the bottom intact and in order. Report each image where no text was recognised.

## References read

- SKILL.md
- references/workflows/next-document.md
- references/workflows/benefits.md
- references/topics/entry-conditions.md
- references/report-format.md
- references/options/visitor-and-nomad.md
- references/options/residence-and-investment.md
- references/benefits/visa-held.md
- references/benefits/gcc-residence.md
- references/topics/document-fields.md
- references/options/residence-and-investment.md
- references/official-sources.md

## Answer

**Get a new Schengen short-stay visa (type C) next.** For Maria Clara Reyes, it offers the largest increase in documented country access within your **USD 500 fee budget: 29 Schengen countries**, at a base application fee of **EUR 90, about USD 99**. Processing normally takes **15 calendar days**, with some cases taking up to **45 days**. Apply through the country of your actual main destination. [European Commission — checked 07 Nov 2026](https://home-affairs.ec.europa.eu/policies/schengen/visa-policy/applying-schengen-visa_en).

This recommendation is conditional on meeting the application requirements, including funds, insurance and a genuine itinerary. Approval and multiple-entry validity are not guaranteed.

I read all six travel-document files in `Personal/Travel`. Your Philippine passport expires **15 Mar 2031**, your multiple-entry US B1/B2 visa **1 Jun 2030**, and your UAE residence and Emirates ID **14 Jan 2028**. Your French Schengen visa expired **1 Oct 2025**, and your Japan visa expired **28 Jan 2025**. The recommendation therefore restores expired access.

The five strongest options with known fees are below. **Counts describe additional access supported by the bundled rules, assuming issuance**; there is no bundled Philippine passport matrix, so this is not a complete worldwide visa-free comparison. All five still need application eligibility and supporting evidence checked.

| Rank | Document | Additional countries | Base fee | Processing snapshot | Countries per USD 100 / per week |
|---|---|---|---|---|---|
| **1** | **Schengen type C** | **29**, listed below | EUR 90 ≈ **USD 99** | 15 calendar days; up to 45 | **29.3 / 13.5** at 15 days. [Source — checked 07 Nov 2026](https://home-affairs.ec.europa.eu/policies/schengen/visa-policy/applying-schengen-visa_en) |
| 2 | Ireland short-stay C, single entry | **1: Ireland** | EUR 60 ≈ **USD 66** | About 8 weeks after documents reach the visa office | **1.5 / 0.13**. [Source — checked 07 Nov 2026](https://www.irishimmigration.ie/coming-to-visit-ireland/how-to-apply-for-a-short-stay-c-visit-tourist-visa/visit-family-friend-visa/) |
| 3 | Japan short-term visa, single entry | **1: Japan** | About JPY 15,000 ≈ **USD 100**; nationality-specific waivers or different fees may apply | 5 working days after acceptance | **1.0 / about 1 working week**. [Source — checked 07 Nov 2026, partial](https://www.mofa.go.jp/j_info/visit/visa/procedure/pagewe_000001_00391.html) |
| 4 | Canada visitor visa | **1: Canada** | CAD 100 + CAD 85 biometrics ≈ **USD 135** | Not captured; 30 days assumed for scoring only | **0.74 / 0.23**. [Source — checked 07 Nov 2026, partial](https://www.canada.ca/en/immigration-refugees-citizenship/services/visit-canada/apply-visitor-visa.html) |
| 5 | UK Standard Visitor, up to 6 months | **1: United Kingdom** | GBP 135 ≈ **USD 176** | Usually 3 weeks after biometrics | **0.57 / 0.33**. [Source — checked 07 Nov 2026](https://www.gov.uk/standard-visitor/apply-standard-visitor-visa) |

The 29 Schengen countries are **Austria, Belgium, Bulgaria, Croatia, Czechia, Denmark, Estonia, Finland, France, Germany, Greece, Hungary, Iceland, Italy, Latvia, Liechtenstein, Lithuania, Luxembourg, Malta, Netherlands, Norway, Poland, Portugal, Romania, Slovakia, Slovenia, Spain, Sweden and Switzerland**. This assumes a visa valid throughout Schengen; a visa with limited territorial validity covers only its printed territories. [European Commission — checked 07 Nov 2026](https://home-affairs.ec.europa.eu/policies/schengen/schengen-area_en).

Your existing US visa already supports access to Bosnia and Herzegovina, the Dominican Republic, Georgia, Mexico, Panama and Serbia, subject to each destination’s entry conditions. I have not counted these again as gains from another visa. [Bosnia](https://granpol.gov.ba/en/faq), [Dominican Republic](https://servicios360.mirex.gob.do/visas/), [Georgia](https://matsne.gov.ge/en/document/view/2867377?publication=1), [Mexico](https://consulmex.sre.gob.mx/montreal/index.php/es/enterate/7-servicios-consulares/servicios-a-extranjeros/159-turistasnuevoesp), [Panama](https://www.migracion.gob.pa/plantilla-tramite-migratorio-v-tet-variante-273-borrador-2/), [Serbia](https://mfa.gov.rs/en/citizens/travel-serbia/visa-requirements) — checked 07 Nov 2026; Mexico’s snapshot is partial.

Several possible benefits remain **Needs checking**, and contribute no extra confirmed countries here:

- **Albania:** your US visa must already have been used to enter the US; the files did not establish prior use. A new Schengen visa would also need to be multiple entry and used first. [Official source — checked 07 Nov 2026, partial](https://ambasadat.gov.al/united-kingdom/en/newsroom/pyetje-te-shpeshta/).
- **South Korea:** the US-visa transit route requires a qualifying itinerary, onward ticket and immigration-history conditions. This is conditional transit access. [Official source — checked 07 Nov 2026](https://overseas.mofa.go.kr/us-chicago-en/brd/m_26753/view.do?seq=11).
- **North Macedonia:** your US visa supports qualifying visits under a temporary decision ending **31 Dec 2026**; renewal for 2027 is unconfirmed. [Official source — checked 07 Nov 2026](https://mfa.gov.mk/en-GB/konzularni-uslugi/informacii-za-vlez-vo-rsm).

**Before paying for Canada’s visitor visa, check whether you qualify for its CAD 7 eTA, about USD 5, for air travel.** The bundled eTA record does not establish the expanded eligibility rules for a Philippine passport holder with your US visa, so I cannot confirm that cheaper route from this snapshot. [IRCC — checked 07 Nov 2026](https://www.canada.ca/en/immigration-refugees-citizenship/services/visit-canada/eta/facts.html).

For application preparation, you have a current passport and UAE residence evidence. Supporting documents were not assessed on this route, so the following are **unverified, rather than confirmed absent**:

| Option | Evidence still to check or prepare |
|---|---|
| Schengen | Form, photo, travel insurance, bank statements, accommodation and flight itinerary |
| Ireland | Form, photo, invitation/accommodation evidence, bank statements, insurance and employment letter |
| Japan | Form, photo and flight itinerary; confirm the local checklist and fee |
| Canada visitor visa | Form, photo and bank statements; establish whether biometrics are needed |
| UK visitor visa | Form, bank statements, employment evidence and trip funding |

These checklists use the application sources and checked dates in the ranking table. No supporting document was assessed as too old. All six travel files were readable, although the returned text did not fully establish every machine-readable-zone comparison. Names, nationality and birth date otherwise align; the passport separately records **Santos** as your middle name, which the Emirates ID includes in the full name.

**Suggested spending order:** Schengen first, then documents for trips you actually intend to take. At the snapshot’s approximate base fees, **Schengen + Ireland + Japan + Canada visitor visa total USD 400**, adding **32 documented destinations** and leaving about **USD 100** for additional fees. This is a provisional fee plan: service charges, local fee differences and currency changes must be checked before treating the combination as within budget. Use separate passport-submission windows for applications that retain it. Application steps and fees: official sources in the table, checked 07 Nov 2026.

Rules change. Confirm on the official page before you apply, pay, book or travel.
