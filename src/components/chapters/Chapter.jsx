import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import ChapterEmblem, { hasChapterEmblem } from '../ui/ChapterEmblem';
import SakuraPetals from '../ui/SakuraPetals';

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

  // The emblem replaces the old "CHAPTER NN" kicker. Unknown ids (such as a
  // future prologue) keep the text kicker rather than rendering nothing.
  const emblemChapter = id === 'final' ? 'FINAL' : id;
  const showEmblem = hasChapterEmblem(emblemChapter);
  // The emblem sits beside the title on every chapter opening, so the heading
  // margin is only needed for text-kicker fallbacks.
  const headingMargin = showEmblem ? '' : 'mt-5';

  return (
    <section
      data-chapter={id}
      className={`w-full ${id === '01' ? 'relative isolate' : ''} ${className}`}
      id={id}
    >
      {id === '01' && <SakuraPetals />}
      {/* Chapters flow into each other. The top padding opens a chapter; the
          bottom padding is the deliberate pause before the next one. Neither
          uses a viewport-height minimum, so a tall screen cannot stretch a
          short chapter into empty space. */}
      <div className="flex flex-col w-full max-w-6xl mx-auto px-6 md:px-12 pt-20 md:pt-32 pb-12 md:pb-20">
        <motion.header
          className="mb-12 md:mb-16"
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <div className={showEmblem ? 'flex items-center gap-5 md:gap-6' : ''}>
            {showEmblem ? (
              <ChapterEmblem chapter={emblemChapter} />
            ) : (
              <div className="flex items-center gap-3">
                <span className="h-px w-10 bg-ink/70" aria-hidden="true" />
                <span className="font-body text-xs md:text-sm uppercase tracking-[0.3em] text-manga-gray">
                  {kicker}
                </span>
              </div>
            )}
            <div className={showEmblem ? 'min-w-0 flex-1' : ''}>
              <h2
                className={`${headingMargin} font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-ink`}
              >
                {title}
              </h2>
              {description && (
                <p className={`${showEmblem ? 'mt-1.5' : 'mt-4'} font-body text-base md:text-lg text-manga-gray max-w-2xl leading-relaxed`}>
                  {description}
                </p>
              )}
            </div>
          </div>
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
