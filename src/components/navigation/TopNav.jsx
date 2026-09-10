import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import chaptersData from '../../data/chapters';
import useChapterObserver from '../../hooks/useChapterObserver';

const TopNav = ({ isMobileMenuOpen, setIsMobileMenuOpen }) => {
  const chapters = chaptersData.chapters;
  const { activeChapterId } = useChapterObserver();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-deep-ink/90 backdrop-blur-xl border-b border-manga-gray/20 shadow-[0px_8px_24px_rgba(0,0,0,0.06)]">
      <div className="flex justify-between items-center px-6 md:px-8 py-4 max-w-full mx-auto">
        {/* Left: RAMEEZ */}
        <div className="font-['Newsreader'] text-xl md:text-2xl font-bold tracking-tight text-primary">
          RAMEEZ
        </div>

        {/* Center: Chapter Label */}
        <div className="hidden md:flex items-center gap-2 text-sm font-label uppercase tracking-wider">
          <span className="text-manga-gray">CHAPTER</span>
          <span className="text-sakura font-bold"> {activeChapterId} </span>
          <span className="text-manga-gray">·</span>
          <span className="text-on-surface">
            {chapters.find(chapter => chapter.id === activeChapterId)?.title || 'THE ORIGIN'}
          </span>
        </div>

        {/* Right: Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="md:hidden text-manga-gray p-2 focus:outline-none"
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