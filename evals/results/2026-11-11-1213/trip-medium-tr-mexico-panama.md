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
  _The answer identifies the U.S. B1/B2 visa valid through 2029-04-10 as the basis for visa-free Mexican entry, requires FMMd, and flags the bundled rule as partial with consular confirmation needed._
- PASS The answer says the same US visa lets him enter Panama without a Panamanian visa, for tourist stays up to 90 days.  
  _The answer says the valid U.S. visa waives Panama’s visa requirement for tourist stays up to 90 days._
- FAIL For the connection, the answer says the Houston connection is covered by his valid US visa, and that Frankfurt transit rules for Turkish citizens are not in the bundled data (or need checking), rather than declaring Frankfurt fine.  
  _Although it correctly says Frankfurt transit is not covered by the bundled data, it describes Houston as only 'likely covered' and conditional on airline confirmation rather than affirming that the valid U.S. visa covers the connection._
- PASS The answer checks that both the passport (2030) and the US visa (2029) stay valid for the whole trip.  
  _The answer checks the passport’s 2030 expiry against the trip dates and confirms the U.S. visa remains valid beyond the final day in Panama on 26 February 2027._
- FAIL The answer includes a dated checklist with the FMMd done by the day of the Mexico flight.  
  _The checklist is dated, but it allows FMMd completion during the arrival process rather than explicitly requiring completion by the day of the Mexico flight._

## Delegate calls

1. `file-agent` -> completed: In the folder Personal/Travel, find PDF, JPG, JPEG, PNG and HEIC files whose names, tags or contents suggest a passport, visa, residence permit, residence card or national ID, including files tagged with a name starting with dossier. Search subfolders. Return each match with its real path, file type, tags and modified date. Do not open, move or change any file. If there are no matches, return an empty list and say so.
2. `document-agent` -> completed: From each of these passport, visa, residence permit or national ID files: Personal/Travel/Pasaport/pasaport-emre.pdf, Personal/Travel/Vize/us-visa-b1b2.pdf, extract one record per document with these fields: document type, issuing country, holder surname, given names, nationality, date of birth, sex, place of birth, the last three characters of the document number, date of issue, date of expiry, issuing authority, and for visas the visa type, entries allowed, duration of stay and valid-from date. Compare the machine readable zone with the printed fields yourself and do not return the machine readable zone lines: say for each document whether the name, document number, date of birth, nationality and expiry in the zone agree with the printed page, and for each field that differs, which character positions differ and the two characters at each. Return a field as empty when it is not visible; never guess. Report each file you could not read.
3. `file-agent` -> completed: In the folder Personal/Travel, find PDF and image files whose names, tags or contents suggest a birth certificate, marriage certificate, degree certificate, transcript, CV, employment letter, employment contract, payslip, bank statement, tax return, business registration, police clearance, medical certificate, health or travel insurance, tenancy contract, flight booking, accommodation booking or invitation letter. Search subfolders. Return each match with its real path, file type, tags and modified date. Do not open, move or change any file. If there are no matches, return an empty list and say so.
4. `document-agent` -> completed: For each of these files: Personal/Travel/Supporting/employment-letter-2026.pdf, return one record per document. Set the document type to one of: birth-certificate, marriage-certificate, degree-certificate, transcript, cv, employment-letter, employment-contract, payslips, bank-statements, tax-return, business-registration, sponsor-letter, invitation-letter, police-clearance, medical-certificate, health-insurance, travel-insurance, flight-booking, accommodation-proof, tenancy-contract, proof-of-income, or other with the title as printed. Always return the holder or person names as printed, the issuing body, the issue date, any expiry or validity dates, and whether an apostille, attestation or certified translation stamp is visible. Also return, when printed: dates and places of birth or marriage and registry numbers for certificates; institution, degree, field and award date for degrees and transcripts; employer, job title, start date, salary and currency for employment documents and payslips; bank, currency, period start and end, opening and closing balance for bank statements; cover period, territory and cover amount for insurance; names, addresses, dates, rent and deposit for tenancy contracts and bookings. For any account, booking or registry number return only its last three characters. Return a field as empty when it is not printed; never guess. Report each file you could not read.

**Model in replies:** gpt-5.6-luna. **Credential source:** none.

## References read

- SKILL.md
- references/workflows/plan.md
- references/topics/entry-conditions.md
- references/topics/document-fields.md
- references/countries/mx.md
- references/countries/pa.md
- references/countries/us.md
- references/countries/schengen.md

## Answer

Book the Houston connection, subject to one condition: use a through-ticket on a single booking and confirm with the airline that your valid U.S. B1/B2 visa is accepted for the Houston transit.

Frankfurt is the riskier choice because the bundled rules do not cover Frankfurt airport transit for this itinerary, and no Schengen visa was found. It may be possible to remain airside, but if the itinerary requires border control, baggage collection, an airport change, or an overnight landside stay, your current documents do not show permission to enter Germany. Ask the airline to confirm the exact Frankfurt itinerary before considering it.

Trip: Istanbul → Mexico City, 10 February 2027; Mexico for approximately ten days; Mexico City → Panama City around 20 February; Panama City → home on 26 February.

Person: Emre Yilmaz — Needs action

Documents read

- Turkish passport, nationality Turkish, ending 938, expires 1 August 2030. Machine-readable zone agrees with the printed page.
- U.S. B1/B2 visa, multiple entry, ending 907, valid 11 April 2024–10 April 2029. The visa and passport names agree.
- Supporting document: employment letter from Bosphorus Freight A.S., issued 18 October 2026, showing employment as Logistics Manager since 3 September 2018 and salary of TRY 145,000 gross monthly.
- No flight booking, accommodation booking, travel insurance, bank statement, or other proof-of-funds document was found in `Personal/Travel`.

Passport validity

- Arrival in Mexico: 10 February 2027.
- Arrival plus six months: 10 August 2027 — passport meets this.
- Departure from Panama: 26 February 2027.
- Departure plus three months: 26 May 2027 — passport meets this.
- Whole trip: passport valid well beyond 26 February 2027.

Mexico: approximately 10–20 February 2027

Path: visa-free entry using the U.S. visa, rule `mx-entry-with-us-visa`.

Checks:

1. Holds a U.S.-issued visa: yes, B1/B2.
2. U.S. visa valid at entry: yes; expires 10 April 2029.
3. U.S. visa valid beyond the end of the Mexican stay: yes.
4. Passport valid for the whole visit: yes.

The rule is marked partial, so confirm it with the Mexican consulate before booking or travelling. Complete the digital FMM migration form, carry the passport and U.S. visa together, and carry evidence of the trip’s purpose and onward travel. The consulate page does not state a stay limit for this category.

Source: https://consulmex.sre.gob.mx/montreal/index.php/es/enterate/7-servicios-consulares/servicios-a-extranjeros/159-turistasnuevoesp — checked 7 November 2026.

Panama: approximately 20–26 February 2027

Path: visa-free entry using the U.S. visa, rule `pa-entry-with-visa`.

Checks:

1. Holds a visa issued by the United States: yes, B1/B2.
2. Visa is current through the last day in Panama: yes; expires 10 April 2029, after 26 February 2027.
3. Tourist stay is within the stated 90-day limit: yes; planned stay is about six days.

Panama’s rule says the U.S. visa waives the Panamanian visa requirement for visa-required nationalities when the visa is current. Carry the passport, U.S. visa, onward/home ticket, accommodation details, and evidence of sufficient funds.

Source: https://www.migracion.gob.pa/plantilla-tramite-migratorio-v-tet-variante-273-borrador-2/ — checked 7 November 2026.

Connections

- Houston, United States, likely covered by the valid U.S. B1/B2 visa. The U.S. file describes the visa as a visitor visa but does not provide a detailed airport-transit rule. Confirm with the airline that this visa is accepted for the specific connection, especially if tickets are separate. Avoid an airport change and allow time for U.S. immigration, customs, baggage collection, and recheck.
- Frankfurt, Germany, not covered by the bundled transit data. No Schengen visa was found. Book it only after the airline confirms in writing that the exact Turkish-passport itinerary remains airside and does not require Schengen entry permission.

Source for the bundled Schengen information: https://home-affairs.ec.europa.eu/policies/schengen/schengen-area_en — checked 7 November 2026. The bundled data does not give a Frankfurt airport-transit determination.

Money and supporting evidence

- Documented new visa fees: USD 0, because the existing U.S. visa provides the Mexico and Panama paths.
- Flight prices and live fare comparisons are unavailable here, so I cannot confirm which fare is actually cheaper.
- Proof of funds: not checked. No bank statement was found.
- Employment evidence: available through the employment letter, but it is not a substitute for bank statements if an officer asks for funds.
- Travel insurance: not found.
- Accommodation proof: not found.
- Return/onward ticket: not found.

Checklist from 11 November 2026

- Before booking: confirm the Mexican consulate’s current interpretation of the U.S.-visa exemption and the required FMMd process.
- Before booking Houston: confirm the airline accepts the B1/B2 visa for the connection; use one through-ticket where possible.
- Before booking Frankfurt: obtain confirmation that the exact route is airside and visa-free; otherwise do not use Frankfurt without a Schengen visa.
- Obtain return/onward flight reservations, accommodation evidence for Mexico and Panama, travel insurance, and a recent bank statement.
- Carry the Turkish passport, the passport containing the U.S. visa, employment letter, onward/home tickets, accommodation evidence, insurance, and funds evidence.
- Complete the Mexican FMMd before or during the required arrival process.
- On 10 February 2027: travel with the passport and U.S. visa.

A Panama stopover could also be worth checking if the relevant booking is with Copa: the bundled stopover program allows 24 hours to 15 days with no added airfare, and your planned six-day stay fits that window. It applies only to a new qualifying Copa booking and does not replace Panama’s entry requirements. Source: https://panama-stopover.com/en — checked 7 November 2026.

Rules and airline procedures can change. Confirm the official requirements before applying, paying, booking, or travelling.
