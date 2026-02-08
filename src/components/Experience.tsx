import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, MotionValue } from 'framer-motion';

const experiences = [
    {
        title: 'The Battle Lab',
        tech: 'React · Pokemon API · Render · Python · Cursor · Flask',
        description: 'Competitive Pokemon team analysis based on a weighted replacement system.',
        date: 'March 2025',
    },
    {
        title: 'Machine Learning March Madness Victor Prediction',
        tech: 'Python · Feature Engineering · Logistic Regression · Random Forest · Kaggle',
        description: 'Group project utilizing machine learning in order to predict the winner of the annual March Madness NCAA basketball tournament.',
        date: 'May 2025',
    },
    {
        title: 'Boston College Graduation',
        tech: 'B.A. Computer Science',
        description: 'Graduated from Boston College. Relevant courses include Data Structures and Algorithms, Discrete Math, Economics and Computation, Algorithms, Computer Systems, and Computer Organization.',
        date: 'August 2021 – May 2025',
    },
    {
        title: 'BST Jiu-Jitsu Website',
        tech: 'React · Vercel · Next.js · TypeScript',
        description: 'First client site, entirely covered design to deployment.',
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
        description: 'From nothing to deployment creating websites for local businesses to stay busy and learn how to translate user requirements to real, working products.',
        date: 'December 2025 - Present',
    },
];

// Stacked state offsets (% of card dimensions)
const STACK_OFFSETS = [
    { x: 105,  y: 160,  rotate: -5, scale: 0.88 },
    { x: -105, y: 110,  rotate: 4,  scale: 0.90 },
    { x: 105,  y: 30,   rotate: -2, scale: 0.94 },
    { x: -105, y: -30,  rotate: 3,  scale: 0.93 },
    { x: 105,  y: -110, rotate: -4, scale: 0.89 },
    { x: -105, y: -160, rotate: 5,  scale: 0.87 },
];

// --- Animation Hook ---

function useCardAnimations(scrollYProgress: MotionValue<number>) {
    const raw0 = useTransform(scrollYProgress, [0.08, 0.26], [0, 1]);
    const raw1 = useTransform(scrollYProgress, [0.14, 0.32], [0, 1]);
    const raw2 = useTransform(scrollYProgress, [0.20, 0.38], [0, 1]);
    const raw3 = useTransform(scrollYProgress, [0.26, 0.44], [0, 1]);
    const raw4 = useTransform(scrollYProgress, [0.32, 0.50], [0, 1]);
    const raw5 = useTransform(scrollYProgress, [0.38, 0.56], [0, 1]);

    const spring = { stiffness: 80, damping: 20 };
    return [
        useSpring(raw0, spring), useSpring(raw1, spring),
        useSpring(raw2, spring), useSpring(raw3, spring),
        useSpring(raw4, spring), useSpring(raw5, spring),
    ];
}

// --- Sub-components ---

function TimelineCard({ exp, progress, offset }: {
    exp: (typeof experiences)[0];
    progress: MotionValue<number>;
    offset: (typeof STACK_OFFSETS)[0];
}) {
    const x = useTransform(progress, (p: number) => `${offset.x * (1 - p)}%`);
    const y = useTransform(progress, (p: number) => `${offset.y * (1 - p)}%`);
    const rotate = useTransform(progress, (p: number) => offset.rotate * (1 - p));
    const scale = useTransform(progress, (p: number) => offset.scale + (1 - offset.scale) * p);
    const opacity = useTransform(progress, [0, 0.3], [0.4, 1]);

    return (
        <motion.div
            style={{ x, y, rotate, scale, opacity }}
            className="relative z-20 bg-gradient-to-br from-[#F5F0EB] to-[#E8DFD0] border-[3px] border-[#C7984F] rounded-xl shadow-[0_8px_32px_rgba(59,42,26,0.35),0_2px_8px_rgba(199,152,79,0.25)] px-7 py-6 font-serif text-[#3B2A1A] overflow-hidden before:absolute before:inset-0 before:rounded-xl before:shadow-[inset_0_2px_12px_rgba(199,152,79,0.15),inset_0_0_30px_rgba(139,115,85,0.1)] before:pointer-events-none will-change-transform"
        >
            {/* Gold accent stripe top */}
            <div className="absolute top-0 left-6 right-6 h-[2px] bg-gradient-to-r from-transparent via-[#C7984F]/50 to-transparent" />
            <h3 className="text-xl font-bold pb-2 border-b-2 border-[#C7984F]/60 relative">
                {exp.title}
            </h3>
            <p className="text-sm text-[#8B7355] italic mt-2 relative">
                {exp.tech}
            </p>
            <p className="text-sm text-[#3B2A1A]/80 mt-1 leading-relaxed relative">
                {exp.description}
            </p>
            {/* Gold accent stripe bottom */}
            <div className="absolute bottom-0 left-6 right-6 h-[2px] bg-gradient-to-r from-transparent via-[#C7984F]/30 to-transparent" />
        </motion.div>
    );
}

function TimelineDate({ date, progress, side }: {
    date: string;
    progress: MotionValue<number>;
    side: 'left' | 'right';
}) {
    const opacity = useTransform(progress, [0.2, 0.6], [0, 1]);
    const x = useTransform(progress, (p: number) => {
        const offset = side === 'left' ? -20 : 20;
        return `${offset * (1 - p)}px`;
    });

    return (
        <motion.div
            style={{ opacity, x }}
            className={`flex items-center ${side === 'left' ? 'justify-end pr-4' : 'justify-start pl-4'}`}
        >
            <p className="text-base font-serif font-bold text-[#3B2A1A] tracking-wide whitespace-nowrap">
                {date}
            </p>
        </motion.div>
    );
}

function TimelineNode({ progress, side }: {
    progress: MotionValue<number>;
    side: 'left' | 'right';
}) {
    const dotScale = useTransform(progress, [0, 0.4], [0, 1]);
    const connectorScale = useTransform(progress, [0.1, 0.5], [0, 1]);

    return (
        <div className="flex items-center justify-center relative h-full min-h-[24px]">
            {/* Connector line from dot toward card */}
            <motion.div
                className="absolute top-1/2 -translate-y-1/2 h-[2px] bg-[#C7984F]/50"
                style={{
                    left: side === 'left' ? 0 : '50%',
                    right: side === 'left' ? '50%' : 0,
                    scaleX: connectorScale,
                    transformOrigin: side === 'left' ? 'right' : 'left',
                }}
            />
            {/* Dot */}
            <motion.div
                className="w-6 h-6 rounded-full bg-gradient-to-br from-[#F0D78C] to-[#8B6914] border-[3px] border-[#F5F0EB] shadow-[0_0_16px_rgba(199,152,79,0.7),0_0_4px_rgba(199,152,79,0.9)] z-10"
                style={{ scale: dotScale }}
            />
        </div>
    );
}

// --- Main Component ---

export default function Experience() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'end start'],
    });

    const progresses = useCardAnimations(scrollYProgress);

    // Timeline line grows downward
    const lineRevealRaw = useTransform(scrollYProgress, [0.05, 0.60], [0, 100]);
    const lineReveal = useSpring(lineRevealRaw, { stiffness: 100, damping: 30 });
    const lineClip = useTransform(lineReveal, (v: number) => `inset(0 0 ${100 - v}% 0)`);

    return (
        <section
            id="experience"
            ref={sectionRef}
            className="relative bg-[#D9B97A] pt-20 pb-32 px-4 overflow-hidden"
        >
            {/* Parchment grain texture */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.9]" xmlns="http://www.w3.org/2000/svg">
                <filter id="grain">
                    <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
                </filter>
                <rect width="100%" height="100%" filter="url(#grain)" />
            </svg>

            <motion.h2
                className="relative text-center text-4xl font-extrabold pb-6 border-b-4 font-serif border-[#4A5E3A] text-[#3B2A1A] mb-16 mx-auto max-w-3xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
            >
                Experience
            </motion.h2>

            <div className="relative max-w-5xl mx-auto">
                {/* Timeline glow */}
                <motion.div
                    className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-10 bg-[#C7984F]/10 blur-lg rounded-full"
                    style={{ clipPath: lineClip }}
                />
                {/* Timeline line — bordered gold channel */}
                <motion.div
                    className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-3 rounded-full border border-[#C7984F]/70 bg-gradient-to-r from-[#9A7B2F] via-[#F0D78C]/40 to-[#9A7B2F]"
                    style={{ clipPath: lineClip }}
                />

                {/* Timeline rows */}
                <div className="relative flex flex-col gap-14">
                    {experiences.map((exp, i) => {
                        const isLeft = i % 2 === 0;
                        return (
                            <div
                                key={exp.title}
                                className="grid grid-cols-[1fr_56px_1fr] items-center"
                                style={{ zIndex: experiences.length - i }}
                            >
                                {/* Left cell */}
                                <div>
                                    {isLeft ? (
                                        <TimelineCard
                                            exp={exp}
                                            progress={progresses[i]}
                                            offset={STACK_OFFSETS[i]}
                                        />
                                    ) : (
                                        <TimelineDate
                                            date={exp.date}
                                            progress={progresses[i]}
                                            side="left"
                                        />
                                    )}
                                </div>

                                {/* Center: dot + connector */}
                                <TimelineNode
                                    progress={progresses[i]}
                                    side={isLeft ? 'left' : 'right'}
                                />

                                {/* Right cell */}
                                <div>
                                    {!isLeft ? (
                                        <TimelineCard
                                            exp={exp}
                                            progress={progresses[i]}
                                            offset={STACK_OFFSETS[i]}
                                        />
                                    ) : (
                                        <TimelineDate
                                            date={exp.date}
                                            progress={progresses[i]}
                                            side="right"
                                        />
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
