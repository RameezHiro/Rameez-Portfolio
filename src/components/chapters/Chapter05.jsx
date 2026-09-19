import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import useChapterObserver from '../../hooks/useChapterObserver';
import chaptersData from '../../data/chapters';
import SakuraGrowth from '../shared/SakuraGrowth';

// Chapter 05 — PROJECT ARC. An engineering case file / system blueprint:
// the primary engineering showcase. AAROH is the flagship with full
// case-study weight; everything else steps down in tiers. Only
// repository-supported facts; no metrics, no invented outcomes.
const LOOP = [
  'PROBLEM',
  'IDEA',
  'ARCHITECTURE',
  'BUILD',
  'WHAT BROKE',
  'RESULT',
  'WHAT I LEARNED',
];

const AAROH_STACK = [
  'FastAPI',
  'Python',
  'scikit-learn',
  'Random Forest',
  'NetworkX',
  'SQLAlchemy',
  'Pydantic',
  'SQLite',
  'PostgreSQL / PostGIS-ready',
];

const AAROH_FLOW = [
  'AI Risk Prediction',
  'Risk Assessment',
  'Risk-Aware Route Recommendation',
  'Vehicle Impact Analysis',
  'Alert Generation',
  'Dashboard',
];

const AAROH_CASE = [
  { label: 'PROBLEM', text: 'Moving people and goods through the North Eastern Region means contending with terrain, weather, and incidents that static routes ignore.' },
  { label: 'IDEA', text: 'A platform that predicts risk from live signals and routes around it — logistics with accessibility intelligence built in.' },
  { label: 'ARCHITECTURE', text: 'Signal ingestion feeds an AI risk prediction stage; its output flows through assessment, route recommendation, vehicle impact analysis, and alert generation to a dashboard. Diagrammed below.' },
  { label: 'BUILD', text: 'FastAPI backend in Python, Random Forest models with scikit-learn, route graphs with NetworkX, validated with Pydantic, persisted with SQLAlchemy on SQLite and PostgreSQL/PostGIS-ready storage.' },
  { label: 'WHAT BROKE', text: 'The honest record: friction lived at the seams between pipeline stages, where data shapes, model outputs, and route graphs had to agree with each other. No single dramatic failure is documented — the work was reconciliation.' },
  { label: 'RESULT', text: 'A working platform: risk prediction feeding route recommendation feeding alerts, readable on one dashboard. No usage or performance numbers are claimed here.' },
  { label: 'WHAT I LEARNED', text: 'Systems thinking — how ML output becomes one stage in a pipeline rather than the whole product, and how architecture decisions outlive any single model.' },
];

const TIER_TWO = [
  {
    name: 'Task Manager',
    does: 'Tracking tasks through states — the smallest complete application.',
    learned: 'The full request lifecycle: persistent software lives and dies by create, read, update, delete.',
  },
  {
    name: 'PhishGuard Lite',
    does: 'A lightweight guard against phishing.',
    learned: 'Security thinking starts with the smallest check a user will actually run.',
  },
  {
    name: 'Volunteer Matcher',
    does: 'Matching volunteers to where they are needed — allocation as software.',
    learned: 'Turning a matching problem into data structures and decisions.',
  },
];

const TIER_THREE = [
  {
    name: 'California Housing',
    does: 'Predicting median house prices from census data.',
    learned: 'Preprocessing, visualization, and regression on a real dataset.',
    href: 'https://github.com/RameezHiro/California-Housing-Prices',
    linkLabel: 'View source',
  },
  {
    name: 'ML Pipelines & Algorithms',
    does: 'A documented trail of ML experiments and implementations.',
    learned: 'Notebooks as a lab journal — every algorithm tried by hand.',
    href: 'https://github.com/RameezHiro/Machine-Learning-Portfolio',
    linkLabel: 'View journey',
  },
  {
    name: 'Streamlit Learning Projects',
    does: 'Interactive data apps straight from Python scripts.',
    learned: 'How fast an idea becomes something clickable.',
    href: 'https://github.com/RameezHiro/Learn-Streamlit',
    linkLabel: 'View source',
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

const Chapter05 = () => {
  const { scrollToChapter } = useChapterObserver();
  const nextTitle = chaptersData.getChapterById('06')?.title || 'EVOLUTION';

  return (
    <div>
      {/* A. OPENING */}
      <Reveal>
        <p className="font-display text-3xl md:text-5xl font-bold leading-tight text-ink max-w-3xl">
          Ideas become real when someone{' '}
          <span className="text-sakura">builds them</span>.
        </p>
        <p className="mt-5 font-body text-base md:text-lg leading-relaxed text-manga-gray max-w-2xl">
          Pressure taught speed. Projects taught systems — where concepts stop
          being understood and start being engineered.
        </p>
      </Reveal>

      {/* B. THE BUILDING LOOP — pipeline strip, wraps on mobile */}
      <Reveal className="mt-14 md:mt-20">
        <h2 className="font-body text-xs uppercase tracking-[0.3em] text-manga-gray">
          The building loop
        </h2>
        <ol
          className="mt-6 flex flex-wrap items-stretch gap-2"
          aria-label="Problem, idea, architecture, build, what broke, result, what I learned"
        >
          {LOOP.map((stage, i) => {
            const isLast = i === LOOP.length - 1;
            return (
              <li key={stage} className="flex items-stretch">
                <span
                  className={`flex items-center border-2 px-3 py-2 font-tech text-xs md:text-sm tracking-wide ${
                    isLast ? 'border-sakura text-sakura' : 'border-ink text-ink'
                  }`}
                >
                  {stage}
                </span>
                {i < LOOP.length - 1 && (
                  <span className="flex items-center px-1 text-manga-gray" aria-hidden="true">
                    →
                  </span>
                )}
              </li>
            );
          })}
        </ol>
        <p className="mt-6 font-body text-xs uppercase tracking-[0.2em] text-manga-gray">
          Every project below runs this loop — the flagship runs it in full
        </p>
      </Reveal>

      {/* C. FLAGSHIP — AAROH case file */}
      <div className="mt-16 md:mt-24">
        <Reveal>
          <h2 className="font-body text-xs uppercase tracking-[0.3em] text-manga-gray">
            Flagship
          </h2>
        </Reveal>
        <Reveal className="mt-6">
          <figure className="border-2 border-ink">
            <div className="flex items-center justify-between border-b border-ink/15 px-4 md:px-5 py-2">
              <span className="font-body text-[11px] uppercase tracking-[0.2em] text-manga-gray">
                Case file 01 — AAROH · flagship
              </span>
              <span className="h-2 w-2 bg-sakura" aria-hidden="true" />
            </div>
            <div className="px-5 md:px-6 py-6 md:py-8">
              <p className="font-display text-2xl md:text-4xl font-bold leading-tight text-ink">
                AAROH
              </p>
              <p className="mt-2 font-body text-sm md:text-base leading-relaxed text-manga-gray max-w-2xl">
                Smart Logistics &amp; Accessibility Intelligence Platform for
                the North Eastern Region.
              </p>

              {/* Stack taxonomy */}
              <ul
                className="mt-5 flex flex-wrap gap-2"
                aria-label="AAROH technology stack"
              >
                {AAROH_STACK.map((tech) => (
                  <li
                    key={tech}
                    className="border border-ink/30 px-2.5 py-1 font-tech text-[11px] md:text-xs tracking-wide text-ink"
                  >
                    {tech}
                  </li>
                ))}
              </ul>

              {/* Architecture diagram — inputs converge, pipeline descends */}
              <div
                className="mt-8 border border-ink/20 px-4 md:px-6 py-5 md:py-6"
                role="img"
                aria-label="AAROH architecture: weather, terrain, and incidents feed AI risk prediction, then risk assessment, route recommendation, vehicle impact analysis, alert generation, and dashboard"
              >
                <p className="font-tech text-[11px] uppercase tracking-[0.2em] text-manga-gray text-center">
                  Signals in
                </p>
                <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {['Weather', 'Terrain', 'Incidents'].map((signal) => (
                    <span
                      key={signal}
                      className="border border-ink px-3 py-2 text-center font-tech text-xs md:text-sm tracking-wide text-ink"
                    >
                      {signal}
                    </span>
                  ))}
                </div>
                <span className="mt-2 block text-center font-body text-lg text-manga-gray" aria-hidden="true">
                  ↓
                </span>
                <ol className="mt-1 flex flex-col gap-2">
                  {AAROH_FLOW.map((stage, i) => (
                    <li key={stage} className="flex flex-col">
                      <span
                        className={`border-2 px-3 py-2 text-center font-tech text-xs md:text-sm tracking-wide ${
                          i === 0
                            ? 'border-sakura text-sakura'
                            : 'border-ink text-ink'
                        }`}
                      >
                        {stage}
                      </span>
                      {i < AAROH_FLOW.length - 1 && (
                        <span className="py-1 text-center font-body text-lg text-manga-gray" aria-hidden="true">
                          ↓
                        </span>
                      )}
                    </li>
                  ))}
                </ol>
              </div>

              {/* Case study rows */}
              <dl className="mt-8 border-t border-ink/15">
                {AAROH_CASE.map((row) => (
                  <div
                    key={row.label}
                    className="grid grid-cols-1 md:grid-cols-[130px_1fr] gap-1 md:gap-6 border-b border-ink/10 py-3"
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
            </div>
          </figure>
        </Reveal>
      </div>

      {/* D. TIER 2 — meaningful builds, compact weight */}
      <div className="mt-16 md:mt-24">
        <Reveal>
          <h2 className="font-body text-xs uppercase tracking-[0.3em] text-manga-gray">
            Further builds
          </h2>
        </Reveal>
        <div className="mt-6 border-t-2 border-ink">
          {TIER_TWO.map((project, i) => (
            <Reveal key={project.name} delay={Math.min(i * 0.06, 0.18)}>
              <section
                aria-label={project.name}
                className="border-b border-ink/15 py-6 md:py-7"
              >
                <h3 className="font-display text-xl md:text-2xl font-bold tracking-tight text-ink">
                  {project.name}
                </h3>
                <dl className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-x-10">
                  <div className="border-t border-ink/10 py-2">
                    <dt className="font-tech text-[11px] uppercase tracking-[0.2em] text-manga-gray">
                      What it does
                    </dt>
                    <dd className="mt-1 font-body text-sm leading-relaxed text-ink">
                      {project.does}
                    </dd>
                  </div>
                  <div className="border-t border-ink/10 py-2">
                    <dt className="font-tech text-[11px] uppercase tracking-[0.2em] text-manga-gray">
                      What I built / learned
                    </dt>
                    <dd className="mt-1 font-body text-sm leading-relaxed text-ink">
                      {project.learned}
                    </dd>
                  </div>
                </dl>
              </section>
            </Reveal>
          ))}
        </div>
      </div>

      {/* E. TIER 3 — learning experiments with real evidence links */}
      <div className="mt-14 md:mt-20">
        <Reveal>
          <h2 className="font-body text-xs uppercase tracking-[0.3em] text-manga-gray">
            Learning experiments
          </h2>
        </Reveal>
        <div className="mt-6 border-t border-ink/30">
          {TIER_THREE.map((project) => (
            <Reveal key={project.name}>
              <section
                aria-label={project.name}
                className="border-b border-ink/10 py-5 md:py-6"
              >
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <h3 className="font-tech text-sm md:text-base tracking-wide text-ink">
                    {project.name}
                  </h3>
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noreferrer"
                    className="font-body text-xs uppercase tracking-[0.2em] text-manga-gray underline decoration-sakura decoration-2 underline-offset-4 hover:text-sakura focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sakura"
                  >
                    {project.linkLabel} ↗
                  </a>
                </div>
                <p className="mt-2 font-body text-sm leading-relaxed text-manga-gray max-w-2xl">
                  {project.does} — {project.learned}
                </p>
              </section>
            </Reveal>
          ))}
        </div>
      </div>

      {/* F. CLOSING — growth marker beside the transition out */}
      <Reveal className="mt-20 md:mt-32">
        <div className="border-t-2 border-ink pt-10 md:pt-14">
          <p className="font-body text-xs uppercase tracking-[0.3em] text-manga-gray">
            End of projects
          </p>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-[1fr_200px] gap-10 md:gap-8 items-start">
            <div>
              <p className="font-display text-3xl md:text-5xl font-bold leading-tight text-ink max-w-3xl">
                Every project left a{' '}
                <span className="text-sakura">system</span> behind.
              </p>
              <p className="mt-5 font-body text-base md:text-lg leading-relaxed text-manga-gray max-w-2xl">
                Building changed what learning meant.
              </p>
            </div>
            <figure className="w-40 md:w-full md:max-w-[200px] md:pt-2">
              <SakuraGrowth stage={5} className="w-full h-auto" />
              <figcaption className="mt-2 font-tech text-[11px] uppercase tracking-[0.2em] text-manga-gray text-center">
                Growth · Stage 05
              </figcaption>
            </figure>
          </div>
          <div className="mt-10 md:mt-14 flex md:justify-end">
            <button
              onClick={() => scrollToChapter('06')}
              className="inline-flex items-center gap-3 font-body text-xs uppercase tracking-[0.25em] text-ink hover:text-sakura focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sakura"
            >
              Next — Chapter 06 · {nextTitle}
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

export default Chapter05;
