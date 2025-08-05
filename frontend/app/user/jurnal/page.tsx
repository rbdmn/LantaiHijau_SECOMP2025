"use client";
import Image from "next/image";
import { useState } from "react";

const initialJurnal = [
  {
    id: 1,
    tanaman: "Tanaman Cabai",
    img: "/cabai.svg",
    mulai: "12/07/2025",
    panen: "27/07/2025",
    catatan: "Bagus",
    dokumentasi: "/tanaman-foto.jpg",
  },
  {
    id: 2,
    tanaman: "Tanaman Cabai",
    img: "/cabai.svg",
    mulai: "12/07/2025",
    panen: "27/07/2025",
    catatan: "Bagus",
    dokumentasi: "/tanaman-foto.jpg",
  },
  {
    id: 3,
    tanaman: "Tanaman Cabai",
    img: "/cabai.svg",
    mulai: "12/07/2025",
    panen: "27/07/2025",
    catatan: "Bagus",
    dokumentasi: "/tanaman-foto.jpg",
  },
];

export default function JurnalPage() {
  const [jurnal, setJurnal] = useState(initialJurnal);
  const [lastUpdate] = useState("27 / 07 / 2025");
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    nama: "",
    mulai: "",
    panen: "",
    catatan: "",
    foto: null as File | null,
  });

  const handleEdit = (id: number) => {
    alert(`Edit Jurnal ID: ${id}`);
  };
  const handleDelete = (id: number) => {
    if (confirm("Yakin ingin menghapus jurnal ini?")) {
      setJurnal(jurnal.filter(j => j.id !== id));
    }
  };
  const handleAdd = () => {
    setShowModal(true);
  };
  const handleModalClose = () => {
    setShowModal(false);
    setForm({ nama: "", mulai: "", panen: "", catatan: "", foto: null });
  };
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, files } = e.target as any;
    if (name === "foto") {
      setForm(f => ({ ...f, foto: files[0] }));
    } else {
      setForm(f => ({ ...f, [name]: value }));
    }
  };
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Submit jurnal baru (Demo only)");
    handleModalClose();
  };

  return (
    <div className="min-h-screen bg-[#F8F9F6] font-sans">
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
        <div className="flex gap-2 items-center">
          <button
            className="w-10 h-10 flex items-center justify-center rounded-full border border-[#3B5D2A] text-[#3B5D2A] bg-white hover:bg-[#F0F5ED]"
            aria-label="Logout"
            onClick={() => alert("Logout clicked! (Demo only)")}
          >
            <svg width="22" height="22" fill="none" stroke="#3B5D2A" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="8" r="4"/><path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2"/></svg>
          </button>
        </div>
      </header>

      {/* Title */}
      <div className="px-8 pt-8">
        <h1 className="text-[#3B5D2A] text-5xl font-bold mb-6" style={{fontFamily:'inherit'}}>Jurnal</h1>
      </div>

      {/* Update & Add Bar */}
      <div className="flex items-center px-8 mb-4">
        <div className="flex flex-1 min-w-0">
          <button className="w-full text-left bg-[#4B6A3D] text-white font-semibold py-2 px-4 rounded-tl-lg rounded-bl-lg rounded-tr-none rounded-br-none" style={{borderTopLeftRadius:12, borderBottomLeftRadius:12, borderTopRightRadius:0, borderBottomRightRadius:0}}>
            Update Terakhir
          </button>
          <div className="bg-[#4B6A3D] text-white font-semibold py-2 px-6 rounded-tr-lg rounded-br-lg select-none flex items-center justify-center -ml-px whitespace-nowrap text-base" style={{borderTopRightRadius:12, borderBottomRightRadius:12, borderTopLeftRadius:0, borderBottomLeftRadius:0, minWidth:120}}>
            {lastUpdate}
          </div>
        </div>
        <button onClick={handleAdd} className="ml-4 flex items-center gap-2 bg-[#3B5D2A] text-white font-semibold py-2 px-5 rounded-lg hover:bg-[#2e4a1f] transition whitespace-nowrap">
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 8v8M8 12h8"/></svg>
          Tambah
        </button>
      </div>

      {/* Table */}
      <div className="px-8">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse rounded-xl overflow-hidden" style={{background:'#F0F5ED'}}>
            <thead>
              <tr className="bg-[#E6EDDD] text-[#3B5D2A] text-lg">
                <th className="border border-[#D1E7C6] px-4 py-3 font-semibold">No</th>
                <th className="border border-[#D1E7C6] px-4 py-3 font-semibold">Tanaman</th>
                <th className="border border-[#D1E7C6] px-4 py-3 font-semibold">Mulai Menanam</th>
                <th className="border border-[#D1E7C6] px-4 py-3 font-semibold">Tanggal Panen</th>
                <th className="border border-[#D1E7C6] px-4 py-3 font-semibold">Catatan</th>
                <th className="border border-[#D1E7C6] px-4 py-3 font-semibold">Dokumentasi</th>
                <th className="border border-[#D1E7C6] px-4 py-3 font-semibold">Tombol Aksi</th>
              </tr>
            </thead>
            <tbody>
              {jurnal.map((row, idx) => (
                <tr key={row.id} className="text-[#222] text-base text-center bg-[#F8F9F6] even:bg-[#EAF5E2]">
                  <td className="border border-[#D1E7C6] px-2 py-3 align-middle">{idx + 1}.</td>
                  <td className="border border-[#D1E7C6] px-2 py-3 align-middle">
                    <div className="flex flex-col items-center">
                      <div className="bg-[#B7C9A6] rounded-xl p-2 mb-1">
                        <Image src={row.img} alt={row.tanaman} width={70} height={70} />
                      </div>
                      <span className="text-[#3B5D2A] font-semibold text-sm">{row.tanaman}</span>
                    </div>
                  </td>
                  <td className="border border-[#D1E7C6] px-2 py-3 align-middle">{row.mulai}</td>
                  <td className="border border-[#D1E7C6] px-2 py-3 align-middle">{row.panen}</td>
                  <td className="border border-[#D1E7C6] px-2 py-3 align-middle">{row.catatan}</td>
                  <td className="border border-[#D1E7C6] px-2 py-3 align-middle">
                    <div className="flex justify-center">
                      <Image src={row.dokumentasi} alt="Dokumentasi" width={70} height={70} className="rounded-lg object-cover" />
                    </div>
                  </td>
                  <td className="border border-[#D1E7C6] px-2 py-3 align-middle">
                    <div className="flex flex-row gap-2 items-center justify-center">
                      <button
                        onClick={() => handleEdit(row.id)}
                        className="bg-[#3B5D2A] text-white px-5 py-1 rounded-md font-medium hover:bg-[#2e4a1f] transition text-base min-w-[70px]"
                        style={{borderRadius: '10px'}}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(row.id)}
                        className="bg-[#3B5D2A] text-white px-5 py-1 rounded-md font-medium hover:bg-red-700 transition text-base min-w-[70px]"
                        style={{borderRadius: '10px'}}
                      >
                        Hapus
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Form Tambah */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-20">
          <div className="rounded-xl shadow-lg p-8 w-full max-w-md relative border" style={{minWidth:340, background: 'rgba(232, 241, 222, 0.95)'}}>
            <button
              className="absolute top-4 right-4 text-2xl text-[#3B5D2A] hover:text-red-600 font-bold"
              onClick={handleModalClose}
              aria-label="Tutup"
            >
              ×
            </button>
            <h2 className="text-[#3B5D2A] text-3xl font-bold text-center mb-6" style={{fontFamily:'inherit'}}>Jurnal</h2>
            <form onSubmit={handleFormSubmit} className="flex flex-col gap-3">
              <label className="text-[#222] font-medium">Nama
                <input name="nama" value={form.nama} onChange={handleFormChange} className="w-full mt-1 px-3 py-2 border rounded-md bg-white bg-opacity-80" required />
              </label>
              <label className="text-[#222] font-medium">Mulai Menanam
                <input type="date" name="mulai" value={form.mulai} onChange={handleFormChange} className="w-full mt-1 px-3 py-2 border rounded-md bg-white bg-opacity-80" required />
              </label>
              <label className="text-[#222] font-medium">Tanggal Panen
                <input type="date" name="panen" value={form.panen} onChange={handleFormChange} className="w-full mt-1 px-3 py-2 border rounded-md bg-white bg-opacity-80" required />
              </label>
              <label className="text-[#222] font-medium">Catatan
                <textarea name="catatan" value={form.catatan} onChange={handleFormChange} className="w-full mt-1 px-3 py-2 border rounded-md bg-white bg-opacity-80" rows={2} required />
              </label>
              <label className="text-[#222] font-medium">Upload Foto
                <input name="foto" type="file" accept="image/*" onChange={handleFormChange} className="w-full mt-1 px-3 py-2 border rounded-md bg-[#F0F5ED] bg-opacity-80" />
                <div className="text-xs text-[#888] mt-1">Upload Max : 500KB</div>
              </label>
              <button type="submit" className="mt-4 w-full py-2 rounded-md bg-[#4B6A3D] text-white font-semibold text-lg shadow hover:brightness-95 transition">Submit</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
