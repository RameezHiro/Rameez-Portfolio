import chaptersData from '../../data/chapters';

const ChapterRail = ({ activeChapterId, scrollToChapter }) => {
  const chapters = chaptersData.chapters;

  return (
    <nav
      aria-label="Chapters"
      className="fixed bottom-5 left-1/2 z-40 hidden -translate-x-1/2 md:block"
    >
      <div className="flex items-center gap-1 rounded-full border border-ink/15 bg-paper/90 px-2 py-1 shadow-[0_8px_24px_rgba(17,17,17,0.08)] backdrop-blur">
        {chapters.map((chapter) => {
          const isActive = activeChapterId === chapter.id;
          return (
            <button
              key={chapter.id}
              onClick={() => scrollToChapter(chapter.id)}
              className={`relative rounded-full px-2.5 py-1.5 font-body text-[11px] uppercase tracking-[0.18em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sakura ${
                isActive
                  ? 'font-semibold text-ink'
                  : 'text-manga-gray hover:text-ink'
              }`}
              aria-label={`Go to ${chapter.title} chapter`}
              aria-current={isActive ? 'step' : undefined}
            >
              {chapter.id}
              {isActive && (
                <span
                  className="absolute inset-x-2 -bottom-0.5 h-0.5 bg-sakura"
                  aria-hidden="true"
                />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default ChapterRail;
