import { motion } from 'framer-motion';

const interests = [
    '🥋 Jiu-Jitsu / MMA',
    '📚 Literature & Writing',
    '🐾 Animals',
    '📜 History',
    '⚡ Pokémon',
    '🎸 Guitar',
    '🎵 Music',
];

export default function About() {
    return (
        <div id="about" className="relative z-10 flex items-center justify-center py-24 px-4">
            {/* Card fades in and slides up when scrolled into view */}
            <motion.div
                className="w-full max-w-5xl rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300 border-4 border-[#C7984F]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
            >

                <div className="bg-[#4E3828] text-[#F5F0EB] px-6 md:px-12 py-6 border-b-4 border-[#C7984F] font-serif leading-relaxed text-base md:text-lg">
                    <h2 className="text-center text-3xl font-extrabold pb-4 mb-6 border-b-4 border-[#4A5E3A]">About Me</h2>
                    <div className="space-y-5 text-center">
                        <p>Hi! My name is Bjorn Shurdha; I'm a Fullstack Software Developer based out of Boston, MA. I graduated from BC in May 2025 with a degree in Computer Science, and I've since been using programming as the medium for my love of creative expression and problem solving.</p>
                        <p>My jiu-jitsu team had an extremely mediocre website, and I knew I could make a much better product. I took it on knowing very little about web development, and quickly learned the skills needed to launch the site. I received high praise in the community, and as a result, landed my two current gigs in contract software development.</p>
                        <p>This February will see the launch of two websites handled entirely by me: CombatZone MMA, an organization owned by former UFC contender Calvin Kattar, and Long Barn Hay, a hay business out of New Hampshire. Working hands-on with clients has made me excel at translating user requirements into real, digital products that people actually want to look at. I'm very passionate about my work, and I hope to continue my journey to becoming the best programmer I can be.</p>
                    </div>
                </div>

                <div className="bg-[#4A5E3A] text-[#F5F0EB] px-6 md:px-12 py-6 font-serif">
                    <h3 className="text-center text-3xl font-extrabold pb-4 mb-8 border-b-4 border-[#4A5E3A]">Personal Interests</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-lg mx-auto">
                        {interests.map((interest, index) => (
                            <motion.span key={interest}
                            className="bg-[#3B2A1A] border border-[#C7984F] rounded-full px-4 py-1.5 text-sm cursor-default text-center"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            whileHover={{ scale: 1.1, y: -3 }}
                            transition={{ duration: 0.4, delay: index * .015 }}
                            >{interest}
                            </motion.span>
                        ))}
                    </div>
                </div>

            </motion.div>
        </div>
    );
}