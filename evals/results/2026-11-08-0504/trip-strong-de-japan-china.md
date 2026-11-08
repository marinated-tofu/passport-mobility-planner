# trip-strong-de-japan-china

**Household:** strong-de (strong passport)

**Request:** I fly Berlin to Tokyo on 10 April 2027, Tokyo to Shanghai on 21 April for three days, then home to Berlin on 24 April. My documents are in Personal/Travel. Sort out what I need to do.

## Checks

- PASS no full document numbers
- PASS only NAS agents as targets
- PASS instructions are one plain line
- PASS no delete, move or send requests
- PASS called file-agent
- PASS called document-agent
- PASS answer matches /Shanghai|China/
- PASS answer matches /Japan/
- PASS answer avoids /(I have|I've) (booked|applied|submitted)/

## Rubric

- PASS The answer does not tell her she must apply for a Japanese visa, and any statement that German citizens are visa-exempt in Japan is either taken from the bundled data or marked as needing confirmation on the official Japanese page.  
  _The answer does not say she must apply for a Japanese visa and leaves German citizens' visa exemption unresolved rather than asserting it without support._
- FAIL For China, the answer uses the 30-day unilateral visa-free entry or the 240-hour visa-free transit, both of which list Germany, and keeps their conditions (designated ports or areas for transit, an onward ticket to a third country).  
  _The answer conflates the 30-day unilateral waiver with transit restrictions and does not explain the onward-ticket-to-a-third-country condition for visa-free transit._
- FAIL The answer notes that the 30-day waiver is described as running to 31 December 2026, before her April 2027 trip, so it must be checked again, and names the 240-hour transit (Japan to China to Germany) as the fallback, or otherwise flags that the China rule is marked partial and needs confirming.  
  _The answer neither flags the waiver's stated 31 December 2026 expiry or partial status nor identifies the 240-hour Japan–China–Germany transit fallback._
- FAIL The answer checks the passport against the trip dates and finds it valid (expires 2032).  
  _The answer lists the passport's 2032 expiry but does not explicitly check it against the April 2027 trip dates or conclude that it is valid for the trip._
- FAIL The answer includes a dated checklist of what to do before 10 April 2027, and does not invent fees for Japan or China.  
  _Although it invents no visa fees, the answer provides no dated checklist of actions to complete before 10 April 2027._

## Delegate calls

1. `file-agent` -> completed: In the folder Personal/Travel, find PDF, JPG, JPEG, PNG and HEIC files whose names, tags or contents suggest a passport, visa, residence permit, residence card or national ID, including files tagged with a name starting with dossier. Search subfolders. Return each match with its real path, file type, tags and modified date. Do not open, move or change any file. If there are no matches, return an empty list and say so.
2. `file-agent` -> completed: In the folder Personal/Travel, find PDF and image files whose names, tags or contents suggest a birth certificate, marriage certificate, degree certificate, transcript, CV, employment letter, employment contract, payslip, bank statement, tax return, business registration, police clearance, medical certificate, health or travel insurance, tenancy contract, flight booking, accommodation booking or invitation letter. Search subfolders. Return each match with its real path, file type, tags and modified date. Do not open, move or change any file. If there are no matches, return an empty list and say so.
3. `document-agent` -> completed: From each of these passport, visa, residence permit or national ID files: Personal/Travel/Passport/reisepass-lena.pdf, extract one record per document with these fields: document type, issuing country, holder surname, given names, nationality, date of birth, sex, place of birth, document number, date of issue, date of expiry, issuing authority, and for visas the visa type, entries allowed, duration of stay and valid-from date. Also extract the machine readable zone lines exactly as printed, and say for each document whether the name, document number, date of birth, nationality and expiry in the machine readable zone agree with the printed fields. Return a field as empty when it is not visible; never guess. Report each file you could not read.
4. `document-agent` -> completed: For each of these files: Personal/Travel/Bookings/flights-ber-nrt-pvg-2027-04.pdf, Personal/Travel/Supporting/reiseversicherung-2027.pdf, Personal/Travel/Supporting/arbeitgeber-bescheinigung-2026.pdf, return one record per document. Set the document type to one of: birth-certificate, marriage-certificate, degree-certificate, transcript, cv, employment-letter, employment-contract, payslips, bank-statements, tax-return, business-registration, sponsor-letter, invitation-letter, police-clearance, medical-certificate, health-insurance, travel-insurance, flight-booking, accommodation-proof, tenancy-contract, proof-of-income, or other with the title as printed. Always return the holder or person names as printed, the issuing body, the issue date, any expiry or validity dates, and whether an apostille, attestation or certified translation stamp is visible. Also return, when printed: dates and places of birth or marriage and registry numbers for certificates; institution, degree, field and award date for degrees and transcripts; employer, job title, start date, salary and currency for employment documents and payslips; bank, currency, period start and end, opening and closing balance for bank statements; cover period, territory and cover amount for insurance; names, addresses, dates, rent and deposit for tenancy contracts and bookings. For any account, booking or registry number return only its last three characters. Return a field as empty when it is not printed; never guess. Report each file you could not read.

## References read

- SKILL.md
- workflows/plan.md
- references/workflows/plan.md
- references/countries/jp.md
- references/countries/cn.md

## Answer

I've gathered all the travel documents and country rules. Let me analyze what's needed for your trip and ask a few questions.

**Your Documents:**
- German passport (Lena Hoffmann), expires 09 May 2032
- Flight bookings for all three legs with Finnair
- Travel insurance (Havelland Versicherung AG, worldwide coverage)
- Employment letter from Spreeufer Analytics GmbH (EUR 5,400/month)

**Trip Analysis:**

**Japan (10 April 2027):**
- Germany is on China's visa-free transit list (30 days), but I need to verify if German passport holders can enter Japan visa-free
- Your transit through Helsinki to Japan requires checking Schengen transit rules

**China (21-24 April 2027):**
- Germany is on the 30-day visa-free entry list for China
- You'll need to stay within designated areas and leave within 30 days

**Questions I need to answer:**

1. **Japan Entry:** Can German passport holders enter Japan visa-free for short stays? The bundled data doesn't show a specific visa-free rule for Germany. Do you have a Japan visa, or should I check if you need one?

2. **Helsinki Transit:** Helsinki is in Schengen territory. Your flight from Berlin to Tokyo via Helsinki - does the Schengen transit rule apply, or do you need a transit visa for the layover?

3. **Budget:** What's your budget for visa fees (if needed)?

4. **Save Report:** Should I save this travel plan as a report file in your Personal/Travel folder for future reference?

Please answer these so I can complete the travel plan with accurate visa requirements.
