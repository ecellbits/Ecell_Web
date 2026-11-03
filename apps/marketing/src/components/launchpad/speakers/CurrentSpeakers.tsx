import React from "react";
import { motion } from "framer-motion";
import { Linkedin, Instagram } from "lucide-react";

import sahil from "@/assets/Speakers/sahil.jpeg";
import rajeev from "@/assets/Speakers/rajiv.jpeg";
import shyam from "@/assets/Speakers/shyam.jpeg";
import sejal from "@/assets/Speakers/sejal.jpeg";

const speakerData = [
  {
    name: "Sejal Kumar",
    role: "Digital Creator & Actress",
    image: sejal,
    instagram: "https://www.instagram.com/sejalkumar1195?igsh=bGRnMWNhd3hmaDVl"
  },
  {
    name: "Shyam Penumaka",
    role: "Partner, Dallas Venture Capital",
    image: shyam,
    linkedin: "https://www.linkedin.com/in/shyampenumaka/"
  },
  {
    name: "Rajeev Suri",
    role: "Founding Partner, BlueGreen Ventures",
    image: rajeev,
    linkedin: "https://www.linkedin.com/in/rajeevsuri/?originalSubdomain=in"
  },
  {
    name: "Sahil Makkar",
    role: "Partner, IndiaQuotient",
    image: sahil,
    linkedin: "https://www.linkedin.com/in/sahil-makkar-89985516/?originalSubdomain=in"
  }
];

const CurrentSpeakers = () => {
  return (
    <div className="relative w-full bg-page py-12 md:py-24 overflow-hidden font-sans">
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 text-white text-center">
        <motion.div
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 md:mb-24"
        >
          <h2 className="text-4xl md:text-7xl font-black text-white tracking-tighter mb-4 italic uppercase">
            Launchpad 2026 <span className="text-lava-bright">Speakers.</span>
          </h2>
          <div className="h-1.5 w-24 bg-lava-bright mx-auto rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 pb-12">
          {speakerData.map((speaker, index) => (
            <motion.div
              key={index}
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative"
            >
              <div className="relative aspect-[4/5] rounded-lg overflow-hidden border border-white/10 group-hover:border-lava-bright/50 transition-all duration-500 shadow-2xl">
                <img
                  src={speaker.image}
                  alt={speaker.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-8 text-left translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="text-2xl md:text-3xl font-black text-white mb-2">{speaker.name}</h3>
                  <p className="text-lava-bright font-bold text-sm uppercase tracking-widest mb-4 opacity-0 group-hover:opacity-100 transition-opacity delay-100">{speaker.role}</p>

                  <a
                    href={speaker.linkedin || speaker.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 transition-all duration-300 ${speaker.instagram
                        ? "hover:bg-gradient-to-tr hover:from-[#f9ce34] hover:via-[#ee2a7b] hover:to-[#6228d7]"
                        : "hover:bg-ecell-blue hover:border-ecell-blue-bright"
                      }`}
                  >
                    {speaker.instagram ? (
                      <Instagram className="w-5 h-5 text-white" />
                    ) : (
                      <Linkedin className="w-5 h-5 text-white" />
                    )}
                  </a>
                </div>
              </div>
            </motion.div>
          ))}

        </div>

        {/* Releasing Soon Text */}
        <motion.div
          initial={false}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-20 md:mt-32 border-t border-white/5 pt-12"
        >
          <p className="text-xl md:text-2xl font-bold text-white/20 uppercase tracking-[0.3em] italic">
            More Speaker Lineup <span className="text-lava-bright/40">Releasing Soon.</span>
          </p>
        </motion.div>
      </div>

      {/* Background Decorative Element */}
    </div>
  );
};

export default CurrentSpeakers;
