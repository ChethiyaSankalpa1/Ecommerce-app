import React from 'react';
import { assets } from '../assets/assets';

const Hero = () => {
  return (
    <div className="flex flex-col sm:flex-row bg-gray-100 shadow-xl rounded-xl overflow-hidden"> {/* ✅ Shadow and rounded corners */}
      {/* Hero Left Section Content */}
      <div className="flex-1 flex flex-col items-start justify-center p-10">
        <div className="text-[#414141] text-4xl font-bold mb-4 space-y-4">
          {/* Line left of text */}
          <div className="flex items-center gap-2">
            <p className="w-8 md:w-11 h-[2px] bg-[#414141]"></p>
            <p className="font-medium text-sm md:text-base">Our Best Seller</p>
          </div>

          <h1 className="prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed">
            Latest Arrival
          </h1>

          {/* Line right of text */}
          <div className="flex items-center gap-2">
            <p className="font-medium text-sm md:text-base">Shop Now</p>
            <p className="w-8 md:w-11 h-[2px] bg-[#414141]"></p>
          </div>
        </div>
      </div>

      {/* Hero Right Section Image */}
      <img
        className="w-full sm:w-1/2 h-auto object-cover mt-4 sm:mt-0"
        src={assets.hero_img}
        alt="Hero Image"
      />
    </div>
  );
};

export default Hero;
