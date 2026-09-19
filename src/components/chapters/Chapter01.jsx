import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import useChapterObserver from '../../hooks/useChapterObserver';
import chaptersData from '../../data/chapters';
import SakuraGrowth from '../shared/SakuraGrowth';

// Chapter 01 — THE ORIGIN. Story-first: curiosity → identity → direction.
// No project showcase here; the engineering portfolio comes later.
const ARC = [
  'CURIOUS',
  'UNDERSTANDING',
  'EXPERIMENTING',
  'BUILDING',
  'AMBITION',
];

const QUESTIONS = [
  'How applications worked.',
  'How websites were built.',
  'How ideas became software.',
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

// Small restrained sakura sprig — the only decorative mark in the chapter.
const SakuraSprig = () => (
  <div className="flex items-center gap-2" aria-hidden="true">
    <span className="h-px w-12 bg-ink/40" />
    <span className="h-1.5 w-1.5 rounded-full bg-sakura" />
    <span className="h-1 w-1 rounded-full bg-sakura/60" />
    <span className="h-1.5 w-1.5 rounded-full bg-sakura/80" />
  </div>
);

const Chapter01 = () => {
  const { scrollToChapter } = useChapterObserver();
  const nextTitle = chaptersData.getChapterById('02')?.title || 'TRAINING';

  return (
    <div>
      {/* A. OPENING */}
      <Reveal>
        <SakuraSprig />
        <p className="mt-8 font-display text-4xl md:text-6xl font-bold leading-[1.1] text-ink max-w-3xl">
          Before the code,
          <br />
          there was <span className="text-sakura">curiosity</span>.
        </p>
      </Reveal>

      {/* B. CURIOSITY */}
      <Reveal className="mt-16 md:mt-24">
        <p className="font-display text-2xl md:text-3xl font-bold leading-snug text-ink max-w-2xl">
          I didn’t start with a roadmap.
          <br />
          I started with curiosity.
        </p>
        <p className="mt-6 font-body text-base md:text-lg leading-relaxed text-manga-gray max-w-2xl">
          I wanted to understand what happened behind the screen.
        </p>
        <div className="mt-8 border-t-2 border-ink">
          {QUESTIONS.map((line) => (
            <p
              key={line}
              className="border-b border-ink/15 py-4 font-display text-lg md:text-2xl text-ink"
            >
              {line}
            </p>
          ))}
        </div>
        <p className="mt-8 font-body text-base md:text-lg leading-relaxed text-manga-gray max-w-2xl">
          At first, I wanted to understand the technology behind the things I
          used. Then I wanted to build them myself.
        </p>
        <p className="mt-4 font-display text-xl md:text-2xl font-bold text-ink">
          And somewhere along the way, curiosity turned into ambition.
        </p>
      </Reveal>

      {/* C. CURIOSITY → AMBITION */}
      <Reveal className="mt-16 md:mt-24">
        <h2 className="font-body text-xs uppercase tracking-[0.3em] text-manga-gray">
          The change
        </h2>
        <ol className="mt-6 border-t-2 border-ink" aria-label="From curiosity to ambition">
          {ARC.map((stage, i) => (
            <li
              key={stage}
              className="flex items-baseline gap-5 border-b border-ink/15 py-4 md:py-5"
            >
              <span
                className={`font-tech text-xs w-8 shrink-0 ${
                  i === ARC.length - 1 ? 'text-sakura' : 'text-manga-gray'
                }`}
                aria-hidden="true"
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="font-display text-xl md:text-2xl font-bold tracking-wide text-ink">
                {stage}
              </span>
              {i < ARC.length - 1 && (
                <span className="ml-auto font-body text-manga-gray" aria-hidden="true">
                  ↓
                </span>
              )}
            </li>
          ))}
        </ol>
      </Reveal>

      {/* Sakura Growth — Stage 1: first growth, entering from the margin */}
      <Reveal className="mt-12 md:mt-16">
        <figure className="ml-auto w-40 md:w-56">
          <SakuraGrowth stage={1} className="w-full h-auto" />
        </figure>
      </Reveal>

      {/* D. TERMINAL MOMENT */}
      <Reveal className="mt-16 md:mt-24">
        <p className="mb-5 font-tech text-[11px] uppercase tracking-[0.25em] text-manga-gray">
          Field note <span className="text-sakura" aria-hidden="true">—</span> the
          abstract becomes code
        </p>
        <figure>
          <div className="border-2 border-ink">
            <div className="flex items-center gap-2 border-b border-ink/15 px-4 py-2">
              <span className="h-2.5 w-2.5 bg-ink/70" aria-hidden="true" />
              <span className="h-2.5 w-2.5 bg-ink/30" aria-hidden="true" />
              <span className="h-2.5 w-2.5 bg-sakura" aria-hidden="true" />
              <span className="ml-2 font-body text-[11px] uppercase tracking-[0.2em] text-manga-gray">
                origin
              </span>
            </div>
            <pre
              className="bg-deep-ink px-5 md:px-8 py-6 md:py-8 font-tech text-sm md:text-base leading-loose text-paper overflow-x-auto"
              aria-label="Terminal: why, direction, status"
            >
{`$ why

curiosity
ambition
building
learning

$ direction

software-engineering
+
artificial-intelligence

$ status

still building...`}
            </pre>
          </div>
          <figcaption className="mt-3 font-body text-xs uppercase tracking-[0.2em] text-manga-gray">
            A statement of direction — the first coordinates
          </figcaption>
        </figure>
      </Reveal>

      {/* E. IDENTITY */}
      <Reveal className="mt-16 md:mt-24">
        <h2 className="font-body text-xs uppercase tracking-[0.3em] text-manga-gray">
          The protagonist
        </h2>
        <div className="mt-6 border-2 border-ink px-6 py-8 md:px-10 md:py-10">
          <div className="flex items-center gap-3" aria-hidden="true">
            <span className="h-2 w-2 bg-sakura" />
            <span className="h-px flex-1 bg-ink/15" />
          </div>
          <p className="mt-6 font-display text-3xl md:text-5xl font-bold tracking-tight text-ink">
            RAMEEZ SHAIKH
          </p>
          <p className="mt-2 font-body text-sm md:text-base uppercase tracking-[0.2em] text-manga-gray">
            B.Tech CSE · AI/ML
          </p>
          <dl className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <div>
              <dt className="font-body text-xs uppercase tracking-[0.3em] text-manga-gray">
                Focus
              </dt>
              <dd className="mt-2 font-display text-lg md:text-xl font-bold text-ink leading-snug">
                Software Engineering
                <br />
                Artificial Intelligence
                <br />
                Backend Development
              </dd>
            </div>
            <div>
              <dt className="font-body text-xs uppercase tracking-[0.3em] text-manga-gray">
                Current arc
              </dt>
              <dd className="mt-2 font-display text-lg md:text-xl font-bold text-ink leading-snug">
                Learning · Building · Experimenting
              </dd>
            </div>
          </dl>
        </div>
      </Reveal>

      {/* F. CLOSING */}
      <Reveal className="mt-20 md:mt-32">
        <div className="border-t-2 border-ink pt-10 md:pt-14">
          <p className="font-display text-3xl md:text-5xl font-bold leading-tight text-ink max-w-3xl">
            Curiosity became direction.
          </p>
          <p className="mt-4 font-body text-base md:text-lg leading-relaxed text-manga-gray max-w-2xl">
            Learning was only the beginning.
          </p>
          <div className="mt-10 md:mt-14 flex md:justify-end">
            <button
              onClick={() => scrollToChapter('02')}
              className="inline-flex items-center gap-3 font-body text-xs uppercase tracking-[0.25em] text-ink hover:text-sakura focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sakura"
            >
              Next — Chapter 02 · {nextTitle}
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

export default Chapter01;
