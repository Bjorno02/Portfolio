import { motion } from 'framer-motion';
import ProjectCard, { type Project } from './ProjectCard';

const projects: Project[] = [
  {
    title: 'Fitore',
    url: 'https://fitore.vercel.app/',
    description: 'Website for Fitore, a combat sports gym operations platform.',
  },
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
];

function ArchiveLink() {
  const onClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.location.hash = '#archive';
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  return (
    <motion.div
      className="mt-14 flex justify-center"
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
    >
      <a
        href="#archive"
        onClick={onClick}
        className="group relative inline-flex items-center gap-3 px-1 py-2"
        style={{ fontFamily: "'Cormorant Garamond', serif" }}
      >
        {/* Left ornament */}
        <span className="flex items-center gap-2 opacity-70">
          <span className="block h-px w-10" style={{ background: 'linear-gradient(to right, transparent, rgba(199,152,79,0.7))' }}/>
          <svg width="6" height="6" viewBox="0 0 6 6"><polygon points="3,0 6,3 3,6 0,3" fill="#C7984F"/></svg>
        </span>

        <span
          className="relative italic text-base md:text-lg tracking-wide"
          style={{
            color: '#8B6914',
            backgroundImage: 'linear-gradient(90deg, #8B6914 0%, #C7984F 35%, #F0D78C 50%, #C7984F 65%, #8B6914 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textShadow: '0 1px 0 rgba(255,255,255,0.25)',
          }}
        >
          click here for some of my older projects
          <span
            className="absolute left-0 -bottom-0.5 block h-px w-full transition-all duration-300 group-hover:opacity-100"
            style={{
              background: 'linear-gradient(to right, transparent, #C7984F, transparent)',
              opacity: 0.5,
            }}
          />
        </span>

        <motion.svg
          width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C7984F" strokeWidth="2"
          className="transition-transform duration-300 group-hover:translate-x-1"
        >
          <path d="M5 12h14M12 5l7 7-7 7"/>
        </motion.svg>

        {/* Right ornament */}
        <span className="flex items-center gap-2 opacity-70">
          <svg width="6" height="6" viewBox="0 0 6 6"><polygon points="3,0 6,3 3,6 0,3" fill="#C7984F"/></svg>
          <span className="block h-px w-10" style={{ background: 'linear-gradient(to left, transparent, rgba(199,152,79,0.7))' }}/>
        </span>
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

        <ArchiveLink />
      </motion.div>
    </div>
  );
}
