import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from "@/shims/react-router";
import {
    ArrowLeft,
    Gift,
    Award,
    Trophy,
    Users,
    Rocket,
    Mail,
    Share2,
    TrendingUp,
    BadgePercent,
} from 'lucide-react';

const rewardTiers = [
    {
        refs: 5,
        pass: 'Delegate',
        icon: Users,
        note: null,
        gradient: 'from-white/5 to-white/[0.02]',
        border: 'border-white/10',
        iconBg: 'bg-white/10 text-white',
        glow: '',
    },
    {
        refs: 10,
        pass: 'Executive',
        icon: Rocket,
        note: 'Upgrades from Delegate',
        gradient: 'from-[#1d6ba8]/10 to-[#1d6ba8]/[0.03]',
        border: 'border-ecell-blue/20',
        iconBg: 'bg-ecell-blue/10 text-ecell-blue',
        glow: 'hover:shadow-[0_0_20px_rgba(107,95,255,0.15)]',
    },
    {
        refs: 20,
        pass: 'Nexus',
        icon: Trophy,
        note: 'Upgrades from Executive',
        gradient: 'from-ecell-primary/10 to-ecell-primary/[0.03]',
        border: 'border-ecell-primary/20',
        iconBg: 'bg-ecell-primary/10 text-ecell-primary',
        glow: '',
    },
];

const steps = [
    {
        icon: Share2,
        title: 'Apply & Get Your Code',
        desc: 'Register as a Campus Ambassador and receive your unique referral code.',
    },
    {
        icon: TrendingUp,
        title: 'Promote & Climb',
        desc: 'Share your code. Every pass sold using your code counts towards your progress.',
    },
    {
        icon: Gift,
        title: 'Unlock Rewards',
        desc: "Hit milestones to unlock free passes, Official Certificates of recognition, and LORs from E-Cell BPHC. We'll notify you when you level up!",
    },
];

const CampusAmbassador = () => {
    const navigate = useNavigate();
    const [showWidget, setShowWidget] = useState(false);

    return (
        <div className="min-h-screen bg-ecell-bg py-32 px-6 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
            </div>

            <div className="max-w-6xl mx-auto relative z-10">
                {/* Back Button */}
                <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    onClick={() => navigate('/launchpad/passes')}
                    className="flex items-center gap-2 text-white/60 hover:text-ecell-primary transition-colors mb-12 font-sans group"
                >
                    <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                    Back to Passes
                </motion.button>

                {/* Hero */}
                <div className="text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 bg-ecell-blue/10 border border-ecell-blue/20 rounded-full px-5 py-2 mb-6"
                    >
                        <Award size={16} className="text-ecell-blue" />
                        <span className="text-ecell-blue text-sm font-bold tracking-widest uppercase font-sans">
                            Campus Ambassador Program
                        </span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-6xl lg:text-7xl font-sans font-bold text-white mb-6 uppercase tracking-tighter"
                    >
                        Attend LAUNCHPAD for{' '}
                        <span className="text-ecell-primary">FREE</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-white/60 max-w-3xl mx-auto text-base md:text-lg font-sans leading-relaxed"
                    >
                        Join our Campus Ambassador Program and earn exclusive rewards by
                        referring your friends to register for LAUNCHPAD 2026. Promote the
                        event using your unique referral code and climb the leaderboard to
                        unlock premium passes, networking opportunities, and more.
                    </motion.p>
                </div>

                {/* How It Works */}
                <motion.div
                    initial={false}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-20"
                >
                    <h2 className="text-2xl md:text-3xl font-sans font-bold text-white text-center mb-12">
                        How It <span className="text-ecell-primary">Works</span>
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {steps.map((step, idx) => (
                            <motion.div
                                key={idx}
                                initial={false}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.15 }}
                                viewport={{ once: true }}
                                className="bg-surface/72 backdrop-blur-[10px] p-8 rounded-lg border border-white/5 text-center group hover:border-ecell-blue/20 transition-all duration-500"
                            >
                                <div className="w-14 h-14 rounded-lg bg-ecell-blue/10 flex items-center justify-center mx-auto mb-5 group-hover:bg-ecell-blue/20 transition-colors duration-300">
                                    <step.icon size={26} className="text-ecell-blue" />
                                </div>
                                <div className="text-xs font-sans text-white/30 uppercase tracking-widest mb-2">
                                    Step {idx + 1}
                                </div>
                                <h3 className="text-lg font-sans font-bold text-white mb-2">
                                    {step.title}
                                </h3>
                                <p className="text-white/50 text-sm font-sans leading-relaxed">
                                    {step.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* CA Rewards — All in One Block */}
                <motion.div
                    initial={false}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-20 bg-surface/72 backdrop-blur-[10px] p-8 md:p-10 rounded-lg border border-white/10 relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 p-6 opacity-5 rotate-12">
                        <BadgePercent size={140} className="text-ecell-primary" />
                    </div>

                    <div className="relative z-10">
                        <h2 className="text-2xl md:text-3xl font-sans font-bold text-white text-center mb-2">
                            CA <span className="text-ecell-primary">Rewards</span>
                        </h2>
                        <p className="text-white/40 text-center font-sans text-sm mb-10 max-w-xl mx-auto">
                            Rewards are progressive — hit milestones and your pass keeps upgrading.
                        </p>

                        {/* Reward Tier Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
                            {rewardTiers.map((tier, idx) => (
                                <div
                                    key={idx}
                                    className={`relative p-5 rounded-lg border bg-gradient-to-b ${tier.gradient} ${tier.border} ${tier.glow} transition-all duration-300 group/card`}
                                >
                                    <div className="absolute top-3 right-3 text-white/5 text-4xl font-bold font-sans select-none">
                                        {tier.refs}
                                    </div>
                                    <div
                                        className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${tier.iconBg} group-hover/card:scale-110 transition-transform duration-300`}
                                    >
                                        <tier.icon size={22} />
                                    </div>
                                    <div className="text-3xl font-bold text-white font-sans mb-0.5">
                                        {tier.refs}
                                    </div>
                                    <div className="text-white/40 text-xs font-sans uppercase tracking-wider mb-3">
                                        Registrations
                                    </div>
                                    <div className="h-px w-full bg-white/5 mb-3" />
                                    <span className="text-sm font-bold text-ecell-primary font-sans">
                                        Free {tier.pass} Pass
                                    </span>
                                    {tier.note && (
                                        <div className="text-white/30 text-xs font-sans mt-1">
                                            {tier.note}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* 10% Discount — inline */}
                        <div className="flex flex-col sm:flex-row items-center gap-5 p-5 md:p-6 rounded-lg bg-ecell-primary/5 border border-ecell-primary/15 mb-5">
                            <div className="w-12 h-12 rounded-xl bg-ecell-primary/10 flex items-center justify-center shrink-0">
                                <BadgePercent size={26} className="text-ecell-primary" />
                            </div>
                            <div className="text-center sm:text-left">
                                <h3 className="text-lg font-sans font-bold text-white mb-1">
                                    Your Referrals Get{' '}
                                    <span className="text-ecell-primary">10% Off</span>
                                </h3>
                                <p className="text-white/50 text-sm font-sans leading-relaxed">
                                    Anyone who purchases a pass using your unique CA code gets a <strong className="text-white/80">10% discount</strong>. More value for them, more progress for you!
                                </p>
                            </div>
                        </div>

                        {/* Certificates — inline */}
                        <div className="flex flex-col sm:flex-row items-center gap-5 p-5 md:p-6 rounded-lg bg-ecell-blue/5 border border-ecell-blue/15">
                            <div className="w-12 h-12 rounded-xl bg-ecell-blue/10 flex items-center justify-center shrink-0">
                                <Award size={26} className="text-ecell-blue" />
                            </div>
                            <div className="text-center sm:text-left">
                                <h3 className="text-lg font-sans font-bold text-white mb-1">
                                    Official <span className="text-ecell-blue">Recognition</span>
                                </h3>
                                <p className="text-white/50 text-sm font-sans leading-relaxed">
                                    Receive <strong className="text-white/80">Official Certificates of recognition</strong> of your CA role and a <strong className="text-white/80">Letter of Recommendation (LOR)</strong> from E-Cell BPHC, alongside <strong className="text-white/80">custom benefits to those who rank the highest</strong>.
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Apply Now Section */}
                <motion.div
                    initial={false}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-surface/72 backdrop-blur-[10px] p-8 md:p-12 rounded-lg border border-ecell-blue/20 relative overflow-hidden"
                >
                    <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                    </div>

                    {!showWidget ? (
                        <div className="relative z-10 text-center">
                            <h2 className="text-3xl md:text-4xl font-sans font-bold text-white mb-4">
                                Ready to <span className="text-ecell-primary">Get Started</span>?
                            </h2>
                            <p className="text-white/50 font-sans text-sm max-w-xl mx-auto mb-8">
                                Apply now to become a Campus Ambassador. After approval, you'll
                                receive your unique CA code via email to start referring!
                            </p>
                            <button
                                onClick={() => setShowWidget(true)}
                                className="px-12 py-4 rounded-xl bg-ecell-blue text-white font-bold transition-all duration-300 font-sans inline-flex items-center gap-2 hover:shadow-[0_0_30px_rgba(107,95,255,0.5)] text-lg"
                            >
                                Apply Now <Rocket size={20} />
                            </button>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mt-8 text-white/30 text-xs font-sans">
                                <div className="flex items-center gap-2">
                                    <Mail size={14} className="text-ecell-blue/60" />
                                    <span>CA code sent via email after approval</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <BadgePercent size={14} className="text-ecell-primary/60" />
                                    <span>10% discount for purchases with your code</span>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="relative z-10">
                            <div className="text-center mb-6">
                                <h2 className="text-2xl md:text-3xl font-sans font-bold text-white mb-2">
                                    Complete Your <span className="text-ecell-primary">Application</span>
                                </h2>
                                <p className="text-white/40 font-sans text-sm">
                                    Fill in your details below to apply as a Campus Ambassador.
                                </p>
                            </div>
                            <div className="max-w-2xl mx-auto rounded-lg overflow-hidden bg-white">
                                <iframe
                                    src="https://konfhub.com/widget/launchpad-2026?desc=false&secondaryBg=F7F7F7&ticketBg=F7F7F7&borderCl=F7F7F7&bg=FFFFFF&fontColor=1e1f24&ticketCl=1e1f24&btnColor=002E6E&fontFamily=Hind&borderRadius=10&widget_type=quick&screen=2&tickets=79436&ticketId=79436%7C1"
                                    id="konfhub-widget-ca"
                                    title="Apply for Campus Ambassador - Launchpad 2026"
                                    width="100%"
                                    height="500"
                                    style={{ border: 'none' }}
                                />
                            </div>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mt-8 text-white/30 text-xs font-sans">
                                <div className="flex items-center gap-2">
                                    <Mail size={14} className="text-ecell-blue/60" />
                                    <span>CA code sent via email after approval</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <BadgePercent size={14} className="text-ecell-primary/60" />
                                    <span>10% discount for purchases with your code</span>
                                </div>
                            </div>
                        </div>
                    )}
                </motion.div>
            </div>
        </div>
    );
};

export default CampusAmbassador;
export { CampusAmbassador as Comp };
