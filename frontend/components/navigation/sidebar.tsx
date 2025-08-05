"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FaHome, FaSeedling, FaBook, FaDollarSign } from "react-icons/fa";

export default function Sidebar() {
  const pathname = usePathname();
  const [showKebunDropdown, setShowKebunDropdown] = useState(false);

  const menu = [
    { href: "/user/dashboard", label: "Dashboard", icon: <FaHome size={24} /> },
    { label: "Kebun Virtual", icon: <FaSeedling size={24} />, dropdown: true },
    { href: "/user/jurnal", label: "Jurnal", icon: <FaBook size={24} /> },
    { href: "/user/hasil_panen", label: "Hasil Panen", icon: <FaDollarSign size={24} /> },
  ];

  const userKebunList = [
    { id: 1, name: "Kebun Cabe" },
    { id: 2, name: "Kebun Tomat" },
    { id: 3, name: "Kebun Selada" },
  ];

  return (
    <>
      <aside className="fixed top-16 left-0 h-screen w-24 bg-[#4F6E44] shadow-md flex flex-col items-center py-10 space-y-10 z-50">
        {menu.map((item) => (
          item.dropdown ? (
            <button
              key={item.label}
              onClick={() => setShowKebunDropdown(!showKebunDropdown)}
              className="flex flex-col items-center text-white hover:text-gray-200 transition-colors"
            >
              {item.icon}
              <span className="text-xs mt-2 text-center">{item.label}</span>
            </button>
          ) : (
            <Link
              key={item.href}
              href={item.href!}
              className={`flex flex-col items-center text-white hover:text-gray-200 transition-colors ${
                pathname === item.href ? "font-bold" : ""
              }`}
            >
              {item.icon}
              <span className="text-xs mt-2 text-center">{item.label}</span>
            </Link>
          )
        ))}
      </aside>

      {/* Dropdown kebun */}
      {showKebunDropdown && (
        <div className="fixed top-32 left-28 bg-white shadow-lg rounded-md p-4 space-y-2 z-50">
          {userKebunList.map((kebun) => (
            <Link
              key={kebun.id}
              href={`/user/kebun_virtual/${kebun.id}`}
              className="block text-[#4F6E44] hover:underline"
            >
              {kebun.name}
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
