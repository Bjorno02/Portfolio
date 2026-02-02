import NavLink from './ui/NavLink'

const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
    return (
        <nav className="fixed top-0 w-full bg-[#3B2617] text-[#F5F0EB] z-50">
            <div className="max-w-8xl mx-auto flex items-center justify-between px-6 py-4">
                <span className="text-xl font-bold">Bjorn</span>

                <ul className="flex gap-6">
                    {navItems.map((item) => (
                        <li key={item.href} >
                            <NavLink href={item.href}>{item.label}</NavLink>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
}