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
  _A completed photo-agent call requested text recognition, but the answer never confirms that the machine readable zone agrees with the printed page or says it checked that agreement._
- PASS For Canada, the answer names the eTA for arrival by air with its bundled fee (CAD 7) and timing (most approved within minutes), and says to get it before booking or before flying; any claim that Japanese citizens are visa-exempt is sourced or marked to confirm.  
  _For the flight to Canada, the answer names the eTA, gives the CAD 7 fee and approval timing of usually minutes, instructs applying before booking, and links an official Canadian source._
- FAIL For Korea, the answer names the K-ETA (KRW 10,000 plus a payment charge) and passes on the bundled caveat that Korea has waived it for some nationalities and the current exemption list was not checked, so he should confirm.  
  _The answer names K-ETA and KRW 10,000 but omits the additional payment charge and the explicit caveat that some nationalities have an exemption whose current list was not checked._
- FAIL Neither country is turned into a visa application.  
  _The answer presents Japanese citizens as generally requiring a Korean visa and directs the user to consider applying for a short-term visit visa._
- FAIL The answer includes a dated checklist, with the K-ETA done before the 2 May flight and the eTA before the 5 May flight.  
  _Although the itinerary is dated, the action checklist does not set K-ETA completion before the 2 May flight and eTA completion before the 5 May flight._

## Delegate calls

1. `file-agent` -> completed: In the folder Personal/Travel, find PDF, JPG, JPEG, PNG and HEIC files whose names, tags or contents suggest a passport, visa, residence permit, residence card or national ID, including files tagged with a name starting with dossier. Search subfolders. Return each match with its real path, file type, tags and modified date. Do not open, move or change any file. If there are no matches, return an empty list and say so.
2. `photo-agent` -> waiting_user: Run text recognition on Personal/Travel/Passport/passport-photo.jpg, and return the full recognised text for the image, keeping the two or three machine readable zone lines at the bottom intact and in order. Report each image where no text was recognised.
3. `photo-agent` -> completed: Run text recognition on Personal/Travel/Passport/passport-photo-page.jpg, and return the full recognised text for the image, keeping the two or three machine readable zone lines at the bottom intact and in order. Report each image where no text was recognised.

## References read

- SKILL.md
- references/workflows/plan.md
- references/countries/jp.md
- references/countries/kr.md
- references/countries/ca.md
- references/topics/entry-conditions.md

## Answer

Now I have all the necessary information to analyze the travel paperwork requirements for your trip. Let me compile a summary:

---

## Travel Paperwork Summary for Your Trip (May 2027)

**Passport:** Japanese passport (SATO KENJI)
- Expiry: 11 JUN 2034 (well beyond your travel dates)
- Valid for all countries on your route

---

### **Leg 1: Osaka (Japan) → Seoul (South Korea), May 2-4, 2027**

**Required Documents:**
1. **Valid passport** - Your Japanese passport is valid through 2034 ✓
2. **Visa status for South Korea** - Japan citizens generally require a visa to enter South Korea for tourism. You will need to:
   - Check if you qualify for visa exemption or apply for a short-term visit visa
   - If visa-waiver eligible, apply for a **K-ETA** (Electronic Travel Authorization)
   - K-ETA fee: ~KRW 10,000 (about USD 7), processing typically 72 hours
   - K-ETA validity: 3 years

**Standard Entry Requirements:**
- Return/onward ticket (your flight to Vancouver)
- Confirmed accommodation in Seoul
- Proof of funds (bank statements showing sufficient funds for the stay)

---

### **Leg 2: Seoul (South Korea) → Vancouver (Canada), May 5-19, 2027**

**Required Documents:**
1. **Valid passport** - Your Japanese passport is valid through 2034 ✓
2. **Canadian eTA (Electronic Travel Authorization)** - **Mandatory for Japan citizens**
   - Fee: **CAD 7** (about USD 5)
   - Processing: Most approved within minutes
   - Validity: Up to 5 years (or until passport expires)
   - Application: Online before booking flight
   - Source: [Canada eTA official page](https://www.canada.ca/en/immigration-refugees-citizenship/services/visit-canada/eta/facts.html)

**Standard Entry Requirements:**
- Confirmed onward ticket (your flight back from Vancouver)
- Confirmed accommodation in Vancouver
- Proof of funds (bank statements showing sufficient funds for the stay)

---

### **Transit Considerations**

Since you're traveling through South Korea with a Canadian destination, you may qualify for South Korea's third-country transit program (up to 30 days visa-free transit) if you have a valid Canadian eTA. However, since you're visiting South Korea for 3 days as part of your itinerary, you'll need a proper K-ETA or visa for Korea anyway.

---

### **Recommended Action Items**

1. **Apply for K-ETA for South Korea** - Check eligibility and apply online before travel
2. **Apply for Canadian eTA** - Apply online before booking your flight to Canada
3. **Prepare supporting documents** for both countries:
   - Confirmed flight bookings
   - Accommodation confirmations
   - Bank statements showing available funds

---

**Important Notes:**
- The Skill cannot confirm whether your specific documents meet all requirements
- Official rules can change; verify on official government websites before traveling
- The Canadian eTA must be applied for before booking your flight
- South Korea visa requirements for Japanese nationals should be confirmed on the Korean immigration website

Would you like me to search for additional supporting documents in your Personal/Travel folder that might help with these applications?
