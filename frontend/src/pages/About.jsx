import React from 'react';
import { assets } from '../assets/assets';
import Title from '../components/Title';
import NewsLetterBox from '../components/NewsLatterBox';

const About = () => {
  return (
    <div className="px-6 md:px-[6vw] py-12 text-gray-800 font-sans">
      {/* About Title */}
      <div className="text-4xl font-bold uppercase mb-8">
        <Title text1="About" text2=" Us" />
      </div>

      {/* Image and Description */}
      <div className="mt-10 flex flex-col lg:flex-row items-center gap-10">
        <img
          src={assets.about_img}
          alt="About Us"
          className="w-full lg:w-[45%] rounded-xl shadow-lg object-cover"
        />
        <div className="w-full lg:w-[55%] space-y-6 text-base leading-relaxed">
          <p>
            At <strong>Cold Forever</strong>, we believe that fashion should be timeless, bold, and empowering. 
            Our collections are carefully curated to reflect the perfect blend of comfort, elegance, and modern design.
          </p>
          <p>
            Whether you're dressing up for a celebration or refreshing your daily wardrobe, Cold Forever 
            offers a wide variety of clothing designed for all seasons—especially for those who love to stay effortlessly stylish even when it’s chilly.
          </p>
          <div>
            <h3 className="text-2xl font-bold text-orange-500 mb-2">Our Mission</h3>
            <p>
              To redefine seasonal fashion by offering premium cold-weather apparel and accessories 
              that combine warmth with aesthetic appeal. We’re committed to sustainable sourcing and 
              creating a brand that stands for durability, confidence, and self-expression.
            </p>
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="mt-16">
        <div className="text-4xl font-bold uppercase mb-8">
          <Title text1="Why" text2=" Choose Us" />
        </div>
        <div className="mt-10 grid md:grid-cols-3 gap-8">
          {[
            {
              title: 'Premium Fabrics',
              text: 'Our garments are made from high-quality, ethically sourced materials designed for durability and comfort.',
            },
            {
              title: 'Inclusive Fashion',
              text: 'We offer a range of sizes and styles for all body types to help everyone feel confident in their outfit.',
            },
            {
              title: 'Eco-Conscious',
              text: 'Sustainability is at our core. We strive to minimize our environmental impact at every step.',
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-xl p-6 shadow hover:shadow-md transition duration-300"
            >
              <h4 className="text-xl font-semibold text-orange-500 mb-2">
                {item.title}
              </h4>
              <p className="text-gray-700">{item.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="mt-20">
        <NewsLetterBox />
      </div>
    </div>
  );
};

export default About;
