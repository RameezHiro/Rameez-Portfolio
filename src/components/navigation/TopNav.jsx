import chaptersData from '../../data/chapters';

const TopNav = ({ isMobileMenuOpen, setIsMobileMenuOpen, activeChapterId, scrollToChapter }) => {
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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-deep-ink/90 text-paper backdrop-blur-xl border-b border-manga-gray/20 shadow-[0px_8px_24px_rgba(0,0,0,0.06)]">
      <div className="flex flex-col md:flex-row justify-between items-center px-6 md:px-8 py-4 max-w-full mx-auto gap-4">
        {/* Top row: Brand + Chapter Label */}
        <div className="flex justify-between items-center w-full md:w-auto">
          {/* Left: RAMEEZ */}
          <div className="font-display text-xl md:text-2xl font-bold tracking-tight text-paper">
            RAMEEZ
          </div>

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

          {/* Right: Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="md:hidden text-paper/80 hover:text-paper p-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-sakura rounded"
            aria-label="Open menu"
            aria-expanded={isMobileMenuOpen}
          >
            <span className="material-symbols-outlined text-2xl">menu</span>
          </button>
        </div>

        {/* Bottom row: Quick Links (desktop only) */}
        <div className="hidden md:flex flex-wrap justify-center items-center gap-3 w-full md:w-auto pt-2 border-t border-manga-gray/20">
          {quickLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => scrollToChapter(link.chapterId)}
              className={`font-body text-xs uppercase tracking-[0.2em] px-3 py-1.5 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sakura ${
                activeChapterId === link.chapterId
                  ? 'bg-sakura/20 text-sakura border border-sakura/30'
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
