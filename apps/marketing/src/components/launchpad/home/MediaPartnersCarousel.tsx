import React from "react";
import img1 from '@/assets/spons/times nie.png';
import img2 from '@/assets/spons/startupindia.png';
import img3 from '@/assets/spons/algocs.jpg';
import img4 from '@/assets/spons/acn.jpg';
import img5 from '@/assets/spons/knowafest.jpg';
import img6 from '@/assets/spons/startuptalky.jpg';
import img7 from '@/assets/spons/bizstandards.png';
import img8 from '@/assets/spons/timesnetwork.png';
import img9 from '@/assets/spons/blogadda.jpg';
import img10 from '@/assets/spons/HINDU.png';
import img11 from '@/assets/spons/startupstory.jpg';
import img12 from '@/assets/spons/educationtree.png';
import img13 from '@/assets/spons/campustimes.png';
import img14 from '@/assets/spons/fundaspring.jpg';
import img15 from '@/assets/spons/noticebard.jpg';
import img16 from '@/assets/spons/edtimes.jpg';
import img17 from '@/assets/spons/dailyhunt.jpg';
import img18 from '@/assets/jagran_josh.png';
import img19 from '@/assets/spons/creativals.jpg';
import img20 from '@/assets/spons/pagalgyu.png';
import img21 from '@/assets/spons/elyuxen.jpg';
import img22 from '@/assets/spons/campustimes.png';
import img23 from '@/assets/spons/youthincorporated.png';
import img24 from '@/assets/spons/theprint.png';



const items = [
  { name: 'Times NIE', image: img1 },
  { name: 'Startup India', image: img2 },
  { name: 'AlgoCS', image: img3 },
  { name: 'ACN', image: img4 },
  { name: 'KnowaFest', image: img5 },
  { name: 'StartupTalky', image: img6 },
  { name: 'Biz Standards', image: img7 },
  { name: 'Times Network', image: img8 },
  { name: 'BlogAdda', image: img9 },
  { name: 'The Hindu', image: img10 },
  { name: 'Startup Story', image: img11 },
  { name: 'Education Tree', image: img12 },
  { name: 'Campus Times', image: img13 },
  { name: 'FundaSpring', image: img14 },
  { name: 'NoticeBard', image: img15 },
  { name: 'ED Times', image: img16 },
  { name: 'DailyHunt', image: img17 },
  { name: 'Jagran Josh', image: img18 },
  { name: 'Creativals', image: img19 },
  { name: 'PagalGuy', image: img20 },
  { name: 'Elyuxen', image: img21 },
  { name: 'Campus Times', image: img22 },
  { name: 'Youth Incorporated', image: img23 },
  { name: 'The Print', image: img24 },

];

const DisruptCarousel = () => {


  return (
    <div className="relative w-full pb-16 overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section Title */}
        <h3 className="text-left text-2xl font-semibold text-ink mb-6 tracking-tight">
          Past Media Partners
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

