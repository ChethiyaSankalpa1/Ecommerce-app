import React from 'react';
import { assets } from '../assets/assets';

const Footer = () => {
  return (
    <footer className="bg-white text-gray-800 py-12 border-t border-gray-300 px-6 sm:px-12 md:px-[6vw] font-sans">
      {/* Font Awesome */}
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
      />

      {/* Grid Layout */}
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        
        {/* Logo & About */}
        <div className="flex flex-col">
          <img src={assets.logo} alt="Forever Logo" className="w-36 mb-4" />
          <p className="text-gray-600 text-[1.05rem] leading-7 mb-4 max-w-[400px]">
            Your one-stop shop for fashion-forward styles and timeless classics. Explore handpicked clothing, accessories, and more.
          </p>
          <div className="flex gap-4 mt-2">
            {['facebook-f', 'twitter', 'instagram', 'linkedin-in', 'pinterest-p'].map((icon, idx) => (
              <a key={idx} href="#" className="w-9 h-9 bg-gray-700 text-white flex items-center justify-center rounded-full hover:bg-gray-900 transition">
                <i className={`fab fa-${icon}`}></i>
              </a>
            ))}
          </div>
        </div>

        {/* Company Links */}
        <div className="flex flex-col">
          <h3 className="text-xl font-bold text-black uppercase mb-6 tracking-wider">Company</h3>
          <ul className="space-y-3">
            {['Home', 'About Us', 'Delivery', 'Privacy Policy', 'Terms of Service'].map((item, index) => (
              <li key={index}>
                <a
                  href="#"
                  className="flex items-center gap-2 text-gray-600 text-[1.05rem] hover:text-black hover:font-semibold transition-all duration-200"
                >
                  <span className="w-1.5 h-1.5 bg-gray-500 rounded-full"></span>
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col">
          <h3 className="text-xl font-bold text-gray-800 uppercase mb-6 tracking-wider">Get In Touch</h3>
          <ul className="space-y-4 text-[1.05rem] text-gray-600">
            <li className="flex items-start gap-3">
              <i className="fas fa-envelope text-gray-500 mt-1 text-sm"></i>
              <span><span className="font-medium text-gray-800">Email:</span> foreverfashion@gmail.com</span>
            </li>
            <li className="flex items-start gap-3">
              <i className="fas fa-phone-alt text-gray-500 mt-1 text-sm"></i>
              <span><span className="font-medium text-gray-800">Phone:</span> +94 702008522</span>
            </li>
            <li className="flex items-start gap-3">
              <i className="fas fa-map-marker-alt text-gray-500 mt-1 text-sm"></i>
              <span>123 Fashion Street, Style District, Colombo, Sri Lanka</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Footer Section */}
      <div className="border-t border-gray-300 mt-12 pt-6 text-center">
        <p className="text-sm text-gray-500 mb-1">
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
