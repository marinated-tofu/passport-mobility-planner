# Data schema

Everything the Skill knows lives here as YAML. `build/build.py` turns it into the Markdown files under
`skill/passport-mobility-planner/references/`. Edit the YAML, never the generated Markdown.

## Rules (`data/rules/*.yaml`)

One file per group. A rule says: if a person holds these documents, they get this benefit.

```yaml
group: visa-held            # file name without .yaml; becomes references/benefits/<group>.md
title: Benefits from visas you already hold
rules:
  - id: mx-entry-with-us-uk-schengen-visa      # unique, lowercase-hyphenated
    country: MX                                # ISO 3166-1 alpha-2 of the country giving the benefit
    benefit: visa-free entry                   # one of: visa-free entry, visa on arrival, e-visa,
                                               #   electronic travel authorisation, visa-free transit,
                                               #   stopover program, working holiday visa,
                                               #   long-term residence, other
    stay: up to 180 days                       # as the source states it; omit if not stated
    purpose: tourism, business, transit        # as the source states it
    unlocked_by:                               # ALL items must hold (AND). Use several rules for OR.
      - holds: visa                            # passport | visa | residence-permit | ticket | citizenship
        issued_by: [US, GB, CA, JP, SCHENGEN]  # any one of these (OR); SCHENGEN = any Schengen state
        condition: valid on the day of entry   # free text, from the source
    nationality_excluded: []                   # ISO codes the source excludes, if any
    nationality_only: []                       # ISO codes, if the rule applies only to them
    age: ""                                    # e.g. "18-30" for working holiday visas
    notes: Short, in our own words. No copied text.
    source: https://official.government.site/page
    source_owner: National Migration Institute (INM), Government of Mexico
    checked: 2026-11-07                        # date a person or agent read the source
    confidence: verified                       # verified = read on the official page that day
                                               # partial  = official page found, a detail unclear
```

Only official sources count: a government, an embassy, an immigration authority, or the airline that
runs a stopover program. News sites, blogs and visa agencies can point you to a rule but are never the
`source`. A rule without an official source is left out.

## Options (`data/visas/*.yaml`)

Visas, travel authorisations, residence permits and citizenship routes a person can apply for. Rendered to
`references/options/<group>.md`. The build adds "Also unlocks" to each option: every benefit rule elsewhere
whose `unlocked_by` names the option's `document` issued by the option's `country`.

```yaml
group: visitor-and-nomad
title: Visas and travel authorisations you can apply for
options:
  - id: us-b1-b2-visa
    country: US                       # issuing country; SCHENGEN for Schengen visas
    document: visa                    # visa | electronic travel authorisation | residence-permit | citizenship
    name: B1/B2 visitor visa
    purpose: tourism, business visits
    fee: "USD 185"                    # as officially written
    fee_usd: 185                      # rough number for ranking, or null
    minimum_investment: ""            # investment routes only
    minimum_investment_usd: null
    processing: "..."                 # as officially written
    processing_days: null             # number if officially stated
    validity: "..."
    stay: "..."
    apply: "..."
    eligibility: "..."
    proof_of_funds: "..."
    required_documents: [passport, passport-photo, bank-statements]   # dossier item names, see below
    nationality_only: []
    nationality_excluded: []
    notes: ""
    source: https://...
    source_owner: ...
    checked: 2026-11-07
    confidence: verified
funds_reference:                      # optional; Schengen reference amounts
  - country: FR
    amount: "..."
    source: https://...
    source_owner: European Commission
    checked: 2026-11-07
```

## Settle-in (`data/settle/<cc>.yaml`)

One file per country, named by its lowercase ISO code. Rendered to `references/settle/<cc>.md`.

```yaml
country: JP
title: Settling in Japan
steps:
  - id: jp-resident-registration
    order: 1
    category: address-registration    # residence-registration | identity | tax-number | bank-account |
                                      #   health-insurance | driving-licence | phone | business-registration |
                                      #   address-registration | housing | other
    step: Register your address at the municipal office
    who: ...
    deadline: "Within 14 days of moving in"
    fee: ""
    needs: [passport, residence-permit]
    how: ...
    notes: ""
    source: https://...
    source_owner: ...
    checked: 2026-11-07
    confidence: verified
customs:
  - topic: medicines                  # free word: dress, alcohol, religion, photography, ...
    summary: In our own words.
    source: https://...
    source_owner: ...
    checked: 2026-11-07
```

## Dossier item names

Used by `required_documents` and `needs`: passport, passport-photo, national-id, birth-certificate,
marriage-certificate, degree-certificate, transcript, cv, employment-letter, employment-contract, payslips,
bank-statements, tax-return, business-registration, sponsor-letter, invitation-letter, police-clearance,
medical-certificate, health-insurance, travel-insurance, flight-booking, accommodation-proof, residence-permit,
visa, tenancy-contract, proof-of-income, application-form, other.

## Passport matrix (`data/baseline/passport-index-matrix-iso2.csv`, optional)

The community dataset from github.com/ilyankou/passport-index-dataset (MIT). Not an official source: the
build renders it to `references/matrix/` as a screening layer, and official rules always win. Put the
dataset date in `data/baseline/SOURCE.md` as `dataset date: YYYY-MM-DD`.

## News sources (`data/sources/*.yaml`)

The library companion reads these every night and records new announcements. It also keeps copies of every
`source` page above in the library folder.

```yaml
- id: qa-moi-news
  country: QA
  owner: Ministry of Interior, State of Qatar
  topic: immigration                           # immigration | visas | residence | travel-advisory |
                                               #   business-registration | banking | transit
  url: https://portal.moi.gov.qa/...           # page that lists announcements
  kind: page                                   # page | rss | atom
  checked: 2026-11-07
```
