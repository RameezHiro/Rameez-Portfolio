import React, { useCallback, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import gallery from '../../data/achievements.gallery.json';
import MangaSpread from '../ui/MangaSpread';
import SectionLabel from '../ui/SectionLabel';
import AchievementPreview from './AchievementPreview';
import AchievementStats from './AchievementStats';
import FeaturedAchievements from './FeaturedAchievements';

// Chapter 04 keeps the curated layer only: the three featured records, the
// numbers behind them, and one door to the complete archive. The full grid and
// its filters live on /certificates so the chapter can end before the record
// turns into a catalogue.
const AchievementShowcase = () => {
  const [previewRecord, setPreviewRecord] = useState(null);

  const featured = useMemo(
    () =>
      gallery.achievements
        .filter((record) => record.portfolioVisible && record.featured)
        .sort((a, b) => a.displayOrder - b.displayOrder),
    []
  );

  const visibleCount = useMemo(
    () => gallery.achievements.filter((record) => record.portfolioVisible).length,
    []
  );

  const closePreview = useCallback(() => setPreviewRecord(null), []);

  return (
    <section
      aria-labelledby="achievements-heading"
      className="mt-16 md:mt-24"
    >
      <SectionLabel index="Scene 07" label="The record" />

      <MangaSpread gap="lg" className="mt-5">
        <div className="col-span-12 md:col-span-7">
          <h3
            id="achievements-heading"
            className="max-w-2xl font-display text-2xl font-bold leading-tight text-ink md:text-4xl"
          >
            A paper trail of <span className="text-sakura-text">battles</span>.
          </h3>
        </div>
        <div className="col-span-12 md:col-span-5">
          <p className="max-w-xl font-body text-sm leading-relaxed text-manga-gray md:text-base">
            The Judges&apos; Choice win leads. A completion run and a finalist
            cut follow it. The rest of the record — {visibleCount} public
            entries — lives on its own page.
          </p>
          <p className="mt-3 max-w-xl font-body text-xs leading-relaxed text-manga-gray md:text-sm">
            Every entry is labelled by what it actually is. Participation is
            never presented as a win, and a finalist is not a placement.
          </p>
        </div>
      </MangaSpread>

      <FeaturedAchievements
        records={featured}
        onOpen={setPreviewRecord}
        className="mt-10 md:mt-12"
      />

      <AchievementStats className="mt-10 md:mt-12" />

      <div className="mt-10 border-t-2 border-ink pt-6 md:mt-12">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-tech text-[10px] uppercase tracking-[0.22em] text-manga-gray">
              The full archive
            </p>
            <p className="mt-2 max-w-md font-body text-sm leading-relaxed text-manga-gray">
              All {visibleCount} public records, five categories, every
              certificate and preview.
            </p>
          </div>
          <Link
            to="/certificates"
            className="group inline-flex w-full items-center justify-between gap-4 border border-ink bg-ink px-5 py-3.5 font-tech text-[11px] uppercase tracking-[0.2em] text-paper transition-colors hover:bg-deep-ink hover:text-sakura focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sakura-text focus-visible:ring-offset-4 focus-visible:ring-offset-paper sm:w-auto sm:justify-start"
          >
            Explore all achievements
            <span
              aria-hidden="true"
              className="text-base leading-none transition-transform group-hover:translate-x-1"
            >
              →
            </span>
          </Link>
        </div>
      </div>

      <AchievementPreview record={previewRecord} onClose={closePreview} />
    </section>
  );
};

export default AchievementShowcase;
