import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Loader = () => {
    const logoRef = useRef(null);

    useEffect(() => {
        const tl = gsap.timeline({ repeat: -1, yoyo: true });

        // Simple pulse animation
        tl.to(logoRef.current, {
            scale: 1.1,
            opacity: 0.8,
            duration: 0.8,
            ease: "power1.inOut"
        });

        return () => {
            tl.kill();
        };
    }, []);

    return (
        <div className="fixed inset-0 bg-white z-[100] flex flex-col items-center justify-center gap-4">
            <div className="w-32 h-32 md:w-48 md:h-48 relative">
                <img
                    ref={logoRef}
                    src="/Logo/s3v.svg"
                    alt="Loading..."
                    className="w-full h-full object-contain"
                />
            </div>
            <p className="text-sm md:text-base font-bold uppercase tracking-[0.2em] text-black/60 animate-pulse font-serif">
                Grab your paper...
            </p>
        </div>
    );
};

export default Loader;
