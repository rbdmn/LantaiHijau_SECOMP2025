"use client";
import Image from "next/image";
import { useState } from "react";
import NavbarUtama from "../../../components/navigation/navbar_utama";

export default function DetailNoLogin() {
  const [showGuide, setShowGuide] = useState(false);
  const [estDate, setEstDate] = useState("");
  const [estResult, setEstResult] = useState<string | null>(null);
  // Carousel logic
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
  const maxIndex = carouselData.length - visibleCards;
  const handlePrev = () => setCarouselIndex(i => Math.max(0, i - 1));
  const handleNext = () => setCarouselIndex(i => Math.min(maxIndex, i + 1));

  // Dummy: 14 days after input
  const handleEstCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (!estDate) return;
    const inputDate = new Date(estDate);
    inputDate.setDate(inputDate.getDate() + 14);
    const result = inputDate.toLocaleDateString("id-ID");
    setEstResult(result);
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      <NavbarUtama />
    

      {/* Back Arrow */}
      <div className="px-8 pt-6">
        <button onClick={() => window.history.back()} className="text-[#3B5D2A] text-3xl font-bold rounded-full hover:bg-[#F0F5ED] w-10 h-10 flex items-center justify-center mt-[60px]">
          <svg width="28" height="28" fill="none" stroke="#3B5D2A" strokeWidth="3" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7"/></svg>
        </button>
      </div>

      {/* Main Detail */}
      <div className="flex flex-col items-center mt-2">
        <div className="flex flex-col md:flex-row gap-[2px] items-center mt-2">
          <div className="bg-[#EAF5E2] rounded-l-2xl p-0 flex items-center justify-center" style={{boxShadow:'2px 2px 8px #b7c9a6', height: '520px', minHeight: '520px', minWidth: '520px'}}>
            <Image src="/cabai.svg" alt="Tanaman Cabai" width={480} height={480} className="rounded-l-2xl" style={{height: '100%', width: '100%', objectFit: 'cover', borderTopRightRadius: 0, borderBottomRightRadius: 0}} />
          </div>
          <div className="bg-[#F0F5ED] rounded-r-2xl p-8 flex flex-col gap-2 min-w-[420px] max-w-[520px]" style={{boxShadow:'2px 2px 8px #b7c9a6'}}>
            <h2 className="text-[#3B5D2A] text-3xl md:text-4xl font-bold text-center mb-2" style={{fontFamily:'inherit'}}>Tanaman Cabai</h2>
            <hr className="border-[#3B5D2A] mb-2" />
            <div className="text-[#222] text-base font-bold mb-1">Deskripsi Tanaman</div>
            <div className="text-[#222] text-base mb-2">Tanaman cabai cocok untuk ditanam di pot dan area sempit. Membutuhkan sinar matahari cukup dan penyiraman teratur. Cocok untuk dapur rumah.</div>
            <div className="text-[#222] text-base font-bold mb-1">Detail Tanaman</div>
            <div className="flex flex-wrap gap-6 mb-2">
              <span className="bg-[#B7C9A6] text-[#3B5D2A] rounded-md px-3 py-1 text-sm font-semibold">Suhu : 24~30°C</span>
              <span className="bg-[#B7C9A6] text-[#3B5D2A] rounded-md px-3 py-1 text-sm font-semibold flex items-center gap-1">Level :
                <span className="flex items-center gap-0.5">
                  <svg width="18" height="18" fill="#FFD600" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                  <svg width="18" height="18" fill="#FFD600" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                  <svg width="18" height="18" fill="#FFD600" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                </span>
              </span>
              <span className="bg-[#B7C9A6] text-[#3B5D2A] rounded-md px-3 py-1 text-sm font-semibold">Harga : Rp.15.000</span>
            </div>
            <div className="flex flex-wrap gap-8 mb-2">
              <div className="flex flex-col items-center pr-3">
                <span className="text-[#222] text-sm font-semibold">Lama Perawatan</span>
                <span className="text-[#3B5D2A] text-2xl font-bold">14</span>
                <span className="text-[#222] text-xs">Hari</span>
              </div>
              <div className="flex flex-col items-center border-x border-[#B7C9A6] px-3">
                <span className="text-[#222] text-sm font-semibold">Cek Estimasi</span>
                <form onSubmit={handleEstCheck} className="flex flex-col items-center gap-1">
                  <input type="date" value={estDate} onChange={e => {setEstDate(e.target.value); setEstResult(null);}} className="border rounded px-2 py-1 text-sm" style={{width:120}} required />
                  <button type="submit" className="bg-[#3B5D2A] text-white px-2 py-1 rounded text-xs font-semibold hover:bg-[#2e4a1f] transition mt-1">Cek</button>
                  {estResult && <span className="text-xs text-[#3B5D2A] mt-1">{estResult}</span>}
                </form>
              </div>
              <div className="flex flex-col items-center pl-3">
                <span className="text-[#222] text-sm font-semibold">Musim Panen</span>
                <span className="text-[#3B5D2A] text-base font-bold">Sepanjang</span>
                <span className="text-[#222] text-xs">Tahun</span>
              </div>
            </div>
            <button className="w-full py-2 rounded-md bg-[#4B6A3D] text-white font-semibold text-lg shadow hover:brightness-95 transition mt-2" onClick={() => alert('Login untuk menyimpan ke koleksi!')}>Login untuk menyimpan ke koleksi</button>
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
              {/* Video/Image Section */}
              <div className="w-full flex justify-center">
                <div className="bg-white rounded-xl border border-[#B7C9A6] w-full max-w-2xl flex flex-col items-center p-4 mb-2">
                  <Image src="/panduan-video-placeholder.svg" alt="Panduan Video" width={500} height={260} className="rounded-lg" style={{width:'100%',height:'auto',maxWidth:500}} />
                </div>
              </div>
              {/* Step Cards */}
              <div className="flex flex-col sm:flex-row gap-8 justify-center items-center w-full">
                {[1,2,3,4].map((step) => (
                  <div key={step} className="flex-1 min-w-[120px] max-w-[200px] bg-[#4A6741] rounded-lg flex flex-col items-center p-4">
                    <span className="text-white font-bold text-lg mb-2">STEP {step}</span>
                    <span className="text-white text-center text-sm">pulvinar rutrum dui sed tincidunt ut. Mauris forttitor diam facilisis sit amet.</span>
                  </div>
                ))}
              </div>
              {/* Detail List */}
              <ol className="list-decimal pl-6 mt-4 space-y-3">
                <li>
                  <span className="font-bold">Persiapan Alat dan Bahan</span>
                  <ul className="list-disc pl-6">
                    <li>Alat dan bahan yang dibutuhkan:</li>
                    <li>Wadah benih/penyemaian (diameter minimal 20 cm)</li>
                    <li>Media tanam: tanah subur, pupuk kandang, dan sekam (perbandingan 1:1:1)</li>
                    <li>Benih cabai (pilih yang segar/berkualitas)</li>
                    <li>Alat siram (gembor/semprot)</li>
                    <li>Sinar matahari (lokasi mendapat sinar 4–6 jam per hari)</li>
                  </ul>
                </li>
                <li>
                  <span className="font-bold">Penyemaian Benih</span>
                  <ul className="list-disc pl-6">
                    <li>Langkah awal: pilih benih segar yang sehat.</li>
                    <li>Rendam benih dalam air hangat selama 3–6 jam.</li>
                    <li>Sebar benih tipis-tipis di media tanam, tutup tipis dengan tanah/kompos halus, &amp; disemprot/media tanam tipis.</li>
                    <li>Siram secukupnya &amp; tempatkan di tempat teduh, siram teratur pagi/sore.</li>
                    <li>Setelah 7–10 hari benih mulai tumbuh, bibit siap dipindah saat tinggi 10–15 cm dan berdaun 4–6 helai.</li>
                  </ul>
                </li>
                <li>
                  <span className="font-bold">Penanaman Bibit</span>
                  <ul className="list-disc pl-6">
                    <li>Siapkan pot/tanah dengan media tanam campuran (tanah + kompos + sekam).</li>
                    <li>Buat lubang tanam sedalam 7–10 cm.</li>
                    <li>Pindahkan bibit secara hati-hati, jangan sampai akar rusak, padatkan tanah di sekitar akar.</li>
                    <li>Siram secukupnya &amp; letakkan di tempat yang mendapat sinar matahari.</li>
                  </ul>
                </li>
                <li>
                  <span className="font-bold">Perawatan Rutin</span>
                  <ul className="list-disc pl-6">
                    <li>Siram tanaman 1–2 kali sehari, jangan sampai tergenang air.</li>
                    <li>Pupuk ulang setiap 2 minggu sekali.</li>
                    <li>Cabut gulma/rumput liar di sekitar tanaman secara berkala.</li>
                    <li>Periksa hama/penyakit, buang daun/buah yang terserang.</li>
                  </ul>
                </li>
                <li>
                  <span className="font-bold">Panen</span>
                  <ul className="list-disc pl-6">
                    <li>Cabai bisa mulai dipanen 2,5–3 bulan setelah tanam.</li>
                    <li>Panen cabai saat sudah merah dan segar.</li>
                    <li>Gunakan gunting atau petik langsung dengan tangan secara hati-hati.</li>
                  </ul>
                </li>
              </ol>
            </div>
          )}
        </div>
        </div>

        {/* Carousel */}
        <div className="w-full bg-gradient-to-b from-[#5B7B4A] to-[#3B5D2A] py-10 mt-10">
          <div className="max-w-[1200px] mx-auto flex flex-col items-center">
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
                {carouselData.slice(carouselIndex, carouselIndex + visibleCards).map((item, i) => (
                  <div key={carouselIndex + i} className="bg-[#8CB97A] rounded-2xl p-6 flex flex-col items-center min-w-[220px] max-w-[240px] shadow-lg">
                    <Image src={item.img} alt={item.title} width={150} height={150} />
                    <span className="text-white font-semibold text-base mt-3">{item.title}</span>
                    <div className="flex gap-1 mt-2">
                      <svg width="20" height="20" fill="#FFD600" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                      <svg width="20" height="20" fill="#FFD600" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                      <svg width="20" height="20" fill="#FFD600" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                    </div>
                  </div>
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
          </div>
        </div>
      </div>
    </div>
  );
}
