// src/pages/artikel/[id].tsx
import React from "react";
import NavbarUtama from "../../../components/navigation/navbar_utama";
import Footer from "../../../components/footer";
import { FaArrowLeft } from "react-icons/fa";

export default function ArtikelDetail() {
  const artikelLain = [
    {
      id: 1,
      judul: "Cara Merawat Cabai Saat Musim Hujan",
      gambar: "/cabai.jpg",
    },
    {
      id: 2,
      judul: "Pemuda ini Sukses Tanam Sawi di Rumah",
      gambar: "/sawi.jpg",
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
                Monday 18 August 2022
            </p>
            <h1 className="text-2xl font-bold text-[#355E35] mb-6">
                Tips Merawat Tanaman Bawang di Rumah
            </h1>

            <img
                src="/bawang.jpg"
                alt="Bawang"
                className="rounded-xl shadow mb-6 w-full max-w-lg"
            />

            <div className="text-gray-700 text-justify leading-relaxed space-y-4 mb-6">
                <p>
                    Menanam bawang di rumah kini semakin populer, terutama bagi mereka yang ingin mandiri dalam kebutuhan dapur harian. Selain mudah ditanam, bawang merah maupun bawang putih bisa tumbuh subur di pot kecil atau lahan sempit sekalipun.
                </p>

                <p>
                    Berikut beberapa tips agar tanaman bawang kamu tetap sehat dan produktif di rumah:
                </p>

                <ul className="list-disc list-inside space-y-2">
                    <li>
                    <strong>Pilih Bibit Berkualitas:</strong> Gunakan umbi bawang yang segar, tidak busuk, dan sudah menunjukkan tanda-tanda tumbuh tunas. Hindari umbi yang keriput atau terkena jamur.
                    </li>
                    <li>
                    <strong>Gunakan Pot dan Media Tanam yang Tepat:</strong> Gunakan pot dengan lubang drainase di bawahnya. Media tanam bisa berupa campuran tanah gembur, kompos, dan sekam bakar agar akar tidak mudah tergenang air.
                    </li>
                    <li>
                    <strong>Penanaman dengan Jarak yang Cukup:</strong> Tanam umbi dengan jarak 10–15 cm agar setiap tanaman memiliki ruang untuk tumbuh dan mendapatkan cukup sinar matahari.
                    </li>
                    <li>
                    <strong>Penyiraman Secukupnya:</strong> Siram tanaman bawang secara teratur, terutama saat pagi hari. Hindari menyiram terlalu sering karena bawang tidak menyukai tanah yang terlalu basah.
                    </li>
                    <li>
                    <strong>Pemupukan Rutin:</strong> Gunakan pupuk organik seperti kompos atau pupuk kandang setiap 2 minggu sekali untuk mendukung pertumbuhan umbi dan daun.
                    </li>
                    <li>
                    <strong>Cukup Sinar Matahari:</strong> Tempatkan tanaman di lokasi yang terkena sinar matahari langsung minimal 6 jam sehari. Cahaya sangat penting untuk pembentukan umbi yang maksimal.
                    </li>
                    <li>
                    <strong>Pengendalian Hama Secara Alami:</strong> Periksa secara rutin apakah ada hama seperti ulat atau kutu daun. Jika ada, bisa gunakan larutan bawang putih atau sabun cair alami sebagai pestisida organik.
                    </li>
                </ul>

                <p>
                    Dengan perawatan yang tepat, tanaman bawang bisa mulai dipanen dalam waktu 2–3 bulan. Selain hemat biaya dapur, menanam bawang sendiri juga membawa kepuasan tersendiri karena hasilnya lebih segar dan bebas bahan kimia.
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
