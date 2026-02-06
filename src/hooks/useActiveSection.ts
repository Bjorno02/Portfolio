import { useState, useEffect } from 'react';

const sectionIds = ['home', 'about', 'skills', 'projects', 'experience', 'contact'];

export function useActiveSection(): string {
    const [activeSection, setActiveSection] = useState('home');

    useEffect(() => {
        const observer = new IntersectionObserver( 
            (entries) => {
                for (let i = 0; i < entries.length; i++) {
                    if (entries[i].isIntersecting) {
                        setActiveSection(entries[i].target.id);
                    }
                }
            },
            {
                threshold: 0.3,
                rootMargin: "-80px 0px 0px 0px",
            }
        );

        for (let i = 0; i < sectionIds.length; i++) {
            const el = document.getElementById(sectionIds[i]);
            if (el) observer.observe(el);
        }
    
        return () => observer.disconnect();

      
    }, []);

    return activeSection;
}
