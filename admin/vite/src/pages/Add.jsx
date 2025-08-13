import React, { useState, useEffect } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { backendUrl } from "../App";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Add = ({ token: propToken }) => {
  const [token, setToken] = useState(propToken || localStorage.getItem("token"));
  const [images, setImages] = useState([null, null, null, null]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Men");
  const [subcategory, setSubcategory] = useState("topwear");
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [bestseller, setBestseller] = useState(false);

  useEffect(() => {
    if (propToken) setToken(propToken);
  }, [propToken]);

  const handleImageChange = (index, file) => {
    const updated = [...images];
    updated[index] = file;
    setImages(updated);
  };

  const toggleSize = (size) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      toast.error("❌ Not authorised. Please login first.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subcategory);
      formData.append("size", JSON.stringify(selectedSizes));
      formData.append("bestseller", bestseller.toString());

      images.forEach((img, idx) => {
        if (img) formData.append(`image${idx + 1}`, img);
      });

      const response = await axios.post(`${backendUrl}/api/product/add`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.success) {
        toast.success("✅ Product was added successfully!");

        // Instantly clear form without shrinking layout
        setImages([assets.upload_area, assets.upload_area, assets.upload_area, assets.upload_area]);
        setName("");
        setDescription("");
        setPrice("");
        setCategory("Men");
        setSubcategory("topwear");
        setSelectedSizes([]);
        setBestseller(false);

      } else {
        toast.error(`❌ Failed: ${response.data.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(`❌ Error: ${error.response?.data?.message || "Product not added"}`);
    }
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <form
        onSubmit={handleSubmit}
        className="max-w-xl mx-auto p-6 bg-white rounded shadow space-y-6"
      >
        {/* Images Upload */}
        <div>
          <p className="text-base font-semibold mb-2">Upload Images</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {images.map((img, i) => (
              <label
                key={i}
                htmlFor={`image${i}`}
                className="cursor-pointer block rounded-md border border-gray-300 overflow-hidden hover:ring-2 hover:ring-orange-400"
              >
                <img
                  src={typeof img === "string" ? img : img ? URL.createObjectURL(img) : assets.upload_area}
                  alt={`Upload ${i + 1}`}
                  className="w-full h-28 object-cover"
                />
                <input
                  type="file"
                  id={`image${i}`}
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => handleImageChange(i, e.target.files[0])}
                />
              </label>
            ))}
          </div>
        </div>

        {/* Name */}
        <div>
          <label className="block mb-1 font-medium">Product Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Type here"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-orange-400"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block mb-1 font-medium">Product Description</label>
          <textarea
            rows="3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Type here"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-orange-400"
            required
          />
        </div>

        {/* Price */}
        <div>
          <label className="block mb-1 font-medium">Price</label>
          <input
            type="number"
            min="0"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Enter price"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-orange-400"
            required
          />
        </div>

        {/* Category & Subcategory */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-orange-400"
            >
              <option>Men</option>
              <option>Women</option>
              <option>Kids</option>
            </select>
          </div>
          <div>
            <label className="block mb-1 font-medium">Subcategory</label>
            <select
              value={subcategory}
              onChange={(e) => setSubcategory(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-orange-400"
            >
              <option>Topwear</option>
              <option>Bottomwear</option>
              <option>Winterwear</option>
            </select>
          </div>
        </div>

        {/* Sizes */}
        <div>
          <p className="mb-2 font-medium">Sizes</p>
          <div className="flex gap-3 flex-wrap">
            {["S", "M", "L", "XL", "XXL"].map((size) => (
              <label
                key={size}
                className={`cursor-pointer px-3 py-1 border rounded-md select-none
                ${
                  selectedSizes.includes(size)
                    ? "bg-orange-500 text-white border-orange-500"
                    : "bg-white text-gray-700 border-gray-300"
                }
                hover:bg-orange-400 hover:text-white transition`}
              >
                <input
                  type="checkbox"
                  checked={selectedSizes.includes(size)}
                  onChange={() => toggleSize(size)}
                  className="hidden"
                />
                {size}
              </label>
            ))}
          </div>
        </div>

        {/* Bestseller */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={bestseller}
            onChange={() => setBestseller(!bestseller)}
            id="bestseller"
            className="w-4 h-4"
          />
          <label htmlFor="bestseller" className="font-medium cursor-pointer">
            Bestseller
          </label>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full py-3 bg-orange-500 text-white font-semibold rounded-md hover:bg-orange-600 transition"
        >
          Add Product
        </button>
      </form>
    </>
  );
};

export default Add;
