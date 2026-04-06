import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import NavLink from './ui/NavLink';
import { useActiveSection } from '../hooks/useActiveSection';

const leftLinks = [
  { label: 'Home',   href: '#home'   },
  { label: 'About',  href: '#about'  },
  { label: 'Skills', href: '#skills' },
];

const rightLinks = [
  { label: 'Projects',   href: '#projects'   },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact',    href: '#contact'    },
];

const allLinks = [...leftLinks, ...rightLinks];

// Vine SVG path — drawn in on mount via strokeDasharray animation
const VINE_PATH = "M170 22C150 22 140 13 120 15C100 17 90 22 70 20C55 18 38 24 20 21C12 20 6 22 3 22";

function VineFlourishLeft() {
  return (
    <svg className="w-24 h-10 flex-shrink-0" viewBox="0 0 180 44" fill="none" xmlns="http://www.w3.org/2000/svg">
      <motion.path
        d={VINE_PATH}
        stroke="#C7984F" strokeWidth="1.5" strokeLinecap="round"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.4, delay: 0.6, ease: 'easeInOut' }}
      />
      <path d="M135 14C130 10 125 9 122 11" stroke="#C7984F" strokeWidth="1" strokeLinecap="round" fill="none"/>
      <path d="M85 21C82 26 78 28 75 26" stroke="#C7984F" strokeWidth="1" strokeLinecap="round" fill="none"/>
      <path d="M48 19C45 14 41 12 38 14" stroke="#C7984F" strokeWidth="1" strokeLinecap="round" fill="none"/>
      <path d="M130 11C126 4 119 2 115 7C120 4 125 7 128 12Z" fill="#C7984F" opacity="0.85"/>
      <path d="M138 12C136 7 132 6 130 9C133 7 135 9 137 13Z" fill="#C7984F" opacity="0.6"/>
      <path d="M80 23C77 31 70 33 65 29C70 31 75 28 78 23Z" fill="#C7984F" opacity="0.85"/>
      <path d="M88 23C86 28 83 30 80 27C83 29 85 27 87 23Z" fill="#C7984F" opacity="0.6"/>
      <path d="M43 17C40 9 33 7 28 11C33 8 38 11 41 17Z" fill="#C7984F" opacity="0.85"/>
      <path d="M50 17C48 12 45 10 42 13C45 11 47 13 49 17Z" fill="#C7984F" opacity="0.6"/>
      <path d="M22 20C19 14 14 13 11 16C14 13 18 15 20 20Z" fill="#C7984F" opacity="0.7"/>
      <path d="M3 22C1 19 2 15 6 13" stroke="#C7984F" strokeWidth="1.2" strokeLinecap="round" fill="none"/>
      <circle cx="170" cy="22" r="2" fill="#C7984F"/>
    </svg>
  );
}

function Diamond() {
  return (
    <span className="flex-shrink-0 opacity-30">
      <svg width="6" height="6" viewBox="0 0 6 6">
        <polygon points="3,0 6,3 3,6 0,3" fill="#C7984F"/>
      </svg>
    </span>
  );
}

export default function Navbar() {
  const activeSection = useActiveSection();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkSize = () => setIsDesktop(window.innerWidth >= 1024);
    checkSize();
    window.addEventListener('resize', checkSize);
    return () => window.removeEventListener('resize', checkSize);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.nav
      className="fixed top-0 w-full z-50"
      style={{ fontFamily: "'Cormorant Garamond', serif" }}
      animate={{
        backgroundColor: scrolled && isDesktop ? 'rgba(36,22,10,0.92)' : 'rgba(43,26,14,1)',
      }}
      transition={{ duration: 0.5 }}
    >
      {/* Quilt diamond pattern — very subtle */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0, opacity: 0.045 }}>
        <defs>
          <pattern id="nav-quilt" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M10,0 L20,10 L10,20 L0,10 Z" fill="none" stroke="#C7984F" strokeWidth="0.7"/>
            <circle cx="10" cy="10" r="1.1" fill="#C7984F" opacity="0.55"/>
            <circle cx="0"  cy="0"  r="0.7" fill="#C7984F" opacity="0.3"/>
            <circle cx="20" cy="0"  r="0.7" fill="#C7984F" opacity="0.3"/>
            <circle cx="0"  cy="20" r="0.7" fill="#C7984F" opacity="0.3"/>
            <circle cx="20" cy="20" r="0.7" fill="#C7984F" opacity="0.3"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#nav-quilt)"/>
      </svg>
      {/* Grain on top of quilt */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.03]" style={{ zIndex: 0 }}>
        <filter id="nav-grain"><feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves="3" stitchTiles="stitch"/></filter>
        <rect width="100%" height="100%" filter="url(#nav-grain)"/>
      </svg>

      {/* Desktop navbar */}
      <div
        className="hidden lg:flex relative max-w-8xl mx-auto items-center justify-center px-6 py-4"
        style={{ zIndex: 1 }}
      >

        {/* Left vine flourish */}
        <div>
          <VineFlourishLeft />
        </div>

        {/* Left links — diamond separated */}
        <ul className="flex-1 flex justify-end items-center gap-0">
          {leftLinks.map((item, i) => (
            <motion.li key={item.href} className="flex items-center"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + i * 0.1, duration: 0.5 }}
            >
              {i > 0 && <Diamond />}
              <span className="px-5">
                <NavLink href={item.href} isActive={activeSection === item.href.slice(1)}>
                  {item.label}
                </NavLink>
              </span>
            </motion.li>
          ))}
        </ul>

        {/* Center — vertical divider + social icons + vertical divider */}
        <div className="flex items-center gap-0 px-6">
          <div className="w-px h-6 mx-3" style={{ background: 'linear-gradient(to bottom, transparent, rgba(199,152,79,0.35), transparent)' }}/>
          <div className="flex items-center gap-5">
            <a href="https://github.com/Bjorno02" target="_blank" rel="noopener noreferrer"
              className="transition-all duration-200 hover:opacity-70 hover:scale-110">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#8FAE7E">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
            <a href="https://www.linkedin.com/in/bjornshurdha/" target="_blank" rel="noopener noreferrer"
              className="transition-all duration-200 hover:opacity-70 hover:scale-110">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#8FAE7E">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
            <a href="/BjornShurdha2026WebDeveloperResume.pdf" download
              className="transition-all duration-200 hover:opacity-70 hover:scale-110">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#8FAE7E">
                <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm-1 2l5 5h-5V4zM6 20V4h5v7h7v9H6zm3-7h6v2H9v-2zm0 3h6v2H9v-2zm0-6h3v2H9V10z"/>
              </svg>
            </a>
          </div>
          <div className="w-px h-6 mx-3" style={{ background: 'linear-gradient(to bottom, transparent, rgba(199,152,79,0.35), transparent)' }}/>
        </div>

        {/* Right links — diamond separated */}
        <ul className="flex-1 flex justify-start items-center gap-0">
          {rightLinks.map((item, i) => (
            <motion.li key={item.href} className="flex items-center"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 + i * 0.1, duration: 0.5 }}
            >
              {i > 0 && <Diamond />}
              <span className="px-5">
                <NavLink href={item.href} isActive={activeSection === item.href.slice(1)}>
                  {item.label}
                </NavLink>
              </span>
            </motion.li>
          ))}
        </ul>

        {/* Right vine flourish (mirrored) */}
        <div>
          <svg className="w-24 h-10 flex-shrink-0 scale-x-[-1]" viewBox="0 0 180 44" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d={VINE_PATH} stroke="#C7984F" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M135 14C130 10 125 9 122 11" stroke="#C7984F" strokeWidth="1" strokeLinecap="round" fill="none"/>
            <path d="M85 21C82 26 78 28 75 26" stroke="#C7984F" strokeWidth="1" strokeLinecap="round" fill="none"/>
            <path d="M48 19C45 14 41 12 38 14" stroke="#C7984F" strokeWidth="1" strokeLinecap="round" fill="none"/>
            <path d="M130 11C126 4 119 2 115 7C120 4 125 7 128 12Z" fill="#C7984F" opacity="0.85"/>
            <path d="M138 12C136 7 132 6 130 9C133 7 135 9 137 13Z" fill="#C7984F" opacity="0.6"/>
            <path d="M80 23C77 31 70 33 65 29C70 31 75 28 78 23Z" fill="#C7984F" opacity="0.85"/>
            <path d="M88 23C86 28 83 30 80 27C83 29 85 27 87 23Z" fill="#C7984F" opacity="0.6"/>
            <path d="M43 17C40 9 33 7 28 11C33 8 38 11 41 17Z" fill="#C7984F" opacity="0.85"/>
            <path d="M50 17C48 12 45 10 42 13C45 11 47 13 49 17Z" fill="#C7984F" opacity="0.6"/>
            <path d="M22 20C19 14 14 13 11 16C14 13 18 15 20 20Z" fill="#C7984F" opacity="0.7"/>
            <path d="M3 22C1 19 2 15 6 13" stroke="#C7984F" strokeWidth="1.2" strokeLinecap="round" fill="none"/>
            <circle cx="170" cy="22" r="2" fill="#C7984F"/>
          </svg>
        </div>
      </div>

      {/* Multi-layer bottom border */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none" style={{ zIndex: 2, height: 4 }}>
        {/* Bright 1px accent line — sits on top of the band */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(to right, transparent, rgba(240,215,140,0.6) 20%, #F0D78C 50%, rgba(240,215,140,0.6) 80%, transparent)' }}/>
        {/* 3px main gold band — flush at bottom */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(to right, transparent, #8B6914 10%, #C7984F 30%, #B8853A 50%, #C7984F 70%, #8B6914 90%, transparent)', boxShadow: '0 4px 14px rgba(199,152,79,0.22)' }}/>
      </div>

      {/* Mobile navbar bar */}
      <div className="lg:hidden relative flex items-center px-5 py-3" style={{ zIndex: 1 }}>
        {/* Left: social icons */}
        <div className="flex items-center gap-4 flex-1">
          <a href="https://github.com/Bjorno02" target="_blank" rel="noopener noreferrer" className="opacity-65 hover:opacity-100 transition-opacity">
            <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24" fill="#8FAE7E">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </a>
          <a href="https://www.linkedin.com/in/bjornshurdha/" target="_blank" rel="noopener noreferrer" className="opacity-65 hover:opacity-100 transition-opacity">
            <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24" fill="#8FAE7E">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
          </a>
          <a href="/BjornShurdha2026WebDeveloperResume.pdf" download className="opacity-65 hover:opacity-100 transition-opacity">
            <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24" fill="#8FAE7E">
              <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm-1 2l5 5h-5V4zM6 20V4h5v7h7v9H6zm3-7h6v2H9v-2zm0 3h6v2H9v-2zm0-6h3v2H9V10z"/>
            </svg>
          </a>
        </div>

        {/* Right: hamburger */}
        <div className="flex items-center flex-1 justify-end">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex flex-col justify-center items-center gap-[5px] p-2 -mr-1"
            style={{ background: 'none', border: 'none', cursor: 'pointer' }}
            aria-label="Menu"
          >
            <motion.span
              className="block w-5 h-[1.5px] bg-[#C7984F] rounded-full origin-center"
              animate={mobileOpen ? { rotate: 45, y: 6.5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.22 }}
            />
            <motion.span
              className="block w-5 h-[1.5px] bg-[#C7984F] rounded-full"
              animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.15 }}
            />
            <motion.span
              className="block w-5 h-[1.5px] bg-[#C7984F] rounded-full origin-center"
              animate={mobileOpen ? { rotate: -45, y: -6.5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.22 }}
            />
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      <motion.div
        className="lg:hidden overflow-hidden"
        style={{ zIndex: 1 }}
        initial={false}
        animate={{ height: mobileOpen ? 'auto' : 0 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      >
        <nav style={{ borderTop: '1px solid rgba(199,152,79,0.18)', background: 'rgba(22,12,4,0.98)' }}>
          {allLinks.map((item) => {
            const isActive = activeSection === item.href.slice(1);
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  setMobileOpen(false);
                  setTimeout(() => {
                    const target = document.querySelector(item.href);
                    if (!target) return;
                    const top = target.getBoundingClientRect().top + window.scrollY - 64;
                    window.scrollTo({ top, behavior: 'smooth' });
                  }, 50);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '13px 24px',
                  borderBottom: '1px solid rgba(199,152,79,0.07)',
                  borderLeft: `2px solid ${isActive ? '#C7984F' : 'transparent'}`,
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '0.95rem',
                  letterSpacing: '0.22em',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  color: isActive ? '#C7984F' : 'rgba(245,240,235,0.75)',
                  textDecoration: 'none',
                  transition: 'color 0.2s, border-color 0.2s',
                }}
              >
                {item.label}
              </a>
            );
          })}
          {/* Bottom gold rule */}
          <div style={{ padding: '10px 24px' }}>
            <div style={{ height: 1, background: 'linear-gradient(to right, rgba(199,152,79,0.25), transparent)' }}/>
          </div>
        </nav>
      </motion.div>
    </motion.nav>
  );
}
