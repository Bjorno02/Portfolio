import { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import './App.css'
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/ContactForm';
import FloatingClouds from './components/FloatingClouds';

// ─── Custom Cursor ────────────────────────────────────────────

function CustomCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const [isHover, setIsHover] = useState(false);
  const [visible, setVisible] = useState(false);
  const [hasMouse, setHasMouse] = useState(false);

  const springX = useSpring(x, { stiffness: 550, damping: 38 });
  const springY = useSpring(y, { stiffness: 550, damping: 38 });
  const trailX  = useSpring(x, { stiffness: 160, damping: 24 });
  const trailY  = useSpring(y, { stiffness: 160, damping: 24 });

  useEffect(() => {
    setHasMouse(window.matchMedia('(pointer: fine)').matches);
  }, []);

  useEffect(() => {
    if (!hasMouse) return;
    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
    };
    const onOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      setIsHover(!!(el.closest('a, button, [role="button"], input, textarea, select')));
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', onOver);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
    };
  }, [hasMouse, x, y]);

  if (!hasMouse || !visible) return null;

  return (
    <>
      {/* Trailing ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full border border-[#C7984F]"
        style={{ x: trailX, y: trailY, translateX: '-50%', translateY: '-50%' }}
        animate={{ width: isHover ? 50 : 30, height: isHover ? 50 : 30, opacity: isHover ? 0.65 : 0.3 }}
        transition={{ duration: 0.22 }}
      />
      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full bg-[#C7984F]"
        style={{ x: springX, y: springY, translateX: '-50%', translateY: '-50%' }}
        animate={{ width: isHover ? 7 : 5, height: isHover ? 7 : 5, opacity: isHover ? 1 : 0.85 }}
        transition={{ duration: 0.14 }}
      />
    </>
  );
}

// ─── Page Curtain Loader ──────────────────────────────────────

function PageCurtain() {
  const [phase, setPhase] = useState<'in' | 'split' | 'done'>('in');

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('split'), 450);
    const t2 = setTimeout(() => setPhase('done'), 1150);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  if (phase === 'done') return null;

  const easeIn = [0.76, 0, 0.24, 1] as const;

  return (
    <>
      <motion.div
        className="fixed inset-x-0 top-0 z-[9990] flex items-end justify-center pb-3"
        style={{
          height: '50vh',
          background: 'linear-gradient(to bottom, #2C1810 0%, #3B2A1A 100%)',
        }}
        animate={phase === 'split' ? { y: '-100%' } : { y: 0 }}
        transition={{ duration: 0.65, ease: easeIn }}
      >
        <span style={{
          fontFamily: "'Cinzel Decorative', serif",
          color: '#C7984F',
          fontSize: '0.7rem',
          letterSpacing: '0.5em',
          opacity: 0.75,
        }}>
          BJORN SHURDHA
        </span>
      </motion.div>
      <motion.div
        className="fixed inset-x-0 bottom-0 z-[9990]"
        style={{
          height: '50vh',
          background: 'linear-gradient(to top, #2C1810 0%, #3B2A1A 100%)',
        }}
        animate={phase === 'split' ? { y: '100%' } : { y: 0 }}
        transition={{ duration: 0.65, ease: easeIn }}
      />
    </>
  );
}

// ─── App ──────────────────────────────────────────────────────

function App() {
  return (
    <div className="min-h-screen text-black">
      <PageCurtain />
      <CustomCursor />
      <Navbar />
      <Hero />
      <div className="relative bg-gradient-to-b from-[#ECDFD2] to-[#8FAE7E] border-b-[12px] border-[#4A5E3A]">
        <FloatingClouds />
        <About />
        <Skills />
        <Projects />
      </div>
      <Experience />
      <div className="h-3 bg-gradient-to-r from-[#3B2A1A] via-[#C7984F] to-[#3B2A1A]" />
      <Contact />
    </div>
  );
}

export default App;
