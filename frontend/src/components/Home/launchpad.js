import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import lpLogo from '../../assets/ecell/lp_logo_new.png';
import memory1 from '../../assets/lpevents/pitcherspilot/memory1.png';
import memory2 from '../../assets/lpevents/pitcherspilot/memory2.jpg';
import memory3 from '../../assets/lpevents/pitcherspilot/memory3.png';
import memory4 from '../../assets/lpevents/pitcherspilot/memory4.png';
import memory5 from '../../assets/lpevents/pitcherspilot/memory5.png';
import { Container, Section, fadeUp } from './ui';

const events = [
  { name: 'Pitchers Pilot', link: '/launchpad/pitchers_pilot' },
  { name: 'Internship Drive', link: '/launchpad/internship_drive' },
  { name: 'Ground Reality', link: '/launchpad/ground_reality' },
  { name: 'Startup Expo', link: '/launchpad/startup_expo' },
  { name: 'Teen Tycoons', link: '/launchpad/teen_tycoons' },
  { name: 'SEED', link: '/launchpad/seed' },
];

const carouselImages = [memory1, memory2, memory3, memory4, memory5];

const Launchpad = () => {
  const [currentImg, setCurrentImg] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImg((prev) => (prev + 1) % carouselImages.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  return (
    <Section className="bg-brand-navy text-brand-cream overflow-hidden">
      <Container>
        <motion.h2
          {...fadeUp}
          className="m-0 mb-12 md:mb-16 text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-brand-cream"
        >
          Launchpad
        </motion.h2>

        {/* Logo & Description Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-center pb-14 md:pb-20 border-b border-brand-cream/15">
          <motion.div {...fadeUp} className="md:col-span-4 flex md:justify-start">
            <img src={lpLogo} alt="LP'26" className="w-[160px] md:w-[240px] h-auto object-contain" loading="lazy" />
          </motion.div>
          <motion.p
            {...fadeUp}
            className="md:col-span-8 m-0 font-copy text-lg sm:text-xl md:text-2xl font-light leading-snug text-brand-cream/90"
          >
            Ignite entrepreneurial passion at our 3-day summit featuring industry leaders, innovative startups, and knowledge-sharing for the next generation.
          </motion.p>
        </div>

        {/* Our Events */}
        <div className="py-14 md:py-20">
          <motion.div {...fadeUp} className="flex items-center justify-between gap-4 mb-8">
            <h3 className="m-0 font-copy text-sm font-bold uppercase tracking-[0.2em] text-brand-cream/60">Our Events</h3>
            <Link
              to="/launchpad/events"
              className="inline-flex items-center gap-1.5 font-copy text-sm font-semibold text-brand-cream no-underline hover:underline"
            >
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border-t border-brand-cream/15">
            {events.map((event, i) => (
              <Link
                key={event.name}
                to={event.link}
                className="group flex items-center justify-between gap-4 py-5 sm:px-4 border-b border-brand-cream/15 text-brand-cream no-underline hover:bg-brand-cream/5 transition-colors"
              >
                <span className="flex items-baseline gap-4">
                  <span className="font-copy text-xs text-brand-cream/40">0{i + 1}</span>
                  <span className="font-syne text-xl md:text-2xl font-bold">{event.name}</span>
                </span>
                <ArrowUpRight className="w-5 h-5 text-brand-cream/40 group-hover:text-brand-cream transition-colors" />
              </Link>
            ))}
          </div>
        </div>

        {/* Carousel + Explore More */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-5 md:gap-6">
          <motion.div
            {...fadeUp}
            className="md:col-span-3 relative rounded-2xl overflow-hidden border border-brand-cream/15 h-[280px] md:h-[400px] bg-black"
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={currentImg}
                src={carouselImages[currentImg]}
                alt="Launchpad memories"
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1, ease: 'easeInOut' }}
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            <Link
              to="/launchpad/events"
              className="absolute bottom-5 right-5 z-10 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-cream text-brand-navy font-copy font-bold text-sm no-underline hover:bg-white transition-colors"
            >
              Explore Events <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          <motion.div {...fadeUp} className="md:col-span-2">
            <Link
              to="/launchpad"
              className="group flex flex-col justify-between h-full min-h-[220px] rounded-2xl p-8 bg-brand-cream text-brand-navy no-underline hover:bg-white transition-colors"
            >
              <div className="flex justify-end">
                <span className="w-12 h-12 rounded-full bg-brand-navy text-brand-cream flex items-center justify-center transition-transform group-hover:rotate-45">
                  <ArrowUpRight className="w-5 h-5" />
                </span>
              </div>
              <span className="font-syne text-3xl md:text-4xl font-bold leading-[1.1]">
                Explore More About Launchpad
              </span>
            </Link>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
};

export default Launchpad;
