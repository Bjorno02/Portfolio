import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

const projects = [
  {
    title: 'Combat Zone MMA',
    url: 'https://czmma.com',
    description: 'Website for Combat Zone MMA, an organization owned by UFC vet Calvin Kattar',
    image: '/screenshots/combatzone.png',
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
      <div className="relative w-full overflow-hidden bg-white" style={{ aspectRatio: '16 / 9' }}>
        <img src={image} alt={`${title} preview`} className="w-full h-full object-cover object-top"/>
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
    </div>
  );
}

// 3-D tilt wrapper
function TiltCard({ children }: { children: React.ReactNode }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const rotateX = useSpring(rawX, { stiffness: 260, damping: 30 });
  const rotateY = useSpring(rawY, { stiffness: 260, damping: 30 });
  const glareOpacity = useTransform(rawY, [-6, 6], [0.08, 0.02]);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    rawX.set(((e.clientY - cy) / (rect.height / 2)) * -5);
    rawY.set(((e.clientX - cx) / (rect.width / 2)) * 5);
  };

  const onMouseLeave = () => { rawX.set(0); rawY.set(0); };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', transformPerspective: 800 }}
      className="relative h-full"
    >
      {children}
      {/* Glare overlay */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, rgba(240,215,140,1) 0%, transparent 60%)',
          opacity: glareOpacity,
        }}
      />
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
        <h2
          className="text-center text-3xl md:text-4xl font-extrabold pb-6 border-b-4 border-[#4A5E3A] text-[#3B2A1A] mb-12 tracking-wide"
          style={{ fontFamily: "'Playfair Display SC', serif" }}
        >
          Projects
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, y: 0, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.65, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
            >
              <a href={project.url} target="_blank" rel="noopener noreferrer" className="cursor-pointer h-full block">
                <TiltCard>
                  <div
                    className="h-full flex flex-col rounded-2xl overflow-hidden shadow-[0_8px_32px_rgba(59,42,26,0.4),0_0_0_4px_#C7984F] hover:shadow-[0_12px_40px_rgba(59,42,26,0.5),0_0_0_4px_#C7984F,0_0_30px_rgba(199,152,79,0.25)] transition-shadow duration-400"
                  >
                    {/* Browser chrome bar */}
                    <div className="bg-[#3B2A1A] px-4 py-3 flex items-center gap-2 border-b-4 border-[#C7984F] relative">
                      <span className="w-3 h-3 rounded-full bg-red-400 opacity-80"/>
                      <span className="w-3 h-3 rounded-full bg-yellow-400 opacity-80"/>
                      <span className="w-3 h-3 rounded-full bg-green-400 opacity-80"/>
                      <span
                        className="ml-3 text-xs text-[#F5F0EB]/40 truncate"
                        style={{ fontFamily: "'Cormorant Garamond', serif" }}
                      >
                        {project.url}
                      </span>
                      {/* Gold accent glow dot */}
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#C7984F] opacity-60"/>
                    </div>

                    <SitePreview url={project.url} title={project.title} image={'image' in project ? project.image : undefined}/>

                    {/* Card info footer */}
                    <div
                      className="flex-1 text-center text-base leading-relaxed border-t-4 border-[#C7984F] bg-[#4A5E3A] text-[#F5F0EB] px-6 md:px-10 py-6 relative overflow-hidden"
                    >
                      {/* Grain */}
                      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.05]" xmlns="http://www.w3.org/2000/svg">
                        <filter id={`grain-${index}`}>
                          <feTurbulence type="fractalNoise" baseFrequency="0.68" numOctaves="3" stitchTiles="stitch"/>
                        </filter>
                        <rect width="100%" height="100%" filter={`url(#grain-${index})`}/>
                      </svg>

                      <h3
                        className="relative py-2 border-b-2 border-[#C7984F]/50 text-lg font-bold tracking-wide"
                        style={{ fontFamily: "'Playfair Display SC', serif" }}
                      >
                        {project.title}
                      </h3>
                      <p
                        className="relative pt-4 text-[#F5F0EB]/85"
                        style={{ fontFamily: "'Cormorant Garamond', serif" }}
                      >
                        {project.description}
                      </p>
                    </div>
                  </div>
                </TiltCard>
              </a>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
