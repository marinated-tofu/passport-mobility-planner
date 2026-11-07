# trip-medium-tr-mexico-panama

**Household:** medium-tr (medium passport)

**Request:** I want to go from Istanbul to Mexico City on 10 February 2027 for ten days, then to Panama City until the 26th, then home. The cheap flights connect in Frankfurt or in Houston. Which should I book, and what do I need? Documents are in Personal/Travel.

## Checks

- FAIL stayed within the model's context window (API Error: 400 request (33188 tokens) exceeds the available context size (32768 tokens), try increasing it)

## Rubric

- FAIL The answer says his valid US B1/B2 visa (to 2029-04-10) lets him enter Mexico without a Mexican visa, with the FMMd form, and that the bundled rule is partial so he should confirm with the consulate.  
  _no answer: context window exceeded_
- FAIL The answer says the same US visa lets him enter Panama without a Panamanian visa, for tourist stays up to 90 days.  
  _no answer: context window exceeded_
- FAIL For the connection, the answer says the Houston connection is covered by his valid US visa, and that Frankfurt transit rules for Turkish citizens are not in the bundled data (or need checking), rather than declaring Frankfurt fine.  
  _no answer: context window exceeded_
- FAIL The answer checks that both the passport (2030) and the US visa (2029) stay valid for the whole trip.  
  _no answer: context window exceeded_
- FAIL The answer includes a dated checklist with the FMMd done by the day of the Mexico flight.  
  _no answer: context window exceeded_

## Delegate calls

1. `file-agent` -> completed: In the folder Personal/Travel, find PDF, JPG, JPEG, PNG and HEIC files whose names, tags or contents suggest a passport, visa, residence permit, residence card or national ID, including files tagged with a name starting with dossier. Search subfolders. Return each match with its real path, file type, tags and modified date. Do not open, move or change any file. If there are no matches, return an empty list and say so.
2. `document-agent` -> completed: From these passport, visa, residence permit or national ID files: Personal/Travel/Pasaport/pasaport-emre.pdf, Personal/Travel/Vize/us-visa-b1b2.pdf, extract one record per document with these fields: document type, issuing country, holder surname, given names, nationality, date of birth, sex, place of birth, document number, date of issue, date of expiry, issuing authority, and for visas the visa type, entries allowed, duration of stay and valid-from date. Also extract the machine readable zone lines exactly as printed, and say for each document whether the name, document number, date of birth, nationality and expiry in the machine readable zone agree with the printed fields. Return a field as empty when it is not visible; never guess. Report each file you could not read.

## References read

- SKILL.md
- SKILL.md
- workflows/plan.md
- references/workflows/plan.md
- references/topics/entry-conditions.md
- references/countries/tr.md
- references/countries/mx.md
- references/countries/pa.md
- references/options/index.md
- references/benefits/index.md

## Answer

API Error: 400 request (33188 tokens) exceeds the available context size (32768 tokens), try increasing it
