import React, { useEffect, useId, useRef, useState } from 'react';

// Stable variations keep the breeze consistent when the chapter UI rerenders.
const petals = Array.from({ length: 84 }, (_, index) => ({
  left: 68 + ((index * 17) % 41),
  size: 7 + ((index * 7) % 6),
  duration: (6 + ((index * 7) % 5)) * 1.25,
  delay: -((index * 1.73) % 10),
  drift: 54 + ((index * 13) % 35),
  rotation: 25 + ((index * 13) % 45),
}));

const SakuraPetals = ({ variant = 'hero' }) => {
  const isPortrait = variant === 'portrait';
  const visiblePetals = isPortrait ? petals.slice(0, 16) : petals;
  const layerRef = useRef(null);
  const gradientId = useId();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    });
    observer.observe(layerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={layerRef}
      className={`sakura-petals${isPortrait ? ' sakura-petals--portrait' : ''}`}
      data-active={isVisible}
      aria-hidden="true"
    >
      {visiblePetals.map((petal, index) => (
        <span
          key={index}
          className="sakura-petal"
          style={{
            left: `${isPortrait ? 58 + ((index * 11) % 40) : petal.left}%`,
            top: isPortrait ? `${(index * 7) % 18}%` : undefined,
            width: `${petal.size * (isPortrait ? 0.7 : 1)}px`,
            height: `${petal.size * (isPortrait ? 0.7 : 1) * 1.25}px`,
            '--petal-duration': `${petal.duration * (isPortrait ? 1.15 : 1)}s`,
            '--petal-delay': `${petal.delay}s`,
            '--petal-drift': `-${petal.drift}${isPortrait ? 'cqw' : 'vw'}`,
            '--petal-rotation': `${petal.rotation}deg`,
            '--petal-turn': `${petal.rotation + 60}deg`,
            '--petal-opacity': 0.5 + (index % 4) * 0.1,
          }}
        >
          <svg viewBox="0 0 24 30" focusable="false">
            <defs>
              <linearGradient id={`${gradientId}-${index}`} x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#FFE0EB" />
                <stop offset="48%" stopColor={index % 3 === 0 ? '#F5ACC7' : '#F1A0BC'} />
                <stop offset="100%" stopColor="#CE628B" />
              </linearGradient>
            </defs>
            <path
              d="M12 29C9 25 2 19 2 11C2 5 5 1 9 2L12 6L15 2C20 0 23 5 22 11C21 19 16 25 12 29Z"
              fill={`url(#${gradientId}-${index})`}
              stroke="#C86A8E"
              strokeWidth="0.5"
              strokeOpacity="0.4"
            />
            <path d="M12 26Q10 17 12 9" fill="none" stroke="#C86A8E" strokeWidth="0.6" opacity="0.25" />
          </svg>
        </span>
      ))}
    </div>
  );
};

export default SakuraPetals;
