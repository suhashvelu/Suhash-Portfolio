import { FaGithub } from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';
import { FaArrowRight } from 'react-icons/fa';
import profilesData from '../data/profiles.json';

// Icon mapping
const iconMap = {
    FaGithub,
    SiLeetcode
};

const Profiles = () => {
    return (
        <section id="profiles" className="w-full py-16 px-6 lg:px-12 bg-white text-black border-t border-black flex justify-center">
            <div className="max-w-7xl w-full">
                <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-12 text-center">
                    {profilesData.title.toUpperCase()}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {profilesData.profiles.map((profile, index) => {
                        const IconComponent = iconMap[profile.icon];
                        return (
                            <a
                                key={index}
                                href={profile.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="border border-black p-12 text-center hover:bg-black hover:text-white transition-all duration-500 group flex flex-col items-center justify-center"
                            >
                                <div className="space-y-6">
                                    {IconComponent && <IconComponent className="text-6xl mx-auto" />}
                                    <div className="font-serif text-5xl md:text-6xl font-bold">
                                        {profile.name}
                                    </div>
                                    <div className="text-sm uppercase tracking-widest opacity-70">
                                        {profile.subtitle}
                                    </div>
                                    <div className="text-4xl group-hover:translate-x-2 transition-transform duration-300">
                                        <FaArrowRight className="mx-auto" />
                                    </div>
                                </div>
                            </a>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Profiles;
