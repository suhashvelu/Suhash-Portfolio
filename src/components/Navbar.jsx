import { useState } from 'react';
import { FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="w-full bg-white border-b-2 border-black sticky top-0 z-50">
            <div className="w-full px-6 lg:px-12">
                {/* Top Row - Logo, Title, Date */}
                <div className="flex items-center justify-between py-4 border-b border-black">
                    {/* Logo/Icon Placeholder */}
                    <div className="w-16 h-16 border-2 border-black flex items-center justify-center">
                        <span className="font-serif text-2xl font-bold">SV</span>
                    </div>

                    {/* Center Title */}
                    <h1 className="font-serif text-2xl md:text-3xl font-bold text-center">
                        Portfolio
                    </h1>

                    {/* Date */}
                    <div className="text-sm text-right hidden md:block">
                        {new Date().toLocaleDateString('en-US', {
                            weekday: 'long',
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                        })}
                    </div>
                </div>

                {/* Bottom Row - Navigation Links and Social Icons */}
                <div className="flex items-center justify-between py-4">
                    {/* Navigation Links */}
                    <div className="hidden md:flex gap-8 text-sm uppercase tracking-wider font-medium">
                        <a href="#hero" className="hover:underline transition-all">
                            About Me
                        </a>
                        <a href="#projects" className="hover:underline transition-all">
                            Projects
                        </a>
                        <a href="#tech" className="hover:underline transition-all">
                            Tech Stack
                        </a>
                        <a href="#profiles" className="hover:underline transition-all">
                            Profiles
                        </a>
                        <a href="#contact" className="hover:underline transition-all">
                            Contact
                        </a>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-2xl"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        ☰
                    </button>

                    {/* Social Icons */}
                    <div className="flex gap-4 text-xl">
                        <a
                            href="https://twitter.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:scale-110 transition-transform"
                        >
                            <FaTwitter />
                        </a>
                        <a
                            href="https://linkedin.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:scale-110 transition-transform"
                        >
                            <FaLinkedin />
                        </a>
                        <a
                            href="https://github.com/suhashvelusamy"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:scale-110 transition-transform"
                        >
                            <FaGithub />
                        </a>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isOpen && (
                    <div className="md:hidden py-4 border-t border-black">
                        <div className="flex flex-col gap-4 text-sm uppercase tracking-wider font-medium">
                            <a href="#hero" className="hover:underline" onClick={() => setIsOpen(false)}>
                                About Me
                            </a>
                            <a href="#projects" className="hover:underline" onClick={() => setIsOpen(false)}>
                                Projects
                            </a>
                            <a href="#tech" className="hover:underline" onClick={() => setIsOpen(false)}>
                                Tech Stack
                            </a>
                            <a href="#profiles" className="hover:underline" onClick={() => setIsOpen(false)}>
                                Profiles
                            </a>
                            <a href="#contact" className="hover:underline" onClick={() => setIsOpen(false)}>
                                Contact
                            </a>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
