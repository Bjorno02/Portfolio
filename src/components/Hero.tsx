export default function Hero() {
    return (
        <div className="relative">
            <img src='PortfolioHeroWukong2.png' className="w-full h-[680px] object-cover"></img>
            <div className="mt-2 absolute top-1/5 left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-[#2C1810] p-4 border-slate-100 border-double border-8 rounded-t-xl">
                <h1 className="font-serif">Bjorn Shurdha</h1>
                <h2 className="font-serif">Software Developer</h2>
            </div>
        </div>
    );
}

//<div id="home" className="min-h-screen bg-gradient-to-b from-[#D4DEC4] to-[#6B8F5E] flex items-center justify-center pt-16">
//<h1 className="text-6xl font-bold text-[#2C1810] tracking-wide">WHAT</h1>
//</div>