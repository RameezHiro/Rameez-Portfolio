import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import useChapterObserver from '../../hooks/useChapterObserver';
import chaptersData from '../../data/chapters';
import SakuraGrowth from '../shared/SakuraGrowth';
import MangaPanel from '../ui/MangaPanel';
import MangaSpread from '../ui/MangaSpread';
import SectionLabel from '../ui/SectionLabel';

// Chapter 05 — PROJECT ARC. Evidence first: two case files with inspectable
// artifacts, then a quiet index of smaller builds. Claims are limited to what
// the repositories actually contain. No screenshots of software that does not
// exist, no usage numbers, no accuracy scores.
const AAROH_STACK = [
  'Python',
  'FastAPI',
  'scikit-learn',
  'NetworkX',
  'SQLAlchemy',
  'SQLite',
  'Pydantic',
];

const AAROH_WORKING = [
  'Routes for predictions, incidents, alerts, dashboard, roads, weather, and vehicles.',
  'A committed Random Forest returns Low, Medium, or High risk.',
  'NetworkX applies risk-weighted edges; SQLAlchemy persists to SQLite.',
];

const AAROH_LIMITS = [
  'Synthetic training data; no field accuracy is claimed.',
  'Fully connected routing graph for MVP testing.',
  'Empty frontend; no demo; open CORS; no auth.',
];

const AAROH_LINKS = [
  { label: 'Repository', href: 'https://github.com/RameezHiro/AAROH' },
  {
    label: 'API tests',
    href: 'https://github.com/RameezHiro/AAROH/blob/main/backend/tests/test_api.py',
  },
  {
    label: 'Training script',
    href: 'https://github.com/RameezHiro/AAROH/blob/main/backend/scripts/train_model.py',
  },
  {
    label: 'Routing service',
    href: 'https://github.com/RameezHiro/AAROH/blob/main/backend/app/services/routing_service.py',
  },
];

const DECODE_LINKS = [
  { label: 'Live workspace', href: 'https://decodeai-jet.vercel.app' },
  { label: 'Source', href: 'https://github.com/RameezHiro/Decodeai' },
  {
    label: 'API tests',
    href: 'https://github.com/RameezHiro/Decodeai/blob/main/backend/tests/test_api.py',
  },
];

const RECORDS = [
  {
    index: '03',
    name: 'California Housing',
    kind: 'ML notebook · work in progress',
    note: 'Regression study on census data: EDA, ratio-based feature engineering, and three regressors.',
    links: [
      {
        label: 'Repository',
        href: 'https://github.com/RameezHiro/California-Housing-Prices',
      },
    ],
  },
  {
    index: '04',
    name: 'Task Manager',
    kind: 'FastAPI · live API docs',
    note: 'CRUD API with auth, task filtering, SQLite persistence, and a Render deployment descriptor.',
    links: [
      {
        label: 'API docs',
        href: 'https://task-manager-f13j.onrender.com/docs',
      },
      {
        label: 'Source',
        href: 'https://github.com/RameezHiro/Task-Manager',
      },
    ],
  },
  {
    index: '05',
    name: 'ML Pipelines & Algorithms',
    kind: 'Notebook collection',
    note: 'Notebook trail: gradient descent from scratch, EDA, regression, and scikit-learn pipelines.',
    links: [
      {
        label: 'Repository',
        href: 'https://github.com/RameezHiro/Machine-Learning-Portfolio',
      },
    ],
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

const ExternalLink = ({ href, children }) => (
  <a
    href={href}
    target="_blank"
    rel="noreferrer"
    className="font-body text-xs text-ink underline decoration-sakura decoration-2 underline-offset-4 hover:text-sakura-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sakura-text"
  >
    {children}
    <span aria-hidden="true"> ↗</span>
  </a>
);

const LinkRow = ({ links, className = '' }) => (
  <div className={`flex flex-wrap gap-x-4 gap-y-2 ${className}`}>
    {links.map((link) => (
      <ExternalLink key={link.label} href={link.href}>
        {link.label}
      </ExternalLink>
    ))}
  </div>
);

const CaseNote = ({ label, children }) => (
  <div className="border-t border-ink/15 pt-3">
    <dt className="font-tech text-[11px] uppercase tracking-[0.2em] text-sakura-text">
      {label}
    </dt>
    <dd className="mt-1.5 font-body text-sm leading-relaxed text-ink">{children}</dd>
  </div>
);

const StackLine = ({ items }) => (
  <p className="font-tech text-[11px] leading-relaxed tracking-wide text-manga-gray">
    {items.join(' · ')}
  </p>
);

const Chapter05 = () => {
  const { scrollToChapter } = useChapterObserver();
  const nextTitle = chaptersData.getChapterById('06')?.title || 'EVOLUTION';

  return (
    <div>
      {/* A. OPENING — one establishing spread and a table of contents */}
      <Reveal>
        <MangaSpread gap="lg">
          <div className="col-span-12 md:col-span-7">
            <SectionLabel index="Scene 01" label="Evidence over adjectives" />
            <p className="mt-5 max-w-xl font-display text-2xl font-bold leading-snug text-ink md:text-3xl">
              Ideas become real when someone{' '}
              <span className="text-sakura-text">builds them</span>.
            </p>
            <p className="mt-4 max-w-lg font-body text-sm leading-relaxed text-manga-gray md:text-base">
              Pressure taught speed. Projects taught systems — where concepts stop
              being understood and start being engineered.
            </p>
          </div>
          <div className="col-span-12 md:col-span-5 md:justify-self-end md:w-full">
            <div className="border-t border-ink/15 pt-4">
              <p className="font-tech text-[11px] uppercase tracking-[0.2em] text-manga-gray">
                In this file
              </p>
              <ol className="mt-3 space-y-2">
                <li className="flex gap-3 border-t border-ink/10 pt-2 font-body text-sm text-ink">
                  <span className="font-tech text-xs text-sakura-text" aria-hidden="true">
                    01
                  </span>
                  AAROH — backend case file
                </li>
                <li className="flex gap-3 border-t border-ink/10 pt-2 font-body text-sm text-ink">
                  <span className="font-tech text-xs text-sakura-text" aria-hidden="true">
                    02
                  </span>
                  Decode AI — deployed case file
                </li>
                <li className="flex gap-3 border-t border-ink/10 pt-2 font-body text-sm text-ink">
                  <span className="font-tech text-xs text-sakura-text" aria-hidden="true">
                    03
                  </span>
                  Three compact records
                </li>
              </ol>
            </div>
          </div>
        </MangaSpread>
      </Reveal>

      {/* B. CASE 01 — AAROH */}
      <Reveal className="mt-10 md:mt-20">
        <div className="border-t-2 border-ink pt-5">
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
            <SectionLabel index="Case 01" label="Flagship" />
            <p className="font-tech text-[11px] uppercase tracking-[0.18em] text-manga-gray">
              SIH 2026 · backend prototype
            </p>
          </div>
          <h3 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink md:text-5xl">
            AAROH
          </h3>
          <p className="mt-2 max-w-2xl font-body text-sm leading-relaxed text-manga-gray md:text-base">
            AI-based smart logistics &amp; accessibility intelligence for the North
            Eastern Region.
          </p>
        </div>

        <MangaSpread className="mt-5 md:mt-7" gap="lg">
          <div className="col-span-12 lg:col-span-5">
            <dl className="space-y-4">
              <CaseNote label="Problem">
                Terrain, weather, and landslides delay essential goods across the
                North Eastern Region. The SIH brief asks for live disruption signals
                and route alternatives; static routes cannot provide either.
              </CaseNote>
              <CaseNote label="Contribution">
                Solo backend build — every commit is mine. I built the API, data
                models, risk classifier, router, and tests. The frontend was never
                built.
              </CaseNote>
              <CaseNote label="Approach">
                FastAPI routes feed service modules. A Random Forest predicts risk
                from rainfall, slope, and landslide history; NetworkX applies
                risk-weighted edges; SQLAlchemy persists operational data in SQLite.
              </CaseNote>
            </dl>
            <div className="mt-5 border-t border-ink/15 pt-3">
              <StackLine items={AAROH_STACK} />
              <LinkRow links={AAROH_LINKS} className="mt-3" />
            </div>
          </div>

          <figure className="col-span-12 lg:col-span-7">
            <div className="border border-ink/25 p-4 md:p-5">
              <div className="flex items-baseline justify-between gap-3">
                <p className="font-tech text-[11px] uppercase tracking-[0.18em] text-manga-gray">
                  Request path
                </p>
                <p className="font-tech text-[11px] text-manga-gray">backend/app</p>
              </div>
              <div className="mt-4 grid grid-cols-1 border border-ink/20 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:gap-2 md:border-0">
                <div className="border-b border-ink/15 p-3 md:border-2 md:border-ink">
                  <p className="font-tech text-[11px] uppercase tracking-[0.16em] text-sakura-text">
                    FastAPI routes
                  </p>
                  <p className="mt-2 font-body text-xs leading-relaxed text-ink">
                    predictions · incidents · alerts · dashboard · roads · weather ·
                    vehicles
                  </p>
                </div>
                <span
                  className="hidden self-center text-center font-body text-lg text-manga-gray md:block"
                  aria-hidden="true"
                >
                  →
                </span>
                <div className="border-b border-ink/15 p-3 md:border-2 md:border-ink">
                  <p className="font-tech text-[11px] uppercase tracking-[0.16em] text-sakura-text">
                    Services
                  </p>
                  <p className="mt-2 font-body text-xs leading-relaxed text-ink">
                    prediction · routing · alert · dashboard · integration · vehicle
                  </p>
                </div>
                <span
                  className="hidden self-center text-center font-body text-lg text-manga-gray md:block"
                  aria-hidden="true"
                >
                  →
                </span>
                <div className="p-3 md:border-2 md:border-ink">
                  <p className="font-tech text-[11px] uppercase tracking-[0.16em] text-sakura-text">
                    State &amp; models
                  </p>
                  <p className="mt-2 font-body text-xs leading-relaxed text-ink">
                    Random Forest artifact · NetworkX graph · SQLAlchemy → SQLite
                  </p>
                  <p className="mt-1.5 inline-block border border-dashed border-ink/30 px-1.5 py-0.5 font-body text-[11px] text-manga-gray">
                    PostgreSQL + PostGIS — configured, unused
                  </p>
                </div>
              </div>
              <p className="mt-3 border-t border-ink/10 pt-2 font-body text-xs leading-relaxed text-manga-gray">
                Reconstructed from the committed route, service, and schema files.
                The frontend directory is empty; the dashed item is not used in this
                build.
              </p>
            </div>
            <figcaption className="mt-2 font-body text-xs leading-relaxed text-manga-gray">
              The backend shape, not an aspirational product diagram. The API is the
              interface; there is no dashboard UI in the repository.
            </figcaption>
          </figure>
        </MangaSpread>

        <MangaPanel
          as="section"
          variant="technical"
          padding="md"
          className="mt-5"
          aria-label="AAROH verification and limitations"
        >
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div>
              <p className="font-tech text-[11px] uppercase tracking-[0.2em] text-sakura-text">
                Working in the repository
              </p>
              <ul className="mt-2 space-y-1.5">
                {AAROH_WORKING.map((item) => (
                  <li key={item} className="flex gap-2 font-body text-sm leading-relaxed text-ink">
                    <span aria-hidden="true" className="text-sakura-text">
                      —
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-tech text-[11px] uppercase tracking-[0.2em] text-manga-gray">
                What is not claimed
              </p>
              <ul className="mt-2 space-y-1.5">
                {AAROH_LIMITS.map((item) => (
                  <li key={item} className="flex gap-2 font-body text-sm leading-relaxed text-manga-gray">
                    <span aria-hidden="true" className="text-sakura-text">
                      —
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="mt-4 border-t border-ink/15 pt-3 font-body text-xs leading-relaxed text-manga-gray">
            The repository contains six API smoke tests; they were not executed in
            this review. No deployment, user, or performance claims are made.
          </p>
        </MangaPanel>

        <figure className="mt-5 border-l-2 border-sakura pl-4">
          <p className="font-tech text-[11px] uppercase tracking-[0.18em] text-manga-gray">
            From backend/scripts/train_model.py
          </p>
          <pre className="mt-2 overflow-x-auto whitespace-pre-wrap break-words font-tech text-[11px] leading-relaxed text-ink">
            <code>{`def calculate_label(row):
    score = (row['rainfall_mm'] * 0.05) + (row['terrain_slope'] * 0.03) + (row['historical_landslides'] * 0.2)
    if score > 6.0:
        return 2 # High
    elif score > 3.0:
        return 1 # Medium
    else:
        return 0 # Low`}</code>
          </pre>
          <figcaption className="mt-2 font-body text-xs leading-relaxed text-manga-gray">
            Synthetic rows, heuristic labels. The pipeline is real; the model is a
            prototype, not evidence of field accuracy.
          </figcaption>
        </figure>
      </Reveal>

      {/* C. CASE 02 — DECODE AI */}
      <Reveal className="mt-10 md:mt-20">
        <div className="border-t-2 border-ink pt-5">
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
            <SectionLabel index="Case 02" label="Deployed" />
            <p className="font-tech text-[11px] uppercase tracking-[0.18em] text-manga-gray">
              Vercel + Render · verified 29 Oct 2026
            </p>
          </div>
          <h3 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink md:text-5xl">
            DECODE AI
          </h3>
          <p className="mt-2 max-w-2xl font-body text-sm leading-relaxed text-manga-gray md:text-base">
            An image-explanation workspace: upload a picture, ask a question, and get
            a structured lesson plus a short practice quiz.
          </p>
        </div>

        <MangaSpread className="mt-5 md:mt-7" gap="lg">
          <figure className="col-span-12 lg:col-span-7">
            <div className="border-2 border-ink bg-deep-ink p-2">
              <img
                src="/projects/decode-ai-workspace.jpg"
                alt="Decode AI live workspace: a dark hero reading “Understand anything. One image at a time.” above the upload card, with a navigation status chip reading “API connected.”"
                width="1280"
                height="900"
                loading="lazy"
                decoding="async"
                className="aspect-[16/10] w-full object-cover object-top"
              />
            </div>
            <figcaption className="mt-2 font-body text-xs leading-relaxed text-manga-gray">
              The deployed workspace, captured 29 Oct 2026. The status chip reads
              &ldquo;API connected&rdquo;; this is the live page, not a mockup.
            </figcaption>
          </figure>

          <div className="col-span-12 lg:col-span-5">
            <dl className="space-y-4">
              <CaseNote label="Problem">
                A diagram can hold the answer and still be hard to learn from. This
                workspace turns an image and a question into an explanation and a
                short quiz.
              </CaseNote>
              <CaseNote label="Contribution">
                Solo full-stack build — every commit is mine. React client, FastAPI
                service, provider integration, validation, and deployment
                configuration.
              </CaseNote>
              <CaseNote label="Approach">
                Uploads are signature-checked and capped at 10 MB. The API tries a
                primary Gemma model, validates the returned JSON, and retries with a
                fallback. The key stays server-side; the client runs on Vercel, the
                API on Render.
              </CaseNote>
            </dl>
            <div className="mt-5 border-t border-ink/15 pt-3">
              <p className="font-body text-sm leading-relaxed text-manga-gray">
                Verified: the live page loads, reports API connected, and the repo
                commits offline tests for health, fallback, upload validation, and the
                quiz contract. Those tests were not run in this review.
              </p>
              <p className="mt-2 border-l-2 border-sakura pl-3 font-body text-xs leading-relaxed text-manga-gray">
                Usage, accuracy, and production readiness are not claimed. The free
                Render API can cold-start; there is no auth or rate limit yet.
              </p>
              <LinkRow links={DECODE_LINKS} className="mt-3" />
            </div>
          </div>
        </MangaSpread>
      </Reveal>

      {/* D. COMPACT INDEX — evidence-linked builds, quieter than the case files */}
      <Reveal className="mt-10 md:mt-20">
        <SectionLabel index="Scene 03" label="More builds" />
        <h3 className="mt-3 font-display text-2xl font-bold tracking-tight text-ink md:text-3xl">
          The rest of the arc
        </h3>
        <div className="mt-5 border-t-2 border-ink">
          {RECORDS.map((record) => (
            <div
              key={record.name}
              className="grid grid-cols-12 gap-x-4 gap-y-2 border-b border-ink/15 py-3 md:py-4"
            >
              <span
                className="col-span-2 font-tech text-xs text-sakura-text md:col-span-1"
                aria-hidden="true"
              >
                {record.index}
              </span>
              <div className="col-span-10 md:col-span-4">
                <h4 className="font-display text-lg font-bold leading-tight tracking-tight text-ink md:text-xl">
                  {record.name}
                </h4>
                <p className="mt-1 font-tech text-[11px] uppercase tracking-[0.16em] text-manga-gray">
                  {record.kind}
                </p>
              </div>
              <p className="col-span-12 font-body text-sm leading-relaxed text-manga-gray md:col-span-5">
                {record.note}
              </p>
              <LinkRow links={record.links} className="col-span-12 md:col-span-2 md:justify-end" />
            </div>
          ))}
        </div>
        <p className="mt-3 font-body text-xs leading-relaxed text-manga-gray">
          Links open the public repository or, for Task Manager, the live Swagger UI.
          Only artifacts that were found and checked are listed.
        </p>
      </Reveal>

      {/* E. CLOSING — growth marker beside the transition out */}
      <Reveal className="mt-12 md:mt-24">
        <div className="border-t-2 border-ink pt-8 md:pt-12">
          <MangaSpread gap="lg">
            <div className="col-span-12 md:col-span-7">
              <SectionLabel index="Scene 04" label="End of projects" />
              <p className="mt-4 max-w-2xl font-display text-3xl font-bold leading-tight text-ink md:text-4xl">
                Every project left a{' '}
                <span className="text-sakura-text">system</span> behind.
              </p>
              <p className="mt-4 max-w-xl font-body text-base leading-relaxed text-manga-gray md:text-lg">
                Building changed what learning meant.
              </p>
            </div>
            <figure className="col-span-12 w-full max-w-xs md:col-span-5 md:justify-self-end">
              <div className="relative h-32 overflow-hidden border border-ink/20 bg-paper md:h-44">
                <SakuraGrowth stage={5} crop className="h-full w-full" />
              </div>
              <figcaption className="mt-2 text-center font-tech text-[11px] uppercase tracking-[0.2em] text-manga-gray">
                Growth · Stage 05
              </figcaption>
            </figure>
          </MangaSpread>
          <div className="mt-8 flex md:mt-12 md:justify-end">
            <button
              onClick={() => scrollToChapter('06')}
              className="inline-flex items-center gap-3 font-body text-xs uppercase tracking-[0.25em] text-ink hover:text-sakura-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sakura-text"
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
