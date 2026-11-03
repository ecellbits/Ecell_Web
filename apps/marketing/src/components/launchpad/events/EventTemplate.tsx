import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaLinkedin } from 'react-icons/fa';
import { Phone, Calendar, MapPin, ChevronDown, MessageCircle } from 'lucide-react';
import SEO from '@/components/common/SEO';
import { Link } from "@/shims/react-router";

const EventTemplate = ({ eventData }) => {
    const [activeFaq, setActiveFaq] = useState(null);

    if (!eventData) return <div className="text-ink text-center py-20">Loading Event Data...</div>;

    const {
        title,
        tagline,
        bannerImage,
        description,
        timeline,
        pocs,
        faqs,
        gallery
    } = eventData;

    // Placeholder images for memories
    const activeMemoryImages = gallery || [
        "https://images.unsplash.com/photo-1540575861501-7cf05a4b125a?auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1475721027187-402cd7459d4f?auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80"
    ];

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Event",
        "name": `${title} | Launchpad 2026`,
        "description": description,
        "image": bannerImage,
        "startDate": "2026-03-15T09:00:00+05:30",
        "location": {
            "@type": "Place",
            "name": "BITS Pilani Hyderabad Campus",
            "address": {
                "@type": "PostalAddress",
                "streetAddress": "Jawahar Nagar, Shameerpet",
                "addressLocality": "Hyderabad",
                "postalCode": "500078",
                "addressRegion": "Telangana",
                "addressCountry": "IN"
            }
        },
        "organizer": {
            "@type": "Organization",
            "name": "E-Cell BITS Hyderabad",
            "url": "https://ecellbphc.in"
        }
    };

    return (
        <div className="bg-raised font-sans text-ink overflow-hidden">
            <SEO
                title={title}
                description={description.substring(0, 160)}
                keywords={[title, 'Launchpad', 'BITS Hyderabad', 'Startup Competition', 'Entrepreneurship']}
                image={bannerImage}
                schemaData={jsonLd}
            />
            {/* 1. HERO BANNER */}
            <section className="relative min-h-[70vh] md:h-[80vh] flex flex-col items-center justify-center overflow-hidden py-20">
                <div
                    className="absolute inset-0 z-0 scale-110"
                    style={{
                        backgroundImage: `url(${bannerImage || 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80'})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        filter: 'brightness(0.3)'
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-ecell-bg/60 to-ecell-bg z-1" />

                <motion.div
                    initial={false}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="relative z-10 text-center px-6"
                >
                    <h1 className="text-4xl sm:text-7xl md:text-9xl max-md:text-[3.5rem] font-sans text-ecell-primary mb-6 uppercase tracking-tighter leading-none break-words">
                        {title}
                    </h1>
                    <p className="text-base sm:text-xl md:text-2xl font-sans text-ink/80 max-w-2xl mx-auto">
                        {tagline}
                    </p>
                </motion.div>

                {/* Decorative elements */}
                <div className="relative md:absolute md:bottom-5 md:left-1/2 md:-translate-x-1/2 mt-12 md:mt-0 flex flex-col items-center gap-6 z-20">
                    {eventData.registerLink && (
                        eventData.registerLink.startsWith('/') || eventData.registerLink.startsWith('#') ? (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                            >
                                {eventData.registerLink.startsWith('#') ? (
                                    <a
                                        href={eventData.registerLink}
                                        className="bg-ecell-primary text-white font-sans font-bold text-lg md:text-xl px-8 py-3 rounded-full hover:bg-white hover:text-black transition-colors duration-300 inline-block no-underline"
                                    >
                                        {eventData.registerButtonText || "Register Now"}
                                    </a>
                                ) : (
                                    <Link
                                        to={eventData.registerLink}
                                        className="bg-ecell-primary text-white font-sans font-bold text-lg md:text-xl px-8 py-3 rounded-full hover:bg-white hover:text-black transition-colors duration-300 inline-block no-underline"
                                    >
                                        {eventData.registerButtonText || "Register Now"}
                                    </Link>
                                )}
                            </motion.div>
                        ) : (
                            <motion.a
                                href={eventData.registerLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-ecell-primary text-white font-sans font-bold text-lg md:text-xl px-8 py-3 rounded-full hover:bg-white hover:text-black transition-colors duration-300 no-underline"
                            >
                                {eventData.registerButtonText || "Register Now"}
                            </motion.a>
                        )
                    )}

                    <div className="hidden md:flex flex-col items-center gap-2 text-ink/40">
                        <span className="text-xs uppercase tracking-[0.3em] font-sans">Scroll to Explore</span>
                        <motion.div
                            animate={{ y: [0, 10, 0] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                            className="w-[1px] h-12 bg-gradient-to-b from-ecell-primary to-transparent"
                        />
                    </div>
                </div>
            </section>

            {/* 2. DESCRIPTION SECTION */}
            <section id="about" className="py-20 px-6 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={false}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-4xl font-sans text-ink mb-6">About the <span className="text-ecell-primary">Event</span></h2>
                        <div className="max-w-none">
                            <p className="text-lg text-ink/70 leading-relaxed font-sans whitespace-pre-line">
                                {description}
                            </p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={false}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="bg-surface/72 backdrop-blur-[10px] p-8 rounded-lg border-ecell-primary/20 relative group overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Calendar size={120} className="text-ecell-primary" />
                        </div>
                        <h3 className="text-2xl font-sans text-ecell-primary mb-6">Quick Info</h3>
                        <ul className="space-y-6">
                            <li className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-xl bg-ecell-primary/10 flex items-center justify-center text-ecell-primary shrink-0">
                                    <Calendar size={20} />
                                </div>
                                <div>
                                    <h4 className="text-ink font-semibold">Date</h4>
                                    <p className="text-ink/60">Check Timeline Below</p>
                                </div>
                            </li>
                            <li className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-xl bg-ecell-primary/10 flex items-center justify-center text-ecell-primary shrink-0">
                                    <MapPin size={20} />
                                </div>
                                <div>
                                    <h4 className="text-ink font-semibold">Venue</h4>
                                    <p className="text-ink/60">BITS Pilani Hyderabad Campus</p>
                                </div>
                            </li>
                        </ul>
                    </motion.div>
                </div>
            </section>

            {/* 3. TIMELINE SECTION */}
            <section id="timeline" className="py-24 bg-transparent">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="text-center mb-20">
                        <motion.h2
                            initial={false}
                            whileInView={{ opacity: 1, scale: 1 }}
                            className="text-4xl md:text-6xl font-sans font-bold text-ink mb-4 uppercase inline-block"
                        >
                            EVENT <span className="text-ecell-primary">TIMELINE</span>
                        </motion.h2>
                        <div className="w-24 h-1 bg-ecell-primary mx-auto rounded-full mt-2" />
                    </div>

                    <div className="relative">
                        {/* Middle Line */}
                        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-ecell-primary/50 via-ecell-primary/20 to-transparent -translate-x-1/2 z-0" />

                        {timeline && timeline.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={false}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className={`relative mb-16 flex flex-col md:flex-row items-center w-full ${index % 2 === 0 ? 'md:flex-row-reverse' : ''
                                    }`}
                            >
                                {/* Dot */}
                                <div className="absolute left-4 md:left-1/2 w-6 h-6 md:w-8 md:h-8 -translate-x-1/2 flex items-center justify-center z-10">
                                    <div className="w-3 h-3 md:w-4 md:h-4 bg-lava-bright rounded-full" />
                                </div>

                                {/* Content Side */}
                                <div className={`w-full md:w-[45%] pl-12 md:pl-0 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'
                                    }`}>
                                    <motion.div
                                        whileHover={{ y: -5 }}
                                        className="bg-surface/72 backdrop-blur-[10px] p-6 md:p-8 rounded-lg border-white/5 hover:border-ecell-primary/30 transition-all duration-300 relative group overflow-hidden"
                                    >
                                        <div className="absolute inset-0 bg-ecell-primary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                                        <span className="text-ecell-primary font-sans text-sm font-bold tracking-[0.2em] uppercase mb-3 block">
                                            {item.date}
                                        </span>
                                        <h3 className="text-xl md:text-2xl font-sans font-bold text-ink group-hover:text-ecell-primary transition-colors leading-tight mb-2">
                                            {item.event}
                                        </h3>
                                        {item.description && (
                                            <p className="text-ink/60 font-sans text-sm leading-relaxed">
                                                {item.description}
                                            </p>
                                        )}
                                    </motion.div>
                                </div>

                                {/* Empty Side for desktop */}
                                <div className="hidden md:block md:w-[45%]" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4. POCs SECTION */}
            <section id="contacts" className="py-24 px-6 max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-5xl font-sans text-ink mb-4 uppercase">Points of <span className="text-ecell-primary">Contact</span></h2>
                    <p className="text-ink/60 font-sans">{eventData.pocTagline || "Feel free to reach out for any queries!"}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {pocs && pocs.map((poc, index) => (
                        <motion.div
                            key={index}
                            whileHover={{ y: -10 }}
                            className="bg-surface/72 backdrop-blur-[10px] p-6 rounded-lg border-white/5 relative overflow-hidden group"
                        >
                            <div className="aspect-square rounded-lg overflow-hidden mb-6 relative">
                                <img
                                    loading="lazy" src={poc.image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${poc.name}`}
                                    alt={poc.name}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    style={{
                                        objectPosition: poc.objectPosition || 'center',
                                        objectFit: poc.objectFit || 'cover',
                                        width: poc.scale ? `${poc.scale * 100}%` : '100%',
                                        height: poc.scale ? `${poc.scale * 100}%` : '100%',
                                        marginLeft: poc.scale ? `-${(poc.scale - 1) * 50}%` : '0',
                                        marginTop: poc.scale ? `-${(poc.scale - 1) * 50}%` : '0'
                                    }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-ecell-bg to-transparent opacity-0 group-hover:opacity-60 transition-opacity" />
                            </div>

                            <h3 className="text-2xl font-sans text-ink mb-1">{poc.name}</h3>
                            <p className="text-ecell-primary text-sm font-bold tracking-widest uppercase mb-6">{poc.role || 'Event Coordinator'}</p>

                            <div className="flex flex-wrap gap-3">
                                <a
                                    href={`tel:${poc.phone}`}
                                    className="flex items-center gap-2 px-4 py-2 bg-white border border-hairline-strong hover:bg-ecell-primary hover:text-white rounded-xl transition-all text-sm font-medium"
                                >
                                    <Phone size={14} /> {poc.phone}
                                </a>
                                <a
                                    href={poc.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 flex items-center justify-center bg-white/5 hover:bg-ecell-blue text-ink rounded-xl transition-all"
                                >
                                    <FaLinkedin size={20} />
                                </a>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* 5. FAQs SECTION */}
            <section className="py-24 px-6 max-w-4xl mx-auto mb-20">
                <div className="flex items-center gap-4 mb-16">
                    <div className="p-4 rounded-lg bg-ecell-primary/10 text-ecell-primary">
                        <MessageCircle size={32} />
                    </div>
                    <div>
                        <h2 className="text-4xl font-sans text-ink uppercase">Frequently Asked <span className="text-ecell-primary">Questions</span></h2>
                    </div>
                </div>

                <div className="space-y-4">
                    {faqs && faqs.map((faq, index) => (
                        <div
                            key={index}
                            className={`bg-surface/72 backdrop-blur-[10px] rounded-lg border-white/5 transition-all overflow-hidden ${activeFaq === index ? "border-ecell-primary/30 ring-1 ring-ecell-primary/30" : ''
                                }`}
                        >
                            <button
                                onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                                className="w-full px-8 py-6 flex items-center justify-between text-left group"
                            >
                                <span className={`text-lg font-sans transition-colors ${activeFaq === index ? 'text-ecell-primary' : "text-ink group-hover:text-ink/80"
                                    }`}>
                                    {faq.question}
                                </span>
                                <motion.div
                                    animate={{ rotate: activeFaq === index ? 180 : 0 }}
                                    className="text-ecell-primary"
                                >
                                    <ChevronDown size={24} />
                                </motion.div>
                            </button>

                            <AnimatePresence>
                                {activeFaq === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div className="px-8 pb-8 text-ink/60 font-sans leading-relaxed border-t border-white/5 pt-4">
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </section>

            {/* 6. IMAGE CAROUSEL SECTION */}
            {!eventData.hideGallery && (
                <section className="py-24 bg-ecell-bg-light/10 overflow-hidden">
                    <div className="max-w-7xl mx-auto px-6 text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-sans text-ink uppercase">Event <span className="text-ecell-primary">Memories</span></h2>
                        <div className="w-24 h-1 bg-ecell-primary mx-auto rounded-full mt-4" />
                    </div>

                    <div className="relative">
                        <motion.div
                            animate={{ x: ["0%", "-50%"] }}
                            transition={{
                                duration: 30,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                            className="flex gap-6 w-max px-6"
                        >
                            {/* Duplicate icons for seamless loop */}
                            {[...activeMemoryImages, ...activeMemoryImages].map((img, idx) => (
                                <motion.div
                                    key={idx}
                                    whileHover={{ scale: 1.02, zIndex: 10 }}
                                    className="w-[300px] md:w-[500px] h-[350px] md:h-[600px] rounded-lg overflow-hidden border border-white/10 relative group shrink-0"
                                >
                                    <img
                                        loading="lazy" src={img}
                                        alt={`Memory ${idx}`}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-ecell-bg via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-10">
                                        <div>
                                            <p className="text-ecell-primary font-bold tracking-[0.2em] uppercase text-xs mb-2">Launchpad 2024</p>
                                            <p className="text-white font-sans text-2xl font-bold">Unforgettable Moments</p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>

                        {/* Gradient Fades */}
                        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-ecell-bg to-transparent z-10 pointer-events-none" />
                        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-ecell-bg to-transparent z-10 pointer-events-none" />
                    </div>
                </section>
            )}
        </div>
    );
};

export default EventTemplate;
