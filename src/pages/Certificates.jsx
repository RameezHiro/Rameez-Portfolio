import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import AchievementStats from '../components/achievements/AchievementStats';
import AchievementsGallery from '../components/achievements/AchievementsGallery';
import SectionLabel from '../components/ui/SectionLabel';

const PAGE_TITLE = 'The Record — Certificates | Shaikh Rameez';
const PAGE_DESCRIPTION =
  'The complete public record of hackathons, quizzes, competitions, recognition and keepsakes from the developer arc.';

// Standalone continuation of Chapter 04. The shell's chapter navigation stays
// on the portfolio; this page is reached only through the achievements CTA and
// returns through the explicit back link.
const Certificates = () => {
  const mainRef = useRef(null);

  useEffect(() => {
    const previousTitle = document.title;
    const meta = document.querySelector('meta[name="description"]');
    const previousDescription = meta?.getAttribute('content');

    document.title = PAGE_TITLE;
    if (meta) meta.setAttribute('content', PAGE_DESCRIPTION);

    window.scrollTo(0, 0);
    mainRef.current?.focus({ preventScroll: true });

    return () => {
      document.title = previousTitle;
      if (meta && previousDescription !== null) {
        meta.setAttribute('content', previousDescription);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-paper text-ink">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:inline-block focus:rounded focus:bg-sakura-text focus:px-4 focus:py-2 focus:font-body focus:text-sm focus:text-paper focus:outline-none focus:ring-2 focus:ring-paper focus:ring-offset-2 focus:ring-offset-deep-ink"
      >
        Skip to the record
      </a>

      <header className="border-b border-ink/15">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-2 px-6 py-5 md:px-8">
          <Link
            to="/"
            className="group inline-flex items-center gap-2 font-tech text-[10px] uppercase tracking-[0.2em] text-ink transition-colors hover:text-sakura-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sakura-text focus-visible:ring-offset-4 focus-visible:ring-offset-paper"
          >
            <span aria-hidden="true" className="transition-transform group-hover:-translate-x-1">
              ←
            </span>
            Back to portfolio
          </Link>
          <p className="font-tech text-[10px] uppercase tracking-[0.2em] text-manga-gray">
            Chapter 04 · Extended record
          </p>
        </div>
      </header>

      <main
        id="main-content"
        ref={mainRef}
        tabIndex={-1}
        className="mx-auto max-w-6xl px-6 pb-20 pt-10 focus:outline-none md:px-8 md:pb-28 md:pt-16"
      >
        <SectionLabel index="The record" label="Complete archive" />
        <h1 className="mt-4 font-display text-5xl font-bold leading-[0.9] tracking-tight text-ink sm:text-6xl md:text-8xl">
          THE <span className="text-sakura-text">RECORD</span>.
        </h1>
        <p className="mt-6 max-w-2xl font-body text-base leading-relaxed text-manga-gray md:text-lg">
          Every challenge, competition, experiment, and milestone that became
          part of the journey.
        </p>
        <p className="mt-4 max-w-2xl border-l-2 border-sakura/70 pl-3 font-body text-xs leading-relaxed text-manga-gray md:text-sm">
          Award, finalist, completion, participation, badge and swag are kept
          distinct. Participation is never presented as a win, and a finalist is
          not a placement.
        </p>

        <AchievementStats className="mt-10 md:mt-12" />

        <AchievementsGallery showHeader={false} className="mt-4" />
      </main>

      <footer className="border-t border-ink/15">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-8 md:flex-row md:items-center md:justify-between md:px-8">
          <p className="font-tech text-[10px] uppercase tracking-[0.2em] text-manga-gray">
            Shaikh Rameez · The developer&apos;s arc
          </p>
          <Link
            to="/"
            className="group inline-flex items-center gap-2 font-tech text-[10px] uppercase tracking-[0.2em] text-ink transition-colors hover:text-sakura-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sakura-text focus-visible:ring-offset-4 focus-visible:ring-offset-paper"
          >
            <span aria-hidden="true" className="transition-transform group-hover:-translate-x-1">
              ←
            </span>
            Back to portfolio
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default Certificates;
