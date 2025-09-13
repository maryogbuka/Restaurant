'use client';
import React from 'react';

export default function Customers() {
  const offers = [
    { title: 'Premium Catering', image: '/bread.jpg', offer: 'Amazing food quality!' },
    { title: 'Event Hosting', image: '/test.jpg', offer: 'Excellent service!' },
    { title: 'Outdoor Dining', image: '/wine.jpg', offer: 'Best dining experience!' },
    { title: 'Corporate Lunch Service', image: '/lunch.jpg', offer: 'Fresh and timely delivery!' },
    { title: 'Private Chef Service', image: '/pasta.jpg', offer: 'Personalized menu creation!' },
    { title: 'Bakery & Pastries', image: '/chococake.jpg', offer: 'Delicious and freshly baked!' },
  ];

  return (
    <main className="bg-white min-h-screen py-10">
      <h2 className="text-4xl md:text-5xl font-playfair font-bold text-gray-900 text-center mb-6 uppercase tracking-wide">What We Offer</h2>
        <div className="w-24 h-1 bg-[#FF4500] mx-auto rounded-full mb-10"></div>
      
      
      {/* Bento-Style Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mx-6 auto-rows-[250px]">
        {offers.map((offer, index) => {
          // Three card designs with different spans
          let spanClasses = '';
          if (index === 0) spanClasses = 'col-span-2 row-span-2'; // Large card
          else if (index === 1) spanClasses = 'col-span-2 row-span-1'; // Medium card
          else spanClasses = 'col-span-2 sm:col-span-1'; // Small cards

          return (
            <a
              key={index}
              href="#"
              className={`group relative rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 ${spanClasses}`}
            >
              {/* Image */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
                style={{ backgroundImage: `url(${offer.image})` }}
              />

              {/* Overlay */}
              <div className="absolute inset-0 flex flex-col items-center justify-end bg-black bg-opacity-30 group-hover:bg-opacity-50 transition-colors duration-300">
                <div className="bg-slate-900 bg-opacity-60 h-22 w-[90vh] py-3 text-center">
                  <h3 className="text-white text-lg font-semibold mb-1">{offer.title}</h3>
                  <p className="text-gray-200 text-sm font-medium">{offer.offer}</p>
                </div>
              </div>
            </a>
          );
        })}
      </div>

      {/* Achievements Section */}
      <section className="bg-wood rounded-2xl py-10 mt-12 px-6">
        <h2 className="text-center text-gray-900 pt-7 text-2xl font-playfair font-thin mb-5">
          Over the years we have done nothing but satisfy our various customers, 
          serving the very best <span className="text-[#FF4500] font-bold">freshly cooked meals,</span> <br /> 
          we are a team of deep-rooted and cultured chefs with the mission to provide healthy meals everyone loves.
        </h2>
      </section>
    </main>
  );
}
