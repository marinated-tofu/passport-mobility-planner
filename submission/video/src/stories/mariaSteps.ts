import type {StepsStory} from '../Steps';
import durations from '../durations/maria-steps.json';

// evals/results/2026-11-12-1120/trip-medium-ph-japan.md (household evals/household.yaml). The queue page and the form are
// local test stand-ins captured from companion/agent.py: public/shots/queue-page.png and form-fill.png.
export const mariaSteps: StepsStory = {
  id: 'maria-steps',
  durations,
  run: 'eval run 2026-11-12',
  first: 'Maria',
  scenes: [
    {kind: 'intro', title: 'Tokyo in April: every small step', sub: 'Maria lives in Dubai on a Philippine passport. Her documents are on the family NAS.'},
    {
      kind: 'list',
      title: 'Every small step, and who does it',
      items: [
        {text: 'Find every travel document', who: 'nas'},
        {text: 'Read names, dates, numbers', who: 'nas'},
        {text: 'Check the passport zone', who: 'nas'},
        {text: 'Read the old visa photo', who: 'nas'},
        {text: 'Fetch the rules, live', who: 'companion'},
        {text: 'Turn rules into yes or no checks', who: 'nas'},
        {text: 'List what is missing', who: 'nas'},
        {text: 'Copy files to a trip folder', who: 'nas'},
        {text: 'Write the form answers once', who: 'nas'},
        {text: 'Draft the letters', who: 'nas'},
        {text: 'Calendar with every deadline', who: 'nas'},
        {text: 'Write the trip queue', who: 'nas'},
        {text: 'Compare flights and hotels', who: 'companion'},
        {text: 'Fill the application form', who: 'companion'},
        {text: 'Approve each NAS step', who: 'you'},
        {text: 'Pick, book and pay', who: 'you'},
        {text: 'Check, submit and pay', who: 'you'},
        {text: 'Press Send on the email', who: 'you'},
        {text: 'Appointment, passport, signature', who: 'you'},
        {text: 'Check the new visa', who: 'nas'},
      ],
    },
    {
      kind: 'call', short: 'Find documents', who: 'nas', agent: 'file-agent', title: 'Find the documents',
      command: "delegate --target file-agent --instruction 'In the folder Personal/Travel, find PDF, JPG, JPEG, PNG and HEIC files whose names, tags or contents suggest a passport, visa, residence permit or national ID...'",
      result: [
        {text: 'Passport/passport-maria-reyes.pdf', mono: true},
        {text: 'Visas/us-visa-b1b2.pdf · schengen-visa-france-2025.pdf', mono: true},
        {text: 'Visas/japan-visa-2024.jpg   (a phone photo)', mono: true},
        {text: 'UAE/residence-visa.pdf · emirates-id-front-back.jpg', mono: true},
      ],
      status: 'completed',
    },
    {
      kind: 'file', short: 'Read documents', who: 'nas', agent: 'document-agent', title: 'Read every document', path: 'records returned by the document agent',
      lines: [
        {text: 'Passport, Philippines · REYES, MARIA CLARA · ending 96B · expires 15 Mar 2031'},
        {text: 'US visa B1/B2 · multiple entry · expires 1 Jun 2030'},
        {text: 'Schengen visa, France · expired 1 Oct 2025', tone: 'red'},
        {text: 'UAE residence permit · expires 14 Jan 2028'},
        {text: 'Numbers come back as their last three characters only', tone: 'blue'},
      ],
    },
    {
      kind: 'mrz', short: 'Passport zone', who: 'nas', agent: 'document-agent', title: 'Check the machine readable zone',
      printed: [['Surname', 'REYES'], ['Given names', 'MARIA CLARA'], ['Nationality', 'PHL'], ['Date of birth', '12 Apr 1991'], ['Expiry', '15 Mar 2031'], ['Number', 'ending 96B']],
      zone: ['P<PHLREYES<<MARIA<CLARA<<<<<<<<<<<<<<<<<<<<<', '••••••96B•PHL9104127F3103155<<<<<<<<<<<<<<•4'],
      checks: [
        {text: 'Name: agrees', tone: 'green'},
        {text: 'Date of birth: agrees', tone: 'green'},
        {text: 'Nationality: agrees', tone: 'green'},
        {text: 'Expiry: agrees', tone: 'green'},
        {text: 'Number: agrees (shown masked)', tone: 'green'},
      ],
    },
    {
      kind: 'call', short: 'Old visa photo', who: 'nas', agent: 'photo-agent', title: 'Read the photo of the old Japan visa',
      command: "delegate --target photo-agent --instruction 'Run text recognition on each of these images: Personal/Travel/Visas/japan-visa-2024.jpg, Personal/Travel/UAE/emirates-id-front-back.jpg...'",
      result: [
        {text: 'Japan temporary visitor · single entry · 15 days'},
        {text: 'Expired 28 Jan 2025: it does not count for April 2027', tone: 'red'},
        {text: 'Emirates ID: name agrees with the passport', tone: 'green'},
      ],
      status: 'completed',
    },
    {
      kind: 'call', short: 'Research request', who: 'nas', agent: 'file-agent', title: 'Ask for the rules, live',
      command: "delegate --target file-agent --instruction 'Create in Personal/Travel/Requests a new text file named entry-jp-ph-2026-11-12.request.md containing exactly this one line: question: entry for a visit... · topic: entry · countries: JP · nationality: PH · held: US visa, UAE residence · dates: 2027-04-01 to 2027-04-10 · purpose: tourism'",
      result: [
        {text: 'The Skill stores no visa rules, fees or waiting times', tone: 'blue'},
        {text: 'The trip companion on the NAS picks up the request and fetches the official pages'},
        {text: 'No name, number or date of birth goes into the request'},
      ],
      status: 'completed',
    },
    {
      kind: 'file', short: 'Research answer', who: 'companion', title: 'The answer: quoted, with page and date', path: 'Requests/entry-jp-ph-2026-11-12.answer.md',
      lines: [
        {text: '## JP · Short-term stay visa', mono: true},
        {text: '> Fee: about JPY 15,000 (single entry), paid in local currency', mono: true},
        {text: '> Standard processing is five working days after the application is accepted', mono: true},
        {text: '> Eligibility: nationals who are not visa-exempt for short stays', mono: true},
        {text: 'Source: mofa.go.jp/j_info/visit/visa/ · fetched 12 Nov 2026', tone: 'blue', mono: true},
      ],
      status: ['answered', 'green'],
    },
    {
      kind: 'checks', short: 'Yes or no checks', who: 'nas', title: 'Turn the rules into checks',
      rows: [
        {kind: 'ok', title: 'Passport valid long enough', detail: 'expires 15 Mar 2031; arrival + 6 months is 1 Oct 2027'},
        {kind: 'no', title: 'Old Japan visa', detail: 'expired 28 Jan 2025'},
        {kind: 'no', title: 'Visa-free for a Philippine passport', detail: 'not in the excerpts: she is not visa-exempt'},
        {kind: 'arrow', title: 'Apply for a short-term stay visa', detail: 'about JPY 15,000 · about five working days · embassy, consulate or JAPAN eVISA'},
      ],
    },
    {
      kind: 'checks', short: 'What is missing', who: 'nas', title: 'Documents the application asks for',
      rows: [
        {kind: 'ok', title: 'Passport and photo', detail: 'on the NAS'},
        {kind: 'ok', title: 'Employment letter, payslips, bank statements', detail: 'on the NAS, if the consulate asks'},
        {kind: 'arrow', title: 'Application form', detail: 'to fill: the answers are prepared next'},
        {kind: 'missing', title: 'Flight and hotel bookings for April', detail: 'not booked yet'},
      ],
    },
    {
      kind: 'file', short: 'Trip folder', who: 'nas', agent: 'file-agent', title: 'Copy everything into a trip folder', path: 'Personal/Travel/Trips/japan-2027-04', icon: 'folder',
      lines: [
        {text: 'Copy 11 files: passport, photo, residence permit, Emirates ID,'},
        {text: 'employment letter, payslips, bank statements and more'},
        {text: 'Writing files needs Maria’s approval in the NAS app', tone: 'amber'},
      ],
      status: ['waiting for your approval', 'amber'],
    },
    {
      kind: 'file', short: 'Form answers', who: 'nas', agent: 'knowledge-agent', title: 'Write the form answers once', path: 'japan-2027-04/trip-plan.md',
      lines: [
        {text: 'Surname: REYES · Given names: MARIA CLARA', mono: true},
        {text: 'Date of birth: 1991-04-12 · Nationality: Filipino', mono: true},
        {text: 'Occupation: Senior Software Engineer', mono: true},
        {text: 'Arrival: 2027-04-01 · Departure: 2027-04-10', mono: true},
        {text: 'Passport number: ends 96B, copy the full number from the passport', tone: 'amber', mono: true},
      ],
      status: ['waiting for your approval', 'amber'],
    },
    {
      kind: 'file', short: 'Drafts', who: 'nas', agent: 'document-agent', title: 'Draft the cover letter and itinerary', path: 'japan-2027-04/draft-cover-letter.md · draft-itinerary.md',
      lines: [
        {text: 'Using only the facts in her passport, her employment letter and the trip dates'},
        {text: 'Cover letter: who she is, why she goes, when she comes back'},
        {text: 'Itinerary: one line per day, 1 to 10 April'},
      ],
      status: ['waiting for your approval', 'amber'],
    },
    {
      kind: 'file', short: 'Calendar', who: 'nas', agent: 'file-agent', title: 'A calendar file with every deadline', path: 'japan-2027-04/trip-deadlines.ics', icon: 'cal',
      lines: [
        {text: '1 Dec 2026 · book the flight and hotel'},
        {text: '18 Mar 2027 · latest day to apply: the flight, less five working days, less a week'},
        {text: '1 Apr 2027 · fly to Tokyo · 10 Apr 2027 · leave Japan'},
        {text: 'Reminders a week and a day before each one', tone: 'blue'},
      ],
      status: ['waiting for your approval', 'amber'],
    },
    {
      kind: 'file', short: 'Trip queue', who: 'nas', agent: 'file-agent', title: 'Write the trip queue', path: 'japan-2027-04/trip-queue.md',
      lines: [
        {text: '- research · Japan entry rules for a Philippine passport', mono: true},
        {text: '- compare · Flights Dubai to Tokyo, 1 April, back 10 April', mono: true},
        {text: '- compare · Hotels in Tokyo, 1 to 10 April', mono: true},
        {text: '- book · the flight and hotel you pick', mono: true},
        {text: '- contact · ask the hotel for a confirmation in your name', mono: true},
        {text: '- apply · Japan visa application form', mono: true},
      ],
      status: ['waiting for your approval', 'amber'],
    },
    {
      kind: 'shot', short: 'Queue page', who: 'companion', title: 'The queue page on the NAS', src: 'shots/queue-page.png', width: 1600, height: 1024,
      boxes: [
        {x: 262, y: 74, w: 474, h: 39, label: 'Nothing goes out without her, and the page says so'},
        {x: 1019, y: 265, w: 157, h: 58, label: 'Fill this page types her answers into the form she has open'},
        {x: 1204, y: 896, w: 94, h: 58, label: 'Send is the only way an email leaves'},
      ],
    },
    {
      kind: 'file', short: 'Compare', who: 'companion', title: 'Compare flights and hotels', path: 'japan-2027-04/compare-flights.md · compare-hotels.md',
      lines: [
        {text: 'Opens the search pages for Dubai to Tokyo, 1 to 10 April'},
        {text: 'Saves three options each, with the price shown on the day'},
        {text: 'Maria picks one, then books and pays on the airline or hotel site', tone: 'green'},
      ],
      status: ['you book and pay', 'green'],
    },
    {
      kind: 'shot', short: 'Fill the form', who: 'companion', title: 'Fill this page: typed, never submitted', src: 'shots/form-fill.png', width: 1180, height: 860,
      boxes: [
        {x: 234, y: 147, w: 350, h: 40, label: 'Green: typed from her form answers'},
        {x: 234, y: 289, w: 350, h: 40, label: 'Amber: the passport number, left for her'},
        {x: 599, y: 706, w: 200, h: 60, label: 'The declaration is hers to tick'},
        {x: 28, y: 779, w: 176, h: 40, label: 'Only she presses Submit and pay'},
      ],
    },
    {
      kind: 'mail', short: 'Send the email', who: 'you', title: 'Email the hotel, with a Send button', to: 'reservations@hotel-sakura.example', subject: 'Booking confirmation for a visa application',
      body: ['Dear reservations team,', 'I have booked a room with you from 1 to 10 April 2027 under the name REYES / MARIA CLARA. Could you send me a confirmation letter in my name?', 'Thank you, Maria Reyes'],
    },
    {
      kind: 'left', short: 'Left for Maria', who: 'you', title: 'Left for Maria',
      items: [
        {when: 'This week', what: 'Approve the NAS steps in the NAS app'},
        {when: 'By 1 Dec', what: 'Pick, book and pay the flight and hotel'},
        {when: 'By 18 Mar', what: 'Log in, check the filled form, submit and pay'},
        {when: 'Appointment', what: 'Hand over the passport and sign'},
        {when: '1 Apr 2027', what: 'Fly, with the passport and the new visa'},
      ],
    },
    {
      kind: 'call', short: 'Check the new visa', who: 'nas', agent: 'document-agent', title: 'When the visa comes back',
      command: "delegate --target document-agent --instruction 'From Personal/Travel/Visas/japan-visa-2027.pdf, extract the holder surname, given names, nationality, the last three characters of the passport number it was issued on, valid-from and expiry dates, entries and duration of stay...'",
      result: [
        {text: 'Name on the visa against the passport'},
        {text: 'Passport number on the visa against the passport, last three characters'},
        {text: 'Valid from and until against 1 to 10 April'},
        {text: 'Any mismatch is listed with both values, before she flies', tone: 'amber'},
      ],
    },
    {kind: 'close', title: 'Every annoying little step', sub: 'Done on the NAS, or waiting in the queue for one click from Maria. The rules are fetched fresh from official pages each time.'},
  ],
};
