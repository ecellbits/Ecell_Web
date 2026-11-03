import React from 'react';
import EventTemplate from './EventTemplate';
import seedImg from '@/assets/lpevents/seed.png';
import Anshul from "@/assets/Anshul.jpeg";
import Prathvi from "@/assets/prathvi.jpeg";
import Manish from "@/assets/manish.jpeg";

const eventData = {
  title: "SEED",
  tagline: "Summit for Entrepreneurial Ecosystem Development",
  bannerImage: seedImg,
  description: `SEED is a national-level initiative designed to bring together Entrepreneurship Cells (E-Cells) from universities across India onto a common platform. Conducted as part of Launchpad, the 10th edition of BITS Hyderabad’s flagship entrepreneurship summit, the event focuses on enabling meaningful exchange of ideas, experiences, and best practices in building campus startup ecosystems.

The summit combines expert insights, peer learning, and collaborative discussions to help student-led entrepreneurship bodies strengthen their impact within their respective institutions.`,
  timeline: [
    {
      date: "Day 1",
      event: "Foundations of Campus",
      description: "Entrepreneurship Opening address and FIC talk with insights into BITS Hyderabad’s initiatives, followed by an expert panel and interactive E-Cell experience sharing with feedback."
    },
    {
      date: "Day 2",
      event: "Collaboration & Knowledge Exchange",
      description: "Rotating roundtable discussions on topics such as incubation, sponsorships, operations, and outreach, followed by networking with founders, investors, and industry professionals."
    },
    {
      date: "Day 3",
      event: "Application, Evaluation & Insights",
      description: "Team presentations of key takeaways, with live voting, comparative analysis, critical evaluation followed by informal networking with the Launchpad organising committee."
    }
  ],
  pocs: [
    {
      name: "Anshul Nanwani",
      role: "Registration & Queries",
      phone: "+91 9552586398",
      linkedin: "https://www.linkedin.com/in/anshul-nanwani-040559322",
      image: Anshul
    },
    {
      name: "Prathvi Raj Chauhan",
      role: "Registration & Queries",
      phone: "+91 78271 75012",
      linkedin: "https://www.linkedin.com/in/prathvirajchauhan/",
      image: Prathvi
    },
    {
      name: "Manish Rumale",
      role: "Registration & Queries",
      phone: "+91 98861 17965",
      linkedin: "https://www.linkedin.com/in/manish-rumale-99b5b534a/",
      image: Manish
    }
  ],
  faqs: [
    {
      question: "What is SEED?",
      answer: "SEED (Summit for Entrepreneurial Ecosystem Development) is a national-level initiative to bring together E-Cells from across India to share best practices and build a robust campus startup ecosystem."
    },
    {
      question: "When is the event happening?",
      answer: "It is conducted as part of Launchpad, from 3rd to 5th April."
    },
    {
        question: "Who can participate?",
        answer: "Members of Entrepreneurship Cells from polytechnic and degree colleges across India are encouraged to participate."
    }
  ],
  registerLink: "#contacts",
  registerButtonText: "For registration, click here",
  hideGallery: true,
  pocTagline: "For registration, contact:"
};

function SeedSummit() {
  return (
    <div className="bg-ecell-bg min-h-screen">
      <EventTemplate eventData={eventData} />
    </div>
  );
}

export default SeedSummit;
export { SeedSummit as Comp };
