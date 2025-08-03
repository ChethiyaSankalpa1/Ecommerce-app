import React from 'react';
import { assets } from '../assets/assets';
import Title from '../components/Title';
import NewsLetterBox from '../components/NewsLatterBox';

const Contact = () => {
  return (
    <div className="px-6 md:px-[6vw] py-12 text-gray-800 font-sans">
      {/* Title */}
      <div className="text-4xl md:text-5xl font-extrabold mb-8">
        <Title text1="Contact" text2=" Us" />
      </div>

      {/* Image and Info */}
      <div className="mt-10 flex flex-col lg:flex-row items-start gap-12">
        <img
          src={assets.contact_img}
          alt="Contact Us"
          className="w-full max-h-[400px] lg:w-[45%] rounded-xl shadow-lg object-cover"
        />
        <div className="w-full lg:w-[55%] space-y-6">
          <p className="text-lg leading-relaxed text-gray-700 mb-4 font-medium">Our Store</p>
          <p className="text-lg leading-relaxed text-gray-700 mb-4">
            123 Fashion Street, Style District, Colombo, Sri Lanka
          </p>

          {/* Phone with icon */}
          <p className="text-lg leading-relaxed text-gray-700 mb-4 flex items-center gap-3">
            <i className="fas fa-phone-alt text-orange-500"></i>
            <span>+94 702008522</span>
          </p>

          {/* Email with icon */}
          <p className="text-lg leading-relaxed text-gray-700 mb-4 flex items-center gap-3">
            <i className="fas fa-envelope text-orange-500"></i>
            <span>foreverfashion@gmail.com</span>
          </p>

          {/* Careers */}
          <p className="text-lg leading-relaxed text-gray-700 mb-2 font-semibold mt-6">
            Careers at Forever
          </p>
          <p className="text-lg leading-relaxed text-gray-700 mb-4">
            Explore job opportunities with us and grow your career.
          </p>

          <button className="mt-4 px-6 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition">
            Explore Jobs
          </button>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="mt-16 max-w-xl mx-auto">
        <NewsLetterBox />
      </div>
    </div>
  );
};

export default Contact;
