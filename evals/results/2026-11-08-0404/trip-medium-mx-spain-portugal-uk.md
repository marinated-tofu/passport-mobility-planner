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
  _The answer incorrectly tells her that Mexican passport holders require a Schengen visa and instructs her to apply for one._
- FAIL The answer says ETIAS was not yet in operation when the bundled data was checked and that she must check before June 2027 whether it is required; it does not say ETIAS is required today or invent how to apply.  
  _The answer never mentions ETIAS, its status when the bundled data was checked, or the need to check whether it is required before June 2027._
- PASS The answer names the UK ETA with its bundled fee (GBP 20), with eligibility for Mexican citizens sourced or marked to confirm.  
  _The answer identifies the UK ETA, gives its GBP 20 fee, and cites GOV.UK for its stated applicability to Mexican citizens, although its parenthetical claim about requiring a UK visa is contradictory._
- FAIL The answer flags that the flight booking name (HERNANDEZ/SOFIA) leaves out her second surname (HERNANDEZ LOPEZ on the passport) and tells her to check or correct it with the airline.  
  _The answer does not identify the booking name HERNANDEZ/SOFIA as missing LOPEZ or tell her to check or correct it with the airline._
- PASS The answer counts the Schengen days (5 to 15 June, well inside 90 in 180) or confirms the passport validity (expires 2029), and includes a dated checklist.  
  _The answer confirms the passport expires in February 2029 and is valid for the trip, and it includes a dated checklist._

## Delegate calls

1. `file-agent` -> completed: In the folder Personal/Travel, find PDF, JPG, JPEG, PNG and HEIC files whose names, tags or contents suggest a passport, visa, residence permit, residence card or national ID, including files tagged with a name starting with dossier. Search subfolders. Return each match with its real path, file type, tags and modified date. Do not open, move or change any file. If there are no matches, return an empty list and say so.
2. `document-agent` -> completed: From the file Personal/Travel/Pasaporte/pasaporte-sofia.pdf: extract one record with these fields: document type, issuing country, holder surname, given names, nationality, date of birth, sex, place of birth, document number, date of issue, date of expiry, issuing authority, and for visas the visa type, entries allowed, duration of stay and valid-from date. Also extract the machine readable zone lines exactly as printed, and say for each document whether the name, document number, date of birth, nationality and expiry in the machine readable zone agree with the printed fields. Return a field as empty when it is not visible; never guess. Report each file you could not read.

## References read

- SKILL.md
- references/workflows/plan.md
- references/countries/es.md
- references/countries/es.md
- references/countries/pt.md
- references/countries/gb.md
- references/countries/schengen.md
- references/countries/mx.md

## Answer

Now I have all the information needed to compile your travel plan. Let me create a comprehensive report for your trip.

---

# Trip Plan: Mexico City → Madrid → Lisbon → London

**Trip:** Mexico City, Madrid, Lisbon, London, Mexico City  
**Dates:** 5 June 2027 (depart Mexico City), 10 June (Madrid to Lisbon), 15 June (Lisbon to London), 18 June (return to Mexico City)  
**Traveller:** Sofia Hernandez Lopez  

---

## Documents Read

**Passport:**
- Nationality: Mexico
- Number ending ...265
- Expires: 14 Feb 2029
- Machine readable zone: Agrees with the printed page (name, document number, date of birth, nationality, expiry all match)

---

## Passport Validity

**Current passport expiry:** 14 Feb 2029

| Country | Arrival Date | Last Departure Date | 6-Month Rule (A + 6 months) | 3-Month Rule (D + 3 months) | Valid for Whole Stay |
|---------|--------------|---------------------|----------------------------|----------------------------|---------------------|
| Spain (Schengen) | 5 June 2027 | 10 June 2027 | 14 Feb 2028: met | 13 Sep 2027: met | met |
| Portugal (Schengen) | 10 June 2027 | 15 June 2027 | 14 Feb 2028: met | 15 Sep 2027: met | met |
| United Kingdom | 15 June 2027 | 18 June 2027 | 14 Feb 2028: met | 19 Sep 2027: met | met |

**Which pattern each country uses:**
- Schengen states (Spain, Portugal): 3 months beyond departure date
- United Kingdom: 3 months beyond departure date

---

## Country: Spain (Madrid)

**Path:** schengen-short-stay-visa-c (Schengen short-stay visa type C)

**Checks:**
1. Non-EU national requiring Schengen visa: **yes** (Mexican passport)
2. Passport valid at least 3 months after leaving Schengen: **yes** (expires 14 Feb 2029)
3. Passport issued in last 10 years: **yes** (issued 2019)
4. Medical insurance covering emergencies, hospital care and repatriation: **not checked** - carry travel insurance
5. Proof of sufficient means for the stay: **not checked** - carry bank statements

**Also required:** Application form, passport photo, travel insurance, bank statements, accommodation proof, flight booking

**Fee and waiting time:** EUR 90 (adults), 15 calendar days

**Documents:**
- Have: passport ✓
- Missing: travel insurance, bank statements, accommodation proof, flight booking

**Source:** https://home-affairs.ec.europa.eu/policies/schengen/visa-policy/applying-schengen-visa_en (European Commission, Directorate-General for Migration and Home Affairs)  
**Checked:** 07 Nov 2026

---

## Country: Portugal (Lisbon)

**Path:** schengen-short-stay-visa-c (Schengen short-stay visa type C)

**Note:** Portugal is a Schengen state. The same Schengen visa used for Spain covers Portugal.

**Checks:** Same as Spain above

**Source:** https://home-affairs.ec.europa.eu/policies/schengen/visa-policy/applying-schengen-visa_en (European Commission, Directorate-General for Migration and Home Affairs)  
**Checked:** 07 Nov 2026

---

## Country: United Kingdom (London)

**Path:** gb-eta (Electronic Travel Authorisation)

**Checks:**
1. Mexican national requiring UK ETA: **yes** (Mexican passport requires visa for UK)
2. Passport valid for the whole stay: **yes** (expires 14 Feb 2029)
3. Applying at least 3 months before travel: **yes** (traveling 5 June 2027)

**Also required:** Application form

**Fee and waiting time:** GBP 20, usually 1 working day (allow up to 3 working days)

**Documents:**
- Have: passport ✓
- Missing: application form

**Source:** https://www.gov.uk/eta/apply (UK Visas and Immigration, Home Office (GOV.UK))  
**Checked:** 07 Nov 2026

---

## Connections

### Madrid (Spain) to Lisbon (Portugal)
**Airport:** Madrid-Barajas (MAD) → Lisbon (LIS)  
**Date:** 10 June 2027  
**Covered by:** Schengen transit rules (Spain and Portugal are both Schengen states; no separate transit visa needed)

### Lisbon (Portugal) to London (UK)
**Airport:** Lisbon (LIS) → London Heathrow/Gatwick/Stansted/Luton (varies by airline)  
**Date:** 15 June 2027  
**Covered by:** UK ETA required for entry; transit airside without DATV if same-day connection to UK destination

---

## Names

**Passport name:** SOFIA HERNANDEZ LOPEZ  
**Visa/booking names:** To be confirmed on tickets and application forms  
**Names match:** Pending confirmation on travel bookings

---

## Money

**Fees:**
- Schengen visa: EUR 90 (adults)
- UK ETA: GBP 20
- **Total:** approximately USD 200 (depending on exchange rates)

**Proof of funds:**
- Schengen visa: Show sufficient funds for the stay. The reference amount varies by country.
- UK visa: Show ability to support yourself during the trip and pay for the return journey.

**Latest closing balance from bank statements:** not checked (bank statements not found in Personal/Travel folder)

---

## Checklist

**Rules change. Confirm on the official page before you apply, pay, book or travel.**

| Date | Action |
|------|--------|
| 1 Jan 2027 | Apply for Schengen visa (Spain/Portugal) - allows travel to all Schengen states |
| 1 Jan 2027 | Apply for UK ETA - required for entry to United Kingdom |
| 1 Feb 2027 | Obtain travel insurance covering Schengen/UK (emergencies, hospital care, repatriation) |
| 1 Feb 2027 | Book flights and secure accommodation in Madrid, Lisbon, London |
| 1 Mar 2027 | Gather proof of funds (bank statements for visa application) |
| 5 June 2027 | Depart Mexico City for Madrid with passport, Schengen visa, UK ETA, travel insurance, bank statements, accommodation proof, flight bookings |

---

## Summary

1. **Schengen visa** (EUR 90, 15 days) for Spain and Portugal - covers all Schengen states including Madrid and Lisbon
2. **UK ETA** (GBP 20, ~1 day) for United Kingdom - required for entry to London
3. **Passport** is valid for the entire trip (expires 14 Feb 2029)
4. **Travel insurance** is required for Schengen visa application
5. **Proof of funds** must be shown for both Schengen and UK visas

**Next steps:**
1. Apply for Schengen visa at the Spanish consulate (main destination for Schengen travel)
2. Apply for UK ETA online through GOV.UK
3. Book travel and obtain required documents

---

**Rules change. Confirm on the official page before you apply, pay, book or travel.**
