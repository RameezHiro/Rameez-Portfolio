import React, { useCallback, useMemo, useState } from 'react';
import gallery from '../../data/achievements.gallery.json';
import MangaPanel from '../ui/MangaPanel';
import MangaSpread from '../ui/MangaSpread';
import SectionLabel from '../ui/SectionLabel';
import AchievementCard from './AchievementCard';
import AchievementPreview from './AchievementPreview';
import { cn } from '../../lib/utils';

const ALL = 'All';
const CATEGORY_ORDER = gallery.categories.map((category) => category.name);

const countLabel = (count) => `${count} ${count === 1 ? 'record' : 'records'}`;

const AchievementsGallery = ({
  showHeader = true,
  headingId = 'achievements-heading',
  className,
}) => {
  const [activeCategory, setActiveCategory] = useState(ALL);
  const [previewRecord, setPreviewRecord] = useState(null);

  const visible = useMemo(
    () =>
      gallery.achievements
        .filter((record) => record.portfolioVisible)
        .sort((a, b) => a.displayOrder - b.displayOrder),
    []
  );

  const featured = visible.filter((record) => record.featured);
  const hero = featured[0] ?? null;
  const secondaryFeatured = featured.slice(1);
  const remaining = visible.filter((record) => !record.featured);

  const counts = useMemo(() => {
    const byCategory = Object.fromEntries(
      CATEGORY_ORDER.map((category) => [category, 0])
    );
    for (const record of visible) {
      if (byCategory[record.category] !== undefined) {
        byCategory[record.category] += 1;
      }
    }
    return byCategory;
  }, [visible]);

  const filters = [
    { name: ALL, count: visible.length },
    ...CATEGORY_ORDER.map((category) => ({
      name: category,
      count: counts[category],
    })),
  ];

  const showingAll = activeCategory === ALL;
  const filtered = showingAll
    ? []
    : visible.filter((record) => record.category === activeCategory);
  const gridRecords = showingAll ? remaining : filtered;

  const closePreview = useCallback(() => setPreviewRecord(null), []);

  const heroHeadline =
    hero?.position && hero.position !== 'Not specified'
      ? hero.position
      : hero?.title ?? '';
  const headlineWords = heroHeadline.split(' ');
  const headlineTail = headlineWords.length > 1 ? headlineWords.pop() : '';
  const headlineLead = headlineWords.join(' ');

  return (
    <section
      aria-labelledby={headingId}
      className={cn('mt-16 md:mt-24', className)}
    >
      {showHeader ? (
        <>
          <SectionLabel index="Scene 07" label="The record" />

          <MangaSpread gap="lg" className="mt-5">
            <div className="col-span-12 md:col-span-7">
              <h3
                id={headingId}
                className="max-w-2xl font-display text-2xl font-bold leading-tight text-ink md:text-4xl"
              >
                A paper trail of <span className="text-sakura-text">battles</span>.
              </h3>
            </div>
            <div className="col-span-12 md:col-span-5">
              <p className="max-w-xl font-body text-sm leading-relaxed text-manga-gray md:text-base">
                {gallery.counts.visible} records kept from hackathons, quizzes,
                competitions, recognition and the occasional shirt. The{' '}
                {featured.length} featured entries lead the chapter; the rest
                mark the road.
              </p>
              <p className="mt-3 max-w-xl font-body text-xs leading-relaxed text-manga-gray md:text-sm">
                Every entry is labelled by what it actually is. Participation is
                never presented as a win, and a finalist is not a placement.
              </p>
            </div>
          </MangaSpread>
        </>
      ) : (
        <h2 id={headingId} className="sr-only">
          The complete achievement record
        </h2>
      )}

      {showingAll && hero && (
        <div className="mt-10 md:mt-12">
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-t-2 border-ink pt-4">
            <p className="font-tech text-[11px] uppercase tracking-[0.24em] text-manga-gray">
              Featured records
            </p>
            <p className="font-tech text-[11px] uppercase tracking-[0.24em] text-manga-gray">
              01 — {String(featured.length).padStart(2, '0')}
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
                    onClick={() => setPreviewRecord(hero)}
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

          {secondaryFeatured.length > 0 && (
            <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 md:mt-10 md:gap-x-8">
              {secondaryFeatured.map((record) => (
                <AchievementCard
                  key={record.id}
                  record={record}
                  variant="featured"
                  onOpen={setPreviewRecord}
                />
              ))}
            </div>
          )}
        </div>
      )}

      <div className="mt-14 border-t-2 border-ink pt-5 md:mt-16">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between md:gap-6">
          <p className="font-tech text-[11px] uppercase tracking-[0.24em] text-manga-gray">
            Browse the record
          </p>
          <p
            aria-live="polite"
            className="font-body text-xs leading-relaxed text-manga-gray"
          >
            {showingAll
              ? `Showing all ${countLabel(visible.length)}`
              : `${activeCategory} · ${countLabel(filtered.length)}`}
          </p>
        </div>

        <div
          role="group"
          aria-label="Filter achievements by category"
          className="scrollbar-hide -mx-6 mt-4 flex gap-2 overflow-x-auto px-6 pb-1 md:mx-0 md:flex-wrap md:px-0"
        >
          {filters.map((filter) => {
            const active = activeCategory === filter.name;
            return (
              <button
                key={filter.name}
                type="button"
                aria-pressed={active}
                onClick={() => setActiveCategory(filter.name)}
                className={cn(
                  'shrink-0 border px-3 py-2 font-tech text-[10px] uppercase leading-none tracking-[0.16em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sakura-text focus-visible:ring-offset-2 focus-visible:ring-offset-paper',
                  active
                    ? 'border-ink bg-ink text-paper'
                    : 'border-ink/20 text-manga-gray hover:border-ink/60 hover:text-ink'
                )}
              >
                {filter.name}{' '}
                <span
                  className={cn(
                    'ml-1',
                    active ? 'text-paper/55' : 'text-manga-gray/70'
                  )}
                >
                  {String(filter.count).padStart(2, '0')}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-8 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-t border-ink/15 pt-4">
        <p className="font-tech text-[11px] uppercase tracking-[0.24em] text-manga-gray">
          {showingAll ? 'The rest of the record' : activeCategory}
        </p>
        <p className="font-tech text-[11px] uppercase tracking-[0.24em] text-manga-gray">
          {countLabel(gridRecords.length)}
        </p>
      </div>

      <ul className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {gridRecords.map((record) => (
          <li key={record.id} className="min-w-0">
            <AchievementCard record={record} onOpen={setPreviewRecord} />
          </li>
        ))}
      </ul>

      <p className="mt-10 max-w-3xl font-body text-xs leading-relaxed text-manga-gray">
        Award, finalist, completion, participation, badge and swag are kept
        distinct. {gallery.counts.supporting} supporting records remain in the
        private inventory and are not published here.
      </p>

      <AchievementPreview record={previewRecord} onClose={closePreview} />
    </section>
  );
};

export default AchievementsGallery;
