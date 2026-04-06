import { motion } from 'framer-motion';

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

// Container variant — stagger children
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.055 } },
};

// Each seal stamps in: shrink → overshoot → settle
const sealVariants = {
  hidden: { opacity: 0, scale: 0, rotate: -8 },
  visible: {
    opacity: 1, scale: 1, rotate: 0,
    transition: { duration: 0.55, ease: 'backOut' as const },
  },
};

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
        <h2
          className="text-center text-3xl md:text-4xl font-extrabold pb-6 border-b-4 border-[#4A5E3A] text-[#3B2A1A] mb-12 tracking-wide"
          style={{ fontFamily: "'Playfair Display SC', serif" }}
        >
          Skills &amp; Technologies
        </h2>

        <motion.div
          className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-5"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {skills.map((skill) => (
            <motion.div
              key={skill.name}
              variants={sealVariants}
              whileHover={{
                scale: 1.1,
                y: -5,
                boxShadow: '0 0 24px rgba(199,152,79,0.55), 0 8px 20px rgba(59,42,26,0.45)',
                transition: { duration: 0.22, ease: 'easeOut' },
              }}
              className="relative flex flex-col items-center py-5 px-3 rounded-lg overflow-hidden"
              style={{
                background: 'linear-gradient(145deg, #57402E 0%, #4E3828 40%, #3E2D1E 100%)',
                border: '2px solid #C7984F',
                boxShadow: 'inset 0 2px 6px rgba(0,0,0,0.35), inset 0 -1px 3px rgba(199,152,79,0.12), 0 4px 12px rgba(59,42,26,0.4)',
              }}
            >
              {/* Inner highlight ring */}
              <div
                className="absolute inset-[3px] rounded-md pointer-events-none"
                style={{ border: '1px solid rgba(199,152,79,0.18)' }}
              />

              {/* Top shine stripe */}
              <div
                className="absolute top-0 left-0 right-0 h-[1px] pointer-events-none"
                style={{ background: 'linear-gradient(to right, transparent, rgba(240,215,140,0.3), transparent)' }}
              />

              <motion.img
                src={skill.icon}
                alt={skill.name}
                className="w-10 h-10 relative z-10"
                whileHover={{ scale: 1.15 }}
                transition={{ duration: 0.2 }}
              />

              <span
                className="text-[11px] md:text-xs text-[#F5F0EB] mt-2.5 text-center relative z-10 tracking-wide leading-tight"
                style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}
              >
                {skill.name}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
