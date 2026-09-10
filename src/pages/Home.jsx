"use client"

import { useEffect } from 'react';
import useChapterObserver from '../hooks/useChapterObserver';

function Home() {
  const { registerChapter } = useChapterObserver();

  return (
    <div className="min-h-screen">
      {/* Temporary test chapters for demonstration */}
      <section
        data-chapter="01"
        className="h-screen bg-surface-container-low flex items-center justify-center"
      >
        <div className="text-center">
          <h2 className="text-4xl font-headline mb-4">Chapter 01: THE ORIGIN</h2>
          <p className="text-secondary">Scroll down to test chapter detection</p>
        </div>
      </section>

      <section
        data-chapter="02"
        className="h-screen bg-surface-container-high flex items-center justify-center"
      >
        <div className="text-center">
          <h2 className="text-4xl font-headline mb-4">Chapter 02: TRAINING</h2>
          <p className="text-secondary">Scroll down to test chapter detection</p>
        </div>
      </section>

      <section
        data-chapter="03"
        className="h-screen bg-surface-container flex items-center justify-center"
      >
        <div className="text-center">
          <h2 className="text-4xl font-headline mb-4">Chapter 03: ARSENAL</h2>
          <p className="text-secondary">Scroll down to test chapter detection</p>
        </div>
      </section>

      <section
        data-chapter="04"
        className="h-screen bg-surface-container-highest flex items-center justify-center"
      >
        <div className="text-center">
          <h2 className="text-4xl font-headline mb-4">Chapter 04: THE BATTLE ARC</h2>
          <p className="text-secondary">Scroll down to test chapter detection</p>
        </div>
      </section>

      <section
        data-chapter="05"
        className="h-screen bg-surface-container-low flex items-center justify-center"
      >
        <div className="text-center">
          <h2 className="text-4xl font-headline mb-4">Chapter 05: THE PROJECT ARC</h2>
          <p className="text-secondary">Scroll down to test chapter detection</p>
        </div>
      </section>
    </div>
  );
}

export default Home;