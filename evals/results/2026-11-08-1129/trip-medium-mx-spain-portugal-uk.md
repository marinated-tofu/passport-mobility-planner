# trip-medium-mx-spain-portugal-uk

**Household:** medium-mx (medium passport)

**Request:** I fly Mexico City to Madrid on 5 June 2027, Madrid to Lisbon on 10 June, Lisbon to London on 15 June, and London home on 18 June. My documents are in Personal/Travel. Sort it all out for me.

## Checks

- FAIL stayed within the model's context window (API Error: 400 request (32775 tokens) exceeds the available context size (32768 tokens), try increasing it)

## Rubric

- FAIL The answer does not tell her to apply for a Schengen visa as a requirement, and any statement that Mexican citizens can visit the Schengen area without a visa is sourced or marked to confirm.  
  _no answer: context window exceeded_
- FAIL The answer says ETIAS was not yet in operation when the bundled data was checked and that she must check before June 2027 whether it is required; it does not say ETIAS is required today or invent how to apply.  
  _no answer: context window exceeded_
- FAIL The answer names the UK ETA with its bundled fee (GBP 20), with eligibility for Mexican citizens sourced or marked to confirm.  
  _no answer: context window exceeded_
- FAIL The answer flags that the flight booking name (HERNANDEZ/SOFIA) leaves out her second surname (HERNANDEZ LOPEZ on the passport) and tells her to check or correct it with the airline.  
  _no answer: context window exceeded_
- FAIL The answer counts the Schengen days (5 to 15 June, well inside 90 in 180) or confirms the passport validity (expires 2029), and includes a dated checklist.  
  _no answer: context window exceeded_

## Delegate calls

1. `file-agent` -> completed: In the folder Personal/Travel, find PDF, JPG, JPEG, PNG and HEIC files whose names, tags or contents suggest a passport, visa, residence permit, residence card or national ID, including files tagged with a name starting with dossier. Search subfolders. Return each match with its real path, file type, tags and modified date. Do not open, move or change any file. If there are no matches, return an empty list and say so.
2. `document-agent` -> completed: From this passport, visa, residence permit or national ID file: Personal/Travel/Pasaporte/pasaporte-sofia.pdf, extract one record per document with these fields: document type, issuing country, holder surname, given names, nationality, date of birth, sex, place of birth, document number, date of issue, date of expiry, issuing authority, and for visas the visa type, entries allowed, duration of stay and valid-from date. Also extract the machine readable zone lines exactly as printed, and say for each document whether the name, document number, date of birth, nationality and expiry in the machine readable zone agree with the printed fields. Return a field as empty when it is not visible; never guess. Report each file you could not read.

## References read

- SKILL.md
- workflows/plan.md
- references/workflows/plan.md
- references/countries/es.md
- references/countries/pt.md
- references/countries/gb.md
- references/topics/entry-conditions.md
- references/workflows/benefits.md
- references/benefits/index.md

## Answer

API Error: 400 request (32775 tokens) exceeds the available context size (32768 tokens), try increasing it
