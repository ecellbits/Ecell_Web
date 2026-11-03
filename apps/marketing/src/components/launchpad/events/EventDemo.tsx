import React from 'react';
import EventTemplate from './EventTemplate';

const mockEventData = {
    title: "Startup Expo",
    tagline: "The Ultimate Battlefield for Emerging Innovators",
    bannerImage: "https://images.unsplash.com/photo-1540575861501-7cf05a4b125a?auto=format&fit=crop&q=80",
    description: `Startup Expo is our flagship event designed to bring together the most promising startups and visionary investors. 

Over the course of two days, participants will have the opportunity to showcase their products, network with industry leaders, and pitch their ideas to a panel of esteemed judges. 

Whether you're looking for funding, mentorship, or simply want to gain exposure, Startup Expo is the perfect platform to take your venture to the next level.`,
    timeline: [
        { date: "Day 1 - 9:00 AM", event: "Opening Ceremony & Keynote Speech" },
        { date: "Day 1 - 11:30 AM", event: "Stall Setup and Visitor Interaction" },
        { date: "Day 1 - 3:00 PM", event: "Networking Session with Mentors" },
        { date: "Day 2 - 10:00 AM", event: "Pitch Deck Presentations" },
        { date: "Day 2 - 4:00 PM", event: "Award Ceremony and Closing" }
    ],
    pocs: [
        {
            name: "Aryan Sharma",
            role: "Lead Organizer",
            contact: "+91 9876543210",
            linkedin: "https://linkedin.com/in/example",
            image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aryan"
        },
        {
            name: "Sneha Reddy",
            role: "Logistics Head",
            contact: "+91 9123456789",
            linkedin: "https://linkedin.com/in/example",
            image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sneha"
        },
        {
            name: "Vikram Malhotra",
            role: "Public Relations",
            contact: "+91 8888877777",
            linkedin: "https://linkedin.com/in/example",
            image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Vikram"
        }
    ],
    faqs: [
        {
            question: "Who can participate in the Startup Expo?",
            answer: "The Startup Expo is open to all registered early-stage startups across various industries. Student-led ventures are highly encouraged to apply."
        },
        {
            question: "Is there any registration fee?",
            answer: "Yes, there is a nominal fee for stall allocation which covers the infrastructure and basic amenities provided during the event."
        },
        {
            question: "What prizes can winners expect?",
            answer: "Winners will receive cash prizes, equity-free grants, and direct incubation opportunities at BITS Pilani's incubator."
        }
    ]
};

const EventDemo = () => {
    return (
        <div className="bg-ecell-bg min-h-screen">
            <EventTemplate eventData={mockEventData} />
        </div>
    );
};

export default EventDemo;
export { EventDemo as Comp };
