import Image from "next/image";

export default function LandingPage() {
  return (
    <div className="font-sans bg-[#F8F9F6]">
      {/* Header */}
      <header className="w-full bg-white flex items-center justify-between px-8 py-4 shadow-sm">
        <div className="flex items-center gap-2">
          <Image src="/logo.svg" alt="Lantai Hijau Logo" width={32} height={32} />
          <span className="text-[#3B5D2A] font-bold text-lg">Lantai Hijau</span>
        </div>
        <nav className="flex gap-8 text-sm text-[#222]">
          <a href="#dashboard" className="hover:underline">Dashboard</a>
          <a href="#artikel" className="hover:underline">Artikel</a>
          <a href="#tanaman" className="hover:underline">Jelajahii Tanaman</a>
        </nav>
        <div className="flex gap-2">
          <button className="px-6 py-1 rounded-full border border-[#3B5D2A] text-[#3B5D2A] bg-white hover:bg-[#F0F5ED]">Login</button>
          <button className="px-6 py-1 rounded-full border border-[#3B5D2A] text-white bg-[#3B5D2A] hover:bg-[#2e4a1f]">Register</button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="w-full bg-gradient-to-r from-[#4B6A3D] to-[#7CA16B] py-16 px-8 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex-1 max-w-xl">
          <h1 className="text-white text-4xl md:text-5xl font-bold mb-4">Selamat Datang</h1>
          <p className="text-white/90 mb-8">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas et venenatis augue nunc non scelerisque. Proin congue viverra risus placerat augue odio orci neque, felis metus tincidunt sed hac urna.</p>
          <button className="px-6 py-2 rounded-full bg-white text-[#3B5D2A] font-semibold shadow hover:bg-[#F0F5ED]">Mulai Sekarang</button>
        </div>
        <div className="flex-1 flex justify-center items-center relative">
          <Image src="/tanaman.svg" alt="Tanaman" width={320} height={320} className="z-10" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Image src="/hero-bg.svg" alt="Background" width={320} height={320} className="opacity-30" />
          </div>
        </div>
      </section>

      {/* Explore Section */}
      <section id="tanaman" className="w-full py-16 px-8 bg-white flex flex-col items-center">
        <h2 className="text-[#3B5D2A] text-3xl font-bold mb-2 text-center">Jelajahi Tanaman Pangan</h2>
        <p className="text-[#222] text-center max-w-2xl mb-8">Mauris egestas turpis. Vitae pulvinar lobortis vel ut at. Sed facilisis vestibulum, sed bibendum. Vitae, tristique suspendisse condimentum pulvinar rutrum dui sed tincidunt ut. Mauris porttitor diam facilisis sit amet.</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mb-8">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex flex-col items-center bg-[#F0F5ED] rounded-xl p-6 shadow">
              <Image src="/cabai.svg" alt="Tanaman Cabai" width={120} height={120} />
              <span className="mt-4 text-[#3B5D2A] font-semibold">Tanaman Cabai</span>
            </div>
          ))}
        </div>
        <button className="px-6 py-2 rounded-full border border-[#3B5D2A] text-[#3B5D2A] bg-white hover:bg-[#F0F5ED]">Lihat Semua</button>
      </section>

      {/* About Section */}
      <section className="w-full py-16 px-8 flex flex-col md:flex-row items-center gap-12 bg-[#F8F9F6] border-t">
        <div className="flex-1 flex justify-center">
          <Image src="/petani.svg" alt="Petani" width={200} height={200} className="rounded-xl" />
        </div>
        <div className="flex-1 max-w-xl">
          <h2 className="text-[#3B5D2A] text-3xl font-bold mb-4">Tentang Kita Semua</h2>
          <p className="text-[#222]">A wonderful serenity has taken possession of my entire soul, like these sweet mornings of spring which I enjoy with my whole heart. I am alone, and feel the charm of existence in this spot, which was created for the bliss of souls like mine. I am so happy, my dear friend, so absorbed in the exquisite sense of mere tranquil existence, that I neglect my talents.</p>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-16 px-8 bg-white flex flex-col items-center border-t">
        <h2 className="text-[#3B5D2A] text-3xl font-bold mb-2">Fitur</h2>
        <p className="text-[#222] text-center max-w-2xl mb-8">Mauris egestas turpis. Vitae pulvinar lobortis vel ut at. Sed facilisis vestibulum, sed bibendum. Vitae, tristique suspendisse condimentum pulvinar rutrum dui sed tincidunt ut. Mauris porttitor diam facilisis sit amet.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
          <div className="flex flex-col items-center bg-[#F0F5ED] rounded-xl p-8 shadow">
            <Image src="/feature-kebun.svg" alt="Kebun Virtual" width={64} height={64} />
            <h3 className="mt-4 text-[#3B5D2A] font-bold text-lg">Kebun Virtual</h3>
            <p className="text-center text-[#222] mt-2">Kebun virtual untuk mapping kebun secara virtual.</p>
          </div>
          <div className="flex flex-col items-center bg-[#F0F5ED] rounded-xl p-8 shadow">
            <Image src="/feature-jurnal.svg" alt="Jurnal" width={64} height={64} />
            <h3 className="mt-4 text-[#3B5D2A] font-bold text-lg">Jurnal</h3>
            <p className="text-center text-[#222] mt-2">Jurnal untuk mengisi catatan pertumbuhan tanamanmu.</p>
          </div>
          <div className="flex flex-col items-center bg-[#F0F5ED] rounded-xl p-8 shadow">
            <Image src="/feature-hasil.svg" alt="Hasil Panen" width={64} height={64} />
            <h3 className="mt-4 text-[#3B5D2A] font-bold text-lg">Hasil Panen</h3>
            <p className="text-center text-[#222] mt-2">Hasil panen yang sudah kamu dapatkan selama menanam sendiri.</p>
          </div>
        </div>
      </section>

      {/* Articles Section */}
      <section id="artikel" className="w-full py-16 px-8 bg-[#F8F9F6] flex flex-col items-center border-t">
        <h2 className="text-[#3B5D2A] text-3xl font-bold mb-8">Artikel</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl mb-8">
          <div className="bg-white rounded-xl shadow p-6 flex flex-col">
            <span className="text-xs text-[#888] mb-2">Monday 31 August 2021</span>
            <h3 className="text-[#3B5D2A] font-bold text-lg mb-2">Cara Merawat Cabai Saat Musim Hujan</h3>
            <Image src="/article-1.svg" alt="Cabai" width={160} height={100} className="rounded mb-2" />
            <p className="text-[#222] text-sm">Mauris egestas turpis. Vitae pulvinar lobortis vel ut at. Sed facilisis vestibulum, sed bibendum. Vitae, tristique suspendisse condimentum pulvinar rutrum dui sed tincidunt ut. Mauris porttitor diam facilisis sit amet.</p>
          </div>
          <div className="bg-white rounded-xl shadow p-6 flex flex-col">
            <span className="text-xs text-[#888] mb-2">Monday 31 August 2021</span>
            <h3 className="text-[#3B5D2A] font-bold text-lg mb-2">Pemuda ini Sukses Tanam Sawi di Rumah</h3>
            <Image src="/article-2.svg" alt="Sawi" width={160} height={100} className="rounded mb-2" />
            <p className="text-[#222] text-sm">Mauris egestas turpis. Vitae pulvinar lobortis vel ut at. Sed facilisis vestibulum, sed bibendum. Vitae, tristique suspendisse condimentum pulvinar rutrum dui sed tincidunt ut. Mauris porttitor diam facilisis sit amet.</p>
          </div>
          <div className="bg-white rounded-xl shadow p-6 flex flex-col">
            <span className="text-xs text-[#888] mb-2">Monday 31 August 2021</span>
            <h3 className="text-[#3B5D2A] font-bold text-lg mb-2">Tips Merawat Tanaman Bawang di Rumah</h3>
            <Image src="/article-3.svg" alt="Bawang" width={160} height={100} className="rounded mb-2" />
            <p className="text-[#222] text-sm">Mauris egestas turpis. Vitae pulvinar lobortis vel ut at. Sed facilisis vestibulum, sed bibendum. Vitae, tristique suspendisse condimentum pulvinar rutrum dui sed tincidunt ut. Mauris porttitor diam facilisis sit amet.</p>
          </div>
        </div>
        <button className="px-6 py-2 rounded-full border border-[#3B5D2A] text-[#3B5D2A] bg-white hover:bg-[#F0F5ED]">Lihat Semua</button>
      </section>

      {/* Footer */}
      <footer className="w-full bg-[#3B5D2A] text-white py-8 px-8 mt-16">
        <div className="flex flex-col md:flex-row md:justify-between items-center gap-4">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <Image src="/logo.svg" alt="Lantai Hijau Logo" width={32} height={32} />
            <span className="font-bold text-lg">Lantai Hijau</span>
          </div>
          <nav className="flex gap-6 text-sm">
            <a href="#tanaman" className="hover:underline">Tanaman</a>
            <a href="#" className="hover:underline">Kebun Virtual</a>
            <a href="#" className="hover:underline">Jurnal</a>
            <a href="#artikel" className="hover:underline">Artikel</a>
            <a href="#" className="hover:underline">Panen</a>
            <a href="#dashboard" className="hover:underline">Dashboard</a>
          </nav>
        </div>
        <div className="flex flex-col md:flex-row md:justify-between items-center mt-8 text-xs text-[#D1E7C6]">
          <span>LantaiHijau© 2025. All rights reserved.</span>
          <div className="flex gap-4 mt-2 md:mt-0">
            <a href="#" aria-label="Facebook"><svg width="16" height="16" fill="currentColor"><path d="M6.5 16V8.5H4V6h2.5V4.5C6.5 2.57 7.57 1.5 9.25 1.5c.66 0 1.23.05 1.39.07v2.42h-.95c-.75 0-.89.36-.89.88V6h2.5l-.33 2.5h-2.17V16H6.5z"/></svg></a>
            <a href="#" aria-label="Twitter"><svg width="16" height="16" fill="currentColor"><path d="M16 3.039a6.461 6.461 0 0 1-1.885.516A3.301 3.301 0 0 0 15.555 2a6.533 6.533 0 0 1-2.084.797A3.286 3.286 0 0 0 7.88 5.03a9.325 9.325 0 0 1-6.767-3.429a3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 5.575v.045a3.288 3.288 0 0 0 2.632 3.218a3.203 3.203 0 0 1-.865.115c-.211 0-.417-.021-.616-.061a3.293 3.293 0 0 0 3.067 2.281A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15c6.038 0 9.341-5.003 9.341-9.341c0-.142-.004-.284-.01-.425A6.673 6.673 0 0 0 16 3.039z"/></svg></a>
            <a href="#" aria-label="Instagram"><svg width="16" height="16" fill="currentColor"><circle cx="8" cy="8" r="3.5"/><path d="M8 0C5.74 0 5.332.01 4.488.048c-.844.038-1.42.166-1.926.35a3.92 3.92 0 0 0-1.418.92a3.92 3.92 0 0 0-.92 1.418c-.184.506-.312 1.082-.35 1.926C.01 5.332 0 5.74 0 8s.01 2.668.048 3.512c.038.844.166 1.42.35 1.926a3.92 3.92 0 0 0 .92 1.418a3.92 3.92 0 0 0 1.418.92c.506.184 1.082.312 1.926.35C5.332 15.99 5.74 16 8 16s2.668-.01 3.512-.048c.844-.038 1.42-.166 1.926-.35a3.92 3.92 0 0 0 1.418-.92a3.92 3.92 0 0 0 .92-1.418c.184-.506.312-1.082.35-1.926C15.99 10.668 16 10.26 16 8s-.01-2.668-.048-3.512c-.038-.844-.166-1.42-.35-1.926a3.92 3.92 0 0 0-.92-1.418a3.92 3.92 0 0 0-1.418-.92c-.506-.184-1.082-.312-1.926-.35C10.668.01 10.26 0 8 0zm0 1.44c2.222 0 2.484.008 3.36.048c.808.037 1.247.166 1.54.276c.388.15.665.33.957.622c.292.292.472.569.622.957c.11.293.239.732.276 1.54c.04.876.048 1.138.048 3.36s-.008 2.484-.048 3.36c-.037.808-.166 1.247-.276 1.54a2.48 2.48 0 0 1-.622.957a2.48 2.48 0 0 1-.957.622c-.293.11-.732.239-1.54.276c-.876.04-1.138.048-3.36.048s-2.484-.008-3.36-.048c-.808-.037-1.247-.166-1.54-.276a2.48 2.48 0 0 1-.957-.622a2.48 2.48 0 0 1-.622-.957c-.11-.293-.239-.732-.276-1.54C1.448 10.484 1.44 10.222 1.44 8s.008-2.484.048-3.36c.037-.808.166-1.247.276-1.54a2.48 2.48 0 0 1 .622-.957a2.48 2.48 0 0 1 .957-.622c.293-.11.732-.239 1.54-.276C5.516 1.448 5.778 1.44 8 1.44z"/></svg></a>
            <a href="#" aria-label="LinkedIn"><svg width="16" height="16" fill="currentColor"><path d="M2.447 2.447A1.72 1.72 0 1 1 0 4.167a1.72 1.72 0 0 1 2.447-1.72zM.34 5.339h2.21V16H.34V5.339zM5.339 5.339h2.12v1.453h.03c.295-.56 1.016-1.153 2.092-1.153c2.237 0 2.65 1.473 2.65 3.387V16h-2.21v-5.339c0-1.273-.023-2.91-1.773-2.91c-1.773 0-2.044 1.385-2.044 2.816V16h-2.21V5.339z"/></svg></a>
          </div>
        </div>
      </footer>
    </div>
  );
}
