"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaHome, FaSeedling, FaBook, FaDollarSign } from "react-icons/fa";

export default function Sidebar() {
  const pathname = usePathname();

  const menu = [
    { href: "/user/dashboard", label: "Dashboard", icon: <FaHome size={24} /> },
    { href: "/user/kebun_virtual", label: "Kebun Virtual", icon: <FaSeedling size={24} /> },
    { href: "/user/jurnal", label: "Jurnal", icon: <FaBook size={24} /> },
    { href: "/user/hasil_panen", label: "Hasil Panen", icon: <FaDollarSign size={24} /> },
  ];

  return (
    <aside className="fixed top-16 left-0 h-screen w-24 bg-[#4F6E44] shadow-md flex flex-col items-center py-10 space-y-10 z-50">
      {menu.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`flex flex-col items-center text-white hover:text-gray-200 transition-colors ${
            pathname === item.href ? "text-white font-bold" : "text-white"
          }`}
        >
          {item.icon}
          <span className="text-xs mt-2 text-center">{item.label}</span>
        </Link>
      ))}
    </aside>
  );
}
