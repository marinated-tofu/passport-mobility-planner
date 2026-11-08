# Plan route

Plans how a person or a household reaches the countries they chose, with the least money and waiting time spent on documents, and checks they are ready to go. This file has the reply template for trips. For a trip, read only this file, topics/entry-conditions.md and one country file per country on the route, each once. Do not read report-format.md, benefits.md, benefits/index.md or options/index.md.

Comparing dates: write both as YYYY-MM-DD and compare the year, then the month, then the day. 2026-03-15 is before 2026-09-01, so a document expiring 2026-03-15 is not valid on 2026-09-01.

{{include:supporting}}

## Inputs

Destinations and dates, or "anywhere" with a date range; the travellers; budget if given; connections from saved bookings. If the user says "anywhere", start from the destinations the travellers can already enter: unlocked benefits first, then passport matrix entries marked visa-free, visa on arrival or e-visa.

## Work, for each traveller

1. Documents: from SKILL.md steps 1 to 3 and steps 4 and 5 above, the passport and every visa or residence permit, with expiry dates and the machine readable zone result.
2. Each country on the route, in this order, stopping at the first path that applies:
   - a benefit rule in the country's file: write its numbered checks with yes or no and the dates; it applies only if every answer is yes;
   - a visa already held for that country, valid for the whole stay with enough entries;
   - the passport matrix entry for visa-free or visa on arrival, marked "from the passport matrix, confirm on the official page";
   - an electronic travel authorisation or e-visa in the country's file, then a visa in the country's file;
   - no file, or nothing in it: "not covered by the bundled data", with the official source. Never call a country visa-free for a nationality unless a bundled rule, option or matrix entry says so.
3. Each connection in a third country: a visa or residence permit held for that country covers it (name the document); else the transit rules in that country's file when SKILL.md lists one; else "transit rules not covered by the bundled data, check the official page". Never call a connection fine without one of these. When a stopover program in the file covers a hub on the route, offer it as a free extra city with its conditions.
4. Dates: start-by date for each application = departure date minus its waiting time minus 7 days. Applications that keep the passport go one after another. If a passport must be renewed first, it comes before every application tied to the passport (an ETA or e-visa ends with the passport it was issued on).

## Reply

Fill in every line of this template, in plain language. Mask document numbers to the last three characters, write dates as 14 Mar 2027, money with its currency, and end each rule, fee and option line with its source address and checked date. Leave no line out: write "none" or "not covered" instead.

```text
Trip: countries in order, dates, travellers
Person: name - Ready / Needs action / Not possible for these dates

Documents read
  - Passport: nationality, number ending ..., expires (date), read from PDF or photo; machine readable zone: agrees with the printed page / disagrees (field, both values: check the original passport) / not checked
  - Each visa or residence permit: country, type, entries, expires (date)

Passport validity (passport expires E; arrival A; last departure D)
  - A plus 6 months = (date). Met only if E is on or after it
  - D plus 3 months = (date). Met only if E is on or after it
  - Whole stay: met only if E is on or after D
  Which pattern each country uses: only when its file says so

Country: name, dates there
  Path: the rule or option id and what it gives (stay), or "not covered"
  Checks: each numbered check from the rule, with yes or no and both dates compared; one no means take the next path
  Also required: forms to fill and caveats copied from the rule's notes (for example an arrival form, or a list to confirm the nationality on); for a partial rule, "confirm on the source"
  Fee and waiting time: from the file, or "not in the bundled data"
  Documents: have / missing / too old
  Source: address (checked date)

Connection: airport, country, date
  Covered by: document held / transit rule id / not covered by the bundled data, check the official page

Names: each difference between the passport and a visa or booking, and what to do; or "names match"

Money: fees per person and household total; proof of funds: latest closing balance per currency (never add currencies) against the rule, with the break-even exchange rate when currencies differ, or "not checked" and why

Checklist, dated, starting today (date)
  - date: action (each start-by date, passport renewal, each form with its deadline, documents to carry)
  - departure date: travel with the passport and the documents that give entry

Rules change. Confirm on the official page before you apply, pay, book or travel.
```
