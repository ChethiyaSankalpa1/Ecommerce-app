import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Title from '../components/Title';
import CartTotal from '../components/CartTotal';
import { assets } from '../assets/assets';
import { ShopContext } from '../context/ShopContext';
import { toast } from 'react-toastify';

const PlaceOrder = () => {
  const navigate = useNavigate();
  const { cartItems, setCartItems, getCartAmount, products, backendUrl, token } = useContext(ShopContext);
  const [method, setMethod] = useState('cod');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: '',
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (!token) {
      toast.error("User not logged in");
      return;
    }

    try {
      let orderItems = [];

      for (const itemId in cartItems) {
        for (const size in cartItems[itemId]) {
          const itemInfo = products.find((p) => p._id === itemId);
          if (itemInfo) {
            orderItems.push({
              productId: itemInfo._id,
              name: itemInfo.name,
              quantity: cartItems[itemId][size],
              price: itemInfo.price,
              image: Array.isArray(itemInfo.image) ? itemInfo.image[0] : itemInfo.image,
              size: size,
            });
          }
        }
      }

      const orderData = {
        items: orderItems,
        amount: getCartAmount(),
        address: {
          street: formData.street,
          city: formData.city,
          state: formData.state,
          zipcode: formData.zipcode,
          country: formData.country,
          phone: formData.phone,
        },
        paymentMethod: method.toUpperCase(),
        payment: false,
        date: Date.now(),
      };

      const response = await axios.post(`${backendUrl}/api/order/place`, orderData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        toast.success("Order placed successfully!");
        setCartItems({});  // Clear cart only if this exists in context
        navigate('/orders');
      } else {
        toast.error(response.data.message || "Failed to place order");
      }
    } catch (error) {
      console.error("Order error response:", error.response?.data || error.message);
      toast.error("Something went wrong while placing the order");
    }
  };

  const inputStyle =
    'border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400 transition';

  return (
    <div className="bg-gray-100 py-6 px-4 sm:px-6 lg:px-16 min-h-screen text-sm">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-6 items-start">
        {/* Delivery Form */}
        <div className="w-full md:w-1/2">
          <div className="text-4xl font-bold uppercase mb-4">
            <Title text1="DELIVERY" text2=" INFORMATION" />
          </div>
          <form onSubmit={onSubmitHandler} className="space-y-3 bg-white p-5 rounded-lg shadow-sm">
            <div className="grid grid-cols-2 gap-3">
              <input
                className={inputStyle}
                type="text"
                placeholder="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={onChangeHandler}
                required
              />
              <input
                className={inputStyle}
                type="text"
                placeholder="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={onChangeHandler}
                required
              />
            </div>
            <input
              className={`${inputStyle} w-full`}
              type="email"
              placeholder="Email Address"
              name="email"
              value={formData.email}
              onChange={onChangeHandler}
              required
            />
            <input
              className={`${inputStyle} w-full`}
              type="text"
              placeholder="Street Address"
              name="street"
              value={formData.street}
              onChange={onChangeHandler}
              required
            />
            <div className="grid grid-cols-2 gap-3">
              <input
                className={inputStyle}
                type="text"
                placeholder="City"
                name="city"
                value={formData.city}
                onChange={onChangeHandler}
                required
              />
              <input
                className={inputStyle}
                type="text"
                placeholder="State"
                name="state"
                value={formData.state}
                onChange={onChangeHandler}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <input
                className={inputStyle}
                type="text"
                placeholder="Zip Code"
                name="zipcode"
                value={formData.zipcode}
                onChange={onChangeHandler}
                required
              />
              <input
                className={inputStyle}
                type="text"
                placeholder="Country"
                name="country"
                value={formData.country}
                onChange={onChangeHandler}
                required
              />
            </div>
            <input
              className={`${inputStyle} w-full`}
              type="text"
              placeholder="Phone Number"
              name="phone"
              value={formData.phone}
              onChange={onChangeHandler}
              required
            />
            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2.5 rounded-md shadow font-semibold text-sm transition"
            >
              Place Order
            </button>
          </form>
        </div>

        {/* Order Summary + Payment */}
        <div className="w-full md:w-1/2 space-y-6">
          <CartTotal />
          <div className="bg-white p-5 rounded-lg shadow-sm">
            <Title text1="PAYMENT" text2=" METHOD" />
            <div className="grid grid-cols-3 gap-3 mt-4 text-sm">
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
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
