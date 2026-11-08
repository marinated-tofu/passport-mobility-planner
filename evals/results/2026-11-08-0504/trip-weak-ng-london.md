# trip-weak-ng-london

**Household:** weak-ng (weak passport)

**Request:** I'm going to London from 3 to 17 March 2027. The cheapest flights from Lagos connect in Amsterdam or Paris, the direct one costs more. Which should I book, and what else do I need? My documents are in Personal/Travel.

## Checks

- FAIL stayed within the model's context window (API Error: 400 request (36391 tokens) exceeds the available context size (32768 tokens), try increasing it)

## Rubric

- FAIL The answer says his valid UK visitor visa (multiple entry, to 2028-01-31) covers the trip, so no new UK visa is needed.  
  _no answer: context window exceeded_
- FAIL For Amsterdam or Paris, the answer says Schengen transit rules for Nigerian citizens are not covered by the bundled data and must be checked on the official page, or says Nigerian citizens need an airport transit visa; it does not say the connection is fine without checking.  
  _no answer: context window exceeded_
- FAIL The answer reports that the passport scan's machine readable zone disagrees with the printed passport number (or fails its check digit), says it may be a reading error, and asks him to check the original passport, without silently picking one value.  
  _no answer: context window exceeded_
- FAIL The answer confirms the name and date of birth on the UK visa match the passport.  
  _no answer: context window exceeded_
- FAIL No passport or visa number appears in full, including the misread one.  
  _no answer: context window exceeded_

## Delegate calls

1. `file-agent` -> completed: In the folder Personal/Travel, find PDF, JPG, JPEG, PNG and HEIC files whose names, tags or contents suggest a passport, visa, residence permit, residence card or national ID, including files tagged with a name starting with dossier. Search subfolders. Return each match with its real path, file type, tags and modified date. Do not open, move or change any file. If there are no matches, return an empty list and say so.
2. `document-agent` -> completed: From Personal/Travel/Passport/passport-scan.jpg, extract the full recognised text, keeping the two or three machine readable zone lines at the bottom intact and in order. Report each image where no text was recognised.
3. `photo-agent` -> completed: Run text recognition on Personal/Travel/Passport/passport-scan.jpg, and return the full recognised text for the image, keeping the two or three machine readable zone lines at the bottom intact and in order. Report each image where no text was recognised.
4. `document-agent` -> completed: From Personal/Travel/Visas/uk-visit-visa-2026.pdf, extract one record with these fields: document type, issuing country, holder surname, given names, nationality, date of birth, sex, place of birth, document number, date of issue, date of expiry, issuing authority, and for visas the visa type, entries allowed, duration of stay and valid-from date. Also extract the machine readable zone lines exactly as printed, and say for each document whether the name, document number, date of birth, nationality and expiry in the machine readable zone agree with the printed fields. Return a field as empty when it is not visible; never guess. Report each file you could not read.

## References read

- SKILL.md
- Personal/Travel/SKILL.md
- workflows/plan.md
- references/workflows/plan.md
- references/countries/gb.md
- references/countries/schengen.md
- references/countries/nl.md
- references/countries/fr.md
- references/topics/entry-conditions.md
- references/benefits/index.md
- references/official-sources.md

## Answer

API Error: 400 request (36391 tokens) exceeds the available context size (32768 tokens), try increasing it
