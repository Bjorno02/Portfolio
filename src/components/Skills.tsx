import { motion, useAnimation } from 'framer-motion';
import { useState } from 'react';

const skills = [
  { name: 'Python',      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
  { name: 'TypeScript',  icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
  { name: 'HTML',        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
  { name: 'CSS',         icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
  { name: 'React',       icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { name: 'Node.js',     icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
  { name: 'Vite',        icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg' },
  { name: 'Express',     icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg' },
  { name: 'Next.js',     icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg' },
  { name: 'Cursor',      icon: '/Cursor.png' },
  { name: 'Claude Code', icon: '/Claude.png' },
  { name: 'Linux',       icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg' },
  { name: 'Git',         icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
  { name: 'SQL',         icon: '/SQL.png' },
  { name: 'Vercel',      icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg' },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
};

const sealVariants = {
  hidden: { opacity: 0, scale: 0, rotate: -10 },
  visible: {
    opacity: 1, scale: 1, rotate: 0,
    transition: { duration: 0.6, ease: 'backOut' as const },
  },
};

function SkillTile({ skill }: { skill: (typeof skills)[0] }) {
  const [hovered, setHovered] = useState(false);
  const shimmer = useAnimation();

  const handleHoverStart = () => {
    setHovered(true);
    shimmer.set({ x: '-140%' });
    shimmer.start({ x: '260%', transition: { duration: 0.55, ease: 'easeIn' } });
  };
  const handleHoverEnd = () => {
    setHovered(false);
    shimmer.set({ x: '-140%' });
  };

  return (
    <motion.div
      variants={sealVariants}
      onHoverStart={handleHoverStart}
      onHoverEnd={handleHoverEnd}
      whileHover={{ y: -6, scale: 1.05 }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      className="relative rounded-lg overflow-hidden"
      style={{ padding: '2px' }}
    >
      {/* Static border (non-hovered) */}
      <div
        className="absolute inset-0 rounded-lg"
        style={{
          background: 'linear-gradient(145deg, #C7984F 0%, #8B6914 50%, #C7984F 100%)',
          opacity: hovered ? 0 : 1,
          transition: 'opacity 0.2s',
        }}
      />

      {/* Rotating conic gradient border */}
      <div
        className="absolute rounded-lg overflow-hidden"
        style={{
          inset: 0,
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.2s',
        }}
      >
        <div
          style={{
            position: 'absolute',
            width: '200%',
            height: '200%',
            top: '-50%',
            left: '-50%',
            background:
              'conic-gradient(from 0deg, #3B2A1A 0deg, #C7984F 60deg, #F0D78C 110deg, #8FAE7E 160deg, #C7984F 220deg, #F0D78C 270deg, #3B2A1A 310deg, #3B2A1A 360deg)',
            animation: hovered ? 'borderSpin 2s linear infinite' : 'none',
          }}
        />
      </div>

      {/* Glow halo */}
      <div
        className="absolute -inset-[3px] rounded-lg pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(199,152,79,0.5) 0%, transparent 70%)',
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.3s',
          filter: 'blur(6px)',
        }}
      />

      {/* Inner tile */}
      <div
        className="relative rounded-md overflow-hidden flex flex-col items-center py-5 px-3"
        style={{
          background: 'linear-gradient(145deg, #57402E 0%, #4E3828 40%, #3E2D1E 100%)',
          margin: '2px',
          boxShadow: 'inset 0 2px 6px rgba(0,0,0,0.4), inset 0 -1px 3px rgba(199,152,79,0.1)',
        }}
      >
        {/* Top shine */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(to right, transparent, rgba(240,215,140,0.35), transparent)', pointerEvents: 'none' }} />

        {/* Shimmer sweep */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 3 }}>
          <motion.div
            animate={shimmer}
            style={{
              position: 'absolute',
              top: '-20%',
              left: 0,
              width: '50%',
              height: '140%',
              background: 'linear-gradient(105deg, transparent 0%, rgba(240,215,140,0.45) 50%, transparent 100%)',
              transform: 'skewX(-15deg)',
            }}
          />
        </div>

        {/* Corner brackets */}
        {[
          { top: 4, left: 4,  borderTop: true,  borderLeft: true  },
          { top: 4, right: 4, borderTop: true,  borderRight: true },
          { bottom: 4, left: 4,  borderBottom: true, borderLeft: true  },
          { bottom: 4, right: 4, borderBottom: true, borderRight: true },
        ].map((pos, i) => (
          <div key={i} style={{
            position: 'absolute',
            width: 8, height: 8,
            ...pos,
            borderTop:    pos.borderTop    ? '1px solid rgba(199,152,79,0.45)' : undefined,
            borderLeft:   pos.borderLeft   ? '1px solid rgba(199,152,79,0.45)' : undefined,
            borderRight:  pos.borderRight  ? '1px solid rgba(199,152,79,0.45)' : undefined,
            borderBottom: pos.borderBottom ? '1px solid rgba(199,152,79,0.45)' : undefined,
            pointerEvents: 'none',
          }} />
        ))}

        <motion.img
          src={skill.icon} alt={skill.name}
          className="relative w-10 h-10"
          style={{ zIndex: 2 }}
          animate={hovered ? { scale: 1.2, rotate: 8 } : { scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 18 }}
        />
        <span
          className="relative text-[11px] md:text-xs text-[#F5F0EB] mt-2.5 text-center tracking-wide leading-tight"
          style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500, zIndex: 2 }}
        >
          {skill.name}
        </span>
      </div>
    </motion.div>
  );
}

export default function Skills() {
  return (
    <div id="skills" className="relative z-10 flex items-center justify-center py-24 px-4">
      <motion.div
        className="w-full max-w-5xl"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Animated section heading */}
        <div className="text-center mb-12 relative">
          <h2
            className="text-3xl md:text-4xl font-extrabold text-[#3B2A1A] tracking-wide inline-block pb-3"
            style={{ fontFamily: "'Playfair Display SC', serif" }}
          >
            Skills &amp; Technologies
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
            whileInView={{ width: '70%' }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
          />
        </div>

        <motion.div
          className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-5"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {skills.map((skill) => (
            <SkillTile key={skill.name} skill={skill} />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
