import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

import sampooran from "../../assets/por_photos/p Sampooran Sinha.jpeg";
import dhaanvi from "../../assets/por_photos/p Dhaanvi Bhadani.jpeg";
import aditya from "../../assets/por_photos/p Aditya Maheshwari.jpg";
import anshul from "../../assets/por_photos/p Anshul Nanwani .jpeg";
import sejal from "../../assets/por_photos/p Sejal Mittal.jpeg";
import divvij from "../../assets/por_photos/p Divvij Chichra.jpeg";
import shreya from "../../assets/por_photos/p Shreya Jhavar.jpg";
import hussain from "../../assets/por_photos/p_hussain.jpg";
import aryan from "../../assets/por_photos/p_aryan_saini.jpg";
import defaultAvatar from "../../assets/navbarlogo.png";

import ChromaGrid from "./ChromaGrid";

const teamMembers = [
  {
    name: "Sampooran Sinha",
    role: "President",
    image: sampooran,
    linkedin: "https://www.linkedin.com/in/sampooran-sinha/",
    email: "f20240997@hyderabad.bits-pilani.ac.in",
    phone: "+91 70037 12277",
    bio: "Visionary leader driving innovation and entrepreneurship",
  },
  {
    name: "Dhaanvi Bhadani",
    role: "Chairwoman Launchpad",
    image: dhaanvi,
    linkedin: "https://www.linkedin.com/in/dhaanvi-bhadani-533a08322/",
    email: "f20240762@hyderabad.bits-pilani.ac.in",
    phone: "+91 63618 03120",
    bio: "Passionate leader driving Launchpad initiatives",
  },
  {
    name: "Aditya Maheshwari",
    role: "Vice-President",
    image: aditya,
    linkedin: "https://www.linkedin.com/in/aditya-maheshwari-bits/",
    email: "f20240261@hyderabad.bits-pilani.ac.in",
    phone: "+91 70231 61401",
    bio: "Strategic thinker with a focus on growth and innovation",
  },
  {
    name: "Anshul Nanwani",
    role: "Vice-Chairman Launchpad",
    image: anshul,
    linkedin: "https://www.linkedin.com/in/anshul-nanwani-040559322/",
    email: "f20241126@hyderabad.bits-pilani.ac.in",
    phone: "+91 95525 86398",
    bio: "Dedicated to building high-impact entrepreneurial platforms",
  },
  {
    name: "Sejal Mittal",
    role: "Director of Partnerships",
    image: sejal,
    linkedin: "https://www.linkedin.com/in/sejal-mittal-496458326/",
    email: "f20240161@hyderabad.bits-pilani.ac.in",
    phone: "+91 98216 89504",
    bio: "Forging strategic alliances and industry connections",
  },
  {
    name: "Divvij Chichra",
    role: "Technical Head",
    image: divvij,
    linkedin: "https://www.linkedin.com/in/divvij-chichra-3ab7b4327/",
    email: "f20240298@hyderabad.bits-pilani.ac.in",
    phone: "+91 93131 35129",
    bio: "Technology enthusiast driving digital transformation",
  },
  {
    name: "Shreya Jhavar",
    role: "Digital Outreach and Collaborations Head",
    image: shreya,
    linkedin: "https://www.linkedin.com/in/shreya-jhavar-b2136428b/",
    email: "f20241113@hyderabad.bits-pilani.ac.in",
    phone: "+91 83799 20920",
    bio: "Expanding digital presence and brand collaborations",
  },
  {
    name: "Hussain Kagalwala",
    role: "Treasurer",
    image: hussain,
    linkedin: "https://www.linkedin.com/in/hussain-kagalwala-467a77328/",
    email: "f20240945@hyderabad.bits-pilani.ac.in",
    phone: "+91 83203 75491",
    bio: "Overseeing financial strategy and resource management",
  },
  {
    name: "Aryan Saini",
    role: "Director of Media and Marketing",
    image: aryan,
    linkedin: "https://www.linkedin.com/in/aryan-saini-96a180324/",
    email: "f20241154@hyderabad.bits-pilani.ac.in",
    phone: "+91 96858 40060",
    bio: "Crafting narratives and steering marketing campaigns",
  },
];

const OurTeam = () => {
  const [ref, inView] = useInView({ threshold: 0.2 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const fadeIn = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <motion.section
        className="h-screen relative overflow-hidden flex items-center justify-center"
        style={{
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="relative z-10 text-center px-4 bg-black bg-opacity-50 p-8 rounded-xl">
          <motion.h1
            className="text-4xl sm:text-6xl md:text-8xl font-bold mb-6"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ duration: 0.8 }}
          >
            Our Team
          </motion.h1>
          <motion.p
            className="text-lg sm:text-2xl md:text-3xl text-gray-300"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            E - Cell 25-26
          </motion.p>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-24 sm:bottom-28 left-1/2 transform -translate-x-1/2 cursor-pointer z-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          onClick={() => {
            const teamSection = document.getElementById('team-section');
            teamSection?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <motion.div
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center"
          >
            {/* Double Chevron for more immersive effect */}
            <svg
              className="w-10 h-10 text-ecell-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M19 9l-7 7-7-7"
              />
            </svg>
            <svg
              className="w-10 h-10 text-ecell-primary -mt-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Team Members Section */}
      <section id="team-section" ref={ref} className="py-12 sm:py-24 px-4 sm:px-6 lg:px-12">
        <motion.h2
          className="text-3xl sm:text-5xl font-bold text-center mb-8 sm:mb-16"
          initial="hidden"
          animate={inView && !isMobile ? "visible" : "visible"}
          variants={fadeIn}
          transition={{ duration: 1, delay: 0.2 }}
        >
          Meet Our PORs
        </motion.h2>
        {/* ChromaGrid for PORs */}
        <div className="max-w-7xl mx-auto flex justify-center">
          <ChromaGrid
            columns={isMobile ? 1 : 3}
            rows={Math.ceil(teamMembers.length / 3)}
            radius={300}
            damping={0.45}
            fadeOut={0.6}
            items={teamMembers.map((m) => {
              // derive a simple handle from linkedin or name
              const handle = m.linkedin
                ? m.linkedin.split("/").filter(Boolean).pop()
                : m.name.replace(/\s/g, "").toLowerCase();

              // themed gradient & border by role
              const role = (m.role || "").toLowerCase();
              let gradient =
                "linear-gradient(135deg, rgba(107,95,255,0.2), rgba(212,255,0,0.2))";
              let borderColor = "#6b5fff";

              if (role.includes("president") || role.includes("chair")) {
                gradient =
                  "linear-gradient(135deg, rgba(212,255,0,0.28), rgba(107,95,255,0.24))";
                borderColor = "#d4ff00";
              } else if (role.includes("tech") || role.includes("technical")) {
                gradient =
                  "linear-gradient(135deg, rgba(107,95,255,0.26), rgba(212,255,0,0.18))";
                borderColor = "#8b7fff";
              } else if (role.includes("media") || role.includes("editorial") || role.includes("digital") || role.includes("outreach") || role.includes("marketing")) {
                gradient =
                  "linear-gradient(135deg, rgba(107,95,255,0.22), rgba(212,255,0,0.22))";
                borderColor = "#6b5fff";
              } else if (role.includes("treasurer") || role.includes("partner") || role.includes("operations")) {
                gradient =
                  "linear-gradient(135deg, rgba(212,255,0,0.22), rgba(107,95,255,0.18))";
                borderColor = "#a1ff33";
              }

              return {
                title: m.name,
                subtitle: m.role,
                image: m.image,
                handle: handle ? `@${handle}` : undefined,
                url: m.linkedin,
                phone: m.phone,
                email: m.email,
                linkedin: m.linkedin,
                gradient,
                borderColor,
                imgStyle: (() => {
                  if (m.image === defaultAvatar) {
                    return { objectFit: "contain", padding: "30px", background: "rgba(255,255,255,0.03)" };
                  }
                  const name = m.name.toLowerCase();
                  if (name.includes("sampooran")) {
                    return { objectPosition: "center 20%" };
                  }
                  if (name.includes("aditya")) {
                    return { objectPosition: "center top" };
                  }
                  if (name.includes("dhaanvi") || name.includes("anshul") || name.includes("sejal") || name.includes("divvij") || name.includes("shreya") || name.includes("hussain") || name.includes("aryan")) {
                    return { objectPosition: "center top" };
                  }
                  return { objectPosition: "top" };
                })()
              };
            })}
          />
        </div>
      </section>
    </div>
  );
};

export default OurTeam;

