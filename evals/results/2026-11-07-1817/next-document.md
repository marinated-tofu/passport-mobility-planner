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
  _The answer ranks five options and lists each option’s approximate fee in US dollars and number of additional destinations._
- PASS Every recommended option's fee fits the USD 500 budget.  
  _Every recommended option has a stated application fee below USD 500, and the answer explicitly flags that additional charges could affect the proposed combined package._
- PASS The answer does not recommend options she already holds a valid one of (another US visa).  
  _The answer recognizes the valid US visa and UAE residence documents and recommends new options rather than another US visa._
- PASS The answer explains why the top option ranks first, in terms of new destinations per cost or per waiting time.  
  _The answer explains Schengen’s first-place ranking with 29 additional destinations and explicitly compares destinations per USD 100 and per week of processing._
- PASS Closed or paused programmes and investment routes above the budget are not recommended.  
  _The answer recommends no closed or paused programmes and no investment routes above the budget._

## Delegate calls

1. `file-agent` -> completed: In Personal/Travel, find PDF, JPG, JPEG, PNG and HEIC files whose names, tags or contents suggest a passport, visa, residence permit, residence card or national ID, including files tagged with a name starting with dossier. Search subfolders. Return each match with its real path, file type, tags and modified date. Do not open, move or change any file. If there are no matches, return an empty list and say so.
2. `document-agent` -> completed: From Personal/Travel/Passport/passport-maria-reyes.pdf, Personal/Travel/Visas/us-visa-b1b2.pdf, Personal/Travel/Visas/schengen-visa-france-2025.pdf and Personal/Travel/UAE/residence-visa.pdf, extract one record per document with these fields: document type, issuing country, holder surname, given names, nationality, date of birth, sex, place of birth, document number, date of issue, date of expiry, issuing authority, and for visas the visa type, entries allowed, duration of stay and valid-from date. Also extract the machine readable zone lines exactly as printed, and say for each document whether the name, document number, date of birth, nationality and expiry in the machine readable zone agree with the printed fields. Return a field as empty when it is not visible; never guess. Report each file you could not read.
3. `photo-agent` -> completed: Run text recognition on Personal/Travel/Visas/japan-visa-2024.jpg and Personal/Travel/UAE/emirates-id-front-back.jpg and return the full recognised text for each image, keeping the two or three machine readable zone lines at the bottom intact and in order. Report each image where no text was recognised.

## References read

- SKILL.md
- references/workflows/next-document.md
- references/workflows/benefits.md
- references/topics/entry-conditions.md
- references/report-format.md
- references/options/visitor-and-nomad.md
- references/options/residence-and-investment.md
- references/topics/document-fields.md
- references/benefits/visa-held.md
- references/benefits/gcc-residence.md
- references/options/residence-and-investment.md
- references/official-sources.md
- references/workflows/library.md

## Answer

**Get a new Schengen short-stay visa next.** For Maria Clara Reyes, it offers the largest increase supported by the bundled rules: **29 countries**, with an adult application fee of **EUR 90 (about USD 99)**. Processing normally takes **15 calendar days**, but can extend to **45 days**. Application readiness still needs checking because your itinerary, supporting documents and funds have not been assessed. — [European Commission](https://home-affairs.ec.europa.eu/policies/schengen/visa-policy/applying-schengen-visa_en), checked 07 Nov 2026.

Your documents show a Philippine passport valid until **15 Mar 2031**, a multiple-entry US B1/B2 visa valid until **01 Jun 2030**, and UAE residence and Emirates ID valid until **14 Jan 2028**. Your French Schengen visa expired on **01 Oct 2025**, and your Japanese visa expired on **28 Jan 2025**. All six files were readable.

The comparison below counts **additional destinations relative to your current documents**, assuming the new application is approved. There is no passport access matrix bundled with this skill, so these are counts supported by its rules, rather than a complete worldwide assessment.

| Rank | Next document | Additional destinations | Application fee | Processing time | Destinations per USD 100 | Official source |
|---|---|---|---|---|---|---|
| **1** | **Schengen short-stay visa, type C** | **29 Schengen countries** | EUR 90 ≈ **USD 99** | Usually 15 calendar days; up to 45 | **29.3** | [European Commission](https://home-affairs.ec.europa.eu/policies/schengen/visa-policy/applying-schengen-visa_en), checked 07 Nov 2026 |
| 2 | Ireland short-stay C visa | **1: Ireland** | EUR 60 single entry ≈ **USD 66** | About 8 weeks | **1.52** | [Irish Immigration](https://www.irishimmigration.ie/coming-to-visit-ireland/how-to-apply-for-a-short-stay-c-visit-tourist-visa/visit-family-friend-visa/), checked 07 Nov 2026 |
| 3 | Japan short-term visa | **1: Japan** | About JPY 15,000 single entry ≈ **USD 100**; nationality waivers or different fees may apply | Normally 5 working days after acceptance | **1.00** | [Japan MOFA](https://www.mofa.go.jp/j_info/visit/visa/procedure/pagewe_000001_00391.html), checked 07 Nov 2026; fee data partial |
| 4 | Canada visitor visa, TRV | **1: Canada** | CAD 100 + CAD 85 biometrics ≈ **USD 135** | Not recorded; 30 days assumed for scoring only | **0.74** | [IRCC](https://www.canada.ca/en/immigration-refugees-citizenship/services/visit-canada/apply-visitor-visa.html), checked 07 Nov 2026 |
| 5 | UK Standard Visitor visa, up to 6 months | **1: United Kingdom** | GBP 135 ≈ **USD 176** | Usually 3 weeks after biometrics | **0.57** | [GOV.UK](https://www.gov.uk/standard-visitor/apply-standard-visitor-visa), checked 07 Nov 2026 |

For waiting-time value, Schengen delivers about **13.5 destinations per week** at its normal processing time; Japan about **one per working week**, the UK **0.33**, Ireland **0.125**, and Canada **0.23 using the unverified 30-day scoring assumption**. Appointment availability is additional to these processing periods. Sources and checked dates are those in the table.

The Schengen count comprises Austria, Belgium, Bulgaria, Croatia, Czechia, Denmark, Estonia, Finland, France, Germany, Greece, Hungary, Iceland, Italy, Latvia, Liechtenstein, Lithuania, Luxembourg, Malta, Netherlands, Norway, Poland, Portugal, Romania, Slovakia, Slovenia, Spain, Sweden and Switzerland. This assumes a visa valid throughout the Schengen area; a visa with limited territorial validity covers only the states printed on it. Ireland and Cyprus are outside this count. — [European Commission](https://home-affairs.ec.europa.eu/policies/schengen/schengen-area_en), checked 07 Nov 2026.

**Why the other visas add relatively little:** your existing US visa already supplies the relevant access to Bosnia and Herzegovina, the Dominican Republic, Georgia, Mexico, Panama and Serbia. A Schengen, Canadian or UK visa would duplicate much of that access. Albania remains **Needs checking** because its qualifying multiple-entry visa must already have been used; the files do not establish that your US visa has been used. South Korea also remains **Needs checking** because its benefit requires a qualifying transit itinerary, an onward ticket and immigration-history conditions—it is not unrestricted visitor access. — [Bosnia Border Police](https://granpol.gov.ba/en/faq), [Dominican MIREX](https://servicios360.mirex.gob.do/visas/), [Georgia legislation](https://matsne.gov.ge/en/document/view/2867377?publication=1), [Mexico consulate](https://consulmex.sre.gob.mx/montreal/index.php/es/enterate/7-servicios-consulares/159-turistasnuevoesp), [Panama Migration](https://www.migracion.gob.pa/plantilla-tramite-migratorio-v-tet-variante-273-borrador-2/), [Serbia MFA](https://mfa.gov.rs/en/citizens/travel-serbia/visa-requirements), [Albanian embassy](https://ambasadat.gov.al/united-kingdom/en/newsroom/pyetje-te-shpeshta/), [Korean consulate](https://overseas.mofa.go.kr/us-chicago-en/brd/m_26753/view.do?seq=11), all checked 07 Nov 2026.

For the applications, your **passport is available**; the following items are **not verified**, rather than confirmed missing:

| Option | Documents and conditions still to check |
|---|---|
| Schengen | Application, photo, travel medical insurance, bank statements, accommodation, flight itinerary and evidence of return. Funds depend on the destination and trip length. — [European Commission](https://home-affairs.ec.europa.eu/policies/schengen/visa-policy/applying-schengen-visa_en), checked 07 Nov 2026 |
| Ireland | Application, photo, invitation where applicable, accommodation, bank statements, travel insurance and employment/ties evidence. — [Irish Immigration](https://www.irishimmigration.ie/coming-to-visit-ireland/how-to-apply-for-a-short-stay-c-visit-tourist-visa/visit-family-friend-visa/), checked 07 Nov 2026 |
| Japan | Application, photo and flight itinerary; confirm the Philippine-national checklist and fee with the mission handling your application. — [Japan MOFA](https://www.mofa.go.jp/j_info/visit/visa/procedure/pagewe_000001_00391.html), checked 07 Nov 2026 |
| Canada TRV | Application, photo and bank statements; biometrics status and sufficient funds remain unchecked. — [IRCC](https://www.canada.ca/en/immigration-refugees-citizenship/services/visit-canada/apply-visitor-visa.html), checked 07 Nov 2026 |
| UK | Application, bank statements, employment evidence and a credible funded visit. — [GOV.UK](https://www.gov.uk/standard-visitor/apply-standard-visitor-visa), checked 07 Nov 2026 |

**One cheaper authorisation deserves checking before paying for a Canadian visa:** Canada’s eTA costs **CAD 7 (about USD 5)** and most decisions arrive within minutes, though some take days. The bundled summary does not establish whether your Philippine passport plus US visa qualifies under Canada’s expanded eTA arrangements, so I have not treated it as confirmed eligibility. Confirm that specific combination with IRCC first; if eligible, it could replace the TRV for qualifying air travel. — [IRCC eTA](https://www.canada.ca/en/immigration-refugees-citizenship/services/visit-canada/eta/facts.html), checked 07 Nov 2026.

My suggested order is **Schengen first**, tied to a real trip, applying through the country of your main destination. After that, choose Japan, Ireland or the UK according to where you actually want to travel. Schengen plus those three visas totals approximately **USD 441 in listed application fees** and would add **32 destinations** under this comparison. That leaves about **USD 59** for additional charges; service fees, insurance, exchange-rate changes and any nationality-specific fees mean the full package is **not yet confirmed within USD 500**. Submit passport-dependent applications sequentially. — Application sources and checked dates as listed above.

I reviewed files in **Personal/Travel** only; photo-library searching was off and can be included in a later review. Supporting documents were not searched on this route, so none have been labelled too old or absent.

Rules change. Confirm on the official page before you apply, pay, book or travel.
