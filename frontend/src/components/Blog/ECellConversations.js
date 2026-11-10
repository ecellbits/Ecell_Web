import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Play, 
  Youtube, 
  ExternalLink, 
  Clock, 
  Lightbulb, 
  Flame, 
  Target, 
  ShieldCheck, 
  Compass,
  Maximize2,
  Tv
} from 'lucide-react';

const videoFacts = [
  {
    icon: Target,
    color: '#F59E0B', // Amber
    title: 'Execution > Ideas',
    fact: 'Ideas hold zero equity value. Iteration velocity and shipping speed are the sole defensible moats.'
  },
  {
    icon: Flame,
    color: '#EF4444', // Red
    title: '90% Grunt Work',
    fact: 'Early building is firefighting, cold calls, and obscurity—not glamorous seed funding announcements.'
  },
  {
    icon: Lightbulb,
    color: '#10B981', // Emerald
    title: 'Premature Scaling',
    fact: 'Spending capital on marketing before proving real user retention kills early startups fastest.'
  },
  {
    icon: ShieldCheck,
    color: '#3B82F6', // Blue
    title: 'Complementary DNA',
    fact: 'Winning founding teams pair deep technical craftsmanship with relentless commercial grit.'
  },
  {
    icon: Compass,
    color: '#8B5CF6', // Purple
    title: 'Founder Stamina',
    fact: 'Ventures die when founder emotional energy depletes, not when competitors launch features.'
  }
];

const ECellConversations = ({ isDarkMode = true }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoId = "1uAXFS-mi1g";
  const youtubeUrl = "https://youtu.be/1uAXFS-mi1g?si=0bbZNZn3SeWtfb3o";
  const embedUrl = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  return (
    <section className="my-10 space-y-6 w-full">
      
      {/* 5) Extended Horizontally: Intro and Episode blocks side-by-side */}
      <div className={`rounded-3xl p-6 sm:p-8 md:p-9 border transition-all ${
        isDarkMode 
          ? 'bg-gradient-to-br from-[#0e0f17] via-[#0b0c10] to-[#07080b] border-white/10 text-white' 
          : 'bg-gradient-to-br from-slate-50 via-white to-zinc-50 border-slate-200 text-slate-900 shadow-md'
      }`}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          
          {/* Left Text Block */}
          <div className="lg:col-span-7 space-y-2.5">
            <div className="flex items-center gap-2 mb-1">
              <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                isDarkMode ? 'bg-[#d4ff00]/10 text-[#d4ff00] border border-[#d4ff00]/20' : 'bg-lime-100 text-lime-800'
              }`}>
                <Tv className="w-3.5 h-3.5" /> E-Cell Original Series
              </span>
              <span className={`text-xs font-semibold ${isDarkMode ? 'text-zinc-400' : 'text-slate-500'}`}>
                Episode 01 Masterclass
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight">
              E-Cell Conversations: The Reality of Building
            </h3>
            
            <p className={`text-sm sm:text-base leading-relaxed ${isDarkMode ? 'text-zinc-300' : 'text-slate-700'}`}>
              <strong>E-Cell Conversations</strong> is our intellectual dialogue series bringing candid, behind-the-scenes founder lessons to student builders. In Episode 01, we unpack what it genuinely takes to navigate from zero to one.
            </p>
          </div>

          {/* Right Spotlight Block (Placed on the side horizontally as requested) */}
          <div className={`lg:col-span-5 p-4 sm:p-5 rounded-2xl border transition-all ${
            isDarkMode 
              ? 'bg-white/[0.04] border-white/10' 
              : 'bg-white border-slate-200 shadow-sm'
          }`}>
            <div className="flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-red-500 mb-1">
              <Youtube className="w-4 h-4" /> Episode 01 Spotlight
            </div>
            <h4 className="text-sm sm:text-base font-bold leading-snug">
              "What Does It Really Take to Build a Startup?"
            </h4>
            <p className={`mt-1 text-xs ${isDarkMode ? 'text-zinc-400' : 'text-slate-600'}`}>
              Direct founder dialogue breaking down real execution, customer validation, and mental stamina.
            </p>
          </div>

        </div>
      </div>

      {/* 6) Concise Facts From Ep 1 in a Single Horizontal Row */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-base sm:text-lg font-bold tracking-tight">
            Concise Facts From Episode 01
          </h4>
          <span className={`text-xs ${isDarkMode ? 'text-zinc-400' : 'text-slate-500'}`}>
            5 Key Operational Takeaways
          </span>
        </div>

        {/* 5 Facts aligned in a horizontal grid / row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 w-full">
          {videoFacts.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className={`p-3.5 rounded-2xl border transition-all duration-200 flex flex-col justify-between ${
                  isDarkMode 
                    ? 'bg-[#0f1016] border-white/10 hover:border-white/20' 
                    : 'bg-white border-slate-200 hover:border-slate-300 shadow-sm'
                }`}
              >
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div 
                      className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${item.color}20`, color: item.color }}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <h5 className="text-xs font-bold tracking-tight truncate">
                      {idx + 1}. {item.title}
                    </h5>
                  </div>
                  <p className={`text-[11px] leading-relaxed ${isDarkMode ? 'text-zinc-300' : 'text-slate-600'}`}>
                    {item.fact}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Video Box: "To know more watch this video" (Kept intact as praised) */}
      <div className={`mt-8 rounded-3xl p-5 sm:p-7 md:p-8 border transition-all duration-300 ${
        isDarkMode 
          ? 'bg-gradient-to-b from-[#13141f] via-[#0b0c12] to-[#08090d] border-red-500/20 shadow-2xl' 
          : 'bg-white border-slate-200 shadow-xl'
      }`}>
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider text-white bg-red-600 shadow-sm">
                <Youtube className="w-3 h-3" /> Watch on Site
              </span>
              <span className={`text-xs font-medium flex items-center gap-1 ${isDarkMode ? 'text-zinc-400' : 'text-slate-500'}`}>
                <Clock className="w-3 h-3" /> Full Stream
              </span>
            </div>
            <h4 className="text-xl sm:text-2xl font-extrabold tracking-tight">
              To know more watch this video
            </h4>
          </div>

          <a
            href={youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all border self-start sm:self-auto ${
              isDarkMode 
                ? 'bg-white/5 border-white/10 hover:bg-white/15 text-white' 
                : 'bg-slate-100 border-slate-200 hover:bg-slate-200 text-slate-800'
            }`}
          >
            <span>Open on YouTube</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        {/* Video Box Container with Responsive 16:9 Aspect Ratio */}
        <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl border border-white/10 aspect-video bg-black group">
          {isPlaying ? (
            <iframe
              src={embedUrl}
              title="What Does It Really Take to Build a Startup? | E-Cell Conversations EP-01"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="w-full h-full border-0"
            />
          ) : (
            <div className="relative w-full h-full cursor-pointer" onClick={() => setIsPlaying(true)}>
              {/* Thumbnail Image */}
              <img
                src={thumbnailUrl}
                alt="What Does It Really Take to Build a Startup? | E-Cell Conversations EP-01"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-95"
                onError={(e) => {
                  e.target.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
                }}
              />

              {/* Gradient Vignette Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/40 group-hover:via-black/20 transition-all duration-300" />

              {/* Top Banner on Thumbnail */}
              <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-white pointer-events-none">
                <div className="flex items-center gap-1.5 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10 text-[11px] font-semibold">
                  <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  E-CELL CONVERSATIONS • EP-01
                </div>
                <div className="hidden sm:flex items-center gap-1 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10 text-[11px] font-medium">
                  <Maximize2 className="w-3 h-3" /> Click to play
                </div>
              </div>

              {/* Center Play Button */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-red-600 hover:bg-red-500 text-white flex items-center justify-center shadow-[0_0_30px_rgba(239,68,68,0.7)] transition-all"
                  aria-label="Play video"
                >
                  <Play className="w-7 h-7 sm:w-8 sm:h-8 ml-0.5 fill-white" />
                </motion.button>
                <span className="text-white font-bold text-xs sm:text-sm drop-shadow-md bg-black/60 px-3 py-1 rounded-full backdrop-blur-sm border border-white/10">
                  Click to Watch Episode 01
                </span>
              </div>

              {/* Bottom Info Bar */}
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white pointer-events-none">
                <span className="text-xs font-semibold truncate drop-shadow-md pr-2">
                  What Does It Really Take to Build a Startup?
                </span>
                <span className="text-[10px] bg-black/70 px-2 py-0.5 rounded backdrop-blur-sm border border-white/10 flex-shrink-0 font-mono">
                  HD
                </span>
              </div>
            </div>
          )}
        </div>

        <div className="mt-3 flex items-center justify-between text-xs">
          <span className={isDarkMode ? 'text-zinc-400' : 'text-slate-500'}>
            Produced by E-Cell BITS Pilani Hyderabad Campus
          </span>
          <button
            onClick={() => setIsPlaying(true)}
            className={`font-semibold hover:underline ${
              isDarkMode ? 'text-[#d4ff00]' : 'text-lime-700'
            }`}
          >
            Stream directly on this page →
          </button>
        </div>

      </div>

    </section>
  );
};

export default ECellConversations;
