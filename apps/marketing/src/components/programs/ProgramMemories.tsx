import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";

// Import local images
import img1 from "@/assets/Launchpad1.JPG";
import img2 from "@/assets/speaker2.jpg";
import img3 from "@/assets/startup.JPG";
import img4 from "@/assets/auction.jpg";
import img5 from "@/assets/class.jpg";
import img6 from "@/assets/pitch.jpg";

const images = [img1, img2, img3, img4, img5, img6];

const Memories = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef(null);
  const { ref: inViewRef, inView } = useInView({
    threshold: 0.2,
  });

  // Mouse Parallax Values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), { stiffness: 100, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), { stiffness: 100, damping: 30 });

  useEffect(() => {
    if (isHovered || !inView) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isHovered, inView]);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      className="w-full py-24 bg-page relative overflow-hidden"
      ref={(el) => {
        containerRef.current = el;
        inViewRef(el);
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background Glows */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-ecell-blue/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-lava-bright/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Title Section */}
        <div className="text-center mb-16 md:mb-24">
          <motion.h2
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-bold font-sans tracking-tight"
          >
            <span className="text-ink">Memory</span>{" "}
            <span className="text-ink">Lane</span>
          </motion.h2>
          <motion.div
            initial={false}
            whileInView={{ opacity: 1, width: 100 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 1 }}
            className="h-1 bg-gradient-to-r from-[#0F1754] to-[#510609] mx-auto mt-4 rounded-full"
          />
        </div>

        {/* 3D Gallery Container */}
        <div className="relative h-[400px] md:h-[600px] flex items-center justify-center" style={{ perspective: "1500px" }}>
          <motion.div
            className="relative w-full max-w-4xl h-full flex items-center justify-center"
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          >
            <AnimatePresence mode="popLayout">
              {images.map((img, idx) => {
                const isCenter = idx === activeIndex;
                const offset = (idx - activeIndex + images.length) % images.length;

                // Hide images that are far back
                if (offset > 3 && offset < images.length - 1) return null;

                let xTranslate = 0;
                let zTranslate = 0;
                let scale = 1;
                let opacity = 0;
                let rotateYCard = 0;

                if (offset === 0) { // Center
                  zTranslate = 100;
                  opacity = 1;
                } else if (offset === 1) { // Right 1
                  xTranslate = "30%";
                  zTranslate = -100;
                  scale = 0.85;
                  opacity = 0.4;
                  rotateYCard = -15;
                } else if (offset === images.length - 1) { // Left 1
                  xTranslate = "-30%";
                  zTranslate = -100;
                  scale = 0.85;
                  opacity = 0.4;
                  rotateYCard = 15;
                } else if (offset === 2) { // Right 2
                  xTranslate = "55%";
                  zTranslate = -300;
                  scale = 0.7;
                  opacity = 0.1;
                  rotateYCard = -25;
                } else if (offset === images.length - 2) { // Left 2
                  xTranslate = "-55%";
                  zTranslate = -300;
                  scale = 0.7;
                  opacity = 0.1;
                  rotateYCard = 25;
                }

                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.5, z: -500 }}
                    animate={{
                      opacity,
                      scale,
                      x: xTranslate,
                      z: zTranslate,
                      rotateY: rotateYCard,
                    }}
                    transition={{ type: "spring", stiffness: 100, damping: 20 }}
                    className={`absolute w-[85%] md:w-[70%] h-[70%] md:h-[85%] rounded-lg overflow-hidden shadow-2xl cursor-pointer ${isCenter ? "z-30 pointer-events-auto" : "z-10 pointer-events-none"}`}
                    onClick={() => isCenter && setActiveIndex((idx + 1) % images.length)}
                    onMouseEnter={() => isCenter && setIsHovered(true)}
                    onMouseLeave={() => isCenter && setIsHovered(false)}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <img src={img} alt={`Memory ${idx}`} className="w-full h-full object-cover" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Dynamic Pagination Bars */}
        <div className="flex justify-center items-center gap-3 mt-12 md:mt-20">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className="group relative flex items-center h-8"
            >
              <motion.div
                animate={{
                  width: activeIndex === idx ? 40 : 8,
                  backgroundColor: activeIndex === idx ? "#0F1754" : "rgba(0,0,0,0.2)",
                }}
                className="h-1.5 rounded-full transition-all duration-500"
              />
              {activeIndex === idx && (
                <motion.div
                  layoutId="indicator"
                  className="absolute -bottom-2 left-0 right-0 h-0.5 bg-lava-bright blur-[2px]"
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Memories;

