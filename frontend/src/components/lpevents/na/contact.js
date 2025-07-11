import React from "react";
import { motion } from "framer-motion";
import { EnvelopeIcon } from "@heroicons/react/24/outline";
import { FaLinkedin } from "react-icons/fa";
import Advik from "../../../assets/advik.png";

const ContactSection = () => {
  const guestRelationsContacts = [
    {
      id: 1,
      name: "Advik Kulkarni",
      image: Advik,
      email: "f20221632@hyderabad.bits-pilani.ac.in",
      linkedin: "https://www.linkedin.com/in/advik-kulkarni-3386461b7",
    }
  ];

  const ContactCard = ({ person }) => (
    <motion.div
      className="relative group"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="relative rounded-2xl bg-[#18181B] backdrop-blur-sm border border-white p-4 transform transition-all duration-300 group-hover:scale-105">
        <div className="flex flex-col items-center">
          <div className="w-full h-48 rounded-xl overflow-hidden border border-white">
            <img
              src={person.image}
              alt={person.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-center mt-4">
            <h3 className="text-lg font-semibold text-white">{person.name}</h3>
            <p className="text-sm text-blue-400">{person.role}</p>

            {/* Social Links */}
            <div className="flex gap-4 justify-center mt-3">
              <a href={`mailto:${person.email}`} className="text-white hover:text-gray-300">
                <EnvelopeIcon className="w-5 h-5" />
              </a>
              <a href={person.linkedin} target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300">
                <FaLinkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="relative w-full bg-black py-4 flex flex-col items-center justify-center">
      {/* Overall Heading */}
      <motion.h1
        className="text-4xl font-medium text-white text-center mb-12"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Networking Arena Handled By
      </motion.h1>

      {/* Guest Relations Section */}
      <section className="w-full flex justify-center items-center">
  <div className="grid place-items-center">
    {guestRelationsContacts.map((person) => (
      <ContactCard key={person.id} person={person} />
    ))}
  </div>
</section>
    </div>
  );
};

export default ContactSection;
