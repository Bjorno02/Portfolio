import { useRef, useEffect, useState, useLayoutEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const experiences = [
    {
        title: 'The Battle Lab',
        tech: 'React · Pokemon API · Render · Python · Flask',
        description: 'Competitive Pokemon team analysis based on a weighted replacement system.',
        date: 'March 2025',
    },
    {
        title: 'March Madness ML',
        tech: 'Python · Feature Engineering · Logistic Regression · Random Forest · Kaggle',
        description: 'Group project utilizing machine learning to predict the winner of the NCAA basketball tournament.',
        date: 'May 2025',
    },
    {
        title: 'BC Graduation',
        tech: 'B.A. Computer Science',
        description: 'Graduated from Boston College. Coursework: Data Structures & Algorithms, Discrete Math, Algorithms, Computer Systems.',
        date: 'May 2025',
    },
    {
        title: 'BST Jiu-Jitsu',
        tech: 'React · Vercel · Next.js · TypeScript',
        description: 'First client site, entirely handled from design to deployment.',
        date: 'August 2025',
    },
    {
        title: 'Personal Learning',
        tech: 'Claude Code · Linux · Git · SQL · Vite · APIs',
        description: 'Modern development tools & workflows.',
        date: 'Fall 2025',
    },
    {
        title: 'Contract Developer',
        tech: 'React · Next.js · Vite · TypeScript · Express.js · Vercel · Resend',
        description: 'From nothing to deployment — creating websites for local businesses, translating client requirements into real products.',
        date: 'Dec 2025 – Feb 2026',
    },
    {
        title: 'Kalmus Labs',
        tech: 'React · TypeScript · Python · Zustand · Chroma · Figma · FastAPI',
        description: 'Software Engineer at a startup, working with the team to ship a demo.',
        date: 'Feb 2026 – Present',
    },
];

// ─── Shared Card Component ─────────────────────────────────────────────────

function ExCard({ exp, style }: { exp: typeof experiences[0]; style?: React.CSSProperties }) {
    const [hovered, setHovered] = useState(false);
    const grainId = `ex-grain-${exp.title.slice(0, 6).replace(/\s/g, '')}`;

    return (
        <div
            className="relative rounded-xl overflow-hidden h-full"
            style={style}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            {/* Animated border glow */}
            <div
                className="absolute -inset-[2px] rounded-xl pointer-events-none transition-opacity duration-400"
                style={{
                    background: hovered
                        ? 'linear-gradient(145deg, #F0D78C, #C7984F, #8FAE7E, #C7984F, #F0D78C)'
                        : 'linear-gradient(145deg, #C7984F 0%, #8B6914 60%, #C7984F 100%)',
                    opacity: hovered ? 1 : 0.75,
                    animation: hovered ? 'borderSpin 3s linear infinite' : 'none',
                }}
            />

            {/* Parchment bg */}
            <div
                className="absolute inset-[2px] rounded-[10px] pointer-events-none"
                style={{
                    background: 'linear-gradient(145deg, #F8F2EA 0%, #EDE0CC 40%, #E5D2B5 80%, #DBC89E 100%)',
                    boxShadow: 'inset 0 2px 20px rgba(199,152,79,0.12), inset 0 0 60px rgba(139,115,85,0.08)',
                }}
            />

            {/* Grain */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.045] rounded-xl" xmlns="http://www.w3.org/2000/svg">
                <filter id={grainId}>
                    <feTurbulence type="fractalNoise" baseFrequency="0.72" numOctaves="3" stitchTiles="stitch"/>
                </filter>
                <rect width="100%" height="100%" filter={`url(#${grainId})`}/>
            </svg>

            {/* ── Date banner — big, prominent ── */}
            <div className="relative overflow-hidden"
                style={{
                    background: 'linear-gradient(to right, #2A1C0E, #3B2A1A, #4E3828, #3B2A1A, #2A1C0E)',
                    padding: '10px 16px',
                }}>
                {/* Shimmer line */}
                <div className="absolute inset-x-0 top-0 h-px"
                    style={{ background: 'linear-gradient(to right, transparent, rgba(240,215,140,0.5), transparent)' }}/>
                {/* Ornamental side lines */}
                <div className="flex items-center justify-center gap-3">
                    <svg width="44" height="10" viewBox="0 0 44 10" fill="none">
                        <line x1="0" y1="5" x2="44" y2="5" stroke="#C7984F" strokeWidth="0.8" opacity="0.5"/>
                        <circle cx="10" cy="5" r="1.8" fill="#C7984F" opacity="0.6"/>
                        <circle cx="22" cy="5" r="2.5" fill="#C7984F" opacity="0.8"/>
                        <circle cx="34" cy="5" r="1.8" fill="#C7984F" opacity="0.6"/>
                    </svg>
                    <span
                        className="text-[#F0D78C] tracking-[0.2em] uppercase whitespace-nowrap"
                        style={{
                            fontFamily: "'Cormorant Garamond', serif",
                            fontWeight: 700,
                            fontSize: '0.95rem',
                            textShadow: '0 0 18px rgba(240,215,140,0.6), 0 1px 4px rgba(0,0,0,0.4)',
                            letterSpacing: '0.22em',
                        }}
                    >
                        {exp.date}
                    </span>
                    <svg width="44" height="10" viewBox="0 0 44 10" fill="none" style={{ transform: 'scaleX(-1)' }}>
                        <line x1="0" y1="5" x2="44" y2="5" stroke="#C7984F" strokeWidth="0.8" opacity="0.5"/>
                        <circle cx="10" cy="5" r="1.8" fill="#C7984F" opacity="0.6"/>
                        <circle cx="22" cy="5" r="2.5" fill="#C7984F" opacity="0.8"/>
                        <circle cx="34" cy="5" r="1.8" fill="#C7984F" opacity="0.6"/>
                    </svg>
                </div>
                <div className="absolute inset-x-0 bottom-0 h-px"
                    style={{ background: 'linear-gradient(to right, transparent, rgba(240,215,140,0.3), transparent)' }}/>
            </div>

            {/* ── Card body ── */}
            <div className="relative px-5 pt-3 pb-3 text-[#3B2A1A]">

                {/* Diagonal ribbon accent top-right */}
                <div className="absolute top-0 right-0 pointer-events-none overflow-hidden w-16 h-16">
                    <div style={{
                        position: 'absolute',
                        top: 8,
                        right: -18,
                        width: 60,
                        height: 1.5,
                        background: 'linear-gradient(to right, transparent, rgba(199,152,79,0.5))',
                        transform: 'rotate(45deg)',
                    }}/>
                </div>

                {/* Corner brackets */}
                <div className="absolute top-3 left-3 w-4 h-4 border-t border-l border-[#C7984F]/50 pointer-events-none"/>
                <div className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-[#C7984F]/50 pointer-events-none"/>

                {/* Title */}
                <h3
                    className="font-bold tracking-wide leading-tight mb-1.5"
                    style={{
                        fontFamily: "'Playfair Display SC', serif",
                        fontSize: '1rem',
                        color: '#2A1C0E',
                    }}
                >
                    {exp.title}
                </h3>

                {/* Separator */}
                <div className="mb-2 h-px" style={{ background: 'linear-gradient(to right, #C7984F, rgba(199,152,79,0.2), transparent)' }}/>

                {/* Tech */}
                <p
                    className="text-[#7A5F3A] italic leading-snug mb-1.5"
                    style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '0.82rem', fontWeight: 600 }}
                >
                    {exp.tech}
                </p>

                {/* Description */}
                <p
                    className="text-[#3B2A1A]/80 leading-relaxed"
                    style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '0.88rem' }}
                >
                    {exp.description}
                </p>

                {/* Bottom flourish */}
                <div className="mt-2 flex items-center gap-2">
                    <div className="flex-1 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(199,152,79,0.35))' }}/>
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <polygon points="5,0 10,5 5,10 0,5" fill="#C7984F" opacity="0.45"/>
                    </svg>
                    <div className="flex-1 h-px" style={{ background: 'linear-gradient(to left, transparent, rgba(199,152,79,0.35))' }}/>
                </div>
            </div>

            {/* Dog-ear corner fold */}
            <div className="absolute top-0 right-0 pointer-events-none">
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                    <path d="M22,0 L22,22 L0,0 Z" fill="#C7984F" opacity="0.18"/>
                    <path d="M22,0 L0,0 L22,22" stroke="#C7984F" strokeWidth="0.6" opacity="0.3"/>
                </svg>
            </div>

            {/* Hover glow overlay */}
            <div
                className="absolute inset-0 rounded-xl pointer-events-none transition-opacity duration-300"
                style={{
                    opacity: hovered ? 1 : 0,
                    background: 'radial-gradient(ellipse at 50% 0%, rgba(240,215,140,0.12) 0%, transparent 70%)',
                }}
            />
        </div>
    );
}

// ─── Desktop: Horizontal Scroll Section ───────────────────────────────────

function DesktopExperience({ sectionRef }: { sectionRef: React.RefObject<HTMLElement | null> }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [xRange, setXRange] = useState(0);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start start', 'end end'],
    });

    useEffect(() => {
        const measure = () => {
            if (containerRef.current) {
                const travel = containerRef.current.scrollWidth - window.innerWidth + 60;
                setXRange(Math.max(0, travel));
            }
        };
        measure();
        window.addEventListener('resize', measure);
        return () => window.removeEventListener('resize', measure);
    }, []);

    const smoothed = useSpring(scrollYProgress, { stiffness: 75, damping: 22 });
    const x = useTransform(smoothed, [0.04, 0.96], [0, -xRange]);
    const progressW = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

    return (
        <div className="relative sticky top-[72px] flex flex-col overflow-hidden" style={{ height: 'calc(100vh - 72px)' }}>

            {/* ── Progress bar ── */}
            <motion.div
                className="h-[3px] flex-shrink-0"
                style={{
                    width: progressW,
                    background: 'linear-gradient(to right, #C7984F, #F0D78C, #8FAE7E)',
                    transformOrigin: 'left',
                }}
            />

            {/* ── Section header — absolutely positioned, independent from cards ── */}
            <div className="absolute left-16 right-16 z-10 flex items-start justify-between" style={{ top: '9%' }}>
                <div>
                    <motion.h2
                        className="text-4xl font-extrabold text-[#3B2A1A] tracking-wide"
                        style={{ fontFamily: "'Playfair Display SC', serif" }}
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    >
                        Experience
                    </motion.h2>
                    <motion.div
                        className="mt-2 h-[3px] rounded-full"
                        style={{ background: 'linear-gradient(to right, #4A5E3A, #C7984F, transparent)' }}
                        initial={{ width: 0 }}
                        whileInView={{ width: '14rem' }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
                    />
                </div>
                <motion.p
                    className="text-[#3B2A1A]/45 text-sm italic tracking-wide mt-2"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 }}
                >
                    ← scroll to explore →
                </motion.p>
            </div>

            {/* ── Horizontally panning cards ── */}
            <div className="flex-1 relative overflow-hidden">
                <motion.div
                    ref={containerRef}
                    className="absolute inset-y-0 flex items-center gap-6 pl-16 pr-20"
                    style={{ x }}
                >
                    {experiences.map((exp) => (
                        <motion.div
                            key={exp.title}
                            className="flex-shrink-0"
                            style={{
                                width: 300,
                                height: 260,
                                borderRadius: '0.75rem',
                                boxShadow: '0 10px 36px rgba(59,42,26,0.45), 0 2px 8px rgba(59,42,26,0.3)',
                            }}
                            whileHover={{
                                y: -8,
                                boxShadow: '0 22px 55px rgba(59,42,26,0.55), 0 0 22px rgba(199,152,79,0.25)',
                                transition: { duration: 0.25 },
                            }}
                        >
                            <ExCard exp={exp} style={{ height: '100%' }}/>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

        </div>
    );
}

// ─── Mobile: Vertical Stacked ─────────────────────────────────────────────

function MobileExperience() {
    return (
        <div className="pt-20 pb-32 px-4">
            <motion.h2
                className="text-center text-3xl font-extrabold text-[#3B2A1A] mb-3 tracking-wide"
                style={{ fontFamily: "'Playfair Display SC', serif" }}
                initial={{ opacity: 0, y: -16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                Experience
            </motion.h2>
            <motion.div
                className="mx-auto mb-10 h-[3px] rounded-full"
                style={{ background: 'linear-gradient(to right, transparent, #4A5E3A, #C7984F, #4A5E3A, transparent)' }}
                initial={{ width: 0 }}
                whileInView={{ width: '80%' }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 0.2 }}
            />
            <div className="space-y-6 max-w-lg mx-auto">
                {experiences.map((exp, i) => (
                    <motion.div
                        key={exp.title}
                        initial={{ opacity: 0, y: 36, clipPath: 'inset(0 0 20% 0)' }}
                        whileInView={{ opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)' }}
                        viewport={{ once: true, margin: '-60px' }}
                        transition={{ duration: 0.65, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                        style={{ boxShadow: '0 8px 28px rgba(59,42,26,0.35)' }}
                    >
                        <ExCard exp={exp}/>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

// ─── Main Component ───────────────────────────────────────────────────────

export default function Experience() {
    const sectionRef = useRef<HTMLElement>(null);
    const [sectionHeight, setSectionHeight] = useState(`${(experiences.length + 2) * 80}vh`);

    useLayoutEffect(() => {
        const update = () => {
            if (window.innerWidth < 768) {
                setSectionHeight('auto');
            } else {
                setSectionHeight(`${(experiences.length + 2) * 80}vh`);
            }
        };
        update();
        window.addEventListener('resize', update);
        return () => window.removeEventListener('resize', update);
    }, []);

    return (
        <section
            id="experience"
            ref={sectionRef}
            className="relative bg-[#D9B97A]"
            style={{ height: sectionHeight }}
        >
            {/* Parchment grain */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.85]" xmlns="http://www.w3.org/2000/svg">
                <filter id="exp-bg-grain">
                    <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/>
                </filter>
                <rect width="100%" height="100%" filter="url(#exp-bg-grain)"/>
            </svg>

            {/* Desktop horizontal scroll */}
            <div className="hidden md:block h-full">
                <DesktopExperience sectionRef={sectionRef}/>
            </div>

            {/* Mobile vertical stack */}
            <div className="md:hidden">
                <MobileExperience/>
            </div>
        </section>
    );
}
