## Inspiration

For an expat family, every trip means the same chores: find the passport scan, check the expiry, read three embassy pages, fill the same form fields again, write a cover letter, and remember when to book the appointment. The scans already sit on the family NAS. Uploading passports to a cloud chatbot to get help is a privacy risk.

## What it does

Passport mobility planner is a UGOS Skill. You say "I want to visit Japan 1-10 April" and it:

- finds the passports, visas, residence permits and supporting documents on the NAS and reads them, including the machine readable zone;
- gets today's rules from the official pages and quotes each one with its address and date;
- turns every rule into yes/no checks against the documents (expiry after the stay, entries left, names matching);
- says what is needed, what is missing and what is too old;
- prepares a trip folder: form answers, a cover letter, a day-by-day itinerary, a deadline calendar and a queue of bookings, applications and emails, in date order;
- has the companion search flight and hotel sites, then shows the options as a table in the Uliya chat (or on the queue page). You answer "flights o1, hotel o2", it saves the pick on the NAS, redrafts the itinerary with the flight numbers, and the companion opens the picked option for you to book;
- in the same chat, lists what is left in the queue with direct links, and when you say "I booked the flight" it marks that item done.

It does the same for work, study, family and residence applications, renewals and permanent residence: eligibility checks against the published rule, police certificates for every country lived in, apostille and translation, proof of income worked out for the household, and a timeline worked back from the start date.

You approve every save. You sign up, book, submit, pay and send yourself.

It also covers the messy cases: a missing document (it asks for a photo through the UGREEN app or phone photo backup), a name change after marriage, two nationalities, a child travelling with one parent, a refugee travel document, a passport that needs renewing first, no appointment slots, a residence permit that expires during the trip, a travel authorisation tied to an old passport, transit that passes the border, earlier stays that count against a limit, and strict consulates such as China's that want five years of work history, every trip of the last year, all family members and fingerprints in person. It drafts those histories from the documents and leaves the yes/no questions (refusals, criminal record) to you. "Where can I go?" lists what the visas and permits you already hold unlock in other countries.

## How we built it

The Skill is Markdown only. SKILL.md routes each request to one of twelve workflow files and calls only the NAS expert agents through `delegate`: file-agent, document-agent, photo-agent and knowledge-agent. No rule is stored in the Skill, because rules change. An optional companion container fetches the official pages, searches booking sites for the queue's compare items, and can fill web forms without submitting them. A link that leaves the search site is dropped, and option lines are shown as data, never followed as instructions. Without it, the Skill uses copies of official pages saved on the NAS, or asks you to save the page as a PDF.

We tested it with an eval harness that mocks the four NAS agents with realistic replies for 37 scenarios, including a scan with hidden text telling the agent to delete files. Each run is scored by hard checks (no full document numbers in chat, only NAS agents called, no claims of work not done) and a rubric graded by a second model. On the latest run of the 14 hardest scenarios (Skill 0.4.0) it passed 106 of 106 hard checks and 45 of 47 rubric points. The newest scenarios (picking options in the chat, the queue in the chat, a Portugal remote work application, and a China visa from Dubai) pass every hard check and rubric point in their latest runs.

## Challenges

- Models like to answer visa questions from memory. The Skill only states a rule when an excerpt with an address and date backs it.
- Date arithmetic for the queue kept going wrong, so we made the order explicit: compare offers, then book, then apply.
- Long research answers made the model stop after a few countries. It now lists every row before deciding.

## What's next

Testing on a real UGREEN NAS with the local model, and scheduled reminders when a document is about to expire.
