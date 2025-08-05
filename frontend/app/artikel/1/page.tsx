// src/pages/artikel/[id].tsx
import React from "react";
import NavbarUtama from "../../../components/navigation/navbar_utama";
import Footer from "../../../components/footer";

export default function ArtikelDetail() {
  const artikelLain = [
    {
      id: 1,
      judul: "Tips Merawat Tanaman Bawang di Rumah",
      gambar: "/images/bawang.png",
    },
    {
      id: 2,
      judul: "Tips Merawat Tanaman Bawang di Rumah",
      gambar: "/images/bawang.png",
    },
    {
      id: 3,
      judul: "Tips Merawat Tanaman Bawang di Rumah",
      gambar: "/images/bawang.png",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#355E35] to-[#5C7D5B]">
        <NavbarUtama />
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Artikel Utama */}
            <div className="md:col-span-2 bg-[#F3F7F2] rounded-2xl p-8 shadow-lg">
            <a href="/artikel" className="text-2xl mb-4 hover:text-[#5C7D5B] block">
                ←
            </a>

            <p className="italic text-sm text-gray-500 mb-2">
                Monday 31 August 2021
            </p>
            <h1 className="text-2xl font-bold text-[#355E35] mb-6">
                Cara Merawat Cabai Saat Musim Hujan
            </h1>

            <img
                src="/images/cabai.png"
                alt="Cabai"
                className="rounded-xl shadow mb-6 w-full max-w-lg"
            />

            <p className="text-gray-700 text-justify leading-relaxed mb-6">
                "Kembang sepatu membutuhkan sinar matahari penuh [...] agar pupuk diberikan setiap 3–4 minggu selama musim tanam."
            </p>

            <p className="text-sm text-gray-600 mt-4">Penulis : Admin 1</p>

            <a
                href="/artikel"
                className="inline-block mt-6 px-6 py-2 bg-[#355E35] text-white rounded-lg hover:bg-[#4a7b4a]"
            >
                Kembali
            </a>
            </div>

            {/* Sidebar Artikel Lainnya */}
            <div className="bg-[#F3F7F2] rounded-2xl p-8 shadow-lg h-fit">
            <h2 className="text-lg font-semibold text-[#355E35] mb-4">
                Berita Lainnya
            </h2>
            <div className="space-y-6">
                {artikelLain.map((item) => (
                <a
                    key={item.id}
                    href={`/artikel/${item.id}`}
                    className="flex items-center gap-4 hover:bg-gray-100 p-2 rounded-lg transition"
                >
                    <img
                    src={item.gambar}
                    alt={item.judul}
                    className="w-20 h-20 rounded-md object-cover"
                    />
                    <p className="text-[#355E35] font-medium text-sm">
                    {item.judul}
                    </p>
                </a>
                ))}
            </div>
            </div>
        </div>
        <Footer />
        </div>

  );
}
