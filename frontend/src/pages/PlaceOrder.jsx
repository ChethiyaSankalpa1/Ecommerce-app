import React, { useState } from 'react';
import Title from '../components/Title';
import CartTotal from '../components/CartTotal';
import { useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';

const PlaceOrder = () => {
  const [method, setMethod] = useState('cod');
  const navigate = useNavigate();

  const inputStyle =
    'border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 transition';

  return (
    <div className="bg-gray-100 py-6 px-4 sm:px-6 lg:px-16 min-h-screen text-sm">
      {/* FIXED: Changed from grid to flex for better horizontal alignment */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-6 items-start">
        {/* 📦 Delivery Info */}
        <div className="w-full md:w-1/2">
          <div className="text-4xl font-bold uppercase mb-4">
            <Title text1="DELIVERY" text2=" INFORMATION" />
          </div>
          <form className="space-y-3 bg-white p-5 rounded-lg shadow-sm">
            {/* First + Last Name */}
            <div className="grid grid-cols-2 gap-3">
              <input className={inputStyle} type="text" placeholder="First Name" required />
              <input className={inputStyle} type="text" placeholder="Last Name" required />
            </div>

            {/* Email */}
            <input className={`${inputStyle} w-full`} type="email" placeholder="Email Address" required />

            {/* Street Address */}
            <input className={`${inputStyle} w-full`} type="text" placeholder="Street Address" required />

            {/* City + State */}
            <div className="grid grid-cols-2 gap-3">
              <input className={inputStyle} type="text" placeholder="City" required />
              <input className={inputStyle} type="text" placeholder="State" required />
            </div>

            {/* Zip + Country */}
            <div className="grid grid-cols-2 gap-3">
              <input className={inputStyle} type="text" placeholder="Zip Code" required />
              <input className={inputStyle} type="text" placeholder="Country" required />
            </div>

            {/* Phone Number */}
            <input className={`${inputStyle} w-full`} type="text" placeholder="Phone Number" required />
          </form>
        </div>

        {/* 💳 Cart + Payment */}
        <div className="w-full md:w-1/2 space-y-6">
          <CartTotal />

          {/* 💳 Payment Options */}
          <div className="bg-white p-5 rounded-lg shadow-sm">
            <Title text1="PAYMENT" text2=" METHOD" />
            <div className="grid grid-cols-3 gap-3 mt-4 text-sm">
              {/* Stripe */}
              <div
                onClick={() => setMethod('stripe')}
                className={`relative cursor-pointer flex flex-col items-center justify-center border rounded-md p-2.5 transition ${
                  method === 'stripe'
                    ? 'border-green-500 bg-green-50 shadow-sm'
                    : 'border-gray-300 hover:border-green-400 hover:bg-green-50'
                }`}
              >
                {method === 'stripe' && (
                  <span className="absolute top-2 left-2 w-2.5 h-2.5 rounded-full bg-green-500" />
                )}
                <img src={assets.stripe_logo} alt="Stripe" className="w-12 h-auto mb-1" />
              </div>

              {/* Razorpay */}
              <div
                onClick={() => setMethod('razor')}
                className={`relative cursor-pointer flex flex-col items-center justify-center border rounded-md p-2.5 transition ${
                  method === 'razor'
                    ? 'border-green-500 bg-green-50 shadow-sm'
                    : 'border-gray-300 hover:border-green-400 hover:bg-green-50'
                }`}
              >
                {method === 'razor' && (
                  <span className="absolute top-2 left-2 w-2.5 h-2.5 rounded-full bg-green-500" />
                )}
                <img src={assets.razorpay_logo} alt="Razorpay" className="w-12 h-auto mb-1" />
              </div>

              {/* COD */}
              <div
                onClick={() => setMethod('cod')}
                className={`relative cursor-pointer flex items-center justify-center border rounded-md p-2.5 transition ${
                  method === 'cod'
                    ? 'border-green-500 bg-green-50 shadow-sm'
                    : 'border-gray-300 hover:border-green-400 hover:bg-green-50'
                }`}
              >
                {method === 'cod' && (
                  <span className="absolute top-2 left-2 w-2.5 h-2.5 rounded-full bg-green-500" />
                )}
                <p className="text-xs text-gray-700 font-medium text-center">Cash on Delivery</p>
              </div>
            </div>
          </div>

          {/* 🟠 Place Order Button */}
          <button
            onClick={() => navigate('/Orders')}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2.5 rounded-md shadow font-semibold text-sm transition"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
