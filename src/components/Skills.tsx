import { motion } from 'framer-motion';

const skills = [
    { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
    { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
    { name: 'HTML', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
    { name: 'CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
    { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
    { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
    { name: 'Vite', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vitejs/vitejs-original.svg' },
    { name: 'Express', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg' },
    { name: 'Next.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg' },
    { name: 'Cursor', icon: '/Cursor.png' },
    { name: 'Claude Code', icon: '/Claude.png' },
    { name: 'Linux', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg' },
    { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
    { name: 'SQL', icon: '/SQL.png' },
    { name: 'Vercel', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg' },
];

export default function Skills() {
    return (
        <div id="skills" className="relative z-10 flex items-center justify-center py-24 px-4">
            <motion.div
                className="w-full max-w-5xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
            >
                <h2 className="text-center text-4xl font-extrabold pb-12 border-b-4 font-serif border-[#4A5E3A] text-[#3B2A1A] mb-10">Skills and Technologies</h2>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {skills.map((skill, index) => (
                        <motion.div
                            key={skill.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            whileHover={{ scale: 1.05, y: -4, zIndex: 10 }}
                            transition={{ duration: 0.4, delay: index * 0.05 }}
                            className="relative border-4 flex flex-col items-center py-4 rounded-lg bg-[#4E3828] border border-[#C7984F]"
                        >
                            <img src={skill.icon} alt={skill.name} className="w-10 h-10" />
                            <span className="text-sm text-[#F5F0EB] font-serif pt-2">{skill.name}</span>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
}
