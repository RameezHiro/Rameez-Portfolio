import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import useChapterObserver from '../../hooks/useChapterObserver';
import chaptersData from '../../data/chapters';
import SakuraGrowth from '../shared/SakuraGrowth';

// Chapter 02 — TRAINING. Story-first: the learning loop and the five
// canonical training stages. Stage vocabulary follows Context.md; only
// repo-supported items carry evidence footnotes. No percentages, no metrics.
const LOOP = [
  'LEARN',
  'BUILD',
  'BREAK',
  'FIX',
  'UNDERSTAND',
  'BUILD AGAIN',
];

const STAGES = [
  {
    index: '01',
    name: 'PROGRAMMING',
    items: ['Python', 'Problem Solving', 'DSA'],
    text: 'Learning to think in steps a machine can follow — one error message at a time.',
    note: 'At first, the syntax was the problem.',
    evidence: 'Python',
  },
  {
    index: '02',
    name: 'DATA',
    items: ['NumPy', 'Pandas', 'Visualization'],
    text: 'Learning to read data the way you learn to read a new language — slowly, then all at once.',
    note: 'Then the problem became understanding.',
    evidence: 'Streamlit Learning Projects',
  },
  {
    index: '03',
    name: 'MACHINE LEARNING',
    items: ['Regression', 'Classification', 'Pipelines'],
    text: 'Watching theory survive contact with real code — models that train, fail, and teach.',
    note: null,
    evidence: 'California Housing · ML Pipelines & Algorithms',
  },
  {
    index: '04',
    name: 'BACKEND',
    items: ['SQL', 'APIs', 'FastAPI', 'Databases'],
    text: 'Learning where software keeps its memory — and how pieces talk to each other.',
    note: 'Then understanding became systems.',
    evidence: 'FastAPI · MySQL',
  },
  {
    index: '05',
    name: 'DEVELOPMENT',
    items: ['Git', 'GitHub', 'Deployment', 'Collaboration'],
    text: 'Learning that finished work is versioned, shared, and shipped — not just written.',
    note: 'Every mistake narrowed the gap between knowing and building.',
    evidence: 'Git & GitHub',
  },
];

const Reveal = ({ children, className = '', delay = 0 }) => {
  const reduceMotion = useReducedMotion();
  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, ease: 'easeOut', delay }}
    >
      {children}
    </motion.div>
  );
};

// Margin-note treatment for training annotations: mono kicker, short
// observation, thin sakura rule. Notes from the middle of training.
const MarginNote = ({ children }) => (
  <p className="mt-4 border-l-2 border-sakura pl-3 font-body text-sm italic leading-relaxed text-manga-gray">
    <span className="not-italic font-tech text-[11px] uppercase tracking-[0.2em] text-sakura">
      Note —{' '}
    </span>
    {children}
  </p>
);

const Chapter02 = () => {
  const { scrollToChapter } = useChapterObserver();
  const nextTitle = chaptersData.getChapterById('03')?.title || 'ARSENAL';

  return (
    <div>
      {/* A. OPENING */}
      <Reveal>
        <p className="font-display text-3xl md:text-5xl font-bold leading-tight text-ink max-w-3xl">
          Every skill was another <span className="text-sakura">weapon</span>.
        </p>
        <p className="mt-5 font-body text-base md:text-lg leading-relaxed text-manga-gray max-w-2xl">
          The path wasn’t a straight line. It was repetition.
        </p>
      </Reveal>

      {/* LEARNING LOOP — editorial training sequence, sapling alongside */}
      <Reveal className="mt-14 md:mt-20">
        <h2 className="font-body text-xs uppercase tracking-[0.3em] text-manga-gray">
          The training cycle
        </h2>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-[1fr_200px] gap-10 md:gap-8 items-start">
          <ol
            className="relative border-l-2 border-ink pl-6 md:pl-10 space-y-7 md:space-y-8"
            aria-label="Learn, build, break, fix, understand, build again"
          >
            {LOOP.map((step, i) => {
              const isLast = i === LOOP.length - 1;
              return (
                <li key={`${step}-${i}`} className="relative">
                  <span
                    className={`absolute top-2 -left-6 md:-left-10 -translate-x-1/2 h-2 w-2 ${
                      isLast ? 'bg-sakura' : 'bg-ink'
                    }`}
                    aria-hidden="true"
                  />
                  <span
                    className="font-tech text-xs text-manga-gray block"
                    aria-hidden="true"
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span
                    className={`mt-1 block font-display text-xl md:text-3xl font-bold tracking-wide ${
                      isLast ? 'text-sakura' : 'text-ink'
                    }`}
                  >
                    {step}
                    {isLast && (
                      <span className="ml-3 font-body text-lg text-manga-gray" aria-hidden="true">
                        ↺
                      </span>
                    )}
                  </span>
                </li>
              );
            })}
          </ol>
          <figure className="w-40 md:w-full md:max-w-[200px] md:pt-2">
            <SakuraGrowth stage={2} className="w-full h-auto" />
            <figcaption className="mt-2 font-tech text-[11px] uppercase tracking-[0.2em] text-manga-gray text-center">
              Growth · Stage 02
            </figcaption>
          </figure>
        </div>
        <p className="mt-8 font-body text-xs uppercase tracking-[0.2em] text-manga-gray">
          Recurs across every stage below — not a checklist
        </p>
        <div className="max-w-2xl">
          <MarginNote>
            Every broken thing taught something the tutorial couldn’t.
          </MarginNote>
        </div>
      </Reveal>

      {/* TRAINING PATH — sequential manuscript, denser as it advances */}
      <div className="mt-16 md:mt-24">
        <Reveal>
          <h2 className="font-body text-xs uppercase tracking-[0.3em] text-manga-gray">
            The training path
          </h2>
        </Reveal>
        <div className="mt-6 border-t-2 border-ink">
          {STAGES.map((stage, i) => {
            const late = i >= 2;
            return (
              <Reveal key={stage.name} delay={Math.min(i * 0.06, 0.24)}>
                <section
                  aria-label={`Stage ${stage.index}: ${stage.name}`}
                  className={`border-b border-ink/15 ${
                    i < 2 ? 'py-7 md:py-8' : 'py-8 md:py-10'
                  }`}
                >
                  <div className="flex items-baseline gap-4">
                    <span
                      className={`font-tech text-sm shrink-0 ${
                        late ? 'text-sakura' : 'text-manga-gray'
                      }`}
                      aria-hidden="true"
                    >
                      {stage.index}
                    </span>
                    <h3
                      className={`font-display font-bold tracking-tight text-ink ${
                        i < 2
                          ? 'text-2xl md:text-3xl'
                          : 'text-2xl md:text-4xl'
                      }`}
                    >
                      {stage.name}
                    </h3>
                    {late && (
                      <span
                        className="h-1.5 w-1.5 bg-sakura shrink-0 self-center"
                        aria-hidden="true"
                      />
                    )}
                  </div>
                  <p className="mt-3 font-body text-sm md:text-base leading-relaxed text-manga-gray max-w-2xl">
                    {stage.text}
                  </p>
                  <ul
                    className="mt-4 flex flex-wrap gap-2"
                    aria-label={`${stage.name} focus areas`}
                  >
                    {stage.items.map((item) => (
                      <li
                        key={item}
                        className="border border-ink/30 px-3 py-1.5 font-tech text-xs md:text-sm tracking-wide text-ink"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                  {stage.note && (
                    <div className="max-w-2xl">
                      <MarginNote>{stage.note}</MarginNote>
                    </div>
                  )}
                  <p className="mt-4 font-tech text-[11px] uppercase tracking-[0.2em] text-manga-gray">
                    ↳ Evidence
                  </p>
                  <p className="mt-1 font-body text-sm text-manga-gray">
                    {stage.evidence}
                  </p>
                  {i < STAGES.length - 1 && (
                    <span
                      className="mt-6 block text-center font-body text-xl text-manga-gray"
                      aria-hidden="true"
                    >
                      ↓
                    </span>
                  )}
                </section>
              </Reveal>
            );
          })}
        </div>
      </div>

      {/* CLOSING — end of arc, generous negative space */}
      <Reveal className="mt-20 md:mt-32">
        <div className="border-t-2 border-ink pt-10 md:pt-14">
          <p className="font-body text-xs uppercase tracking-[0.3em] text-manga-gray">
            End of training
          </p>
          <p className="mt-6 font-display text-3xl md:text-5xl font-bold leading-tight text-ink max-w-3xl">
            Training changed the question.
          </p>
          <div className="mt-8 md:mt-10 max-w-2xl">
            <p className="font-body text-base md:text-lg leading-relaxed text-manga-gray">
              Not <em>“what can I learn next?”</em>
            </p>
            <p className="mt-4 font-display text-xl md:text-3xl font-bold leading-snug text-ink">
              But <em className="not-italic">“what can I build with what I know?”</em>
            </p>
          </div>
          <div className="mt-10 md:mt-14 flex md:justify-end">
            <button
              onClick={() => scrollToChapter('03')}
              className="inline-flex items-center gap-3 font-body text-xs uppercase tracking-[0.25em] text-ink hover:text-sakura focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sakura"
            >
              Next — Chapter 03 · {nextTitle}
              <span aria-hidden="true">↓</span>
            </button>
          </div>
        </div>
      </Reveal>

      {/* Bottom clearance so the fixed ChapterRail never covers content */}
      <div className="h-24 md:h-32" aria-hidden="true" />
    </div>
  );
};

export default Chapter02;
