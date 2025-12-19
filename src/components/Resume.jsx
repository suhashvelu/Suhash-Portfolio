import { useState } from 'react';
import educationData from '../data/education.json';
import certificationsData from '../data/certifications.json';
import { FaDownload, FaEye } from 'react-icons/fa';

const Resume = () => {
    const [showPreview, setShowPreview] = useState(false);
    const [selectedCertImage, setSelectedCertImage] = useState(null);

    return (
        <section id="resume" className="w-full bg-white text-black border-t border-black px-6 lg:px-12 py-16 lg:py-24 relative">
            {/* Certificate Image Modal */}
            {selectedCertImage && (
                <div
                    className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-4 cursor-pointer animate-fadeIn"
                    onClick={() => setSelectedCertImage(null)}
                >
                    <div className="relative max-w-4xl w-full max-h-[90vh]">
                        <img
                            src={selectedCertImage}
                            alt="Certificate Preview"
                            className="w-full h-full object-contain border-2 border-white"
                        />
                        <button
                            className="absolute -top-12 right-0 text-white font-serif text-xl hover:underline"
                            onClick={() => setSelectedCertImage(null)}
                        >
                            CLOSE [X]
                        </button>
                    </div>
                </div>
            )}

            <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">

                {/* Left Column: Header & Actions */}
                <div className="flex flex-col gap-8 lg:w-1/3 shrink-0">
                    <h2 className="font-serif text-6xl md:text-8xl lg:text-9xl font-normal leading-[0.9] tracking-tight">
                        RESUME
                    </h2>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <a
                            href="/resume/resume.pdf"
                            download="Suhash_Velusamy_Resume.pdf"
                            className="flex items-center justify-center gap-3 bg-black text-white px-8 py-4 font-bold uppercase tracking-widest hover:bg-black/80 transition-colors"
                        >
                            <FaDownload /> Download
                        </a>
                        <button
                            onClick={() => setShowPreview(!showPreview)}
                            className="flex items-center justify-center gap-3 border-2 border-black px-8 py-4 font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-colors"
                        >
                            <FaEye /> {showPreview ? 'Hide Preview' : 'View Preview'}
                        </button>
                    </div>

                    {showPreview && (
                        <div className="mt-8 border-2 border-black h-[500px] w-full animate-fadeIn hidden lg:block">
                            <iframe
                                src="/resume/resume.pdf"
                                title="Resume Preview"
                                className="w-full h-full"
                            />
                        </div>
                    )}
                </div>

                {/* Right Column: Content */}
                <div className="flex flex-col gap-16 lg:w-2/3">

                    {/* Education Section */}
                    <div>
                        <h3 className="font-serif text-4xl md:text-5xl font-bold mb-10 border-b-2 border-black pb-4 inline-block">
                            {educationData.title.toUpperCase()}
                        </h3>
                        <div className="space-y-12">
                            {educationData.education.map((edu) => (
                                <div key={edu.id} className="group">
                                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-2">
                                        <h4 className="text-2xl md:text-3xl font-bold font-serif">{edu.degree}</h4>
                                        <span className="text-sm md:text-base font-medium tracking-wider bg-black text-white px-3 py-1 rounded-full mt-2 md:mt-0">{edu.year}</span>
                                    </div>
                                    <p className="text-xl italic mb-2">{edu.institution}</p>
                                    <p className="text-black/60">{edu.details}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Certifications Section */}
                    <div>
                        <h3 className="font-serif text-4xl md:text-5xl font-bold mb-10 border-b-2 border-black pb-4 inline-block">
                            {certificationsData.title.toUpperCase()}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {certificationsData.certifications.map((cert) => (
                                <div
                                    key={cert.id}
                                    className={`border border-black p-6 transition-colors duration-300 group ${cert.image ? 'cursor-pointer hover:bg-black hover:text-white' : 'cursor-default'}`}
                                    onClick={() => cert.image && setSelectedCertImage(cert.image)}
                                >
                                    <h4 className="text-xl md:text-2xl font-bold font-serif mb-2 flex items-center gap-2">
                                        {cert.name}
                                        {cert.image && <FaEye className="text-sm opacity-50" />}
                                    </h4>
                                    <div className="flex justify-between items-end">
                                        <p className={`opacity-60 text-sm ${cert.image ? 'group-hover:opacity-80' : ''}`}>{cert.issuer}</p>
                                        <span className="text-sm font-medium">{cert.year}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Mobile Preview (Shown below content on mobile) */}
                    {showPreview && (
                        <div className="mt-8 border-2 border-black h-[400px] w-full animate-fadeIn lg:hidden">
                            <iframe
                                src="/resume/resume.pdf"
                                title="Resume Preview"
                                className="w-full h-full"
                            />
                        </div>
                    )}

                </div>
            </div>
        </section>
    );
};

export default Resume;
