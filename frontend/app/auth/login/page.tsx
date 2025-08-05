"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import NavbarUtama from "../../../components/navigation/navbar_utama";
import { FaRegUserCircle } from "react-icons/fa";



export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login attempt:", formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <main className="bg-[#E6F0E6] min-h-screen font-sans">
      <NavbarUtama />

      <div className="flex items-center bg-gradient-to-t from-[#304529] to-[#557C49] justify-center min-h-screen pt-16 px-4">
        <div className="w-full max-w-md bg-[#E8EFE0] p-10 rounded-xl shadow-md text-center">

          <h1 className="text-3xl font-bold text-[#3C4F3A] mb-2">Login</h1>
          <FaRegUserCircle className="text-[#3C4F3A] text-6xl mx-auto mt-5 mb-5" />

          <form onSubmit={handleSubmit} className="space-y-6 text-left">
            <div>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5C7D5B] focus:border-transparent transition-colors"
                placeholder="Masukkan email Anda"
              />
            </div>

            <div>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5C7D5B] focus:border-transparent transition-colors"
                placeholder="Masukkan password Anda"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#5C7D5B] text-white py-3 px-4 rounded-lg font-medium hover:bg-[#4A6B4A] transition-colors duration-200"
            >
              Submit
            </button>
          </form>

          <p className="mt-6 text-sm text-gray-600">
            Belum punya akun?{" "}
            <Link href="/auth/register" className="text-[#5C7D5B] hover:underline">
              Daftar di sini
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
