import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import useChapterObserver from '../../hooks/useChapterObserver';
import chaptersData from '../../data/chapters';
import SakuraGrowth from '../shared/SakuraGrowth';
import MangaSpread from '../ui/MangaSpread';

// Chapter 08 — NEXT. Direction, not destination. The opening and closing
// statements stay; the four generic missions become three concrete next
// moves tied to work that already exists. No dates, no promised outcomes,
// and no second skills inventory.
const MOVES = [
  {
    index: '01',
    name: "FINISH AAROH'S FRONTEND",
    line: 'The backend and its smoke tests exist. The interface does not. That is the next commit.',
  },
  {
    index: '02',
    name: 'REPLACE SYNTHETIC LABELS',
    line: 'Train the routing model on real data, then report a number only once it has been measured.',
  },
  {
    index: '03',
    name: 'HARDEN THE LIVE API',
    line: 'Add authentication and rate limits to the Decode AI endpoint that is already public.',
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

const MarginLabel = ({ children }) => (
  <h3 className="font-tech text-[11px] uppercase leading-none tracking-[0.24em] text-manga-gray">
    <span aria-hidden="true" className="mr-2 inline-block h-px w-6 align-middle bg-ink/40" />
    {children}
  </h3>
);

const Chapter08 = () => {
  const { scrollToChapter } = useChapterObserver();
  const nextTitle = chaptersData.getChapterById('final')?.title || 'CURRENT ARC';

  return (
    <div>
      {/* A. OPENING — margin label, then the premise */}
      <MangaSpread gap="lg">
        <Reveal className="col-span-12 md:col-span-3">
          <MarginLabel>Still moving</MarginLabel>
        </Reveal>
        <Reveal className="col-span-12 md:col-span-9" delay={0.05}>
          <p className="max-w-3xl font-display text-3xl font-bold leading-tight text-ink md:text-4xl">
            The destination isn&apos;t{' '}
            <span className="text-sakura-text">finished</span>.
          </p>
          <p className="mt-5 max-w-2xl font-body text-base leading-relaxed text-manga-gray md:text-lg">
            The current arc is moving toward deeper engineering, deeper AI
            understanding, harder problems, and larger systems.
          </p>
        </Reveal>
      </MangaSpread>

      {/* B. NEXT MOVES — three steps with hanging numerals, not missions */}
      <div className="mt-16 md:mt-24">
        <MangaSpread gap="lg">
          <Reveal className="col-span-12 md:col-span-3">
            <MarginLabel>Next moves</MarginLabel>
            <p className="mt-4 max-w-xs font-body text-xs leading-relaxed text-manga-gray">
              Three things that can be finished. Not a roadmap with dates.
            </p>
          </Reveal>
          <Reveal className="col-span-12 md:col-span-9" delay={0.05}>
            <ol className="border-t-2 border-ink">
              {MOVES.map((move) => (
                <li
                  key={move.name}
                  className="grid grid-cols-[2.5rem_1fr] gap-x-4 border-b border-ink/15 py-6 md:grid-cols-[4rem_1fr] md:gap-x-8 md:py-8"
                >
                  <span
                    className="font-display text-2xl font-bold leading-none text-sakura-text md:text-3xl"
                    aria-hidden="true"
                  >
                    {move.index}
                  </span>
                  <div>
                    <h4 className="font-display text-lg font-bold tracking-tight text-ink md:text-2xl">
                      {move.name}
                    </h4>
                    <p className="mt-2 max-w-2xl font-body text-sm leading-relaxed text-manga-gray md:text-base">
                      {move.line}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>
        </MangaSpread>
      </div>

      {/* C. DESTINATION — the chapter's strongest moment, tree alongside */}
      <Reveal className="mt-20 md:mt-32">
        <div className="border-t-2 border-ink pt-10 md:pt-14">
          <MarginLabel>The direction</MarginLabel>
          <div className="mt-6 grid grid-cols-1 items-start gap-10 md:grid-cols-[1fr_200px] md:gap-12">
            <p className="max-w-2xl font-display text-3xl font-bold leading-tight text-ink md:text-4xl lg:text-5xl">
              Become a strong software engineer with deep{' '}
              <span className="text-sakura-text">AI knowledge</span>.
            </p>
            <figure className="w-40 md:w-full md:max-w-[200px] md:justify-self-end">
              <SakuraGrowth stage={8} className="h-auto w-full" />
              <figcaption className="mt-2 text-center font-tech text-[11px] uppercase tracking-[0.2em] text-manga-gray">
                Growth · Stage 08
              </figcaption>
            </figure>
          </div>
        </div>
      </Reveal>

      {/* D. CLOSING */}
      <Reveal className="mt-16 md:mt-24">
        <div className="border-t border-ink/30 pt-8 md:pt-10">
          <p className="max-w-2xl font-body text-base leading-relaxed text-manga-gray md:text-lg">
            The next chapter is still unwritten.
          </p>
          <div className="mt-8 flex md:justify-end">
            <button
              onClick={() => scrollToChapter('final')}
              className="inline-flex items-center gap-3 font-body text-xs uppercase tracking-[0.25em] text-ink hover:text-sakura-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sakura-text"
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
