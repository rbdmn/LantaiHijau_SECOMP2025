"use client";

import { useState } from "react";
import Link from "next/link";
import NavbarUtama from "../../../components/navigation/navbar_utama";
import { FaRegUserCircle } from "react-icons/fa";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

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
        <div className="w-full max-w-md bg-[#E8EFE0] p-10 rounded-xl shadow-md text-center">
          <h1 className="text-3xl font-bold text-[#3C4F3A] mb-2">Registrasi</h1>
          <FaRegUserCircle className="text-[#3C4F3A] text-6xl mx-auto mt-5 mb-5" />

          <form onSubmit={handleSubmit} className="space-y-6 text-left">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
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
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5C7D5B] focus:border-transparent transition-colors"
                placeholder="Masukkan username Anda"
              />
            </div>

            <div className="relative">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5C7D5B] focus:border-transparent transition-colors"
                placeholder="Masukkan password Anda"
              />
              <div
                className="absolute top-[38px] right-4 cursor-pointer text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <AiFillEyeInvisible size={20} /> : <AiFillEye size={20} />}
              </div>
            </div>

            <div className="relative">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                Konfirmasi Password
              </label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5C7D5B] focus:border-transparent transition-colors"
                placeholder="Konfirmasi password Anda"
              />
              <div
                className="absolute top-[38px] right-4 cursor-pointer text-gray-500"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <AiFillEyeInvisible size={20} /> : <AiFillEye size={20} />}
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
