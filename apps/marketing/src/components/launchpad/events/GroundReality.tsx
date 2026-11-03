import React from 'react';
import EventTemplate from './EventTemplate';
import Grimg from '@/assets/lpevents/gr.jpg'
import Divvij from "@/assets/Divvij.jpeg";
import Ramya from "@/assets/Ramya.jpeg";
import sonakshi from "@/assets/sonakshi.jpeg";
import mem1 from "@/assets/lpevents/gr/gr_mem_1.jpg";
import mem2 from "@/assets/lpevents/gr/gr_mem_2.jpg";
import mem3 from "@/assets/lpevents/gr/gr_mem_3.jpg";
import mem4 from "@/assets/lpevents/gr/gr_mem_4.jpg";
import mem5 from "@/assets/lpevents/gr/gr_mem_5.jpg";

const eventData = {
  title: "Ground Reality",
  tagline: "The Foremost B-Plan Competition",
  bannerImage: Grimg,
  description: `Ground Reality is a prestigious annual competition giving start-ups and aspiring entrepreneurs the chance to pitch their ideas to top venture capitalists and angel investors. With over 20 mentors guiding 200+ participants, it bridges the gap between students, industry, and market needs. The winners receive a total prize pool worth 2 lakhs, along with legal services, mentoring vouchers, cloud space, and incubation support, offering invaluable resources for business growth.`,
  timeline: [
    {
      date: "03 Feb - 21 Feb 2026",
      event: "BMC Submission",
      description: "Submit a one-page BMC in PDF via Unstop. Top 25% shortlist for Mentorship."
    },
    {
      date: "23 Feb - 27 Mar 2026",
      event: "Mentorship Phase",
      description: "One month of expert mentorship to refine business models, USPs, and pitching strategies."
    },
    {
      date: "04 Apr 2026",
      event: "Semi-finals",
      description: "3-minute elevator pitch + 2-minute Q&A. Top 20% advance to the Grand Finale."
    },
    {
      date: "05 Apr 2026",
      event: "Finals",
      description: "10-minute final presentation + Q&A. Top 3 teams win from a 2 Lakh prize pool."
    }
  ],
  gallery: [mem1, mem2, mem3, mem4, mem5],
  pocs: [
    {
      name: "Divvij Chichra",
      role: "Senior Associate",
      phone: "+91 9313135129",
      linkedin: "https://in.linkedin.com/in/divvij-chichra-3ab7b4327",
      image: Divvij,
      objectPosition: 'top'
    },
    {
      name: "Ramya S",
      role: "Senior Associate",
      phone: "+91 6382757845",
      linkedin: "https://www.linkedin.com/in/ramya-s-88514422a",
      image: Ramya,
      objectPosition: 'top'
    },
    {
      name: "Sonakshi Bhaumik",
      role: "Senior Associate",
      phone: "+91 9902536008",
      linkedin: "https://www.linkedin.com/in/sonakshi-bhaumik-761525311",
      image: sonakshi,
      objectPosition: 'top'
    }
  ],
  faqs: [
    {
      question: "Who is eligible for Ground Reality?",
      answer: "Early-stage startups and students with a solid business plan are eligible."
    },
    {
      question: "What are the judging criteria?",
      answer: "Judging is based on innovation, market viability, scalability, and the strength of the team."
    }
  ],
  registerLink: "https://unstop.com/competitions/ground-reality-business-plan-competition-launchpad-26-bits-1631135"
};

function GroundReality() {
  return (
    <div className="bg-ecell-bg min-h-screen">
      <EventTemplate eventData={eventData} />
    </div>
  );
}

export default GroundReality;
export { GroundReality as Comp };
