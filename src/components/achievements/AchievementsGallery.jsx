import React, { useMemo, useState } from 'react';
import gallery from '../../data/achievements.gallery.json';
import AchievementCard from './AchievementCard';
import FeaturedAchievements from './FeaturedAchievements';
import { cn } from '../../lib/utils';

const ALL = 'All';
const CATEGORY_ORDER = gallery.categories.map((category) => category.name);

const countLabel = (count) => `${count} ${count === 1 ? 'record' : 'records'}`;

// The full archive layer: filters and the unfeatured records, in display order.
// The featured hierarchy lives in FeaturedAchievements so both the Chapter 04
// showcase and the certificates page can lead with the same three entries.
const AchievementsGallery = ({
  onOpen,
  featuredRecords = [],
  headingId = 'achievements-archive-heading',
  className,
}) => {
  const [activeCategory, setActiveCategory] = useState(ALL);

  const visible = useMemo(
    () =>
      gallery.achievements
        .filter((record) => record.portfolioVisible)
        .sort((a, b) => a.displayOrder - b.displayOrder),
    []
  );

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

  return (
    <section
      aria-labelledby={headingId}
      className={cn('mt-14 md:mt-16', className)}
    >
      <h2 id={headingId} className="sr-only">
        The complete achievement record
      </h2>

      {showingAll && featuredRecords.length > 0 && (
        <FeaturedAchievements
          records={featuredRecords}
          onOpen={onOpen}
          className="mt-6 md:mt-8"
        />
      )}

      <div
        className={cn(
          'border-t-2 border-ink pt-5',
          showingAll && featuredRecords.length > 0 && 'mt-10 md:mt-12'
        )}
      >
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
            <AchievementCard record={record} onOpen={onOpen} />
          </li>
        ))}
      </ul>

      <p className="mt-10 max-w-3xl font-body text-xs leading-relaxed text-manga-gray">
        Award, finalist, completion, participation, badge and swag are kept
        distinct. {gallery.counts.supporting} supporting records remain in the
        private inventory and are not published here.
      </p>
    </section>
  );
};

export default AchievementsGallery;
