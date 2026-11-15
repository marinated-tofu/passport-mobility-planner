# Plan route

Plans how a person or a household reaches the countries they chose, with the least money and waiting time spent on documents, and checks they are ready to go. This file has the reply template for trips. For a trip, read only this file, topics/entry-conditions.md, research.md and prepare.md, each once. Do not read report-format.md or benefits.md.

Comparing dates: write both as YYYY-MM-DD and compare the year, then the month, then the day. 2026-03-15 is before 2026-09-01, so a document expiring 2026-03-15 is not valid on 2026-09-01.

{{include:supporting}}

## Inputs

Destinations and dates, or "anywhere" with a date range; the travellers; budget if given; connections from saved bookings. If the user says "anywhere", first research topic index with countries ALL for the travellers' nationalities, and start from the destinations they can already enter: visa-free and visa on arrival first, then e-visa.

## Work, for each traveller

1. Documents: from SKILL.md steps 1 to 3 and steps 4 and 5 above, the passport and every visa or residence permit, with expiry dates and the machine readable zone result.
2. Research: one request (research.md) with topic entry for every country on the route and every connection country, the travellers' nationalities, residence permits and visas held, dates and purpose, and the question "entry for a visit: visa-free or visa on arrival for these documents, electronic travel authorisation, e-visa or visa to apply for, fee, waiting time, documents, passport validity, transit at the airports named, stopover programmes, where and how long before travel to apply, how long a resident's permit must be valid to apply there, whether earlier stays count". Wait for the answer as research.md says before going on.
3. Each country on the route, in this order, stopping at the first path that applies:
   - an excerpt that lets the traveller in with what they hold (visa-free, visa on arrival, or a visa or residence permit of another country): write each of its conditions as a numbered check with yes or no and the dates; it applies only if every answer is yes;
   - a visa already held for that country, valid for the whole stay with enough entries;
   - the passport index entry for visa-free or visa on arrival, marked "from the passport index, confirm on the official page";
   - an electronic travel authorisation or e-visa in the excerpts, then a visa in the excerpts. When the excerpts describe a visa for the trip's purpose and none of them exempts the traveller's nationality, visas or residence, the path is that visa: write "Visa needed: [NAME]" plainly, not Needs checking, and add the page that lists exempt nationalities to confirm. An eligibility line such as "nationals who are not visa-exempt" with no visa-free rule naming the traveller's nationality means the traveller needs the visa; never turn it into "exemption not established";
   - nothing in the answer: "not found on the official pages", with the country's address in official-sources.md. Never call a country visa-free for a nationality unless an excerpt or the passport index says so.
4. Each connection in a third country: a visa or residence permit held for that country covers it (name the document); else the transit rules in the excerpts; else "transit rules not found, check the official page". Never call a connection fine without one of these. When an excerpt describes a stopover programme at a hub on the route, offer it as a free extra city with its conditions.
5. Dates: start-by date for each application = departure date minus its waiting time minus 7 days. Count working days as 7 calendar days per 5. Example: departure 2027-04-01 and five working days gives 2027-04-01 minus 7 days = 2027-03-25, minus 7 more = start by 2027-03-18. Check the result: it must be at least the waiting time plus 7 days before departure; a later date is wrong. Applications that keep the passport go one after another. If a passport must be renewed first, it comes before every application tied to the passport (an ETA or e-visa ends with the passport it was issued on).
6. Prepare: then follow references/prepare.md for the whole household, before writing the reply, so the reply can say what was done.

## Reply

Fill in every line of this template, in plain language. Mask document numbers to the last three characters, write dates as 14 Mar 2027, money with its currency, and end each rule, fee and option line with its page address and fetched date. Leave no line out: write "none" or "not covered" instead.

```text
Trip: countries in order, dates, travellers
Person: name - Ready / Needs action / Not possible for these dates

Documents read
  - Passport: nationality, number ending ..., expires (date), read from PDF or photo; machine readable zone: agrees with the printed page / disagrees (field; for a name or date both values, for the number only the differing positions, as "character 2: zone O, printed 0", never the full number: check the original passport) / not checked
  - Each visa or residence permit: country, type, entries, expires (date)
  - Residence permit for the home country: valid on the return date (date) / expires before it: renew first (entry-conditions.md)

Passport validity (passport expires E; arrival A; last departure D)
  - A plus 6 months = (date). Met only if E is on or after it
  - D plus 3 months = (date). Met only if E is on or after it
  - Whole stay: met only if E is on or after D
  Which pattern each country uses: only when its excerpt says so

Country: name, dates there
  Path: what the excerpt gives (stay) and under which name, or "not found on the official pages"
  Checks: each numbered condition from the excerpt, with yes or no and both dates compared; one no means take the next path
  Also required: forms to fill and caveats from the excerpts (for example an arrival form); for anything the excerpts leave open, "confirm on the source"
  Fee, waiting time and where to apply: copy the excerpt's fee, waiting time and "How to apply" line word for word (for example "at an embassy or consulate, or online where available"), or "not stated on the official page"
  Documents: have / missing / too old
  Source: page address (fetched date)

Connection: airport, country, date
  Covered by: document held / transit rule from the excerpt / not found, check the official page

Names and dates of birth: compare the surname, given names and date of birth on each visa, permit and booking with the passport; each difference and what to do, or "names and dates of birth match" once both are compared

Money: fees per person and household total; proof of funds: latest closing balance per currency (never add currencies) against the rule, with the break-even exchange rate when currencies differ, or "not checked" and why

Done on the NAS (prepare.md)
  - Trip folder: path, documents copied / waiting for your approval in the NAS app / failed (why)
  - Plan and form answers: path / waiting for approval / failed
  - Drafts: each kind and path / waiting for approval / failed
  - Calendar file with the deadlines: path / waiting for approval / failed (import it into your calendar for reminders)
  - Trip queue: path / waiting for approval / failed
  Or "not prepared" and why

In the trip queue (open the queue page, port 8089 on the NAS)
  - due date: kind, title: what the companion prepares (compares prices / opens the page and fills the form / shows the email to send) and what is left for you (log in, check every field, pay and submit / pick an option, here or on the queue page, then sign up, pay and book / press Send)

Left for you, dated, starting today (date): only what neither the NAS nor the companion can do
  - date: action (appointments in person, fingerprints, photos, signing the drafts, documents only an office or a bank can issue, passport renewal)
  - departure date: travel with the passport and the documents that give entry

Rules change. Confirm on the official page before you apply, pay, book or travel.
```
