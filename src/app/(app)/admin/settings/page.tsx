"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Settings, Save, ArrowLeft, Loader2, Target, Clock, BookOpen, AlertTriangle } from "lucide-react"

export default function AdminSettingsPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const [settings, setSettings] = useState({
    IRT_MEAN: "500",
    IRT_SD: "100",
    DEFAULT_TRYOUT_DURATION: "195",
    DEFAULT_TRYOUT_ITEMS: "155"
  })

  useEffect(() => {
    fetch("/api/admin/settings")
      .then(res => res.json())
      .then(data => {
        if (data.data) {
          setSettings(prev => ({ ...prev, ...data.data }))
        }
        setLoading(false)
      })
      .catch(err => {
        setError("Gagal memuat pengaturan.")
        setLoading(false)
      })
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSettings({ ...settings, [e.target.name]: e.target.value })
  }

  const handleSave = async () => {
    setSaving(true)
    setError("")
    setSuccess("")
    
    try {
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ settings })
      })
      
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Gagal menyimpan")
      
      setSuccess("Pengaturan berhasil disimpan!")
      setTimeout(() => setSuccess(""), 3000)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <Loader2 className="w-8 h-8 text-[var(--accent)] animate-spin" />
        <p className="text-sm text-slate-400 mt-2">Memuat pengaturan...</p>
      </div>
    )
  }

  return (
    <div className="p-6 md:p-8 space-y-6 h-full overflow-y-auto no-scrollbar">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
          <Settings className="w-8 h-8 text-[var(--accent)]" /> Pengaturan Sistem
        </h1>
        <p className="text-sm text-slate-500 mt-1">Konfigurasi parameter global untuk IRT scoring dan Try Out UTBK.</p>
      </div>

      {error && (
        <div className="bg-rose-50 text-rose-600 p-4 rounded-2xl flex items-center gap-3 border border-rose-100 text-sm font-medium">
          <AlertTriangle className="w-5 h-5 shrink-0" />
          <p>{error}</p>
        </div>
      )}

      {success && (
        <div className="bg-emerald-50 text-emerald-600 p-4 rounded-2xl flex items-center gap-3 border border-emerald-100 text-sm font-medium">
          <Target className="w-5 h-5 shrink-0" />
          <p>{success}</p>
        </div>
      )}

      <div className="space-y-6">
        {/* IRT Config Card */}
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.02)] border border-slate-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center">
              <Target className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-800">Scoring IRT (UTBK SNBT)</h2>
              <p className="text-sm text-slate-500">Parameter konversi skor Item Response Theory.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Mean (Rata-rata)</label>
              <input
                type="number"
                name="IRT_MEAN"
                value={settings.IRT_MEAN}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm font-medium rounded-xl px-4 py-3 outline-none focus:border-[var(--accent)] transition-colors"
                placeholder="500"
              />
              <p className="text-xs text-slate-400">Skor rata-rata nasional (Standar: 500)</p>
            </div>
            
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Standard Deviation</label>
              <input
                type="number"
                name="IRT_SD"
                value={settings.IRT_SD}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm font-medium rounded-xl px-4 py-3 outline-none focus:border-[var(--accent)] transition-colors"
                placeholder="100"
              />
              <p className="text-xs text-slate-400">Simpangan baku skor (Standar: 100)</p>
            </div>
          </div>
        </div>

        {/* Tryout Config Card */}
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.02)] border border-slate-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
              <Clock className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-800">Default Try Out</h2>
              <p className="text-sm text-slate-500">Nilai bawaan saat membuat paket Try Out baru.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Durasi Default (Menit)</label>
              <input
                type="number"
                name="DEFAULT_TRYOUT_DURATION"
                value={settings.DEFAULT_TRYOUT_DURATION}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm font-medium rounded-xl px-4 py-3 outline-none focus:border-[var(--accent)] transition-colors"
                placeholder="195"
              />
              <p className="text-xs text-slate-400">Standar UTBK 2024 adalah 195 menit.</p>
            </div>
            
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Soal Default</label>
              <input
                type="number"
                name="DEFAULT_TRYOUT_ITEMS"
                value={settings.DEFAULT_TRYOUT_ITEMS}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm font-medium rounded-xl px-4 py-3 outline-none focus:border-[var(--accent)] transition-colors"
                placeholder="155"
              />
              <p className="text-xs text-slate-400">Standar UTBK 2024 adalah 155 butir soal.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-6 py-3 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white font-bold rounded-xl shadow-[0_4px_12px_rgba(193,119,249,0.2)] transition-all flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
          Simpan Pengaturan
        </button>
      </div>
    </div>
  )
}
