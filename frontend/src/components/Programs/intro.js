import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Intro = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [inView, controls]);

  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-ecell-bg text-ink relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-ecell-primary/5 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-ecell-secondary/5 blur-[120px] rounded-full"></div>
      </div>

      <motion.div
        className="max-w-6xl mx-auto px-4 py-20 text-center relative z-10"
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={variants}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight text-ink font-sans">
          Our <br />
          <span className="text-ink">Programs</span> &
          <span className="text-ecell-primary"> Initiatives</span>
        </h1>
        <div className="max-w-3xl mx-auto">
          <div className="h-1 w-20 bg-ecell-secondary mx-auto mb-8 rounded-full"></div>
          <p className="text-xl md:text-2xl leading-relaxed text-ecell-text-muted font-sans font-light tracking-wide">
            Supporting entrepreneurs. Building communities. <br className="hidden md:block" />
            <span className="text-ecell-primary font-medium">Driving innovation.</span>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Intro;
