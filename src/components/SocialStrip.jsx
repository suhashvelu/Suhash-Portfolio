import { FaLinkedinIn, FaInstagram, FaTwitter, FaGithub } from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';

const SocialStrip = () => {
    return (
        <div className="mx-6 bg-[#E5E5E5] border-t border-black py-16 px-6 lg:px-12 flex flex-col xl:flex-row items-center justify-between gap-8">
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal tracking-tight text-center xl:text-left leading-none">
                COOKING SOMETHING INTERESTING?
            </h2>

            <div className="flex items-center gap-2 sm:gap-4 shrink-0">
                <a
                    href="mailto:suhashvelusamy03@gmail.com"
                    className="bg-[#1a1a1a] text-white px-6 sm:px-8 py-3 sm:py-4 font-serif text-xl sm:text-2xl hover:bg-black transition-colors"
                >
                    EMAIL
                </a>

                <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#1a1a1a] text-white w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center hover:bg-black transition-colors"
                >
                    <FaLinkedinIn className="text-xl sm:text-2xl" />
                </a>

                <a
                    href="https://github.com/SUHASHVELU"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#1a1a1a] text-white w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center hover:bg-black transition-colors"
                >
                    <FaGithub className="text-xl sm:text-2xl" />
                </a>

                <a
                    href="https://leetcode.com/u/SUHASH_03/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#1a1a1a] text-white w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center hover:bg-black transition-colors"
                >
                    <SiLeetcode className="text-xl sm:text-2xl" />
                </a>

                <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#1a1a1a] text-white w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center hover:bg-black transition-colors"
                >
                    <FaInstagram className="text-xl sm:text-2xl" />
                </a>

                <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#1a1a1a] text-white w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center hover:bg-black transition-colors"
                >
                    <FaTwitter className="text-xl sm:text-2xl" />
                </a>
            </div>
        </div>
    );
};

export default SocialStrip;
