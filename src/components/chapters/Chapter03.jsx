import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import useChapterObserver from '../../hooks/useChapterObserver';
import chaptersData from '../../data/chapters';
import SakuraGrowth from '../shared/SakuraGrowth';

// Chapter 03 — ARSENAL. Story-first: the engineering toolkit framed as
// decisions, not a collection. Four canonical groups; every technology
// answers "why did I use this?" No percentages, no bars, no metrics,
// no logos-as-content. Denser than Chapter 02, same manuscript grammar.
const GROUPS = [
  {
    index: '01',
    name: 'INTELLIGENCE',
    narrative: 'Teaching machines to find patterns.',
    items: [
      { name: 'Machine Learning', role: 'pattern-finding toolkit', why: 'used to turn data into predictions in ML experiments.' },
      { name: 'Scikit-learn', role: 'classical ML', why: 'used for regression, classification, and clustering experiments.' },
      { name: 'NumPy', role: 'numerical arrays', why: 'used for the array math underneath every data experiment.' },
      { name: 'Pandas', role: 'tabular data', why: 'used to clean, slice, and question datasets.' },
      { name: 'Statistics', role: 'distributions & uncertainty', why: 'used to read evidence in data before modeling it.' },
      { name: 'Data Analysis', role: 'visualization & inquiry', why: 'used to make data visible before making it predictive.' },
    ],
    evidence: [
      { label: 'California Housing', href: 'https://github.com/RameezHiro/California-Housing-Prices' },
      { label: 'ML Pipelines & Algorithms', href: 'https://github.com/RameezHiro/Machine-Learning-Portfolio' },
      { label: 'Academic Career Navigator', href: 'https://github.com/RameezHiro/AI-Powered-Academic-Career-Navigator.git' },
    ],
  },
  {
    index: '02',
    name: 'ENGINEERING',
    narrative: 'Where software keeps its memory — and how pieces talk to each other.',
    items: [
      { name: 'Python', role: 'primary language', why: 'used across backend, scripting, and ML work — one language everywhere.' },
      { name: 'FastAPI', role: 'API framework', why: 'used to turn Python functions into HTTP endpoints.' },
      { name: 'SQL / MySQL', role: 'relational data', why: 'used for structured storage and real queries.' },
      { name: 'REST APIs', role: 'interface contract', why: 'used as the way application pieces talk to each other.' },
      { name: 'Git / GitHub', role: 'version control', why: 'used for history on every experiment, shared in public.' },
      { name: 'Backend Architecture', role: 'systems thinking', why: 'used to decide where logic, data, and interfaces live.' },
    ],
    evidence: null,
  },
  {
    index: '03',
    name: 'FRONTEND',
    narrative: 'What the reader touches.',
    items: [
      { name: 'HTML', role: 'structure', why: 'used for the bones of every page.' },
      { name: 'CSS', role: 'presentation', why: 'used for how those bones carry weight.' },
      { name: 'JavaScript', role: 'interactivity', why: 'used for behavior in the browser.' },
      { name: 'React', role: 'component UI', why: 'used to build interfaces from pieces — including this portfolio.' },
      { name: 'Vite', role: 'build tooling', why: 'used for fast builds — including this portfolio.' },
      { name: 'Tailwind', role: 'utility styling', why: 'used for styling in the markup — including this page.' },
    ],
    evidence: null,
  },
  {
    index: '04',
    name: 'TOOLS',
    narrative: 'The bench the work happens on.',
    items: [
      { name: 'Claude Code', role: 'AI pair-programming', why: 'used to draft, debug, and reason through code faster.' },
      { name: 'Antigravity', role: 'agentic environment', why: 'used for building with AI agents in the loop.' },
      { name: 'VS Code', role: 'editor', why: 'used as the place where the code gets written.' },
      { name: 'Firebase', role: 'managed backend', why: 'used for backend services without running servers.' },
    ],
    evidence: null,
  },
  {
    index: '05',
    name: 'DEPLOYMENT',
    narrative: 'How the work leaves the machine.',
    items: [
      { name: 'Vercel', role: 'frontend hosting', why: 'used to deploy and host frontend applications.' },
      { name: 'Railway', role: 'backend hosting', why: 'used to deploy backend and API services.' },
      { name: 'Render', role: 'backend hosting', why: 'used to deploy and host backend and API services.' },
      { name: 'Firebase Hosting', role: 'app hosting', why: 'used for hosting and deployment on Firebase-based applications.' },
    ],
    evidence: null,
  },
  {
    index: '06',
    name: 'AI INTEGRATION',
    narrative: 'Borrowed intelligence, wired in.',
    items: [
      { name: 'Gemini', role: 'AI model API', why: 'used to integrate AI model capabilities via API.' },
      { name: 'Groq', role: 'LLM inference API', why: 'used for fast LLM inference via API.' },
    ],
    evidence: null,
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

const Chapter03 = () => {
  const { scrollToChapter } = useChapterObserver();
  const nextTitle = chaptersData.getChapterById('04')?.title || 'THE BATTLE ARC';

  return (
    <div>
      {/* A. OPENING */}
      <Reveal>
        <p className="font-display text-3xl md:text-5xl font-bold leading-tight text-ink max-w-3xl">
          The tools changed. The question stayed{' '}
          <span className="text-sakura">the same</span>.
        </p>
        <p className="mt-5 font-body text-base md:text-lg leading-relaxed text-manga-gray max-w-2xl">
          Every stage of training added a new instrument. None of them mattered
          until there was something to build.
        </p>
      </Reveal>

      {/* B. THESIS — decision framing, young tree alongside */}
      <Reveal className="mt-14 md:mt-20">
        <h2 className="font-body text-xs uppercase tracking-[0.3em] text-manga-gray">
          Field note
        </h2>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-[1fr_200px] gap-10 md:gap-8 items-start">
          <div>
            <p className="font-display text-2xl md:text-4xl font-bold leading-tight text-ink max-w-xl">
              An engineer&apos;s arsenal isn&apos;t a list. It&apos;s a set of
              decisions.
            </p>
            <p className="mt-6 font-tech text-xs uppercase tracking-[0.2em] text-manga-gray">
              Every entry below answers one question
            </p>
            <p className="mt-2 font-display text-xl md:text-2xl font-bold text-sakura">
              Why did I use this?
            </p>
          </div>
          <figure className="w-40 md:w-full md:max-w-[200px] md:pt-2">
            <SakuraGrowth stage={3} className="w-full h-auto" />
            <figcaption className="mt-2 font-tech text-[11px] uppercase tracking-[0.2em] text-manga-gray text-center">
              Growth · Stage 03
            </figcaption>
          </figure>
        </div>
      </Reveal>

      {/* C. THE ARSENAL — four ruled groups, denser than Chapter 02 */}
      <div className="mt-16 md:mt-24">
        <Reveal>
          <h2 className="font-body text-xs uppercase tracking-[0.3em] text-manga-gray">
            The arsenal
          </h2>
        </Reveal>
        <div className="mt-6 border-t-2 border-ink">
          {GROUPS.map((group, i) => (
            <Reveal key={group.name} delay={Math.min(i * 0.06, 0.18)}>
              <section
                aria-label={`Group ${group.index}: ${group.name}`}
                className="border-b border-ink/15 py-8 md:py-10"
              >
                <div className="flex items-baseline gap-4">
                  <span
                    className="font-tech text-sm text-manga-gray shrink-0"
                    aria-hidden="true"
                  >
                    {group.index}
                  </span>
                  <h3 className="font-display text-2xl md:text-4xl font-bold tracking-tight text-ink">
                    {group.name}
                  </h3>
                </div>
                <p className="mt-3 font-body text-sm md:text-base leading-relaxed text-manga-gray max-w-2xl">
                  {group.narrative}
                </p>
                <dl className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-x-10">
                  {group.items.map((item) => (
                    <div
                      key={`${group.name}-${item.name}`}
                      className="border-t border-ink/10 py-3"
                    >
                      <dt className="font-tech text-sm md:text-base tracking-wide text-ink">
                        {item.name}
                        <span className="ml-2 font-body text-xs uppercase tracking-[0.15em] text-manga-gray">
                          {item.role}
                        </span>
                      </dt>
                      <dd className="mt-1 font-body text-sm leading-relaxed text-manga-gray">
                        <span
                          className="font-tech text-[11px] uppercase tracking-[0.2em] text-sakura"
                          aria-hidden="true"
                        >
                          Why —{' '}
                        </span>
                        {item.why}
                      </dd>
                    </div>
                  ))}
                </dl>
                {group.evidence && (
                  <p className="mt-5 font-tech text-[11px] uppercase tracking-[0.2em] text-manga-gray">
                    ↳ Field evidence —{' '}
                    {group.evidence.map((link, li) => (
                      <React.Fragment key={link.label}>
                        {li > 0 && <span aria-hidden="true">{' · '}</span>}
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noreferrer"
                          className="text-ink underline decoration-sakura decoration-2 underline-offset-4 hover:text-sakura focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sakura"
                        >
                          {link.label}
                        </a>
                      </React.Fragment>
                    ))}
                  </p>
                )}
                {i < GROUPS.length - 1 && (
                  <span
                    className="mt-6 block text-center font-body text-xl text-manga-gray"
                    aria-hidden="true"
                  >
                    ↓
                  </span>
                )}
              </section>
            </Reveal>
          ))}
        </div>
      </div>

      {/* D. CLOSING — end of inventory, generous negative space */}
      <Reveal className="mt-20 md:mt-32">
        <div className="border-t-2 border-ink pt-10 md:pt-14">
          <p className="font-body text-xs uppercase tracking-[0.3em] text-manga-gray">
            End of inventory
          </p>
          <p className="mt-6 font-display text-3xl md:text-5xl font-bold leading-tight text-ink max-w-3xl">
            TOOLS ARE <span className="text-sakura">READY</span>.
          </p>
          <p className="mt-5 font-body text-base md:text-lg leading-relaxed text-manga-gray max-w-2xl">
            The question was never how many tools could be collected. It was
            knowing which one the work called for.
          </p>
          <div className="mt-10 md:mt-14 flex md:justify-end">
            <button
              onClick={() => scrollToChapter('04')}
              className="inline-flex items-center gap-3 font-body text-xs uppercase tracking-[0.25em] text-ink hover:text-sakura focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sakura"
            >
              Next — Chapter 04 · {nextTitle}
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

export default Chapter03;
