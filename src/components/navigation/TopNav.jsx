import chaptersData from '../../data/chapters';

const TopNav = ({ isMobileMenuOpen, setIsMobileMenuOpen, activeChapterId, scrollToChapter, menuTriggerRef }) => {
  const chapters = chaptersData.chapters;
  const activeChapter = chapters.find((chapter) => chapter.id === activeChapterId);
  const isNumberedChapter =
    activeChapter && activeChapter.id !== 'prologue' && activeChapter.id !== 'final';

  // Quick links for recruiter/visitor escape hatch
  const quickLinks = [
    { label: 'Profile', chapterId: '01' },
    { label: 'Skills', chapterId: '03' },
    { label: 'Projects', chapterId: '05' },
    { label: 'Achievements', chapterId: '04' },
    { label: 'Contact', chapterId: 'final' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-deep-ink/95 text-paper backdrop-blur-xl border-b border-manga-gray/20 shadow-[0px_8px_24px_rgba(0,0,0,0.06)]">
      {/* The two groups sit side by side only once the quick links, chapter
          label, resume and brand genuinely fit. Around 768 px the label needs
          the full row, so the layout stacks below 1280 px. */}
      <div className="flex flex-col xl:flex-row justify-between items-center px-6 md:px-8 py-4 max-w-full mx-auto gap-4">
        {/* Top row: Brand, chapter label and resume */}
        <div className="flex justify-between items-center w-full xl:w-auto gap-4">
          {/* Left: RAMEEZ */}
          <div className="font-display text-xl md:text-2xl font-bold tracking-tight text-paper">
            RAMEEZ
          </div>

          <div className="flex items-center gap-3 md:gap-4">
            {/* Center: Chapter Label */}
            <div className="hidden md:flex items-center gap-2 text-sm font-body uppercase tracking-wider">
              {isNumberedChapter ? (
                <>
                  <span className="text-paper/60">CHAPTER</span>
                  <span className="text-sakura font-bold"> {activeChapterId} </span>
                  <span className="text-paper/60">·</span>
                  <span className="text-paper ml-1">{activeChapter.title}</span>
                </>
              ) : (
                <span className="text-paper">{activeChapter?.title || 'PROLOGUE'}</span>
              )}
            </div>

            {/* Resume: one click from every width and chapter */}
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="hidden md:inline-flex items-center gap-1.5 font-body text-xs uppercase tracking-[0.2em] px-3 py-1.5 rounded-full border border-sakura/40 text-paper/80 hover:text-sakura hover:border-sakura/70 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sakura"
            >
              Resume
              <span className="material-symbols-outlined text-[14px]" aria-hidden="true">description</span>
              <span className="sr-only">(PDF, opens in a new tab)</span>
            </a>

            {/* Right: Menu Button */}
            <button
              ref={menuTriggerRef}
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden text-paper/80 hover:text-paper p-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-sakura rounded"
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
                  ? 'bg-sakura/20 text-paper border border-sakura/40'
                  : 'text-paper/70 hover:text-sakura hover:border-sakura/30 border border-transparent'
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
