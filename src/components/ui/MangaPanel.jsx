import React from 'react';
import { cn } from '../../lib/utils';

const MangaPanel = ({ children, className, variant = 'traditional', ...props }) => {
  const variants = {
    traditional: 'border border-manga-gray bg-paper',
    cinematic: 'border-none',
    technical: 'border border-manga-gray/30 bg-paper/50',
  };

  return (
    <div
      className={cn(
        'relative overflow-hidden',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default MangaPanel;