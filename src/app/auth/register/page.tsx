"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import AuthLayout from "@/components/layout/AuthLayout"

export default function RegisterPage() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPw, setConfirmPw] = useState("")
  const [showPw, setShowPw] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (password !== confirmPw) {
      setError("Password tidak cocok.")
      return
    }
    if (password.length < 6) {
      setError("Password minimal 6 karakter.")
      return
    }

    setLoading(true)

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || "Pendaftaran gagal.")
        return
      }

      router.push("/auth/login?registered=true")
    } catch {
      setError("Terjadi kesalahan. Coba lagi.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout title="Buat Akun untuk Memulai">
      <div className="mb-8 text-center lg:text-left">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Daftar Akun Baru</h2>
        <p className="text-slate-500 text-sm font-medium">Buat akun gratismu untuk mulai latihan UTBK.</p>
      </div>

      <form onSubmit={handleRegister} className="space-y-5">
        {error && (
          <div className="p-3 rounded-xl bg-rose-50 border border-rose-100 text-rose-600 text-sm font-medium">
            {error}
          </div>
        )}

        <div className="space-y-1.5">
          <label className="text-sm font-bold text-slate-700">Nama Lengkap</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Budi Santoso"
            required
            className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent outline-none text-sm text-slate-800 transition-all placeholder:text-slate-400 font-medium"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-bold text-slate-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="nama@email.com"
            required
            className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent outline-none text-sm text-slate-800 transition-all placeholder:text-slate-400 font-medium"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-bold text-slate-700">Password</label>
          <div className="relative">
            <input
              type={showPw ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Minimal 6 karakter"
              required
              className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent outline-none text-sm text-slate-800 transition-all pr-12 placeholder:text-slate-400 font-medium"
            />
            <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
              {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-bold text-slate-700">Konfirmasi Password</label>
          <input
            type="password"
            value={confirmPw}
            onChange={(e) => setConfirmPw(e.target.value)}
            placeholder="Ulangi password"
            required
            className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent outline-none text-sm text-slate-800 transition-all placeholder:text-slate-400 font-medium"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3.5 bg-[var(--accent)] hover:bg-[var(--accent-hover)] disabled:opacity-70 text-white font-bold rounded-xl transition-all shadow-[0_4px_12px_rgba(193,119,249,0.25)] mt-4 flex items-center justify-center gap-2"
        >
          {loading && <Loader2 className="w-4 h-4 animate-spin" />}
          {loading ? "Memproses..." : "Daftar Sekarang"}
        </button>

        <p className="text-center lg:text-left text-slate-500 text-sm font-medium pt-4">
          Sudah punya akun?{" "}
          <button type="button" onClick={() => router.push("/auth/login")} className="text-[var(--accent)] hover:text-[var(--accent-dark)] font-bold transition-colors">
            Masuk
          </button>
        </p>
      </form>
    </AuthLayout>
  )
}
