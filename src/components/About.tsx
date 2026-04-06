import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const interests = [
  '🥋 Jiu-Jitsu / MMA',
  '📚 Literature & Writing',
  '🐾 Animals',
  '📜 History',
  '⚡ Pokémon',
  '🎸 Guitar',
  '🎵 Music',
];

const ROTATIONS = [-2.5, 1.8, -1.2, 2.2, -1.8, 1.5, -2.8];

function WaxSeal({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={className} fill="none">
      <circle cx="60" cy="60" r="56" stroke="#C7984F" strokeWidth="1.5" opacity="0.5"/>
      <circle cx="60" cy="60" r="49" stroke="#C7984F" strokeWidth="0.8" opacity="0.3"/>
      <circle cx="60" cy="60" r="42" stroke="#C7984F" strokeWidth="0.6" strokeDasharray="3 2.5" opacity="0.25"/>
      {[0,30,60,90,120,150,180,210,240,270,300,330].map(a => {
        const r = (Math.PI * a) / 180;
        return <line key={a} x1={60+43*Math.cos(r)} y1={60+43*Math.sin(r)} x2={60+54*Math.cos(r)} y2={60+54*Math.sin(r)} stroke="#C7984F" strokeWidth="0.8" opacity="0.22"/>;
      })}
      <text x="60" y="53" textAnchor="middle" dominantBaseline="middle" fill="#C7984F" opacity="0.7" fontSize="22" fontWeight="700" style={{ fontFamily: "'Cinzel Decorative', serif" }}>B</text>
      <text x="60" y="70" textAnchor="middle" dominantBaseline="middle" fill="#C7984F" opacity="0.45" fontSize="8" letterSpacing="3" style={{ fontFamily: "'Cormorant Garamond', serif" }}>SHURDHA</text>
      {[[60,4],[60,116],[4,60],[116,60]].map(([cx,cy],i) => <circle key={i} cx={cx} cy={cy} r="2" fill="#C7984F" opacity="0.4"/>)}
    </svg>
  );
}

// ─── Mobile layout — simple, no flip ────────────────────────────────────────

function MobileAbout() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <div ref={ref} className="max-w-xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{ borderRadius: 14, overflow: 'hidden', boxShadow: '0 0 0 2px #C7984F, 0 20px 60px rgba(59,42,26,0.5)' }}
      >
        {/* About Me panel */}
        <div style={{ background: 'linear-gradient(150deg, #F8F0E3 0%, #EDE0CC 100%)', position: 'relative', overflow: 'hidden' }}>
          {/* Grain */}
          <svg style={{ position:'absolute', inset:0, width:'100%', height:'100%', opacity:0.06, pointerEvents:'none' }}>
            <filter id="m-grain"><feTurbulence type="fractalNoise" baseFrequency="0.72" numOctaves="3" stitchTiles="stitch"/></filter>
            <rect width="100%" height="100%" filter="url(#m-grain)"/>
          </svg>
          {/* Warm amber corner bloom */}
          <div style={{ position:'absolute', inset:0, pointerEvents:'none', background:'radial-gradient(ellipse at 95% 5%, rgba(199,152,79,0.13) 0%, transparent 55%)' }}/>
          {/* Faint ruled lines */}
          <svg style={{ position:'absolute', inset:0, width:'100%', height:'100%', opacity:1, pointerEvents:'none' }}>
            {Array.from({length:12}).map((_,i) => (
              <line key={i} x1="0" y1={56 + i * 34} x2="100%" y2={56 + i * 34} stroke="rgba(139,103,59,0.07)" strokeWidth="1"/>
            ))}
          </svg>
          {/* Left margin rule */}
          <div style={{ position:'absolute', top:0, bottom:0, left:30, width:1, background:'linear-gradient(to bottom, transparent, rgba(199,152,79,0.1) 15%, rgba(199,152,79,0.1) 85%, transparent)', pointerEvents:'none' }}/>
          <div style={{ padding: '24px 22px 20px' }}>
            <h2 style={{ fontFamily:"'Playfair Display SC', serif", fontSize:'1.25rem', fontWeight:800, color:'#2A1C0E', letterSpacing:'0.08em', marginBottom: 10 }}>
              About Me
            </h2>
            <div style={{ height: 2, marginBottom: 18, background:'linear-gradient(to right, #C7984F, rgba(199,152,79,0.2), transparent)' }}/>
            <div style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:'1rem', lineHeight: 1.8, color:'#0E0804' }}>
              <p style={{ marginBottom: 14 }}>
                  Hi! My name is Bjorn Shurdha; I'm a Fullstack Software Developer currently doing part time work for Kalmus! I'm based out of Boston, MA and
                  I graduated from BC in May 2025 with a degree in Computer Science, and I've since been
                  using programming as the medium for my love of creative expression and problem solving.
              </p>
              <div style={{ margin:'12px 0', display:'flex', alignItems:'center', gap:10 }}>
                <div style={{ flex:1, height:1, background:'linear-gradient(to right, rgba(199,152,79,0.35), transparent)' }}/>
                <svg width="7" height="7" viewBox="0 0 7 7"><polygon points="3.5,0 7,3.5 3.5,7 0,3.5" fill="#C7984F" opacity="0.55"/></svg>
                <div style={{ flex:1, height:1, background:'linear-gradient(to left, rgba(199,152,79,0.35), transparent)' }}/>
              </div>
              <p>
              From nothing to deployment, I've handled CombatZone MMA (owned by former UFC contender
                  Calvin Kattar), Long Barn Hay (Chester, NH), and more. Working hands-on with clients has
                  made me excel at translating user requirements into real, digital products people actually
                  want to look at.
              </p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div style={{ background: '#5C3D22', padding: '10px 20px', display:'flex', alignItems:'center', gap:10, position:'relative', overflow:'hidden' }}>
          <svg style={{ position:'absolute', inset:0, width:'100%', height:'100%', opacity:0.15, pointerEvents:'none' }}>
            <defs>
              <pattern id="div-quilt" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M10,0 L20,10 L10,20 L0,10 Z" fill="none" stroke="#C7984F" strokeWidth="0.8"/>
                <circle cx="10" cy="10" r="1.4" fill="#C7984F" opacity="0.6"/>
                <circle cx="0"  cy="0"  r="0.8" fill="#8FAE7E" opacity="0.5"/>
                <circle cx="20" cy="0"  r="0.8" fill="#8FAE7E" opacity="0.5"/>
                <circle cx="0"  cy="20" r="0.8" fill="#8FAE7E" opacity="0.5"/>
                <circle cx="20" cy="20" r="0.8" fill="#8FAE7E" opacity="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#div-quilt)"/>
          </svg>
          <div style={{ flex:1, height:1, background:'linear-gradient(to right, transparent, rgba(199,152,79,0.4))' }}/>
          <WaxSeal className="w-10 h-10 flex-shrink-0"/>
          <div style={{ flex:1, height:1, background:'linear-gradient(to left, transparent, rgba(199,152,79,0.4))' }}/>
        </div>

        {/* Interests panel */}
        <div style={{ background: 'linear-gradient(150deg, #4E6640 0%, #384B30 100%)', position: 'relative', overflow: 'hidden' }}>
          <svg style={{ position:'absolute', inset:0, width:'100%', height:'100%', opacity:0.05, pointerEvents:'none' }}>
            <filter id="m-grain2"><feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/></filter>
            <rect width="100%" height="100%" filter="url(#m-grain2)"/>
          </svg>
          {/* Crosshatch */}
          <svg style={{ position:'absolute', inset:0, width:'100%', height:'100%', opacity:0.06, pointerEvents:'none' }} preserveAspectRatio="xMidYMid slice">
            <defs>
              <pattern id="m-hatch" width="18" height="18" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                <line x1="0" y1="0" x2="0" y2="18" stroke="#C7984F" strokeWidth="0.7"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#m-hatch)"/>
          </svg>
          <div style={{ padding: '20px 22px 24px', color: '#F5F0EB' }}>
            <h3 style={{ fontFamily:"'Playfair Display SC', serif", fontSize:'1.1rem', fontWeight:800, letterSpacing:'0.08em', marginBottom: 8 }}>
              Interests
            </h3>
            <div style={{ height: 2, marginBottom: 16, background:'linear-gradient(to right, #C7984F, rgba(199,152,79,0.2), transparent)' }}/>
            <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
              {interests.map((interest) => (
                <span key={interest} style={{
                  display:'flex', alignItems:'center', gap:10,
                  background:'rgba(26,14,6,0.8)',
                  border:'1px solid rgba(199,152,79,0.35)',
                  borderLeft:'3px solid rgba(199,152,79,0.55)',
                  borderRadius:6, padding:'11px 16px',
                  fontFamily:"'Cormorant Garamond', serif",
                  fontWeight:600, fontSize:'1rem',
                }}>
                  {interest}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// ─── Desktop layout — 3D flip card ──────────────────────────────────────────

function DesktopAbout() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.35 });

  return (
    <div ref={ref} style={{ perspective: '1600px', perspectiveOrigin: '50% 40%' }} className="max-w-6xl mx-auto">
      <motion.div
        style={{
          transformStyle: 'preserve-3d',
          borderRadius: '0.75rem',
          // No overflow:hidden here — it breaks preserve-3d. Each face clips itself.
          boxShadow: '0 0 0 2px #C7984F, 0 40px 100px rgba(59,42,26,0.65)',
        }}
        initial={{ rotateY: 175 }}
        animate={isInView ? { rotateY: 0 } : { rotateY: 175 }}
        transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* ══ BACK FACE ══ */}
        <div style={{
          position:'absolute', inset:0, borderRadius:'0.75rem',
          backfaceVisibility:'hidden', WebkitBackfaceVisibility:'hidden' as 'hidden',
          transform:'rotateY(180deg)',
          background:'linear-gradient(145deg, #3B2412 0%, #5C3D22 50%, #3B2412 100%)',
          display:'flex', alignItems:'center', justifyContent:'center',
          overflow:'hidden',
        }}>
          <svg style={{ position:'absolute', inset:0, width:'100%', height:'100%', opacity:0.06, pointerEvents:'none' }}>
            <filter id="back-grain"><feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/></filter>
            <rect width="100%" height="100%" filter="url(#back-grain)"/>
          </svg>
          {/* Quilt — boosted opacity so it reads on the brown */}
          <svg style={{ position:'absolute', inset:0, width:'100%', height:'100%', opacity:0.14, pointerEvents:'none' }}>
            <defs>
              <pattern id="back-quilt" width="28" height="28" patternUnits="userSpaceOnUse">
                <path d="M14,0 L28,14 L14,28 L0,14 Z" fill="none" stroke="#C7984F" strokeWidth="1"/>
                <circle cx="14" cy="14" r="1.8" fill="#C7984F" opacity="0.6"/>
                <circle cx="0"  cy="0"  r="1.1" fill="#8FAE7E" opacity="0.5"/>
                <circle cx="28" cy="0"  r="1.1" fill="#8FAE7E" opacity="0.5"/>
                <circle cx="0"  cy="28" r="1.1" fill="#8FAE7E" opacity="0.5"/>
                <circle cx="28" cy="28" r="1.1" fill="#8FAE7E" opacity="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#back-quilt)"/>
          </svg>
          {/* Radial lines */}
          <svg style={{ position:'absolute', inset:0, width:'100%', height:'100%', opacity:0.07, pointerEvents:'none' }}>
            {Array.from({length:16}).map((_,i) => {
              const a = (i / 16) * Math.PI * 2;
              return <line key={i} x1="50%" y1="50%" x2={`${50+60*Math.cos(a)}%`} y2={`${50+60*Math.sin(a)}%`} stroke="#C7984F" strokeWidth="1"/>;
            })}
          </svg>
          <div style={{ position:'absolute', inset:16, border:'1px solid rgba(199,152,79,0.3)', borderRadius:6, pointerEvents:'none' }}/>
          <div style={{ position:'absolute', inset:24, border:'1px solid rgba(199,152,79,0.15)', borderRadius:4, pointerEvents:'none' }}/>
          <WaxSeal className="w-56 h-56 relative z-10"/>
        </div>

        {/* ══ FRONT FACE ══ */}
        <div style={{
          backfaceVisibility:'hidden', WebkitBackfaceVisibility:'hidden' as 'hidden',
          borderRadius:'0.75rem', overflow:'hidden',
          background:'#5C3D22',
        }}>
          <svg style={{ position:'absolute', inset:0, width:'100%', height:'100%', opacity:0.06, pointerEvents:'none', zIndex:0 }}>
            <filter id="front-grain"><feTurbulence type="fractalNoise" baseFrequency="0.6" numOctaves="3" stitchTiles="stitch"/></filter>
            <rect width="100%" height="100%" filter="url(#front-grain)"/>
          </svg>
          <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse at 50% 30%, rgba(120,80,30,0.15) 0%, rgba(40,20,5,0.35) 100%)', pointerEvents:'none', zIndex:0 }}/>

          <div className="relative z-10 flex flex-row gap-0 p-8">
            {/* Left page */}
            <motion.div className="relative flex-[3]" style={{
              background:'linear-gradient(150deg, #F8F0E3 0%, #EDE0CC 45%, #E2CEB0 100%)',
              borderRadius:8,
              boxShadow:'0 20px 60px rgba(0,0,0,0.65), 4px 4px 0 rgba(199,152,79,0.15), inset 0 1px 0 rgba(255,255,255,0.4)',
              transform:'rotate(-0.4deg)', overflow:'hidden',
            }}
              initial={{ opacity:0, y:12 }}
              animate={isInView ? { opacity:1, y:0 } : { opacity:0, y:12 }}
              transition={{ duration:0.5, delay:0.55 }}
            >
              <svg style={{ position:'absolute', inset:0, width:'100%', height:'100%', opacity:0.07, pointerEvents:'none' }}>
                <filter id="lp2-grain"><feTurbulence type="fractalNoise" baseFrequency="0.72" numOctaves="4" stitchTiles="stitch"/></filter>
                <rect width="100%" height="100%" filter="url(#lp2-grain)"/>
              </svg>
              {/* Warm amber corner bloom — top right */}
              <div style={{ position:'absolute', inset:0, pointerEvents:'none', background:'radial-gradient(ellipse at 92% 6%, rgba(199,152,79,0.16) 0%, transparent 50%)' }}/>
              {/* Bottom-left cool shadow */}
              <div style={{ position:'absolute', inset:0, pointerEvents:'none', background:'radial-gradient(ellipse at 8% 95%, rgba(139,103,59,0.08) 0%, transparent 45%)' }}/>
              {/* Ruled lines */}
              {Array.from({length:9}).map((_,i) => (
                <div key={i} style={{ position:'absolute', left:44, right:16, top:148+i*42, height:1, background:'rgba(139,103,59,0.08)', pointerEvents:'none' }}/>
              ))}
              <div style={{ position:'absolute', top:0, bottom:0, left:36, width:1, background:'linear-gradient(to bottom, transparent, rgba(199,152,79,0.14) 20%, rgba(199,152,79,0.14) 80%, transparent)', pointerEvents:'none' }}/>
              <div style={{ padding:'20px 24px 14px', borderBottom:'1px solid rgba(139,103,59,0.2)' }}>
                <h2 style={{ fontFamily:"'Playfair Display SC', serif", fontSize:'1.4rem', fontWeight:800, color:'#2A1C0E', letterSpacing:'0.08em' }}>About Me</h2>
                <motion.div style={{ height:2, marginTop:6, background:'linear-gradient(to right, #C7984F, rgba(199,152,79,0.2), transparent)', transformOrigin:'left' }}
                  initial={{ scaleX:0 }} animate={isInView ? { scaleX:1 } : { scaleX:0 }}
                  transition={{ duration:0.7, delay:0.7 }}/>
              </div>

              <div style={{ padding:'20px 24px 16px', fontFamily:"'Cormorant Garamond', serif", fontSize:'1.05rem', lineHeight:1.88, color:'#0E0804' }}>
                <div style={{ overflow:'hidden', marginBottom:16 }}>
                  <span aria-hidden="true" style={{ float:'left', marginRight:8, fontFamily:"'Cinzel Decorative', serif", fontSize:'5rem', lineHeight:0.78, color:'#C7984F', fontWeight:700, paddingTop:'0.03em', filter:'drop-shadow(0 2px 10px rgba(199,152,79,0.5))' }}>H</span>
                  i! My name is Bjorn Shurdha; I'm a Fullstack Software Developer currently doing part time work for Kalmus! I'm based out of Boston, MA and
                  I graduated from BC in May 2025 with a degree in Computer Science, and I've since been
                  using programming as the medium for my love of creative expression and problem solving.
                </div>
                <div style={{ margin:'12px 0', display:'flex', alignItems:'center', gap:10 }}>
                  <div style={{ flex:1, height:1, background:'linear-gradient(to right, rgba(199,152,79,0.4), transparent)' }}/>
                  <svg width="8" height="8" viewBox="0 0 8 8"><polygon points="4,0 8,4 4,8 0,4" fill="#C7984F" opacity="0.55"/></svg>
                  <div style={{ flex:1, height:1, background:'linear-gradient(to left, rgba(199,152,79,0.4), transparent)' }}/>
                </div>
                <p style={{ marginBottom:12 }}>
                  My jiu-jitsu team had an extremely mediocre website, and I knew I could make a much better
                  product. I took it on knowing very little about web development, and quickly learned the
                  skills needed to launch the site. I received high praise in the community, and as a result,
                  landed my current gigs in contract software development.
                </p>
                <div style={{ margin:'12px 0', display:'flex', alignItems:'center', gap:10 }}>
                  <div style={{ flex:1, height:1, background:'linear-gradient(to right, rgba(199,152,79,0.4), transparent)' }}/>
                  <svg width="8" height="8" viewBox="0 0 8 8"><polygon points="4,0 8,4 4,8 0,4" fill="#C7984F" opacity="0.55"/></svg>
                  <div style={{ flex:1, height:1, background:'linear-gradient(to left, rgba(199,152,79,0.4), transparent)' }}/>
                </div>
                <p>
                  From nothing to deployment, I've handled CombatZone MMA (owned by former UFC contender
                  Calvin Kattar), Long Barn Hay (Chester, NH), and more. Working hands-on with clients has
                  made me excel at translating user requirements into real, digital products people actually
                  want to look at.
                </p>
                <div style={{ marginTop:16, display:'flex', alignItems:'center', gap:10 }}>
                  <div style={{ flex:1, height:1, background:'linear-gradient(to right, transparent, rgba(139,103,59,0.25))' }}/>
                  <span style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:'0.65rem', color:'rgba(59,42,26,0.35)', letterSpacing:'0.3em' }}>I</span>
                  <div style={{ flex:1, height:1, background:'linear-gradient(to left, transparent, rgba(139,103,59,0.25))' }}/>
                </div>
              </div>
            </motion.div>

            {/* Center spine */}
            <motion.div className="flex flex-col items-center justify-center px-4"
              initial={{ opacity:0, scaleY:0 }}
              animate={isInView ? { opacity:1, scaleY:1 } : { opacity:0, scaleY:0 }}
              transition={{ duration:0.5, delay:0.6 }}
              style={{ transformOrigin:'center' }}
            >
              <div style={{ width:1, flex:1, background:'linear-gradient(to bottom, transparent, rgba(199,152,79,0.5) 30%, rgba(199,152,79,0.5) 70%, transparent)' }}/>
              <div style={{ margin:'12px 0', flexShrink:0 }}><WaxSeal className="w-14 h-14"/></div>
              <div style={{ width:1, flex:1, background:'linear-gradient(to bottom, transparent, rgba(199,152,79,0.5) 30%, rgba(199,152,79,0.5) 70%, transparent)' }}/>
            </motion.div>

            {/* Right page */}
            <motion.div className="relative flex-[2]" style={{
              background:'linear-gradient(150deg, #4E6640 0%, #415538 45%, #384B30 100%)',
              borderRadius:8,
              boxShadow:'0 20px 60px rgba(0,0,0,0.65), -4px 4px 0 rgba(199,152,79,0.1), inset 0 1px 0 rgba(255,255,255,0.08)',
              transform:'rotate(0.4deg)', overflow:'hidden', color:'#F5F0EB',
              display:'flex', flexDirection:'column',
            }}
              initial={{ opacity:0, y:12 }}
              animate={isInView ? { opacity:1, y:0 } : { opacity:0, y:12 }}
              transition={{ duration:0.5, delay:0.65 }}
            >
              <svg style={{ position:'absolute', inset:0, width:'100%', height:'100%', opacity:0.05, pointerEvents:'none' }}>
                <filter id="rp2-grain"><feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/></filter>
                <rect width="100%" height="100%" filter="url(#rp2-grain)"/>
              </svg>
              <svg style={{ position:'absolute', inset:0, width:'100%', height:'100%', opacity:0.07, pointerEvents:'none' }} preserveAspectRatio="xMidYMid slice">
                <defs>
                  <pattern id="rp-hatch" width="18" height="18" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                    <line x1="0" y1="0" x2="0" y2="18" stroke="#C7984F" strokeWidth="0.7"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#rp-hatch)"/>
              </svg>
              <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse at 85% 15%, rgba(240,215,140,0.12) 0%, transparent 60%)', pointerEvents:'none' }}/>
              <div style={{ position:'absolute', inset:0, background:'linear-gradient(to right, rgba(0,0,0,0.18), transparent 40%)', pointerEvents:'none' }}/>
              <div style={{ padding:'20px 22px 14px', borderBottom:'1px solid rgba(199,152,79,0.2)' }}>
                <h3 style={{ fontFamily:"'Playfair Display SC', serif", fontSize:'1.2rem', fontWeight:800, letterSpacing:'0.08em' }}>Interests</h3>
                <motion.div style={{ height:2, marginTop:6, background:'linear-gradient(to right, #C7984F, rgba(199,152,79,0.2), transparent)', transformOrigin:'left' }}
                  initial={{ scaleX:0 }} animate={isInView ? { scaleX:1 } : { scaleX:0 }}
                  transition={{ duration:0.7, delay:0.75 }}/>
              </div>

              <div style={{ flex:1, padding:'16px 18px', display:'flex', flexWrap:'wrap', columnGap:12, rowGap:20, alignContent:'center', justifyContent:'center', alignItems:'center' }}>
                {interests.map((interest, i) => (
                  <motion.span key={interest} style={{
                    display:'inline-flex', alignItems:'center', gap:6,
                    background:'linear-gradient(135deg, rgba(26,14,6,0.9) 0%, rgba(42,28,14,0.95) 100%)',
                    border:'1.5px solid rgba(199,152,79,0.45)',
                    borderRadius:8, padding:'9px 16px',
                    fontFamily:"'Cormorant Garamond', serif",
                    fontWeight:600, fontSize:'1rem', color:'#F5F0EB',
                    boxShadow:'2px 4px 18px rgba(0,0,0,0.45)',
                    cursor:'default',
                  }}
                    initial={{ opacity:0, scale:0.55, y:20 }}
                    animate={isInView ? { opacity:1, scale:1, y:0, rotate:ROTATIONS[i % ROTATIONS.length] } : {}}
                    whileHover={{ scale:1.15, rotate:0, y:-6, borderColor:'rgba(199,152,79,1)', boxShadow:'0 12px 28px rgba(0,0,0,0.5), 0 0 14px rgba(199,152,79,0.25)', transition:{ type:'spring', stiffness:400, damping:18, delay:0 } }}
                    transition={{ type:'spring', stiffness:300, damping:16, delay:0.7 + i * 0.06 }}
                  >
                    {interest}
                  </motion.span>
                ))}
              </div>

              <div style={{ padding:'0 22px 14px', display:'flex', alignItems:'center', gap:10 }}>
                <div style={{ flex:1, height:1, background:'linear-gradient(to right, transparent, rgba(199,152,79,0.3))' }}/>
                <span style={{ fontFamily:"'Cormorant Garamond', serif", fontSize:'0.65rem', color:'rgba(199,152,79,0.45)', letterSpacing:'0.3em' }}>II</span>
                <div style={{ flex:1, height:1, background:'linear-gradient(to left, transparent, rgba(199,152,79,0.3))' }}/>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// ─── Main export ─────────────────────────────────────────────────────────────

export default function About() {
  return (
    <div id="about" className="relative z-10 py-10 lg:py-20 px-3 lg:px-8">
      {/* Mobile: simple fade-in card, no flip */}
      <div className="lg:hidden">
        <MobileAbout />
      </div>
      {/* Desktop: 3D flip */}
      <div className="hidden lg:block">
        <DesktopAbout />
      </div>
    </div>
  );
}
