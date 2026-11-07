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
- FAIL answer matches /Georgia/
- FAIL answer matches /Armenia/
- PASS answer avoids /(I have|I've) (booked|applied|submitted)/

## Rubric

- FAIL For Georgia, the answer applies the rule for Pakistani citizens with UAE residence (permit valid at least one year on the day of entry), sees that her permit ends 2027-06-30, about six months after entry, and says she needs a Georgian C1 e-visa instead of visa-free entry.  
  _not graded_
- FAIL For Armenia, the answer uses the GCC residence exemption, checks that the permit is valid at least six months from entry (2027-06-30 against entry on 2026-12-24) and says the 111-country list was not checked so she must confirm Pakistan is on it.  
  _not graded_
- FAIL For Istanbul, the answer says her UAE residence does not unlock Turkey's conditional e-visa (that needs a Schengen, US, UK or Irish visa or permit) and that a Turkish visa is outside the bundled data or needs the official source.  
  _not graded_
- FAIL The answer flags that the UAE residence permit expires on 2027-06-30 and that renewing it matters for these benefits and for returning to Dubai.  
  _not graded_
- FAIL The answer ends with a dated checklist starting now, given the trip is about six weeks away.  
  _not graded_

## Delegate calls

1. `file-agent` -> completed: In Personal/Travel, find PDF, JPG, JPEG, PNG and HEIC files whose names, tags or contents suggest a passport, visa, residence permit, residence card or national ID, including files tagged with a name starting with dossier. Search subfolders. Return each match with its real path, file type, tags and modified date. Do not open, move or change any file. If there are no matches, return an empty list and say so.
2. `document-agent` -> completed: Read Personal/Travel/Passport/passport-ayesha.pdf and Personal/Travel/UAE/residence-permit.pdf. Extract one record per document with document type, issuing country, holder surname, given names, nationality, date of birth, sex, place of birth, document number, date of issue, date of expiry, issuing authority, and for visas visa type, entries allowed, duration of stay and valid-from date. Extract machine readable zone lines exactly as printed and say whether name, document number, date of birth, nationality and expiry agree with printed fields. Return empty for fields not visible; never guess. Report each unreadable file.
3. `photo-agent` -> completed: Run text recognition on Personal/Travel/UAE/emirates-id.jpg and return the full recognised text, keeping the two or three machine readable zone lines at the bottom intact and in order. Report if no text was recognised.
4. `file-agent` -> completed: In Personal/Travel, find PDF and image files whose names, tags or contents suggest a birth certificate, marriage certificate, degree certificate, transcript, CV, employment letter, employment contract, payslip, bank statement, tax return, business registration, police clearance, medical certificate, health or travel insurance, tenancy contract, flight booking, accommodation booking or invitation letter. Search subfolders. Return each match with its real path, file type, tags and modified date. Do not open, move or change any file. If there are no matches, return an empty list and say so.
5. `document-agent` -> completed: Read Personal/Travel/Bank/statement-2026-10.pdf and return one record with document type, holder names as printed, issuing body, issue date, expiry or validity dates, and whether an apostille, attestation or certified translation stamp is visible. For the bank statement return bank, currency, period start and end, opening and closing balance. Return only the last three characters of any account number. Return empty for fields not printed; never guess. Report if the file cannot be read.

## References read

- SKILL.md
- references/workflows/plan.md
- references/report-format.md
- references/topics/entry-conditions.md
- references/benefits/gcc-residence.md
- references/benefits/stopover.md
- references/options/visitor-and-nomad.md
- references/official-sources.md
- references/workflows/library.md
- references/workflows/benefits.md
- references/topics/document-fields.md
- references/benefits/transit.md

## Answer

API Error: Request rejected (429) · Codex: The usage limit has been reached
