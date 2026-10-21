import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Container } from './ui';

const Hero = () => {
  return (
    <section className="relative min-h-[100svh] flex flex-col justify-center overflow-hidden bg-brand-navy text-brand-cream">
      <Container className="pt-32 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="max-w-5xl"
        >
          <Link
            to="/blog"
            className="group inline-flex items-center gap-2 mb-8 pl-1.5 pr-3.5 py-1.5 rounded-full border border-brand-cream/20 bg-brand-cream/10 backdrop-blur-md font-copy text-[11px] sm:text-sm text-brand-cream/85 no-underline hover:bg-brand-cream/20 hover:text-brand-cream transition-colors"
          >
            <span className="shrink-0 whitespace-nowrap px-2 py-0.5 rounded-full bg-brand-cream text-brand-navy text-[10px] sm:text-[11px] font-bold uppercase tracking-wider">
              New Blog
            </span>
            Entrepreneurship & Founder Playbook
            <ArrowRight className="w-3.5 h-3.5 shrink-0 transition-transform group-hover:translate-x-0.5" />
          </Link>

          <p className="mb-5 font-copy text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] text-brand-cream/70">
            Ideate · Innovate · Incubate
          </p>

          <h1 className="m-0 text-[1.9rem] leading-[1.1] sm:text-5xl md:text-6xl lg:text-[4.25rem] font-bold tracking-tight text-brand-cream">
            Entrepreneurship Cell,{' '}
            <span className="text-brand-cream/60">BITS Pilani Hyderabad Campus.</span>
          </h1>

          <p className="mt-7 mb-0 max-w-2xl font-copy text-base sm:text-lg md:text-xl leading-relaxed text-brand-cream/80">
            Fostering entrepreneurship and innovation through our events and programs, including
            Launchpad, the largest E-Summit of South India.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Link
              to="/program"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-brand-cream text-brand-navy font-copy font-bold text-sm sm:text-base no-underline hover:bg-white transition-colors"
            >
              Explore our programs
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/launchpad"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full border border-brand-cream/30 text-brand-cream font-copy font-semibold text-sm sm:text-base no-underline hover:bg-brand-cream hover:text-brand-navy transition-colors"
            >
              Launchpad '26
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

export default Hero;
