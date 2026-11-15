# Dossier route

Turns the documents found in steps 1 to 5 into one dossier per person: the travel documents in full, and the supporting documents that visa, residence and settle-in applications ask for.

## Supporting documents (steps 4 and 5)

After SKILL.md steps 1 to 3. Replace every slot in square brackets and capitals with the real folder or the real file paths returned earlier, comma-separated, before running a command; never send one with a slot left in. Keep each instruction on one line.

Step 4. Find supporting documents.

```text
delegate --target file-agent --instruction 'In the folder [DOCUMENTS FOLDER], find PDF and image files whose names, tags or contents suggest a birth certificate, marriage certificate, degree certificate, transcript, CV, employment letter, employment contract, payslip, bank statement, tax return, business registration, police clearance, medical certificate, health or travel insurance, tenancy contract, flight booking, accommodation booking or invitation letter. Search subfolders. Return each match with its real path, file type, tags and modified date. Do not open, move or change any file. If there are no matches, return an empty list and say so.'
```

Step 5. Read the supporting documents found.

```text
delegate --target document-agent --instruction 'For each of these files: [PATHS FROM STEP 4 EXCEPT BANK STATEMENTS], return one record per document. Set the document type to one of: birth-certificate, marriage-certificate, degree-certificate, transcript, cv, employment-letter, employment-contract, payslips, bank-statements, tax-return, business-registration, sponsor-letter, invitation-letter, police-clearance, medical-certificate, health-insurance, travel-insurance, flight-booking, accommodation-proof, tenancy-contract, proof-of-income, or other with the title as printed. Always return the holder or person names as printed, the issuing body, the issue date, any expiry or validity dates, and whether an apostille, attestation or certified translation stamp is visible. Also return, when printed: dates and places of birth or marriage and registry numbers for certificates; institution, degree, field and award date for degrees and transcripts; employer, job title, start date, salary and currency for employment documents and payslips; bank, currency, period start and end, opening and closing balance for bank statements; cover period, territory and cover amount for insurance; names, addresses, dates, rent and deposit for tenancy contracts and bookings. For any account, booking or registry number return only its last three characters. Return a field as empty when it is not printed; never guess. Report each file you could not read.'
```

## Group by person

Group the extracted records by holder: same date of birth and a matching name after allowing for transliteration. Supporting documents rarely show a date of birth; attach them by name, and when a name matches two people or none, list the document under Unassigned and ask.

## Travel documents

For each person, list every passport, visa and residence permit with all fields from the document fields reference, and compute:

- days until expiry from today;
- for passports, the six-month date (expiry minus six months) and the three-month date (expiry minus three months);
- for visas, whether it is valid today and how many entries it allows.

Add the consistency results from the comparison at the end of step 3: name, date of birth and nationality differences between documents, and machine readable zone disagreements.

## Supporting documents

For each person, fill one line per item type in the dossier items reference: the newest document of that type, its issue date and age in days, any expiry, and whether an apostille, attestation or certified translation is visible. Then flag:

- name differences from the passport, including missing middle names and different spellings;
- age: police clearances, medical certificates and bank statements older than the limit in the dossier items reference;
- bank statements that do not cover a full recent period without gaps;
- insurance that has expired or ends before a planned trip.

## Gaps

List the item types the person has no document for. When the user named a visa, a destination or a move, get its document list live: one research request (research.md) with topic visas, the country, the purpose and the question "documents required for this visa or permit, how recent each must be, police certificates from which countries, insurance cover, translation and apostille rules, proof of income or funds". Then list only the gaps that matter for it, and run the checks for long-stay applications in the dossier items reference against the excerpts. Without an answer, list every gap and say the document list was not found.

Present it with the Dossier layout in the report format reference. Offer to save the dossier and to tag each file with its item type and holder; do either only after a yes.
