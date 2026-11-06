import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import useChapterObserver from '../../hooks/useChapterObserver';
import chaptersData from '../../data/chapters';
import SakuraGrowth from '../shared/SakuraGrowth';
import MangaPanel from '../ui/MangaPanel';
import MangaSpread from '../ui/MangaSpread';
import SectionLabel from '../ui/SectionLabel';
import TechIcon from '../ui/TechIcon';

// Chapter 03 — ARSENAL. Story-first: the engineering toolkit framed as
// decisions, not a collection. Six canonical groups; every technology
// answers "why did I use this?" No percentages, no bars, no metrics. Marks
// are recognition cues only; the name and role remain the content. The map
// groups the six limbs by role: foundations (01–02), interface (03), support
// (04–06).
const GROUPS = [
  {
    index: '01',
    name: 'INTELLIGENCE',
    narrative: 'Teaching machines to find patterns.',
    items: [
      { name: 'Machine Learning', role: 'pattern-finding toolkit', icon: 'lucide-brain', why: 'used to turn data into predictions in ML experiments.' },
      { name: 'Scikit-learn', role: 'classical ML', icon: 'scikitlearn', why: 'used for regression, classification, and clustering experiments.' },
      { name: 'NumPy', role: 'numerical arrays', icon: 'numpy', why: 'used for the array math underneath every data experiment.' },
      { name: 'Pandas', role: 'tabular data', icon: 'pandas', why: 'used to clean, slice, and question datasets.' },
      { name: 'Statistics', role: 'distributions & uncertainty', icon: 'lucide-sigma', why: 'used to read evidence in data before modeling it.' },
      { name: 'Data Analysis', role: 'visualization & inquiry', icon: 'lucide-chartline', why: 'used to make data visible before making it predictive.' },
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
      { name: 'Python', role: 'primary language', icon: 'python', why: 'used across backend, scripting, and ML work — one language everywhere.' },
      { name: 'FastAPI', role: 'API framework', icon: 'fastapi', why: 'used to turn Python functions into HTTP endpoints.' },
      { name: 'SQL / MySQL', role: 'relational data', icon: 'mysql', why: 'used for structured storage and real queries.' },
      { name: 'REST APIs', role: 'interface contract', icon: 'lucide-webhook', why: 'used as the way application pieces talk to each other.' },
      { name: 'Git / GitHub', role: 'version control', icon: 'github', why: 'used for history on every experiment, shared in public.' },
      { name: 'Backend Architecture', role: 'systems thinking', icon: 'lucide-layers', why: 'used to decide where logic, data, and interfaces live.' },
    ],
    evidence: null,
  },
  {
    index: '03',
    name: 'FRONTEND',
    narrative: 'What the reader touches.',
    items: [
      { name: 'HTML', role: 'structure', icon: 'html5', why: 'used for the bones of every page.' },
      { name: 'CSS', role: 'presentation', icon: 'css', why: 'used for how those bones carry weight.' },
      { name: 'JavaScript', role: 'interactivity', icon: 'javascript', why: 'used for behavior in the browser.' },
      { name: 'React', role: 'component UI', icon: 'react', why: 'used to build interfaces from pieces — including this portfolio.' },
      { name: 'Vite', role: 'build tooling', icon: 'vite', why: 'used for fast builds — including this portfolio.' },
      { name: 'Tailwind', role: 'utility styling', icon: 'tailwindcss', why: 'used for styling in the markup — including this page.' },
    ],
    evidence: null,
  },
  {
    index: '04',
    name: 'TOOLS',
    narrative: 'The bench the work happens on.',
    items: [
      { name: 'Claude Code', role: 'AI pair-programming', icon: 'claudecode', why: 'used to draft, debug, and reason through code faster.' },
      { name: 'Antigravity', role: 'agentic environment', icon: 'lucide-orbit', why: 'used for building with AI agents in the loop.' },
      { name: 'VS Code', role: 'editor', icon: 'lucide-code', why: 'used as the place where the code gets written.' },
      { name: 'Firebase', role: 'managed backend', icon: 'firebase', why: 'used for backend services without running servers.' },
    ],
    evidence: null,
  },
  {
    index: '05',
    name: 'DEPLOYMENT',
    narrative: 'How the work leaves the machine.',
    items: [
      { name: 'Vercel', role: 'frontend hosting', icon: 'vercel', why: 'used to deploy and host frontend applications.' },
      { name: 'Railway', role: 'backend hosting', icon: 'railway', why: 'used to deploy backend and API services.' },
      { name: 'Render', role: 'backend hosting', icon: 'render', why: 'used to deploy and host backend and API services.' },
      { name: 'Firebase Hosting', role: 'app hosting', icon: 'firebase', why: 'used for hosting and deployment on Firebase-based applications.' },
    ],
    evidence: null,
  },
  {
    index: '06',
    name: 'AI INTEGRATION',
    narrative: 'Borrowed intelligence, wired in.',
    items: [
      { name: 'Gemini', role: 'AI model API', icon: 'googlegemini', why: 'used to integrate AI model capabilities via API.' },
      { name: 'Groq', role: 'LLM inference API', icon: 'lucide-zap', why: 'used for fast LLM inference via API.' },
    ],
    evidence: null,
  },
];

const [intelligence, engineering, frontend, ...supportGroups] = GROUPS;

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

// A single node on the map: the technology and the role it plays. The mark
// is decorative; the name stays the readable, primary element.
const SkillNode = ({ item }) => (
  <li className="group border-t border-ink/10 pt-2.5">
    <div className="flex items-start gap-2.5">
      <TechIcon
        name={item.icon}
        className="mt-0.5 opacity-60 transition-opacity duration-150 group-hover:opacity-100 motion-reduce:transition-none"
      />
      <div className="min-w-0">
        <p className="font-tech text-sm leading-snug text-ink">{item.name}</p>
        <p className="mt-0.5 font-body text-xs leading-relaxed text-manga-gray">{item.role}</p>
      </div>
    </div>
  </li>
);

// The reasoning stays one native disclosure away — no JavaScript, no
// hover-only content, and each group expands independently.
const GroupWhy = ({ group }) => (
  <details className="mt-5 border-t border-ink/15 pt-1">
    <summary className="cursor-pointer py-2 font-tech text-xs uppercase tracking-[0.18em] text-manga-gray hover:text-sakura-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sakura-text">
      Why I used these — {group.items.length} notes
    </summary>
    <dl className="mt-4 space-y-3">
      {group.items.map((item) => (
        <div key={item.name}>
          <dt className="font-tech text-xs text-ink">{item.name}</dt>
          <dd className="mt-0.5 font-body text-sm leading-relaxed text-manga-gray">
            {item.why}
          </dd>
        </div>
      ))}
    </dl>
  </details>
);

const Evidence = ({ links }) => (
  <div className="mt-5">
    <p className="font-tech text-[11px] uppercase tracking-[0.18em] text-manga-gray">
      ↳ Field evidence
    </p>
    <ul className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1">
      {links.map((link) => (
        <li key={link.label}>
          <a
            href={link.href}
            target="_blank"
            rel="noreferrer"
            className="font-body text-xs text-ink underline decoration-sakura decoration-2 underline-offset-4 hover:text-sakura-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sakura-text"
          >
            {link.label}
          </a>
        </li>
      ))}
    </ul>
  </div>
);

const GroupPanel = ({
  group,
  variant = 'traditional',
  className = '',
  headingClass = 'text-2xl md:text-3xl',
  itemGrid = 'grid-cols-1 sm:grid-cols-2',
}) => (
  <MangaPanel
    as="section"
    variant={variant}
    padding="md"
    className={className}
    aria-labelledby={`arsenal-${group.index}`}
  >
    <div className="flex items-baseline gap-3">
      <span className="font-tech text-xs text-sakura-text" aria-hidden="true">
        {group.index}
      </span>
      <h4
        id={`arsenal-${group.index}`}
        className={`font-display ${headingClass} font-bold tracking-tight text-ink`}
      >
        {group.name}
      </h4>
    </div>
    <p className="mt-2 font-body text-sm leading-relaxed text-manga-gray">
      {group.narrative}
    </p>
    <ul className={`mt-5 grid ${itemGrid} gap-x-6 gap-y-4`}>
      {group.items.map((item) => (
        <SkillNode key={item.name} item={item} />
      ))}
    </ul>
    {group.evidence && <Evidence links={group.evidence} />}
    <GroupWhy group={group} />
  </MangaPanel>
);

const Chapter03 = () => {
  const { scrollToChapter } = useChapterObserver();
  const nextTitle = chaptersData.getChapterById('04')?.title || 'THE BATTLE ARC';

  return (
    <div>
      {/* A. FIELD NOTE — one opening spread, not three stacked introductions */}
      <Reveal>
        <MangaSpread gap="lg">
          <div className="col-span-12 md:col-span-7">
            <SectionLabel index="Scene 01" label="Field note" />
            <p className="mt-5 max-w-xl font-display text-2xl font-bold leading-snug text-ink md:text-3xl">
              The tools changed. The question stayed{' '}
              <span className="text-sakura-text">the same</span>.
            </p>
            <p className="mt-4 max-w-lg font-body text-sm leading-relaxed text-manga-gray md:text-base">
              Every stage of training added a new instrument. None of them mattered
              until there was something to build.
            </p>
            <div className="mt-8 max-w-lg border-t border-ink/15 pt-5">
              <p className="font-display text-xl font-bold leading-snug text-ink md:text-2xl">
                An engineer&apos;s arsenal isn&apos;t a list. It&apos;s a set of
                decisions.
              </p>
              <p className="mt-3 font-tech text-xs uppercase tracking-[0.18em] text-manga-gray">
                Every entry below answers one question{' '}
                <span className="text-sakura-text">why did I use this?</span>
              </p>
            </div>
          </div>
          <figure className="col-span-12 w-full max-w-sm md:col-span-5 md:justify-self-end">
            <div className="relative h-56 overflow-hidden border border-ink/20 bg-paper md:h-64">
              <SakuraGrowth stage={3} crop className="h-full w-full" />
            </div>
            <figcaption className="mt-2 text-center font-tech text-[11px] uppercase tracking-[0.2em] text-manga-gray">
              Growth · Stage 03
            </figcaption>
          </figure>
        </MangaSpread>
      </Reveal>

      {/* B. THE MAP — three bands with different weight */}
      <Reveal className="mt-14 md:mt-20">
        <SectionLabel index="Scene 02" label="Six limbs" />
        <h3 className="mt-3 font-display text-2xl font-bold tracking-tight text-ink md:text-3xl">
          The arsenal map
        </h3>
      </Reveal>

      {/* FOUNDATIONS — the two framed panels carry the most weight */}
      <Reveal className="mt-8 border-t-2 border-ink pt-6">
        <SectionLabel label="Foundations" />
        <MangaSpread className="mt-5" gap="md">
          <GroupPanel
            group={intelligence}
            className="col-span-12 border-2 border-ink lg:col-span-6"
          />
          <GroupPanel
            group={engineering}
            className="col-span-12 border-2 border-ink lg:col-span-6"
          />
        </MangaSpread>
      </Reveal>

      {/* INTERFACE — an open strip between the framed bands */}
      <Reveal className="mt-10 md:mt-12">
        <section
          aria-labelledby="arsenal-03"
          className="border-y border-ink/20 py-7 md:py-9"
        >
          <SectionLabel label="Interface" />
          <div className="mt-4 flex flex-wrap items-baseline gap-x-4 gap-y-1">
            <span className="font-tech text-xs text-sakura-text" aria-hidden="true">
              03
            </span>
            <h4
              id="arsenal-03"
              className="font-display text-2xl font-bold tracking-tight text-ink md:text-4xl"
            >
              {frontend.name}
            </h4>
            <p className="w-full font-body text-sm leading-relaxed text-manga-gray md:ml-auto md:w-auto md:max-w-xs md:text-right">
              {frontend.narrative}
            </p>
          </div>
          <ul className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 md:grid-cols-3">
            {frontend.items.map((item) => (
              <SkillNode key={item.name} item={item} />
            ))}
          </ul>
          <GroupWhy group={frontend} />
        </section>
      </Reveal>

      {/* SUPPORT — thinner panels, quieter than the foundations */}
      <Reveal className="mt-10 md:mt-12">
        <SectionLabel label="Support" />
        <MangaSpread className="mt-5" gap="md">
          {supportGroups.map((group) => (
            <GroupPanel
              key={group.name}
              group={group}
              variant="technical"
              headingClass="text-xl md:text-2xl"
              className={`col-span-12 lg:col-span-4 ${
                group.index === '06' ? '' : 'md:col-span-6'
              }`}
            />
          ))}
        </MangaSpread>
      </Reveal>

      {/* C. CLOSING — end of inventory */}
      <Reveal className="mt-16 md:mt-24">
        <div className="border-t-2 border-ink pt-10 md:pt-14">
          <SectionLabel index="Scene 03" label="End of inventory" />
          <div className="mt-6 max-w-3xl">
            <p className="font-display text-3xl font-bold leading-tight text-ink md:text-4xl">
              TOOLS ARE <span className="text-sakura-text">READY</span>.
            </p>
            <p className="mt-5 font-body text-base leading-relaxed text-manga-gray md:text-lg">
              The question was never how many tools could be collected. It was
              knowing which one the work called for.
            </p>
          </div>
          <div className="mt-10 flex md:mt-14 md:justify-end">
            <button
              onClick={() => scrollToChapter('04')}
              className="inline-flex items-center gap-3 font-body text-xs uppercase tracking-[0.25em] text-ink hover:text-sakura-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sakura-text"
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
