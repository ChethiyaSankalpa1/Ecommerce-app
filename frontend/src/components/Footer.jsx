import React from 'react';
import { assets } from '../assets/assets';

const Footer = () => {
  return (
    <footer className="bg-white text-gray-800 py-16 border-t border-gray-300 px-6 sm:px-12 md:px-[6vw] font-sans select-none">
      {/* Font Awesome */}
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
      />

      {/* Grid Layout */}
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16">
        
        {/* Logo & About */}
        <div className="flex flex-col">
          <img src={assets.logo} alt="Forever Logo" className="w-40 mb-6" />
          <p className="text-gray-600 text-lg leading-relaxed max-w-[420px] mb-6">
            Your one-stop shop for fashion-forward styles and timeless classics. Explore handpicked clothing, accessories, and more.
          </p>
          <div className="flex gap-5 mt-1">
            {['facebook-f', 'twitter', 'instagram', 'linkedin-in', 'pinterest-p'].map((icon, idx) => (
              <a
                key={idx}
                href="#"
                className="w-10 h-10 bg-gray-700 text-white flex items-center justify-center rounded-full hover:bg-gray-900 transition-colors duration-300"
                aria-label={icon.replace('-', ' ')}
              >
                <i className={`fab fa-${icon} text-lg`}></i>
              </a>
            ))}
          </div>
        </div>

        {/* Company Links */}
        <div className="flex flex-col">
          <h3 className="text-xl font-bold text-black uppercase mb-7 tracking-wide">Company</h3>
          <ul className="space-y-4">
            <li>
              {/* Home link with page reload */}
              <a
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = "/";
                }}
                className="flex items-center gap-3 text-gray-600 text-lg hover:text-black hover:font-semibold transition-all duration-300"
              >
                <span className="w-2 h-2 bg-gray-500 rounded-full flex-shrink-0 mt-1"></span>
                Home
              </a>
            </li>
            <li>
              {/* About Us link with page reload */}
              <a
                href="/about"
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = "/about";
                }}
                className="flex items-center gap-3 text-gray-600 text-lg hover:text-black hover:font-semibold transition-all duration-300"
              >
                <span className="w-2 h-2 bg-gray-500 rounded-full flex-shrink-0 mt-1"></span>
                About Us
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center gap-3 text-gray-600 text-lg hover:text-black hover:font-semibold transition-all duration-300"
              >
                <span className="w-2 h-2 bg-gray-500 rounded-full flex-shrink-0 mt-1"></span>
                Delivery
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center gap-3 text-gray-600 text-lg hover:text-black hover:font-semibold transition-all duration-300"
              >
                <span className="w-2 h-2 bg-gray-500 rounded-full flex-shrink-0 mt-1"></span>
                Privacy Policy
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center gap-3 text-gray-600 text-lg hover:text-black hover:font-semibold transition-all duration-300"
              >
                <span className="w-2 h-2 bg-gray-500 rounded-full flex-shrink-0 mt-1"></span>
                Terms of Service
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col">
          <h3 className="text-xl font-bold text-gray-800 uppercase mb-7 tracking-wide">Get In Touch</h3>
          <ul className="space-y-6 text-lg text-gray-600">
            <li className="flex items-center gap-4">
              <i className="fas fa-envelope text-gray-500 text-base flex-shrink-0"></i>
              <span><span className="font-medium text-gray-800">Email:</span> foreverfashion@gmail.com</span>
            </li>
            <li className="flex items-center gap-4">
              <i className="fas fa-phone-alt text-gray-500 text-base flex-shrink-0"></i>
              <span><span className="font-medium text-gray-800">Phone:</span> +94 702008522</span>
            </li>
            <li className="flex items-center gap-4">
              <i className="fas fa-map-marker-alt text-gray-500 text-base flex-shrink-0"></i>
              <span>123 Fashion Street, Style District, Colombo, Sri Lanka</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Footer Section */}
      <div className="border-t border-gray-300 mt-16 pt-8 text-center select-text">
        <p className="text-sm text-gray-500 mb-2">
          © 2025 <span className="font-semibold text-gray-800">forever.com</span> — All rights reserved.
        </p>
        <p className="text-xs text-gray-500">
          Designed with <i className="fas fa-heart text-red-500 mx-1"></i> for fashion lovers worldwide
        </p>
      </div>
    </footer>
  );
};

export default Footer;
