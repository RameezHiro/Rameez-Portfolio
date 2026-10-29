import React from 'react';
import { cn } from '../../lib/utils';

// Manga page system — spread.
//
// A 12-column grid with fixed gutters. Cells declare their own span
// (`col-span-12 md:col-span-7`), which keeps the API small and lets each
// chapter compose a different rhythm without new props.
const GAPS = {
  none: 'gap-0',
  sm: 'gap-x-3 gap-y-4 md:gap-x-4 md:gap-y-4',
  md: 'gap-x-4 gap-y-6 md:gap-x-8 md:gap-y-8',
  lg: 'gap-x-4 gap-y-8 md:gap-x-12 md:gap-y-12',
  xl: 'gap-x-5 gap-y-10 md:gap-x-16 md:gap-y-16',
};

const ALIGNMENTS = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
  stretch: 'items-stretch',
};

const MangaSpread = ({
  as: Tag = 'div',
  gap = 'md',
  align = 'start',
  className,
  children,
  ...props
}) => {
  return (
    <Tag
      className={cn(
        'grid grid-cols-12',
        GAPS[gap] ?? GAPS.md,
        ALIGNMENTS[align] ?? ALIGNMENTS.start,
        className
      )}
      {...props}
    >
      {children}
    </Tag>
  );
};

export default MangaSpread;
