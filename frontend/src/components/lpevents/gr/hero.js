import React from "react";


const ProductExplorer = () => {
  return (
    <div className="bg-black bg-gradient-to-t from-black to-blue-900 py-32 px-6 flex items-center justify-center min-h-[40vh]">
      <div className="max-w-5xl mx-auto w-full flex flex-col items-center text-center space-y-6">
        <h1 className="text-6xl md:text-8xl font-extrabold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent drop-shadow-lg">
          Ground Reality
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 leading-relaxed tracking-wide max-w-3xl">
        Get Funded, Get Mentored, Get Started
        </p>
        <button
  className="px-6 py-3 text-lg font-semibold bg-blue-600 hover:bg-blue-500 text-white rounded-2xl shadow-md transition-transform transform hover:scale-105"
  onClick={() => { window.location.href = "https://unstop.com/competitions/ground-reality-a-business-plan-competition-birla-institute-of-technology-science-pilani-hyderabad-campus-1316405"; }}
>
  Register Now
</button>
      </div>
    </div>
  );
};

export default ProductExplorer;
