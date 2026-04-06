import { motion } from 'framer-motion';

const interests = [
  '🥋 Jiu-Jitsu / MMA',
  '📚 Literature & Writing',
  '🐾 Animals',
  '📜 History',
  '⚡ Pokémon',
  '🎸 Guitar',
  '🎵 Music',
];

// Pre-set rotations for the pinboard scatter — alternating directions
const ROTATIONS = [-2.5, 1.8, -1.2, 2.2, -1.8, 1.5, -2.8];

function WaxSeal({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="60" cy="60" r="56" stroke="#C7984F" strokeWidth="1.5" opacity="0.35"/>
      <circle cx="60" cy="60" r="49" stroke="#C7984F" strokeWidth="0.8" opacity="0.25"/>
      <circle cx="60" cy="60" r="42" stroke="#C7984F" strokeWidth="0.6" strokeDasharray="3 2.5" opacity="0.2"/>
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((a) => {
        const r = (Math.PI * a) / 180;
        return (
          <line key={a}
            x1={60 + 43 * Math.cos(r)} y1={60 + 43 * Math.sin(r)}
            x2={60 + 54 * Math.cos(r)} y2={60 + 54 * Math.sin(r)}
            stroke="#C7984F" strokeWidth="0.8" opacity="0.18"/>
        );
      })}
      <text x="60" y="53" textAnchor="middle" dominantBaseline="middle"
        fill="#C7984F" opacity="0.55" fontSize="20" fontWeight="700"
        style={{ fontFamily: "'Cinzel Decorative', serif" }}>B</text>
      <text x="60" y="70" textAnchor="middle" dominantBaseline="middle"
        fill="#C7984F" opacity="0.38" fontSize="8" letterSpacing="3"
        style={{ fontFamily: "'Cormorant Garamond', serif" }}>SHURDHA</text>
      <circle cx="60"  cy="4"   r="2" fill="#C7984F" opacity="0.3"/>
      <circle cx="60"  cy="116" r="2" fill="#C7984F" opacity="0.3"/>
      <circle cx="4"   cy="60"  r="2" fill="#C7984F" opacity="0.3"/>
      <circle cx="116" cy="60"  r="2" fill="#C7984F" opacity="0.3"/>
    </svg>
  );
}

export default function About() {
  return (
    <div id="about" className="relative z-10 py-20 px-4 md:px-8">
      <motion.div
        className="max-w-6xl mx-auto rounded-xl overflow-hidden"
        initial={{ opacity: 0, y: 44 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        style={{
          boxShadow:
            '0 0 0 3px #C7984F, 0 32px 80px rgba(59,42,26,0.5), -8px 10px 36px rgba(59,42,26,0.28)',
        }}
      >
        {/* ── Book spread: two pages side by side ── */}
        <div className="flex flex-col md:flex-row">

          {/* ══ LEFT PAGE — About text ══ */}
          <div className="relative flex-[3] bg-[#4E3828] text-[#F5F0EB] overflow-hidden">

            {/* Page curvature: darker near spine on the right */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#2A1D12]/30 pointer-events-none"/>

            {/* Grain texture */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.045]" xmlns="http://www.w3.org/2000/svg">
              <filter id="lp-grain">
                <feTurbulence type="fractalNoise" baseFrequency="0.68" numOctaves="4" stitchTiles="stitch"/>
              </filter>
              <rect width="100%" height="100%" filter="url(#lp-grain)"/>
            </svg>

            {/* Subtle ruled lines — decoration only */}
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i}
                className="absolute left-10 right-8 pointer-events-none"
                style={{ top: `${102 + i * 38}px`, height: '1px', background: 'rgba(199,152,79,0.07)' }}
              />
            ))}

            {/* Page header */}
            <div className="relative px-10 pt-10 pb-5 border-b border-[#C7984F]/22">
              <h2
                className="text-3xl font-extrabold tracking-wide"
                style={{ fontFamily: "'Playfair Display SC', serif" }}
              >
                About Me
              </h2>
              <div
                className="mt-2 h-px"
                style={{ width: '8rem', background: 'linear-gradient(to right, #C7984F, transparent)' }}
              />
            </div>

            {/* Text body — left aligned so the drop cap works correctly */}
            <div
              className="relative px-10 py-8 space-y-5 text-base leading-[1.9]"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              {/* Drop cap first paragraph */}
              <div className="overflow-hidden">
                <span
                  aria-hidden="true"
                  className="float-left mr-3 text-[#C7984F] font-bold leading-none select-none"
                  style={{
                    fontFamily: "'Cinzel Decorative', serif",
                    fontSize: '4.8rem',
                    lineHeight: 0.78,
                    paddingTop: '0.03em',
                    filter: 'drop-shadow(0 2px 8px rgba(199,152,79,0.45))',
                  }}
                >
                  H
                </span>
                i! My name is Bjorn Shurdha; I'm a Fullstack Software Developer based out of Boston, MA.
                I graduated from BC in May 2025 with a degree in Computer Science, and I've since been
                using programming as the medium for my love of creative expression and problem solving.
              </div>

              <p>
                My jiu-jitsu team had an extremely mediocre website, and I knew I could make a much better
                product. I took it on knowing very little about web development, and quickly learned the
                skills needed to launch the site. I received high praise in the community, and as a result,
                landed my current gigs in contract software development.
              </p>

              <p>
                From nothing to deployment — I've handled CombatZone MMA (owned by former UFC contender
                Calvin Kattar), Long Barn Hay (Chester, NH), and more. Working hands-on with clients has
                made me excel at translating user requirements into real, digital products people actually
                want to look at.
              </p>
            </div>

            {/* Corner accents */}
            <div className="absolute top-4 right-5 w-6 h-6 border-t border-r border-[#C7984F]/35 pointer-events-none"/>
            <div className="absolute bottom-4 left-5 w-6 h-6 border-b border-l border-[#C7984F]/35 pointer-events-none"/>
          </div>

          {/* ══ SPINE ══ */}
          <div className="hidden md:flex w-6 flex-col items-center bg-gradient-to-b from-[#251912] via-[#3B2A1A] to-[#251912] py-6 gap-0">
            <div className="flex-1 w-px bg-gradient-to-b from-transparent via-[#C7984F]/45 to-transparent"/>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="flex-shrink-0 my-2">
              <polygon points="6,0 12,6 6,12 0,6" fill="#C7984F" opacity="0.65"/>
            </svg>
            <div className="flex-1 w-px bg-gradient-to-b from-transparent via-[#C7984F]/45 to-transparent"/>
          </div>

          {/* ══ RIGHT PAGE — Personal Interests ══ */}
          <div className="relative flex-[2] bg-[#4A5E3A] text-[#F5F0EB] overflow-hidden">

            {/* Page curvature: darker near spine */}
            <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-[#2A3B1A]/30 pointer-events-none"/>

            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.045]" xmlns="http://www.w3.org/2000/svg">
              <filter id="rp-grain">
                <feTurbulence type="fractalNoise" baseFrequency="0.6" numOctaves="3" stitchTiles="stitch"/>
              </filter>
              <rect width="100%" height="100%" filter="url(#rp-grain)"/>
            </svg>

            {/* Page header */}
            <div className="relative px-8 pt-10 pb-5 border-b border-[#C7984F]/22">
              <h3
                className="text-2xl font-extrabold tracking-wide"
                style={{ fontFamily: "'Playfair Display SC', serif" }}
              >
                Interests
              </h3>
              <div
                className="mt-2 h-px"
                style={{ width: '6rem', background: 'linear-gradient(to right, #C7984F, transparent)' }}
              />
            </div>

            {/* Pinboard scattered badges */}
            <div className="relative px-8 py-10 flex flex-wrap gap-4 content-start">
              {interests.map((interest, i) => (
                <motion.span
                  key={interest}
                  className="inline-flex items-center bg-[#3B2A1A] rounded px-4 py-2 text-sm"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontWeight: 500,
                    border: '1.5px solid rgba(199,152,79,0.5)',
                    boxShadow: '2px 3px 10px rgba(0,0,0,0.28)',
                  }}
                  initial={{ opacity: 0, scale: 0.65, rotate: 0, y: 20 }}
                  whileInView={{
                    opacity: 1, scale: 1, y: 0,
                    rotate: ROTATIONS[i % ROTATIONS.length],
                  }}
                  whileHover={{
                    scale: 1.12, rotate: 0, y: -5,
                    boxShadow: '0 8px 22px rgba(199,152,79,0.38)',
                    borderColor: 'rgba(199,152,79,0.9)',
                  }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                >
                  {interest}
                </motion.span>
              ))}
            </div>

            {/* Wax seal watermark — bottom right */}
            <WaxSeal className="absolute bottom-3 right-3 w-24 h-24 pointer-events-none opacity-50"/>
          </div>

        </div>
      </motion.div>
    </div>
  );
}
