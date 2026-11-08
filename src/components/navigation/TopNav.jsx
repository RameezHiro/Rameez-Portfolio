import { useEffect, useState } from 'react';
import chaptersData from '../../data/chapters';

// The bar belongs to the top of the page only. A small hysteresis band keeps
// it from flickering when the reader settles exactly on the threshold.
const HIDE_AFTER = 32;
const SHOW_AT = 8;

const TopNav = ({ isMobileMenuOpen, setIsMobileMenuOpen, activeChapterId, scrollToChapter, menuTriggerRef }) => {
  const chapters = chaptersData.chapters;
  const activeChapter = chapters.find((chapter) => chapter.id === activeChapterId);
  const isNumberedChapter =
    activeChapter && activeChapter.id !== 'prologue' && activeChapter.id !== 'final';

  // Start visible (the common first paint) and flip only when the reader
  // crosses a threshold. The listener is passive and coalesced into one rAF.
  const [isAtStart, setIsAtStart] = useState(true);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const y = window.scrollY;
      setIsAtStart((visible) => (visible ? y <= HIDE_AFTER : y <= SHOW_AT));
    };

    const handleScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  // Quick links for recruiter/visitor escape hatch
  const quickLinks = [
    { label: 'Profile', chapterId: '01' },
    { label: 'Skills', chapterId: '03' },
    { label: 'Projects', chapterId: '05' },
    { label: 'Achievements', chapterId: '04' },
    { label: 'Contact', chapterId: 'final' },
  ];

  // The brand returns to the start of the story; the anchor href keeps it a
  // real link, the handler keeps the SPA's chapter state and URL in sync.
  const handleBrandClick = (event) => {
    event.preventDefault();
    scrollToChapter('01');
  };

  return (
    <nav
      data-nav-visible={isAtStart ? 'true' : 'false'}
      aria-hidden={isAtStart ? undefined : 'true'}
      inert={isAtStart ? undefined : ''}
      className={`fixed top-0 left-0 right-0 z-50 bg-[#F9D5E0] text-deep-ink backdrop-blur-xl border-b border-manga-gray/20 shadow-[0px_8px_24px_rgba(0,0,0,0.06)] transition-[transform,opacity] duration-300 ease-out motion-reduce:transition-none ${
        isAtStart
          ? 'translate-y-0 opacity-100'
          : '-translate-y-8 opacity-0 pointer-events-none'
      }`}
    >
      {/* Hand-drawn sakura ink annotation. The frame is purely decorative and
          absolutely positioned so it never affects the bar's layout or size. */}
      <svg
        data-nav-outline
        aria-hidden="true"
        focusable="false"
        className="pointer-events-none absolute inset-[5px] z-0 h-[calc(100%-10px)] w-[calc(100%-10px)] overflow-visible"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {/* Three sides in one loose pen pass; the right edge is a separate
            overlapping stroke so the corners read as ink, not a CSS box. */}
        <path
          d="M99.1 6.5 C86 4.2 72 8 58 5.8 C44 4 30 7.8 16 5.6 C8.4 4.4 2.2 6.8 0.8 7.2 C1.2 22 0.4 38 0.9 54 C1.4 70 0.5 84 0.8 93.2 C14 94.2 28 92.9 42 94.6 C56 96 70 93.6 84 95.2 C91 95.9 96.8 94.4 99 94"
          fill="none"
          stroke="#D96C8A"
          strokeOpacity="1"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
        <path
          d="M99 6.6 C98.5 22 99.4 40 98.8 58 C98.4 74 99.3 86 99 94.4"
          fill="none"
          stroke="#D96C8A"
          strokeOpacity="1"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      {/* The two groups sit side by side only once the quick links, chapter
          label and brand genuinely fit. Around 768 px the label needs the full
          row, so the layout stacks below 1280 px. */}
      <div className="relative z-10 flex flex-col xl:flex-row justify-between items-center px-6 md:px-8 py-4 max-w-full mx-auto gap-4">
        {/* Top row: Brand and chapter label */}
        <div className="flex justify-between items-center w-full xl:w-auto gap-4">
          {/* Left: emblem + RAMEEZ, one interactive brand lockup */}
          <a
            href="/"
            onClick={handleBrandClick}
            aria-label="Rameez home"
            className="inline-flex items-center gap-2.5 sm:gap-3 rounded-sm transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-deep-ink focus-visible:ring-offset-2 focus-visible:ring-offset-[#F9D5E0]"
          >
            <img
              src="/android-chrome-192x192.png"
              alt=""
              aria-hidden="true"
              width="192"
              height="192"
              className="h-7 w-7 sm:h-8 sm:w-8 xl:h-9 xl:w-9 object-contain shrink-0"
            />
            <span className="font-display text-xl md:text-2xl font-bold tracking-tight text-deep-ink">
              RAMEEZ
            </span>
          </a>

          <div className="flex items-center gap-3 md:gap-4">
            {/* Center: Chapter Label */}
            <div className="hidden md:flex items-center gap-2 text-sm font-body uppercase tracking-wider">
              {isNumberedChapter ? (
                <>
                  <span className="text-[#5C5C5C]">CHAPTER</span>
                  <span className="text-sakura font-bold"> {activeChapterId} </span>
                  <span className="text-[#5C5C5C]">·</span>
                  <span className="text-[#5C5C5C] ml-1">{activeChapter.title}</span>
                </>
              ) : (
                <span className="text-[#5C5C5C]">{activeChapter?.title || 'PROLOGUE'}</span>
              )}
            </div>

            {/* Right: Menu Button */}
            <button
              ref={menuTriggerRef}
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden text-deep-ink hover:text-sakura p-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-sakura rounded"
              aria-label="Open menu"
              aria-expanded={isMobileMenuOpen}
              aria-controls="navigation-menu"
            >
              <span className="material-symbols-outlined text-2xl">menu</span>
            </button>
          </div>
        </div>

        {/* Bottom row: Quick Links (stacked under the brand until 1280 px) */}
        <div className="hidden md:flex flex-wrap justify-center items-center gap-2 xl:gap-3 w-full xl:w-auto pt-2 xl:pt-0 border-t border-manga-gray/20 xl:border-t-0">
          {quickLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => scrollToChapter(link.chapterId)}
              className={`font-body text-xs uppercase tracking-[0.2em] px-3 py-1.5 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sakura ${
                activeChapterId === link.chapterId
                  ? 'bg-white text-deep-ink border border-white'
                  : 'text-[#5C5C5C] hover:text-sakura hover:border-sakura/30 border border-transparent'
              }`}
              aria-current={activeChapterId === link.chapterId ? 'page' : undefined}
            >
              {link.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default TopNav;
