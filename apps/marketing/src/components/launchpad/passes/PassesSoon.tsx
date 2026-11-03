import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, Phone, Clock, ArrowLeft } from 'lucide-react';
import { Link } from "@/shims/react-router";

const PassesSoon = () => {
    return (
        <div className="min-h-screen bg-ecell-bg py-32 px-6 relative overflow-hidden flex items-center justify-center">
            {/* Background Effects */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
            </div>

            <div className="max-w-4xl mx-auto relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="bg-surface/72 backdrop-blur-[10px] p-6 sm:p-12 md:p-20 rounded-lg md:rounded-[3rem] border border-hairline relative overflow-hidden"
                >
                    {/* Floating Icons for Aesthetic */}
                    <motion.div
                        animate={{
                            y: [0, -20, 0],
                            rotate: [0, 10, 0]
                        }}
                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-10 right-10 text-ecell-primary opacity-20 hidden md:block"
                    >
                        <Rocket size={80} />
                    </motion.div>

                    <motion.div
                        animate={{
                            y: [0, 20, 0],
                            rotate: [0, -10, 0]
                        }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute bottom-10 left-10 text-ecell-primary opacity-20 hidden md:block"
                    >
                        <Clock size={80} />
                    </motion.div>

                    <div className="relative z-20">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-ecell-primary/10 border border-ecell-primary/20 text-ecell-primary text-sm font-bold uppercase tracking-widest mb-8"
                        >
                            <Rocket size={16} /> Update Incoming
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="text-3xl sm:text-5xl md:text-7xl font-sans font-bold text-ink mb-8 uppercase tracking-tighter"
                        >
                            PASSES WILL GO <span className="text-ecell-primary">LIVE SOON</span>
                        </motion.h1>


                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="flex flex-col items-center gap-6"
                        >
                            <div className="bg-surface border border-hairline rounded-lg p-8 backdrop-blur-xl max-w-md w-full">
                                <h3 className="text-ink font-sans font-bold text-xl mb-6 flex items-center justify-center gap-3">
                                    <Phone size={24} className="text-ecell-primary" /> For any further queries
                                </h3>
                                <div className="space-y-4">
                                    <div className="flex flex-col items-center gap-1">
                                        <span className="text-ink/40 text-sm font-sans uppercase tracking-wider">Contact Person</span>
                                        <span className="text-2xl font-bold text-ink font-sans">PRIYANSH</span>
                                    </div>
                                    <div className="flex flex-col items-center gap-2">
                                        <a
                                            href="tel:+917440532400"
                                            className="text-ecell-primary text-2xl font-bold font-sans transition-transform inline-flex items-center gap-3 group"
                                        >
                                            +91 744 053 2400
                                            <div className="w-8 h-8 rounded-full bg-ecell-primary/10 flex items-center justify-center group-hover:bg-ecell-primary group-hover:text-ink transition-colors">
                                                <Phone size={14} />
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <Link
                                to="/launchpad/passes"
                                className="group flex items-center gap-3 px-8 py-4 rounded-xl bg-surface border border-hairline text-ink font-bold hover:bg-surface transition-all duration-300 transform mt-4"
                            >
                                <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                                Back to Passes
                            </Link>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default PassesSoon;
export { PassesSoon as Comp };
