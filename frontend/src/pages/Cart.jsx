import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, navigate } =
    useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    const tempData = [];

    for (const itemId in cartItems) {
      for (const size in cartItems[itemId]) {
        if (cartItems[itemId][size] > 0) {
          tempData.push({
            _id: itemId,
            size,
            quantity: cartItems[itemId][size],
          });
        }
      }
    }

    setCartData(tempData);
  }, [cartItems]);

  return (
    <div className="border-t pt-10 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto bg-gray-100 min-h-screen">
      {/* 🔖 Page Title */}
      <div className="mb-10 text-center">
        <Title
          text1="YOUR"
          text2=" CART"
          className="text-4xl sm:text-5xl font-extrabold text-gray-900"
        />
      </div>

      {cartData.length === 0 ? (
        <div className="flex justify-center items-center h-60">
          <p className="text-lg text-gray-500 select-none">
            🛒 Your cart is empty.
          </p>
        </div>
      ) : (
        <>
          <div className="space-y-6">
            {cartData.map((item, index) => {
              const product = products.find((p) => p._id === item._id);
              if (!product) return null;

              return (
                <div
                  key={index}
                  className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6"
                >
                  <img
                    src={product.image[0]}
                    alt={product.name}
                    className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-md"
                  />

                  <div className="flex-1 w-full">
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">
                      {product.name}
                    </h3>

                    <div className="flex flex-wrap items-center gap-4 text-gray-600 text-sm mb-3">
                      <p>
                        Price:{" "}
                        <span className="text-gray-900 font-medium">
                          {currency}
                          {product.price}
                        </span>
                      </p>
                      <p>
                        Size:{" "}
                        <span className="inline-block px-2 py-1 border border-gray-300 rounded text-gray-900 bg-gray-100">
                          {item.size}
                        </span>
                      </p>
                    </div>

                    <div className="flex items-center gap-4">
                      <label
                        htmlFor={`qty-${index}`}
                        className="text-sm text-gray-600 font-medium"
                      >
                        Qty:
                      </label>
                      <input
                        id={`qty-${index}`}
                        type="number"
                        min={1}
                        className="w-20 border border-gray-300 rounded-md px-3 py-1.5 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400"
                        value={item.quantity}
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          if (val > 0) updateQuantity(item._id, item.size, val);
                        }}
                      />
                    </div>
                  </div>

                  <button
                    onClick={() => updateQuantity(item._id, item.size, 0)}
                    className="p-2 hover:bg-red-50 rounded-full transition"
                    title="Remove item"
                  >
                    <img
                      src={assets.bin_icon}
                      alt="Delete"
                      className="w-6 h-6"
                    />
                  </button>
                </div>
              );
            })}
          </div>

          <div className="mt-12 space-y-6">
            <CartTotal />

            <div className="flex justify-center sm:justify-end">
              <button
                onClick={() => {
                  navigate("/PlaceOrder");
                  window.scrollTo(0, 0); // ✅ Reload-like scroll
                }}
                className="w-full sm:w-auto bg-orange-500 text-white font-semibold px-6 py-3 rounded-md shadow-md hover:bg-orange-600 hover:shadow-lg transition duration-200"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
