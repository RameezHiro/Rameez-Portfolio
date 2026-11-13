import React from 'react';
import gallery from '../../data/achievements.gallery.json';
import { cn } from '../../lib/utils';

// Compact, data-driven summary of the public record. Shared by the Chapter 04
// showcase and the standalone certificates page so the numbers can only come
// from the inventory derivative.
const AchievementStats = ({ className }) => {
  const visible = gallery.achievements.filter((record) => record.portfolioVisible);
  const featured = visible.filter((record) => record.featured);

  const stats = [
    { value: visible.length, label: 'Public records' },
    { value: gallery.categories.length, label: 'Categories' },
    { value: featured.length, label: 'Featured achievements' },
  ];

  return (
    <dl
      className={cn(
        'grid grid-cols-1 border-y border-ink/20 sm:grid-cols-3',
        className
      )}
    >
      {stats.map((stat, index) => (
        <div
          key={stat.label}
          className={cn(
            'flex flex-row items-baseline justify-between gap-4 px-1 py-5 sm:flex-col-reverse sm:items-start sm:justify-end sm:gap-2 sm:px-6 sm:py-6',
            index > 0 && 'border-t border-ink/15 sm:border-l sm:border-t-0'
          )}
        >
          <dt className="font-tech text-[10px] uppercase leading-none tracking-[0.2em] text-manga-gray">
            {stat.label}
          </dt>
          <dd className="font-tech text-3xl font-bold leading-none tracking-tight text-ink md:text-4xl">
            {String(stat.value).padStart(2, '0')}
          </dd>
        </div>
      ))}
    </dl>
  );
};

export default AchievementStats;
