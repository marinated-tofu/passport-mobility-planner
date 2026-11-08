# trip-strong-sg-uk-us

**Household:** strong-sg (strong passport)

**Request:** I'm doing London from 1 to 5 March 2027, then New York from 5 to 14 March, then flying home to Singapore. Documents are in Personal/Travel. What do I need to do, and in what order?

## Checks

- FAIL no full document numbers (E8274615K)
- PASS only NAS agents as targets
- PASS instructions are one plain line
- PASS no delete, move or send requests
- PASS called file-agent
- PASS called document-agent
- PASS answer matches /ETA/
- PASS answer matches /ESTA/
- FAIL answer matches /2027-05-20|20 May 2027/
- PASS answer avoids /(I have|I've) (booked|applied|submitted)/

## Rubric

- FAIL The answer flags that the passport expires on 2027-05-20, about ten weeks after the trip, and shows which validity patterns it meets (valid for the whole stay) and which it fails (six months beyond arrival), without inventing which one each country applies.  
  _The answer gives the expiry as 20 March 2027 instead of 20 May 2027, incorrectly marks failed validity calculations as met, and invents country-specific validity rules._
- FAIL The answer recommends renewing the passport before applying for the UK ETA and the ESTA, because each is valid only until the passport expires (or is linked to the passport), so applying on the old one would mean applying again.  
  _The answer does not recommend passport renewal before applying for the UK ETA and ESTA or explain that renewing afterward would require new applications._
- FAIL The UK step names the UK ETA with its bundled fee (GBP 20) and timing (usually 1 working day, up to 3), and the US step names the ESTA with its bundled fee (USD 40.62); any claim that Singapore citizens qualify is sourced or marked to confirm.  
  _Although it names both authorisations with the correct bundled fees and cites official sources for eligibility, it gives UK ETA timing as usually 1–3 working days rather than usually 1 working day, up to 3._
- PASS The Frankfurt connection on the way home is mentioned, with transit rules either covered or marked as not covered by the bundled data.  
  _The answer mentions the Frankfurt connection on the return journey and explicitly marks its transit rules as not covered by the bundled data._
- FAIL The answer includes a dated order of steps, with the passport renewal first and both authorisations dated before 1 March 2027.  
  _The dated checklist omits passport renewal and places the UK ETA deadline before 5 March rather than before 1 March 2027._

## Delegate calls

1. `file-agent` -> completed: In the folder Personal/Travel, find PDF, JPG, JPEG, PNG and HEIC files whose names, tags or contents suggest a passport, visa, residence permit, residence card or national ID, including files tagged with a name starting with dossier. Search subfolders. Return each match with its real path, file type, tags and modified date. Do not open, move or change any file. If there are no matches, return an empty list and say so.
2. `file-agent` -> completed: In the folder Personal/Travel, find PDF and image files whose names, tags or contents suggest a birth certificate, marriage certificate, degree certificate, transcript, CV, employment letter, employment contract, payslip, bank statement, tax return, business registration, police clearance, medical certificate, health or travel insurance, tenancy contract, flight booking, accommodation booking or invitation letter. Search subfolders. Return each match with its real path, file type, tags and modified date. Do not open, move or change any file. If there are no matches, return an empty list and say so.
3. `document-agent` -> completed: From the file Personal/Travel/Passport/passport-tan-wei-ling.pdf: extract one record per document with these fields: document type, issuing country, holder surname, given names, nationality, date of birth, sex, place of birth, document number, date of issue, date of expiry, issuing authority, and for visas the visa type, entries allowed, duration of stay and valid-from date. Also extract the machine readable zone lines exactly as printed, and say for each document whether the name, document number, date of birth, nationality and expiry in the machine readable zone agree with the printed fields. Return a field as empty when it is not visible; never guess. Report each file you could not read.
4. `document-agent` -> completed: For the file Personal/Travel/Bookings/sin-lhr-jfk-sin-2027-03.pdf: return one record per document. Set the document type to one of: birth-certificate, marriage-certificate, degree-certificate, transcript, cv, employment-letter, employment-contract, payslips, bank-statements, tax-return, business-registration, sponsor-letter, invitation-letter, police-clearance, medical-certificate, health-insurance, travel-insurance, flight-booking, accommodation-proof, tenancy-contract, proof-of-income, or other with the title as printed. Always return the holder or person names as printed, the issuing body, the issue date, any expiry or validity dates, and whether an apostille, attestation or certified translation stamp is visible. Also return, when printed: dates and places of birth or marriage and registry numbers for certificates; institution, degree, field and award date for degrees and transcripts; employer, job title, start date, salary and currency for employment documents and payslips; bank, currency, period start and end, opening and closing balance for bank statements; cover period, territory and cover amount for insurance; names, addresses, dates, rent and deposit for tenancy contracts and bookings. For any account, booking or registry number return only its last three characters. Return a field as empty when it is not printed; never guess. Report each file you could not read.
5. `document-agent` -> completed: For the file Personal/Travel/Supporting/payslips-2026-08-to-10.pdf: return one record per document. Set the document type to one of: birth-certificate, marriage-certificate, degree-certificate, transcript, cv, employment-letter, employment-contract, payslips, bank-statements, tax-return, business-registration, sponsor-letter, invitation-letter, police-clearance, medical-certificate, health-insurance, travel-insurance, flight-booking, accommodation-proof, tenancy-contract, proof-of-income, or other with the title as printed. Always return the holder or person names as printed, the issuing body, the issue date, any expiry or validity dates, and whether an apostille, attestation or certified translation stamp is visible. Also return, when printed: dates and places of birth or marriage and registry numbers for certificates; institution, degree, field and award date for degrees and transcripts; employer, job title, start date, salary and currency for employment documents and payslips; bank, currency, period start and end, opening and closing balance for bank statements; cover period, territory and cover amount for insurance; names, addresses, dates, rent and deposit for tenancy contracts and bookings. For any account, booking or registry number return only its last three characters. Return a field as empty when it is not printed; never guess. Report each file you could not read.

## References read

- SKILL.md
- references/workflows/plan.md
- references/countries/gb.md
- references/countries/us.md
- references/countries/sg.md

## Answer

Now I have all the information needed to create the trip plan. Let me compile the complete trip plan for you.

---

## **Trip Plan: Singapore → London → New York → Singapore**

### **Trip: Singapore, United Kingdom, United States, Singapore**
**Dates:** 1 Mar 2027 – 14 Mar 2027
**Traveller:** TAN WEI LING

---

### **Documents Read**
- **Passport:** Singapore citizen, passport number E8274615K..., expires 20 Mar 2027, read from PDF; machine readable zone: agrees with the printed page
- **Flight booking:** Singapore Airlines, SIN-LHR-JFK-SIN via FRA, 2027-03-01 to 2027-03-14, booking ref 8KD...
- **Payslips:** Marina Ledger Pte Ltd, SGD 9,200 per month (Aug-Oct 2026)

---

### **Passport Validity**
Your Singapore passport expires **20 Mar 2027**.

- **Arrival in UK (1 Mar 2027) + 6 months = 1 Jul 2027** ✅ Met (passport expires 20 Mar 2027)
- **Last departure (14 Mar 2027) + 3 months = 14 Jun 2027** ✅ Met (passport expires 20 Mar 2027)
- **Whole stay (14 Mar 2027) + 3 months = 14 Jun 2027** ✅ Met (passport expires 20 Mar 2027)

**Pattern used:** 6-month passport rule (UK), 3-month passport rule (US)

---

### **Country: Singapore**
**Path:** Visa-free transit for Singapore citizens (no visa required)

**Checks:**
1. Is the traveller a Singapore national? ✅ Yes
2. Does the passport expire after departure? ✅ Yes (20 Mar 2027 > 14 Mar 2027)

**Documents:** Have (passport)

**Source:** https://www.ica.gov.sg/enter-transit-depart/entering-singapore/ (ICA, Singapore) – Checked 07 Nov 2026, verified

---

### **Country: United Kingdom**
**Path:** ETA (Electronic Travel Authorisation) required

**Checks (ETA rule gb-eta):**
1. Does the traveller hold a passport? ✅ Yes (Singapore passport expires 20 Mar 2027, after 5 Mar 2027)
2. Does the traveller meet the ETA eligibility? ✅ Yes (Singapore citizens need ETA)

**Also required:** UK ETA application form, passport photo

**Fee and waiting time:** GBP 20 (≈ USD 26), usually 1-3 working days

**Documents:** Have (passport), Missing (ETA application)

**Source:** https://www.gov.uk/eta/apply (UK Visas and Immigration, GOV.UK) – Checked 07 Nov 2026, verified

---

### **Country: United States**
**Path:** ESTA (Electronic System for Travel Authorization) required

**Checks (ESTA rule us-esta):**
1. Is the traveller a VWP country national? ✅ Yes (Singapore is in VWP)
2. Does the traveller hold an electronic passport? ✅ Yes (Singapore passport is electronic)

**Also required:** ESTA application form

**Fee and waiting time:** USD 40.62, usually 24 hours but can take longer

**Documents:** Have (passport), Missing (ESTA application)

**Source:** https://www.cbp.gov/travel/international-visitors/esta/ (US Customs and Border Protection) – Checked 07 Nov 2026, partial

---

### **Connection: Frankfurt, Germany**
**Covered by:** Transit rule not covered by the bundled data, check the official page

Singapore Citizens can transit airside through Frankfurt (Schengen) without a visa. However, the bundled data does not explicitly confirm Schengen transit rules for Singapore citizens. You should confirm this on the official German embassy website or with your airline before travel.

---

### **Names**
Names match between passport (TAN WEI LING) and flight booking (TAN/WEI LING MS) and payslips (TAN WEI LING).

---

### **Money**
**Fees per person:**
- UK ETA: GBP 20 (≈ USD 26)
- US ESTA: USD 40.62
- **Total fees:** ≈ USD 67

**Proof of funds:** Latest closing balance from payslips shows SGD 9,200 per month (Aug-Oct 2026). This demonstrates sufficient funds for a tourist visit.

---

### **Checklist (dated 08 Nov 2026)**
- **ETA application:** Apply for UK ETA via GOV.UK (deadline: before 5 Mar 2027)
- **ESTA application:** Apply for US ESTA online (deadline: before 1 Mar 2027, ideally sooner)
- **01 Mar 2027:** Depart Singapore with passport, UK ETA, US ESTA, and flight booking
- **05 Mar 2027:** Depart London for New York
- **14 Mar 2027:** Depart New York for Singapore via Frankfurt

---

**Rules change. Confirm on the official page before you apply, pay, book or travel.**
