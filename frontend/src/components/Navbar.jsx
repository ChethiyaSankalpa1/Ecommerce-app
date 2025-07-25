import React, { useState } from 'react'
import { assets } from '../assets/assets'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  // State for profile dropdown
  const [showProfileDropdown, setShowProfileDropdown] = useState(false)

  // State for mobile sidebar
  const [showSidebar, setShowSidebar] = useState(false)

  // Toggle profile dropdown on click
  const toggleDropdown = () => {
    setShowProfileDropdown(!showProfileDropdown)
  }

  return (
    <div className='flex items-center justify-between py-5 font-medium'>

      {/* Logo */}
      <img src={assets.logo} className='w-36' alt="logo" />

      {/* Desktop Navigation Links */}
      <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
        <NavLink to='/' className='flex flex-col items-center gap-1'>
          <p>HOME</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>
        <NavLink to='/collection' className='flex flex-col items-center gap-1'>
          <p>COLLECTION</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>
        <NavLink to='/about' className='flex flex-col items-center gap-1'>
          <p>ABOUT</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>
        <NavLink to='/contact' className='flex flex-col items-center gap-1'>
          <p>CONTACT</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>
      </ul>

      {/* Right Icons */}
      <div className='flex items-center gap-6'>
        {/* Search Icon */}
        <img src={assets.search_icon} className='w-6 h-6 cursor-pointer' alt="search" />

        {/* Profile Icon with dropdown */}
        <div className='relative'>
          <img
            src={assets.profile_icon}
            className='w-6 h-6 cursor-pointer'
            alt="profile"
            onClick={toggleDropdown} // toggle profile menu on click
          />

          {/* Profile Dropdown (visible only when showProfileDropdown is true) */}
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

        {/* Hamburger menu for small screens */}
        <img
          onClick={() => setShowSidebar(true)} // open sidebar
          src={assets.menu_icon}
          className='w-6 h-6 cursor-pointer sm:hidden'
          alt="menu"
        />
      </div>

      {/* Sidebar menu for mobile view */}
      <div className={`fixed top-0 right-0 w-64 h-full bg-white shadow-lg transition-transform ${showSidebar ? 'translate-x-0' : 'translate-x-full'} sm:hidden`}>
        {/* Close button */}
        <div className='flex flex-col items-start text-gray-600'>
          <div onClick={() => setShowSidebar(false)} className='flex items-center gap-4 p-4'>
            <img className='h-4 rotate-180' src={assets.dropdown_icon} alt="back" />
            <p>Back</p>
          </div>

          {/* Sidebar Links */}
          <ul className='flex flex-col items-start p-5 gap-4 text-gray-700'>
            <NavLink to='/' onClick={() => setVisible(false)} className='w-full'>HOME</NavLink>
            <NavLink to='/collection' onClick={() => setVisible(false)} className='w-full'>COLLECTION</NavLink>
            <NavLink to='/about' onClick={() => setVisible(false)} className='w-full'>ABOUT</NavLink>
            <NavLink to='/contact' onClick={() => setVisible(false)} className='w-full'>CONTACT</NavLink>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Navbar
