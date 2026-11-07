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

- FAIL The passport is read from the photo by text recognition, and the answer confirms the machine readable zone agrees with the printed page or reports that it checked it.  
  _The photo-agent performed text recognition with instructions to preserve the MRZ, but the answer never confirms that the MRZ was checked or agrees with the printed page._
- PASS For Canada, the answer names the eTA for arrival by air with its bundled fee (CAD 7) and timing (most approved within minutes), and says to get it before booking or before flying; any claim that Japanese citizens are visa-exempt is sourced or marked to confirm.  
  _The answer identifies Canada's eTA for arrival by air, gives the CAD 7 fee and usual approval within minutes, directs the user to carry the required authorisation before flying on 5 May, and marks Japan's visa-exempt status for confirmation._
- PASS For Korea, the answer names the K-ETA (KRW 10,000 plus a payment charge) and passes on the bundled caveat that Korea has waived it for some nationalities and the current exemption list was not checked, so he should confirm.  
  _The answer names K-ETA, quotes KRW 10,000 plus a 3% payment charge, and flags Japan's temporary exemption as unverified for May 2027 with instructions to confirm._
- PASS Neither country is turned into a visa application.  
  _The answer discusses visa-waiver eligibility and electronic travel authorisations without directing the user to apply for a visa for either country._
- FAIL The answer ends with a dated checklist before 2 May 2027.  
  _The answer does not end with a dated checklist before 2 May 2027; its checklist includes a 5 May deadline and is followed by fees, a folder-path question, and a general warning._

## Delegate calls

1. `file-agent` -> completed: In Personal/Travel, find PDF, JPG, JPEG, PNG and HEIC files whose names, tags or contents suggest a passport, visa, residence permit, residence card or national ID, including files tagged with a name starting with dossier. Search subfolders. Return each match with its real path, file type, tags and modified date. Do not open, move or change any file. If there are no matches, return an empty list and say so.
2. `photo-agent` -> completed: Run text recognition on Personal/Travel/Passport/passport-photo-page.jpg and return the full recognised text for the image, keeping the two or three machine readable zone lines at the bottom intact and in order. Report if no text was recognised.
3. `file-agent` -> completed: In Personal/Travel, find PDF and image files whose names, tags or contents suggest a birth certificate, marriage certificate, degree certificate, transcript, CV, employment letter, employment contract, payslip, bank statement, tax return, business registration, police clearance, medical certificate, health or travel insurance, tenancy contract, flight booking, accommodation booking or invitation letter. Search subfolders. Return each match with its real path, file type, tags and modified date. Do not open, move or change any file. If there are no matches, return an empty list and say so.
4. `document-agent` -> completed: Read Personal/Travel/Bookings/kix-icn-yvr-2027-05.pdf and Personal/Travel/Supporting/hotel-vancouver-2027-05.pdf. Return one record per document with document type, person names as printed, issuing body, issue date, expiry or validity dates, and whether an apostille, attestation or certified translation stamp is visible. Return flight dates, airports, all connections, and arrival and departure details; for accommodation return names, addresses, check-in and check-out dates, rent or price and deposit when printed. For any booking, account or registry number return only its last three characters. Leave fields empty when not printed; never guess. Report each file you could not read.

## References read

- SKILL.md
- references/workflows/plan.md
- references/topics/entry-conditions.md
- references/report-format.md
- references/topics/document-fields.md
- references/options/visitor-and-nomad.md
- references/official-sources.md
- references/workflows/library.md

## Answer

**Kenji Sato — Needs action:** your passport and saved bookings cover the trip dates. The remaining paperwork is to confirm Canada’s eTA requirement and South Korea’s K-ETA and arrival-form requirements **for May 2027**. I’ve treated this as a tourism trip.

I used the installed passport-mobility-planner skill to read `Personal/Travel`. I found your Japanese passport, expiring **11 Jun 2034**, your flights on **2, 5 and 19 May 2027**, and your Vancouver hotel booking for **5–19 May**. The names agree across those documents. All three files were readable.

| Destination | Paperwork to arrange or check |
|---|---|
| **South Korea, 2–5 May** | **Needs checking:** the bundled rules do not establish the Japanese-passport visa waiver or whether Japan’s temporary K-ETA exemption covers May 2027. Confirm those first. If K-ETA is required, the recorded application needs a passport, applicant photo and online form; processing is usually within **72 hours**, costing **KRW 10,000 plus 3%**. Also confirm whether you must complete an arrival declaration, including whether holding K-ETA changes that requirement. Sources: [K-ETA](https://www.k-eta.go.kr/portal/guide/viewetaapplication.do) and [Korea Immigration Service](https://www.immigration.go.kr/immigration_eng/1832/subview.do), bundled information checked **7 Nov 2026**; exemption and arrival-form details remain unverified. |
| **Canada, 5–19 May** | **Needs checking:** confirm Japan’s inclusion in Canada’s visa-exempt category on IRCC’s official site; the bundled eTA summary does not include the nationality list. Visa-exempt foreign nationals arriving by air need an **eTA**. No eTA approval was found in your folder. The recorded fee is **CAD 7**; most approvals arrive within minutes, but some take several days. Apply using the passport you will carry. Source: [IRCC eTA information](https://www.canada.ca/en/immigration-refugees-citizenship/services/visit-canada/eta/facts.html), checked **7 Nov 2026**. |

Your passport comfortably meets both screening benchmarks for each stop: six months beyond arrival (**2 Nov / 5 Nov 2027**) and three months beyond departure (**5 Aug / 19 Aug 2027**). These are screening benchmarks; each country determines its actual requirement. Confirm through [Korea Immigration](https://www.immigration.go.kr/immigration_eng/1832/subview.do) and [IRCC](https://www.canada.ca/en/immigration-refugees-citizenship/news.html); sources reviewed **7 Nov 2026**.

Your practical checklist is:

- **Now:** confirm the nationality and authorisation rules in the table, and check whether you already have a valid Canadian eTA linked to this passport. If you need a new one, apply early; the bundled processing estimate does not provide a guaranteed deadline. [IRCC](https://www.canada.ca/en/immigration-refugees-citizenship/services/visit-canada/eta/facts.html), checked **7 Nov 2026**.
- **By 22 Apr 2027:** if K-ETA is required, submit it. This planning date allows the recorded 72-hour processing time plus a week before departure. [K-ETA](https://www.k-eta.go.kr/portal/guide/viewetaapplication.do), checked **7 Nov 2026**.
- **Before 2 May 2027:** recheck Korea’s arrival-form instructions and carry your passport and flight itinerary, including the onward flight to Vancouver. Add your Seoul accommodation address and confirmation: none was found in the folder. [Korea Immigration](https://www.immigration.go.kr/immigration_eng/1832/subview.do), checked **7 Nov 2026**; exact declaration requirements need confirmation.
- **Before 5 May 2027:** carry your passport, required Canadian authorisation, Vancouver hotel confirmation and **19 May** departure itinerary. [IRCC](https://www.canada.ca/en/immigration-refugees-citizenship/services/visit-canada/eta/facts.html), checked **7 Nov 2026**.

**Conditional application fees:** CAD 7 for a new Canadian eTA, plus KRW 10,300 if K-ETA is required, at the recorded rates above. Affordability was not checked. No bank statements or travel insurance were found.

I searched the named folder only; document photos elsewhere in your photo library can also be included. **If you have an official-rules library on the NAS, what is its folder path?** That would let me check for copies covering the unresolved nationality, exemption and arrival-form rules.

Rules change. Confirm on the official page before you apply, pay, book or travel.
