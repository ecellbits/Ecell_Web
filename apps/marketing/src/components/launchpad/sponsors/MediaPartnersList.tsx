import React from "react";
import { motion } from "framer-motion";
import img1 from "@/assets/spons/times nie.png";
import img2 from "@/assets/spons/startupindia.png";
import img3 from "@/assets/spons/algocs.jpg";
import img4 from "@/assets/spons/acn.jpg";
import img5 from "@/assets/spons/knowafest.jpg";
import img6 from "@/assets/spons/startuptalky.jpg";
import img7 from "@/assets/spons/bizstandards.png";
import img8 from "@/assets/spons/timesnetwork.png";
import img9 from "@/assets/spons/blogadda.jpg";
import img10 from "@/assets/spons/HINDU.png";
import img11 from "@/assets/spons/startupstory.jpg";
import img12 from "@/assets/spons/educationtree.png";
import img13 from "@/assets/spons/campustimes.png";
import img14 from "@/assets/spons/fundaspring.jpg";
import img15 from "@/assets/spons/noticebard.jpg";
import img16 from "@/assets/spons/edtimes.jpg";
import img17 from "@/assets/spons/dailyhunt.jpg";
import img18 from "@/assets/jagran_josh.png";
import img19 from "@/assets/spons/creativals.jpg";
import img20 from "@/assets/spons/pagalgyu.png";
import img21 from "@/assets/spons/elyuxen.jpg";
import img22 from "@/assets/spons/campustimes.png";
import img23 from "@/assets/spons/youthincorporated.png";
import img24 from "@/assets/spons/theprint.png";

const MediaAssociates = () => {
  const associates = [
    {
      name: "Startup India",
      image: img2,
      link: "https://www.startupindia.gov.in/",
    },
    { name: "Times Network", image: img8, link: "https://timesnetwork.in/" },
    { name: "The Hindu", image: img10, link: "https://www.thehindu.com/" },
    { name: "Jagran Josh", image: img18, link: "https://www.jagranjosh.com/" },
    { name: "DailyHunt", image: img17, link: "https://www.dailyhunt.in/" },
    { name: "The Print", image: img24, link: "https://theprint.in/" },

    { name: "Times NIE", image: img1, link: "https://www.timesnie.com/" },
    { name: "ACN", image: img4, link: "https://www.asiancommunitynews.com/" },
    {
      name: "Campus Times",
      image: img13,
      link: "https://www.campustimespune.com/",
    },
    { name: "ED Times", image: img16, link: "https://www.edtimes.in/" },

    {
      name: "AlgoCS",
      image: img3,
    },
    { name: "KnowaFest", image: img5, link: "https://www.knowafest.com/" },
    { name: "StartupTalky", image: img6, link: "https://startuptalky.com/" },
    {
      name: "Biz Standards",
      image: img7,
    },
    { name: "BlogAdda", image: img9, link: "https://www.blogadda.com/" },
    {
      name: "Startup Story",
      image: img11,
      link: "https://thestartupstory.co.in/",
    },
    {
      name: "Education Tree",
      image: img12,
      link: "https://www.theeducationtree.com/",
    },

    { name: "FundaSpring", image: img14, link: "https://fundaspring.com/" },
    { name: "NoticeBard", image: img15, link: "https://www.noticebard.com/" },
    { name: "Creativals", image: img19, link: "https://creativals.com/" },
    { name: "PagalGuy", image: img20, link: "https://www.pagalguy.com/" },
    { name: "Elyuxen", image: img21 },
    {
      name: "Campus Times",
      image: img22,
      link: "https://www.campustimespune.com/",
    },
    {
      name: "Youth Incorporated",
      image: img23,
      link: "https://youthincmag.com/",
    },
  ];

  return (
    <div className="relative w-full min-h-screen pt-24 pb-16 overflow-hidden bg-page">
      <div className="absolute inset-0">
        {/* No gradient background, keeping it pure black */}
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 4 + 1 + "px",
              height: Math.random() * 4 + 1 + "px",
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              backgroundColor: `rgba(63, 81, 181, ${Math.random() * 0.3})`,
              animation: `sponsor-twinkle ${Math.random() * 3 + 2}s infinite ${Math.random() * 2
                }s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:pl-24 lg:pl-32">
        <motion.h2
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-ink mb-12 md:mb-16 text-center"
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
        // transition={{ duration: 0.6 }}
        >
          PAST MEDIA PARTNER
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
              <div className="relative rounded-lg backdrop-blur-md bg-white/5 border border-blue-500/[0.12] p-2 md:p-2.5 lg:p-3 transform transition-all duration-300 group-group-hover:bg-white/10 group-hover:border-blue-400/40 group-hover:shadow-xl group-hover:shadow-blue-500/25">
                <div className="aspect-square rounded-lg overflow-hidden bg-white/95 backdrop-blur-sm">
                  <img
                    loading="lazy" src={associate.image}
                    alt={associate.name}
                    className="w-full h-full object-contain p-0.5 md:p-1 transition-all duration-300"
                  />
                </div>

                <div className="absolute inset-0 rounded-lg bg-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MediaAssociates;
