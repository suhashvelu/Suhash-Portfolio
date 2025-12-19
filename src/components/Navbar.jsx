import { useState } from 'react';
import { FaTwitter, FaLinkedin, FaGithub, FaInstagram } from 'react-icons/fa';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="w-full bg-white border-b-2 border-black sticky top-0 z-50">
            <div className="w-full px-6 lg:px-12 h-full">
                {/* Top Row - Logo, Title, Date */}
                <div className="flex items-center justify-between py-3 border-b border-black">
                    {/* Logo/Icon Placeholder */}
                    <div className="w-14 h-14 flex items-center justify-center shrink-0">
                        <img src="/Logo/s3v.png" alt="SV Logo" className="w-full h-full object-contain" />
                    </div>

                    {/* Center Title */}
                    <h1 className="font-serif text-2xl md:text-4xl font-bold text-center text-black flex-grow">
                        Portfolio
                    </h1>

                    {/* Mobile Menu Button (Hamburger) - Moved to top row */}
                    <button
                        className="md:hidden text-black focus:outline-none ml-4"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {isOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>

                    {/* Date */}
                    <div className="text-sm text-right hidden md:block min-w-[120px] shrink-0 text-black">
                        {new Date().toLocaleDateString('en-US', {
                            weekday: 'short',
                            month: 'short',
                            day: 'numeric'
                        })}
                    </div>
                </div>

                {/* Bottom Row - Navigation Links and Social Icons */}
                <div className="hidden md:flex items-center justify-between py-3">
                    {/* Navigation Links */}
                    <div className="hidden md:flex gap-4 lg:gap-8 text-sm lg:text-base uppercase tracking-wider font-semibold text-black overflow-x-auto no-scrollbar">
                        <a href="#resume" className="hover:underline transition-all whitespace-nowrap">
                            Resume
                        </a>
                        <a href="#tech" className="hover:underline transition-all whitespace-nowrap">
                            Tech Stack
                        </a>
                        <a href="#projects" className="hover:underline transition-all whitespace-nowrap">
                            Projects
                        </a>
                        <a href="#profiles" className="hover:underline transition-all whitespace-nowrap">
                            Profiles
                        </a>
                        <a href="#contact" className="hover:underline transition-all whitespace-nowrap">
                            Contact
                        </a>
                    </div>

                    {/* Social Icons */}
                    <div className="hidden md:flex gap-4 text-black items-center">
                        <a
                            href="https://twitter.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:scale-110 transition-transform text-black"
                            aria-label="Twitter"
                        >
                            <FaTwitter size={24} />
                        </a>
                        <a
                            href="https://linkedin.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:scale-110 transition-transform text-black"
                            aria-label="LinkedIn"
                        >
                            <FaLinkedin size={24} />
                        </a>
                        <a
                            href="https://github.com/suhashvelusamy"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:scale-110 transition-transform text-black"
                            aria-label="GitHub"
                        >
                            <FaGithub size={24} />
                        </a>
                        <a
                            href="https://instagram.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:scale-110 transition-transform text-black"
                            aria-label="Instagram"
                        >
                            <FaInstagram size={24} />
                        </a>
                    </div>


                </div>

                {/* Mobile Menu */}
                {isOpen && (
                    <div className="md:hidden py-4 border-t border-black animate-fadeIn">
                        <div className="flex flex-col gap-4 text-sm uppercase tracking-wider font-medium text-black text-center">
                            <a href="#resume" className="hover:underline py-2" onClick={() => setIsOpen(false)}>
                                Resume
                            </a>
                            <a href="#tech" className="hover:underline py-2" onClick={() => setIsOpen(false)}>
                                Tech Stack
                            </a>
                            <a href="#projects" className="hover:underline py-2" onClick={() => setIsOpen(false)}>
                                Projects
                            </a>
                            <a href="#profiles" className="hover:underline py-2" onClick={() => setIsOpen(false)}>
                                Profiles
                            </a>
                            <a href="#contact" className="hover:underline py-2" onClick={() => setIsOpen(false)}>
                                Contact
                            </a>
                            <div className="flex justify-center gap-6 mt-4 pt-4 border-t border-gray-200">
                                <a href="https://twitter.com" target="_blank" rel="noopener" className="text-black"><FaTwitter size={24} /></a>
                                <a href="https://linkedin.com" target="_blank" rel="noopener" className="text-black"><FaLinkedin size={24} /></a>
                                <a href="https://github.com/suhashvelusamy" target="_blank" rel="noopener" className="text-black"><FaGithub size={24} /></a>
                                <a href="https://instagram.com" target="_blank" rel="noopener" className="text-black"><FaInstagram size={24} /></a>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
