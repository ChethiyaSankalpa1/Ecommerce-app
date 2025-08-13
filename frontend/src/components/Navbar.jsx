import React, { useState, useContext, useEffect } from "react";
import { assets } from "../assets/assets";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const Navbar = () => {
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  const {
    setShowSearch,
    getCartCount,
    setToken,
    setCartItems,
    token,
  } = useContext(ShopContext);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setShowProfileDropdown(false);
  }, [location.pathname]);

  const toggleDropdown = () => {
    setShowProfileDropdown(!showProfileDropdown);
  };

  const handleLogout = () => {
    navigate("/login");
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});
  };

  return (
    <div className="flex items-center justify-between py-5 font-medium">
      {/* Logo */}
      <NavLink to="/">
        <img src={assets.logo} className="w-36" alt="logo" />
      </NavLink>

      {/* Desktop Navigation */}
      <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
        {["/", "/collection", "/about", "/contact"].map((path, index) => {
          const labels = ["HOME", "COLLECTION", "ABOUT", "CONTACT"];
          return (
            <NavLink
              key={index}
              to={path}
              className="flex flex-col items-center gap-1"
            >
              <p>{labels[index]}</p>
              <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
            </NavLink>
          );
        })}
      </ul>

      {/* Right Icons */}
      <div className="flex items-center gap-6">
        {/* Search Icon */}
        <img
          onClick={() => setShowSearch(true)}
          src={assets.search_icon}
          className="w-6 h-6 cursor-pointer"
          alt="search"
        />

        {/* Profile Dropdown */}
        <div className="relative">
          <img
            src={assets.profile_icon}
            className="w-6 h-6 cursor-pointer"
            alt="profile"
            onClick={() => {
              if (token) toggleDropdown();
              else navigate("/login");
            }}
          />
          {showProfileDropdown && (
            <div className="absolute top-10 right-0 bg-white shadow-xl rounded-xl p-2 w-48 z-50">
              <div className="flex flex-col gap-2 text-gray-700">
                <p
                  onClick={() => {
                    navigate("/profile");
                    setShowProfileDropdown(false);
                  }}
                  className="px-4 py-2 text-sm rounded-md hover:bg-gray-100 hover:text-black cursor-pointer"
                >
                  My Profile
                </p>
                <p
                  onClick={() => {
                    navigate("/orders");
                    setShowProfileDropdown(false);
                  }}
                  className="px-4 py-2 text-sm rounded-md hover:bg-gray-100 hover:text-black cursor-pointer"
                >
                  Orders
                </p>
                <p
                  onClick={handleLogout}
                  className="px-4 py-2 text-sm text-red-500 rounded-md hover:bg-red-100 hover:text-red-600 cursor-pointer"
                >
                  Logout
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Cart Icon */}
        <NavLink to="/cart" className="relative">
          <img
            src={assets.cart_icon}
            className="w-5 h-5 cursor-pointer"
            alt="cart"
          />
          {getCartCount() > 0 && (
            <p className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              {getCartCount()}
            </p>
          )}
        </NavLink>

        {/* Mobile Hamburger */}
        <img
          onClick={() => setShowSidebar(true)}
          src={assets.menu_icon}
          className="w-6 h-6 cursor-pointer sm:hidden"
          alt="menu"
        />
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 right-0 w-64 h-full bg-white shadow-lg transition-transform ${
          showSidebar ? "translate-x-0" : "translate-x-full"
        } sm:hidden`}
      >
        <div className="flex flex-col items-start text-gray-600">
          <div
            onClick={() => setShowSidebar(false)}
            className="flex items-center gap-4 p-4"
          >
            <img
              className="h-4 rotate-180"
              src={assets.dropdown_icon}
              alt="back"
            />
            <p>Back</p>
          </div>
          <ul className="flex flex-col items-start p-5 gap-4 text-gray-700">
            <NavLink
              to="/"
              onClick={() => setShowSidebar(false)}
              className={({ isActive }) =>
                `w-full ${isActive ? "text-black font-semibold" : ""}`
              }
            >
              HOME
            </NavLink>
            <NavLink
              to="/collection"
              onClick={() => setShowSidebar(false)}
              className={({ isActive }) =>
                `w-full ${isActive ? "text-black font-semibold" : ""}`
              }
            >
              COLLECTION
            </NavLink>
            <NavLink
              to="/about"
              onClick={() => setShowSidebar(false)}
              className={({ isActive }) =>
                `w-full ${isActive ? "text-black font-semibold" : ""}`
              }
            >
              ABOUT
            </NavLink>
            <NavLink
              to="/contact"
              onClick={() => setShowSidebar(false)}
              className={({ isActive }) =>
                `w-full ${isActive ? "text-black font-semibold" : ""}`
              }
            >
              CONTACT
            </NavLink>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
