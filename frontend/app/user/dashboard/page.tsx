"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import NavbarUtama from "../../../components/navigation/navbar_utama";
import Sidebar from "../../../components/navigation/sidebar";

export default function DashboardPage() {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ nama: "", panjang: "", lebar: "" });
  const [kebunList, setKebunList] = useState<any[]>([]);
  const [userId, setUserId] = useState<number|null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch user info and kebun list
  useEffect(() => {
    if (typeof window === "undefined") return;
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/auth/login");
      return;
    }
    // Get user info
    fetch("http://localhost:8000/api/me", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(user => {
        setUserId(user.id);
        // Fetch kebun for this user
        return fetch(`http://localhost:8000/api/kebun?user_id=${user.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
      })
      .then(res => res ? res.json() : [])
      .then(data => {
        setKebunList(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => {
        setError("Gagal mengambil data user/kebun.");
        setLoading(false);
      });
  }, [router, showModal]);

  // Handle add kebun
  const handleAddKebun = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nama || !form.panjang || !form.lebar) return;
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (!token || !userId) return;
    setError("");
    try {
      const res = await fetch("http://localhost:8000/api/kebun", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id_user: userId,
          nama_kebun: form.nama,
          panjang: form.panjang,
          lebar: form.lebar,
        }),
      });
      if (!res.ok) {
        // Cek content-type
        const contentType = res.headers.get("content-type");
        let errMsg = "Gagal menambah kebun";
        if (contentType && contentType.includes("application/json")) {
          const errData = await res.json();
          errMsg = errData?.message || JSON.stringify(errData) || errMsg;
        } else {
          const text = await res.text();
          errMsg = text.slice(0, 500); // tampilkan potongan error HTML
        }
        setError(errMsg);
        return;
      }
      setShowModal(false);
      setForm({ nama: "", panjang: "", lebar: "" });
    } catch (err: any) {
      setError(err?.message || "Gagal menambah kebun");
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9F6] flex flex-col pl-5">
      <Sidebar kebunList={kebunList} />
      <NavbarUtama />
      <div className="flex flex-1">
        <div className="flex-1 p-6 pt-4 flex flex-col gap-6 ml-24 mt-15">
          <div className="mt-2">
            <h1 className="text-5xl font-bold text-[#3B5D2A]">Dashboard</h1>
          </div>
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
                <form className="flex flex-col gap-3" onSubmit={handleAddKebun}>
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
                    <label className="flex-1 text-sm text-[#3B5D2A] font-medium">Panjang (Max 25 m)
                    <input
                      type="number"
                      className="mt-1 w-full rounded-md border border-[#D6E5C2] px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#3B5D2A] bg-white"
                      value={form.panjang}
                      min={1}
                      max={25}
                      onChange={e => {
                        let val = Number(e.target.value);
                        if (val > 25) val = 25;
                        if (val < 1) val = 1;
                        setForm(f => ({ ...f, panjang: val.toString() }));
                      }}
                      placeholder="Panjang"
                    />
                    </label>
                    <label className="flex-1 text-sm text-[#3B5D2A] font-medium">Lebar (Max 25 m)
                    <input
                      type="number"
                      className="mt-1 w-full rounded-md border border-[#D6E5C2] px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-[#3B5D2A] bg-white"
                      value={form.lebar}
                      min={1}
                      max={25}
                      onChange={e => {
                        let val = Number(e.target.value);
                        if (val > 25) val = 25;
                        if (val < 1) val = 1;
                        setForm(f => ({ ...f, lebar: val.toString() }));
                      }}
                      placeholder="Lebar"
                    />
                    </label>
                  </div>
                  <button
                    type="submit"
                    className="mt-2 w-full bg-[#3B5D2A] text-white rounded-md py-2 font-semibold hover:bg-[#2e4a1f] transition"
                  >
                    Simpan
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
                {loading ? (
                  <div className="text-[#3B5D2A]">Memuat kebun...</div>
                ) : error ? (
                  <div className="text-red-500">{error}</div>
                ) : kebunList.length === 0 ? (
                  <div className="text-[#3B5D2A]">Belum ada kebun. Tambahkan kebun baru!</div>
                ) : (
                  kebunList.map((kebun: any) => (
                    <button
                      key={kebun.id}
                      className="flex items-center justify-between bg-white rounded-lg px-4 py-2 shadow border border-[#D6E5C2] hover:bg-[#f3f8ef]"
                      onClick={() => router.push(`/user/kebun_virtual/${kebun.id}`)}
                    >
                      <span className="text-sm text-[#3B5D2A] font-medium">{kebun.nama_kebun}</span>
                      <span className="text-[#3B5D2A] text-lg">&gt;</span>
                    </button>
                  ))
                )}
              </div>
            </div>

            {/* To-Do List */}
            <div className="flex-1 bg-white rounded-xl shadow p-6">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-bold text-[#3B5D2A]">To-Do List</h2>
                <span className="text-xs text-[#3B5D2A]">
                  {new Date().toLocaleDateString('id-ID', {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                {kebunList.flatMap(kebun => {
                  console.log('Processing kebun:', kebun.nama_kebun, 'Grid data:', kebun.grid_data);
                  
                  if (!kebun.grid_data) {
                    console.log('No grid data for kebun:', kebun.nama_kebun);
                    return [];
                  }
                  
                  let gridData;
                  try {
                    gridData = typeof kebun.grid_data === 'string' ? 
                      JSON.parse(kebun.grid_data) : kebun.grid_data;
                    console.log('Parsed grid data for kebun:', kebun.nama_kebun, gridData);
                  } catch (e) {
                    console.error('Error parsing grid data for kebun:', kebun.nama_kebun, e);
                    return [];
                  }

                  if (!gridData.tanaman || !Array.isArray(gridData.tanaman)) {
                    console.log('No tanaman array found for kebun:', kebun.nama_kebun, gridData);
                    return [];
                  }

                  console.log('Found tanaman array for kebun:', kebun.nama_kebun, 'Count:', gridData.tanaman.length);

                  return gridData.tanaman
                    .map((tanaman: any, index: number) => {
                      console.log('Processing tanaman:', index, tanaman);
                      
                      // Untuk sementara, kita gunakan tanggal hari ini sebagai tanggal tanam jika tidak ada
                      const tanggalTanam = new Date();
                      const today = new Date();
                      const daysSincePlanting = Math.floor(
                        (today.getTime() - tanggalTanam.getTime()) / (1000 * 60 * 60 * 24)
                      );
                      
                      console.log('Tanaman details:', {
                        kebun: kebun.nama_kebun,
                        index,
                        tanggalTanam,
                        daysSincePlanting,
                        needsWatering: daysSincePlanting % 2 === 0
                      });
                      
                      // Logika untuk menentukan apakah tanaman perlu disiram
                      const needsWatering = daysSincePlanting % 2 === 0;
                      
                      if (!needsWatering) {
                        console.log('Tanaman does not need watering:', index);
                        return null;
                      }
                      
                      return (
                        <div key={`${kebun.id}-${index}`} className="flex items-center gap-3 p-2 bg-[#F8F9F6] rounded-lg">
                          {/* <input type="checkbox" className="w-5 h-5 accent-[#3B5D2A]" /> */}
                          <div>
                            <div className="font-semibold text-[#3B5D2A] leading-tight">{kebun.nama_kebun}</div>
                            <div className="text-sm text-[#222] leading-tight">
                              Siram tanaman {tanaman.nama_tanaman || 'di posisi ' + (tanaman.posisi_x + 1) + ',' + (tanaman.posisi_y + 1)}
                            </div>
                          </div>
                        </div>
                      );
                    })
                    .filter(Boolean);
                })}
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
                          <td className="py-2 px-3 border-r border-[#D6E5C2]" />
                          <td className="py-2 px-3 border-r border-[#D6E5C2]" />
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