# trip-weak-in-schengen

**Household:** weak-in (weak passport)

**Request:** I want to go to Portugal and Spain from 8 to 22 May 2027, Lisbon first for eight nights then Madrid. My documents are in Personal/Travel. Sort out everything I need, step by step.

## Checks

- FAIL stayed within the model's context window (API Error: 400 request (43656 tokens) exceeds the available context size (32768 tokens), try increasing it)

## Rubric

- FAIL The answer flags that the passport expires on 2027-03-19, before the trip, so it must be renewed first, and does not plan the visa on the current passport.  
  _no answer: context window exceeded_
- FAIL The answer says he needs a Schengen short-stay (type C) visa, applied for at the consulate of Portugal (main destination by nights) or its provider, with the bundled fee (EUR 90), processing time (15 calendar days, up to 45) and when he can apply (no earlier than 6 months before travel, or a start-by date that leaves the processing time).  
  _no answer: context window exceeded_
- FAIL The answer checks the visa's documents against the dossier and says travel insurance, accommodation proof and a flight booking are missing, while the bank statements and employment letter are present.  
  _no answer: context window exceeded_
- FAIL The answer compares his funds with the bundled Portugal reference amount (EUR 75 per entry plus EUR 40 per day) and handles INR versus EUR with a break-even exchange rate or a stated rate, without inventing one.  
  _no answer: context window exceeded_
- FAIL The answer orders the steps with dates (passport renewal, then the visa application at least 15 days before 8 May 2027 plus margin) and does not give financial advice.  
  _no answer: context window exceeded_

## Delegate calls

1. `file-agent` -> completed: In the Personal/Travel folder, find PDF, JPG, JPEG, PNG and HEIC files whose names, tags or contents suggest a passport, visa, residence permit, residence card or national ID, including files tagged with a name starting with dossier. Search subfolders. Return each match with its real path, file type, tags and modified date. Do not open, move or change any file. If there are no matches, return an empty list and say so.
2. `document-agent` -> waiting_user: From the passport file path given, extract one record with these fields: document type, issuing country, holder surname, given names, nationality, date of birth, sex, place of birth, document number, date of issue, date of expiry, issuing authority. Also extract the machine readable zone lines exactly as printed, and say for each document whether the name, document number, date of birth, nationality and expiry in the machine readable zone agree with the printed fields. Return a field as empty when it is not visible; never guess. Report each file you could not read.
3. `document-agent` -> completed: From the file path Personal/Travel/Passport/passport-arjun.pdf, extract one record with these fields: document type, issuing country, holder surname, given names, nationality, date of birth, sex, place of birth, document number, date of issue, date of expiry, issuing authority. Also extract the machine readable zone lines exactly as printed, and say for each document whether the name, document number, date of birth, nationality and expiry in the machine readable zone agree with the printed fields. Return a field as empty when it is not visible; never guess. Report each file you could not read.

## References read

- SKILL.md
- workflows/plan.md
- references/workflows/plan.md
- references/topics/entry-conditions.md
- references/benefits/visa-held.md
- references/options/visitor-and-nomad.md

## Answer

API Error: 400 request (43656 tokens) exceeds the available context size (32768 tokens), try increasing it
