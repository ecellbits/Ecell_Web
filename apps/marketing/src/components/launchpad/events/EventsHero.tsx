import React from 'react';
import { motion } from 'framer-motion';

const EventsHero = () => {
  return (
    <div className="pt-40 pb-20 px-6 flex items-center justify-center bg-ecell-bg text-white overflow-hidden relative">
      <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row justify-between items-start md:items-end gap-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col"
        >
          <h1 className="text-5xl sm:text-7xl md:text-9xl font-black font-sans leading-[0.8] uppercase tracking-tighter">
            Our<br />Events
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="md:max-w-md text-left md:text-right md:pb-4"
        >
          <p className="text-lg md:text-2xl font-light font-sans text-gray-400 leading-relaxed">
            Where ideas ignite and connections are forged.
          </p>
        </motion.div>
      </div>

      {/* Decorative background text or elements can be added here if needed */}
    </div>
  );
};

export default EventsHero;
