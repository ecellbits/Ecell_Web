import React from 'react';
import lp1 from '@/assets/Launchpad1.JPG';
import lp2 from '@/assets/startup.JPG';
import lp3 from '@/assets/pic.JPG';
import lp4 from '@/assets/ss.JPG';

const ProgramDescription = () => {
  return (
    <div className="w-full max-w-5xl mx-auto px-6 py-20 pb-0">
      {/* Unified Card Container with Border */}
      <div className="rounded border border-hairline overflow-hidden bg-raised">

        {/* Top Section: 4 Image Bento Grid */}
        <div className="grid grid-cols-2 grid-rows-2 gap-1 h-[400px] md:h-[500px]">
          {/* Top Left - Large */}
          <div className="col-span-1 row-span-1 md:col-span-1 md:row-span-1 overflow-hidden relative group">
            <img
              loading="lazy" src={lp1}
              alt="Launchpad Main"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Top Right */}
          <div className="col-span-1 row-span-1 overflow-hidden relative group">
            <img
              loading="lazy" src={lp2}
              alt="Startup"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Bottom Left */}
          <div className="col-span-1 row-span-1 overflow-hidden relative group">
            <img
              loading="lazy" src={lp3}
              alt="Crowd"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Bottom Right */}
          <div className="col-span-1 row-span-1 overflow-hidden relative group">
            <img
              loading="lazy" src={lp4}
              alt="Speaker"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Bottom Section: Text Area */}
        <div className="p-8 md:p-12 text-left bg-raised">
          <p className="text-ecell-text-muted text-lg md:text-xl font-light leading-relaxed mb-6 font-sans">
            Launchpad is three-day <span className="font-bold text-lava-bright">annual entrepreneurial summit</span> by E-Cell, BITS Pilani Hyderabad Campus, celebrating innovation and startups.
          </p>

          <p className="text-ecell-text-muted text-lg md:text-xl font-light leading-relaxed font-sans">
            <span className="text-lava-bright font-bold">Learn from industry-leading CEOs and founders who share their success stories.</span> Participate in unique events like Pitchers Pilot, Startup Expo, Beyond Profits and many more. Get a chance to connect with investors, entrepreneurs, and like-minded peers, empowering you to grow your ideas and unleash the true entrepreneur within you.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProgramDescription;
