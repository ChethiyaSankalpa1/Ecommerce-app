import React from 'react';

const NewsLetterBox = () => {
  const onSubmitHandler = (event) => {
    event.preventDefault();
    // Add subscription logic here
  };

  return (
    <div className="w-full flex justify-center py-10 px-4">
      <div className="p-6 sm:p-10 rounded-2xl shadow-lg text-center w-full max-w-xl">
        {/* Heading */}
        <h2 className="text-2xl sm:text-3xl text-orange-600 font-semibold">
          Subscribe & Get 20% Off
        </h2>

        {/* Subheading */}
        <p className="text-gray-700 text-sm sm:text-base mt-2">
          Join our newsletter to get the latest updates, deals & more!
        </p>

        {/* Form */}
        <form
          onSubmit={onSubmitHandler}
          className="mt-6 flex flex-col sm:flex-row gap-3 items-center justify-center"
        >
          <input
            type="email"
            placeholder="Your email"
            required
            className="w-full sm:w-auto flex-1 p-3 text-sm border border-orange-200 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          <button
            type="submit"
            className="px-6 py-3 text-sm bg-orange-500 text-white rounded-md hover:bg-orange-600 transition duration-300"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewsLetterBox;
