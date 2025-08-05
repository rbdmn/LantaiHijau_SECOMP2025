"use client";

import { useState } from "react";
import Link from "next/link";
import NavbarUtama from "../../../components/navigation/navbar_utama";
import { FaRegUserCircle } from "react-icons/fa";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { FiEye, FiEyeOff } from "react-icons/fi";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Register attempt:", formData);
    // Validasi tambahan bisa ditambahkan di sini
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
        <div className="w-full max-w-md bg-[#E8EFE0] p-10 rounded-xl shadow-md text-center mt-15">
          <h1 className="text-3xl font-bold text-[#3C4F3A] mb-2">Daftar</h1>
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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-[#5C7D5B] focus:border-transparent transition-colors"
                placeholder="Masukkan email Anda"
              />
            </div>

            <div>
              
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-[#5C7D5B] focus:border-transparent transition-colors"
                placeholder="Masukkan username Anda"
              />
            </div>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-[#5C7D5B] focus:border-transparent transition-colors"
                placeholder="Masukkan password Anda"
              />
              <div
                className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
              </div>
            </div>

            <div className="relative mt-4">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-[#5C7D5B] focus:border-transparent transition-colors"
                placeholder="Konfirmasi password Anda"
              />
              <div
                className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
              </div>
            </div>


            <button
              type="submit"
              className="w-full bg-[#5C7D5B] text-white py-3 px-4 rounded-lg font-medium hover:bg-[#4A6B4A] transition-colors duration-200"
            >
              Daftar
            </button>
          </form>

          <p className="mt-6 text-sm text-gray-600">
            Sudah punya akun?{" "}
            <Link href="/auth/login" className="text-[#5C7D5B] hover:underline">
              Masuk di sini
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
