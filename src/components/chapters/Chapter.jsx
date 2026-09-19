import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const Chapter = ({
  id,
  number,
  title,
  description,
  children,
  className = '',
}) => {
  const reduceMotion = useReducedMotion();
  const isBookend = id === 'prologue' || id === 'final';
  const kicker = isBookend
    ? id.toUpperCase()
    : `CHAPTER ${String(number).padStart(2, '0')}`;

  return (
    <section
      data-chapter={id}
      className={`min-h-screen w-full ${className}`}
      id={id}
    >
      <div className="flex flex-col w-full max-w-6xl mx-auto px-6 md:px-12 py-20 md:py-32">
        <motion.header
          className="mb-12 md:mb-16"
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-ink/70" aria-hidden="true" />
            <span className="font-body text-xs md:text-sm uppercase tracking-[0.3em] text-manga-gray">
              {kicker}
            </span>
          </div>
          <h1 className="mt-5 font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-ink">
            {title}
          </h1>
          {description && (
            <p className="mt-4 font-body text-base md:text-lg text-manga-gray max-w-2xl leading-relaxed">
              {description}
            </p>
          )}
          <div className="mt-8 h-px w-full bg-ink/10" aria-hidden="true" />
        </motion.header>
        <div className="flex-1">
          {children}
        </div>
      </div>
    </section>
  );
};

export default Chapter;
