import React from 'react';
import EventTemplate from './EventTemplate';
import Companies from "./InternshipCompanies";
import idimg from '@/assets/lpevents/internship drive.png'
import Tanishq from "@/assets/Tanishq.jpeg";
import Dhaanvi from "@/assets/Dhaanvi.jpeg";
import Tejas from "@/assets/Tejas.jpeg";

const eventData = {
  title: "Internship Drive",
  tagline: "Bridging Academics and Industry",
  bannerImage: idimg,
  description: `Internship Drive connects enthusiastic students with 50+ start-ups, offering stipends up to 125K INR. With 75% of the opportunities being remote, this initiative provides students with the chance to gain hands-on experience in a variety of industries. It also offers valuable exposure to the selection processes and interviews of leading companies, helping students develop the skills and confidence needed to step into the corporate world.`,
  timeline: [
    { date: "Registration", event: "Applications Open for Various Profiles" },
    { date: "Shortlisting", event: "Resume Screening by Startups" },
    { date: "Interviews", event: "One-on-one Selection Rounds" },
    { date: "Results", event: "Final Offer Letters and Onboarding" }
  ],
  pocs: [
    {
      name: "Tanishq Gupta",
      role: "Senior Associate",
      phone: "+91 9691241336",
      linkedin: "https://www.linkedin.com/in/tanishq-gupta-390310313/",
      image: Tanishq,
      objectPosition: 'center 20%'
    },
    {
      name: "Dhaanvi Bhadani",
      role: "Senior Associate",
      phone: "+91 6361803120",
      linkedin: "https://www.linkedin.com/in/dhaanvi-bhadani-533a08322/",
      image: Dhaanvi,
      objectPosition: 'top'
    },
    {
      name: "Tejas Ajmera",
      role: "Senior Associate",
      phone: "+91 8625093335",
      linkedin: "https://www.linkedin.com/in/tejas-ajmera-44ab19322/",

      image: Tejas,
      objectPosition: '0% 20%'
    }
  ],
  faqs: [
    {
      question: "Is the internship drive open to all branches?",
      answer: "Yes, we have roles ranging from Technical, Management, Design, to Content and Sales."
    },
    {
      question: "Are these paid internships?",
      answer: "Most roles offer a competitive stipend, with some going up to 1.25 Lakhs INR."
    }
  ],
  registerLink: "/launchpad/passes#internship-drive-pass",
  hideGallery: true
};

function InternshipDrive() {
  return (
    <div className="bg-ecell-bg min-h-screen">
      <EventTemplate eventData={eventData} />
      <div className="bg-raised">
        <Companies />
      </div>
    </div>
  );
}

export default InternshipDrive;
export { InternshipDrive as Comp };
