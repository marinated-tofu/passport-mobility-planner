# Document fields

## Contents
- Passport record
- Visa record
- Residence permit and ID card record
- Machine readable zone layouts
- Check digits
- Reading dates, names and codes

## Passport record

Extract one record per passport. Leave a field empty when it is not printed; never infer it.

| Field | Where it is | Notes |
| --- | --- | --- |
| document_type | Type box, MRZ line 1 position 1 | P for passport. A second letter can mark diplomatic (PD), official (PO) or service (PS) passports |
| issuing_country | Code of issuing state, MRZ line 1 positions 3-5 | Three-letter ICAO code |
| document_number | Passport number box, MRZ line 2 positions 1-9 | Keep letters and digits exactly |
| surname | Surname box, MRZ line 1 before the double filler | |
| given_names | Given names box, MRZ line 1 after the double filler | |
| nationality | Nationality box, MRZ line 2 positions 11-13 | Can differ from issuing country |
| date_of_birth | Date of birth box, MRZ line 2 positions 14-19 | |
| sex | Sex box, MRZ line 2 position 21 | M, F, or X / filler for unspecified |
| place_of_birth | Place of birth box | Visual zone only |
| date_of_issue | Date of issue box | Visual zone only |
| date_of_expiry | Date of expiry box, MRZ line 2 positions 22-27 | |
| issuing_authority | Authority box | Visual zone only |
| personal_number | Personal number box, MRZ line 2 positions 29-42 | Optional; many countries leave it as fillers |
| observations | Endorsement or observations page | Name changes, extensions, limits on travel |
| mrz_line_1, mrz_line_2 | Bottom of the data page | Two lines of 44 characters |
| source_file | Path returned by the search step | |

## Visa record

| Field | Notes |
| --- | --- |
| issuing_country | Country that issued the visa |
| visa_type | Category as printed, e.g. visitor, tourist, business, student, work, transit; also the class code, e.g. B1/B2, C (Schengen short stay), D (national long stay) |
| visa_number | |
| holder_surname, holder_given_names | |
| passport_number | Passport the visa is in or linked to |
| valid_from, valid_until | |
| entries | 1, 2, or multiple (M, MULT) |
| duration_of_stay | Days allowed per stay, as printed |
| territorial_validity | Schengen visas: all Schengen states, or limited (LTV) |
| issuing_post | Embassy or consulate |
| remarks | Annotations as printed |
| mrz_line_1, mrz_line_2 | Visas start with V; 2 lines of 44 (MRV-A) or 36 (MRV-B) characters |

## Residence permit and ID card record

| Field | Notes |
| --- | --- |
| issuing_country | |
| permit_type | As printed, e.g. residence permit, residence card, family member, long-term resident |
| permit_number | |
| holder_surname, holder_given_names, nationality, date_of_birth, sex | |
| date_of_issue, date_of_expiry | |
| occupation | Only if printed on the card. Some benefits depend on profession |
| sponsor_or_employer | Only if printed. Show it only in the saved report |
| mrz lines | Usually 3 lines of 30 characters (TD1) |

## Machine readable zone layouts

| Layout | Used on | Lines x characters |
| --- | --- | --- |
| TD3 | Passports | 2 x 44 |
| TD2 | Some ID cards and older residence documents | 2 x 36 |
| TD1 | ID cards, most residence cards | 3 x 30 |
| MRV-A | Visa stickers, full page | 2 x 44, starts with V |
| MRV-B | Smaller visa stickers | 2 x 36, starts with V |

TD3 passport line 2, by position:

| Positions | Content |
| --- | --- |
| 1-9 | Document number, padded with the filler character |
| 10 | Check digit for 1-9 |
| 11-13 | Nationality |
| 14-19 | Date of birth, YYMMDD |
| 20 | Check digit for 14-19 |
| 21 | Sex |
| 22-27 | Date of expiry, YYMMDD |
| 28 | Check digit for 22-27 |
| 29-42 | Personal number or fillers |
| 43 | Check digit for 29-42 |
| 44 | Composite check digit over 1-10, 14-20 and 22-43 |

The filler character is the less-than sign. Two fillers in a row on line 1 separate surname from given names.

## Check digits

Each check digit is computed the same way: give every character a value (digits keep their value, A is 10 through Z is 35, the filler is 0), multiply the values in turn by 7, 3, 1, 7, 3, 1 and so on, add the products, and take the last digit of the sum.

Worked example from the ICAO specimen document number L898902C3: values 21, 8, 9, 8, 9, 0, 2, 12, 3 times weights 7, 3, 1, 7, 3, 1, 7, 3, 1 give 147 + 24 + 9 + 56 + 27 + 0 + 14 + 36 + 3 = 316, so the check digit is 6.

Treat this as a consistency hint, never a verdict. When a computed digit disagrees, report "the machine readable zone and this field disagree; the scan may be misread or the field mistyped" and show both values. For a document number, never write either value in full: give its last three characters and the positions that differ with the two characters at each, for example "character 2: zone O, printed 0". Text recognition often confuses 0 and O, 1 and I, 5 and S, 8 and B.

## Reading dates, names and codes

- Dates in the MRZ are YYMMDD. For a date of birth, a two-digit year greater than the current two-digit year belongs to the 1900s. For a date of expiry, assume the 2000s.
- Printed dates follow the issuing country's format and may include month names in other languages. Store every date as YYYY-MM-DD.
- Names in the MRZ drop accents and may be shortened to fit; compare them with the printed name allowing for transliteration and truncation, and report only real differences.
- Country codes are ICAO three-letter codes. Germany is D followed by two fillers. Codes such as XXA (stateless), XXB (refugee) and XXC (refugee, other) mark special travel documents; say so in the dossier.
- One traveller can hold several passports. Keep one dossier per person with every passport listed; benefits are matched per passport.
