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
  _The answer credits the valid US visa with visa-free entry to Mexico and all seven other listed destinations, with Albania presented as conditional._
- PASS The answer credits the UAE residence permit with entry to at least two of Georgia, Armenia, Qatar, Oman, Saudi Arabia (including e-visa or visa on arrival).  
  _The answer identifies UAE residence as qualifying for Georgia and potentially for Armenia, Oman and Qatar, with unresolved eligibility conditions stated._
- PASS The expired Schengen and Japanese visas are not counted as unlocking anything.  
  _The answer explicitly states that the expired Schengen and Japanese visas do not count toward current benefits._
- PASS Conditions are kept, such as Mexico's FMMd form or Oman's approved-profession condition, and benefits marked partial confidence are labelled as needing checking.  
  _The answer preserves conditions including Mexico’s FMMd form and Oman’s approved-profession requirement, and flags partial-confidence benefits with explicit checks or confirmation advice._
- PASS The answer cites official sources or tells the user to confirm on the official page before travelling.  
  _The answer links official sources for the benefits and tells the user to confirm on the official page before travelling._

## Delegate calls

1. `file-agent` -> completed: In Personal/Travel, find PDF, JPG, JPEG, PNG and HEIC files whose names, tags or contents suggest a passport, visa, residence permit, residence card or national ID, including files tagged with a name starting with dossier. Search subfolders. Return each match with its real path, file type, tags and modified date. Do not open, move or change any file. If there are no matches, return an empty list and say so.
2. `document-agent` -> completed: From Personal/Travel/Passport/passport-maria-reyes.pdf, Personal/Travel/Visas/us-visa-b1b2.pdf, Personal/Travel/Visas/schengen-visa-france-2025.pdf and Personal/Travel/UAE/residence-visa.pdf, extract one record per document with these fields: document type, issuing country, holder surname, given names, nationality, date of birth, sex, place of birth, document number, date of issue, date of expiry, issuing authority, and for visas the visa type, entries allowed, duration of stay and valid-from date. Also extract the machine readable zone lines exactly as printed, and say for each document whether the name, document number, date of birth, nationality and expiry in the machine readable zone agree with the printed fields. For the UAE residence permit also extract occupation if printed. Return a field as empty when it is not visible; never guess. Report each file you could not read.
3. `photo-agent` -> completed: Run text recognition on Personal/Travel/Visas/japan-visa-2024.jpg and Personal/Travel/UAE/emirates-id-front-back.jpg and return the full recognised text for each image, keeping the two or three machine readable zone lines at the bottom intact and in order. Report each image where no text was recognised.

## References read

- SKILL.md
- references/workflows/benefits.md
- references/report-format.md
- references/topics/document-fields.md
- references/benefits/visa-held.md
- references/benefits/gcc-residence.md
- references/official-sources.md

## Answer

**Your current documents unlock seven destinations in the bundled rules without applying for a new visa in advance:** Bosnia and Herzegovina, the Dominican Republic, Georgia, Mexico, North Macedonia, Panama and Serbia. Several more are possible, but need checks first.

This is for **Maria Clara Santos Reyes**, as of **07 Nov 2026**, based on the six files in `Personal/Travel`:

- Philippine passport, valid until **15 Mar 2031**.
- US **B1/B2 multiple-entry visa**, valid until **01 Jun 2030**.
- UAE residence permit and Emirates ID, valid until **14 Jan 2028**; occupation: Software Engineer.
- The French Schengen visa expired **01 Oct 2025**, and the Japanese single-entry visa expired **28 Jan 2025**. Neither counts toward current benefits.

**Destinations your valid documents unlock**

Carry your passport and the qualifying visa or residence document. All rules below were checked against the skill’s stored official sources on **07 Nov 2026**; this was not a live web check.

| Destination | Entry benefit and stay | What unlocks it | Official source and checked date |
|---|---|---|---|
| **North Macedonia** | Visa-free, **up to 15 days per entry**. This temporary rule applies only through **31 Dec 2026**; your US visa must remain valid at least five days beyond the planned stay. | Multiple-entry US visa | [Foreign Ministry](https://mfa.gov.mk/en-GB/konzularni-uslugi/informacii-za-vlez-vo-rsm), checked 07 Nov 2026 |
| **Bosnia and Herzegovina** | Visa-free, **90 days in any 180 days**, with **no continuous stay longer than 30 days**. Stay within your US visa’s validity. | Multiple-entry US visa | [Border Police](https://granpol.gov.ba/en/faq), checked 07 Nov 2026 |
| **Dominican Republic** | Visa-free for **tourism only**, with a **Tourist Card**. The cited page does not specify the stay limit. | Multiple-entry US visa | [MIREX](https://servicios360.mirex.gob.do/visas/), checked 07 Nov 2026 |
| **Georgia** | Visa-free, **90 days in any 180-day period**. Your US visa must be valid when you enter. Your UAE residence is an alternative qualifying document. | US visa; alternatively UAE residence | [Government ordinance](https://matsne.gov.ge/en/document/view/2867377?publication=1), checked 07 Nov 2026 |
| **Mexico** | Visa-free for **tourism, business or transit**. The cited page gives no stay limit for this exemption. Complete the required **FMMd** form and keep your passport valid throughout the visit. Official consulates describe some conditions differently, so confirm with the consulate covering you. | Valid US visa | [Mexican Consulate](https://consulmex.sre.gob.mx/montreal/index.php/es/enterate/7-servicios-consulares/servicios-a-extranjeros/159-turistasnuevoesp), checked 07 Nov 2026; partial |
| **Panama** | Visa-free for **tourist stays up to 90 days**. | Valid US visa | [National Migration Service](https://www.migracion.gob.pa/plantilla-tramite-migratorio-v-tet-variante-273-borrador-2/), checked 07 Nov 2026 |
| **Serbia** | Visa-free **entry, transit and stay**, up to **90 days within six months**, within your US visa’s validity. | Valid US visa in your national passport | [Foreign Ministry](https://mfa.gov.rs/en/citizens/travel-serbia/visa-requirements), checked 07 Nov 2026 |

The US-visa benefits depend on that visa remaining valid; its expiry is **01 Jun 2030**. Georgia’s UAE-residence alternative depends on your permit, which expires **14 Jan 2028**. North Macedonia’s temporary scheme ends much sooner, on **31 Dec 2026**, unless renewed.

**Possible options that need checking**

| Destination | Potential benefit | What is still unknown | Official source and checked date |
|---|---|---|---|
| **Albania** | Visa-free using your multiple-entry US visa; the source gives no maximum stay. | Your US visa must **already have been used to enter the US**. The documents do not establish this. The source’s departure deadline around visa expiry is also ambiguous. | [Albanian Embassy FAQ](https://ambasadat.gov.al/united-kingdom/en/newsroom/pyetje-te-shpeshta/), checked 07 Nov 2026; partial |
| **Armenia** | Temporary visa exemption, **up to 180 days within one year**, using UAE residence valid at least six months from entry. Scheme runs **01 Jul 2026–01 Jul 2027**. | Whether **Philippine nationals are included in the linked 111-country list** was not verified. You must carry the qualifying physical card or passport sticker. | [Foreign Ministry](https://www.mfa.am/en/visa/), checked 07 Nov 2026; partial |
| **Oman** | **Visa on arrival**, tourism, **28 days**, renewable once for one week; **OMR 5**. | Whether Software Engineer is an **approved profession**, and whether you will arrive **directly from the UAE or via another GCC state**. Passport must have six months’ validity at entry. | [Royal Oman Police](https://www.rop.gov.om/arabic/Visas.aspx?VisaName=AgccVisa), checked 07 Nov 2026 |
| **Qatar** | A **visa-on-arrival** route is stated for GCC residents. | The source does not give its stay limit, profession restrictions or detailed validity conditions, so I cannot confirm your eligibility from this rule alone. | [Hayya FAQ](https://hayya.qa/en/faq?tab=a2), checked 07 Nov 2026; partial |
| **South Korea** | **Up to 30 days** for transit/tourism on a qualifying journey to or from the US. | A qualifying itinerary, confirmed onward flight within 30 days, applicable three-day stopover limit, and immigration-history conditions. Your US visa alone does not establish eligibility. | [Korean Consulate](https://overseas.mofa.go.kr/us-chicago-en/brd/m_26753/view.do?seq=11), checked 07 Nov 2026 |

**This is a list of document-based benefits, not a complete list of destinations available on your Philippine passport.** No passport-wide destination matrix is bundled with this skill. A NAS folder containing official entry-rule copies would be needed to extend the list reliably.

Argentina’s AVE, Türkiye’s conditional e-visa, and the GCC-resident e-visa routes for Oman, Qatar and Saudi Arabia involve an application before travel, so they do not meet your stated preference. Sources: [Argentina](https://www.migraciones.gob.ar/ave/index.htm), [Türkiye](https://www.mfa.gov.tr/visa-information-for-foreigners.en.mfa), [Oman](https://evisa.rop.gov.om/Evisa-home-theme/faq_pages/faq_en.html), [Qatar](https://hayya.qa/en/faq?tab=a2), [Saudi Arabia](https://www.visitsaudi.com/en/plan-your-trip/visa-regulations), all checked 07 Nov 2026.

All six files were readable. The names, birth dates and nationalities are consistent, allowing for the middle name shown on the passport and Emirates ID; full machine-readable-zone validation was not available for every document. I searched only your named folder, without searching the photo library; photos can also be included.

Rules change. Confirm on the official page before you apply, pay, book or travel.
