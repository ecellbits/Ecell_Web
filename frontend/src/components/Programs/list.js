import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowDownRight } from 'lucide-react';

// Import images
import lp1 from '../../assets/LaunchPad.JPG';
import lp2 from '../../assets/Launchpad1.JPG';
import lp3 from '../../assets/launchpad25.JPG';

import ss1 from '../../assets/ss.JPG';
import ss2 from '../../assets/speaker2.jpg';
import ss3 from '../../assets/Speaker_session.png';

import st1 from '../../assets/startup.JPG';
import mt1 from '../../assets/MT.png';
import cm2 from '../../assets/community_meet/community_meet_2.jpg';

import na1 from '../../assets/class.jpg';
import na2 from '../../assets/auction.jpg';
import na3 from '../../assets/pitch.jpg';

const ProgramCard = ({ program, navigate }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      onClick={() => program.link !== "#" && navigate(program.link)}
      className={`group relative overflow-hidden rounded-[2rem] md:rounded-[2.5rem] cursor-pointer transition-all duration-500 hover:scale-[1.01] bg-[#1a1a1a] flex flex-col ${program.className}`}
    >
      {/* Header Image */}
      <div className="flex-grow overflow-hidden relative min-h-[150px]">
        {program.type === 'triple' ? (
          // ✅ ONLY MIDDLE IMAGE
          <img
            loading="lazy" src={program.images[1]}
            alt={program.title}
            className="w-full h-full object-cover transition-all duration-700 saturate-[1.1] group-hover:scale-105"
          />
        ) : (
          <img
            loading="lazy" src={program.image}
            alt={program.title}
            className="w-full h-full object-cover transition-all duration-700 saturate-[1.1] group-hover:scale-105"
          />
        )}
      </div>

      {/* Bottom Content */}
      <div
        className="p-6 md:p-8 flex flex-col justify-end relative z-20"
        style={{ backgroundColor: program.color }}
      >
        <div className="flex flex-col gap-4 md:gap-6 z-10 w-full">
          <h3
            className="text-2xl md:text-4xl font-bold font-syne tracking-tight leading-[1.1] break-words w-full"
            style={{ color: program.textColor }}
          >
            {program.title}
          </h3>

          <div className="flex items-stretch justify-between gap-3 md:gap-4 w-full">
            <div
              className={`px-4 py-2 rounded-full border-2 text-sm md:text-base font-medium font-manrope flex items-center flex-1 min-w-0`}
              style={{
                borderColor:
                  program.textColor === 'black'
                    ? '#000000'
                    : 'rgba(255,255,255,0.2)',
                color: program.textColor
              }}
            >
              <span className="w-full leading-tight block">
                {program.subtitle}
              </span>
            </div>

            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white flex items-center justify-center group-hover:rotate-45 transition-transform duration-300 flex-shrink-0 relative z-20">
              <ArrowDownRight className="text-black w-5 h-5 md:w-6 md:h-6" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const List = () => {
  const navigate = useNavigate();

  const programs = [
    {
      title: "LAUNCHPAD",
      subtitle: "Largest E-Summit of South India",
      type: "triple",
      images: [lp1, lp2, lp3],
      color: "#6F66FF",
      textColor: "white",
      link: "/launchpad",
      className: "md:col-span-2 md:row-span-2",
    },
    {
      title: "SPEAKER SESSIONS",
      subtitle: "Engaging sessions throughout the year",
      type: "triple",
      images: [ss1, ss2, ss3],
      color: "#BCFF2F",
      textColor: "black",
      link: "#",
      className: "md:col-span-1 md:row-span-2",
    },
    {
      title: "COMMUNITY MEET",
      subtitle: "Ideas Into Impact",
      type: "single",
      image: cm2,
      color: "#6F66FF",
      textColor: "white",
      link: "/community-meet",
      className: "md:col-span-1 md:row-span-1",
    },
    {
      title: "MANAGEMENT TEMPTATIONS",
      subtitle: "Unleash your strategic genius",
      type: "single",
      image: mt1,
      color: "#BCFF2F",
      textColor: "black",
      link: "#",
      className: "md:col-span-1 md:row-span-1",
    },
    {
      title: "NETWORKING ARENA",
      subtitle: "Connect, collaborate & create",
      type: "triple",
      images: [na1, na2, na3],
      color: "#6F66FF",
      textColor: "white",
      link: "#",
      className: "md:col-span-1 md:row-span-1",
    },
  ];

  return (
    <section className="min-h-screen py-24 px-4 md:px-8 bg-black text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px] md:auto-rows-[350px]">
          {programs.map((program, index) => (
            <ProgramCard
              key={index}
              program={program}
              navigate={navigate}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default List;
