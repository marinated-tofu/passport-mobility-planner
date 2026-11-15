// Every small step of a trip, one scene each: who does it (a NAS agent, the trip companion, or the person) and what
// comes out. Scene lengths follow the narration, as in Demo.tsx; reveals inside a scene spread over its line.
import React from 'react';
import {AbsoluteFill, Audio, Img, Sequence, interpolate, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {C, Chip, DocIcon, Fade, FolderIcon, Mark, MariaAtDesk, Petals, StoryCtx, fontFamily, mono, rise, useIn} from './Demo';
import {maria} from './stories/maria';

const FPS = 30;
const LEAD = 0.5;
const TAIL = 1.0;

export type Who = 'nas' | 'companion' | 'you';
type Tone = 'green' | 'amber' | 'red' | 'blue' | 'grey';
type Line = {text: string; tone?: Tone; mono?: boolean};

export type Scene = {short?: string; who?: Who; agent?: string; title?: string} & (
  | {kind: 'intro'; title: string; sub: string}
  | {kind: 'list'; items: {text: string; who: Who}[]}
  | {kind: 'call'; command: string; result: Line[]; status?: string}
  | {kind: 'mrz'; printed: [string, string][]; zone: [string, string]; checks: Line[]}
  | {kind: 'file'; path: string; lines: Line[]; status?: [string, Tone]; icon?: 'doc' | 'folder' | 'cal'}
  | {kind: 'shot'; src: string; width: number; height: number; boxes?: {x: number; y: number; w: number; h: number; label: string}[]}
  | {kind: 'checks'; rows: {kind: 'ok' | 'no' | 'arrow' | 'missing'; title: string; detail: string}[]}
  | {kind: 'mail'; to: string; subject: string; body: string[]}
  | {kind: 'left'; items: {when: string; what: string}[]}
  | {kind: 'close'; title: string; sub: string}
);

export type StepsStory = {id: string; durations: number[]; run: string; first: string; foot?: string; scenes: Scene[]};

export const stepsFrames = (d: number[]) => d.map((x) => Math.ceil((LEAD + x + TAIL) * FPS));
export const stepsTotal = (d: number[]) => stepsFrames(d).reduce((a, b) => a + b, 0);

const WHO: Record<Who, [string, Tone]> = {nas: ['On the NAS', 'blue'], companion: ['Trip companion', 'amber'], you: ['You', 'green']};

// item i of n appears spread over the narration line
const useSpread = () => {
  const {durationInFrames} = useVideoConfig();
  const span = Math.max(2, durationInFrames / FPS - LEAD - TAIL - 1.2);
  return (i: number, n: number) => 0.6 + (n <= 1 ? 0 : (i * span) / n);
};

const Rail: React.FC<{scenes: Scene[]; at: number}> = ({scenes, at}) => {
  const steps = scenes.map((s, i) => ({s, i})).filter((x) => x.s.short);
  return (
    <div style={{position: 'absolute', right: 0, top: 0, bottom: 0, width: 360, background: '#EFE8DC', padding: '56px 30px', display: 'flex', flexDirection: 'column', gap: 9}}>
      <div style={{fontSize: 19, color: C.muted, fontWeight: 600, marginBottom: 8}}>EVERY STEP</div>
      {steps.map(({s, i}) => {
        const done = i < at;
        const now = i === at;
        const tone = WHO[s.who ?? 'nas'][1];
        const color = {green: C.green, amber: C.amber, blue: C.blue, red: C.red, grey: C.muted}[tone];
        return (
          <div key={i} style={{display: 'flex', alignItems: 'center', gap: 12, fontSize: 19, color: now ? C.ink : done ? C.muted : C.faint, fontWeight: now ? 700 : 500}}>
            <div style={{width: 14, height: 14, borderRadius: 7, flexShrink: 0, background: done || now ? color : 'transparent', border: `2px solid ${color}`, opacity: done ? 0.55 : 1}} />
            {s.short}
          </div>
        );
      })}
    </div>
  );
};

const Head: React.FC<{scene: Scene; n: number; of: number}> = ({scene, n, of}) => {
  const p = useIn(0.05);
  const [label, tone] = WHO[scene.who ?? 'nas'];
  return (
    <div style={{position: 'absolute', left: 80, top: 56, right: 440, ...rise(p)}}>
      <div style={{display: 'flex', gap: 14, alignItems: 'center', fontSize: 22, color: C.muted}}>
        <span>Step {n} of {of}</span>
        <Chip tone={tone}>{label}{scene.agent ? ` · ${scene.agent}` : ''}</Chip>
      </div>
      <div style={{fontSize: 48, fontWeight: 700, color: C.ink, marginTop: 10, lineHeight: 1.15}}>{scene.title}</div>
    </div>
  );
};

const Body: React.FC<{children: React.ReactNode}> = ({children}) => (
  <div style={{position: 'absolute', left: 80, right: 440, top: 220, bottom: 96, display: 'flex', flexDirection: 'column', gap: 14}}>{children}</div>
);

const Card: React.FC<{children: React.ReactNode; style?: React.CSSProperties}> = ({children, style}) => (
  <div style={{background: C.paper, border: `1px solid ${C.line}`, borderRadius: 18, boxShadow: '0 8px 24px rgba(28,35,51,0.06)', ...style}}>{children}</div>
);

const toneColor = (t?: Tone) => (t ? {green: C.green, amber: C.amber, red: C.red, blue: C.blue, grey: C.muted}[t] : C.ink);

const Reveal: React.FC<{at: number; children: React.ReactNode; px?: number}> = ({at, children, px = 18}) => {
  const p = useIn(at);
  return <div style={rise(p, px)}>{children}</div>;
};

const LineView: React.FC<{l: Line; at: number; size?: number}> = ({l, at, size = 33}) => (
  <Reveal at={at}>
    <div style={{fontSize: l.mono ? size - 4 : size, fontFamily: l.mono ? mono : fontFamily, color: toneColor(l.tone), fontWeight: l.tone ? 600 : 400, lineHeight: 1.35}}>{l.text}</div>
  </Reveal>
);

const Typed: React.FC<{text: string; start: number; cps?: number}> = ({text, start, cps = 90}) => {
  const f = useCurrentFrame();
  const n = Math.max(0, Math.floor(((f / FPS) - start) * cps));
  return <span>{text.slice(0, n)}</span>;
};

const Footnote: React.FC<{run: string; first: string; foot?: string; dark?: boolean}> = ({run, first, foot, dark}) => (
  <div style={{position: 'absolute', left: 80, bottom: 40, fontSize: 21, color: dark ? 'rgba(255,255,255,0.55)' : C.faint}}>
    {foot ?? `Real output from ${run}, shortened. ${first} and her documents are invented; forms and email are test stand-ins.`}
  </div>
);

// ---------- scene bodies ----------

const CallBody: React.FC<{s: Extract<Scene, {kind: 'call'}>}> = ({s}) => {
  const spread = useSpread();
  const typedFor = Math.min(3.2, s.command.length / 90);
  return (
    <Body>
      <Card style={{background: C.night, border: 'none', padding: '26px 30px', fontFamily: mono, fontSize: 27, color: '#D7DEEA', lineHeight: 1.45, minHeight: 210}}>
        <span style={{color: '#6EE7B7'}}>$ </span>
        <Typed text={s.command} start={0.5} />
      </Card>
      <div style={{display: 'flex', flexDirection: 'column', gap: 10, marginTop: 10}}>
        {s.result.map((l, i) => <LineView key={i} l={l} at={0.6 + typedFor + (spread(i, s.result.length) * 0.7)} />)}
      </div>
      {s.status && <Reveal at={1 + typedFor}><Chip tone={s.status.startsWith('waiting') ? 'amber' : 'green'}>{s.status}</Chip></Reveal>}
    </Body>
  );
};

const MrzBody: React.FC<{s: Extract<Scene, {kind: 'mrz'}>}> = ({s}) => {
  const spread = useSpread();
  return (
    <Body>
      <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20}}>
        <Card style={{padding: '28px 32px', display: 'grid', gridTemplateColumns: '240px 1fr', rowGap: 14, fontSize: 31}}>
          {s.printed.map(([k, v], i) => (
            <React.Fragment key={i}>
              <div style={{color: C.muted}}>{k}</div>
              <div style={{color: C.ink, fontWeight: 600}}>{v}</div>
            </React.Fragment>
          ))}
        </Card>
        <div style={{display: 'flex', flexDirection: 'column', gap: 10}}>
          {s.checks.map((l, i) => <LineView key={i} l={l} at={spread(i + 1, s.checks.length + 1)} size={33} />)}
        </div>
      </div>
      <Reveal at={0.4}>
        <Card style={{padding: '26px 32px', fontFamily: mono, fontSize: 34, letterSpacing: 2, color: C.ink, background: '#F7F4EE'}}>
          <div>{s.zone[0]}</div>
          <div>{s.zone[1]}</div>
        </Card>
      </Reveal>
    </Body>
  );
};

const CalIcon: React.FC = () => (
  <svg width={56} height={60} viewBox="0 0 56 60">
    <rect x={2} y={8} width={52} height={50} rx={6} fill="#fff" stroke={C.red} strokeWidth={3} />
    <rect x={2} y={8} width={52} height={14} rx={6} fill={C.red} />
    <text x={28} y={50} fontSize={24} fontWeight={700} textAnchor="middle" fill={C.ink}>20</text>
  </svg>
);

const FileBody: React.FC<{s: Extract<Scene, {kind: 'file'}>}> = ({s}) => {
  const spread = useSpread();
  return (
    <Body>
      <Card style={{padding: '30px 36px', display: 'flex', flexDirection: 'column', gap: 16}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 18, marginBottom: 6}}>
          {s.icon === 'folder' ? <FolderIcon /> : s.icon === 'cal' ? <CalIcon /> : <DocIcon color={C.blue} />}
          <div style={{fontFamily: mono, fontSize: 27, color: C.muted}}>{s.path}</div>
          {s.status && (
            <div style={{marginLeft: 'auto'}}>
              <Reveal at={spread(s.lines.length, s.lines.length + 1)}><Chip tone={s.status[1]}>{s.status[0]}</Chip></Reveal>
            </div>
          )}
        </div>
        {s.lines.map((l, i) => <LineView key={i} l={l} at={spread(i, s.lines.length + 1)} />)}
      </Card>
    </Body>
  );
};

const ShotBody: React.FC<{s: Extract<Scene, {kind: 'shot'}>}> = ({s}) => {
  const spread = useSpread();
  const maxW = 1920 - 80 - 440 - 330, maxH = 1080 - 220 - 96;
  const k = Math.min(maxW / s.width, maxH / s.height);
  const p = useIn(0.2);
  const boxes = s.boxes ?? [];
  return (
    <>
      <div style={{position: 'absolute', left: 80, top: 220, width: s.width * k, height: s.height * k, ...rise(p, 30)}}>
        <Img src={staticFile(s.src)} style={{width: '100%', height: '100%', borderRadius: 14, border: `1px solid ${C.line}`, boxShadow: '0 12px 40px rgba(28,35,51,0.12)'}} />
        {boxes.map((b, i) => <Box key={i} b={b} n={i + 1} k={k} at={spread(i, boxes.length)} />)}
      </div>
      <div style={{position: 'absolute', left: 80 + s.width * k + 36, right: 440, top: 236, display: 'flex', flexDirection: 'column', gap: 22}}>
        {boxes.map((b, i) => (
          <Reveal key={i} at={spread(i, boxes.length)}>
            <div style={{display: 'flex', gap: 14, alignItems: 'center', fontSize: 28, fontWeight: 600, color: C.ink, lineHeight: 1.2}}>
              <Num n={i + 1} />{b.label}
            </div>
          </Reveal>
        ))}
      </div>
    </>
  );
};

const Num: React.FC<{n: number}> = ({n}) => (
  <div style={{width: 40, height: 40, borderRadius: 20, background: C.pinkDeep, color: '#fff', fontSize: 23, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>{n}</div>
);

const Box: React.FC<{b: {x: number; y: number; w: number; h: number; label: string}; n: number; k: number; at: number}> = ({b, n, k, at}) => {
  const p = useIn(at, 14);
  return (
    <div style={{position: 'absolute', left: b.x * k - 6, top: b.y * k - 6, width: b.w * k + 12, height: b.h * k + 12, border: `4px solid ${C.pinkDeep}`, borderRadius: 10, opacity: p, transform: `scale(${0.96 + 0.04 * p})`}}>
      <div style={{position: 'absolute', right: -22, top: -22}}><Num n={n} /></div>
    </div>
  );
};

const ChecksBody: React.FC<{s: Extract<Scene, {kind: 'checks'}>}> = ({s}) => {
  const spread = useSpread();
  return (
    <Body>
      {s.rows.map((r, i) => (
        <Reveal key={i} at={spread(i, s.rows.length)}>
          <Card style={{padding: '26px 32px', display: 'flex', gap: 26, alignItems: 'center'}}>
            <Mark kind={r.kind} size={56} />
            <div>
              <div style={{fontSize: 35, fontWeight: 600, color: C.ink}}>{r.title}</div>
              <div style={{fontSize: 28, color: C.muted, marginTop: 6}}>{r.detail}</div>
            </div>
          </Card>
        </Reveal>
      ))}
    </Body>
  );
};

const MailBody: React.FC<{s: Extract<Scene, {kind: 'mail'}>}> = ({s}) => {
  const f = useCurrentFrame();
  const {durationInFrames} = useVideoConfig();
  const click = durationInFrames / FPS - TAIL - 1.6;
  const t = f / FPS;
  const move = interpolate(t, [click - 1.4, click], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const sent = t > click + 0.15;
  return (
    <Body>
      <Card style={{padding: '30px 36px'}}>
        <div style={{fontSize: 28, color: C.muted}}>To <span style={{fontFamily: mono, color: C.ink, background: '#F7F4EE', padding: '4px 10px', borderRadius: 6}}>{s.to}</span></div>
        <div style={{fontSize: 33, fontWeight: 600, color: C.ink, marginTop: 18}}>{s.subject}</div>
        <div style={{marginTop: 14, display: 'flex', flexDirection: 'column', gap: 10}}>
          {s.body.map((b, i) => <div key={i} style={{fontSize: 29, color: C.ink, lineHeight: 1.4}}>{b}</div>)}
        </div>
        <div style={{marginTop: 26, display: 'flex', gap: 18, alignItems: 'center'}}>
          <div style={{position: 'relative', background: sent ? C.green : C.blue, color: '#fff', fontSize: 29, fontWeight: 600, padding: '14px 34px', borderRadius: 10}}>
            {sent ? 'Sent' : 'Send'}
            <svg width={34} height={40} viewBox="0 0 34 40" style={{position: 'absolute', left: 60 + 520 * move, top: 26 + 160 * move, opacity: t > click - 1.6 ? 1 : 0}}>
              <path d="M3 2 L3 32 L11 25 L16 37 L22 34 L17 23 L28 23 Z" fill="#fff" stroke={C.ink} strokeWidth={2.4} strokeLinejoin="round" />
            </svg>
          </div>
          <div style={{fontSize: 26, color: C.muted}}>{sent ? 'sent from her own mail account' : 'nothing goes out until she presses it'}</div>
        </div>
      </Card>
    </Body>
  );
};

const LeftBody: React.FC<{s: Extract<Scene, {kind: 'left'}>}> = ({s}) => {
  const spread = useSpread();
  return (
    <Body>
      {s.items.map((it, i) => (
        <Reveal key={i} at={spread(i, s.items.length)}>
          <Card style={{padding: '24px 32px', display: 'grid', gridTemplateColumns: '260px 1fr', alignItems: 'center'}}>
            <div style={{fontSize: 31, fontWeight: 700, color: C.green}}>{it.when}</div>
            <div style={{fontSize: 33, color: C.ink}}>{it.what}</div>
          </Card>
        </Reveal>
      ))}
    </Body>
  );
};

const ListBody: React.FC<{s: Extract<Scene, {kind: 'list'}>}> = ({s}) => {
  const spread = useSpread();
  return (
    <div style={{position: 'absolute', left: 80, right: 80, top: 220, bottom: 110, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gridAutoRows: 'min-content', gap: 16}}>
      {s.items.map((it, i) => (
        <Reveal key={i} at={spread(i, s.items.length) * 0.8}>
          <Card style={{padding: '20px 24px', display: 'flex', gap: 14, alignItems: 'center'}}>
            <div style={{width: 16, height: 16, borderRadius: 8, background: toneColor(WHO[it.who][1]), flexShrink: 0}} />
            <div style={{fontSize: 28, color: C.ink}}>{it.text}</div>
          </Card>
        </Reveal>
      ))}
    </div>
  );
};

// ---------- scenes ----------

const SceneView: React.FC<{story: StepsStory; i: number}> = ({story, i}) => {
  const s = story.scenes[i];
  const numbered = story.scenes.filter((x) => x.short);
  const n = numbered.indexOf(s) + 1;
  if (s.kind === 'intro' || s.kind === 'close') {
    const p = useIn(0.2);
    return (
      <AbsoluteFill style={{background: `linear-gradient(180deg, ${C.night}, ${C.night2})`, fontFamily}}>
        {s.kind === 'close' && <Petals count={22} />}
        <div style={{position: 'absolute', left: 110, top: 300, width: s.kind === 'intro' ? 640 : 1500, ...rise(p, 30)}}>
          <div style={{fontSize: 64, fontWeight: 700, color: '#fff', lineHeight: 1.12}}>{s.title}</div>
          <div style={{fontSize: 32, color: 'rgba(255,255,255,0.75)', marginTop: 24, lineHeight: 1.4}}>{s.sub}</div>
        </div>
        {s.kind === 'intro' && (
          <div style={{position: 'absolute', right: 40, top: 110}}>
            <StoryCtx.Provider value={maria}><MariaAtDesk /></StoryCtx.Provider>
          </div>
        )}
        <Footnote run={story.run} first={story.first} foot={story.foot} dark />
      </AbsoluteFill>
    );
  }
  if (s.kind === 'list') {
    const p = useIn(0.05);
    return (
      <AbsoluteFill style={{background: C.cream, fontFamily}}>
        <div style={{position: 'absolute', left: 80, top: 56, ...rise(p)}}>
          <div style={{fontSize: 24, color: C.muted, display: 'flex', gap: 14}}>
            {(['nas', 'companion', 'you'] as Who[]).map((w) => <Chip key={w} tone={WHO[w][1]}>{WHO[w][0]}</Chip>)}
          </div>
          <div style={{fontSize: 48, fontWeight: 700, color: C.ink, marginTop: 12}}>{s.title}</div>
        </div>
        <ListBody s={s} />
        <Footnote run={story.run} first={story.first} foot={story.foot} />
      </AbsoluteFill>
    );
  }
  return (
    <AbsoluteFill style={{background: C.cream, fontFamily}}>
      <Head scene={s} n={n} of={numbered.length} />
      {s.kind === 'call' && <CallBody s={s} />}
      {s.kind === 'mrz' && <MrzBody s={s} />}
      {s.kind === 'file' && <FileBody s={s} />}
      {s.kind === 'shot' && <ShotBody s={s} />}
      {s.kind === 'checks' && <ChecksBody s={s} />}
      {s.kind === 'mail' && <MailBody s={s} />}
      {s.kind === 'left' && <LeftBody s={s} />}
      <Rail scenes={story.scenes} at={i} />
      <Footnote run={story.run} first={story.first} foot={story.foot} />
    </AbsoluteFill>
  );
};

export const Steps: React.FC<{story: StepsStory}> = ({story}) => {
  const frames = stepsFrames(story.durations);
  let from = 0;
  return (
    <AbsoluteFill style={{background: C.cream}}>
      {story.scenes.map((_, i) => {
        const at = from;
        from += frames[i];
        return (
          <Sequence key={i} from={at} durationInFrames={frames[i]}>
            <Fade dur={frames[i]}>
              <SceneView story={story} i={i} />
            </Fade>
            <Sequence from={Math.round(LEAD * FPS)}>
              <Audio src={staticFile(`audio/${story.id}/${String(i).padStart(2, '0')}.wav`)} />
            </Sequence>
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
