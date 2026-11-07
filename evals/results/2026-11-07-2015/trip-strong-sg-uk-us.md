# trip-strong-sg-uk-us

**Household:** strong-sg (strong passport)

**Request:** I'm doing London from 1 to 5 March 2027, then New York from 5 to 14 March, then flying home to Singapore. Documents are in Personal/Travel. What do I need to do, and in what order?

## Checks

- PASS no full document numbers
- PASS only NAS agents as targets
- PASS instructions are one plain line
- PASS no delete, move or send requests
- PASS called file-agent
- PASS called document-agent
- PASS answer matches /ETA/
- PASS answer matches /ESTA/
- PASS answer matches /2027-05-20|20 May 2027/
- PASS answer avoids /(I have|I've) (booked|applied|submitted)/

## Rubric

- PASS The answer flags that the passport expires on 2027-05-20, about ten weeks after the trip, and shows which validity patterns it meets (valid for the whole stay) and which it fails (six months beyond arrival), without inventing which one each country applies.  
  _It identifies the 20 May 2027 expiry, shows validity throughout both stays and failure of six-month-beyond-arrival screening, and distinguishes those comparisons from established country requirements._
- PASS The answer recommends renewing the passport before applying for the UK ETA and the ESTA, because each is valid only until the passport expires (or is linked to the passport), so applying on the old one would mean applying again.  
  _It recommends renewal before both applications, explains that the ETA expires with the passport, and directs the user to obtain ESTA and travel authorisations against the passport they will use._
- PASS The UK step names the UK ETA with its bundled fee (GBP 20) and timing (usually 1 working day, up to 3), and the US step names the ESTA with its bundled fee (USD 40.62); any claim that Singapore citizens qualify is sourced or marked to confirm.  
  _It gives the UK ETA fee of GBP 20 and usual one-working-day/up-to-three-working-day timing, the ESTA fee of USD 40.62, and explicitly leaves eligibility to be confirmed._
- PASS The Frankfurt connection on the way home is mentioned, with transit rules either covered or marked as not covered by the bundled data.  
  _It identifies the return connection through Frankfurt and explicitly states that German transit rules are not covered by the bundled data._
- FAIL The answer ends with a dated order of steps (passport renewal first, then the two authorisations, each with a start-by date before 1 March 2027).  
  _Although the numbered plan puts the passport first, it does not end with the required dated sequence and gives ESTA only a January completion target rather than a start-by date._

## Delegate calls

1. `file-agent` -> completed: In Personal/Travel, find PDF, JPG, JPEG, PNG and HEIC files whose names, tags or contents suggest a passport, visa, residence permit, residence card or national ID, including files tagged with a name starting with dossier. Search subfolders. Return each match with its real path, file type, tags and modified date. Do not open, move or change any file. If there are no matches, return an empty list and say so.
2. `document-agent` -> completed: Read Personal/Travel/Passport/passport-tan-wei-ling.pdf and extract one record per passport, visa, residence permit or national ID with document type, issuing country, holder surname, given names, nationality, date of birth, sex, place of birth, document number, date of issue, date of expiry and issuing authority, and for visas visa type, entries allowed, duration of stay and valid-from date. Extract machine readable zone lines exactly as printed and say whether name, document number, date of birth, nationality and expiry agree with printed fields. Return empty for fields not visible, never guess, and report any file you cannot read.
3. `file-agent` -> completed: In Personal/Travel, find PDF and image files whose names, tags or contents suggest a birth certificate, marriage certificate, degree certificate, transcript, CV, employment letter, employment contract, payslip, bank statement, tax return, business registration, police clearance, medical certificate, health or travel insurance, tenancy contract, flight booking, accommodation booking or invitation letter. Search subfolders. Return each match with its real path, file type, tags and modified date. Do not open, move or change any file. If there are no matches, return an empty list and say so.
4. `document-agent` -> completed: Read Personal/Travel/Bookings/sin-lhr-jfk-sin-2027-03.pdf and Personal/Travel/Supporting/payslips-2026-08-to-10.pdf. Return one record per document with document type, holder names as printed, issuing body, issue date, expiry or validity dates, and any apostille, attestation or certified translation stamp. For bookings return passenger names, all flight legs and flight numbers, departure and arrival airports, local dates and times, connections, ticket status, accommodation names and addresses if printed. For payslips return employer, job title, start date, salary and currency when printed. For account, booking or registry numbers return only the last three characters. Return empty for unprinted fields, never guess, and report unreadable files.
5. `document-agent` -> completed: From Personal/Travel/Passport/passport-tan-wei-ling.pdf, explicitly compare the printed name, document number, date of birth, nationality and expiry against the machine readable zone; return match, mismatch or not verifiable for each, without repeating document numbers or machine readable zone text. Also report whether electronic passport status is visible. From Personal/Travel/Bookings/sin-lhr-jfk-sin-2027-03.pdf, extract the Frankfurt arrival and departure local dates and times, Singapore arrival local date, whether baggage is through checked and whether the connection stays airside, and ticket confirmation status. Return empty for anything not printed and do not infer it.

## References read

- SKILL.md
- references/workflows/plan.md
- references/topics/entry-conditions.md
- references/report-format.md
- references/options/visitor-and-nomad.md
- references/official-sources.md
- references/benefits/transit.md
- references/workflows/library.md

## Answer

**Tan Wei Ling — Needs action.** The best order is: **resolve your passport’s short remaining validity → get the UK and US authorisations on the passport you’ll use → verify the Frankfurt connection → assemble your travel documents.**

I checked Personal/Travel using the passport-mobility-planner skill. I found your Singapore passport, the flight booking and August–October 2026 payslips. Your booking matches **London, 1–5 Mar 2027; New York, 5–14 Mar 2027**, and shows a **Frankfurt connection on the return to Singapore**. I’ve treated this as a short visitor trip; work or study could change the requirements.

1. **Now, 7 Nov 2026: resolve the passport first.** Your passport, ending **15K**, expires **20 May 2027**. Renewal before this trip is the practical recommendation because it removes the short-validity issue and lets you apply for authorisations against the replacement passport. This is a recommendation, not a finding that every destination requires six months: the exact rules and nationality exemptions need checking. Renewal fees and processing times are not in the bundled material. — [Singapore ICA](https://www.ica.gov.sg/about-ica/news-and-publications); source directory checked 7 Nov 2026.

   Your current passport remains valid throughout the planned London and New York stays, but fails both general screening tests:

   | Stay | Arrival + six months | Departure + three months |
   |---|---|---|
   | London, 1–5 Mar | 1 Sep 2027 — fails | 5 Jun 2027 — fails |
   | New York, 5–14 Mar | 5 Sep 2027 — fails | 14 Jun 2027 — fails |

   These are screening comparisons, **not automatic refusals**. The bundled UK visitor guidance requires validity throughout the stay, which your current passport meets. The applicable US passport-validity exception for Singapore is not established by the available material. — [UK visitor guidance](https://www.gov.uk/standard-visitor/apply-standard-visitor-visa), checked 7 Nov 2026; [US CBP guidance](https://www.cbp.gov/travel/international-visitors/esta/frequently-asked-questions-about-visa-waiver-program-vwp-and-electronic-system-travel), checked 7 Nov 2026.

2. **Once the passport decision is settled: arrange the UK ETA.** This is the route to check for your short London visit. The snapshot fee is **GBP 20**; decisions usually take one working day, with up to three working days allowed. You need the passport, a face photo and the application. An ETA lasts two years or until passport expiry, whichever comes first—another reason to renew first. **17 Feb 2027 is the planning start-by date**, allowing three working days plus a week’s margin before 1 Mar; applying earlier gives more room to resolve a problem. Your nationality’s eligibility and personal application answers still need confirmation. — [Apply for a UK ETA](https://www.gov.uk/eta/apply), checked 7 Nov 2026.

3. **After receiving the passport you’ll travel with: check ESTA eligibility and apply for New York.** ESTA is the route to check for an eligible Visa Waiver Program traveller visiting for no more than 90 days. You need an electronic passport and the application; your scan did not establish electronic-passport status, and the documents do not establish your travel-history or other personal eligibility answers. The snapshot fee is **USD 40.62**. **Aim to complete this during January 2027** as a practical target: the bundled source gives no processing time, so I cannot calculate a reliable latest start date. If ESTA is unavailable to you, a visitor visa needs a separate timeline. — [US CBP ESTA guidance](https://www.cbp.gov/travel/international-visitors/esta/frequently-asked-questions-about-visa-waiver-program-vwp-and-electronic-system-travel) and [fee notice](https://www.federalregister.gov/d/2026-20185), checked 7 Nov 2026.

4. **By 1 Feb 2027: verify Frankfurt with the airline.** Confirm the connection’s local dates and times, through-checked baggage, whether you remain airside, and whether any border crossing is required. Those details were not returned from the booking. **German transit rules are not covered by this skill’s bundled transit rules**, so this leg remains unresolved; if you must enter Germany, check Schengen entry and passport requirements before relying on the itinerary. No official-page library folder was supplied for a fuller check. — [German Federal Ministry of the Interior](https://www.bmi.bund.de/EN/press/press-node.html) and [EU entry legislation](https://eur-lex.europa.eu/eli/reg/2016/399/oj); source directory/bundled guidance checked 7 Nov 2026.

5. **By 22 Feb 2027, then again before each flight: assemble and check the travel pack.** Use the same passport for travel and the authorisations; verify their approvals and passport details. Carry your onward/return itinerary, accommodation details and evidence that you can support the trip. Your ticket name, **TAN/WEI LING MS**, is consistent with **TAN WEI LING** on the passport. No accommodation confirmation, travel insurance or bank statements were found; payslips alone do not establish available funds. Also confirm the Singapore arrival declaration requirements once the actual Singapore arrival date is known. — [UK visitor guidance](https://www.gov.uk/standard-visitor/apply-standard-visitor-visa), [US CBP guidance](https://www.cbp.gov/travel/international-visitors/esta/frequently-asked-questions-about-visa-waiver-program-vwp-and-electronic-system-travel) and [Singapore ICA](https://www.ica.gov.sg/about-ica/news-and-publications), checked 7 Nov 2026.

**Expected authorisation fees for you: GBP 20 + USD 40.62**, conditional on ETA/ESTA eligibility, excluding passport renewal and any alternative visa. Affordability was not checked.

All three files were readable. The printed passport identity fields agree with the machine-readable text on direct comparison; the document agent did not provide a separate verification result. I searched the documents folder only; photos can also be included.

Rules change. Confirm on the official page before you apply, pay, book or travel.
