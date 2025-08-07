"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { FaArrowLeft } from "react-icons/fa";
import NavbarUtama from "../../../../components/navigation/navbar_utama";
import Sidebar from "../../../../components/navigation/sidebar";
import Link from "next/link";

const COLOR_OPTIONS = [
  { color: "#ffffffff", name: "Putih" },
  { color: "#2D5EFF", name: "Biru" },
  { color: "#FF2D2D", name: "Merah" },
  { color: "#E2C04C", name: "Kuning" },
  { color: "#BCAAA4", name: "Coklat" },
  { color: "#4CAF50", name: "Hijau" },
  { color: "#FF9800", name: "Oranye" },
  { color: "#9C27B0", name: "Ungu" },
  { color: "#00BCD4", name: "Cyan" },
  { color: "#FFC107", name: "Amber" },
  { color: "#795548", name: "Coklat Tua" },
  { color: "#607D8B", name: "Biru Abu" },
];

const POT_SHAPES = [
  { label: "2x2", w: 2, h: 2 },
  { label: "5x2", w: 5, h: 2 },
  { label: "2x5", w: 2, h: 5 },
  { label: "5x5", w: 5, h: 5 },
  { label: "1x1", w: 1, h: 1 },
  { label: "2x1", w: 2, h: 1 },
  { label: "3x1", w: 3, h: 1 },
];

type GridCell = {
  color: string;
  shadow: boolean;
  pot: string | null;
  text: string;
  plant: boolean;
};
type PotShape = { label: string; w: number; h: number };
function getDefaultGrid(): GridCell[][] {
  return Array(16)
    .fill(0)
    .map(() => Array(20).fill(null).map(() => ({ color: "", shadow: false, pot: null, text: "", plant: false })));
}

const PLANT_ICON = "/cabai.svg";
import { useParams, useRouter } from "next/navigation";

function KebunVirtualPage() {
  const params = useParams();
  const router = useRouter();
  const kebunId = params?.id || params?.kebunId || params?.kebun_id || null;
  const [kebun, setKebun] = useState<any>(null);
  const [kebunList, setKebunList] = useState<any[]>([]);
  const [koleksiTanaman, setKoleksiTanaman] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  // State grid dinamis
  const [grid, setGrid] = useState<GridCell[][]>([]);
  const [hoverCell, setHoverCell] = useState<{ row: number; col: number }>({ row: -1, col: -1 });
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [shadowMode, setShadowMode] = useState<boolean>(false);
  const [dragPot, setDragPot] = useState<PotShape | null>(null);
  const [dragPos, setDragPos] = useState<{ row: number; col: number } | null>(null);
  const [removePotMode, setRemovePotMode] = useState<boolean>(false);
  const [dragPlant, setDragPlant] = useState<boolean>(false);
  const [selectedPlantId, setSelectedPlantId] = useState<number | null>(null);
  const [textMode, setTextMode] = useState<boolean>(false);
  const [textInput, setTextInput] = useState<string>("");
  const [textCell, setTextCell] = useState<{ row: number; col: number } | null>(null);
  const [saveNotif, setSaveNotif] = useState("");
  const [saveNotifType, setSaveNotifType] = useState("");

  // Remove pointer tool, always allow info popup
  const [plantInfoCell, setPlantInfoCell] = useState<{ row: number; col: number } | null>(null);
  
  // Get tanaman info from grid position
  function getTanamanAt(row: number, col: number) {
    if (!kebun?.grid_data) return null;
    
    // Parse grid data if it's a string
    const gridData = typeof kebun.grid_data === 'string' ? 
      JSON.parse(kebun.grid_data) : kebun.grid_data;
    
    // Get proper grid data structure
    const properGridData = gridData.grid_data || gridData;
    
    // Find tanaman at position
    const tanaman = properGridData.tanaman?.find(
      (t: any) => t.posisi_x === col && t.posisi_y === row
    );
    
    if (!tanaman?.id_tanaman) return null;

    // Get full tanaman info from koleksiTanaman
    const koleksi = koleksiTanaman.find(
      (k: any) => k.tanaman?.id === tanaman.id_tanaman
    );
    
    if (!koleksi?.tanaman) {
      console.error('Tanaman not found in koleksi:', tanaman.id_tanaman);
      return null;
    }

    return {
      ...tanaman,
      tanaman: koleksi.tanaman,
      tanggal_tanam: tanaman.tanggal_tanam || new Date().toISOString()
    };
  }

  function handleCellClick(row: number, col: number) {
    if (removePotMode) {
      setPlantInfoCell(null);
      setGrid((prev) => {
        const newGrid = prev.map((r) => r.slice());
        newGrid[row][col] = { ...newGrid[row][col], pot: null, plant: false };
        return newGrid;
      });
      return;
    }
    // Only show info popup if not in remove mode
    if (grid[row][col].pot && grid[row][col].plant) {
      setPlantInfoCell({ row, col });
      return;
    } else {
      setPlantInfoCell(null);
    }
    if (textMode) {
      setTextCell({ row, col });
      setTextInput(grid[row][col].text || "");
      return;
    }
    setGrid((prev) => {
      const newGrid = prev.map((r) => r.slice());
      if (shadowMode) {
        newGrid[row][col] = { ...newGrid[row][col], shadow: !newGrid[row][col].shadow };
      } else if (selectedColor) {
        newGrid[row][col] = { ...newGrid[row][col], color: selectedColor };
      }
      return newGrid;
    });
  }
  function handlePlantDragStart() {
    setDragPlant(true);
  }

  function handlePlantDrop(row: number, col: number) {
    // Get the currently dragged plant using selectedPlantId
    const selectedPlant = koleksiTanaman.find(k => k.tanaman?.id === selectedPlantId)?.tanaman;
    if (!selectedPlant || !kebun) {
      console.error('No plant selected or kebun not found:', { selectedPlantId, koleksiTanaman });
      return;
    }
    console.log('Dropping plant:', selectedPlant);

    setGrid((prev) => {
      const newGrid = prev.map((r) => r.slice());
      // Only allow plant if there is a pot
      if (newGrid[row][col].pot) {
        // Create plant data with current timestamp
        const plantData = {
          id_tanaman: selectedPlant.id,
          posisi_x: col,
          posisi_y: row,
          tanggal_tanam: new Date().toISOString(),
          ukuran: { x: 1, y: 1 }
        };

        // Get proper grid data structure
        const currentGridData = kebun.grid_data ? 
          (typeof kebun.grid_data === 'string' ? 
            JSON.parse(kebun.grid_data) : kebun.grid_data) : {};
        
        const properGridData = currentGridData.grid_data || currentGridData;
        
        // Update grid_data
        const updatedGridData = {
          grid_data: {
            ...properGridData,
            tanaman: [
              ...(properGridData.tanaman || []),
              plantData
            ]
          }
        };

        // Save to backend
        const token = localStorage.getItem("token");
        if (token) {
          fetch(`http://localhost:8000/api/kebun/${kebun.id}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(updatedGridData),
          }).then(() => {
            // Update local state only after successful save
            if (kebun.grid_data) {
              kebun.grid_data = updatedGridData;
            }
          }).catch(err => {
            console.error('Failed to save plant:', err);
          });
        }

        newGrid[row][col] = { ...newGrid[row][col], plant: true };
      }
      return newGrid;
    });
    setDragPlant(false);
  }

  function handlePotDragStart(pot: PotShape) {
    setDragPot(pot);
  }

  function handleCellDragOver(row: number, col: number, e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDragPos({ row, col });
  }

  function handleCellDrop(row: number, col: number) {
    if (!dragPot || !grid.length || !grid[0].length) return;
    const gridRows = grid.length;
    const gridCols = grid[0].length;
    // Cek apakah pot muat di grid dan tidak menimpa pot lain
    if (row + dragPot.h > gridRows || col + dragPot.w > gridCols) {
      setDragPot(null);
      setDragPos(null);
      return;
    }
    // Cek semua cell target kosong (tidak ada pot)
    let canPlace = true;
    for (let dr = 0; dr < dragPot.h; dr++) {
      for (let dc = 0; dc < dragPot.w; dc++) {
        if (grid[row + dr][col + dc].pot) {
          canPlace = false;
          break;
        }
      }
      if (!canPlace) break;
    }
    if (!canPlace) {
      setDragPot(null);
      setDragPos(null);
      return;
    }
    setGrid((prev) => {
      const newGrid = prev.map((r) => r.slice());
      for (let dr = 0; dr < dragPot.h; dr++) {
        for (let dc = 0; dc < dragPot.w; dc++) {
          newGrid[row + dr][col + dc] = { ...newGrid[row + dr][col + dc], pot: dragPot.label };
        }
      }
      return newGrid;
    });
    setDragPot(null);
    setDragPos(null);
  }

  function handleClearColor() {
    setGrid((prev) => prev.map((row) => row.map((cell) => ({ ...cell, color: "" }))));
  }

  function handleAddShadow() {
    setShadowMode(true);
  }

  function handleRemoveShadow() {
    setGrid((prev) => prev.map((row) => row.map((cell) => ({ ...cell, shadow: false }))));
    setShadowMode(false);
  }

  // Generate grid sesuai panjang/lebar kebun
  function getDynamicGrid(panjang: number, lebar: number): GridCell[][] {
    return Array(Number(lebar))
      .fill(0)
      .map(() =>
        Array(Number(panjang))
          .fill(null)
          .map(() => ({
            color: "",
            shadow: false,
            pot: null,
            text: "",
            plant: false,
          }))
      );
  }

  function serializeGrid() {
    // Basic validation
    if (!grid || !grid.length || !grid[0]?.length) {
      console.error('Grid is empty or invalid');
      return null;
    }

    const grid_size = { x: grid[0].length, y: grid.length };
    const tanaman = [];
    const warna_grid: Record<string, string> = {};
    const bayangan = [];

    // Process all cells in one pass
    for (let y = 0; y < grid.length; y++) {
      for (let x = 0; x < grid[0].length; x++) {
        const cell = grid[y][x];
        
        // Process tanaman (plants and pots)
        if (cell.plant && cell.pot) {
          const tanamanInfo = getTanamanAt(y, x);
          if (tanamanInfo?.tanaman?.id) {
            tanaman.push({
              id_tanaman: tanamanInfo.tanaman.id,
              posisi_x: x,
              posisi_y: y,
              ukuran: { x: 1, y: 1 }
            });
          }
        }
        
        // Process colors
        if (cell.color) {
          warna_grid[`${x}_${y}`] = cell.color;
        }
        
        // Process shadows
        if (cell.shadow) {
          bayangan.push({ 
            posisi_x: x, 
            posisi_y: y, 
            warna: '#999999' 
          });
        }
      }
    }

    // Return the complete grid data structure
    return {
      grid_data: {
        grid_size,
        tanaman,
        warna_grid,
        bayangan
      }
    };
}

async function handleSaveGrid() {
  if (!kebun || !kebun.id) return;
  setSaveNotif("");
  setSaveNotifType("");
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  if (!token) {
    setSaveNotif("Token tidak ditemukan");
    setSaveNotifType("error");
    return;
  }
  try {
    const body = serializeGrid();
    const res = await fetch(`http://localhost:8000/api/kebun/${kebun.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error('Gagal menyimpan grid');
    setSaveNotif('Berhasil disimpan!');
    setSaveNotifType('success');
  } catch (e) {
    setSaveNotif('Gagal menyimpan grid');
    setSaveNotifType('error');
  }
  setTimeout(() => { setSaveNotif(""); setSaveNotifType(""); }, 2500);
}

  useEffect(() => {
    if (!kebunId) return;
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (!token) {
      router.push("/auth/login");
      return;
    }
    // Ambil user_id dari endpoint /api/me
    fetch("http://localhost:8000/api/me", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(user => {
        if (!user.id) {
          setError("User ID tidak ditemukan. Silakan login ulang.");
          setLoading(false);
          return;
        }
        // Fetch kebun
        fetch(`http://localhost:8000/api/kebun?user_id=${user.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
          .then(res => res.json())
          .then(data => {
            setKebunList(Array.isArray(data) ? data : []);
            const found = (Array.isArray(data) ? data : []).find((k: any) => String(k.id) === String(kebunId));
            setKebun(found || null);
            if (found && found.grid_data) {
              let parsed = found.grid_data;
              try {
                if (typeof parsed === 'string') {
                  parsed = JSON.parse(parsed);
                }
                // Check both possible data structures
                const gridData = parsed?.grid_data || parsed;
                
                if (gridData?.grid_size?.x && gridData?.grid_size?.y) {
                  console.log('Creating grid:', gridData.grid_size);
                  const newGrid = Array(gridData.grid_size.y)
                    .fill(0)
                    .map(() => Array(gridData.grid_size.x)
                      .fill(null)
                      .map(() => ({ 
                        color: '', 
                        shadow: false, 
                        pot: null, 
                        text: '', 
                        plant: false 
                      }))
                    );

                  // Apply colors
                  if (gridData.warna_grid) {
                    Object.entries(gridData.warna_grid).forEach(([key, val]) => {
                      const [x, y] = key.split('_').map(Number);
                      if (newGrid[y]?.[x]) {
                        newGrid[y][x].color = val as string;
                      }
                    });
                  }

                  // Apply shadows
                  if (gridData.bayangan) {
                    gridData.bayangan.forEach((b: any) => {
                      if (newGrid[b.posisi_y]?.[b.posisi_x]) {
                        newGrid[b.posisi_y][b.posisi_x].shadow = true;
                      }
                    });
                  }

                  // Apply plants
                  if (gridData.tanaman) {
                    gridData.tanaman.forEach((t: any) => {
                      if (newGrid[t.posisi_y]?.[t.posisi_x]) {
                        newGrid[t.posisi_y][t.posisi_x].plant = true;
                        newGrid[t.posisi_y][t.posisi_x].pot = '1x1' as any; // Type cast for now
                        if (t.warna) {
                          newGrid[t.posisi_y][t.posisi_x].color = t.warna;
                        }
                      }
                    });
                  }
                  
                  console.log('Setting grid:', newGrid); // Debug
                  setGrid(newGrid);
                } else if (found.panjang && found.lebar) {
                  setGrid(getDynamicGrid(found.panjang, found.lebar));
                }
              } catch (e) {
                console.error('Failed to parse grid_data:', e);
                if (found.panjang && found.lebar) {
                  setGrid(getDynamicGrid(found.panjang, found.lebar));
                }
              }
            } else if (found.panjang && found.lebar) {
              setGrid(getDynamicGrid(found.panjang, found.lebar));
            }
            // Fetch koleksi tanaman user
            fetch(`http://localhost:8000/api/koleksi-tanaman?user_id=${user.id}`, {
              headers: { Authorization: `Bearer ${token}` },
            })
              .then(res => res.json())
              .then(koleksi => {
                setKoleksiTanaman(Array.isArray(koleksi) ? koleksi : []);
                setLoading(false);
              })
              .catch(() => {
                setKoleksiTanaman([]);
                setLoading(false);
              });
          })
          .catch(() => {
            setError("Gagal mengambil data kebun.");
            setLoading(false);
          });
      })
      .catch(() => {
        setError("Gagal mengambil data user.");
        setLoading(false);
      });
  }, [kebunId, router]);

  // ...rest of your component, ganti penggunaan GRID_ROWS dan GRID_COLS:
  // const GRID_ROWS = kebun?.lebar || 16;
  // const GRID_COLS = kebun?.panjang || 20;
  // dan gunakan grid.length dan grid[0]?.length untuk render grid

  // Saat render grid:
  // {grid.map((row, rowIdx) =>
  //   row.map((cell, colIdx) => (
  //     // ...render cell...
  //   ))
  // )}

  return (
    <div className="min-h-screen bg-[#F8F9F6] font-sans">
      <NavbarUtama />
      <div className="flex">
        {/* Sidebar dengan kebunList */}
        <Sidebar kebunList={kebunList} />

        {/* Konten Utama */}
        <div className="flex-1 ml-[96px] mt-15"> {/* Sesuaikan offset sesuai lebar sidebar (w-24 = 96px) */}
          <div className="min-h-screen bg-white p-6 flex flex-col gap-4">
            {/* Header */}
            <div className="flex items-center gap-4 mb-2">
              <Link href="/user/dashboard" className="text-2xl text-[#304529] font-bold">
                <FaArrowLeft />
              </Link>
              <h1 className="text-2xl font-bold text-[#304529]">
                {loading ? "Memuat..." : kebun ? kebun.nama_kebun : "Kebun Tidak Ditemukan"}
              </h1>
              <div className="flex-1" />
              <button className="bg-[#FF0000] text-white px-4 py-1 text-xs font-semibold">Hapus Kebun</button>
            </div>

            <div className="flex gap-4 mb-4">
              {/* Text mode button */}
              <button
                className={`px-6 py-1 rounded-full text-xs font-semibold ${textMode ? 'bg-[#3B5D2A] text-white' : 'bg-white text-[#3B5D2A] border border-[#3B5D2A]'}`}
                onClick={() => { setTextMode((v) => !v); setRemovePotMode(false); }}
              >
                <span className="material-icons align-middle mr-1" style={{ fontSize: 16 }}>Teks</span>
              </button>
              {/* Remove mode button */}
              <button
                className={`px-6 py-1 rounded-full text-xs font-semibold ${removePotMode ? 'bg-[#3B5D2A] text-white' : 'bg-white text-[#3B5D2A] border border-[#3B5D2A]'}`}
                onClick={() => { setRemovePotMode((v) => !v); setTextMode(false); }}
              >
                <span className="material-icons align-middle mr-1" style={{ fontSize: 16 }}>Hapus Tanaman / Pot</span>
              </button>
              <button
                className="px-6 py-1 rounded-full text-xs font-semibold bg-[#4CAF50] text-white border border-[#388E3C] hover:bg-[#388E3C]"
                onClick={handleSaveGrid}
                >
                <span className="material-icons align-middle mr-1" style={{ fontSize: 16 }}>Save</span>
                </button>
                {saveNotif && (
                <span className={`ml-2 text-xs font-semibold ${saveNotifType === 'success' ? 'text-green-600' : 'text-red-600'}`}>{saveNotif}</span>
                )}
            </div>

            {/* Main Content */}
            <div className="flex gap-6">
              {/* Main Grid Area - Takes 70% width */}
              <div className="flex-1 bg-white border-2 border-black rounded-lg shadow-md p-2 relative">
                <div className="grid" style={{
                  gridTemplateRows: `repeat(${grid.length}, 1fr)`,
                  gridTemplateColumns: `repeat(${grid[0]?.length}, 1fr)`,
                  width: 'min(100%, 640px)',
                  aspectRatio: `${grid[0]?.length} / ${grid.length}`,
                  maxWidth: 640,
                  margin: '0 auto',
                  background: 'white',
                  cursor: removePotMode
                    ? 'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'32\' height=\'32\'><text y=\'24\' font-size=\'24\'>🗑️</text></svg>") 0 24, pointer'
                    : textMode
                      ? 'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'32\' height=\'32\'><text y=\'24\' font-size=\'24\'>T</text></svg>") 0 24, pointer'
                      : selectedColor
                        ? 'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'32\' height=\'32\'><text y=\'24\' font-size=\'24\'>🖌️</text></svg>") 0 24, pointer'
                        : 'pointer',
                }}>
                  {grid.map((row, rowIdx) =>
                    row.map((cell, colIdx) => {
                      const isHover = hoverCell.row === rowIdx && hoverCell.col === colIdx;
                      const isDragOver = dragPos && dragPos.row === rowIdx && dragPos.col === colIdx;
                      return (
                        <div
                          key={rowIdx + '-' + colIdx}
                          className="border border-gray-300 relative group"
                          style={{
                            background: cell.color || '#fff',
                            boxShadow: cell.shadow ? 'inset 0 0 10px 2px #2226' : undefined,
                            opacity: isDragOver ? 0.7 : 1,
                            zIndex: isHover ? 2 : 1,
                            cursor: removePotMode
                              ? 'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'32\' height=\'32\'><text y=\'24\' font-size=\'24\'>🗑️</text></svg>") 0 24, pointer'
                              : textMode
                                ? 'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'32\' height=\'32\'><text y=\'24\' font-size=\'24\'>T</text></svg>") 0 24, pointer'
                                : selectedColor
                                  ? 'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'32\' height=\'32\'><text y=\'24\' font-size=\'24\'>🖌️</text></svg>") 0 24, pointer'
                                  : 'pointer',
                          }}
                          onMouseEnter={() => setHoverCell({ row: rowIdx, col: colIdx })}
                          onMouseLeave={() => setHoverCell({ row: -1, col: -1 })}
                          onClick={() => handleCellClick(rowIdx, colIdx)}
                          onDragOver={dragPot || dragPlant ? (e) => { e.preventDefault(); if (dragPot) handleCellDragOver(rowIdx, colIdx, e); } : undefined}
                          onDrop={dragPot ? () => handleCellDrop(rowIdx, colIdx) : dragPlant ? () => handlePlantDrop(rowIdx, colIdx) : undefined}
                        >
                          {isHover && (
                            <div className="absolute inset-0 border-2 border-[#3B5D2A] rounded pointer-events-none" style={{ zIndex: 3 }} />
                          )}
                          {/* Pot visual (warna coklat, lebih besar) */}
                          {cell.pot && (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="w-8 h-8 rounded bg-[#BCAAA4] border-2 border-[#795548]" style={{ maxWidth: '80%', maxHeight: '80%' }} />
                            </div>
                          )}
                          {/* Tanaman visual */}
                          {cell.plant && (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <Image src={PLANT_ICON} alt="Tanaman" width={28} height={28} />
                            </div>
                          )}
                          {/* Teks visual */}
                          {cell.text && (
                            <span className="absolute left-0 right-0 bottom-0 text-xs text-[#3B5D2A] bg-white/80 px-1 text-center truncate pointer-events-none">{cell.text}</span>
                          )}
                        </div>
                      );
                    })
                  )}
                </div>
                {/* <div className="absolute left-24 top-80 bg-transparent pointer-events-none select-none text-lg font-bold text-black">Tabulampot</div> */}

                {/* Modal input teks */}
                {textCell && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
                    <div className="bg-white rounded-xl shadow-lg p-6 min-w-[260px] max-w-xs w-full relative">
                      <button
                        className="absolute top-3 right-3 text-[#3B5D2A] text-xl font-bold hover:bg-[#dbeed2] rounded-full w-7 h-7 flex items-center justify-center"
                        onClick={() => setTextCell(null)}
                        aria-label="Tutup"
                      >×</button>
                      <h2 className="text-lg font-bold text-[#3B5D2A] mb-4 text-center">Teks Grid</h2>
                      <input
                        className="w-full rounded border border-[#D6E5C2] px-3 py-2 mb-4"
                        value={textInput}
                        onChange={e => setTextInput(e.target.value)}
                        placeholder="Masukkan teks..."
                        autoFocus
                      />
                      <div className="flex gap-2">
                        <button
                          className="w-full bg-[#3B5D2A] text-white rounded-md py-2 font-semibold hover:bg-[#2e4a1f]"
                          onClick={() => {
                            if (!textCell) return;
                            setGrid(prev => {
                              const newGrid = prev.map(r => r.slice());
                              newGrid[textCell.row][textCell.col] = { ...newGrid[textCell.row][textCell.col], text: textInput };
                              return newGrid;
                            });
                            setTextCell(null);
                          }}
                        >Simpan</button>
                        <button
                          className="w-full bg-[#FF4B4B] text-white rounded-md py-2 font-semibold hover:bg-[#b71c1c]"
                          onClick={() => {
                            if (!textCell) return;
                            setGrid(prev => {
                              const newGrid = prev.map(r => r.slice());
                              newGrid[textCell.row][textCell.col] = { ...newGrid[textCell.row][textCell.col], text: "" };
                              return newGrid;
                            });
                            setTextCell(null);
                          }}
                        >Hapus</button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Plant Info Popup */}
                {plantInfoCell && (
                  <div className="absolute z-50" style={{
                    left: `calc(${(plantInfoCell.col + 1) * (100 / grid[0]?.length)}% - 180px)`,
                    top: `calc(${plantInfoCell.row * (100 / grid.length)}% - 10px)`,
                    minWidth: 220,
                    maxWidth: 260,
                  }}>
                    <div className="bg-[#F3F7E9] border border-[#BCAAA4] rounded-xl shadow-lg p-4 relative">
                      <button
                        className="absolute top-2 right-2 text-[#3B5D2A] text-lg font-bold hover:bg-[#dbeed2] rounded-full w-6 h-6 flex items-center justify-center"
                        onClick={() => setPlantInfoCell(null)}
                        aria-label="Tutup"
                      >x</button>
                      {/* Plant info */}
                      {(() => {
                        // Get plant info
                        const tanamanInfo = getTanamanAt(plantInfoCell.row, plantInfoCell.col);
                        
                        if (!tanamanInfo?.tanaman?.id) {
                          return (
                            <div className="text-center p-2">
                              <div className="font-bold text-red-600">Data Tanaman Tidak Lengkap</div>
                              <div className="text-sm text-gray-600 mt-1">Silakan refresh halaman</div>
                            </div>
                          );
                        }

                        // Calculate dates
                        const tanggalTanam = new Date(tanamanInfo.tanggal_tanam);
                        const waktuPanen = (tanamanInfo.tanaman.waktu_panen || 0) * 24 * 60 * 60 * 1000;
                        const tanggalPanen = new Date(tanggalTanam.getTime() + waktuPanen);
                        const umurHari = Math.floor((Date.now() - tanggalTanam.getTime()) / (24 * 60 * 60 * 1000));
                        
                        return (
                          <>
                            <div className="font-bold text-center mb-2">{tanamanInfo.tanaman.nama_tanaman || 'Tanaman'}</div>
                            <div className="text-sm mb-1">Waktu Tanam<br />
                              <span className="font-semibold">{tanggalTanam.toLocaleDateString('id-ID')}</span>
                            </div>
                            <div className="text-sm mb-1">Perkiraan Panen<br />
                              <span className="font-semibold">{tanggalPanen.toLocaleDateString('id-ID')}</span>
                            </div>
                            <div className="text-sm mb-1">Umur<br />
                              <span className="font-semibold">{umurHari} Hari</span>
                            </div>
                          </>
                        );
                      })()}
                      {/* Harvest notification */}
                      {saveNotif && saveNotifType === 'harvest' && (
                        <div className={`text-sm mb-2 ${saveNotif.toLowerCase().includes('gagal') || saveNotif.toLowerCase().includes('error') ? 'text-red-600' : 'text-green-600'}`}>
                          {saveNotif}
                        </div>
                      )}
                      <button 
                        className="w-full mt-2 bg-[#3B5D2A] text-white rounded-md py-2 font-semibold hover:bg-[#2e4a1f]"
                        onClick={async () => {
                          const tanamanInfo = getTanamanAt(plantInfoCell.row, plantInfoCell.col);
                          if (!tanamanInfo?.tanaman?.id || !kebun) {
                            console.error('Missing data:', { tanamanInfo, kebun });
                            setSaveNotif("Data tanaman tidak lengkap");
                            setSaveNotifType("error");
                            return;
                          }
                          
                          setSaveNotif("Sedang memanen...");
                          setSaveNotifType("harvest");
                          
                          try {
                            const token = localStorage.getItem("token");
                            if (!token) throw new Error("Token tidak ditemukan");
                            
                            const requestBody = {
                              id_kebun: kebun.id,
                              id_user: kebun.id_user,
                              id_tanaman: tanamanInfo.tanaman.id,
                              posisi_x: plantInfoCell.col,
                              posisi_y: plantInfoCell.row,
                              kuantitas_panen: null,
                              harga_tanam: null
                            };
                            
                            console.log('Sending harvest request:', requestBody);
                            
                            const res = await fetch("http://localhost:8000/api/kebun/harvest", {
                              method: "POST",
                              headers: {
                                "Content-Type": "application/json",
                                Authorization: `Bearer ${token}`,
                              },
                              body: JSON.stringify(requestBody),
                            });
                            
                            const data = await res.json();
                            console.log('Harvest response:', data);
                            
                            if (!res.ok) throw new Error(data.error || data.message || "Gagal memanen tanaman");
                            
                            // Update grid state to remove plant
                            setGrid(prev => {
                              const newGrid = prev.map(row => row.map(cell => ({...cell})));
                              newGrid[plantInfoCell.row][plantInfoCell.col].plant = false;
                              newGrid[plantInfoCell.row][plantInfoCell.col].pot = null;
                              return newGrid;
                            });
                            
                            // Update kebun grid_data
                            if (kebun.grid_data) {
                              const gridData = typeof kebun.grid_data === 'string' ? 
                                JSON.parse(kebun.grid_data) : kebun.grid_data;
                              
                              if (!gridData.grid_data) gridData.grid_data = {};
                              
                              // Remove harvested plant
                              if (gridData.grid_data.tanaman) {
                                gridData.grid_data.tanaman = gridData.grid_data.tanaman.filter(
                                  (t: any) => !(t.posisi_x === plantInfoCell.col && t.posisi_y === plantInfoCell.row)
                                );
                              }
                              
                              kebun.grid_data = gridData;
                            }
                            
                            setSaveNotif("Tanaman berhasil dipanen!");
                            setSaveNotifType("success");
                            
                            // Close popup after 1.5s
                            setTimeout(() => {
                              setPlantInfoCell(null);
                              setSaveNotif("");
                              setSaveNotifType("");
                            }, 1500);
                          } catch (error) {
                            console.error('Harvest error:', error);
                            setSaveNotif(error instanceof Error ? error.message : "Gagal memanen tanaman");
                            setSaveNotifType("error");
                          }
                        }}
                      >
                        Panen
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Right Sidebar - Takes 30% width */}
              <div className="w-[30%] flex flex-col gap-4">
                {/* Top Right Container - Informasi Kebun */}
                <div className="bg-[#EAF3E2] border-2 border-black rounded-lg shadow-md p-4">
                  <h2 className="text-lg font-bold text-[#3B5D2A] text-center mb-3">Informasi Kebun</h2>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-[#3B5D2A] mb-1">Nama Kebun</label>
                      <input
                        className="w-full rounded border-2 border-gray-300 px-3 py-2 bg-white"
                        value={kebun?.nama_kebun || ""}
                        readOnly
                      />
                    </div>
                    <div className="flex gap-3">
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-[#3B5D2A] mb-1">Panjang</label>
                        <input
                          className="w-full rounded border-2 border-gray-300 px-3 py-2 bg-white"
                          value={kebun?.panjang || ""}
                          readOnly
                        />
                      </div>
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-[#3B5D2A] mb-1">Lebar</label>
                        <input
                          className="w-full rounded border-2 border-gray-300 px-3 py-2 bg-white"
                          value={kebun?.lebar || ""}
                          readOnly
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Right Container - Koleksi Tanaman */}
                <div className="bg-[#F8F9F6] border-2 border-black rounded-lg shadow-md p-4 flex-1">
                  <h2 className="text-lg font-bold text-[#3B5D2A] mb-3">Koleksi Tanaman</h2>
                  <div className="space-y-3">
                    {koleksiTanaman.length === 0 ? (
                      <div className="text-[#3B5D2A] text-sm">Belum ada koleksi tanaman.</div>
                    ) : (
                      koleksiTanaman.map((item: any) => {
                        // Pastikan src selalu string valid
                        let imgSrc = PLANT_ICON;
                        if (item.tanaman?.foto_tanaman && typeof item.tanaman.foto_tanaman === "string" && item.tanaman.foto_tanaman.trim() !== "") {
                          // Jika sudah url absolut, pakai langsung. Jika relatif, tambahkan origin
                          if (/^https?:\/\//.test(item.tanaman.foto_tanaman)) {
                            imgSrc = item.tanaman.foto_tanaman;
                          } else {
                            // Asumsi backend mengirim path relatif dari public, tambahkan origin
                            if (typeof window !== "undefined" && item.tanaman.foto_tanaman[0] === "/") {
                              imgSrc = window.location.origin + item.tanaman.foto_tanaman;
                            } else {
                              imgSrc = PLANT_ICON;
                            }
                          }
                        }
                        return (
                          <div key={item.id} className="flex items-center gap-3 p-2 bg-white rounded-lg border border-gray-200">
                            <Image 
                              src={imgSrc} 
                              alt={item.tanaman?.nama_tanaman || "Tanaman"} 
                              width={32} 
                              height={32} 
                              draggable 
                              onDragStart={() => {
                                setDragPlant(true);
                                setSelectedPlantId(item.tanaman?.id || null);
                                console.log('Started dragging plant:', item.tanaman);
                              }} 
                              onDragEnd={() => {
                                setDragPlant(false);
                                setSelectedPlantId(null);
                              }} 
                            />
                            <span className="text-sm font-medium text-[#3B5D2A]">{item.tanaman?.nama_tanaman || "Tanaman"}</span>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Control Panel */}
            <div className="flex gap-6 mt-4">
              {/* Warna Section */}
              <div className="bg-[#EAF3E2] border-2 border-black rounded-lg shadow-md p-4 w-[40%] relative">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-lg font-bold text-[#3B5D2A]">Warna</h3>
                  <button
                    className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center ${!selectedColor
                        ? 'bg-white text-[#3B5D2A] border border-[#3B5D2A] hover:bg-[#f3f8ef]'
                        : 'bg-[#3B5D2A] text-white'
                      }`}
                    onClick={() => { setSelectedColor(""); setShadowMode(false); }}
                  >
                    Reset Warna
                  </button>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {COLOR_OPTIONS.map((opt) => (
                    <button
                      key={opt.color}
                      className={`w-8 h-8 rounded-full border-2 ${selectedColor === opt.color
                          ? 'border-[#3B5D2A]'
                          : 'border-white hover:border-[#D6E5C2]'
                        }`}
                      style={{ background: opt.color }}
                      onClick={() => { setSelectedColor(opt.color); setShadowMode(false); }}
                    />
                  ))}
                </div>

                <button
                  className="bg-[#3B5D2A] text-white px-4 py-2 rounded-lg text-sm font-semibold w-full hover:bg-[#2d4721]"
                  onClick={handleClearColor}
                >
                  Hapus Semua Warna
                </button>
              </div>

              {/* Bayangan Section */}
              <div className="bg-[#EAF3E2] border-2 border-black rounded-lg shadow-md p-4 w-[30%]">
                <h3 className="text-lg font-bold text-[#3B5D2A] mb-3">Bayangan</h3>
                <div className="w-full h-10 rounded bg-[#222] opacity-40 mb-4" />
                <div className="space-y-2">
                  <button
                    className="bg-[#3B5D2A] text-white px-4 py-2 rounded-lg text-sm font-semibold w-full"
                    onClick={handleAddShadow}
                  >
                    Tambah Bayangan
                  </button>
                  <button
                    className="bg-[#3B5D2A] text-white px-4 py-2 rounded-lg text-sm font-semibold w-full"
                    onClick={handleRemoveShadow}
                  >
                    Hapus Bayangan
                  </button>
                </div>
              </div>

              {/* Tambah Pot Section */}
              <div className="bg-[#F8F9F6] border-2 border-black rounded-lg shadow-md p-4 w-[30%]">
                <h3 className="text-lg font-bold text-[#3B5D2A] mb-3">Tambah Pot</h3>
                <div className="grid grid-cols-3 gap-3">
                  {POT_SHAPES.map((pot) => (
                    <button
                      key={pot.label}
                      className="border-2 border-[#3B5D2A] rounded-lg aspect-square flex items-center justify-center text-sm font-semibold text-[#3B5D2A] bg-white hover:bg-[#EAF3E2]"
                      draggable
                      onDragStart={() => handlePotDragStart(pot)}
                      onDragEnd={() => { setDragPot(null); setDragPos(null); }}
                    >
                      {pot.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default KebunVirtualPage;
