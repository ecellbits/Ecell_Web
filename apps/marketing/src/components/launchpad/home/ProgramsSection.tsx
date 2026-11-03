import React from 'react';
import { Link } from "@/shims/react-router";
import { motion } from 'framer-motion';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';

// Import Launchpad event images

import startup from '@/assets/new_startup.jpg';
import lp2 from '@/assets/lpevents/id/id1.jpeg'
import pp_stage from '@/assets/lpevents/pitcherspilot/new_memory_stage.png';

const programs = [
    {
        id: 'pitchers-pilot',
        title: "Pitchers' Pilot",
        subtitle: 'Connecting Innovation with Capital',
        type: 'single',
        image: pp_stage,
        link: '/launchpad/pitchers_pilot',
        registerLink: "https://unstop.com/competitions/pitchers-pilot-launchpad-26-bits-1631551"
    },
    {
        id: 'startup-expo',
        title: 'Start-up Expo',
        subtitle: 'The Ultimate Battlefield for Emerging Innovators',
        type: 'single',
        image: startup,
        link: '/launchpad/startup_expo',
        registerLink: "https://unstop.com/competitions/startup-expo-launchpad-26-bits-1631560"
    },
    {
        id: 'internship-drive',
        title: 'Internship Drive',
        subtitle: 'Connect and grow with startups',
        type: 'single',
        image: lp2,
        link: '/launchpad/internship_drive',
        registerLink: ""
    },
    {
        id: 'explore',
        title: 'Explore All Our Events',
        subtitle: '',
        type: 'cta',
        link: '/launchpad/events'
    }
];

const ProgramsSection = () => {

    return (
        <section className="relative py-12 md:py-24 px-4 md:px-8 text-ink overflow-hidden bg-page">

            {/* Header */}
            <motion.div
                initial={false}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true }}
                className="max-w-6xl mx-auto mb-10 md:mb-16 text-center relative z-10"
            >
                <h2 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight font-sans uppercase">
                    <span className="text-lava-bright">Launchpad</span>{' '}
                    <span className="text-ecell-blue-bright">Events</span>
                </h2>
            </motion.div>

            <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 md:grid-cols-2">
                {programs.map((item) => <ProgramCard key={item.id} item={item} />)}
            </div>
        </section>
    );
};

const ProgramCard = ({ item }: { item: (typeof programs)[number] }) => {
    const isCta = item.type === 'cta';

    return (
        <motion.article
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="group flex min-w-0 flex-col overflow-hidden rounded border border-hairline bg-card transition-colors duration-200 hover:border-hairline-strong"
        >
            {isCta ? (
                <Link to={item.link}
                    className="flex flex-1 flex-col justify-between gap-8 p-6 text-ecell-text md:p-8 focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-lava-bright">
                    <ArrowUpRight className="size-8 self-end text-lava-bright" />
                    <h3 className="max-w-[12ch] text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl">
                        Explore All Our Events
                    </h3>
                </Link>
            ) : (
                <>
                    <Link to={item.link} aria-label={`Explore ${item.title}`} className="block aspect-[16/9] shrink-0 overflow-hidden">
                        <img src={item.image} alt={item.title} loading="lazy" className="h-full w-full object-cover" />
                    </Link>
                    <div className="flex flex-1 flex-col gap-4 p-6 md:p-8">
                        <h3 className="text-2xl font-bold tracking-tight text-ecell-text md:text-4xl">
                            <Link to={item.link} className="hover:text-lava-bright">{item.title}</Link>
                        </h3>
                        <p className="text-sm leading-relaxed text-ecell-text-muted">{item.subtitle}</p>
                        <div className="mt-auto flex flex-wrap items-center gap-4 pt-2">
                            {item.registerLink && (
                                <a href={item.registerLink} target="_blank" rel="noopener noreferrer" className="rounded bg-ecell-primary px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-lava-bright">Register</a>
                            )}
                            <Link to={item.link} className="inline-flex items-center gap-2 text-sm font-semibold text-ecell-text hover:text-lava-bright">
                                Details <ArrowDownRight className="size-4" />
                            </Link>
                        </div>
                    </div>
                </>
            )}
        </motion.article>
    );
};

export default ProgramsSection;
