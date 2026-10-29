import React from 'react';
import { cn } from '../../lib/utils';

// Manga page system — caption / narration label.
//
// Supports a scene without repeating the section heading. `tone="paper"`
// is for ink panels; the default is for the paper page.
const TONES = {
  ink: { rule: 'bg-ink/40', index: 'text-sakura-text', label: 'text-manga-gray' },
  paper: { rule: 'bg-paper/40', index: 'text-paper', label: 'text-paper/70' },
};

const SectionLabel = ({ label, index, tone = 'ink', className, ...props }) => {
  const tones = TONES[tone] ?? TONES.ink;

  return (
    <p
      className={cn(
        'flex flex-wrap items-center gap-x-2.5 gap-y-1 font-tech text-[11px] uppercase leading-none tracking-[0.24em]',
        className
      )}
      {...props}
    >
      <span aria-hidden="true" className={cn('h-px w-6 shrink-0', tones.rule)} />
      {index && <span className={cn('shrink-0', tones.index)}>{index}</span>}
      {label && <span className={tones.label}>{label}</span>}
    </p>
  );
};

export default SectionLabel;
