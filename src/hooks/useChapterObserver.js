import { useState, useEffect, useRef, useCallback } from 'react';

// Observe the rendered chapter sections and expose the currently active one.
//
// Chapters register themselves by rendering <section data-chapter="NN">.
// The active chapter is the section overlapping the viewport's focus band
// (a horizontal band around the vertical center of the viewport) the most,
// which maps naturally to the chapter a reader is currently looking at.
const useChapterObserver = ({ defaultChapterId = '01' } = {}) => {
  const [activeChapterId, setActiveChapterId] = useState(defaultChapterId);
  const observerRef = useRef(null);
  const elementsRef = useRef([]);
  const rafRef = useRef(0);
  const settleTimerRef = useRef(0);

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return undefined;

    const evaluate = () => {
      const vh = window.innerHeight;
      const bandHeight = vh * 0.35;
      const bandTop = (vh - bandHeight) / 2;
      const bandBottom = (vh + bandHeight) / 2;

      let bestId = null;
      let bestOverlap = 0;

      elementsRef.current.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const overlap = Math.max(
          0,
          Math.min(rect.bottom, bandBottom) - Math.max(rect.top, bandTop)
        );
        if (overlap > bestOverlap) {
          bestOverlap = overlap;
          bestId = el.getAttribute('data-chapter');
        }
      });

      if (bestId) setActiveChapterId(bestId);
    };

    // Coalesce bursts of intersection/scroll notifications into one evaluation
    // per animation frame.
    const scheduleEvaluate = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = 0;
        evaluate();
      });
    };

    // IntersectionObserver delivery is async and edge-triggered; during fast
    // or momentum scrolling the last delivered evaluation can predate the
    // settled position. Re-evaluate authoritatively while scrolling and once
    // more after scrolling settles so the state can never stick one chapter
    // behind.
    const handleScroll = () => {
      scheduleEvaluate();
      if (settleTimerRef.current) clearTimeout(settleTimerRef.current);
      settleTimerRef.current = setTimeout(() => {
        settleTimerRef.current = 0;
        evaluate();
      }, 150);
    };

    const scan = () => {
      if (observerRef.current) observerRef.current.disconnect();
      observerRef.current = new IntersectionObserver(scheduleEvaluate, {
        rootMargin: '0px',
        threshold: 0,
      });

      elementsRef.current = Array.from(document.querySelectorAll('[data-chapter]'));
      elementsRef.current.forEach((el) => observerRef.current.observe(el));
    };

    scan();
    evaluate();

    // Re-scan when chapter sections are added or removed (e.g. lazy chapters).
    const mutationObserver = new MutationObserver(() => scan());
    mutationObserver.observe(document.body, { childList: true, subtree: true });

    window.addEventListener('resize', scheduleEvaluate);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('resize', scheduleEvaluate);
      window.removeEventListener('scroll', handleScroll);
      mutationObserver.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (settleTimerRef.current) clearTimeout(settleTimerRef.current);
      if (observerRef.current) observerRef.current.disconnect();
      elementsRef.current = [];
    };
  }, []);

  const scrollToChapter = useCallback((chapterId) => {
    const chapterElement = document.querySelector(`[data-chapter="${chapterId}"]`);
    if (chapterElement) {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      chapterElement.scrollIntoView({
        behavior: prefersReduced ? 'auto' : 'smooth',
        block: 'start',
      });
    }
  }, []);

  return { activeChapterId, scrollToChapter };
};

export default useChapterObserver;
