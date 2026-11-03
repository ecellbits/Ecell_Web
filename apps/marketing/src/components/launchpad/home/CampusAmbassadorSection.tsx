import React from 'react';
import { useNavigate } from "@/shims/react-router";
import { motion } from 'framer-motion';
import { Award, Gift, Rocket, Briefcase, Ticket } from 'lucide-react';

const CABlock = () => {
    const navigate = useNavigate();

    return (
        <section className="relative w-full py-16 px-6 font-sans z-20">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
                {/* Corporate Passes Link Block */}
                <motion.div
                    initial={false}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="bg-surface p-8 md:p-12 rounded border border-hairline relative overflow-hidden group cursor-pointer flex flex-col items-center transition-colors duration-200 hover:border-hairline-strong"
                    onClick={() => navigate('/launchpad/corporate-passes')}
                >
                    <div className="absolute top-0 right-0 p-6 opacity-5">
                        <Briefcase size={180} className="text-ecell-blue-bright" />
                    </div>
                    <div className="absolute bottom-0 left-0 p-6 opacity-5">
                        <Ticket size={150} className="text-ecell-blue-bright" />
                    </div>

                    <div className="relative z-10 flex flex-col items-center text-center flex-1 max-w-2xl">
                        <div className="w-16 h-16 rounded bg-ecell-blue/10 flex items-center justify-center mb-6">
                            <Ticket size={32} className="text-ecell-blue-bright" />
                        </div>
                        <h2 className="text-3xl md:text-5xl font-sans font-bold text-ink mb-4 uppercase tracking-tight">
                            Corporate <span className="text-lava-bright">Passes</span>
                        </h2>
                        <p className="text-ecell-text-muted text-base md:text-lg font-sans mb-8 leading-relaxed">
                            Want to attend LAUNCHPAD with your team? Get your Corporate Passes — featuring <strong className="text-ink">Highlight Speaker Sessions</strong>, <strong className="text-ink">VC Meet & Greets</strong>, <strong className="text-ink">Premium Networking Lunch</strong>, and exclusive <strong className="text-ink">GOODies</strong>.
                        </p>
                        <div className="mt-auto">
                            <button
                                onClick={(e) => { e.stopPropagation(); navigate('/launchpad/corporate-passes'); }}
                                className="px-10 py-4 rounded bg-ecell-blue text-white font-bold transition-colors duration-200 hover:bg-ecell-blue-bright font-sans inline-flex items-center gap-2 text-lg"
                            >
                                Get Passes <Rocket size={20} />
                            </button>
                        </div>
                    </div>
                </motion.div>

                {/* Campus Ambassador Block */}
                <motion.div
                    initial={false}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="bg-surface p-8 md:p-12 rounded border border-hairline relative overflow-hidden group cursor-pointer flex flex-col items-center transition-colors duration-200 hover:border-hairline-strong"
                    onClick={() => navigate('/launchpad/campus-ambassador')}
                >
                    <div className="absolute top-0 right-0 p-6 opacity-5">
                        <Award size={180} className="text-ecell-blue-bright" />
                    </div>
                    <div className="absolute bottom-0 left-0 p-6 opacity-5">
                        <Gift size={150} className="text-ecell-blue-bright" />
                    </div>

                    <div className="relative z-10 flex flex-col items-center text-center flex-1 max-w-2xl">
                        <div className="w-16 h-16 rounded bg-ecell-blue/10 flex items-center justify-center mb-6">
                            <Gift size={32} className="text-ecell-blue-bright" />
                        </div>
                        <h2 className="text-3xl md:text-5xl font-sans font-bold text-ink mb-4 uppercase tracking-tight">
                            Campus <span className="text-lava-bright">Ambassador</span>
                        </h2>
                        <p className="text-ecell-text-muted text-base md:text-lg font-sans mb-8 leading-relaxed">
                            Want to attend LAUNCHPAD for free? Become a Campus Ambassador — refer friends, earn free passes & exclusive rewards including <strong className="text-ink">Official Certificates</strong> and <strong className="text-ink">LORs</strong> from E-Cell BPHC.
                        </p>
                        <div className="mt-auto">
                            <button
                                onClick={(e) => { e.stopPropagation(); navigate('/launchpad/campus-ambassador'); }}
                                className="px-10 py-4 rounded bg-ecell-blue text-white font-bold transition-colors duration-200 hover:bg-ecell-blue-bright font-sans inline-flex items-center gap-2 text-lg"
                            >
                                Learn More & Apply <Rocket size={20} />
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default CABlock;
