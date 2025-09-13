'use client';

import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center px-6 py-16">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-2xl p-10">
        {/* Heading */}
        <h1 className="text-4xl font-bold text-center text-[#FF4500] mb-6">Contact Us</h1>
        <p className="text-center text-gray-600 mb-10">
          We’d love to hear from you. Reach out to us through any of the details below.
        </p>

        {/* Contact Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10 text-center">
          <div className="flex flex-col items-center">
            <FaMapMarkerAlt className="text-[#FF4500] text-3xl mb-2" />
            <h3 className="font-semibold text-gray-900 text-lg">Address</h3>
            <p className="text-gray-600">123 Food Street, Abuja, Nigeria</p>
          </div>
          <div className="flex flex-col items-center">
            <FaPhone className="text-[#FF4500] text-3xl mb-2" />
            <h3 className="font-semibold text-gray-900 text-lg">Phone</h3>
            <p className="text-gray-600">+234 800 123 4567</p>
          </div>
          <div className="flex flex-col items-center">
            <FaEnvelope className="text-[#FF4500] text-3xl mb-2" />
            <h3 className="font-semibold text-gray-900 text-lg">Email</h3>
            <p className="text-gray-600">support@restaurant.com</p>
          </div>
        </div>

        {/* Map */}
        <div className="mb-10">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3931.522058804539!2d7.49508!3d9.05785!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x104e0a4f8c5c91c7%3A0x93b72dc9ac8aaf2!2sAbuja%20Nigeria!5e0!3m2!1sen!2sng!4v1662195000000!5m2!1sen!2sng"
            width="100%"
            height="300"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            className="rounded-lg"
          ></iframe>
        </div>

        {/* Social Media */}
        <div className="flex justify-center space-x-6">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebookF className="text-[#FF4500] text-2xl hover:text-orange-600 transition" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <FaTwitter className="text-[#FF4500] text-2xl hover:text-orange-600 transition" />
          </a>
          <a href="https://instagram.com/theteefood" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="text-[#FF4500] text-2xl hover:text-orange-600 transition" />
          </a>
        </div>
      </div>
    </main>
  );
}
