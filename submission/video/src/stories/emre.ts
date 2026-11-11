import type {Story} from '../story';
import durations from '../durations/emre.json';

// evals/results/2026-11-11-1214/trip-medium-tr-mexico-panama.md, household evals/households/medium-tr.yaml
export const emre: Story = {
  id: 'emre',
  durations,
  run: 'eval run 2026-11-11',
  name: 'Emre Yilmaz',
  first: 'Emre',
  her: 'his',
  tagline: 'Logistics manager in Istanbul · Turkish passport',
  look: {skin: '#D3A27C', shade: '#BF8E69', hair: '#2A1E18', top: '#3E6E8E', bun: false},
  phone: {label: 'Saved idea', title: 'Mexico and Panama?', sub: '10 to 26 February 2027', sky: ['#8FCBE3', '#F6DDB3'], hills: '#6FAF7E', blossom: false},
  docs: [
    {title: 'Passport', sub: 'Turkey · pasaport-emre.pdf', color: '#7A2433'},
    {title: 'US visa B1/B2', sub: 'us-visa-b1b2.pdf · to 10 Apr 2029', color: '#5A7FB0'},
    {title: 'Employment letter', sub: 'Bosphorus Freight · Oct 2026', color: '#8C7A5B'},
  ],
  tabs: [
    'Consulate General of Mexico · Tourists',
    'Mexico FMMd digital entry form',
    'Servicio Nacional de Migración, Panamá',
    'Schengen short-stay visa (type C)',
    'United States: transit, visa or ESTA',
  ],
  request:
    'I want to go from Istanbul to Mexico City on 10 February 2027 for ten days, then to Panama City until the 26th, then home. The cheap flights connect in Frankfurt or in Houston. Which should I book, and what do I need? Documents are in Personal/Travel.',
  calls: [
    {agent: 'file-agent', task: 'Find passports, visas, permits and IDs in Personal/Travel', result: 'Passport and US visa found'},
    {agent: 'document-agent', task: 'Read the passport and US visa; check each machine-readable zone', result: 'Passport …938, zone agrees with the page'},
    {agent: 'file-agent', task: 'Find supporting documents: letters, payslips, insurance, bookings', result: '1 found: an employment letter'},
    {agent: 'document-agent', task: 'Read the employment letter; return only the last 3 characters of any number', result: 'Bosphorus Freight letter, 18 Oct 2026'},
  ],
  checks: {
    eyebrow: 'Bundled rules, checked one by one',
    title: 'Mexico and Panama, 10 to 26 February 2027',
    rows: [
      {kind: 'ok', at: 4.0, title: 'Passport and US visa last the trip', detail: 'Passport to 1 Aug 2030; US B1/B2 to 10 Apr 2029'},
      {kind: 'ok', at: 8.4, title: 'Houston connection is covered', detail: 'His B1/B2 visa covers it; ESTA is not for Turkish citizens'},
      {kind: 'no', at: 10.5, title: 'Frankfurt is not covered', detail: 'No Schengen visa on file; transit rules not in the bundled data'},
    ],
  },
  card: {
    code: 'mx-entry-with-us-visa',
    title: 'Mexico entry with a US visa',
    facts: [
      {label: 'Mexico, form', value: 'Digital FMMd before travel', at: 15.1},
      {label: 'Mexico, fee', value: 'None in the bundled data', at: 15.8},
      {label: 'Mexico, rule', value: 'Partial, ask the consulate', at: 16.4},
      {label: 'Panama, with the US visa', value: 'Visa-free, up to 90 days', at: 16.9},
    ],
    source: 'consulmex.sre.gob.mx',
    checked: '7 Nov 2026',
  },
  gaps: {
    eyebrow: 'What Mexico and Panama ask for, against his folder',
    needs: [
      {item: 'Passport', status: 'have', note: 'pasaport-emre.pdf', at: 1.0},
      {item: 'US B1/B2 visa', status: 'have', note: 'us-visa-b1b2.pdf', at: 1.6},
      {item: 'FMMd form', status: 'missing', note: 'Complete online before the Mexico flight', at: 2.2, hot: true},
      {item: 'Onward tickets', status: 'missing', note: 'Mexico to Panama to home: none in the folder', at: 2.8},
    ],
    notes: [
      {label: 'Also found', title: 'No travel insurance or bank statements', body: 'Neither is on the NAS. Mexico and Panama may ask about trip funds at the border.', tone: 'amber'},
      {label: 'Also found', title: 'Frankfurt could mean a Schengen visa', body: 'Transit rules for Turkish citizens are not bundled. A Schengen visa is about EUR 90 and 15 calendar days.', tone: 'amber'},
    ],
  },
  plan: {
    today: '11 Nov 2026',
    steps: [
      {when: 'Now', what: 'Compare Houston and Frankfurt, Schengen visa included', at: 2.0, tone: 'blue'},
      {when: 'By ~19 Jan 2027', what: 'Frankfurt only: apply for a Schengen visa', at: 3.0, tone: 'blue'},
      {when: 'Before 10 Feb 2027', what: 'Confirm the Mexico rule; book onward tickets', at: 3.8, tone: 'blue'},
      {when: 'Before 10 Feb 2027', what: 'Complete the Mexico FMMd', at: 6.7, tone: 'amber'},
      {when: '10 Feb 2027', what: 'Fly from Istanbul, connecting in Houston', at: 9.4, tone: 'green'},
    ],
  },
  close: {blossom: false, petals: '#D96AA0'},
  cue: {tabs: 7.6, cloud: 13.4, badge: 12.2, card: 11.6, source: 17.0, hot: 4.6, note: 9.6, line: 10.2},
};
