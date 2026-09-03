import React from "react";
import { motion } from "framer-motion";
import ChromaGrid from "../Teams/ChromaGrid";

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

import hamaid from "../../assets/por_photos/hamaid.jpg";
import akshat_kumar from "../../assets/por_photos/akshat_kumar.jpeg";
import priyansh from "../../assets/por_photos/priyansh.jpeg";
import dhruv from "../../assets/por_photos/dhruv.jpeg";
import shaan from "../../assets/por_photos/shaan.jpeg";
import gunabhirup from "../../assets/por_photos/guna.jpeg";
import sriniketh from "../../assets/por_photos/sriniketh_mulagada.jpeg";
import shahil from "../../assets/por_photos/shahil.jpeg";
import rounak from "../../assets/por_photos/rounak.jpeg";
import harshit from "../../assets/por_photos/harshit.jpeg";

const teams = [
  {
    title: "Launchpad Executives",
    members: [
      {
        name: "Sampooran Sinha",
        role: "President",
        image: sampooran,
        linkedin: "https://www.linkedin.com/in/sampooran-sinha/",
        email: "f20240997@hyderabad.bits-pilani.ac.in",
        phone: "+91 70037 12277",
      },
      {
        name: "Dhaanvi Bhadani",
        role: "Chairwoman Launchpad",
        image: dhaanvi,
        linkedin: "https://www.linkedin.com/in/dhaanvi-bhadani-533a08322/",
        email: "f20240762@hyderabad.bits-pilani.ac.in",
        phone: "+91 63618 03120",
      },
      {
        name: "Aditya Maheshwari",
        role: "Vice-President",
        image: aditya,
        linkedin: "https://www.linkedin.com/in/aditya-maheshwari-bits/",
        email: "f20240261@hyderabad.bits-pilani.ac.in",
        phone: "+91 70231 61401",
      },
      {
        name: "Anshul Nanwani",
        role: "Vice-Chairman Launchpad",
        image: anshul,
        linkedin: "https://www.linkedin.com/in/anshul-nanwani-040559322/",
        email: "f20241126@hyderabad.bits-pilani.ac.in",
        phone: "+91 95525 86398",
      },
      {
        name: "Sejal Mittal",
        role: "Director of Partnerships",
        image: sejal,
        linkedin: "https://www.linkedin.com/in/sejal-mittal-496458326/",
        email: "f20240161@hyderabad.bits-pilani.ac.in",
        phone: "+91 98216 89504",
      },
      {
        name: "Divvij Chichra",
        role: "Technical Head",
        image: divvij,
        linkedin: "https://www.linkedin.com/in/divvij-chichra-3ab7b4327/",
        email: "f20240298@hyderabad.bits-pilani.ac.in",
        phone: "+91 93131 35129",
      },
      {
        name: "Shreya Jhavar",
        role: "Digital Outreach and Collaborations Head",
        image: shreya,
        linkedin: "https://www.linkedin.com/in/shreya-jhavar-b2136428b/",
        email: "f20241113@hyderabad.bits-pilani.ac.in",
        phone: "+91 83799 20920",
      },
      {
        name: "Hussain Kagalwala",
        role: "Treasurer",
        image: hussain,
        linkedin: "https://www.linkedin.com/in/hussain-kagalwala-467a77328/",
        email: "f20240945@hyderabad.bits-pilani.ac.in",
        phone: "+91 83203 75491",
      },
      {
        name: "Aryan Saini",
        role: "Director of Media and Marketing",
        image: aryan,
        linkedin: "https://www.linkedin.com/in/aryan-saini-96a180324/",
        email: "f20241154@hyderabad.bits-pilani.ac.in",
        phone: "+91 96858 40060",
      },
    ],
  },
  {
    title: "Launchpad Heads",
    members: [
      {
        name: "Hamaid Izhar",
        role: "Events Head",
        image: hamaid,
        linkedin: "https://www.linkedin.com/in/hamaid-izhar-9946a02a7/",
      },
      {
        name: "Akshat Kumar",
        role: "Execution Head",
        image: akshat_kumar,
        linkedin: "https://www.linkedin.com/in/akshat-kumar-a898a61a7/",
      },
      {
        name: "Priyansh Sharma",
        role: "Publicity Head",
        image: priyansh,
        linkedin: "https://www.linkedin.com/in/priyansh-sharma-/",
      },
      {
        name: "Rounak Singh",
        role: "Design Head",
        image: rounak,
        linkedin: "https://www.linkedin.com/in/rounak-singh-42800420b/",
      },
      {
        name: "Harshit Singh",
        role: "Videography Head",
        image: harshit,
        linkedin: "https://www.linkedin.com/in/harshit-singh-3a13b6295/",
      },
      {
        name: "Shahil Singh",
        role: "Photography Head",
        image: shahil,
        linkedin: "https://www.linkedin.com/in/shahilsingh/",
      },
      {
        name: "Gunabhirup Meka",
        role: "Hospitality Head",
        image: gunabhirup,
        linkedin: "https://www.linkedin.com/in/gunabhirup-meka-a673342b1/",
      },
      {
        name: "Sri Niketh Mulagada",
        role: "Hospitality Head",
        image: sriniketh,
        linkedin: "https://www.linkedin.com/in/sri-niketh-mulagada-58350b360/",
      },
      {
        name: "Shaan Sharma",
        role: "Operations Head",
        image: shaan,
        linkedin: "https://www.linkedin.com/in/shaan-sharma-358399226/",
      },
      {
        name: "Dhruv Sharma",
        role: "Operations Head",
        image: dhruv,
        linkedin: "https://www.linkedin.com/in/dhruv-sharma-296370283/",
      },
    ],
  },
];

const ContactSection = () => {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-ecell-bg py-16 flex flex-col items-center justify-center">
      {teams.map((team) => (
        <div key={team.title} className="w-full text-center mb-12 px-4 sm:px-6 lg:px-12">
          <motion.h2
            className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-ecell-primary to-ecell-secondary text-center mb-12 font-syne"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {team.title}
          </motion.h2>

          <div className="max-w-7xl mx-auto flex justify-center">
            <ChromaGrid
              columns={isMobile ? 1 : 3}
              rows={Math.ceil(team.members.length / 3)}
              radius={300}
              damping={0.45}
              fadeOut={0.6}
              items={team.members.map((m) => {
                const handle = m.linkedin
                  ? m.linkedin.split("/").filter(Boolean).pop()
                  : m.name.replace(/\s/g, "").toLowerCase();

                const role = (m.role || "").toLowerCase();
                let gradient = "linear-gradient(135deg, rgba(107,95,255,0.2), rgba(212,255,0,0.2))";
                let borderColor = "#6b5fff";

                if (role.includes("chairman") || role.includes("chairwoman") || role.includes("president")) {
                  gradient = "linear-gradient(135deg, rgba(212,255,0,0.28), rgba(107,95,255,0.24))";
                  borderColor = "#d4ff00";
                } else if (role.includes("tech") || role.includes("technical") || role.includes("design") || role.includes("videography")) {
                  gradient = "linear-gradient(135deg, rgba(107,95,255,0.26), rgba(212,255,0,0.18))";
                  borderColor = "#8b7fff";
                } else if (role.includes("media") || role.includes("publicity") || role.includes("digital") || role.includes("outreach") || role.includes("marketing")) {
                  gradient = "linear-gradient(135deg, rgba(107,95,255,0.22), rgba(212,255,0,0.22))";
                  borderColor = "#6b5fff";
                } else if (role.includes("treasurer") || role.includes("partner") || role.includes("operations") || role.includes("hospitality")) {
                  gradient = "linear-gradient(135deg, rgba(212,255,0,0.22), rgba(107,95,255,0.18))";
                  borderColor = "#a1ff33";
                }

                return {
                  title: m.name,
                  subtitle: m.role,
                  image: m.image,
                  handle: handle ? `@${handle.substring(0, 15)}` : undefined,
                  url: m.linkedin,
                  phone: m.phone,
                  email: m.email,
                  gradient,
                  borderColor,
                  imgStyle: (() => {
                    if (m.image === defaultAvatar) {
                      return { objectFit: "contain", padding: "30px", background: "rgba(255,255,255,0.03)" };
                    }
                    const name = m.name.toLowerCase();

                    // Hamaid: zoom in to reduce background
                    if (name.includes("hamaid")) {
                      return { transform: "scale(1.35)", objectPosition: "center" };
                    }

                    // Dhruv: zoom in more to center face
                    if (name.includes("dhruv")) {
                      return { transform: "scale(1.3)", objectPosition: "center" };
                    }

                    // Priyansh: zoom in to make face more visible
                    if (name.includes("priyansh")) {
                      return { transform: "scale(1.4)", objectPosition: "center 20%" };
                    }

                    if (name.includes("sampooran")) {
                      return { objectPosition: "center 20%" };
                    }

                    // Harshit, Shaan, Aditya, Dhaanvi, Anshul, Sejal, Divvij, Shreya, Hussain, Aryan: Align top
                    if (name.includes("harshit") || name.includes("shaan") || name.includes("aditya") || name.includes("dhaanvi") || name.includes("anshul") || name.includes("sejal") || name.includes("divvij") || name.includes("shreya") || name.includes("hussain") || name.includes("aryan")) {
                      return { objectPosition: "top" };
                    }

                    // Default styling for others
                    return undefined;
                  })()
                };
              })}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContactSection;

