import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  Clock, 
  ChevronRight, 
  ArrowUpRight, 
  CheckCircle2, 
  Rocket,
  Compass,
  Zap
} from 'lucide-react';
import BlogNavbar from './BlogNavbar';
import StartupStagesAnimation from './StartupStagesAnimation';
import ECellConversations from './ECellConversations';
import SEO from '../common/SEO';

const tableOfContents = [
  { id: 'intro', label: '1. The Entrepreneurial Spark' },
  { id: 'stages', label: '2. Stages of a Startup' },
  { id: 'ecell-conversations', label: '3. E-Cell Conversations (Ep-01)' },
  { id: 'founder-summary', label: '4. The Builder\'s Playbook' }
];

const BlogPage = () => {
  // Dark mode as default as requested
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [activeSection, setActiveSection] = useState('intro');

  // Track active section for table of contents
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (let i = tableOfContents.length - 1; i >= 0; i--) {
        const section = document.getElementById(tableOfContents[i].id);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(tableOfContents[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 90;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": "Entrepreneurship and Founder Playbook | E-Cell BITS Hyderabad",
    "description": "Essential founder playbook detailing the stages of a startup, execution realities, and insights from E-Cell Conversations EP-01.",
    "publisher": {
      "@type": "Organization",
      "name": "E-Cell BITS Pilani Hyderabad Campus",
      "logo": {
        "@type": "ImageObject",
        "url": "https://ecellbphc.in/navbarlogo.png"
      }
    },
    "datePublished": "2026-10-17"
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 font-sans ${
      isDarkMode 
        ? 'bg-[#000000] text-slate-100 selection:bg-[#d4ff00] selection:text-black' 
        : 'bg-[#fafafa] text-slate-900 selection:bg-indigo-600 selection:text-white'
    }`}>
      <SEO 
        title="Entrepreneurship and Founder Playbook | E-Cell Blog"
        description="Explore our founder playbook: the 5 essential stages of a startup, execution realities from E-Cell Conversations EP-01, and our interactive roadmap from idea to exit."
        keywords={['Entrepreneurship', 'Founder Playbook', 'Startup Stages', 'Bootstrapping', 'Pre-Seed', 'Seed Round', 'VC Funding', 'Exit Stage', 'E-Cell BITS Hyderabad', 'E-Cell Conversations']}
        schemaData={jsonLd}
      />

      {/* Sticky Top Blog Navbar with Dark/Light Mode changer (Dark default) */}
      <BlogNavbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />

      {/* Hero Editorial Header */}
      <section className="relative pt-10 pb-12 px-4 sm:px-6 lg:px-8 border-b transition-colors duration-300 overflow-hidden">
        <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] blur-[150px] pointer-events-none rounded-full opacity-20 ${
          isDarkMode ? 'bg-gradient-to-r from-[#d4ff00] via-[#6b5fff] to-pink-500' : 'bg-gradient-to-r from-blue-300 via-indigo-200 to-amber-200'
        }`} />

        <div className="max-w-6xl mx-auto relative z-10 text-center md:text-left">
          
          {/* Category Breadcrumb & Read Time */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-4 text-xs font-bold uppercase tracking-wider">
            <span className={`px-3 py-1 rounded-full ${
              isDarkMode ? 'bg-[#d4ff00]/10 text-[#d4ff00] border border-[#d4ff00]/20' : 'bg-lime-100 text-lime-800 border border-lime-200'
            }`}>
              E-Cell Editorial
            </span>
            <span className={isDarkMode ? 'text-zinc-400' : 'text-slate-500'}>•</span>
            <span className={isDarkMode ? 'text-zinc-300' : 'text-slate-600'}>
              Venture Building & Strategy
            </span>
            <span className={isDarkMode ? 'text-zinc-400' : 'text-slate-500'}>•</span>
            <span className={`flex items-center gap-1 ${isDarkMode ? 'text-zinc-400' : 'text-slate-500'}`}>
              <Clock className="w-3.5 h-3.5" /> 8 Min Read
            </span>
          </div>

          {/* 2) Main Title updated to: Entrepreneurship and Founder Playbook */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] mb-5 font-syne">
            Entrepreneurship and Founder Playbook
          </h1>

          {/* Subtitle */}
          <p className={`text-base sm:text-lg md:text-xl leading-relaxed max-w-4xl font-normal ${
            isDarkMode ? 'text-zinc-300' : 'text-slate-700'
          }`}>
            A definitive guide through every milestone of the venture lifecycle — from personal savings and prototype building to venture capital and market exit, paired with raw insights from <span className="font-semibold text-inherit underline decoration-[#d4ff00] underline-offset-4">E-Cell Conversations EP-01</span>.
          </p>

          {/* 1) Clean Meta Row (Removed 'By E-Cell Tech & Editorial Team') */}
          <div className={`mt-6 pt-5 border-t flex flex-wrap items-center justify-between gap-4 text-xs ${
            isDarkMode ? 'border-white/10 text-zinc-400' : 'border-slate-200 text-slate-500'
          }`}>
            <div className="flex items-center gap-2">
              <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                E-Cell BITS Pilani Hyderabad Campus
              </span>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                <span>October 2026</span>
              </div>
              <div>•</div>
              <div className="flex items-center gap-1.5 text-emerald-500 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Verified Founder Insights</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Main Content Layout (Extended horizontally) */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Sticky "ON THIS PAGE" Navigation */}
          <aside className="hidden lg:block lg:col-span-2">
            <div className="sticky top-24 space-y-5">
              
              <div className={`p-4 rounded-2xl border transition-all ${
                isDarkMode 
                  ? 'bg-[#0a0a0f] border-white/10' 
                  : 'bg-white border-slate-200 shadow-sm'
              }`}>
                <h3 className={`text-xs font-bold uppercase tracking-widest mb-3 flex items-center gap-1.5 ${
                  isDarkMode ? 'text-[#d4ff00]' : 'text-slate-900'
                }`}>
                  <Compass className="w-3.5 h-3.5" /> ON THIS PAGE
                </h3>
                <nav className="space-y-1">
                  {tableOfContents.map((item) => {
                    const isActive = activeSection === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => scrollToSection(item.id)}
                        className={`w-full text-left text-xs font-semibold py-1.5 px-2 rounded-xl transition-all duration-200 flex items-center justify-between ${
                          isActive
                            ? isDarkMode
                              ? 'bg-white/10 text-white font-bold border-l-2 border-[#d4ff00]'
                              : 'bg-slate-100 text-slate-900 font-bold border-l-2 border-indigo-600'
                            : isDarkMode
                            ? 'text-zinc-400 hover:text-white hover:bg-white/5'
                            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                        }`}
                      >
                        <span className="truncate">{item.label}</span>
                        {isActive && <ChevronRight className="w-3 h-3 flex-shrink-0" />}
                      </button>
                    );
                  })}
                </nav>
              </div>

              {/* Quick Launchpad Widget */}
              <div className={`p-4 rounded-2xl border transition-all ${
                isDarkMode 
                  ? 'bg-gradient-to-br from-[#12131d] to-[#08090d] border-white/10 text-white' 
                  : 'bg-gradient-to-br from-indigo-50 to-white border-indigo-100 shadow-sm'
              }`}>
                <div className="flex items-center gap-1.5 text-xs font-bold uppercase text-[#d4ff00] mb-1.5">
                  <Rocket className="w-3.5 h-3.5" /> Launchpad
                </div>
                <h4 className="font-bold text-xs tracking-tight mb-1">
                  Got a Startup Idea?
                </h4>
                <p className={`text-[11px] leading-relaxed mb-3 ${isDarkMode ? 'text-zinc-400' : 'text-slate-600'}`}>
                  Pitch your venture at South India's largest E-Summit with the E-Cell BPHC incubator.
                </p>
                <a
                  href="/launchpad"
                  className={`inline-flex items-center justify-center gap-1 w-full py-1.5 px-2.5 rounded-xl text-xs font-bold transition-all ${
                    isDarkMode 
                      ? 'bg-[#d4ff00] text-black hover:bg-[#c2ea00]' 
                      : 'bg-indigo-600 text-white hover:bg-indigo-700'
                  }`}
                >
                  <span>Explore Launchpad</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>

            </div>
          </aside>

          {/* Center Column: Extended Horizontally */}
          <main className="lg:col-span-7 space-y-10">
            
            {/* 1. START WITH E-CELL & ENTREPRENEURSHIP IN THE VERY START */}
            <article id="intro" className="space-y-6">
              {/* Lead Statement */}
              <p className={`text-lg sm:text-xl md:text-2xl font-normal leading-relaxed tracking-tight ${
                isDarkMode ? 'text-zinc-100' : 'text-slate-900'
              }`}>
                Entrepreneurship is not merely about launching a commercial entity; it is the deliberate discipline of identifying acute human friction, designing scalable solutions under radical uncertainty, and having the conviction to bring something new into existence.
              </p>

              {/* Secondary context */}
              <p className={`text-lg sm:text-xl md:text-2xl font-normal leading-relaxed tracking-tight ${
                isDarkMode ? 'text-zinc-100' : 'text-slate-900'
              }`}>
                At <span className={isDarkMode ? 'text-white font-semibold' : 'text-slate-900 font-semibold'}>E-Cell BITS Pilani Hyderabad Campus</span>, our foundational mission is to cultivate an uncompromising culture of innovation. We bridge the gap between technical brilliance and commercial reality — guiding student founders from hostel-room prototypes to institutional venture capital.
              </p>

              {/* Minimalist Editorial Pull-Quote (No bulky card box, generous breathing room) */}
              <div className={`my-6 pl-5 sm:pl-6 py-2 border-l-2 ${
                isDarkMode ? 'border-[#d4ff00]' : 'border-indigo-600'
              }`}>
                <p className={`text-base sm:text-lg italic font-normal leading-relaxed ${
                  isDarkMode ? 'text-zinc-200' : 'text-slate-800'
                }`}>
                  "Most startups fail not because they couldn't build their product, but because they built something nobody actually wanted. Knowing your lifecycle stage protects you from premature scaling and fatal dilution."
                </p>
                <div className={`text-xs uppercase tracking-wider font-semibold mt-2.5 ${
                  isDarkMode ? 'text-[#d4ff00]' : 'text-indigo-600'
                }`}>
                  — E-Cell BPHC Venture Principles
                </div>
              </div>
            </article>

            {/* 2. WHAT ARE THE DIFFERENT STAGES OF A STARTUP (EXTENDED HORIZONTALLY + INTEGRATED INSTAGRAM LINK) */}
            <section id="stages" className="pt-2">
              <StartupStagesAnimation isDarkMode={isDarkMode} />
            </section>

            {/* 3. E-CELL CONVERSATIONS: EPISODE 01 + CONCISE FACTS (EXTENDED HORIZONTALLY) */}
            <section id="ecell-conversations" className="pt-2">
              <ECellConversations isDarkMode={isDarkMode} />
            </section>

            {/* 4. SUMMARY PLAYBOOK & BUILDER MINDSET */}
            <article id="founder-summary" className={`p-6 sm:p-7 rounded-3xl border transition-all ${
              isDarkMode 
                ? 'bg-gradient-to-br from-[#0e0f17] via-[#090a0f] to-[#000000] border-white/10 text-white' 
                : 'bg-white border-slate-200 text-slate-900 shadow-md'
            }`}>
              <div className="flex items-center gap-1.5 mb-2.5 text-xs font-bold uppercase tracking-wider text-[#d4ff00]">
                <Zap className="w-3.5 h-3.5" /> Founder's Operating Formula
              </div>
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight mb-2.5">
                The Core Takeaway
              </h3>
              <p className={`text-sm leading-relaxed mb-4 ${
                isDarkMode ? 'text-zinc-300' : 'text-slate-700'
              }`}>
                Building a great startup is an iterative loop of hypothesis, validation, humility, and relentless execution. Whether you are bootstrapping your initial prototype today or gearing up for VC funding tomorrow, remember that external capital only accelerates what is already working.
              </p>
              <div className={`p-4 rounded-xl border flex flex-col sm:flex-row items-center justify-between gap-3 ${
                isDarkMode ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-200'
              }`}>
                <div>
                  <span className="font-bold text-xs sm:text-sm block">Ready to take your venture to the next stage?</span>
                  <span className={`text-[11px] ${isDarkMode ? 'text-zinc-400' : 'text-slate-500'}`}>
                    Submit your venture to the E-Cell BITS Hyderabad incubation network.
                  </span>
                </div>
                <a
                  href="/startup-connect"
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                    isDarkMode 
                      ? 'bg-white text-black hover:bg-zinc-200' 
                      : 'bg-slate-900 text-white hover:bg-slate-800'
                  }`}
                >
                  Apply to Startup Connect →
                </a>
              </div>
            </article>

          </main>

          {/* 3) Right Sidebar: "Connect & Subscribe" */}
          <aside className="lg:col-span-3 xl:col-span-3">
            <div className="sticky top-24 space-y-5">
              {/* Connect & Subscribe */}
              <div className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                isDarkMode ? 'bg-[#0a0a0f] border-white/10' : 'bg-white border-slate-200 shadow-sm'
              }`}>
                <h4 className={`text-xs font-bold uppercase tracking-widest mb-2 ${
                  isDarkMode ? 'text-zinc-400' : 'text-slate-500'
                }`}>
                  Connect & Subscribe
                </h4>
                <p className={`text-xs leading-relaxed mb-3.5 ${isDarkMode ? 'text-zinc-400' : 'text-slate-600'}`}>
                  Join over 5,000+ founders and innovators in the BITS Pilani entrepreneurship network.
                </p>
                <div className="space-y-2">
                  <a
                    href="https://chat.whatsapp.com/GRGDBbVBNiV6WvTpw1g182"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-2.5 rounded-xl border text-xs font-semibold transition-all bg-emerald-500/10 border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20"
                  >
                    <span>Join WhatsApp Community</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href="https://www.instagram.com/ecell_bphc"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-2.5 rounded-xl border text-xs font-semibold transition-all bg-pink-500/10 border-pink-500/30 text-pink-400 hover:bg-pink-500/20"
                  >
                    <span>Follow @ecell_bphc</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </aside>

        </div>
      </div>

    </div>
  );
};

export default BlogPage;
