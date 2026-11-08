# Report format

Plain language, one section per person. In chat, mask document numbers to the last three characters and show bank accounts as bank name plus last three characters. Dates as 14 Mar 2027. Money with its currency. Every benefit, fee, rule and step line ends with its source address and checked date.

## Contents

Dossier, Passport power, Benefits, Next document, Plan, Proof of funds, Settle in, Expiry, Updates, Library answer.

## Dossier

```text
Person: given names and surname, born 02 Jan 1990
Passports
  - Nationality, number ending 4C7, expires 20 May 2031 (6-month date 20 Nov 2030)
Visas and residence permits
  - Issuing country, type, entries, valid until
Supporting documents
  - Item: issue date, age, expiry, apostille or attestation visible or not visible
Checks
  - Name, birth date and nationality agree on all documents, or each difference found
  - Too old, expired or missing periods
Missing for the goal given
  - Item, needed by which application or step
Could not read
  - file path and reason
```

## Passport power

```text
Passport: nationality
  Visa-free N (with days), visa on arrival N, e-visa or ETA N, visa required N
  Boost from documents held: N destinations, with the document that unlocks each
  Personal score: base + boost
Best passport per destination (several passports only)
Fastest ways to grow: top three next documents
Matrix date: date of the dataset
```

## Benefits

```text
Person: name
Unlocked, lost soonest first
  - Country: benefit, stay, purpose
    Unlocked by: the documents. Lost on: date
    Source: address (checked date)
Needs checking
  - Country: benefit. Missing: the condition the documents cannot show
Not covered
  - Countries asked about with no matching rule, with their official source
```

## Next document

```text
Person: name. Budget: amount or none given
1. Option name (country)
   Opens: N new destinations: list
   Fee: amount (about USD N). Waiting: time. Value: N per USD 100
   Documents: have list; missing list; too old list
   Source: address (checked date)
Suggested order: option, then option, with the reason
```

## Plan

The trip reply template is in workflows/plan.md.

## Proof of funds

```text
Rule: option name, rule as written, source (checked date)
Accounts
  - Bank ending 123, currency, period, closing balance, lowest balance, monthly credits
Flags
  - each flag found
Result: Meets / Does not meet (shortfall) / Needs checking (what is missing)
After fees: balance left and whether the rule is still met
Decision: the consulate or authority decides; this compares the statements with the published rule only
```

## Settle in

```text
Moving to: country, purpose, arrival date
Before you leave
  - Document to attest, apostille or translate
Steps
  1. Step - deadline - fee - documents: have, missing, too old, or not listed in the bundled data - how - source
Housing
  - Rule or tool - source
  - Listings: the Skill cannot search live listings; it checks only listings saved on the NAS
Customs
  - Topic: summary - source
```

## Expiry

```text
Expiring in the next 12 months
  - date - holder - document - days left - benefits lost
Next expiry after that: date, document
```

## Updates

```text
Country
  - date detected - summary - source address
    Affects: the benefit, option, step or document it touches, if any
```

## Library answer

```text
Question
  - Passage in its own words - library file - source address - copy date
Bundled rule (if any) and whether the library copy agrees
```

End every benefits, next document, plan, proof of funds, settle-in and updates answer with: "Rules change. Confirm on the official page before you apply, pay, book or travel."
