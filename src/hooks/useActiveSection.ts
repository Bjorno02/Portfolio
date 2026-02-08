import { useState, useEffect } from 'react';

const sectionIds = ['home', 'about', 'skills', 'projects', 'experience', 'contact'];

export function useActiveSection(): string {
    const [activeSection, setActiveSection] = useState('home');

    useEffect(() => {
        const handleScroll = () => {
            let active = sectionIds[0];

            for (const id of sectionIds) {
                const el = document.getElementById(id);
                if (el && el.getBoundingClientRect().top <= 200) {
                    active = id;
                }
            }

            setActiveSection(active);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return activeSection;
}
