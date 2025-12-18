import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaGithub, FaMicrochip } from 'react-icons/fa';
import { SiTailwindcss } from 'react-icons/si';
import techStackData from '../data/techstack.json';

// Icon mapping
const iconMap = {
    FaHtml5,
    FaCss3Alt,
    FaJs,
    FaReact,
    SiTailwindcss,
    FaMicrochip,
    FaGithub
};

const TechStack = () => {
    return (
        <section
            id="tech"
            className="w-full py-12 bg-white text-black border-t-2 border-black overflow-hidden"
        >
            <h2
                className="text-4xl md:text-5xl font-bold mb-8 text-center tracking-tight"
                style={{ fontFamily: "'Melodrama', serif" }}
            >
                {techStackData.title.toUpperCase()}
            </h2>

            {/* Infinite Marquee */}
            <div className="relative">
                {/* Gradient overlays for fade effect */}
                <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10"></div>
                <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10"></div>

                <div className="flex animate-marquee whitespace-nowrap py-6">
                    {[...Array(4)].map((_, setIndex) => (
                        <div key={setIndex} className="flex items-center">
                            {techStackData.skills.map((skill, index) => {
                                const IconComponent = iconMap[skill.icon];
                                return (
                                    <div key={`marquee-${setIndex}-${index}`} className="flex items-center mx-32">
                                        <div className="inline-flex items-center gap-12">
                                            {IconComponent && <IconComponent className="text-5xl" />}
                                            <span
                                                className="text-3xl uppercase tracking-wide"
                                                style={{ fontFamily: "'Clash Display', sans-serif" }}
                                            >
                                                {skill.name}
                                            </span>
                                        </div>
                                        <span className="text-4xl ml-32">•</span>
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TechStack;
