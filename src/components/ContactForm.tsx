import { useState } from 'react';
import { motion } from 'framer-motion';

interface FormData {
    name: string;
    email: string;
    message: string;
}

interface FormErrors {
    name?: string;
    email?: string;
    message?: string;
}

function validateForm(data: FormData): FormErrors {
    const errors: FormErrors = {};

    if (!data.name.trim()) {
        errors.name = "Name required";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        errors.email = "Please enter a valid email";
    }
    if (!data.message.trim()) {
        errors.message = "No message? :(";
    }

    return errors;
}

export default function Contact() {
    const [formData, setFormData] = useState<FormData>({ name: '', email: '', message: '' });
    const [errors, setErrors] = useState<FormErrors>({});
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
        if (errors[e.target.name as keyof FormErrors]) {
            setErrors(prev => ({ ...prev, [e.target.name]: undefined }));
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const validationErrors = validateForm(formData);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setStatus('loading');
        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            if (!res.ok) throw new Error();
            setStatus('success');
            setFormData({ name: '', email: '', message: '' });
        } catch {
            setStatus('error');
        }
    };

    return (
        <div id="contact" className="shadow-inner min-h-screen bg-repeat flex items-center justify-center py-24 px-4" style={{ backgroundImage: "url('/Mongolian.jpg')" }}>
            <motion.div
                className="w-full max-w-5xl rounded-xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300 border-4 border-[#C7984F]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
            >
                <div className="bg-[#4E3828] text-[#F5F0EB] px-6 md:px-12 py-8 font-serif">
                    <h2 className="text-center text-3xl font-extrabold pb-4 mb-8 border-b-4 border-[#4A5E3A]">Get in Touch</h2>

                    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-semibold mb-1">Name</label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full rounded-lg bg-[#3B2A1A] border border-[#C7984F] text-[#F5F0EB] px-4 py-2 font-serif focus:outline-none focus:ring-2 focus:ring-[#C7984F]"
                            />
                            {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-semibold mb-1">Email</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full rounded-lg bg-[#3B2A1A] border border-[#C7984F] text-[#F5F0EB] px-4 py-2 font-serif focus:outline-none focus:ring-2 focus:ring-[#C7984F]"
                            />
                            {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
                        </div>

                        <div>
                            <label htmlFor="message" className="block text-sm font-semibold mb-1">Message</label>
                            <textarea
                                id="message"
                                name="message"
                                rows={5}
                                value={formData.message}
                                onChange={handleChange}
                                className="w-full rounded-lg bg-[#3B2A1A] border border-[#C7984F] text-[#F5F0EB] px-4 py-2 font-serif resize-none focus:outline-none focus:ring-2 focus:ring-[#C7984F]"
                            />
                            {errors.message && <p className="text-red-400 text-sm mt-1">{errors.message}</p>}
                        </div>

                        <div className="text-center">
                            <button
                                type="submit"
                                disabled={status === 'loading'}
                                className="bg-[#C7984F] text-[#3B2A1A] font-bold px-8 py-2 rounded-lg hover:bg-[#D9B97A] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {status === 'loading' ? 'Sending...' : 'Send Message'}
                            </button>
                        </div>

                        {status === 'success' && (
                            <p className="text-center text-[#8FAE7E] font-semibold">Message sent! I'll get back to you soon.</p>
                        )}
                        {status === 'error' && (
                            <p className="text-center text-red-400 font-semibold">Something went wrong. Please try again.</p>
                        )}
                    </form>
                </div>
            </motion.div>
        </div>
    );
}
