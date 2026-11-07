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
  _The answer incorrectly says Georgia is visa-free and does not apply the one-year UAE residence validity rule or identify the need for a Georgian C1 e-visa._
- FAIL For Armenia, the answer uses the GCC residence exemption, checks that the permit is valid at least six months from entry (2027-06-30 against entry on 2026-12-24) and says the 111-country list was not checked so she must confirm Pakistan is on it.  
  _The answer claims visa-free entry to Armenia without explicitly checking six months of permit validity from entry or stating that Pakistan's inclusion on the unchecked 111-country list must be confirmed._
- PASS For Istanbul, the answer says her UAE residence does not unlock Turkey's conditional e-visa (that needs a Schengen, US, UK or Irish visa or permit) and that a Turkish visa is outside the bundled data or needs the official source.  
  _The answer states that UAE residence does not qualify for Turkey's conditional e-visa, identifies the qualifying Schengen, US, UK or Irish documents, and directs the user to the official Turkish Ministry of Foreign Affairs source for confirmation._
- FAIL The answer flags that the UAE residence permit expires on 2027-06-30 and that renewing it matters for these benefits and for returning to Dubai.  
  _The answer lists the permit expiry as 2027-06-30 but does not explain that renewal matters for residence-based entry benefits and returning to Dubai._
- FAIL The answer includes a dated checklist starting now, given the trip is about six weeks away.  
  _The answer provides trip dates and generic next steps but no dated checklist starting now, approximately six weeks before departure._

## Delegate calls

1. `file-agent` -> completed: In the folder Personal/Travel, find PDF, JPG, JPEG, PNG and HEIC files whose names, tags or contents suggest a passport, visa, residence permit, residence card or national ID, including files tagged with a name starting with dossier. Search subfolders. Return each match with its real path, file type, tags and modified date. Do not open, move or change any file. If there are no matches, return an empty list and say so.
2. `document-agent` -> completed: From each of these passport, visa, residence permit or national ID files: Personal/Travel/Passport/passport-ayesha.pdf, Personal/Travel/UAE/residence-permit.pdf, Personal/Travel/UAE/emirates-id.jpg, extract one record per document with these fields: document type, issuing country, holder surname, given names, nationality, date of birth, sex, place of birth, document number, date of issue, date of expiry, issuing authority, and for visas the visa type, entries allowed, duration of stay and valid-from date. Also extract the machine readable zone lines exactly as printed, and say for each document whether the name, document number, date of birth, nationality and expiry in the machine readable zone agree with the printed fields. Return a field as empty when it is not visible; never guess. Report each file you could not read.
3. `photo-agent` -> completed: Run text recognition on each of these images: Personal/Travel/UAE/emirates-id.jpg, and return the full recognised text for each image, keeping the two or three machine readable zone lines at the bottom intact and in order. Report each image where no text was recognised.
4. `file-agent` -> completed: In the folder Personal/Travel, find PDF and image files whose names, tags or contents suggest a birth certificate, marriage certificate, degree certificate, transcript, CV, employment letter, employment contract, payslip, bank statement, tax return, business registration, police clearance, medical certificate, health or travel insurance, tenancy contract, flight booking, accommodation booking or invitation letter. Search subfolders. Return each match with its real path, file type, tags and modified date. Do not open, move or change any file. If there are no matches, return an empty list and say so.
5. `document-agent` -> completed: For each of these bank statement files: Personal/Travel/Bank/statement-2026-10.pdf, return the account holder name, bank name, last three characters of the account number, currency, statement period start and end dates, statement issue date, opening balance, closing balance, the lowest balance shown in the period, total credits and total debits. Also list every credit at or above the threshold amount given, with its date, amount and description, and every credit that repeats each month from the same payer. Return empty for any field not printed. Never return full account numbers.
6. `knowledge-agent` -> failed: Search only the folder references/countries for the question: Turkish visa requirements for Pakistani nationals, and return the passages that answer it, each with the file path, plus the source address and copy date written at the top of that file. Return an empty result when nothing in the folder answers it; do not use any other folder or general knowledge.
7. `file-agent` -> completed: In the folder references/countries, find the Turkey file (tr.md) and return its real path. If there are no matches, return an empty list and say so.

## References read

- SKILL.md
- workflows/plan.md
- references/workflows/plan.md
- references/countries/ge.md
- references/countries/am.md
- references/countries/tr.md
- references/countries/ae.md
- references/topics/entry-conditions.md
- references/countries/tr.md

## Answer

## Complete Trip Plan Summary

### Your Documents
| Document | Expiry | Key Details |
|----------|--------|-------------|
| Pakistan Passport | 2031-09-03 | Valid for entire trip |
| UAE Residence Permit | 2027-06-30 | Multiple-entry, Accountant |
| Bank Statement | Oct 2026 | AED 24,650 |

---

### Entry Requirements by Country

| Country | Entry Method | Visa Needed | Notes |
|---------|--------------|-------------|-------|
| **Georgia** | UAE residence permit → visa-free | ❌ No | 90 days in any 180-day period |
| **Armenia** | UAE residence permit → visa-free | ❌ No | Up to 180 days within one year |
| **Turkey** | Pakistani national (no Schengen/US/UK/IR residence) | ✅ Yes | **E-visa not available through UAE permit** |
| **UAE** | UAE residence permit | ❌ No | Your home country |

---

### Istanbul Addition: YES

✅ **You can add Istanbul** on the return journey. Turkish Airlines offers:

**Stopover Programs:**
- **20+ hour layover**: Free 1-2 night hotel stay (breakfast included)
- **6-24 hour layover**: Free guided city tour of Istanbul

⚠️ **But you need a Turkish visa** to transit through or enter Turkey.

---

### What You Need to Do

#### 1. Apply for Turkish Visa
The Turkish e-visa requires a Schengen, US, UK, or Irish visa/residence - **not** UAE. You'll need to apply directly:

- **Official Source**: https://www.mfa.gov.tr/visa-information-for-foreigners.en.mfa
- **Typical Requirements**:
  - Valid passport
  - Flight itinerary
  - Proof of funds (AED 24,650 = ~$6,700 USD)
  - Return ticket
  - Hotel booking for Istanbul

#### 2. Passport Validity
✅ Your passport (expires 2031-09-03) is valid for 3+ months beyond departure from Turkey in December 2026.

---

### Suggested Timeline

```
Dec 18-24, 2026:  Dubai → Tbilisi (Georgia)     [No visa needed]
Dec 24-29, 2026:  Tbilisi → Yerevan (Armenia)   [No visa needed]
Dec 29 onwards:   Yerevan → Istanbul → Dubai    [Turkish visa required]
```

---

### Next Steps

1. **Apply for Turkish visa** - Start as soon as possible (processing time varies by method)
2. **Book flights** - Ensure Istanbul layover is 20+ hours to qualify for stopover program
3. **Confirm visa requirements** - Check Turkish Ministry of Foreign Affairs page for 2026 requirements

**Would you like me to:**
- Check if your AED 24,650 meets Turkish proof-of-funds requirements?
- Help you plan the application timeline?
- Search for any other relevant documents in your Personal/Travel folder?
