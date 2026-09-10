import React from 'react';
import { cn } from '../../lib/utils';

const SectionLabel = ({ label, index, className, ...props }) => {
  return (
    <div
      className={cn(
        'inline-flex items-center gap-2 text-tech font-mono text-sm tracking-wider',
        className
      )}
      {...props}
    >
      {label && <span className="text-manga-gray">{label}</span>}
      {index && <span className="text-sakura">{index}</span>}
    </div>
  );
};

export default SectionLabel;