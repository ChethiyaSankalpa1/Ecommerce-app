import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';

const SearchBar = () => {
  const { search, setSearch, showsearch, setShowSearch } = useContext(ShopContext);
  const location = useLocation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Show search bar only when on /collection route and showsearch is true
    if (location.pathname.includes('/collection') && showsearch) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [location.pathname, showsearch]);

  if (!visible) return null;

  return (
    <div className="w-full bg-white/70 backdrop-blur-sm z-40 sticky top-0 border-b">
      <div className="max-w-screen-xl mx-auto px-4 py-3 flex justify-center items-center relative">
        {/* Search Input */}
        <div className="relative w-full sm:w-3/4 md:w-2/3 lg:w-1/2">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="Search items here..."
            className="w-full px-4 py-2 rounded-full border border-gray-300 bg-white text-sm focus:outline-none focus:ring-1 focus:ring-gray-400 transition placeholder:text-gray-500"
          />

          {/* Search Icon */}
          <img
            src={assets.search_icon}
            alt="search"
            className="absolute top-1/2 right-12 transform -translate-y-1/2 h-4 w-4 opacity-50 pointer-events-none"
          />

          {/* Close (X) Button */}
          <img
            onClick={() => {
              setSearch('');
              setShowSearch(false); // hide bar after clearing
            }}
            src={assets.cross_icon}
            alt="close"
            className="absolute top-1/2 right-4 transform -translate-y-1/2 h-4 w-4 cursor-pointer hover:scale-105 transition-transform"
          />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
