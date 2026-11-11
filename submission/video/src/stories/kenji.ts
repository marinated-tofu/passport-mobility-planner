import type {Story} from '../story';
import durations from '../durations/kenji.json';

// evals/results/2026-11-11-1214/trip-strong-jp-korea-canada.md, household evals/households/strong-jp.yaml
export const kenji: Story = {
  id: 'kenji',
  durations,
  run: 'eval run 2026-11-11',
  name: 'Kenji Sato',
  first: 'Kenji',
  her: 'his',
  tagline: 'Lives in Osaka · Japanese passport',
  look: {skin: '#E2B58E', shade: '#CFA07A', hair: '#1A1714', top: '#3D6E9E', bun: false},
  phone: {label: 'Saved idea', title: 'Seoul and Vancouver in May?', sub: '2 to 19 May 2027', sky: ['#BFD9EE', '#E3F0E4'], hills: '#9CC3A6', blossom: false},
  docs: [
    {title: 'Passport', sub: 'Japan · passport-photo-page.jpg', color: '#8A2F3E', photo: true, tag: ['phone photo', 'grey']},
    {title: 'Flight booking', sub: 'Korean Air · KIX, ICN, YVR', color: '#7B6AA6'},
    {title: 'Vancouver hotel', sub: 'Harbourline Suites · 5 to 19 May', color: '#3E8A72'},
  ],
  tabs: ['K-ETA application guide · k-eta.go.kr', 'K-ETA: which nationalities are waived', 'Canada eTA: fees and processing', 'IRCC: who needs an eTA or a visa', 'IRCC: apply for a visitor visa'],
  request: "I'm going from Osaka to Seoul on 2 May 2027 for three days, then Seoul to Vancouver on 5 May until the 19th. My documents are in Personal/Travel. What paperwork do I need?",
  calls: [
    {agent: 'file-agent', task: 'Find passports, visas, permits and IDs in Personal/Travel', result: 'Passport photo; no visas or permits'},
    {agent: 'photo-agent', task: 'Read the text in passport-photo-page.jpg, keeping the machine-readable zone', result: 'Passport …273, zone agrees with the page'},
    {agent: 'file-agent', task: 'Find supporting documents: bookings, insurance, bank statements, letters', result: '2 found: flight and Vancouver hotel'},
    {agent: 'document-agent', task: 'Read the flight and hotel bookings; only the last 3 characters of any number', result: 'Korean Air ref …2RT, hotel 5 to 19 May'},
  ],
  checks: {
    eyebrow: 'Bundled rules, checked one by one',
    title: 'Seoul and Vancouver, May 2027',
    rows: [
      {kind: 'ok', at: 3.0, title: 'Passport is fine', detail: 'Expires 11 Jun 2034; arrival plus six months is 2 Nov 2027'},
      {kind: 'arrow', at: 4.6, title: 'Korea: K-ETA, not a visa', detail: 'Some nationalities are waived; the current list was not checked'},
      {kind: 'arrow', at: 11.8, title: 'Canada: eTA for arrival by air', detail: 'Japanese visitors are commonly visa-exempt; confirm on IRCC'},
    ],
  },
  card: {
    code: 'kr-k-eta · ca-eta',
    title: 'Two travel authorisations',
    facts: [
      {label: 'Korea, K-ETA fee', value: 'KRW 10,000 + 3%', at: 7.3},
      {label: 'Korea, waiting time', value: 'Usually within 72 hours', at: 8.0},
      {label: 'Canada, eTA fee', value: 'CAD 7', at: 14.2},
      {label: 'Canada, waiting time', value: 'Most in minutes', at: 15.6},
    ],
    source: 'k-eta.go.kr · canada.ca',
    checked: '7 Nov 2026',
  },
  gaps: {
    eyebrow: 'The bundled document lists against his folder',
    needs: [
      {item: 'Passport', status: 'have', note: 'passport-photo-page.jpg', at: 3.8},
      {item: 'Flight booking', status: 'have', note: 'KIX to ICN 2 May, ICN to YVR 5 May', at: 4.3},
      {item: 'Vancouver hotel', status: 'have', note: 'Harbourline Suites, 5 to 19 May', at: 4.8},
      {item: 'K-ETA and eTA', status: 'missing', note: 'Neither in the folder; apply before flying', at: 6.2, hot: true},
    ],
    notes: [{label: 'Also found', title: 'No proof of a place to stay in Seoul', body: 'Officers often ask for stay details. No travel insurance or bank statements in the folder either.', tone: 'amber'}],
  },
  plan: {
    today: '11 Nov 2026',
    steps: [
      {when: 'Now', what: 'Apply for the Canada eTA with passport ending 273', at: 4.8, tone: 'blue'},
      {when: 'By ~28 Apr 2027', what: 'Apply for the K-ETA; allow up to 72 hours', at: 7.4, tone: 'amber'},
      {when: 'Before 2 May 2027', what: 'Confirm both are approved on the same passport', at: 8.2, tone: 'blue'},
      {when: 'Before Korea', what: 'Arrange proof of a place to stay in Seoul', at: 9.0, tone: 'blue'},
      {when: '2 May 2027', what: 'Fly to Seoul with passport, eTA and K-ETA', at: 9.6, tone: 'green'},
    ],
  },
  close: {blossom: false, petals: '#D2553F'},
  cue: {tabs: 10.4, cloud: 14.4, badge: 11.8, card: 6.6, source: 17.2, hot: 6.5, note: 8.3, line: 10.6},
};
