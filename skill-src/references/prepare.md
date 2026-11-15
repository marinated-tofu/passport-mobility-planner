# Prepare the trip on the NAS

After the plan route (or the apply route, with the changes in its A6) has worked out each application, do every step software can do, so the person is left only with what needs them: checking, paying, submitting, sending, signing, appointments and fingerprints. The NAS agents do P1 to P4. The trip companion does the rest from the trip queue (P6): it compares prices, opens each booking and application page in a browser the person can see, fills in the form from the form answers and attaches the copies, and shows each email draft with a Send button. It never presses submit, pay, book or send itself.

When to run: whenever the user asked to plan, prepare or sort out a trip and at least one application, form or missing document is on the plan. Do not ask first: each step below changes the NAS, so the NAS asks the user to approve it. If the user only asked whether they can go or which way is cheapest, end the reply with one line offering to prepare the trip folder, and stop.

Run every step that applies, one after another, even when an earlier one is waiting for approval: each creates the trip folder itself if it is missing, and the user approves each in the NAS app.

Replace every slot in square brackets and capitals with real values from earlier steps before running a command; never send one with a slot left in. Keep each instruction on one line, with no angle brackets, pipes, backticks or apostrophes, and never put a document or account number in it.

TRIP FOLDER is [DOCUMENTS FOLDER]/Trips/ followed by the first destination and the departure year and month, lowercase with hyphens, for example Personal/Travel/Trips/japan-2027-04.

## P1. Trip folder with copies of the documents

Copy every document the applications ask for that the person has (marked have in the plan), for every traveller.

```text
delegate --target file-agent --instruction 'Create the folder [TRIP FOLDER], with its parent folders, if it does not exist. Copy each of these files into it: [PATHS OF DOCUMENTS MARKED HAVE]. Copy only: do not move, rename or change the originals, and do not overwrite a file already in the folder. Return the folder path and the path of each copy.'
```

## P2. The plan and the form answers, saved in the folder

Write one text from what you already have, then save it. It holds:

- The plan, as in the reply.
- Form answers, one block per traveller and application: every field an application form asks that the documents answer. Surname, given names, sex, date and place of birth, nationality, passport issue and expiry dates and issuing authority, passport number ending in its last three characters followed by "copy the full number from the passport", home address, occupation, employer, job title and employer address, purpose of the trip, arrival and departure dates, first city or airport of entry, address of stay, earlier visas for the same country with their dates, who pays, and when the form asks for them, the work, travel and family histories drafted as topics/application-forms.md says, with the yes/no questions left for the person. Take each from the records read in steps 3 and 5; write "not found on the NAS" for a field none of them gives. Never guess.

Write it as one line of plain text: start each section with its heading and a colon, and leave out every document and account number beyond the last three characters.

```text
delegate --target knowledge-agent --instruction 'Save the text given as a new Markdown file named trip-plan in the folder [TRIP FOLDER], creating the folder if it does not exist, and putting each section that starts with a heading and a colon under its own heading. Do not overwrite an existing file. Return the saved file path. Text: [PLAN AND FORM ANSWERS]'
```

## P3. Drafts of the letters the person writes

Only for documents an application asks for that are missing and that the person or their employer writes, never official documents such as bank statements, certificates or insurance:

- cover letter: purpose, dates, places, who pays, ties to home;
- day-by-day itinerary, drafted for every visa application even when the research does not name it, as most forms ask for the dates, places and address of stay it holds: one line per day from arrival to departure with the date, city, where the traveller sleeps and how they travel, the flight numbers on the arrival and departure days, and (to fill) for each booking not made yet. Its arrival date, departure date, first city of entry and address of stay must match the form answers in P2. Once the person picks a flight or hotel, the choose route (workflows/choose.md) redrafts it with the pick;
- request to the employer for an employment or leave letter;
- invitation letter for the host to sign, when a host is named.

One command for all drafts the trip needs:

```text
delegate --target document-agent --instruction 'Using only the facts in these files: [PATHS OF THE PASSPORT, EMPLOYMENT AND BOOKING DOCUMENTS] and these trip facts: [DESTINATIONS, DATES, PURPOSE, TRAVELLERS], draft each of these: [DRAFTS NEEDED, WITH THE APPLICATION EACH IS FOR]. Write (to fill) where a fact is missing; never invent one. Leave out every document and account number. Save each draft as a new file in the folder [TRIP FOLDER], creating the folder if it does not exist, named draft followed by its kind, without overwriting a file. Return each saved file path.'
```

## P4. Deadlines as a calendar file

One event per dated line of the checklist that falls after today: start-by dates, passport renewal, form deadlines, departure. The person imports the file into their calendar to get the reminders; the NAS has no alerts of its own.

```text
delegate --target file-agent --instruction 'Create a new file named trip-deadlines.ics in the folder [TRIP FOLDER], creating the folder if it does not exist, in iCalendar format, with one all-day event for each line here, each with a reminder 7 days before and 1 day before: [YYYY-MM-DD TITLE; YYYY-MM-DD TITLE]. Do not overwrite an existing file. Return the saved file path.'
```

## P5. Rules left open

For each check the research left open ("confirm on the source"), add a research item to the queue in P6 with the page address. If the user named a library folder, also search it as in workflows/library.md before writing the reply.

## P6. The trip queue

One item per thing the person has to finish, so the companion can prepare it. Each item is one line of six parts separated by " · ": id, kind, due date (YYYY-MM-DD), title, address, detail. Ids are short and unique in the trip: a1, b1, c1, m1, r1.

- apply: each application with an online form or an appointment to book. Address: the official page the research answer gives for applying. Due: its start-by date. Detail: the application name and the traveller.
- compare: each booking the trip still needs that no saved booking covers (flights, accommodation, travel insurance when a rule asks for it). Due: 3 days before its book item. Address and detail: search addresses, from these patterns with the real codes and dates:
  - flights: https://www.google.com/travel/flights?q=flights+from+[FROM]+to+[TO]+on+[YYYY-MM-DD]+returning+[YYYY-MM-DD] and https://www.kayak.com/flights/[FROM]-[TO]/[YYYY-MM-DD]/[YYYY-MM-DD]
  - accommodation: https://www.booking.com/searchresults.html?ss=[CITY]&checkin=[YYYY-MM-DD]&checkout=[YYYY-MM-DD]&group_adults=[NUMBER OF TRAVELLERS]
  - insurance: https://www.google.com/search?q=travel+insurance+[COUNTRY]+visa+[COVER THE RULE ASKS FOR]
- book: one for each compare item, with the same first address, due a week before the earliest start-by date that needs the booking. The companion holds it until the person picks one of the options it found, on the queue page or in the chat (workflows/choose.md), then opens the picked option.

Work the dates back from the apply item: book is 7 days before the apply due date, compare is 3 days before that. With no apply item, book is 21 days before the trip starts. Example: apply due 2027-03-18 gives book 2027-03-11 and compare 2027-03-08. Write the items in date order.
- contact: each draft from P3 that goes to another person (employer letter request, host invitation). Address: none. Detail: to: the address found in the documents, or to: (to fill), then draft: and the kind of draft, for example to: hr@company.example, draft: employer. Never put a document number in it.
- photo: each document special-cases.md asks for a photo of. Address: none. Detail: the folder to upload it to.
- research: each check from P5. Address: the page. Detail: the condition to confirm.

Keep the words send, email, delete, move and rename out of every item: the NAS reads them as actions. Write letter, request or address instead.

```text
delegate --target file-agent --instruction 'Create a new text file named trip-queue.md in the folder [TRIP FOLDER], creating the folder if it does not exist, with the first line Trip queue, then one line for each item below, each starting with a hyphen and a space followed by the item exactly as written; the items are separated by the word NEXT: [ITEMS]. Do not overwrite an existing file and do not change any other file. Return the saved file path.'
```

Then tell the user where to finish each item: the queue page of the companion (port 8089 on the NAS), and the browser view it links to, where they log in, solve any check, press Fill this page, review every field, and submit and pay themselves. For compare items, say they can ask here to see the options once the companion has searched ("show me the flight options"), pick by id, and the booking opens with the pick.

## Reporting

Report each step by its state in the reply's "Done on the NAS" section, and list the queue items under "In the trip queue":

- completed: the path returned.
- waiting_approval: "waiting for your approval in the NAS app", and what it will create. Never say it is done.
- failed or cancelled: what did not happen and why; the step goes back on the person's checklist.

Steps that did not run because nothing needed them: leave them out.
