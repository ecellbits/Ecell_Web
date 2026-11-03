import React from 'react';
import { motion } from 'framer-motion';
import { Trophy } from 'lucide-react';

const HackathonSection = () => {

    return (
        <section className="relative w-full p-[4rem_1.25rem_6rem] z-20 md:p-[3rem_2rem]">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={false}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="relative bg-card border border-hairline rounded p-[2.25rem_1.25rem] md:p-[3.5rem_3rem] lg:p-[4rem_4.5rem]"
                >
                    {/* Inner layout */}
                    <div className="relative z-1 flex flex-col items-center gap-6 md:flex-row md:items-end md:justify-between md:gap-10 lg:gap-14">

                        {/* ── LEFT ── */}
                        <div className="flex flex-col items-center text-center flex-1 min-w-0 md:items-start md:text-left">
                            <motion.div
                                initial={false}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.15, duration: 0.45 }}
                                className="inline-flex items-center gap-[0.45rem] p-[0.35rem_0.9rem] rounded font-sans text-[0.62rem] font-bold uppercase tracking-[0.18em] text-lava-bright bg-[rgba(224,_66,_79,_0.09)] [border:1px_solid_rgba(224,_66,_79,_0.22)] mb-[1.1rem]"
                            >
                                <Trophy size={13} strokeWidth={3} />
                                <span>National Level</span>
                            </motion.div>

                            <h2 className="font-sans font-black text-[clamp(1.4rem,_6vw,_4.2rem)] leading-[1.1] tracking-[-0.02em] uppercase text-ecell-text mb-4">
                                DP World National<br />
                                <span className="text-lava-bright block">Hackathon</span>
                            </h2>

                            <p className="text-ecell-text-muted font-sans text-[clamp(0.85rem,_1.8vw,_1rem)] font-medium leading-[1.7] max-w-[30rem] mb-8">
                                Step into the ultimate arena for developers and innovators.
                                Build groundbreaking solutions and compete with top talent nationwide.
                            </p>

                            <motion.div
                                className="inline-flex items-center rounded border border-hairline-strong bg-muted px-6 py-3 text-sm font-semibold text-ecell-text-muted cursor-not-allowed"
                                initial={false}
                                whileInView={{ opacity: 0.6, y: 0 }}
                                transition={{ delay: 0.35, duration: 0.45 }}
                            >
                                Registration Closed
                            </motion.div>
                        </div>

                        {/* ── DIVIDER ── */}
                        <div className="hidden md:block md:w-px md:self-stretch md:shrink-0 md:bg-hairline" />

                        {/* ── RIGHT: Prize Pool ── */}
                        <motion.div
                            className="relative flex flex-col items-center justify-center w-full p-[1.75rem_2rem] bg-muted rounded border border-hairline overflow-hidden shrink-0 md:w-auto md:min-w-[260px] md:p-[2.5rem_3rem] md:mt-6 lg:min-w-[300px] lg:p-[3rem_4rem]"
                            initial={false}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.25, duration: 0.55, type: "spring", stiffness: 120 }}
                        >
                            <span className="font-sans text-[0.62rem] font-bold uppercase tracking-[0.38em] text-ecell-text-muted mb-[0.55rem] md:text-[0.68rem]">Prize Pool</span>
                            <span className="font-sans font-black text-[clamp(2.2rem,_9vw,_4.5rem)] leading-none tracking-[-0.03em] text-lava-bright whitespace-nowrap">₹3 Lakhs</span>
                        </motion.div>

                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default HackathonSection;
