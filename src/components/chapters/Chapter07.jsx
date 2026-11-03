import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import useChapterObserver from '../../hooks/useChapterObserver';
import chaptersData from '../../data/chapters';
import SakuraGrowth from '../shared/SakuraGrowth';
import SectionLabel from '../ui/SectionLabel';
import MangaSpread from '../ui/MangaSpread';

// Chapter 07 — CURRENT. A present-tense status register: what is deployed,
// what runs locally, what is still unfinished, and the three areas taking
// the time right now. Deliberately short. Project evidence lives in
// Chapter 05; direction lives in Chapter 08.
const PROJECTS = [
  {
    name: 'Decode AI',
    status: 'Live',
    note: 'Frontend on Vercel, API on Render. Upload ceiling, signature check, fallback model, and tests kept in the repository.',
  },
  {
    name: 'GrenMon',
    status: 'Live',
    note: 'Playable field-research build at grenmon.vercel.app. Ten tests cover the domain rules and the server.',
  },
  {
    name: 'ShelfScribe',
    status: 'Local',
    note: 'FastAPI and Ollama on qwen3-vl:4b. It stays on one machine — no cloud API and no hosted demo.',
  },
  {
    name: 'AAROH',
    status: 'Open',
    note: 'Backend and six smoke tests are in place. The frontend is not built yet.',
  },
];

const LEARNING = [
  {
    index: '01',
    name: 'EVALUATION',
    line: 'A score on synthetic labels is not evidence. The next honest number has to come from real data.',
  },
  {
    index: '02',
    name: 'FAILURE PATHS',
    line: 'Wrong file types, oversized uploads, dead services. Recent work has gone into the unhappy path.',
  },
  {
    index: '03',
    name: 'LOCAL INFERENCE',
    line: 'Running open-weight vision models on one machine: memory, speed, and what privacy costs in convenience.',
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

const Chapter07 = () => {
  const { scrollToChapter } = useChapterObserver();
  const nextTitle = chaptersData.getChapterById('08')?.title || 'NEXT';

  return (
    <div>
      {/* A. OPENING — present tense, no autobiography */}
      <Reveal>
        <SectionLabel index="Scene 01" label="Where it stands" />
        <p className="mt-5 max-w-3xl font-display text-3xl font-bold leading-tight text-ink md:text-5xl">
          This is where the story{' '}
          <span className="text-sakura-text">currently stands</span>.
        </p>
        <p className="mt-5 max-w-2xl font-body text-base leading-relaxed text-manga-gray md:text-lg">
          Not a finished state. A snapshot of what is deployed, what runs
          locally, and what is still open.
        </p>
      </Reveal>

      {/* B. STATUS REGISTER — state before story */}
      <div className="mt-16 md:mt-24">
        <Reveal>
          <h3 className="font-body text-xs uppercase tracking-[0.3em] text-manga-gray">
            Status register
          </h3>
        </Reveal>
        <ol className="mt-6 border-t-2 border-ink">
          {PROJECTS.map((project, i) => (
            <Reveal key={project.name} delay={Math.min(i * 0.05, 0.15)}>
              <li className="border-b border-ink/15 py-5 md:py-6">
                <div className="grid grid-cols-12 items-baseline gap-x-4 gap-y-2">
                  <h4 className="col-span-8 font-display text-xl font-bold tracking-tight text-ink md:col-span-4 md:text-2xl">
                    {project.name}
                  </h4>
                  <p className="col-span-4 justify-self-end font-tech text-[11px] uppercase tracking-[0.24em] md:col-span-2 md:justify-self-start">
                    <span
                      className={
                        project.status === 'Live'
                          ? 'text-sakura-text'
                          : 'text-manga-gray'
                      }
                    >
                      {project.status}
                    </span>
                  </p>
                  <p className="col-span-12 font-body text-sm leading-relaxed text-manga-gray md:col-span-6">
                    {project.note}
                  </p>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
        <ul className="mt-4 flex list-none flex-wrap gap-x-4 gap-y-1 font-tech text-[10px] uppercase leading-relaxed tracking-[0.18em] text-manga-gray">
          <li>Live — deployed</li>
          <li>Local — one machine</li>
          <li>Open — unfinished</li>
        </ul>
      </div>

      {/* C. LEARNING — three areas, vertical rules rather than cards */}
      <div className="mt-16 md:mt-24">
        <Reveal>
          <h3 className="font-body text-xs uppercase tracking-[0.3em] text-manga-gray">
            What I&apos;m learning now
          </h3>
        </Reveal>
        <MangaSpread gap="lg" className="mt-8">
          {LEARNING.map((item, i) => (
            <Reveal
              key={item.name}
              delay={Math.min(i * 0.05, 0.15)}
              className={`col-span-12 md:col-span-4 ${
                i > 0
                  ? 'border-t border-ink/15 pt-6 md:border-l md:border-t-0 md:pl-6 md:pt-0'
                  : ''
              }`}
            >
              <p className="font-tech text-[11px] uppercase tracking-[0.2em] text-sakura-text">
                {item.index}
              </p>
              <h4 className="mt-2 font-display text-lg font-bold tracking-tight text-ink md:text-xl">
                {item.name}
              </h4>
              <p className="mt-2 font-body text-sm leading-relaxed text-manga-gray">
                {item.line}
              </p>
            </Reveal>
          ))}
        </MangaSpread>
      </div>

      {/* D. CURRENT STATUS — the chapter's visual moment, tree alongside */}
      <Reveal className="mt-20 md:mt-32">
        <div className="border-t-2 border-ink pt-10 md:pt-14">
          <p className="font-body text-xs uppercase tracking-[0.3em] text-manga-gray">
            Current status
          </p>
          <div className="mt-6 grid grid-cols-1 items-start gap-10 md:grid-cols-[1fr_200px] md:gap-8">
            <div>
              <p className="font-display text-4xl font-bold leading-tight text-ink md:text-6xl">
                STILL <span className="text-sakura-text">BUILDING</span>.
              </p>
              <p className="mt-5 font-body text-base leading-relaxed text-manga-gray md:text-lg">
                Not finished.
                <br />
                Not standing still.
              </p>
            </div>
            <figure className="w-40 md:w-full md:max-w-[200px] md:pt-2">
              <SakuraGrowth stage={7} className="h-auto w-full" />
              <figcaption className="mt-2 text-center font-tech text-[11px] uppercase tracking-[0.2em] text-manga-gray">
                Growth · Stage 07
              </figcaption>
            </figure>
          </div>
        </div>
      </Reveal>

      {/* E. CLOSING */}
      <Reveal className="mt-16 md:mt-24">
        <div className="border-t border-ink/30 pt-8 md:pt-10">
          <p className="font-tech text-xs uppercase tracking-[0.25em] text-manga-gray">
            The current arc is still being written.
          </p>
          <div className="mt-8 flex md:justify-end">
            <button
              onClick={() => scrollToChapter('08')}
              className="inline-flex items-center gap-3 font-body text-xs uppercase tracking-[0.25em] text-ink hover:text-sakura-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sakura-text"
            >
              Next — Chapter 08 · {nextTitle}
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
