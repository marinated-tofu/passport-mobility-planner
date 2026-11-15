# Apply route: work, study, family, residence and other long-stay applications

For every application that is not a short visit: a work, study, family, spouse, remote work, retirement or investment visa; a residence permit, its renewal or a change of status; a re-entry permit; permanent residence or citizenship. Visits and transit go to the plan route. This route checks eligibility and every document against today's official page, works the timeline back from the start date, and prepares the application on the NAS. It never applies, pays, books or sends by itself.

Comparing dates: write both as YYYY-MM-DD and compare the year, then the month, then the day.

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

## A1. What is applied for

From the request: the country, the visa or permit as the person names it ("work visa", "spouse visa", "renew my residence permit"), the purpose, the start date (job or course start, move date) or, for a renewal, the expiry of the permit held, the applicant, and the family members joining. Ask only for a missing country or purpose (waiting_user).

## A2. Research

One request (research.md) with topic visas (topic settle for permanent residence or citizenship), the country, the nationality, residence and visas held, the start date and the purpose, and the question "eligibility, documents required and how recent each must be, police certificates from which countries, medical exam, translation and apostille or legalisation, proof of funds or income and how it is worked out for this household, insurance, where and when to apply (earliest and latest dates, from inside or outside the country), fee, processing time, biometrics or interview, what to do after arrival and by when, absence limits and renewal, what the form asks (work, travel and family history), invitation or sponsor letter fields, photo and fingerprints, registration after arrival". Wait for the answer as research.md says.

## A3. Eligibility

Each condition in the excerpts becomes a numbered check: yes, no or needs checking, with the fact from the documents and both dates compared. Facts the NAS cannot show (a job offer, an admission, the sponsor's status, a language test score, years worked, days spent abroad) are asked once, all together, or listed as "you confirm". Watch for:

- age on the date the excerpt names (application or decision date);
- a sponsor or partner: their status, the date it started, and the marriage or birth date compared with any date the rule names;
- a job offer or admission from an approved employer or school, and a degree that must be recognised or verified first;
- an income or funds amount worked out for this household with the Compare rules in workflows/funds.md;
- days outside the country within a rolling period, counted only from dates the person gives;
- a passport valid long enough: a permit often ends with the passport, so a passport expiring within the permit's term may need renewing first (topics/special-cases.md, The passport needs renewing).

## A4. Documents

One line per item in the excerpts, for the applicant and for each family member: have (file, issue date, age in days) / missing / too old / not usable and why. Run the checks for long-stay applications in topics/dossier-items.md (police certificates per country lived in, medical certificate, apostille or legalisation, translation, insurance, family dates) and the checks in topics/application-forms.md that the excerpt names and compare every name with the passport. Bank statements: the Flag and Compare rules in workflows/funds.md. Family members need their own passport and the certificate that links them to the applicant.

## A5. Timeline

Work back from the start date, or for a renewal from the window the excerpt gives before the permit expires:

- apply by: start date minus the processing time minus 14 days, never earlier than the earliest date the excerpt allows; check it by counting back. When no excerpt gives a processing time, write "apply by: processing time not stated, apply as soon as the documents are ready" and still date the documents below;
- documents that take time come first, in order: get it, then apostille or legalise it, then translate it. Use waiting times only from excerpts, else "time not stated";
- a document with a maximum age must be issued between (apply by minus its maximum age) and the apply by date: give both dates, so it is not ordered too early;
- after arrival: each registration or residence permit deadline from the excerpt, counted from the arrival date.

## A6. Prepare on the NAS

Follow prepare.md, with these changes. TRIP FOLDER is [DOCUMENTS FOLDER]/Trips/ followed by the country, the visa or permit and the start year and month, lowercase with hyphens, for example Personal/Travel/Trips/portugal-remote-work-2027-03; the companion and the choose route read queues only under Trips. P2 form answers are for this application. P3 drafts: a cover letter (purpose, plans, ties, who pays), a request to the employer or school for the letter the excerpt asks for, a sponsor or invitation letter when there is a sponsor, and a day-by-day itinerary only when the form asks for one. P4 calendar: every A5 date. Report each save as saved or waiting for your approval in the NAS app; for one that waits, never write "I drafted" or "I created", write "drafted, waiting for your approval". P6 queue: an apply item for the application page, a book item for an appointment or biometrics, contact items for each letter request, and compare items only for insurance when the rule asks for a policy.

## Reply

Fill in every line, in plain language. Mask document numbers to the last three characters, write dates as 14 Mar 2027, money with its currency, and end each rule, fee and amount line with its page address and fetched date.

```text
Application: country, visa or permit, start date, applicant and family members
Person: name - Ready / Needs action / Not eligible on these facts

Eligibility
  1. condition from the excerpt: yes / no / needs checking - the fact and dates compared
  You confirm: facts the NAS cannot show

Documents (applicant, then each family member)
  - item: have (file, issued date) / missing / too old (issued date, limit) / not usable (why)
  Police certificates: each country and why it is needed, have / missing / too old
  Apostille, legalisation and translation: per document, as the excerpt asks, or "not stated"

Money: the amount for this household with the page's formula, against the statements (workflows/funds.md), or "not checked" and why

Timeline, starting today (date)
  - date: get, apostille or translate a document / apply by / appointment / arrival / register by

Done on the NAS (prepare.md)
  - Application folder / form answers / drafts / calendar / queue: saved, waiting for approval, failed, or not prepared and why

Left for you
  - dated actions only the person or an office can do: appointments, fingerprints, signing, documents an office or bank issues, paying and submitting

Source: each page address (fetched date). The authority decides; this is a check against the published rule, not legal advice.
```
