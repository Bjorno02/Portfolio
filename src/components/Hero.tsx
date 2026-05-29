import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

const NAME_1 = ['B', 'J', 'O', 'R', 'N'];
const NAME_2 = ['S', 'H', 'U', 'R', 'D', 'H', 'A'];
const SUBTITLE = 'Software Producer';

function useTypewriter(text: string, startDelay: number, speed = 52) {
  const [display, setDisplay] = useState('');
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setStarted(true), startDelay);
    return () => clearTimeout(t);
  }, [startDelay]);

  useEffect(() => {
    if (!started) return;
    let i = 0;
    const id = setInterval(() => {
      i++;
      setDisplay(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [started, text, speed]);

  return { display, done: display.length === text.length && started };
}

// Stable particle data — no Math.random() in render
const PARTICLES = [
  { left: '7%',  top: '18%', size: 3, dur: 4.2, delay: 0.3 },
  { left: '13%', top: '58%', size: 2, dur: 3.6, delay: 0.9 },
  { left: '22%', top: '35%', size: 3, dur: 5.1, delay: 1.6 },
  { left: '31%', top: '72%', size: 2, dur: 3.8, delay: 2.1 },
  { left: '38%', top: '22%', size: 4, dur: 4.5, delay: 0.5 },
  { left: '47%', top: '48%', size: 2, dur: 4.0, delay: 1.2 },
  { left: '58%', top: '30%', size: 3, dur: 3.3, delay: 0.7 },
  { left: '67%', top: '65%', size: 2, dur: 4.7, delay: 2.4 },
  { left: '74%', top: '15%', size: 4, dur: 5.2, delay: 0.4 },
  { left: '82%', top: '44%', size: 2, dur: 3.5, delay: 1.8 },
  { left: '89%', top: '68%', size: 3, dur: 4.1, delay: 1.1 },
  { left: '94%', top: '25%', size: 2, dur: 3.0, delay: 2.7 },
];

const LETTER_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function Hero() {
  const [videoReady, setVideoReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    // If already buffered (cached), fire immediately
    if (el.readyState >= 3) { setVideoReady(true); return; }
    const onReady = () => setVideoReady(true);
    el.addEventListener('canplay', onReady);
    // Fallback: show content after 2.5s regardless
    const fallback = setTimeout(() => setVideoReady(true), 2500);
    return () => { el.removeEventListener('canplay', onReady); clearTimeout(fallback); };
  }, []);

  const { display, done } = useTypewriter(SUBTITLE, videoReady ? 1850 : 99999);

  return (
    <section id="home" className="relative w-full h-[70vh] md:h-[745px] -mt-10 overflow-hidden"
      style={{ background: '#1A0E06' }}
    >

      {/* ── Video Background ── */}
      <video
        ref={videoRef}
        autoPlay loop muted playsInline preload="auto"
        className="absolute top-0 left-0 w-full h-[130%] object-cover object-bottom md:h-full md:object-top"
      >
        <source src="/hero.mp4" type="video/mp4" />
      </video>

      {/* ── Atmospheric layered overlays ── */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/78 via-black/45 to-black/12" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#3B2A1A]/55 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-br from-[#8B6914]/8 via-transparent to-transparent" />

      {/* ── Floating gold particles ── */}
      {videoReady && PARTICLES.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-[#C7984F] pointer-events-none"
          style={{ left: p.left, top: p.top, width: p.size, height: p.size }}
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 0.55, 0.15, 0.65, 0],
            y: [0, -18, -6, -22, 0],
            x: [0, 4, -2, 6, 0],
          }}
          transition={{ duration: p.dur, delay: 2.2 + p.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}

      {/* ── Top-left decorative brushstroke curves ── */}
      <motion.svg
        className="absolute top-0 left-0 pointer-events-none"
        width="340" height="220" viewBox="0 0 340 220" fill="none"
        initial={{ opacity: 0, x: -40 }}
        animate={videoReady ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
        transition={{ duration: 1.6, delay: 0.1 }}
      >
        <path d="M-10,28 Q70,10 150,32 Q220,50 300,18" stroke="#C7984F" strokeWidth="1.4" fill="none" opacity="0.28" strokeLinecap="round"/>
        <path d="M-10,52 Q90,24 180,50 Q250,66 340,38" stroke="#C7984F" strokeWidth="0.7" fill="none" opacity="0.18" strokeLinecap="round"/>
        <circle cx="22" cy="30" r="2.5" fill="#C7984F" opacity="0.22"/>
        <circle cx="148" cy="26" r="3.5" fill="#C7984F" opacity="0.14"/>
        <circle cx="230" cy="44" r="2" fill="#C7984F" opacity="0.2"/>
      </motion.svg>

      {/* ── Bottom-right decorative accent ── */}
      <motion.svg
        className="absolute bottom-16 right-8 pointer-events-none hidden md:block"
        width="220" height="140" viewBox="0 0 220 140" fill="none"
        initial={{ opacity: 0, x: 30 }}
        animate={videoReady ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
        transition={{ duration: 1.6, delay: 0.3 }}
      >
        <path d="M220,108 Q160,96 120,118 Q76,140 0,112" stroke="#C7984F" strokeWidth="1.2" fill="none" opacity="0.22" strokeLinecap="round"/>
        <path d="M220,88 Q168,78 128,98 Q82,120 8,94" stroke="#C7984F" strokeWidth="0.6" fill="none" opacity="0.14" strokeLinecap="round"/>
        <circle cx="196" cy="106" r="2.5" fill="#C7984F" opacity="0.18"/>
        <circle cx="62" cy="128" r="2" fill="#C7984F" opacity="0.16"/>
      </motion.svg>

      {/* ── Main text block ── */}
      <div className="absolute inset-0 flex items-center ml-6 md:ml-20 mt-12">
        <div className="relative text-left px-6 md:px-12 py-10">

          {/* Top rule — draws in */}
          <motion.div
            className="mb-6 h-[2px]"
            style={{ background: 'linear-gradient(to right, rgba(217,191,150,0.6), transparent)' }}
            initial={{ width: 0 }}
            animate={videoReady ? { width: '4rem' } : { width: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          />

          {/* BJORN — letter-by-letter from below */}
          <h1
            className="flex leading-none tracking-[0.12em] text-4xl md:text-[5.5rem] font-bold uppercase drop-shadow-[0_4px_14px_rgba(0,0,0,0.65)]"
            style={{ fontFamily: "'Cinzel Decorative', serif", color: '#D9BF96' }}
          >
            {NAME_1.map((ch, i) => (
              <motion.span
                key={i}
                className="inline-block"
                initial={{ y: 90, opacity: 0, filter: 'blur(6px)' }}
                animate={videoReady ? { y: 0, opacity: 1, filter: 'blur(0px)' } : { y: 90, opacity: 0, filter: 'blur(6px)' }}
                transition={{ duration: 0.72, delay: 0.38 + i * 0.1, ease: LETTER_EASE }}
              >
                {ch}
              </motion.span>
            ))}
          </h1>

          {/* SHURDHA — slightly later, stagger in same direction */}
          <h1
            className="flex leading-none tracking-[0.12em] text-4xl md:text-[5.5rem] font-bold uppercase drop-shadow-[0_4px_14px_rgba(0,0,0,0.65)]"
            style={{ fontFamily: "'Cinzel Decorative', serif", color: '#D9BF96' }}
          >
            {NAME_2.map((ch, i) => (
              <motion.span
                key={i}
                className="inline-block"
                initial={{ y: 90, opacity: 0, filter: 'blur(6px)' }}
                animate={videoReady ? { y: 0, opacity: 1, filter: 'blur(0px)' } : { y: 90, opacity: 0, filter: 'blur(6px)' }}
                transition={{ duration: 0.72, delay: 0.88 + i * 0.09, ease: LETTER_EASE }}
              >
                {ch}
              </motion.span>
            ))}
          </h1>

          {/* Divider — extends after name is done */}
          <motion.div
            className="my-5 h-[1px]"
            style={{ background: 'linear-gradient(to right, rgba(217,191,150,0.55), rgba(217,191,150,0.2), transparent)' }}
            initial={{ width: 0 }}
            animate={videoReady ? { width: '13rem' } : { width: 0 }}
            transition={{ duration: 1, delay: 1.75, ease: 'easeOut' }}
          />

          {/* Typewriter subtitle */}
          <h2
            className="text-sm md:text-2xl uppercase drop-shadow-[0_2px_6px_rgba(0,0,0,0.55)] min-h-[2.5rem] flex items-center tracking-[0.38em] md:tracking-[0.55em]"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, color: 'rgba(217,191,150,0.85)' }}
          >
            {display}
            {!done && videoReady && (
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.75, repeat: Infinity }}
                className="inline-block w-[1.5px] h-4 md:h-6 ml-0.5 align-middle"
                style={{ background: 'rgba(217,191,150,0.75)' }}
              />
            )}
          </h2>

          {/* Bottom rule */}
          <motion.div
            className="mt-6 h-[2px]"
            style={{ background: 'linear-gradient(to right, rgba(217,191,150,0.6), transparent)' }}
            initial={{ width: 0 }}
            animate={videoReady ? { width: '4rem' } : { width: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          />
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <motion.div
        className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0, y: 8 }}
        animate={videoReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
        transition={{ delay: 3.2, duration: 0.9 }}
      >
        <span
          className="text-white/38 text-[9px] tracking-[0.45em] uppercase"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          Scroll
        </span>
        <div className="w-px h-10 overflow-hidden">
          <motion.div
            className="w-full h-full bg-gradient-to-b from-[#C7984F] to-transparent"
            animate={{ y: ['-100%', '200%'] }}
            transition={{ duration: 1.3, repeat: Infinity, ease: 'easeIn', repeatDelay: 0.2 }}
          />
        </div>
      </motion.div>

    </section>
  );
}
