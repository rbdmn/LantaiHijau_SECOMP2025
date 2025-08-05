
"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import NavbarUtama from "../../components/navigation/navbar_utama";

const tanamanList = [
  { id: 1, name: "Tanaman Cabai", price: 15000, img: "/cabai.svg" },
  { id: 2, name: "Tanaman Cabai", price: 15000, img: "/cabai.svg" },
  { id: 3, name: "Tanaman Cabai", price: 15000, img: "/cabai.svg" },
  { id: 4, name: "Tanaman Cabai", price: 15000, img: "/cabai.svg" },
  { id: 5, name: "Tanaman Cabai", price: 15000, img: "/cabai.svg" },
  { id: 6, name: "Tanaman Cabai", price: 15000, img: "/cabai.svg" },
];

const difficultyOptions = [1, 2, 3];
const suhuOptions = ["< 20°C", "20 - 30°C", "> 30°C"];
const musimOptions = ["Musim Hujan", "Musim Kemarau", "Sepanjang Tahun"];
const waktuOptions = ["< 30 hari", "30 - 60 hari", "> 2 bulan"];
const hargaOptions = ["< Rp10.000", "Rp10.000 - Rp25.000", "> Rp25.000"];

export default function JelajahiTanamanPage() {
  const [search, setSearch] = useState("");
  const [difficulty, setDifficulty] = useState<number[]>([]);
  const [suhu, setSuhu] = useState<string[]>([]);
  const [musim, setMusim] = useState<string[]>([]);
  const [waktu, setWaktu] = useState<string[]>([]);
  const [harga, setHarga] = useState<string[]>([]);
  // Simpan jumlah bintang random untuk setiap tanaman
  const [starMap, setStarMap] = useState<{ [id: number]: number }>({});

  useEffect(() => {
    // Inisialisasi starMap hanya sekali saat mount
    setStarMap((prev) => {
      if (Object.keys(prev).length === tanamanList.length) return prev;
      const newMap: { [id: number]: number } = {};
      tanamanList.forEach(t => {
        newMap[t.id] = Math.floor(Math.random() * 3) + 1;
      });
      return newMap;
    });
    // eslint-disable-next-line
  }, []);

  // Dummy filter function
  const handleFilter = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Filter applied! (Demo only)");
  };

  const handleLogout = () => {
    alert("Logout clicked! (Demo only)");
  };

  // Dummy filtered list (no real filtering for demo)
  const filteredList = tanamanList.filter((t) =>
    t.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#F8F9F6] font-sans">
      <NavbarUtama />

      {/* Hero Title */}
      <div className="w-full bg-gradient-to-b from-[#6B8F5A] to-[#3B5D2A] py-20 mt-[64px] flex flex-col items-center">
        <h1 className="text-white text-5xl font-bold text-center">
        Jelajahi Tanaman Pangan
        </h1>
      </div>


      {/* Main Content */}
      <div className="flex flex-col md:flex-row gap-8 px-6 md:px-16 py-8">
        {/* Sidebar Filter */}
        <aside className="w-full md:w-72 mb-8 md:mb-0 flex flex-col gap-4">
          {/* Search di luar card filter */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full px-4 py-2 rounded-full border border-[#C3D1B6] focus:outline-none focus:ring-2 focus:ring-[#3B5D2A] bg-[#F8F9F6] pr-10 shadow-md"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#3B5D2A]">
              <svg width="18" height="18" fill="none" stroke="#3B5D2A" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
            </span>
          </div>
          <form onSubmit={handleFilter} className="bg-white rounded-xl shadow p-6 flex flex-col gap-4 border">
            <h2 className="font-bold text-xl text-[#3B5D2A] text-center mt-2 mb-1">Pilihan Filter</h2>
            <hr className="border-t border-[#C3D1B6] mb-2" />
            {/* Tingkat Kesulitan Menanam */}
            <div>
              <div className="font-semibold text-[#222] mb-1">Tingkat Kesulitan Menanam</div>
              <div className="flex flex-col gap-1 mb-1">
                {difficultyOptions.slice().reverse().map((star) => (
                  <label key={star} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={difficulty.includes(star)}
                      onChange={() => setDifficulty(difficulty.includes(star) ? difficulty.filter(s => s !== star) : [...difficulty, star])}
                      className="accent-[#3B5D2A]"
                    />
                    <span className="flex gap-1">
                      {Array.from({ length: star }).map((_, i) => (
                        <span key={i} className="text-[#FFD600] text-xl">★</span>
                      ))}
                    </span>
                  </label>
                ))}
              </div>
            </div>
            {/* Suhu Ideal */}
            <div>
              <div className="font-semibold text-[#222] mb-1">Suhu Ideal</div>
              {suhuOptions.map(opt => (
                <label key={opt} className="flex items-center gap-2 text-[#222]">
                  <input
                    type="checkbox"
                    checked={suhu.includes(opt)}
                    onChange={() => setSuhu(suhu.includes(opt) ? suhu.filter(s => s !== opt) : [...suhu, opt])}
                    className="accent-[#3B5D2A]"
                  />
                  {opt}
                </label>
              ))}
            </div>
            {/* Musim Panen */}
            <div>
              <div className="font-semibold text-[#222] mb-1">Musim Panen</div>
              {musimOptions.map(opt => (
                <label key={opt} className="flex items-center gap-2 text-[#222]">
                  <input
                    type="checkbox"
                    checked={musim.includes(opt)}
                    onChange={() => setMusim(musim.includes(opt) ? musim.filter(s => s !== opt) : [...musim, opt])}
                    className="accent-[#3B5D2A]"
                  />
                  {opt}
                </label>
              ))}
            </div>
            {/* Waktu Tumbuh */}
            <div>
              <div className="font-semibold text-[#222] mb-1">Waktu Tumbuh</div>
              {waktuOptions.map(opt => (
                <label key={opt} className="flex items-center gap-2 text-[#222]">
                  <input
                    type="checkbox"
                    checked={waktu.includes(opt)}
                    onChange={() => setWaktu(waktu.includes(opt) ? waktu.filter(s => s !== opt) : [...waktu, opt])}
                    className="accent-[#3B5D2A]"
                  />
                  {opt}
                </label>
              ))}
            </div>
            {/* Rentang Harga Rata-rata */}
            <div>
              <div className="font-semibold text-[#222] mb-1">Rentang Harga Rata-rata</div>
              {hargaOptions.map(opt => (
                <label key={opt} className="flex items-center gap-2 text-[#222]">
                  <input
                    type="checkbox"
                    checked={harga.includes(opt)}
                    onChange={() => setHarga(harga.includes(opt) ? harga.filter(s => s !== opt) : [...harga, opt])}
                    className="accent-[#3B5D2A]"
                  />
                  {opt}
                </label>
              ))}
            </div>
            <button type="submit" className="mt-4 w-full py-2 rounded-md bg-gradient-to-b from-[#6B8F5A] to-[#3B5D2A] text-white font-semibold text-lg shadow hover:brightness-95 transition">Filter</button>
          </form>
        </aside>

        {/* Tanaman Cards */}
        <main className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredList.map((tanaman) => {
            const starCount = starMap[tanaman.id] || 1;
            return (
              <div key={tanaman.id} className="bg-[#E6EDDD] rounded-xl shadow p-4 flex flex-col items-center border hover:scale-105 transition-transform">
                <Image src={tanaman.img} alt={tanaman.name} width={180} height={180} />
                <div className="mt-12 text-[#222] font-bold text-xl text-center">{tanaman.name}</div>
                <div className="mt-6 bg-[#3B5D2A] text-white rounded px-4 py-1 text-base font-medium">Rp. {tanaman.price.toLocaleString("id-ID")}</div>
                <div className="flex justify-center mt-8">
                  {Array.from({ length: starCount }).map((_, i) => (
                    <span key={i} className="text-[#FFD600] text-2xl mx-0.5">★</span>
                  ))}
                </div>
              </div>
            );
          })}
        </main>
      </div>
    </div>
  );
}
