import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from "@/shims/react-router";
import { ArrowDownRight } from 'lucide-react';

const SponsorshipSectionHome = () => {
    const navigate = useNavigate();

    return (
        <section className="relative py-24 px-6 overflow-hidden bg-page flex flex-col items-center justify-center text-center">
            <motion.div
                initial={false}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative z-10"
            >
                <h2 className="text-ink text-4xl md:text-7xl font-bold font-sans mb-10 tracking-tighter uppercase leading-none">
                    Interested to <span className="text-lava-bright">sponsor</span> <br /> Launchpad?
                </h2>

                <button
                    onClick={() => navigate('/launchpad/sponsor/wanna-sponsor')}
                    className="group inline-flex items-center gap-3 bg-lava px-8 py-4 rounded text-white text-xl font-black transition-colors duration-200 hover:bg-lava-bright"
                >
                    Learn More
                    <ArrowDownRight className="w-6 h-6 stroke-[2.5px]" />
                </button>
            </motion.div>
        </section>
    );
};

export default SponsorshipSectionHome;
