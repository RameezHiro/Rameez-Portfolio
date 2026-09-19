import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import useChapterObserver from '../../hooks/useChapterObserver';
import chaptersData from '../../data/chapters';
import SakuraGrowth from '../shared/SakuraGrowth';

// Chapter 04 — BATTLE ARC. A battle log / field report: hackathons as
// compressed engineering education. Records follow PROBLEM → IDEA →
// BUILD → RESULT → LESSON. Only repository-supported facts are stated;
// unknown details are omitted, never invented. No trophy wall, no cards
// grid, no metrics flexing.
const DOCTRINE = [
  { name: 'PRESSURE', note: 'a deadline that removes the option of tomorrow.' },
  { name: 'UNFAMILIAR PROBLEMS', note: 'domains never studied, scoped in hours.' },
  { name: 'LIMITED TIME', note: 'scope is decided by the clock, not ambition.' },
  { name: 'TEAM DECISIONS', note: 'who builds what, decided fast and out loud.' },
  { name: 'SOMETHING BREAKS', note: 'it always does — usually near the demo.' },
  { name: 'BUILD ANYWAY', note: 'ship the working core, cut the rest.' },
];

const UA_RECORD = [
  { label: 'PROBLEM', text: 'Students falling behind go unnoticed until it is too late to intervene.' },
  { label: 'IDEA', text: 'Cluster academic data to flag at-risk students early — the Academic Career Navigator.' },
  { label: 'BUILD', text: 'A K-Means clustering model wired into a working demo, built in 24 hours with team Algovoid.' },
  { label: 'RESULT', text: "Judges' Choice at the UAi Hawk-A-Thon — among 115+ teams. ₹2,500 prize." },
  { label: 'LESSON', text: 'A working system, presented clearly under a deadline, beats a clever model nobody can run.' },
];

const LOST = [
  { label: 'WHAT BROKE', text: 'Integrations held together by hope — APIs, demos, and sleep schedules.' },
  { label: 'WHAT WAS LEARNED', text: 'The demo path gets built first. Everything else is negotiable.' },
  { label: 'WHAT CHANGED', text: 'Later builds started smaller, cut sooner, and kept something runnable at all times.' },
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

const Chapter04 = () => {
  const { scrollToChapter } = useChapterObserver();
  const nextTitle = chaptersData.getChapterById('05')?.title || 'THE PROJECT ARC';

  return (
    <div>
      {/* A. OPENING */}
      <Reveal>
        <p className="font-display text-3xl md:text-5xl font-bold leading-tight text-ink max-w-3xl">
          The fastest way to learn is to build{' '}
          <span className="text-sakura">under pressure</span>.
        </p>
        <p className="mt-5 font-body text-base md:text-lg leading-relaxed text-manga-gray max-w-2xl">
          A hackathon compresses months of learning into a weekend — problem,
          decision, build, break, adapt — with no pause between them.
        </p>
      </Reveal>

      {/* B. BATTLE DOCTRINE — restrained numbered sequence */}
      <Reveal className="mt-14 md:mt-20">
        <h2 className="font-body text-xs uppercase tracking-[0.3em] text-manga-gray">
          Why hackathons
        </h2>
        <ol className="mt-6 border-t-2 border-ink" aria-label="Battle doctrine">
          {DOCTRINE.map((rule, i) => (
            <li
              key={rule.name}
              className="flex items-baseline gap-4 md:gap-6 border-b border-ink/15 py-4 md:py-5"
            >
              <span
                className="font-tech text-sm text-manga-gray shrink-0"
                aria-hidden="true"
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="font-display text-lg md:text-2xl font-bold tracking-wide text-ink shrink-0">
                {rule.name}
              </span>
              <span className="font-body text-sm leading-relaxed text-manga-gray">
                {rule.note}
              </span>
            </li>
          ))}
        </ol>
      </Reveal>

      {/* C. BATTLE RECORDS */}
      <div className="mt-16 md:mt-24">
        <Reveal>
          <h2 className="font-body text-xs uppercase tracking-[0.3em] text-manga-gray">
            Battle records
          </h2>
        </Reveal>

        {/* RECORD 01 — UAi Hawk-A-Thon: the strongest treatment */}
        <Reveal className="mt-6">
          <figure className="border-2 border-ink">
            <div className="flex items-center justify-between border-b border-ink/15 px-4 md:px-5 py-2">
              <span className="font-body text-[11px] uppercase tracking-[0.2em] text-manga-gray">
                Battle record 01 — UAi Hawk-A-Thon
              </span>
              <span className="h-2 w-2 bg-sakura" aria-hidden="true" />
            </div>
            <div className="px-5 md:px-6 py-6 md:py-8">
              <p className="font-display text-2xl md:text-4xl font-bold leading-tight text-ink">
                Judges&apos; <span className="text-sakura">Choice</span>.
              </p>
              <p className="mt-3 font-tech text-xs uppercase tracking-[0.2em] text-manga-gray">
                Team Algovoid · 24 hours · 115+ teams
              </p>
              <dl className="mt-6 border-t border-ink/15">
                {UA_RECORD.map((row) => (
                  <div
                    key={row.label}
                    className="grid grid-cols-1 md:grid-cols-[110px_1fr] gap-1 md:gap-6 border-b border-ink/10 py-3"
                  >
                    <dt className="font-tech text-[11px] uppercase tracking-[0.2em] text-sakura pt-1">
                      {row.label}
                    </dt>
                    <dd className="font-body text-sm md:text-base leading-relaxed text-ink">
                      {row.text}
                    </dd>
                  </div>
                ))}
              </dl>
              <p className="mt-5 font-tech text-[11px] uppercase tracking-[0.2em] text-manga-gray">
                ↳{' '}
                <a
                  href="https://github.com/RameezHiro/AI-Powered-Academic-Career-Navigator.git"
                  target="_blank"
                  rel="noreferrer"
                  className="text-ink underline decoration-sakura decoration-2 underline-offset-4 hover:text-sakura focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sakura"
                >
                  Academic Career Navigator
                </a>
              </p>
            </div>
          </figure>
        </Reveal>

        {/* RECORD 02 — Hacktoon: only the name is documented */}
        <Reveal className="mt-10 md:mt-14">
          <section
            aria-label="Battle record 02: Hacktoon"
            className="border-t-2 border-ink pt-6 md:pt-8"
          >
            <div className="flex items-baseline gap-4">
              <span
                className="font-tech text-sm text-manga-gray shrink-0"
                aria-hidden="true"
              >
                02
              </span>
              <h3 className="font-display text-2xl md:text-3xl font-bold tracking-tight text-ink">
                Hacktoon
              </h3>
            </div>
            <p className="mt-3 font-body text-sm md:text-base leading-relaxed text-manga-gray max-w-2xl">
              Entered. This record is thin — the build mattered more than the
              paperwork, and only the appearance itself is documented.
            </p>
            <p className="mt-4 border-l-2 border-sakura pl-3 font-body text-sm italic leading-relaxed text-manga-gray max-w-2xl">
              <span className="not-italic font-tech text-[11px] uppercase tracking-[0.2em] text-sakura">
                Lesson —{' '}
              </span>
              Showing up to unfamiliar problems is its own training.
            </p>
          </section>
        </Reveal>
      </div>

      {/* D. LOST BATTLES — smaller, reflective, no invented specifics */}
      <Reveal className="mt-16 md:mt-24">
        <section aria-label="Lost battles">
          <h2 className="font-body text-xs uppercase tracking-[0.3em] text-manga-gray">
            Lost battles
          </h2>
          <p className="mt-3 font-body text-sm md:text-base leading-relaxed text-manga-gray max-w-2xl">
            Not every build became a result worth framing. The unfinished ones
            taught just as much — quietly.
          </p>
          <dl className="mt-6 border-t border-ink/15">
            {LOST.map((row) => (
              <div
                key={row.label}
                className="grid grid-cols-1 md:grid-cols-[160px_1fr] gap-1 md:gap-6 border-b border-ink/10 py-3"
              >
                <dt className="font-tech text-[11px] uppercase tracking-[0.2em] text-manga-gray pt-1">
                  {row.label}
                </dt>
                <dd className="font-body text-sm leading-relaxed text-manga-gray">
                  {row.text}
                </dd>
              </div>
            ))}
          </dl>
        </section>
      </Reveal>

      {/* E. CLOSING — young tree beside the transition out */}
      <Reveal className="mt-20 md:mt-32">
        <div className="border-t-2 border-ink pt-10 md:pt-14">
          <p className="font-body text-xs uppercase tracking-[0.3em] text-manga-gray">
            End of battles
          </p>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-[1fr_200px] gap-10 md:gap-8 items-start">
            <div>
              <p className="font-display text-3xl md:text-5xl font-bold leading-tight text-ink max-w-3xl">
                Every battle left something{' '}
                <span className="text-sakura">behind</span>.
              </p>
              <p className="mt-5 font-body text-base md:text-lg leading-relaxed text-manga-gray max-w-2xl">
                Some experiments became projects.
              </p>
            </div>
            <figure className="w-40 md:w-full md:max-w-[200px] md:pt-2">
              <SakuraGrowth stage={4} className="w-full h-auto" />
              <figcaption className="mt-2 font-tech text-[11px] uppercase tracking-[0.2em] text-manga-gray text-center">
                Growth · Stage 04
              </figcaption>
            </figure>
          </div>
          <div className="mt-10 md:mt-14 flex md:justify-end">
            <button
              onClick={() => scrollToChapter('05')}
              className="inline-flex items-center gap-3 font-body text-xs uppercase tracking-[0.25em] text-ink hover:text-sakura focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sakura"
            >
              Next — Chapter 05 · {nextTitle}
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

export default Chapter04;
