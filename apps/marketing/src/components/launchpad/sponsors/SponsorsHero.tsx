import React from 'react';

const ProductExplorer = () => {
  return (
    <div className="py-32 px-6 flex items-center justify-center h-[20vh] bg-ecell-bg text-ecell-text">
      <div className="max-w-5xl mx-auto w-full flex flex-col md:flex-row justify-between items-center text-center md:text-left">
        <br></br>
        <h1 className="text-4xl md:text-6xl lg:text-8xl font-extrabold text-ecell-text">
          Our Sponsors
        </h1>

        <p className="text-xl md:text-2xl leading-relaxed tracking-wide md:text-right md:max-w-xl mt-4 md:mt-0 text-ecell-text opacity-85">
          Sharing our vision, supporting our mission.
        </p>
      </div>
    </div>
  );
};

export default ProductExplorer;
