import React, { useRef, useState } from 'react';
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
  const menuTriggerRef = useRef(null);
  const mainRef = useRef(null);
  // Single canonical chapter state for all navigation UI. The shell is the one
  // owner of URL state; chapter components call the same hook only to jump.
  const { activeChapterId, scrollToChapter } = useChapterObserver({
    defaultChapterId: '01',
    manageUrl: true,
    observe: true,
  });

  const chapters = chaptersData.chapters;
  const storyChapters = chapters.filter((chapter) => chapter.id !== 'prologue');

  const handleSkipToMain = (event) => {
    const target = mainRef.current;
    if (!target) return;
    event.preventDefault();
    target.focus({ preventScroll: true });
    target.scrollIntoView({ block: 'start' });
  };

  return (
    <div className="min-h-screen bg-paper text-ink overflow-x-clip">
      {/* First stop in the tab order: bypass the repeated navigation. */}
      <a
        href="#main-content"
        onClick={handleSkipToMain}
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:inline-block focus:rounded focus:bg-sakura-text focus:px-4 focus:py-2 focus:font-body focus:text-sm focus:text-paper focus:outline-none focus:ring-2 focus:ring-paper focus:ring-offset-2 focus:ring-offset-deep-ink"
      >
        Skip to main content
      </a>

      {/* Top Navigation */}
      <TopNav
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        activeChapterId={activeChapterId}
        scrollToChapter={scrollToChapter}
        menuTriggerRef={menuTriggerRef}
      />

      {/* Main content */}
      <main
        id="main-content"
        ref={mainRef}
        tabIndex={-1}
        className="relative focus:outline-none"
      >
        <h1 className="sr-only">Rameez: The Developer&apos;s Arc</h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="pt-24"
        >
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
      </main>

      {/* Navigation landmarks sit outside <main> so skipping the top bar lands
          in the story, and the rail is not the first thing after the skip. */}
      <ChapterRail
        activeChapterId={activeChapterId}
        scrollToChapter={scrollToChapter}
      />

      {/* Mobile Navigation Menu */}
      <NavigationMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        activeChapterId={activeChapterId}
        scrollToChapter={scrollToChapter}
        triggerRef={menuTriggerRef}
      />

      {/* Mobile Chapter Navigation - fixed bottom */}
      <MobileChapterNav
        activeChapterId={activeChapterId}
        scrollToChapter={scrollToChapter}
      />
    </div>
  );
};

export default ChapterShell;
