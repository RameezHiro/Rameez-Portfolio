import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import useChapterObserver from '../../hooks/useChapterObserver';
import chaptersData from '../../data/chapters';
import SakuraGrowth from '../shared/SakuraGrowth';
import SectionLabel from '../ui/SectionLabel';

// Chapter 06 — EVOLUTION. The capability ledger: four shifts in how the work
// is made, each tied to something already built. No new projects, no metrics,
// and no claim that a project proves expertise. The loop itself belongs to
// Chapter 02; this chapter only records where it led.
const TURNS = [
  {
    index: '01',
    title: 'SCRIPTS → SERVICES',
    then: 'One file that runs once.',
    now: 'Routes, schemas, and services kept apart — an API with a shape other code can depend on.',
    evidence: 'AAROH backend · Task Manager API',
  },
  {
    index: '02',
    title: 'NOTEBOOKS → ARTIFACTS',
    then: 'A notebook that ends at a score.',
    now: 'A trained model committed to the repository and loaded by the service at runtime.',
    evidence: 'AAROH · train_model.py + model.pkl',
  },
  {
    index: '03',
    title: 'DEMOS → FAILURE PATHS',
    then: 'A demo that works when nothing goes wrong.',
    now: 'Signature checks, a 10 MB ceiling, a validated JSON contract, a fallback model — and test suites kept in the repository.',
    evidence: 'Decode AI · AAROH · GrenMon — tests inspected, not run',
  },
  {
    index: '04',
    title: 'SOLO → DEADLINE',
    then: 'Building alone, at my own pace.',
    now: 'A 24-hour team build, scoped to what could actually ship before the clock ran out.',
    evidence: 'UAi Hawk-A-Thon · team Algovoid',
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

const Chapter06 = () => {
  const { scrollToChapter } = useChapterObserver();
  const nextTitle = chaptersData.getChapterById('07')?.title || 'CURRENT ARC';

  return (
    <div>
      {/* A. OPENING — the claim this chapter has to support */}
      <Reveal>
        <SectionLabel index="Scene 01" label="What changed" />
        <p className="mt-5 max-w-3xl font-display text-3xl font-bold leading-tight text-ink md:text-5xl">
          The stack grew. That was the{' '}
          <span className="text-sakura-text">least interesting</span> part.
        </p>
        <p className="mt-5 max-w-2xl font-body text-base leading-relaxed text-manga-gray md:text-lg">
          The useful change was quieter: the questions got larger. Four turns,
          each traceable to something already built.
        </p>
      </Reveal>

      {/* B. LEDGER — then/now pairs, evidence attached to every row */}
      <div className="mt-14 md:mt-20">
        <Reveal>
          <h3 className="font-body text-xs uppercase tracking-[0.3em] text-manga-gray">
            Four turns
          </h3>
        </Reveal>
        <ol className="mt-6 border-t-2 border-ink">
          {TURNS.map((turn, i) => (
            <Reveal key={turn.title} delay={Math.min(i * 0.05, 0.15)}>
              <li className="border-b border-ink/15 py-6 md:py-8">
                <div className="grid grid-cols-12 gap-x-4 gap-y-3">
                  <span
                    className="col-span-2 shrink-0 font-tech text-sm text-manga-gray md:col-span-1"
                    aria-hidden="true"
                  >
                    {turn.index}
                  </span>
                  <div className="col-span-10 md:col-span-11">
                    <h4 className="font-display text-xl font-bold tracking-tight text-ink md:text-3xl">
                      {turn.title}
                    </h4>
                    <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-8">
                      <div>
                        <p className="font-tech text-[11px] uppercase tracking-[0.2em] text-manga-gray">
                          Then
                        </p>
                        <p className="mt-1.5 font-body text-sm leading-relaxed text-manga-gray">
                          {turn.then}
                        </p>
                      </div>
                      <div>
                        <p className="font-tech text-[11px] uppercase tracking-[0.2em] text-sakura-text">
                          Now
                        </p>
                        <p className="mt-1.5 font-body text-sm leading-relaxed text-ink md:text-base">
                          {turn.now}
                        </p>
                      </div>
                    </div>
                    <p className="mt-4 font-tech text-[11px] uppercase leading-relaxed tracking-[0.18em] text-manga-gray">
                      <span aria-hidden="true">↳ </span>
                      {turn.evidence}
                    </p>
                  </div>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
        <p className="mt-4 max-w-2xl font-body text-xs leading-relaxed text-manga-gray">
          Not a ranking. The repositories show the work; they do not prove
          expertise.
        </p>
      </div>

      {/* C. CLOSING — the same growth marker, one stage further */}
      <Reveal className="mt-16 md:mt-24">
        <div className="border-t-2 border-ink pt-10 md:pt-14">
          <p className="font-body text-xs uppercase tracking-[0.3em] text-manga-gray">
            Still becoming
          </p>
          <div className="mt-6 grid grid-cols-1 items-start gap-10 md:grid-cols-[1fr_200px] md:gap-8">
            <div>
              <p className="max-w-2xl font-body text-base leading-relaxed text-manga-gray md:text-lg">
                The goal was never to know everything.
              </p>
              <p className="mt-4 max-w-3xl font-display text-3xl font-bold leading-tight text-ink md:text-5xl">
                It was to understand more than I did{' '}
                <span className="text-sakura-text">yesterday</span>.
              </p>
              <p className="mt-8 font-tech text-xs uppercase tracking-[0.2em] text-manga-gray">
                Evolution · Still in progress
              </p>
            </div>
            <figure className="w-40 md:w-full md:max-w-[200px] md:pt-2">
              <SakuraGrowth stage={6} className="h-auto w-full" />
              <figcaption className="mt-2 text-center font-tech text-[11px] uppercase tracking-[0.2em] text-manga-gray">
                Growth · Stage 06
              </figcaption>
            </figure>
          </div>
          <div className="mt-10 flex md:mt-14 md:justify-end">
            <button
              onClick={() => scrollToChapter('07')}
              className="inline-flex items-center gap-3 font-body text-xs uppercase tracking-[0.25em] text-ink hover:text-sakura-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sakura-text"
            >
              Next — Chapter 07 · {nextTitle}
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

export default Chapter06;
