import React from "react";
import { motion } from "framer-motion";
import img1 from "@/assets/spons/decathlon.jpg";
import img2 from "@/assets/spons/plum.avif";
import img3 from "@/assets/spons/ACT.jpg";
import img4 from "@/assets/spons/AMD33.png";
import img5 from "@/assets/spons/altair.jpg";
import img6 from "@/assets/spons/nestle.jpg";
import img7 from "@/assets/spons/coke.jpg";
import img8 from "@/assets/spons/bharatversity.png";
import img9 from "@/assets/spons/FAB.jpg";
import img10 from "@/assets/spons/campa.png";
import img11 from "@/assets/spons/unstop.avif";
import img12 from "@/assets/spons/cornitos.jpg";
import img13 from "@/assets/spons/fitness_fundas.jpg";
import img14 from "@/assets/spons/switcheko.jpg";
import img15 from "@/assets/spons/skilligence.png";
import img16 from "@/assets/spons/2iim.png";
import img17 from "@/assets/spons/huddle-logo.png";
import img18 from "@/assets/spons/flyberrygourmet.jpg";
import img19 from "@/assets/spons/hackerthehouse.png";
import img20 from "@/assets/spons/royalbrothers.png";
import img21 from "@/assets/spons/mototek.jpg";
import img22 from "@/assets/spons/instax.png";
import img23 from "@/assets/spons/businesskeeda.png";
import img24 from "@/assets/spons/kurogaming.jpg";
import img25 from "@/assets/spons/productfolks.png";
import img26 from "@/assets/spons/novatechsolar.png";
import img27 from "@/assets/spons/Lawseek.png";

const MediaAssociates = () => {
  const associates = [
    { name: "Decathlon", image: img1, link: "https://www.decathlon.in/" },
    { name: "ACT", image: img3, link: "https://www.actcorp.in/" },
    { name: "AMD", image: img4, link: "https://www.amd.com/" },
    { name: "Coca-Cola", image: img7, link: "https://www.coca-cola.com/" },
    { name: "Nestlé", image: img6, link: "https://www.nestle.in/" },
    { name: "Cornitos", image: img12, link: "https://www.cornitos.in/" },
    { name: "Campa", image: img10, link: "https://campabeverages.com/" },
    { name: "Altair", image: img5, link: "https://www.altair.com/" },
    { name: "Bharatversity", image: img8, link: "https://bharatversity.com/" },
    { name: "Unstop", image: img11, link: "https://unstop.com/" },
    { name: "Lawseek", image: img27, link: "https://www.lawseek.ai/" },
    { name: "Instax", image: img22, link: "https://www.instax.com/" },
    {
      name: "Product Folks",
      image: img25,
      link: "https://www.theproductfolks.com/",
    },
    { name: "Fablabs", image: img9, link: "https://www.fablabs.io//" },

    { name: "Plum", image: img2, link: "https://plumgoodness.com/" },

    { name: "Kuro Gaming", image: img24, link: "https://kurogaming.com/" },

    {
      name: "Fitness Fundas",
      image: img13,
      link: "https://www.fitnessfundas.in//",
    },
    { name: "Switcheko", image: img14, link: "https://www.switcheko.com/" },
    { name: "Skilligence", image: img15, link: "https://www.skilligence.in/" },
    { name: "2IIM", image: img16, link: "https://www.2iim.com/" },
    { name: "Huddle", image: img17, link: "https://www.huddle.com/" },
    {
      name: "Flyberry Gourmet",
      image: img18,
      link: "https://flyberry.in/",
    },
    {
      name: "Hacker The House",
      image: img19,
    },
    {
      name: "Royal Brothers",
      image: img20,
      link: "https://www.royalbrothers.com/",
    },
    { name: "Mototek", image: img21, link: "https://www.mototek.in/" },
    {
      name: "Business Keeda",
      image: img23,
      link: "https://www.businesskeeda.com/",
    },

    {
      name: "Novatech Solar",
      image: img26,
    },
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
          transition={{ duration: 0.6 }}
        >
          PAST SPONSOR
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
