"use client";
import Image from "next/image";
import Link from "next/link";
import React from 'react';
import { useState, useEffect } from "react";
import NavbarUtama from "../../components/navigation/navbar_utama";

// Interface untuk tipe data tanaman sesuai dengan model Laravel
interface Tanaman {
  id: number;
  nama_tanaman: string;
  level_kesulitan: number;
  suhu: string;
  musim_panen: string;
  waktu_tumbuh: number;
  deskripsi: string;
  foto_tanaman: string;
  rata_harga: number;
  link_youtube?: string;
  created_at?: string;
  updated_at?: string;
}

const difficultyOptions = [1, 2, 3];
const suhuOptions = ["< 20°C", "20 - 30°C", "> 30°C"];
const musimOptions = ["Hujan", "Kemarau", "Sepanjang Tahun"];
const waktuOptions = ["< 30 hari", "30 - 60 hari", "> 2 bulan"];
const hargaOptions = ["< Rp10.000", "Rp10.000 - Rp25.000", "> Rp25.000"];

export default function JelajahiTanamanPage() {
  const [tanamanList, setTanamanList] = useState<Tanaman[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [difficulty, setDifficulty] = useState<number[]>([]);
  const [suhu, setSuhu] = useState<string[]>([]);
  const [musim, setMusim] = useState<string[]>([]);
  const [waktu, setWaktu] = useState<string[]>([]);
  const [harga, setHarga] = useState<string[]>([]);

  // Function untuk fetch data tanaman dari API
  const fetchTanaman = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/tanaman`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setTanamanList(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching tanaman:', err);
      setError('Gagal memuat data tanaman. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTanaman();
  }, []);

  // Function untuk mapping suhu dari database ke filter options
  const mapSuhuToFilter = (suhuDB: string) => {
    const temp = parseFloat(suhuDB.replace('°C', ''));
    if (temp < 20) return "< 20°C";
    if (temp <= 30) return "20 - 30°C";
    return "> 30°C";
  };

  // Function untuk mapping waktu tumbuh dari database ke filter options
  const mapWaktuToFilter = (waktuDB: string | number) => {
  const days = typeof waktuDB === "string" ? parseInt(waktuDB.replace(/\D/g, '')) : waktuDB;
    if (days < 30) return "< 30 hari";
    if (days <= 60) return "30 - 60 hari";
    return "> 2 bulan";
  };

  // Function untuk mapping harga dari database ke filter options
  const mapHargaToFilter = (harga: number) => {
    if (harga < 10000) return "< Rp10.000";
    if (harga <= 25000) return "Rp10.000 - Rp25.000";
    return "> Rp25.000";
  };

  // Filter function yang benar-benar memfilter data
  const filteredList = tanamanList.filter((tanaman) => {
    // Filter berdasarkan search
    if (search && !tanaman.nama_tanaman.toLowerCase().includes(search.toLowerCase())) {
      return false;
    }

    // Filter berdasarkan tingkat kesulitan
    if (difficulty.length > 0 && !difficulty.includes(tanaman.level_kesulitan)) {
      return false;
    }

    // Filter berdasarkan suhu
    if (suhu.length > 0) {
      const tanamanSuhuFilter = mapSuhuToFilter(tanaman.suhu);
      if (!suhu.includes(tanamanSuhuFilter)) {
        return false;
      }
    }

    // Filter berdasarkan musim
    if (musim.length > 0 && !musim.includes(tanaman.musim_panen)) {
      return false;
    }

    // Filter berdasarkan waktu tumbuh
    if (waktu.length > 0) {
      const tanamanWaktuFilter = mapWaktuToFilter(tanaman.waktu_tumbuh);
      if (!waktu.includes(tanamanWaktuFilter)) {
        return false;
      }
    }

    // Filter berdasarkan harga
    if (harga.length > 0) {
      const tanamanHargaFilter = mapHargaToFilter(tanaman.rata_harga);
      if (!harga.includes(tanamanHargaFilter)) {
        return false;
      }
    }

    return true;
  });

  const handleFilter = (e: React.FormEvent) => {
    e.preventDefault();
    // Filter sudah otomatis diterapkan melalui filteredList
  };

  const resetFilters = () => {
    setSearch("");
    setDifficulty([]);
    setSuhu([]);
    setMusim([]);
    setWaktu([]);
    setHarga([]);
  };

  // Function untuk mendapatkan URL gambar yang benar
  const getImageUrl = (fotoTanaman: string) => {
    if (!fotoTanaman) {
      return "/placeholder-plant.png";
    }
    
    if (fotoTanaman.startsWith('http')) {
      return fotoTanaman;
    }
    
    // Cek apakah file langsung di public folder
    return `/${fotoTanaman}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F9F6] font-sans">
        <NavbarUtama />
        <div className="w-full bg-gradient-to-b from-[#6B8F5A] to-[#3B5D2A] py-20 mt-[64px] flex flex-col items-center">
          <h1 className="text-white text-5xl font-bold text-center">
            Jelajahi Tanaman Pangan
          </h1>
        </div>
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#3B5D2A]"></div>
          <span className="ml-4 text-[#3B5D2A] text-lg">Memuat data tanaman...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#F8F9F6] font-sans">
        <NavbarUtama />
        <div className="w-full bg-gradient-to-b from-[#6B8F5A] to-[#3B5D2A] py-20 mt-[64px] flex flex-col items-center">
          <h1 className="text-white text-5xl font-bold text-center">
            Jelajahi Tanaman Pangan
          </h1>
        </div>
        <div className="flex flex-col justify-center items-center py-20">
          <div className="text-red-500 text-lg mb-4">{error}</div>
          <button 
            onClick={fetchTanaman}
            className="px-6 py-2 bg-[#3B5D2A] text-white rounded-md hover:bg-[#2A4A1F] transition"
          >
            Coba Lagi
          </button>
        </div>
      </div>
    );
  }

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
              placeholder="Cari tanaman..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full px-4 py-2 rounded-full border border-[#C3D1B6] focus:outline-none focus:ring-2 focus:ring-[#3B5D2A] bg-[#F8F9F6] pr-10 shadow-md"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#3B5D2A]">
              <svg width="18" height="18" fill="none" stroke="#3B5D2A" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
            </span>
          </div>

          <form onSubmit={handleFilter} className="bg-white rounded-xl shadow p-6 flex flex-col gap-4 border">
            <div className="flex justify-between items-center">
              <h2 className="font-bold text-xl text-[#3B5D2A]">Pilihan Filter</h2>
              <button
                type="button"
                onClick={resetFilters}
                className="text-sm text-[#666] hover:text-[#3B5D2A] transition"
              >
                Reset
              </button>
            </div>
            <hr className="border-t border-[#C3D1B6] mb-2" />
            
            {/* Tingkat Kesulitan Menanam */}
            <div>
              <div className="font-semibold text-[#222] mb-2">Tingkat Kesulitan Menanam</div>
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
              <div className="font-semibold text-[#222] mb-2">Suhu Ideal</div>
              {suhuOptions.map(opt => (
                <label key={opt} className="flex items-center gap-2 text-[#222] mb-1">
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
              <div className="font-semibold text-[#222] mb-2">Musim Panen</div>
              {musimOptions.map(opt => (
                <label key={opt} className="flex items-center gap-2 text-[#222] mb-1">
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
              <div className="font-semibold text-[#222] mb-2">Waktu Tumbuh</div>
              {waktuOptions.map(opt => (
                <label key={opt} className="flex items-center gap-2 text-[#222] mb-1">
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
              <div className="font-semibold text-[#222] mb-2">Rentang Harga Rata-rata</div>
              {hargaOptions.map(opt => (
                <label key={opt} className="flex items-center gap-2 text-[#222] mb-1">
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
          </form>

          {/* Result Count */}
          <div className="text-center text-[#666] bg-white p-3 rounded-lg shadow">
            Menampilkan {filteredList.length} dari {tanamanList.length} tanaman
          </div>
        </aside>

        {/* Tanaman Cards */}
        <main className="flex-1">
          {filteredList.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="text-[#666] text-lg mb-4">
                {search || difficulty.length || suhu.length || musim.length || waktu.length || harga.length 
                  ? "Tidak ada tanaman yang sesuai dengan filter Anda"
                  : "Tidak ada data tanaman"
                }
              </div>
              {(search || difficulty.length || suhu.length || musim.length || waktu.length || harga.length) && (
                <button
                  onClick={resetFilters}
                  className="px-6 py-2 bg-[#3B5D2A] text-white rounded-md hover:bg-[#2A4A1F] transition"
                >
                  Reset Filter
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredList.map((tanaman) => (
                <Link key={tanaman.id} href={`/jelajahi_tanaman/detail/${tanaman.id}`}>
                  <div className="bg-[#E6EDDD] rounded-xl shadow p-4 flex flex-col items-center border hover:scale-105 transition-transform cursor-pointer">
                    <div className="w-[180px] h-[180px] relative">
                      <Image 
                        src={getImageUrl(tanaman.foto_tanaman)} 
                        alt={tanaman.nama_tanaman} 
                        fill
                        className="object-cover rounded-lg"
                        onError={(e) => {
                          // Fallback ke gambar default jika gagal load
                          const target = e.target as HTMLImageElement;
                          target.src = "/placeholder-plant.png";
                        }}
                      />
                    </div>
                    <div className="mt-4 text-[#222] font-bold text-xl text-center">{tanaman.nama_tanaman}</div>
                    <div className="mt-2 text-[#666] text-sm text-center px-2">
                      {tanaman.deskripsi.length > 100 
                        ? `${tanaman.deskripsi.substring(0, 100)}...` 
                        : tanaman.deskripsi
                      }
                    </div>
                    <div className="mt-4 bg-[#3B5D2A] text-white rounded px-4 py-1 text-base font-medium">
                      Rp. {tanaman.rata_harga.toLocaleString("id-ID")}
                    </div>
                    <div className="flex justify-center mt-4">
                      {Array.from({ length: tanaman.level_kesulitan }).map((_, i) => (
                        <span key={i} className="text-[#FFD600] text-2xl mx-0.5">★</span>
                      ))}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}