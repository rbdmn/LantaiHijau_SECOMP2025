"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import NavbarUtama from "../components/navigation/navbar_utama";

export default function LandingPage() {
  const [slide, setSlide] = useState(0);

  const slides = [
    {
      title: "Selamat Datang",
      desc: `Website untuk kamu yang ingin mulai berkebun di rumah, meski dengan lahan yang terbatas.
            Temukan tips, panduan, dan inspirasi untuk menciptakan kebun hijau dalam ruang sempit lebih segar, lebih sehat, lebih hijau!`,
      img: "/tanaman_landing.png",
      buttonText: "Mulai Sekarang",
      buttonLink: "/auth/register",
    },
    {
      title: "Tentang Kami",
      desc: `Kami adalah komunitas berkebun digital yang ingin membantu kamu menghijaukan ruang kecilmu. 
              Di Lantai Hijau, kami percaya semua orang bisa berkebun, mulai dari ruang dapur hingga balkon apartemen.`,
      img: "/logo_landing_page.png",
      buttonText: "Pelajari Lebih Lanjut",
      buttonLink: "#tentang",
    }
  ];

  const nextSlide = () => setSlide((slide + 1) % slides.length);
  const prevSlide = () => setSlide((slide - 1 + slides.length) % slides.length);

  // Fetch tanaman from API
  const [tanamanPangan, setTanamanPangan] = useState<any[]>([]);
  useEffect(() => {
    fetch("http://localhost:8000/api/tanaman")
      .then((res) => res.json())
      .then((data) => setTanamanPangan(data.slice(0, 9))) // show max 9 for grid
      .catch(() => setTanamanPangan([]));
  }, []);
  

  return (
    <main className="bg-white min-h-screen font-sans">
      <NavbarUtama />
      
      
      {/* Hero Carousel Section */}
      <section className="w-full h-[600px] flex items-center justify-center px-6 md:px-20 bg-gradient-to-t from-[#304529] to-[#557C49] relative mt-16 overflow-hidden">
        <div className="max-w-6xl flex flex-col md:flex-row items-center justify-center gap-30 z-10 text-center md:text-left">
          <div className="max-w-lg">
            <h1 className="text-5xl font-bold text-white mb-6">{slides[slide].title}</h1>
            <p className="text-white mb-8 text-lg leading-relaxed">{slides[slide].desc}</p>
            <Link href={slides[slide].buttonLink}>
              <button className="bg-[#E6F0E6] text-[#5C7D5B] px-8 py-3 rounded-full font-medium shadow-lg hover:bg-[#D4E8D4] transition-colors duration-200">
                {slides[slide].buttonText}
              </button>
            </Link>
          </div>
          <div className="relative">
            <Image 
              src={slides[slide].img} 
              alt="Hero Gambar" 
              width={380} 
              height={380}
              className="drop-shadow-xl"
            />
          </div>
        </div>

        {/* Arrows */}
        <button 
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-200 transition-colors"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button 
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-200 transition-colors"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </section>

      {/* Jelajahi Tanaman Pangan */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-8">
          <h2 className="text-4xl font-bold text-[#3C4F3A] text-center mb-4">Jelajahi Tanaman Pangan</h2>
          <p className="text-center text-gray-600 mb-12 text-lg max-w-3xl mx-auto">
          Kenali lebih dalam berbagai jenis tanaman pangan yang menjadi sumber kehidupan kita sehari-hari. Pelajari cara menanam, merawat, dan memanen secara efisien, bahkan di ruang yang terbatas.
          </p>
          <div className="grid grid-cols-3 gap-8 max-w-5xl mx-auto mb-12">
            {tanamanPangan.length === 0 ? (
              <div className="col-span-3 text-center text-gray-400">Belum ada data tanaman.</div>
            ) : (
              tanamanPangan.map((tanaman, i) => (
                <div key={i} className="flex flex-col items-center rounded-xl p-6 hover:shadow-lg transition-shadow duration-200">
                  <Image
                    src={
                      tanaman.foto_tanaman
                        ? `http://localhost:8000/uploads/${tanaman.foto_tanaman}`
                        : "/tanaman_default.png"
                    }
                    alt={tanaman.nama_tanaman}
                    width={250}
                    height={250}
                    className="mb-4 object-cover rounded-lg"
                  />
                  <span className="text-[#3C4F3A] font-semibold text-lg">{tanaman.nama_tanaman}</span>
                </div>
              ))
            )}
          </div>
          <div className="flex justify-center">
            <Link href="/jelajahi_tanaman">
              <button className="bg-[#E6F0E6] text-[#5C7D5B] px-8 py-3 rounded-full font-medium shadow-lg hover:bg-[#D4E8D4] transition-colors duration-200">
                Lihat Semua
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Tentang Kita */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-8">
          <h2 className="text-4xl font-bold text-[#3C4F3A] text-center mb-12">Tentang Kami</h2>
          <div className="flex items-center gap-16 max-w-5xl mx-auto">
            <div className="relative">
                <Image 
                  src="/tentang_kami.png" 
                  alt="Profil" 
                  width={500} 
                  height={0}
                  className="rounded-xl"
                />
            </div>
            <div className="flex-1">
              <p className="text-gray-700 text-lg leading-relaxed">
              Lantai Hijau adalah platform edukatif yang hadir untuk membantumu berkebun di ruang terbatas. Kami percaya bahwa siapa pun bisa menanam, di mana pun, bahkan di tengah padatnya perkotaan.
Melalui panduan praktis, artikel informatif, dan fitur interaktif, kami ingin membangun kebiasaan bercocok tanam yang menyenangkan, berkelanjutan, dan berdampak baik bagi lingkungan dan kehidupan sehari-hari.
Bersama Lantai Hijau, mari tumbuhkan kehidupan mulai dari lantai rumahmu.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Fitur */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-8">
          <h2 className="text-4xl font-bold text-[#3C4F3A] text-center mb-4">Fitur</h2>
          <p className="text-center text-gray-600 mb-12 text-lg max-w-3xl mx-auto">
          Kami menyediakan berbagai fitur interaktif untuk mendukung perjalanan berkebunmu.
          </p>
          <div className="grid grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-[#E6F0E6] rounded-2xl p-8 flex flex-col items-center hover:shadow-lg transition-shadow duration-200">
              <img
                src="/kebun_virtual.png" 
                alt="Kebun Virtual"
                className="w-30 h-30 object-contain"
              />
              <h3 className="text-xl font-bold text-[#3C4F3A] mb-4">Kebun Virtual</h3>
              <p className="text-center text-gray-600">Kebun virtual untuk mapping kebun secara virtual.</p>
            </div>
            <div className="bg-[#E6F0E6] rounded-2xl p-8 flex flex-col items-center hover:shadow-lg transition-shadow duration-200">         
              <img
                src="/jurnal.png" 
                alt="Jurnal"
                className="w-30 h-30 object-contain"
              />
              <h3 className="text-xl font-bold text-[#3C4F3A] mb-4">Jurnal</h3>
              <p className="text-center text-gray-600">Jurnal untuk mengisi catatan pertumbuhan tanamanmu.</p>
            </div>
            <div className="bg-[#E6F0E6] rounded-2xl p-8 flex flex-col items-center hover:shadow-lg transition-shadow duration-200">
                <img
                  src="/hasil_panen.png" 
                  alt="Hasil Panen"
                  className="w- h-30 object-contain"
                />
              <h3 className="text-xl font-bold text-[#3C4F3A] mb-4">Hasil Panen</h3>
              <p className="text-center text-gray-600">Hasil panen yang sudah kamu dapatkan selama menanam sendiri.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Artikel */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-8">
          <h2 className="text-4xl font-bold text-[#3C4F3A] text-center mb-12">Artikel</h2>
          <div className="grid grid-cols-3 gap-8 max-w-5xl mx-auto mb-12">
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-200">
              <span className="text-sm text-gray-500 mb-3 block">Monday 31 August 2021</span>
              <h4 className="font-bold text-[#3C4F3A] text-lg mb-4">Cara Merawat Cabai Saat Musim Hujan</h4>
              <div className="mb-4">
                <Image 
                  src="/cabai.jpg" 
                  alt="Artikel Cabai" 
                  width={200} 
                  height={140}
                  className="rounded-lg w-full object-cover"
                />
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                Mauris egestas turpis. Vitae pulvinar lobortis vel ut at. Sed facilisis vestibulum, sed bibendum. Vitae tristique suspendisse condimentum pulvinar rutrum dui sed tincidunt ut. Mauris porttitor diam facilisis sit amet.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-200">
              <span className="text-sm text-gray-500 mb-3 block">Monday 31 August 2021</span>
              <h4 className="font-bold text-[#3C4F3A] text-lg mb-4">Pemuda ini Sukses Tanam Sawi di Rumah</h4>
              <div className="mb-4">
                <Image 
                  src="/sawi.jpg" 
                  alt="Artikel Sawi" 
                  width={200} 
                  height={140}
                  className="rounded-lg w-full object-cover"
                />
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                Mauris egestas turpis. Vitae pulvinar lobortis vel ut at. Sed facilisis vestibulum, sed bibendum. Vitae tristique suspendisse condimentum pulvinar rutrum dui sed tincidunt ut. Mauris porttitor diam facilisis sit amet.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-200">
              <span className="text-sm text-gray-500 mb-3 block">Monday 31 August 2021</span>
              <h4 className="font-bold text-[#3C4F3A] text-lg mb-4">Tips Merawat Tanaman Bawang di Rumah</h4>
              <div className="mb-4">
                <Image 
                  src="/bawang.jpg" 
                  alt="Artikel Bawang" 
                  width={200} 
                  height={140}
                  className="rounded-lg w-full object-cover"
                />
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                Mauris egestas turpis. Vitae pulvinar lobortis vel ut at. Sed facilisis vestibulum, sed bibendum. Vitae tristique suspendisse condimentum pulvinar rutrum dui sed tincidunt ut. Mauris porttitor diam facilisis sit amet.
              </p>
            </div>
          </div>
          <div className="flex justify-center">
            <Link href="/artikel">
              <button className="bg-[#E6F0E6] text-[#5C7D5B] px-8 py-3 rounded-full font-medium shadow-lg hover:bg-[#D4E8D4] transition-colors duration-200">
                Lihat Semua
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#3C4F3A] py-12 text-white">
        <div className="max-w-6xl mx-auto px-8">
          <div className="flex flex-col md:flex-row justify-between items-start mb-8">
            <div className="flex items-center gap-3 mb-6 md:mb-0">
            <Image
              src="/logo_white.png"
              alt="Logo White"
              width={120}
              height={0} // boleh diisi 0, atau diabaikan karena Next.js akan sesuaikan
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
              <a href="#" className="w-8 h-8 bg-[#5C7D5B] rounded-full flex items-center justify-center hover:bg-[#4A6B4A] transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a href="#" className="w-8 h-8 bg-[#5C7D5B] rounded-full flex items-center justify-center hover:bg-[#4A6B4A] transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" className="w-8 h-8 bg-[#5C7D5B] rounded-full flex items-center justify-center hover:bg-[#4A6B4A] transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
                </svg>
              </a>
              <a href="#" className="w-8 h-8 bg-[#5C7D5B] rounded-full flex items-center justify-center hover:bg-[#4A6B4A] transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>
          <div className="text-center text-sm text-gray-300 border-t border-gray-600 pt-8">
            LantaiHijau © 2025. All rights reserved.
          </div>
        </div>
      </footer>
    </main>
  );
}