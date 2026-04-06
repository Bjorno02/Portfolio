interface NavLinkProps {
  children: React.ReactNode;
  href: string;
  isActive?: boolean;
}

export default function NavLink({ children, href, isActive = false }: NavLinkProps) {
  const baseClass = `relative transition-colors duration-200 text-sm tracking-[0.15em] uppercase ${
    isActive ? 'text-[#C7984F]' : 'text-[#F5F0EB]/85 hover:text-[#F5F0EB]'
  }`;

  const underlineClass = `
    after:absolute after:left-0 after:-bottom-0.5 after:h-[1px] after:transition-all after:duration-300
    after:bg-gradient-to-r after:from-[#C7984F] after:to-[#8FAE7E]
    ${isActive ? 'after:w-full' : 'after:w-0 hover:after:w-full'}
  `.trim();

  return (
    <a
      href={href}
      onClick={(e) => {
        e.preventDefault();
        const targ = document.querySelector(href);
        if (targ) targ.scrollIntoView({ behavior: 'smooth' });
      }}
      className={baseClass}
      style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600 }}
    >
      <span className={underlineClass}>{children}</span>
    </a>
  );
}
