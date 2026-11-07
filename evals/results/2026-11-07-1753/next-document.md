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

- FAIL The answer ranks a few options with the fee in US dollars and the number of new destinations each one adds.  
  _The answer ranks five options and gives USD fees, but does not give the number of new destinations added by Schengen._
- PASS Every recommended option's fee fits the USD 500 budget.  
  _Every recommended option has a quoted application fee below USD 500, including Canada's stated biometrics fee._
- PASS The answer does not recommend options she already holds a valid one of (another US visa).  
  _The answer accounts for her valid US visa and UAE residence and recommends documents she does not currently hold in valid form._
- FAIL The answer explains why the top option ranks first, in terms of new destinations per cost or per waiting time.  
  _The answer says Schengen provides the broadest access but does not explain its ranking in terms of new destinations per dollar or per waiting time._
- PASS Closed or paused programmes and investment routes above the budget are not recommended.  
  _The recommendations include no closed or paused programmes or investment routes above the budget._

## Delegate calls

1. `file-agent` -> completed: In Personal/Travel, find PDF, JPG, JPEG, PNG and HEIC files whose names, tags or contents suggest a passport, visa, residence permit, residence card or national ID, including files tagged with a name starting with dossier. Search subfolders. Return each match with its real path, file type, tags and modified date. Do not open, move or change any file. If there are no matches, return an empty list and say so.
2. `document-agent` -> completed: Read Personal/Travel/Passport/passport-maria-reyes.pdf, Personal/Travel/Visas/us-visa-b1b2.pdf, Personal/Travel/Visas/schengen-visa-france-2025.pdf and Personal/Travel/UAE/residence-visa.pdf. Extract one record per document with document type, issuing country, holder surname, given names, nationality, date of birth, sex, place of birth, document number, date of issue, date of expiry, issuing authority, and for visas visa type, entries allowed, duration of stay and valid-from date. Extract the machine readable zone lines exactly as printed and say whether name, document number, date of birth, nationality and expiry agree with printed fields. Include occupation and evidence of visa use if printed. Return empty for fields not visible; never guess. Report each unreadable file.
3. `photo-agent` -> completed: Run text recognition on Personal/Travel/Visas/japan-visa-2024.jpg and Personal/Travel/UAE/emirates-id-front-back.jpg and return full recognised text for each image, keeping the two or three machine readable zone lines at the bottom intact and in order. Report each image where no text was recognised.

## References read

- SKILL.md
- references/workflows/next-document.md
- references/workflows/benefits.md
- references/report-format.md
- references/options/visitor-and-nomad.md
- references/options/residence-and-investment.md
- references/topics/document-fields.md
- references/options/residence-and-investment.md
- references/benefits/visa-held.md
- references/benefits/gcc-residence.md
- references/official-sources.md

## Answer

**A new Schengen short-stay visa (type C) is your best next document for widening travel access within USD 500**, subject to having a genuine Schengen trip and meeting its application requirements. It restores access across the Schengen area, while most extra-country benefits of other major visas overlap with your valid US visa. The adult application fee is **EUR 90, about USD 99**, before service charges; processing normally takes **15 calendar days**, with some cases taking up to 45. [European Commission — checked 07 Nov 2026](https://home-affairs.ec.europa.eu/policies/schengen/visa-policy/applying-schengen-visa_en).

For Maria Clara Reyes, I found and read six travel documents in `Personal/Travel`:

| Document | Position on 07 Nov 2026 |
|---|---|
| Philippine passport | Valid until 15 Mar 2031 |
| US B1/B2 visa, multiple entry | Valid until 01 Jun 2030 |
| UAE residence permit and Emirates ID | Valid until 14 Jan 2028 |
| French-issued Schengen visa | Expired 01 Oct 2025 |
| Japanese single-entry visitor visa | Expired 28 Jan 2025 |

All six files were readable. Birth dates and nationalities agree. Your Emirates ID includes “Santos,” which appears as the passport’s middle name; the visas show “Maria Clara Reyes.” I searched the named folder only.

**These are the five strongest visitor-document candidates from the bundled rules.** The Schengen option offers the broadest direct access; the other four each add their issuing country, with little additional benefit beyond your current holdings.

| Priority | Document and additional access | Application fee | Published processing time | Official source |
|---|---|---|---|---|
| **1** | **Schengen type C:** restores access across the Schengen area, subject to the visa’s territorial validity | EUR 90 ≈ **USD 99**, plus any service charges | Usually 15 calendar days; up to 45 | [European Commission — checked 07 Nov 2026](https://home-affairs.ec.europa.eu/policies/schengen/visa-policy/applying-schengen-visa_en) |
| **2** | **Ireland short-stay C:** adds Ireland | EUR 60 single entry ≈ **USD 66**; EUR 100 multiple entry | About 8 weeks after documents reach the visa office | [Irish Immigration — checked 07 Nov 2026](https://www.irishimmigration.ie/coming-to-visit-ireland/how-to-apply-for-a-short-stay-c-visit-tourist-visa/visit-family-friend-visa/) |
| **3** | **Japan short-term visa:** restores Japan access | About JPY 15,000 single entry ≈ **USD 100**; nationality-specific waivers or differences need checking | Five working days after acceptance | [Japan MOFA — checked 07 Nov 2026; fee information partial](https://www.mofa.go.jp/j_info/visit/visa/procedure/pagewe_000001_00391.html) |
| **4** | **Canada visitor visa:** adds Canada | CAD 100 + CAD 85 biometrics ≈ **USD 135**, assuming biometrics are needed | Not established in the bundled snapshot | [IRCC — checked 07 Nov 2026](https://www.canada.ca/en/immigration-refugees-citizenship/services/visit-canada/apply-visitor-visa.html) |
| **5** | **UK Standard Visitor, six months:** adds UK visitor access | GBP 135 ≈ **USD 176** | Usually three weeks after biometrics | [GOV.UK — checked 07 Nov 2026](https://www.gov.uk/standard-visitor/apply-standard-visitor-visa) |

I have not added the usual advertised “bonus countries” to those totals. Your US visa already supports entry routes for Bosnia and Herzegovina, the Dominican Republic, Georgia, Mexico, Panama and Serbia. North Macedonia’s US-visa exemption currently runs only through **31 Dec 2026**, so a Schengen visa could provide a separate qualifying route later, but it does not add a new destination today. [Official destination rules and sources — all checked 07 Nov 2026](https://mfa.gov.mk/en-GB/konzularni-uslugi/informacii-za-vlez-vo-rsm).

Several other benefits remain **Needs checking**, and I have excluded them from confirmed new access:

- **Albania:** your US multiple-entry visa must already have been used to enter the US; the scans do not establish that. [Albanian Embassy — checked 07 Nov 2026](https://ambasadat.gov.al/united-kingdom/en/newsroom/pyetje-te-shpeshta/).
- **Türkiye and South Korea:** you already have the qualifying US visa, but additional e-visa conditions or a qualifying transit itinerary and immigration history must be verified. A new Schengen or UK visa does not automatically create another new destination. [Türkiye MFA — checked 07 Nov 2026](https://www.mfa.gov.tr/visa-information-for-foreigners.en.mfa); [Korean consulate — checked 07 Nov 2026](https://overseas.mofa.go.kr/us-chicago-en/brd/m_26753/view.do?seq=11).
- **Canadian eTA:** check this before paying for a Canadian visitor visa. Its fee is only CAD 7, about USD 5, but the bundled eligibility description does not establish whether your Philippine passport and US visa qualify you. I cannot mark you eligible from that evidence. [IRCC — checked 07 Nov 2026](https://www.canada.ca/en/immigration-refugees-citizenship/services/visit-canada/eta/facts.html).

For the Schengen application, **you have a valid passport and evidence of UAE residence**. The application form, passport photo, travel medical insurance, bank statements, accommodation evidence and flight itinerary were not assessed in this document-only review. Your funds, trip purpose and intention to return therefore remain unverified. Apply through the country of your genuine main destination; multiple-entry validity is a decision for the consulate. [European Commission — checked 07 Nov 2026](https://home-affairs.ec.europa.eu/policies/schengen/visa-policy/applying-schengen-visa_en).

My suggested order is **Schengen first**, then whichever of Ireland, Japan, Canada or the UK you actually plan to visit. Schengen, Ireland and Japan total roughly **USD 265 in listed single-entry application fees**, leaving about **USD 235** for service charges and other fees. Schedule applications sequentially where the passport is retained. Those estimates use the dated official sources in the table; they do not establish that every application cost fits the remaining budget.

This recommendation counts only access supported by the bundled rules. There is no complete Philippine passport matrix or Schengen membership list bundled, so I cannot provide an audited worldwide “N new countries” total or promise approval.

Rules change. Confirm on the official page before you apply, pay, book or travel.
