import React from 'react';
import { motion } from 'framer-motion';
import { Link } from "@/shims/react-router";
import img1 from '@/assets/SPEAKER PICS/home_speaker_1_v2.jpg';
import img2 from '@/assets/SPEAKER PICS/home_speaker_2_v2.jpg';
import img3 from '@/assets/SPEAKER PICS/home_speaker_3.jpg';
import img4 from '@/assets/SPEAKER PICS/home_speaker_4.jpg';

const profiles = [
  { id: 1, name: "AMAN GUPTA", role: "CO-FOUNDER AND CMO AT BOAT", image: img1, link: "https://www.linkedin.com/in/aman-gupta-7217a515/", objectPosition: "80% 50%" },
  { id: 2, name: "SHRI VENKAIAH NAIDU", role: "FORMER VICE-PRESIDENT OF INDIA", image: img2, link: "https://x.com/mvenkaiahnaidu?lang=en&mx=2" },
  { id: 3, name: "ANKUR WARIKOO", role: "ENTREPRENEUR & CONTENT CREATOR", image: img3, link: "https://www.linkedin.com/in/warikoo/" },
  { id: 4, name: "GEN. V.K. SINGH", role: "GOVERNOR OF MIZORAM", image: img4 },
];

const ProfileCard = ({ profile }) => (
  <motion.a
    href={profile.link}
    target="_blank"
    rel="noopener noreferrer"
    initial={false}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    className="group relative bg-surface border border-hairline rounded overflow-hidden hover:border-hairline-strong transition-colors duration-200"
  >
    <div className="aspect-[4/5] overflow-hidden relative">
      <img
        src={profile.image}
        alt={profile.name}
        className="w-full h-full object-cover"
        style={{ objectPosition: profile.objectPosition || 'center' }}
        loading="lazy"
      />

      {/* Decorative lines */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-hairline" />
    </div>

    <div className="p-6 relative">
      <h3 className="text-lg font-black text-ink mb-2 leading-tight font-sans group-hover:text-lava-bright transition-colors duration-200">
        {profile.name}
      </h3>
      <p className="text-lava-bright font-mono font-medium text-[10px] tracking-[0.1em] uppercase font-sans">
        {profile.role}
      </p>
    </div>
  </motion.a>
);

const ProfileGrid = () => {
  return (
    <div className="py-24 px-6 relative overflow-hidden bg-page">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.h2
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-black text-ink tracking-tighter mb-4 font-sans uppercase"
          >
            Past <span className="text-lava-bright">Speakers</span>
          </motion.h2>
          <div className="h-1.5 w-24 bg-lava mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {profiles.map((profile) => (
            <ProfileCard key={profile.id} profile={profile} />
          ))}
        </div>

        <div className="mt-20 flex justify-center">
          <motion.div
            initial={false}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link
              to="/launchpad/speakers"
              className="group relative px-12 py-4 bg-surface border border-hairline text-ink font-black rounded transition-colors duration-200 font-sans flex items-center gap-4 hover:border-hairline-strong hover:bg-raised"
            >
              <span className="tracking-[0.2em] text-sm group-hover:text-lava-bright transition-colors duration-200">VIEW ALL SPEAKERS</span>
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 7L17 17M17 17V7M17 17H7" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProfileGrid;
