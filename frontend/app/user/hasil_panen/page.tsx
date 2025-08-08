"use client";
import Image from "next/image";
import { useState } from "react";
import NavbarUtama from "../../../components/navigation/navbar_utama";
import Sidebar from "../../../components/navigation/sidebar";
import { useEffect } from "react";
import { HiTrash } from "react-icons/hi2";

export default function HasilPanenPage() {
  // Toast notification state
  const [showToast, setShowToast] = useState(false);
  const [saveNotif, setSaveNotif] = useState("");
  const [saveNotifType, setSaveNotifType] = useState("");
  const [panen, setPanen] = useState<any[]>([]);
  const [selectedIncomplete, setSelectedIncomplete] = useState<number[]>([]); // for incomplete items
  const [selectedComplete, setSelectedComplete] = useState<number[]>([]); // for complete items
  const [form, setForm] = useState({ nama: "", tanggal: "", kuantitas: "", hargaTanam: "" });
  const [total, setTotal] = useState(0);
  const [kebunList, setKebunList] = useState<any[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');

  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (!token) return;
    fetch("http://localhost:8000/api/me", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(user => {
        return fetch(`http://localhost:8000/api/kebun?user_id=${user.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
      })
      .then(res => res ? res.json() : [])
      .then(data => setKebunList(Array.isArray(data) ? data : []));
  }, []);

  // Untuk sidebar
  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (!token) return;
    fetch("http://localhost:8000/api/me", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(user => { 
        return fetch(`http://localhost:8000/api/kebun?user_id=${user.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
      })
      .then(res => res ? res.json() : [])
      .then(data => setKebunList(Array.isArray(data) ? data : []))
      .catch(err => console.error("Error fetching kebun:", err));
  }, []);

  // Fetch hasil panen user dari backend saat mount dan hitung total penghematan
  const fetchPanen = async () => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (!token) return;

    setLoading(true); // mulai loading

    try {
      const res = await fetch("http://localhost:8000/api/hasil-panen", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        const result = await res.json();
        const data = result.data || [];
        setTotal(result.total_penghematan || 0);

        const panenData = data.map((item: any) => {
          const hargaPasar = item.tanaman?.rata_harga || item.harga_pasar || 0;
          const kuantitasGram = Number(item.kuantitas_panen) || 0;
          const hargaTanam = Number(item.harga_tanam) || 0;
          return {
            id: item.id,
            nama: item.nama_tanaman || "Tanaman",
            tanggal: item.tanggal,
            img: item.foto_tanaman || "/tanaman_default.jpg",
            kuantitas: kuantitasGram,
            kuantitasDisplay: kuantitasGram + " gram",
            hargaTanam: hargaTanam,
            hargaPasar: hargaPasar,
            penghematan: ((hargaPasar / 1000 * kuantitasGram) - hargaTanam),
            needsInput: !item.kuantitas_panen || !item.harga_tanam
          };
        });

        setPanen(panenData);
      } else {
        console.error("Failed to fetch panen data:", res.status);
      }
    } catch (err) {
      console.error("Error fetching panen:", err);
    } finally {
      setLoading(false); // selesai loading
    }
  };


  useEffect(() => {
    fetchPanen();
  }, []);

  // --- Selection Logic for Incomplete Items ---
  const handleSelectIncomplete = (id: number) => {
    setSelectedIncomplete(prev => 
      prev.includes(id) ? prev.filter(itemId => itemId !== id) : [...prev, id]
    );
    
    // If this is the only item selected, autofill the form
    if (!selectedIncomplete.includes(id)) {
      const selectedItem = panen.find(item => item.id === id);
      if (selectedItem && selectedIncomplete.length === 0) {
        setForm({
          nama: selectedItem.nama,
          tanggal: selectedItem.tanggal,
          kuantitas: selectedItem.kuantitas > 0 ? selectedItem.kuantitas.toString() : "",
          hargaTanam: selectedItem.hargaTanam > 0 ? selectedItem.hargaTanam.toString() : ""
        });
      }
    } else if (selectedIncomplete.length === 1) {
      // If deselecting the last item, clear the form
      setForm({ nama: "", tanggal: "", kuantitas: "", hargaTanam: "" });
    }
  };

  const handleSelectAllIncomplete = () => {
    const incompleteItems = panen.filter(item => item.needsInput);
    if (selectedIncomplete.length === incompleteItems.length) {
      setSelectedIncomplete([]);
      setForm({ nama: "", tanggal: "", kuantitas: "", hargaTanam: "" });
    } else {
      setSelectedIncomplete(incompleteItems.map(item => item.id));
    }
  };

  // --- Selection Logic for Complete Items ---
  const handleSelectComplete = (id: number) => {
    setSelectedComplete(prev => 
      prev.includes(id) ? prev.filter(itemId => itemId !== id) : [...prev, id]
    );
  };

  const handleSelectAllComplete = () => {
    const completeItems = panen.filter(item => !item.needsInput);
    if (selectedComplete.length === completeItems.length) {
      setSelectedComplete([]);
    } else {
      setSelectedComplete(completeItems.map(item => item.id));
    }
  };

  // --- Delete Logic ---
  const handleDelete = async (id: number) => {
    try {
      if (!confirm("Apakah kamu yakin ingin menghapus data ini?")) return;
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:8000/api/hasil_panen/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Gagal menghapus data');
      }

      // Remove from state and selections
      setPanen(prev => {
        const updated = prev.filter(item => item.id !== id);
        // Recalculate total penghematan
        const newTotal = updated.reduce((sum, item) => sum + (item.penghematan || 0), 0);
        setTotal(newTotal);
        return updated;
      });
      setSelectedIncomplete(prev => prev.filter(itemId => itemId !== id));
      setSelectedComplete(prev => prev.filter(itemId => itemId !== id));
    } catch (error: any) {
      alert(`Gagal hapus data: ${error.message}`);
    }
  };

  const handleDeleteSelectedIncomplete = async () => {
    if (selectedIncomplete.length === 0) {
      alert("Tidak ada data yang dipilih untuk dihapus");
      return;
    }
    
    if (!confirm(`Apakah kamu yakin ingin menghapus ${selectedIncomplete.length} data yang belum lengkap?`)) return;

    try {
      const token = localStorage.getItem("token");
      await Promise.all(
        selectedIncomplete.map(id =>
          fetch(`http://localhost:8000/api/hasil_panen/${id}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
          })
        )
      );

      // Update state
      setPanen(prev => {
        const updated = prev.filter(item => !selectedIncomplete.includes(item.id));
        // Recalculate total penghematan
        const newTotal = updated.reduce((sum, item) => sum + (item.penghematan || 0), 0);
        setTotal(newTotal);
        return updated;
      });
      setSelectedIncomplete([]);
      setForm({ nama: "", tanggal: "", kuantitas: "", hargaTanam: "" });
    } catch (error: any) {
      alert('Gagal menghapus beberapa data.');
    }
  };

  const handleDeleteSelectedComplete = async () => {
    if (selectedComplete.length === 0) {
      alert("Tidak ada data yang dipilih untuk dihapus");
      return;
    }
    
    if (!confirm(`Apakah kamu yakin ingin menghapus ${selectedComplete.length} data yang sudah lengkap?`)) return;

    try {
      const token = localStorage.getItem("token");
      await Promise.all(
        selectedComplete.map(id =>
          fetch(`http://localhost:8000/api/hasil_panen/${id}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
          })
        )
      );

      // Update state
      setPanen(prev => {
        const updated = prev.filter(item => !selectedComplete.includes(item.id));
        // Recalculate total penghematan
        const newTotal = updated.reduce((sum, item) => sum + (item.penghematan || 0), 0);
        setTotal(newTotal);
        return updated;
      });
      setSelectedComplete([]);
    } catch (error: any) {
      alert('Gagal menghapus beberapa data.');
    }
  };

  // --- Filter/Sort Logic ---
  const handleFilter = () => {
    const newSortOrder = sortOrder === 'newest' ? 'oldest' : 'newest';
    setSortOrder(newSortOrder);
    
    const sortedPanen = [...panen].sort((a, b) => {
      const dateA = new Date(a.tanggal).getTime();
      const dateB = new Date(b.tanggal).getTime();
      return newSortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });
    
    setPanen(sortedPanen);
  };

  const handleFilterComplete = () => {
    const newSortOrder = sortOrder === 'newest' ? 'oldest' : 'newest';
    setSortOrder(newSortOrder);
    
    const sortedPanen = [...panen].sort((a, b) => {
      if (a.needsInput && !b.needsInput) return 1;
      if (!a.needsInput && b.needsInput) return -1;
      
      const dateA = new Date(a.tanggal).getTime();
      const dateB = new Date(b.tanggal).getTime();
      return newSortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });
    
    setPanen(sortedPanen);
  };

  // --- Form Handling ---
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (selectedIncomplete.length === 0) {
      alert('Silakan pilih setidaknya satu item panen untuk diperbarui');
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      alert('Anda harus login untuk memperbarui data panen');
      return;
    }

    const kuantitasNum = Number(form.kuantitas);
    const hargaTanamNum = Number(form.hargaTanam);

    if (isNaN(kuantitasNum)) {
      alert('Masukkan kuantitas yang valid');
      return;
    }

    setIsSubmitting(true);

    try {
      const results = [];
      for (const id of selectedIncomplete) {
        const response = await fetch(`http://localhost:8000/api/hasil-panen/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            kuantitas_panen: kuantitasNum,
            harga_tanam: hargaTanamNum
          })
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Gagal memperbarui item ${id}: ${errorText}`);
        }

        const result = await response.json();
        results.push(result);
      }

      // Reset form and selections
      setForm({ nama: "", tanggal: "", kuantitas: "", hargaTanam: "" });
      setSelectedIncomplete([]);

      // Refresh data
      await fetchPanen();

      setSaveNotif(`Berhasil memperbarui ${selectedIncomplete.length} item panen`);
      setSaveNotifType('success');
      setShowToast(true);
      setTimeout(() => { setShowToast(false); setSaveNotif(""); setSaveNotifType(""); }, 2500);
    } catch (error) {
      console.error('Error updating harvest data:', error);
      setSaveNotif(error instanceof Error ? `Gagal memperbarui data panen: ${error.message}` : 'Gagal memperbarui data panen: Terjadi kesalahan yang tidak diketahui.');
      setSaveNotifType('error');
      setShowToast(true);
      setTimeout(() => { setShowToast(false); setSaveNotif(""); setSaveNotifType(""); }, 2500);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Filter items
  const incompleteItems = panen.filter(item => item.needsInput);
  const completeItems = panen.filter(item => !item.needsInput);

  return (
    <div className="min-h-screen bg-[#F8F9F6] font-sans pl-5">
      {showToast && (
        <div className={`fixed top-8 left-1/2 z-[9999] -translate-x-1/2 px-6 py-3 rounded-xl shadow-lg flex items-center gap-3 animate-fadeIn ${saveNotifType === 'success' ? 'bg-green-100 border border-green-400 text-green-800' : 'bg-red-100 border border-red-400 text-red-800'}`}
          style={{ minWidth: 220, maxWidth: 340 }}>
          {saveNotifType === 'success' ? (
            <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
          ) : (
            <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          )}
          <span className="font-semibold text-base">{saveNotif}</span>
        </div>
      )}
      <Sidebar kebunList={kebunList} />
      <NavbarUtama />
      <div className="flex">
        {/* Konten Utama */}
        <div className="flex-1 ml-[96px]">
          {/* Title */}
          <div className="px-8 pt-8 mt-[60px]">
            <h1 className="text-[#3B5D2A] text-5xl font-bold mb-6" style={{ fontFamily: "inherit" }}>
              Hasil Panen
            </h1>
          </div>
          
          <div className="flex flex-col md:flex-row gap-8 px-8">
            {/* Left: Card List - Items that need input */}
            <div className="flex-1 flex flex-col gap-4">
              <div className="flex items-center gap-5 mb-2 justify-between">
                <h2 className="text-[#3B5D2A] text-xl font-semibold">
                  Data Hasil Panen Perlu Dilengkapi ({incompleteItems.length})
                </h2>
                <div className="flex items-center gap-5">
                  <button 
                    onClick={handleFilter} 
                    className="bg-[#4B6A3D] text-white px-6 py-1 rounded-md font-semibold text-base hover:bg-[#3B5D2A] transition flex items-center gap-2"
                  >
                    <span>Urutkan {sortOrder === 'newest' ? '(Terbaru)' : '(Terlama)'}</span>
                    {sortOrder === 'newest' ? (
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 20V4"/>
                        <path d="M5 11l7-7 7 7"/>
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 4v16"/>
                        <path d="M19 13l-7 7-7-7"/>
                      </svg>
                    )}
                  </button>
                  <label className="flex items-center gap-1 text-[#222] text-base">
                    <input 
                      type="checkbox" 
                      checked={selectedIncomplete.length === incompleteItems.length && incompleteItems.length > 0} 
                      onChange={handleSelectAllIncomplete} 
                      className="accent-[#3B5D2A]" 
                    />
                    Pilih Semua
                  </label>
                  <button 
                    onClick={handleDeleteSelectedIncomplete} 
                    className="bg-[#FF0000] text-white px-4 py-1 rounded-md font-semibold text-base hover:bg-red-700 transition"
                  >
                    Hapus
                  </button>
                </div>
              </div>
              
              <div className="flex flex-col gap-4 max-h-[320px] overflow-y-auto pr-2">
                {loading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#3B5D2A]"></div>
                </div>
              ) : incompleteItems.length === 0 ? (
                <div className="text-center text-[#3B5D2A] py-12">Anda belum memiliki data hasil panen yang perlu dilengkapi.</div>
              ) : (
                incompleteItems.map((item) => (
                    <div key={item.id} className="flex items-center bg-[#F8F9F6] bg-opacity-90 border border-[#B7C9A6] rounded-xl shadow p-4 relative min-h-[110px]" style={{ boxShadow: '2px 2px 4px #b7c9a6' }}>
                      <input
                        type="checkbox"
                        checked={selectedIncomplete.includes(item.id)}
                        onChange={() => handleSelectIncomplete(item.id)}
                        className="accent-[#3B5D2A] mr-2"
                      />
                      <Image src={item.img} alt={item.nama} width={80} height={80} className="mr-4" />
                      <div className="flex-1 flex flex-col justify-center">
                        <div className="text-[#222] font-semibold text-lg mb-1">
                          Nama &nbsp;: <span className="font-normal">{item.nama}</span>
                        </div>
                        <div className="text-[#222] font-semibold text-lg">
                          Tanggal : <span className="font-normal">{item.tanggal}</span>
                        </div>
                        <div className="text-sm text-gray-600 mt-1">
                          Status: {!item.kuantitas && !item.hargaTanam ? "Perlu kuantitas & harga tanam" : 
                                  !item.kuantitas ? "Perlu kuantitas" : "Perlu harga tanam"}
                        </div>
                      </div>
                      <button 
                        onClick={() => handleDelete(item.id)} 
                        className="absolute right-4 top-4 text-[#3B5D2A] text-sm font-semibold hover:text-red-700"
                      >
                        Hapus
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
            
            {/* Right: Form Panen */}
            <div className="w-full md:w-[400px]">
              <div className="bg-[#EAF5E2] border border-[#B7C9A6] rounded-xl p-8 flex flex-col gap-10" style={{ boxShadow: '2px 2px 4px #b7c9a6' }}>
                <h2 className="text-[#3B5D2A] text-2xl font-bold text-center mb-2" style={{ fontFamily: 'inherit' }}>
                  Form Panen
                </h2>
                <form onSubmit={handleFormSubmit} className="flex flex-col gap-3">
                  {selectedIncomplete.length <= 1 ? (
                    <>
                      <input 
                        name="nama" 
                        value={form.nama} 
                        onChange={handleFormChange} 
                        placeholder="Nama" 
                        className="w-full px-3 py-2 border rounded-md bg-white" 
                        readOnly 
                      />
                      <input 
                        name="tanggal" 
                        value={form.tanggal} 
                        onChange={handleFormChange} 
                        placeholder="Tanggal" 
                        className="w-full px-3 py-2 border rounded-md bg-white" 
                        readOnly 
                      />
                    </>
                  ) : (
                    <div className="flex flex-row gap-2 overflow-x-auto pb-2">
                      {selectedIncomplete.map(id => {
                        const item = panen.find(p => p.id === id);
                        if (!item) return null;
                        return (
                          <div key={id} className="relative bg-white border border-[#B7C9A6] rounded-lg px-3 py-2 min-w-[120px] flex flex-col items-center mr-2 shadow">
                            <button
                              type="button"
                              style={{ position: 'absolute', top: 10, right: 0, transform: 'translate(50%,-50%)', zIndex: 2 }}
                              className="bg-[#FF0000] text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold shadow"
                              onClick={() => handleSelectIncomplete(id)}
                              title="Batalkan pilihan"
                            >
                              x
                            </button>
                            <div className="text-[#3B5D2A] font-semibold text-sm text-center truncate max-w-[90px]">{item.nama}</div>
                            <div className="text-xs text-gray-600 text-center mt-1">{item.tanggal}</div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                  <input 
                    name="kuantitas" 
                    value={form.kuantitas} 
                    onChange={handleFormChange} 
                    placeholder="Kuantitas Panen (gram)" 
                    type="number"
                    min="0"
                    step="1"
                    className="w-full px-3 py-2 border rounded-md bg-white" 
                    required 
                  />
                  <input 
                    name="hargaTanam" 
                    value={form.hargaTanam} 
                    onChange={handleFormChange} 
                    placeholder="Harga Tanam (Rp)" 
                    type="number"
                    min="0"
                    step="1"
                    className="w-full px-3 py-2 border rounded-md bg-white" 
                    required 
                  />
                  <button 
                    type="submit" 
                    disabled={isSubmitting || selectedIncomplete.length === 0}
                    className="mt-2 w-full py-2 rounded-md bg-[#4B6A3D] text-white font-semibold text-lg shadow hover:brightness-95 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Menyimpan...' : `Submit ${selectedIncomplete.length > 0 ? `(${selectedIncomplete.length} item)` : ''}`}
                  </button>
                </form>
                {selectedIncomplete.length > 0 && (
                  <div className="text-sm text-gray-600 text-center">
                    {selectedIncomplete.length} item dipilih untuk diupdate
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Total Penghematan */}
          <div className="px-8 mt-10">
            <div className="bg-[#4B6A3D] text-white text-xl md:text-2xl font-bold rounded-lg py-3 px-8 flex items-center gap-4" style={{ fontFamily: 'inherit' }}>
              Total Keseluruhan Penghematan :
              <span className="ml-auto text-2xl md:text-3xl font-bold">Rp. {total.toLocaleString("id-ID")}</span>
            </div>
          </div>

          {/* Table Panen (Data Lengkap) */}
          <div className="px-8 mt-8 flex flex-col gap-4">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-[#3B5D2A] text-xl font-semibold">
                Data Hasil Panen Lengkap ({completeItems.length})
              </h2>
              <div className="flex items-center gap-5">
                <div className="flex items-center gap-2">
                  <button 
                    onClick={handleFilterComplete} 
                    className="bg-[#4B6A3D] text-white px-6 py-1 rounded-md font-semibold text-base hover:bg-[#3B5D2A] transition flex items-center gap-2"
                  >
                    <span>Urutkan {sortOrder === 'newest' ? '(Terbaru)' : '(Terlama)'}</span>
                    {sortOrder === 'newest' ? (
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 20V4"/>
                        <path d="M5 11l7-7 7 7"/>
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 4v16"/>
                        <path d="M19 13l-7 7-7-7"/>
                      </svg>
                    )}
                  </button>
                </div>
                <label className="flex items-center gap-1 text-[#222] text-base">
                  <input 
                    type="checkbox" 
                    checked={selectedComplete.length === completeItems.length && completeItems.length > 0} 
                    onChange={handleSelectAllComplete} 
                    className="accent-[#3B5D2A]" 
                  />
                  Pilih Semua
                </label>
                <button 
                  onClick={handleDeleteSelectedComplete} 
                  className="bg-[#FF0000] text-white px-4 py-1 rounded-md font-semibold text-base hover:bg-red-700 transition"
                >
                  Hapus
                </button>
              </div>
            </div>
            
            {completeItems.map((item) => (
              <div key={item.id} className="bg-white border border-[#B7C9A6] rounded-xl shadow p-4 mb-4" style={{ boxShadow: '2px 2px 4px #b7c9a6' }}>
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
                          <input 
                            type="checkbox" 
                            className="accent-[#3B5D2A]" 
                            checked={selectedComplete.includes(item.id)} 
                            onChange={() => handleSelectComplete(item.id)} 
                          />
                        </td>
                        <td className="py-2 px-2 border-r border-[#B7C9A6]">
                          <div className="flex flex-col items-center justify-center w-full">
                            <Image 
                              src={item.img} 
                              alt={item.nama} 
                              width={40} 
                              height={40} 
                              className="mb-1" 
                            />
                            <span className="text-[#3B5D2A] font-semibold mt-1">{item.nama}</span>
                          </div>
                        </td>
                        <td className="py-2 px-2 border-r border-[#B7C9A6] font-semibold align-middle">
                          {item.tanggal}
                        </td>
                        <td className="py-2 px-2 border-r border-[#B7C9A6] font-semibold align-middle">
                          {item.kuantitasDisplay}
                        </td>
                        <td className="py-2 px-2 border-r border-[#B7C9A6] font-semibold align-middle">
                          Rp. {item.hargaTanam.toLocaleString("id-ID")}
                        </td>
                        <td className="py-2 px-2 border-r border-[#B7C9A6] font-semibold align-middle">
                          Rp. {item.hargaPasar.toLocaleString("id-ID")}/Kg
                        </td>
                        <td className="py-2 px-2 font-semibold text-center align-middle">
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="text-red-600 hover:text-red-700 transition flex items-center justify-center mx-auto"
                          aria-label="Hapus"
                        >
                          <HiTrash className="w-5 h-5" />
                        </button>
                      </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="flex justify-between items-center mt-2 px-2">
                <span className="text-[#3B5D2A] font-semibold">Total Penghematan :</span>

                <span
                  className={`font-bold px-3 py-1 rounded 
                    ${item.penghematan > 0 
                      ? 'bg-green-600 text-white' 
                      : item.penghematan < 0 
                        ? 'bg-red-600 text-white' 
                        : 'text-[#3B5D2A]'}`}
                >
                  Rp. {item.penghematan.toLocaleString("id-ID")}
                </span>
              </div>
              </div>
            ))}
            
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#3B5D2A]"></div>
              </div>
            ) : completeItems.length === 0 && (
              <div className="text-center text-[#3B5D2A] py-12">Anda belum memiliki data hasil panen lengkap.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}