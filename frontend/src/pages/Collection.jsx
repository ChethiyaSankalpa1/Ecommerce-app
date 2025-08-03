import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import ProductItem from '../components/ProductItem';
import { assets } from '../assets/assets';

const Collection = () => {
  const { products, search, showsearch } = useContext(ShopContext);

  // State for UI controls
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortBy, setSortBy] = useState('relevant');

  // Toggle a category in the filter
  const toggleCategory = (e) => {
    const value = e.target.value;
    setCategory((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  // Toggle a sub-category in the filter
  const toggleSubCategory = (e) => {
    const value = e.target.value;
    setSubCategory((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  // Initial load: Set all products
  useEffect(() => {
    setFilterProducts(products);
  }, [products]);

  // Main filter and sorting logic
  useEffect(() => {
    let filtered = products;

    // Search filter
    if (search.trim() !== '') {
      const keyword = search.toLowerCase();
      filtered = filtered.filter((item) =>
        item.name?.toLowerCase().includes(keyword)
      );
    }

    // Category filter
    if (category.length > 0) {
      filtered = filtered.filter((item) =>
        category.includes(item.category?.toLowerCase())
      );
    }

    // Sub-category filter
    if (subCategory.length > 0) {
      filtered = filtered.filter((item) =>
        subCategory.includes(item.subCategory?.toLowerCase())
      );
    }

    // Sorting logic
    if (sortBy === 'low-high') {
      filtered = [...filtered].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'high-low') {
      filtered = [...filtered].sort((a, b) => b.price - a.price);
    }

    setFilterProducts(filtered);
  }, [search, category, subCategory, sortBy, products]);

  return (
    <div className="flex flex-col sm:flex-row gap-6 pt-10 px-4 sm:px-[5vw] border-t">
      
      {/* Sidebar Filter Section */}
      <div className="min-w-[200px]">
        <p
          onClick={() => setShowFilter(!showFilter)}
          className="my-2 text-xl flex items-center cursor-pointer gap-2"
        >
          Filters:
          <img
            className={`h-3 sm:hidden transition-transform ${showFilter ? 'rotate-90' : ''}`}
            src={assets.dropdown_icon}
            alt="toggle"
          />
        </p>

        {/* Category Checkboxes */}
        <div className={`border border-gray-300 pl-5 py-3 mt-4 rounded-lg ${showFilter ? '' : 'hidden sm:block'}`}>
          <p className="text-lg font-semibold">CATEGORIES</p>
          <div className="flex flex-col gap-2 mt-3 text-gray-600">
            {['MEN', 'WOMEN', 'KIDS'].map((cat, i) => (
              <label key={i} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="w-3 h-3"
                  value={cat.toLowerCase()}
                  onChange={toggleCategory}
                />
                {cat}
              </label>
            ))}
          </div>
        </div>

        {/* Sub-Category Checkboxes */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 rounded-lg ${showFilter ? '' : 'hidden sm:block'}`}>
          <p className="text-lg font-semibold">TYPE</p>
          <div className="flex flex-col gap-2 mt-3 text-gray-600">
            {['TOP WEAR', 'BOTTOM WEAR', 'WINTER WEAR'].map((type, i) => (
              <label key={i} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="w-3 h-3"
                  value={type.toLowerCase().replace(/\s/g, '')}
                  onChange={toggleSubCategory}
                />
                {type}
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Product Display Section */}
      <div className="flex-1">
        {/* Title & Sort Dropdown */}
        <div className="mb-6">
          <div className="text-4xl font-bold uppercase mb-8">
            All Collection
          </div>

          <select
            className="border border-gray-300 rounded-lg px-3 py-2 text-gray-600"
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="relevant">Sort by Relevant</option>
            <option value="low-high">Sort by Low to High</option>
            <option value="high-low">Sort by High to Low</option>
          </select>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {filterProducts.length > 0 ? (
            filterProducts.map((item) => (
              <div key={item._id} className="p-4 border rounded-xl hover:shadow-md transition-all duration-300">
                <ProductItem
                  id={item._id}
                  name={item.name}
                  price={item.price}
                  image={item.image}
                />
              </div>
            ))
          ) : (
            <p className="text-gray-500 col-span-full text-center">No products found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Collection;
