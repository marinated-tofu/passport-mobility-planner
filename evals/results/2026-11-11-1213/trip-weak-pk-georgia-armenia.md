# trip-weak-pk-georgia-armenia

**Household:** weak-pk (weak passport)

**Request:** I live in Dubai. I want to go to Tbilisi from 18 to 24 December 2026, then overland to Yerevan until the 29th, then fly back to Dubai. Could I add Istanbul on the way back too? My documents are in Personal/Travel.

## Checks

- PASS no full document numbers
- PASS only NAS agents as targets
- PASS instructions are one plain line
- PASS no delete, move or send requests
- PASS called file-agent
- PASS called document-agent
- PASS answer matches /Georgia/
- PASS answer matches /Armenia/
- PASS answer avoids /(I have|I've) (booked|applied|submitted)/

## Rubric

- PASS For Georgia, the answer applies the rule for Pakistani citizens with UAE residence (permit valid at least one year on the day of entry), sees that her permit ends 2027-06-30, about six months after entry, and says she needs a Georgian C1 e-visa instead of visa-free entry.  
  _It applies the stricter one-year UAE residence validity rule for Pakistani citizens, compares the 30 June 2027 expiry with the required 18 December 2027 validity, and says a Georgian C1 tourist visa/e-visa is required._
- PASS For Armenia, the answer uses the GCC residence exemption, checks that the permit is valid at least six months from entry (2027-06-30 against entry on 2026-12-24) and says the 111-country list was not checked so she must confirm Pakistan is on it.  
  _It assesses Armenia’s UAE residence exemption, confirms that the permit expires after the six-month threshold of 24 June 2027, and explicitly requires confirmation that Pakistan appears on the unchecked 111-country list._
- PASS For Istanbul, the answer says her UAE residence does not unlock Turkey's conditional e-visa (that needs a Schengen, US, UK or Irish visa or permit) and that a Turkish visa is outside the bundled data or needs the official source.  
  _It states that UAE residence does not qualify for Türkiye’s conditional e-visa, identifies the qualifying Schengen, US, UK or Irish documents, and directs the traveller to Turkish authorities because the regular visa route is outside the bundled data._
- FAIL The answer flags that the UAE residence permit expires on 2027-06-30 and that renewing it matters for these benefits and for returning to Dubai.  
  _Although it states the permit expires on 30 June 2027, it does not explain that renewal matters for these benefits and for returning to Dubai._
- PASS The answer includes a dated checklist starting now, given the trip is about six weeks away.  
  _It provides a checklist dated 7 November 2026, roughly six weeks before departure, with immediate pre-booking actions and milestones for 18, 24 and 29 December._

## Delegate calls

1. `file-agent` -> completed: In the folder Personal/Travel, find PDF, JPG, JPEG, PNG and HEIC files whose names, tags or contents suggest a passport, visa, residence permit, residence card or national ID, including files tagged with a name starting with dossier. Search subfolders. Return each match with its real path, file type, tags and modified date. Do not open, move or change any file. If there are no matches, return an empty list and say so.
2. `document-agent` -> completed: From each of these passport, visa, residence permit or national ID files: Personal/Travel/Passport/passport-ayesha.pdf, Personal/Travel/UAE/residence-permit.pdf, extract one record per document with these fields: document type, issuing country, holder surname, given names, nationality, date of birth, sex, place of birth, the last three characters of the document number, date of issue, date of expiry, issuing authority, and for visas the visa type, entries allowed, duration of stay and valid-from date. Compare the machine readable zone with the printed fields yourself and do not return the machine readable zone lines: say for each document whether the name, document number, date of birth, nationality and expiry in the zone agree with the printed page, and for each field that differs, which character positions differ and the two characters at each. Return a field as empty when it is not visible; never guess. Report each file you could not read.
3. `photo-agent` -> completed: Run text recognition on each of these images: Personal/Travel/UAE/emirates-id.jpg, and return the full recognised text for each image, keeping the two or three machine readable zone lines at the bottom intact and in order. Report each image where no text was recognised.
4. `file-agent` -> completed: In the folder Personal/Travel, find PDF and image files whose names, tags or contents suggest a birth certificate, marriage certificate, degree certificate, transcript, CV, employment letter, employment contract, payslip, bank statement, tax return, business registration, police clearance, medical certificate, health or travel insurance, tenancy contract, flight booking, accommodation booking or invitation letter. Search subfolders. Return each match with its real path, file type, tags and modified date. Do not open, move or change any file. If there are no matches, return an empty list and say so.

**Model in replies:** gpt-5.6-luna. **Credential source:** none.

## References read

- SKILL.md
- references/workflows/plan.md
- references/topics/entry-conditions.md
- references/countries/ge.md
- references/countries/am.md
- references/countries/tr.md
- references/topics/document-fields.md

## Answer

Yes, the route is feasible overall, but you need action before booking:

- Georgia: obtain a Georgian C1 tourist visa/e-visa. Your UAE residence permit does not meet the stricter one-year requirement for Pakistani nationals.
- Armenia: likely visa-free using your UAE residence permit, but Pakistan must be confirmed on Armenia’s temporary list of eligible nationalities.
- Istanbul: possible as an airside connection, but your current documents do not establish visa-free entry into Türkiye. A city stopover would require checking Turkish visa requirements.

## Trip

Georgia: 18–24 December 2026  
Overland Georgia–Armenia: 24 December 2026  
Armenia: 24–29 December 2026  
Return: Yerevan–Dubai, optionally via Istanbul  
Traveller: Ayesha Khan

Person: Ayesha Khan — Needs action

## Documents read

- Passport: Pakistani, number ending 918, expires 3 September 2031; read from `Personal/Travel/Passport/passport-ayesha.pdf`. The machine-readable zone agrees with the printed page.
- UAE residence permit: United Arab Emirates residence permit, number ending 120, valid until 30 June 2027; read from `Personal/Travel/UAE/residence-permit.pdf`.
- Emirates ID: image text was readable; it matches the passport and residence permit on name, Pakistani nationality, date of birth and expiry. No machine-readable-zone comparison was available from the image.

The passport, residence permit and Emirates ID all show Ayesha Khan, born 21 August 1994. No name discrepancy was found.

## Passport validity

Passport expiry: 3 September 2031  
Planned arrival: 18 December 2026  
Planned last departure: 29 December 2026

- Arrival plus six months: 18 June 2027 — met.
- Last departure plus three months: 29 March 2027 — met.
- Whole stay: passport remains valid through the entire trip — met.

The passport itself is not the limiting document; the Georgian and Armenian residence-permit conditions are.

## Georgia — 18 to 24 December 2026

Path: Georgian visa-free entry based on a UAE residence permit does not currently apply under the stricter rule for Pakistani nationals.

Checks under the stricter UAE-residence rule:

1. Pakistani nationality: yes; Pakistan is one of the listed nationalities.
2. UAE residence permit: yes.
3. Permit valid for at least one year from entry: no. Entry on 18 December 2026 requires validity through 18 December 2027; your permit expires on 30 June 2027.

Because one check fails, do not rely on the UAE-residence visa exemption. The Georgian Embassy’s rule says nationals in this group whose UAE residence has less than one year remaining need a C1 tourist visa through the Georgian e-visa system.

- Required: Georgian C1 tourist visa/e-visa.
- Fee and waiting time: not included in the bundled data.
- Documents: passport and UAE residence permit available; flight booking, accommodation proof and travel insurance were not found.
- Source: [Georgian Embassy in the UAE](https://uae.mfa.gov.ge/visa-information), checked 7 November 2026.

The less-restrictive rule requiring only that the UAE permit cover the stay would otherwise be met—the permit is valid on 18 December and after 24 December—but the country file specifically says the stricter Pakistani-nationality rule must be applied first.

## Overland Georgia–Armenia — 24 December 2026

This is a land connection between the two countries, so there is no third-country airport transit to assess. Border-crossing schedules and fares are not available in the bundled data.

## Armenia — 24 to 29 December 2026

Path: temporary visa-free entry using the UAE residence permit, subject to confirming that Pakistani nationals are included on Armenia’s linked list of 111 eligible nationalities.

Checks:

1. UAE residence permit: yes.
2. Physical permit with title, name, nationality, date of birth and validity in Latin script and Gregorian dates: yes.
3. Valid for at least six months from entry: yes. Entry on 24 December 2026 requires validity through 24 June 2027; your permit expires on 30 June 2027.
4. Pakistani nationality appears on the ministry’s 111-country list: needs checking. The list was not included in the bundled material.

The exemption is stated to run from 1 July 2026 to 1 July 2027 and allows up to 180 days within one year if all conditions are met.

- Fee and waiting time: no visa fee or waiting time is needed if the exemption applies; otherwise the applicable visa route is not covered in the bundled data.
- Documents: passport and UAE residence permit available. Carry the physical residence permit, not only the Emirates ID.
- Source: [Armenian Ministry of Foreign Affairs](https://www.mfa.am/en/visa/), checked 7 November 2026, partial.

## Istanbul on the return

### If you remain airside at Istanbul Airport

Your proposed route could be Yerevan–Istanbul–Dubai. However, transit rules for this connection are not covered in the bundled country data, so I cannot confirm that an airside transit is permitted for your exact airline, ticket structure, baggage arrangements and airport.

Check the official Turkish consular guidance and confirm that:

- both flights are on one booking if possible;
- baggage is checked through;
- you do not need to pass Turkish passport control;
- the connection does not require changing airports.

### If you want to enter Istanbul

Your UAE residence permit does not qualify for the Turkish conditional e-visa rule in the bundled data. For Pakistani nationals, that rule requires a valid residence permit or visa from a Schengen country, the United States, the United Kingdom or Ireland. A UAE residence permit is not among the listed qualifying documents.

- Turkish e-visa based on your UAE residence permit: no.
- Existing Turkish visa: none found.
- Regular Turkish visa route: not covered in the bundled data; confirm with the Turkish authorities before booking.
- Source: [Turkish Ministry of Foreign Affairs visa information](https://www.mfa.gov.tr/visa-information-for-foreigners.en.mfa), checked 7 November 2026.

A Turkish Airlines connection may offer:

- Touristanbul: a free guided tour for a 6–24-hour international connection, requiring a Turkish Airlines ticket beginning with 235 and both flights on the same booking. It does not remove any Turkish visa requirement.
- Stopover hotel: potentially free hotel accommodation for a 20-hour-to-7-day connection, subject to eligible originating countries, hotel availability and a request at least 72 hours in advance. Visa costs remain the passenger’s responsibility.

Sources: [Touristanbul](https://www.turkishairlines.com/en-int/flights/fly-different/touristanbul/) and [Turkish Airlines Stopover](https://www.turkishairlines.com/en-int/flights/stopover/), checked 7 November 2026.

## Supporting documents found

The NAS search also found:

- `Personal/Travel/Bank/statement-2026-10.pdf`

It was not opened because this trip plan did not request a proof-of-funds assessment. No flight booking, accommodation booking, travel insurance or health insurance was found.

Proof of funds: not checked. No fees can be totalled because the Georgian visa fee, any Turkish visa fee and current transport prices are not included in the bundled data.

## Checklist from 7 November 2026

- Before booking: confirm Pakistan’s inclusion in Armenia’s 111-country temporary exemption list.
- Before booking: apply for or confirm eligibility for Georgia’s C1 tourist e-visa; the application start date cannot be calculated because the bundled data gives no processing time.
- Before booking a Turkish stopover: decide whether you will remain airside or enter Türkiye.
- If entering Türkiye: obtain the applicable Turkish visa before travel; your UAE residence permit alone is not enough for the bundled e-visa rule.
- Carry the Pakistani passport, physical UAE residence permit, Armenian eligibility evidence if available, Georgian visa, accommodation details, onward tickets and insurance.
- 18 December: travel to Georgia only after the Georgian entry document is secured.
- 24 December: cross overland into Armenia.
- 29 December: depart Armenia, with Istanbul only as a confirmed airside connection or after obtaining the required Turkish entry permission.

Rules are a dated snapshot. Confirm each official page before applying, paying, booking or travelling.
