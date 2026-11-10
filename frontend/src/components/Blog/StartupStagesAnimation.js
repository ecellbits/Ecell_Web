import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Rocket, 
  Coins, 
  Users, 
  TrendingUp, 
  Award, 
  CheckCircle2, 
  Play, 
  Pause, 
  RotateCcw, 
  Compass, 
  ChevronRight,
  ArrowUpRight
} from 'lucide-react';
import { FaInstagram } from 'react-icons/fa';

const stagesData = [
  {
    id: 1,
    stageNumber: 'STAGE 1',
    title: 'Bootstrapping',
    subtitle: 'The 0-to-Prototype Phase',
    icon: Coins,
    color: '#EAB308', // Amber/Yellow
    bullets: [
      { text: 'Founders use their personal savings', highlight: 'Personal Capital' },
      { text: 'Prototype is built to test feasibility', highlight: 'Prototype Built' }
    ],
    deepDive: 'Founders invest personal savings and sweat equity to validate feasibility and build the initial working prototype.',
    focusArea: 'Problem-Solution Fit',
    burnRate: 'Frugal ($0 - $10k)',
    dilution: '0% Founder Equity Kept'
  },
  {
    id: 2,
    stageNumber: 'STAGE 2',
    title: 'Pre-Seed',
    subtitle: 'Idea Validation & MVP Building',
    icon: Rocket,
    color: '#3B82F6', // Blue
    bullets: [
      { text: 'Validation of idea through customer discovery', highlight: 'Validation of Idea' },
      { text: 'Building MVP (Minimum Viable Product)', highlight: 'Building MVP' },
      { text: 'Market research and forming team', highlight: 'Market Research & Team' },
      { text: 'Angel investors bet on founders and project idea', highlight: 'Angel Investors Bet' }
    ],
    deepDive: 'Validating early user demand with angel investors betting on founder capability, vision, and domain insight.',
    focusArea: 'Customer Discovery & MVP',
    burnRate: 'Modest ($10k - $50k)',
    dilution: '5% - 10% to Angels'
  },
  {
    id: 3,
    stageNumber: 'STAGE 3',
    title: 'Seed Round',
    subtitle: 'Early Traction & Product Improvement',
    icon: TrendingUp,
    color: '#10B981', // Emerald
    bullets: [
      { text: 'Building user traction for the initial product', highlight: 'User Traction' },
      { text: 'Expansion of team for product improvement', highlight: 'Team Expansion' }
    ],
    deepDive: 'Proving repeatable user retention, refining core features, and hiring key engineering talent.',
    focusArea: 'Product-Market Fit (PMF)',
    burnRate: 'Moderate ($30k - $80k/mo)',
    dilution: '10% - 20% to Seed Funds'
  },
  {
    id: 4,
    stageNumber: 'STAGE 4',
    title: 'VC Funding',
    subtitle: 'Hyper-Growth & Lateral Expansion',
    icon: Users,
    color: '#8B5CF6', // Purple
    bullets: [
      { text: 'Series A: Scaling business model', highlight: 'Series A' },
      { text: 'Series B: Lateral expansion', highlight: 'Series B' },
      { text: 'Series C: Market domination', highlight: 'Series C' }
    ],
    deepDive: 'Venture Capital accelerates distribution, international expansion, and market category leadership.',
    focusArea: 'Unit Economics & Scale',
    burnRate: 'High Growth Investment',
    dilution: '15% - 25% per Round'
  },
  {
    id: 5,
    stageNumber: 'STAGE 5',
    title: 'Exit Stage',
    subtitle: 'Liquidity, Legacy & Scale',
    icon: Award,
    color: '#EC4899', // Pink
    bullets: [
      { text: 'IPO (Initial Public Offering)', highlight: 'IPO' },
      { text: 'Merger with industry leaders', highlight: 'Merger' },
      { text: 'Acquisition by global corporations', highlight: 'Acquisition' }
    ],
    deepDive: 'The ultimate liquidity event where founders and investors realize enterprise value and cement company legacy.',
    focusArea: 'Public Market or M&A',
    burnRate: 'Profitable Cash Flow',
    dilution: 'Public Float / Share Distribution'
  }
];

const StartupStagesAnimation = ({ isDarkMode = true }) => {
  const [activeStage, setActiveStage] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-advance: plays exactly ONE full iteration through all 5 stages, then stops!
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setActiveStage((prev) => {
        if (prev >= stagesData.length - 1) {
          setIsAutoPlaying(false); // Stop autoplay after 1 full cycle
          return prev;
        }
        return prev + 1;
      });
    }, 4500);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const handleToggleAutoPlay = () => {
    if (!isAutoPlaying) {
      if (activeStage >= stagesData.length - 1) {
        setActiveStage(0);
      }
      setIsAutoPlaying(true);
    } else {
      setIsAutoPlaying(false);
    }
  };

  const current = stagesData[activeStage];
  const IconComponent = current.icon;

  return (
    <div className={`w-full rounded-3xl p-5 sm:p-8 md:p-9 border transition-all duration-300 relative overflow-hidden ${
      isDarkMode 
        ? 'bg-[#0c0d12]/95 border-white/10 text-white shadow-2xl' 
        : 'bg-white border-slate-200 text-slate-900 shadow-xl'
    }`}>
      {/* Background ambient glow */}
      <div 
        className="absolute -top-32 -right-32 w-96 h-96 rounded-full blur-[120px] pointer-events-none opacity-25 transition-all duration-700"
        style={{ backgroundColor: current.color }}
      />

      {/* Header section with controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 relative z-10">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${
              isDarkMode ? 'bg-white/10 text-[#d4ff00]' : 'bg-lime-100 text-lime-800'
            }`}>
              <Compass className="w-3.5 h-3.5" /> Interactive Roadmap
            </span>
            <span className={`text-xs ${isDarkMode ? 'text-zinc-400' : 'text-slate-500'}`}>
              Stage {activeStage + 1} of 5
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight">
            What Are the Different Stages of a Startup?
          </h3>
        </div>

        {/* Stepper Controls */}
        <div className="flex items-center gap-2 self-start sm:self-auto flex-shrink-0">
          <button
            onClick={handleToggleAutoPlay}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${
              isDarkMode 
                ? 'bg-white/5 border-white/10 hover:bg-white/10 text-white' 
                : 'bg-slate-100 border-slate-200 hover:bg-slate-200 text-slate-700'
            }`}
            title={isAutoPlaying ? "Pause autoplay" : "Play (1 cycle)"}
          >
            {isAutoPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5 text-[#d4ff00]" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 text-[#d4ff00]" />
                <span>Play Once</span>
              </>
            )}
          </button>
          <button
            onClick={() => {
              setActiveStage(0);
              setIsAutoPlaying(false);
            }}
            className={`p-1.5 rounded-xl border transition-all ${
              isDarkMode 
                ? 'bg-white/5 border-white/10 hover:bg-white/10 text-zinc-300' 
                : 'bg-slate-100 border-slate-200 hover:bg-slate-200 text-slate-600'
            }`}
            title="Reset to Stage 1"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Stage Milestone Buttons (Single Horizontal Row without line breaks) */}
      <div className="relative z-10 mb-6">
        <div className="grid grid-cols-5 gap-1.5 sm:gap-3 w-full">
          {stagesData.map((stg, idx) => {
            const isSelected = activeStage === idx;
            const isPassed = activeStage >= idx;
            return (
              <button
                key={stg.id}
                onClick={() => {
                  setActiveStage(idx);
                  setIsAutoPlaying(false);
                }}
                className={`flex flex-col items-center justify-center text-center py-2 px-1 sm:p-3 rounded-xl sm:rounded-2xl border transition-all duration-200 relative whitespace-nowrap overflow-hidden ${
                  isSelected
                    ? isDarkMode
                      ? 'bg-white/15 border-white/30 shadow-lg scale-[1.02]'
                      : 'bg-slate-100 border-slate-400 shadow-md scale-[1.02]'
                    : isPassed
                    ? isDarkMode
                      ? 'bg-white/5 border-white/10 opacity-90 hover:opacity-100'
                      : 'bg-slate-50 border-slate-200 opacity-90 hover:opacity-100'
                    : isDarkMode
                    ? 'bg-transparent border-white/5 opacity-50 hover:opacity-80'
                    : 'bg-transparent border-slate-200 opacity-50 hover:opacity-80'
                }`}
              >
                <div className="flex items-center gap-1 sm:gap-1.5">
                  <div 
                    className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-[10px] sm:text-xs font-bold transition-all ${
                      isSelected
                        ? 'text-black shadow-md'
                        : isPassed
                        ? 'text-white'
                        : 'text-zinc-400'
                    }`}
                    style={{ 
                      backgroundColor: isSelected || isPassed ? stg.color : (isDarkMode ? '#27272a' : '#e2e8f0'),
                    }}
                  >
                    {stg.id}
                  </div>
                  <span className={`text-[10px] sm:text-xs font-bold uppercase tracking-wider ${
                    isSelected
                      ? isDarkMode ? 'text-white' : 'text-slate-900'
                      : isDarkMode ? 'text-zinc-400' : 'text-slate-500'
                  }`}>
                    Stage {stg.id}
                  </span>
                </div>
                <span className={`hidden sm:block text-[11px] font-semibold tracking-wide truncate w-full mt-1 ${
                  isSelected
                    ? isDarkMode ? 'text-white' : 'text-slate-900'
                    : isDarkMode ? 'text-zinc-400' : 'text-slate-500'
                }`}>
                  {stg.title}
                </span>
                {isSelected && (
                  <motion.div
                    layoutId="activeUnderline"
                    className="absolute -bottom-0.5 w-8 sm:w-12 h-1 rounded-full"
                    style={{ backgroundColor: stg.color }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Dynamic Curved Path Graphic (Startup S-Curve from PDF) */}
        <div className="relative w-full h-12 sm:h-16 px-2 mt-4">
          <svg className="w-full h-full overflow-visible" viewBox="0 0 500 70" preserveAspectRatio="none">
            <defs>
              <linearGradient id="curveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#EAB308" />
                <stop offset="25%" stopColor="#3B82F6" />
                <stop offset="50%" stopColor="#10B981" />
                <stop offset="75%" stopColor="#8B5CF6" />
                <stop offset="100%" stopColor="#EC4899" />
              </linearGradient>
            </defs>

            {/* Base dashed guideline */}
            <path
              d="M 10,55 Q 120,50 170,38 T 320,25 Q 420,12 490,8"
              fill="none"
              stroke={isDarkMode ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.1)'}
              strokeWidth="2.5"
              strokeDasharray="6 6"
            />

            {/* Animated active path */}
            <path
              d="M 10,55 Q 120,50 170,38 T 320,25 Q 420,12 490,8"
              fill="none"
              stroke="url(#curveGradient)"
              strokeWidth="3.5"
              strokeDasharray="500"
              strokeDashoffset={500 - (activeStage + 1) * 100}
              className="transition-all duration-700 ease-out"
            />

            {/* Stage Checkpoints */}
            {[
              { cx: 10, cy: 55, color: '#EAB308' },
              { cx: 130, cy: 45, color: '#3B82F6' },
              { cx: 250, cy: 32, color: '#10B981' },
              { cx: 370, cy: 19, color: '#8B5CF6' },
              { cx: 490, cy: 8, color: '#EC4899' },
            ].map((pt, i) => (
              <g key={i}>
                <circle
                  cx={pt.cx}
                  cy={pt.cy}
                  r={activeStage === i ? 6 : 4}
                  fill={activeStage >= i ? pt.color : (isDarkMode ? '#3f3f46' : '#cbd5e1')}
                  stroke={isDarkMode ? '#0c0d12' : '#ffffff'}
                  strokeWidth="2"
                  className="transition-all duration-300"
                />
              </g>
            ))}
          </svg>
        </div>
      </div>

      {/* Active Stage Detail Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
          className={`relative z-10 rounded-2xl p-5 sm:p-6 border transition-all ${
            isDarkMode 
              ? 'bg-white/[0.04] border-white/10' 
              : 'bg-slate-50/90 border-slate-200'
          }`}
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            
            {/* Left: Stage Details & Checkpoints */}
            <div className="flex-1 space-y-3">
              <div className="flex items-center gap-3">
                <div 
                  className="w-10 h-10 rounded-xl flex items-center justify-center shadow-md flex-shrink-0"
                  style={{ backgroundColor: `${current.color}25`, color: current.color }}
                >
                  <IconComponent className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span 
                      className="text-xs font-bold tracking-wider uppercase px-2 py-0.5 rounded-md"
                      style={{ backgroundColor: `${current.color}20`, color: current.color }}
                    >
                      {current.stageNumber}
                    </span>
                    <span className={`text-xs ${isDarkMode ? 'text-zinc-400' : 'text-slate-500'}`}>
                      {current.subtitle}
                    </span>
                  </div>
                  <h4 className="text-xl font-bold tracking-tight mt-0.5">
                    {current.title}
                  </h4>
                </div>
              </div>

              <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-zinc-300' : 'text-slate-700'}`}>
                {current.deepDive}
              </p>

              {/* Concise Checkpoints from PDF */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                {current.bullets.map((bullet, bIdx) => (
                  <div 
                    key={bIdx}
                    className={`flex items-start gap-2 p-2.5 rounded-xl border text-xs ${
                      isDarkMode 
                        ? 'bg-white/[0.03] border-white/5' 
                        : 'bg-white border-slate-200 shadow-sm'
                    }`}
                  >
                    <CheckCircle2 
                      className="w-4 h-4 flex-shrink-0 mt-0.5" 
                      style={{ color: current.color }}
                    />
                    <div>
                      <span className="font-semibold text-inherit">{bullet.highlight}:</span>{' '}
                      <span className={isDarkMode ? 'text-zinc-300' : 'text-slate-600'}>{bullet.text}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Metrics & Next Step */}
            <div className={`w-full lg:w-64 p-4 rounded-xl border space-y-3 flex flex-col justify-between ${
              isDarkMode 
                ? 'bg-black/50 border-white/10' 
                : 'bg-white border-slate-200 shadow-sm'
            }`}>
              <div className="space-y-2 text-xs">
                <div>
                  <span className={isDarkMode ? 'text-zinc-400 block' : 'text-slate-500 block'}>Focus</span>
                  <span className="font-bold">{current.focusArea}</span>
                </div>
                <div>
                  <span className={isDarkMode ? 'text-zinc-400 block' : 'text-slate-500 block'}>Burn Rate</span>
                  <span className="font-semibold">{current.burnRate}</span>
                </div>
                <div>
                  <span className={isDarkMode ? 'text-zinc-400 block' : 'text-slate-500 block'}>Equity Dilution</span>
                  <span className="font-semibold">{current.dilution}</span>
                </div>
              </div>

              <button
                onClick={() => {
                  setActiveStage((prev) => (prev + 1) % stagesData.length);
                  setIsAutoPlaying(false);
                }}
                className={`w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-bold transition-all ${
                  isDarkMode
                    ? 'bg-white/10 hover:bg-white/20 text-white border border-white/10'
                    : 'bg-slate-900 hover:bg-slate-800 text-white'
                }`}
              >
                <span>Next Stage</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        </motion.div>
      </AnimatePresence>

      {/* 4) "To know more visit the insta page" single-line integrated into the previous box */}
      <div className={`mt-5 pt-4 border-t flex flex-col sm:flex-row items-center justify-between gap-3 text-xs relative z-10 ${
        isDarkMode ? 'border-white/10' : 'border-slate-200'
      }`}>
        <div className="flex items-center gap-2">
          <span className={`font-semibold ${isDarkMode ? 'text-zinc-200' : 'text-slate-800'}`}>
            To know more : visit this insta post
          </span>
          <span className={`text-[11px] ${isDarkMode ? 'text-zinc-400' : 'text-slate-500'}`}>
            (5-Slide Visual Carousel Deck)
          </span>
        </div>
        <a
          href="https://www.instagram.com/p/Db_ALR2CZji/?img_index=1"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-white font-bold text-xs transition-transform hover:scale-105 active:scale-95 shadow-sm bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045]"
        >
          <FaInstagram className="w-3.5 h-3.5" />
          <span>View on Instagram</span>
          <ArrowUpRight className="w-3 h-3" />
        </a>
      </div>

    </div>
  );
};

export default StartupStagesAnimation;
