"use client"
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import mountainImg from '../../assets/environments/mountain.png';
import mangaImg from '../../assets/character/rameez-manga.png';
import portraitImg from '../../assets/character/rameez-potrait.png';

// ─────────────────────────────────────────────────────────
// TransformationScene
// Drives: portrait (phase 0) → ink (phase 1) → manga (phase 2)
// The parent holds this scene for 2000ms then advances.
// ─────────────────────────────────────────────────────────
const TransformationScene = ({ prefersReduced }) => {
  const [phase, setPhase] = useState(prefersReduced ? 2 : 0);

  useEffect(() => {
    if (prefersReduced) return;
    const t1 = setTimeout(() => setPhase(1), 500); // start transition after 500ms hold
    const t2 = setTimeout(() => setPhase(2), 1500); // end transition after 1s (total 1500ms)
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [prefersReduced]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="absolute inset-0 bg-center bg-cover"
      style={{ backgroundImage: `url(${mountainImg})` }}
    >
      {/* Environmental dark overlay */}
      <div className="absolute inset-0 bg-black/70" />

      {/* Narration */}
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="absolute bottom-12 inset-x-0 text-center text-xl md:text-2xl text-white font-semibold tracking-wide px-6"
        style={{ textShadow: '0 2px 12px rgba(0,0,0,0.9)' }}
      >
        This is where my story starts.
      </motion.p>

      {/* Character transformation stack */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="relative overflow-hidden rounded-lg"
          style={{
            width: 'min(200px, 56vw)',
            aspectRatio: '3 / 4',
            boxShadow: '0 0 48px rgba(0,0,0,0.85), 0 0 0 2px rgba(255,255,255,0.12)',
            transform: 'translateY(-20px)',
          }}
        >
          {/* Layer 1: Real portrait */}
          <motion.img
            src={portraitImg}
            alt="Rameez"
            className="absolute inset-0 w-full h-full object-cover object-top"
            style={{ zIndex: 1 }}
            animate={{
              opacity: phase >= 1 ? (2 - phase) : 1,
              scale: phase >= 1 ? (2 - phase) * 0.03 + 0.97 : 1,
            }}
            transition={{ duration: 0.7, ease: 'easeInOut' }}
          />

          {/* Layer 2: Halftone / screentone dot overlay */}
          <motion.div
            className="absolute inset-0"
            style={{
              zIndex: 2,
              backgroundImage:
                'radial-gradient(circle, rgba(0,0,0,0.75) 0.55px, transparent 0.55px)',
              backgroundSize: '4px 4px',
              mixBlendMode: 'multiply',
            }}
            animate={{ opacity: phase >= 1 ? 0.5 : 0 }}
            transition={{ duration: 0.5 }}
          />

          {/* Layer 3: Ink vignette — edge shadow closes in */}
          <motion.div
            className="absolute inset-0 rounded-lg"
            style={{
              zIndex: 3,
              background:
                'radial-gradient(ellipse at 50% 38%, transparent 28%, rgba(0,0,0,0.92) 100%)',
            }}
            animate={{ opacity: phase >= 1 ? 1 : 0 }}
            transition={{ duration: 0.5, ease: 'easeIn' }}
          />

          {/* Layer 4: Ink wipe — rises from bottom like ink flooding up */}
          <motion.div
            className="absolute inset-x-0 bottom-0"
            style={{
              zIndex: 4,
              background:
                'linear-gradient(to top, rgba(0,0,0,0.97) 0%, rgba(0,0,0,0.5) 60%, transparent 100%)',
            }}
            animate={{ height: phase >= 1 ? '100%' : '8%' }}
            transition={{ duration: 0.52, ease: 'easeIn' }}
          />

          {/* Layer 5: Manga protagonist */}
          <motion.img
            src={mangaImg}
            alt="Rameez — Manga Protagonist"
            className="absolute inset-0 w-full h-full object-cover object-top"
            style={{ zIndex: 5 }}
            animate={{
              opacity: phase >= 1 ? (phase - 1) : 0,
              scale: phase >= 1 ? (phase - 1) * 0.03 + 0.97 : 0.97,
            }}
            transition={{ duration: 0.7, ease: 'easeInOut' }}
          />
        </div>
      </div>
    </motion.div>
  );
};

// ─────────────────────────────────────────────────────────
// Prologue
// ─────────────────────────────────────────────────────────
const Prologue = ({ onFinish }) => {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const [step, setStep] = useState(0);
  const [visible, setVisible] = useState(true);

  // Skip if previously seen or reduced motion is active
  useEffect(() => {
    const seen = sessionStorage.getItem('hasSeenIntro');
    if (seen || prefersReduced) return skip();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Escape key
  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') skip(); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const skip = () => {
    sessionStorage.setItem('hasSeenIntro', 'true');
    setVisible(false);
    onFinish?.();
  };

  // Scene sequence timings:
  //  step 0 → 1  at 2000ms  (mountain)
  //  step 1 → 2  at 4000ms  (transformation)
  //  step 2 → 3  at 6000ms  (manga established)
  //  step 3 → 4  at 8000ms  (terminal)
  //  step 4 → 5  at 9000ms  (dissolve)
  //  skip        at 11500ms (cover + buffer)
  useEffect(() => {
    if (prefersReduced) return;
    const durations = [2000, 2000, 2000, 2000, 1000, 2000];
    const timers = [];
    let accumulated = 0;
    durations.forEach((dur, i) => {
      accumulated += dur;
      timers.push(setTimeout(() => setStep(i + 1), accumulated));
    });
    timers.push(setTimeout(skip, accumulated + 500));
    return () => timers.forEach(clearTimeout);
  }, [prefersReduced]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!visible) return null;

  return (
    <section className="fixed inset-0 z-[60] bg-black overflow-hidden">

      {/* Skip button */}
      <button
        onClick={skip}
        className="absolute top-4 right-4 z-[70] text-manga-gray bg-surface rounded-md px-4 py-2 text-sm hover:text-sakura transition-colors focus:outline-none focus:ring-2 focus:ring-sakura"
        aria-label="Skip intro"
      >
        SKIP INTRO ↗
      </button>

      {/* ═══ SCENE 0: Environmental opening (0–2s) ═══ */}
      {step === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 bg-center bg-cover"
          style={{ backgroundImage: `url(${mountainImg})` }}
        >
          <div className="absolute inset-0 bg-black/70" />
          <div className="absolute inset-0 flex items-center justify-center px-6">
            <h2
              className="text-3xl md:text-4xl text-white font-medium text-center leading-snug"
              style={{ textShadow: '0 2px 12px rgba(0,0,0,0.8)' }}
            >
              Every engineer starts somewhere.
            </h2>
          </div>
        </motion.div>
      )}

      {/* ═══ SCENE 1: Portrait → Ink → Manga (2–4s) ═══ */}
      {step === 1 && (
        <TransformationScene prefersReduced={prefersReduced} />
      )}

      {/* ═══ SCENE 2: Manga protagonist established (4–6s) ═══ */}
      {step === 2 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 bg-center bg-cover"
          style={{ backgroundImage: `url(${mountainImg})` }}
        >
          <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.82)' }} />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 px-4">
            <motion.img
              src={mangaImg}
              alt="Rameez — Manga Protagonist"
              className="w-auto object-contain drop-shadow-2xl"
              style={{ height: 'min(288px, 52vh)' }}
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            />
            <motion.p
              className="text-sm md:text-base text-gray-400 text-center uppercase tracking-[0.25em] font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              The arc begins.
            </motion.p>
          </div>
        </motion.div>
      )}

      {/* ═══ SCENE 3: Terminal (6–8s) ═══ */}
      {step === 3 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 flex items-center justify-center bg-black px-4"
        >
          <pre
            className="text-sm md:text-base font-mono text-green-400 px-6 py-5 rounded-md bg-black/80 leading-relaxed"
            style={{ maxWidth: '80%', minHeight: '240px' }}
          >{`$ whoami
rameez

$ focus
software-engineering
ai-ml
backend

$ status
building...`}</pre>
        </motion.div>
      )}

      {/* ═══ SCENE 4: Ink dissolve (8–9s) ═══ */}
      {step === 4 && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 bg-black"
        />
      )}

      {/* ═══ SCENE 5: Final manga cover (9–11s) ═══ */}
      {step === 5 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 flex flex-col items-center justify-center bg-black gap-2 px-4"
        >
          <motion.h1
            className="text-5xl md:text-6xl text-white font-extrabold tracking-tight"
            initial={{ y: -12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            RAMEEZ
          </motion.h1>
          <motion.h2
            className="text-xl md:text-2xl text-gray-300 mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            THE DEVELOPER&apos;S ARC
          </motion.h2>
          <motion.h3
            className="text-base md:text-lg text-gray-400 mt-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35, duration: 0.5 }}
          >
            AI × SOFTWARE × BUILDING
          </motion.h3>
          <motion.h4
            className="text-sm md:text-base text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45, duration: 0.5 }}
          >
            B.Tech CSE · AI/ML
          </motion.h4>
          <motion.span
            className="text-sm text-gray-300 mt-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            BEGIN READING ↓
          </motion.span>
        </motion.div>
      )}

    </section>
  );
};

export default Prologue;