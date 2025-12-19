import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import heroData from '../data/hero.json';

const Hero = () => {
    const heroRef = useRef(null);
    const nameRef = useRef(null);
    const subtitleRef = useRef(null);
    const descRef = useRef(null);

    useEffect(() => {
        const tl = gsap.timeline();

        tl.fromTo(
            nameRef.current,
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
        )
            .fromTo(
                subtitleRef.current,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
                '-=0.5'
            )
            .fromTo(
                descRef.current.children,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.6, stagger: 0.2, ease: 'power2.out' },
                '-=0.4'
            );
    }, []);

    return (
        <section
            id="hero"
            ref={heroRef}
            className="w-full bg-white text-black flex justify-center border-b-2 border-black"
        >
            <div className="w-full">
                {/* Large Name Banner - Black Background */}
                <div ref={nameRef} className="bg-black text-white py-1 lg:py-2 px-6 lg:px-12">
                    <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-center leading-none tracking-tight whitespace-nowrap overflow-hidden">
                        {heroData.name.toUpperCase()}
                    </h1>
                </div>

                {/* Three Column Layout - Images and Title */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
                    {/* Left Image */}
                    <div className="aspect-[5/3] bg-gray-200 border-r-0 lg:border-r-2 border-black overflow-hidden">
                        <img
                            src="/left-image.jpg"
                            alt="Portfolio Image 1"
                            className="w-full h-full object-cover grayscale"
                            onError={(e) => {
                                e.target.style.display = 'none';
                                e.target.parentElement.style.background = '#e5e5e5';
                            }}
                        />
                    </div>

                    {/* Center - Title and Description */}
                    <div className="flex flex-col justify-center items-center px-6 py-2 lg:py-3 text-center border-r-0 lg:border-r-2 border-black">
                        <h2
                            ref={subtitleRef}
                            className="font-serif text-2xl md:text-3xl lg:text-4xl font-bold mb-3 border-b-4 border-black pb-2"
                        >
                            {heroData.title.toUpperCase()}
                        </h2>
                        <div ref={descRef} className="space-y-2 text-sm md:text-base leading-relaxed max-w-md">
                            {heroData.description.map((desc, index) => (
                                <p key={index}>{desc}</p>
                            ))}
                        </div>
                    </div>

                    {/* Right Image - Portrait */}
                    <div className="aspect-[5/3] bg-gray-200 overflow-hidden">
                        <img
                            src="/portrait/picture.jpg"
                            alt="Suhash Velusamy Portrait"
                            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                            onError={(e) => {
                                e.target.style.display = 'none';
                                e.target.parentElement.innerHTML = '<div cl3ass="w-full h-full bg-gray-300 flex items-center justify-center"><span class="text-black font-serif text-4xl">PORTRAIT</span></div>';
                            }}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
