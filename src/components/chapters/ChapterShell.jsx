import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Chapter from './Chapter';
import Chapter01 from './Chapter01';
import Chapter02 from './Chapter02';
import Chapter03 from './Chapter03';
import Chapter04 from './Chapter04';
import Chapter05 from './Chapter05';
import Chapter06 from './Chapter06';
import Chapter07 from './Chapter07';
import Chapter08 from './Chapter08';
import Final from './Final';
import TopNav from '../navigation/TopNav';
import ChapterRail from '../navigation/ChapterRail';
import NavigationMenu from '../navigation/NavigationMenu';
import MobileChapterNav from '../navigation/MobileChapterNav';
import chaptersData from '../../data/chapters';
import useChapterObserver from '../../hooks/useChapterObserver';

const ChapterShell = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // Single canonical chapter state for all navigation UI.
  const { activeChapterId, scrollToChapter } = useChapterObserver({
    defaultChapterId: '01',
  });

  const chapters = chaptersData.chapters;
  const storyChapters = chapters.filter((chapter) => chapter.id !== 'prologue');

  return (
    <div className="min-h-screen bg-paper text-ink overflow-x-clip">
      {/* Top Navigation */}
      <TopNav
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        activeChapterId={activeChapterId}
        scrollToChapter={scrollToChapter}
      />

      {/* Main content */}
      <main id="main-content" className="relative">
        {/* Skip to content link */}
        <a
          href="#chapter-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 bg-sakura text-paper px-4 py-2 rounded font-body text-sm"
        >
          Skip to main content
        </a>
        {/* Chapter content */}
        <div id="chapter-content" tabIndex={-1}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="pt-24"
        >
            {/* Chapter Rail - desktop only */}
            <ChapterRail
              activeChapterId={activeChapterId}
              scrollToChapter={scrollToChapter}
            />

            {/* Chapters */}
            {storyChapters.map((chapter) => (
              <Chapter
                key={chapter.id}
                id={chapter.id}
                number={chapter.number}
                title={chapter.title}
                description={chapter.description}
              >
                {chapter.id === '01' ? (
                  <Chapter01 />
                ) : chapter.id === '02' ? (
                  <Chapter02 />
                ) : chapter.id === '03' ? (
                  <Chapter03 />
                ) : chapter.id === '04' ? (
                  <Chapter04 />
                ) : chapter.id === '05' ? (
                  <Chapter05 />
                ) : chapter.id === '06' ? (
                  <Chapter06 />
                ) : chapter.id === '07' ? (
                  <Chapter07 />
                ) : chapter.id === '08' ? (
                  <Chapter08 />
                ) : chapter.id === 'final' ? (
                  <Final />
                ) : (
                  /* Chapter content slot - to be filled by individual chapter implementations */
                  <div className="border border-ink/15 px-6 py-10 text-center">
                    <p className="font-body text-base text-ink">Chapter content goes here</p>
                    <p className="mt-2 font-body text-sm uppercase tracking-[0.2em] text-manga-gray">Chapter {chapter.id}: {chapter.title}</p>
                  </div>
                )}
              </Chapter>
            ))}
        </motion.div>
        </div>

        {/* Mobile Navigation Menu */}
        <NavigationMenu
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
          activeChapterId={activeChapterId}
          scrollToChapter={scrollToChapter}
        />

        {/* Mobile Chapter Navigation - fixed bottom */}
        <MobileChapterNav
          activeChapterId={activeChapterId}
          scrollToChapter={scrollToChapter}
        />
      </main>
    </div>
  );
};

export default ChapterShell;
