import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, X } from 'lucide-react';

const LaunchpadTimer = () => {
    const [daysLeft, setDaysLeft] = useState(0);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const calculateDays = () => {
            const targetDate = new Date('2026-04-03T00:00:00');
            const currentDate = new Date();
            const difference = targetDate.getTime() - currentDate.getTime();
            const days = Math.max(0, Math.ceil(difference / (1000 * 60 * 60 * 24)));
            setDaysLeft(days);
            
            // Only show if days left and user hasn't closed it in this session
            const hasClosed = sessionStorage.getItem('hasClosedTimer');
            if (days > 0 && !hasClosed) {
                setIsVisible(true);
            }
        };

        calculateDays();
        const timer = setInterval(calculateDays, 3600000); // Update every hour
        return () => clearInterval(timer);
    }, []);

    const handleClose = () => {
        setIsVisible(false);
        sessionStorage.setItem('hasClosedTimer', 'true');
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, x: 50, scale: 0.9 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: 50, scale: 0.9 }}
                    className="fixed right-4 bottom-4 md:right-10 md:bottom-10 z-[9999]"
                >
                    <div className="relative group">
                        <div className="relative bg-brand-navy/85 backdrop-blur-[10px] px-6 py-4 rounded-lg border border-brand-cream/20 flex items-center gap-5 shadow-[0_20px_50px_rgba(0,0,0,0.3)] pr-12">
                            {/* Close Button */}
                            <button
                                onClick={handleClose}
                                className="absolute top-3 right-4 p-1 rounded-full hover:bg-brand-cream/10 text-brand-cream/50 hover:text-brand-cream transition-all z-20 pointer-events-auto"
                                title="Close"
                            >
                                <X size={14} strokeWidth={3} />
                            </button>

                            <div className="flex flex-col items-end">
                                <span className="text-[10px] md:text-xs font-sans font-bold uppercase tracking-[0.2em] text-brand-cream/80 mb-1">
                                    Launchpad '26
                                </span>
                                <div className="flex items-center gap-2">
                                    <span className="text-3xl md:text-5xl font-sans font-black text-white leading-none tracking-tighter">
                                        {daysLeft}
                                    </span>
                                    <div className="flex flex-col leading-none">
                                        <span className="text-[10px] md:text-xs font-bold text-white/40 uppercase">
                                            Days
                                        </span>
                                        <span className="text-[10px] md:text-xs font-bold text-white/40 uppercase">
                                            To Go
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="w-[1px] h-10 bg-brand-cream/15 hidden sm:block" />

                            <motion.div 
                                animate={{ 
                                    rotate: 360,
                                    scale: [1, 1.1, 1]
                                }}
                                transition={{ 
                                    rotate: { duration: 10, repeat: Infinity, ease: "linear" },
                                    scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                                }}
                                className="p-3 rounded-lg bg-brand-cream/10 text-brand-cream shadow-inner hidden sm:flex"
                            >
                                <Clock size={28} strokeWidth={2.5} />
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default LaunchpadTimer;
