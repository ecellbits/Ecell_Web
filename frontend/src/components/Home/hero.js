import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Container, EASE } from './ui';

// Headline is revealed word by word from behind a mask.
const headline = [
  { text: 'Entrepreneurship Cell,', muted: false },
  { text: 'BITS Pilani Hyderabad Campus.', muted: true },
];

const HEADLINE_DELAY = 0.25;
const WORD_STAGGER = 0.06;
const wordCount = headline.reduce((n, part) => n + part.text.split(' ').length, 0);
const afterHeadline = HEADLINE_DELAY + wordCount * WORD_STAGGER + 0.2;

const rise = (delay) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: EASE, delay },
});

const Headline = () => {
  let index = 0;
  return (
    <h1 className="m-0 !font-display text-[2.1rem] leading-[1.08] sm:text-5xl md:text-6xl lg:text-[4.5rem] font-semibold tracking-[-0.035em] text-brand-cream">
      {headline.map((part) => (
        <span key={part.text} className={part.muted ? 'text-brand-cream/55' : ''}>
          {part.text.split(' ').map((word) => {
            const delay = HEADLINE_DELAY + index++ * WORD_STAGGER;
            return (
              <span key={word} className="inline-block overflow-hidden align-bottom pb-[0.08em] -mb-[0.08em] mr-[0.24em]">
                <motion.span
                  className="inline-block"
                  initial={{ y: '105%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, ease: EASE, delay }}
                >
                  {word}
                </motion.span>
              </span>
            );
          })}
        </span>
      ))}
    </h1>
  );
};

const Hero = () => {
  return (
    <section className="relative min-h-[100svh] flex flex-col justify-center overflow-hidden bg-brand-navy text-brand-cream">
      {/* Slowly drifting gradient, built only from cream and black tints over navy */}
      <div className="hero-mesh absolute inset-0 pointer-events-none" aria-hidden="true">
        <span className="hero-blob hero-blob-1" />
        <span className="hero-blob hero-blob-2" />
        <span className="hero-blob hero-blob-3" />
      </div>

      {/* Vertical guide lines with a travelling light streak */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <Container className="h-full">
          <div className="h-full grid grid-cols-2 md:grid-cols-4">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className={`relative h-full border-l border-brand-cream/[0.06] ${i >= 2 ? 'hidden md:block' : ''} ${i === 3 ? 'md:border-r' : ''}`}>
                {i % 2 === 1 && <span className="hero-streak" style={{ animationDelay: `${i * 1.6}s` }} />}
              </div>
            ))}
          </div>
        </Container>
      </div>

      <Container className="pt-32 pb-20">
        <div className="max-w-5xl">
          <motion.div {...rise(0.05)}>
            <Link
              to="/blog"
              className="group inline-flex items-center gap-2 mb-8 pl-1.5 pr-3.5 py-1.5 rounded-full border border-brand-cream/20 bg-brand-cream/10 backdrop-blur-md font-copy text-[11px] sm:text-sm text-brand-cream/85 no-underline hover:bg-brand-cream/20 hover:text-brand-cream transition-colors"
            >
              <span className="shrink-0 whitespace-nowrap px-2 py-0.5 rounded-full bg-brand-cream text-brand-navy text-[10px] sm:text-[11px] font-bold uppercase tracking-wider">
                New Blog
              </span>
              Entrepreneurship & Founder Playbook
              <ArrowRight className="w-3.5 h-3.5 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>

          <motion.p {...rise(0.15)} className="mb-5 font-copy text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] text-brand-cream/70">
            Ideate · Innovate · Incubate
          </motion.p>

          <Headline />

          <motion.p
            {...rise(afterHeadline)}
            className="mt-7 mb-0 max-w-2xl font-copy text-base sm:text-lg md:text-xl leading-relaxed text-brand-cream/80"
          >
            Fostering entrepreneurship and innovation through our events and programs, including
            Launchpad, the largest E-Summit of South India.
          </motion.p>

          <motion.div {...rise(afterHeadline + 0.12)} className="mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Link
              to="/program"
              className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-brand-cream text-brand-navy font-copy font-bold text-sm sm:text-base no-underline shadow-[0_8px_24px_-8px_rgba(0,0,0,0.5)] hover:bg-white hover:-translate-y-0.5 transition-all duration-300"
            >
              Explore our programs
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              to="/launchpad"
              className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full border border-brand-cream/30 text-brand-cream font-copy font-semibold text-sm sm:text-base no-underline hover:bg-brand-cream hover:text-brand-navy hover:-translate-y-0.5 transition-all duration-300"
            >
              Launchpad '26
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </motion.div>
        </div>
      </Container>

      <style>{`
        .hero-blob {
          position: absolute;
          border-radius: 9999px;
          filter: blur(90px);
          will-change: transform;
        }
        .hero-blob-1 {
          width: 55vw; height: 55vw; top: -20vw; right: -10vw;
          background: rgba(254, 248, 230, 0.10);
          animation: hero-drift-1 22s ease-in-out infinite alternate;
        }
        .hero-blob-2 {
          width: 50vw; height: 50vw; bottom: -25vw; left: -15vw;
          background: rgba(0, 0, 0, 0.45);
          animation: hero-drift-2 26s ease-in-out infinite alternate;
        }
        .hero-blob-3 {
          width: 35vw; height: 35vw; top: 30%; left: 35%;
          background: rgba(254, 248, 230, 0.05);
          animation: hero-drift-3 30s ease-in-out infinite alternate;
        }
        @keyframes hero-drift-1 { to { transform: translate(-12vw, 10vw) scale(1.1); } }
        @keyframes hero-drift-2 { to { transform: translate(14vw, -8vw) scale(1.15); } }
        @keyframes hero-drift-3 { to { transform: translate(-10vw, -6vw) scale(0.9); } }

        .hero-streak {
          position: absolute;
          left: -1px;
          top: -20%;
          width: 1px;
          height: 18%;
          background: linear-gradient(to bottom, transparent, rgba(254, 248, 230, 0.45), transparent);
          animation: hero-streak 7s cubic-bezier(0.45, 0, 0.55, 1) infinite;
        }
        @keyframes hero-streak { to { top: 110%; } }

        @media (prefers-reduced-motion: reduce) {
          .hero-blob, .hero-streak { animation: none; }
          .hero-streak { display: none; }
        }
      `}</style>
    </section>
  );
};

export default Hero;
