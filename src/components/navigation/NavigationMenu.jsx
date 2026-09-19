import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useRef } from 'react';
import chaptersData from '../../data/chapters';

const NavigationMenu = ({ isOpen, onClose, activeChapterId, scrollToChapter }) => {
  const chapters = chaptersData.chapters;
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
          className="fixed inset-0 z-50 bg-deep-ink/95 text-paper backdrop-blur-md flex flex-col"
          onClick={(e) => e.target === e.currentTarget && onClose()}
          ref={menuRef}
        >
          {/* Close Button */}
          <button
            ref={menuButtonRef}
            onClick={onClose}
            className="absolute top-6 right-6 text-paper/70 hover:text-paper p-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-sakura rounded-full"
            aria-label="Close menu"
          >
            <span className="material-symbols-outlined text-2xl">close</span>
          </button>

          {/* Menu Content */}
          <div className="flex flex-col h-full px-6 md:px-8 py-24 overflow-y-auto">
            {/* Chapter Navigation */}
            <div className="mb-16">
              <h2 className="font-display text-2xl text-paper mb-8">THE DEVELOPER'S ARC</h2>
              <div className="grid grid-cols-2 gap-6">
                {chapters.map((chapter) => {
                  const isActive = activeChapterId === chapter.id;
                  return (
                    <button
                      key={chapter.id}
                      onClick={() => handleChapterClick(chapter.id)}
                      className={`flex flex-col items-start transition-colors group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sakura rounded ${
                        isActive ? 'text-sakura' : 'text-paper/70 hover:text-paper'
                      }`}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      <span className="text-sm font-body uppercase tracking-wider mb-1">
                        {chapter.id}
                      </span>
                      <span className="text-xl font-display group-hover:translate-x-1 transition-transform">
                        {chapter.title}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Journal Link */}
            <div className="mb-16">
              <h2 className="font-display text-2xl text-paper mb-8">DEVELOPER'S JOURNAL</h2>
              <a
                href="/journal"
                onClick={onClose}
                className="text-paper/80 hover:text-sakura transition-colors text-xl font-display flex items-center gap-2 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sakura rounded"
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
                  className="text-paper/60 hover:text-paper transition-colors text-sm font-body uppercase tracking-wider flex items-center gap-2 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sakura rounded"
                >
                  <span className="material-symbols-outlined text-base">code</span>
                  GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/shaikh-rameez-17b304336/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-paper/60 hover:text-paper transition-colors text-sm font-body uppercase tracking-wider flex items-center gap-2 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sakura rounded"
                >
                  <span className="material-symbols-outlined text-base">link</span>
                  LinkedIn
                </a>
                <button
                  className="text-paper/60 hover:text-paper transition-colors text-sm font-body uppercase tracking-wider flex items-center gap-2 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sakura rounded"
                >
                  <span className="material-symbols-outlined text-base">description</span>
                  Resume
                </button>
                <button
                  className="text-paper/60 hover:text-paper transition-colors text-sm font-body uppercase tracking-wider flex items-center gap-2 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sakura rounded"
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
