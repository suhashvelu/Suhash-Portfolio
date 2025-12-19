import { useState } from 'react';
import projectsData from '../data/projects.json';

const Projects = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const itemsPerView = 3;
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
                            className="flex transition-transform duration-500 ease-out gap-8"
                            style={{
                                transform: `translateX(-${currentIndex * (100 / itemsPerView + 2.67)}%)`
                            }}
                        >
                            {projectsData.projects.map((project) => (
                                <div
                                    key={project.id}
                                    className="flex-shrink-0 w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.33rem)]"
                                >
                                    <div className="border-4 border-black p-3 bg-white hover:shadow-2xl transition-shadow duration-300 h-full">
                                        {/* Inner border */}
                                        <div className="border-2 border-black h-full flex flex-col">
                                            {/* Image Placeholder */}
                                            <div className="aspect-[4/3] bg-gray-100 border-b-2 border-black flex items-center justify-center overflow-hidden">
                                                <div className="text-center p-8">
                                                    <div
                                                        className="text-9xl font-bold opacity-10"
                                                        style={{ fontFamily: "'Clash Display', sans-serif" }}
                                                    >
                                                        {project.id}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Project Info */}
                                            <div className="p-6 bg-white flex-grow flex flex-col justify-between">
                                                <h3
                                                    className="text-xl font-bold mb-3 leading-tight"
                                                    style={{ fontFamily: "'Clash Display', sans-serif" }}
                                                >
                                                    {project.title}
                                                </h3>

                                                <div className="flex items-center justify-between mt-4">
                                                    <p
                                                        className="text-xs uppercase tracking-wider opacity-60"
                                                        style={{ fontFamily: "'Clash Display', sans-serif" }}
                                                    >
                                                        {project.category}
                                                    </p>
                                                    <span
                                                        className="text-sm font-medium hover:underline cursor-pointer"
                                                        style={{ fontFamily: "'Clash Display', sans-serif" }}
                                                    >
                                                        Read
                                                    </span>
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