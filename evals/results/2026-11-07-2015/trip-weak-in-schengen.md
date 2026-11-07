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
- PASS answer matches /2027-03-19|19 Mar(ch)? 2027/
- PASS answer matches /Portugal|Portuguese/
- PASS answer avoids /(I have|I've) (booked|applied|submitted)/

## Rubric

- PASS The answer flags that the passport expires on 2027-03-19, before the trip, so it must be renewed first, and does not plan the visa on the current passport.  
  _The answer identifies the passport expiry as 19 March 2027, requires renewal before the trip, and directs use of the replacement passport for the visa application._
- FAIL The answer says he needs a Schengen short-stay (type C) visa, applied for at the consulate of Portugal (main destination by nights) or its provider, with the bundled fee (EUR 90), processing (15 calendar days, up to 45) and window (no earlier than 6 months and at least 15 days before travel).  
  _Although it specifies a Schengen short-stay visa through Portugal, EUR 90, processing of 15 calendar days up to 45, and the six-month window, it omits the requirement to apply at least 15 days before travel._
- PASS The answer checks the visa's documents against the dossier and says travel insurance, accommodation proof and a flight booking are missing, while the bank statements and employment letter are present.  
  _The dossier checklist identifies travel insurance, accommodation proof and transport booking evidence as missing, while confirming that bank statements and an employment letter are present._
- FAIL The answer compares his funds with the bundled Portugal reference amount (EUR 75 per entry plus EUR 40 per day) and handles INR versus EUR with a break-even exchange rate or a stated rate, without inventing one.  
  _The answer states the INR balance and Portugal's EUR reference amounts but does not compare them using a stated exchange rate or calculate a break-even exchange rate._
- PASS The answer orders the steps with dates (passport renewal, then the visa application at least 15 days before 8 May 2027 plus margin) and does not give financial advice.  
  _The dated checklist places passport renewal before the visa application and provides submission targets more than 15 days before departure with additional margin, without offering financial advice._

## Delegate calls

1. `file-agent` -> completed: In Personal/Travel, find PDF, JPG, JPEG, PNG and HEIC files whose names, tags or contents suggest a passport, visa, residence permit, residence card or national ID, including files tagged with a name starting with dossier. Search subfolders. Return each match with its real path, file type, tags and modified date. Do not open, move or change any file. If there are no matches, return an empty list and say so.
2. `document-agent` -> completed: From Personal/Travel/Passport/passport-arjun.pdf, extract one record per passport, visa, residence permit or national ID with these fields: document type, issuing country, holder surname, given names, nationality, date of birth, sex, place of birth, document number, date of issue, date of expiry, issuing authority, and for visas the visa type, entries allowed, duration of stay and valid-from date. Also extract the machine readable zone lines exactly as printed, and say for each document whether the name, document number, date of birth, nationality and expiry in the machine readable zone agree with the printed fields. Return a field as empty when it is not visible; never guess. Report each file you could not read.
3. `file-agent` -> completed: In Personal/Travel, find PDF and image files whose names, tags or contents suggest a birth certificate, marriage certificate, degree certificate, transcript, CV, employment letter, employment contract, payslip, bank statement, tax return, business registration, police clearance, medical certificate, health or travel insurance, tenancy contract, flight booking, accommodation booking or invitation letter. Search subfolders. Return each match with its real path, file type, tags and modified date. Do not open, move or change any file. If there are no matches, return an empty list and say so.
4. `document-agent` -> completed: Read Personal/Travel/Bank/kaveri-bank-2026-08-to-10.pdf, Personal/Travel/Supporting/salary-slips-2026-08-to-10.pdf, Personal/Travel/Supporting/employment-letter-2026-10.pdf and Personal/Travel/Supporting/itr-ay-2026-27.pdf. Return one record per document with document type, holder names as printed, issuing body, issue date, expiry or validity dates, and whether apostille, attestation or certified translation stamps are visible. For employment documents return employer, job title, start date, salary and currency; for bank statements return bank, currency, period start and end, opening and closing balance; for tax returns return title and assessment period as printed. Return account or registry numbers only as their last three characters, and no individual bank transactions. Leave unprinted fields empty; never guess. Report every unreadable file. Also for Personal/Travel/Passport/passport-arjun.pdf explicitly compare printed name, document number, birth date, nationality and expiry against the machine readable zone and return agreement or each disagreement without repeating document numbers or machine readable zone lines.

## References read

- SKILL.md
- references/workflows/plan.md
- references/topics/entry-conditions.md
- references/report-format.md
- references/options/visitor-and-nomad.md
- references/official-sources.md
- references/workflows/library.md

## Answer

**Arjun, the trip needs action: renew your passport first, then apply for a Schengen tourist visa through Portugal.** The passport in your folder expires on **19 Mar 2027**, before your departure.

I checked the documents in `Personal/Travel`. This plan assumes you are travelling alone for tourism, arriving in Lisbon on 8 May and leaving Madrid on 22 May 2027. I can prepare the document and application plan, but cannot book travel, submit applications or retrieve live prices.

Your itinerary works out as follows:

| Dates | Stay | Nights |
|---|---|---:|
| 8–16 May 2027 | Lisbon; check out and travel to Madrid on 16 May | 8 |
| 16–22 May 2027 | Madrid; depart on 22 May | 6 |
| **Total** | **15 calendar days in Schengen, including arrival and departure** | **14** |

**1. Start passport renewal now — 7 Nov 2026.**

Your Indian passport, ending **274**, was issued on 20 Mar 2017 and expires on 19 Mar 2027. It fails both the expiry requirement and, by your arrival date, the requirement to have been issued within the previous ten years. For departure from Schengen on 22 May 2027, the replacement must be valid until at least **22 Aug 2027**. The separate arrival-plus-six-month benchmark is **8 Nov 2027**; your current passport fails that too, although Schengen’s documented rule is departure plus three months. Renewal fees and processing times are not covered by the bundled rules and depend on where you apply. — [Schengen Borders Code, Article 6](https://eur-lex.europa.eu/eli/reg/2016/399/oj), bundled reference reviewed 7 Nov 2026.

Use the replacement passport details consistently on your visa application, insurance and reservations. The printed identity fields and machine-readable fields on the current scan agree on name, nationality, birth date and expiry. The supporting documents use the same name, with capitalization differences only.

**2. Apply through Portugal for one Schengen short-stay visa covering both countries.**

Portugal is your main destination because you will spend eight nights there and six in Spain. Your first arrival is also in Portugal. Apply to the Portuguese consulate or its appointed provider responsible for your place of legal residence. No existing visa or residence permit was found in your folder. — [European Commission: applying for a Schengen visa](https://home-affairs.ec.europa.eu/policies/schengen/visa-policy/applying-schengen-visa_en), checked 7 Nov 2026.

A uniform Schengen visa can cover Portugal and Spain. Travelling directly from Lisbon to Madrid stays within Schengen; any route that leaves the area needs a fresh entry/transit check. Once issued, check its territorial validity, dates, permitted stay and entries against the entire itinerary. — [European Commission: Schengen area](https://home-affairs.ec.europa.eu/policies/schengen/schengen-area_en), checked 7 Nov 2026.

**3. Build the application pack after renewal.**

| Evidence | What I found | What you need to do |
|---|---|---|
| Passport | Current scan, expiring before travel | Obtain replacement; check blank pages and condition |
| Bank statements | Kaveri Bank, Aug–Oct 2026; closing balance **INR 526,800** | Obtain recent statements for the period required at your appointment |
| Payslips | Aug–Oct 2026 | Refresh for the application date |
| Employment evidence | Letter dated 21 Oct 2026 | Obtain an updated letter and evidence of approved leave/return to work if required locally |
| Tax evidence | Assessment year 2026–27 return | Retain; check the local checklist for required tax years |
| Application form and photo | Not found | Complete the form and obtain a compliant photo |
| Travel medical insurance | Not found | Obtain cover for the whole itinerary; verify minimum cover and policy wording |
| Accommodation | Not found | Provide Lisbon 8–16 May and Madrid 16–22 May evidence |
| Transport | Not found | Provide arrival, Lisbon–Madrid and departure itinerary evidence |

The bundled Schengen checklist requires the form, passport, photo, insurance, bank statements, accommodation and flight evidence. Insurance must cover medical emergencies, hospital care and repatriation. **The exact local checklist, statement freshness rules and insurance cover minimum still need checking** with the Portuguese application office. Your existing financial and employment documents will be several months old by a spring appointment. — [European Commission: application requirements](https://home-affairs.ec.europa.eu/policies/schengen/visa-policy/applying-schengen-visa_en) and [Portugal’s official visa portal](https://vistos.mne.gov.pt/en/), checked 7 Nov 2026.

**4. Set the money aside, but do not treat the bank balance as an approval result.**

The published adult visa fee is **EUR 90**, with normal processing of **15 calendar days**, extendable to **45 days**. Provider charges, passport renewal, insurance and travel costs are additional and have not been priced. For the one traveller identified, the known visa-fee subtotal is **EUR 90**. — [European Commission: fees and processing](https://home-affairs.ec.europa.eu/policies/schengen/visa-policy/applying-schengen-visa_en), checked 7 Nov 2026.

The bundled funds references are:

- **Portugal:** EUR 75 per entry plus EUR 40 per day. Counting 8–16 May inclusively gives an illustrative **EUR 435**.
- **Spain:** EUR 122.10 per day, subject to a minimum of **EUR 1,098.90**; that minimum exceeds seven days at the daily rate.

These are dated reference amounts, **not a complete trip budget or a confirmed combined application threshold**. Spain’s wage-linked amounts may change for 2027. Your available funds and affordability remain **Needs checking** because current balances, applicable exchange rates, travel costs and the consulate’s assessment are unknown. — [European Commission: national reference amounts](https://home-affairs.ec.europa.eu/document/download/9bf9a98f-3bd1-4e14-9b39-c9087a08a32f_en?filename=Reference_amounts_table.pdf), checked 7 Nov 2026.

**5. Follow this dated checklist.**

| Date | Action |
|---|---|
| **7 Nov 2026 onward** | Begin passport renewal and identify the Portuguese application office for your legal residence. |
| **8 Nov 2026** | The six-month application window opens for travel on 8 May 2027; apply once the replacement passport and evidence are ready. |
| **Jan–Feb 2027 — planning target** | Assemble recent financial/employment evidence, accommodation and transport reservations, insurance, form and photo; aim for an early appointment. |
| **17 Mar 2027 — conservative submission target** | Submit a complete application by this date to allow 45 days of processing plus one week before departure. Appointment availability and passport return can require more time. |
| **16 Apr 2027 — normal-processing fallback** | This allows 15 days plus one week, but leaves little room for extended processing. |
| **1 May 2027 — suggested final review** | Check the issued visa, passport, names, reservations, insurance, available funds and any transit requirements. Carry accessible copies alongside originals. |
| **8 / 16 / 22 May 2027** | Arrive in Lisbon / transfer to Madrid / leave Schengen. |

The application window and processing periods come from the official rule; the earlier targets and final-review date are my planning recommendations. — [European Commission: application timing](https://home-affairs.ec.europa.eu/policies/schengen/visa-policy/applying-schengen-visa_en), checked 7 Nov 2026.

**What remains unresolved:** your departure city, country/city of legal residence, flight connections, previous Schengen stays relevant to the 90-in-180-day limit, and the local application checklist. I found no unreadable files. I searched the named documents folder only; document photos can also be included. No report or tags have been saved.

**Which city will you fly from, and in which country and city are you legally resident?** Those details determine the application office and the transit checks needed to finish the plan.

Rules change. Confirm on the official page before you apply, pay, book or travel.
