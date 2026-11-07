import React, { useState } from "react";
import { motion } from "framer-motion";
import emailjs from "emailjs-com";
import { useNavigate } from "react-router-dom";

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
        "service_jgjg9c9",
        "template_esw9wcg",
        formData,
        "SM5dFgRcYcADs0HJ5"
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
          className="w-full lg:w-3/5 p-8 md:p-10 rounded-2xl space-y-8 bg-card border border-hairline shadow-sm"
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
            <label htmlFor="name" className="block text-sm font-sans text-ecell-text-muted mb-2 uppercase tracking-wider font-semibold">Your Name</label>
            <input
              type="text"
              id="name"
              name="name"
              autoComplete="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full bg-muted border border-hairline rounded-xl p-4 text-ecell-text placeholder-gray-500 focus:outline-none focus:border-ecell-primary/50 focus:bg-white transition-all font-sans"
            />
          </motion.div>

          {/* Email Field */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <label htmlFor="email" className="block text-sm font-sans text-ecell-text-muted mb-2 uppercase tracking-wider font-semibold">Your Email</label>
            <input
              type="email"
              id="email"
              name="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full bg-muted border border-hairline rounded-xl p-4 text-ecell-text placeholder-gray-500 focus:outline-none focus:border-ecell-primary/50 focus:bg-white transition-all font-sans"
            />
          </motion.div>

          {/* Message Field */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <label htmlFor="message" className="block text-sm font-sans text-ecell-text-muted mb-2 uppercase tracking-wider font-semibold">Your Message</label>
            <textarea
              id="message"
              name="message"
              autoComplete="off"
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full bg-muted border border-hairline rounded-xl p-4 text-ecell-text placeholder-gray-500 focus:outline-none focus:border-ecell-primary/50 focus:bg-white h-48 resize-none transition-all font-sans"
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
              className="w-full py-4 rounded-xl text-sm font-bold uppercase tracking-wider bg-brand-navy hover:bg-brand-maroon text-brand-cream transition-colors duration-200 font-sans shadow-md"
            >
              Send Message
            </button>
          </motion.div>
        </motion.form>

        {/* Right Column - Startup Connect and Contact Details */}
        <div className="w-full lg:w-2/5 space-y-6 flex flex-col">
          {/* Startup Connect Section */}
          <motion.div
            className="p-8 rounded-2xl bg-card border border-hairline text-center flex-1 flex flex-col justify-center items-center relative overflow-hidden group shadow-sm"
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
                className="inline-flex items-center justify-center rounded-full border border-hairline-strong bg-brand-navy px-8 py-3 text-sm font-semibold text-brand-cream transition-colors hover:bg-brand-maroon"
                onClick={() => navigate('/startup-connect')}
              >
                Connect Now
              </button>
            </div>
          </motion.div>

          {/* Contact Details Section */}
          <motion.div
            className="p-8 rounded-2xl bg-card border border-hairline flex-1 flex flex-col justify-center relative overflow-hidden shadow-sm"
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
                <p className="flex justify-between items-center bg-raised p-3 rounded-xl border border-hairline">
                  <span className="text-ecell-text font-medium">Sampooran Sinha</span>
                  <a href="tel:+917003712277" className="text-ecell-primary hover:text-brand-maroon transition font-semibold">+91 70037 12277</a>
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
