"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {

    
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const res = await fetch("http://localhost:8000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      console.log(data);
      if (!res.ok) {
        setError(data.message || Object.values(data.errors || {}).join(", "));
      } else {
        setSuccess("Registrasi berhasil! Mengarahkan ke halaman login...");
        setTimeout(() => router.push("/auth/login"), 1200);
      }
    } catch (err) {
      setError("Gagal terhubung ke server");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8F9F6]">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-[#3C4F3A]">Register</h2>
        {error && <div className="mb-4 text-red-600 text-sm">{error}</div>}
        {success && <div className="mb-4 text-green-600 text-sm">{success}</div>}
        <div className="mb-4">
          <label className="block mb-1 text-[#3C4F3A]">Username</label>
          <input type="text" name="username" value={form.username} onChange={handleChange} required className="w-full border rounded px-3 py-2" />
        </div>
        <div className="mb-4">
          <label className="block mb-1 text-[#3C4F3A]">Email</label>
          <input type="email" name="email" value={form.email} onChange={handleChange} required className="w-full border rounded px-3 py-2" />
        </div>
        <div className="mb-6">
          <label className="block mb-1 text-[#3C4F3A]">Password</label>
          <input type="password" name="password" value={form.password} onChange={handleChange} required className="w-full border rounded px-3 py-2" />
        </div>
        <button type="submit" disabled={loading} className="w-full bg-[#3C4F3A] text-white py-2 rounded font-semibold hover:bg-[#2e4a1f] transition">
          {loading ? "Mendaftar..." : "Daftar"}
        </button>
        <div className="mt-4 text-center text-sm">
          Sudah punya akun? <Link href="/auth/login" className="text-[#3C4F3A] underline">Login</Link>
        </div>
      </form>
    </div>
  );
}
