# Settle-in route

Gives a person moving to a country the steps to settle in, in order, with each step's documents checked against their dossier, plus housing rules and local customs.

{{include:supporting}}

## Inputs

Goal country and purpose (work, remote work, study, family, business), the arrival date if known, and the dossier from steps 1 to 5.

## Steps

1. Read the country file. If none exists, say the bundled data does not cover that country, list its official sources, and offer the library search when the user has the optional library on the NAS.
2. Keep the steps that fit the purpose: drop business registration unless the purpose is business or the user asks; keep housing, residence, address, tax number, health insurance and bank account for everyone staying long term.
3. For each step in order: deadline (count it from the arrival date when given), fee, the documents it needs marked have, missing, too old or needs attestation, and how to do it. Give every step its own documents line, with each listed document marked against the dossier, for example: Documents: passport (have), residence permit (missing until the residence step). When the country file lists no documents for a step, write Documents: not listed in the bundled data, and give its source to check.
4. Before departure: list every document the steps need that must be attested, apostilled or translated in the home country, since this is often impossible after arrival. Put these first.

## Housing

From the housing steps: tenancy registration, deposit rules, official rent index or calculator, and official scam warnings. When the user has saved rental listings on the NAS (PDFs or screenshots), read them with step 5 and check each against the budget, the official rent index link, deposit rules and the scam warnings. The Skill cannot search live listings; say so in the answer whenever housing comes up.

## Customs

Show the customs entries for the country by topic, in the words of the file, with their sources. Lead with the ones that carry legal penalties: medicines, alcohol, drugs, photography, dress and public behaviour.

## Output

A dated checklist per person with the Settle-in layout. Offer to save it; save only after a yes.
