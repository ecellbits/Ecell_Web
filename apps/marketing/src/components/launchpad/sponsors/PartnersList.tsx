import React from "react";
import { motion } from "framer-motion";
import img1 from "@/assets/spons/50knetwork.jpeg";
import img2 from "@/assets/spons/10000startup.png";
import img3 from "@/assets/spons/venturecatalysts.png";
import img4 from "@/assets/spons/startuphyderabad.jpeg";
import img5 from "@/assets/spons/thub.png";
import img6 from "@/assets/spons/turbostart.jpeg";
import img7 from "@/assets/spons/googlecloud.png";
import img8 from "@/assets/spons/cloudesign.png";
import img9 from "@/assets/spons/catechnologies.jpeg";
import img10 from "@/assets/spons/sciofoundation.png";
import img11 from "@/assets/spons/badabuisness.png";
import img12 from "@/assets/spons/learnngwhile travelling.jpeg";
import img13 from "@/assets/spons/ncore.png";
import img14 from "@/assets/spons/enactus.png";
import img15 from "@/assets/spons/lemon.png";
import img16 from "@/assets/spons/fundsindia.png";
import img17 from "@/assets/spons/jaarvis.png";
import img18 from "@/assets/spons/sucseed.png";
import img19 from "@/assets/spons/leada.png";
import img20 from "@/assets/spons/yourstartupol.jpeg";
import img21 from "@/assets/spons/cosmos.png";
import img22 from "@/assets/spons/nirmaan.png";
import img23 from "@/assets/spons/ecell.jpeg";

const MediaAssociates = () => {
  const associates = [
    { name: "Google Cloud", image: img7, link: "https://cloud.google.com/" },
    { name: "T-Hub", image: img5, link: "https://www.t-hub.co/" },
    { name: "TurboStart", image: img6, link: "https://www.turbostart.co/" },
    { name: "Cloudesign", image: img8, link: "https://cloudesign.com/" },
    {
      name: "Venture Catalysts",
      image: img3,
      link: "https://venturecatalysts.in/",
    },
    {
      name: "Startup Hyderabad",
      image: img4,
    },
    { name: "Enactus", image: img14, link: "https://enactus.org/" },
    { name: "Lemon Ideas", image: img15, link: "https://lemonideas.in/" },
    {
      name: "SucSEED Ventures",
      image: img18,
      link: "https://sucseed-indovation.com/",
    },
    {
      name: "Nirmaan Organization",
      image: img22,
      link: "https://nirmaan.org/",
    },
    { name: "E-Cell", image: img23, link: "https://ecell.iiit.ac.in/" },

    { name: "50K Network", image: img1 },
    {
      name: "10,000 Startups",
      image: img2,
      link: "https://www.10000startups.com/",
    },

    { name: "TurboStart", image: img6, link: "https://www.turbostart.co/" },
    { name: "FundsIndia", image: img16, link: "https://www.fundsindia.com/" },

    {
      name: "Scio Foundation",
      image: img10,
      link: "https://www.sciofoundation.org/",
    },
    {
      name: "Learning While Travelling",
      image: img12,
      link: "https://learningwhiletravelling.com/",
    },
    {
      name: "CA Technologies",
      image: img9,
      link: "https://www.broadcom.com/",
    },
    {
      name: "Bada Business",
      image: img11,
      link: "https://www.badabusiness.com/",
    },

    { name: "nCore Games", image: img13 },
    {
      name: "Jaarvis Accelerator",
      image: img17,
    },

    { name: "Leada", image: img19, link: "https://leadangels.in/" },
    {
      name: "Your Startup",
      image: img20,
    },
    { name: "Cosmos", image: img21 },
  ];

  return (
    <div className="relative w-full min-h-screen pt-24 pb-16 overflow-hidden bg-ecell-bg text-ecell-text">
      <div className="absolute inset-0">
        {/* Decorative particles with new theme colors */}
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 4 + 1 + "px",
              height: Math.random() * 4 + 1 + "px",
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              backgroundColor: `rgba(107, 95, 255, ${Math.random() * 0.3})`,
              animation: `sponsor-twinkle ${Math.random() * 3 + 2}s infinite ${Math.random() * 2
                }s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:pl-24 lg:pl-32">
        <motion.h2
          className="text-3xl md:text-4xl lg:text-5xl font-bold mb-12 md:mb-16 text-center text-ecell-text"
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
        // transition={{ duration: 0.6 }}
        >
          PAST PARTNER
        </motion.h2>

        <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-4 md:gap-5 lg:gap-6">
          {associates.map((associate, index) => (
            <motion.a
              href={associate.link}
              key={index}
              target="_blank"
              className="group cursor-pointer"
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
            // transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="relative rounded-lg backdrop-blur-md bg-white/5 border border-white/[0.08] p-2 md:p-2.5 lg:p-3 transform transition-all duration-300 group-group-hover:bg-white/10 group-hover:border-white/20 group-hover:shadow-xl group-hover:shadow-orange-500/25">
                <div className="aspect-square rounded-lg overflow-hidden bg-white/95 backdrop-blur-sm">
                  <img
                    loading="lazy" src={associate.image}
                    alt={associate.name}
                    className="w-full h-full object-contain p-0.5 md:p-1 transition-all duration-300"
                  />
                </div>

                <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" style={{ backgroundColor: 'rgba(253, 137, 22, 0.08)' }} />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MediaAssociates;
