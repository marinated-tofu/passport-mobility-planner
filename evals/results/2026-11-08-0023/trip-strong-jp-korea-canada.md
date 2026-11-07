# trip-strong-jp-korea-canada

**Household:** strong-jp (strong passport)

**Request:** I'm going from Osaka to Seoul on 2 May 2027 for three days, then Seoul to Vancouver on 5 May until the 19th. My documents are in Personal/Travel. What paperwork do I need?

## Checks

- FAIL stayed within the model's context window (API Error: 400 request (33971 tokens) exceeds the available context size (32768 tokens), try increasing it)

## Rubric

- FAIL The passport is read from the photo by text recognition, and the answer confirms the machine readable zone agrees with the printed page or reports that it checked it.  
  _no answer: context window exceeded_
- FAIL For Canada, the answer names the eTA for arrival by air with its bundled fee (CAD 7) and timing (most approved within minutes), and says to get it before booking or before flying; any claim that Japanese citizens are visa-exempt is sourced or marked to confirm.  
  _no answer: context window exceeded_
- FAIL For Korea, the answer names the K-ETA (KRW 10,000 plus a payment charge) and passes on the bundled caveat that Korea has waived it for some nationalities and the current exemption list was not checked, so he should confirm.  
  _no answer: context window exceeded_
- FAIL Neither country is turned into a visa application.  
  _no answer: context window exceeded_
- FAIL The answer includes a dated checklist, with the K-ETA done before the 2 May flight and the eTA before the 5 May flight.  
  _no answer: context window exceeded_

## Delegate calls

1. `file-agent` -> completed: In the Personal/Travel folder, find PDF, JPG, JPEG, PNG and HEIC files whose names, tags or contents suggest a passport, visa, residence permit, residence card or national ID, including files tagged with a name starting with dossier. Search subfolders. Return each match with its real path, file type, tags and modified date. Do not open, move or change any file. If there are no matches, return an empty list and say so.
2. `file-agent` -> completed: In the Personal/Travel folder, find PDF and image files whose names, tags or contents suggest a birth certificate, marriage certificate, degree certificate, transcript, CV, employment letter, employment contract, payslip, bank statement, tax return, business registration, police clearance, medical certificate, health or travel insurance, tenancy contract, flight booking, accommodation booking or invitation letter. Search subfolders. Return each match with its real path, file type, tags and modified date. Do not open, move or change any file. If there are no matches, return an empty list and say so.
3. `photo-agent` -> waiting_user: Run text recognition on the file path given and return the full recognised text for the image, keeping the two or three machine readable zone lines at the bottom intact and in order. Report each image where no text was recognised.
4. `photo-agent` -> completed: Run text recognition on the file path Personal/Travel/Passport/passport-photo-page.jpg and return the full recognised text for the image, keeping the two or three machine readable zone lines at the bottom intact and in order. Report each image where no text was recognised.

## References read

- SKILL.md
- references/countries/jp.md
- references/countries/kr.md
- references/countries/ca.md
- references/benefits/index.md
- references/options/index.md

## Answer

API Error: 400 request (33971 tokens) exceeds the available context size (32768 tokens), try increasing it
