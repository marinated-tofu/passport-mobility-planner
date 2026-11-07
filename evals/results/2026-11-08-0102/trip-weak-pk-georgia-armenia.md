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
  _The answer incorrectly grants visa-free entry to Georgia and neither checks the one-year residence validity requirement nor says she needs a Georgian C1 e-visa._
- FAIL For Armenia, the answer uses the GCC residence exemption, checks that the permit is valid at least six months from entry (2027-06-30 against entry on 2026-12-24) and says the 111-country list was not checked so she must confirm Pakistan is on it.  
  _The answer grants visa-free entry to Armenia without checking six months of permit validity from 24 December 2026 or stating that Pakistan's inclusion in the unchecked 111-country list must be confirmed._
- FAIL For Istanbul, the answer says her UAE residence does not unlock Turkey's conditional e-visa (that needs a Schengen, US, UK or Irish visa or permit) and that a Turkish visa is outside the bundled data or needs the official source.  
  _The answer incorrectly says UAE residence qualifies her for Turkey's conditional e-visa and omits the qualifying Schengen, US, UK or Irish visa or permit requirement._
- FAIL The answer flags that the UAE residence permit expires on 2027-06-30 and that renewing it matters for these benefits and for returning to Dubai.  
  _Although the answer lists the permit's 2027-06-30 expiry, it does not explain that renewal matters for residence-based entry benefits and returning to Dubai._
- FAIL The answer includes a dated checklist starting now, given the trip is about six weeks away.  
  _The checklist begins with a generic 'Before 18 Dec 2026' deadline rather than dated actions starting now, about six weeks before departure._

## Delegate calls

1. `file-agent` -> completed: In the folder Personal/Travel, find PDF, JPG, JPEG, PNG and HEIC files whose names, tags or contents suggest a passport, visa, residence permit, residence card or national ID, including files tagged with a name starting with dossier. Search subfolders. Return each match with its real path, file type, tags and modified date. Do not open, move or change any file. If there are no matches, return an empty list and say so.
2. `document-agent` -> completed: From each of these passport, visa, residence permit or national ID files: Personal/Travel/Passport/passport-ayesha.pdf, Personal/Travel/UAE/residence-permit.pdf, Personal/Travel/UAE/emirates-id.jpg, extract one record per document with these fields: document type, issuing country, holder surname, given names, nationality, date of birth, sex, place of birth, document number, date of issue, date of expiry, issuing authority, and for visas the visa type, entries allowed, duration of stay and valid-from date. Also extract the machine readable zone lines exactly as printed, and say for each document whether the name, document number, date of birth, nationality and expiry in the machine readable zone agree with the printed fields. Return a field as empty when it is not visible; never guess. Report each file you could not read.
3. `photo-agent` -> completed: Run text recognition on each of these images: Personal/Travel/UAE/emirates-id.jpg, and return the full recognised text for each image, keeping the two or three machine readable zone lines at the bottom intact and in order. Report each image where no text was recognised.

## References read

- SKILL.md
- workflows/plan.md
- ./references/workflows/plan.md
- ./references/countries/ge.md
- ./references/countries/am.md
- ./references/countries/tr.md
- ./references/topics/entry-conditions.md

## Answer

Based on my analysis of your documents and the country rules, here's your travel plan:

---

## Travel Plan: Dubai → Tbilisi → Yerevan → Istanbul → Dubai

### Your Documents
| Document | Holder | Expiry |
|----------|--------|--------|
| Pakistan Passport | Ayesha Khan | 2031-09-03 |
| UAE Residence Permit | Ayesha Khan | 2027-06-30 |

---

### Entry Requirements by Country

**1. Georgia (Tbilisi)** - 18-24 Dec 2026
- **Status**: ✅ Visa-free entry
- **Why**: UAE residence permit (multiple-entry, valid 2024-2027)
- **Stay**: 90 days in any 180-day period
- **Passport validity**: Your passport expires 2031, well beyond travel dates

**2. Armenia (Yerevan)** - Overland until 29 Dec 2026
- **Status**: ✅ Visa-free entry
- **Why**: UAE residence permit (valid 2024-2027)
- **Stay**: Up to 180 days within one year
- **Passport validity**: Your passport expires 2031, well beyond travel dates

**3. Türkiye (Istanbul)** - Return flight
- **Status**: E-visa required
- **Why**: Pakistan nationals need a Turkish e-visa (single entry, 30 days)
- **Note**: Your UAE residence permit qualifies you for the e-visa

---

### Transit Requirements

**Dubai → Tbilisi**
- **Transit**: Dubai has visa-free transit for UAE residents
- **Document**: UAE residence permit

**Tbilisi → Yerevan (Overland)**
- **Transit**: Armenia is visa-free for UAE residents
- **Document**: UAE residence permit

---

### Action Required

**✅ Ready to travel** with the following:
1. **UAE Residence Permit** - Keep it valid until 2027-06-30
2. **Pakistan Passport** - Valid until 2031-09-03
3. **Turkish e-visa** - Apply in advance for the return leg (single entry, 30 days)

---

### Timeline Checklist

| Date | Action |
|------|--------|
| **Before 18 Dec 2026** | Apply for Turkish e-visa (single entry, ~30 days) |
| **18 Dec 2026** | Depart Dubai for Tbilisi |
| **18-24 Dec 2026** | Visit Tbilisi, Georgia |
| **24-29 Dec 2026** | Overland travel to Yerevan, Armenia |
| **29 Dec 2026** | Fly to Istanbul, Turkey |
| **29 Dec 2026-30 Dec 2026** | Istanbul transit/stopover, then Dubai |

---

### Important Notes

1. **Turkish e-visa**: Apply at [mfa.gov.tr](https://www.mfa.gov.tr/visa-information-for-foreigners.en.mfa) before departure. Your UAE residence permit qualifies you.

2. **Overland travel**: The Georgia-Armenia border is open for UAE residents. You'll need a passport and UAE residence permit.

3. **Istanbul stopover**: Turkey's Turkish Airlines offers free hotel stays for connections of 20+ hours at Istanbul Airport.

4. **Passport validity**: Your passport expires 2031, which is well beyond all travel dates.

Would you like me to:
- Save this travel plan to your NAS?
- Help you apply for the Turkish e-visa?
- Search for any other documents needed?
