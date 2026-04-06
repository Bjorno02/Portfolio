import { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, animate } from 'framer-motion';

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

// ─── Vine Loop Connector ──────────────────────────────────────────────────

function VineConnector() {
    return (
        <div
            className="flex-shrink-0 flex items-center justify-center"
            style={{ width: 120, height: 260 }}
        >
            <div className="flex flex-col items-center gap-2">
                <svg width="60" height="100" viewBox="0 0 60 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Main looping vine path */}
                    <path
                        d="M30,6 C54,6 56,46 30,50 C4,54 4,90 30,94"
                        stroke="#C7984F" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.65"
                    />
                    {/* Arrowhead at top (re-entry point) */}
                    <path
                        d="M23,12 L30,4 L37,12"
                        stroke="#C7984F" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.8"
                    />
                    {/* Leaf at the middle bulge */}
                    <path
                        d="M30,50 C37,42 46,45 44,52 C42,59 32,57 30,50Z"
                        fill="#C7984F" stroke="#C7984F" strokeWidth="0.8" opacity="0.28"
                    />
                    {/* Small leaf other side */}
                    <path
                        d="M30,50 C23,42 14,45 16,52 C18,59 28,57 30,50Z"
                        fill="#C7984F" stroke="#C7984F" strokeWidth="0.8" opacity="0.2"
                    />
                    {/* Dot at bottom (entry into first card) */}
                    <circle cx="30" cy="94" r="3" fill="#C7984F" opacity="0.55"/>
                    {/* Small accent dots along the stem */}
                    <circle cx="30" cy="24" r="1.5" fill="#C7984F" opacity="0.35"/>
                    <circle cx="30" cy="74" r="1.5" fill="#C7984F" opacity="0.35"/>
                    {/* Diamond at midpoint */}
                    <path d="M27,50 L30,46 L33,50 L30,54 Z" fill="#C7984F" opacity="0.5"/>
                </svg>
                <span
                    style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: '0.6rem',
                        color: '#3B2A1A',
                        opacity: 0.4,
                        letterSpacing: '0.28em',
                        textTransform: 'uppercase',
                    }}
                >
                    continues
                </span>
            </div>
        </div>
    );
}

// ─── Shared Card Component ────────────────────────────────────────────────

function ExCard({ exp, style }: { exp: typeof experiences[0]; style?: React.CSSProperties }) {
    const [hovered, setHovered] = useState(false);
    const active = hovered;
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
                    background: active
                        ? 'linear-gradient(145deg, #F0D78C, #C7984F, #8FAE7E, #C7984F, #F0D78C)'
                        : 'linear-gradient(145deg, #C7984F 0%, #8B6914 60%, #C7984F 100%)',
                    opacity: active ? 1 : 0.75,
                    animation: active ? 'borderSpin 3s linear infinite' : 'none',
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

            {/* Date banner */}
            <div className="relative overflow-hidden"
                style={{
                    background: 'linear-gradient(to right, #2A1C0E, #3B2A1A, #4E3828, #3B2A1A, #2A1C0E)',
                    padding: '10px 16px',
                }}>
                <div className="absolute inset-x-0 top-0 h-px"
                    style={{ background: 'linear-gradient(to right, transparent, rgba(240,215,140,0.5), transparent)' }}/>
                <div className="flex items-center justify-center gap-3">
                    <svg width="44" height="10" viewBox="0 0 44 10" fill="none">
                        <line x1="0" y1="5" x2="44" y2="5" stroke="#C7984F" strokeWidth="0.8" opacity="0.5"/>
                        <circle cx="10" cy="5" r="1.8" fill="#C7984F" opacity="0.6"/>
                        <circle cx="22" cy="5" r="2.5" fill="#C7984F" opacity="0.8"/>
                        <circle cx="34" cy="5" r="1.8" fill="#C7984F" opacity="0.6"/>
                    </svg>
                    <span
                        className="whitespace-nowrap"
                        style={{
                            fontFamily: "'Cormorant Garamond', serif",
                            fontWeight: 700,
                            fontSize: '0.95rem',
                            color: '#F0D78C',
                            textShadow: '0 0 18px rgba(240,215,140,0.6), 0 1px 4px rgba(0,0,0,0.4)',
                            letterSpacing: '0.22em',
                            textTransform: 'uppercase',
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

            {/* Card body */}
            <div className="relative px-5 pt-3 pb-3 text-[#3B2A1A]">
                {/* Corner brackets */}
                <div className="absolute top-3 left-3 w-4 h-4 border-t border-l border-[#C7984F]/50 pointer-events-none"/>
                <div className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-[#C7984F]/50 pointer-events-none"/>

                <h3 className="font-bold tracking-wide leading-tight mb-1.5"
                    style={{ fontFamily: "'Playfair Display SC', serif", fontSize: '1rem', color: '#2A1C0E' }}>
                    {exp.title}
                </h3>

                <div className="mb-2 h-px" style={{ background: 'linear-gradient(to right, #C7984F, rgba(199,152,79,0.2), transparent)' }}/>

                <p className="text-[#7A5F3A] italic leading-snug mb-1.5"
                    style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '0.82rem', fontWeight: 600 }}>
                    {exp.tech}
                </p>

                <p className="text-[#3B2A1A]/80 leading-relaxed"
                    style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '0.88rem' }}>
                    {exp.description}
                </p>

                <div className="mt-2 flex items-center gap-2">
                    <div className="flex-1 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(199,152,79,0.35))' }}/>
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <polygon points="5,0 10,5 5,10 0,5" fill="#C7984F" opacity="0.45"/>
                    </svg>
                    <div className="flex-1 h-px" style={{ background: 'linear-gradient(to left, transparent, rgba(199,152,79,0.35))' }}/>
                </div>
            </div>

            {/* Dog-ear */}
            <div className="absolute top-0 right-0 pointer-events-none">
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                    <path d="M22,0 L22,22 L0,0 Z" fill="#C7984F" opacity="0.18"/>
                    <path d="M22,0 L0,0 L22,22" stroke="#C7984F" strokeWidth="0.6" opacity="0.3"/>
                </svg>
            </div>

            {/* Hover glow */}
            <div className="absolute inset-0 rounded-xl pointer-events-none transition-opacity duration-300"
                style={{
                    opacity: active ? 1 : 0,
                    background: 'radial-gradient(ellipse at 50% 0%, rgba(240,215,140,0.12) 0%, transparent 70%)',
                }}
            />
        </div>
    );
}

// ─── Desktop: Drag Carousel ───────────────────────────────────────────────

const CARD_WIDTH = 300;
const CARD_GAP = 24;
const CONNECTOR_WIDTH = 120;
const CARD_STRIDE = CARD_WIDTH + CARD_GAP;
const CONNECTOR_STRIDE = CONNECTOR_WIDTH + CARD_GAP;
const SET_WIDTH = experiences.length * CARD_STRIDE + CONNECTOR_STRIDE;

type CarouselItem =
    | { type: 'card'; exp: typeof experiences[0]; uid: string }
    | { type: 'connector'; uid: string };

function buildSet(suffix: string): CarouselItem[] {
    return [
        ...experiences.map((exp, i) => ({ type: 'card' as const, exp, uid: `${suffix}-${i}` })),
        { type: 'connector' as const, uid: `conn-${suffix}` },
    ];
}

const ALL_ITEMS: CarouselItem[] = [...buildSet('a'), ...buildSet('b'), ...buildSet('c')];

// Vine-styled arrow button for the header
function VineArrow({ direction, onClick, hovered }: { direction: 'left' | 'right'; onClick: () => void; hovered: boolean }) {
    const isLeft = direction === 'left';
    const c = hovered ? '#F0D78C' : '#C7984F';
    return (
        <motion.button
            onClick={onClick}
            style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
            whileTap={{ scale: 0.88 }}
        >
            <svg
                width="64" height="26" viewBox="0 0 64 26" fill="none"
                style={{ transform: isLeft ? 'scaleX(-1)' : 'none', display: 'block' }}
            >
                {/* Vine stem */}
                <path d="M4,13 C16,10 32,16 54,13"
                    stroke={c} strokeWidth="2" strokeLinecap="round" fill="none"
                    style={{ transition: 'stroke 0.18s' }}/>
                {/* Arrowhead */}
                <path d="M47,8 L56,13 L47,18"
                    stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"
                    style={{ transition: 'stroke 0.18s' }}/>
                {/* Leaf */}
                <path d="M26,13 C26,7 33,7 32,13Z"
                    fill={c} opacity={hovered ? 0.7 : 0.5}
                    style={{ transition: 'all 0.18s' }}/>
                {/* Start dot */}
                <circle cx="4" cy="13" r="2.5"
                    fill={c} opacity={hovered ? 0.9 : 0.65}
                    style={{ transition: 'all 0.18s' }}/>
            </svg>
        </motion.button>
    );
}

function ArrowPill({ onPrev, onNext }: { onPrev: () => void; onNext: () => void }) {
    const [leftHov, setLeftHov] = useState(false);
    const [rightHov, setRightHov] = useState(false);
    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            background: 'linear-gradient(to right, #2A1C0E, #3B2A1A, #2A1C0E)',
            border: '1.5px solid rgba(199,152,79,0.55)',
            borderRadius: 999,
            padding: '10px 18px',
            boxShadow: '0 4px 16px rgba(59,42,26,0.45), inset 0 1px 0 rgba(240,215,140,0.08)',
        }}>
            <div style={{ display: 'flex', alignItems: 'center' }} onMouseEnter={() => setLeftHov(true)} onMouseLeave={() => setLeftHov(false)}>
                <VineArrow direction="left" onClick={onPrev} hovered={leftHov} />
            </div>
            <div style={{ width: 1, height: 18, background: 'rgba(199,152,79,0.3)', flexShrink: 0 }}/>
            <div style={{ display: 'flex', alignItems: 'center' }} onMouseEnter={() => setRightHov(true)} onMouseLeave={() => setRightHov(false)}>
                <VineArrow direction="right" onClick={onNext} hovered={rightHov} />
            </div>
        </div>
    );
}

function DesktopExperience() {
    const x = useMotionValue(-SET_WIDTH);
    const wheelRef = useRef<HTMLDivElement>(null);
    const animationRef = useRef<ReturnType<typeof animate> | null>(null);
    const targetXRef = useRef(-SET_WIDTH);

    // Continuously normalize x to stay in the middle-set range — seamless loop
    useEffect(() => {
        return x.on('change', (val) => {
            if (val > -SET_WIDTH * 0.5) {
                const next = val - SET_WIDTH;
                targetXRef.current = next;
                x.set(next);
            } else if (val < -SET_WIDTH * 1.5) {
                const next = val + SET_WIDTH;
                targetXRef.current = next;
                x.set(next);
            }
        });
    }, [x]);

    const springTo = (target: number) => {
        animationRef.current?.stop();
        targetXRef.current = target;
        animationRef.current = animate(x, target, {
            type: 'spring',
            stiffness: 220,
            damping: 32,
            mass: 0.8,
        });
    };

    const goNext = () => springTo(targetXRef.current - CARD_STRIDE);
    const goPrev = () => springTo(targetXRef.current + CARD_STRIDE);

    // Wheel → horizontal pan: trackpad swipe OR Shift+scroll
    useEffect(() => {
        const el = wheelRef.current;
        if (!el) return;

        const handleWheel = (e: WheelEvent) => {
            const isHorizontal = Math.abs(e.deltaX) > Math.abs(e.deltaY);
            const isShiftScroll = e.shiftKey && Math.abs(e.deltaY) > 0;

            if (!isHorizontal && !isShiftScroll) return;

            e.preventDefault();
            animationRef.current?.stop();

            const delta = isHorizontal ? e.deltaX : e.deltaY;
            const newTarget = targetXRef.current - delta;
            targetXRef.current = newTarget;
            x.set(newTarget);
        };

        el.addEventListener('wheel', handleWheel, { passive: false });
        return () => el.removeEventListener('wheel', handleWheel);
    }, [x]);

    return (
        <div
            className="relative sticky top-[72px] flex flex-col"
            style={{ height: 'calc(100vh - 72px)', overflow: 'hidden' }}
        >
            {/* ── Section header — absolutely positioned ── */}
            <div className="absolute left-16 right-16 z-10 flex items-center justify-between" style={{ top: '9%' }}>
                {/* Title */}
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

                {/* Vine arrows — center, in a dark pill */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                >
                    <ArrowPill onPrev={goPrev} onNext={goNext} />
                </motion.div>

                {/* Hint text — right */}
                <motion.div
                    className="text-right leading-relaxed"
                    style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '0.8rem', color: '#5C3D22', letterSpacing: '0.04em' }}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 }}
                >
                    <div>trackpad — swipe horizontally</div>
                    <div>mouse — hold <span style={{ fontStyle: 'normal', background: 'rgba(92,61,34,0.12)', borderRadius: 3, padding: '0 5px', fontSize: '0.75rem', fontWeight: 600 }}>Shift</span> + scroll</div>
                </motion.div>
            </div>

            {/* ── Scroll carousel ── */}
            <div
                ref={wheelRef}
                className="flex-1 relative"
                style={{ overflow: 'hidden' }}
            >
                <motion.div
                    style={{
                        x,
                        display: 'flex',
                        alignItems: 'center',
                        height: '100%',
                        gap: CARD_GAP,
                        paddingLeft: 64,
                        paddingRight: 80,
                    }}
                >
                    {ALL_ITEMS.map((item) =>
                        item.type === 'connector' ? (
                            <VineConnector key={item.uid} />
                        ) : (
                            <motion.div
                                key={item.uid}
                                style={{
                                    width: CARD_WIDTH,
                                    height: 260,
                                    flexShrink: 0,
                                    borderRadius: '0.75rem',
                                    boxShadow: '0 10px 36px rgba(59,42,26,0.45), 0 2px 8px rgba(59,42,26,0.3)',
                                }}
                                whileHover={{
                                    y: -8,
                                    boxShadow: '0 22px 55px rgba(59,42,26,0.55), 0 0 22px rgba(199,152,79,0.25)',
                                    transition: { duration: 0.25 },
                                }}
                            >
                                <ExCard exp={item.exp} style={{ height: '100%' }}/>
                            </motion.div>
                        )
                    )}
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
                        <ExCard exp={exp} />
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

// ─── Main Component ───────────────────────────────────────────────────────

export default function Experience() {
    return (
        <section
            id="experience"
            className="relative bg-[#D9B97A] md:h-screen"
        >
            {/* Parchment grain */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.85]" xmlns="http://www.w3.org/2000/svg">
                <filter id="exp-bg-grain">
                    <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/>
                </filter>
                <rect width="100%" height="100%" filter="url(#exp-bg-grain)"/>
            </svg>

            {/* Desktop drag carousel */}
            <div className="hidden md:block h-full">
                <DesktopExperience />
            </div>

            {/* Mobile vertical stack */}
            <div className="md:hidden">
                <MobileExperience />
            </div>
        </section>
    );
}
