import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import useChapterObserver from '../../hooks/useChapterObserver';
import chaptersData from '../../data/chapters';
import SakuraGrowth from '../shared/SakuraGrowth';

// Chapter 07 — CURRENT ARC. The present-tense chapter: where the story
// stands, not a trophy case. Grounded, calm, technically focused —
// ruled rows, generous air, one strong status moment. No resume summary,
// no progress bars, no invented outcomes.
const FOCUS = [
  { index: '01', name: 'SOFTWARE ENGINEERING', line: 'Building stronger foundations in software, architecture, and development.' },
  { index: '02', name: 'AI / ML', line: 'Going deeper into machine learning and intelligent systems.' },
  { index: '03', name: 'BACKEND & SYSTEMS', line: 'Understanding how APIs, databases, services, and systems work together.' },
  { index: '04', name: 'PROBLEM SOLVING', line: 'Taking on harder technical problems and learning through them.' },
];

const MODE = ['LEARNING', 'BUILDING', 'EXPERIMENTING', 'LEARNING AGAIN'];

const DIRECTION = [
  { name: 'ENGINEERING', line: 'Build stronger software and systems.' },
  { name: 'INTELLIGENCE', line: 'Go deeper into AI and machine learning.' },
  { name: 'PROBLEM SOLVING', line: 'Take on harder technical problems.' },
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

const Chapter07 = () => {
  const { scrollToChapter } = useChapterObserver();
  const nextTitle = chaptersData.getChapterById('08')?.title || 'NEXT';

  return (
    <div>
      {/* A. OPENING */}
      <Reveal>
        <p className="font-display text-3xl md:text-5xl font-bold leading-tight text-ink max-w-3xl">
          This is where the story{' '}
          <span className="text-sakura">currently stands</span>.
        </p>
        <p className="mt-5 font-body text-base md:text-lg leading-relaxed text-manga-gray max-w-2xl">
          The current chapter isn&apos;t a finished state. It&apos;s the point
          I&apos;m building from.
        </p>
      </Reveal>

      {/* B. CURRENT FOCUS — four ruled rows */}
      <div className="mt-16 md:mt-24">
        <Reveal>
          <h2 className="font-body text-xs uppercase tracking-[0.3em] text-manga-gray">
            Current focus
          </h2>
        </Reveal>
        <div className="mt-6 border-t-2 border-ink">
          {FOCUS.map((row, i) => (
            <Reveal key={row.name} delay={Math.min(i * 0.05, 0.15)}>
              <section
                aria-label={`Focus ${row.index}: ${row.name}`}
                className="border-b border-ink/15 py-6 md:py-7"
              >
                <div className="flex items-baseline gap-4">
                  <span
                    className="font-tech text-sm text-manga-gray shrink-0"
                    aria-hidden="true"
                  >
                    {row.index}
                  </span>
                  <h3 className="font-display text-xl md:text-2xl font-bold tracking-tight text-ink">
                    {row.name}
                  </h3>
                </div>
                <p className="mt-2 font-body text-sm md:text-base leading-relaxed text-manga-gray max-w-2xl">
                  {row.line}
                </p>
              </section>
            </Reveal>
          ))}
        </div>
      </div>

      {/* C. CURRENT MODE — compact loop, distinct from Chapter 02's spine */}
      <Reveal className="mt-16 md:mt-24">
        <section aria-label="Current mode">
          <h2 className="font-body text-xs uppercase tracking-[0.3em] text-manga-gray">
            Current mode
          </h2>
          <ol
            className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2"
            aria-label="Learning, building, experimenting, learning again"
          >
            {MODE.map((step, i) => (
              <li key={`${step}-${i}`} className="flex items-center gap-3">
                <span
                  className={`font-display text-lg md:text-2xl font-bold tracking-wide ${
                    i === MODE.length - 1 ? 'text-sakura' : 'text-ink'
                  }`}
                >
                  {step}
                </span>
                {i < MODE.length - 1 && (
                  <span className="font-body text-lg text-manga-gray" aria-hidden="true">
                    ↓
                  </span>
                )}
              </li>
            ))}
          </ol>
          <p className="mt-6 font-body text-sm md:text-base leading-relaxed text-manga-gray max-w-2xl">
            Every build creates another question. Every question creates
            another thing to learn.
          </p>
        </section>
      </Reveal>

      {/* D. BUILDING TOWARD — direction, not achievement */}
      <div className="mt-16 md:mt-24">
        <Reveal>
          <h2 className="font-body text-xs uppercase tracking-[0.3em] text-manga-gray">
            Building toward
          </h2>
        </Reveal>
        <div className="mt-6 border-t-2 border-ink">
          {DIRECTION.map((row) => (
            <Reveal key={row.name}>
              <section
                aria-label={row.name}
                className="border-b border-ink/15 py-6 md:py-7"
              >
                <h3 className="font-display text-xl md:text-2xl font-bold tracking-tight text-ink">
                  {row.name}
                </h3>
                <p className="mt-2 font-body text-sm md:text-base leading-relaxed text-manga-gray max-w-2xl">
                  {row.line}
                </p>
              </section>
            </Reveal>
          ))}
        </div>
      </div>

      {/* E. CURRENT STATUS — the chapter's visual moment, tree alongside */}
      <Reveal className="mt-20 md:mt-32">
        <div className="border-t-2 border-ink pt-10 md:pt-14">
          <p className="font-body text-xs uppercase tracking-[0.3em] text-manga-gray">
            Current status
          </p>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-[1fr_200px] gap-10 md:gap-8 items-start">
            <div>
              <p className="font-display text-4xl md:text-6xl font-bold leading-tight text-ink">
                STILL <span className="text-sakura">BUILDING</span>.
              </p>
              <p className="mt-5 font-body text-base md:text-lg leading-relaxed text-manga-gray">
                Not finished.
                <br />
                Not standing still.
              </p>
            </div>
            <figure className="w-40 md:w-full md:max-w-[200px] md:pt-2">
              <SakuraGrowth stage={7} className="w-full h-auto" />
              <figcaption className="mt-2 font-tech text-[11px] uppercase tracking-[0.2em] text-manga-gray text-center">
                Growth · Stage 07
              </figcaption>
            </figure>
          </div>
        </div>
      </Reveal>

      {/* F. CLOSING */}
      <Reveal className="mt-16 md:mt-24">
        <div className="border-t border-ink/30 pt-8 md:pt-10">
          <p className="font-tech text-xs uppercase tracking-[0.25em] text-manga-gray">
            The current arc is still being written.
          </p>
          <div className="mt-8 flex md:justify-end">
            <button
              onClick={() => scrollToChapter('08')}
              className="inline-flex items-center gap-3 font-body text-xs uppercase tracking-[0.25em] text-ink hover:text-sakura focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sakura"
            >
              Next → Chapter 08 · {nextTitle}
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

export default Chapter07;
