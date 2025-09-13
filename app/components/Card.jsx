'use client';
import React from 'react';
import { Utensils, Salad, Star, ChefHat, Truck, CreditCard  } from "lucide-react";

export default function Card() {
    const features = [
        {
            name: 'Our Story',
            description: (
                <>
                    Founded in 2023, <strong>Ozi's Food</strong> brings you chef-crafted meals using locally-sourced, <span className="text-[#FF4500] font-bold">seasonal ingredients</span>.
                </>
            ),
            icon: <Utensils className="w-16 h-16 text-[#FF4500]" />
        },
        {
            name: 'Healthy Choices',
            description: (
                <>
                    Try our <span className="text-[#FF4500] font-bold">nutritionist-approved</span> options with calorie-conscious meals that never compromise on flavor.
                </>
            ),
            icon: <Salad className="w-16 h-16 text-[#FF4500]" />
        },
        {
            name: 'Premium Quality',
            description: (
                <>
                    Every dish features <span className="text-[#FF4500] font-bold">organic produce</span> and premium proteins cooked to perfection by our award-winning chefs.
                </>
            ),
            icon: <Star className="w-16 h-16 text-[#FF4500]" />
        },
        {
            name: 'Master Chefs',
            description: (
                <>
                    Our <span className="text-[#FF4500] font-bold">culinary team</span> brings 5+ years of combined experience from  kitchens worldwide.
                </>
            ),
            icon: <ChefHat className="w-16 h-16 text-[#FF4500]" />
        },
        {
            name: 'Fast Delivery',
            description: (
                <>
                    Get hot meals in <span className="text-[#FF4500] font-bold">under 30 minutes</span> with our optimized delivery routes and thermal packaging.
                </>
            ),
            icon: <Truck className="w-16 h-16 text-[#FF4500]" />
        },

        {
            name: 'Fast & Secure Checkout',
            description: (
                <>
                    Pay with ease using our <span className="text-[#FF4500] font-bold">trusted Paystack system</span>,
                    so your favorite meals reach you <span className="font-semibold">without delay</span>.
                </>
            ),
            icon: <CreditCard className="w-16 h-16 text-[#FF4500]" />
        }
    ];

    return (
<main className="bg-white text-black min-h-screen py-12">
  <div className="container mx-auto px-6">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 place-items-center">
      {features.map((feature, index) => (
        <div
          key={index}
          className="p-6 bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 flex flex-col items-center text-center w-full max-w-sm"
        >
          {/* Icon */}
          <div className="mb-4 text-4xl">{feature.icon}</div>

          {/* Title */}
          <h3 className="text-2xl font-extrabold uppercase tracking-wide mb-4">
            {feature.name}
          </h3>

          {/* Description */}
          <p className="text-lg leading-relaxed">{feature.description}</p>
        </div>
      ))}
    </div>


    {/* Footer Text */}
    <div className="text-center mt-12 text-xl font-bold text-gray-900">
                    Thank you for choosing <span className="text-[#FF4500]">Ozi's Food</span> <br /> where <span className="text-[#FF4500]">food meets happiness...</span>
                </div>
            </div>
        </main>
    );
}