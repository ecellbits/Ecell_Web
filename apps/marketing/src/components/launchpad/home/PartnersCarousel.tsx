import React from "react";
import img1 from '@/assets/spons/50knetwork.jpeg';
import img2 from '@/assets/spons/10000startup.png';
import img3 from '@/assets/spons/venturecatalysts.png';
import img4 from '@/assets/spons/startuphyderabad.jpeg';
import img5 from '@/assets/spons/thub.png';
import img6 from '@/assets/spons/turbostart.jpeg';
import img7 from '@/assets/spons/googlecloud.png';
import img8 from '@/assets/spons/cloudesign.png';
import img9 from '@/assets/spons/catechnologies.jpeg';
import img10 from '@/assets/spons/sciofoundation.png';
import img11 from '@/assets/spons/badabuisness.png';
import img12 from '@/assets/spons/learnngwhile travelling.jpeg';
import img13 from '@/assets/spons/ncore.png';
import img14 from '@/assets/spons/enactus.png';
import img15 from '@/assets/spons/lemon.png';
import img16 from '@/assets/spons/fundsindia.png';
import img17 from '@/assets/spons/jaarvis.png';
import img18 from '@/assets/spons/sucseed.png';
import img19 from '@/assets/spons/leada.png';
import img20 from '@/assets/spons/yourstartupol.jpeg';
import img21 from '@/assets/spons/cosmos.png';
import img22 from '@/assets/spons/nirmaan.png';
import img23 from '@/assets/spons/ecell.jpeg';
import img24 from '@/assets/spons/thristypelican.jpeg';

const items = [
  { name: 'thristypelican', image: img24 },
  { name: '50K Network', image: img1 },
  { name: '10,000 Startups', image: img2 },
  { name: 'Venture Catalysts', image: img3 },
  { name: 'Startup Hyderabad', image: img4 },
  { name: 'T-Hub', image: img5 },
  { name: 'TurboStart', image: img6 },
  { name: 'Google Cloud', image: img7 },
  { name: 'Cloudesign', image: img8 },
  { name: 'CA Technologies', image: img9 },
  { name: 'Scio Foundation', image: img10 },
  { name: 'Bada Business', image: img11 },
  { name: 'Learning While Travelling', image: img12 },
  { name: 'nCore Games', image: img13 },
  { name: 'Enactus', image: img14 },
  { name: 'Lemon Ideas', image: img15 },
  { name: 'FundsIndia', image: img16 },
  { name: 'Jaarvis Accelerator', image: img17 },
  { name: 'SucSEED Ventures', image: img18 },
  { name: 'Leada', image: img19 },
  { name: 'Your Startup', image: img20 },
  { name: 'Cosmos', image: img21 },
  { name: 'Nirmaan Organization', image: img22 },
  { name: 'E-Cell', image: img23 },
];

const DisruptCarousel = () => {


  return (
    <div className="relative w-full py-8 overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section Title */}
        <h3 className="text-left text-2xl font-semibold text-ink mb-6 tracking-tight">
          Past Partners
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
