import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#6B8F5A] to-[#3B5D2A]">
      {/* Header */}
      <header className="w-full bg-white flex items-center justify-between px-8 py-4 shadow-sm">
        <div className="flex items-center gap-2">
          <Image src="/logo.svg" alt="Lantai Hijau Logo" width={32} height={32} />
          <span className="text-[#3B5D2A] font-bold text-lg">Lantai Hijau</span>
        </div>
        <nav className="flex gap-8 text-sm text-[#222]">
          <a href="#dashboard" className="hover:underline">Dashboard</a>
          <a href="#artikel" className="hover:underline">Artikel</a>
          <a href="#tanaman" className="hover:underline">Jelajahi Tanaman</a>
        </nav>
        <div className="flex gap-2">
          <button className="px-6 py-1 rounded-full bg-[#3B5D2A] text-white hover:bg-[#2e4a1f]">Login</button>
          <button className="px-6 py-1 rounded-full border border-[#3B5D2A] text-[#3B5D2A] bg-white hover:bg-[#F0F5ED]">Register</button>
        </div>
      </header>
      {/* Login Card */}
      <main className="flex flex-1 items-center justify-center">
        <div className="bg-[#E6EDDD] rounded-2xl shadow-lg px-8 py-12 w-full max-w-md flex flex-col items-center">
          <h1 className="text-4xl font-bold text-[#3B5D2A] mb-6">Login</h1>
          <div className="mb-6">
            <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
            <circle cx="50" cy="50" r="48" stroke="#3B5D2A" strokeWidth="4" />
            <circle cx="50" cy="35" r="15" stroke="#3B5D2A" strokeWidth="4" />
            <path
                d="M25 75c0-13.81 11.19-25 25-25s25 11.19 25 25"
                stroke="#3B5D2A"
                strokeWidth="4"
                strokeLinecap="round"
            />
            </svg>
          </div>
          <form className="w-full flex flex-col gap-4">
            <input type="text" placeholder="Username" className="w-full px-4 py-3 rounded-md border border-[#C3D1B6] focus:outline-none focus:ring-2 focus:ring-[#3B5D2A] bg-white" />
            <div className="relative w-full">
              <input type="password" placeholder="Password" className="w-full px-4 py-3 rounded-md border border-[#C3D1B6] focus:outline-none focus:ring-2 focus:ring-[#3B5D2A] bg-white pr-10" />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer">
                <svg width="22" height="22" fill="none" stroke="#222" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M2 12C3.73 7.61 7.94 4.5 12 4.5c4.06 0 8.27 3.11 10 7.5-1.73 4.39-5.94 7.5-10 7.5-4.06 0-8.27-3.11-10-7.5z"/></svg>
              </span>
            </div>
            <button type="submit" className="w-full mt-2 bg-[#3B5D2A] text-white py-3 rounded-md font-semibold hover:bg-[#2e4a1f] transition">Login</button>
          </form>
          <p className="mt-6 text-center text-[#222] text-sm">Belum punya akun? <a href="#" className="text-[#3B5D2A] underline font-medium">Register</a></p>
        </div>
      </main>
    </div>
  );
}