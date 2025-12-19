import { useRef, useState, useEffect } from 'react';
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
    const marqueeRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const startX = useRef(0);
    const currentX = useRef(0);
    const speed = useRef(1); // Normal auto-scroll speed
    const animationFrameId = useRef(null);

    // Initial setups for infinite loop
    useEffect(() => {
        const marquee = marqueeRef.current;
        if (!marquee) return;

        const updatePosition = () => {
            // Speed factor - move left by default
            if (!isDragging) {
                currentX.current -= speed.current;
            }

            // Infinite loop logic
            // We assume the total width is large enough. We reset when we've scrolled half the total width (since we have 4 sets, we can reset after 2)
            // Actually, simpler logic: Reset when we've moved past 25% * 2 = 50% or just 25%.
            // Since we have 4 copies, one full set is 25% width. Let's find the width dynamically or just use percentage.
            // Using pixels is safer for drag.

            const totalWidth = marquee.scrollWidth;
            const singleSetWidth = totalWidth / 4;

            // Wrap around logic
            if (currentX.current <= -singleSetWidth) {
                currentX.current += singleSetWidth;
            } else if (currentX.current > 0) {
                currentX.current -= singleSetWidth;
            }

            marquee.style.transform = `translateX(${currentX.current}px)`;
            animationFrameId.current = requestAnimationFrame(updatePosition);
        };

        animationFrameId.current = requestAnimationFrame(updatePosition);

        return () => {
            if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
        };
    }, [isDragging]);

    const handleMouseDown = (e) => {
        setIsDragging(true);
        startX.current = e.pageX - currentX.current;
        marqueeRef.current.style.cursor = 'grabbing';
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - startX.current;
        currentX.current = x;
        // The RAF loop will pick up the new currentX and apply wrapping if needed
    };

    const handleMouseUp = () => {
        setIsDragging(false);
        if (marqueeRef.current) marqueeRef.current.style.cursor = 'grab';
    };

    const handleMouseLeave = () => {
        if (isDragging) {
            setIsDragging(false);
            if (marqueeRef.current) marqueeRef.current.style.cursor = 'grab';
        }
    };

    // Touch support
    const handleTouchStart = (e) => {
        setIsDragging(true);
        startX.current = e.touches[0].pageX - currentX.current;
    };

    const handleTouchMove = (e) => {
        if (!isDragging) return;
        const x = e.touches[0].pageX - startX.current;
        currentX.current = x;
    };

    const handleTouchEnd = () => {
        setIsDragging(false);
    };

    return (
        <section
            id="tech"
            className="w-full py-12 bg-white text-black border-t-2 border-black overflow-hidden select-none"
        >
            <h2
                className="text-4xl md:text-5xl font-bold mb-8 text-center tracking-tight"
                style={{ fontFamily: "'Melodrama', serif" }}
            >
                {techStackData.title.toUpperCase()}
            </h2>

            {/* Infinite Marquee */}
            <div
                className="relative cursor-grab active:cursor-grabbing"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseLeave}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                {/* Gradient overlays for fade effect */}
                <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
                <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

                <div
                    ref={marqueeRef}
                    className="flex whitespace-nowrap py-6 will-change-transform"
                >
                    {[...Array(4)].map((_, setIndex) => (
                        <div key={setIndex} className="flex items-center shrink-0">
                            {techStackData.skills.map((skill, index) => {
                                const IconComponent = iconMap[skill.icon];
                                return (
                                    <div key={`marquee-${setIndex}-${index}`} className="flex items-center mx-32 pointer-events-none">
                                        <div className="inline-flex items-center gap-12">
                                            {IconComponent && <IconComponent className="text-5xl" />}
                                            <span
                                                className="text-3xl uppercase tracking-wide"
                                                style={{ fontFamily: "'Clash Display', sans-serif" }}
                                            >
                                                {skill.name}
                                            </span>
                                        </div>
                                        <span className="text-4xl px-16">•</span>
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
