import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';

const Orders = () => {
  const { products, currency } = useContext(ShopContext);

  return (
    <div className="min-h-screen bg-gray-100 py-6 px-4 sm:px-6 lg:px-16 text-sm">
      <div className="max-w-6xl mx-auto space-y-6">
        <Title text1="MY" text2=" ORDERS" />

        <div className="space-y-4">
          {products.slice(0, 3).map((item, index) => (
            <div key={index} className="bg-white p-4 rounded-md shadow flex flex-col md:flex-row justify-between items-center gap-4">
              {/* Image and Name */}
              <div className="flex items-center gap-4">
                <img src={item.image[0]} alt={item.name} className="w-20 h-20 object-cover rounded-md" />
                <div>
                  <p className="font-semibold text-gray-800">{item.name}</p>
                  <p className="text-gray-500">{currency}{item.price}</p>
                  <p className="text-gray-500">Quantity: 1</p>
                  <p className="text-gray-500">Size: M</p>
                </div>
              </div>

              {/* Order Info */}
              <div className="text-gray-600 text-sm text-right">
                <p>Date: <span className="font-medium">Aug 2, 2025</span></p>
                <p>Status: <span className="text-green-600 font-semibold">Ready to Ship</span></p>
              </div>

              {/* Track Button */}
              <button className="mt-2 md:mt-0 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md shadow text-sm">
                Track Order
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Orders;
