import React from 'react';
import { motion } from 'framer-motion';

// Correct paths to all the images
import alfaleus from '@/assets/Companies/alfaleus.jpeg';
import amrutam from '@/assets/Companies/amrutam.jpeg';
import careernaksha from '@/assets/Companies/careernaksha2.jpeg';
import careers360 from '@/assets/Companies/careers360.png';
import eatconfetti from '@/assets/Companies/eatconfetti.png';
import happimynd from '@/assets/Companies/happimynd.png';
import inspark from '@/assets/Companies/inspark.png';
import sellersetu from '@/assets/Companies/sellersetu.png';
import speakup from '@/assets/Companies/speakup.png';
import traqo from '@/assets/Companies/traqo.jpeg';
import truenorth from '@/assets/Companies/truenorth.jpeg';
import wozart from '@/assets/Companies/wozart.png';

const profiles = [
  { id: 1, name: "Alfaleus Techonology", image: alfaleus , link: "#" },
  { id: 2, name: "Amrutam Pharmaceuticals", image: amrutam, link: "#" },
  { id: 3, name: "CareerNaksha", image: careernaksha, link: "#" },
  { id: 4, name: "Careers360", image: careers360, link: "#" },
  { id: 5, name: "Eat Confetti", image: eatconfetti, link: "#" },
  { id: 6, name: "HappiMynd", image: happimynd, link: "#" },
  { id: 7, name: "Inspark Technologies", image: inspark, link: "#" },
  { id: 8, name: "SellerSetu", image: sellersetu, link: "#" },
  { id: 9, name: "Speakup", image: speakup, link: "#" },
  { id: 10, name: "Traqo", image: traqo, link: "#" },
  { id: 11, name: "TrueNorth Healthcare", image: truenorth, link: "#" },
  { id: 12, name: "Wozart Technologies", image: wozart, link: "#" }
];

const Companies = () => {
  return (
    <div className="min-h-screen bg-page p-8">
      <div className="max-w-7xl mx-auto">
        {/* Added margin-bottom to the heading */}
        <h1 className="text-5xl font-bold text-blue-500 mb-8 text-center">Previous Companies</h1>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-16"> {/* Added mt-8 to create space */}
          {profiles.map((profile) => (
            <motion.a
              key={profile.id} 
              href={profile.link} 
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-transform duration-300 border border-blue-700 p-6 flex flex-col items-center"
            >
              <div className="w-full h-48 overflow-hidden shadow-md mb-4">
                <img loading="lazy" src={profile.image} alt={profile.name} className="w-full h-full object-contain" />
              </div>
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{profile.name}</h3>
                <p className="text-blue-500 font-medium text-sm">{profile.role}</p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Companies;
