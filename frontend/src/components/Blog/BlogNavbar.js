import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sun, 
  Moon, 
  ArrowLeft, 
  Share2, 
  Check, 
  BookOpen
} from 'lucide-react';
import logo from '../../assets/navbarlogo.png';

const BlogNavbar = ({ isDarkMode, setIsDarkMode }) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [copied, setCopied] = useState(false);

  // Track scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      {/* Top Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-[3px] z-[100] bg-transparent">
        <div 
          className="h-full bg-gradient-to-r from-[#d4ff00] via-[#6b5fff] to-pink-500 transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Main Sticky Blog Header */}
      <header className={`sticky top-0 z-50 w-full backdrop-blur-xl border-b transition-colors duration-300 ${
        isDarkMode 
          ? 'bg-[#000000]/85 border-white/10 text-white' 
          : 'bg-white/90 border-slate-200 text-slate-900 shadow-sm'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-4">
          
          {/* Left: Back to Home + Logo + Breadcrumb */}
          <div className="flex items-center gap-3 sm:gap-6">
            <Link
              to="/"
              className={`flex items-center gap-2 text-xs sm:text-sm font-semibold px-3 py-2 rounded-xl border transition-all ${
                isDarkMode 
                  ? 'bg-white/5 border-white/10 hover:bg-white/15 text-white' 
                  : 'bg-slate-100 border-slate-200 hover:bg-slate-200 text-slate-800'
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back to Home</span>
              <span className="sm:hidden">Home</span>
            </Link>

            <Link to="/" className="flex items-center gap-2.5">
              <img src={logo} alt="E-Cell" className="h-8 sm:h-10 w-auto object-contain" />
              <div className="hidden md:block">
                <span className="text-xs font-extrabold tracking-wider uppercase block leading-none">
                  E-CELL BITS HYDERABAD
                </span>
                <span className={`text-[10px] tracking-widest uppercase block ${isDarkMode ? 'text-zinc-400' : 'text-slate-500'}`}>
                  Official Editorial Blog
                </span>
              </div>
            </Link>
          </div>

          {/* Center: Badge (visible on larger screens) */}
          <div className="hidden lg:flex items-center gap-2">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
              isDarkMode ? 'bg-white/5 text-[#d4ff00] border border-white/10' : 'bg-lime-100 text-lime-800 border border-lime-200'
            }`}>
              <BookOpen className="w-3.5 h-3.5" /> Entrepreneurial Playbook
            </span>
          </div>

          {/* Right: Dark/Light Mode Changer + Share Button */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            
            {/* Dark and Light Mode Changer Button (Dark default) */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`relative flex items-center gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold border transition-all duration-300 shadow-sm ${
                isDarkMode
                  ? 'bg-zinc-900 border-zinc-700 hover:border-zinc-500 text-yellow-400'
                  : 'bg-slate-100 border-slate-300 hover:border-slate-400 text-indigo-700'
              }`}
              title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              aria-label="Toggle theme mode"
            >
              <div className="relative w-4 h-4 flex items-center justify-center">
                {isDarkMode ? (
                  <Moon className="w-4 h-4 transition-transform duration-300 rotate-0" />
                ) : (
                  <Sun className="w-4 h-4 transition-transform duration-300 rotate-90 text-amber-500" />
                )}
              </div>
              <span className="font-medium text-xs hidden sm:inline">
                {isDarkMode ? 'Dark Mode' : 'Light Mode'}
              </span>
            </button>

            {/* Share / Copy Link Button */}
            <button
              onClick={handleCopyLink}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${
                isDarkMode 
                  ? 'bg-white/5 border-white/10 hover:bg-white/10 text-white' 
                  : 'bg-slate-100 border-slate-200 hover:bg-slate-200 text-slate-800'
              }`}
              title="Copy blog link to clipboard"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="hidden sm:inline text-emerald-400 font-bold">Copied!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4" />
                  <span className="hidden sm:inline">Share</span>
                </>
              )}
            </button>

          </div>

        </div>
      </header>
    </>
  );
};

export default BlogNavbar;
