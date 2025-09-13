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
      <div className="relative  z-10 container mx-auto h-full flex flex-col justify-between py-10">
        <div className="grid ml-8 grid-cols-2 md:grid-cols-4 gap-8">
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold ">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/menu">Menu</Link></li>
              <li><Link href="/contact">Contact Us</Link></li>
              <li><Link href="/faq">FAQ</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold">Contact</h3>
            <p>FG3C+5CX, Alh. Yekini Olawale Bakare Ave, Lekki Penninsula II, Lekki, Lagos, Nigeria</p>
            <p>Email: info@restaurant.com</p>
            <p>Phone: (234) 7026-743-308</p>
          </div>

          {/* Socials */}
          <div>
            <h3 className="text-lg font-bold">Follow Us</h3>
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
