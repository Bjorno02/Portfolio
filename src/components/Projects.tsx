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
          {/* Outer glow ring — pulses stronger on hover */}
          <div
            className="absolute -inset-[3px] rounded-2xl pointer-events-none transition-all duration-400"
            style={{
              background: hovered
                ? 'linear-gradient(145deg, #F0D78C, #C7984F, #8FAE7E, #C7984F, #F0D78C)'
                : 'linear-gradient(145deg, #C7984F, #8B6914)',
              animation: hovered ? 'borderSpin 3s linear infinite' : 'none',
              filter: hovered ? 'blur(0px)' : 'none',
            }}
          />

          {/* Card body */}
          <div
            className="relative h-full flex flex-col rounded-2xl overflow-hidden"
            style={{
              margin: '2px',
              boxShadow: hovered
                ? '0 20px 60px rgba(59,42,26,0.55), 0 0 30px rgba(199,152,79,0.25)'
                : '0 8px 30px rgba(59,42,26,0.4)',
              transition: 'box-shadow 0.3s ease',
            }}
          >
            {/* Browser chrome */}
            <div className="bg-[#3B2A1A] px-4 py-3 flex items-center gap-2 border-b-4 border-[#C7984F] relative overflow-hidden">
              {/* Chrome shimmer */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent pointer-events-none"/>
              <span className="w-3 h-3 rounded-full bg-red-400/90    shadow-[0_0_6px_rgba(248,113,113,0.6)]"/>
              <span className="w-3 h-3 rounded-full bg-yellow-400/90 shadow-[0_0_6px_rgba(250,204,21,0.6)]"/>
              <span className="w-3 h-3 rounded-full bg-green-400/90  shadow-[0_0_6px_rgba(74,222,128,0.6)]"/>
              {/* URL bar */}
              <div className="ml-3 flex-1 bg-[#2A1D12] rounded px-3 py-1 flex items-center gap-2">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="#8FAE7E" opacity="0.6">
                  <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
                </svg>
                <span
                  className="text-[11px] text-[#F5F0EB]/38 truncate"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  {project.url}
                </span>
              </div>
              {/* Live dot */}
              <motion.span
                className="w-2 h-2 rounded-full bg-[#8FAE7E] flex-shrink-0"
                animate={{ opacity: [0.4, 1, 0.4], scale: [0.8, 1.1, 0.8] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              />
            </div>

            {/* Preview */}
            <SitePreview url={project.url} title={project.title} image={project.image}/>

            {/* Info footer */}
            <div
              className="flex-1 relative text-center border-t-4 border-[#C7984F] bg-[#4A5E3A] text-[#F5F0EB] px-6 md:px-10 py-6 overflow-hidden"
            >
              {/* Grain */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.05]" xmlns="http://www.w3.org/2000/svg">
                <filter id={`grain-p-${index}`}>
                  <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/>
                </filter>
                <rect width="100%" height="100%" filter={`url(#grain-p-${index})`}/>
              </svg>

              {/* Corner decorations */}
              <div className="absolute top-3 left-3 w-5 h-5 border-t border-l border-[#C7984F]/40 pointer-events-none"/>
              <div className="absolute top-3 right-3 w-5 h-5 border-t border-r border-[#C7984F]/40 pointer-events-none"/>

              <h3
                className="relative py-2 border-b-2 border-[#C7984F]/45 text-base md:text-lg font-bold tracking-wide"
                style={{ fontFamily: "'Playfair Display SC', serif" }}
              >
                {project.title}
              </h3>
              <p
                className="relative pt-4 text-[#F5F0EB]/82 text-base leading-relaxed"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                {project.description}
              </p>

              {/* Visit arrow */}
              <motion.div
                className="relative mt-4 flex items-center justify-center gap-1 text-[#C7984F]/60 text-sm"
                style={{ fontFamily: "'Cormorant Garamond', serif", letterSpacing: '0.1em' }}
                animate={hovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 4 }}
                transition={{ duration: 0.2 }}
              >
                <span className="text-xs tracking-widest uppercase">Visit Site</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </motion.div>
            </div>
          </div>

          {/* Holographic overlay — tracks mouse */}
          <div
            ref={holoRef}
            className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-300"
            style={{
              opacity: 0,
              background: 'radial-gradient(circle at var(--mx, 50%) var(--my, 50%), rgba(240,215,140,0.22) 0%, rgba(199,152,79,0.12) 25%, rgba(143,174,126,0.08) 50%, transparent 75%)',
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
