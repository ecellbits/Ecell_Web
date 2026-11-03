import React from 'react';
import EventTemplate from './EventTemplate';
import seimg from "@/assets/lpevents/startup expo.png";
import Anshul from "@/assets/Anshul.jpeg";
import Girisha from "@/assets/Girisha.jpg";
import Prarthana from "@/assets/Prarthana.jpeg";
import mem1 from "@/assets/lpevents/startup_expo_memories/mem1.png";
import mem2 from "@/assets/lpevents/startup_expo_memories/mem2.png";
import mem3 from "@/assets/lpevents/startup_expo_memories/mem3.png";
import mem4 from "@/assets/lpevents/startup_expo_memories/mem4.png";

const eventData = {
  title: "Startup Expo",
  tagline: "The Ultimate Battlefield for Emerging Innovators",
  bannerImage: seimg,
  gallery: [mem1, mem2, mem3, mem4],
  description: `The Startup Expo at Launchpad is a key event for entrepreneurs to showcase their companies to investors, customers, and industry experts. Featuring startups from various industries and stages, it offers a dynamic platform for discovering innovative ideas and emerging businesses.`,
  timeline: [
    {
      date: "28 Jan - 26 Feb 2026",
      event: "Registration and Payment",
      description: "Complete registration and participation fee payment through Unstop to confirm your slot."
    },
    {
      date: "01 Mar - 15 Mar 2026",
      event: "Pitch Deck & Video Submission",
      description: "Submit your pitch deck and a promotional video for startup profiling and on-ground promotion."
    },
    {
      date: "03 Apr - 05 Apr 2026",
      event: "Offline Startup Expo",
      description: "Showcase products and ventures at the on-ground Startup Expo, engaging with investors, mentors, and the audience."
    }
  ],
  pocs: [
    {
      name: "Anshul Nanwani",
      role: "Senior Associate",
      phone: "+91 9552586398",
      linkedin: "https://www.linkedin.com/in/anshul-nanwani-040559322",
      image: Anshul
    },
    {
      name: "Girisha Chalana",
      role: "Senior Associate",
      phone: "+91 9352293509",
      linkedin: "https://www.linkedin.com/in/girisha-chalana-703a46323",
      image: Girisha
    },
    {
      name: "Prarthana Singh",
      role: "Senior Associate",
      phone: "+91 9369641454",
      linkedin: "https://www.linkedin.com/in/prarthana-singh-77463a318",
      image: Prarthana
    }
  ],
  faqs: [
    {
      question: "Who can participate in the Startup Expo?",
      answer: "The Startup Expo is open to all registered startups across various industries. Student-led ventures are highly encouraged to apply."
    },
    {
      question: "What is the primary goal of the expo?",
      answer: "To provide a platform for startups to showcase their products, network with industry leaders, and connect with potential investors."
    }
  ],
  registerLink: "https://unstop.com/competitions/startup-expo-launchpad-26-bits-1631560"
};

function StartupExpo() {
  return (
    <div className="bg-ecell-bg min-h-screen">
      <EventTemplate eventData={eventData} />
    </div>
  );
}

export default StartupExpo;
export { StartupExpo as Comp };
