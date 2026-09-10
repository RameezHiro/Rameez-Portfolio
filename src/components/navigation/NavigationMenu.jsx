import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useRef } from 'react';
import chaptersData from '../../data/chapters';
import useChapterObserver from '../../hooks/useChapterObserver';

const NavigationMenu = ({ isOpen, onClose }) => {
  const chapters = chaptersData.chapters;
  const { scrollToChapter } = useChapterObserver();
  const menuRef = useRef(null);
  const menuButtonRef = useRef(null);

  // Prevent body scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Focus management
  useEffect(() => {
    if (isOpen) {
      // Focus the first menu item when menu opens
      const firstMenuItem = menuRef.current?.querySelector('button, a');
      firstMenuItem?.focus();
    } else {
      // Return focus to the menu button when menu closes
      menuButtonRef.current?.focus();
    }
  }, [isOpen]);

  const handleChapterClick = (chapterId) => {
    onClose();
    scrollToChapter(chapterId);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 bg-deep-ink/95 backdrop-blur-md flex flex-col"
          onClick={(e) => e.target === e.currentTarget && onClose()}
          ref={menuRef}
        >
          {/* Close Button */}
          <button
            ref={menuButtonRef}
            onClick={onClose}
            className="absolute top-6 right-6 text-manga-gray p-2 focus:outline-none focus:ring-2 focus:ring-sakura rounded-full"
            aria-label="Close menu"
          >
            <span className="material-symbols-outlined text-2xl">close</span>
          </button>

          {/* Menu Content */}
          <div className="flex flex-col h-full px-6 md:px-8 py-24 overflow-y-auto">
            {/* Chapter Navigation */}
            <div className="mb-16">
              <h2 className="font-headline text-2xl text-primary mb-8">THE DEVELOPER'S ARC</h2>
              <div className="grid grid-cols-2 gap-6">
                {chapters.map((chapter) => (
                  <button
                    key={chapter.id}
                    onClick={() => handleChapterClick(chapter.id)}
                    className={`flex flex-col items-start transition-colors group ${
                      chapter.id === '04' ? 'text-sakura' : 'text-manga-gray hover:text-primary'
                    }`}
                    aria-current={chapter.id === '04' ? 'page' : undefined}
                  >
                    <span className="text-sm font-label uppercase tracking-wider mb-1">
                      {chapter.id}
                    </span>
                    <span className="text-xl font-headline group-hover:translate-x-1 transition-transform">
                      {chapter.title}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Journal Link */}
            <div className="mb-16">
              <h2 className="font-headline text-2xl text-primary mb-8">DEVELOPER'S JOURNAL</h2>
              <a
                href="/journal"
                onClick={onClose}
                className="text-manga-gray hover:text-primary transition-colors text-xl font-headline flex items-center gap-2 group"
              >
                View Journal
                <span className="material-symbols-outlined text-base group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </a>
            </div>

            {/* External Links */}
            <div className="mt-auto">
              <div className="grid grid-cols-2 gap-6">
                <a
                  href="https://github.com/RameezHiro"
                  target="_blank"
                  rel="noreferrer"
                  className="text-manga-gray hover:text-primary transition-colors text-sm font-label uppercase tracking-wider flex items-center gap-2 group"
                >
                  <span className="material-symbols-outlined text-base">code</span>
                  GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/shaikh-rameez-17b304336/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-manga-gray hover:text-primary transition-colors text-sm font-label uppercase tracking-wider flex items-center gap-2 group"
                >
                  <span className="material-symbols-outlined text-base">link</span>
                  LinkedIn
                </a>
                <button
                  className="text-manga-gray hover:text-primary transition-colors text-sm font-label uppercase tracking-wider flex items-center gap-2 group"
                >
                  <span className="material-symbols-outlined text-base">description</span>
                  Resume
                </button>
                <button
                  className="text-manga-gray hover:text-primary transition-colors text-sm font-label uppercase tracking-wider flex items-center gap-2 group"
                >
                  <span className="material-symbols-outlined text-base">mail</span>
                  Contact
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NavigationMenu;