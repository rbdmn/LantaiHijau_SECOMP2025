"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import NavbarUtama from "../components/navigation/navbar_utama";
import Footer from "@/components/footer";

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
      <div className="grid grid-cols-3 gap-8 max-w-5xl mx-auto mb-12">
      {tanamanPangan.length === 0 ? (
        <div className="col-span-3 text-center text-gray-400">Belum ada data tanaman.</div>
      ) : (
        tanamanPangan.map((tanaman, i) => (
          <Link key={i} href={`/jelajahi_tanaman/detail/${tanaman.id}`} passHref>
            <div className="flex flex-col items-center rounded-xl p-6 hover:shadow-lg transition-shadow duration-200 cursor-pointer">
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
          </Link>
        ))
      )}
    </div>

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

      <Footer/>
    </main>
  );
}