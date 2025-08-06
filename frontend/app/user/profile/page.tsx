"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import NavbarUtama from "../../../components/navigation/navbar_utama";
import Link from "next/link";


import { useEffect } from "react";

export default function ProfilePage() {
  const [form, setForm] = useState({
    email: "",
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  // Fetch user data on mount
  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (!token) {
      router.push("/auth/login");
      return;
    }
    fetch("http://localhost:8000/api/me", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => {
        if (data.email && data.username) {
          setForm({ email: data.email, username: data.username, password: "" });
        }
      });
  }, [router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    setError("");
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (!token) {
      setError("Not authenticated");
      setLoading(false);
      return;
    }
    try {
      const res = await fetch("http://localhost:8000/api/me", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          email: form.email,
          username: form.username,
          password: form.password,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Update failed");
      } else {
        setSuccess("Profile updated!");
      }
    } catch (err) {
      setError("Gagal terhubung ke server");
    }
    setLoading(false);
  };

  const handleDelete = async () => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (!token) {
      setError("Not authenticated");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8000/api/me", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok) {
        localStorage.removeItem("token");
        router.push("/auth/login");
      } else {
        setError("Delete failed");
      }
    } catch (err) {
      setError("Gagal terhubung ke server");
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#557C49] to-[#304529] font-sans">
      <NavbarUtama />
      <div className="flex items-center justify-center min-h-screen pt-16 px-4">
        <div className="relative w-full max-w-md bg-[#E8EFE0] p-10 rounded-2xl shadow-md text-center">
          {/* Back Arrow */}
          <button
            className="absolute left-6 top-6 text-2xl text-[#304529] hover:text-[#5C7D5B]"
            onClick={() => router.back()}
            aria-label="Back"
          >
            &#8592;
          </button>
          <h1 className="text-4xl font-bold text-[#304529] mb-4 mt-2">Profile</h1>
          <div className="flex justify-center mb-6">
            <div className="rounded-full bg-[#E6F0E6] p-5 border-4 border-[#304529]">
              <svg width="64" height="64" fill="none" stroke="#304529" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="mx-auto">
                <circle cx="32" cy="24" r="16" />
                <path d="M12 56a20 20 0 0 1 40 0" />
              </svg>
            </div>
          </div>
          <form onSubmit={handleUpdate} className="space-y-5">
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-[#5C7D5B] focus:border-transparent"
              placeholder="Email"
              required
            />
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-[#5C7D5B] focus:border-transparent"
              placeholder="Username"
              required
            />
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-[#5C7D5B] focus:border-transparent"
              placeholder="********************"
              required
            />
            <button
              type="submit"
              className="w-full bg-[#304529] text-white py-3 rounded-lg font-semibold hover:bg-[#5C7D5B] transition"
              disabled={loading}
            >
              Update
            </button>
          </form>
          {success && <div className="mt-4 text-green-700">{success}</div>}
          {error && <div className="mt-4 text-red-600">{error}</div>}
        </div>
      </div>
    </main>
  );
}
