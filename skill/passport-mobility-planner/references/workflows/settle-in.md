# Settle-in route

Gives a person moving to a country the steps to settle in, in order, with each step's documents checked against their dossier, plus housing rules and local customs.

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

## Inputs

Goal country and purpose (work, remote work, study, family, business), the arrival date if known, and the dossier from steps 1 to 5.

## Steps

1. Read the living file for the country (settle/ followed by the country code). If it has no settle-in steps or none exists, say the bundled data does not cover that country, list its official sources, and offer the library search when the user has the optional library on the NAS.
2. Keep the steps that fit the purpose: drop business registration unless the purpose is business or the user asks; keep housing, residence, address, tax number, health insurance and bank account for everyone staying long term.
3. For each step in order: deadline (count it from the arrival date when given), fee, the documents it needs marked have, missing, too old or needs attestation, and how to do it. Give every step its own documents line, with each listed document marked against the dossier, for example: Documents: passport (have), residence permit (missing until the residence step). When the country file lists no documents for a step, write Documents: not listed in the bundled data, and give its source to check.
4. Before departure: list every document the steps need that must be attested, apostilled or translated in the home country, since this is often impossible after arrival. Put these first.

## Housing

From the housing steps: tenancy registration, deposit rules, official rent index or calculator, and official scam warnings. When the user has saved rental listings on the NAS (PDFs or screenshots), read them with step 5 and check each against the budget, the official rent index link, deposit rules and the scam warnings. The Skill cannot search live listings; say so in the answer whenever housing comes up.

## Customs

Show the customs entries for the country by topic, in the words of the file, with their sources. Lead with the ones that carry legal penalties: medicines, alcohol, drugs, photography, dress and public behaviour.

## Output

A dated checklist per person with the Settle-in layout. Offer to save it; save only after a yes.
