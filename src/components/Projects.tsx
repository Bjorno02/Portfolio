import { motion } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

const projects = [
    {
        title: 'Combat Zone MMA',
        url: 'https://github.com/Bjorno02/CombatZoneWebsite',
        description: 'Combat Zone MMA for Calvin Kattar, dropping shortly after February 21st.',
        image: '/screenshots/combatzone.png',
    },
    {
        title: 'Long Barn Hay',
        url: 'https://github.com/Bjorno02/Long-Barn-Hay',
        description: 'Long Barn Hay, dropping very soon.',
        image: '/screenshots/longbarnhay.png',
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
                <img src={image} alt={`${title} preview`} className="w-full h-full object-cover object-top" />
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

export default function Projects() {
    return (
        <div id="projects" className="relative z-10 flex items-center justify-center py-24 px-4">
            <motion.div
                className="w-full max-w-6xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
            >
                <h2 className="text-center text-4xl font-extrabold pb-12 border-b-4 font-serif border-[#8FAE7E] text-[#3B2A1A] mb-10">Projects</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {projects.map((project, index) => (
                        <a key={project.title} href={project.url} target="_blank" rel="noopener noreferrer" className="cursor-pointer h-full">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                whileHover={{ y: -4 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="h-full flex flex-col rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300 border-4 border-[#C7984F]"
                            >
                                {/* Browser window top bar */}
                                <div className="bg-[#3B2A1A] px-4 py-3 flex items-center gap-2 border-b-4 border-[#C7984F]">
                                    <span className="w-3 h-3 rounded-full bg-red-400" />
                                    <span className="w-3 h-3 rounded-full bg-yellow-400" />
                                    <span className="w-3 h-3 rounded-full bg-green-400" />
                                    <span className="ml-3 text-xs text-[#F5F0EB]/50 font-mono truncate">{project.url}</span>
                                </div>

                                <SitePreview url={project.url} title={project.title} image={'image' in project ? project.image : undefined} />

                                <div className="flex-1 text-center text-sm leading-relaxed border-t-4 border-[#C7984F] bg-[#4A5E3A] text-[#F5F0EB] px-12 py-6 font-serif">
                                    <h3 className="py-2 border-b-4 border-[#C7984F]">{project.title}</h3>
                                    <p className="pt-4">{project.description}</p>
                                </div>
                            </motion.div>
                        </a>
                    ))}
                </div>
            </motion.div>
        </div>
    );
}
