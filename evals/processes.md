# Travel processes and what the evals check

The Skill never books, applies, pays or submits. For each process below it does the paperwork thinking: which path applies, which documents are on the NAS, what is missing, and the dates to start each step. The person does the applying.

Tests live in `scenarios.yaml`; the households they run against are in `household.yaml` (Maria, Philippine passport) and `households/*.yaml`.

## 1. Trip, end to end ("I want to go to X on these dates, sort it out")

| Step | What happens | Skill does | Tested in |
| --- | --- | --- | --- |
| 1. Read the passport | Find the passport on the NAS, read every field, check the machine readable zone against the printed page | Steps 1 to 3 of SKILL.md; check digits from `topics/document-fields.md` | every trip; misread scan in `trip-weak-ng-london`; photo of the passport in `trip-strong-jp-korea-canada` |
| 2. Passport validity | Compare expiry with the trip: whole stay, 3 months after leaving, 6 months after arriving | `topics/entry-conditions.md` | expires before the trip in `trip-weak-in-schengen`; expires soon after in `trip-strong-sg-uk-us` |
| 3. Entry path per country | Cheapest path that applies: a benefit from a visa or residence permit held, a visa already held, visa-free, an ETA or e-visa, then a visa | Plan route, step 1 | all trips |
| 4. Transit | Each connection in a third country: is a transit visa needed? | `benefits/transit.md`; "not covered" when the country isn't there | Frankfurt and Houston in `trip-medium-tr-mexico-panama`; Amsterdam and Paris in `trip-weak-ng-london`; Shanghai in `trip-strong-de-japan-china` |
| 5. Documents per application | The documents each application asks for, marked have, missing or too old | `topics/dossier-items.md` and the option file | `trip-weak-in-schengen`, `trip-medium-ph-japan` |
| 6. Proof of funds | Bank statements against the reference amount, with a break-even exchange rate | Proof of funds route | `trip-weak-in-schengen`, `funds-schengen` |
| 7. Names | Name on the ticket and visa against the passport | `topics/entry-conditions.md` | `trip-medium-mx-spain-portugal-uk` |
| 8. Order and dates | Work back from departure: processing time plus a week for each application, one passport at a time | Plan route, "Order and timeline" | all trips |
| 9. Verdict | Ready, needs action (with start-by dates), or not possible for these dates | Plan route, "Verdict" | all trips |

## 2. Consular visa (Schengen C, UK visitor, US B1/B2, Japan short-term, Canada TRV)

1. Check you need it, and that no cheaper path applies (step 3 above).
2. Pick where to apply: for Schengen, the consulate of the main destination (most nights), in the country where you live.
3. Check the application window: Schengen is no earlier than 6 months and at least 15 days before travel.
4. Collect the documents: form, passport, photo, insurance, bank statements, bookings, employment letter.
5. Book an appointment, give fingerprints, pay the fee.
6. Wait for processing. The passport is often kept, so apply for one visa at a time.
7. When the passport comes back, check the visa: names, dates, entries, length of stay.

The Skill covers steps 1 to 4 and step 7 (by reading the visa once it is on the NAS). Steps 5 and 6 are the person's. Tested in `trip-weak-in-schengen` and `trip-medium-ph-japan`.

## 3. Electronic travel authorisation (US ESTA, UK ETA, Canada eTA, Korea K-ETA, ETIAS once it starts)

1. Check the nationality is eligible.
2. Apply online with the passport you will travel on: it is tied to that passport and ends when the passport expires.
3. Pay the fee and wait (minutes to 3 days).
4. Travel with the same passport.

Tested in `trip-strong-sg-uk-us` (passport expires soon after the trip: renew first), `trip-strong-jp-korea-canada` and `trip-medium-mx-spain-portugal-uk` (ETIAS not running yet).

## 4. Entry unlocked by another document (visa or residence permit held)

1. Read the visa or permit and its expiry.
2. Match it against the benefit rules: country, nationality limits, minimum validity left.
3. Keep the conditions: forms such as Mexico's FMMd, how long the permit must still be valid, partial-confidence labels.

Tested in `trip-medium-tr-mexico-panama` (US visa opens Mexico and Panama) and `trip-weak-pk-georgia-armenia` (UAE residence: Georgia fails the one-year rule, Armenia passes by days, Turkey is not unlocked).

## 5. Moving to a country

1. Long-stay visa or permit before arriving (option files).
2. After arriving: registration, tax number, residence card, bank account, health cover, housing, in the order of the country file.
3. Documents for each step against the dossier.

Tested in `settle-portugal`.

## What a passing answer never does

- Claims to have booked, applied, paid or sent anything.
- Shows a passport, visa or account number in full.
- States a nationality's visa-free access as fact when the bundled data does not say it. The Skill has no passport matrix, so it has to cite a bundled rule or mark the claim to confirm on the official page.
- Picks one value when a scan and the printed page disagree.
- Invents a fee, a processing time or an exchange rate.
