import { useState } from 'react';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Form submission logic would go here
        console.log('Form submitted:', formData);
        alert('Thank you for your message! This is a demo form.');
        setFormData({ name: '', email: '', message: '' });
    };

    return (
        <section
            id="contact"
            className="w-full px-6 lg:px-12 py-12 bg-white text-black border-t border-black flex justify-center"
        >
            <div className="max-w-4xl w-full">
                <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-10 text-center">
                    CONTACT ME
                </h2>

                <form onSubmit={handleSubmit} className="space-y-10">
                    {/* Name Input */}
                    <div className="relative">
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            placeholder="YOUR NAME"
                            className="w-full bg-transparent border-b-2 border-black py-4 text-lg focus:outline-none placeholder:text-black placeholder:opacity-40"
                        />
                    </div>

                    {/* Email Input */}
                    <div className="relative">
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="YOUR EMAIL"
                            className="w-full bg-transparent border-b-2 border-black py-4 text-lg focus:outline-none placeholder:text-black placeholder:opacity-40"
                        />
                    </div>

                    {/* Message Input */}
                    <div className="relative">
                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            placeholder="YOUR MESSAGE"
                            rows="6"
                            className="w-full bg-transparent border-b-2 border-black py-4 text-lg focus:outline-none resize-none placeholder:text-black placeholder:opacity-40"
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="text-center">
                        <button
                            type="submit"
                            className="border-2 border-black px-12 py-4 text-lg uppercase tracking-widest font-semibold hover:bg-black hover:text-white transition-all duration-300"
                        >
                            Send Message
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default Contact;
