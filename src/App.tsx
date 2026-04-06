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
    const t1 = setTimeout(() => setPhase('split'), 650);
    const t2 = setTimeout(() => setPhase('done'), 1400);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  if (phase === 'done') return null;

  const easeIn = [0.76, 0, 0.24, 1] as const;

  // Shared decorative layer rendered inside both panels
  const Decorations = ({ flip }: { flip?: boolean }) => (
    <>
      {/* Diagonal green wash from corner */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: flip
          ? 'radial-gradient(ellipse at 20% 80%, rgba(74,94,58,0.28) 0%, transparent 60%)'
          : 'radial-gradient(ellipse at 80% 20%, rgba(74,94,58,0.28) 0%, transparent 60%)',
      }}/>
      {/* Gold radial bloom at center edge */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: flip
          ? 'radial-gradient(ellipse at 50% 10%, rgba(199,152,79,0.12) 0%, transparent 55%)'
          : 'radial-gradient(ellipse at 50% 90%, rgba(199,152,79,0.12) 0%, transparent 55%)',
      }}/>
      {/* Corner vine-dot cluster */}
      <svg style={{ position:'absolute', ...(flip ? { top:12, right:20 } : { bottom:12, left:20 }), opacity:0.35, pointerEvents:'none' }}
        width="80" height="40" viewBox="0 0 80 40" fill="none">
        <path d="M0,20 Q20,8 40,18 Q60,28 80,16" stroke="#C7984F" strokeWidth="1.2" strokeLinecap="round"/>
        <circle cx="14" cy="13" r="2.5" fill="#4A5E3A" opacity="0.8"/>
        <circle cx="38" cy="19" r="2"   fill="#C7984F"  opacity="0.7"/>
        <circle cx="62" cy="23" r="2.5" fill="#4A5E3A" opacity="0.8"/>
        <circle cx="78" cy="17" r="1.5" fill="#C7984F"  opacity="0.5"/>
      </svg>
      {/* Opposing corner accent */}
      <svg style={{ position:'absolute', ...(flip ? { bottom:10, left:16 } : { top:10, right:16 }), opacity:0.22, pointerEvents:'none' }}
        width="48" height="24" viewBox="0 0 48 24" fill="none">
        <path d="M0,12 Q12,4 24,10 Q36,16 48,8" stroke="#8FAE7E" strokeWidth="1" strokeLinecap="round"/>
        <circle cx="24" cy="10" r="1.5" fill="#8FAE7E"/>
      </svg>
      {/* Center horizontal rule — only in top panel */}
      {!flip && (
        <div style={{
          position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)',
          width: '40%', height: 1,
          background: 'linear-gradient(to right, transparent, rgba(199,152,79,0.35) 30%, rgba(143,174,126,0.25) 50%, rgba(199,152,79,0.35) 70%, transparent)',
        }}/>
      )}
    </>
  );

  return (
    <>
      {/* Top panel */}
      <motion.div
        className="fixed inset-x-0 top-0 z-[9990] flex items-end justify-center overflow-hidden"
        style={{
          height: '50vh',
          background: 'linear-gradient(160deg, #1E1008 0%, #2C1810 45%, #263318 100%)',
          paddingBottom: '28px',
        }}
        initial={{ y: 0 }}
        animate={phase === 'split' ? { y: '-100%' } : { y: 0 }}
        transition={{ duration: 0.7, ease: easeIn }}
      >
        <Decorations />

        {/* Text + diamond ornaments */}
        <div style={{ position:'relative', zIndex:1, textAlign:'center' }}>
          <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:6, justifyContent:'center' }}>
            <svg width="20" height="1" viewBox="0 0 20 1"><line x1="0" y1="0.5" x2="20" y2="0.5" stroke="#C7984F" strokeWidth="0.8" opacity="0.5"/></svg>
            <svg width="6" height="6" viewBox="0 0 6 6"><polygon points="3,0 6,3 3,6 0,3" fill="#4A5E3A" opacity="0.7"/></svg>
            <svg width="20" height="1" viewBox="0 0 20 1"><line x1="0" y1="0.5" x2="20" y2="0.5" stroke="#C7984F" strokeWidth="0.8" opacity="0.5"/></svg>
          </div>
          <span style={{
            fontFamily: "'Cormorant Garamond', serif",
            color: '#C7984F',
            fontSize: '0.68rem',
            letterSpacing: '0.42em',
            opacity: 0.82,
            fontStyle: 'italic',
            fontWeight: 300,
            textTransform: 'uppercase',
          }}>
            Entering Bjorno's World
          </span>
          <div style={{ display:'flex', alignItems:'center', gap:8, marginTop:6, justifyContent:'center' }}>
            <svg width="5" height="5" viewBox="0 0 5 5"><circle cx="2.5" cy="2.5" r="2" fill="#8FAE7E" opacity="0.55"/></svg>
            <svg width="7" height="7" viewBox="0 0 7 7"><polygon points="3.5,0 7,3.5 3.5,7 0,3.5" fill="#C7984F" opacity="0.65"/></svg>
            <svg width="5" height="5" viewBox="0 0 5 5"><circle cx="2.5" cy="2.5" r="2" fill="#8FAE7E" opacity="0.55"/></svg>
          </div>
        </div>
      </motion.div>

      {/* Bottom panel */}
      <motion.div
        className="fixed inset-x-0 bottom-0 z-[9990] overflow-hidden"
        style={{
          height: '50vh',
          background: 'linear-gradient(200deg, #1E1008 0%, #2C1810 45%, #263318 100%)',
        }}
        initial={{ y: 0 }}
        animate={phase === 'split' ? { y: '100%' } : { y: 0 }}
        transition={{ duration: 0.7, ease: easeIn }}
      >
        <Decorations flip />
      </motion.div>
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
