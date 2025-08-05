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
                Monday 31 August 2021
            </p>
            <h1 className="text-2xl font-bold text-[#355E35] mb-6">
                Cara Merawat Cabai Saat Musim Hujan
            </h1>

            <img
                src="/cabai.jpg"
                alt="Cabai"
                className="rounded-xl shadow mb-6 w-full max-w-lg"
            />

            <div className="text-gray-700 text-justify leading-relaxed mb-6 space-y-4">
                <p>
                    Musim hujan sering kali menjadi tantangan bagi para petani maupun penghobi tanaman cabai.
                    Curah hujan yang tinggi dapat menyebabkan tanaman menjadi rentan terhadap serangan penyakit
                    dan kerusakan akar. Berikut adalah beberapa tips untuk merawat tanaman cabai di musim hujan
                    agar tetap sehat dan produktif:
                </p>

                <ul className="list-decimal list-inside space-y-2">
                    <li>
                    <strong>Gunakan Media Tanam yang Gembur dan Drainase Baik:</strong> Pastikan media tanam
                    tidak terlalu padat dan memiliki sistem drainase yang baik. Genangan air di sekitar akar
                    bisa menyebabkan akar busuk dan pertumbuhan tanaman terhambat.
                    </li>
                    <li>
                    <strong>Tempatkan di Lokasi yang Tidak Tergenang:</strong> Jika menanam cabai di pot,
                    pastikan pot memiliki lubang di bagian bawah dan letakkan di tempat yang tidak terkena
                    genangan. Untuk lahan terbuka, buatlah bedengan agar air tidak menggenangi tanaman.
                    </li>
                    <li>
                    <strong>Perhatikan Intensitas Penyiraman:</strong> Saat musim hujan, penyiraman sebaiknya
                    dikurangi atau dihentikan sementara, tergantung pada kondisi tanah. Tanah yang terlalu
                    basah bisa menyebabkan jamur dan penyakit akar.
                    </li>
                    <li>
                    <strong>Gunakan Mulsa Organik:</strong> Mulsa seperti jerami atau daun kering bisa
                    melindungi akar dari cipratan air hujan langsung, menjaga kelembapan tanah yang stabil,
                    serta mencegah tumbuhnya gulma.
                    </li>
                    <li>
                    <strong>Pemangkasan Daun dan Cabang Tak Perlu:</strong> Pangkas daun atau cabang yang
                    terlalu rimbun agar sirkulasi udara tetap lancar. Ini penting untuk mencegah tumbuhnya
                    jamur dan penyakit akibat kelembapan berlebih.
                    </li>
                    <li>
                    <strong>Gunakan Pestisida Organik Secara Berkala:</strong> Saat musim hujan, hama seperti
                    kutu daun dan ulat lebih aktif. Gunakan pestisida alami seperti air rendaman bawang putih
                    atau daun mimba secara rutin untuk perlindungan ekstra.
                    </li>
                    <li>
                    <strong>Perhatikan Tanda-Tanda Penyakit:</strong> Segera buang daun atau buah yang terkena
                    bercak atau menunjukkan tanda busuk. Penyebaran penyakit bisa sangat cepat saat musim
                    hujan.
                    </li>
                </ul>

                <p>
                    Dengan perawatan yang tepat, tanaman cabai tetap bisa tumbuh subur dan berbuah lebat
                    meskipun di tengah musim hujan. Kuncinya adalah menjaga keseimbangan antara air, udara,
                    dan nutrisi yang diterima tanaman.
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
