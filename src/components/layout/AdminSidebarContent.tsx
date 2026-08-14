"use client"

import { useEffect, useState } from "react"
import { Users, HelpCircle, Layers, GraduationCap, Loader2, X, BookOpen, Bookmark, Building2, CheckCircle2, Shield } from "lucide-react"

export default function AdminSidebarContent({ onClose }: { onClose: () => void }) {
  const [stats, setStats] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  async function fetchStats() {
    setLoading(true)
    try {
      const res = await fetch("/api/admin/stats")
      const json = await res.json()
      setStats(json.data)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStats()
  }, [])

  return (
    <div className="h-full flex flex-col bg-white">
      <div className="flex justify-between items-center p-6 border-b border-slate-100 shrink-0">
        <h3 className="text-xl font-bold text-slate-800 tracking-tight">Statistik Sistem</h3>
        <div className="flex items-center gap-1">
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-colors" title="Tutup panel">
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto no-scrollbar p-6 space-y-6">
        {loading && !stats ? (
          <div className="flex justify-center py-10"><Loader2 className="w-6 h-6 animate-spin text-[var(--accent)]" /></div>
        ) : stats ? (
          <>
            <div className="grid grid-cols-2 gap-3">
              {/* Primary Metric - Siswa Aktif (Full width) */}
              <div className="col-span-2 bg-[var(--accent)] rounded-[1.5rem] p-5 text-white flex justify-between items-center relative overflow-hidden shadow-md shadow-[var(--accent)]/20">
                <div>
                  <h4 className="text-white/90 font-medium text-[10px] uppercase tracking-wider mb-1">Siswa Aktif Terdaftar</h4>
                  <span className="text-4xl font-black tracking-tighter">{stats.users.students.toLocaleString("id-ID")}</span>
                </div>
                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
              </div>

              {/* Bank Soal & Paket Tryout (1 column each, square) */}
              <div className="bg-white border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.05)] rounded-[1.5rem] p-4 flex flex-col justify-between aspect-square group hover:border-purple-100 transition-all duration-300">
                <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-purple-600 shadow-sm group-hover:scale-110 transition-transform">
                  <HelpCircle className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-3xl font-black text-slate-800 tracking-tight">{stats.curriculum.questions}</div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase mt-1">Total Soal</div>
                </div>
              </div>

              <div className="bg-white border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.05)] rounded-[1.5rem] p-4 flex flex-col justify-between aspect-square group hover:border-rose-100 transition-all duration-300">
                <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-rose-500 shadow-sm group-hover:scale-110 transition-transform">
                  <Layers className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-3xl font-black text-slate-800 tracking-tight">{stats.exams.tryouts}</div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase mt-1">Paket Tryout</div>
                </div>
              </div>

              {/* Kurikulum Details (Full width) */}
              <div className="col-span-2 bg-white border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.05)] rounded-[1.5rem] p-4 flex items-center justify-between transition-all duration-300 hover:border-blue-100 group">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-slate-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-50 transition-colors">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-[10px] font-bold text-slate-400 uppercase">Mapel / Bab Materi</span>
                    <span className="text-lg font-black text-slate-800">{stats.curriculum.subjects} <span className="text-slate-300 mx-1">/</span> {stats.curriculum.chapters}</span>
                  </div>
                </div>
              </div>

              {/* PTN & Jurusan (Full width) */}
              <div className="col-span-2 bg-white border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.05)] rounded-[1.5rem] p-4 flex items-center justify-between transition-all duration-300 hover:border-emerald-100 group">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-slate-50 text-emerald-600 flex items-center justify-center group-hover:bg-emerald-50 transition-colors">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-[10px] font-bold text-slate-400 uppercase">PTN / Program Studi</span>
                    <span className="text-lg font-black text-slate-800">{stats.ptn.universities} <span className="text-slate-300 mx-1">/</span> {stats.ptn.majors}</span>
                  </div>
                </div>
              </div>

              {/* Sesi Selesai & Admin Aktif (1 column each, square) */}
              <div className="bg-white border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.05)] rounded-[1.5rem] p-4 flex flex-col justify-between aspect-square group hover:border-emerald-100 transition-all duration-300">
                <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-emerald-500 shadow-sm group-hover:scale-110 transition-transform">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-3xl font-black text-slate-800 tracking-tight">{stats.exams.attempts}</div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase mt-1">Sesi Selesai</div>
                </div>
              </div>

              <div className="bg-indigo-50 border border-indigo-100 rounded-[1.5rem] p-4 flex flex-col justify-between aspect-square group">
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-indigo-500 shadow-sm group-hover:scale-110 transition-transform">
                  <Shield className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-3xl font-black text-indigo-900 tracking-tight">{stats.users.admins}</div>
                  <div className="text-[10px] font-bold text-indigo-400 uppercase mt-1">Admin Aktif</div>
                </div>
              </div>

            </div>
          </>
        ) : (
          <p className="text-sm text-slate-400 text-center py-10">Gagal memuat statistik.</p>
        )}
      </div>
    </div>
  )
}
