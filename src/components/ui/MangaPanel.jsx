import React from 'react';
import { cn } from '../../lib/utils';

// Manga page system — panel roles.
//
// `variant` is the frame, `tone` is the ground, `padding` is the interior.
// The defaults keep the original primitive's behaviour for any future
// consumer, while `bleed` escapes the chapter column to the page edge and
// `silent` removes the frame entirely.
const VARIANTS = {
  traditional: 'border border-manga-gray bg-paper',
  technical: 'border border-manga-gray/30 bg-paper/50',
  cinematic: 'border-0 bg-paper',
  bleed: 'border-0 bg-paper manga-bleed',
  silent: 'border-0 bg-transparent',
};

const TONES = {
  paper: '',
  muted: 'bg-ink/[0.04]',
  ink: 'border-paper/15 bg-deep-ink text-paper',
};

const PADDING = {
  none: '',
  sm: 'p-4 md:p-5',
  md: 'p-5 md:p-7',
  lg: 'p-6 md:p-10',
};

const MangaPanel = ({
  as: Tag = 'div',
  variant = 'traditional',
  tone = 'paper',
  padding = 'none',
  className,
  children,
  ...props
}) => {
  return (
    <Tag
      className={cn(
        'relative overflow-hidden',
        VARIANTS[variant] ?? VARIANTS.traditional,
        TONES[tone] ?? TONES.paper,
        PADDING[padding] ?? PADDING.none,
        className
      )}
      {...props}
    >
      {children}
    </Tag>
  );
};

export default MangaPanel;
