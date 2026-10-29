import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import useChapterObserver from '../../hooks/useChapterObserver';
import chaptersData from '../../data/chapters';
import SakuraGrowth from '../shared/SakuraGrowth';
import MangaPanel from '../ui/MangaPanel';
import MangaSpread from '../ui/MangaSpread';
import SectionLabel from '../ui/SectionLabel';

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
      {/* A. ESTABLISHING SPREAD — full-bleed ink field, tree as the subject */}
      <Reveal>
        <MangaPanel variant="bleed" tone="ink" padding="none">
          <div
            className="manga-screentone pointer-events-none absolute inset-y-0 right-0 hidden w-1/3 text-paper opacity-[0.12] md:block"
            aria-hidden="true"
          />
          <div className="relative mx-auto grid w-full max-w-6xl grid-cols-12 items-center gap-x-6 gap-y-8 px-6 py-12 md:gap-x-10 md:gap-y-10 md:px-12 md:py-16">
            <div className="col-span-12 md:col-span-7">
              <SectionLabel index="Scene 01" label="The conditions" tone="paper" />
              <p className="mt-5 max-w-xl font-display text-2xl font-bold leading-snug text-paper md:text-3xl">
                The fastest way to learn is to build{' '}
                <span className="text-sakura">under pressure</span>.
              </p>
              <p className="mt-4 max-w-lg font-body text-sm leading-relaxed text-paper/75 md:text-base">
                A hackathon compresses months of learning into a weekend — problem,
                decision, build, break, adapt — with no pause between them.
              </p>
            </div>
            <figure className="col-span-12 w-full max-w-sm md:col-span-5 md:justify-self-end">
              <div className="relative h-64 overflow-hidden border border-paper/20 bg-paper md:h-72">
                <SakuraGrowth stage={4} crop className="h-full w-full" />
              </div>
              <figcaption className="mt-2 text-center font-tech text-[11px] uppercase tracking-[0.2em] text-paper/60">
                Growth · Stage 04
              </figcaption>
            </figure>
          </div>
        </MangaPanel>
      </Reveal>

      {/* B. DOCTRINE — heading in the margin, list in the field */}
      <Reveal className="mt-16 md:mt-24">
        <MangaSpread gap="lg">
          <div className="col-span-12 md:col-span-4">
            <SectionLabel index="Scene 02" label="Doctrine" />
            <h3 className="mt-4 font-display text-2xl font-bold tracking-tight text-ink md:text-3xl">
              Why hackathons
            </h3>
          </div>
          <div className="col-span-12 md:col-span-8">
            <ol className="border-t-2 border-ink" aria-label="Battle doctrine">
              {DOCTRINE.map((rule, i) => (
                <li
                  key={rule.name}
                  className="flex flex-wrap items-baseline gap-x-4 gap-y-1 border-b border-ink/15 py-4 md:gap-6 md:py-5"
                >
                  <span
                    className="shrink-0 font-tech text-sm text-manga-gray"
                    aria-hidden="true"
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="shrink-0 font-display text-lg font-bold tracking-wide text-ink md:text-2xl">
                    {rule.name}
                  </span>
                  <span className="font-body text-sm leading-relaxed text-manga-gray">
                    {rule.note}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </MangaSpread>
      </Reveal>

      {/* C. BATTLE RECORDS — one dominant record, one narrow record */}
      <div className="mt-16 md:mt-24">
        <Reveal>
          <SectionLabel index="Scene 03" label="Engagements" />
          <h3 className="mt-3 font-display text-2xl font-bold tracking-tight text-ink md:text-3xl">
            Battle records
          </h3>
        </Reveal>

        <MangaSpread className="mt-8" gap="md">
          {/* RECORD 01 — UAi Hawk-A-Thon: the strongest treatment */}
          <Reveal className="col-span-12 lg:col-span-8">
            <MangaPanel as="figure" variant="traditional" padding="none">
              <div className="flex items-center justify-between gap-4 border-b border-ink/15 px-4 py-2 md:px-5">
                <span className="font-body text-[11px] uppercase tracking-[0.2em] text-manga-gray">
                  Battle record 01 — UAi Hawk-A-Thon
                </span>
                <span className="h-2 w-2 shrink-0 bg-sakura" aria-hidden="true" />
              </div>
              <div className="px-5 py-6 md:px-6 md:py-8">
                <p className="font-display text-2xl font-bold leading-tight text-ink md:text-4xl">
                  Judges&apos; <span className="text-sakura-text">Choice</span>.
                </p>
                <p className="mt-3 font-tech text-xs uppercase tracking-[0.2em] text-manga-gray">
                  Team Algovoid · 24 hours · 115+ teams
                </p>
                <dl className="mt-6 border-t border-ink/15">
                  {UA_RECORD.map((row) => (
                    <div
                      key={row.label}
                      className="grid grid-cols-1 gap-1 border-b border-ink/10 py-3 md:grid-cols-[110px_1fr] md:gap-6"
                    >
                      <dt className="pt-1 font-tech text-[11px] uppercase tracking-[0.2em] text-sakura-text">
                        {row.label}
                      </dt>
                      <dd className="font-body text-sm leading-relaxed text-ink md:text-base">
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
                    className="text-ink underline decoration-sakura decoration-2 underline-offset-4 hover:text-sakura-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sakura-text"
                  >
                    Academic Career Navigator
                  </a>
                </p>
              </div>
            </MangaPanel>
          </Reveal>

          {/* RECORD 02 — Hacktoon: only the name is documented */}
          <Reveal className="col-span-12 lg:col-span-4 lg:mt-16" delay={0.1}>
            <MangaPanel
              as="section"
              variant="technical"
              tone="muted"
              padding="md"
              aria-label="Battle record 02: Hacktoon"
            >
              <div className="flex items-baseline gap-4">
                <span
                  className="shrink-0 font-tech text-sm text-manga-gray"
                  aria-hidden="true"
                >
                  02
                </span>
                <h4 className="font-display text-2xl font-bold tracking-tight text-ink">
                  Hacktoon
                </h4>
              </div>
              <p className="mt-3 font-body text-sm leading-relaxed text-manga-gray">
                Entered. This record is thin — the build mattered more than the
                paperwork, and only the appearance itself is documented.
              </p>
              <p className="mt-4 border-l-2 border-sakura pl-3 font-body text-sm italic leading-relaxed text-manga-gray">
                <span className="font-tech text-[11px] uppercase not-italic tracking-[0.2em] text-sakura-text">
                  Lesson —{' '}
                </span>
                Showing up to unfamiliar problems is its own training.
              </p>
            </MangaPanel>
          </Reveal>
        </MangaSpread>
      </div>

      {/* D. LOST BATTLES — impact panel, the chapter's tonal cut */}
      <Reveal className="mt-16 md:mt-24">
        <MangaPanel
          as="section"
          variant="cinematic"
          tone="ink"
          padding="lg"
          aria-label="Lost battles"
        >
          <SectionLabel index="Scene 04" label="Aftermath" tone="paper" />
          <h3 className="mt-4 font-display text-3xl font-bold tracking-tight text-paper md:text-5xl">
            Lost battles
          </h3>
          <p className="mt-4 max-w-2xl font-body text-sm leading-relaxed text-paper/75 md:text-base">
            Not every build became a result worth framing. The unfinished ones
            taught just as much — quietly.
          </p>
          <dl className="mt-8 border-t border-paper/20">
            {LOST.map((row) => (
              <div
                key={row.label}
                className="grid grid-cols-1 gap-1 border-b border-paper/15 py-4 md:grid-cols-[170px_1fr] md:gap-6"
              >
                <dt
                  className={`pt-1 font-tech text-[11px] uppercase tracking-[0.2em] ${
                    row.label === 'WHAT BROKE' ? 'text-sakura' : 'text-paper/60'
                  }`}
                >
                  {row.label}
                </dt>
                <dd className="font-body text-sm leading-relaxed text-paper/85 md:text-base">
                  {row.text}
                </dd>
              </div>
            ))}
          </dl>
        </MangaPanel>
      </Reveal>

      {/* E. CLOSING — quiet panel, a held breath before the next arc */}
      <Reveal className="mt-16 md:mt-24">
        <div className="border-t-2 border-ink pt-10 md:pt-14">
          <SectionLabel index="Scene 05" label="End of battles" />
          <div className="mt-6 max-w-3xl">
            <p className="font-display text-3xl font-bold leading-tight text-ink md:text-4xl">
              Every battle left something{' '}
              <span className="text-sakura-text">behind</span>.
            </p>
            <p className="mt-5 font-body text-base leading-relaxed text-manga-gray md:text-lg">
              Some experiments became projects.
            </p>
          </div>
          <div className="mt-10 flex md:mt-14 md:justify-end">
            <button
              onClick={() => scrollToChapter('05')}
              className="inline-flex items-center gap-3 font-body text-xs uppercase tracking-[0.25em] text-ink hover:text-sakura-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sakura-text"
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
