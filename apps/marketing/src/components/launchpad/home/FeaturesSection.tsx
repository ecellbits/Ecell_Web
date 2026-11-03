import React from 'react';
import { useNavigate } from "@/shims/react-router";
import { ArrowDownRight } from 'lucide-react';

const Frame4 = () => {
  const navigate = useNavigate();
  return (
    <section className="relative w-full overflow-hidden font-sans py-24 pb-0">
      {/* CTA Full Width Section */}
      <div className="relative z-20 w-full py-16 md:py-24 flex flex-col items-center justify-center text-center overflow-visible">
        <h2 className="text-ink text-3xl md:text-6xl font-bold mb-2 leading-tight tracking-tight relative z-10 uppercase font-sans">
          Secure Your Spot Now
        </h2>
        <h3 className="text-lava-bright text-3xl md:text-6xl font-bold mb-10 leading-none tracking-tight relative z-10 uppercase font-sans">
          Limited Seats
        </h3>

        <button
          onClick={() => navigate('/launchpad/passes')}
          className="inline-flex items-center gap-3 bg-lava px-10 py-4 rounded text-white text-lg font-black hover:bg-lava-bright transition-colors duration-200 group relative z-10"
        >
          Get Your Passes Now
          <ArrowDownRight className="w-6 h-6 stroke-[2.5px]" />
        </button>
      </div>

      {/* Stats Strip */}
      <div className="relative z-10 bg-lava w-full py-12 md:py-20 border-t border-lava-bright/20">
        <div className="max-w-[1300px] mx-auto w-full px-2 md:px-8 grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-2 md:gap-x-4 text-white">
          <div className="flex flex-col items-center text-center group cursor-default px-1">
            <p className="text-[10px] md:text-xs font-bold font-mono tracking-[0.2em] mb-2 uppercase opacity-60 group-hover:opacity-100 transition-opacity">ATTENDEES</p>
            <p className="text-2xl sm:text-4xl lg:text-5xl font-black leading-none tracking-normal font-mono">25,000+</p>
          </div>
          <div className="flex flex-col items-center text-center group cursor-default px-1">
            <p className="text-[10px] md:text-xs font-bold font-mono tracking-[0.2em] mb-2 uppercase opacity-60 group-hover:opacity-100 transition-opacity">STARTUPS</p>
            <p className="text-2xl sm:text-4xl lg:text-5xl font-black leading-none tracking-normal font-mono">1,000+</p>
          </div>
          <div className="flex flex-col items-center text-center group cursor-default px-1">
            <p className="text-[10px] md:text-xs font-bold font-mono tracking-[0.2em] mb-2 uppercase opacity-60 group-hover:opacity-100 transition-opacity">WORKSHOPS</p>
            <p className="text-2xl sm:text-4xl lg:text-5xl font-black leading-none tracking-normal font-mono">20+</p>
          </div>
          <div className="flex flex-col items-center text-center group cursor-default px-1">
            <p className="text-[10px] md:text-xs font-bold font-mono tracking-[0.2em] mb-2 uppercase opacity-60 group-hover:opacity-100 transition-opacity">SPEAKERS</p>
            <p className="text-2xl sm:text-4xl lg:text-5xl font-black leading-none tracking-normal font-mono">50+</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Frame4;
