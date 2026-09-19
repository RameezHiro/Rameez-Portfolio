import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import useChapterObserver from '../../hooks/useChapterObserver';
import chaptersData from '../../data/chapters';
import SakuraGrowth from '../shared/SakuraGrowth';

// Chapter 06 — EVOLUTION. The character-development chapter: the arc from
// writing code to thinking in systems. Reflective and spacious — ruled
// editorial rows, no lists of skills, no project cards, no dates, no
// metrics. More air than Chapter 05, same manuscript grammar.
const STAGES = [
  { index: '01', name: 'PROGRAMMING', line: 'Learning to make ideas executable.' },
  { index: '02', name: 'DATA', line: 'Learning to understand what the system is working with.' },
  { index: '03', name: 'AI / ML', line: 'Learning to build systems that learn from patterns.' },
  { index: '04', name: 'PROJECTS', line: 'Learning what happens when theory meets reality.' },
  { index: '05', name: 'BACKEND', line: 'Learning how software moves beyond the interface.' },
  { index: '06', name: 'SYSTEMS', line: 'Learning how the pieces work together.' },
];

const REFLECTION = [
  'I started by learning how to write code.',
  'Then I learned how data moves.',
  'Then I learned how models learn.',
  'Then I started building.',
  'Now I\u2019m learning how systems behave.',
];

const SHIFTS = [
  { from: 'How do I make this work?', to: 'How does this system work?' },
  { from: 'Can I build it?', to: 'Can I build it so the pieces work together?' },
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
      {/* A. OPENING */}
      <Reveal>
        <p className="font-display text-3xl md:text-5xl font-bold leading-tight text-ink max-w-3xl">
          The projects changed. <span className="text-sakura">So did I</span>.
        </p>
        <p className="mt-5 font-body text-base md:text-lg leading-relaxed text-manga-gray max-w-2xl">
          The progression was never about collecting more technologies. Each
          stage changed how problems were approached — not just what could be
          used against them.
        </p>
      </Reveal>

      {/* B. EVOLUTION PATH — one continuous ruled arc */}
      <div className="mt-16 md:mt-24">
        <Reveal>
          <h2 className="font-body text-xs uppercase tracking-[0.3em] text-manga-gray">
            The evolution path
          </h2>
        </Reveal>
        <div className="mt-6 border-t-2 border-ink">
          {STAGES.map((stage, i) => {
            const isLast = i === STAGES.length - 1;
            return (
              <Reveal key={stage.name} delay={Math.min(i * 0.05, 0.2)}>
                <section
                  aria-label={`Stage ${stage.index}: ${stage.name}`}
                  className="border-b border-ink/15 py-7 md:py-9"
                >
                  <div className="flex items-baseline gap-4">
                    <span
                      className={`font-tech text-sm shrink-0 ${
                        isLast ? 'text-sakura' : 'text-manga-gray'
                      }`}
                      aria-hidden="true"
                    >
                      {stage.index}
                    </span>
                    <h3
                      className={`font-display font-bold tracking-tight ${
                        isLast
                          ? 'text-3xl md:text-5xl text-ink'
                          : 'text-2xl md:text-4xl text-ink'
                      }`}
                    >
                      {stage.name}
                    </h3>
                    {isLast && (
                      <span
                        className="h-1.5 w-1.5 bg-sakura shrink-0 self-center"
                        aria-hidden="true"
                      />
                    )}
                  </div>
                  <p className="mt-2 font-body text-sm md:text-base leading-relaxed text-manga-gray max-w-2xl">
                    {stage.line}
                  </p>
                  {!isLast && (
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

      {/* C. REFLECTION — narrative transition, generous whitespace */}
      <div className="mt-20 md:mt-32">
        <Reveal>
          <h2 className="font-body text-xs uppercase tracking-[0.3em] text-manga-gray">
            Reflection
          </h2>
        </Reveal>
        <div className="mt-8 md:mt-10 space-y-8 md:space-y-12">
          {REFLECTION.map((line, i) => {
            const isLast = i === REFLECTION.length - 1;
            return (
              <Reveal key={line} delay={Math.min(i * 0.05, 0.2)}>
                {isLast ? (
                  <p className="font-display text-2xl md:text-4xl font-bold leading-snug text-ink max-w-2xl">
                    Now I&apos;m learning how{' '}
                    <span className="text-sakura">systems</span> behave.
                  </p>
                ) : (
                  <p className="font-body text-base md:text-xl leading-relaxed text-manga-gray max-w-2xl">
                    {line}
                  </p>
                )}
              </Reveal>
            );
          })}
        </div>
      </div>

      {/* D. THE SHIFT — restrained from/to movement */}
      <Reveal className="mt-20 md:mt-32">
        <section aria-label="The shift">
          <h2 className="font-body text-xs uppercase tracking-[0.3em] text-manga-gray">
            The shift
          </h2>
          <div className="mt-6 border-t-2 border-ink">
            {SHIFTS.map((shift) => (
              <div
                key={shift.from}
                className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-10 border-b border-ink/15 py-6 md:py-8"
              >
                <div>
                  <p className="font-tech text-[11px] uppercase tracking-[0.2em] text-manga-gray">
                    From
                  </p>
                  <p className="mt-2 font-body text-base md:text-lg leading-relaxed text-manga-gray">
                    &ldquo;{shift.from}&rdquo;
                  </p>
                </div>
                <div>
                  <p className="font-tech text-[11px] uppercase tracking-[0.2em] text-sakura">
                    To
                  </p>
                  <p className="mt-2 font-display text-xl md:text-2xl font-bold leading-snug text-ink">
                    &ldquo;{shift.to}&rdquo;
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </Reveal>

      {/* E. CLOSING — growth marker beside the ending */}
      <Reveal className="mt-20 md:mt-32">
        <div className="border-t-2 border-ink pt-10 md:pt-14">
          <p className="font-body text-xs uppercase tracking-[0.3em] text-manga-gray">
            Still becoming
          </p>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-[1fr_200px] gap-10 md:gap-8 items-start">
            <div>
              <p className="font-body text-base md:text-lg leading-relaxed text-manga-gray max-w-2xl">
                The goal was never to know everything.
              </p>
              <p className="mt-4 font-display text-3xl md:text-5xl font-bold leading-tight text-ink max-w-3xl">
                It was to understand more than I did{' '}
                <span className="text-sakura">yesterday</span>.
              </p>
              <p className="mt-8 font-tech text-xs uppercase tracking-[0.2em] text-manga-gray">
                Evolution · Still in progress
              </p>
            </div>
            <figure className="w-40 md:w-full md:max-w-[200px] md:pt-2">
              <SakuraGrowth stage={6} className="w-full h-auto" />
              <figcaption className="mt-2 font-tech text-[11px] uppercase tracking-[0.2em] text-manga-gray text-center">
                Growth · Stage 06
              </figcaption>
            </figure>
          </div>
          <div className="mt-10 md:mt-14 flex md:justify-end">
            <button
              onClick={() => scrollToChapter('07')}
              className="inline-flex items-center gap-3 font-body text-xs uppercase tracking-[0.25em] text-ink hover:text-sakura focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sakura"
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
