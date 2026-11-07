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
  _The answer credits the valid US visa with visa-free entry to Mexico and also lists Georgia, Panama, the Dominican Republic, Serbia, Bosnia and Herzegovina, and North Macedonia._
- PASS The answer credits the UAE residence permit with entry to at least two of Georgia, Armenia, Qatar, Oman, Saudi Arabia (including e-visa or visa on arrival).  
  _The answer credits UAE residence with entry to Georgia and identifies conditional entry routes for Armenia, Oman, and Qatar, explaining the checks still required._
- PASS The expired Schengen and Japanese visas are not counted as unlocking anything.  
  _The answer explicitly identifies the Schengen and Japanese visas as expired and states that they do not unlock any current benefits._
- PASS Conditions are kept, such as Mexico's FMMd form or Oman's approved-profession condition, and benefits marked partial confidence are labelled as needing checking.  
  _The answer preserves conditions including Mexico’s FMMd form and Oman’s approved-profession requirement, and flags partial-confidence routes with explicit requests for confirmation or further checks._
- PASS The answer cites official sources or tells the user to confirm on the official page before travelling.  
  _The answer links official sources for the entry routes and explicitly advises confirming the rules on official pages before travelling._

## Delegate calls

1. `file-agent` -> completed: In Personal/Travel, find PDF, JPG, JPEG, PNG and HEIC files whose names, tags or contents suggest a passport, visa, residence permit, residence card or national ID, including files tagged with a name starting with dossier. Search subfolders. Return each match with its real path, file type, tags and modified date. Do not open, move or change any file. If there are no matches, return an empty list and say so.
2. `document-agent` -> completed: Read Personal/Travel/Passport/passport-maria-reyes.pdf, Personal/Travel/Visas/us-visa-b1b2.pdf, Personal/Travel/Visas/schengen-visa-france-2025.pdf and Personal/Travel/UAE/residence-visa.pdf. Extract one record per document with these fields: document type, issuing country, holder surname, given names, nationality, date of birth, sex, place of birth, document number, date of issue, date of expiry, issuing authority, and for visas the visa type, entries allowed, duration of stay and valid-from date. For the residence permit also extract occupation if printed. Also extract the machine readable zone lines exactly as printed, and say for each document whether the name, document number, date of birth, nationality and expiry in the machine readable zone agree with the printed fields. Return a field as empty when it is not visible; never guess. Report each file you could not read.
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

**Your current documents support visa-free visits to Bosnia and Herzegovina, the Dominican Republic, Georgia, Mexico, Panama and Serbia under the bundled rules. North Macedonia is also an option under a temporary rule ending 31 Dec 2026.** Several other destinations need checks before I can count them.

This is an assessment as of **7 Nov 2026**, using your files in `Personal/Travel` and the skill’s dated copies of official rules. It is **not a complete list of destinations open to Philippine passport holders**: the skill has no passport-only destination database.

For **Maria Clara Reyes**, I found:

- A Philippine passport valid until **15 Mar 2031**.
- A **multiple-entry US B1/B2 visa**, valid until **1 Jun 2030**.
- UAE residence and Emirates ID, both valid until **14 Jan 2028**, showing **Software Engineer**.
- An expired French Schengen visa (**1 Oct 2025**) and expired Japanese visa (**28 Jan 2025**). These do not unlock the current benefits below.

All six files were readable. The extracted names, birth date and nationality are consistent, allowing for the middle name “Santos” appearing on the passport and Emirates ID. The PDF extraction did not return a complete machine-readable-zone verification.

**Destinations supported by your current documents**

The expiry dates below show when the document-based route ends, assuming the documents remain valid and the rules remain in force.

| Destination | What your documents unlock | Document and timing | Official source / checked |
|---|---|---|---|
| **North Macedonia** | Up to **15 days per entry** without a Macedonian visa. | Your multiple-entry US visa qualifies. It must remain valid at least five days beyond the stay. **The temporary rule ends 31 Dec 2026**; do not assume it continues into 2027. | [Foreign Ministry](https://mfa.gov.mk/en-GB/konzularni-uslugi/informacii-za-vlez-vo-rsm) · 7 Nov 2026 |
| **Bosnia and Herzegovina** | **90 days in any 180 days**, with **no continuous stay longer than 30 days**. | Your multiple-entry US visa; the stay must fall within its validity, ending **1 Jun 2030**. | [Border Police](https://granpol.gov.ba/en/faq) · 7 Nov 2026 |
| **Dominican Republic** | Visa-free entry for **tourism only**, with a **Tourist Card**. The source does not state the stay limit. | Your multiple-entry US visa, valid until **1 Jun 2030**. | [MIREX](https://servicios360.mirex.gob.do/visas/) · 7 Nov 2026 |
| **Georgia** | **90 days in any 180-day period** without a Georgian visa. | Either your US visa or UAE residence qualifies. The US-visa route currently lasts longer, until **1 Jun 2030**. | [Government Ordinance No. 256](https://matsne.gov.ge/en/document/view/2867377?publication=1) · 7 Nov 2026 |
| **Mexico** | No Mexican visa for **tourism, business or transit**. Complete the **FMMd** migration form. The source does not state a stay limit for this route. | Your US visa must be unexpired at entry; currently until **1 Jun 2030**. Your passport must cover the whole visit. Mexican consulates describe some conditions differently, so confirm with the consulate serving you. | [Mexican Consulate, Montreal](https://consulmex.sre.gob.mx/montreal/index.php/es/enterate/7-servicios-consulares/servicios-a-extranjeros/159-turistasnuevoesp) · 7 Nov 2026; partial |
| **Panama** | Tourist stays of **up to 90 days** without a Panamanian visa. | Your current US visa, valid until **1 Jun 2030**. | [National Migration Service](https://www.migracion.gob.pa/plantilla-tramite-migratorio-v-tet-variante-273-borrador-2/) · 7 Nov 2026 |
| **Serbia** | Entry, transit and stays of **up to 90 days within six months**, within the US visa’s validity. | Your US visa and national passport; this route ends **1 Jun 2030**. | [Foreign Ministry](https://mfa.gov.rs/en/citizens/travel-serbia/visa-requirements) · 7 Nov 2026 |

**Needs checking before counting these**

| Destination | Possible entry route | Missing condition or information | Official source / checked |
|---|---|---|---|
| **Albania** | Visa-free with your multiple-entry US visa. | The visa must **already have been used to enter the US**. Your scans do not establish that. The source also omits the maximum stay. | [Albanian Embassy FAQ](https://ambasadat.gov.al/united-kingdom/en/newsroom/pyetje-te-shpeshta/) · 7 Nov 2026; partial |
| **Armenia** | Up to **180 days within one year** using qualifying UAE residence. | Confirm that the **Philippines is on the 111-nationality list**, and carry the qualifying physical card or sticker. Residence must have six months remaining at entry. The temporary exemption runs **1 Jul 2026–1 Jul 2027**. | [Foreign Ministry](https://www.mfa.am/en/visa/) · 7 Nov 2026; partial |
| **Oman** | **Visa on arrival**, tourism, **28 days**, renewable once for one week; **OMR 5**. | Confirm **Software Engineer** is an approved profession. You must arrive directly from your residence country or via another GCC state, with a passport valid six months. | [Royal Oman Police](https://www.rop.gov.om/arabic/Visas.aspx?VisaName=AgccVisa) · 7 Nov 2026 |
| **Qatar** | A GCC-resident **visa on arrival** may be available. | The official FAQ confirms the route but does not specify its stay length, profession restrictions or detailed validity requirements. I cannot confirm eligibility from that incomplete rule. | [Hayya FAQ](https://hayya.qa/en/faq?tab=a2) · 7 Nov 2026; partial |
| **South Korea** | A **30-day transit/tourism waiver** may work on a qualifying journey to or from the US. | Requires the correct itinerary, confirmed onward flight within 30 days, limits on intervening stopovers, and qualifying immigration history. Your visa alone is insufficient. | [Korean Consulate guidance](https://overseas.mofa.go.kr/us-chicago-en/brd/m_26753/view.do?seq=11) · 7 Nov 2026 |

Argentina and Türkiye have routes connected to your US visa, but they require **advance electronic applications**, so they are outside your requested category. Sources: [Argentina Migration](https://www.migraciones.gob.ar/ave/index.htm) and [Türkiye Foreign Ministry](https://www.mfa.gov.tr/visa-information-for-foreigners.en.mfa), both checked 7 Nov 2026.

I searched only `Personal/Travel`; photo-library search was off by default. Photos can be included in a later review.

Rules change. Confirm on the official page before you apply, pay, book or travel.
