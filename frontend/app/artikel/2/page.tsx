// src/pages/artikel/[id].tsx
import React from "react";
import NavbarUtama from "../../../components/navigation/navbar_utama";
import Footer from "../../../components/footer";
import { FaArrowLeft } from "react-icons/fa";

export default function ArtikelDetail() {
  const artikelLain = [
    {
      id: 3,
      judul: "Tips Merawat Tanaman Bawang di Rumah",
      gambar: "/bawang.jpg",
    },
    {
      id: 1,
      judul: "Cara Merawat Cabai Saat Musim Hujan",
      gambar: "/cabai.jpg",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#355E35] to-[#5C7D5B]">
        <NavbarUtama />
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 py-16 mt-[64px] flex flex-col">
            
            {/* Artikel Utama */}
            <div className="md:col-span-2 bg-[#F3F7F2] rounded-2xl p-8 shadow-lg">
            <a href="/artikel" className="text-2xl mb-4 hover:text-[#5C7D5B] block">
                <FaArrowLeft color="#304529" />
            </a>

            <p className="italic text-sm text-gray-500 mb-2">
                Monday 17 August 2022
            </p>
            <h1 className="text-2xl font-bold text-[#355E35] mb-6">
                Pemuda ini Sukses Tanam Sawi di Rumah
            </h1>

            <img
                src="/sawi.jpg"
                alt="Sawi"
                className="rounded-xl shadow mb-6 w-full max-w-lg"
            />

            <div className="text-gray-700 text-justify leading-relaxed mb-6 space-y-4">
                <p className="text-gray-700 text-justify leading-relaxed mb-6"> Di tengah keterbatasan lahan di perkotaan, seorang pemuda asal Bandung berhasil membuktikan bahwa menanam sayuran sendiri di rumah bukanlah hal yang mustahil. Aditya (27), yang tinggal di sebuah rumah kontrakan kecil, sukses membudidayakan sawi hijau di halaman belakang rumahnya yang hanya berukuran 2x3 meter.
Berawal dari hobi bercocok tanam selama pandemi, Aditya mulai mencoba berbagai jenis sayuran. “Awalnya coba-coba tanam kangkung, lalu sawi. Ternyata sawinya tumbuh subur,” ujar Aditya. Ia menggunakan sistem tanam vertikal dengan pot bertingkat dan memanfaatkan media tanam berupa campuran tanah, kompos, dan sekam bakar.

Untuk menghindari genangan air saat musim hujan, Aditya membuat saluran kecil di sekeliling pot. Ia juga rutin menyiram setiap pagi dan sore, serta menggunakan pupuk organik cair buatan sendiri dari limbah dapur.

Kini, hasil panen sawi dari kebunnya tidak hanya untuk konsumsi pribadi, tetapi juga ia jual ke tetangga sekitar. Dalam sebulan, ia bisa menghasilkan hingga 5 kilogram sawi segar. “Selain bisa makan sehat, saya juga dapat tambahan penghasilan,” tambahnya.

Kesuksesan Aditya menjadi inspirasi bagi banyak orang di lingkungannya. Ia juga aktif membagikan tips berkebun di media sosial dengan harapan semakin banyak orang yang memanfaatkan lahan sempit untuk ketahanan pangan rumah tangga.

</p>
                </div>


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
