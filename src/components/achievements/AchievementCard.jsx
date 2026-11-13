import React from 'react';
import { cn } from '../../lib/utils';
import { claimStyle } from './claimMeta';

// One record in the gallery. The whole card is a single button so a keyboard
// user reaches one target per record, not two. Only inline elements are used
// inside the button, which keeps the markup valid.
const AchievementCard = ({ record, onOpen, variant = 'grid' }) => {
  const featured = variant === 'featured';
  const preview = record.asset?.preview;
  const isSwag = record.claimType === 'Swag';
  const order = String(record.displayOrder ?? 0).padStart(2, '0');

  return (
    <button
      type="button"
      onClick={() => onOpen(record)}
      aria-haspopup="dialog"
      aria-label={`Open record: ${record.title}`}
      className="group flex h-full w-full flex-col text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sakura-text focus-visible:ring-offset-4 focus-visible:ring-offset-paper"
    >
      <span
        className={cn(
          'relative block w-full overflow-hidden border bg-ink/[0.03] transition-colors duration-300 group-hover:border-ink/45',
          featured
            ? 'aspect-[3/2] border-ink/20'
            : 'aspect-[4/3] border-ink/15'
        )}
      >
        {preview ? (
          <img
            src={preview.src}
            alt={record.alt ?? `${record.title} certificate`}
            width={preview.width}
            height={preview.height}
            loading={featured ? 'eager' : 'lazy'}
            decoding="async"
            className={cn(
              'h-full w-full transition-transform duration-500 ease-out motion-reduce:transform-none',
              isSwag ? 'object-cover' : 'object-contain',
              featured ? 'group-hover:scale-[1.01]' : 'group-hover:scale-[1.015]'
            )}
          />
        ) : (
          <span className="flex h-full w-full flex-col items-center justify-center gap-2 px-6 text-center">
            <span className="font-tech text-[10px] uppercase tracking-[0.22em] text-sakura-text">
              Image pending
            </span>
            <span className="max-w-[17rem] font-body text-xs leading-relaxed text-manga-gray">
              The {record.claimType.toLowerCase()} is documented. The original
              image was supplied in chat and was not saved.
            </span>
          </span>
        )}

        <span
          className={cn(
            'absolute left-0 top-0 border-b border-r px-2 py-1 font-tech text-[10px] uppercase leading-none tracking-[0.2em]',
            claimStyle(record.claimType)
          )}
        >
          {record.claimType}
        </span>

        {record.asset?.redacted && (
          <span className="absolute bottom-0 right-0 bg-paper/90 px-2 py-1 font-tech text-[9px] uppercase tracking-[0.18em] text-manga-gray">
            Redacted
          </span>
        )}
      </span>

      <span className="mt-3 flex w-full items-start gap-3">
        <span
          aria-hidden="true"
          className={cn(
            'shrink-0 font-tech leading-none text-manga-gray',
            featured ? 'text-sm' : 'text-[11px]'
          )}
        >
          {order}
        </span>
        <span className="min-w-0 flex-1">
          <span
            className={cn(
              'line-clamp-3 block font-display font-bold leading-snug text-ink',
              featured ? 'text-xl md:text-2xl' : 'text-base md:text-lg'
            )}
          >
            {record.title}
          </span>
          <span className="mt-1.5 line-clamp-2 block font-body text-[11px] leading-relaxed text-manga-gray md:text-xs">
            {record.organization} · {record.dateLabel}
          </span>
          <span
            className={cn(
              'mt-2 inline-flex items-center gap-1.5 font-tech uppercase tracking-[0.18em] text-ink transition-colors group-hover:text-sakura-text',
              featured ? 'text-[10px]' : 'text-[9px]'
            )}
          >
            Open record <span aria-hidden="true">→</span>
          </span>
        </span>
      </span>
    </button>
  );
};

export default AchievementCard;
