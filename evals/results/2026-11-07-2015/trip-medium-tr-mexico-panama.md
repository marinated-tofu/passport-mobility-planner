# trip-medium-tr-mexico-panama

**Household:** medium-tr (medium passport)

**Request:** I want to go from Istanbul to Mexico City on 10 February 2027 for ten days, then to Panama City until the 26th, then home. The cheap flights connect in Frankfurt or in Houston. Which should I book, and what do I need? Documents are in Personal/Travel.

## Checks

- PASS no full document numbers
- PASS only NAS agents as targets
- PASS instructions are one plain line
- PASS no delete, move or send requests
- PASS called file-agent
- PASS called document-agent
- PASS answer matches /FMM/
- PASS answer matches /Panama/
- PASS answer avoids /(I have|I've) (booked|applied|submitted)/

## Rubric

- PASS The answer says his valid US B1/B2 visa (to 2029-04-10) lets him enter Mexico without a Mexican visa, with the FMMd form, and that the bundled rule is partial so he should confirm with the consulate.  
  _The answer identifies the US B1/B2 visa valid until 10 April 2029 as permitting Mexican entry under the visa exemption, mentions FMMd, and flags the bundled rule as partial with consular confirmation required._
- PASS The answer says the same US visa lets him enter Panama without a Panamanian visa, for tourist stays up to 90 days.  
  _The Panama entry explicitly says the current US visa matches the visa exemption and cites tourist stays up to 90 days._
- FAIL For the connection, the answer says the Houston connection is covered by his valid US visa, and that Frankfurt transit rules for Turkish citizens are not in the bundled data (or need checking), rather than declaring Frankfurt fine.  
  _Although Frankfurt transit eligibility is correctly left unverified, the answer also leaves Houston eligibility unresolved instead of saying the valid US visa covers that connection._
- PASS The answer checks that both the passport (2030) and the US visa (2029) stay valid for the whole trip.  
  _The answer gives the passport expiry in 2030 and visa expiry in 2029, checks passport validity against dates beyond the visit, and explicitly states that the US visa remains valid throughout the trip._
- FAIL The answer ends with a dated checklist that includes the FMMd before the Mexico arrival.  
  _The dated checklist places the Mexican migration-form procedure on 10 February rather than explicitly requiring FMMd before arrival, and the answer ends with other material after the checklist._

## Delegate calls

1. `file-agent` -> completed: In Personal/Travel, find PDF, JPG, JPEG, PNG and HEIC files whose names, tags or contents suggest a passport, visa, residence permit, residence card or national ID, including files tagged with a name starting with dossier. Search subfolders. Return each match with its real path, file type, tags and modified date. Do not open, move or change any file. If there are no matches, return an empty list and say so.
2. `document-agent` -> completed: From Personal/Travel/Pasaport/pasaport-emre.pdf and Personal/Travel/Vize/us-visa-b1b2.pdf, extract one record per document with these fields: document type, issuing country, holder surname, given names, nationality, date of birth, sex, place of birth, document number, date of issue, date of expiry, issuing authority, and for visas the visa type, entries allowed, duration of stay and valid-from date. Also extract the machine readable zone lines exactly as printed, and say for each document whether the name, document number, date of birth, nationality and expiry in the machine readable zone agree with the printed fields. Return a field as empty when it is not visible; never guess. Report each file you could not read.
3. `file-agent` -> completed: In Personal/Travel, find PDF and image files whose names, tags or contents suggest a birth certificate, marriage certificate, degree certificate, transcript, CV, employment letter, employment contract, payslip, bank statement, tax return, business registration, police clearance, medical certificate, health or travel insurance, tenancy contract, flight booking, accommodation booking or invitation letter. Search subfolders. Return each match with its real path, file type, tags and modified date. Do not open, move or change any file. If there are no matches, return an empty list and say so.
4. `document-agent` -> completed: For Personal/Travel/Supporting/employment-letter-2026.pdf, return one record per document. Set the document type to one of: birth-certificate, marriage-certificate, degree-certificate, transcript, cv, employment-letter, employment-contract, payslips, bank-statements, tax-return, business-registration, sponsor-letter, invitation-letter, police-clearance, medical-certificate, health-insurance, travel-insurance, flight-booking, accommodation-proof, tenancy-contract, proof-of-income, or other with the title as printed. Always return the holder or person names as printed, the issuing body, the issue date, any expiry or validity dates, and whether an apostille, attestation or certified translation stamp is visible. Also return when printed employer, job title, start date, salary and currency for employment documents. For any account, booking or registry number return only its last three characters. Return a field as empty when it is not printed; never guess. Report each file you could not read.
5. `document-agent` -> completed: For Personal/Travel/Pasaport/pasaport-emre.pdf and Personal/Travel/Vize/us-visa-b1b2.pdf, explicitly check whether name, document number, date of birth, nationality and expiry in any visible machine readable zone agree with the printed fields. Return agrees, disagrees with both values, or not checkable for each field and document. If a machine readable zone is not visible state so. Do not infer absent data.

## References read

- SKILL.md
- references/workflows/plan.md
- references/topics/entry-conditions.md
- references/report-format.md
- references/benefits/visa-held.md
- references/benefits/transit.md
- references/official-sources.md
- references/workflows/library.md
- references/options/visitor-and-nomad.md

## Answer

**My provisional choice is Frankfurt on a single through-ticket, provided the airline confirms you can make the connection without entering Germany and that your documents meet its transit requirements. Neither itinerary is cleared for booking yet:** the rules available here cover Mexico and Panama, but do not cover German or US transit. Your valid US visa makes Houston worth considering; it does not by itself establish that the exact connection works.

I can compare your documents and the saved rules, but cannot check live fares or book flights.

I’ve assumed tourism, Mexico City **10–20 Feb 2027**, Panama City **20–26 Feb**, then Istanbul. If your flight arrives in Mexico on 11 February, move the Panama flight to 21 February to preserve ten nights.

**Emre Yilmaz — Needs action before booking.** In Personal/Travel I found:

- Turkish passport, expiring **1 Aug 2030**.
- US **B1/B2, multiple-entry visa**, valid until **10 Apr 2029**.
- Employment letter dated **18 Oct 2026**.

Your name, birth date and nationality agree across the passport and visa. The passport’s returned machine-readable fields agree with its printed details; the visa’s machine-readable zone was not returned, so that cross-check remains incomplete. No files were reported unreadable.

| Part of the trip | What your documents support | What still needs checking |
|---|---|---|
| **Mexico** | The bundled official consulate page permits entry with a valid US visa and a passport valid throughout the visit. | **Confirm with the Mexican consulate covering Türkiye.** The rule is marked partial because consulates describe conditions differently, including whether the visa must previously have been used. Prior US entry is not established by your files. The page also calls for the digital migration form, FMMd, and does not establish your permitted stay length. [Mexican consulate source](https://consulmex.sre.gob.mx/montreal/index.php/es/enterate/7-servicios-consulares/servicios-a-extranjeros/159-turistasnuevoesp), checked **7 Nov 2026**. |
| **Panama** | Your current US visa matches the bundled exemption for visa-required nationals holding a valid qualifying visa; the page cites tourist stays up to **90 days**. | Confirm the current entry checklist, including passport validity, onward travel and financial evidence. [Panama Migration source](https://www.migracion.gob.pa/plantilla-tramite-migratorio-v-tet-variante-273-borrador-2/), checked **7 Nov 2026**. |
| **Frankfurt** | No German visa or residence permit was found. | German airport-transit requirements and any exemption for your US visa are **not covered**. Confirm the exact itinerary, including baggage collection, terminal changes, overnight access and any need to enter Germany. [German official source](https://www.bmi.bund.de/EN/press/press-node.html), listed **7 Nov 2026**; transit eligibility unverified. |
| **Houston** | You hold a US visa valid throughout the trip. | US transit procedure and whether your B1/B2 covers this exact routing are **not covered**. Check both outbound and return connections. [US official source](https://travel.state.gov/content/travel/en/News/visas-news.html), listed **7 Nov 2026**; transit eligibility unverified. |

Your passport comfortably exceeds both common validity benchmarks: Mexico arrival plus six months is **10 Aug 2027**, and departure plus three months is **20 May 2027**; Panama’s corresponding dates are **20 Aug** and **26 May 2027**. These calculations do not substitute for each country’s actual rule.

**What to prepare:** original passport and US visa, onward flights Mexico–Panama and Panama–home, accommodation details, recent evidence of funds, and travel insurance covering both destinations. Only the employment letter was found among supporting documents; bookings, bank statements and insurance were not found. Blank passport pages and physical condition also need checking.

**Dated checklist:**

- **7 Nov 2026, before paying:** resolve Mexico’s consular conditions and transit eligibility for every connection.
- **By 3 Feb 2027:** assemble tickets, accommodation, current financial evidence and insurance; recheck official requirements.
- **10 Feb 2027:** carry the originals and follow the confirmed Mexican migration-form procedure.
- **20 Feb 2027:** carry Panama entry evidence and the onward ticket for 26 February.

No new visa application is established as necessary yet. **Additional document fees and processing times remain unconfirmed**, and affordability was not checked.

**Please send the two flight itineraries—including airlines, connection times and whether they are separate tickets—and the NAS folder containing your official-rules library, if you have one.** That is the missing information needed for a firm booking recommendation. I searched Personal/Travel only; document photos can also be included.

Rules change. Confirm on the official page before you apply, pay, book or travel.
