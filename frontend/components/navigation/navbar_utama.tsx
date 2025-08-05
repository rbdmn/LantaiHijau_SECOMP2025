"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function NavbarUtama() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/logo2.png"
              alt="Logo"
              width={120}
              height={0} // boleh diisi 0, atau diabaikan karena Next.js akan sesuaikan
            />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="/user/dashboard" 
              className="text-gray-700 hover:text-[#5C7D5B] transition-colors duration-200"
            >
              Dashboard
            </Link>
            <Link 
              href="/artikel" 
              className="text-gray-700 hover:text-[#5C7D5B] transition-colors duration-200"
            >
              Artikel
            </Link>
            <Link 
              href="/jelajahi_tanaman" 
              className="text-gray-700 hover:text-[#5C7D5B] transition-colors duration-200"
            >
              Jelajahi Tanaman
            </Link>
          </div>

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link 
              href="/auth/login"
              className="bg-[#5C7D5B] text-white px-6 py-2 rounded-full font-medium hover:bg-[#4A6B4A] transition-colors duration-200"
            >
              Login
            </Link>
            <Link 
              href="/auth/register"
              className="border-2 border-[#5C7D5B] text-[#5C7D5B] px-6 py-2 rounded-full font-medium hover:bg-[#5C7D5B] hover:text-white transition-colors duration-200"
            >
              Register
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-[#5C7D5B] focus:outline-none focus:text-[#5C7D5B]"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              <Link 
                href="/user/dashboard"
                className="block px-3 py-2 text-gray-700 hover:text-[#5C7D5B] transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link 
                href="/artikel"
                className="block px-3 py-2 text-gray-700 hover:text-[#5C7D5B] transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Artikel
              </Link>
              <Link 
                href="/jelajahi_tanaman"
                className="block px-3 py-2 text-gray-700 hover:text-[#5C7D5B] transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Jelajahi Tanaman
              </Link>
              <div className="pt-4 space-y-2">
                <Link 
                  href="/auth/login"
                  className="block w-full text-center bg-[#5C7D5B] text-white px-6 py-2 rounded-full font-medium hover:bg-[#4A6B4A] transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link 
                  href="/auth/register"
                  className="block w-full text-center border-2 border-[#5C7D5B] text-[#5C7D5B] px-6 py-2 rounded-full font-medium hover:bg-[#5C7D5B] hover:text-white transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Register
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
