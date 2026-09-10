import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import ChromaGrid from '../Teams/ChromaGrid';
import dhaanvi from "../../assets/por_photos/p Dhaanvi Bhadani.jpeg";
import sejal from "../../assets/por_photos/p Sejal Mittal.jpeg";
import divvij from "../../assets/por_photos/p Divvij Chichra.jpeg";

const SponsorshipSlabs = () => {
    const sponsorshipTeam = [
        { name: "Dhaanvi Bhadani", role: "Chairwoman Launchpad", image: dhaanvi, email: "f20240762@hyderabad.bits-pilani.ac.in", phone: "+91 63618 03120", linkedin: "https://www.linkedin.com/in/dhaanvi-bhadani-533a08322/" },
        { name: "Sejal Mittal", role: "Director of Partnerships", image: sejal, email: "f20240161@hyderabad.bits-pilani.ac.in", phone: "+91 98216 89504", linkedin: "https://www.linkedin.com/in/sejal-mittal-496458326/" },
        { name: "Divvij Chichra", role: "Technical Head", image: divvij, email: "f20240298@hyderabad.bits-pilani.ac.in", phone: "+91 93131 35129", linkedin: "https://www.linkedin.com/in/divvij-chichra-3ab7b4327/" },
    ];

    const slabs = [
        {
            name: "Title Partner",
            price: "18,00,000 and above",
            benefits: [
                "[Company] “presents” Launchpad 2026 – Exclusive Naming Rights on all official branding and collaterals",
                "Keynote Address in the Inaugural Ceremony of Launchpad",
                "On-ground Mega Activation Zone for premium product experience and audience engagement",
                "Integrated Branding on Delegate Kits, Badges, Lanyards, and Official Merchandise",
                "Fast-Tracking Campus Recruitment Opportunities",
                "Exclusive Right to Launch a Flagship Campus Initiative under the [Company] brand",
                "Exclusive, High-Impact Social Media Campaigns with priority visibility across the event lifecycle",
                "Priority Access & Complimentary Passes for senior leadership and representatives"
            ],
            color: "#d4ff00",
            isFeatured: true
        },
        {
            name: "Co-Title Partner",
            price: "14,00,000 and above",
            benefits: [
                "Launchpad “Co-powered by [Company]” – Secondary Naming Rights on all branding collaterals",
                "Keynote Address in a Highlight Speaker Session",
                "Dedicated [Company] Experience Pavilion at Main Stage",
                "Fast-Tracking Campus Recruitment Opportunities",
                "Priority Right to Host a High-Impact Campus Activation with Launchpad",
                "Complimentary VIP & Delegate Passes",
                "Prominent Branding across Key Venues and Digital Collaterals",
                "Participation in Curated Networking & Founder Engagement Sessions"
            ],
            color: "#FFFFFF",
            isFeatured: false
        },
        {
            name: "Platinum Partner",
            price: "10,00,000 and above",
            benefits: [
                "Fully Branded Networking Arena Opportunity",
                "Workshop or Masterclass Session Hosted by the Company",
                "Dedicated Product Engagement Booth",
                "Fast-Tracking Campus Recruitment Opportunities",
                "Platinum Partner Branding across Select Summit Assets",
                "Access to Structured Startup & Student Interactions",
                "Recognition during Main Stage Acknowledgements",
                "Inclusion in Official Post-Event Communications"
            ],
            color: "#E5E4E2",
            isFeatured: false
        },
        {
            name: "Gold Partner",
            price: "5,00,000 and above",
            benefits: [
                "Event Title Sponsorship of a Select Launchpad Segment",
                "Opt-In Lead Generation & Talent Engagement Access",
                "Inclusion in Summit Digital Promotions & Campaigns",
                "Opportunity to Host a Featured Campus Activation during Launchpad",
                "Dedicated Product Display & Engagement Space",
                "Brand Visibility across On-Ground Promotional Collaterals",
                "Recognition as Official Gold Partner of Launchpad"
            ],
            color: "#FFD700",
            isFeatured: false
        },
        {
            name: "Silver Partner",
            price: "2,50,000 and above",
            benefits: [
                "Opt-In Lead Generation & Talent Engagement Access",
                "Brand Sampling in Delegate Kits",
                "Logo Inclusion on Summit Website & Select Collaterals",
                "On-Ground Branding in Shared Sponsor Zones",
                "Social Media Acknowledgements across Official Channels",
                "Recognition during Closing Ceremony Thank-You Roll",
                "Complimentary Delegate Passes"
            ],
            color: "#C0C0C0",
            isFeatured: false
        }
    ];

    return (
        <div className="min-h-screen bg-black text-white font-syne pt-24 md:pt-32 pb-20 px-6 overflow-x-hidden w-full">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-24"
                >
                    <h1 className="text-[10vw] sm:text-7xl md:text-8xl font-black mb-6 tracking-tighter uppercase break-all">
                        Sponsorship <span className="text-[#d4ff00]">Slabs</span>
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        Choose the partnership level that best aligns with your brand's goals and vision for Launchpad 2026.
                    </p>
                </motion.div>

                <div className="flex justify-center mb-32">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl">
                        {slabs.map((slab, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                style={{
                                    borderColor: slab.color,
                                    boxShadow: `0 0 15px ${slab.color}4D`
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.boxShadow = `0 0 25px ${slab.color}80`}
                                onMouseLeave={(e) => e.currentTarget.style.boxShadow = `0 0 15px ${slab.color}4D`}
                                className={`relative glass p-6 md:p-10 rounded-3xl md:rounded-[2.5rem] border-2 flex flex-col h-full transition-all duration-500 group ${slab.isFeatured ? 'bg-white/5' : ''}`}
                            >
                                {slab.isFeatured && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#d4ff00] text-black text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full shadow-[0_0_20px_rgba(212,255,0,0.4)]">
                                        Recommended
                                    </div>
                                )}

                                <div className="mb-8">
                                    <h3 className="text-3xl lg:text-4xl font-syne font-black uppercase mb-2 tracking-tighter" style={{ color: slab.color }}>
                                        {slab.name}
                                    </h3>
                                </div>

                                <div className="flex-grow space-y-4">
                                    <h4 className="text-white font-bold text-sm uppercase tracking-widest mb-6 pb-2 border-b border-white/10">
                                        Key Deliverables
                                    </h4>
                                    {slab.benefits.map((benefit, i) => (
                                        <div key={i} className="flex items-start gap-4">
                                            <div className="mt-1 shrink-0" style={{ color: slab.color }}>
                                                <Check size={18} />
                                            </div>
                                            <p className="text-sm md:text-base font-manrope text-white/90 leading-relaxed font-medium">
                                                {benefit}
                                            </p>
                                        </div>
                                    ))}
                                </div>

                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Footer Copy & Contact Grid */}
                <section className="w-full flex flex-col items-center justify-center py-40 border-t border-white/10 px-6">
                    <p className="text-gray-500 uppercase tracking-[0.6em] text-[12px] font-mono mb-20 text-center font-bold">
                        SPONSORSHIP TEAM
                    </p>

                    <div className="w-full flex justify-center items-center">
                        <div className="w-full max-w-[1240px] flex justify-center">
                            <div className="w-full flex justify-center">
                                <ChromaGrid
                                    columns={3}
                                    rows={1}
                                    items={sponsorshipTeam.map(m => ({
                                        title: m.name,
                                        subtitle: m.role,
                                        image: m.image,
                                        url: m.linkedin,
                                        email: m.email,
                                        phone: m.phone,
                                        borderColor: m.role === 'Chairman' ? '#d4ff00' : '#8b7fff',
                                        gradient: m.role === 'Chairman' ? 'linear-gradient(135deg, rgba(212,255,0,0.2), rgba(107,95,255,0.2))' : 'linear-gradient(135deg, rgba(107,95,255,0.2), rgba(212,255,0,0.1))'
                                    }))}
                                />
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default SponsorshipSlabs;
