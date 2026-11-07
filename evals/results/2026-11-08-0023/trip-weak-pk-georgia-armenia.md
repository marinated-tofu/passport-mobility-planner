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

- FAIL For Georgia, the answer applies the rule for Pakistani citizens with UAE residence (permit valid at least one year on the day of entry), sees that her permit ends 2027-06-30, about six months after entry, and says she needs a Georgian C1 e-visa instead of visa-free entry.  
  _The answer incorrectly grants visa-free Georgian entry based on UAE residence, without applying the one-year permit-validity requirement or identifying the need for a Georgian C1 e-visa._
- FAIL For Armenia, the answer uses the GCC residence exemption, checks that the permit is valid at least six months from entry (2027-06-30 against entry on 2026-12-24) and says the 111-country list was not checked so she must confirm Pakistan is on it.  
  _The answer asserts visa-free Armenian entry without checking six months of permit validity from 2026-12-24 or saying the unchecked 111-country list requires confirmation that Pakistan is included._
- FAIL For Istanbul, the answer says her UAE residence does not unlock Turkey's conditional e-visa (that needs a Schengen, US, UK or Irish visa or permit) and that a Turkish visa is outside the bundled data or needs the official source.  
  _The answer incorrectly says UAE residence qualifies her for a Turkish e-visa and omits both the required Schengen, US, UK or Irish supporting document and the need to consult an official source._
- FAIL The answer flags that the UAE residence permit expires on 2027-06-30 and that renewing it matters for these benefits and for returning to Dubai.  
  _Although the answer lists the permit expiry as 2027-06-30, it does not explain that renewal matters for residence-based entry benefits and returning to Dubai._
- FAIL The answer includes a dated checklist starting now, given the trip is about six weeks away.  
  _The answer provides travel dates but no dated preparation checklist starting now, about six weeks before departure._

## Delegate calls

1. `file-agent` -> completed: In the Personal/Travel folder, find PDF, JPG, JPEG, PNG and HEIC files whose names, tags or contents suggest a passport, visa, residence permit, residence card or national ID, including files tagged with a name starting with dossier. Search subfolders. Return each match with its real path, file type, tags and modified date. Do not open, move or change any file. If there are no matches, return an empty list and say so.
2. `document-agent` -> completed: From Personal/Travel/Passport/passport-ayesha.pdf, extract one record with: document type, issuing country, holder surname, given names, nationality, date of birth, sex, place of birth, document number, date of issue, date of expiry, issuing authority, and for visas the visa type, entries allowed, duration of stay and valid-from date. Also extract the machine readable zone lines exactly as printed, and say for each document whether the name, document number, date of birth, nationality and expiry in the machine readable zone agree with the printed fields. Report each file you could not read.
3. `document-agent` -> completed: From Personal/Travel/UAE/residence-permit.pdf, extract one record with: document type, issuing country, holder surname, given names, nationality, date of birth, sex, place of birth, document number, date of issue, date of expiry, issuing authority, and for visas the visa type, entries allowed, duration of stay and valid-from date. Also extract the machine readable zone lines exactly as printed, and say for each document whether the name, document number, date of birth, nationality and expiry in the machine readable zone agree with the printed fields. Report each file you could not read.

## References read

- ./SKILL.md
- ./SKILL.md
- ./references/benefits/index.md
- ./references/countries/tr.md
- ./references/countries/ge.md
- ./references/countries/am.md
- ./references/options/index.md

## Answer

I have all the visa information. Let me provide you with the trip plan:

## **Trip Summary**

**Passport:** Pakistani (expires 2031-09-03)
**Residence:** UAE GDRFA Dubai (expires 2027-06-30)

### **Visa Status for Each Country:**

| Country | Visa Needed | How to Enter |
|---------|-------------|--------------|
| **Georgia** (Tbilisi) | ❌ None | Visa-free entry (90 days in 180 days) with your UAE residence permit |
| **Armenia** (Yerevan) | ❌ None | Visa-free entry (180 days within one year) with your UAE residence permit |
| **Turkey** (Istanbul) | ✅ Yes | Turkish e-visa (single entry, 30 days) - you qualify with UAE residence |

### **Route Plan:**

**1. Dubai → Tbilisi, Georgia (18-24 Dec 2026)**
- 7 days in Georgia
- **Visa:** Not needed (90-day visa-free with UAE residence)
- **Notes:** Your UAE residence expires 2027-06-30, so it's valid for entry into Georgia

**2. Tbilisi → Yerevan (Overland, 24-29 Dec 2026)**
- Drive from Tbilisi to Yerevan (~3-4 hours via Khevsureti route)
- **Visa:** Not needed for transit between Georgia and Armenia
- **Notes:** You'll visit both countries, staying in Georgia until 24th, then drive to Armenia

**3. Yerevan → Istanbul → Dubai (Fly back)**
- Fly from Yerevan to Istanbul (Turkey)
- **Visa:** Turkish e-visa required (single entry, 30 days)
- **Notes:** You can get the e-visa online before departure
- **Istanbul stopover:** If you're connecting, Turkish Airlines offers free hotel nights for layovers of 20+ hours

---

## **Questions for You:**

1. **Do you have the Turkish e-visa ready?** You can apply online before your Yerevan-Istanbul flight.

2. **Bank statements:** The plan route can check if your bank statements meet proof-of-funds requirements. Would you like me to check that?

3. **Save report:** Should I save this trip plan as a report to your Personal/Travel folder?

Let me know if you'd like me to check your bank statements for the Turkey e-visa proof-of-funds requirements, or if you want me to save this report to your NAS.
