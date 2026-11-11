import type {Story} from '../story';
import durations from '../durations/ayesha.json';

// evals/results/2026-11-11-1213/trip-weak-pk-georgia-armenia.md (scored 4/5), household evals/households/weak-pk.yaml
export const ayesha: Story = {
  id: 'ayesha',
  durations,
  run: 'eval run 2026-11-11',
  name: 'Ayesha Khan',
  first: 'Ayesha',
  her: 'her',
  tagline: 'Accountant in Dubai · Pakistani passport',
  look: {skin: '#B9835A', shade: '#A57350', hair: '#1A1110', top: '#9C3D54', bun: false},
  phone: {label: 'Saved idea', title: 'Tbilisi and Yerevan?', sub: '18 to 29 December 2026', sky: ['#BCD3E6', '#EDE4DA'], hills: '#C9D3DC', blossom: false},
  docs: [
    {title: 'Passport', sub: 'Pakistan · passport-ayesha.pdf', color: '#2E6B4A'},
    {title: 'UAE residence permit', sub: 'residence-permit.pdf', color: '#3E8A72', tag: ['ends Jun 2027', 'amber']},
    {title: 'Emirates ID', sub: 'emirates-id.jpg', color: '#3E8A72', photo: true},
    {title: 'Bank statement', sub: 'Creek Commercial Bank · Oct 2026', color: '#8C7A5B'},
  ],
  tabs: ['Embassy of Georgia in the UAE: visas', 'Georgian e-visa system', 'Visa | MFA of Armenia', 'Türkiye visa information for foreigners', 'Touristanbul | Turkish Airlines'],
  request:
    'I live in Dubai. I want to go to Tbilisi from 18 to 24 December 2026, then overland to Yerevan until the 29th, then fly back to Dubai. Could I add Istanbul on the way back too? My documents are in Personal/Travel.',
  calls: [
    {agent: 'file-agent', task: 'Find passports, visas, permits and IDs in Personal/Travel', result: 'Passport, UAE permit and Emirates ID found'},
    {agent: 'document-agent', task: 'Read the passport and residence permit; check each machine-readable zone', result: 'Passport …918, zone agrees with the page'},
    {agent: 'photo-agent', task: 'Read the text in emirates-id.jpg', result: 'Matches the passport and permit'},
    {agent: 'file-agent', task: 'Find supporting documents: letters, payslips, insurance, bookings', result: 'Bank statement only; no bookings or insurance'},
  ],
  checks: {
    eyebrow: 'Bundled rules, checked one by one',
    title: 'Georgia and Armenia, 18 to 29 December 2026',
    rows: [
      {kind: 'ok', at: 3.0, title: 'Passport is fine', detail: 'Expires 3 Sep 2031; arrival plus six months is 18 Jun 2027'},
      {kind: 'no', at: 5.0, title: 'Georgia: no visa-free entry', detail: 'Pakistani nationals need a UAE permit with a year left on entry'},
      {kind: 'arrow', at: 14.0, title: 'Armenia: likely visa-free', detail: 'Permit runs past 24 Jun 2027; confirm Pakistan on the 111 list'},
    ],
  },
  card: {
    code: 'Stricter UAE-residence rule',
    title: 'Georgian C1 tourist e-visa',
    facts: [
      {label: 'Permit must run to', value: '18 Dec 2027', at: 11.4},
      {label: 'Hers ends', value: '30 Jun 2027', at: 12.0},
      {label: 'Fee and waiting time', value: 'Not in the bundled data', at: 12.6},
      {label: 'Apply through', value: 'Georgian e-visa system', at: 13.2},
    ],
    source: 'uae.mfa.gov.ge',
    checked: '7 Nov 2026',
  },
  gaps: {
    eyebrow: "Georgia's document list against her folder",
    needs: [
      {item: 'Passport', status: 'have', note: 'passport-ayesha.pdf', at: 1.0},
      {item: 'UAE permit', status: 'have', note: 'residence-permit.pdf', at: 1.6},
      {item: 'Flight booking', status: 'missing', note: 'None found in Personal/Travel', at: 2.2, hot: true},
      {item: 'Hotel and travel insurance', status: 'missing', note: 'No hotel booking or travel insurance found', at: 2.8},
    ],
    notes: [
      {label: 'Also found', title: "UAE permit won't unlock a Turkish e-visa", body: 'Needs a Schengen, US, UK or Irish visa or permit. Confirm with Türkiye for a city stop.', tone: 'amber'},
      {label: 'Missed in this run', title: 'UAE permit ends 30 Jun 2027, not flagged', body: 'Residence-based entry rules and her return to Dubai depend on it. Plan the renewal.', tone: 'red'},
    ],
  },
  plan: {
    today: '7 Nov 2026',
    steps: [
      {when: 'Now, before booking', what: "Confirm Pakistan is on Armenia's list of 111", at: 2.1, tone: 'blue'},
      {when: 'Before booking', what: 'Apply for the Georgian C1 tourist e-visa', at: 3.7, tone: 'amber'},
      {when: 'Before a stopover', what: 'Istanbul: stay airside, or get a Turkish visa first', at: 6.3, tone: 'blue'},
      {when: 'Carry', what: 'Passport, physical UAE permit, Georgian visa', at: 7.0, tone: 'blue'},
      {when: '18 Dec 2026', what: 'Fly to Tbilisi once the Georgian visa is secured', at: 7.9, tone: 'green'},
    ],
  },
  close: {blossom: false, petals: '#FFFFFF'},
  cue: {cloud: 12.8, badge: 12.2, card: 10.9, source: 16.6, hot: 4.0, note: 6.3, line: 8.4},
};
