// components/Footer.tsx

"use client";

import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#3C4F3A] py-12 text-white">
      <div className="max-w-6xl mx-auto px-8">
        <div className="flex flex-col md:flex-row justify-between items-start mb-8">
          <div className="flex items-center gap-3 mb-6 md:mb-0">
            <Image
              src="/logo_white.png"
              alt="Logo White"
              width={120}
              height={0}
            />
          </div>
          <nav className="flex flex-wrap gap-6 text-sm">
            <Link href="/jelajahi_tanaman" className="hover:text-[#E6F0E6] transition-colors">Tanaman</Link>
            <Link href="/user/kebun_virtual" className="hover:text-[#E6F0E6] transition-colors">Kebun Virtual</Link>
            <Link href="/user/jurnal" className="hover:text-[#E6F0E6] transition-colors">Jurnal</Link>
            <Link href="/artikel" className="hover:text-[#E6F0E6] transition-colors">Artikel</Link>
            <Link href="/user/hasil_panen" className="hover:text-[#E6F0E6] transition-colors">Panen</Link>
            <Link href="/user/dashboard" className="hover:text-[#E6F0E6] transition-colors">Dashboard</Link>
          </nav>
          <div className="flex gap-4 mt-6 md:mt-0">
            {/* social media buttons here */}
            {/* keep existing <a>...svg...</a> blocks here */}
          </div>
        </div>
        <div className="text-center text-sm text-gray-300 border-t border-gray-600 pt-8">
          LantaiHijau © 2025. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
