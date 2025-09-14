'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';

const navLinks = [
  { href: '/', label: 'Home', id: 'home' },
  { href: '/about', label: 'About', id: 'about' },
  { href: '/menu', label: 'Menu', id: 'menu' },
  { href: '/order', label: 'Cart', id: 'order' },
  { href: '/contact', label: 'Contact us', id: 'contact us' },
];

export default function Navbar() {
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const pathname = usePathname();

  // ✅ White text on Home & Menu
  const isHome = pathname === '/';
  const isMenu = pathname === '/menu';
  const isOrder = pathname === '/order';
  const isAbout = pathname === '/about';
  const isContact = pathname === '/contact';
  const useWhiteText = isHome || isMenu || isOrder || isAbout || isContact;
  const textColor = useWhiteText ? 'text-white' : 'text-[#060707]';

  // Handles scroll hide/show for navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <nav
      className={`w-full h-16 fixed top-0 flex justify-between items-center px-2 sm:px-4 lg:px-8 py-3 z-20 backdrop-blur-md transition-transform duration-300 ${
        showNavbar ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      {/* Logo and company name */}
      <div className="">
        <img
          src="/foodio.png"
          alt="Ozi's Food Logo"
          className="mt-9 h-10 w-22 sm:h-14 sm:w-24"
        />
        <div className={`${textColor} mb-10 text-xs sm:text-xs font-bold`}>
          Ozi's Food
        </div>
      </div>

      {/* Nav Links */}
      <div className="flex items-center justify-center space-x-4 md:space-x-10 sm:space-x-6">
        {navLinks.map((link) => (
          <Link
            key={link.id}
            href={link.href}
            className={`${textColor} text-xs sm:text-xs md:text-xs lg:text-xs hover:text-orange-700 transition-colors duration-300`}
          >
            {link.label}
          </Link>
        ))}
      </div>

      {/* Social Media Icons - Hidden on small screens, visible on medium and up */}
      <div className="hidden md:flex space-x-3 sm:space-x-4">
        <Link href="https://www.facebook.com" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
          <FaFacebookF
            className={`${textColor} hover:text-lime-500 cursor-pointer text-sm sm:text-base md:text-lg`}
          />
        </Link>
        <Link href="https://www.twitter.com" aria-label="Twitter" target="_blank" rel="noopener noreferrer">
          <FaTwitter
            className={`${textColor} hover:text-lime-500 cursor-pointer text-sm sm:text-base md:text-lg`}
          />
        </Link>
        <Link href="https://www.instagram.com/theteefood" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
          <FaInstagram
            className={`${textColor} hover:text-lime-500 cursor-pointer text-sm sm:text-base md:text-lg`}
          />
        </Link>
      </div>
    </nav>
  );
}