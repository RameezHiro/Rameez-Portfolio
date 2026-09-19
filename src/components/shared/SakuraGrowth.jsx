import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

// Sakura Growth System — the portfolio's visual metaphor for growth.
//
// Botanical ink interpretation of the real 3D tree
// (src/components/SakuraTree/createCherryBlossomTreeModel.ts).
//
// ONE tree, eight ages: every stage reveals more of the same underlying
// branch architecture — trunk, primaries, secondaries, tertiaries —
// rather than redrawing a new tree. Each element carries `s`, the first
// stage it appears in. Deterministic: identical input, identical tree,
// every render.
//
// Shared identity:
//   - one strong central trunk with subtle organic curvature
//   - trunk girth grows with age (1.5 → 4)
//   - broad, near-horizontal primaries from one crown zone
//   - deliberate asymmetry: the left reach runs longer, the right
//     side grows denser
//   - lower trunk always bare wood (open corridor beneath the crown)
//   - leaders close the top; canopy ends wide, never spiky
//   - blossoms sit ON the branch structures, denser with age
//
// Usage: <SakuraGrowth stage={1} />
const INK = '#111111';
const GRAY = '#5C5C5C';
const SAKURA = '#D96C8A';
const SAKURA_SOFT = '#D96C8A';

const STAGE_LABELS = [
  'First blossom',
  'First growth',
  'Sapling',
  'Young tree',
  'Growing tree',
  'Established tree',
  'Maturing tree',
  'Mature tree',
  'Expansive tree',
  'Fully realized',
];

// Blossom: five ink-outlined sakura petals around an ink heart.
const Blossom = ({ x, y, s = 1, tone = SAKURA, opacity = 1 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} opacity={opacity} aria-hidden="true">
    {[0, 72, 144, 216, 288].map((a) => (
      <circle
        key={a}
        cx={(Math.cos((a * Math.PI) / 180) * 3.4).toFixed(2)}
        cy={(Math.sin((a * Math.PI) / 180) * 3.4).toFixed(2)}
        r="2.4"
        fill={tone}
      />
    ))}
    <circle r="1.3" fill={INK} />
  </g>
);

// Branch: ink linework that draws itself once (static under reduced motion).
const Branch = ({ d, width = 2, tone = INK, delay = 0, reduceMotion }) => {
  if (reduceMotion) {
    return (
      <path d={d} stroke={tone} strokeWidth={width} fill="none" strokeLinecap="round" />
    );
  }
  return (
    <motion.path
      d={d}
      stroke={tone}
      strokeWidth={width}
      fill="none"
      strokeLinecap="round"
      initial={{ pathLength: 0 }}
      whileInView={{ pathLength: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, ease: 'easeOut', delay }}
    />
  );
};

const Petal = ({ x, y, r = 20, s = 1 }) => (
  <ellipse
    cx={x}
    cy={y}
    rx={2.4 * s}
    ry={4 * s}
    fill={SAKURA}
    opacity="0.7"
    transform={`rotate(${r} ${x} ${y})`}
    aria-hidden="true"
  />
);

// [x, y, scale, tone?] — tone defaults to sakura; 'gray' marks unopened buds.
const BLOSSOM_TONES = { gray: GRAY };

// ── THE TREE ─────────────────────────────────────────────────────
// The trunk every stage shares. Girth only.
const TRUNK_D = 'M100,238 C99,220 101,200 100,180 C99,160 101,145 100,130';
const TRUNK_W = { 1: 1.5, 2: 2, 3: 2.5, 4: 2.5, 5: 3, 6: 3.5, 7: 3.5, 8: 4 };

// Primaries + leaders + secondaries. `s` = first stage visible.
// Left reach runs long; right side grows dense.
const LIMBS = [
  // Stage 1 — the first buds of what become the two lowest primaries.
  { d: 'M100,214 C94,211 89,208 86,203', w: 1.25, s: 1 },
  { d: 'M101,212 C107,209 111,206 114,201', w: 1.25, s: 1 },
  // Stage 2 — the great split: long low limbs both sides.
  { d: 'M100,208 C82,205 60,199 42,188', w: 2, s: 2 },
  { d: 'M101,206 C119,203 137,197 151,186', w: 2, s: 2 },
  // Stage 3 — mid primaries + first skyward leader.
  { d: 'M100,196 C90,192 82,186 77,178', w: 2, s: 3 },
  { d: 'M101,194 C113,190 123,184 129,176', w: 2, s: 3 },
  { d: 'M101,168 C101,158 103,150 107,144', w: 1.5, s: 3 },
  // Stage 4 — upper primaries complete the fan; first secondaries.
  { d: 'M100,186 C93,183 88,179 84,173', w: 1.75, s: 4 },
  { d: 'M101,186 C110,183 117,178 121,171', w: 1.75, s: 4 },
  { d: 'M56,193 C62,188 65,182 67,175', w: 1.5, s: 4 },
  { d: 'M137,194 C142,189 145,183 147,176', w: 1.5, s: 4 },
  // Stage 5 — second leaders; forks deepen along the long limbs.
  { d: 'M103,172 C107,168 111,163 114,157', w: 1.5, s: 5 },
  { d: 'M72,196 C77,191 79,186 80,180', w: 1.5, s: 5 },
  { d: 'M122,197 C127,192 129,187 130,181', w: 1.5, s: 5 },
  { d: 'M86,186 C90,181 92,176 93,170', w: 1.5, s: 5 },
  // Stage 6 — third leader; tertiary layer begins.
  { d: 'M99,160 C99,152 100,146 102,140', w: 1.5, s: 6 },
  { d: 'M118,184 C122,179 124,174 125,168', w: 1.5, s: 6 },
  { d: 'M90,178 C93,174 94,170 95,166', w: 1.5, s: 6 },
  { d: 'M112,178 C115,174 116,170 117,166', w: 1.5, s: 6 },
];

// Fine tertiary twigs (gray). Appear late, deepen the crown.
const TWIGS = [
  { d: 'M100,232 L93,238', s: 2 },
  { d: 'M100,232 L107,238', s: 2 },
  { d: 'M48,190 C53,186 55,181 56,176', s: 5 },
  { d: 'M144,190 C148,186 150,181 151,176', s: 5 },
  { d: 'M66,194 C70,190 71,185 72,180', s: 6 },
  { d: 'M130,190 C133,186 134,181 135,176', s: 6 },
  { d: 'M107,158 C109,154 110,150 111,146', s: 6 },
  { d: 'M60,196 C64,192 65,187 66,182', s: 7 },
  { d: 'M126,192 C129,188 130,183 131,178', s: 7 },
  { d: 'M96,188 C99,184 100,180 101,176', s: 7 },
  { d: 'M80,182 C83,178 84,174 85,170', s: 8 },
  { d: 'M140,182 C143,178 144,174 145,170', s: 8 },
];

// Dome linework. Appears once limbs exist to hold it.
const CANOPY = [
  { d: 'M36,168 q8,-10 16,0 q8,-10 16,0', s: 5 },
  { d: 'M138,158 q8,-10 16,0 q8,-10 16,0', s: 5 },
  { d: 'M86,140 q8,-10 16,0 q8,-10 16,0', s: 5 },
  { d: 'M52,188 q8,-10 16,0 q8,-10 16,0', s: 6 },
  { d: 'M148,178 q8,-10 16,0 q8,-10 16,0', s: 6 },
  { d: 'M66,128 q8,-10 16,0 q8,-10 16,0', s: 7 },
  { d: 'M118,132 q8,-10 16,0 q8,-10 16,0', s: 7 },
  { d: 'M100,118 q8,-10 16,0 q8,-10 16,0', s: 8 },
];

// Blossoms live ON the limbs above, denser with age.
// [x, y, scale, tone?, firstStage]
const BLOSSOMS = [
  [114, 199, 0.8, null, 1],
  [86, 201, 0.7, null, 1],
  [100, 190, 0.65, null, 1],
  [120, 206, 0.6, 'gray', 1],
  [80, 203, 0.85, null, 2],
  [60, 198, 0.8, null, 2],
  [120, 202, 0.85, null, 2],
  [138, 196, 0.8, null, 2],
  [42, 188, 0.9, null, 2],
  [151, 186, 0.9, null, 2],
  [90, 192, 0.8, null, 3],
  [77, 178, 0.85, null, 3],
  [113, 190, 0.8, null, 3],
  [129, 176, 0.85, null, 3],
  [107, 144, 0.9, null, 3],
  [66, 192, 0.75, null, 4],
  [144, 190, 0.75, null, 4],
  [67, 175, 0.8, null, 4],
  [147, 176, 0.8, null, 4],
  [84, 173, 0.8, null, 4],
  [72, 196, 0.8, null, 5],
  [80, 180, 0.8, null, 5],
  [122, 197, 0.8, null, 5],
  [130, 181, 0.8, null, 5],
  [114, 157, 0.85, null, 5],
  [86, 186, 0.75, null, 5],
  [56, 193, 0.7, 'gray', 5],
  [48, 190, 0.85, null, 6],
  [144, 190, 0.75, null, 6],
  [60, 196, 0.8, null, 6],
  [135, 188, 0.8, null, 6],
  [93, 170, 0.8, null, 6],
  [125, 168, 0.8, null, 6],
  [111, 146, 0.9, null, 6],
  [36, 192, 0.8, null, 7],
  [154, 188, 0.8, null, 7],
  [52, 184, 0.85, null, 7],
  [146, 182, 0.85, null, 7],
  [102, 140, 0.9, null, 7],
  [99, 158, 0.8, null, 7],
  [30, 196, 0.75, null, 8],
  [158, 192, 0.75, null, 8],
  [46, 182, 0.85, null, 8],
  [150, 178, 0.85, null, 8],
  [104, 150, 0.85, null, 8],
  [94, 180, 0.75, null, 8],
];

// Settled petals multiply as the crown fills.
const PETALS = [
  { x: 160, y: 202, r: 25, s: 5 },
  { x: 52, y: 212, r: -20, s: 5 },
  { x: 120, y: 222, r: 10, s: 5 },
  { x: 182, y: 182, r: -30, s: 6 },
  { x: 38, y: 208, r: -20, s: 6 },
  { x: 70, y: 228, r: 15, s: 7 },
  { x: 184, y: 178, r: -30, s: 7 },
  { x: 152, y: 216, r: -12, s: 8 },
];

// Stage = everything in the tree old enough to exist yet.
const configForStage = (stage) => ({
  branches: [
    { d: TRUNK_D, width: TRUNK_W[stage] ?? 2 },
    ...LIMBS.filter((limb) => limb.s <= stage),
  ],
  twigs: TWIGS.filter((twig) => twig.s <= stage),
  canopy: CANOPY.filter((arc) => arc.s <= stage).map((arc) => arc.d),
  blossoms: BLOSSOMS.filter((b) => b[4] <= stage),
  petals: PETALS.filter((petal) => petal.s <= stage),
});

const STAGE_ZERO = {
  branches: [{ d: 'M104,238 C106,224 104,214 112,204' }],
  twigs: [],
  canopy: [],
  blossoms: [[112, 201, 1]],
  petals: [],
};

const SakuraGrowth = ({ stage = 1, className = '', label }) => {
  const reduceMotion = useReducedMotion();
  const config =
    stage === 0
      ? STAGE_ZERO
      : stage >= 1 && stage <= 8
        ? configForStage(stage)
        : configForStage(8);
  const ariaLabel = label ?? `Sakura growth stage ${stage} — ${STAGE_LABELS[stage] ?? 'growth'}`;
  let delay = 0;
  const nextDelay = () => {
    const current = delay;
    delay += 0.12;
    return current;
  };

  return (
    <svg
      viewBox="0 0 220 260"
      className={className}
      role="img"
      aria-label={ariaLabel}
    >
      {/* ground */}
      <line x1="20" y1="238" x2="200" y2="238" stroke={INK} strokeOpacity="0.35" strokeWidth="1" />
      {/* canopy linework sits behind branches */}
      {config.canopy.map((d, i) => (
        <path
          key={`canopy-${i}`}
          d={d}
          stroke={INK}
          strokeOpacity="0.45"
          strokeWidth="1.25"
          fill="none"
          strokeLinecap="round"
        />
      ))}
      {/* twigs (gray) then branches (ink) */}
      {config.twigs.map((twig, i) => (
        <Branch
          key={`twig-${i}`}
          d={twig.d}
          width={1.25}
          tone={GRAY}
          delay={nextDelay()}
          reduceMotion={reduceMotion}
        />
      ))}
      {config.branches.map((branch, i) => (
        <Branch
          key={`branch-${i}`}
          d={branch.d}
          width={branch.width ?? 2}
          tone={branch.tone ?? INK}
          delay={nextDelay()}
          reduceMotion={reduceMotion}
        />
      ))}
      {/* blossoms fade in after the linework */}
      {config.blossoms.map(([x, y, s, tone], i) =>
        reduceMotion ? (
          <Blossom
            key={`blossom-${i}`}
            x={x}
            y={y}
            s={s}
            tone={tone === 'gray' ? GRAY : SAKURA_SOFT}
          />
        ) : (
          <motion.g
            key={`blossom-${i}`}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.3 + i * 0.05 }}
          >
            <Blossom
              x={x}
              y={y}
              s={s}
              tone={tone === 'gray' ? GRAY : SAKURA_SOFT}
            />
          </motion.g>
        )
      )}
      {/* settled petals */}
      {config.petals.map((petal, i) => (
        <Petal key={`petal-${i}`} x={petal.x} y={petal.y} r={petal.r} />
      ))}
    </svg>
  );
};

export default SakuraGrowth;
