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

- FAIL The answer says his valid US B1/B2 visa (to 2029-04-10) lets him enter Mexico without a Mexican visa, with the FMMd form, and that the bundled rule is partial so he should confirm with the consulate.  
  _The answer says the US visa covers Mexican entry and lists the FMMd, but omits the B1/B2 visa's expiry date, the partial nature of the bundled rule, and consular confirmation._
- FAIL The answer says the same US visa lets him enter Panama without a Panamanian visa, for tourist stays up to 90 days.  
  _The answer says the US visa covers Panama entry without a visa application, but does not state the tourist stay limit of 90 days._
- PASS For the connection, the answer says the Houston connection is covered by his valid US visa, and that Frankfurt transit rules for Turkish citizens are not in the bundled data (or need checking), rather than declaring Frankfurt fine.  
  _The answer states that the US visa covers Houston transit and that Frankfurt transit requirements need checking depending on passport type._
- FAIL The answer checks that both the passport (2030) and the US visa (2029) stay valid for the whole trip.  
  _The answer lists passport validity until 2030 but neither gives the US visa's 2029 expiry nor checks that both documents remain valid throughout the trip._
- FAIL The answer includes a dated checklist with the FMMd done by the day of the Mexico flight.  
  _The answer recommends preparing the FMMd but provides no dated checklist or deadline tied to the Mexico flight on 10 February 2027._

## Delegate calls

1. `file-agent` -> completed: In the folder Personal/Travel, find PDF, JPG, JPEG, PNG and HEIC files whose names, tags or contents suggest a passport, visa, residence permit, residence card or national ID, including files tagged with a name starting with dossier. Search subfolders. Return each match with its real path, file type, tags and modified date. Do not open, move or change any file. If there are no matches, return an empty list and say so.
2. `document-agent` -> waiting_user: From each passport, visa, residence permit or national ID file path given, extract one record per document with these fields: document type, issuing country, holder surname, given names, nationality, date of birth, sex, place of birth, document number, date of issue, date of expiry, issuing authority, and for visas the visa type, entries allowed, duration of stay and valid-from date. Also extract the machine readable zone lines exactly as printed, and say for each document whether the name, document number, date of birth, nationality and expiry in the machine readable zone agree with the printed fields. Return a field as empty when it is not visible; never guess. Report each file you could not read.
3. `document-agent` -> completed: From Personal/Travel/Pasaport/pasaport-emre.pdf and Personal/Travel/Vize/us-visa-b1b2.pdf, extract one record per document with these fields: document type, issuing country, holder surname, given names, nationality, date of birth, sex, place of birth, document number, date of issue, date of expiry, issuing authority, and for visas the visa type, entries allowed, duration of stay and valid-from date. Also extract the machine readable zone lines exactly as printed, and say for each document whether the name, document number, date of birth, nationality and expiry in the machine readable zone agree with the printed fields. Return a field as empty when it is not visible; never guess. Report each file you could not read.
4. `file-agent` -> completed: In the folder Personal/Travel, find PDF and image files whose names, tags or contents suggest a birth certificate, marriage certificate, degree certificate, transcript, CV, employment letter, employment contract, payslip, bank statement, tax return, business registration, police clearance, medical certificate, health or travel insurance, tenancy contract, flight booking, accommodation booking or invitation letter. Search subfolders. Return each match with its real path, file type, tags and modified date. Do not open, move or change any file. If there are no matches, return an empty list and say so.
5. `document-agent` -> completed: For Personal/Travel/Supporting/employment-letter-2026.pdf, return one record with these fields: document type, holder name, issuing body, issue date, employer, job title, start date, salary and currency. Return a field as empty when it is not printed; never guess. Report each file you could not read.

## References read

- SKILL.md
- references/workflows/plan.md
- references/benefits/visa-held.md
- references/benefits/visa-held.md
- references/benefits/transit.md
- references/benefits/stopover.md

## Answer

I'll continue the travel plan with the remaining details about documents, transit, and final recommendations.

---

### Bank Statements & Proof of Funds

No bank statements were found in Personal/Travel. If immigration asks for proof of funds, you'll need:
- Bank account statements for the trip period (typically 3 months)
- Minimum balance rules vary by country (Mexico/Panama generally low requirements for visa-free entry)

### Transit in Frankfurt vs. Houston

**Houston (HOU/HOU area):**
- Advantage: Your US visa covers transit
- No extra transit visa needed
- Potential for "Stopover" programs if you want to extend stay

**Frankfurt (FRA):**
- European transit requires checking German entry rules
- May need a transit visa depending on passport type
- Turkish Airlines stopover program available (20+ hour connection)

### Final Documents to Carry

| Country | Required |
|---------|----------|
| Turkey | Passport (valid until 2030 ✅) |
| Germany/Frankfurt | Transit card or visa if entering airport |
| Mexico | Passport + US visa + FMMd form |
| Panama | Passport + US visa |
| Turkey (return) | Same as initial departure |

### Stopover Opportunities

**If connecting in Istanbul (Turkey):**
- Turkish Airlines 20+ hour connection: Free hotel in Istanbul
- Book at least 72 hours before flight

### Cost Summary

| Item | Cost |
|------|------|
| Mexico visa | $0 (US visa covers) |
| Panama visa | $0 (US visa covers) |
| Transit visa (Frankfurt) | Possibly $10-20 |
| Stopover hotel (Istanbul) | Free with Turkish Airlines |

### Recommendations

1. **Book Houston** if possible - simpler transit with your US visa
2. **Consider Istanbul stopover** - Turkish Airlines free hotel program
3. **Prepare FMMd form** for Mexico
4. **No visa applications needed** for this itinerary

Would you like me to search for any additional documents like bank statements, or help with specific flight routing details?
