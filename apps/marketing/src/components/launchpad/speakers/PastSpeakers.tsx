import React from "react";
import { motion } from "framer-motion";
import img2025_1 from "@/assets/SPEAKER PICS/amangupta.jpeg";
import img2025_2 from "@/assets/SPEAKER PICS/SP.jpeg";
import img2025_4 from "@/assets/SPEAKER PICS/gov_mizo.avif";
import img2025_5 from "@/assets/SPEAKER PICS/gupta_mathongo.jpg";
import img2025_6 from "@/assets/SPEAKER PICS/periperi.png";
import img2025_9 from "@/assets/SPEAKER PICS/jayesh.jpeg";
import img1 from "@/assets/SPEAKER PICS/vp_india_naidu.jpg";
import img2 from "@/assets/SPEAKER PICS/piyush-goyal.jpeg";
import img3 from "@/assets/SPEAKER PICS/kiran_mazumdar_shaw.jpeg";
import img4 from "@/assets/SPEAKER PICS/dham.webp";
import img5 from "@/assets/SPEAKER PICS/Nilesh-Kothari1.png";
import img6 from "@/assets/SPEAKER PICS/kshitij_khandelwal.jpeg";
import img7 from "@/assets/SPEAKER PICS/ANAND-SRINIVASAN.webp";
import img8 from "@/assets/SPEAKER PICS/sam.jpg";
import img9 from "@/assets/SPEAKER PICS/TARUN-KATHIYAL.webp";
import img10 from "@/assets/SPEAKER PICS/A_SIVANTHANU.png";
import img11 from "@/assets/SPEAKER PICS/ANKUSH-SINGHLA.jpeg";
import img12 from "@/assets/SPEAKER PICS/kav.png";
import img13 from "@/assets/SPEAKER PICS/greg.webp";
import img14 from "@/assets/SPEAKER PICS/pranalimehta.jpeg";
import img15 from "@/assets/SPEAKER PICS/varun.jpeg";
import img16 from "@/assets/SPEAKER PICS/PRANAY-PAI.png";

const profiles = [
  { id: 20251, name: "AMAN GUPTA", role: "Co-Founder and CMO at boAt", image: img2025_1, link: "https://www.linkedin.com/in/aman-gupta-7217a515/" },
  { id: 20252, name: "SURESH PRABHU", role: "Former Union Minister", image: img2025_2, link: "https://www.linkedin.com/in/sureshpprabhu/" },
  { id: 20254, name: "GENERAL VIJAY KUMAR SINGH", role: "Governer of Mizoram", image: img2025_4 },
  { id: 20255, name: "ANUP GUPTA", role: "Founder and CEO - Mathongo", image: img2025_5, link: "https://www.linkedin.com/in/anup-gupta-8a3a986" },
  { id: 20256, name: "MAHESHWAR PERI", role: "Founder and CEO - Careers360", image: img2025_6, link: "https://in.linkedin.com/in/maheshwer-peri-1723ba3b" },
  { id: 20259, name: "JAYESH RANJAN", role: "SPECIAL CHIEF SECRETARY", image: img2025_9, link: "https://www.linkedin.com/in/jayesh-ranjan-37415963/" },
  { id: 1, name: "SHRI VENKAIAH NAIDU", role: "FORMER VICE-PRESIDENT OF INDIA", image: img1, link: "https://x.com/mvenkaiahnaidu?lang=en&mx=2" },
  { id: 2, name: "PIYUSH GOYAL", role: "UNION CABINET MINISTER", image: img2, link: "https://www.linkedin.com/in/piyushgoyalofficial/?originalSubdomain=in" },
  { id: 3, name: "KIRAN MAZUMDAR SHAW", role: "CHAIRPERSON BIOCON", image: img3, link: "https://www.linkedin.com/in/kmazumdarshaw/" },
  { id: 4, name: "VINOD DHAM", role: "INDIAN INVENTOR", image: img4, link: "https://www.linkedin.com/in/vinod-vin-dham-b07a7935/" },
  { id: 5, name: "NILESH KOTHARI", role: "CO-FOUNDER TRIFECTA CAPITAL", image: img5, link: "https://www.linkedin.com/in/nilesh-kothari-9126588/" },
  { id: 6, name: "KSHTIJ KHANDELWAL", role: "CTO - PIXXEL", image: img6, link: "https://www.linkedin.com/in/khandelwalkshitij/" },
  { id: 7, name: "ANAND SRINIVASAN", role: "CO FOUNDER AKASA AIR", image: img7, link: "https://www.linkedin.com/in/anandakasa/?originalSubdomain=in" },
  { id: 8, name: "SAM PITRODA", role: "INDIAN INVENTOR", image: img8, link: "https://www.linkedin.com/in/sampitroda/" },
  { id: 9, name: "TARUN KATIAL", role: "FOUNDER COTO EX-CEO ZEE5", image: img9, link: "https://www.linkedin.com/in/tarunkatial/?originalSubdomain=in" },
  { id: 10, name: "DR.A SIVATHANU PILLAI", role: "INDIAN SCIENTIST DRDO AND ISRO", image: img10, link: "https://www.linkedin.com/in/a-sivathanu-pillai-2b014576/?originalSubdomain=in" },
  { id: 11, name: "ANKUSH SINGLA", role: "CO-FOUNDER CODING NINJAS", image: img11, link: "https://www.linkedin.com/in/ankushsingla/?originalSubdomain=in" },
  { id: 12, name: "KAVITHA SUBRAMANIAN", role: "CO FOUNDER UPSTOX", image: img12, link: "https://www.linkedin.com/in/kavitha-subramanian-6a761411/?originalSubdomain=in" },
  { id: 13, name: "GREG MOORAN", role: "CEO ZOOMCAR", image: img13, link: "https://www.linkedin.com/in/greg-moran-45b9a27/" },
  { id: 14, name: "PRANALI MEHTA", role: "VENTURES AND ACCELERATION ANTHILL", image: img14, link: "https://www.linkedin.com/in/pranalimehta99/" },
  { id: 15, name: "VARUN SRIDHAR", role: "CEO PAYTM COMPANY", image: img15, link: "https://www.linkedin.com/in/varun-sridhar-639146a/?originalSubdomain=in" },
  { id: 16, name: "PRANAY PAI", role: "FOUNDING PARTNER 30NE4 CAPITAL", image: img16, link: "https://www.linkedin.com/in/pranavpai/?originalSubdomain=in" },
];

const ProfileCard = ({ profile, index }) => (
  <motion.a
    href={profile.link}
    target="_blank"
    rel="noopener noreferrer"
    initial={false}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay: index * 0.05 }}
    className="group relative bg-zinc-900/50 border border-zinc-800 rounded-lg overflow-hidden backdrop-blur-sm hover:border-ecell-blue/50 transition-all duration-500"
  >
    <div className="aspect-[4/5] overflow-hidden relative">
      <img
        src={profile.image}
        alt={profile.name}
        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />

      {/* Decorative lines */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#e0424f] to-transparent" />
    </div>

    <div className="p-4 md:p-6 relative">
      <h3 className="text-base md:text-xl font-black text-white mb-1 md:mb-2 leading-tight font-sans group-hover:text-lava-bright transition-colors">
        {profile.name}
      </h3>
      <p className="text-lava-bright font-bold text-[8px] md:text-[10px] tracking-[0.1em] uppercase opacity-80 font-sans">
        {profile.role}
      </p>

      {/* Hover Glow */}
    </div>
  </motion.a>
);

const PastSpeakers = () => {
  return (
    <div className="relative w-full bg-page py-12 md:py-24 overflow-hidden font-sans">
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6">
        <motion.div
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 md:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-7xl font-black text-white tracking-tighter mb-3 md:mb-4">
            Past <span className="text-lava-bright">Speakers</span>
          </h2>
          <div className="h-1 md:h-1.5 w-16 md:w-24 bg-gradient-to-r from-[#1d6ba8] to-[#e0424f] mx-auto rounded-full" />
          <p className="text-gray-400 mt-4 md:mt-6 tracking-widest uppercase text-[10px] md:text-xs font-bold opacity-60">Visionaries who inspired our journey</p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-8">
          {profiles.map((profile, index) => (
            <ProfileCard key={profile.id} profile={profile} index={index} />
          ))}
        </div>
      </div>

      {/* Background Decorative Blur */}
    </div>
  );
};

export default PastSpeakers;

