import React, { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ShopContext = createContext();

const ShopProvider = ({ children }) => {
  const currency = "Rs";
  const delivery_fee = 300;
  const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState("");

  // Add item to cart
  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error("Please select a size before adding to cart.");
      return;
    }

    let cartData = structuredClone(cartItems);

    if (!cartData[itemId]) {
      cartData[itemId] = {};
    }

    if (cartData[itemId][size]) {
      cartData[itemId][size] += 1;
    } else {
      cartData[itemId][size] = 1;
    }

    setCartItems(cartData);
    toast.success("Added to cart!");

    if (token) {
      try {
        await axios.post(
          `${backendUrl}/api/cart/add`,
          { itemId, size },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } catch (error) {
        console.error(error);
        toast.error(error.response?.data?.message || "Failed to sync cart.");
      }
    }
  };

  // Update quantity for an item-size — fixed to sync with backend
  const updateQuantity = async (itemId, size, quantity) => {
    try {
      let cartData = structuredClone(cartItems);

      if (quantity === 0) {
        if (cartData[itemId]) {
          delete cartData[itemId][size];
          if (Object.keys(cartData[itemId]).length === 0) {
            delete cartData[itemId];
          }
        }
      } else {
        if (!cartData[itemId]) cartData[itemId] = {};
        cartData[itemId][size] = quantity;
      }

      setCartItems(cartData);

      if (token) {
        const response = await axios.post(
          `${backendUrl}/api/cart/update`,
          { itemId, size, quantity },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (response.data.cartData) {
          setCartItems(response.data.cartData);
        }
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to update cart.");
    }
  };

  // Calculate total number of items in cart
  const getCartCount = () => {
    let totalCount = 0;
    for (const itemId in cartItems) {
      for (const size in cartItems[itemId]) {
        totalCount += cartItems[itemId][size];
      }
    }
    return totalCount;
  };

  // Calculate total price for all items in cart
  const getCartAmount = () => {
    let totalAmount = 0;
    for (const itemId in cartItems) {
      let product = products.find((p) => p._id === itemId);
      if (!product) continue;
      for (const size in cartItems[itemId]) {
        totalAmount += product.price * cartItems[itemId][size];
      }
    }
    return totalAmount;
  };

  // Alias for compatibility with components expecting getTotalCartAmount
  const getTotalCartAmount = getCartAmount;

  // Fetch products data from backend
  const getProductData = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`);
      if (response.data && Array.isArray(response.data.products)) {
        setProducts(response.data.products);
      } else {
        setProducts([]);
        toast.info("No products found.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch product data.");
    }
  };

  // Fetch user's cart from backend on token set
  const fetchUserCart = async () => {
    if (!token) return;
    try {
      const response = await axios.post(
        `${backendUrl}/api/cart/get`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.data.cartData) {
        setCartItems(response.data.cartData);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getProductData();
  }, []);

  useEffect(() => {
    if (!token && localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
    }
  }, []);

  useEffect(() => {
    fetchUserCart();
  }, [token]);

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    setCartItems,         // <-- This was missing, now fixed here
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    getTotalCartAmount,
    navigate,
    backendUrl,
    setToken,
    token,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopProvider;
