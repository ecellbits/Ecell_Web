import React from 'react';
import lp from '../../assets/Launchpad1.JPG';

const ProgramDescription = () => {
  return (
    <div className="bg-black text-white p-8 pb-0">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          <div className="lg:w-1/2 bg-blue-600/10 p-6 rounded-lg shadow-lg">
            <p className="text-lg mb-6">
            Launchpad is three-day annual entrepreneurial summit by E-Cell, BITS Pilani Hyderabad Campus, celebrating innovation and startups.
            </p>
           
            <p className="text-lg mb-8">
            Learn from industry-leading CEOs and founders who share their success stories. Participate in unique events like Pitchers Pilot, Startup Expo, Beyond Profits and many more. Get a chance to connect with investors, entrepreneurs, and like-minded peers, empowering you to grow your ideas and unleash the true entrepreneur within you.
            </p>
          </div>
          
          <div className="lg:w-1/2 w-full order-first lg:order-last">
            <div className="relative">
              <div className="absolute -left-8 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-blue-600 rounded-full hidden lg:block"></div>
              <div className="bg-black p-4 border-2 border-blue-600 rounded-lg shadow-lg">
                <div className="aspect-video w-full rounded-lg overflow-hidden">
                  <img 
                    src={lp} 
                    alt="Launchpad Logo" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgramDescription;
