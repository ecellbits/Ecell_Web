import React, { useState } from "react";
import { Link } from "@/shims/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Zap, Star, MapPin } from "lucide-react";

const scheduleData = [
  {
    day: "00",
    date: "2nd April",
    label: "Day Zero",
    tagline: "The Grand Beginning",
    accent: "#1d6ba8",
    events: [
      { name: "Welcome and Introduction of Guest of Honour", time: "6:00 PM", venue: "Auditorium" },
      { name: "Introduction of FOB", time: "6:10 PM", venue: "Auditorium" },
      { name: "Lighting of the Lamp", time: "6:15 PM", venue: "Auditorium" },
      { name: "FOB Address", time: "6:20 PM", venue: "Auditorium" },
      { name: "Address by Dean", time: "6:25 PM", venue: "Auditorium" },
      { name: "Address by FIC", time: "6:35 PM", venue: "Auditorium" },
      { name: "Address by Chief Guest", time: "6:45 PM", venue: "Auditorium" },
      { name: "Chairman's Address", time: "6:55 PM", venue: "Auditorium" },
      { name: "Versatality", time: "7:30 PM", venue: "Auditorium" },
      { name: "Fashion Club", time: "7:40 PM", venue: "Auditorium" },
      { name: "Hindi Tarang", time: "7:55 PM", venue: "Auditorium" },
      { name: "Movie Club", time: "8:05 PM", venue: "Auditorium" },
      { name: "Dramatics Club", time: "8:20 PM", venue: "Auditorium" },
      { name: "Comedy Club", time: "8:55 PM", venue: "Auditorium" },
      { name: "Sejal Kumar Performance", time: "9:30 PM", venue: "Auditorium" },
    ]
  },
  {
    day: "01",
    date: "3rd April",
    label: "Day One",
    tagline: "The Grand Launch",
    accent: "#e0424f",
    events: [
      { name: "DP World Hackathon", time: "12:00 PM - 12:00 AM", venue: "F102, F104" },
      { name: "Startup Expo", time: "9:00 AM - 11:00 PM", venue: "Library Lawns" },
      { name: "T3 Juniors", time: "12:00 PM - 3:00 PM", venue: "AUDI FOYER" },
      { name: "SEED", time: "3:00 PM - 5:00 PM", venue: "F208", description: "Summit for Entrepreneurial Ecosystem Development" },
      { name: "Defence Panel", time: "12:00 PM - 2:00 PM", venue: "F103" },
      { name: "Creating Value Through Innovation, Storytelling, and Social Impact", time: "3:00 PM - 4:00 PM", venue: "F103", description: "Panelists: Ms. Shaily Mehrotra (CEO & Founder, FixDerma and judge at Shark Tank Season 5), Ms. Nidhi Saxena (Founder of Delulu), Ms. Shanthala Veigas (Senior Director-TiE Hyderabad)" },
      { name: "Risk Management", time: "11:00 AM - 5:00 PM", venue: "F107" },
      { name: "Pokemon Showdown", time: "3:00 PM - 7:00 PM", venue: "G108" },
      { name: "Tech Gyan Workshop", time: "12:00 PM - 6:00 PM", venue: "F106, F109" },
    ]
  },
  {
    day: "02",
    date: "4th April",
    label: "Day Two",
    tagline: "Pitch Perfect",
    accent: "#1d6ba8",
    events: [
      { name: "Internship Drive", time: "8:30 AM", venue: "I212, I221, I213" },
      { name: "TechGyan Workshop", time: "9:00 AM", venue: "F106, F108, F105, G106, G105, G104" },
      { name: "Startup Expo", time: "9:00 AM", venue: "Library Lawns" },
      { name: "Ground Reality Semi Finals", time: "10:00 AM", venue: "F203, F204, F205, F207, F208" },
      { name: "Impactus", time: "10:00 AM", venue: "F201, F202" },
      { name: "Product Management Workshop", time: "11:00 AM", venue: "F107" },
      { name: "Ecosystem Panel Discussion", time: "11:30 AM", venue: "F104" },
      { name: "SEED Event Day-2", time: "12:00 PM", venue: "Dept Discussion Rooms", description: "Summit for Entrepreneurial Ecosystem Development" },
      { name: "Geoguesser", time: "12:00 PM", venue: "G108" },
      { name: "VC Panel Discussion", time: "2:00 PM", venue: "F104" },
      { name: "IPL Auction", time: "3:00 PM", venue: "G108" },
      { name: "LLM From Scratch Workshop", time: "4:00 PM", venue: "F103" },
      { name: "MU Keynote Session", time: "4:00 PM", venue: "F101" },
      { name: "Pitchers Pilot", time: "5:30 PM", venue: "Lawns" },
      { name: "Networking Dinner", time: "7:30 PM", venue: "Lawns" },
    ]
  },
  {
    day: "03",
    date: "5th April",
    label: "Day Three",
    tagline: "Moment Of Glory",
    accent: "#e0424f",
    events: [
      { name: "TechGyan Workshop", time: "9:00 AM", venue: "F102, F106, F109, G104, G105, G106" },
      { name: "Internship Drive", time: "9:00 AM", venue: "F201, F202" },
      { name: "Teen Tycoons", time: "9:00 AM", venue: "F204, F205, F207, F208" },
      { name: "Startup Expo", time: "9:00 AM", venue: "Library Lawns" },
      { name: "Ground Reality Finals", time: "10:00 AM", venue: "F105" },
      { name: "Corporate Crusades", time: "10:00 AM", venue: "F107, F108" },
      { name: "SEED Day-3", time: "11:00 AM", venue: "G204A", description: "Summit for Entrepreneurial Ecosystem Development" },
      { name: "Designing Workshop", time: "11:00 AM", venue: "F103" },
      { name: "DP World Hackathon Finale", time: "12:00 PM", venue: "F101" },
      { name: "AI/Tech Panel Session", time: "12:00 PM", venue: "F104" },
      { name: "Corporate Networking Lunch", time: "3:00 PM", venue: "Auditorium Upper Floor" },
      { name: "Entrepreneurship and Design Thinking Workshop", time: "3:00 PM", venue: "F103" },
      { name: "Speaker Session - TVF", time: "4:00 PM", venue: "Auditorium", description: "Speakers: Siddharth Nigam, Nidhi Bhanushali" },
      { name: "Closing Ceremony", time: "5:30 PM", venue: "F104", description: "Guest: Dr. Jayaprakash Narayan, IAS" },
    ]
  }
];

const EventSchedule = () => {
  const [activeTab, setActiveTab] = useState(3);

  return (
    <div className="min-h-screen bg-brand-navy text-brand-cream py-12 md:py-24 px-4 md:px-12 relative overflow-hidden font-sans">
      {/* Mesh Gradients Background */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-30">
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Day Nav - Control Panel Style */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 md:mb-20 gap-8">
          <div className="space-y-4">
            <span className="text-lava-bright font-black uppercase tracking-[0.3em] text-sm">Launchpad Schedule</span>
            <h2 className="text-4xl md:text-8xl font-black italic uppercase leading-none tracking-tighter shrink-0 mb-4 md:mb-0">
              {scheduleData[activeTab].label}<span className="text-lava-bright">.</span>
            </h2>
          </div>

          <div className="flex bg-neutral-900/50 p-1 rounded-full border border-white/5 backdrop-blur-3xl shadow-2xl overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden w-fit max-w-full">
            {scheduleData.map((day, idx) => (
              <button
                key={idx}
                onClick={() => setActiveTab(idx)}
                className={`px-4 md:px-8 py-2.5 md:py-3 rounded-full transition-all duration-700 relative flex items-center gap-2 group shrink-0 ${activeTab === idx ? "text-black" : "text-white/40 hover:text-white"
                  }`}
              >
                {activeTab === idx && (
                  <motion.div
                    layoutId="dayIndicator"
                    className="absolute inset-0 bg-lava-bright rounded-full"
                    transition={{ type: "spring", bounce: 0.15, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10 font-bold text-xs md:text-sm uppercase tracking-wider whitespace-nowrap">Day {day.day}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content Box */}
        <div className="relative border-t border-white/10 pt-8 md:pt-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 50, skewY: 2 }}
              animate={{ opacity: 1, y: 0, skewY: 0 }}
              exit={{ opacity: 0, y: -50, skewY: -2 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16"
            >
              {/* Left Column - Day Info */}
              <div className="lg:col-span-5 space-y-12">
                <div className="space-y-2">
                  <span
                    className="text-sm font-black uppercase tracking-widest transition-colors duration-1000"
                    style={{ color: scheduleData[activeTab].accent }}
                  >
                    {scheduleData[activeTab].date}
                  </span>
                  <h3 className="text-3xl md:text-5xl lg:text-7xl font-black text-white/90 leading-[0.9] tracking-tighter lg:max-w-sm">
                    {scheduleData[activeTab].tagline}
                  </h3>
                </div>

                {/* Visual Asset / Decorative Box */}
                <div className="hidden lg:block">
                  <div
                    className="w-full h-80 rounded-[3rem] border border-white/10 relative overflow-hidden group/box transition-all duration-700 hover:border-white/20"
                    style={{ background: `linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 100%)` }}
                  >
                    <div className="absolute inset-4 rounded-[2.2rem] border border-white/5 flex items-center justify-center overflow-hidden">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="relative"
                      >
                        <Zap size={100} className="text-white/5" strokeWidth={0.5} />
                      </motion.div>
                      <div className="absolute flex flex-col items-center">
                        <span className="text-8xl font-black opacity-10">{scheduleData[activeTab].day}</span>
                      </div>
                    </div>
                    <div className="absolute bottom-10 left-10 right-10 flex justify-between items-center">
                      <div className="flex gap-2">
                        {scheduleData.map((_, i) => (
                          <div key={i} className={`w-3 h-1 rounded-full ${i === activeTab ? 'bg-lava-bright' : 'bg-white/10'}`} />
                        ))}
                      </div>
                      <Star className="text-white/20" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Timeline */}
              <div className="lg:col-span-7">
                <div className="space-y-4">
                  {scheduleData[activeTab].events.map((event, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.08 }}
                      className="group flex flex-col md:flex-row md:items-center justify-between p-5 md:p-10 bg-white/5 border border-white/5 rounded-lg md:rounded-lg hover:bg-white/[0.08] hover:border-lava-bright/30 hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] transition-all duration-500 relative"
                    >
                      {/* Horizontal Dash line */}
                      <div className="hidden md:block absolute left-[-48px] top-1/2 w-12 h-px bg-white/10 group-hover:bg-lava-bright/30 transition-colors" />

                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-lava-bright transition-transform" />
                          <span
                            className="text-[10px] font-black uppercase tracking-widest opacity-40 transition-opacity group-hover:opacity-100"
                            style={{ color: scheduleData[activeTab].accent }}
                          >
                            Launchpad Event #{idx + 1}
                          </span>
                        </div>
                        <h4 className="text-2xl md:text-3xl font-bold tracking-tight text-white group-hover:text-lava-bright transition-colors leading-tight">
                          {event.name}
                        </h4>
                        {event.description && (
                          <p className="text-xs md:text-sm text-white/40 mt-2 max-w-xl group-hover:text-white/60 transition-colors font-sans">
                            {event.description}
                          </p>
                        )}
                        {event.venue && (
                          <div className="flex items-center gap-2 mt-3 opacity-40 group-hover:opacity-100 transition-opacity">
                            <MapPin size={12} className="text-lava-bright" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-lava-bright">{event.venue}</span>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-4 mt-4 md:mt-0">
                        <div className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white/5 border border-white/10 group-hover:bg-lava-bright/10 group-hover:border-lava-bright/20 transition-all">
                          <Clock className="w-4 h-4 text-white/40 group-hover:text-lava-bright" />
                          <span className="text-sm font-sans font-semibold tracking-wide text-white group-hover:text-lava-bright whitespace-nowrap">{event.time}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Links Section */}
        <div className="mt-16 flex flex-col md:flex-row justify-center items-center gap-6 relative z-10">
          <Link
            to="/launchpad/passes"
            className="w-full md:w-auto text-center px-6 md:px-10 py-4 bg-lava-bright text-black font-black uppercase tracking-widest text-sm rounded-full hover:bg-white transition-all duration-300 hover:scale-105"
          >
            Get Your Passes
          </Link>
          <Link
            to="/launchpad/accommodation"
            className="w-full md:w-auto text-center px-6 md:px-10 py-4 bg-white/10 border border-white/20 text-white font-bold uppercase tracking-widest text-sm rounded-full hover:bg-white/20 transition-all duration-300 hover:scale-105"
          >
            Accommodation Details
          </Link>
        </div>

      </div>
    </div>
  );
};

export default EventSchedule;
export { EventSchedule as Comp };
