"use client";
import Image from "next/image";
import { useState } from "react";
import NavbarUtama from "../../../components/navigation/navbar_utama";
import Sidebar from "../../../components/navigation/sidebar";

export default function DashboardPage() {
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ nama: "", panjang: "", lebar: "" });

  return (
    <div className="min-h-screen bg-[#F8F9F6] flex flex-col">
      {/* Navbar at the very top */}
      <NavbarUtama />
      
      {/* Main content with sidebar */}
      <div className="flex flex-1">
        {/* Sidebar on the left */}
        <Sidebar />
        
        {/* Main content area */}
        <div className="flex-1 p-6 pt-4 flex flex-col gap-6 ml-24"> {/* Added ml-24 to account for sidebar width */}
          {/* Judul Dashboard with proper spacing */}
          <div className="mt-2">
            <h1 className="text-3xl font-bold text-[#3B5D2A]">Dashboard</h1>
          </div>

          {/* Modal Form Kebun Virtual */}
          {showModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
              <div className="bg-[#EAF3E2] rounded-2xl shadow-lg p-6 min-w-[320px] max-w-xs w-full relative animate-fadeIn">
                <button
                  className="absolute top-3 right-3 text-[#3B5D2A] text-xl font-bold hover:bg-[#dbeed2] rounded-full w-7 h-7 flex items-center justify-center"
                  onClick={() => setShowModal(false)}
                  aria-label="Tutup"
                >
                  x
                </button>
                <h2 className="text-2xl font-bold text-[#3B5D2A] text-center mb-4">Kebun Virtual</h2>
                <form className="flex flex-col gap-3">
                  <label className="text-sm text-[#3B5D2A] font-medium">Nama Kebun
                    <input
                      type="text"
                      className="mt-1 w-full rounded-md border border-[#D6E5C2] px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#3B5D2A] bg-white"
                      value={form.nama}
                      onChange={e => setForm(f => ({ ...f, nama: e.target.value }))}
                      placeholder="Nama Kebun"
                    />
                  </label>
                  <div className="flex gap-2">
                    <label className="flex-1 text-sm text-[#3B5D2A] font-medium">Panjang
                      <input
                        type="number"
                        className="mt-1 w-full rounded-md border border-[#D6E5C2] px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#3B5D2A] bg-white"
                        value={form.panjang}
                        onChange={e => setForm(f => ({ ...f, panjang: e.target.value }))}
                        placeholder="Panjang"
                      />
                    </label>
                    <label className="flex-1 text-sm text-[#3B5D2A] font-medium">Lebar
                      <input
                        type="number"
                        className="mt-1 w-full rounded-md border border-[#D6E5C2] px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#3B5D2A] bg-white"
                        value={form.lebar}
                        onChange={e => setForm(f => ({ ...f, lebar: e.target.value }))}
                        placeholder="Lebar"
                      />
                    </label>
                  </div>
                  <button
                    type="button"
                    className="mt-2 w-full bg-[#3B5D2A] text-white rounded-md py-2 font-semibold hover:bg-[#2e4a1f] transition"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* Atas: Kebun Virtual & To-Do List */}
          <div className="flex flex-col lg:flex-row gap-6 w-full">
            {/* Kebun Virtual */}
            <div className="flex-1 bg-[#EAF3E2] rounded-xl shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-[#3B5D2A]">Kebun Virtual</h2>
                <button
                  className="w-8 h-8 flex items-center justify-center rounded-full border border-[#3B5D2A] text-[#3B5D2A] hover:bg-[#dbeed2]"
                  onClick={() => setShowModal(true)}
                >
                  <span className="text-2xl leading-none">+</span>
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {[1,2,3].map((n) => (
                  <button key={n} className="flex items-center justify-between bg-white rounded-lg px-4 py-2 shadow border border-[#D6E5C2] hover:bg-[#f3f8ef]">
                    <span className="text-sm text-[#3B5D2A] font-medium">NAMA KEBUN {n}</span>
                    <span className="text-[#3B5D2A] text-lg">&gt;</span>
                  </button>
                ))}
              </div>
            </div>

            {/* To-Do List */}
            <div className="flex-1 bg-white rounded-xl shadow p-6">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-bold text-[#3B5D2A]">To-Do List</h2>
                <span className="text-xs text-[#3B5D2A]">Senin, 25 Januari 2025</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                {[1,2,3,4,5,6].map((n) => (
                  <div key={n} className="flex items-center gap-3 p-2 bg-[#F8F9F6] rounded-lg">
                    <input type="checkbox" className="w-5 h-5 accent-[#3B5D2A]" />
                    <Image src="/cabai.svg" alt="Tanaman Cabai" width={48} height={48} />
                    <div>
                      <div className="font-semibold text-[#3B5D2A] leading-tight">Tanaman Cabai</div>
                      <div className="text-sm text-[#222] leading-tight">Siram Hari ini!</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Hasil Panen */}
          <div className="bg-[#EAF3E2] rounded-xl shadow p-6 w-full">
            <h2 className="text-xl font-bold text-[#3B5D2A] mb-4">Hasil Panen</h2>
            <div className="flex flex-col gap-6">
              {[1,2].map((n) => (
                <div key={n} className="bg-white rounded-lg shadow p-4 flex flex-col md:flex-row items-start gap-4 border border-[#D6E5C2]">
                  <div className="flex flex-col items-center w-32 min-w-[100px]">
                    <Image src="/cabai.svg" alt="Tanaman Cabai" width={64} height={64} />
                    <span className="text-[#3B5D2A] text-sm mt-2">Tanaman Cabai</span>
                  </div>
                  <div className="flex-1 overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="text-[#3B5D2A] font-semibold">
                          <th className="text-left pb-2 px-3 border-b border-r border-[#D6E5C2]">Tanggal</th>
                          <th className="text-left pb-2 px-3 border-b border-r border-[#D6E5C2]">Kuantitas Panen</th>
                          <th className="text-left pb-2 px-3 border-b border-r border-[#D6E5C2]">Harga Tanam</th>
                          <th className="text-left pb-2 px-3 border-b">Rata-Rata Harga Pasar</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="py-2 px-3 border-b border-r border-[#D6E5C2]">18/12/2025</td>
                          <td className="py-2 px-3 border-b border-r border-[#D6E5C2]">2090 gram</td>
                          <td className="py-2 px-3 border-b border-r border-[#D6E5C2]">Rp. 19.000</td>
                          <td className="py-2 px-3 border-b">Rp. 30.000/Kg</td>
                        </tr>
                        <tr>
                          <td className="py-2 px-3 border-r border-[#D6E5C2] font-semibold text-[#3B5D2A]">Total Penghematan:</td>
                          <td className="py-2 px-3 border-r border-[#D6E5C2]"></td>
                          <td className="py-2 px-3 border-r border-[#D6E5C2]"></td>
                          <td className="py-2 px-3 font-semibold text-[#3B5D2A]">Rp43.700</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center mt-6 bg-[#3B5D2A] text-white rounded shadow px-6 py-3 text-lg font-semibold">
              <span>Total Keseluruhan Penghematan :</span>
              <span>Rp. 80.860</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}