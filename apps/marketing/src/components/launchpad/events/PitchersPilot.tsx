import React from 'react';
import EventTemplate from './EventTemplate';
import ppimg from '@/assets/lpevents/pitchers pilot.png'
import Aditya from "@/assets/Aditya.jpg";
import Sharduli from "@/assets/Sharduli.jpg";
import Vedant from "@/assets/Vedant.jpg";
import Aarya from "@/assets/aarya_tripathi.jpg";
import memory1 from '@/assets/lpevents/pitcherspilot/memory1.png';
import memory2 from '@/assets/lpevents/pitcherspilot/memory2.jpg';
import memory3 from '@/assets/lpevents/pitcherspilot/memory3.png';
import memory4 from '@/assets/lpevents/pitcherspilot/memory4.png';
import memory5 from '@/assets/lpevents/pitcherspilot/memory5.png';

const eventData = {
  title: "Pitcher's Pilot",
  tagline: "Connecting Innovation with Capital",
  bannerImage: ppimg,
  gallery: [memory1, memory2, memory3, memory4, memory5],
  description: `Pitchers Pilot is an initiative that provides budding entrepreneurs with the spotlight they deserve by connecting them directly with top investors. Beyond showcasing their ventures, participants gain invaluable feedback from distinguished members of the startup ecosystem and unlock a world of opportunities to accelerate their growth. With direct access to top VCs and angel investors, and a chance to secure funding for your dream venture, Pitchers Pilot is the place where great ideas come alive.`,
  timeline: [
    {
      date: "07 Jan 26 - 15 Feb 26",
      event: "Pitch Deck Submission",
      description: "Register for ₹1500 and submit a pitch deck showcasing your idea, market opportunity, and growth potential to qualify for the next stage."
    },
    {
      date: "15 Feb 26 - 21 Mar 26",
      event: "Online Pitching and Feedback Round",
      description: "Founders pitch to distinguished ecosystem members for feedback, insights, and exclusive mentorship sessions to prepare for fundraising."
    },
    {
      date: "03 Apr 26 - 05 Apr 26",
      event: "Grand Finale",
      description: "Top startups pitch to leading VCs and angel networks at Launchpad for a chance to secure funding and scale their ventures."
    }
  ],
  pocs: [
    {
      name: "Aditya Maheshwari",
      role: "Senior Associate",
      phone: "+91 7023161401",
      linkedin: "https://www.linkedin.com/in/aditya-maheshwari-94157a323",
      image: Aditya
    },
    {
      name: "Sharduli Thakur",
      role: "Senior Associate",
      phone: "+91 8130636333",
      linkedin: "https://linkedin.com/in/sharduli-thakur/",
      image: Sharduli
    },
    {
      name: "Vedant Nichal",
      role: "Senior Associate",
      phone: "+91 8956134149",
      linkedin: "https://www.linkedin.com/in/vedant-nichal",
      image: Vedant
    },
    {
      name: "Aarya Tripathi",
      role: "Senior Associate",
      phone: "+91 90228 01833",
      linkedin: "https://www.linkedin.com/in/aarya-tripathi-7b670b327/",
      image: Aarya
    }
  ],
  faqs: [
    {
      question: "What is Pitcher's Pilot?",
      answer: "It's a platform for entrepreneurs to pitch their startups to investors after a rigorous mentorship period."
    },
    {
      question: "Who are the mentors?",
      answer: "Industry experts, successful entrepreneurs, and seasoned investors from various sectors."
    }
  ],
  registerLink: "https://unstop.com/competitions/pitchers-pilot-launchpad-26-bits-1631551"
};

function PitchersPilot() {
  return (
    <div className="bg-ecell-bg min-h-screen">
      <EventTemplate eventData={eventData} />
    </div>
  );
}

export default PitchersPilot;
export { PitchersPilot as Comp };
