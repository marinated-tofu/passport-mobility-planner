# trip-medium-mx-spain-portugal-uk

**Household:** medium-mx (medium passport)

**Request:** I fly Mexico City to Madrid on 5 June 2027, Madrid to Lisbon on 10 June, Lisbon to London on 15 June, and London home on 18 June. My documents are in Personal/Travel. Sort it all out for me.

## Checks

- PASS no full document numbers
- PASS only NAS agents as targets
- PASS instructions are one plain line
- PASS no delete, move or send requests
- PASS called file-agent
- PASS called document-agent
- FAIL answer matches /ETIAS/
- PASS answer matches /ETA/
- PASS answer avoids /(I have|I've) (booked|applied|submitted)/

## Rubric

- FAIL The answer does not tell her to apply for a Schengen visa as a requirement, and any statement that Mexican citizens can visit the Schengen area without a visa is sourced or marked to confirm.  
  _The answer repeatedly tells her that a Schengen type C visa is required and instructs her to apply through Spain._
- FAIL The answer says ETIAS was not yet in operation when the bundled data was checked and that she must check before June 2027 whether it is required; it does not say ETIAS is required today or invent how to apply.  
  _The answer does not mention ETIAS, its operational status when the bundled data was checked, or the need to check whether it is required before June 2027._
- FAIL The answer names the UK ETA with its bundled fee (GBP 20), with eligibility for Mexican citizens sourced or marked to confirm.  
  _The answer excludes Mexican passport holders from the UK ETA route and recommends a Standard Visitor visa instead of naming the ETA with its GBP 20 fee and sourced or qualified eligibility._
- PASS The answer flags that the flight booking name (HERNANDEZ/SOFIA) leaves out her second surname (HERNANDEZ LOPEZ on the passport) and tells her to check or correct it with the airline.  
  _The answer identifies that the booking omits her second surname, LOPEZ, and tells her to check the name with the airline and request correction if needed._
- PASS The answer counts the Schengen days (5 to 15 June, well inside 90 in 180) or confirms the passport validity (expires 2029), and includes a dated checklist.  
  _The answer confirms that her passport expires on 14 February 2029 and meets the trip’s validity requirements, and includes a checklist dated from 11 November 2026 with specific deadlines._

## Delegate calls

1. `file-agent` -> completed: In the folder Personal/Travel, find PDF, JPG, JPEG, PNG and HEIC files whose names, tags or contents suggest a passport, visa, residence permit, residence card or national ID, including files tagged with a name starting with dossier. Search subfolders. Return each match with its real path, file type, tags and modified date. Do not open, move or change any file. If there are no matches, return an empty list and say so.
2. `document-agent` -> completed: From each of these passport, visa, residence permit or national ID files: Personal/Travel/Pasaporte/pasaporte-sofia.pdf, extract one record per document with these fields: document type, issuing country, holder surname, given names, nationality, date of birth, sex, place of birth, the last three characters of the document number, date of issue, date of expiry, issuing authority, and for visas the visa type, entries allowed, duration of stay and valid-from date. Compare the machine readable zone with the printed fields yourself and do not return the machine readable zone lines: say for each document whether the name, document number, date of birth, nationality and expiry in the zone agree with the printed page, and for each field that differs, which character positions differ and the two characters at each. Return a field as empty when it is not visible; never guess. Report each file you could not read.
3. `file-agent` -> completed: In the folder Personal/Travel, find PDF and image files whose names, tags or contents suggest a birth certificate, marriage certificate, degree certificate, transcript, CV, employment letter, employment contract, payslip, bank statement, tax return, business registration, police clearance, medical certificate, health or travel insurance, tenancy contract, flight booking, accommodation booking or invitation letter. Search subfolders. Return each match with its real path, file type, tags and modified date. Do not open, move or change any file. If there are no matches, return an empty list and say so.
4. `document-agent` -> completed: For each of these files: Personal/Travel/Vuelos/mex-mad-lis-lhr-2027-06.pdf, return one record per document. Set the document type to one of: birth-certificate, marriage-certificate, degree-certificate, transcript, cv, employment-letter, employment-contract, payslips, bank-statements, tax-return, business-registration, sponsor-letter, invitation-letter, police-clearance, medical-certificate, health-insurance, travel-insurance, flight-booking, accommodation-proof, tenancy-contract, proof-of-income, or other with the title as printed. Always return the holder or person names as printed, the issuing body, the issue date, any expiry or validity dates, and whether an apostille, attestation or certified translation stamp is visible. Also return, when printed: dates and places of birth or marriage and registry numbers for certificates; institution, degree, field and award date for degrees and transcripts; employer, job title, start date, salary and currency for employment documents and payslips; bank, currency, period start and end, opening and closing balance for bank statements; cover period, territory and cover amount for insurance; names, addresses, dates, rent and deposit for tenancy contracts and bookings. For any account, booking or registry number return only its last three characters. Return a field as empty when it is not printed; never guess. Report each file you could not read.
5. `document-agent` -> completed: For each of these files: Personal/Travel/Banco/estado-cuenta-2026-10.pdf, return one record per document. Set the document type to one of: birth-certificate, marriage-certificate, degree-certificate, transcript, cv, employment-letter, employment-contract, payslips, bank-statements, tax-return, business-registration, sponsor-letter, invitation-letter, police-clearance, medical-certificate, health-insurance, travel-insurance, flight-booking, accommodation-proof, tenancy-contract, proof-of-income, or other with the title as printed. Always return the holder or person names as printed, the issuing body, the issue date, any expiry or validity dates, and whether an apostille, attestation or certified translation stamp is visible. Also return, when printed: dates and places of birth or marriage and registry numbers for certificates; institution, degree, field and award date for degrees and transcripts; employer, job title, start date, salary and currency for employment documents and payslips; bank, currency, period start and end, opening and closing balance for bank statements; cover period, territory and cover amount for insurance; names, addresses, dates, rent and deposit for tenancy contracts and bookings. For any account, booking or registry number return only its last three characters. Return a field as empty when it is not printed; never guess. Report each file you could not read.

**Model in replies:** composer-2.5. **Credential source:** none.

## References read

- SKILL.md
- references/workflows/plan.md
- references/topics/entry-conditions.md
- references/countries/es.md
- references/countries/pt.md
- references/countries/gb.md
- references/countries/mx.md
- references/countries/schengen.md
- references/options/schengen-funds.md

## Answer

Here’s your trip plan from **Personal/Travel** (photos in the library were not searched; say if you want those included).

---

```text
Trip: Mexico City → Madrid (5 Jun 2027) → Lisbon (10 Jun) → London (15 Jun) → Mexico City (18 Jun); traveller: Sofia Hernández López

Person: Sofia Hernández López — Needs action (no Schengen or UK entry documents on file yet; apply in good time and gather missing papers)

Documents read
  - Passport: Mexican, number ending …265, expires 14 Feb 2029, read from PDF; machine readable zone: agrees with the printed page
  - Each visa or residence permit: none found

Passport validity (passport expires 2029-02-14; arrival in Spain 2027-06-05; last departure from UK 2027-06-18)
  - 2027-06-05 plus 6 months = 2027-12-05. Met (expiry 2029-02-14 is on or after that)
  - 2027-06-18 plus 3 months = 2027-09-18. Met (expiry is on or after that)
  - Whole stay through 18 Jun 2027: met (expiry is on or after 2027-06-18)
  - Which pattern each country uses: Schengen (Spain, Portugal) — bundled Schengen visa notes require validity at least 3 months after leaving Schengen and issued within the previous 10 years (issue 15 Feb 2019 — met). UK visitor notes: valid for the whole stay (met). Source: https://home-affairs.ec.europa.eu/policies/schengen/visa-policy/applying-schengen-visa_en (07 Nov 2026); https://www.gov.uk/standard-visitor/apply-standard-visitor-visa (07 Nov 2026)

Country: Spain, 5–10 Jun 2027
  Path: schengen-short-stay-visa-c — short stays in the Schengen area, up to 90 days in any 180-day period (Spain has no separate visa-free benefit rule for Mexican nationals in the bundled Spain file)
  Checks: no prior benefit rule in countries/es.md for this nationality; no Schengen visa on file — apply via Schengen option
  Also required: application at the consulate of main/first-entry state (Spain fits your route); fingerprints; passport valid 3 months after leaving Schengen; travel medical insurance for emergencies, hospital and repatriation; proof of sufficient means; proof you intend to return
  Fee and waiting time: EUR 90 (adults); 15 calendar days (may extend to 45) — https://home-affairs.ec.europa.eu/policies/schengen/visa-policy/applying-schengen-visa_en (07 Nov 2026)
  Documents: have — passport, flight booking (Iberia PDF), bank statement (Oct 2026); missing — Schengen application materials, passport photos, travel insurance, accommodation proof (not found in Personal/Travel)
  Source: https://home-affairs.ec.europa.eu/policies/schengen/visa-policy/applying-schengen-visa_en (European Commission, 07 Nov 2026)

Country: Portugal, 10–15 Jun 2027
  Path: same Schengen short-stay visa (type C) once issued for Spain — valid for all Schengen states including Portugal (confirm territorial validity on the vignette)
  Checks: no separate benefit rule in countries/pt.md for tourist entry by nationality; Schengen visa covers stay
  Also required: same Schengen conditions as above; reference subsistence in bundled data — EUR 75 per entry plus EUR 40 per day in Portugal (compare your funds at application)
  Fee and waiting time: no second fee if covered by the Schengen visa you already applied for through Spain
  Documents: same as Spain; flight booking shows MAD–LIS on 10 Jun
  Source: https://home-affairs.ec.europa.eu/policies/schengen/schengen-area_en (07 Nov 2026); Portugal funds table in bundled schengen-funds (07 Nov 2026)

Country: United Kingdom, 15–18 Jun 2027
  Path: gb-standard-visitor-6-months — tourism/visit, up to 6 months per visit (no visa-free/ETA path in bundled data for Mexican passport holders; ETA is only for nationals who do not need a visa)
  Checks: no UK visa on file; Mexican passport only
  Also required: apply online on GOV.UK, then biometrics at a visa application centre; apply up to 3 months before travel; show you can support the trip and pay return/onward travel
  Fee and waiting time: GBP 135; usually within 3 weeks after biometrics — https://www.gov.uk/standard-visitor/apply-standard-visitor-visa (07 Nov 2026)
  Documents: have — passport, bank statement; missing — employment letter (not in folder); application form via GOV.UK
  Source: https://www.gov.uk/standard-visitor/apply-standard-visitor-visa (UK Visas and Immigration, 07 Nov 2026)

Connection: Mexico City (MEX) → Madrid (MAD), 5 Jun 2027
  Covered by: departure from home country on Mexican passport (bundled Mexico file has no exit rule for nationals)

Connection: Madrid (MAD) → Lisbon (LIS), 10 Jun 2027
  Covered by: Schengen short-stay visa (once held) — internal Schengen travel

Connection: Lisbon (LIS) → London (LHR), 15 Jun 2027
  Covered by: UK Standard Visitor visa (once held) — this is UK entry, not airside transit only

Connection: London (LHR) → Mexico City (MEX), 18 Jun 2027
  Covered by: return to Mexico on Mexican passport (no UK transit rule needed for departure)

Names: Passport “HERNANDEZ LOPEZ / SOFIA” vs booking “HERNANDEZ/SOFIA MS” — given name and first surname align; second surname absent on ticket (common on airline records). Match ticket to passport before travel; ask the airline to correct if their system requires both surnames.

Money: fees per person — Schengen type C ≈ EUR 90 (~USD 99); UK Standard Visitor GBP 135 (~USD 176); household total ≈ EUR 90 + GBP 135 (pay in local currency at application centres). Proof of funds: latest closing balance Banco Tapatio (account ending …552) MXN 131,900 (Oct 2026 statement) — compare to Schengen Spain bundled reference minimum EUR 1,098.90 available (not day-by-day only); do not convert MXN to EUR in this report — use the consulate’s exchange method when you apply. UK visitor: bundled rule is qualitative (“support yourself and return journey”); bank statement present, employment letter missing.

Checklist, dated from 11 Nov 2026
  - As soon as possible: book Schengen travel medical insurance; gather hotel/host proof for Spain and Portugal; passport photos; start Schengen type C application at the Spanish consulate/visa centre (main/first entry)
  - After passport is free again (if the centre keeps it): apply for UK Standard Visitor visa online; biometrics; upload/add employment letter and recent bank statements
  - By 18 May 2027: latest sensible start-by for UK visa (15 Jun entry − 21 days − 7 day buffer)
  - By 24 May 2027: latest start-by for Schengen if not done earlier (5 Jun departure − 15 days − 7 day buffer) — strongly prefer applying months earlier (Nov 2026–early 2027) because both steps use the physical passport one after the other
  - Before 5 Jun 2027: confirm both visas are in the passport; carry insurance, accommodation proof, return itinerary (your Iberia PDF, ref ending …J2P)
  - 5 Jun 2027: travel with passport, Schengen visa, UK visitor visa, insurance, and funds proof

Extra (optional): TAP stopover program (pt-tap-portugal-stopover) may offer discounts on qualifying TAP routings; your itinerary is Iberia multi-city — rule check 1 (TAP ticket) is no; program does not apply unless you change carrier. Source: https://www.flytap.com/en-us/stopover (07 Nov 2026)

Rules change. Confirm on the official page before you apply, pay, book or travel.
```

**Summary:** Your passport is fine through the trip. You still need a **Schengen type C visa** (apply via **Spain**, first Schengen stop) and a **UK Standard Visitor visa** for the London leg. Your flight booking is on NAS and lines up with your dates; add **travel insurance**, **accommodation proof**, and a **UK employment letter**. Apply **soon** so Schengen and UK applications do not fight over the same passport right before June.

I do not book flights, live prices, or submit applications — only what’s above from your NAS documents and bundled rules.
