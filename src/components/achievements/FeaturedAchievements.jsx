import React from 'react';
import MangaPanel from '../ui/MangaPanel';
import SectionLabel from '../ui/SectionLabel';
import AchievementCard from './AchievementCard';

// The curated layer of the record: one typographic hero and two large cards.
// Chapter 04 and the certificates page both lead with this, so the featured
// hierarchy is defined once and cannot drift between the two.
const FeaturedAchievements = ({ records, onOpen, className }) => {
  const hero = records[0] ?? null;
  const secondary = records.slice(1);

  if (!hero) return null;

  const heroHeadline =
    hero.position && hero.position !== 'Not specified'
      ? hero.position
      : hero.title;
  const headlineWords = heroHeadline.split(' ');
  const headlineTail = headlineWords.length > 1 ? headlineWords.pop() : '';
  const headlineLead = headlineWords.join(' ');

  return (
    <div className={className}>
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-t-2 border-ink pt-4">
        <h3 className="font-tech text-[11px] uppercase tracking-[0.24em] text-manga-gray">
          Featured records
        </h3>
        <p className="font-tech text-[11px] uppercase tracking-[0.24em] text-manga-gray">
          01 — {String(records.length).padStart(2, '0')}
        </p>
      </div>

      <MangaPanel
        as="article"
        variant="cinematic"
        tone="ink"
        padding="lg"
        className="mt-6"
        aria-label={`${hero.title} — featured ${hero.claimType.toLowerCase()}`}
      >
        <div
          className="manga-screentone pointer-events-none absolute inset-y-0 right-0 hidden w-1/3 text-paper opacity-[0.1] md:block"
          aria-hidden="true"
        />
        <div className="relative grid gap-8 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-8">
            <SectionLabel
              tone="paper"
              index={String(hero.displayOrder).padStart(2, '0')}
              label={`Featured ${hero.claimType.toLowerCase()}`}
            />
            <p className="mt-5 font-tech text-[11px] uppercase tracking-[0.22em] text-sakura">
              {hero.event}
            </p>
            <h4 className="mt-3 max-w-3xl font-display text-4xl font-bold leading-[0.95] tracking-tight text-paper sm:text-5xl md:text-6xl lg:text-7xl">
              {headlineLead}{' '}
              <span className="text-sakura">{headlineTail}</span>.
            </h4>
            <p className="mt-5 max-w-xl font-body text-sm leading-relaxed text-paper/75 md:text-base">
              {hero.description}
            </p>
            {hero.caveat && (
              <p className="mt-4 max-w-xl border-l-2 border-sakura/70 pl-3 font-body text-xs leading-relaxed text-paper/65">
                {hero.caveat}
              </p>
            )}

            <div className="mt-7 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => onOpen(hero)}
                aria-haspopup="dialog"
                className="inline-flex items-center gap-2 border border-paper/40 px-4 py-2.5 font-tech text-[10px] uppercase tracking-[0.2em] text-paper transition-colors hover:border-sakura hover:text-sakura focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sakura focus-visible:ring-offset-2 focus-visible:ring-offset-deep-ink"
              >
                View the record <span aria-hidden="true">→</span>
              </button>
            </div>
          </div>

          <aside className="md:col-span-4 md:border-l md:border-paper/20 md:pl-8">
            <p className="font-tech text-[10px] uppercase tracking-[0.22em] text-paper/50">
              Record {String(hero.displayOrder).padStart(2, '0')}
            </p>
            <dl className="mt-4 space-y-4">
              <div>
                <dt className="font-tech text-[10px] uppercase tracking-[0.2em] text-paper/50">
                  Recognition
                </dt>
                <dd className="mt-1 font-body text-sm leading-relaxed text-paper">
                  {hero.position}
                </dd>
              </div>
              <div className="border-t border-paper/15 pt-4">
                <dt className="font-tech text-[10px] uppercase tracking-[0.2em] text-paper/50">
                  Issuer
                </dt>
                <dd className="mt-1 font-body text-sm leading-relaxed text-paper/85">
                  {hero.organization}
                </dd>
              </div>
              <div className="border-t border-paper/15 pt-4">
                <dt className="font-tech text-[10px] uppercase tracking-[0.2em] text-paper/50">
                  Date
                </dt>
                <dd className="mt-1 font-body text-sm leading-relaxed text-paper/85">
                  {hero.dateLabel}
                </dd>
              </div>
            </dl>

            {hero.asset?.status === 'missing' && (
              <p className="mt-6 border border-paper/20 px-3 py-2 font-tech text-[10px] uppercase leading-relaxed tracking-[0.16em] text-paper/60">
                Certificate image pending
              </p>
            )}
          </aside>
        </div>
      </MangaPanel>

      {secondary.length > 0 && (
        <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 md:mt-10 md:gap-x-8">
          {secondary.map((record) => (
            <AchievementCard
              key={record.id}
              record={record}
              variant="featured"
              onOpen={onOpen}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FeaturedAchievements;
