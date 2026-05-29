import { motion } from 'framer-motion';
import ProjectCard, { type Project } from './ProjectCard';

const olderProjects: Project[] = [
  {
    title: 'The Battle Lab',
    url: 'https://thebattlelab.onrender.com',
    description: 'Website for Competitive Pokemon Team Analysis.',
  },
];

function BackArrow() {
  const onClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    // Clear hash and return to projects section
    history.pushState('', document.title, window.location.pathname + window.location.search);
    window.dispatchEvent(new HashChangeEvent('hashchange'));
    setTimeout(() => {
      const target = document.getElementById('projects');
      if (target) target.scrollIntoView({ behavior: 'auto', block: 'start' });
    }, 30);
  };

  return (
    <motion.a
      href="/"
      onClick={onClick}
      className="group fixed top-6 left-6 md:top-8 md:left-8 z-50 flex items-center gap-3 px-4 py-2.5 rounded-full"
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      style={{
        fontFamily: "'Cormorant Garamond', serif",
        background: 'linear-gradient(135deg, rgba(44,24,16,0.7) 0%, rgba(38,51,24,0.7) 100%)',
        border: '1px solid rgba(199,152,79,0.35)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        boxShadow: '0 8px 24px rgba(20,12,4,0.45), inset 0 1px 0 rgba(240,215,140,0.08)',
      }}
    >
      <motion.svg
        width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C7984F" strokeWidth="2.2"
        strokeLinecap="round" strokeLinejoin="round"
        className="transition-transform duration-300 group-hover:-translate-x-1"
      >
        <path d="M19 12H5M12 19l-7-7 7-7"/>
      </motion.svg>
      <span
        className="text-[11px] uppercase"
        style={{ color: '#F0D78C', letterSpacing: '0.32em', fontWeight: 600 }}
      >
        Back
      </span>
      {/* Inner gold line */}
      <span
        aria-hidden
        className="absolute inset-x-3 -bottom-px h-px pointer-events-none opacity-60"
        style={{ background: 'linear-gradient(to right, transparent, rgba(199,152,79,0.7), transparent)' }}
      />
    </motion.a>
  );
}

function Ornament() {
  return (
    <div className="flex items-center justify-center gap-3 my-6 opacity-80">
      <span className="block h-px w-16" style={{ background: 'linear-gradient(to right, transparent, rgba(143,174,126,0.5), rgba(199,152,79,0.6))' }}/>
      <svg width="6" height="6" viewBox="0 0 6 6"><polygon points="3,0 6,3 3,6 0,3" fill="#8FAE7E" opacity="0.8"/></svg>
      <svg width="8" height="8" viewBox="0 0 8 8"><polygon points="4,0 8,4 4,8 0,4" fill="#C7984F"/></svg>
      <svg width="6" height="6" viewBox="0 0 6 6"><polygon points="3,0 6,3 3,6 0,3" fill="#8FAE7E" opacity="0.8"/></svg>
      <span className="block h-px w-16" style={{ background: 'linear-gradient(to left, transparent, rgba(143,174,126,0.5), rgba(199,152,79,0.6))' }}/>
    </div>
  );
}

export default function OlderProjects() {
  return (
    <div
      className="relative min-h-screen overflow-hidden"
      style={{
        background:
          'linear-gradient(160deg, #1E1008 0%, #2C1810 35%, #2A2418 65%, #263318 100%)',
      }}
    >
      {/* Quilt diamond pattern — subtle, matches navbar */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.05 }}>
        <defs>
          <pattern id="archive-quilt" width="22" height="22" patternUnits="userSpaceOnUse">
            <path d="M11,0 L22,11 L11,22 L0,11 Z" fill="none" stroke="#C7984F" strokeWidth="0.7"/>
            <circle cx="11" cy="11" r="1.1" fill="#C7984F" opacity="0.55"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#archive-quilt)"/>
      </svg>

      {/* Grain */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.05]">
        <filter id="archive-grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves="3" stitchTiles="stitch"/>
        </filter>
        <rect width="100%" height="100%" filter="url(#archive-grain)"/>
      </svg>

      {/* Soft gold bloom top-center */}
      <div
        className="absolute inset-x-0 top-0 h-[60vh] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% -10%, rgba(199,152,79,0.18) 0%, transparent 65%)',
        }}
      />
      {/* Green wash bottom-left */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 10% 110%, rgba(74,94,58,0.35) 0%, transparent 55%)',
        }}
      />

      <BackArrow />

      <div className="relative max-w-3xl mx-auto px-6 pt-32 pb-24 md:pt-40">
        {/* Eyebrow */}
        <motion.div
          className="flex items-center justify-center gap-3 mb-5"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <span className="block h-px w-8" style={{ background: 'linear-gradient(to right, transparent, rgba(199,152,79,0.6))' }}/>
          <span
            className="text-[10px] uppercase"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              letterSpacing: '0.42em',
              color: '#8FAE7E',
            }}
          >
            The Archive
          </span>
          <span className="block h-px w-8" style={{ background: 'linear-gradient(to left, transparent, rgba(199,152,79,0.6))' }}/>
        </motion.div>

        {/* Title */}
        <motion.h1
          className="text-center text-3xl md:text-5xl font-extrabold tracking-wide"
          style={{
            fontFamily: "'Playfair Display SC', serif",
            color: '#F0D78C',
            textShadow: '0 2px 24px rgba(199,152,79,0.25)',
          }}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          Older Projects
        </motion.h1>

        <motion.div
          className="mx-auto h-[3px] rounded-full mt-4"
          style={{
            maxWidth: 380,
            background: 'linear-gradient(to right, transparent, #4A5E3A, #C7984F, #4A5E3A, transparent)',
          }}
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: '100%', opacity: 1 }}
          transition={{ duration: 1, delay: 0.55, ease: 'easeOut' }}
        />

        {/* Header note */}
        <motion.p
          className="text-center mt-10 italic text-base md:text-lg leading-relaxed"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            color: 'rgba(245,240,235,0.8)',
            maxWidth: 620,
            margin: '40px auto 0',
          }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55 }}
        >
          "Look, I know there aren't a ton of extras, but as long as this page exists, I'm still building as we speak."
        </motion.p>

        <Ornament />

        {/* The single archive card */}
        <motion.div
          className="mt-4"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="max-w-xl mx-auto">
            {olderProjects.map((project, i) => (
              <ProjectCard key={project.title} project={project} index={i}/>
            ))}
          </div>
        </motion.div>

        {/* Footer flourish */}
        <div className="mt-16 flex flex-col items-center gap-3 opacity-70">
          <svg width="120" height="14" viewBox="0 0 120 14" fill="none">
            <path d="M0,7 Q30,1 60,7 T120,7" stroke="#C7984F" strokeWidth="1" strokeLinecap="round" opacity="0.6"/>
            <circle cx="60" cy="7" r="1.6" fill="#C7984F"/>
          </svg>
          <span
            className="text-[10px] uppercase"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              letterSpacing: '0.36em',
              color: 'rgba(143,174,126,0.7)',
            }}
          >
            More to come
          </span>
        </div>
      </div>
    </div>
  );
}
