# Prepare the trip on the NAS

After the plan route has worked out each application, do the paperwork the NAS can do, so the person is left only with what needs them: booking, paying, applying online, appointments, signatures and fingerprints. No NAS agent can book, pay, apply or contact an authority, so never offer to.

When to run: whenever the user asked to plan, prepare or sort out a trip and at least one application, form or missing document is on the plan. Do not ask first: each step below changes the NAS, so the NAS asks the user to approve it. If the user only asked whether they can go or which way is cheapest, end the reply with one line offering to prepare the trip folder, and stop.

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
- Form answers, one block per traveller and application: every field an application form asks that the documents answer. Surname, given names, sex, date and place of birth, nationality, passport issue and expiry dates and issuing authority, passport number ending in its last three characters followed by "copy the full number from the passport", home address, occupation, employer, job title and employer address, purpose of the trip, arrival and departure dates, first city or airport of entry, address of stay, earlier visas for the same country with their dates, who pays. Take each from the records read in steps 3 and 5; write "not found on the NAS" for a field none of them gives. Never guess.

Write it as one line of plain text: start each section with its heading and a colon, and leave out every document and account number beyond the last three characters.

```text
delegate --target knowledge-agent --instruction 'Save the text given as a new Markdown file named trip-plan in the folder [TRIP FOLDER], putting each section that starts with a heading and a colon under its own heading. Do not overwrite an existing file. Return the saved file path. Text: [PLAN AND FORM ANSWERS]'
```

## P3. Drafts of the letters the person writes

Only for documents an application asks for that are missing and that the person or their employer writes, never official documents such as bank statements, certificates or insurance:

- cover letter: purpose, dates, places, who pays, ties to home;
- day-by-day itinerary: from the dates, places and bookings found;
- request to the employer for an employment or leave letter;
- invitation letter for the host to sign, when a host is named.

One command for all drafts the trip needs:

```text
delegate --target document-agent --instruction 'Using only the facts in these files: [PATHS OF THE PASSPORT, EMPLOYMENT AND BOOKING DOCUMENTS] and these trip facts: [DESTINATIONS, DATES, PURPOSE, TRAVELLERS], draft each of these: [DRAFTS NEEDED, WITH THE APPLICATION EACH IS FOR]. Write (to fill) where a fact is missing; never invent one. Leave out every document and account number. Save each draft as a new file in the folder [TRIP FOLDER] named draft followed by its kind, without overwriting a file. Return each saved file path.'
```

## P4. Deadlines as a calendar file

One event per dated line of the checklist that falls after today: start-by dates, passport renewal, form deadlines, departure. The person imports the file into their calendar to get the reminders; the NAS has no alerts of its own.

```text
delegate --target file-agent --instruction 'Create a new file named trip-deadlines.ics in the folder [TRIP FOLDER], in iCalendar format, with one all-day event for each line here, each with a reminder 7 days before and 1 day before: [YYYY-MM-DD TITLE; YYYY-MM-DD TITLE]. Do not overwrite an existing file. Return the saved file path.'
```

## P5. Rules marked partial

If the user named a library folder, search it as in workflows/library.md for each rule on the plan marked partial, and use what it returns before writing the reply. Otherwise leave the rule marked "confirm on the source".

## Reporting

Report each step by its state in the reply's "Done on the NAS" section:

- completed: the path returned.
- waiting_approval: "waiting for your approval in the NAS app", and what it will create. Never say it is done.
- failed or cancelled: what did not happen and why; the step goes back on the person's checklist.

Steps that did not run because nothing needed them: leave them out.
