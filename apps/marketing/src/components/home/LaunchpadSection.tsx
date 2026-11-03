import { useState, useEffect } from 'react';
import { Link } from '@/shims/react-router';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import lpLogo from '@/assets/ecell/lp_logo_new.png';
import memory1 from '@/assets/lpevents/pitcherspilot/memory1.png';
import memory2 from '@/assets/lpevents/pitcherspilot/memory2.jpg';
import memory3 from '@/assets/lpevents/pitcherspilot/memory3.png';
import memory4 from '@/assets/lpevents/pitcherspilot/memory4.png';
import memory5 from '@/assets/lpevents/pitcherspilot/memory5.png';
import { Container, Section } from './ui';

const events = [
  { name: 'Pitchers Pilot', link: '/launchpad/pitchers_pilot' },
  { name: 'Internship Drive', link: '/launchpad/internship_drive' },
  { name: 'Ground Reality', link: '/launchpad/ground_reality' },
  { name: 'Startup Expo', link: '/launchpad/startup_expo' },
  { name: 'Teen Tycoons', link: '/launchpad/teen_tycoons' },
  { name: 'SEED', link: '/launchpad/seed' },
];

const carouselImages = [memory1, memory2, memory3, memory4, memory5];

const Launchpad = () => {
  const [currentImg, setCurrentImg] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImg((prev) => (prev + 1) % carouselImages.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  return (
    <Section className="bg-brand-navy text-brand-cream overflow-hidden">
      <Container>
        <h2
          data-reveal=""
          className="m-0 mb-12 md:mb-16 text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-brand-cream"
        >
          Launchpad
        </h2>

        {/* Logo & Description Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-center pb-14 md:pb-20 border-b border-brand-cream/15">
          <div data-reveal="left" className="md:col-span-4 flex md:justify-start">
            <img src={lpLogo} alt="LP'26" className="w-[160px] md:w-[240px] h-auto object-contain" loading="lazy" />
          </div>
          <p
            data-reveal=""
            data-delay="140"
            className="md:col-span-8 m-0 font-copy text-lg sm:text-xl md:text-2xl font-light leading-snug text-brand-cream/90"
          >
            Ignite entrepreneurial passion at our 3-day summit featuring industry leaders, innovative startups, and knowledge-sharing for the next generation.
          </p>
        </div>

        {/* Our Events */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 py-14 md:py-20">
          <div data-reveal="" className="lg:col-span-4">
            <h3 className="m-0 text-3xl md:text-4xl font-bold tracking-tight text-brand-cream">Our Events</h3>
            <Link
              to="/launchpad/events"
              className="group inline-flex items-center gap-1.5 mt-4 font-copy text-sm font-semibold text-brand-cream/70 no-underline hover:text-brand-cream transition-colors"
            >
              View all
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>

          <ul data-reveal="" data-delay="140" className="lg:col-span-8 m-0 p-0 list-none border-t border-brand-cream/15">
            {events.map((event) => (
              <li key={event.name} className="border-b border-brand-cream/15">
                <Link
                  to={event.link}
                  className="group flex items-center justify-between gap-4 py-4 md:py-5 text-brand-cream/80 no-underline hover:text-brand-cream transition-colors duration-300"
                >
                  <span className="font-syne text-2xl md:text-[2rem] font-bold tracking-tight leading-tight transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-2">
                    {event.name}
                  </span>
                  <ArrowUpRight className="w-5 h-5 shrink-0 text-brand-cream/40 transition-all duration-300 group-hover:text-brand-cream group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Carousel + Explore More */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-5 md:gap-6">
          <div
            data-reveal="image"
            data-parallax=""
            className="md:col-span-3 relative rounded-2xl overflow-hidden border border-brand-cream/15 h-[280px] md:h-[400px] bg-black"
          >
            {/* All slides stay mounted so the next one is loaded and they crossfade */}
            {carouselImages.map((img, i) => (
              <img
                key={img}
                src={img}
                alt={i === currentImg ? 'Launchpad memories' : ''}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${i === currentImg ? 'opacity-100' : 'opacity-0'}`}
              />
            ))}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            <Link
              to="/launchpad/events"
              className="absolute bottom-5 right-5 z-10 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-cream text-brand-navy font-copy font-bold text-sm no-underline hover:bg-white transition-colors"
            >
              Explore Events <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div data-reveal="" data-delay="160" className="md:col-span-2">
            <Link
              to="/launchpad"
              className="group flex flex-col justify-between h-full min-h-[220px] rounded-2xl p-8 bg-brand-cream text-brand-navy no-underline hover:bg-white transition-colors"
            >
              <div className="flex justify-end">
                <span className="w-12 h-12 rounded-full bg-brand-maroon text-brand-cream flex items-center justify-center transition-transform group-hover:rotate-45">
                  <ArrowUpRight className="w-5 h-5" />
                </span>
              </div>
              <span className="font-syne text-3xl md:text-4xl font-bold leading-[1.1]">
                Explore More About Launchpad
              </span>
            </Link>
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default Launchpad;
