interface NavLinkProps {
    children: React.ReactNode;
    href: string;
    isActive?: boolean;
}

export default function NavLink({ children, href, isActive = false }: NavLinkProps) {
    const linkClass = `transition-colors duration-200 ${isActive ? 'text-[#C7984F]!' : 'text-[#F5F0EB]'}`;
    const underlineClass = `relative after:absolute after:left-0 after:bottom-0 after:h-[2px] after:transition-all after:duration-300 after:bg-[#8FAE7E] hover:after:w-full ${isActive ? 'after:w-full' : 'after:w-0'}`;

    return (
        <a href={href} onClick={(e) => {
            e.preventDefault();
            const targ = document.querySelector(href);
            if (targ !== null) {
                targ.scrollIntoView({ behavior: "smooth" });
            }
        }} className={linkClass}>
            <span className={underlineClass}>
                {children}
            </span>
        </a>
    );
}
