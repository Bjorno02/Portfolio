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

// Decorative wax-seal SVG
function WaxSeal({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="60" cy="60" r="56" stroke="#C7984F" strokeWidth="2" opacity="0.45"/>
      <circle cx="60" cy="60" r="46" stroke="#C7984F" strokeWidth="1" opacity="0.3"/>
      <circle cx="60" cy="60" r="38" stroke="#C7984F" strokeWidth="0.8" strokeDasharray="4 3" opacity="0.25"/>
      {/* Radial rays */}
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((a) => {
        const r = Math.PI * a / 180;
        return (
          <line key={a}
            x1={60 + 40 * Math.cos(r)} y1={60 + 40 * Math.sin(r)}
            x2={60 + 54 * Math.cos(r)} y2={60 + 54 * Math.sin(r)}
            stroke="#C7984F" strokeWidth="1" opacity="0.2"/>
        );
      })}
      {/* Monogram */}
      <text x="60" y="55" textAnchor="middle" dominantBaseline="middle"
        fill="#C7984F" opacity="0.5" fontSize="18" fontWeight="700"
        style={{ fontFamily: "'Cinzel Decorative', serif" }}>
        B
      </text>
      <text x="60" y="72" textAnchor="middle" dominantBaseline="middle"
        fill="#C7984F" opacity="0.4" fontSize="9" letterSpacing="3"
        style={{ fontFamily: "'Cormorant Garamond', serif" }}>
        SHURDHA
      </text>
    </svg>
  );
}

export default function About() {
  return (
    <div id="about" className="relative z-10 flex items-center justify-center py-24 px-4">
      <motion.div
        className="w-full max-w-5xl rounded-xl overflow-hidden shadow-2xl border-4 border-[#C7984F]"
        initial={{ opacity: 0, y: 30, rotateX: 4 }}
        whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformPerspective: 1000 }}
      >

        {/* ── About body ── */}
        <div className="relative bg-[#4E3828] text-[#F5F0EB] px-6 md:px-14 py-8 border-b-4 border-[#C7984F] leading-relaxed overflow-hidden">

          {/* Background grain texture */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
            <filter id="about-grain">
              <feTurbulence type="fractalNoise" baseFrequency="0.72" numOctaves="4" stitchTiles="stitch"/>
            </filter>
            <rect width="100%" height="100%" filter="url(#about-grain)"/>
          </svg>

          {/* Decorative wax seal — top right */}
          <WaxSeal className="absolute -top-2 -right-2 w-28 h-28 md:w-36 md:h-36 pointer-events-none" />

          {/* Corner accent lines */}
          <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-[#C7984F]/40" />
          <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-[#C7984F]/40" />

          <h2
            className="relative text-center text-3xl md:text-4xl font-extrabold pb-4 mb-7 border-b-4 border-[#4A5E3A] tracking-wide"
            style={{ fontFamily: "'Playfair Display SC', serif" }}
          >
            About Me
          </h2>

          <div
            className="relative space-y-5 text-center text-base md:text-lg"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400 }}
          >
            <p>Hi! My name is Bjorn Shurdha; I'm a Fullstack Software Developer based out of Boston, MA. I graduated from BC in May 2025 with a degree in Computer Science, and I've since been using programming as the medium for my love of creative expression and problem solving.</p>
            <p>My jiu-jitsu team had an extremely mediocre website, and I knew I could make a much better product. I took it on knowing very little about web development, and quickly learned the skills needed to launch the site. I received high praise in the community, and as a result, landed my two current gigs in contract software development.</p>
            <p>This February saw the launch of two websites handled entirely by me: CombatZone MMA, an organization owned by former UFC contender Calvin Kattar, and Long Barn Hay, a hay business out of New Hampshire. Working hands-on with clients has made me excel at translating user requirements into real, digital products that people actually want to look at. I'm very passionate about my work, and I hope to continue my journey to becoming the best programmer I can be.</p>
          </div>
        </div>

        {/* ── Personal Interests ── */}
        <div className="bg-[#4A5E3A] text-[#F5F0EB] px-6 md:px-14 py-7 relative overflow-hidden">
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
            <filter id="interests-grain">
              <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/>
            </filter>
            <rect width="100%" height="100%" filter="url(#interests-grain)"/>
          </svg>

          <h3
            className="relative text-center text-2xl md:text-3xl font-extrabold pb-4 mb-5 border-b-4 border-[#C7984F]/50 tracking-wide"
            style={{ fontFamily: "'Playfair Display SC', serif" }}
          >
            Personal Interests
          </h3>

          <div className="relative flex flex-wrap justify-center gap-3 max-w-xl mx-auto">
            {interests.map((interest, index) => (
              <motion.span
                key={interest}
                className="bg-[#3B2A1A] border-2 border-[#C7984F]/60 rounded-full px-5 py-1.5 text-sm tracking-wide shadow-[inset_0_1px_3px_rgba(0,0,0,0.3)] hover:border-[#C7984F] hover:shadow-[0_0_12px_rgba(199,152,79,0.3)] transition-all duration-200"
                style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}
                initial={{ opacity: 0, scale: 0.7 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.1, y: -3 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
              >
                {interest}
              </motion.span>
            ))}
          </div>
        </div>

      </motion.div>
    </div>
  );
}
