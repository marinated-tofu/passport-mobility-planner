# trip-strong-jp-korea-canada

**Household:** strong-jp (strong passport)

**Request:** I'm going from Osaka to Seoul on 2 May 2027 for three days, then Seoul to Vancouver on 5 May until the 19th. My documents are in Personal/Travel. What paperwork do I need?

## Checks

- PASS no full document numbers
- PASS only NAS agents as targets
- PASS instructions are one plain line
- PASS no delete, move or send requests
- PASS called file-agent
- PASS called photo-agent
- PASS answer matches /eTA/
- PASS answer matches /K-ETA/
- PASS answer avoids /(I have|I've) (booked|applied|submitted)/

## Rubric

- PASS The passport is read from the photo by text recognition, and the answer confirms the machine readable zone agrees with the printed page or reports that it checked it.  
  _The photo-agent was asked to perform text recognition on the passport photo, and the answer explicitly confirms that the machine-readable zone agrees with the printed details._
- PASS For Canada, the answer names the eTA for arrival by air with its bundled fee (CAD 7) and timing (most approved within minutes), and says to get it before booking or before flying; any claim that Japanese citizens are visa-exempt is sourced or marked to confirm.  
  _The answer identifies the eTA for arrival by air, gives the CAD 7 fee and usual approval within minutes, instructs applying before travel, and marks Japanese eligibility for confirmation on the official Canadian page._
- PASS For Korea, the answer names the K-ETA (KRW 10,000 plus a payment charge) and passes on the bundled caveat that Korea has waived it for some nationalities and the current exemption list was not checked, so he should confirm.  
  _The answer names K-ETA, gives the KRW 10,000 fee plus payment charge, and explains that nationality exemptions may apply and the current exemption list was not confirmed._
- PASS Neither country is turned into a visa application.  
  _The answer treats both destinations through electronic travel authorizations and eligibility checks, mentioning a Canadian visitor visa only as a conditional alternative if eTA eligibility fails._
- PASS The answer includes a dated checklist, with the K-ETA done before the 2 May flight and the eTA before the 5 May flight.  
  _The dated checklist sets 22 April 2027 for any required K-ETA application and requires approved Korean and Canadian authorizations before the respective 2 May and 5 May flights._

## Delegate calls

1. `file-agent` -> completed: In the folder Personal/Travel, find PDF, JPG, JPEG, PNG and HEIC files whose names, tags or contents suggest a passport, visa, residence permit, residence card or national ID, including files tagged with a name starting with dossier. Search subfolders. Return each match with its real path, file type, tags and modified date. Do not open, move or change any file. If there are no matches, return an empty list and say so.
2. `photo-agent` -> completed: Run text recognition on each of these images: Personal/Travel/Passport/passport-photo-page.jpg, and return the full recognised text for each image, keeping the two or three machine readable zone lines at the bottom intact and in order. Report each image where no text was recognised.
3. `file-agent` -> completed: In the folder Personal/Travel, find PDF and image files whose names, tags or contents suggest a birth certificate, marriage certificate, degree certificate, transcript, CV, employment letter, employment contract, payslip, bank statement, tax return, business registration, police clearance, medical certificate, health or travel insurance, tenancy contract, flight booking, accommodation booking or invitation letter. Search subfolders. Return each match with its real path, file type, tags and modified date. Do not open, move or change any file. If there are no matches, return an empty list and say so.
4. `document-agent` -> completed: For each of these files: Personal/Travel/Bookings/kix-icn-yvr-2027-05.pdf, Personal/Travel/Supporting/hotel-vancouver-2027-05.pdf, return one record per document. Set the document type to one of: birth-certificate, marriage-certificate, degree-certificate, transcript, cv, employment-letter, employment-contract, payslips, bank-statements, tax-return, business-registration, sponsor-letter, invitation-letter, police-clearance, medical-certificate, health-insurance, travel-insurance, flight-booking, accommodation-proof, tenancy-contract, proof-of-income, or other with the title as printed. Always return the holder or person names as printed, the issuing body, the issue date, any expiry or validity dates, and whether an apostille, attestation or certified translation stamp is visible. Also return, when printed: dates and places of birth or marriage and registry numbers for certificates; institution, degree, field and award date for degrees and transcripts; employer, job title, start date, salary and currency for employment documents and payslips; bank, currency, period start and end, opening and closing balance for bank statements; cover period, territory and cover amount for insurance; names, addresses, dates, rent and deposit for tenancy contracts and bookings. For any account, booking or registry number return only its last three characters. Return a field as empty when it is not printed; never guess. Report each file you could not read.

**Model in replies:** gpt-5.6-luna. **Credential source:** none.

## References read

- SKILL.md
- references/workflows/plan.md
- references/topics/entry-conditions.md
- references/countries/jp.md
- references/countries/kr.md
- references/countries/ca.md
- references/topics/document-fields.md

## Answer

Trip: Osaka → Seoul, 2 May 2027; Seoul → Vancouver, 5 May 2027; Vancouver → Osaka, 19 May 2027. Traveller: Kenji Sato.

Person: Kenji Sato — Needs action

Documents read

- Japanese passport, number ending **273**, expires **11 Jun 2034**; read from `Personal/Travel/Passport/passport-photo-page.jpg`.
- Machine-readable zone agrees with the printed name, passport number, birth date, nationality, and expiry.
- No visa, residence permit, or national ID was found.
- Flight booking confirms KIX–ICN on 2 May, ICN–YVR on 5 May, and YVR–KIX on 19 May; booking reference ending **2RT**.
- Vancouver accommodation proof covers 5–19 May 2027.
- No Seoul accommodation booking, travel-insurance policy, bank statements, or proof-of-funds documents were found.

Passport validity

The passport is valid for the entire trip and comfortably exceeds both common validity tests:

- Korea arrival plus six months: **2 Nov 2027** — met.
- Korea departure plus three months: **5 Aug 2027** — met.
- Canada arrival plus six months: **5 Nov 2027** — met.
- Canada departure plus three months: **19 Aug 2027** — met.

South Korea: 2–5 May 2027

- Visa: The bundled data does not include the Japanese-nationality visa-free rule, so confirm the current Korean entry status for a Japanese passport on the official Korean immigration/K-ETA service.
- K-ETA: If Japanese nationals are not exempt in May 2027, obtain a Korea Electronic Travel Authorization before boarding. It requires the passport, a passport photo, and an online application. The fee is **KRW 10,000 plus a 3% payment charge**; usual processing is within **72 hours**. The authorization lasts three years or until the passport expires, whichever comes first. Source: https://www.k-eta.go.kr/portal/guide/viewetaapplication.do — checked 7 Nov 2026.
- The current K-ETA exemption list was not confirmed in the bundled data, and exemptions may change before May 2027.
- The passport is valid after the planned Korean stay: **yes, through 11 Jun 2034**.
- Confirmed onward flight to Vancouver: **yes**, 5 May 2027.
- Accommodation in Seoul: **not found**. Carry a Seoul hotel booking or host address.
- Travel insurance: **not found**. Arrange it if desired or required by your circumstances.
- If K-ETA is required, the workflow’s conservative start-by date is **22 Apr 2027**—seven days before the stated 72-hour processing window.

Canada: 5–19 May 2027

- For a Japanese passport travelling by air, the usual authorization is an **eTA**, provided the traveller is visa-exempt. The bundled rule does not list nationalities individually, so confirm Japanese eligibility on the official Canada page.
- If eligible, apply for the eTA before travel. It requires the passport and application form; the fee is **CAD 7**. Most applications are approved within minutes, although some take several days. It is valid for up to five years or until the passport expires, whichever comes first. Source: https://www.canada.ca/en/immigration-refugees-citizenship/services/visit-canada/eta/facts.html — checked 7 Nov 2026.
- The eTA is required for arrival or transit by air, which applies to the ICN–YVR flight.
- Canada visitor visa: not expected to be necessary if the Japanese passport qualifies for an eTA. If the eTA eligibility check says a visa is required, the alternative is a visitor visa costing **CAD 100**, plus biometrics of **CAD 85** per person; the bundled rule says to provide a passport, photo, application form, and bank statements. Source: https://www.canada.ca/en/immigration-refugees-citizenship/services/visit-canada/apply-visitor-visa.html — checked 7 Nov 2026.
- Accommodation in Vancouver: **found**, covering 5–19 May 2027.
- Return/onward ticket: **found**, Vancouver–Osaka on 19 May 2027.
- Funds and insurance: **not checked/not found**. No bank statements or insurance policy was present in `Personal/Travel`.

Money

For one traveller:

- Korea K-ETA, if required: **KRW 10,000 + 3% payment charge**.
- Canada eTA, if eligible: **CAD 7**.
- Conditional total: **KRW 10,300 approximately plus CAD 7**, subject to the Korean payment calculation and whether either authorization is exempt.
- Proof of funds was not checked because no bank statement was found. Do not rely on the accommodation booking alone as proof of funds.

Checklist, starting 11 Nov 2026

- Before booking or travelling: confirm the current Korean visa-free and K-ETA exemption rules for Japanese passport holders.
- Before travelling: confirm Japanese eligibility for Canada’s eTA on the official Government of Canada page.
- By **22 Apr 2027** if K-ETA is required: submit the K-ETA application.
- Before departure: obtain Seoul accommodation details, and arrange travel insurance if required or desired.
- Carry the original passport, approved K-ETA if applicable, approved Canadian eTA confirmation if applicable, the flight booking, Vancouver accommodation proof, Seoul accommodation proof, and evidence of onward travel.
- **2 May 2027:** travel from Osaka with the passport and Korean entry authorization if required.
- **5 May 2027:** travel from Seoul to Vancouver with the passport, Canadian eTA or visitor visa as applicable, and onward booking.
- **19 May 2027:** travel from Vancouver to Osaka.

Rules and exemption lists can change before 2027. Confirm on the official pages before applying, paying, booking, or travelling.
