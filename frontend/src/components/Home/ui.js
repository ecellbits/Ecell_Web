import React from 'react';
import { motion } from 'framer-motion';

// Shared building blocks for the homepage sections so every section
// uses the same container width, spacing and heading style.
// Palette: brand-cream (background), brand-navy (highlights / CTAs), brand-ink (text).

export const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.6, ease: 'easeOut' },
};

export const Container = ({ className = '', children }) => (
  <div className={`relative w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 ${className}`}>
    {children}
  </div>
);

export const Section = ({ id, className = '', children }) => (
  <section id={id} className={`relative py-20 md:py-28 ${className}`}>
    {children}
  </section>
);

export const SectionHeading = ({ title, description, align = 'left', dark = false, action }) => (
  <motion.div
    {...fadeUp}
    className={`mb-12 md:mb-16 flex flex-col gap-6 ${align === 'center' ? 'items-center text-center' : 'md:flex-row md:items-end md:justify-between'}`}
  >
    <div className="max-w-3xl">
      <h2 className={`m-0 text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-[1.1] ${dark ? 'text-brand-cream' : 'text-brand-ink'}`}>
        {title}
      </h2>
      {description && (
        <p className={`mt-5 mb-0 font-copy text-base md:text-lg leading-relaxed ${dark ? 'text-brand-cream/70' : 'text-black/60'}`}>
          {description}
        </p>
      )}
    </div>
    {action}
  </motion.div>
);
