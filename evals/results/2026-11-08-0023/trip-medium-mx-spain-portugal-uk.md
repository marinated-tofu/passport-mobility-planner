# trip-medium-mx-spain-portugal-uk

**Household:** medium-mx (medium passport)

**Request:** I fly Mexico City to Madrid on 5 June 2027, Madrid to Lisbon on 10 June, Lisbon to London on 15 June, and London home on 18 June. My documents are in Personal/Travel. Sort it all out for me.

## Checks

- FAIL stayed within the model's context window (API Error: 400 request (33083 tokens) exceeds the available context size (32768 tokens), try increasing it)

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

1. `file-agent` -> completed: In the Personal/Travel folder, find PDF, JPG, JPEG, PNG and HEIC files whose names, tags or contents suggest a passport, visa, residence permit, residence card or national ID, including files tagged with a name starting with dossier. Search subfolders. Return each match with its real path, file type, tags and modified date. Do not open, move or change any file. If there are no matches, return an empty list and say so.
2. `document-agent` -> completed: From the file path Personal/Travel/Pasaporte/pasaporte-sofia.pdf, extract one record per document with these fields: document type, issuing country, holder surname, given names, nationality, date of birth, sex, place of birth, document number, date of issue, date of expiry, issuing authority, and for visas the visa type, entries allowed, duration of stay and valid-from date. Also extract the machine readable zone lines exactly as printed, and say for each document whether the name, document number, date of birth, nationality and expiry in the machine readable zone agree with the printed fields. Return a field as empty when it is not visible; never guess. Report each file you could not read.
3. `file-agent` -> completed: In the Personal/Travel folder, find PDF and image files whose names, tags or contents suggest a birth certificate, marriage certificate, degree certificate, transcript, CV, employment letter, employment contract, payslip, bank statement, tax return, business registration, police clearance, medical certificate, health or travel insurance, tenancy contract, flight booking, accommodation booking or invitation letter. Search subfolders. Return each match with its real path, file type, tags and modified date. Do not open, move or change any file. If there are no matches, return an empty list and say so.
4. `document-agent` -> completed: For the file path Personal/Travel/Vuelos/mex-mad-lis-lhr-2027-06.pdf, return one record per document. Set the document type to one of: birth-certificate, marriage-certificate, degree-certificate, transcript, cv, employment-letter, employment-contract, payslips, bank-statements, tax-return, business-registration, sponsor-letter, invitation-letter, police-clearance, medical-certificate, health-insurance, travel-insurance, flight-booking, accommodation-proof, tenancy-contract, proof-of-income, or other with the title as printed. Always return the holder or person names as printed, the issuing body, the issue date, any expiry or validity dates, and whether an apostille, attestation or certified translation stamp is visible. Also return, when printed: dates and places of birth or marriage and registry numbers for certificates; institution, degree, field and award date for degrees and transcripts; employer, job title, start date, salary and currency for employment documents and payslips; bank, currency, period start and end, opening and closing balance for bank statements; cover period, territory and cover amount for insurance; names, addresses, dates, rent and deposit for tenancy contracts and bookings. For any account, booking or registry number return only its last three characters. Return a field as empty when it is not printed; never guess. Report each file you could not read.
5. `document-agent` -> completed: For the file path Personal/Travel/Banco/estado-cuenta-2026-10.pdf, return one record per document. Set the document type to one of: birth-certificate, marriage-certificate, degree-certificate, transcript, cv, employment-letter, employment-contract, payslips, bank-statements, tax-return, business-registration, sponsor-letter, invitation-letter, police-clearance, medical-certificate, health-insurance, travel-insurance, flight-booking, accommodation-proof, tenancy-contract, proof-of-income, or other with the title as printed. Always return the holder or person names as printed, the issuing body, the issue date, any expiry or validity dates, and whether an apostille, attestation or certified translation stamp is visible. Also return, when printed: dates and places of birth or marriage and registry numbers for certificates; institution, degree, field and award date for degrees and transcripts; employer, job title, start date, salary and currency for employment documents and payslips; bank, currency, period start and end, opening and closing balance for bank statements; cover period, territory and cover amount for insurance; names, addresses, dates, rent and deposit for tenancy contracts and bookings. For any account, booking or registry number return only its last three characters. Return a field as empty when it is not printed; never guess. Report each file you could not read.
6. `file-agent` -> completed: Read the file references/countries/es.md and return its content.
7. `document-agent` -> waiting_user: From the file path references/countries/es.md, extract the content.
8. `file-agent` -> completed: Read the file references/countries/es.md and return its content.
9. `document-agent` -> waiting_user: From the file path references/countries/es.md, extract the content.
10. `document-agent` -> waiting_user: From the file path $EVAL_TMP/eval-trip-medium-mx-spain-portugal-uk-wec6kfm4/skill/references/countries/es.md, extract the content.
11. `file-agent` -> completed: Read the file references/topics/entry-conditions.md and return its content.

## References read

- SKILL.md
- SKILL.md
- SKILL.md
- SKILL.md
- SKILL.md
- SKILL.md
- SKILL.md
- SKILL.md
- SKILL.md
- references/countries/es.md
- references/countries/es.md
- references/countries/pt.md
- references/countries/gb.md
- references/countries/mx.md
- references/countries/schengen.md
- SKILL.md
- references/topics/entry-conditions.md

## Answer

API Error: 400 request (33083 tokens) exceeds the available context size (32768 tokens), try increasing it
