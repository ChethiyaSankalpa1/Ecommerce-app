// src/components/ProductItem.jsx
import React, { useContext } from 'react'; // Import React and useContext hook
import { ShopContext } from '../context/ShopContext'; // Import shared context for currency etc.
import { Link } from 'react-router-dom'; // Link component for navigation

// Reusable product item card
const ProductItem = ({ id, image, name, price }) => {
  // Get currency symbol (like Rs, $, etc.) from context
  const { currency } = useContext(ShopContext);

  return (
    // Clicking on the card navigates to the product details page using dynamic ID
    <Link className='text-gray-700 cursor-pointer' to={`/product/${id}`}>
      {/* Image container with hover zoom effect */}
      <div className='overflow-hidden'>
        <img
          className='hover:scale-110 transition ease-in-out duration-300' // Zoom image on hover
          src={image[0]} // Show first image of the product
          alt={name}
        />
      </div>

      {/* Product name */}
      <p className='pt-3 pb-1 text-sm'>{name}</p>

      {/* Product price with currency symbol */}
      <p className='text-sm font-medium'>
        {currency} {price}
      </p>
    </Link>
  );
};

export default ProductItem;
