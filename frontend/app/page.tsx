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
    img: "/tanaman.png",
    position: "right-0 bottom-0 top-0",
    imgWidth: 800,
    imgHeight: 800,
    buttonText: "Mulai Sekarang",
    buttonLink: "/auth/register",
  },
  {
    title: "Tentang Kami",
    desc: `Lantai Hijau adalah platform edukatif yang hadir untuk membantumu berkebun di ruang terbatas. 
    Kami percaya bahwa siapa pun bisa menanam, di mana pun, bahkan di tengah padatnya perkotaan.`,
    img: "/petani.png",
    position: "right-0 bottom-0 top-[-40]",
    imgWidth: 1000,
    imgHeight: 1000,
  },
  {
    title: "Fitur Unggulan",
    desc: `Kebun Virtual untuk memantau tanamanmu secara interaktif.
            Jurnal untuk mencatat perkembangan harian.
            Hasil Panen untuk merekap dan membagikan pencapaianmu.`,
    position: "right-50 bottom-20 top-auto",
    img: "/fitur.png",
    imgWidth: 450,
    imgHeight: 450
  }
];

// Fungsi manual
  const nextSlide = () => {
    setSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Otomatis berganti
  useEffect(() => {
    const interval = setInterval(() => {
      setSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // ganti setiap 5 detik

    return () => clearInterval(interval);
  }, []);

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
     <section className="relative w-full h-[600px] flex items-center justify-center px-6 md:px-20 bg-gradient-to-t from-[#304529] to-[#557C49] mt-16 overflow-hidden">

      {/* Dekorasi dedaunan kiri atas */}
      <Image
        src="/daun.png"
        alt="Daun kiri atas"
        width={250}
        height={250}
        className="absolute top-0 left-0 rotate-[-15deg]"
      />

      {/* Dekorasi dedaunan kanan bawah */}
      <Image
        src="/daun.png"
        alt="Daun kanan bawah"
        width={250}
        height={250}
        className="absolute bottom-0 right-0 rotate-[15deg]"
      />

      {/* Dekorasi dedaunan kiri bawah (blur halus) */}
      <Image
        src="/daun.png"
        alt="Daun kiri bawah"
        width={200}
        height={200}
        className="absolute bottom-0 left-5 rotate-[25deg] blur-[5px]"
      />

      {/* Dekorasi dedaunan kanan atas (blur sedang) */}
      <Image
        src="/daun.png"
        alt="Daun kanan atas"
        width={200}
        height={200}
        className="absolute top-5 right-10 rotate-[-25deg]"
      />

      {/* Dekorasi dedaunan tengah kanan (blur halus + transparan) */}
      <Image
        src="/daun.png"
        alt="Daun tengah kanan"
        width={180}
        height={180}
        className="absolute top-1/2 right-0 rotate-[5deg] translate-y-[-50%] blur-[5px]"
      />

        {/* Konten */}
        <div className="max-w-6xl flex flex-col md:flex-row items-center justify-between w-full z-10 text-center md:text-left">
          {/* Teks */}
          <div className="max-w-lg mx-auto md:ml-20">
            {/* Logo di atas judul */}
          <div className="flex justify-center md:justify-start mb-8">
            <Image
              src="/logo_white.png" // ganti dengan path logo kamu
              alt="Logo Lantai Hijau"
              width={150}
              height={150}
              className="drop-shadow-lg"
            />
          </div>

            <h1 className="text-5xl font-bold text-white mb-6">{slides[slide].title}</h1>
            <p className="text-white mb-8 text-lg leading-relaxed">{slides[slide].desc}</p>
            {slides[slide].buttonText && slides[slide].buttonLink && (
              <Link href={slides[slide].buttonLink}>
                <button className="bg-[#E6F0E6] text-[#5C7D5B] px-8 py-3 rounded-full font-medium shadow-lg hover:bg-[#D4E8D4] transition-colors duration-200">
                  {slides[slide].buttonText}
                </button>
              </Link>
            )}

          </div>

        {/* Gambar utama */}
        <div
          className={`absolute transition-all duration-500 ease-in-out ${slides[slide].position}`}
        >
          <Image
            src={slides[slide].img}
            alt="Hero Gambar"
            width={slides[slide].imgWidth}
            height={slides[slide].imgHeight}
            className="drop-shadow-xl transition-all duration-500 ease-in-out"
          />
        </div>
        </div>

        {/* Navigasi slide */}
        <button 
          onClick={prevSlide}
          className="absolute left-12 top-1/2 -translate-y-1/2 text-white 
                    bg-white/20 p-3 rounded-full backdrop-blur-sm
                    hover:bg-white/30 hover:scale-110 hover:shadow-lg 
                    transition-all duration-300 z-20"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button 
          onClick={nextSlide}
          className="absolute right-12 top-1/2 -translate-y-1/2 text-white 
                    bg-white/20 p-3 rounded-full backdrop-blur-sm
                    hover:bg-white/30 hover:scale-110 hover:shadow-lg 
                    transition-all duration-300 z-20"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </section>

      {/* Jelajahi Tanaman Pangan */}
      <div className="max-w-6xl mx-auto px-6 md:px-20 py-16">
        <h2 className="text-4xl font-bold text-[#3C4F3A] text-center mb-4"> Jelajahi Tanaman</h2>
          <p className="text-center text-gray-600 mb-12 text-lg max-w-3xl mx-auto">
            Temukan berbagai jenis tanaman konsumsi yang cocok ditanam di pot, lengkap dengan informasi musim, waktu tumbuh, dan manfaatnya untuk kehidupan sehari-hari.
          </p>
      </div>
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
    <div className="flex justify-center mb-16">
            <Link href="/jelajahi_tanaman">
              <button className="bg-[#E6F0E6] text-[#5C7D5B] px-8 py-3 rounded-full font-medium shadow-lg hover:bg-[#D4E8D4] transition-colors duration-200">
                Lihat Semua
              </button>
            </Link>
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
                Musim hujan sering kali menjadi tantangan bagi para petani maupun penghobi tanaman cabai.
                Curah hujan yang tinggi dapat menyebabkan tanaman menjadi rentan terhadap serangan penyakit
                dan kerusakan akar.
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
                Di tengah keterbatasan lahan di perkotaan, seorang pemuda asal Bandung berhasil membuktikan bahwa menanam sayuran sendiri di rumah bukanlah hal yang mustahil.
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
                Menanam bawang di rumah kini semakin populer, terutama bagi mereka yang ingin mandiri dalam kebutuhan dapur harian. Selain mudah ditanam, bawang merah maupun bawang putih bisa tumbuh subur di pot kecil atau lahan sempit sekalipun.
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