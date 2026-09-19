import React, { Suspense } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

// Code-split: three.js (~1MB) loads only when the Final scene mounts,
// never blocking the initial page render.
const SakuraTree = React.lazy(() => import('../SakuraTree/SakuraTree'));

// FINAL — THE CURRENT ARC ENDS. The quiet culmination: the 2D ink sakura
// of Chapters 01–08 becomes a real 3D tree here, followed by restrained
// closing copy, identity, status, and links.
// Compatible with ChapterShell's chapter rendering contract (self-
// contained, no props). Level-3 cinematic reveals here only — slow,
// once, and fully skipped under reduced motion.
const LINKS = [
  { label: 'GitHub', href: 'https://github.com/RameezHiro' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/shaikh-rameez-17b304336/' },
  { label: 'Resume', href: '/resume.pdf' },
  { label: 'Contact', href: 'mailto:yellowvoid22@gmail.com' },
];

// Slow cinematic reveal. Reduced motion renders content immediately.
const Cinematic = ({ children, className = '', delay = 0, duration = 1.1 }) => {
  const reduceMotion = useReducedMotion();
  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration, ease: 'easeOut', delay }}
    >
      {children}
    </motion.div>
  );
};

// One remaining petal crossing the scene — once, very slow, no loop.
// Static under reduced motion.
const FinalPetal = () => {
  const reduceMotion = useReducedMotion();
  return (
    <svg
      viewBox="0 0 120 160"
      className="mx-auto h-36 w-auto"
      role="img"
      aria-label="One remaining sakura petal"
    >
      {reduceMotion ? (
        <ellipse cx="60" cy="130" rx="5" ry="8" fill="#D96C8A" opacity="0.7" transform="rotate(20 60 130)" />
      ) : (
        <motion.ellipse
          cx="60"
          cy="20"
          rx="5"
          ry="8"
          fill="#D96C8A"
          opacity="0.7"
          initial={{ y: 0, opacity: 0, rotate: 0 }}
          whileInView={{ y: [0, 60, 115], opacity: [0, 0.7, 0.7, 0], rotate: [0, 25, 45] }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 9, ease: 'easeInOut' }}
        />
      )}
    </svg>
  );
};

const Final = () => (
  <div className="text-center">
    {/* 1. Open paper space + marker */}
    <Cinematic duration={1.2}>
      <p className="font-tech text-xs uppercase tracking-[0.3em] text-manga-gray">
        The current arc ends
      </p>
    </Cinematic>

    {/* 2. 3D Sakura Tree — the visual centerpiece. The positioned
        parent gives the tree's absolute canvas its height. */}
    <Cinematic className="mt-10 md:mt-14" delay={0.15} duration={1.4}>
      <div
        className="relative mx-auto w-full max-w-3xl overflow-hidden h-[420px] md:h-[560px]"
        role="img"
        aria-label="Three-dimensional sakura tree — the fully grown tree at the end of the arc"
      >
        <Suspense fallback={<div className="absolute inset-0" aria-hidden="true" />}>
          <SakuraTree />
        </Suspense>
      </div>
      <p className="mt-3 font-tech text-[11px] uppercase tracking-[0.2em] text-manga-gray text-center">
        The tree, fully grown
      </p>
    </Cinematic>

    {/* 3. Closing statement */}
    <Cinematic className="mt-14 md:mt-20" delay={0.1} duration={1.2}>
      <p className="font-display text-2xl md:text-4xl font-bold leading-snug text-ink max-w-2xl mx-auto">
        Every chapter changed something.
      </p>
      <p className="mt-4 font-body text-base md:text-lg leading-relaxed text-manga-gray max-w-xl mx-auto">
        This one isn&apos;t finished.
      </p>
    </Cinematic>

    {/* 4. Identity */}
    <Cinematic className="mt-14 md:mt-20" delay={0.1} duration={1.2}>
      <p className="font-display text-4xl md:text-6xl font-bold tracking-tight text-ink">
        RAMEEZ
      </p>
      <p className="mt-3 font-tech text-xs uppercase tracking-[0.3em] text-manga-gray">
        The Developer&apos;s Arc
      </p>
    </Cinematic>

    {/* 5. Current status */}
    <Cinematic className="mt-12 md:mt-16" delay={0.1} duration={1.2}>
      <p className="font-tech text-[11px] uppercase tracking-[0.25em] text-manga-gray">
        Current status
      </p>
      <div className="mt-4 space-y-2">
        <p className="font-display text-xl md:text-2xl font-bold text-ink">
          STILL LEARNING.
        </p>
        <p className="font-display text-xl md:text-2xl font-bold text-sakura">
          STILL BUILDING.
        </p>
        <p className="font-display text-xl md:text-2xl font-bold text-ink">
          STILL MOVING FORWARD.
        </p>
      </div>
    </Cinematic>

    {/* 6. Links — restrained editorial text links */}
    <Cinematic className="mt-12 md:mt-16" delay={0.15} duration={1.2}>
      <nav
        aria-label="Portfolio links"
        className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3"
      >
        {LINKS.map((link) =>
          link.href ? (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith('mailto') ? undefined : '_blank'}
              rel={link.href.startsWith('mailto') ? undefined : 'noreferrer'}
              className="font-body text-xs uppercase tracking-[0.25em] text-ink underline decoration-sakura decoration-2 underline-offset-8 hover:text-sakura focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sakura"
            >
              {link.label}
            </a>
          ) : (
            <span
              key={link.label}
              className="font-body text-xs uppercase tracking-[0.25em] text-manga-gray"
              title="Resume file not yet published in this portfolio"
            >
              {link.label}
            </span>
          )
        )}
      </nav>
    </Cinematic>

    {/* 7. Final marker */}
    <Cinematic className="mt-16 md:mt-24" delay={0.1} duration={1.2}>
      <div className="mx-auto max-w-md border-t-2 border-ink pt-8">
        <p className="font-tech text-xs uppercase tracking-[0.3em] text-ink">
          End of current arc
        </p>
        <p className="mt-4 font-body text-sm italic leading-relaxed text-manga-gray">
          Chapter 02 is already being written...
        </p>
      </div>
    </Cinematic>

    {/* 8. One remaining petal, then fade to paper */}
    <div className="mt-12 md:mt-16" aria-hidden="true">
      <FinalPetal />
    </div>
    <div className="h-28 md:h-40" aria-hidden="true" />
  </div>
);

export default Final;
