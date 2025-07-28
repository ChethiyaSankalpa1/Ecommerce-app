import React, { useState, useContext } from 'react';
import { assets } from '../assets/assets';
import { NavLink } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

const Navbar = () => {
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  const { setShowSearch } = useContext(ShopContext);

  const toggleDropdown = () => {
    setShowProfileDropdown(!showProfileDropdown);
  };

  return (
    <div className='flex items-center justify-between py-5 font-medium'>
      {/* Logo */}
      <NavLink to='/'><img src={assets.logo} className='w-36' alt="logo" /></NavLink>

      {/* Desktop Navigation */}
      <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
        {['/', '/collection', '/about', '/contact'].map((path, index) => {
          const labels = ['HOME', 'COLLECTION', 'ABOUT', 'CONTACT'];
          return (
            <NavLink key={index} to={path} className='flex flex-col items-center gap-1'>
              <p>{labels[index]}</p>
              <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
            </NavLink>
          );
        })}
      </ul>

      {/* Right Icons */}
      <div className='flex items-center gap-6'>
        {/* Search Icon */}
        <img onClick={() => setShowSearch(true)} src={assets.search_icon} className='w-6 h-6 cursor-pointer' alt="search" />

        {/* Profile Dropdown */}
        <div className='relative'>
          <img
            src={assets.profile_icon}
            className='w-6 h-6 cursor-pointer'
            alt="profile"
            onClick={toggleDropdown}
          />
          {showProfileDropdown && (
            <div className='absolute top-8 right-0 bg-white shadow-lg rounded-lg p-4 w-48 z-50'>
              <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded-lg'>
                <p className='cursor-pointer hover:text-black'>My Profile</p>
                <p className='cursor-pointer hover:text-black'>Settings</p>
                <p className='cursor-pointer hover:text-black'>Logout</p>
              </div>
            </div>
          )}
        </div>

        {/* Cart Icon */}
        <NavLink to='/cart' className='relative'>
          <img src={assets.cart_icon} className='w-5 h-5 cursor-pointer' alt="cart" />
          <p className='absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center'>0</p>
        </NavLink>

        {/* Mobile Hamburger */}
        <img
          onClick={() => setShowSidebar(true)}
          src={assets.menu_icon}
          className='w-6 h-6 cursor-pointer sm:hidden'
          alt="menu"
        />
      </div>

      {/* Mobile Sidebar */}
      <div className={`fixed top-0 right-0 w-64 h-full bg-white shadow-lg transition-transform ${showSidebar ? 'translate-x-0' : 'translate-x-full'} sm:hidden`}>
        <div className='flex flex-col items-start text-gray-600'>
          <div onClick={() => setShowSidebar(false)} className='flex items-center gap-4 p-4'>
            <img className='h-4 rotate-180' src={assets.dropdown_icon} alt="back" />
            <p>Back</p>
          </div>
          <ul className='flex flex-col items-start p-5 gap-4 text-gray-700'>
            <NavLink to='/' onClick={() => setShowSidebar(false)} className={({ isActive }) => `w-full ${isActive ? 'text-black font-semibold' : ''}`}>HOME</NavLink>
            <NavLink to='/collection' onClick={() => setShowSidebar(false)} className={({ isActive }) => `w-full ${isActive ? 'text-black font-semibold' : ''}`}>COLLECTION</NavLink>
            <NavLink to='/about' onClick={() => setShowSidebar(false)} className={({ isActive }) => `w-full ${isActive ? 'text-black font-semibold' : ''}`}>ABOUT</NavLink>
            <NavLink to='/contact' onClick={() => setShowSidebar(false)} className={({ isActive }) => `w-full ${isActive ? 'text-black font-semibold' : ''}`}>CONTACT</NavLink>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
