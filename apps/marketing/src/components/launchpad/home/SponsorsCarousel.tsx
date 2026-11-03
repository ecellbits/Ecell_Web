import React from "react";
import img1 from '@/assets/spons/decathlon.jpg';
import img2 from '@/assets/spons/plum.avif';
import img3 from '@/assets/spons/ACT.jpg';
import img4 from '@/assets/spons/AMD33.png';
import img5 from '@/assets/spons/altair.jpg';
import img6 from '@/assets/spons/nestle.jpg';
import img7 from '@/assets/spons/coke.jpg';
import img8 from '@/assets/spons/bharatversity.png';
import img9 from '@/assets/spons/FAB.jpg';
import img10 from '@/assets/spons/campa.png';
import img11 from '@/assets/spons/unstop.avif';
import img12 from '@/assets/spons/cornitos.jpg';
import img13 from '@/assets/spons/fitness_fundas.jpg';
import img14 from '@/assets/spons/switcheko.jpg';
import img15 from '@/assets/spons/skilligence.png';
import img16 from '@/assets/spons/2iim.png';
import img17 from '@/assets/spons/huddle-logo.png';
import img18 from '@/assets/spons/flyberrygourmet.jpg';
import img19 from '@/assets/spons/hackerthehouse.png';
import img20 from '@/assets/spons/royalbrothers.png';
import img21 from '@/assets/spons/mototek.jpg';
import img22 from '@/assets/spons/instax.png';
import img23 from '@/assets/spons/businesskeeda.png';
import img24 from '@/assets/spons/kurogaming.jpg';
import img25 from '@/assets/spons/productfolks.png';
import img26 from '@/assets/spons/novatechsolar.png';
import img27 from '@/assets/spons/Lawseek.png';

const items = [
  { name: 'Decathlon', image: img1 },
  { name: 'Plum', image: img2 },
  { name: 'ACT', image: img3 },
  { name: 'AMD', image: img4 },
  { name: 'Altair', image: img5 },
  { name: 'Nestlé', image: img6 },
  { name: 'Coca-Cola', image: img7 },
  { name: 'Bharatversity', image: img8 },
  { name: 'Fablabs', image: img9 },
  { name: 'Campa', image: img10 },
  { name: 'Unstop', image: img11 },
  { name: 'Cornitos', image: img12 },
  { name: 'Fitness Fundas', image: img13 },
  { name: 'Switcheko', image: img14 },
  { name: 'Skilligence', image: img15 },
  { name: '2IIM', image: img16 },
  { name: 'Huddle', image: img17 },
  { name: 'Flyberry Gourmet', image: img18 },
  { name: 'Hacker The House', image: img19 },
  { name: 'Royal Brothers', image: img20 },
  { name: 'Mototek', image: img21 },
  { name: 'Instax', image: img22 },
  { name: 'Business Keeda', image: img23 },
  { name: 'Kuro Gaming', image: img24 },
  { name: 'Product Folks', image: img25 },
  { name: 'Novatech Solar', image: img26 },
  { name: 'Lawseek', image: img27 },

];

const DisruptCarousel = () => {


  return (
    <div className="relative w-full py-8 overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section Title */}
        <h3 className="text-left text-2xl font-semibold text-ink mb-6 tracking-tight">
          Past Sponsors
        </h3>

        {/* Carousel Wrapper */}
        <div className="relative overflow-hidden w-full">
          <div
            className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5"
          >
            {items.map((item, index) => (
              <div
                key={index}
                className="min-w-0 h-28 flex items-center justify-center rounded bg-white border border-hairline hover:border-hairline-strong transition-colors duration-200"
              >
                <img
                  loading="lazy" src={item.image}
                  alt={item.name}
                  className="max-w-[80%] h-20 object-contain opacity-90 group-hover:opacity-100 transition-opacity duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Gradient Fades for Better Look */}
    </div>
  );
};

export default DisruptCarousel;
