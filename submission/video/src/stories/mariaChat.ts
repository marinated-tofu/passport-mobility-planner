import type {Scene, StepsStory} from '../Steps';
import durations from '../durations/maria-chat.json';
import shots from '../shots.json';

// Under 3 minutes, mostly screenshots. Chat screens: screens/*.html, cut from evals/results/2026-11-15-1217
// (trip-medium-ph-japan), 1205 (choose-options), 1159 (queue-in-chat) and 1236 (trip-strict-china); shot by screens/shoot.cjs.
// queue-page, queue-pick and form-fill are the companion's pages captured from companion/agent.py with test data.
type Shot = keyof typeof shots;
const shot = (name: Shot, rest: Omit<Extract<Scene, {kind: 'shot'}>, 'kind' | 'src' | 'width' | 'height' | 'boxes'>): Scene => ({kind: 'shot', ...shots[name], ...rest});

export const mariaChat: StepsStory = {
  id: 'maria-chat',
  durations,
  run: 'eval runs 2026-11-15',
  first: 'Maria',
  foot: 'Chat screens: mock-ups of real Skill answers from eval runs, 15 Nov 2026, shortened. Maria is invented; NAS agents and sites are stand-ins.',
  scenes: [
    {kind: 'intro', title: 'Tokyo in April, planned in the NAS chat', sub: 'Maria lives in Dubai on a Philippine passport. Her documents are on the family NAS.'},
    shot('ask', {short: 'Ask in the chat', who: 'you', title: 'She asks Uliya, on her NAS'}),
    {
      kind: 'call', short: 'NAS agents read', who: 'nas', agent: 'document-agent', title: 'The NAS agents read her documents',
      command: "delegate --target document-agent --instruction 'From each of these passport, visa, residence permit or national ID files: Personal/Travel/Passport/passport-maria-reyes.pdf, Personal/Travel/Visas/us-visa-b1b2.pdf, ... extract one record per document...'",
      result: [
        {text: 'file-agent: finds the passport, three visas and the residence permit'},
        {text: 'document-agent: names, dates, and the passport zone checked letter by letter'},
        {text: 'photo-agent: reads the phone photo of the old Japan visa'},
        {text: 'Document numbers come back as their last three characters', tone: 'blue'},
      ],
      status: 'completed',
    },
    shot('rules', {short: 'Rules, quoted', who: 'companion', title: 'Today’s rules, fetched and quoted'}),
    shot('checks', {short: 'Check documents', who: 'nas', title: 'Every document checked against the dates'}),
    shot('prepared', {short: 'Trip folder', who: 'nas', title: 'A trip folder, saved once she approves'}),
    {
      kind: 'shot', short: 'Queue page', who: 'companion', title: 'The trip queue, as a page on the NAS', src: 'shots/queue-page.png', width: 1600, height: 1024,
      boxes: [
        {x: 262, y: 74, w: 474, h: 39, label: 'Nothing goes out without her'},
        {x: 1019, y: 265, w: 157, h: 58, label: 'Fill this page types her answers'},
        {x: 1204, y: 896, w: 94, h: 58, label: 'Send is the only way an email leaves'},
      ],
    },
    shot('options', {short: 'Options in chat', who: 'nas', title: 'Flight options, right in the chat'}),
    {
      kind: 'shot', short: 'Pick and book', who: 'you', title: 'Or pick on the queue page', src: 'shots/queue-pick.png', width: 1856, height: 978,
      boxes: [
        {x: 258, y: 188, w: 1180, h: 44, label: 'The same options as in the chat'},
        {x: 1642, y: 318, w: 130, h: 80, label: 'Pick opens the airline page: she logs in, checks and pays'},
      ],
    },
    {
      kind: 'shot', short: 'I booked it', who: 'you', title: '“I booked the flight”', src: 'shots/queue-chat.png', width: 1640, height: 1242,
      boxes: [
        {x: 308, y: 162, w: 1272, h: 130, label: 'She says it in the chat'},
        {x: 98, y: 488, w: 1440, h: 84, label: 'Marked done once she approves'},
        {x: 170, y: 676, w: 1370, h: 222, label: 'What is left, with links'},
      ],
    },
    {
      kind: 'shot', short: 'Fill the form', who: 'companion', title: 'Fill this page: typed, never submitted', src: 'shots/form-fill.png', width: 1180, height: 860,
      boxes: [
        {x: 234, y: 147, w: 350, h: 40, label: 'Green: typed from her answers'},
        {x: 234, y: 289, w: 350, h: 40, label: 'Amber: the passport number, left for her'},
        {x: 599, y: 706, w: 200, h: 60, label: 'The declaration is hers to tick'},
        {x: 28, y: 779, w: 176, h: 40, label: 'Only she submits and pays'},
      ],
    },
    shot('china', {short: 'Strict consulates', who: 'nas', title: 'Strict consulates: China'}),
    {kind: 'close', title: 'Official rules, checked against her own documents', sub: 'On her own NAS, in the Uliya chat. She only picks, books, pays and submits.'},
  ],
};
