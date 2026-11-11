import React from 'react';
import {
  AbsoluteFill,
  Audio,
  Easing,
  Sequence,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import {loadFont} from '@remotion/google-fonts/Inter';
import {loadFont as loadMono} from '@remotion/google-fonts/JetBrainsMono';
import {CUE, type Story} from './story';

const {fontFamily} = loadFont('normal', {weights: ['400', '500', '600', '700'], subsets: ['latin']});
const {fontFamily: mono} = loadMono('normal', {weights: ['400', '500'], subsets: ['latin']});

const FPS = 30;
const LEAD = 0.5; // seconds of picture before each narration line
const TAIL = 0.9;
const MIN: Record<number, number> = {2: 5.6}; // the typing scene needs time on screen
const EXTRA: Record<number, number> = {7: 2.6}; // hold the last frame

const C = {
  night: '#121C33',
  night2: '#1B2948',
  cream: '#F5F0E8',
  paper: '#FFFFFF',
  ink: '#1C2333',
  muted: '#6A7180',
  faint: '#9AA0AA',
  line: '#E3DBCF',
  pink: '#F3B3C4',
  pinkDeep: '#C9506F',
  green: '#23855F',
  greenBg: '#E3F2EA',
  amber: '#B87410',
  amberBg: '#FBEFD9',
  red: '#B83A48',
  redBg: '#F8E3E5',
  blue: '#2F5D8A',
  blueBg: '#E3ECF5',
};

const StoryCtx = React.createContext<Story>(null as unknown as Story);
const useStory = () => React.useContext(StoryCtx);
const useCue = () => ({...CUE, ...useStory().cue});

export const sceneFrames = (durations: number[]): number[] =>
  durations.map((d: number, i: number) =>
    Math.ceil((Math.max(LEAD + d + TAIL, MIN[i] ?? 0) + (EXTRA[i] ?? 0)) * FPS)
  );
export const totalFrames = (durations: number[]) => sceneFrames(durations).reduce((a, b) => a + b, 0);

// ---------- helpers ----------

const useIn = (delaySec: number, damping = 200) => {
  const f = useCurrentFrame();
  const {fps} = useVideoConfig();
  return spring({frame: f - delaySec * fps, fps, config: {damping, mass: 0.8}});
};

const rise = (p: number, px = 24): React.CSSProperties => ({
  opacity: p,
  transform: `translateY(${(1 - p) * px}px)`,
});

const Fade: React.FC<{dur: number; children: React.ReactNode}> = ({dur, children}) => {
  const f = useCurrentFrame();
  const o = interpolate(f, [0, 10, dur - 10, dur], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  return <AbsoluteFill style={{opacity: o}}>{children}</AbsoluteFill>;
};

const Footnote: React.FC<{dark?: boolean}> = ({dark}) => {
  const s = useStory();
  return (
  <div
    style={{
      position: 'absolute',
      left: 80,
      bottom: 44,
      fontSize: 22,
      color: dark ? 'rgba(255,255,255,0.55)' : C.faint,
      fontFamily,
    }}
  >
    Real Skill output from {s.run} on a mock NAS, shortened. {s.first} and {s.her} documents are invented.
  </div>
  );
};

const Chip: React.FC<{tone: 'green' | 'amber' | 'red' | 'blue' | 'grey'; children: React.ReactNode}> = ({
  tone,
  children,
}) => {
  const map = {
    green: [C.greenBg, C.green],
    amber: [C.amberBg, C.amber],
    red: [C.redBg, C.red],
    blue: [C.blueBg, C.blue],
    grey: ['#ECE8E1', C.muted],
  }[tone];
  return (
    <span
      style={{
        background: map[0],
        color: map[1],
        borderRadius: 8,
        padding: '5px 12px',
        fontSize: 21,
        fontWeight: 600,
        whiteSpace: 'nowrap',
      }}
    >
      {children}
    </span>
  );
};

const Mark: React.FC<{kind: 'ok' | 'no' | 'missing' | 'arrow'; size?: number}> = ({kind, size = 40}) => {
  const color = {ok: C.green, no: C.red, missing: C.amber, arrow: C.blue}[kind];
  const bg = {ok: C.greenBg, no: C.redBg, missing: C.amberBg, arrow: C.blueBg}[kind];
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" style={{flexShrink: 0}}>
      <circle cx={20} cy={20} r={20} fill={bg} />
      {kind === 'ok' && <path d="M12 20.5l5.5 5.5L28.5 14" stroke={color} strokeWidth={3.4} fill="none" strokeLinecap="round" strokeLinejoin="round" />}
      {kind === 'no' && <path d="M13.5 13.5l13 13M26.5 13.5l-13 13" stroke={color} strokeWidth={3.4} strokeLinecap="round" />}
      {kind === 'missing' && (
        <>
          <path d="M20 11v12" stroke={color} strokeWidth={3.4} strokeLinecap="round" />
          <circle cx={20} cy={29} r={2.2} fill={color} />
        </>
      )}
      {kind === 'arrow' && <path d="M12 20h15M21 13.5l6.5 6.5-6.5 6.5" stroke={color} strokeWidth={3.4} fill="none" strokeLinecap="round" strokeLinejoin="round" />}
    </svg>
  );
};

const Flower: React.FC<{x: number; y: number; r: number; color?: string; rot?: number}> = ({
  x,
  y,
  r,
  color = C.pink,
  rot = 0,
}) => (
  <g transform={`translate(${x} ${y}) rotate(${rot})`}>
    {[0, 1, 2, 3, 4].map((i) => (
      <ellipse key={i} cx={0} cy={-r * 0.55} rx={r * 0.42} ry={r * 0.58} fill={color} transform={`rotate(${i * 72})`} />
    ))}
    <circle r={r * 0.22} fill="#E9789A" />
  </g>
);

const Branch: React.FC<{flip?: boolean; scale?: number}> = ({flip, scale = 1}) => (
  <g transform={`scale(${flip ? -scale : scale} ${scale})`}>
    <path d="M0 40 C120 60 220 30 330 90 S520 140 640 120" stroke="#5B3A2B" strokeWidth={14} fill="none" strokeLinecap="round" />
    <path d="M250 62 C290 10 340 0 380 -20" stroke="#5B3A2B" strokeWidth={8} fill="none" strokeLinecap="round" />
    <path d="M460 128 C490 170 530 190 580 200" stroke="#5B3A2B" strokeWidth={7} fill="none" strokeLinecap="round" />
    {[
      [90, 40, 26], [150, 58, 22], [205, 40, 28], [300, 30, 24], [350, -8, 26], [385, -24, 20], [330, 92, 22],
      [420, 110, 28], [480, 140, 22], [540, 185, 26], [590, 204, 20], [560, 118, 24], [630, 112, 22], [260, 80, 18],
    ].map(([x, y, r], i) => (
      <Flower key={i} x={x} y={y} r={r} rot={i * 23} color={i % 3 === 0 ? '#F7C6D3' : C.pink} />
    ))}
  </g>
);

const Petals: React.FC<{count?: number; color?: string}> = ({count = 26, color = C.pink}) => {
  const f = useCurrentFrame();
  return (
    <svg width={1920} height={1080} style={{position: 'absolute', inset: 0}}>
      {Array.from({length: count}).map((_, i) => {
        const seed = (i * 9301 + 49297) % 233280;
        const x0 = (seed / 233280) * 1920;
        const speed = 1.1 + ((i * 37) % 10) / 8;
        const y = ((f * speed + i * 97) % 1250) - 120;
        const x = x0 + Math.sin((f + i * 20) / 28) * 40;
        return (
          <ellipse
            key={i}
            cx={x}
            cy={y}
            rx={9}
            ry={5.5}
            fill={color}
            opacity={0.85}
            transform={`rotate(${(f * 2 + i * 40) % 360} ${x} ${y})`}
          />
        );
      })}
    </svg>
  );
};

// ---------- Maria ----------

const MariaAtDesk: React.FC = () => {
  const f = useCurrentFrame();
  const {skin, shade, hair, top, bun} = useStory().look;
  const glow = 0.75 + Math.sin(f / 9) * 0.08;
  const lit = [
    [120, 300], [138, 330], [160, 260], [230, 360], [250, 300], [420, 340], [440, 380], [470, 300], [500, 360], [530, 410],
    [90, 410], [300, 420], [330, 380], [560, 330],
  ];
  return (
    <svg width={1100} height={860} viewBox="0 0 1100 860">
      {/* window */}
      <rect x={60} y={60} width={600} height={600} rx={10} fill="#22345C" />
      <rect x={60} y={60} width={600} height={600} rx={10} fill="none" stroke="#0C1426" strokeWidth={18} />
      <circle cx={540} cy={170} r={34} fill="#F3E7C9" opacity={0.9} />
      <circle cx={556} cy={160} r={30} fill="#22345C" />
      <path d="M69 660 V470 h50 v-60 h40 v100 h30 V380 h46 v120 h24 V330 h12 l14 -230 l14 230 h12 v170 h40 V420 h60 v80 h30 V360 h50 v300 z" fill="#0E1830" />
      {lit.map(([x, y], i) => (
        <rect key={i} x={x} y={y} width={8} height={11} fill="#F2C86B" opacity={(i * 7) % 3 === 0 ? 0.35 : 0.8} />
      ))}
      <line x1={360} y1={60} x2={360} y2={660} stroke="#0C1426" strokeWidth={10} />
      {/* desk */}
      <rect x={0} y={690} width={1100} height={24} rx={6} fill="#8A5A3A" />
      <rect x={60} y={714} width={22} height={60} fill="#6E472E" />
      <rect x={1000} y={714} width={22} height={60} fill="#6E472E" />
      {/* lamp */}
      <path d="M150 690 v-120 l60 -50" stroke="#C9B79C" strokeWidth={8} fill="none" />
      <path d="M180 500 l70 -10 l-20 70 z" fill="#E7D7BC" />
      {/* laptop */}
      <rect x={300} y={600} width={250} height={14} rx={4} fill="#B9BEC8" />
      <path d="M320 600 l20 -150 h210 l-20 150 z" fill="#8E95A3" />
      {/* chair */}
      <rect x={760} y={430} width={40} height={300} rx={14} fill="#2E3B57" />
      <rect x={640} y={640} width={200} height={34} rx={12} fill="#2E3B57" />
      {/* body */}
      <path d="M640 640 C630 560 650 470 700 450 C740 435 780 460 785 520 L790 640 Z" fill={top} />
      <path d="M650 650 h170 l-10 50 h-150 z" fill="#3A3F58" />
      {/* arm to phone */}
      <path d="M700 480 C660 520 640 560 600 540" stroke={top} strokeWidth={34} fill="none" strokeLinecap="round" />
      <circle cx={596} cy={528} r={17} fill={skin} />
      {/* phone */}
      <rect x={566} y={470} width={36} height={64} rx={7} fill="#1A1A22" transform="rotate(-18 584 502)" />
      <rect x={570} y={475} width={28} height={54} rx={5} fill="#FDE3EA" opacity={glow} transform="rotate(-18 584 502)" />
      {/* neck and head */}
      <rect x={705} y={400} width={30} height={50} rx={10} fill={shade} />
      <circle cx={712} cy={372} r={52} fill={skin} />
      <path d="M665 360 C660 300 720 290 755 320 C770 335 772 360 768 385 C750 360 720 350 700 352 C690 354 678 362 665 360 Z" fill={hair} />
      {bun && <circle cx={770} cy={322} r={30} fill={hair} />}
      <circle cx={676} cy={378} r={4} fill="#3A2418" />
      <path d="M662 400 q8 6 16 0" stroke="#7A4A30" strokeWidth={3} fill="none" strokeLinecap="round" />
    </svg>
  );
};

const MariaStanding: React.FC = () => {
  const {skin, shade, hair, top, bun} = useStory().look;
  return (
  <svg width={420} height={640} viewBox="0 0 420 640">
    <ellipse cx={210} cy={622} rx={120} ry={16} fill="#000" opacity={0.08} />
    <path d="M150 600 L165 360 h90 L270 600 h-40 l-20 -200 l-20 200 z" fill="#2F3A55" />
    <path d="M140 380 C130 280 160 200 210 195 C260 200 290 280 280 380 Z" fill={top} />
    <path d="M150 230 C120 280 120 330 130 360" stroke={top} strokeWidth={30} fill="none" strokeLinecap="round" />
    <path d="M272 230 C300 270 312 300 300 330" stroke={top} strokeWidth={30} fill="none" strokeLinecap="round" />
    <rect x={196} y={150} width={28} height={50} rx={10} fill={shade} />
    <circle cx={210} cy={118} r={50} fill={skin} />
    <path d="M160 112 C150 50 230 40 262 82 C272 98 270 120 262 132 C246 104 210 96 190 100 C178 102 168 108 160 112 Z" fill={hair} />
    {bun && <circle cx={212} cy={62} r={26} fill={hair} />}
    <circle cx={192} cy={120} r={4} fill="#3A2418" />
    <circle cx={228} cy={120} r={4} fill="#3A2418" />
    <path d="M198 142 q12 9 24 0" stroke="#7A4A30" strokeWidth={3.5} fill="none" strokeLinecap="round" />
    {/* passport in hand */}
    <rect x={284} y={318} width={44} height={58} rx={5} fill="#24346B" transform="rotate(12 306 347)" />
    <circle cx={306} cy={344} r={10} fill="none" stroke="#D9B85C" strokeWidth={2.5} transform="rotate(12 306 347)" />
  </svg>
  );
};

// ---------- documents ----------

const DocIcon: React.FC<{color: string; photo?: boolean}> = ({color, photo}) => (
  <svg width={54} height={66} viewBox="0 0 54 66" style={{flexShrink: 0}}>
    <path d="M4 2 h32 l14 14 v46 a2 2 0 0 1 -2 2 h-44 a2 2 0 0 1 -2 -2 v-58 a2 2 0 0 1 2 -2 z" fill={color} />
    <path d="M36 2 v14 h14" fill="rgba(255,255,255,0.35)" />
    {photo ? (
      <>
        <rect x={10} y={26} width={34} height={26} rx={3} fill="rgba(255,255,255,0.55)" />
        <path d="M12 50 l10 -12 l8 8 l5 -5 l8 9 z" fill="rgba(255,255,255,0.9)" />
      </>
    ) : (
      [26, 34, 42, 50].map((y) => <rect key={y} x={10} y={y} width={y === 50 ? 20 : 32} height={4} rx={2} fill="rgba(255,255,255,0.75)" />)
    )}
  </svg>
);

const DocCard: React.FC<{d: Story['docs'][number]; delay: number}> = ({d, delay}) => {
  const p = useIn(delay);
  return (
    <div
      style={{
        ...rise(p, 40),
        background: C.paper,
        borderRadius: 18,
        padding: '22px 24px',
        display: 'flex',
        gap: 20,
        alignItems: 'center',
        boxShadow: '0 2px 0 rgba(28,35,51,0.04), 0 10px 30px rgba(28,35,51,0.07)',
        border: `1px solid ${C.line}`,
      }}
    >
      <DocIcon color={d.color} photo={d.photo} />
      <div style={{display: 'flex', flexDirection: 'column', gap: 8, minWidth: 0}}>
        <div style={{fontSize: 27, fontWeight: 600, color: C.ink}}>{d.title}</div>
        <div style={{fontSize: 20, color: C.muted, fontFamily: mono, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>{d.sub}</div>
        {d.tag && (
          <div>
            <Chip tone={d.tag[1]}>{d.tag[0]}</Chip>
          </div>
        )}
      </div>
    </div>
  );
};

const FolderIcon: React.FC = () => (
  <svg width={64} height={52} viewBox="0 0 64 52">
    <path d="M2 8 a4 4 0 0 1 4 -4 h18 l6 6 h28 a4 4 0 0 1 4 4 v32 a4 4 0 0 1 -4 4 h-52 a4 4 0 0 1 -4 -4 z" fill="#D9A441" />
    <path d="M2 18 h60 v28 a4 4 0 0 1 -4 4 h-52 a4 4 0 0 1 -4 -4 z" fill="#E8B955" />
  </svg>
);

// ---------- scenes ----------

const S1Maria: React.FC = () => {
  const s = useStory();
  const phone = useIn(1.6, 18);
  const cap = useIn(0.6);
  return (
    <AbsoluteFill style={{background: `radial-gradient(1200px 800px at 30% 40%, ${C.night2}, ${C.night})`}}>
      <div style={{position: 'absolute', left: 40, top: 40}}>
        <MariaAtDesk />
      </div>
      <div
        style={{
          position: 'absolute',
          left: 1250,
          top: 150,
          width: 400,
          height: 780,
          borderRadius: 54,
          background: '#0B0F1A',
          padding: 16,
          transform: `scale(${0.85 + phone * 0.15}) rotate(${(1 - phone) * 6}deg)`,
          opacity: phone,
          boxShadow: '0 40px 90px rgba(0,0,0,0.45)',
        }}
      >
        <div style={{width: '100%', height: '100%', borderRadius: 40, overflow: 'hidden', background: '#FBE9EE', position: 'relative'}}>
          <svg width={368} height={480} viewBox="0 0 368 480" style={{position: 'absolute', top: 0}}>
            <defs>
              <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor={s.phone.sky[0]} />
                <stop offset="1" stopColor={s.phone.sky[1]} />
              </linearGradient>
            </defs>
            <rect width={368} height={480} fill="url(#sky)" />
            <path d="M0 400 L60 340 L110 370 L184 250 L258 370 L300 340 L368 400 V480 H0 Z" fill={s.phone.hills} />
            <path d="M184 250 L210 290 L196 286 L184 300 L172 286 L158 290 Z" fill="#fff" />
            {s.phone.blossom && (
              <g transform="translate(-60 30) scale(0.62)">
                <Branch />
              </g>
            )}
          </svg>
          <div style={{position: 'absolute', top: 500, left: 30, right: 30}}>
            <div style={{fontSize: 22, color: C.pinkDeep, fontWeight: 600, letterSpacing: 0.2}}>{s.phone.label}</div>
            <div style={{fontSize: 44, fontWeight: 700, color: C.ink, marginTop: 10, lineHeight: 1.1}}>{s.phone.title}</div>
            <div style={{fontSize: 24, color: C.muted, marginTop: 14}}>{s.phone.sub}</div>
          </div>
        </div>
      </div>
      <div style={{position: 'absolute', left: 120, bottom: 64, ...rise(cap)}}>
        <div style={{fontSize: 64, fontWeight: 700, color: '#fff'}}>{s.name}</div>
        <div style={{fontSize: 30, color: 'rgba(255,255,255,0.75)', marginTop: 8}}>
          {s.tagline}
        </div>
      </div>
    </AbsoluteFill>
  );
};

const S2Pile: React.FC = () => {
  const s = useStory();
  const cue = useCue();
  const head = useIn(0.2);
  const cloud = useIn(cue.cloud, 20);
  return (
    <AbsoluteFill style={{background: C.cream, fontFamily}}>
      <div style={{position: 'absolute', left: 80, top: 70, display: 'flex', alignItems: 'center', gap: 20, ...rise(head)}}>
        <FolderIcon />
        <div>
          <div style={{fontSize: 22, color: C.muted}}>Family NAS</div>
          <div style={{fontSize: 40, fontWeight: 600, color: C.ink, fontFamily: mono}}>Personal/Travel</div>
        </div>
      </div>
      <div style={{position: 'absolute', left: 80, top: 210, width: 1060, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 22}}>
        {s.docs.map((d, i) => (
          <DocCard key={d.title} d={d} delay={0.6 + i * 0.45} />
        ))}
      </div>
      <div style={{position: 'absolute', left: 1230, top: 200, width: 620}}>
        {s.tabs.map((t, i) => {
          const p = useIn(cue.tabs + i * 0.55, 22);
          return (
            <div
              key={t}
              style={{
                position: 'absolute',
                top: i * 74,
                left: i * 18,
                width: 560,
                opacity: p,
                transform: `translateX(${(1 - p) * 80}px) rotate(${(i % 2 ? 1 : -1) * 1.2}deg)`,
                background: C.paper,
                borderRadius: 14,
                border: `1px solid ${C.line}`,
                boxShadow: '0 12px 30px rgba(28,35,51,0.10)',
                padding: '18px 22px',
                display: 'flex',
                alignItems: 'center',
                gap: 14,
              }}
            >
              <div style={{width: 18, height: 18, borderRadius: 9, background: ['#B83A48', '#2F5D8A', '#C9506F', '#8C7A5B', '#3E8A72'][i]}} />
              <div style={{fontSize: 23, color: C.ink, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>{t}</div>
            </div>
          );
        })}
        <div
          style={{
            position: 'absolute',
            top: 470,
            left: 30,
            width: 540,
            ...rise(cloud, 30),
            background: C.paper,
            borderRadius: 20,
            border: `2px solid ${C.red}`,
            padding: '26px 28px',
          }}
        >
          <div style={{fontSize: 22, color: C.muted}}>Cloud chatbot</div>
          <div style={{fontSize: 30, fontWeight: 600, color: C.ink, marginTop: 8}}>Upload a photo of your passport</div>
          <div style={{display: 'flex', alignItems: 'center', gap: 14, marginTop: 18}}>
            <Mark kind="no" size={38} />
            <div style={{fontSize: 26, color: C.red, fontWeight: 600}}>Not with {s.her} passport.</div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const ChatHeader: React.FC = () => (
  <div style={{display: 'flex', alignItems: 'center', gap: 16, padding: '24px 34px', borderBottom: `1px solid ${C.line}`}}>
    <svg width={40} height={40} viewBox="0 0 40 40">
      <rect x={6} y={4} width={28} height={32} rx={5} fill={C.ink} />
      {[11, 19, 27].map((y) => (
        <rect key={y} x={11} y={y} width={18} height={3} rx={1.5} fill="#6EE7B7" opacity={0.85} />
      ))}
    </svg>
    <div>
      <div style={{fontSize: 27, fontWeight: 600, color: C.ink}}>NAS assistant</div>
      <div style={{fontSize: 19, color: C.muted}}>Runs on the home NAS · mock-up</div>
    </div>
  </div>
);

const S3Ask: React.FC = () => {
  const REQUEST = useStory().request;
  const f = useCurrentFrame();
  const win = useIn(0, 22);
  const n = Math.floor(interpolate(f, [12, 12 + 3.2 * FPS], [0, REQUEST.length], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}));
  const sent = useIn(3.9);
  const caret = Math.floor(f / 15) % 2 === 0 && n < REQUEST.length;
  return (
    <AbsoluteFill style={{background: `linear-gradient(160deg, ${C.cream}, #EDE3D6)`, fontFamily, alignItems: 'center', justifyContent: 'center'}}>
      <div
        style={{
          width: 1300,
          height: 760,
          background: C.paper,
          borderRadius: 28,
          boxShadow: '0 40px 100px rgba(28,35,51,0.16)',
          opacity: win,
          transform: `translateY(${(1 - win) * 40}px)`,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        <ChatHeader />
        <div style={{flex: 1, padding: '40px 40px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', gap: 22}}>
          <div
            style={{
              alignSelf: 'flex-end',
              maxWidth: 900,
              background: C.ink,
              color: '#fff',
              borderRadius: '26px 26px 6px 26px',
              padding: '24px 30px',
              fontSize: 34,
              lineHeight: 1.4,
              ...rise(sent, 10),
              opacity: sent,
            }}
          >
            {REQUEST}
          </div>
          <div style={{alignSelf: 'flex-start', opacity: sent, display: 'flex', gap: 12, alignItems: 'center'}}>
            <Chip tone="blue">Skill: passport-mobility-planner</Chip>
          </div>
        </div>
        <div style={{margin: '0 34px 34px', border: `1.5px solid ${C.line}`, borderRadius: 18, padding: '22px 26px', fontSize: 30, color: C.ink, minHeight: 90, lineHeight: 1.35}}>
          {sent < 0.5 ? (
            <>
              {REQUEST.slice(0, n)}
              <span style={{opacity: caret ? 1 : 0, color: C.blue}}>|</span>
            </>
          ) : (
            <span style={{color: C.faint}}>Message the NAS assistant</span>
          )}
        </div>
      </div>
    </AbsoluteFill>
  );
};

const AgentCard: React.FC<{c: Story['calls'][number]; start: number}> = ({c, start}) => {
  const f = useCurrentFrame();
  const p = useIn(start);
  const done = f > (start + 1.3) * FPS;
  const spin = (f * 12) % 360;
  return (
    <div
      style={{
        ...rise(p, 30),
        background: C.paper,
        border: `1px solid ${done ? '#BFE0CF' : C.line}`,
        borderRadius: 18,
        padding: '28px 30px',
        display: 'grid',
        gridTemplateColumns: '270px 1fr 210px',
        alignItems: 'center',
        gap: 24,
        boxShadow: '0 8px 24px rgba(28,35,51,0.06)',
      }}
    >
      <div style={{fontFamily: mono, fontSize: 29, fontWeight: 500, color: C.blue}}>{c.agent}</div>
      <div>
        <div style={{fontSize: 26, color: C.ink, lineHeight: 1.3}}>{c.task}</div>
        <div style={{fontSize: 25, color: done ? C.green : C.faint, marginTop: 8, fontWeight: 600, opacity: done ? 1 : 0.0}}>{c.result}</div>
      </div>
      <div style={{justifySelf: 'end'}}>
        {done ? (
          <Chip tone="green">completed</Chip>
        ) : (
          <div style={{display: 'flex', alignItems: 'center', gap: 10, color: C.muted, fontSize: 21}}>
            <svg width={26} height={26} viewBox="0 0 26 26" style={{transform: `rotate(${spin}deg)`}}>
              <circle cx={13} cy={13} r={10} stroke={C.line} strokeWidth={4} fill="none" />
              <path d="M13 3 a10 10 0 0 1 10 10" stroke={C.blue} strokeWidth={4} fill="none" strokeLinecap="round" />
            </svg>
            working
          </div>
        )}
      </div>
    </div>
  );
};

const S4Agents: React.FC = () => {
  const s = useStory();
  const head = useIn(0.1);
  const badge = useIn(useCue().badge, 20);
  return (
    <AbsoluteFill style={{background: C.cream, fontFamily}}>
      <div style={{position: 'absolute', left: 80, top: 64, ...rise(head)}}>
        <div style={{fontSize: 24, color: C.muted}}>The Skill delegates to the NAS's own agents</div>
        <div style={{fontSize: 46, fontWeight: 700, color: C.ink, marginTop: 6}}>Finding and reading {s.first}'s documents</div>
      </div>
      <div style={{position: 'absolute', left: 80, right: 80, top: 190, display: 'flex', flexDirection: 'column', gap: 12}}>
        {s.calls.map((c, i) => (
          <AgentCard key={i} c={c} start={0.8 + i * 2.0} />
        ))}
      </div>
      <div
        style={{
          position: 'absolute',
          left: 80,
          bottom: 96,
          ...rise(badge, 20),
          display: 'flex',
          alignItems: 'center',
          gap: 18,
          background: C.ink,
          color: '#fff',
          borderRadius: 16,
          padding: '18px 28px',
          fontSize: 27,
        }}
      >
        <svg width={30} height={34} viewBox="0 0 30 34">
          <rect x={3} y={14} width={24} height={18} rx={4} fill="#6EE7B7" />
          <path d="M8 14 v-4 a7 7 0 0 1 14 0 v4" stroke="#6EE7B7" strokeWidth={3.5} fill="none" />
        </svg>
        Runs on the NAS. Document numbers come back masked. Nothing is uploaded.
      </div>
      <Footnote />
    </AbsoluteFill>
  );
};

const CheckRow: React.FC<{kind: 'ok' | 'no' | 'arrow'; title: string; detail: string; at: number}> = ({kind, title, detail, at}) => {
  const p = useIn(at);
  return (
    <div style={{...rise(p, 20), display: 'flex', gap: 26, alignItems: 'flex-start', padding: '34px 0', borderBottom: `1px solid ${C.line}`}}>
      <Mark kind={kind} size={54} />
      <div>
        <div style={{fontSize: 38, fontWeight: 600, color: C.ink}}>{title}</div>
        <div style={{fontSize: 28, color: C.muted, marginTop: 8}}>{detail}</div>
      </div>
    </div>
  );
};

const Fact: React.FC<{label: string; value: string; at: number}> = ({label, value, at}) => {
  const p = useIn(at);
  return (
    <div style={{...rise(p, 16)}}>
      <div style={{fontSize: 24, color: C.muted}}>{label}</div>
      <div style={{fontSize: 40, fontWeight: 700, color: C.ink, marginTop: 4}}>{value}</div>
    </div>
  );
};

const S5Checks: React.FC = () => {
  const s = useStory();
  const cue = useCue();
  const head = useIn(0.1);
  const card = useIn(cue.card, 22);
  const src = useIn(cue.source);
  return (
    <AbsoluteFill style={{background: C.cream, fontFamily}}>
      <div style={{position: 'absolute', left: 80, top: 64, ...rise(head)}}>
        <div style={{fontSize: 24, color: C.muted}}>{s.checks.eyebrow}</div>
        <div style={{fontSize: 46, fontWeight: 700, color: C.ink, marginTop: 6}}>{s.checks.title}</div>
      </div>
      <div style={{position: 'absolute', left: 80, top: 220, width: 900}}>
        {s.checks.rows.map((c) => (
          <CheckRow key={c.title} {...c} />
        ))}
      </div>
      <div
        style={{
          position: 'absolute',
          left: 1060,
          top: 220,
          width: 780,
          ...rise(card, 30),
          background: C.paper,
          borderRadius: 24,
          border: `1px solid ${C.line}`,
          boxShadow: '0 20px 50px rgba(28,35,51,0.10)',
          padding: '48px 50px',
        }}
      >
        <div style={{fontFamily: mono, fontSize: 25, color: C.blue}}>{s.card.code}</div>
        <div style={{fontSize: 44, fontWeight: 700, color: C.ink, marginTop: 8}}>{s.card.title}</div>
        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, marginTop: 40}}>
          {s.card.facts.map((x) => (
            <Fact key={x.label} {...x} />
          ))}
        </div>
        <div style={{...rise(src, 10), marginTop: 44, paddingTop: 28, borderTop: `1px solid ${C.line}`, fontSize: 26, color: C.muted}}>
          Source: <span style={{fontFamily: mono, color: C.ink}}>{s.card.source}</span>, checked {s.card.checked}
        </div>
      </div>
      <Footnote />
    </AbsoluteFill>
  );
};

const S6Gaps: React.FC = () => {
  const s = useStory();
  const cue = useCue();
  const f = useCurrentFrame();
  const head = useIn(0.1);
  const ins = useIn(cue.note, 20);
  const hot = interpolate(f, [cue.hot * FPS, (cue.hot + 0.6) * FPS], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{background: C.cream, fontFamily}}>
      <div style={{position: 'absolute', left: 80, top: 64, ...rise(head)}}>
        <div style={{fontSize: 24, color: C.muted}}>{s.gaps.eyebrow}</div>
        <div style={{fontSize: 46, fontWeight: 700, color: C.ink, marginTop: 6}}>What {s.her === 'his' ? 'he' : 'she'} has, what's missing</div>
      </div>
      <div style={{position: 'absolute', left: 80, top: 220, width: 1100, background: C.paper, borderRadius: 24, border: `1px solid ${C.line}`, overflow: 'hidden'}}>
        {s.gaps.needs.map((n, i) => {
          const p = useIn(n.at);
          const glow = n.hot ? hot : 0;
          return (
            <div
              key={n.item}
              style={{
                ...rise(p, 14),
                display: 'grid',
                gridTemplateColumns: '70px 380px 1fr',
                alignItems: 'center',
                padding: '40px 40px',
                borderTop: i ? `1px solid ${C.line}` : 'none',
                background: `rgba(251,239,217,${glow})`,
              }}
            >
              <Mark kind={n.status === 'have' ? 'ok' : 'missing'} size={50} />
              <div style={{fontSize: 36, fontWeight: 600, color: C.ink}}>{n.item}</div>
              <div style={{fontSize: 26, color: C.muted, fontFamily: n.status === 'have' ? mono : fontFamily}}>{n.note}</div>
            </div>
          );
        })}
      </div>
      <div style={{position: 'absolute', left: 1240, top: 220, width: 600, display: 'flex', flexDirection: 'column', gap: 24, ...rise(ins, 30)}}>
        {s.gaps.notes.map((n) => {
          const two = s.gaps.notes.length > 1;
          const [bg, fg, edge] = n.tone === 'red' ? [C.redBg, C.red, '#EDB9BF'] : [C.amberBg, C.amber, '#EBCB91'];
          return (
            <div key={n.title} style={{background: bg, borderRadius: 24, padding: two ? '34px 40px' : '44px 44px', border: `1px solid ${edge}`}}>
              <div style={{fontSize: 22, color: fg, fontWeight: 600}}>{n.label}</div>
              <div style={{fontSize: two ? 34 : 40, fontWeight: 700, color: C.ink, marginTop: 12, lineHeight: 1.25}}>{n.title}</div>
              <div style={{fontSize: two ? 25 : 28, color: C.muted, marginTop: 14, lineHeight: 1.4}}>{n.body}</div>
            </div>
          );
        })}
      </div>
      <Footnote />
    </AbsoluteFill>
  );
};

const S7Plan: React.FC = () => {
  const s = useStory();
  const STEPS = s.plan.steps;
  const f = useCurrentFrame();
  const head = useIn(0.1);
  const line = interpolate(f, [0.8 * FPS, useCue().line * FPS], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.inOut(Easing.cubic)});
  const left = 140;
  const width = 1640;
  return (
    <AbsoluteFill style={{background: C.cream, fontFamily}}>
      <div style={{position: 'absolute', left: 80, top: 64, ...rise(head)}}>
        <div style={{fontSize: 24, color: C.muted}}>The plan, dated from today, {s.plan.today}</div>
        <div style={{fontSize: 46, fontWeight: 700, color: C.ink, marginTop: 6}}>What {s.first} does, in order</div>
      </div>
      <div style={{position: 'absolute', left, top: 470, width, height: 6, borderRadius: 3, background: C.line}} />
      <div style={{position: 'absolute', left, top: 470, width: width * line, height: 6, borderRadius: 3, background: C.ink}} />
      {STEPS.map((s, i) => {
        const p = useIn(s.at, 16);
        const x = left + (i / (STEPS.length - 1)) * width;
        const up = i % 2 === 0;
        const color = {blue: C.blue, amber: C.amber, green: C.green}[s.tone];
        return (
          <React.Fragment key={i}>
            <div
              style={{
                position: 'absolute',
                left: x - 18,
                top: 455,
                width: 36,
                height: 36,
                borderRadius: 18,
                background: C.paper,
                border: `6px solid ${color}`,
                transform: `scale(${p})`,
              }}
            />
            <div
              style={{
                position: 'absolute',
                left: Math.min(Math.max(x - 170, 40), 1920 - 380),
                top: up ? 230 : 540,
                width: 340,
                opacity: p,
                transform: `translateY(${(1 - p) * (up ? 20 : -20)}px)`,
                background: C.paper,
                borderRadius: 18,
                border: `1px solid ${C.line}`,
                padding: '20px 24px',
                boxShadow: '0 10px 30px rgba(28,35,51,0.08)',
              }}
            >
              <div style={{fontSize: 27, fontWeight: 700, color}}>{s.when}</div>
              <div style={{fontSize: 28, color: C.ink, marginTop: 8, lineHeight: 1.3}}>{s.what}</div>
            </div>
          </React.Fragment>
        );
      })}
      <div style={{position: 'absolute', left: 80, bottom: 110, fontSize: 24, color: C.muted}}>
        Rules change. The Skill says to confirm every fee and date on the official page before paying or travelling.
      </div>
      <Footnote />
    </AbsoluteFill>
  );
};

const S8Close: React.FC = () => {
  const s = useStory();
  const t = useIn(0.4);
  const sub = useIn(1.2);
  const pts = [useIn(2.4), useIn(3.0), useIn(3.6)];
  const her = useIn(0.2, 24);
  return (
    <AbsoluteFill style={{background: 'linear-gradient(180deg, #CFE2F1 0%, #F7DDE5 70%, #F5EFE8 100%)', fontFamily, overflow: 'hidden'}}>
      <svg width={1920} height={1080} style={{position: 'absolute', inset: 0}}>
        <path d="M0 900 L300 800 L560 860 L1240 640 L1500 800 L1640 770 L1920 880 V1080 H0 Z" fill="#E8CBD6" />
        <path d="M1240 640 L1292 716 L1266 708 L1240 734 L1214 708 L1188 716 Z" fill="#fff" />
        <rect x={0} y={900} width={1920} height={180} fill="#EFE3E6" />
        {s.close.blossom && (
          <>
            <g transform="translate(1180 -20) scale(1.2)">
              <Branch flip />
            </g>
            <g transform="translate(1290 40) scale(1.25)">
              <Branch />
            </g>
          </>
        )}
      </svg>
      <Petals color={s.close.petals} />
      <div style={{position: 'absolute', left: 1360, top: 400, ...rise(her, 40)}}>
        <MariaStanding />
      </div>
      <div style={{position: 'absolute', left: 110, top: 210, width: 1100}}>
        <div style={{fontSize: 92, fontWeight: 700, color: C.ink, lineHeight: 1.02, ...rise(t, 30)}}>Passport mobility planner</div>
        <div style={{fontSize: 38, color: C.muted, marginTop: 22, ...rise(sub)}}>A Skill for the UGREEN AI NAS</div>
        <div style={{display: 'flex', flexDirection: 'column', gap: 20, marginTop: 60}}>
          {['Official rules, each with a source and a checked date', "Read against the household's own documents", 'Document numbers masked; nothing leaves the NAS'].map((s, i) => (
            <div key={s} style={{display: 'flex', alignItems: 'center', gap: 18, ...rise(pts[i], 16)}}>
              <Mark kind="ok" size={42} />
              <div style={{fontSize: 34, color: C.ink}}>{s}</div>
            </div>
          ))}
        </div>
      </div>
      <Footnote />
    </AbsoluteFill>
  );
};

const SCENES = [S1Maria, S2Pile, S3Ask, S4Agents, S5Checks, S6Gaps, S7Plan, S8Close];

export const Demo: React.FC<{story: Story}> = ({story}) => {
  const frames = sceneFrames(story.durations);
  let at = 0;
  return (
    <StoryCtx.Provider value={story}>
    <AbsoluteFill style={{background: C.night, fontFamily}}>
      {SCENES.map((Scene, i) => {
        const from = at;
        at += frames[i];
        return (
          <Sequence key={i} from={from} durationInFrames={frames[i]}>
            <Fade dur={frames[i]}>
              <Scene />
            </Fade>
            <Sequence from={Math.round(LEAD * FPS)}>
              <Audio src={staticFile(`audio/${story.id}/${String(i).padStart(2, '0')}.wav`)} />
            </Sequence>
          </Sequence>
        );
      })}
    </AbsoluteFill>
    </StoryCtx.Provider>
  );
};
