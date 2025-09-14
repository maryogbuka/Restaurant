'use client';

import { useEffect, useState } from 'react';
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import Link from 'next/link';

export default function Footer() {
  const [year, setYear] = useState(null);

  // Ensures year only renders on client to avoid hydration mismatch
  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="relative h-[500px] w-full text-white">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-black/70 z-0"
      ></div>
      <div
        className="absolute inset-0 bg-cover bg-center z-[-1]"
        style={{ backgroundImage: "url('/hamfries.jpg')" }}
      ></div>

      {/* Footer Content */}
      <div className="relative container h-full flex flex-col justify-between py-5">
        <div className="grid ml-3 grid-cols-1 md:grid-cols-4 mr-3">
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold ">Quick Links</h3>
            <ul className="space-y-2 mt-2 text-gray-200 text-sm">
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/menu">Menu</Link></li>
              <li><Link href="/contact">Contact Us</Link></li>
              <li><Link href="/faq">FAQ</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className='space-y-2'>
            <h3 className="text-lg font-bold mt-5">Contact</h3>
            <p className='text-gray-200  text-sm'>FG3C+5CX, Alh. Yekini Olawale Bakare Ave, Lekki Penninsula II, Lekki, Lagos, Nigeria</p>
            <p className='text-gray-200 text-sm'>Email: info@restaurant.com</p>
            <p className='text-gray-200 text-sm'>Phone: 07026743308</p>
          </div>

          {/* Socials */}
          <div>
            <h3 className="text-lg font-bold mt-5">Follow Us</h3>
            <div className="flex space-x-4 mt-2 text-xl">
              <Link href="https://www.facebook.com" aria-label="Facebook"><FaFacebookF /></Link>
              <Link href="https://www.instagram.com" aria-label="Instagram"><FaInstagram /></Link>
              <Link href="https://www.twitter.com" aria-label="Twitter"><FaTwitter /></Link>
              <Link href="https://www.youtube.com" aria-label="YouTube"><FaYoutube /></Link>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center mt-2 border-t border-gray-400 pt-4">
          <p>&copy; {year ?? '2025'} OZY'S Restaurant. All rights reserved.</p>
          <p className="text-sm">Website by Maryann Ogbuka</p>
        </div>
      </div>
    </footer>
  );
}
