"use client";
import Image from "next/image";
import React from 'react';
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import NavbarUtama from "../../../../components/navigation/navbar_utama";
import { FaRegLightbulb } from "react-icons/fa6";

interface PanduanTanaman {
  id: number;
  tanaman_id: number;
  step_number: number;
  step_title: string;
  step_content: string;
  alat_bahan: string[];
  tips: string;
}

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
  panduan?: PanduanTanaman[]; // Tambahkan panduan
  created_at?: string;
  updated_at?: string;
}

export default function DetailTanaman() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;
  
  const [tanaman, setTanaman] = useState<Tanaman | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showGuide, setShowGuide] = useState(false);
  const [estDate, setEstDate] = useState("");
  const [estResult, setEstResult] = useState<string | null>(null);
  const [showSaved, setShowSaved] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [rekomendasiTanaman, setRekomendasiTanaman] = useState<Tanaman[]>([])

  const [isInCollection, setIsInCollection] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // Check if user is logged in
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      setIsLoggedIn(!!token);
    }
  }, []);

  // Fetch tanaman detail dari API
  const fetchTanamanDetail = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/tanaman/${id}`, {
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
      setTanaman(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching tanaman detail:', err);
      setError('Gagal memuat detail tanaman. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  const fetchRekomendasiTanaman = async () => {
    try {
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
        // Filter out current tanaman dan ambil maksimal 10 tanaman lain
        const filteredData = data.filter((item: Tanaman) => item.id !== parseInt(id)).slice(0, 10);
        setRekomendasiTanaman(filteredData);
    } catch (err) {
        console.error('Error fetching rekomendasi tanaman:', err);
    }
    };

  useEffect(() => {
    if (id) {
      fetchTanamanDetail();
      fetchRekomendasiTanaman();
      checkIfInCollection(); // Tambahkan ini
    }
  }, [id, isLoggedIn]);

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

  // Tambahkan function helper untuk convert YouTube URL
    const getYouTubeEmbedUrl = (url: string) => {
    if (!url) return null;
    
    // Handle berbagai format YouTube URL
    const patterns = [
        /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
        /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?.*v=([^&\n?#]+)/
    ];
    
    for (const pattern of patterns) {
        const match = url.match(pattern);
        if (match && match[1]) {
        return `https://www.youtube.com/embed/${match[1]}`;
        }
    }
    
    return null;
    };

  // Carousel logic (dummy data untuk sekarang)
  const carouselData = [
    { img: "/cabai.svg", title: "Tanaman Cabai 1" },
    { img: "/cabai.svg", title: "Tanaman Cabai 2" },
    { img: "/cabai.svg", title: "Tanaman Cabai 3" },
    { img: "/cabai.svg", title: "Tanaman Cabai 4" },
    { img: "/cabai.svg", title: "Tanaman Cabai 5" },
    { img: "/cabai.svg", title: "Tanaman Cabai 6" },
    { img: "/cabai.svg", title: "Tanaman Cabai 7" },
    { img: "/cabai.svg", title: "Tanaman Cabai 8" },
    { img: "/cabai.svg", title: "Tanaman Cabai 9" },
    { img: "/cabai.svg", title: "Tanaman Cabai 10" }
  ];
  const [carouselIndex, setCarouselIndex] = useState(0);
  const visibleCards = 5;
  const maxIndex = Math.max(0, rekomendasiTanaman.length - visibleCards);
  const handlePrev = () => setCarouselIndex(i => Math.max(0, i - 1));
  const handleNext = () => setCarouselIndex(i => Math.min(maxIndex, i + 1));


  // Function untuk estimasi panen berdasarkan waktu tumbuh dari database
  const handleEstCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (!estDate || !tanaman) return;
    const inputDate = new Date(estDate);
    inputDate.setDate(inputDate.getDate() + tanaman.waktu_tumbuh);
    const result = inputDate.toLocaleDateString("id-ID");
    setEstResult(result);
  };

  const handleSaveCollection = async () => {
    if (isLoggedIn) {
      // Pastikan tanaman data sudah loaded
      if (!tanaman || !tanaman.id) {
        alert('Data tanaman belum dimuat. Silakan tunggu sebentar.');
        return;
      }

      try {
        const token = localStorage.getItem('token');
        
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/koleksi-tanaman`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({
            id_tanaman: tanaman.id
          }),
        });

        const data = await response.json();

        if (response.ok && data.success) {
          // Success - show success message
          setShowSaved(true);
          setTimeout(() => setShowSaved(false), 2000);
        } else {
          // Handle error (misalnya tanaman sudah ada di koleksi)
          console.error('Error saving to collection:', data.message);
          // Anda bisa menambahkan state untuk menampilkan pesan error
          alert(data.message || 'Gagal menyimpan ke koleksi');
        }
      } catch (error) {
        console.error('Network error:', error);
        alert('Terjadi kesalahan jaringan. Silakan coba lagi.');
      }
    } else {
      // User not logged in, redirect to login
      router.push('/auth/login');
    }
  };

  const checkIfInCollection = async () => {
    if (isLoggedIn && tanaman?.id) {
      try {
        const token = localStorage.getItem('token');
        
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/koleksi-tanaman/check/${tanaman.id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        const data = await response.json();
        
        if (response.ok && data.success) {
          setIsInCollection(data.exists); // Anda perlu menambahkan state ini
        }
      } catch (error) {
        console.error('Error checking collection:', error);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white font-sans">
        <NavbarUtama />
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#3B5D2A]"></div>
          <span className="ml-4 text-[#3B5D2A] text-lg">Memuat detail tanaman...</span>
        </div>
      </div>
    );
  }

  if (error || !tanaman) {
    return (
      <div className="min-h-screen bg-white font-sans">
        <NavbarUtama />
        <div className="flex flex-col justify-center items-center py-20">
          <div className="text-red-500 text-lg mb-4">{error || 'Tanaman tidak ditemukan'}</div>
          <button 
            onClick={() => router.back()}
            className="px-6 py-2 bg-[#3B5D2A] text-white rounded-md hover:bg-[#2A4A1F] transition"
          >
            Kembali
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-sans">
      <NavbarUtama />
      
      {/* Centered Notification Popup */}
      {showSaved && (
        <span className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#4B6A3D] text-white px-6 py-3 rounded shadow-lg text-base font-semibold animate-fadeIn z-50 border border-[#B7C9A6] flex items-center" style={{minWidth:260}}>
          <svg width="20" height="20" fill="none" stroke="#fff" strokeWidth="2" viewBox="0 0 24 24" className="inline mr-2 align-middle"><path d="M5 13l4 4L19 7"/></svg>
          Berhasil disimpan ke koleksi!
        </span>
      )}

      {/* Back Arrow */}
      <div className="px-8 pt-6">
        <button onClick={() => router.back()} className="text-[#3B5D2A] text-3xl font-bold rounded-full hover:bg-[#F0F5ED] w-10 h-10 flex items-center justify-center mt-[60px]">
          <svg width="28" height="28" fill="none" stroke="#3B5D2A" strokeWidth="3" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7"/></svg>
        </button>
      </div>

      {/* Main Detail */}
      <div className="flex flex-col items-center mt-2">
        <div className="flex flex-col md:flex-row gap-[2px] items-center mt-2">
          <div className="bg-[#EAF5E2] rounded-l-2xl p-0 flex items-center justify-center" style={{boxShadow:'2px 2px 8px #b7c9a6', height: '520px', minHeight: '520px', minWidth: '520px'}}>
            <Image 
              src={getImageUrl(tanaman.foto_tanaman)} 
              alt={tanaman.nama_tanaman} 
              width={480} 
              height={480} 
              className="rounded-l-2xl" 
              style={{height: '100%', width: '100%', objectFit: 'cover', borderTopRightRadius: 0, borderBottomRightRadius: 0}}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "/placeholder-plant.png";
              }}
            />
          </div>
          <div className="bg-[#F0F5ED] rounded-r-2xl p-8 flex flex-col gap-2 min-w-[420px] max-w-[520px]" style={{boxShadow:'2px 2px 8px #b7c9a6'}}>
            <h2 className="text-[#3B5D2A] text-3xl md:text-4xl font-bold text-center mb-2" style={{fontFamily:'inherit'}}>{tanaman.nama_tanaman}</h2>
            <hr className="border-[#3B5D2A] mb-2" />
            <div className="text-[#222] text-base font-bold mb-1">Deskripsi Tanaman</div>
            <div className="text-[#222] text-base mb-2">{tanaman.deskripsi}</div>
            <div className="text-[#222] text-base font-bold mb-1">Detail Tanaman</div>
            <div className="flex flex-wrap gap-6 mb-2">
              <span className="bg-[#FFFFFF] text-[#3B5D2A] rounded-md px-3 py-1 text-sm font-semibold">Suhu : {tanaman.suhu}</span>
              <span className="bg-[#FFFFFF] text-[#3B5D2A] rounded-md px-3 py-1 text-sm font-semibold flex items-center gap-1">Level :
                <span className="flex items-center gap-0.5">
                  {Array.from({ length: tanaman.level_kesulitan }).map((_, i) => (
                    <svg key={i} width="18" height="18" fill="#FFD600" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                  ))}
                </span>
              </span>
              <span className="bg-[#FFFFFF] text-[#3B5D2A] rounded-md px-3 py-1 text-sm font-semibold">Harga : Rp.{tanaman.rata_harga.toLocaleString("id-ID")}</span>
            </div>
            <div className="flex flex-wrap gap-4 mb-2 justify-between">
            <div className="flex flex-col items-center pr-3 min-w-[100px]">
                <span className="text-[#222] text-sm font-semibold text-center">Lama Perawatan</span>
                <span className="text-[#3B5D2A] text-2xl font-bold">{tanaman.waktu_tumbuh}</span>
                <span className="text-[#222] text-xs">Hari</span>
            </div>
            
            <div className="flex flex-col items-center border-x border-[#B7C9A6] px-3 min-w-[140px]">
                <span className="text-[#222] text-sm font-semibold text-center">Cek Estimasi</span>
                <form onSubmit={handleEstCheck} className="flex flex-col items-center gap-1">
                <input 
                    type="date" 
                    value={estDate} 
                    onChange={e => {setEstDate(e.target.value); setEstResult(null);}} 
                    className="border rounded px-2 py-1 text-sm" 
                    style={{width:120}} 
                    required 
                />
                <button type="submit" className="bg-[#3B5D2A] text-white px-2 py-1 rounded text-xs font-semibold hover:bg-[#2e4a1f] transition mt-1">
                    Cek
                </button>
                {estResult && <span className="text-xs text-[#3B5D2A] mt-1 text-center">{estResult}</span>}
                </form>
            </div>
            
            <div className="flex flex-col items-center pl-3 min-w-[100px] flex-1">
                <span className="text-[#222] text-sm font-semibold text-center">Musim Panen</span>
                <span className="text-[#3B5D2A] text-base font-bold text-center leading-tight">{tanaman.musim_panen}</span>
            </div>
            </div>
            // Update tampilan tombol di JSX
            <button
              className={`w-full py-2 rounded-md font-semibold text-lg shadow transition mt-2 flex items-center justify-center gap-2 relative ${
                isInCollection 
                  ? 'bg-gray-500 text-white cursor-not-allowed' 
                  : 'bg-[#4B6A3D] text-white hover:brightness-95'
              }`}
              onClick={handleSaveCollection}
              disabled={isLoading || (isLoggedIn && isInCollection)}
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Menyimpan...
                </>
              ) : isLoggedIn ? (
                isInCollection ? (
                  <>
                    <svg width="22" height="22" fill="none" stroke="white" strokeWidth="2.2" viewBox="0 0 24 24" className="mr-1">
                      <path d="M5 13l4 4L19 7"/>
                    </svg>
                    Sudah di Koleksi
                  </>
                ) : (
                  <>
                    <svg width="22" height="22" fill="none" stroke="white" strokeWidth="2.2" viewBox="0 0 24 24" className="mr-1">
                      <path d="M6 3h12a1 1 0 0 1 1 1v17l-7-4-7 4V4a1 1 0 0 1 1-1z"/>
                    </svg>
                    Simpan ke Koleksi
                  </>
                )
              ) : (
                <>
                  <svg width="22" height="22" fill="none" stroke="white" strokeWidth="2.2" viewBox="0 0 24 24" className="mr-1">
                    <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>
                  </svg>
                  Silahkan Login untuk masukan ke koleksi
                </>
              )}
            </button>
          </div>
        </div>

        {/* Panduan Tanaman Dropdown */}
        <div className="w-full flex justify-center mt-8">
          <div className="w-[calc(520px+520px+2px)] max-w-full">
          <button onClick={() => setShowGuide(v => !v)} className="w-full bg-[#3B5D2A] text-white font-bold py-2 rounded-md flex items-center justify-between px-6 text-base focus:outline-none">
            <span>PANDUAN TANAMAN</span>
            <svg width="22" height="22" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24" className={showGuide ? 'rotate-180 transition' : 'transition'}><path d="M6 9l6 6 6-6"/></svg>
          </button>
          {showGuide && (
            <div className="bg-[#F0F5ED] border border-[#B7C9A6] rounded-b-md p-6 text-[#222] text-base flex flex-col gap-6" style={{boxShadow:'2px 2px 4px #b7c9a6'}}>
                {/* Video Section */}
                <div className="w-full flex justify-center">
                <div className="bg-white rounded-xl border border-[#B7C9A6] w-full max-w-2xl flex flex-col items-center p-4 mb-2">
                    {tanaman.link_youtube ? (
                    (() => {
                        const embedUrl = getYouTubeEmbedUrl(tanaman.link_youtube);
                        return embedUrl ? (
                        <iframe
                            width="500"
                            height="260"
                            src={embedUrl}
                            title={`Panduan Video ${tanaman.nama_tanaman}`}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="rounded-lg w-full max-w-[500px]"
                        />
                        ) : (
                        <div className="w-full max-w-[500px] h-[260px] bg-gray-200 rounded-lg flex items-center justify-center">
                            <span className="text-gray-500">Video tidak dapat dimuat</span>
                        </div>
                        );
                    })()
                    ) : (
                    <div className="w-full max-w-[500px] h-[260px] bg-gray-100 rounded-lg flex items-center justify-center">
                        <span className="text-gray-500">Video panduan belum tersedia</span>
                    </div>
                    )}
                </div>
                </div>

                {tanaman.panduan && tanaman.panduan.length > 0 && (
                <div className="flex flex-col sm:flex-row gap-8 justify-center items-center w-full">
                    {tanaman.panduan.slice(0, 5).map((panduan) => (
                    <div
                        key={panduan.id}
                        className="flex-1 min-w-[120px] max-w-[200px] h-52 bg-[#4A6741] rounded-lg flex flex-col justify-between items-center p-4"
                    >
                        <div className="flex flex-col items-center">
                        <span className="text-white font-bold text-lg mb-2">
                            STEP {panduan.step_number}
                        </span>
                        <span className="text-white text-center text-sm">
                            {panduan.step_title}
                        </span>
                        {panduan.tips && (
                            <span className="text-white text-center text-xs italic opacity-80 mt-2">
                            {panduan.tips}
                            </span>
                        )}
                        </div>
                    </div>
                    ))}
                </div>
                )}

                {/* Detail List - Dinamis berdasarkan data panduan */}
                {tanaman.panduan && tanaman.panduan.length > 0 ? (
                <ol className="list-decimal pl-6 mt-4 space-y-4">
                    {tanaman.panduan.map((panduan) => (
                    <li key={panduan.id}>
                        <span className="font-bold">{panduan.step_title}</span>
                        <div className="mt-2 text-sm">
                        <p>{panduan.step_content}</p>
                        
                        {panduan.alat_bahan && panduan.alat_bahan.length > 0 && (
                            <div className="mt-2">
                            <span className="font-semibold">Alat dan Bahan:</span>
                            <ul className="list-disc pl-6 mt-1">
                                {panduan.alat_bahan.map((alat, index) => (
                                <li key={index}>{alat}</li>
                                ))}
                            </ul>
                            </div>
                        )}
                        
                        {panduan.tips && (
                          <div className="mt-2 p-2 bg-[#B7C9A6] bg-opacity-30 rounded flex items-center gap-2">
                            <FaRegLightbulb className="text-[#3B5D2A]" />
                            <span className="font-semibold text-[#3B5D2A]">Tips:</span>
                            <span className="text-sm">{panduan.tips}</span>
                          </div>
                        )}
                        </div>
                    </li>
                    ))}
                </ol>
                ) : (
                // Fallback jika belum ada panduan
                <div className="text-center text-gray-500 py-8">
                    <p>Panduan untuk {tanaman.nama_tanaman} sedang dalam proses pengembangan.</p>
                    <p className="text-sm mt-2">Silakan cek kembali nanti untuk panduan lengkap.</p>
                </div>
                )}
            </div>
            )}
        </div>
        </div>

        {/* Carousel - Rekomendasi Tanaman Lain */}
        <div className="w-full bg-gradient-to-b from-[#5B7B4A] to-[#3B5D2A] py-10 mt-10">
        <div className="max-w-[1200px] mx-auto flex flex-col items-center">
            <h3 className="text-white text-2xl font-bold mb-6">Rekomendasi Tanaman Lainnya</h3>
            {rekomendasiTanaman.length > 0 ? (
            <div className="relative w-full flex items-center justify-center mb-6" style={{minHeight:'270px'}}>
                <button
                className="absolute -left-24 top-1/2 -translate-y-1/2 text-white text-3xl rounded-full w-12 h-12 flex items-center justify-center hover:bg-[#4B6A3D] shadow-lg disabled:opacity-40 disabled:cursor-not-allowed"
                aria-label="Prev"
                onClick={handlePrev}
                disabled={carouselIndex === 0}
                style={{zIndex:2}}
                >
                <svg width="32" height="32" fill="none" stroke="white" strokeWidth="3" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7"/></svg>
                </button>
                <div className="flex w-full justify-center gap-10">
                {rekomendasiTanaman.slice(carouselIndex, carouselIndex + visibleCards).map((item) => (
                    <Link 
                    key={item.id} 
                    href={`/jelajahi_tanaman/detail/${item.id}`}
                    className="bg-[#9DBDA5] rounded-2xl p-6 flex flex-col items-center min-w-[220px] max-w-[240px] shadow-lg hover:bg-[#7AA969] transition-colors cursor-pointer"
                    >
                    <div className="w-[200px] h-[200px] rounded-lg overflow-hidden mb-3">
                        <Image 
                        src={getImageUrl(item.foto_tanaman)} 
                        alt={item.nama_tanaman} 
                        width={150} 
                        height={150} 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = "/placeholder-plant.png";
                        }}
                        />
                    </div>
                    <span className="text-white font-semibold text-base mt-3 text-center">{item.nama_tanaman}</span>
                    <div className="flex gap-1 mt-2">
                        {Array.from({ length: item.level_kesulitan }).map((_, i) => (
                        <svg key={i} width="20" height="20" fill="#FFD600" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                        ))}
                    </div>
                    <span className="text-white text-sm mt-1">Rp.{item.rata_harga.toLocaleString("id-ID")}</span>
                    </Link>
                ))}
                </div>
                <button
                className="absolute -right-24 top-1/2 -translate-y-1/2 text-white text-3xl rounded-full w-12 h-12 flex items-center justify-center hover:bg-[#4B6A3D] shadow-lg disabled:opacity-40 disabled:cursor-not-allowed"
                aria-label="Next"
                onClick={handleNext}
                disabled={carouselIndex === maxIndex}
                style={{zIndex:2}}
                >
                <svg width="32" height="32" fill="none" stroke="white" strokeWidth="3" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7"/></svg>
                </button>
            </div>
            ) : (
            <div className="text-white text-center py-8">
                <p>Memuat rekomendasi tanaman...</p>
            </div>
            )}
        </div>
        </div>
      </div>
    </div>
  );
}