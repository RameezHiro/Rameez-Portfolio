import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import useChapterObserver from '../../hooks/useChapterObserver';
import chaptersData from '../../data/chapters';
import SakuraGrowth from '../shared/SakuraGrowth';
import MangaPanel from '../ui/MangaPanel';
import MangaSpread from '../ui/MangaSpread';
import SectionLabel from '../ui/SectionLabel';

// Chapter 04 — BATTLE ARC. One hackathon, five beats: PROBLEM → IDEA →
// BUILD → RESULT → LESSON. Claims are limited to the repository, the public
// award record, and the university's event note. The prototype's gaps are
// stated as plainly as its result. No invented metrics, teammates, or tests.
const FLOW = [
  {
    index: '01',
    name: 'COHORT',
    note: 'A synthetic CSV standing in for LMS data.',
  },
  {
    index: '02',
    name: 'CLUSTERS',
    note: 'StandardScaler + K-Means, k = 3.',
  },
  {
    index: '03',
    name: 'BANDS',
    note: 'Clusters ranked by mean performance.',
  },
  {
    index: '04',
    name: 'DASHBOARD',
    note: 'At-risk list, alert preview, career paths.',
  },
];

const OWNED = [
  {
    index: '01',
    name: 'MODEL',
    note: 'StandardScaler, K-Means (k = 3), and the cluster-to-band mapping, saved to student_model.pkl.',
  },
  {
    index: '02',
    name: 'DASHBOARD',
    note: 'A Streamlit cohort view, at-risk table, and new-student prediction form.',
  },
  {
    index: '03',
    name: 'GUIDANCE',
    note: 'Three career paths from performance and interests — Groq or Gemini when a key is set, rule-based fallback otherwise.',
  },
  {
    index: '04',
    name: 'ALERTS',
    note: 'A parent-alert preview assembled from the student record. Sending it was left for production.',
  },
];

const ESTABLISHED = [
  'A trained three-cluster model, saved and reloaded by the app.',
  'A local demo: cohort view, at-risk list, prediction form, alert preview, three career paths.',
  'Judges’ Choice at UAi Hawk-A-Thon 2026, with Team Algovoid.',
];

const NOT_ESTABLISHED = [
  'Real student data or an LMS connection — the cohort is synthetic.',
  'Predictive accuracy — no measurement against real outcomes.',
  'A sent alert — the email stops at a preview.',
  'A hosted demo or automated tests — neither is in the repository.',
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
                A 24-hour hackathon compresses months of learning into one day —
                problem, decision, build, break, adapt, with no pause between
                them.
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

      {/* B. PROBLEM — headline with the brief and the chosen scope alongside */}
      <Reveal className="mt-16 md:mt-24">
        <SectionLabel index="Scene 02" label="Problem" />
        <MangaSpread gap="lg" className="mt-5">
          <div className="col-span-12 md:col-span-7">
            <h3 className="max-w-2xl font-display text-2xl font-bold leading-tight text-ink md:text-4xl">
              A student can fall behind for a semester before anyone{' '}
              <span className="text-sakura-text">acts</span>.
            </h3>
            <p className="mt-5 max-w-2xl font-body text-sm leading-relaxed text-manga-gray md:text-base">
              Institutions work from fragmented spreadsheets and late manual
              reports. By the time a student is flagged as at risk, a semester
              can be gone, parents find out after the fact, and career guidance
              stays generic.
            </p>
          </div>
          <dl className="col-span-12 border-t-2 border-ink pt-4 md:col-span-5">
            <div>
              <dt className="font-tech text-[11px] uppercase tracking-[0.2em] text-sakura-text">
                The brief
              </dt>
              <dd className="mt-1 font-body text-sm leading-relaxed text-ink md:text-base">
                An academic and career navigator for an EdTech track.
              </dd>
            </div>
            <div className="mt-5 border-t border-ink/15 pt-4">
              <dt className="font-tech text-[11px] uppercase tracking-[0.2em] text-manga-gray">
                Our scope
              </dt>
              <dd className="mt-1 font-body text-sm leading-relaxed text-manga-gray md:text-base">
                A 24-hour local prototype over a synthetic cohort. We could not
                replace an LMS; we could make one cohort’s risk visible.
              </dd>
            </div>
          </dl>
        </MangaSpread>
      </Reveal>

      {/* C. IDEA — margin heading, the trade-off, then the real workflow */}
      <Reveal className="mt-16 md:mt-24">
        <MangaSpread gap="lg">
          <div className="col-span-12 md:col-span-4">
            <SectionLabel index="Scene 03" label="Idea" />
            <h3 className="mt-4 font-display text-2xl font-bold tracking-tight text-ink md:text-3xl">
              Segment the cohort. Don’t pretend to predict it.
            </h3>
          </div>
          <div className="col-span-12 md:col-span-8">
            <p className="max-w-2xl font-body text-sm leading-relaxed text-manga-gray md:text-base">
              The dataset carried marks, attendance, assignments, and interests
              — but no outcome label to train against. The team used K-Means to
              group students into three clusters, ranked those clusters by mean
              performance, and mapped them to{' '}
              <span className="text-ink">At Risk</span>,{' '}
              <span className="text-ink">Average</span>, and{' '}
              <span className="text-ink">Top Performer</span>.
            </p>
            <p className="mt-4 max-w-2xl font-body text-sm leading-relaxed text-manga-gray md:text-base">
              That choice bought a working model in hours. It also set the
              limit: a band is relative to this cohort, not a validated
              prediction.
            </p>
          </div>
        </MangaSpread>
        <ol
          className="mt-10 grid grid-cols-1 gap-6 border-t-2 border-ink pt-5 sm:grid-cols-2 md:grid-cols-4"
          aria-label="One path through the prototype"
        >
          {FLOW.map((step) => (
            <li key={step.index}>
              <p className="font-tech text-[11px] uppercase tracking-[0.2em] text-sakura-text">
                {step.index}
              </p>
              <p className="mt-2 font-display text-lg font-bold tracking-tight text-ink md:text-xl">
                {step.name}
              </p>
              <p className="mt-1 font-body text-sm leading-relaxed text-manga-gray">
                {step.note}
              </p>
            </li>
          ))}
        </ol>
      </Reveal>

      {/* D. BUILD — owned work on the left, the record panel on the right */}
      <Reveal className="mt-16 md:mt-24">
        <SectionLabel index="Scene 04" label="Build" />
        <h3 className="mt-4 max-w-3xl font-display text-2xl font-bold tracking-tight text-ink md:text-4xl">
          Twenty-four hours. One runnable path.
        </h3>
        <MangaSpread gap="lg" className="mt-6">
          <div className="col-span-12 lg:col-span-8">
            <p className="max-w-2xl font-body text-sm leading-relaxed text-manga-gray md:text-base">
              Team Algovoid built the demo during a 24-hour event. I led the
              team and owned the repository; all five commits are mine — the
              K-Means model, the Streamlit app, the career-roadmap flow, and the
              folder structure. The history records those commits, not everyone’s
              hours, so I claim only what it shows and credit the team for the
              result.
            </p>
            <ol className="mt-8 border-t-2 border-ink">
              {OWNED.map((item) => (
                <li
                  key={item.index}
                  className="grid grid-cols-[2.5rem_1fr] gap-x-4 border-b border-ink/15 py-4 md:grid-cols-[3.5rem_1fr] md:gap-x-6 md:py-5"
                >
                  <span
                    className="font-tech text-sm text-manga-gray"
                    aria-hidden="true"
                  >
                    {item.index}
                  </span>
                  <div>
                    <h4 className="font-display text-base font-bold tracking-wide text-ink md:text-lg">
                      {item.name}
                    </h4>
                    <p className="mt-1 font-body text-sm leading-relaxed text-manga-gray">
                      {item.note}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div className="col-span-12 lg:col-span-4">
            <MangaPanel variant="technical" tone="muted" padding="md">
              <dl className="space-y-4">
                <div>
                  <dt className="font-tech text-[11px] uppercase tracking-[0.2em] text-manga-gray">
                    Role
                  </dt>
                  <dd className="mt-1 font-body text-sm leading-relaxed text-ink">
                    Team lead · repository owner
                  </dd>
                </div>
                <div className="border-t border-ink/15 pt-4">
                  <dt className="font-tech text-[11px] uppercase tracking-[0.2em] text-manga-gray">
                    Time
                  </dt>
                  <dd className="mt-1 font-body text-sm leading-relaxed text-ink">
                    24-hour event · Team Algovoid
                  </dd>
                </div>
                <div className="border-t border-ink/15 pt-4">
                  <dt className="font-tech text-[11px] uppercase tracking-[0.2em] text-manga-gray">
                    Stack
                  </dt>
                  <dd className="mt-1 font-body text-sm leading-relaxed text-ink">
                    Python · scikit-learn · pandas · Streamlit
                  </dd>
                </div>
                <div className="border-t border-ink/15 pt-4">
                  <dt className="font-tech text-[11px] uppercase tracking-[0.2em] text-manga-gray">
                    Source
                  </dt>
                  <dd className="mt-1">
                    <a
                      href="https://github.com/RameezHiro/AI-Powered-Academic-Career-Navigator"
                      target="_blank"
                      rel="noreferrer"
                      className="font-body text-sm leading-relaxed text-ink underline decoration-sakura decoration-2 underline-offset-4 hover:text-sakura-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sakura-text"
                    >
                      Academic Career Navigator
                    </a>
                  </dd>
                </div>
              </dl>
            </MangaPanel>
          </div>
        </MangaSpread>
      </Reveal>

      {/* E. RESULT — the award and the limits, given equal weight */}
      <Reveal className="mt-16 md:mt-24">
        <MangaPanel
          as="section"
          variant="cinematic"
          tone="ink"
          padding="lg"
          aria-label="Result"
        >
          <SectionLabel index="Scene 05" label="Result" tone="paper" />
          <h3 className="mt-4 font-display text-4xl font-bold tracking-tight text-paper md:text-6xl">
            Judges’ <span className="text-sakura">Choice</span>.
          </h3>
          <p className="mt-4 font-tech text-[11px] uppercase leading-relaxed tracking-[0.2em] text-paper/60 md:text-xs">
            UAi Hawk-A-Thon 2026 · Team Algovoid · 114 shortlisted teams
          </p>
          <div className="mt-8 grid grid-cols-1 gap-8 border-t border-paper/20 pt-8 md:grid-cols-2 md:gap-12">
            <div>
              <h4 className="font-tech text-[11px] uppercase tracking-[0.2em] text-sakura">
                Established
              </h4>
              <ul className="mt-4 space-y-3">
                {ESTABLISHED.map((item) => (
                  <li
                    key={item}
                    className="border-b border-paper/15 pb-3 font-body text-sm leading-relaxed text-paper/85 last:border-b-0 last:pb-0 md:text-base"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-tech text-[11px] uppercase tracking-[0.2em] text-paper/60">
                Not established
              </h4>
              <ul className="mt-4 space-y-3">
                {NOT_ESTABLISHED.map((item) => (
                  <li
                    key={item}
                    className="border-b border-paper/15 pb-3 font-body text-sm leading-relaxed text-paper/75 last:border-b-0 last:pb-0 md:text-base"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="mt-8 font-body text-xs leading-relaxed text-paper/60">
            The same team was shortlisted for Hacktoon 1.0. No result is
            recorded.
          </p>
        </MangaPanel>
      </Reveal>

      {/* F. LESSON — the specific engineering takeaway */}
      <Reveal className="mt-16 md:mt-24">
        <SectionLabel index="Scene 06" label="Lesson" />
        <div className="mt-5 grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-8">
          <h3 className="font-display text-2xl font-bold leading-tight text-ink md:col-span-5 md:text-4xl">
            Name every <span className="text-sakura-text">substitute</span>.
          </h3>
          <div className="md:col-span-7">
            <p className="max-w-2xl font-body text-sm leading-relaxed text-manga-gray md:text-base">
              The demo held together because each gap had a label: a CSV for an
              LMS, a preview for SMTP, rules for an LLM without a key. That
              honesty made the demo defensible and turned the next build into a
              list instead of a guess.
            </p>
            <p className="mt-4 max-w-2xl font-body text-sm leading-relaxed text-ink md:text-base">
              A working system, presented clearly, still beats a clever model
              nobody can run — as long as the seams are visible.
            </p>
          </div>
        </div>
      </Reveal>

      {/* G. CLOSING — quiet panel, a held breath before the next arc */}
      <Reveal className="mt-16 md:mt-24">
        <div className="border-t-2 border-ink pt-10 md:pt-14">
          <SectionLabel label="End of battles" />
          <div className="mt-6 max-w-3xl">
            <h3 className="font-display text-3xl font-bold leading-tight text-ink md:text-4xl">
              Every battle left something{' '}
              <span className="text-sakura-text">behind</span>.
            </h3>
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
    </div>
  );
};

export default Chapter04;
