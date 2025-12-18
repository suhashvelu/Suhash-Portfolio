import projectsData from '../data/projects.json';

const Projects = () => {
    return (
        <section
            id="projects"
            className="w-full py-16 px-6 lg:px-12 bg-white text-black border-t border-black flex justify-center"
        >
            <div className="max-w-7xl mx-auto">
                <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-12 text-center">
                    {projectsData.title.toUpperCase()}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {projectsData.projects.map((project) => (
                        <div
                            key={project.id}
                            className="border border-black group hover:bg-black hover:text-white transition-all duration-500"
                        >
                            {/* Image Placeholder */}
                            <div className="aspect-[4/3] bg-white border-b border-black flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all duration-500">
                                <div className="text-center p-8">
                                    <div className="font-serif text-8xl font-bold opacity-20">
                                        {project.id}
                                    </div>
                                </div>
                            </div>

                            {/* Project Info */}
                            <div className="p-10">
                                <p className="text-xs uppercase tracking-widest mb-4 opacity-70">
                                    {project.category}
                                </p>
                                <h3 className="font-serif text-2xl md:text-3xl font-bold mb-4">
                                    {project.title}
                                </h3>
                                <p className="text-base md:text-lg leading-relaxed">
                                    {project.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
