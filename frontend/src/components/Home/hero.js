import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useMotionTemplate } from 'framer-motion';

const Hero = () => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const yMove = useTransform(scrollYProgress, [0, 1], [0, 150]);
    const opacityFade = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

    useEffect(() => {
        const updateMousePosition = (ev) => {
            mouseX.set(ev.clientX);
            mouseY.set(ev.clientY);
        };
        window.addEventListener('mousemove', updateMousePosition);
        return () => window.removeEventListener('mousemove', updateMousePosition);
    }, [mouseX, mouseY]);

    const maskImage = useMotionTemplate`radial-gradient(400px circle at ${mouseX}px ${mouseY}px, black, transparent)`;

    return (
        <div ref={containerRef} className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden bg-black text-white">

            {/* Grid & Glow */}
            <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none"></div>
            <motion.div
                className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none"
                style={{
                    maskImage,
                    WebkitMaskImage: maskImage
                }}
            ></motion.div>

            {/* Main Content */}
            <motion.div
                className="relative z-10 w-full flex flex-col items-center justify-center select-none px-4"
                style={{ y: yMove, opacity: opacityFade }}
            >
                <div className="flex flex-col items-start w-full max-w-fit mx-auto">

                    {/* Blog Shortcut Pill */}
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="mb-4 sm:mb-6 self-start pointer-events-auto"
                    >
                        <a
                            href="/blog"
                            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.08] hover:bg-white/[0.15] border border-white/15 text-xs font-semibold text-white backdrop-blur-md transition-all hover:scale-[1.03] group shadow-lg"
                        >
                            <span className="flex h-2 w-2 relative">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#d4ff00] opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#d4ff00]"></span>
                            </span>
                            <span className="text-[#d4ff00] font-bold uppercase tracking-wider text-[11px]">New Blog</span>
                            <span className="text-zinc-300">| Entrepreneurship & Founder Playbook</span>
                            <span className="text-white/60 group-hover:text-white transition-colors">→</span>
                        </a>
                    </motion.div>

                    {/* IDEATE */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                    >
                        <h1 className="text-[7.3vw] sm:text-[6.9vw] md:text-[6.5vw] font-black font-syne leading-[0.8] tracking-tighter uppercase gradient-text grad-1">
                            IDEATE
                        </h1>
                    </motion.div>

                    {/* INNOVATE */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 1.5, ease: "easeOut" }}
                        className="mt-2 md:mt-6 ml-[10vw] sm:ml-[12vw] md:ml-[15vw]"
                    >
                        <h1 className="text-[9.5vw] sm:text-[9vw] md:text-[8.5vw] font-black font-syne leading-[0.8] tracking-tighter uppercase gradient-text grad-2">
                            INNOVATE
                        </h1>
                    </motion.div>

                    {/* INCUBATE */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 2.5, ease: "easeOut" }}
                        className="mt-2 md:mt-6 ml-[25vw] sm:ml-[30vw] md:ml-[35vw]"
                    >
                        <h1 className="text-[7.8vw] sm:text-[7.4vw] md:text-[7vw] font-black font-syne leading-[0.8] tracking-tighter uppercase gradient-text grad-3">
                            INCUBATE
                        </h1>
                    </motion.div>

                </div>
            </motion.div>

            {/* Bottom Scroll Animation */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 6.5, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-6 cursor-pointer group z-20"
                onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
            >
                <div className="relative flex flex-col items-center">
                    <div className="w-[2px] h-20 bg-white/10 relative overflow-hidden rounded-full">
                        <motion.div
                            className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[#BCFF2F] to-transparent shadow-[0_0_15px_#BCFF2F]"
                            animate={{
                                y: ["100%", "-200%"]
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        />
                    </div>

                    <div className="absolute -top-10 flex flex-col items-center">
                        {[0, 1].map((i) => (
                            <motion.div
                                key={i}
                                animate={{
                                    opacity: [0, 1, 0],
                                    y: [15, -25],
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    delay: i * 0.5,
                                    ease: "easeOut"
                                }}
                                className="absolute"
                            >
                                <svg width="24" height="14" viewBox="0 0 24 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M2 12L12 2L22 12" stroke="#BCFF2F" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.div>

            <style>{`
                .gradient-text {
                    background: linear-gradient(
                        90deg, 
                        #6F66FF 0%, 
                        #A5B6FF 25%, 
                        #BCFF2F 50%, 
                        #A5B6FF 75%, 
                        #6F66FF 100%
                    );
                    background-size: 200% auto;
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    display: inline-block;
                    white-space: nowrap;
                    animation: gradient-flow 12s linear infinite;
                }

                .grad-1 { animation-delay: 0s; }
                .grad-2 { animation-delay: 4s; }
                .grad-3 { animation-delay: 8s; }

                @keyframes gradient-flow {
                    0% {
                        background-position: 0% center;
                    }
                    100% {
                        background-position: 200% center;
                    }
                }
                
                @media (max-width: 768px) {
                    .gradient-text {
                        background: linear-gradient(
                            135deg, 
                            #6F66FF 0%, 
                            #A5B6FF 50%, 
                            #BCFF2F 100%
                        );
                        background-size: 200% auto;
                        -webkit-background-clip: text;
                        -webkit-text-fill-color: transparent;
                        background-clip: text;
                        animation: gradient-flow 8s linear infinite;
                    }
                    .grad-1 { animation-delay: 0s; }
                    .grad-2 { animation-delay: 2.6s; }
                    .grad-3 { animation-delay: 5.2s; }
                }
            `}</style>
        </div >
    );
};

export default Hero;

