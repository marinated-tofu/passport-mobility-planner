// One demo video = one Story. Every `at` is seconds from the start of its scene, timed to the narration line.
export type Tone = 'green' | 'amber' | 'red' | 'blue' | 'grey';

export type Story = {
  id: string; // composition id; audio in public/audio/<id>/, narration in narration/<id>.json
  durations: number[]; // seconds per narration line, written by narrate.py
  run: string; // footnote, e.g. "eval run 2026-11-11 (Composer 2.5)"
  name: string;
  first: string;
  her: 'her' | 'his';
  tagline: string;
  look: {skin: string; shade: string; hair: string; top: string; bun: boolean};
  phone: {label: string; title: string; sub: string; sky: [string, string]; hills: string; blossom: boolean};
  docs: {title: string; sub: string; color: string; photo?: boolean; tag?: [string, 'red' | 'amber' | 'grey']}[]; // 8 fit
  tabs: string[]; // 5 official pages she would otherwise read
  request: string;
  calls: {agent: string; task: string; result: string}[]; // 5 fit
  checks: {eyebrow: string; title: string; rows: {kind: 'ok' | 'no' | 'arrow'; title: string; detail: string; at: number}[]}; // 3 rows fit
  card: {code: string; title: string; facts: {label: string; value: string; at: number}[]; source: string; checked: string};
  gaps: {
    eyebrow: string;
    needs: {item: string; status: 'have' | 'missing'; note: string; at: number; hot?: boolean}[];
    notes: {label: string; title: string; body: string; tone: 'amber' | 'red'}[]; // 1 or 2; red = what this run missed
  };
  plan: {today: string; steps: {when: string; what: string; at: number; tone: 'blue' | 'amber' | 'green'}[]}; // 5 fit
  close: {blossom: boolean; petals: string};
  cue?: Partial<typeof CUE>; // scene-level timings, when the narration differs from Maria's
};

export const CUE = {
  tabs: 6.2, // S2 browser tabs
  cloud: 11.5, // S2 cloud chatbot card
  badge: 11.2, // S4 "runs on the NAS"
  card: 9.2, // S5 rule card
  source: 14.4, // S5 source line
  hot: 3.6, // S6 highlight the hot row
  note: 7.2, // S6 side notes
  line: 9, // S7 timeline fully drawn
};
