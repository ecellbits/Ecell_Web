import React from 'react';
import EventTemplate from './EventTemplate';
import ttimg from '@/assets/lpevents/teen tycoons.png'
import Sampooran from "@/assets/Sampooran.jpeg";
import Sejal from "@/assets/Sejal.jpeg";
import Deepali from "@/assets/Deepali.jpeg";
import mem1 from "@/assets/t3_mem_1.jpg";
import mem2 from "@/assets/t3_mem_2.jpg";
import mem3 from "@/assets/t3_mem_3.jpg";
import mem4 from "@/assets/t3_mem_4.jpg";

const eventData = {
  title: "Teen Tycoons",
  tagline: "Nurturing the Next Generation of Business Leaders",
  bannerImage: ttimg,
  description: `Teen Tycoons is a case-based business plan competition that nurtures entrepreneurial talent through a structured, multi-stage process. Participants solve analytical guesstimates, tailored problem statements according to their selected ventures, and finalists undergo a skill-building bootcamp with expert mentorship. The event culminates in the Grand Finale, where teams pitch innovative solutions to a distinguished panel, showcasing creativity, critical thinking, and business acumen. With a prize pool of more than 1.25L INR, Teen Tycoons offers unparalleled opportunities for aspiring entrepreneurs to bring their ideas to life.`,
  timeline: [
    {
      date: "20 Mar - 24 Mar 2026",
      event: "Bootcamp (Phase I)",
      description: "Online workshops on strategy, market research, and pitching, with mentor guidance."
    },
    {
      date: "20 Mar - 25 Mar 2026",
      event: "Venture Allocation (Phase II)",
      description: "Teams are allotted ventures and case-based problem statements."
    },
    {
      date: "21 Mar - 25 Mar 2026",
      event: "Elimination Round (Phase III)",
      description: "Teams are evaluated using the Business Model Canvas (BMC)."
    },
    {
      date: "05 Apr 2026",
      event: "Grand Finale (Offline Round)",
      description: "Finalists present their business plans at BITS Pilani, Hyderabad Campus, followed by a structured Q&A with judges."
    }
  ],
  pocs: [
    {
      name: "Sampooran Sinha",
      role: "Senior Associate",
      phone: "+91 7003712277",
      linkedin: "https://www.linkedin.com/in/sampooran-sinha?trk=contact-info",
      image: Sampooran
    },
    {
      name: "Sejal Mittal",
      role: "Senior Associate",
      phone: "+91 9821689504",
      linkedin: "https://www.linkedin.com/in/sejal-mittal-496458326",
      image: Sejal,
      objectPosition: '0% 15%'
    },
    {
      name: "Deepali Singh",
      role: "Senior Associate",
      phone: "+91 8303934014",
      linkedin: "https://www.linkedin.com/in/deepali139",
      image: Deepali
    }

  ],
  faqs: [
    {
      question: "What is Teen Tycoons?",
      answer: "Teen Tycoons is a structured business plan competition for school students (Classes 8–12), designed to take participants from idea generation to final pitching through guided learning and competitive rounds."
    },
    {
      question: "Who can participate?",
      answer: "Students currently studying in Classes 8–12 from any school are eligible to participate."
    },
    {
      question: "Is prior business or startup experience required?",
      answer: "No. The competition is beginner-friendly and includes a guided bootcamp."
    },
    {
      question: "When and where will the event be held?",
      answer: "The event transitions from an Online Bootcamp and Elimination Round (focused on Business Model Canvases) to a Live Grand Finale on April 5th at BITS Pilani, Hyderabad."
    },
    {
      question: "What is the team size and fee?",
      answer: "Students can compete solo or in teams of up to 3 for a flat registration fee of ₹600 per team, which includes all mentorship and rounds."
    },
    {
      question: "How will teams be evaluated?",
      answer: "Finalists will pitch startup ideas to a professional jury, with scoring based on innovation, feasibility, and presentation clarity."
    },
    {
      question: "What recognition do participants receive?",
      answer: "Every student finishing the bootcamp receives a Certificate of Participation, while finalists and winners earn special recognition and prizes."
    },
    {
      question: "Are supervision and refreshments provided?",
      answer: "One parent or a teacher escort is encouraged to accompany students; refreshments are provided on-site, with additional food available for purchase at campus outlets."
    }
  ],
  gallery: [
    mem1,
    mem2,
    mem3,
    mem4
  ],
  registerLink: "https://unstop.com/competitions/teen-tycoons-launchpad-26-bits-1631539"
};

function TeenTycoons() {
  return (
    <div className="bg-ecell-bg min-h-screen">
      <EventTemplate eventData={eventData} />
    </div>
  );
}

export default TeenTycoons;
export { TeenTycoons as Comp };
