"use client";

import { useState } from "react";
import Link from "next/link";
import NavbarUtama from "../../../components/navigation/navbar_utama";
import { FaRegUserCircle } from "react-icons/fa";
import { MdOutlineEmail,MdLockOutline } from "react-icons/md";
import { FiEye, FiEyeOff } from "react-icons/fi";



import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || Object.values(data.errors || {}).join(", "));
      } else {
        setSuccess("Login berhasil! Mengarahkan ke halaman utama...");
        if (data.token) localStorage.setItem("token", data.token);
        setTimeout(() => router.push("/"), 1200);
      }
    } catch (err) {
      setError("Gagal terhubung ke server");
    }
    setLoading(false);
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
            <div className="relative">
              <MdOutlineEmail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full pl-10 py-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-[#5C7D5B] focus:border-transparent transition-colors"
                placeholder="Email"
              />
            </div>

            <div className="relative">
              <MdLockOutline className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
              
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-[#5C7D5B] focus:border-transparent transition-colors"
                placeholder="Password"
              />

              <div
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FiEyeOff className="text-xl" /> : <FiEye className="text-xl" />}
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#5C7D5B] text-white py-3 px-4 rounded-lg font-medium hover:bg-[#4A6B4A] transition-colors duration-200"
            >
              Login
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
