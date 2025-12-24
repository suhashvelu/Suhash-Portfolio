import { useState, useEffect } from 'react';
import projectsData from '../data/projects.json';

const Projects = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [itemsPerView, setItemsPerView] = useState(3);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setItemsPerView(1);
            } else if (window.innerWidth < 1024) {
                setItemsPerView(2);
            } else {
                setItemsPerView(3);
            }
        };

        handleResize(); // Set initial value
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const maxIndex = Math.max(0, projectsData.projects.length - itemsPerView);

    const handlePrev = () => {
        setCurrentIndex((prev) => Math.max(0, prev - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
    };

    return (
        <section
            id="projects"
            className="w-full py-16 px-6 lg:px-12 bg-white text-black border-t-2 border-black flex justify-center overflow-hidden"
        >
            <div className="max-w-7xl mx-auto w-full">
                <h2
                    className="text-4xl md:text-5xl font-bold mb-12 text-center"
                    style={{ fontFamily: "'Melodrama', serif" }}
                >
                    {projectsData.title.toUpperCase()}
                </h2>

                {/* Carousel Container */}
                <div className="relative px-16">
                    {/* Navigation Arrows - Positioned outside */}
                    <button
                        onClick={handlePrev}
                        disabled={currentIndex === 0}
                        className="absolute -left-2 top-1/2 -translate-y-1/2 z-10 w-12 h-12 border-2 border-black bg-white hover:bg-black hover:text-white transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
                        aria-label="Previous"
                    >
                        ←
                    </button>

                    <button
                        onClick={handleNext}
                        disabled={currentIndex >= maxIndex}
                        className="absolute -right-2 top-1/2 -translate-y-1/2 z-10 w-12 h-12 border-2 border-black bg-white hover:bg-black hover:text-white transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
                        aria-label="Next"
                    >
                        →
                    </button>

                    {/* Slides Container */}
                    <div className="overflow-hidden">
                        <div
                            className={`flex transition-transform duration-500 ease-out gap-8`}
                            style={{
                                transform: `translateX(-${currentIndex * (100 / itemsPerView + (itemsPerView === 1 ? 0 : 2.67 / itemsPerView))}%)`
                            }}
                        >
                            {projectsData.projects.map((project) => (
                                <div
                                    key={project.id}
                                    className={`flex-shrink-0 w-full ${itemsPerView === 2 ? 'md:w-[calc(50%-1rem)]' : ''} ${itemsPerView === 3 ? 'lg:w-[calc(33.333%-1.33rem)]' : ''}`}
                                    style={{ width: itemsPerView === 1 ? '100%' : undefined }}
                                >
                                    <div className="border-4 border-black p-3 bg-white hover:shadow-2xl transition-shadow duration-300 h-full">
                                        {/* Inner border */}
                                        <div className="border-2 border-black h-full flex flex-col">
                                            {/* Image Placeholder */}
                                            <div className="aspect-[4/3] bg-gray-100 border-b-2 border-black flex items-center justify-center overflow-hidden relative group">
                                                {project.image ? (
                                                    <img
                                                        src={project.image}
                                                        alt={project.title}
                                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                    />
                                                ) : (
                                                    <div className="text-center p-8">
                                                        <div
                                                            className="text-9xl font-bold opacity-10"
                                                            style={{ fontFamily: "'Clash Display', sans-serif" }}
                                                        >
                                                            {project.id}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Project Info */}
                                            <div className="p-6 bg-white flex-grow flex flex-col justify-between h-[300px]">
                                                <div>
                                                    <h3
                                                        className="text-xl font-bold mb-3 leading-tight line-clamp-2"
                                                        style={{ fontFamily: "'Clash Display', sans-serif" }}
                                                    >
                                                        {project.title}
                                                    </h3>
                                                    <p className="text-sm opacity-80 mb-4 line-clamp-3">
                                                        {project.description}
                                                    </p>

                                                    {project.techStack && (
                                                        <div className="mb-4">
                                                            <p className="text-xs font-bold uppercase tracking-wider mb-1">Tech Stack:</p>
                                                            <p className="text-xs opacity-70 italic line-clamp-2">{project.techStack}</p>
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="flex flex-col gap-4 mt-auto">
                                                    <div className="flex items-center justify-between">
                                                        <p
                                                            className="text-xs uppercase tracking-wider opacity-60"
                                                            style={{ fontFamily: "'Clash Display', sans-serif" }}
                                                        >
                                                            {project.category}
                                                        </p>
                                                    </div>

                                                    <div className="flex gap-3">
                                                        {project.githubLink && project.githubLink !== '#' && (
                                                            <a
                                                                href={project.githubLink}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="flex-1 bg-black text-white text-center py-2 text-sm font-bold uppercase tracking-wider hover:bg-black/80 transition-colors"
                                                            >
                                                                GitHub
                                                            </a>
                                                        )}
                                                        {project.demoLink && project.demoLink !== '#' && (
                                                            <a
                                                                href={project.demoLink}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="flex-1 border-2 border-black text-black text-center py-2 text-sm font-bold uppercase tracking-wider hover:bg-black hover:text-white transition-colors"
                                                            >
                                                                Demo
                                                            </a>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Projects;