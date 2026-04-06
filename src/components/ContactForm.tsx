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
  if (!data.name.trim()) errors.name = 'Name required';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = 'Please enter a valid email';
  if (!data.message.trim()) errors.message = 'No message? :(';
  return errors;
}

const fieldClass = `
  w-full rounded-none bg-[#2A1D12] border-b-2 border-[#C7984F]/40 text-[#F5F0EB] px-4 py-3
  focus:outline-none focus:border-[#C7984F] transition-colors duration-250
  placeholder:text-[#F5F0EB]/25
`.trim();

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

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) { setErrors(validationErrors); return; }
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
    <div
      id="contact"
      className="relative min-h-screen flex items-center justify-center py-24 px-4 bg-repeat shadow-inner"
      style={{ backgroundImage: "url('/Mongolian.jpg')" }}
    >
      {/* Light scrim — keeps image visible but readable */}
      <div className="absolute inset-0 bg-[#1A1008]/38 pointer-events-none" />

      {/* Floating gold dust particles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-[#C7984F] pointer-events-none"
          style={{ left: `${10 + i * 11}%`, top: `${20 + (i % 3) * 25}%` }}
          animate={{ y: [0, -25, 0], opacity: [0.1, 0.5, 0.1] }}
          transition={{ duration: 3 + i * 0.4, repeat: Infinity, delay: i * 0.6, ease: 'easeInOut' }}
        />
      ))}

      <motion.div
        className="relative w-full max-w-5xl"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Outer decorative frame */}
        <div
          className="rounded-xl overflow-hidden"
          style={{ boxShadow: '0 0 0 4px #C7984F, 0 0 60px rgba(199,152,79,0.2), 0 24px 60px rgba(0,0,0,0.6)' }}
        >

          {/* Header bar */}
          <div className="bg-[#3B2A1A] px-6 md:px-14 py-6 border-b-4 border-[#C7984F] relative overflow-hidden">
            {/* Grain */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.06]" xmlns="http://www.w3.org/2000/svg">
              <filter id="contact-grain">
                <feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves="3" stitchTiles="stitch"/>
              </filter>
              <rect width="100%" height="100%" filter="url(#contact-grain)"/>
            </svg>

            {/* Corner accents */}
            <div className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-[#C7984F]/40"/>
            <div className="absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 border-[#C7984F]/40"/>

            <h2
              className="relative text-center text-3xl md:text-4xl font-extrabold text-[#F5F0EB] tracking-wide"
              style={{ fontFamily: "'Playfair Display SC', serif" }}
            >
              Get in Touch
            </h2>
            <p
              className="relative text-center text-[#F5F0EB]/55 mt-2 text-base md:text-lg italic tracking-wide"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300 }}
            >
              I'd love to hear from you
            </p>
          </div>

          {/* Form body */}
          <div
            className="bg-[#4E3828] text-[#F5F0EB] px-6 md:px-14 py-10 relative overflow-hidden"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
              <filter id="form-grain">
                <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/>
              </filter>
              <rect width="100%" height="100%" filter="url(#form-grain)"/>
            </svg>

            <form onSubmit={handleSubmit} className="relative max-w-2xl mx-auto space-y-7">

              {/* Name */}
              <motion.div
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <label htmlFor="name" className="block text-sm font-semibold mb-2 tracking-widest uppercase text-[#C7984F]/80">
                  Name
                </label>
                <input
                  id="name" name="name" type="text"
                  value={formData.name} onChange={handleChange}
                  placeholder="Your name"
                  className={fieldClass}
                  style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.05rem' }}
                />
                {errors.name && <p className="text-red-400 text-sm mt-1.5 italic">{errors.name}</p>}
              </motion.div>

              {/* Email */}
              <motion.div
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <label htmlFor="email" className="block text-sm font-semibold mb-2 tracking-widest uppercase text-[#C7984F]/80">
                  Email
                </label>
                <input
                  id="email" name="email" type="email"
                  value={formData.email} onChange={handleChange}
                  placeholder="your@email.com"
                  className={fieldClass}
                  style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.05rem' }}
                />
                {errors.email && <p className="text-red-400 text-sm mt-1.5 italic">{errors.email}</p>}
              </motion.div>

              {/* Message */}
              <motion.div
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <label htmlFor="message" className="block text-sm font-semibold mb-2 tracking-widest uppercase text-[#C7984F]/80">
                  Message
                </label>
                <textarea
                  id="message" name="message" rows={5}
                  value={formData.message} onChange={handleChange}
                  placeholder="What's on your mind?"
                  className={`${fieldClass} resize-none border-2 border-[#C7984F]/20 focus:border-[#C7984F]/60 rounded`}
                  style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.05rem' }}
                />
                {errors.message && <p className="text-red-400 text-sm mt-1.5 italic">{errors.message}</p>}
              </motion.div>

              {/* Submit */}
              <motion.div
                className="text-center pt-2"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <motion.button
                  type="submit"
                  disabled={status === 'loading'}
                  className="relative overflow-hidden bg-[#C7984F] text-[#3B2A1A] font-bold px-10 py-3 rounded tracking-widest uppercase text-sm hover:bg-[#D9B97A] disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  whileHover={{ scale: 1.03, boxShadow: '0 0 24px rgba(199,152,79,0.5)' }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.15 }}
                >
                  {status === 'loading' ? 'Sending…' : 'Send Message'}
                </motion.button>
              </motion.div>

              {status === 'success' && (
                <motion.p
                  className="text-center text-[#8FAE7E] font-semibold text-lg italic"
                  initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  Message sent! I'll get back to you soon.
                </motion.p>
              )}
              {status === 'error' && (
                <motion.p
                  className="text-center text-red-400 font-semibold text-lg italic"
                  initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  Something went wrong. Please try again.
                </motion.p>
              )}
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
