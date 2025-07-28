import React from 'react';

const NewsLetterBox = () => {
  const onSubmitHandler = (event) => {
    event.preventDefault();
    // Add subscription logic here
  }

  return (
    <div className="w-full flex justify-center py-16 px-4 bg-white">
      <div className="bg-white p-8 sm:p-12 rounded-xl shadow-md text-center w-full max-w-2xl">
        {/* Heading */}
        <h2 className="text-2xl sm:text-3xl text-gray-800 font-semibold prata-regular">
          Subscribe & Get 20% Off
        </h2>

        {/* Subheading */}
        <p className="text-gray-600 text-sm sm:text-base mt-3 leading-relaxed">
          Join our newsletter and stay updated with the latest offers, collections, and exclusive deals.
        </p>

        {/* Form */}
        <form onSubmit={onSubmitHandler} className="mt-6 flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            placeholder="Enter your email"
            required
            className="flex-1 p-3 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
          <button
            type="submit"
            className="px-5 py-3 text-sm bg-gray-800 text-white rounded-md hover:bg-gray-900 transition duration-300"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewsLetterBox;
