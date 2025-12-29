import { useState, useEffect } from 'react';
import projectsData from '../data/projects.json';
import { FaGithub, FaExternalLinkAlt, FaChevronLeft, FaChevronRight } from "react-icons/fa";

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
            className="w-full py-20 px-6 lg:px-12 bg-white text-black border-t border-neutral-200 overflow-hidden"
        >
            <div className="max-w-7xl mx-auto w-full relative">
                {/* Header */}
                <div className="flex flex-col items-center justify-center mb-16 text-center">
                    <h2 className="text-5xl md:text-7xl font-bold font-['Melodrama'] mb-6 tracking-tight">
                        {projectsData.title}
                    </h2>
                    <div className="h-1 w-24 bg-black rounded-full"></div>
                </div>

                {/* Carousel Container */}
                <div className="relative px-4 md:px-16">
                    {/* Navigation Arrows */}
                    <button
                        onClick={handlePrev}
                        disabled={currentIndex === 0}
                        className="absolute left-0 md:-left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 md:w-16 md:h-16 flex items-center justify-center border border-black/10 bg-white rounded-full text-black hover:bg-black hover:text-white hover:border-black transition-all duration-300 disabled:opacity-0 disabled:cursor-not-allowed shadow-lg hover:shadow-xl group"
                        aria-label="Previous"
                    >
                        <FaChevronLeft className="text-xl group-hover:-translate-x-1 transition-transform duration-300" />
                    </button>

                    <button
                        onClick={handleNext}
                        disabled={currentIndex >= maxIndex}
                        className="absolute right-0 md:-right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 md:w-16 md:h-16 flex items-center justify-center border border-black/10 bg-white rounded-full text-black hover:bg-black hover:text-white hover:border-black transition-all duration-300 disabled:opacity-0 disabled:cursor-not-allowed shadow-lg hover:shadow-xl group"
                        aria-label="Next"
                    >
                        <FaChevronRight className="text-xl group-hover:translate-x-1 transition-transform duration-300" />
                    </button>

                    {/* Slides Window */}
                    <div className="overflow-hidden py-10 -my-10">
                        <div
                            className="flex transition-transform duration-700 cubic-bezier(0.25, 1, 0.5, 1) gap-8"
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
                                    <div className="group h-full bg-white border border-neutral-200 hover:border-black/50 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 flex flex-col rounded-xl overflow-hidden relative">

                                        {/* Content Area */}
                                        <div className="p-8 flex flex-col flex-grow relative h-full">
                                            <div className="mb-6">
                                                <span className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-3 block font-['Clash_Display']">
                                                    {project.category}
                                                </span>
                                                <h3 className="text-3xl font-bold leading-tight font-['Clash_Display'] group-hover:text-black/80 transition-colors mb-2">
                                                    {project.title}
                                                </h3>
                                                <div className="h-0.5 w-12 bg-black/10 group-hover:w-full transition-all duration-500 ease-out"></div>
                                            </div>

                                            <p className="text-neutral-600 text-sm leading-relaxed mb-8 line-clamp-4 flex-grow">
                                                {project.description}
                                            </p>

                                            <div className="mt-auto flex flex-col gap-6">
                                                {project.techStack && (
                                                    <div className="flex flex-wrap gap-2">
                                                        {project.techStack.split(',').map((tech, index) => (
                                                            <span
                                                                key={index}
                                                                className="text-[10px] font-semibold uppercase tracking-wider px-2 py-1 bg-neutral-100 rounded-md text-neutral-600 border border-neutral-200"
                                                            >
                                                                {tech.trim()}
                                                            </span>
                                                        ))}
                                                    </div>
                                                )}

                                                <div className="flex gap-4 pt-4 border-t border-neutral-100">
                                                    {project.githubLink && project.githubLink !== '#' && (
                                                        <a
                                                            href={project.githubLink}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-black hover:opacity-70 transition-opacity"
                                                        >
                                                            <FaGithub size={16} />
                                                            <span>Code</span>
                                                        </a>
                                                    )}
                                                    {project.demoLink && project.demoLink !== '#' && (
                                                        <a
                                                            href={project.demoLink}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-black hover:opacity-70 transition-opacity"
                                                        >
                                                            <FaExternalLinkAlt size={14} />
                                                            <span>Live Demo</span>
                                                        </a>
                                                    )}
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