import React from 'react';
import { motion } from 'framer-motion';
import bg from '../../assets/footer_cap.svg';

const EventsHero = () => {
  return (
    <div
      className="pt-15 py-25 px-6 flex flex-col items-center justify-center bg-ecell-bg text-white overflow-hidden relative bg-no-repeat bg-cover"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundPosition: "center bottom -30vh"
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="mb-20 inline-flex items-center justify-center bg-[#DDD]/25 rounded-full px-7 py-2.5 shadow-[0_0_20px_rgba(107,59,167,0.25)] transition-all duration-300 mb-6 cursor-default"
      >
        <span className="text-[#BCFF2F] text-xs md:text-sm font-semibold tracking-[0.18em] uppercase">
          Launchpad'26 Events
        </span>
      </motion.div>

      <div className="mt-[7vh] mb-[30vh] max-w-7xl mx-auto w-full flex flex-col justify-between items-center gap-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col"
        >
          <h1 className="text-5xl sm:text-7xl md:text-9xl text-center font-black font-syne leading-[0.8] uppercase tracking-tighter">
            Our <br/> Events
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
        >
          <p className="text-lg md:text-2xl font-light font-manrope text-gray-400 leading-relaxed">
            Where ideas ignite and connections are forged.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default EventsHero;
