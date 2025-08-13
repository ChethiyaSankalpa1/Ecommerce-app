import React from 'react';
import { assets } from '../assets/assets';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';  // <-- add this import

const Navbar = ({ setToken }) => {
  const navigate = useNavigate();  // <-- add this line

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken('');
    toast.success('Logged out successfully!');
    navigate('/login');  // <-- add this line to redirect
  };

  return (
    <header className="w-full flex items-center px-6 py-3 bg-white shadow sticky top-0 z-50">
      <img
        className="h-16 w-auto cursor-pointer transition-transform duration-200 hover:scale-105"
        src={assets.logo}
        alt="Logo"
      />
      <button
        onClick={handleLogout}
        className="ml-auto bg-orange-600 text-white px-6 py-2 rounded-full text-sm hover:bg-orange-700 transition"
      >
        Logout
      </button>
    </header>
  );
};

export default Navbar;
