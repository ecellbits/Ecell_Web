import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  ArrowUpRight, 
  Compass, 
  Play, 
  Clock
} from 'lucide-react';

const BlogShortcut = () => {
  return (
    <section className="relative py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-20">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-72 bg-gradient-to-r from-[#d4ff00]/10 via-[#6b5fff]/15 to-transparent blur-3xl pointer-events-none rounded-full" />

      {/* Container card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative rounded-3xl p-6 sm:p-10 border border-white/10 bg-gradient-to-br from-[#0c0d14]/90 via-[#07080c]/90 to-[#000000] backdrop-blur-2xl shadow-2xl overflow-hidden group"
      >
        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-4">
            
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-[#d4ff00]/10 text-[#d4ff00] border border-[#d4ff00]/30 shadow-sm">
                <Compass className="w-3.5 h-3.5" /> Featured Editorial
              </span>
              <span className="inline-flex items-center gap-1 text-xs text-zinc-400 font-medium">
                <Clock className="w-3.5 h-3.5" /> 8 Min Read
              </span>
              <span className="text-zinc-600">•</span>
              <span className="text-xs text-zinc-400 font-medium">
                Episode 01 Inside
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight leading-tight font-syne">
              Entrepreneurship and Founder Playbook
            </h3>

            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed max-w-xl">
              From personal savings and MVP validation to Series A-C and public exit. Explore our interactive roadmap paired with candid founder realities from <span className="text-white font-semibold underline decoration-[#d4ff00] underline-offset-4">E-Cell Conversations EP-01</span>.
            </p>

            {/* Stages preview pill tags */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              {['1. Bootstrapping', '2. Pre-Seed', '3. Seed Round', '4. VC Funding', '5. Exit Stage'].map((stg, i) => (
                <span 
                  key={i} 
                  className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-zinc-300"
                >
                  {stg}
                </span>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="pt-3 flex flex-wrap items-center gap-4">
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-[#d4ff00] hover:bg-[#c2ea00] text-black font-extrabold text-sm transition-all duration-300 shadow-[0_0_25px_rgba(212,255,0,0.3)] hover:shadow-[0_0_35px_rgba(212,255,0,0.5)] hover:scale-[1.02] active:scale-[0.98]"
              >
                <BookOpen className="w-4 h-4" />
                <span>Read Full Blog Post</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>

              <Link
                to="/blog#video-box"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold text-sm transition-all"
              >
                <Play className="w-4 h-4 text-red-500 fill-red-500" />
                <span>Watch Ep-01 Stream</span>
              </Link>
            </div>

          </div>

          {/* Right Visual Preview Column */}
          <div className="lg:col-span-5">
            <Link to="/blog" className="block relative group/preview">
              <div className="relative rounded-2xl overflow-hidden border border-white/15 shadow-2xl bg-black aspect-video">
                
                {/* YouTube Video Thumbnail Preview */}
                <img
                  src="https://img.youtube.com/vi/1uAXFS-mi1g/maxresdefault.jpg"
                  alt="E-Cell Conversations Episode 01"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover/preview:scale-105 filter brightness-90 group-hover/preview:brightness-100"
                  onError={(e) => {
                    e.target.src = "https://img.youtube.com/vi/1uAXFS-mi1g/hqdefault.jpg";
                  }}
                />

                {/* Gradient vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

                {/* Badge on top */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-black/70 backdrop-blur-md px-3 py-1 rounded-xl border border-white/10 text-white text-xs font-bold">
                  <div className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                  E-CELL CONVERSATIONS EP-01
                </div>

                {/* Center Play Icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-red-600 group-hover/preview:bg-red-500 text-white flex items-center justify-center shadow-lg transition-transform group-hover/preview:scale-110">
                    <Play className="w-6 h-6 ml-0.5 fill-white" />
                  </div>
                </div>

                {/* Bottom title bar */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
                  <span className="font-semibold truncate">
                    What Does It Really Take to Build a Startup?
                  </span>
                  <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded backdrop-blur-sm">
                    Watch on Site
                  </span>
                </div>

              </div>

              {/* Click instruction note */}
              <div className="mt-2 text-right">
                <span className="text-xs text-[#d4ff00] font-semibold group-hover/preview:underline inline-flex items-center gap-1">
                  Click to explore interactive blog page →
                </span>
              </div>
            </Link>
          </div>

        </div>

      </motion.div>
    </section>
  );
};

export default BlogShortcut;
