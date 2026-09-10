"use client"
import { useState, useEffect, useRef } from 'react';

const useChapterObserver = () => {
  const [activeChapterId, setActiveChapterId] = useState('01'); // Default to Chapter 01
  const observerRef = useRef(null);
  const sectionsRef = useRef([]);

  useEffect(() => {
    // Initialize observer
    observerRef.current = new IntersectionObserver((entries) => {
      let newActiveChapterId = '01'; // Default to Chapter 01
      let highestIntersectionRatio = 0;

      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio > highestIntersectionRatio) {
          const chapterId = entry.target.getAttribute('data-chapter');
          if (chapterId) {
            newActiveChapterId = chapterId;
            highestIntersectionRatio = entry.intersectionRatio;
          }
        }
      });

      // Update active chapter with a small delay to avoid rapid switching
      const delayTimer = setTimeout(() => {
        setActiveChapterId(newActiveChapterId);
      }, 100);

      return () => clearTimeout(delayTimer);
    }, {
      rootMargin: '-30% 0px -30% 0px', // Adjust to avoid rapid switching
      threshold: [0.3, 0.5, 0.7],
    });

    // Observe all registered sections
    sectionsRef.current.forEach((section) => {
      if (section && observerRef.current) {
        observerRef.current.observe(section);
      }
    });

    // Cleanup function
    return () => {
      if (observerRef.current) {
        sectionsRef.current.forEach((section) => {
          if (section) observerRef.current.unobserve(section);
        });
        observerRef.current.disconnect();
      }
    };
  }, []);

  const registerChapter = (chapterId) => {
    const section = document.createElement('section');
    section.setAttribute('data-chapter', chapterId);
    sectionsRef.current.push(section);
    return section;
  };

  const scrollToChapter = (chapterId) => {
    const chapterElement = document.querySelector(`[data-chapter="${chapterId}"]`);
    if (chapterElement) {
      chapterElement.scrollIntoView({
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
        block: 'start'
      });
    }
  };

  return {
    activeChapterId,
    registerChapter,
    scrollToChapter,
  };
};

export default useChapterObserver;