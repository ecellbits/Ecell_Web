import React from 'react';
import { Link } from '@/shims/react-router';
import { motion } from 'framer-motion';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import BlurImage from '@/components/common/BlurImage';

import img1 from '@/assets/lp_startup_expo.png';
import img3 from '@/assets/lp_internship_drive.png';
import img5 from '@/assets/lp_teen_tycoons.png';
import img6 from '@/assets/lp_pitchers_pilot.png';
import img7 from '@/assets/lp_ground_reality.png';
import imgSEED from '@/assets/lpevents/seed.png';

const EventCard = ({ event, index }) => {
  return (
    <motion.div
      initial={false}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group relative overflow-hidden rounded bg-surface flex flex-col h-full border border-hairline transition-colors duration-200 hover:border-hairline-strong"
    >
      {/* Top Image Section */}
      <div className="relative h-64 overflow-hidden">
        <BlurImage
          src={event.images[0]}
          alt={event.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content Section */}
      <div className="p-6 md:p-8 flex flex-col flex-grow bg-surface">
        <h3 className="text-2xl md:text-3xl font-bold text-ink mb-4 font-sans group-hover:text-lava-bright transition-colors duration-200">
          {event.title}
        </h3>
        <p className="text-ecell-text-muted text-sm leading-relaxed mb-6 md:mb-8 flex-grow font-sans">
          {event.description}
        </p>

        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mt-auto">
          {event.registerLink && (
            <a
              href={event.registerLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-3 md:py-4 px-4 md:px-6 rounded bg-lava text-white font-bold text-center transition-colors duration-200 hover:bg-lava-bright font-sans flex items-center justify-center gap-2 text-sm md:text-base"
            >
              Register <ArrowUpRight size={16} />
            </a>
          )}
          <Link
            to={event.exploreLink}
            className="flex-1 py-3 md:py-4 px-4 md:px-6 rounded border border-hairline text-ink font-bold text-center transition-colors duration-200 hover:bg-raised hover:border-hairline-strong font-sans flex items-center justify-center gap-2 text-sm md:text-base"
          >
            Details <ArrowDownRight size={16} />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

const EventsPage = () => {
  const events = [
    { id: 1, title: "Startup Expo", description: "Unleash innovation and connect with industry leaders at the ultimate Startup Expo!", images: [img1], registerLink: "https://unstop.com/competitions/startup-expo-launchpad-26-bits-1631560", exploreLink: "/launchpad/startup_expo" },
    { id: 5, title: "Teen Tycoons", description: "Shaping the next generation of entrepreneurs through dynamic challenges and expert mentorship.", images: [img5], registerLink: "https://unstop.com/competitions/teen-tycoons-launchpad-26-bits-1631539", exploreLink: "/launchpad/teen_tycoons" },
    { id: 6, title: "Pitcher's Pilot", description: "A dynamic platform for entrepreneurs to showcase their ventures, gain valuable feedback, and connect with investors for growth.", images: [img6], registerLink: "https://unstop.com/competitions/pitchers-pilot-launchpad-26-bits-1631551", exploreLink: "/launchpad/pitchers_pilot" },
    { id: 7, title: "Ground Reality", description: "Pitch your startup to top investors and win Rs. 2 Lakhs with mentorship and resources for growth!", images: [img7], registerLink: "https://unstop.com/competitions/ground-reality-business-plan-competition-launchpad-26-bits-1631135", exploreLink: "/launchpad/ground_reality" },
    { id: 3, title: "Internship Drive", description: "Launch your career with the Internship Drive – connect, learn, and grow with top startups!", images: [img3], registerLink: "", exploreLink: "/launchpad/internship_drive" },
    { id: 8, title: "SEED", description: "A national initiative to bring together E-Cells from across India to share ideas and best practices in building campus startup ecosystems.", images: [imgSEED], registerLink: "", exploreLink: "/launchpad/seed" }
  ];

  return (
    <div className="min-h-screen bg-page px-6 py-20 relative">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
        {events.map((event, index) => (
          <EventCard key={event.id} event={event} index={index} />
        ))}
      </div>
    </div>
  );
};

export default EventsPage;
