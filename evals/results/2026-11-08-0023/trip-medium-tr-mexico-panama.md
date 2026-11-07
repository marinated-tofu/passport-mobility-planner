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
  _The answer states that the valid US B1/B2 visa permits visa-free entry to Mexico with FMMd, but omits that the bundled rule is partial and requires confirmation with the consulate._
- FAIL The answer says the same US visa lets him enter Panama without a Panamanian visa, for tourist stays up to 90 days.  
  _The answer says the US visa permits visa-free entry to Panama but does not state the tourist stay limit of up to 90 days._
- FAIL For the connection, the answer says the Houston connection is covered by his valid US visa, and that Frankfurt transit rules for Turkish citizens are not in the bundled data (or need checking), rather than declaring Frankfurt fine.  
  _The answer says Houston transit is covered by the US visa but asserts that Frankfurt requires a Schengen visa instead of acknowledging that the transit rules for Turkish citizens need checking or are absent from the bundled data._
- FAIL The answer checks that both the passport (2030) and the US visa (2029) stay valid for the whole trip.  
  _The answer lists both expiry dates but checks passport validity only against visit start dates and does not explicitly check that both documents remain valid throughout the whole trip._
- FAIL The answer includes a dated checklist with the FMMd done by the day of the Mexico flight.  
  _The answer provides no dated checklist and says to complete FMMd on arrival rather than by the day of the Mexico flight._

## Delegate calls

1. `file-agent` -> completed: In the Personal/Travel folder, find PDF, JPG, JPEG, PNG and HEIC files whose names, tags or contents suggest a passport, visa, residence permit, residence card or national ID, including files tagged with a name starting with dossier. Search subfolders. Return each match with its real path, file type, tags and modified date. Do not open, move or change any file. If there are no matches, return an empty list and say so.
2. `document-agent` -> completed: From Personal/Travel/Pasaport/pasaport-emre.pdf, extract one record per document with these fields: document type, issuing country, holder surname, given names, nationality, date of birth, sex, place of birth, document number, date of issue, date of expiry, issuing authority, and for visas the visa type, entries allowed, duration of stay and valid-from date. Also extract the machine readable zone lines exactly as printed, and say for each document whether the name, document number, date of birth, nationality and expiry in the machine readable zone agree with the printed fields. Return a field as empty when it is not visible; never guess. Report each file you could not read.
3. `document-agent` -> completed: From Personal/Travel/Vize/us-visa-b1b2.pdf, extract one record per document with these fields: document type, issuing country, holder surname, given names, nationality, date of birth, sex, place of birth, document number, date of issue, date of expiry, issuing authority, and for visas the visa type, entries allowed, duration of stay and valid-from date. Also extract the machine readable zone lines exactly as printed, and say for each document whether the name, document number, date of birth, nationality and expiry in the machine readable zone agree with the printed fields. Return a field as empty when it is not visible; never guess. Report each file you could not read.

## References read

- SKILL.md
- SKILL.md
- references/workflows/plan.md
- references/countries/mx.md
- references/countries/pa.md
- references/countries/de.md
- references/countries/schengen.md
- references/countries/us.md

## Answer

I now have all the information needed for your trip plan. Let me provide a comprehensive analysis.

## Summary of Your Documents

| Document | Details |
|----------|---------|
| **Turkish Passport** | YILMAZ EMRE, expires 2030-08-01 |
| **US B1/B2 Visa** | Single entry, expires 2029-04-10 |

---

## Trip Entry Requirements

### 1. Mexico (Feb 10–19, 2027)
- **Entry method**: Visa-free with US B1/B2 visa
- **Requirements**: Your US visa (valid), FMMd digital migration form
- **Passport validity**: Your passport expires 2030, visit starts Feb 10 → PASS ✅

### 2. Panama (Feb 19–26, 2027)
- **Entry method**: Visa-free with US B1/B2 visa  
- **Requirements**: Your US visa (valid)
- **Passport validity**: Your passport expires 2030, visit starts Feb 26 → PASS ✅

### 3. Frankfurt (Schengen) Transit
- **Entry method**: **Schenen visa required** (you don't have one)
- **Fee**: EUR 90 (~USD 99)
- **Processing**: 15 days (up to 45)
- **Apply by**: **August 10, 2026** (6 months before travel)
- **Deadline**: At least 15 days before Feb 10, 2027

### 4. Houston (US) Transit
- **Entry method**: Covered by your US B1/B2 visa
- **No additional visa needed**

---

## Flight Connection Comparison

| Connection | Visa Needed | Application Start | Notes |
|------------|-------------|-------------------|-------|
| **Frankfurt** | Schengen visa (new) | Aug 10, 2026 | Schengen visa also unlocks travel to Schengen countries |
| **Houston** | None (your US visa covers it) | N/A | Simpler, no new visa required |

---

## Recommendation

**Book Houston as your connection.** Here's why:

1. **Your US B1/B2 single-entry visa already covers Houston transit** - no additional visa needed
2. **Frankfurt requires a Schengen visa** which you don't have
3. **Schengen visa fees**: ~USD 99, processing ~15 days
4. **Single-entry visa means you can only enter once** - you'd need a multiple-entry Schengen visa for Frankfurt transit

**Houston is the only connection that works without new applications.**

---

## What You Need

### For Houston connection:
- Turkish passport
- US B1/B2 visa (already valid)
- Fill out FMMd for Mexico on arrival
- Flight booking showing connection through Houston

### If you choose Frankfurt instead:
- You'd need to apply for a Schengen visa first (by Aug 10, 2026)
- Schengen visa fees: EUR 90
- Multiple processing times apply

**Would you like me to prepare the application checklist for Houston, or do you have any other questions?**
