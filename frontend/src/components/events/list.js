import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import BlurImage from '../BlurImage';

import img1 from '../../assets/lp_startup_expo.png';
import img3 from '../../assets/lp_internship_drive.png';
import img5 from '../../assets/lp_teen_tycoons.png';
import img6 from '../../assets/lp_pitchers_pilot.png';
import img7 from '../../assets/lp_ground_reality.png';
import imgSEED from '../../assets/lpevents/seed.png';

const ActionButtons = ({ event, compact = false }) => (
  <div className="flex flex-col sm:flex-row gap-3 mt-auto">
    {event.registerLink && (
      <a
        href={event.registerLink}
        target="_blank"
        rel="noopener noreferrer"
        className={`flex-1 rounded-full bg-ecell-primary text-black font-bold text-center font-manrope flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(212,255,0,0.4)] active:scale-[0.98] ${
          compact ? 'py-2.5 px-4 text-sm' : 'py-3 md:py-4 px-4 md:px-6 text-sm md:text-base'
        }`}
      >
        Register <ArrowUpRight size={16} />
      </a>
    )}
    <a
      href={event.exploreLink}
      className={`flex-1 rounded-full border border-white/10 text-white font-bold text-center font-manrope flex items-center justify-center gap-2 transition-all duration-300 hover:bg-white/5 hover:border-white/20 active:scale-[0.98] ${
        compact ? 'py-2.5 px-4 text-sm' : 'py-3 md:py-4 px-4 md:px-6 text-sm md:text-base'
      }`}
    >
      Details <ArrowDownRight size={16} />
    </a>
  </div>
);

const pad = (n) => String(n + 1).padStart(2, '0');

const OverlayCard = ({ event, index }) => (
  <SlideIn
    direction={index % 2 === 0 ? 'left' : 'right'}
    delay={0.1}
    distance={90}
    duration={1.4}
    className="group relative overflow-hidden rounded-[2rem] h-[345px] border-[3px] border-[#ddd]/40 transition-all duration-500 ease-out hover:border-ecell-primary/50 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(212,255,0,0.15)]"
  >
    <BlurImage
      src={event.images[0]}
      alt={event.title}
      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
    <div className="absolute inset-0 bg-ecell-primary/0 group-hover:bg-ecell-primary/5 transition-colors duration-500" />

    <span className="absolute top-4 right-5 text-4xl md:text-5xl font-syne font-extrabold text-white/20 group-hover:text-ecell-primary/60 transition-colors">
      {pad(index)}
    </span>

    <div className="absolute bottom-0 inset-x-0 p-5 md:p-6 flex flex-col">
      <h3 className="text-2xl md:text-4xl font-bold text-white mb-2 font-syne">
        {event.title}
      </h3>
      <p className="text-gray-300 text-sm md:text-base max-w-2xl leading-relaxed mb-4 font-manrope line-clamp-2">
        {event.description}
      </p>
      <div className="md:max-w-md">
        <ActionButtons event={event} compact />
      </div>
    </div>
  </SlideIn>
);

/**
 * SlideIn: reusable "comes in from left/right" animation.
 * Triggers when the element scrolls into view with a smooth, cinematic glide.
 */
const SlideIn = ({
  children,
  direction = 'left',
  delay = 0,
  distance = 90,
  duration = 1.4,
  once = true,
  as = 'div',
  className = '',
  ...rest
}) => {
  const reduceMotion = useReducedMotion();
  const MotionTag = motion[as] || motion.div;
  const startX = reduceMotion ? 0 : direction === 'left' ? -distance : distance;

  return (
    <MotionTag
      initial={{ opacity: 0, x: startX }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once, amount: 0.15 }}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
      {...rest}
    >
      {children}
    </MotionTag>
  );
};

const EventCard = ({ event, index }) => {
  return <OverlayCard event={event} index={index} />;
};

const events = [
  { id: 1, title: 'Startup Expo', description: 'Unleash innovation and connect with industry leaders at the ultimate Startup Expo!', images: [img1], registerLink: 'https://unstop.com/competitions/startup-expo-launchpad-26-bits-1631560', exploreLink: '/launchpad/startup_expo' },
  { id: 5, title: 'Teen Tycoons', description: 'Shaping the next generation of entrepreneurs through dynamic challenges and expert mentorship.', images: [img5], registerLink: 'https://unstop.com/competitions/teen-tycoons-launchpad-26-bits-1631539', exploreLink: '/launchpad/teen_tycoons' },
  { id: 6, title: "Pitcher's Pilot", description: 'A dynamic platform for entrepreneurs to showcase their ventures, gain valuable feedback, and connect with investors for growth.', images: [img6], registerLink: 'https://unstop.com/competitions/pitchers-pilot-launchpad-26-bits-1631551', exploreLink: '/launchpad/pitchers_pilot' },
  { id: 7, title: 'Ground Reality', description: 'Pitch your startup to top investors and win Rs. 2 Lakhs with mentorship and resources for growth!', images: [img7], registerLink: 'https://unstop.com/competitions/ground-reality-business-plan-competition-launchpad-26-bits-1631135', exploreLink: '/launchpad/ground_reality' },
  { id: 3, title: 'Internship Drive', description: 'Launch your career with the Internship Drive - connect, learn, and grow with top startups!', images: [img3], registerLink: '', exploreLink: '/launchpad/internship_drive' },
  { id: 8, title: 'SEED', description: 'A national initiative to bring together E-Cells from across India to share ideas and best practices in building campus startup ecosystems.', images: [imgSEED], registerLink: '', exploreLink: '/launchpad/seed' },
];

const EventsPage = () => {
  return (
    <div className="min-h-screen bg-ecell-bg px-6 py-20 relative overflow-x-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-ecell-primary/5 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-ecell-secondary/5 blur-[120px] rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 gap-8 relative z-10">
        {events.map((event, index) => (
          <EventCard key={event.id} event={event} index={index}/>
        ))}
      </div>
    </div>
  );
};

export default EventsPage;
