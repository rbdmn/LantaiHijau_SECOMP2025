"use client";
import Image from "next/image";
import { useState } from "react";
import NavbarUtama from "../../../components/navigation/navbar_utama";

const initialPanen = [
  { id: 1, nama: "Cabai", tanggal: "18/12/2025", img: "/cabai.svg", kuantitas: "2090 gram", hargaTanam: 19000, hargaPasar: 30000, penghematan: 43700 },
  { id: 2, nama: "Cabai", tanggal: "18/12/2025", img: "/cabai.svg", kuantitas: "2090 gram", hargaTanam: 19000, hargaPasar: 30000, penghematan: 43700 },
  { id: 3, nama: "Cabai", tanggal: "18/12/2025", img: "/cabai.svg", kuantitas: "2090 gram", hargaTanam: 19000, hargaPasar: 30000, penghematan: 43700 },
];

export default function HasilPanenPage() {
  const [panen, setPanen] = useState(initialPanen);
  const [selected, setSelected] = useState<number[]>([]); // untuk hasil panen
  const [selectedPenghematan, setSelectedPenghematan] = useState<number[]>([]); // untuk penghematan
  const [form, setForm] = useState({ nama: "", tanggal: "", kuantitas: "", hargaTanam: "" });
  const [total, setTotal] = useState(80860);
  const [cardChecked, setCardChecked] = useState<number | null>(null);

  // Card selection
  // Untuk hasil panen
  const handleSelect = (id: number) => {
    setSelected(sel => sel.includes(id) ? sel.filter(s => s !== id) : [...sel, id]);
  };
  const handleSelectAll = () => {
    if (selected.length === panen.length) setSelected([]);
    else setSelected(panen.map(p => p.id));
  };

  // Untuk penghematan (dummy, contoh 2 card)
  const [penghematanList, setPenghematanList] = useState([
    { id: 1, nama: "Cabai", tanggal: "18/12/2025" },
    { id: 2, nama: "Cabai", tanggal: "18/12/2025" },
  ]);

  const handleDeletePenghematan = (id: number) => {
    setPenghematanList(list => list.filter(item => item.id !== id));
    setSelectedPenghematan(sel => sel.filter(sid => sid !== id));
  };
  const handleDeleteSelectedPenghematan = () => {
    setPenghematanList(list => list.filter(item => !selectedPenghematan.includes(item.id)));
    setSelectedPenghematan([]);
  };
  const handleSelectPenghematan = (id: number) => {
    setSelectedPenghematan(sel => sel.includes(id) ? sel.filter(s => s !== id) : [...sel, id]);
  };
  const handleSelectAllPenghematan = () => {
    if (selectedPenghematan.length === penghematanList.length) setSelectedPenghematan([]);
    else setSelectedPenghematan(penghematanList.map(p => p.id));
  };
  const handleDelete = (id: number) => {
    setPanen(panen.filter(p => p.id !== id));
    setSelected(selected.filter(s => s !== id));
  };
  const handleDeleteSelected = () => {
    setPanen(panen.filter(p => !selected.includes(p.id)));
    setSelected([]);
  };
  const handleFilter = () => {
    alert("Filter clicked! (Demo only)");
  };
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  // Card list checkbox handler for autofill
  const handleCardCheck = (id: number, nama: string, tanggal: string) => {
    if (cardChecked === id) {
      setCardChecked(null);
      setForm(f => ({ ...f, nama: "", tanggal: "" }));
    } else {
      setCardChecked(id);
      setForm(f => ({ ...f, nama, tanggal, kuantitas: "", hargaTanam: "" }));
    }
  };
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Submit panen (Demo only)");
  };

  return (
    <div className="min-h-screen bg-[#F8F9F6] font-sans">
      <NavbarUtama />

      {/* Main Content */}
      <div className="px-8 pt-8 mt-[60px]">
        <h1 className="text-[#3B5D2A] text-5xl font-bold mb-6" style={{ fontFamily: 'inherit' }}>
          Hasil Panen
        </h1>
      </div>
      <div className="flex flex-col md:flex-row gap-8 px-8">
        {/* Left: Card List */}
      <div className="flex-1 flex flex-col gap-4">
        <div className="flex items-center gap-2 mb-2 justify-end">
          <button onClick={handleFilter} className="bg-[#4B6A3D] text-white px-6 py-1 rounded-md font-semibold text-base hover:bg-[#3B5D2A] transition">Filter</button>
          <label className="flex items-center gap-1 text-[#222] text-base">
            <input type="checkbox" checked={selected.length === panen.length && panen.length > 0} onChange={handleSelectAll} className="accent-[#3B5D2A]" />
            Pilih Semua
          </label>
          <button onClick={handleDeleteSelected} className="bg-[#3B5D2A] text-white px-4 py-1 rounded-md font-semibold text-base hover:bg-red-700 transition">Hapus</button>
        </div>
        <div className="flex flex-col gap-4 max-h-[320px] overflow-y-auto pr-2">
          {panen.map((item) => (
            <div key={item.id} className="flex items-center bg-[#F8F9F6] bg-opacity-90 border border-[#B7C9A6] rounded-xl shadow p-4 relative min-h-[110px]" style={{boxShadow:'2px 2px 4px #b7c9a6'}}>
              <input
                type="checkbox"
                checked={selected.includes(item.id)}
                onChange={() => {
                  let newSelected;
                  if (selected.includes(item.id)) {
                    newSelected = selected.filter(s => s !== item.id);
                  } else {
                    newSelected = [...selected, item.id];
                  }
                  setSelected(newSelected);
                  // Autofill form jika hanya satu yang dicentang
                  if (newSelected.length === 1) {
                    const selectedItem = panen.find(p => p.id === newSelected[0]);
                    if (selectedItem) {
                      setForm(f => ({ ...f, nama: selectedItem.nama, tanggal: selectedItem.tanggal, kuantitas: "", hargaTanam: "" }));
                    }
                  } else {
                    setForm(f => ({ ...f, nama: "", tanggal: "" }));
                  }
                }}
                className="accent-[#3B5D2A] mr-2"
              />
              <Image src={item.img} alt={item.nama} width={80} height={80} className="mr-4" />
              <div className="flex-1 flex flex-col justify-center">
                <div className="text-[#222] font-semibold text-lg mb-1">Nama &nbsp;: <span className="font-normal">{item.nama}</span></div>
                <div className="text-[#222] font-semibold text-lg">Tanggal : <span className="font-normal">{item.tanggal}</span></div>
              </div>
              <button onClick={() => handleDelete(item.id)} className="absolute right-4 top-4 text-[#3B5D2A] text-sm font-semibold hover:text-red-700">Hapus</button>
            </div>
          ))}
        </div>
        </div>
        {/* Right: Form Panen */}
        <div className="w-full md:w-[400px]">
          <div className="bg-[#EAF5E2] border border-[#B7C9A6] rounded-xl p-8 flex flex-col gap-4" style={{boxShadow:'2px 2px 4px #b7c9a6'}}>
            <h2 className="text-[#3B5D2A] text-2xl font-bold text-center mb-2" style={{fontFamily:'inherit'}}>Form Panen</h2>
            <form onSubmit={handleFormSubmit} className="flex flex-col gap-3">
              <input name="nama" value={form.nama} onChange={handleFormChange} placeholder="Nama" className="w-full px-3 py-2 border rounded-md bg-white" required />
              <input name="tanggal" value={form.tanggal} onChange={handleFormChange} placeholder="Tanggal" className="w-full px-3 py-2 border rounded-md bg-white" required />
              <input name="kuantitas" value={form.kuantitas} onChange={handleFormChange} placeholder="Kuantitas Panen" className="w-full px-3 py-2 border rounded-md bg-white" required />
              <input name="hargaTanam" value={form.hargaTanam} onChange={handleFormChange} placeholder="Harga Tanam" className="w-full px-3 py-2 border rounded-md bg-white" required />
              <button type="submit" className="mt-2 w-full py-2 rounded-md bg-[#4B6A3D] text-white font-semibold text-lg shadow hover:brightness-95 transition">Submit</button>
            </form>
          </div>
        </div>
      </div>
      

      {/* Total Penghematan */}
      <div className="px-8 mt-10">
        <div className="bg-[#4B6A3D] text-white text-xl md:text-2xl font-bold rounded-lg py-3 px-8 flex items-center gap-4" style={{fontFamily:'inherit'}}>
          Total Keseluruhan Penghematan :
          <span className="ml-auto text-2xl md:text-3xl font-bold">Rp. {total.toLocaleString("id-ID")}</span>
        </div>
      </div>

      {/* Table Panen + Button group penghematan (terpisah) */}
      <div className="px-8 mt-8 flex flex-col gap-4">
        {/* Button group penghematan, right aligned */}
        <div className="flex items-center justify-end gap-2 mb-2">
          <button onClick={handleFilter} className="bg-[#4B6A3D] text-white px-6 py-1 rounded-md font-semibold text-base hover:bg-[#3B5D2A] transition">Filter</button>
          <label className="flex items-center gap-1 text-[#222] text-base">
            <input type="checkbox" checked={selectedPenghematan.length === penghematanList.length && penghematanList.length > 0} onChange={handleSelectAllPenghematan} className="accent-[#3B5D2A]" />
            Pilih Semua
          </label>
          <button onClick={handleDeleteSelectedPenghematan} className="bg-[#3B5D2A] text-white px-4 py-1 rounded-md font-semibold text-base hover:bg-red-700 transition">Hapus</button>
        </div>
        {penghematanList.map((item, idx) => (
          <div key={item.id} className="bg-white border border-[#B7C9A6] rounded-xl shadow p-4" style={{boxShadow:'2px 2px 4px #b7c9a6'}}>
            <div className="overflow-x-auto">
              <table className="w-full text-center text-[#222] border border-[#B7C9A6]">
                <thead className="bg-[#F8F9F6]">
                  <tr>
                    <th className="py-2 px-2 font-semibold border-r border-[#B7C9A6] text-left w-12"></th>
                    <th className="py-2 px-2 font-semibold border-r border-[#B7C9A6] text-center">Nama & Foto</th>
                    <th className="py-2 px-2 font-semibold border-r border-[#B7C9A6]">Tanggal</th>
                    <th className="py-2 px-2 font-semibold border-r border-[#B7C9A6]">Kuantitas Panen</th>
                    <th className="py-2 px-2 font-semibold border-r border-[#B7C9A6]">Harga Tanam</th>
                    <th className="py-2 px-2 font-semibold border-r border-[#B7C9A6]">Rata-Rata Harga Pasar</th>
                    <th className="py-2 px-2 font-semibold">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-2 px-2 border-r border-[#B7C9A6] text-center align-middle">
                      <input type="checkbox" className="accent-[#3B5D2A]" checked={selectedPenghematan.includes(item.id)} onChange={() => handleSelectPenghematan(item.id)} />
                    </td>
                    <td className="py-2 px-2 border-r border-[#B7C9A6]">
                      <div className="flex flex-col items-center justify-center w-full">
                        <Image src="/cabai.svg" alt="Tanaman Cabai" width={40} height={40} className="mb-1" />
                        <span className="text-[#3B5D2A] font-semibold mt-1">Tanaman Cabai</span>
                      </div>
                    </td>
                    <td className="py-2 px-2 border-r border-[#B7C9A6] font-semibold align-middle">18/12/2025</td>
                    <td className="py-2 px-2 border-r border-[#B7C9A6] font-semibold align-middle">2090 gram</td>
                    <td className="py-2 px-2 border-r border-[#B7C9A6] font-semibold align-middle">Rp. 19.000</td>
                    <td className="py-2 px-2 border-r border-[#B7C9A6] font-semibold align-middle">Rp. 30.000/Kg</td>
                    <td className="py-2 px-2 font-semibold align-middle">
                      <button onClick={() => handleDeletePenghematan(item.id)} className="text-[#3B5D2A] hover:text-red-700 font-semibold px-2 py-1 rounded transition">Hapus</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="flex justify-between items-center mt-2 px-2">
              <span className="text-[#3B5D2A] font-semibold">Total Penghematan :</span>
              <span className="text-[#3B5D2A] font-bold">Rp43.700</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
