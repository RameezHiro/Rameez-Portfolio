import chaptersData from '../../data/chapters';

const MobileChapterNav = ({ activeChapterId, scrollToChapter }) => {
  const chapters = chaptersData.chapters;

  return (
    <nav
      aria-label="Mobile chapter navigation"
      className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-paper/95 backdrop-blur border-t border-ink/10 shadow-[0_-8px_24px_rgba(17,17,17,0.08)] safe-area-inset-bottom"
    >
      <div className="px-2 sm:px-4 py-3">
        {/* Compact enough that all nine chapters fit without scrolling at
            320 px when the row shows numbers only. The labelled row at sm and
            up still scrolls as a fallback. */}
        <div
          className="flex items-center gap-1 overflow-x-auto scrollbar-hide pb-2"
        >
          {chapters.map((chapter) => {
            const isActive = activeChapterId === chapter.id;
            return (
              <button
                key={chapter.id}
                onClick={() => scrollToChapter(chapter.id)}
                aria-current={isActive ? 'location' : undefined}
                aria-label={`Chapter ${chapter.id}: ${chapter.title}`}
                className={`relative flex-shrink-0 flex flex-col items-center gap-1 px-1.5 py-2 font-body text-[10px] uppercase tracking-[0.15em] transition-colors rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sakura-text ${
                  isActive
                    ? 'text-sakura-text font-semibold'
                    : 'text-manga-gray hover:text-ink'
                }`}
              >
                <span>{chapter.id}</span>
                <span className="hidden sm:inline" aria-hidden="true">{chapter.title}</span>
                {isActive && (
                  <span
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-sakura-text rounded-full"
                    aria-hidden="true"
                  />
                )}
              </button>
            );
          })}
        </div>
        <p className="text-center font-body text-[10px] uppercase tracking-[0.2em] text-manga-gray">
          Tap a chapter to jump
        </p>
      </div>
    </nav>
  );
};

export default MobileChapterNav;