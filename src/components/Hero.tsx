export default function Hero() {
    return (
        <section id="home" className="relative w-full h-svh md:h-[745px] -mt-10 overflow-hidden">
            {/* Video Background */}
            <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover object-top"
            >
                <source src="/hero.mp4" type="video/mp4" />
            </video>

            {/* Dark overlay for readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-black/10" />

            {/* Text Overlay */}
            <div className="absolute inset-0 flex items-center ml-6 md:ml-20 mt-12">
                <div className="relative text-left px-6 md:px-12 py-10">
                    <div className="mb-6 w-16 border-t-2 border-white/50" />
                    <h1 className="font-serif text-5xl md:text-9xl text-white font-bold tracking-wider uppercase drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]">
                        Bjorn
                    </h1>
                    <h1 className="font-serif text-5xl md:text-9xl text-white font-bold tracking-wider uppercase drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)] -mt-2">
                        Shurdha
                    </h1>
                    <div className="my-5 w-32 md:w-48 border-t-2 border-white/40" />
                    <h2 className="font-serif text-xl md:text-3xl text-white tracking-[0.2em] md:tracking-[0.4em] uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                        Software Developer
                    </h2>
                    <div className="mt-6 w-16 border-t-2 border-white/50" />
                </div>
            </div>
        </section>
    );
}
