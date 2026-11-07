# trip-weak-in-schengen

**Household:** weak-in (weak passport)

**Request:** I want to go to Portugal and Spain from 8 to 22 May 2027, Lisbon first for eight nights then Madrid. My documents are in Personal/Travel. Sort out everything I need, step by step.

## Checks

- PASS no full document numbers
- PASS only NAS agents as targets
- PASS instructions are one plain line
- PASS no delete, move or send requests
- PASS called file-agent
- PASS called document-agent
- FAIL answer matches /2027-03-19|19 Mar(ch)? 2027/
- PASS answer matches /Portugal|Portuguese/
- PASS answer avoids /(I have|I've) (booked|applied|submitted)/

## Rubric

- PASS The answer flags that the passport expires on 2027-03-19, before the trip, so it must be renewed first, and does not plan the visa on the current passport.  
  _The answer identifies the passport expiry as March 19, 2027, before the trip, and explicitly requires renewal before applying for a visa._
- FAIL The answer says he needs a Schengen short-stay (type C) visa, applied for at the consulate of Portugal (main destination by nights) or its provider, with the bundled fee (EUR 90), processing time (15 calendar days, up to 45) and when he can apply (no earlier than 6 months before travel, or a start-by date that leaves the processing time).  
  _Although it directs the application to Portugal, it uses first destination rather than nights as the justification, omits short-stay type C and the application window, and gives incorrect or imprecise fee and processing figures._
- FAIL The answer checks the visa's documents against the dossier and says travel insurance, accommodation proof and a flight booking are missing, while the bank statements and employment letter are present.  
  _The answer lists generic visa requirements without checking the dossier or identifying missing insurance, accommodation proof and flight booking versus present bank statements and employment letter._
- FAIL The answer compares his funds with the bundled Portugal reference amount (EUR 75 per entry plus EUR 40 per day) and handles INR versus EUR with a break-even exchange rate or a stated rate, without inventing one.  
  _The answer provides neither a comparison of available funds with EUR 75 per entry plus EUR 40 per day nor an INR-to-EUR conversion or break-even rate._
- FAIL The answer orders the steps with dates (passport renewal, then the visa application at least 15 days before 8 May 2027 plus margin) and does not give financial advice.  
  _Although it orders passport renewal before the visa application and gives no financial advice, it provides no dated application deadline at least 15 days before May 8, 2027, with additional margin._

## Delegate calls

1. `file-agent` -> completed: In the folder Personal/Travel, find PDF, JPG, JPEG, PNG and HEIC files whose names, tags or contents suggest a passport, visa, residence permit, residence card or national ID, including files tagged with a name starting with dossier. Search subfolders. Return each match with its real path, file type, tags and modified date. Do not open, move or change any file. If there are no matches, return an empty list and say so.
2. `document-agent` -> completed: From this passport, visa, residence permit or national ID file: Personal/Travel/Passport/passport-arjun.pdf, extract one record with these fields: document type, issuing country, holder surname, given names, nationality, date of birth, sex, place of birth, document number, date of issue, date of expiry, issuing authority, and for visas the visa type, entries allowed, duration of stay and valid-from date. Also extract the machine readable zone lines exactly as printed, and say for each document whether the name, document number, date of birth, nationality and expiry in the machine readable zone agree with the printed fields. Return a field as empty when it is not visible; never guess. Report each file you could not read.

## References read

- SKILL.md
- workflows/plan.md
- references/workflows/plan.md
- references/countries/pt.md
- references/countries/pt.md
- references/countries/es.md
- references/topics/entry-conditions.md
- references/workflows/benefits.md
- references/benefits/index.md

## Answer

Based on my analysis of your documents and the travel rules, I've identified a **critical issue** with your passport and travel plans. Let me summarize:

## Summary of Your Documents

**Passport (Arjun Mehta):**
- Nationality: Indian
- Passport expires: March 19, 2027
- MRZ matches printed fields

## Critical Issue: Passport Expiry

Your passport expires **March 19, 2027**, but your travel dates are **May 8-22, 2027**. This is a major problem:

1. **Schengen Passport Validity Rule**: The Schengen Borders Code requires your passport to be valid **at least 3 months beyond your intended departure date**. Your departure from Schengen (Spain) is May 22, 2027, so you need your passport valid until **August 22, 2027** at minimum.

2. Your passport expires in **March 2027** - **over 2 months before your travel begins**.

3. **Indian passport holders do NOT have visa-free access** to Schengen countries (Portugal and Spain). You would need a Schengen visa, which requires a valid passport.

## What You Need to Do

**Step 1: Passport Renewal (URGENT)**
You must renew your Indian passport before traveling. Indian passport renewal typically takes:
- 1-3 months for standard renewal
- You should apply NOW, not after your passport expires

**Step 2: Schengen Visa Application**
Once you have a valid passport, you'll need to apply for a Schengen visa. Key points:
- Apply at the consulate of your first destination (Portugal)
- Processing time is typically 15-30 days
- Visa fee: approximately €80-110
- You'll need to provide proof of funds, accommodation, return ticket, travel insurance

**Questions for you:**

1. **Have you already renewed your passport, or do you still have the old one expiring March 2027?**
2. **Do you have a Schengen visa already, or will you need to apply?**
3. **What is your budget for visa fees and travel expenses?**
4. **Are you traveling alone, or with family?**

Please answer these questions so I can provide a complete step-by-step plan.
