import NavLink from './ui/NavLink'
import { useActiveSection } from '../hooks/useActiveSection'

const leftLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
];

const rightLinks = [
    { label: 'Projects', href: '#projects' },
    { label: 'Experience', href: '#experience' },
    { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
    const activeSection = useActiveSection();

    return (
        <nav className="fixed top-0 w-full bg-[#3B2A1A] z-50 font-serif border-b-4 border-[#C7984F]">
            <div className="max-w-8xl mx-auto flex items-center justify-center px-6 py-5 divide-x divide-[#F5F0EB]/30">

                {/* Left vine/leaf flourish */}
                <svg className="w-24 h-10 flex-shrink-0" viewBox="0 0 180 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Main vine stem */}
                    <path d="M170 22C150 22 140 13 120 15C100 17 90 22 70 20C55 18 38 24 20 21C12 20 6 22 3 22" stroke="#C7984F" strokeWidth="1.5" strokeLinecap="round"/>
                    {/* Branch 1 - upper */}
                    <path d="M135 14C130 10 125 9 122 11" stroke="#C7984F" strokeWidth="1" strokeLinecap="round" fill="none"/>
                    {/* Branch 2 - lower */}
                    <path d="M85 21C82 26 78 28 75 26" stroke="#C7984F" strokeWidth="1" strokeLinecap="round" fill="none"/>
                    {/* Branch 3 - upper */}
                    <path d="M48 19C45 14 41 12 38 14" stroke="#C7984F" strokeWidth="1" strokeLinecap="round" fill="none"/>
                    {/* Leaf 1 - top right */}
                    <path d="M130 11C126 4 119 2 115 7C120 4 125 7 128 12Z" fill="#C7984F" opacity="0.85"/>
                    {/* Leaf 2 - top right small */}
                    <path d="M138 12C136 7 132 6 130 9C133 7 135 9 137 13Z" fill="#C7984F" opacity="0.6"/>
                    {/* Leaf 3 - bottom mid */}
                    <path d="M80 23C77 31 70 33 65 29C70 31 75 28 78 23Z" fill="#C7984F" opacity="0.85"/>
                    {/* Leaf 4 - bottom mid small */}
                    <path d="M88 23C86 28 83 30 80 27C83 29 85 27 87 23Z" fill="#C7984F" opacity="0.6"/>
                    {/* Leaf 5 - top left */}
                    <path d="M43 17C40 9 33 7 28 11C33 8 38 11 41 17Z" fill="#C7984F" opacity="0.85"/>
                    {/* Leaf 6 - top left small */}
                    <path d="M50 17C48 12 45 10 42 13C45 11 47 13 49 17Z" fill="#C7984F" opacity="0.6"/>
                    {/* Leaf 7 - near end */}
                    <path d="M22 20C19 14 14 13 11 16C14 13 18 15 20 20Z" fill="#C7984F" opacity="0.7"/>
                    {/* Small curl at end */}
                    <path d="M3 22C1 19 2 15 6 13" stroke="#C7984F" strokeWidth="1.2" strokeLinecap="round" fill="none"/>
                    {/* Dot at start */}
                    <circle cx="170" cy="22" r="2" fill="#C7984F"/>
                </svg>

                {/* Left links */}
                <ul className="flex-1 flex justify-end divide-x divide-[#F5F0EB]/30">
                    {leftLinks.map((item) => (
                        <li key={item.href} className="px-6">
                            <NavLink href={item.href} isActive={activeSection === item.href.slice(1)}>{item.label}</NavLink>
                        </li>
                    ))}
                </ul>

                {/* Center social icons */}
                <div className="flex items-center gap-4 px-6">
                    {/* GitHub */}
                    <a href="https://github.com/Bjorno02" target="_blank" rel="noopener noreferrer"
                       className="group transition-opacity duration-200 hover:opacity-80">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#8FAE7E">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                    </a>

                    {/* LinkedIn */}
                    <a href="https://www.linkedin.com/in/bjornshurdha/" target="_blank" rel="noopener noreferrer"
                        className="group transition-opacity duration-200 hover:opacity-80">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#8FAE7E">
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                        </svg>
                    </a>      
                </div>

                {/* Right links */}
                <ul className="flex-1 flex justify-start divide-x divide-[#F5F0EB]/30">
                    {rightLinks.map((item) => (
                        <li key={item.href} className="px-6">
                            <NavLink href={item.href} isActive={activeSection === item.href.slice(1)}>{item.label}</NavLink>
                        </li>
                    ))}
                </ul>

                {/* Right vine/leaf flourish (mirrored) */}
                <svg className="w-24 h-10 flex-shrink-0 scale-x-[-1]" viewBox="0 0 180 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Main vine stem */}
                    <path d="M170 22C150 22 140 13 120 15C100 17 90 22 70 20C55 18 38 24 20 21C12 20 6 22 3 22" stroke="#C7984F" strokeWidth="1.5" strokeLinecap="round"/>
                    {/* Branch 1 - upper */}
                    <path d="M135 14C130 10 125 9 122 11" stroke="#C7984F" strokeWidth="1" strokeLinecap="round" fill="none"/>
                    {/* Branch 2 - lower */}
                    <path d="M85 21C82 26 78 28 75 26" stroke="#C7984F" strokeWidth="1" strokeLinecap="round" fill="none"/>
                    {/* Branch 3 - upper */}
                    <path d="M48 19C45 14 41 12 38 14" stroke="#C7984F" strokeWidth="1" strokeLinecap="round" fill="none"/>
                    {/* Leaf 1 - top right */}
                    <path d="M130 11C126 4 119 2 115 7C120 4 125 7 128 12Z" fill="#C7984F" opacity="0.85"/>
                    {/* Leaf 2 - top right small */}
                    <path d="M138 12C136 7 132 6 130 9C133 7 135 9 137 13Z" fill="#C7984F" opacity="0.6"/>
                    {/* Leaf 3 - bottom mid */}
                    <path d="M80 23C77 31 70 33 65 29C70 31 75 28 78 23Z" fill="#C7984F" opacity="0.85"/>
                    {/* Leaf 4 - bottom mid small */}
                    <path d="M88 23C86 28 83 30 80 27C83 29 85 27 87 23Z" fill="#C7984F" opacity="0.6"/>
                    {/* Leaf 5 - top left */}
                    <path d="M43 17C40 9 33 7 28 11C33 8 38 11 41 17Z" fill="#C7984F" opacity="0.85"/>
                    {/* Leaf 6 - top left small */}
                    <path d="M50 17C48 12 45 10 42 13C45 11 47 13 49 17Z" fill="#C7984F" opacity="0.6"/>
                    {/* Leaf 7 - near end */}
                    <path d="M22 20C19 14 14 13 11 16C14 13 18 15 20 20Z" fill="#C7984F" opacity="0.7"/>
                    {/* Small curl at end */}
                    <path d="M3 22C1 19 2 15 6 13" stroke="#C7984F" strokeWidth="1.2" strokeLinecap="round" fill="none"/>
                    {/* Dot at start */}
                    <circle cx="170" cy="22" r="2" fill="#C7984F"/>
                </svg>

            </div>
        </nav>
    );
}