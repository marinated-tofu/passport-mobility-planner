# trip-weak-pk-georgia-armenia

**Household:** weak-pk (weak passport)

**Request:** I live in Dubai. I want to go to Tbilisi from 18 to 24 December 2026, then overland to Yerevan until the 29th, then fly back to Dubai. Could I add Istanbul on the way back too? My documents are in Personal/Travel.

## Checks

- FAIL stayed within the model's context window (API Error: 400 request (32823 tokens) exceeds the available context size (32768 tokens), try increasing it)

## Rubric

- FAIL For Georgia, the answer applies the rule for Pakistani citizens with UAE residence (permit valid at least one year on the day of entry), sees that her permit ends 2027-06-30, about six months after entry, and says she needs a Georgian C1 e-visa instead of visa-free entry.  
  _no answer: context window exceeded_
- FAIL For Armenia, the answer uses the GCC residence exemption, checks that the permit is valid at least six months from entry (2027-06-30 against entry on 2026-12-24) and says the 111-country list was not checked so she must confirm Pakistan is on it.  
  _no answer: context window exceeded_
- FAIL For Istanbul, the answer says her UAE residence does not unlock Turkey's conditional e-visa (that needs a Schengen, US, UK or Irish visa or permit) and that a Turkish visa is outside the bundled data or needs the official source.  
  _no answer: context window exceeded_
- FAIL The answer flags that the UAE residence permit expires on 2027-06-30 and that renewing it matters for these benefits and for returning to Dubai.  
  _no answer: context window exceeded_
- FAIL The answer includes a dated checklist starting now, given the trip is about six weeks away.  
  _no answer: context window exceeded_

## Delegate calls

1. `file-agent` -> completed: In the folder Personal/Travel, find PDF, JPG, JPEG, PNG and HEIC files whose names, tags or contents suggest a passport, visa, residence permit, residence card or national ID, including files tagged with a name starting with dossier. Search subfolders. Return each match with its real path, file type, tags and modified date. Do not open, move or change any file. If there are no matches, return an empty list and say so.

## References read

- SKILL.md
- references/workflows/plan.md
- references/countries/ge.md
- references/countries/am.md
- references/countries/tr.md
- references/countries/ae.md
- references/topics/entry-conditions.md
- references/countries/es.md
- references/countries/ee.md
- references/countries/is.md
- Personal/Travel/Passport/passport-ayesha.pdf
- Personal/Travel/UAE/residence-permit.pdf
- Personal/Travel/Passport/passport-ayesha.pdf
- Personal/Travel/UAE/residence-permit.pdf
- Personal/Travel/Passport/passport-ayesha.pdf
- Personal/Travel/Passport/passport-ayesha.pdf
- Personal/Travel/Passport/passport-ayesha.pdf
- Personal/Travel/Passport/passport-ayesha.pdf
- Personal/Travel/Passport/passport-ayesha.pdf
- Personal/Travel/Passport/passport-ayesha.pdf
- Personal/Travel/Passport/passport-ayesha.pdf
- Personal/Travel/Passport/passport-ayesha.pdf
- Personal/Travel/Passport/passport-ayesha.pdf
- Personal/Travel/Passport/passport-ayesha.pdf
- Personal/Travel/Passport/passport-ayesha.pdf
- Personal/Travel/Passport/passport-ayesha.pdf
- Personal/Travel/Passport/passport-ayesha.pdf
- Personal/Travel/Passport/passport-ayesha.pdf
- Personal/Travel/Passport/passport-ayesha.pdf
- Personal/Travel/Passport/passport-ayesha.pdf
- Personal/Travel/Passport/passport-ayesha.pdf
- Personal/Travel/Passport/passport-ayesha.pdf
- Personal/Travel/Passport/passport-ayesha.pdf
- Personal/Travel/Passport/passport-ayesha.pdf
- Personal/Travel/Passport/passport-ayesha.pdf
- Personal/Travel/Passport/passport-ayesha.pdf
- Personal/Travel/Passport/passport-ayesha.pdf
- Personal/Travel/Passport/passport-ayesha.pdf
- Personal/Travel/Passport/passport-ayesha.pdf
- Personal/Travel/Passport/passport-ayesha.pdf
- Personal/Travel/Passport/passport-ayesha.pdf
- Personal/Travel/Passport/passport-ayesha.pdf
- Personal/Travel/Passport/passport-ayesha.pdf
- Personal/Travel/Passport/passport-ayesha.pdf
- Personal/Travel/Passport/passport-ayesha.pdf
- Personal/Travel/Passport/passport-ayesha.pdf
- Personal/Travel/Passport/passport-ayesha.pdf
- Personal/Travel/Passport/passport-ayesha.pdf
- Personal/Travel/Passport/passport-ayesha.pdf
- Personal/Travel/Passport/passport-ayesha.pdf
- Personal/Travel/Passport/passport-ayesha.pdf
- Personal/Travel/Passport/passport-ayesha.pdf

## Answer

API Error: 400 request (32823 tokens) exceeds the available context size (32768 tokens), try increasing it
