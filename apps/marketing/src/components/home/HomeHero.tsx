import { useRef } from 'react';
import { Link } from '@/shims/react-router';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import sandiskLogo from '@/assets/Bitsian startups/SanDisk Logo.png';
import mplLogo from '@/assets/Bitsian startups/MPL_Logo 1.png';
import bbLogo from '@/assets/Bitsian startups/mono/bb.png';
import redbusLogo from '@/assets/Bitsian startups/mono/redbus.png';
import swiggyLogo from '@/assets/Bitsian startups/Swiggy.png';
import growwLogo from '@/assets/Bitsian startups/groww.png';
import { Container, EASE, rise } from './ui';

// Headline is revealed word by word from behind a mask.
const headline = [
  { text: 'Entrepreneurship Cell,', muted: false },
  { text: 'BITS Pilani Hyderabad Campus.', muted: true },
];

// Shown as single-colour marks along the bottom of the hero.
// Heights are tuned per logo so they read at a similar visual weight.
const alumniLogos = [
  { name: 'Swiggy', src: swiggyLogo, h: 'h-7 md:h-8' },
  { name: 'redBus', src: redbusLogo, h: 'h-7 md:h-8' },
  { name: 'Groww', src: growwLogo, h: 'h-6 md:h-7' },
  { name: 'bigbasket', src: bbLogo, h: 'h-7 md:h-8' },
  { name: 'MPL', src: mplLogo, h: 'h-6 md:h-7' },
  { name: 'SanDisk', src: sandiskLogo, h: 'h-3.5 md:h-4' },
];

const HEADLINE_DELAY = 0.25;
const WORD_STAGGER = 0.06;
const wordCount = headline.reduce((n, part) => n + part.text.split(' ').length, 0);
const afterHeadline = HEADLINE_DELAY + wordCount * WORD_STAGGER + 0.2;

const Headline = () => {
  let index = 0;
  return (
    <h1 className="m-0 font-display text-[2.1rem] leading-[1.08] sm:text-5xl md:text-6xl lg:text-[4.5rem] font-semibold tracking-[-0.035em] text-brand-cream">
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
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0.3]);
  const blobY = useTransform(scrollYProgress, [0, 1], [0, -90]);

  return (
    <section ref={sectionRef} className="relative flex min-h-[100svh] flex-col overflow-hidden bg-brand-navy text-brand-cream">
      {/* Slowly drifting gradient, built only from cream and black tints over navy */}
      <motion.div className="absolute inset-0 pointer-events-none" aria-hidden="true" style={{ y: blobY }}>
        <span className="hero-blob hero-blob-1" />
        <span className="hero-blob hero-blob-2" />
        <span className="hero-blob hero-blob-3" />
      </motion.div>

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

      <Container className="flex-1 flex items-center pt-[116px] md:pt-[132px] pb-16">
        <motion.div className="max-w-5xl" style={{ y: contentY, opacity: contentOpacity }}>
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
        </motion.div>
      </Container>

      {/* Alumni startups strip */}
      <motion.div {...rise(afterHeadline + 0.3)} className="relative bg-brand-ink">
        <Container className="py-7 md:py-8 flex flex-col lg:flex-row lg:items-center gap-5 lg:gap-12">
          <p className="m-0 shrink-0 font-copy text-xs font-semibold uppercase tracking-[0.2em] text-brand-cream/50">
            Founded by BITSians
          </p>
          <ul className="m-0 p-0 list-none grid grid-cols-3 sm:flex sm:flex-wrap items-center gap-x-8 gap-y-6 lg:flex-1 lg:justify-between">
            {alumniLogos.map((logo, i) => (
              <motion.li
                key={logo.name}
                {...rise(afterHeadline + 0.4 + i * 0.07)}
                className="flex items-center"
              >
                <img
                  src={logo.src}
                  alt={logo.name}
                  loading="lazy"
                  className={`${logo.h} w-auto max-w-full object-contain brightness-0 invert opacity-60 hover:opacity-100 transition-opacity duration-300`}
                />
              </motion.li>
            ))}
          </ul>
        </Container>
      </motion.div>

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
