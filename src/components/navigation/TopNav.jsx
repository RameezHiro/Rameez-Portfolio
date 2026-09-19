import chaptersData from '../../data/chapters';

const TopNav = ({ isMobileMenuOpen, setIsMobileMenuOpen, activeChapterId }) => {
  const chapters = chaptersData.chapters;
  const activeChapter = chapters.find((chapter) => chapter.id === activeChapterId);
  const isNumberedChapter =
    activeChapter && activeChapter.id !== 'prologue' && activeChapter.id !== 'final';

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-deep-ink/90 text-paper backdrop-blur-xl border-b border-manga-gray/20 shadow-[0px_8px_24px_rgba(0,0,0,0.06)]">
      <div className="flex justify-between items-center px-6 md:px-8 py-4 max-w-full mx-auto">
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
              <span className="text-paper">{activeChapter.title}</span>
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
    </nav>
  );
};

export default TopNav;
