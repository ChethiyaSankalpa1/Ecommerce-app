import React, { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets' // Ensure star_icon and star_dull_icon exist here

const Product = () => {
  const { productId } = useParams()
  const { products, currency } = useContext(ShopContext)

  const [productData, setProductData] = useState(null)
  const [image, setImage] = useState('')
  const [size, setSize] = useState('')
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('description') // Tabs: 'description' or 'reviews'

  useEffect(() => {
    if (!products || products.length === 0) {
      setLoading(true)
      return
    }

    setLoading(false)

    const found = products.find(item => String(item._id) === String(productId))
    if (found) {
      setProductData(found)
      setImage(found.image?.[0] || '')
      if (found.sizes && found.sizes.length > 0) setSize(found.sizes[0])
    } else {
      setProductData(null)
    }
  }, [productId, products])

  if (loading) {
    return (
      <div className="text-center py-20 text-gray-600 text-xl">
        Loading product...
      </div>
    )
  }

  if (!productData) {
    return (
      <div className="text-center py-20 text-gray-600 text-xl">
        Product not found.
      </div>
    )
  }

  return (
    <div className="border-t pt-10 px-4 sm:px-10 max-w-screen-xl mx-auto">
      <div className="flex flex-col sm:flex-row gap-10">
        {/* Left column: Images + tabs */}
        <div className="flex-1 flex flex-col gap-6">
          {/* Images */}
          <div className="flex flex-col-reverse sm:flex-row gap-4">
            <div className="flex sm:flex-col gap-2">
              {productData.image.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  onClick={() => setImage(img)}
                  className="w-20 h-20 object-cover border cursor-pointer hover:opacity-80"
                  alt={`Thumbnail ${index}`}
                />
              ))}
            </div>
            <div className="w-full sm:w-[80%]">
              <img src={image} alt={productData.name} className="w-full h-auto rounded" />
            </div>
          </div>

          {/* Tabs for Description & Reviews */}
          <div className="mt-8 border-t pt-6">
            <div className="flex border-b">
              <button
                type="button"
                className={`px-4 py-2 font-medium focus:outline-none ${
                  activeTab === 'description'
                    ? 'text-orange-500 border-b-2 border-orange-500'
                    : 'text-gray-600 hover:text-orange-500'
                }`}
                onClick={() => setActiveTab('description')}
              >
                Description
              </button>
              <button
                type="button"
                className={`px-4 py-2 font-medium focus:outline-none ${
                  activeTab === 'reviews'
                    ? 'text-orange-500 border-b-2 border-orange-500'
                    : 'text-gray-600 hover:text-orange-500'
                }`}
                onClick={() => setActiveTab('reviews')}
              >
                Reviews (122)
              </button>
            </div>

            <div className="py-4 text-gray-700">
              {activeTab === 'description' ? (
                <>
                  <p className="mb-4">
                    An e-commerce website is an online platform that facilitates the buying and selling of products or services over the internet. It serves as a virtual marketplace where businesses and individuals can showcase their products, interact with customers, and complete transactions without the need for a physical presence. E-commerce websites have gained immense popularity due to their convenience, accessibility, and the global reach they offer.
                  </p>
                  <p>
                    E-commerce websites typically display products or services along with detailed descriptions, images, prices, and any available variations (e.g., sizes, colors). Each product usually has its own dedicated page with relevant information.
                  </p>
                </>
              ) : (
                <p>Reviews section will be displayed here.</p>
              )}
            </div>
          </div>
        </div>

        {/* Right column: Product info */}
        <div className="flex-1 space-y-4">
          <h1 className="text-3xl font-semibold">{productData.name}</h1>

          {/* Star Ratings */}
          <div className="flex items-center gap-1">
            {[...Array(4)].map((_, i) => (
              <img key={i} src={assets.star_icon} alt="Star" className="w-4 h-4" />
            ))}
            <img src={assets.star_dull_icon} alt="Star" className="w-4 h-4" />
            <span className="text-sm text-gray-500 pl-2">(122 reviews)</span>
          </div>

          <p className="text-2xl font-bold">
            {currency} {productData.price}
          </p>
          <p className="text-gray-600">{productData.description}</p>

          {/* Size selection */}
          <div className="mt-4">
            <p className="font-medium mb-2">Select Size:</p>
            <div className="flex gap-2">
              {productData.sizes.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setSize(item)}
                  className={`border px-4 py-2 rounded ${
                    item === size ? 'border-orange-500 bg-orange-100' : 'bg-gray-100'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {/* Add to Cart */}
          <button className="mt-6 bg-orange-500 text-white px-6 py-3 rounded hover:bg-orange-600 transition">
            ADD TO CART
          </button>

          {/* Additional Info */}
          <div className="mt-6 p-4 bg-gray-50 rounded space-y-2">
            <p className="text-sm font-medium">✔️ 100% Original product.</p>
            <p className="text-sm font-medium">✔️ Cash on delivery is available on this product.</p>
            <p className="text-sm font-medium">✔️ Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Product
