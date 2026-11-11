import type {Story} from '../story';
import durations from '../durations/maria.json';

// evals/results/2026-11-11-1214/trip-medium-ph-japan.md, household evals/household.yaml
export const maria: Story = {
  id: 'maria',
  durations,
  run: 'eval run 2026-11-11',
  name: 'Maria Reyes',
  first: 'Maria',
  her: 'her',
  tagline: 'Software engineer in Dubai · Philippine passport',
  look: {skin: '#B97A50', shade: '#A86D45', hair: '#241712', top: '#E1A13A', bun: true},
  phone: {label: 'Saved idea', title: 'Tokyo in April?', sub: 'Cherry blossoms, 1 to 10 April 2027', sky: ['#BFD9EE', '#F6DCE4'], hills: '#E6C7D2', blossom: true},
  docs: [
    {title: 'Passport', sub: 'Philippines · passport-maria-reyes.pdf', color: '#2F4B8A'},
    {title: 'US visa B1/B2', sub: 'us-visa-b1b2.pdf', color: '#5A7FB0'},
    {title: 'Schengen visa', sub: 'France · 2025', color: '#5A7FB0', tag: ['expired', 'red']},
    {title: 'Japan visa 2024', sub: 'japan-visa-2024.jpg', color: '#C9506F', photo: true, tag: ['still valid?', 'amber']},
    {title: 'UAE residence permit', sub: 'residence-visa.pdf', color: '#3E8A72'},
    {title: 'Payslips', sub: 'Aug to Oct 2026', color: '#8C7A5B'},
    {title: 'Bank statements', sub: 'Emirates NBD, BDO', color: '#8C7A5B'},
    {title: 'Flight booking', sub: 'Dubai to Lisbon, March 2027', color: '#7B6AA6'},
  ],
  tabs: ['Visa | Ministry of Foreign Affairs of Japan', 'Embassy of Japan in the UAE', 'JAPAN eVISA', 'Visa fees from 1 July 2026', 'Passport validity rules'],
  request: 'I want to visit Japan from 1 to 10 April 2027. My documents are in Personal/Travel. Sort out everything I need to do.',
  calls: [
    {agent: 'file-agent', task: 'Find passports, visas, permits and IDs in Personal/Travel', result: '4 documents and 2 images found'},
    {agent: 'document-agent', task: 'Read the passport, visas and residence permit; check each machine-readable zone', result: 'Passport …96B, zone agrees with the page'},
    {agent: 'photo-agent', task: 'Read the text in japan-visa-2024.jpg and the Emirates ID', result: 'Japan visa …873, expired 28 Jan 2025'},
    {agent: 'file-agent', task: 'Find supporting documents: letters, payslips, insurance, bookings', result: '7 found'},
    {agent: 'document-agent', task: 'Read the 7 supporting documents; return only the last 3 characters of any number', result: 'Flight Dubai to Lisbon, insurance UAE only'},
  ],
  checks: {
    eyebrow: 'Bundled rules, checked one by one',
    title: 'Japan, 1 to 10 April 2027',
    rows: [
      {kind: 'ok', at: 3.0, title: 'Passport is fine', detail: 'Expires 15 Mar 2031; arrival plus six months is 1 Oct 2027'},
      {kind: 'no', at: 5.0, title: "The 2024 Japan visa doesn't count", detail: 'Single entry, expired 28 Jan 2025'},
      {kind: 'arrow', at: 8.6, title: 'Needs a new short-stay visa', detail: "The Philippines is not on Japan's visa-exempt list in the bundled data"},
    ],
  },
  card: {
    code: 'jp-short-term-visa',
    title: 'Japan short-term visa',
    facts: [
      {label: 'Fee, single entry', value: 'About JPY 15,000', at: 10.4},
      {label: 'Processing', value: '5 working days', at: 11.6},
      {label: 'Where to apply', value: 'Consulate or JAPAN eVISA', at: 12.4},
      {label: 'Fees in force', value: 'From 1 July 2026', at: 12.8},
    ],
    source: 'mofa.go.jp',
    checked: '7 Nov 2026',
  },
  gaps: {
    eyebrow: "The visa's document list against her folder",
    needs: [
      {item: 'Passport', status: 'have', note: 'passport-maria-reyes.pdf', at: 1.0},
      {item: 'Passport photo', status: 'have', note: 'passport-photo.jpg', at: 1.6},
      {item: 'Application form', status: 'missing', note: 'Filled in at the consulate or on JAPAN eVISA', at: 2.2},
      {item: 'Flight booking', status: 'missing', note: 'Only Dubai to Lisbon, 10 Mar 2027, is saved', at: 2.8, hot: true},
    ],
    notes: [{label: 'Also found', title: 'Health insurance covers the UAE only', body: 'Daman policy, ends 31 Jan 2027. Buy travel insurance for Japan.', tone: 'amber'}],
  },
  plan: {
    today: '7 Nov 2026',
    steps: [
      {when: 'Now', what: 'Check the consulate in Dubai and JAPAN eVISA', at: 1.6, tone: 'blue'},
      {when: 'Next', what: 'Book flights for 1 to 10 April', at: 3.9, tone: 'blue'},
      {when: 'Next', what: 'Buy travel insurance for Japan', at: 5.1, tone: 'blue'},
      {when: '20 Mar 2027', what: 'Last day to apply: 5 working days plus a week of margin', at: 6.5, tone: 'amber'},
      {when: '1 Apr 2027', what: 'Fly to Tokyo with the new visa', at: 8.6, tone: 'green'},
    ],
  },
  close: {blossom: true, petals: '#F3B3C4'},
};
