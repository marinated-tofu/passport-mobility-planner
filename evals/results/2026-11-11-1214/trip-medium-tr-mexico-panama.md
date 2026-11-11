# trip-medium-tr-mexico-panama

**Household:** medium-tr (medium passport)

**Request:** I want to go from Istanbul to Mexico City on 10 February 2027 for ten days, then to Panama City until the 26th, then home. The cheap flights connect in Frankfurt or in Houston. Which should I book, and what do I need? Documents are in Personal/Travel.

## Checks

- PASS no full document numbers
- PASS only NAS agents as targets
- PASS instructions are one plain line
- PASS no delete, move or send requests
- PASS called file-agent
- PASS called document-agent
- PASS answer matches /FMM/
- PASS answer matches /Panama/
- PASS answer avoids /(I have|I've) (booked|applied|submitted)/

## Rubric

- PASS The answer says his valid US B1/B2 visa (to 2029-04-10) lets him enter Mexico without a Mexican visa, with the FMMd form, and that the bundled rule is partial so he should confirm with the consulate.  
  _The answer says the US B1/B2 visa valid through 2029-04-10 permits visa-free entry to Mexico, requires the FMMd, and identifies the bundled rule as partial with consular confirmation needed._
- PASS The answer says the same US visa lets him enter Panama without a Panamanian visa, for tourist stays up to 90 days.  
  _The answer states that the same valid US visa permits visa-free tourist entry to Panama for stays up to 90 days._
- PASS For the connection, the answer says the Houston connection is covered by his valid US visa, and that Frankfurt transit rules for Turkish citizens are not in the bundled data (or need checking), rather than declaring Frankfurt fine.  
  _The answer says the valid US B1/B2 covers Houston connections and explicitly states that Frankfurt transit rules for Turkish citizens are absent from the bundled data and require checking._
- PASS The answer checks that both the passport (2030) and the US visa (2029) stay valid for the whole trip.  
  _The answer checks the passport expiring on 2030-08-01 against the full trip and confirms the US visa expiring on 2029-04-10 remains valid beyond both destination stays._
- PASS The answer includes a dated checklist with the FMMd done by the day of the Mexico flight.  
  _The answer includes a checklist dated 11 November 2026 that requires completing the FMMd before the Mexico flight on 10 February 2027._

## Delegate calls

1. `file-agent` -> completed: In the folder Personal/Travel, find PDF, JPG, JPEG, PNG and HEIC files whose names, tags or contents suggest a passport, visa, residence permit, residence card or national ID, including files tagged with a name starting with dossier. Search subfolders. Return each match with its real path, file type, tags and modified date. Do not open, move or change any file. If there are no matches, return an empty list and say so.
2. `document-agent` -> completed: From each of these passport, visa, residence permit or national ID files: Personal/Travel/Pasaport/pasaport-emre.pdf, Personal/Travel/Vize/us-visa-b1b2.pdf, extract one record per document with these fields: document type, issuing country, holder surname, given names, nationality, date of birth, sex, place of birth, the last three characters of the document number, date of issue, date of expiry, issuing authority, and for visas the visa type, entries allowed, duration of stay and valid-from date. Compare the machine readable zone with the printed fields yourself and do not return the machine readable zone lines: say for each document whether the name, document number, date of birth, nationality and expiry in the zone agree with the printed page, and for each field that differs, which character positions differ and the two characters at each. Return a field as empty when it is not visible; never guess. Report each file you could not read.
3. `file-agent` -> completed: In the folder Personal/Travel, find PDF and image files whose names, tags or contents suggest a birth certificate, marriage certificate, degree certificate, transcript, CV, employment letter, employment contract, payslip, bank statement, tax return, business registration, police clearance, medical certificate, health or travel insurance, tenancy contract, flight booking, accommodation booking or invitation letter. Search subfolders. Return each match with its real path, file type, tags and modified date. Do not open, move or change any file. If there are no matches, return an empty list and say so.
4. `document-agent` -> completed: For each of these files: Personal/Travel/Supporting/employment-letter-2026.pdf, return one record per document. Set the document type to one of: birth-certificate, marriage-certificate, degree-certificate, transcript, cv, employment-letter, employment-contract, payslips, bank-statements, tax-return, business-registration, sponsor-letter, invitation-letter, police-clearance, medical-certificate, health-insurance, travel-insurance, flight-booking, accommodation-proof, tenancy-contract, proof-of-income, or other with the title as printed. Always return the holder or person names as printed, the issuing body, the issue date, any expiry or validity dates, and whether an apostille, attestation or certified translation stamp is visible. Also return, when printed: dates and places of birth or marriage and registry numbers for certificates; institution, degree, field and award date for degrees and transcripts; employer, job title, start date, salary and currency for employment documents and payslips; bank, currency, period start and end, opening and closing balance for bank statements; cover period, territory and cover amount for insurance; names, addresses, dates, rent and deposit for tenancy contracts and bookings. For any account, booking or registry number return only its last three characters. Return a field as empty when it is not printed; never guess. Report each file you could not read.

**Model in replies:** composer-2.5. **Credential source:** none.

## References read

- SKILL.md
- references/workflows/plan.md
- references/topics/entry-conditions.md
- references/countries/mx.md
- references/countries/pa.md
- references/countries/tr.md
- references/countries/schengen.md
- references/countries/us.md

## Answer

## Recommendation: book the **Houston** connection

For **Emre Yilmaz** (Turkish passport + valid **US B1/B2**), the bundled rules support **Mexico and Panama without new visas** only if you rely on that US visa. **Houston** uses a hub you already have permission for; **Frankfurt** does not include airside transit rules in this skill, so a Turkish passport there normally means a **Schengen short-stay visa** unless an airline confirms sterile transit only—and the skill does not treat that as “fine” without a named transit rule.

**Houston** avoids an extra **EUR 90** Schengen application and **~15 calendar days** processing before **10 Feb 2027**. I cannot compare live airfares here; if Frankfurt is much cheaper, weigh that against visa cost, time, and risk.

---

```text
Trip: Türkiye (Istanbul) → Mexico City (10 Feb–20 Feb 2027) → Panama City (20 Feb–26 Feb 2027) → home (Istanbul); traveller Emre Yilmaz
Person: Emre Yilmaz – Ready for Mexico and Panama via US visa benefit rules (confirm partial rules on official pages); connection Frankfurt – Needs action (Schengen not held, transit not in bundled data); connection Houston – Ready (US B1/B2)

Documents read
  - Passport: Turkish (TUR), number ending …938, expires 1 Aug 2030, read from Personal/Travel/Pasaport/pasaport-emre.pdf; machine readable zone: agrees with the printed page
  - Visa: United States B1/B2, multiple entries (M), ending …907, valid 11 Apr 2024–10 Apr 2029, read from Personal/Travel/Vize/us-visa-b1b2.pdf

Passport validity (passport expires 2030-08-01; arrival Mexico 2027-02-10; last departure ~2027-02-27)
  - Arrival plus 6 months = 10 Aug 2027 – met (E on or after)
  - Last departure plus 3 months = 27 May 2027 – met
  - Whole stay through 26 Feb 2027 – met
  Which pattern each country uses: Mexico/Panama not spelled out in bundled files beyond “passport valid for whole visit” (Mexico US-visa note); confirm validity rule on each official source below.

Country: Mexico, 10 Feb–20 Feb 2027
  Path: mx-entry-with-us-visa – visa-free entry (tourism/business/transit) if rule confirmed
  Checks: (1) Hold valid US visa at entry – yes (expires 10 Apr 2029, after 20 Feb 2027)
  Also required: digital FMMd; carry passport + US visa; officers may ask purpose proof; confirm with consulate covering you (partial rule); confirm on source
  Fee and waiting time: none for entry under this rule if confirmed; no Mexican visa fee in bundled data
  Documents: passport and US visa – have; FMMd – missing until you complete online before travel; flight/accommodation proof – not in Personal/Travel
  Source: https://consulmex.sre.gob.mx/montreal/index.php/es/enterate/7-servicios-consulares/servicios-a-extranjeros/159-turistasnuevoesp (Consulate General of Mexico in Montreal, checked 07 Nov 2026, partial)

Country: Panama, 20 Feb–26 Feb 2027
  Path: pa-entry-with-visa – visa-free tourist stay up to 90 days
  Checks: (1) Hold valid US visa – yes (expires after 26 Feb 2027)
  Also required: general tourist entry conditions on SNM site (onward ticket, funds, etc. as officers require)
  Fee and waiting time: none under this rule in bundled data
  Documents: passport and US visa – have; onward ticket/accommodation – not in folder
  Source: https://www.migracion.gob.pa/plantilla-tramite-migratorio-v-tet-variante-273-borrador-2/ (SNM Panama, checked 07 Nov 2026, verified)

Country: Türkiye (return home)
  Path: Turkish national returning – not covered as a “benefit rule” in bundled trip sense; home country entry per Turkish law – confirm on official source if needed
  Checks: none in skill for citizens returning
  Also required: none listed here
  Fee and waiting time: not in bundled data
  Documents: valid passport – have
  Source: official Türkiye border/immigration pages (see official-sources.md if needed)

Connection: Houston (IAH), United States – outbound, between Mexico/Panama legs, and return as booked
  Covered by: US B1/B2 visa held (admission/transit through US normally requires valid visa or ESTA; ESTA not for Turkish citizens; B1/B2 covers)

Connection: Frankfurt (FRA), Germany / Schengen – if you choose this routing
  Covered by: not covered by the bundled data, check the official page (no Schengen visa or permit on file; no transit rule id in countries/schengen.md for Turkish nationals)
  Practical implication: plan for Schengen type C short-stay visa via German consulate unless airline and German border authority confirm airside-only transit exempt—skill cannot mark that as cleared without a bundled transit rule

Names: names match (YILMAZ / Emre on passport and US visa; employment letter “Emre Yilmaz” – minor spelling style only)

Money: entry fees per person USD/EUR 0 on bundled rules if US-visa paths apply; household total same. If Frankfurt routing: add Schengen visa ~EUR 90 (~USD 99) per schengen-short-stay-visa-c (European Commission, checked 07 Nov 2026). Proof of funds: not checked – no bank statements in Personal/Travel; Mexico/Panama may ask for trip funds at border; US B1/B2 interview standard is employment + finances – employment letter have (Bosphorus Freight, 18 Oct 2026)

Checklist, dated from 11 Nov 2026
  - Now: Compare Houston vs Frankfurt total cost including Schengen visa/time if not already priced in
  - By ~19 Jan 2027: If booking Frankfurt, apply Schengen visa (start-by ≈ departure 10 Feb − 15 days − 7 buffer); not needed for Houston-only routing
  - Before 10 Feb 2027: Complete Mexico FMMd; confirm Mexico partial rule with your consulate; book/show onward Mexico → Panama → home; travel insurance if you want coverage (none on NAS)
  - Pack: passport, US visa passport, employment letter; digital/printed FMMd; onward tickets
  - 10 Feb 2027: Depart Istanbul with documents above; prefer Houston connects to use existing US visa
  - 26 Feb 2027 onward: Leave Panama; use same US-visa-backed routing home

Rules change. Confirm on the official page before you apply, pay, book or travel.
```

**What you need in practice**

1. **Book via Houston** unless Frankfurt savings clearly beat **~EUR 90 + processing + Schengen documents** and any embassy wait risk before February.  
2. **Mexico:** valid passport, **US visa**, completed **FMMd**, and be ready for questions on purpose of visit.  
3. **Panama:** same US visa + passport; typical tourist paperwork (onward flight, possibly proof of funds).  
4. **US connections:** your **B1/B2** is the critical document; allow time for US immigration and baggage recheck policies on your ticket.  
5. **Optional:** Copa **Panama stopover** (pa-copa-panama-stopover) only if your ticket is a new Copa booking through PTY—entry rules still apply.  

Photo library was not searched (default); say if you want document photos on the NAS included next time.

If you want this saved as a report on the NAS or tagged in `Personal/Travel`, say so and we can do that after you agree.
