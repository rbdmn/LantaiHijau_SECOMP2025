"use client";
import { useState } from "react";
import Image from "next/image";
import { FaArrowLeft } from "react-icons/fa";
import NavbarUtama from "../../../components/navigation/navbar_utama";
import Sidebar from "../../../components/navigation/sidebar";
import Link from "next/link";

const GRID_ROWS = 16;
const GRID_COLS = 20;
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
  return Array(GRID_ROWS)
    .fill(0)
    .map(() => Array(GRID_COLS).fill(null).map(() => ({ color: "", shadow: false, pot: null, text: "", plant: false })));
}

const PLANT_ICON = "/cabai.svg";
function KebunVirtualPage() {
  const [grid, setGrid] = useState<GridCell[][]>(getDefaultGrid());
  const [hoverCell, setHoverCell] = useState<{ row: number; col: number }>({ row: -1, col: -1 });
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [shadowMode, setShadowMode] = useState<boolean>(false);
  const [dragPot, setDragPot] = useState<PotShape | null>(null);
  const [dragPos, setDragPos] = useState<{ row: number; col: number } | null>(null);
  const [removePotMode, setRemovePotMode] = useState<boolean>(false);
  const [dragPlant, setDragPlant] = useState<boolean>(false);
  const [textMode, setTextMode] = useState<boolean>(false);
  const [textInput, setTextInput] = useState<string>("");
  const [textCell, setTextCell] = useState<{ row: number; col: number } | null>(null);

  // Remove pointer tool, always allow info popup
  const [plantInfoCell, setPlantInfoCell] = useState<{ row: number; col: number } | null>(null);

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
    setGrid((prev) => {
      const newGrid = prev.map((r) => r.slice());
      // Only allow plant if there is a pot
      if (newGrid[row][col].pot) {
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
    if (!dragPot) return;
    setGrid((prev) => {
      const newGrid = prev.map((r) => r.slice());
      for (let dr = 0; dr < dragPot.h; dr++) {
        for (let dc = 0; dc < dragPot.w; dc++) {
          const rr = row + dr;
          const cc = col + dc;
          if (rr < GRID_ROWS && cc < GRID_COLS) {
            // Only set pot, do not overwrite color
            newGrid[rr][cc] = { ...newGrid[rr][cc], pot: dragPot.label };
          }
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

  return (
    <div className="min-h-screen bg-[#F8F9F6] font-sans">
      <NavbarUtama />
      <div className="flex">
        {/* Sidebar */}
        <Sidebar />

        {/* Konten Utama */}
        <div className="flex-1 ml-[96px] mt-15"> {/* Sesuaikan offset sesuai lebar sidebar (w-24 = 96px) */}
          {/* Title */}
          <div className="px-8 pt-8 mt-[60px]">
            <h1 className="text-[#3B5D2A] text-5xl font-bold mb-6" style={{ fontFamily: "inherit" }}>
              Kebun Virtual
            </h1>
          </div>
          <div className="min-h-screen bg-white p-6 flex flex-col gap-4">
            {/* Header */}
            <div className="flex items-center gap-4 mb-2">
              <Link href="/user/dashboard" className="text-2xl text-[#304529] font-bold">
                <FaArrowLeft />
              </Link>
              <h1 className="text-2xl font-bold text-[#304529]">My Garden</h1>
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
            </div>

            {/* Main Content */}
            <div className="flex gap-6">
              {/* Main Grid Area - Takes 70% width */}
              <div className="flex-1 bg-white border-2 border-black rounded-lg shadow-md p-2 relative">
                <div className="grid" style={{
                  gridTemplateRows: `repeat(${GRID_ROWS}, 1fr)`,
                  gridTemplateColumns: `repeat(${GRID_COLS}, 1fr)`,
                  width: 'min(100%, 640px)',
                  aspectRatio: `${GRID_COLS} / ${GRID_ROWS}`,
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
                  {Array.from({ length: GRID_ROWS }).map((_, row) =>
                    Array.from({ length: GRID_COLS }).map((_, col) => {
                      const cell = grid[row][col];
                      const isHover = hoverCell.row === row && hoverCell.col === col;
                      const isDragOver = dragPos && dragPos.row === row && dragPos.col === col;
                      return (
                        <div
                          key={row + '-' + col}
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
                          onMouseEnter={() => setHoverCell({ row, col })}
                          onMouseLeave={() => setHoverCell({ row: -1, col: -1 })}
                          onClick={() => handleCellClick(row, col)}
                          onDragOver={dragPot || dragPlant ? (e) => { e.preventDefault(); if (dragPot) handleCellDragOver(row, col, e); } : undefined}
                          onDrop={dragPot ? () => handleCellDrop(row, col) : dragPlant ? () => handlePlantDrop(row, col) : undefined}
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
                    left: `calc(${(plantInfoCell.col + 1) * (100 / GRID_COLS)}% - 180px)`,
                    top: `calc(${plantInfoCell.row * (100 / GRID_ROWS)}% - 10px)`,
                    minWidth: 220,
                    maxWidth: 260,
                  }}>
                    <div className="bg-[#F3F7E9] border border-[#BCAAA4] rounded-xl shadow-lg p-4 relative">
                      <button
                        className="absolute top-2 right-2 text-[#3B5D2A] text-lg font-bold hover:bg-[#dbeed2] rounded-full w-6 h-6 flex items-center justify-center"
                        onClick={() => setPlantInfoCell(null)}
                        aria-label="Tutup"
                      >×</button>
                      <div className="font-bold text-center mb-2">Tanaman Cabai</div>
                      <div className="text-sm mb-1">Waktu Tanam<br /><span className="font-semibold">01/01/2025</span></div>
                      <div className="text-sm mb-1">Perkiraan Panen<br /><span className="font-semibold">01/02/2025</span></div>
                      <div className="text-sm mb-1">Umur<br /><span className="font-semibold">2 Hari</span></div>
                      <button className="w-full mt-2 bg-[#3B5D2A] text-white rounded-md py-2 font-semibold hover:bg-[#2e4a1f]">Panen</button>
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
                        value="My Garden"
                        readOnly
                      />
                    </div>
                    <div className="flex gap-3">
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-[#3B5D2A] mb-1">Panjang</label>
                        <input
                          className="w-full rounded border-2 border-gray-300 px-3 py-2 bg-white"
                          value="16"
                          readOnly
                        />
                      </div>
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-[#3B5D2A] mb-1">Lebar</label>
                        <input
                          className="w-full rounded border-2 border-gray-300 px-3 py-2 bg-white"
                          value="12"
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
                    {[1, 2, 3, 4].map((n) => (
                      <div key={n} className="flex items-center gap-3 p-2 bg-white rounded-lg border border-gray-200">
                        <Image src={PLANT_ICON} alt="Tanaman" width={32} height={32} draggable onDragStart={() => setDragPlant(true)} onDragEnd={() => setDragPlant(false)} />
                        <span className="text-sm font-medium text-[#3B5D2A]">Nama Tanaman</span>
                      </div>
                    ))}
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