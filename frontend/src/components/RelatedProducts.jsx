import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';

const RelatedProducts = ({ category, subCategory }) => {
  const { products } = useContext(ShopContext);
  const [related, setRelated] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (products.length > 0 && category && subCategory) {
      const filtered = products.filter(
        (item) => item.category === category && item.subCategory === subCategory
      );
      setRelated(filtered.slice(0, 5));
    }
  }, [products, category, subCategory]);

  const handleProductClick = (id) => {
    const currentPath = window.location.pathname;
    const newPath = `/product/${id}`;

    if (currentPath === newPath) {
      // If already on same product, reload manually
      window.location.reload();
    } else {
      navigate(newPath);
    }
  };

  const handleKeyDown = (event, id) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleProductClick(id);
    }
  };

  return (
    <div className="my-24">
      <div className="text-center text-4xl font-extrabold py-2">
        <Title text1="Related" text2=" Products" />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 px-4 md:px-8">
        {related.map((item) => (
          <div
            key={item._id}
            className="cursor-pointer"
            role="button"
            tabIndex={0}
            onClick={() => handleProductClick(item._id)}
            onKeyDown={(e) => handleKeyDown(e, item._id)}
          >
            <ProductItem
              id={item._id}
              image={item.image}
              name={item.name}
              price={item.price}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
