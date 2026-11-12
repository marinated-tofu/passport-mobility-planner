# Proof of funds route

Checks the bank statements stored on the NAS against a visa or residence route's published proof-of-funds rule, and shows which fees fit. Everything is read locally; no bank connection is used.

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

## Bank statements

Replace every slot in square brackets and capitals with the real folder or the real file paths returned earlier, comma-separated, before running a command; never send one with a slot left in. Keep each instruction on one line.

Read the bank statements in detail:

```text
delegate --target document-agent --instruction 'For each of these bank statement files: [BANK STATEMENT PATHS FROM STEP 4], return the account holder name, bank name, last three characters of the account number, currency, statement period start and end dates, statement issue date, opening balance, closing balance, the lowest balance shown in the period, total credits and total debits. Also list every credit at or above the threshold amount given, with its date, amount and description, and every credit that repeats each month from the same payer. Return empty for any field not printed. Never return full account numbers.'
```

## Pick the rule

The user names a visa or route, or one comes from the plan or next document route. When that route already researched it, use its answer; otherwise follow research.md with topic funds, the issuing country, and the question "proof of funds or minimum income for this visa: amount, currency, per day or month or in total, which statements and how many months". If the pages state no rule, say so and show the statement summary only.

Before the detailed read, set the threshold for large credits: half of the average monthly closing balance, or the amount the user gives.

## Summarise each account

From the detailed read, per account: bank, last three characters, currency, period covered, closing balance, lowest balance, average monthly credits, repeating monthly credits (likely salary or income) and large one-off credits.

Flag:

- a holder name that differs from the passport;
- statements older than the limit in the dossier items reference, or a period shorter than the rule asks for;
- gaps between statement periods;
- a large credit in the last 30 days of the period, which officers often question; suggest keeping proof of where it came from;
- a balance that falls below the required amount at any point when the rule asks for a sustained balance.

## Compare

- Funds shown: the latest closing balance per currency. Do not add different currencies together. When the rule is in another currency, give the break-even exchange rate (the rate at which the funds exactly meet the rule, for example meets it while 1 EUR costs less than 5.03 AED) so the user can compare it with the rate on the day. Use an exchange rate only when the user gives one, and never invent one.
- For a daily amount: daily amount times the days of the stay.
- For a monthly income rule (common for remote work visas): compare the average of the repeating monthly credits.
- For a one-off minimum: compare the latest closing balance and the lowest balance.

Result per rule: Meets, Does not meet (with the shortfall), or Needs checking (with what is missing).

## Affordability

Fees to pay come from the options chosen. Money left after fees is the closing balance minus fees; when the proof-of-funds rule must still be met after paying fees, say whether it is. This is a comparison with a published rule, not advice. Say in the answer that the consulate or authority makes the decision and may ask for more.
