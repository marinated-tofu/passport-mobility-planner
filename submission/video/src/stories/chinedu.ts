import type {Story} from '../story';
import durations from '../durations/chinedu.json';

// evals/results/2026-11-11-1214/trip-weak-ng-london.md, household evals/households/weak-ng.yaml (scored 4/5)
export const chinedu: Story = {
  id: 'chinedu',
  durations,
  run: 'eval run 2026-11-11',
  name: 'Chinedu Okafor',
  first: 'Chinedu',
  her: 'his',
  tagline: 'Electrical engineer in Lagos · Nigerian passport',
  look: {skin: '#6B4430', shade: '#5C3A28', hair: '#140D0A', top: '#2F7A5E', bun: false},
  phone: {label: 'Saved idea', title: 'London in March?', sub: 'Two weeks, 3 to 17 March 2027', sky: ['#C9D6E3', '#EDE6DA'], hills: '#A9BBA4', blossom: false},
  docs: [
    {title: 'Passport', sub: 'Nigeria · passport-scan.jpg', color: '#2E6B4F', photo: true, tag: ['phone photo', 'grey']},
    {title: 'UK visitor visa', sub: 'uk-visit-visa-2026.pdf', color: '#5A7FB0'},
    {title: 'Employment letter', sub: 'employment-letter-2026-10.pdf', color: '#8C7A5B'},
  ],
  tabs: ['Visit the UK: Standard Visitor | GOV.UK', 'Applying for a Schengen visa | EC', 'Transit at Amsterdam Schiphol', 'Transit at Paris Charles de Gaulle', 'Passport validity rules'],
  request:
    "I'm going to London from 3 to 17 March 2027. The cheapest flights from Lagos connect in Amsterdam or Paris, the direct one costs more. Which should I book, and what else do I need? My documents are in Personal/Travel.",
  calls: [
    {agent: 'file-agent', task: 'Find passports, visas, permits and IDs in Personal/Travel', result: 'passport-scan.jpg, uk-visit-visa-2026.pdf'},
    {agent: 'photo-agent', task: 'Read the text in passport-scan.jpg, keeping the machine-readable zone intact', result: 'Passport …274, expires 22 Apr 2030'},
    {agent: 'document-agent', task: 'Read the UK visa and compare its machine-readable zone with the printed page', result: 'Visitor visa …046, multiple, to 31 Jan 2028'},
    {agent: 'file-agent', task: 'Find supporting documents: letters, payslips, insurance, bookings', result: '1 found: the employment letter'},
    {agent: 'document-agent', task: 'Read the employment letter; return only the last 3 characters of any number', result: 'Employment letter for Chinedu Okafor'},
  ],
  checks: {
    eyebrow: 'Bundled rules, checked one by one',
    title: 'London, 3 to 17 March 2027',
    rows: [
      {kind: 'ok', at: 3.6, title: 'Passport is fine', detail: 'Expires 22 Apr 2030; arrival plus six months is 3 Sep 2027'},
      {kind: 'ok', at: 5.8, title: 'His UK visa covers the trip', detail: 'Visitor, multiple entry, valid 1 Feb 2026 to 31 Jan 2028'},
      {kind: 'arrow', at: 11.0, title: 'Amsterdam or Paris: Schengen visa', detail: 'No Schengen visa held; no bundled transit rule for Nigerian passports'},
    ],
  },
  card: {
    code: 'schengen-short-stay-visa-c',
    title: 'Schengen short-stay visa',
    facts: [
      {label: 'Fee, adult', value: 'EUR 90', at: 15.4},
      {label: 'Waiting time', value: '15 days, up to 45', at: 15.9},
      {label: 'Where to apply', value: 'FR or NL consulate or VFS', at: 16.4},
      {label: 'Transit rules', value: 'Not in bundled data', at: 17.0},
    ],
    source: 'home-affairs.ec.europa.eu',
    checked: '7 Nov 2026',
  },
  gaps: {
    eyebrow: 'Documents for the trip against his folder',
    needs: [
      {item: 'UK visa', status: 'have', note: 'uk-visit-visa-2026.pdf', at: 1.0},
      {item: 'Employment letter', status: 'have', note: 'employment-letter-2026-10.pdf', at: 1.6},
      {item: 'Bank statements', status: 'missing', note: 'Not in Personal/Travel; funds not checked', at: 2.2, hot: true},
      {item: 'Insurance, bookings', status: 'missing', note: 'Travel insurance, flight and accommodation', at: 2.8},
    ],
    notes: [
      {label: 'Also found', title: 'Passport number misread in the zone', body: 'Printed 0, zone O at one position. Common on scans; check the physical passport.', tone: 'amber'},
      {label: 'Missed in this run', title: 'UK visa name and birth date vs passport', body: 'Names were matched, but not the date of birth. Check both say 5 Dec 1987.', tone: 'red'},
    ],
  },
  plan: {
    today: '7 Nov 2026',
    steps: [
      {when: 'Now', what: 'Decide the route; direct needs no new visa', at: 3.6, tone: 'blue'},
      {when: 'Now', what: 'Check the number on the physical passport', at: 4.6, tone: 'blue'},
      {when: 'Next', what: 'Gather bank statements, travel insurance and bookings', at: 6.7, tone: 'blue'},
      {when: '~10 Feb 2027', what: 'Last day for a Schengen application, if connecting', at: 11.6, tone: 'amber'},
      {when: '3 Mar 2027', what: 'Fly with passport, UK visa and supporting papers', at: 12.8, tone: 'green'},
    ],
  },
  close: {blossom: false, petals: '#F2D16B'},
  cue: {tabs: 11.8, cloud: 16.2, card: 13.6, source: 18.4, hot: 4.2, note: 6.5, line: 13.6},
};
