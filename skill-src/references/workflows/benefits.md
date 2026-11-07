# Benefits route

Matches what each traveller holds against the bundled benefit rules.

## Build the holdings

For each traveller, from the verified dossier:

- passports: nationality (three-letter code converted to the two-letter code used in the rules), date of expiry;
- visas: issuing country, visa type, entries, valid until;
- residence permits: issuing country, valid until, occupation if printed.

Only documents valid today count. Note any that expire within 12 months.

## Find the rules

When the question is about one or a few countries, read their country files. Otherwise read benefits/index.md, which has every rule on one line, and match the rows against the holdings. Rules unlocked by a passport alone apply to its nationality. Open a country file only for a matched rule whose row says notes, to read them and the official source.

## Match each rule

A rule lists everything that must hold under "Unlocked by". For each rule:

1. Skip it when the traveller's nationality is on its excluded list, or when it lists "only for" nationalities and the traveller's is not one of them.
2. Mark it **Unlocked** when every item is met by a document valid today.
3. Mark it **Needs checking** when every item is met except a condition the documents cannot show, for example "visa must have been used once", "multiple-entry only" when entries are unreadable, an age limit when the date of birth is missing, or a profession list when no occupation is printed. Name the condition.
4. Otherwise leave it out.

For each unlocked rule, find the date the benefit is lost: the earliest expiry among the documents that unlock it. If that is within 12 months, say so.

## Rank and present

1. Unlocked benefits that will be lost soonest.
2. Other unlocked benefits, by country name.
3. Needs checking.

Show the stay length and purpose exactly as the rule states them, the official source address and the checked date. When the checked date is more than six months old, add "this rule may have changed; check the official page first".

Never combine rules into a benefit no rule states, and never say a traveller needs no visa for a country unless a rule says so for their documents. For any country without a matching rule, say the bundled rules do not cover it and point to its entry in the official sources reference.
