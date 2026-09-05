import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Sparkles,
  Compass,
  Rocket,
  Quote,
  Layers,
  CheckCircle2,
  X,
  ZoomIn
} from 'lucide-react';
import SEO from '../common/SEO';

// Import Community Meet images
import cm1 from '../../assets/community_meet/community_meet_1.jpg';
import cm2 from '../../assets/community_meet/community_meet_2.jpg';
import cm3 from '../../assets/community_meet/community_meet_3.jpg';

const CommunityMeet = () => {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const sectors = [
    'Defence Technology',
    'Agritech',
    'Healthcare',
    'AI Diagnostics',
    'Industrial Technology'
  ];

  const featuredVentures = [
    'Beijan',
    'Mitti Sanjeevani',
    'AtreVes Healthcare',
    'Prakirbha AI Diagnostics',
    'Yantraayush Solutions',
    'HindArch InnovationsSector'
  ];

  const studentStartups = [
    {
      name: 'Kramarine',
      desc: 'Unmanned rescue technology for flood and coastal safety'
    },
    {
      name: 'LYNQ',
      desc: 'Campus initiative to working with major enterprises'
    },
    {
      name: 'Origo',
      desc: 'Platform combating student loneliness through verified networks'
    },
    {
      name: 'Apollyon Dynamics',
      desc: 'Early-stage idea to securing its first order from the Indian Army'
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden selection:bg-[#d4ff00] selection:text-black">
      <SEO
        title="Community Meet | Entrepreneurship Day 2026"
        description="E-Cell BITS Pilani Hyderabad Campus celebrated Entrepreneurship Day 2026 with a vibrant community meet bringing together founders, researchers, professors, and student entrepreneurs."
        keywords={[
          'Community Meet',
          'Entrepreneurship Day 2026',
          'BITS Pilani Hyderabad Campus',
          'E-Cell',
          'Ideas Into Impact',
          'Startups BPHC'
        ]}
        image={cm2}
        url="https://ecellbphc.in/community-meet"
      />

      {/* Ambient background glows */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-10 left-1/4 w-[500px] h-[500px] bg-[#6F66FF]/10 rounded-full blur-[140px]" />
        <div className="absolute top-1/2 right-10 w-[450px] h-[450px] bg-[#d4ff00]/8 rounded-full blur-[160px]" />
        <div className="absolute bottom-20 left-10 w-[400px] h-[400px] bg-[#6F66FF]/8 rounded-full blur-[140px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 md:pt-36 pb-24">
        {/* Back navigation button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 md:mb-12"
        >
          <button
            onClick={() => navigate('/program')}
            className="group inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/25 backdrop-blur-md transition-all duration-300 text-sm md:text-base font-manrope font-medium text-gray-300 hover:text-white"
          >
            <ArrowLeft className="w-4 h-4 text-[#d4ff00] transition-transform duration-300 group-hover:-translate-x-1" />
            <span>Back to Programs</span>
          </button>
        </motion.div>

        {/* HERO / HEADING SECTION */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto mb-16 md:mb-24"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#6F66FF]/15 border border-[#6F66FF]/40 text-[#a39eff] text-xs sm:text-sm font-semibold tracking-wider uppercase mb-6">

            <span>E-Cell Initiatives &bull; Community Meet</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold font-syne tracking-tight leading-[1.1] mb-6">
            Entrepreneurship Day 2026:{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4ff00] via-[#c6f000] to-white">
              Ideas Into Impact
            </span>
          </h1>

          <div className="h-1 w-24 bg-gradient-to-r from-[#6F66FF] to-[#d4ff00] mx-auto mb-6 rounded-full" />

          <p className="text-base sm:text-lg md:text-xl text-gray-300 font-manrope font-light leading-relaxed max-w-3xl mx-auto">
            A vibrant community gathering bringing together visionaries, researchers, professors, and student founders to turn groundbreaking ideas into real-world ventures.
          </p>
        </motion.div>

        {/* ALTERNATING SIDE-BY-SIDE SECTIONS */}
        <div className="space-y-20 md:space-y-32">
          {/* SECTION 1: Pic on LEFT, Text on RIGHT */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, margin: '-50px' }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center"
          >
            {/* Left Image */}
            <div className="lg:col-span-6 order-1">
              <div
                onClick={() => setSelectedImage({ src: cm1, title: 'The BITS Pilani Effect & Keynote Session' })}
                className="group relative rounded-3xl overflow-hidden bg-[#151515] border border-white/10 hover:border-[#6F66FF]/50 transition-all duration-500 shadow-2xl cursor-pointer"
              >
                <div className="aspect-[4/3] sm:aspect-[16/10] overflow-hidden relative">
                  <img
                    src={cm1}
                    alt="Entrepreneurship Day 2026 Keynote Session - The BITS Pilani Effect"
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />

                  <div className="absolute top-4 right-4 p-2 rounded-full bg-black/50 backdrop-blur-md text-white/80 group-hover:text-white group-hover:bg-[#6F66FF] transition-all duration-300">
                    <ZoomIn className="w-4 h-4" />
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 text-xs sm:text-sm font-manrope text-gray-300 bg-black/60 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10">
                    <span className="text-[#d4ff00] font-semibold">Keynote:</span> The BITS Pilani Effect &amp; Sectoral Insights
                  </div>
                </div>
              </div>
            </div>

            {/* Right Text */}
            <div className="lg:col-span-6 order-2 flex flex-col justify-center space-y-6">
              <div className="inline-flex items-center gap-2 text-xs md:text-sm font-semibold uppercase tracking-wider text-[#d4ff00]">
                <Compass className="w-4 h-4" />
                <span>Opening Session &amp; Overview</span>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-syne text-white leading-tight">
                Celebrating Innovation Across Frontiers
              </h2>

              <p className="text-gray-300 font-manrope text-base sm:text-lg leading-relaxed">
                E-Cell, BITS Pilani Hyderabad Campus celebrated Entrepreneurship Day 2026 with a vibrant community meet bringing together founders, researchers, professors, and student entrepreneurs. The session, led by Vikas Katragadda of Naandi Ventures and Surbhit Johri of BITS Hyderabad TBIS, explored entrepreneurial journeys across Defence Technology, Agritech, Healthcare, AI Diagnostics, and Industrial Technology.
              </p>

              {/* Sectors Tags */}
              <div className="pt-2">
                <p className="text-xs uppercase tracking-widest text-gray-400 font-semibold mb-3">Key Focus Sectors Explored:</p>
                <div className="flex flex-wrap gap-2">
                  {sectors.map((sector, idx) => (
                    <span
                      key={idx}
                      className="px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium bg-white/5 border border-white/10 text-gray-200 hover:border-[#d4ff00]/50 hover:text-white transition-colors duration-300"
                    >
                      {sector}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* SECTION 2: Text on LEFT, Pic on RIGHT (Vice Versa) */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, margin: '-50px' }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center"
          >
            {/* Left Text */}
            <div className="lg:col-span-6 order-2 lg:order-1 flex flex-col justify-center space-y-6">
              <div className="inline-flex items-center gap-2 text-xs md:text-sm font-semibold uppercase tracking-wider text-[#6F66FF]">
                <Layers className="w-4 h-4" />
                <span>Founders &amp; Research Translation</span>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-syne text-white leading-tight">
                Navigating Uncertainty &amp; Transforming Research
              </h2>

              <p className="text-gray-300 font-manrope text-base sm:text-lg leading-relaxed">
                The conversations featured Beijan, Mitti Sanjeevani, AtreVes Healthcare, Prakirbha AI Diagnostics, Yantraayush Solutions, and HindArch InnovationsSector, highlighting lessons on identifying meaningful problems, navigating uncertainty, building strong teams, and transforming research and ideas into real-world impact.
              </p>

              {/* Featured Startups / Ventures Grid */}
              <div className="pt-2">
                <p className="text-xs uppercase tracking-widest text-gray-400 font-semibold mb-3">Featured Startup Conversations:</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {featuredVentures.map((venture, idx) => (
                    <div
                      key={idx}
                      className="px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-xs sm:text-sm font-medium text-gray-200 flex items-center gap-2 hover:bg-[#6F66FF]/15 hover:border-[#6F66FF]/40 transition-all duration-300"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#d4ff00] flex-shrink-0" />
                      <span className="truncate">{venture}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div className="lg:col-span-6 order-1 lg:order-2">
              <div
                onClick={() => setSelectedImage({ src: cm2, title: 'Panel Discussion with Founders & Mentors' })}
                className="group relative rounded-3xl overflow-hidden bg-[#151515] border border-white/10 hover:border-[#d4ff00]/50 transition-all duration-500 shadow-2xl cursor-pointer"
              >
                <div className="aspect-[4/3] sm:aspect-[16/10] overflow-hidden relative">
                  <img
                    src={cm2}
                    alt="Panel of founders and mentors at E-Cell Community Meet"
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />

                  <div className="absolute top-4 right-4 p-2 rounded-full bg-black/50 backdrop-blur-md text-white/80 group-hover:text-white group-hover:bg-[#d4ff00] group-hover:text-black transition-all duration-300">
                    <ZoomIn className="w-4 h-4" />
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 text-xs sm:text-sm font-manrope text-gray-300 bg-black/60 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10">
                    <span className="text-[#a39eff] font-semibold">Panel:</span> Founders, Researchers &amp; Mentorship
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* SECTION 3: Pic on LEFT, Text on RIGHT */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, margin: '-50px' }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center"
          >
            {/* Left Image */}
            <div className="lg:col-span-6 order-1">
              <div
                onClick={() => setSelectedImage({ src: cm3, title: 'Audience & Student Entrepreneurs in Attendance' })}
                className="group relative rounded-3xl overflow-hidden bg-[#151515] border border-white/10 hover:border-[#6F66FF]/50 transition-all duration-500 shadow-2xl cursor-pointer"
              >
                <div className="aspect-[4/3] sm:aspect-[16/10] overflow-hidden relative">
                  <img
                    src={cm3}
                    alt="Audience and student entrepreneurs at Community Meet"
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />

                  <div className="absolute top-4 right-4 p-2 rounded-full bg-black/50 backdrop-blur-md text-white/80 group-hover:text-white group-hover:bg-[#6F66FF] transition-all duration-300">
                    <ZoomIn className="w-4 h-4" />
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 text-xs sm:text-sm font-manrope text-gray-300 bg-black/60 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10">
                    <span className="text-[#d4ff00] font-semibold">Community:</span> Students, Innovators &amp; Faculty
                  </div>
                </div>
              </div>
            </div>

            {/* Right Text */}
            <div className="lg:col-span-6 order-2 flex flex-col justify-center space-y-6">
              <div className="inline-flex items-center gap-2 text-xs md:text-sm font-semibold uppercase tracking-wider text-[#d4ff00]">
                <Rocket className="w-4 h-4" />
                <span>Student Entrepreneurship in Action</span>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-syne text-white leading-tight">
                From Campus Initiatives to Scaled Impact
              </h2>

              <p className="text-gray-300 font-manrope text-base sm:text-lg leading-relaxed">
                Student startups further brought entrepreneurship to life. Kramarine showcased unmanned rescue technology for flood and coastal safety; LYNQ shared its journey from a campus initiative to working with major companies; Origo presented its platform for combating student loneliness through verified networks; and Apollyon Dynamics reflected on its journey from an early-stage idea to securing its first order from the Indian Army.
              </p>

              {/* Student Startups Showcase Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {studentStartups.map((startup, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-white/20 transition-all duration-300"
                  >
                    <div className="text-[#d4ff00] font-syne font-bold text-sm sm:text-base mb-1">
                      {startup.name}
                    </div>
                    <div className="text-gray-400 font-manrope text-xs leading-relaxed">
                      {startup.desc}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* SECTION 4: THE CORE TAKEAWAY / MANIFESTO CARD */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-24 md:mt-36"
        >
          <div className="relative rounded-3xl md:rounded-[2.5rem] p-8 sm:p-12 md:p-16 overflow-hidden border border-[#6F66FF]/40 bg-gradient-to-br from-[#18152e] via-[#101018] to-black shadow-[0_0_80px_rgba(111,102,255,0.15)] text-center">
            {/* Background embellishment */}
            <div className="absolute -top-24 -right-24 w-72 h-72 bg-[#6F66FF]/20 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-[#d4ff00]/15 rounded-full blur-[100px] pointer-events-none" />

            <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
              <div className="w-14 h-14 rounded-2xl bg-[#6F66FF]/20 border border-[#6F66FF]/40 flex items-center justify-center mb-8 text-[#d4ff00]">
                <Quote className="w-7 h-7" />
              </div>

              <blockquote className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-syne font-bold text-white tracking-tight leading-snug mb-8">
                &ldquo;The community meet reinforced one powerful message: <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4ff00] to-[#c6f000]">impactful ventures often begin with simply noticing a problem worth solving.</span>&rdquo;
              </blockquote>

              <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                <button
                  onClick={() => navigate('/program')}
                  className="px-7 py-3 rounded-full bg-[#6F66FF] hover:bg-[#5b51ea] text-white font-syne font-semibold text-sm sm:text-base transition-all duration-300 shadow-lg shadow-[#6F66FF]/30 hover:scale-[1.02]"
                >
                  Explore More Programs
                </button>
                <button
                  onClick={() => navigate('/contact')}
                  className="px-7 py-3 rounded-full bg-white/10 hover:bg-white/15 border border-white/20 text-white font-syne font-semibold text-sm sm:text-base transition-all duration-300 hover:scale-[1.02]"
                >
                  Connect with E-Cell
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* LIGHTBOX MODAL FOR IMAGE ZOOM */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-lg flex items-center justify-center p-4 md:p-8 cursor-pointer"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full bg-[#151515] rounded-3xl overflow-hidden border border-white/20 shadow-2xl"
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-black/70 hover:bg-white text-white hover:text-black transition-colors duration-300 backdrop-blur-md"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="relative max-h-[80vh] overflow-hidden flex items-center justify-center bg-black">
                <img
                  src={selectedImage.src}
                  alt={selectedImage.title}
                  className="w-full h-auto max-h-[75vh] object-contain"
                />
              </div>
              <div className="p-4 sm:p-6 bg-[#181818] border-t border-white/10 flex items-center justify-between">
                <span className="text-sm sm:text-base font-syne font-semibold text-white">
                  {selectedImage.title}
                </span>
                <span className="text-xs text-gray-400 font-manrope">
                  Entrepreneurship Day 2026 &bull; E-Cell BPHC
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CommunityMeet;
