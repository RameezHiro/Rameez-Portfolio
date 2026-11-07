import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import useChapterObserver from '../../hooks/useChapterObserver';
import chaptersData from '../../data/chapters';
import {
  profileData,
  profileDetails,
  socialActions,
  resumeAction,
  focusAreas,
} from '../../data/profile';
import MangaSpread from '../ui/MangaSpread';
import SectionLabel from '../ui/SectionLabel';
import TechIcon from '../ui/TechIcon';
import SakuraPetals from '../ui/SakuraPetals';

// Chapter 01 — PROFILE. The professional entry point: one portrait, one clear
// positioning statement, the facts a recruiter needs, four directions of work,
// and a direct line to the resume and profiles. Claims stay limited to what the
// rest of the arc can support.
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

// Editorial portrait frame. `profileData.photo` swaps the typographic
// placeholder for a real photograph without changing the layout.
const Portrait = () => {
  const { photo, photoAlt, photoCaption } = profileData;

  return (
    <figure className="mx-auto w-full max-w-sm md:max-w-none">
      <div className="portrait-sakura-scene relative aspect-[4/5] overflow-hidden border-2 border-ink bg-ink/[0.04]">
        {photo ? (
          <img
            src={photo}
            alt={photoAlt}
            width="800"
            height="1000"
            decoding="async"
            className="h-full w-full object-cover"
          />
        ) : (
          <>
            <div
              className="absolute inset-0 manga-screentone text-ink/[0.07]"
              aria-hidden="true"
            />
            <div className="relative flex h-full flex-col items-center justify-center px-6 text-center">
              <span
                className="font-display text-8xl font-bold leading-none text-ink/75"
                aria-hidden="true"
              >
                R
              </span>
              <span
                className="mt-4 font-tech text-[10px] uppercase tracking-[0.3em] text-manga-gray"
                aria-hidden="true"
              >
                Portrait pending
              </span>
            </div>
          </>
        )}
        {photo && <SakuraPetals variant="portrait" />}
        <span
          className="absolute left-3 top-3 font-tech text-[10px] uppercase tracking-[0.24em] text-manga-gray"
          aria-hidden="true"
        >
          Fig. 01
        </span>
      </div>
      <figcaption className="mt-3 font-tech text-[10px] uppercase tracking-[0.22em] text-manga-gray">
        {photo ? photoCaption : 'Rameez — portrait pending'}
      </figcaption>
    </figure>
  );
};

const ProfileDetail = ({ label, value }) => (
  <div className="flex items-baseline justify-between gap-6 border-b border-ink/10 py-2.5">
    <dt className="shrink-0 font-tech text-[10px] uppercase tracking-[0.22em] text-manga-gray">
      {label}
    </dt>
    <dd
      className={`text-right font-body text-sm ${
        value ? 'text-ink' : 'italic text-manga-gray'
      }`}
    >
      {value ?? 'To be added'}
    </dd>
  </div>
);

const FocusEmblem = ({ area, index }) => (
  <li className="border-t border-ink/15 pt-5">
    <div className="flex items-start gap-4 lg:block">
      <span className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-ink/25">
        <span
          className="absolute inset-[5px] rounded-full border border-ink/10"
          aria-hidden="true"
        />
        <TechIcon name={area.icon} className="!h-8 !w-8" />
      </span>
      <div className="lg:mt-4">
        <span className="font-tech text-[10px] uppercase tracking-[0.22em] text-sakura-text">
          {String(index + 1).padStart(2, '0')}
        </span>
        <h4 className="mt-1 font-display text-base font-bold leading-snug text-ink">
          {area.title}
        </h4>
      </div>
    </div>
  </li>
);

const Chapter01 = () => {
  const { scrollToChapter } = useChapterObserver();
  const nextTitle = chaptersData.getChapterById('02')?.title || 'TRAINING';
  const { headline, headlineAccent } = profileData;
  const headlineLead = headlineAccent
    ? headline.replace(headlineAccent, '').trimEnd()
    : headline;

  return (
    <div>
      {/* A. PORTRAIT + POSITIONING */}
      <Reveal>
        <MangaSpread gap="lg" align="start">
          <div className="col-span-12 md:col-span-5">
            <Portrait />
          </div>

          <div className="col-span-12 md:col-span-7">
            <SectionLabel index="Scene 01" label="Hybrid engineer" />

            <p className="mt-5 max-w-xl font-display text-3xl font-bold leading-[1.1] tracking-tight text-ink sm:text-4xl lg:text-5xl">
              {headlineLead}{' '}
              {headlineAccent && (
                <span className="text-sakura-text">{headlineAccent}</span>
              )}
            </p>

            <p className="mt-5 max-w-xl font-body text-base leading-relaxed text-manga-gray md:text-lg">
              {profileData.oneLiner}
            </p>

            <p className="mt-4 max-w-xl font-body text-base leading-relaxed text-ink/80">
              {profileData.introduction}
            </p>

            <dl className="mt-7 max-w-xl border-t border-ink/15">
              {profileDetails.map((detail) => (
                <ProfileDetail key={detail.label} {...detail} />
              ))}
            </dl>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
              {resumeAction && (
                <a
                  href={resumeAction.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-[48px] items-center gap-2 bg-deep-ink px-5 py-3 font-body text-xs uppercase tracking-[0.2em] text-paper transition-colors hover:bg-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sakura-text focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
                >
                  {resumeAction.label}
                  <span className="material-symbols-outlined text-base" aria-hidden="true">
                    description
                  </span>
                  <span className="sr-only"> ({resumeAction.note})</span>
                </a>
              )}

              <ul className="flex flex-wrap items-center gap-x-6 gap-y-1">
                {socialActions.map((action) => (
                  <li key={action.key}>
                    <a
                      href={action.href}
                      {...(action.external
                        ? { target: '_blank', rel: 'noreferrer' }
                        : {})}
                      className="inline-flex min-h-[44px] items-center gap-2 font-body text-xs uppercase tracking-[0.2em] text-ink transition-colors hover:text-sakura-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sakura-text focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
                    >
                      <span className="material-symbols-outlined text-base" aria-hidden="true">
                        {action.icon}
                      </span>
                      {action.label}
                      {action.external && (
                        <span className="text-manga-gray" aria-hidden="true">
                          ↗
                        </span>
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </MangaSpread>
      </Reveal>

      {/* B. AREAS OF FOCUS */}
      <Reveal className="mt-16 md:mt-24">
        <div className="border-t-2 border-ink pt-5">
          <SectionLabel index="Scene 02" label="Four directions" />
          <h3 className="mt-3 font-display text-2xl font-bold tracking-tight text-ink md:text-3xl">
            AREAS OF FOCUS
          </h3>
          <p className="mt-2 max-w-xl font-body text-sm leading-relaxed text-manga-gray md:text-base">
            Four directions I keep returning to — the work I want to get better
            at, not a claim of mastery.
          </p>
          <ol className="mt-7 grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
            {focusAreas.map((area, index) => (
              <FocusEmblem key={area.title} area={area} index={index} />
            ))}
          </ol>
        </div>
      </Reveal>

      {/* C. CHAPTER HAND-OFF */}
      <Reveal className="mt-16 md:mt-24">
        <div className="border-t-2 border-ink pt-8">
          <div className="flex md:justify-end">
            <button
              onClick={() => scrollToChapter('02')}
              className="inline-flex min-h-[44px] items-center gap-3 py-2 font-body text-xs uppercase tracking-[0.25em] text-ink hover:text-sakura-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sakura-text focus-visible:ring-offset-2 focus-visible:ring-offset-paper"
            >
              Next — Chapter 02 · {nextTitle}
              <span aria-hidden="true">↓</span>
            </button>
          </div>
        </div>
      </Reveal>
    </div>
  );
};

export default Chapter01;
