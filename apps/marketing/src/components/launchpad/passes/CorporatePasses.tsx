import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, Briefcase, ArrowLeft, ChevronDown, ChevronUp } from 'lucide-react';
import ChromaGrid from "@/components/common/ChromaGrid";
import { useNavigate } from "@/shims/react-router";
import prathviImg from "@/assets/prathvi.jpeg";
import manishImg from "@/assets/manish.jpeg";
import SEO from '@/components/common/SEO';

const PassCard = ({ title, price, perks, commonPerks, isPopular, icon: Icon, delay, position, onGetStarted }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const getBorderGlowClass = () => {
        return 'border-ecell-blue shadow-[0_0_15px_rgba(111,102,255,0.3)] hover:shadow-[0_0_25px_rgba(111,102,255,0.45)]';
    };

    return (
        <motion.div
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay }}
            viewport={{ once: true }}
            className={`relative bg-surface/72 backdrop-blur-[10px] p-8 rounded-lg border-2 flex flex-col transition-all duration-500 group ${getBorderGlowClass()} ${isPopular ? 'bg-ecell-primary/5' : ''}`}
        >
            <div className="mb-8">
                <div className="w-14 h-14 rounded-lg flex items-center justify-center mb-6 transition-colors duration-500 bg-white/5 text-ecell-primary group-hover:bg-ecell-primary group-hover:text-white">
                    <Icon size={28} />
                </div>
                <h3 className="text-3xl font-sans font-bold text-white mb-2">{title}</h3>
                <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-white font-sans">₹{price}</span>
                    <span className="text-white/40 text-sm">/ person</span>
                </div>
            </div>

            <div className="space-y-4 mb-4 flex-grow">
                {perks.map((perk, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                        <div className={`mt-1 shrink-0 ${perk.included ? 'text-ecell-primary' : 'text-red-500'}`}>
                            {perk.included ? <Check size={18} /> : <X size={18} />}
                        </div>
                        <div className="flex flex-col">
                            <span className={`text-sm font-sans font-bold ${perk.included ? 'text-ecell-primary' : 'text-red-500/80'}`}>
                                {perk.text}
                            </span>
                            {perk.subtext && (
                                <span className={`text-xs font-sans ${perk.included ? 'text-white/50' : 'text-red-500/50'}`}>
                                    {perk.subtext}
                                </span>
                            )}
                        </div>
                    </div>
                ))}

                {commonPerks && (
                    <div className="mt-6 border-t border-white/10 pt-4">
                        <button
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="w-full flex items-center justify-between text-white/70 hover:text-ecell-primary transition-colors text-sm font-sans font-bold py-2"
                        >
                            <span>{commonPerks.title}</span>
                            {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </button>

                        <AnimatePresence>
                            {isExpanded && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="overflow-hidden"
                                >
                                    <div className="pt-2 space-y-4 pb-2">
                                        {commonPerks.items.map((perk, idx) => (
                                            <div key={idx} className="flex items-start gap-3">
                                                <div className={`mt-1 shrink-0 ${perk.included ? 'text-ecell-primary' : 'text-red-500'}`}>
                                                    {perk.included ? <Check size={18} /> : <X size={18} />}
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className={`text-sm font-sans font-bold ${perk.included ? 'text-ecell-primary' : 'text-red-500/80'}`}>
                                                        {perk.text}
                                                    </span>
                                                    {perk.subtext && (
                                                        <span className={`text-xs font-sans ${perk.included ? 'text-white/50' : 'text-red-500/50'}`}>
                                                            {perk.subtext}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                )}
            </div>

            <button
                onClick={onGetStarted}
                className={`w-full py-4 rounded-xl font-bold text-center transition-all duration-300 transform font-sans flex items-center justify-center gap-2 ${isPopular
                    ? "bg-ecell-primary text-white"
                    : "bg-transparent text-ecell-primary border-2 border-ecell-primary"
                    }`}
            >
                Get Started <Briefcase size={18} />
            </button>
        </motion.div >
    );
};

const CorporatePasses = () => {
    const navigate = useNavigate();

    const handleGetStarted = (tier) => {
        const encodedUrl = encodeURIComponent(tier.paymentUrl);
        navigate(`/launchpad/payment?url=${encodedUrl}&tier=${encodeURIComponent(tier.title)}&from=/launchpad/corporate-passes`);
    };

    const tiers = [
        {
            title: "Corporate Pass",
            price: "1990",
            icon: Briefcase,
            delay: 0.1,
            position: 'center',
            paymentUrl: "https://konfhub.com/widget/launchpad-2026?desc=false&secondaryBg=F7F7F7&ticketBg=F7F7F7&borderCl=F7F7F7&bg=FFFFFF&fontColor=1e1f24&ticketCl=1e1f24&btnColor=002E6E&fontFamily=Hind&borderRadius=10&widget_type=standard&tickets=74244&ticketId=74244%7C1",
            perks: [
                { text: "Startup Expo Access (Viewing Rights)", subtext: "Explore live startups & innovations", included: true },
                { text: "Competition Viewing Access", subtext: "Pitchers Pilot · Ground Reality", included: true },
                { text: "Speaker Sessions Access (Audience)", subtext: "Talks by founders & industry leaders", included: true },
                { text: "Highlight Speaker Sessions", subtext: "Reserved premium seating for all keynotes", included: true },
                { text: "Meet & Greet with VCs & Internship Drive", subtext: "Exclusive networking opportunities", included: true },
                { text: "Masterclass on VC Transition", subtext: "Learn from industry experts", included: true },
                { text: "Networking Lunch (Premium Version)", subtext: "Exclusive lunch setting with founders", included: true },
                { text: "Networking Arena Access", subtext: "Premium designated networking space", included: true },
                { text: "GOODies", subtext: "Exclusive corporate swag and merch", included: true },
                { text: "Hackathons + Workshops", subtext: "", included: false },
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-ecell-bg py-32 px-6 relative overflow-hidden">
            <SEO
                title="Corporate Passes | Launchpad 2026"
                description="Get your corporate passes for Launchpad 2026 and get exclusive access to networking and premium events."
            />
            {/* Background Effects */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="mb-12">
                    <button
                        onClick={() => navigate('/launchpad/passes')}
                        className="flex items-center gap-2 text-white/60 hover:text-ecell-primary transition-colors font-sans font-bold uppercase tracking-wider text-sm group"
                    >
                        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> Back to Passes
                    </button>
                </div>

                <div className="text-center mb-20">
                    <motion.span
                        initial={false}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-ecell-primary font-bold tracking-[0.3em] uppercase text-sm mb-4 block"
                    >
                        Launchpad 2026
                    </motion.span>
                    <motion.h1
                        initial={false}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-sans font-bold text-white mb-6 uppercase tracking-tighter"
                    >
                        CORPORATE <span className="text-ecell-primary">PASSES</span>
                    </motion.h1>
                    <motion.p
                        initial={false}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-white/60 max-w-2xl mx-auto text-lg font-sans"
                    >
                        Attend Launchpad with your team. Get exclusive access, premium networking opportunities, and special corporate perks.
                    </motion.p>
                </div>

                <div className="max-w-md mx-auto mb-24 items-start">
                    {tiers.map((tier, idx) => (
                        <PassCard
                            key={idx}
                            {...tier}
                            onGetStarted={() => handleGetStarted(tier)}
                        />
                    ))}
                </div>
            </div>

            {/* Contact Section */}
            <div className="mt-24 text-center max-w-4xl mx-auto relative z-10">
                <h3 className="text-2xl font-sans font-bold text-white mb-8">Please feel free to contact in case of query</h3>
                <div className="max-w-2xl mx-auto flex justify-center">
                    <ChromaGrid
                        columns={2}
                        rows={1}
                        radius={300}
                        damping={0.45}
                        fadeOut={0.6}
                        items={[
                            {
                                name: "Prathvi Raj Chauhan",
                                role: "+91 78271 75012",
                                image: prathviImg,
                                linkedin: "https://www.linkedin.com/in/prathvirajchauhan/",
                            },
                            {
                                name: "Manish Rumale",
                                role: "+91 98861 17965",
                                image: manishImg,
                                linkedin: "https://www.linkedin.com/in/manish-rumale-99b5b534a/",
                            }
                        ].map((m) => {
                            const handle = m.linkedin
                                ? m.linkedin.split("/").filter(Boolean).pop()
                                : m.name.replace(/\s/g, "").toLowerCase();

                            const role = (m.role || "").toLowerCase();
                            let gradient = "linear-gradient(135deg, rgba(107,95,255,0.2), rgba(212,255,0,0.2))";
                            let borderColor = "#1d6ba8";

                            if (role.includes("chairman") || role.includes("president")) {
                                gradient = "linear-gradient(135deg, rgba(212,255,0,0.28), rgba(107,95,255,0.24))";
                                borderColor = "#e0424f";
                            } else if (role.includes("tech") || role.includes("technical") || role.includes("design") || role.includes("videography")) {
                                gradient = "linear-gradient(135deg, rgba(107,95,255,0.26), rgba(212,255,0,0.18))";
                                borderColor = "#5fa3d6";
                            } else if (role.includes("media") || role.includes("publicity")) {
                                gradient = "linear-gradient(135deg, rgba(107,95,255,0.22), rgba(212,255,0,0.22))";
                                borderColor = "#1d6ba8";
                            } else if (role.includes("treasurer") || role.includes("operations") || role.includes("hospitality")) {
                                gradient = "linear-gradient(135deg, rgba(212,255,0,0.22), rgba(107,95,255,0.18))";
                                borderColor = "#e0424f";
                            }

                            return {
                                title: m.name,
                                subtitle: m.role,
                                image: m.image,
                                handle: handle ? `@${handle.substring(0, 15)}` : undefined,
                                url: m.linkedin,
                                gradient,
                                borderColor,
                                imgStyle: (() => {
                                    const name = m.name.toLowerCase();
                                    if (name.includes("prathvi")) {
                                        return { objectPosition: "center" };
                                    }
                                    if (name.includes("manish")) {
                                        return { objectPosition: "center" };
                                    }
                                    return undefined;
                                })()
                            };
                        })}
                    />
                </div>
            </div>
        </div>
    );
};

export default CorporatePasses;
export { CorporatePasses as Comp };
