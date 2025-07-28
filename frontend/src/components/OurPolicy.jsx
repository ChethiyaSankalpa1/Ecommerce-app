import React from 'react';
// Importing images/icons from your assets folder
import { assets } from '../assets/assets';  // Make sure this path is correct

const OurPolicy = () => {
  return (
    // Main container div for all policy items
    // "flex" applies Flexbox layout
    // "flex-col" stacks items vertically on small screens
    // "sm:flex-row" changes to horizontal row layout on small (sm) and bigger screens
    // "justify-around" spreads the items evenly with space around them
    // "gap-12" adds spacing between items (large gap on small screens)
    // "sm:gap-2" reduces gap on larger screens
    // "text-center" centers text inside each item
    // "py-20" adds vertical padding top and bottom (space above and below container)
    // "text-sm" sets base font size to small
    // "md:text-gray-700" makes text a medium dark gray on medium and larger screens
    <div className="flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-sm md:text-gray-700">

      {/* First policy item: Easy Exchange Policy */}
      <div className="max-w-xs">
        {/* Image tag for the icon */}
        {/* src={assets.exchange_icon} loads the icon image */}
        {/* alt attribute is for accessibility and SEO, describes image */}
        {/* "w-12" sets width to 3rem (48px), "mx-auto" centers image horizontally */}
        <img src={assets.exchange_icon} alt="Exchange Icon" className="w-12 mx-auto" />
        
        {/* Title text */}
        {/* "font-semibold" makes the font weight semi-bold */}
        {/* "mt-2" adds margin-top to separate it from the image */}
        <p className="font-semibold mt-2">Easy Exchange Policy</p>
        
        {/* Description paragraph */}
        {/* "text-gray-400" makes text light gray */}
        {/* "mt-1" adds small margin-top for spacing from title */}
        <p className="text-gray-400 mt-1">
          Hassle-free exchanges available within 30 days of purchase for your convenience.
        </p>
      </div>

      {/* Second policy item: 7-Day Return Policy */}
      <div className="max-w-xs">
        {/* Icon for return policy */}
        <img src={assets.quality_icon} alt="Quality Icon" className="w-12 mx-auto" />
        
        {/* Policy title */}
        <p className="font-semibold mt-2">7-Day Return Policy</p>
        
        {/* Description */}
        <p className="text-gray-400 mt-1">
          Returns accepted within 7 days with full refund or replacement.
        </p>
      </div>

      {/* Third policy item: Customer Support */}
      <div className="max-w-xs">
        {/* Support icon */}
        <img src={assets.support_img} alt="Support Icon" className="w-12 mx-auto" />
        
        {/* Title */}
        <p className="font-semibold mt-2">Customer Support</p>
        
        {/* Description */}
        <p className="text-gray-400 mt-1">
          Our dedicated support team is available 24/7 to assist you with any queries.
        </p>
      </div>

    </div>
  );
};

export default OurPolicy;
