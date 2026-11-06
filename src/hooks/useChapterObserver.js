import { useState, useEffect, useLayoutEffect, useRef, useCallback } from 'react';
import { DEFAULT_CHAPTER_ID, getChapterIdFromUrl, writeChapterUrl } from '../lib/chapterUrl';

// Clearance between the fixed top navigation and a chapter's top edge when
// jumping to it. Measured at click time because the nav changes height between
// breakpoints (one row on mobile, two around the tablet widths).
const NAV_CLEARANCE = 12;

const scrollToChapterElement = (chapterId, behavior) => {
  const chapterElement = document.querySelector(`[data-chapter="${chapterId}"]`);
  if (!chapterElement) return false;

  const nav = document.querySelector('nav.fixed.top-0');
  const offset = (nav ? nav.offsetHeight : 0) + NAV_CLEARANCE;
  const top = chapterElement.getBoundingClientRect().top + window.scrollY - offset;

  window.scrollTo({ top: Math.max(0, top), behavior });
  return true;
};

// Observe the rendered chapter sections and expose the currently active one.
//
// Chapters register themselves by rendering <section data-chapter="NN">.
// The active chapter is the section overlapping the viewport's focus band
// (a horizontal band around the vertical center of the viewport) the most,
// which maps naturally to the chapter a reader is currently looking at.
//
// `manageUrl` is enabled once, by the shell: it owns the initial deep link,
// the Back/Forward listener and scroll-driven URL updates. Chapter components
// call this hook only for `scrollToChapter`, which still writes the URL on a
// deliberate jump so every chapter control stays addressable.
//
// `observe` likewise belongs to the shell. Chapter components pass no option,
// so they do not each build their own IntersectionObserver, scroll/resize
// listeners and body MutationObserver for a value they never read — that used
// to multiply every scroll measurement by the number of chapters on the page.
const useChapterObserver = ({
  defaultChapterId = DEFAULT_CHAPTER_ID,
  manageUrl = false,
  observe = false,
} = {}) => {
  const initialChapterIdRef = useRef(null);
  if (initialChapterIdRef.current === null) {
    initialChapterIdRef.current = manageUrl
      ? getChapterIdFromUrl() || defaultChapterId
      : defaultChapterId;
  }

  const [activeChapterId, setActiveChapterId] = useState(initialChapterIdRef.current);
  const observerRef = useRef(null);
  const elementsRef = useRef([]);
  const rafRef = useRef(0);
  const settleTimerRef = useRef(0);

  const scrollToChapter = useCallback((chapterId, { push = true, behavior } = {}) => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const motion = behavior || (prefersReduced ? 'auto' : 'smooth');
    const didScroll = scrollToChapterElement(chapterId, motion);

    if (push) writeChapterUrl(chapterId, 'push');
    if (didScroll) setActiveChapterId(chapterId);
  }, []);

  // A directly opened chapter should land on that chapter, below the fixed
  // navigation, before the observer's first paint-level evaluation.
  useLayoutEffect(() => {
    if (!manageUrl) return undefined;
    const targetId = initialChapterIdRef.current;
    if (targetId === defaultChapterId) return undefined;

    let cancelled = false;
    const startedAt = Date.now();
    const cancel = () => {
      cancelled = true;
    };

    scrollToChapter(targetId, { push: false, behavior: 'auto' });
    const frame = requestAnimationFrame(() => {
      if (!cancelled) scrollToChapter(targetId, { push: false, behavior: 'auto' });
    });

    // Late-loading images and web fonts shift the document after first paint,
    // which moves the target. Re-align after each finishes, but only while the
    // reader is still where the deep link put them: any pointer, wheel, touch
    // or key input cancels it, and it gives up after a few seconds, so a slow
    // font can never pull someone back out of a chapter they chose.
    window.addEventListener('pointerdown', cancel, { once: true, passive: true });
    window.addEventListener('wheel', cancel, { once: true, passive: true });
    window.addEventListener('touchstart', cancel, { once: true, passive: true });
    window.addEventListener('keydown', cancel, { once: true });

    const align = () => {
      if (cancelled || Date.now() - startedAt > 8000) return;
      scrollToChapter(targetId, { push: false, behavior: 'auto' });
    };

    if (document.readyState !== 'complete') {
      window.addEventListener('load', align, { once: true });
    }
    if (document.fonts?.ready) {
      document.fonts.ready.then(align);
    }

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      window.removeEventListener('pointerdown', cancel);
      window.removeEventListener('wheel', cancel);
      window.removeEventListener('touchstart', cancel);
      window.removeEventListener('keydown', cancel);
      window.removeEventListener('load', align);
    };
  }, [manageUrl, defaultChapterId, scrollToChapter]);

  // Keep the URL in step with the chapter being read. Replace, never push, so
  // ordinary scrolling cannot flood the history stack. This is a layout effect
  // so the address bar can never be observed disagreeing with the highlighted
  // chapter for even one frame.
  useLayoutEffect(() => {
    if (!manageUrl) return;
    writeChapterUrl(activeChapterId, 'replace');
  }, [activeChapterId, manageUrl]);

  // Back/Forward restore the chapter recorded in the URL.
  useEffect(() => {
    if (!manageUrl) return undefined;

    const handlePopState = () => {
      const chapterId = getChapterIdFromUrl() || defaultChapterId;
      scrollToChapter(chapterId, { push: false });
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [manageUrl, defaultChapterId, scrollToChapter]);

  useEffect(() => {
    if (!observe || typeof IntersectionObserver === 'undefined') return undefined;

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
  }, [observe]);

  return { activeChapterId, scrollToChapter };
};

export default useChapterObserver;
