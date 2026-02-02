interface NavLinkProps {
    children: React.ReactNode;
    href: string;
    className?: string;
}

export default function NavLink({ children, href }: NavLinkProps) {
    return (
        <a href={href} onClick={(e) => {
            e.preventDefault();
            const targ = document.querySelector(href);
            if (targ !== null) {
                targ.scrollIntoView({ behavior: "smooth" });
            }
        }} className: text-grey-500 transition-colors duration-200>
            {children}
        </a>
    );
}
