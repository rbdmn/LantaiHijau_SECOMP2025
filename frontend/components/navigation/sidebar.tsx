"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { useState } from "react";

export type KebunSidebar = {
  id: number;
  nama_kebun: string;
};
import { FaHome, FaSeedling, FaBook, FaDollarSign } from "react-icons/fa";

interface SidebarProps {
  kebunList?: KebunSidebar[];
}

export default function Sidebar({ kebunList = [] }: SidebarProps) {
  const pathname = usePathname();
  const [showKebunDropdown, setShowKebunDropdown] = useState(false);

  const menu = [
    { href: "/user/dashboard", label: "Dashboard", icon: <FaHome size={24} /> },
    { label: "Kebun Virtual", icon: <FaSeedling size={24} />, dropdown: true },
    { href: "/user/jurnal", label: "Jurnal", icon: <FaBook size={24} /> },
    { href: "/user/hasil_panen", label: "Hasil Panen", icon: <FaDollarSign size={24} /> },
  ];

  // userKebunList diambil dari props kebunList

  return (
    <>
      <aside className="fixed top-16 left-0 h-screen w-24 bg-[#4F6E44] shadow-md flex flex-col items-center py-10 space-y-10 z-50">
        {menu.map((item) => {
          let isSelected;
          if (item.dropdown) {
            // Selected if dropdown open OR current path is kebun_virtual page
            isSelected = showKebunDropdown || pathname.startsWith('/user/kebun_virtual');
          } else {
            isSelected = pathname === item.href;
          }
          const iconStyle = isSelected
            ? {
                color: '#4F6E44',
                background: '#fff',
                borderRadius: '50%',
                padding: '6px',
                boxShadow: '0 2px 8px rgba(79,110,68,0.08)',
              }
            : { color: '#fff' };
          if (item.dropdown) {
            return (
              <button
                key={item.label}
                onClick={() => setShowKebunDropdown(!showKebunDropdown)}
                className="flex flex-col items-center text-white hover:text-gray-200 transition-colors"
              >
                <span style={iconStyle}>{item.icon}</span>
                <span className="text-xs mt-2 text-center">{item.label}</span>
              </button>
            );
          }
          return (
            <Link
              key={item.href}
              href={item.href!}
              className="flex flex-col items-center text-white hover:text-gray-200 transition-colors"
            >
              <span style={iconStyle}>{item.icon}</span>
              <span className="text-xs mt-2 text-center">{item.label}</span>
            </Link>
          );
        })}
      </aside>


      {/* Dropdown kebun */}
      {showKebunDropdown && (
        <div className="fixed top-32 left-28 bg-white shadow-lg rounded-md p-4 space-y-2 z-50">
          {kebunList.length === 0 ? (
            <div className="text-[#4F6E44]">Belum ada kebun</div>
          ) : (
            kebunList.map((kebun) => (
              <Link
                key={kebun.id}
                href={`/user/kebun_virtual/${kebun.id}`}
                className="block text-[#4F6E44] hover:underline"
              >
                {kebun.nama_kebun}
              </Link>
            ))
          )}
        </div>
      )}
    </>
  );
}
