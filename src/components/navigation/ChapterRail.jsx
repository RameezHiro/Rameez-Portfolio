import { motion } from 'framer-motion';
import chaptersData from '../../data/chapters';
import useChapterObserver from '../../hooks/useChapterObserver';

const ChapterRail = () => {
  const chapters = chaptersData.chapters;
  const { activeChapterId, scrollToChapter } = useChapterObserver();

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40 flex gap-2">
      {chapters.map((chapter) => (
        <button
          key={chapter.id}
          onClick={() => scrollToChapter(chapter.id)}
          className={`px-3 py-1 text-xs uppercase tracking-wider font-label text-manga-gray hover:text-primary transition-colors ${
            activeChapterId === chapter.id ? 'text-sakura font-bold border-b-2 border-sakura' : ''
          }`}
          aria-label={`Go to ${chapter.title} chapter`}
          aria-current={activeChapterId === chapter.id ? 'step' : undefined}
        >
          {chapter.id}
        </button>
      ))}
    </div>
  );
};

export default ChapterRail;