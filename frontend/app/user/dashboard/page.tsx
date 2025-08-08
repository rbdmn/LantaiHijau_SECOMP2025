"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import NavbarUtama from "../../../components/navigation/navbar_utama";
import Sidebar from "../../../components/navigation/sidebar";
import Link from 'next/link';
import { FaPlusCircle } from "react-icons/fa";

export default function DashboardPage() {
  // Map id_tanaman ke nama_tanaman
  const [tanamanMap, setTanamanMap] = useState<{[id: number]: string}>({});

  // Fetch semua tanaman dan simpan di tanamanMap
  useEffect(() => {
    const fetchTanamanOptions = async () => {
      try {
        const res = await fetch('http://localhost:8000/api/tanaman');
        const data = await res.json();
        // data bisa array atau {data: array}
        const list = Array.isArray(data) ? data : data.data;
        const map: {[id: number]: string} = {};
        list.forEach((tanaman: any) => {
          map[tanaman.id] = tanaman.nama_tanaman;
        });
        setTanamanMap(map);
      } catch (err) {
        // ignore error
      }
    };
    fetchTanamanOptions();
  }, []);
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ nama: "", panjang: "", lebar: "" });
  const [kebunList, setKebunList] = useState<any[]>([]);
  const [userId, setUserId] = useState<number|null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [hasilPanen, setHasilPanen] = useState<any[]>([]);
  const [totalPenghematan, setTotalPenghematan] = useState<number>(0);

  const calculatePenghematan = (panen: any) => {
  if (!panen.kuantitas_panen || !panen.harga_tanam || !panen.tanaman?.rata_harga) return 0;
  const kuantitasKg = panen.kuantitas_panen / 1000; // Convert gram to kg
  return Math.max(0, (panen.tanaman.rata_harga - panen.harga_tanam) * kuantitasKg);
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/auth/login");
      return;
    }

    // Fungsi async untuk handle fetch
    const fetchData = async () => {
      try {
        // Fetch user info
        const userRes = await fetch("http://localhost:8000/api/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const user = await userRes.json();
        setUserId(user.id);

        // Fetch kebun
        const kebunRes = await fetch(`http://localhost:8000/api/kebun?user_id=${user.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const kebunData = await kebunRes.json();
        setKebunList(Array.isArray(kebunData) ? kebunData : []);

        // Fetch hasil panen
        const panenRes = await fetch("http://localhost:8000/api/hasil-panen", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const panenData = await panenRes.json();

        // Filter hasil panen yang lengkap
        const completePanen = panenData.data.filter((p: any) =>
          p.kuantitas_panen !== null && p.harga_tanam !== null
        );
        setHasilPanen(completePanen);
        setTotalPenghematan(panenData.total_penghematan || 0);

        setLoading(false);
      } catch (err) {
        console.error("Gagal mengambil data:", err);
        setError("Gagal mengambil data user/kebun/panen.");
        setLoading(false);
      }
    };

    fetchData();
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
                  onClick={() => setShowModal(true)}
                  className="text-[#3B5D2A] text-2xl hover:text-green-800 transition-colors"
                >
                  <FaPlusCircle />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#3B5D2A]"></div>
                  </div>
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

              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#3B5D2A]"></div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                  {kebunList.flatMap(kebun => {
                    if (!kebun.grid_data) return [];

                    let gridData;
                    try {
                      gridData = typeof kebun.grid_data === 'string'
                        ? JSON.parse(kebun.grid_data)
                        : kebun.grid_data;
                    } catch (e) {
                      console.error('Error parsing grid data for kebun:', kebun.nama_kebun, e);
                      return [];
                    }

                    if (!gridData.tanaman || !Array.isArray(gridData.tanaman)) return [];

                    return gridData.tanaman
                      .map((tanaman: any, index: number) => {
                        const tanggalTanam = new Date(); // ini bisa diganti kalau kamu punya data tanggal_tanam asli
                        const today = new Date();
                        const daysSincePlanting = Math.floor(
                          (today.getTime() - tanggalTanam.getTime()) / (1000 * 60 * 60 * 24)
                        );
                        const needsWatering = daysSincePlanting % 2 === 0;
                        if (!needsWatering) return null;

                        const namaTanaman = tanamanMap[tanaman.id_tanaman] || '-';

                        return (
                          <div key={`${kebun.id}-${index}`} className="flex items-center gap-3 p-2 bg-[#F8F9F6] rounded-lg">
                            <div>
                              <div className="font-semibold text-[#3B5D2A] leading-tight">{kebun.nama_kebun}</div>
                              <div className="text-sm text-[#222] leading-tight">
                                Siram tanaman <span className="font-bold text-[#4B6A3D]">{namaTanaman}</span>
                                {tanaman.posisi_x !== undefined && tanaman.posisi_y !== undefined
                                  ? ` di posisi ${tanaman.posisi_x + 1},${tanaman.posisi_y + 1}`
                                  : ''}
                              </div>
                            </div>
                          </div>
                        );
                      })
                      .filter(Boolean);
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Hasil Panen */}
          <div className="bg-[#EAF3E2] rounded-xl shadow p-6 w-full">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-[#3B5D2A]">Hasil Panen</h2>
              <Link href="/user/hasil_panen" className="text-[#3B5D2A] text-sm hover:underline">Lihat Semua</Link>
            </div>
            <div className="flex flex-col gap-6">
              {hasilPanen?.slice(0, 2).map((panen) => {
                // Foto tanaman
                let imgSrc = '';
                if (panen.foto_tanaman) {
                  if (panen.foto_tanaman.startsWith('http')) {
                    imgSrc = panen.foto_tanaman;
                  } else {
                    imgSrc = `http://localhost:8000/uploads/${panen.foto_tanaman}`;
                  }
                } else {
                  console.log("Image src:", imgSrc);
                  imgSrc = '/cabai.svg'; // fallback hanya jika tidak ada foto sama sekali
                }
                return (
                  <div key={panen.id} className="bg-white rounded-lg shadow p-0 border border-[#D6E5C2]">
                    <table className="w-full text-sm rounded-lg overflow-hidden">
                      <thead>
                        <tr className="bg-[#F8F9F6] text-[#3B5D2A] font-semibold">
                          <th className="text-center border-r border-[#D6E5C2]">Nama & Foto</th>
                          <th className="text-center border-r border-[#D6E5C2]">Tanggal</th>
                          <th className="text-center border-r border-[#D6E5C2]">Kuantitas Panen</th>
                          <th className="text-center border-r border-[#D6E5C2]">Harga Tanam</th>
                          <th className="text-center border-r border-[#D6E5C2]">Rata-Rata Harga Pasar</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="text-center align-middle border-r border-[#D6E5C2]">
                            <div className="flex flex-col items-center justify-center">
                              <img src={imgSrc} alt={panen.nama_tanaman || 'Tanaman'} width={40} height={40} className="object-contain mb-1" style={{ borderRadius: '6px', background: '#F8F9F6', border: '1px solid #D6E5C2' }} />
                              <span className="text-[#3B5D2A] text-sm font-semibold">{panen.nama_tanaman || 'Tanaman'}</span>
                            </div>
                          </td>
                          <td className="text-center align-middle border-r border-[#D6E5C2] font-bold">{panen.tanggal ? new Date(panen.tanggal).toISOString().slice(0, 10) : '-'}</td>
                          <td className="text-center align-middle border-r border-[#D6E5C2] font-bold">{panen.kuantitas_panen} gram</td>
                          <td className="text-center align-middle border-r border-[#D6E5C2] font-bold">Rp. {panen.harga_tanam?.toLocaleString('id-ID')}</td>
                          <td className="text-center align-middle border-r border-[#D6E5C2] font-bold">{panen.tanaman?.rata_harga ? `Rp. ${Number(panen.tanaman.rata_harga).toLocaleString('id-ID')}/Kg` : '-'}</td>
                          
                        </tr>
                        <tr>
                          <td colSpan={7} className="bg-[#F8F9F6] text-[#3B5D2A] text-right px-4 py-2 font-semibold border-t border-[#D6E5C2]">
                            Total Penghematan : <span className="text-green-700 font-bold">Rp. {calculatePenghematan(panen).toLocaleString('id-ID')}</span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                );
              })}
              {!hasilPanen && <div className="text-center text-[#3B5D2A]">Memuat data...</div>}
              {hasilPanen?.length === 0 && (
                <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#3B5D2A]"></div>
                  </div>
              )}
            </div>
            <div className="flex justify-between items-center mt-6 bg-[#3B5D2A] text-white rounded shadow px-6 py-3 text-lg font-semibold">
              <span>Total Keseluruhan Penghematan :</span>
              <span>Rp. {totalPenghematan?.toLocaleString('id-ID') || 0}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}