import React, { useState } from "react";
import { motion } from "framer-motion";
import emailjs from "emailjs-com";
import { useNavigate } from "@/shims/react-router";
import SEO from "@/components/common/SEO";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .send(
        "service_jgjg9c9", // Replace with your EmailJS service ID
        "template_esw9wcg", // Replace with your EmailJS template ID
        formData,
        "SM5dFgRcYcADs0HJ5" // Replace with your EmailJS public key
      )
      .then(
        () => {
          alert("Message sent successfully!");
          setFormData({ name: "", email: "", message: "" });
        },
        () => alert("Failed to send the message. Please try again.")
      );
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-12 bg-ecell-bg text-ecell-text py-20 relative overflow-hidden">
      <SEO
        title="Contact Us | Launchpad 2026"
        description="Have questions about Launchpad 2026? Reach out to the E-Cell BITS Hyderabad team for any queries regarding the startup competition."
        keywords={['Contact Launchpad', 'E-Cell BITS Hyderabad', 'Startup Queries', 'Launchpad 2026']}
        url="https://ecellbphc.in/launchpad/contact"
      />
      {/* Animated Heading */}
      <motion.h1
        className="text-5xl md:text-7xl font-bold text-center text-ecell-text mb-16 font-sans relative z-10"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        Get in <span className="text-ecell-primary">Touch</span>
      </motion.h1>

      {/* Container for side-by-side layout */}
      <div className="w-full max-w-6xl flex flex-col lg:flex-row gap-10 items-stretch justify-center relative z-10">
        {/* Animated Form */}
        <motion.form
          onSubmit={handleSubmit}
          className="w-full lg:w-3/5 p-8 md:p-10 rounded space-y-8 bg-card border border-hairline"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Name Field */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <label className="block text-sm font-sans text-gray-400 mb-2 uppercase tracking-wider">Your Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full bg-muted border border-hairline rounded p-4 text-ecell-text placeholder-gray-500 focus:outline-none focus:border-ecell-primary/50 focus:bg-white/10 transition-all font-sans"
            />
          </motion.div>

          {/* Email Field */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <label className="block text-sm font-sans text-gray-400 mb-2 uppercase tracking-wider">Your Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full bg-muted border border-hairline rounded p-4 text-ecell-text placeholder-gray-500 focus:outline-none focus:border-ecell-primary/50 focus:bg-white/10 transition-all font-sans"
            />
          </motion.div>

          {/* Message Field */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <label className="block text-sm font-sans text-gray-400 mb-2 uppercase tracking-wider">Your Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full bg-muted border border-hairline rounded p-4 text-ecell-text placeholder-gray-500 focus:outline-none focus:border-ecell-primary/50 focus:bg-white/10 h-48 resize-none transition-all font-sans"
            />
          </motion.div>

          {/* Submit Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <button
              type="submit"
              className="w-full py-5 rounded text-sm font-bold uppercase tracking-wider bg-lava hover:bg-lava-bright text-white transition-colors duration-200 font-sans"
            >
              Send Message
            </button>
          </motion.div>
        </motion.form>

        {/* Right Column - Startup Connect and Contact Details */}
        <div className="w-full lg:w-2/5 space-y-6 flex flex-col">
          {/* Startup Connect Section */}
          <motion.div
            className="p-8 rounded bg-card border border-hairline text-center flex-1 flex flex-col justify-center items-center relative overflow-hidden group"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="space-y-6 relative z-10">
              <h2 className="text-3xl font-bold text-ecell-text font-sans">Are You a Startup?</h2>
              <p className="text-ecell-text-muted font-sans leading-relaxed">
                Connect with E-Cell BITS Pilani Hyderabad Campus and tap into our vast ecosystem.
              </p>
              <button
                className="inline-flex items-center justify-center rounded border border-hairline-strong bg-muted px-8 py-3 text-sm font-semibold text-ecell-text transition-colors hover:border-lava hover:bg-ecell-primary"
                onClick={() => navigate('/startup-connect')}
              >
                Connect Now
              </button>
            </div>
          </motion.div>

          {/* Contact Details Section */}
          <motion.div
            className="p-8 rounded bg-card border border-hairline flex-1 flex flex-col justify-center relative overflow-hidden"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <h2 className="text-2xl font-bold text-ecell-primary mb-6 font-sans uppercase tracking-wider">Contact Info</h2>
            <div className="space-y-4 text-ecell-text-muted font-sans [&_a]:break-words">
              <div className="flex flex-col">
                <span className="text-xs text-gray-500 uppercase tracking-wider mb-1">Address</span>
                <p className="font-semibold text-ecell-text">BITS Pilani, Hyderabad Campus</p>
                <p>Hyderabad, Telangana 500078</p>
              </div>

              <div className="flex flex-col">
                <span className="text-xs text-gray-500 uppercase tracking-wider mb-1">Email</span>
                <a href="mailto:ecell@hyderabad.bits-pilani.ac.in" className="text-ecell-text hover:text-ecell-primary transition-colors font-semibold">
                  ecell@hyderabad.bits-pilani.ac.in
                </a>
              </div>

              <div className="flex flex-col space-y-2">
                <span className="text-xs text-gray-500 uppercase tracking-wider mb-1">Phone</span>

                <p className="flex justify-between items-center bg-white/5 p-3 rounded hover:bg-white/10 transition-colors">
                  <span className="text-ecell-text">Priyansh</span>
                  <a href="tel:+917440532400" className="text-ecell-primary hover:text-ecell-text transition">+91 7440532400</a>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
export { Contact as Comp };
