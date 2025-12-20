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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                console.error('Contact form error:', data);
                alert(data.error || 'Something went wrong. Please try again.');
                return;
            }

            // Store JWT token locally (one per user/email)
            if (data.token && data.email) {
                localStorage.setItem('contact_token', data.token);
                localStorage.setItem('contact_email', data.email);
            }

            alert('Thank you for your message! Your details have been securely saved.');
            setFormData({ name: '', email: '', message: '' });
        } catch (error) {
            console.error('Network error while sending contact form:', error);
            alert('Unable to send message right now. Please try again later.');
        }
    };

    // Input classes
    const inputClasses = "w-full bg-transparent border-b border-black py-4 text-xl md:text-2xl focus:outline-none placeholder:text-black/40 font-serif transition-colors focus:border-black/60";

    return (
        <section id="contact" className="w-full bg-white text-black border-t border-black">
            <div className="w-full px-6 lg:px-12 py-16 lg:py-24">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
                    {/* Left Column: Huge Text */}
                    <div className="flex flex-col justify-start">
                        <h2 className="font-serif text-6xl md:text-8xl lg:text-9xl font-normal leading-[0.9] tracking-tight">
                            LET'S<br />WORK<br />TOGETHER
                        </h2>
                    </div>

                    {/* Right Column: Form */}
                    <div className="w-full lg:pt-4">
                        <form onSubmit={handleSubmit} className="space-y-12">
                            <div>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    placeholder="Your Name"
                                    className={inputClasses}
                                />
                            </div>
                            <div>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    placeholder="Your Email"
                                    className={inputClasses}
                                />
                            </div>
                            <div>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    placeholder="Tell me about your project..."
                                    rows="4"
                                    className={`${inputClasses} resize-none`}
                                />
                            </div>

                            <div className="pt-8 flex justify-start">
                                <button
                                    type="submit"
                                    className="group relative overflow-hidden rounded-full border-2 border-black px-12 py-4 text-lg font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all duration-500"
                                >
                                    <span className="relative z-10">Send Message</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
