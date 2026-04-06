import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

const projects = [
  {
    title: 'Combat Zone MMA',
    url: 'https://czmma.com',
    description: 'Website for Combat Zone MMA, an organization owned by UFC vet Calvin Kattar',
    image: 'https://czmma.com/opengraph.jpg',
  },
  {
    title: 'Long Barn Hay',
    url: 'https://longbarnhay.com',
    description: 'Website for Long Barn Hay, a hay business out of Chester, NH owned by Brendon Marrote.',
  },
  {
    title: 'BST Jiu Jitsu',
    url: 'https://bloodsweattearsjiujitsu.com',
    description: 'Website for Blood Sweat and Tears Jiu Jitsu school.',
  },
  {
    title: 'The Battle Lab',
    url: 'https://thebattlelab.onrender.com',
    description: 'Website for Competitive Pokemon Team Analysis.',
  },
];

const IFRAME_WIDTH = 1440;

function SitePreview({ url, title, image }: { url: string; title: string; image?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.4);

  useEffect(() => {
    if (image) return;
    const el = containerRef.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => {
      setScale(entry.contentRect.width / IFRAME_WIDTH);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [image]);

  if (image) {
    return (
      <div className="relative w-full overflow-hidden bg-black" style={{ aspectRatio: '16 / 9' }}>
        <img src={image} alt={`${title} preview`} className="w-full h-full object-cover object-top"/>
        {/* Subtle vignette over preview */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"/>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative w-full overflow-hidden bg-white" style={{ aspectRatio: '16 / 9' }}>
      <iframe
        src={url}
        title={`${title} preview`}
        className="absolute top-0 left-0 border-none pointer-events-none origin-top-left"
        style={{
          width: `${IFRAME_WIDTH + 20}px`,
          height: `${IFRAME_WIDTH * (9 / 16)}px`,
          transform: `scale(${scale})`,
        }}
        loading="lazy"
        sandbox="allow-scripts allow-same-origin"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/15 to-transparent pointer-events-none"/>
    </div>
  );
}

// 3-D tilt + holographic spotlight card
function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const cardRef  = useRef<HTMLDivElement>(null);
  const holoRef  = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const rotateX = useSpring(rawX, { stiffness: 240, damping: 28 });
  const rotateY = useSpring(rawY, { stiffness: 240, damping: 28 });
  const glareOpacity = useTransform(rawY, [-6, 6], [0.06, 0.02]);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top  + rect.height / 2;
    rawX.set(((e.clientY - cy) / (rect.height / 2)) * -5.5);
    rawY.set(((e.clientX - cx) / (rect.width  / 2)) * 5.5);

    // Holographic spotlight
    if (holoRef.current) {
      const x = ((e.clientX - rect.left) / rect.width)  * 100;
      const y = ((e.clientY - rect.top)  / rect.height) * 100;
      holoRef.current.style.setProperty('--mx', `${x}%`);
      holoRef.current.style.setProperty('--my', `${y}%`);
    }
  };

  const onMouseEnter = () => {
    setHovered(true);
    if (holoRef.current) holoRef.current.style.opacity = '1';
  };

  const onMouseLeave = () => {
    rawX.set(0);
    rawY.set(0);
    setHovered(false);
    if (holoRef.current) holoRef.current.style.opacity = '0';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 34, x: index % 2 === 0 ? -24 : 24 }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay: index * 0.13, ease: [0.22, 1, 0.36, 1] }}
    >
      <a href={project.url} target="_blank" rel="noopener noreferrer" className="block h-full">
        <motion.div
          ref={cardRef}
          onMouseMove={onMouseMove}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          style={{
            rotateX, rotateY,
            transformStyle: 'preserve-3d',
            transformPerspective: 900,
          }}
          className="relative h-full rounded-2xl overflow-hidden"
        >
          {/* Outer glow ring */}
          <div
            className="absolute -inset-[3px] rounded-2xl pointer-events-none transition-all duration-400"
            style={{
              background: hovered
                ? 'linear-gradient(145deg, #F0D78C, #C7984F, #8FAE7E, #C7984F, #F0D78C)'
                : 'linear-gradient(145deg, #C7984F, #8B6914)',
              animation: hovered ? 'borderSpin 3s linear infinite' : 'none',
            }}
          />

          {/* Card body */}
          <div
            className="relative h-full flex flex-col rounded-2xl overflow-hidden"
            style={{
              margin: '2px',
              boxShadow: hovered
                ? '0 24px 70px rgba(30,18,5,0.7), 0 0 36px rgba(199,152,79,0.2)'
                : '0 8px 32px rgba(30,18,5,0.5)',
              transition: 'box-shadow 0.35s ease',
            }}
          >
            {/* Browser chrome — dark brown with green tints */}
            <div
              className="px-4 py-3 flex items-center gap-2 relative overflow-hidden"
              style={{ background: 'linear-gradient(135deg, #2C1810 0%, #3B2A1A 60%, #2A2018 100%)' }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent pointer-events-none"/>
              {/* Two-tone bottom border: gold fading into green */}
              <div className="absolute bottom-0 left-0 right-0 h-[3px] pointer-events-none"
                style={{ background: 'linear-gradient(to right, #4A5E3A, #C7984F 35%, #C7984F 65%, #4A5E3A)' }}
              />
              <span className="w-3 h-3 rounded-full bg-red-400/90    shadow-[0_0_6px_rgba(248,113,113,0.6)]"/>
              <span className="w-3 h-3 rounded-full bg-yellow-400/90 shadow-[0_0_6px_rgba(250,204,21,0.6)]"/>
              <span className="w-3 h-3 rounded-full bg-[#8FAE7E]/90   shadow-[0_0_6px_rgba(143,174,126,0.7)]"/>
              {/* URL bar */}
              <div className="ml-3 flex-1 bg-[#1C100A] rounded px-3 py-1 flex items-center gap-2"
                style={{ border: '1px solid rgba(199,152,79,0.15)' }}
              >
                <svg width="10" height="10" viewBox="0 0 24 24" fill="#8FAE7E" opacity="0.6">
                  <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
                </svg>
                <span className="text-[11px] text-[#F5F0EB]/35 truncate"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  {project.url}
                </span>
              </div>
              <motion.span
                className="w-2 h-2 rounded-full flex-shrink-0 bg-[#8FAE7E]"
                style={{ boxShadow: '0 0 6px rgba(143,174,126,0.8)' }}
                animate={{ opacity: [0.4, 1, 0.4], scale: [0.8, 1.1, 0.8] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              />
            </div>

            {/* Preview */}
            <SitePreview url={project.url} title={project.title} image={project.image}/>

            {/* Info footer — rich dark base, brown→green sweep, gold highlights */}
            <div className="flex-1 relative text-center text-[#F5F0EB] overflow-hidden"
              style={{ background: 'linear-gradient(155deg, #2A1C0E 0%, #231A0B 30%, #1E2B14 65%, #263318 100%)' }}
            >
              {/* Grain */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.07]">
                <filter id={`grain-p-${index}`}>
                  <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/>
                </filter>
                <rect width="100%" height="100%" filter={`url(#grain-p-${index})`}/>
              </svg>
              {/* Diagonal hatch — gold */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.05]" preserveAspectRatio="xMidYMid slice">
                <defs>
                  <pattern id={`hatch-c-${index}`} width="18" height="18" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                    <line x1="0" y1="0" x2="0" y2="18" stroke="#C7984F" strokeWidth="0.7"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill={`url(#hatch-c-${index})`}/>
              </svg>
              {/* Radial gold bloom from top */}
              <div className="absolute inset-0 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse at 50% -10%, rgba(199,152,79,0.18) 0%, transparent 60%)' }}
              />
              {/* Green atmospheric wash bottom-right */}
              <div className="absolute inset-0 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse at 85% 110%, rgba(74,94,58,0.35) 0%, transparent 55%)' }}
              />

              {/* Top separator: thin gold line flanked by green */}
              <div className="absolute top-0 left-0 right-0 h-[3px] pointer-events-none"
                style={{ background: 'linear-gradient(to right, #263318, #C7984F 25%, #F0D78C 50%, #C7984F 75%, #263318)' }}
              />

              {/* Ornate corner brackets */}
              <svg className="absolute top-3 left-3 pointer-events-none" width="22" height="22" viewBox="0 0 22 22" fill="none">
                <path d="M1,12 L1,1 L12,1" stroke="#C7984F" strokeWidth="1.2" opacity="0.55"/>
                <path d="M1,5 L1,1 L5,1"  stroke="#C7984F" strokeWidth="2"   opacity="0.75" strokeLinecap="round"/>
                <circle cx="12" cy="1" r="1.2" fill="#8FAE7E" opacity="0.5"/>
              </svg>
              <svg className="absolute top-3 right-3 pointer-events-none" width="22" height="22" viewBox="0 0 22 22" fill="none" style={{ transform:'scaleX(-1)' }}>
                <path d="M1,12 L1,1 L12,1" stroke="#C7984F" strokeWidth="1.2" opacity="0.55"/>
                <path d="M1,5 L1,1 L5,1"  stroke="#C7984F" strokeWidth="2"   opacity="0.75" strokeLinecap="round"/>
                <circle cx="12" cy="1" r="1.2" fill="#8FAE7E" opacity="0.5"/>
              </svg>
              <svg className="absolute bottom-3 left-3 pointer-events-none" width="22" height="22" viewBox="0 0 22 22" fill="none" style={{ transform:'scaleY(-1)' }}>
                <path d="M1,12 L1,1 L12,1" stroke="#C7984F" strokeWidth="1.2" opacity="0.35"/>
                <path d="M1,5 L1,1 L5,1"  stroke="#C7984F" strokeWidth="2"   opacity="0.5"  strokeLinecap="round"/>
              </svg>
              <svg className="absolute bottom-3 right-3 pointer-events-none" width="22" height="22" viewBox="0 0 22 22" fill="none" style={{ transform:'scale(-1,-1)' }}>
                <path d="M1,12 L1,1 L12,1" stroke="#C7984F" strokeWidth="1.2" opacity="0.35"/>
                <path d="M1,5 L1,1 L5,1"  stroke="#C7984F" strokeWidth="2"   opacity="0.5"  strokeLinecap="round"/>
              </svg>

              <div className="relative px-6 md:px-10 py-5">
                {/* Ornamental rule with diamond + green dots */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex-1 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(143,174,126,0.4), rgba(199,152,79,0.5))' }}/>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8FAE7E] opacity-70"/>
                  <svg width="7" height="7" viewBox="0 0 7 7"><polygon points="3.5,0 7,3.5 3.5,7 0,3.5" fill="#C7984F" opacity="0.85"/></svg>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8FAE7E] opacity-70"/>
                  <div className="flex-1 h-px" style={{ background: 'linear-gradient(to left, transparent, rgba(143,174,126,0.4), rgba(199,152,79,0.5))' }}/>
                </div>

                {/* Title with green micro-label above */}
                <p className="text-[10px] tracking-[0.3em] uppercase mb-1 opacity-50"
                  style={{ fontFamily: "'Cormorant Garamond', serif", color: '#8FAE7E' }}
                >
                  Project
                </p>
                <h3
                  className="text-base md:text-lg font-bold tracking-wide"
                  style={{ fontFamily: "'Playfair Display SC', serif", textShadow: '0 2px 12px rgba(199,152,79,0.25)' }}
                >
                  {project.title}
                </h3>

                {/* Three-part divider: green line — gold diamond — green line */}
                <div className="flex items-center gap-2 my-3">
                  <div className="flex-1 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(143,174,126,0.5))' }}/>
                  <svg width="6" height="6" viewBox="0 0 6 6"><polygon points="3,0 6,3 3,6 0,3" fill="#C7984F" opacity="0.6"/></svg>
                  <div className="flex-1 h-px" style={{ background: 'linear-gradient(to left, transparent, rgba(143,174,126,0.5))' }}/>
                </div>

                <p className="text-[#F5F0EB]/75 text-[0.93rem] leading-relaxed"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  {project.description}
                </p>

                {/* Visit arrow */}
                <motion.div
                  className="mt-4 flex items-center justify-center gap-2"
                  style={{ fontFamily: "'Cormorant Garamond', serif", letterSpacing: '0.14em', color: '#C7984F' }}
                  animate={hovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="h-px w-5" style={{ background: 'linear-gradient(to right, rgba(143,174,126,0.4), rgba(199,152,79,0.6))' }}/>
                  <span className="text-[10px] tracking-widest uppercase">Visit Site</span>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                  <div className="h-px w-5" style={{ background: 'linear-gradient(to left, rgba(143,174,126,0.4), rgba(199,152,79,0.6))' }}/>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Holographic overlay */}
          <div
            ref={holoRef}
            className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-300"
            style={{
              opacity: 0,
              background: 'radial-gradient(circle at var(--mx, 50%) var(--my, 50%), rgba(240,215,140,0.2) 0%, rgba(143,174,126,0.1) 30%, rgba(199,152,79,0.06) 55%, transparent 75%)',
              mixBlendMode: 'screen',
            } as React.CSSProperties}
          />

          {/* Standard glare */}
          <motion.div
            className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{
              background: 'linear-gradient(135deg, rgba(240,215,140,1) 0%, transparent 60%)',
              opacity: glareOpacity,
            }}
          />
        </motion.div>
      </a>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <div id="projects" className="relative z-10 flex items-center justify-center py-24 px-4">
      <motion.div
        className="w-full max-w-6xl"
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Section heading */}
        <div className="text-center mb-12 relative">
          <h2
            className="text-3xl md:text-4xl font-extrabold text-[#3B2A1A] tracking-wide inline-block pb-3"
            style={{ fontFamily: "'Playfair Display SC', serif" }}
          >
            Projects
          </h2>
          <motion.div
            className="mx-auto h-[3px] rounded-full"
            style={{ background: 'linear-gradient(to right, transparent, #4A5E3A, #C7984F, #4A5E3A, transparent)' }}
            initial={{ width: 0 }}
            whileInView={{ width: '100%' }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
          />
          <motion.div
            className="mx-auto h-[1px] mt-1"
            style={{ background: 'linear-gradient(to right, transparent, rgba(199,152,79,0.4), transparent)' }}
            initial={{ width: 0 }}
            whileInView={{ width: '60%' }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index}/>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
