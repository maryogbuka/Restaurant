'use client';
import Image from 'next/image';
import React from 'react';
import CountUp from 'react-countup';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
     
     
      {/* Hero / Intro */}
      <section className="text-center h-[56vh] py-20 px-6 bg-[url('/res.jpg')] bg-cover bg-center bg-no-repeat relative">
        <div className="bg-black/60 absolute inset-0"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-4xl md:text-5xl font-playfair font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#FF4500] to-[#FFD700] mb-4">
            Crafting Memorable Culinary Experiences
          </h1>
          <p className="text-gray-200 text-lg md:text-xl max-w-3xl leading-relaxed">
            At <span className="font-semibold text-[#FF4500]">Ozi's Foods</span>, every dish is more than a meal, 
            it’s a story of passion, culture, and excellence passed down through generations.
          </p>
        </div>
      </section>

      {/* Founding Story */}
      <section className="py-16 px-6 max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-bold mb-6">Our Story</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            <span className="font-semibold text-[#FF4500]">Ozi's Foods</span> began with a simple mission: to honor tradition while embracing innovation.
            What started as a family kitchen has grown into a dining experience where 
            authenticity meets creativity. Every plate we serve reflects our roots and our vision 
            for global standards of excellence.
          </p>
        </div>
        <Image
          src="/justrice.jpg" 
          alt="Our culinary journey" 
          width={600} 
          height={400} 
          className="rounded-2xl shadow-lg object-cover w-full h-full"
        />
      </section>

      {/* Signature Dishes */}
      <section className="py-16 bg-gray-50 px-6">
        <h2 className="text-center text-3xl font-bold mb-12">Signature Creations</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {['spag.webp', 'friedrice.jpg', 'egusi.jpg'].map((dish, i) => (
            <div key={i} className="rounded-2xl overflow-hidden shadow-lg">
              <Image
                src={`/${dish}`}
                alt={`Signature dish ${i + 1}`}
                width={500}
                height={350}
                className="object-contain w-full h-full"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Achievements */}
      <section className="py-16 px-6 bg-gray-900 text-white">
        <h2 className="text-center text-3xl font-bold mb-12">Our Journey in Numbers</h2>
        <div className="grid sm:grid-cols-3 gap-10 max-w-4xl mx-auto">
          {[
            { value: 1000, label: 'Happy Customers', suffix: '+' },
            { value: 500, label: 'Dishes Served', suffix: '+' },
            { value: 1, label: 'Global Outlets' }
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <h3 className="text-5xl font-bold text-amber-400 mb-2">
                <CountUp end={stat.value} suffix={stat.suffix} duration={3}/>
              </h3>
              <p className="text-lg">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
