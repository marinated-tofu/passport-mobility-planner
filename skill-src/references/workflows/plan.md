# Plan route

Plans how a person or a household reaches the countries they chose, with the least money and waiting time spent on documents, and checks they are ready to go.

## Inputs

Destinations and dates, or "anywhere" with a date range; the travellers; budget if given. If the user says "anywhere", start from the destinations the travellers can already enter: unlocked benefits first, then passport matrix entries marked visa-free, visa on arrival or e-visa.

## For each traveller and each country on the route

1. Entry path. Choose the cheapest available path in this order, stopping at the first that applies:
   - a benefit rule in that country's file that unlocks entry for this traveller (matched as in the benefits route);
   - a visa already held for that country, valid for the whole stay with enough entries;
   - the passport matrix entry for visa-free or visa on arrival;
   - an electronic travel authorisation or e-visa from that country's file (countries/<country code>.md, linked from SKILL.md);
   - a visa from that country's file, or, when the country has no file or no option in it, "visa needed, not covered" with the official source.
   For each, show the fee, waiting time, required documents (have, missing, too old) and source. A matrix-only result is marked "from the passport matrix, confirm on the official page".
2. Passport validity. Compare the passport expiry with the arrival date plus six months and the departure date plus three months, as in the entry conditions reference. Report which it meets; state which one applies only when a rule or option says so.
3. Name check. Flag name differences between the passport and any visa used.

## Transit and stopovers

For each leg that changes planes in a third country, check in this order: a valid visa or residence permit the traveller already holds for that country and that lets them enter it, which covers the connection too (say which document); then the transit rules in that country's file; otherwise "transit rules not covered" with the official source. When a stopover program covers a hub on the route, offer it as a free extra city with its conditions.

## Order and timeline

1. Work back from the departure date. Each application must start at least its processing time before departure, plus one week of margin.
2. Put applications that keep the passport in sequence, never at the same time.
3. Start with the paths that unlock others, as in the next document route.
4. Always end with a dated checklist, even when no application is needed: each start-by date, then the dated items before departure (forms to fill such as an arrival form, passport validity confirmed, documents to carry such as the visa that gives entry).

## Money

Add up the document fees per traveller and for the household. When an application on the route has a proof-of-funds rule or reference amount and bank statements were found in SKILL.md step 4, compare them as the proof of funds route does: the latest closing balance per currency, never adding currencies together, and when the rule is in another currency give the break-even exchange rate instead of inventing a rate. Otherwise say affordability was not checked and why. The Skill cannot see flight or hotel prices; use only bookings saved on the NAS.

## Verdict per traveller

Ready (every country has a path that needs nothing new), Needs action (with each application and its start-by date), or Not possible for these dates (with what fails and why).
