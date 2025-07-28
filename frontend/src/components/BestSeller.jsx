import React, { useContext, useState, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';

const BestSeller = () => {
  const { products } = useContext(ShopContext);
  const [bestSellers, setBestSellers] = useState([]);

  useEffect(() => {
    if (products && products.length > 0) {
      // Filter products that have bestseller === true
      const best = products.filter(item => item.bestseller === true);
      setBestSellers(best.slice(0, 5)); // Show up to 5 best sellers
    }
  }, [products]);

  return (
    <div className="my-10">
      <div className="text-center py-8">
        <h2 className="text-3xl prata-regular">
          {/* Add space before Seller for spacing */}
          <Title text1="Best" text2=" Seller" />
        </h2>
        <p className="w-3/4 mx-auto text-xs sm:text-sm text-gray-600 mt-2">
          Discover our best-selling products carefully selected to bring you quality and style. Shop now to find your favorites!
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6 px-4">
        {bestSellers.map(product => (
          <ProductItem
            key={product._id}
            id={product._id}
            image={product.image}
            name={product.name}
            price={product.price}
          />
        ))}
      </div>
    </div>
  );
};

export default BestSeller;
