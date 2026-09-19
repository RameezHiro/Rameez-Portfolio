import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import useChapterObserver from '../../hooks/useChapterObserver';
import chaptersData from '../../data/chapters';
import SakuraGrowth from '../shared/SakuraGrowth';

// Chapter 08 — NEXT. The forward-looking chapter before the Final scene:
// direction, not destination. Four missions as one connected path, one
// strong destination statement, then an open ending. No roadmaps with
// dates, no invented future products, no mastery claims.
const MISSIONS = [
  {
    index: '01',
    name: 'STRONGER ENGINEERING',
    focus: 'Systems · Architecture · Backend',
    line: 'Build stronger foundations for software that can grow beyond a single feature.',
  },
  {
    index: '02',
    name: 'DEEPER AI',
    focus: 'Machine Learning · AI Engineering · Intelligent Systems',
    line: 'Go deeper into how intelligent systems are built, trained, integrated, and understood.',
  },
  {
    index: '03',
    name: 'HARDER PROBLEMS',
    focus: 'DSA · Algorithms · Problem Solving',
    line: 'Take on harder technical problems and strengthen the reasoning behind the solution.',
  },
  {
    index: '04',
    name: 'BIGGER BUILDS',
    focus: 'Real-world Software · AI Systems',
    line: 'Turn deeper knowledge into larger, more meaningful systems.',
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

const Chapter08 = () => {
  const { scrollToChapter } = useChapterObserver();
  const nextTitle = chaptersData.getChapterById('final')?.title || 'CURRENT ARC';

  return (
    <div>
      {/* A. OPENING */}
      <Reveal>
        <p className="font-display text-3xl md:text-5xl font-bold leading-tight text-ink max-w-3xl">
          The destination isn&apos;t{' '}
          <span className="text-sakura">finished</span>.
        </p>
        <p className="mt-5 font-body text-base md:text-lg leading-relaxed text-manga-gray max-w-2xl">
          The current arc is moving toward deeper engineering, deeper AI
          understanding, harder problems, and larger systems.
        </p>
      </Reveal>

      {/* B. MISSIONS — one connected forward path */}
      <div className="mt-16 md:mt-24">
        <Reveal>
          <h2 className="font-body text-xs uppercase tracking-[0.3em] text-manga-gray">
            The path forward
          </h2>
        </Reveal>
        <div className="mt-6 border-t-2 border-ink">
          {MISSIONS.map((mission, i) => (
            <Reveal key={mission.name} delay={Math.min(i * 0.05, 0.15)}>
              <section
                aria-label={`Mission ${mission.index}: ${mission.name}`}
                className="border-b border-ink/15 py-7 md:py-9"
              >
                <div className="flex items-baseline gap-4">
                  <span
                    className="font-tech text-sm text-manga-gray shrink-0"
                    aria-hidden="true"
                  >
                    {mission.index}
                  </span>
                  <h3 className="font-display text-2xl md:text-3xl font-bold tracking-tight text-ink">
                    {mission.name}
                  </h3>
                </div>
                <p className="mt-3 font-tech text-xs uppercase tracking-[0.2em] text-manga-gray">
                  {mission.focus}
                </p>
                <p className="mt-2 font-body text-sm md:text-base leading-relaxed text-manga-gray max-w-2xl">
                  {mission.line}
                </p>
                {i < MISSIONS.length - 1 && (
                  <span
                    className="mt-6 block font-tech text-sm text-manga-gray"
                    aria-hidden="true"
                  >
                    0{i + 1} → 0{i + 2}
                  </span>
                )}
              </section>
            </Reveal>
          ))}
        </div>
      </div>

      {/* C. DESTINATION — the chapter's strongest moment, tree alongside */}
      <Reveal className="mt-20 md:mt-32">
        <div className="border-t-2 border-ink pt-10 md:pt-14">
          <p className="font-body text-xs uppercase tracking-[0.3em] text-manga-gray">
            The direction
          </p>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-[1fr_200px] gap-10 md:gap-8 items-start">
            <p className="font-display text-3xl md:text-5xl font-bold leading-tight text-ink max-w-3xl">
              Become a strong software engineer with deep{' '}
              <span className="text-sakura">AI knowledge</span>.
            </p>
            <figure className="w-40 md:w-full md:max-w-[200px] md:pt-2">
              <SakuraGrowth stage={8} className="w-full h-auto" />
              <figcaption className="mt-2 font-tech text-[11px] uppercase tracking-[0.2em] text-manga-gray text-center">
                Growth · Stage 08
              </figcaption>
            </figure>
          </div>
        </div>
      </Reveal>

      {/* D. CLOSING */}
      <Reveal className="mt-16 md:mt-24">
        <div className="border-t border-ink/30 pt-8 md:pt-10">
          <p className="font-body text-base md:text-lg leading-relaxed text-manga-gray max-w-2xl">
            The next chapter is still unwritten.
          </p>
          <p className="mt-4 font-tech text-xs uppercase tracking-[0.25em] text-manga-gray">
            Next → Final
          </p>
          <div className="mt-8 flex md:justify-end">
            <button
              onClick={() => scrollToChapter('final')}
              className="inline-flex items-center gap-3 font-body text-xs uppercase tracking-[0.25em] text-ink hover:text-sakura focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sakura"
            >
              Next — Final · {nextTitle}
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

export default Chapter08;
