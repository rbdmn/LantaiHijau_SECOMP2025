"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import NavbarUtama from "../../../components/navigation/navbar_utama";
import Sidebar from "../../../components/navigation/sidebar";

interface JurnalEntry {
  id: number;
  tanaman: string;
  img: string;
  mulai: string;
  panen: string;
  catatan: string;
  dokumentasi: string;
  id_tanaman?: number;
}

interface TanamanOption {
  id: number;
  nama_tanaman: string;
}

export default function JurnalPage() {
  // Toast notification state
  const [showToast, setShowToast] = useState(false);
  const [saveNotif, setSaveNotif] = useState("");
  const [saveNotifType, setSaveNotifType] = useState("");
  const [jurnal, setJurnal] = useState<JurnalEntry[]>([]);
  const [tanamanOptions, setTanamanOptions] = useState<TanamanOption[]>([]);
  const [lastUpdate, setLastUpdate] = useState<string>("");
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [tableLoading, setTableLoading] = useState(true); 
  const [kebunList, setKebunList] = useState<any[]>([]);
  const [form, setForm] = useState({
    id_tanaman: "",
    mulai_menanam: "",
    tanggal_panen: "",
    catatan: "",
    foto_dokumentasi: null as File | null,
  });

  // ✅ Helper function untuk mendapatkan URL gambar
  const getImageUrl = (filename: string) => {
    if (!filename) {
      return "/placeholder-plant.png";
    }
    
    if (filename.startsWith('http')) {
      return filename;
    }
    
    // Cek apakah file langsung di public folder
    return `/${filename}`;
  };

  // Check authentication - GUNAKAN KEY "token" BUKAN "auth_token"
  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log('Token from localStorage:', token ? `${token.substring(0, 30)}...` : 'NULL');
    
    if (!token) {
      console.log('No token found, user not authenticated');
      setIsAuthenticated(false);
      setLoading(false);
      return;
    }
    
    console.log('Token found, setting authenticated to true');
    setIsAuthenticated(true);
    fetchJurnalData();
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

  useEffect(() => {
    fetchTanamanOptions();
  }, []);

  const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    console.log('Getting auth headers, token:', token ? 'EXISTS' : 'NULL');
    
    const headers: Record<string, string> = {
      'Accept': 'application/json',
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    return headers;
  };

  const fetchJurnalData = async () => {
    setTableLoading(true); // ✅ set loading tabel jadi true sebelum fetch
    try {
      const response = await fetch('http://localhost:8000/api/jurnal', {
        method: 'GET',
        headers: getAuthHeaders(),
      });

      const data = await response.json();
      if (data.success) {
        setJurnal(data.data);
        if (data.data.length > 0) {
          setLastUpdate(new Date().toLocaleDateString('id-ID'));
        }
      }
    } catch (error) {
      console.error('Error fetching jurnal:', error);
    } finally {
      setTableLoading(false); // ✅ selesai loading tabel
    }
  };


  const fetchTanamanOptions = async () => {
    try {
      console.log('Fetching tanaman options...');
      
      const response = await fetch('http://localhost:8000/api/tanaman-options', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      });
      
      console.log('Tanaman options response status:', response.status);
      
      const data = await response.json();
      console.log('Tanaman options data:', data);

      if (data.success) {
        setTanamanOptions(data.data);
      } else {
        console.error('Failed to fetch tanaman options:', data.message);
      }
    } catch (error) {
      console.error('Error fetching tanaman options:', error);
    }
  };

  const handleEdit = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:8000/api/jurnal/${id}`, {
        method: 'GET',
        headers: getAuthHeaders(),
      });
      
      const data = await response.json();
      
      if (data.success) {
        setForm({
          id_tanaman: data.data.id_tanaman.toString(),
          mulai_menanam: data.data.mulai_menanam,
          tanggal_panen: data.data.tanggal_panen,
          catatan: data.data.catatan,
          foto_dokumentasi: null,
        });
        setEditMode(true);
        setEditId(id);
        setShowModal(true);
      } else {
        setSaveNotif('Gagal memuat data jurnal: ' + data.message);
        setSaveNotifType('error');
        setShowToast(true);
        setTimeout(() => { setShowToast(false); setSaveNotif(""); setSaveNotifType(""); }, 2500);
      }
    } catch (error) {
      console.error('Error fetching jurnal for edit:', error);
      setSaveNotif('Gagal memuat data jurnal untuk diedit');
      setSaveNotifType('error');
      setShowToast(true);
      setTimeout(() => { setShowToast(false); setSaveNotif(""); setSaveNotifType(""); }, 2500);
    }
  };

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const handleDelete = (id: number) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    try {
      const response = await fetch(`http://localhost:8000/api/jurnal/${deleteId}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });
      const data = await response.json();
      if (data.success) {
        setJurnal(jurnal.filter(j => j.id !== deleteId));
        setSaveNotif('Jurnal berhasil dihapus');
        setSaveNotifType('success');
      } else {
        setSaveNotif('Gagal menghapus jurnal: ' + data.message);
        setSaveNotifType('error');
      }
    } catch (error) {
      console.error('Error deleting jurnal:', error);
      setSaveNotif('Gagal menghapus jurnal');
      setSaveNotifType('error');
    }
    setShowToast(true);
    setTimeout(() => { setShowToast(false); setSaveNotif(""); setSaveNotifType(""); }, 2500);
    setShowDeleteModal(false);
    setDeleteId(null);
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setDeleteId(null);
  };

  const handleAdd = () => {
    setEditMode(false);
    setEditId(null);
    setForm({ 
      id_tanaman: "", 
      mulai_menanam: "", 
      tanggal_panen: "", 
      catatan: "", 
      foto_dokumentasi: null 
    });
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setEditMode(false);
    setEditId(null);
    setForm({ 
      id_tanaman: "", 
      mulai_menanam: "", 
      tanggal_panen: "", 
      catatan: "", 
      foto_dokumentasi: null 
    });
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, files } = e.target as any;
    if (name === "foto_dokumentasi") {
      setForm(f => ({ ...f, foto_dokumentasi: files[0] }));
    } else {
      setForm(f => ({ ...f, [name]: value }));
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!form.id_tanaman || !form.mulai_menanam || !form.tanggal_panen || !form.catatan) {
      setSaveNotif('Semua field wajib diisi');
      setSaveNotifType('error');
      setShowToast(true);
      setTimeout(() => { setShowToast(false); setSaveNotif(""); setSaveNotifType(""); }, 2500);
      return;
    }

    console.log('=== FRONTEND FORM SUBMIT DEBUG START ===');
    console.log('Form state:', {
      id_tanaman: form.id_tanaman,
      mulai_menanam: form.mulai_menanam,
      tanggal_panen: form.tanggal_panen,
      catatan: form.catatan.substring(0, 50) + '...',
      foto_dokumentasi: form.foto_dokumentasi ? {
        name: form.foto_dokumentasi.name,
        size: form.foto_dokumentasi.size,
        type: form.foto_dokumentasi.type,
        lastModified: form.foto_dokumentasi.lastModified
      } : 'NULL'
    });

    const formData = new FormData();
    formData.append('id_tanaman', form.id_tanaman);
    formData.append('mulai_menanam', form.mulai_menanam);
    formData.append('tanggal_panen', form.tanggal_panen);
    formData.append('catatan', form.catatan);
    
    if (form.foto_dokumentasi) {
      console.log('Adding file to FormData:', {
        name: form.foto_dokumentasi.name,
        size: form.foto_dokumentasi.size,
        type: form.foto_dokumentasi.type
      });
      formData.append('foto_dokumentasi', form.foto_dokumentasi);
    } else {
      console.log('NO FILE TO UPLOAD');
    }

    // Debug FormData contents
    console.log('FormData entries:');
    for (let [key, value] of formData.entries()) {
      if (value instanceof File) {
        console.log(`${key}:`, {
          name: value.name,
          size: value.size,
          type: value.type
        });
      } else {
        console.log(`${key}:`, value);
      }
    }

    try {
      const url = editMode 
        ? `http://localhost:8000/api/jurnal/${editId}` 
        : 'http://localhost:8000/api/jurnal';

      const method = editMode ? 'POST' : 'POST';
      
      if (editMode) {
        formData.append('_method', 'PUT');
        console.log('Added _method: PUT for Laravel method override');
      }

      const headers = getAuthHeaders();
      // IMPORTANT: Remove Content-Type header for FormData!
      delete headers['Content-Type'];
      delete headers['Accept']; // Let it be multipart/form-data
      
      console.log('Request details:', {
        url,
        method,
        headers: Object.keys(headers), // Don't log actual token
        hasFormData: formData instanceof FormData
      });

      console.log('Making fetch request...');
      
      const response = await fetch(url, {
        method,
        headers,
        body: formData,
      });

      console.log('Response received:', {
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries())
      });

      const responseText = await response.text();
      console.log('Raw response body:', responseText);

      let data;
      try {
        data = JSON.parse(responseText);
        console.log('Parsed response:', data);
      } catch (parseError) {
        console.error('JSON parse error:', parseError);
        console.error('Response was not valid JSON:', responseText);
        setSaveNotif('Server returned invalid response. Check console and server logs.');
        setSaveNotifType('error');
        setShowToast(true);
        setTimeout(() => { setShowToast(false); setSaveNotif(""); setSaveNotifType(""); }, 2500);
        return;
      }
      
      if (data.success) {
        console.log('SUCCESS: Jurnal saved successfully');
        if (editMode) {
          setJurnal(jurnal.map(j => j.id === editId ? data.data : j));
          setSaveNotif('Jurnal berhasil diupdate');
        } else {
          setJurnal([data.data, ...jurnal]);
          setSaveNotif('Jurnal berhasil ditambahkan');
        }
        setSaveNotifType('success');
        setShowToast(true);
        setTimeout(() => { setShowToast(false); setSaveNotif(""); setSaveNotifType(""); }, 2500);
        handleModalClose();
        setLastUpdate(new Date().toLocaleDateString('id-ID'));
      } else {
        console.error('SERVER ERROR:', data);
        let errorMessage = data.message || 'Unknown error';
        if (data.errors) {
          const errorDetails = Object.values(data.errors).flat().join(', ');
          errorMessage += ': ' + errorDetails;
        }
        if (data.debug_info) {
          console.error('Debug info:', data.debug_info);
        }
        setSaveNotif('Gagal menyimpan jurnal: ' + errorMessage);
        setSaveNotifType('error');
        setShowToast(true);
        setTimeout(() => { setShowToast(false); setSaveNotif(""); setSaveNotifType(""); }, 2500);
      }
    } catch (error) {
      console.error('NETWORK ERROR:', error);
      setSaveNotif('Gagal menyimpan jurnal: Network error');
      setSaveNotifType('error');
      setShowToast(true);
      setTimeout(() => { setShowToast(false); setSaveNotif(""); setSaveNotifType(""); }, 2500);
    }
    
    console.log('=== FRONTEND FORM SUBMIT DEBUG END ===');
  };

  // if (!isAuthenticated) {
  //   return (
  //     <div className="min-h-screen bg-[#F8F9F6] flex items-center justify-center">
  //       <div className="text-center p-8 bg-white rounded-lg shadow-lg">
  //         <h2 className="text-2xl font-bold text-[#3B5D2A] mb-4">Akses Terbatas</h2>
  //         <p className="text-gray-600 mb-6">Silakan login terlebih dahulu untuk mengakses jurnal.</p>
  //         <button 
  //           onClick={() => window.location.href = '/auth/login'}
  //           className="bg-[#3B5D2A] text-white px-6 py-2 rounded-lg hover:bg-[#2e4a1f] transition"
  //         >
  //           Login
  //         </button>
  //       </div>
  //     </div>
  //   );
  // }

  // if (loading) {
  //   return (
  //     <div className="min-h-screen ...">
  //       {/* Spinner seluruh halaman */}
  //     </div>
  //   );
  // }

  return (
    <div className="min-h-screen bg-[#F8F9F6] font-sans pl-30">
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

      {/* Title */}
      <div className="px-8 pt-8 mt-[60px]">
        <h1 className="text-[#3B5D2A] text-5xl font-bold mb-6" style={{fontFamily:'inherit'}}>Jurnal</h1>
      </div>

      {/* Update & Add Bar */}
      <div className="flex items-center px-8 mb-4">
        <div className="flex flex-1 min-w-0">
          <button className="w-full text-left bg-[#4B6A3D] text-white font-semibold py-2 px-4 rounded-tl-lg rounded-bl-lg rounded-tr-none rounded-br-none" style={{borderTopLeftRadius:12, borderBottomLeftRadius:12, borderTopRightRadius:0, borderBottomRightRadius:0}}>
            Update Terakhir
          </button>
          <div className="bg-[#4B6A3D] text-white font-semibold py-2 px-6 rounded-tr-lg rounded-br-lg select-none flex items-center justify-center -ml-px whitespace-nowrap text-base" style={{borderTopRightRadius:12, borderBottomRightRadius:12, borderTopLeftRadius:0, borderBottomLeftRadius:0, minWidth:120}}>
            {lastUpdate || 'Belum ada data'}
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
          {tableLoading ? (
            <div className="flex justify-center items-center py-10">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#3B5D2A]"></div>
            </div>
          ) : jurnal.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg">
              <p className="text-gray-500 text-lg">Belum ada data jurnal</p>
              <p className="text-gray-400 mt-2">Klik tombol "Tambah" untuk membuat jurnal pertama Anda</p>
            </div>
          ) : (
            <table className="w-full border-collapse rounded-xl overflow-hidden" style={{ background: '#F0F5ED' }}>
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
                  {/* No */}
                  <td className="border border-[#D1E7C6] px-2 py-3 align-middle font-semibold text-[#3B5D2A]">
                    {idx + 1}
                  </td>

                  {/* Tanaman */}
                  <td className="border border-[#D1E7C6] px-2 py-3 align-middle">
                    <div className="flex flex-col items-center">
                      <div className="bg-[#B7C9A6] rounded-xl p-2 mb-1">
                        <Image
                          src={getImageUrl(row.img)}
                          alt={row.tanaman}
                          width={70}
                          height={70}
                          className="rounded-lg object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = "/placeholder-plant.png";
                          }}
                        />
                      </div>
                      <span className="text-[#3B5D2A] font-semibold text-sm">{row.tanaman}</span>
                    </div>
                  </td>

                  {/* Mulai Menanam */}
                  <td className="border border-[#D1E7C6] px-2 py-3 align-middle">{row.mulai}</td>

                  {/* Tanggal Panen */}
                  <td className="border border-[#D1E7C6] px-2 py-3 align-middle">{row.panen}</td>

                  {/* Catatan */}
                  <td className="border border-[#D1E7C6] px-2 py-3 align-middle">{row.catatan}</td>

                  {/* Dokumentasi */}
                  <td className="border border-[#D1E7C6] px-2 py-3 align-middle">
                    <div className="flex justify-center">
                      <Image
                        src={getImageUrl(row.dokumentasi)}
                        alt="Dokumentasi"
                        width={70}
                        height={70}
                        className="rounded-lg object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "/placeholder-plant.png";
                        }}
                      />
                    </div>
                  </td>

                  {/* Tombol Aksi */}
                  <td className="border border-[#D1E7C6] px-2 py-3 align-middle">
                    <div className="flex flex-row gap-2 items-center justify-center">
                      <button
                        onClick={() => handleEdit(row.id)}
                        className="bg-[#3B5D2A] text-white px-5 py-1 rounded-md font-medium hover:bg-[#2e4a1f] transition text-base min-w-[70px]"
                        style={{ borderRadius: '10px' }}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(row.id)}
                        className="bg-[#FF0000] text-white px-5 py-1 rounded-md font-medium hover:bg-red-700 transition text-base min-w-[70px]"
                        style={{ borderRadius: '10px' }}
                      >
                        Hapus
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          )}
        </div>
      </div>

      {/* Modal Form Tambah/Edit */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="rounded-xl shadow-lg p-8 w-full max-w-md relative border bg-[#E8F1DE] bg-opacity-95" style={{minWidth:340}}>
            <button
              className="absolute top-4 right-4 text-2xl text-[#3B5D2A] hover:text-red-600 font-bold"
              onClick={handleModalClose}
              aria-label="Tutup"
            >
              ×
            </button>
            <h2 className="text-[#3B5D2A] text-3xl font-bold text-center mb-6" style={{fontFamily:'inherit'}}>
              {editMode ? 'Edit Jurnal' : 'Tambah Jurnal'}
            </h2>
            <form onSubmit={handleFormSubmit} className="flex flex-col gap-3">
              <label className="text-[#222] font-medium">Tanaman
                <select 
                  name="id_tanaman" 
                  value={form.id_tanaman} 
                  onChange={handleFormChange} 
                  className="w-full mt-1 px-3 py-2 border rounded-md bg-white bg-opacity-90" 
                  required
                >
                  <option value="">Pilih Tanaman</option>
                  {tanamanOptions.map((tanaman) => (
                    <option key={tanaman.id} value={tanaman.id}>
                      {tanaman.nama_tanaman}
                    </option>
                  ))}
                </select>
              </label>
              <label className="text-[#222] font-medium">Mulai Menanam
                <input 
                  type="date" 
                  name="mulai_menanam" 
                  value={form.mulai_menanam} 
                  onChange={handleFormChange} 
                  className="w-full mt-1 px-3 py-2 border rounded-md bg-white bg-opacity-90" 
                  required 
                />
              </label>
              <label className="text-[#222] font-medium">Tanggal Panen
                <input 
                  type="date" 
                  name="tanggal_panen" 
                  value={form.tanggal_panen} 
                  onChange={handleFormChange} 
                  className="w-full mt-1 px-3 py-2 border rounded-md bg-white bg-opacity-90" 
                  required 
                />
              </label>
              <label className="text-[#222] font-medium">Catatan
                <textarea 
                  name="catatan" 
                  value={form.catatan} 
                  onChange={handleFormChange} 
                  className="w-full mt-1 px-3 py-2 border rounded-md bg-white bg-opacity-90" 
                  rows={3} 
                  maxLength={1000}
                  required 
                />
                <div className="text-xs text-[#666] mt-1">{form.catatan.length}/1000 karakter</div>
              </label>
              <label className="text-[#222] font-medium">Upload Foto Dokumentasi
                <input 
                  name="foto_dokumentasi" 
                  type="file" 
                  accept="image/jpeg,image/png,image/jpg,image/gif" 
                  onChange={handleFormChange} 
                  className="w-full mt-1 px-3 py-2 border rounded-md bg-white bg-opacity-90" 
                />
                <div className="text-xs text-[#666] mt-1">Upload Max: 500KB (JPEG, PNG, JPG, GIF)</div>
              </label>
              <button 
                type="submit" 
                className="mt-4 w-full py-2 rounded-md bg-[#4B6A3D] text-white font-semibold text-lg shadow hover:brightness-95 transition"
              >
                {editMode ? 'Update' : 'Submit'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Modal Konfirmasi Hapus */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/30">
          <div className="rounded-xl shadow-lg p-8 w-full max-w-sm relative border bg-white bg-opacity-95" style={{minWidth:300}}>
            <button
              className="absolute top-4 right-4 text-2xl text-[#3B5D2A] hover:text-red-600 font-bold"
              onClick={cancelDelete}
              aria-label="Tutup"
            >
              ×
            </button>
            <div className="flex flex-col items-center">
              <svg className="w-12 h-12 text-red-500 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              <h2 className="text-[#3B5D2A] text-2xl font-bold mb-2 text-center">Konfirmasi Hapus</h2>
              <p className="text-gray-700 text-center mb-6">Yakin ingin menghapus jurnal ini? Tindakan ini tidak dapat dibatalkan.</p>
              <div className="flex gap-4 w-full justify-center">
                <button
                  onClick={cancelDelete}
                  className="px-5 py-2 rounded-md bg-gray-300 text-gray-800 font-semibold hover:bg-gray-400 transition"
                >Batal</button>
                <button
                  onClick={confirmDelete}
                  className="px-5 py-2 rounded-md bg-[#FF0000] text-white font-semibold hover:bg-red-700 transition"
                >Hapus</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}