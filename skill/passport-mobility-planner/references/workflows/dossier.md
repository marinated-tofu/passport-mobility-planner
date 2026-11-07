# Dossier route

Turns the documents found in steps 1 to 5 into one dossier per person: the travel documents in full, and the supporting documents that visa, residence and settle-in applications ask for.

## Group by person

Group the extracted records by holder: same date of birth and a matching name after allowing for transliteration. Supporting documents rarely show a date of birth; attach them by name, and when a name matches two people or none, list the document under Unassigned and ask.

## Travel documents

For each person, list every passport, visa and residence permit with all fields from the document fields reference, and compute:

- days until expiry from today;
- for passports, the six-month date (expiry minus six months) and the three-month date (expiry minus three months);
- for visas, whether it is valid today and how many entries it allows.

Add the consistency results from the comparison at the end of step 3: name, date of birth and nationality differences between documents, and machine readable zone disagreements.

## Supporting documents

For each person, fill one line per item type in the dossier items reference: the newest document of that type, its issue date and age in days, any expiry, and whether an apostille, attestation or certified translation is visible. Then flag:

- name differences from the passport, including missing middle names and different spellings;
- age: police clearances, medical certificates and bank statements older than the limit in the dossier items reference;
- bank statements that do not cover a full recent period without gaps;
- insurance that has expired or ends before a planned trip.

## Gaps

List the item types the person has no document for. When the user named a destination or goal, list only the gaps that matter for it, using the required documents of the matching option or settle-in steps.

Present it with the Dossier layout in the report format reference. Offer to save the dossier and to tag each file with its item type and holder; do either only after a yes.
