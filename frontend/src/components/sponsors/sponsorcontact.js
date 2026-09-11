import React from "react";
import { motion } from "framer-motion";
import ChromaGrid from "../Teams/ChromaGrid";
import dhaanvi from "../../assets/por_photos/p Dhaanvi Bhadani.jpeg";
import sejal from "../../assets/por_photos/p Sejal Mittal.jpeg";
import divvij from "../../assets/por_photos/p Divvij Chichra.jpeg";

const ContactSection = () => {
  const guestRelationsContacts = [
    {
      id: 1,
      name: "Dhaanvi Bhadani",
      role: "Chairwoman Launchpad",
      image: dhaanvi,
      email: "f20240762@hyderabad.bits-pilani.ac.in",
      phone: "+91 63618 03120",
      linkedin: "https://www.linkedin.com/in/dhaanvi-bhadani-533a08322/",
    },
    {
      id: 2,
      name: "Sejal Mittal",
      role: "Director of Partnerships",
      image: sejal,
      email: "f20240161@hyderabad.bits-pilani.ac.in",
      phone: "+91 98216 89504",
      linkedin: "https://www.linkedin.com/in/sejal-mittal-496458326/",
    },
    {
      id: 3,
      name: "Divvij Chichra",
      role: "Technical Head",
      image: divvij,
      email: "f20240298@hyderabad.bits-pilani.ac.in",
      phone: "+91 93131 35129",
      linkedin: "https://www.linkedin.com/in/divvij-chichra-3ab7b4327/",
    },
  ];

  return (
    <div className="relative w-full min-h-screen bg-black py-16 flex flex-col items-center justify-center">
      {/* Overall Heading */}
      <motion.h1
        className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-500 text-center mb-12 font-syne"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Sponsorships Handled By
      </motion.h1>

      <div className="max-w-4xl mx-auto flex justify-center scale-90 sm:scale-95">
        <ChromaGrid
          columns={3}
          rows={1}
          radius={250}
          damping={0.45}
          fadeOut={0.6}
          items={guestRelationsContacts.map((m) => {
            const handle = m.linkedin
              ? m.linkedin.split("/").filter(Boolean).pop()
              : m.name.replace(/\s/g, "").toLowerCase();

            const role = (m.role || "").toLowerCase();
            let gradient = "linear-gradient(135deg, rgba(107,95,255,0.2), rgba(212,255,0,0.2))";
            let borderColor = "#6b5fff";

            if (role.includes("chairman") || role.includes("president")) {
              gradient = "linear-gradient(135deg, rgba(212,255,0,0.28), rgba(107,95,255,0.24))";
              borderColor = "#d4ff00";
            } else if (role.includes("tech") || role.includes("execution")) {
              gradient = "linear-gradient(135deg, rgba(107,95,255,0.26), rgba(212,255,0,0.18))";
              borderColor = "#8b7fff";
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
              imgStyle: { objectPosition: "center" }
            };
          })}
        />
      </div>
    </div>
  );
};

export default ContactSection;
