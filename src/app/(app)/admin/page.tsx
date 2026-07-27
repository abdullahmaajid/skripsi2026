"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { BookOpen, Users, GraduationCap, FileText, ArrowLeft, ChevronRight, Loader2, Settings, ShieldAlert, BarChart3, Layers } from "lucide-react"

interface StatsData {
  users: { students: number; admins: number; total: number }
  curriculum: { subjects: number; chapters: number; questions: number }
  ptn: { universities: number; majors: number }
  exams: { tryouts: number; attempts: number }
}

export default function AdminPage() {
  const router = useRouter()
  const [stats, setStats] = useState<StatsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    fetch("/api/admin/stats")
      .then(res => {
        if (!res.ok) throw new Error("Akses ditolak atau terjadi kesalahan.")
        return res.json()
      })
      .then(data => {
        setStats(data.data)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  const cards = stats ? [
    { 
      title: "Statistik Platform", 
      desc: "Ringkasan kondisi platform, metrik siswa, dan analitik ujian UTBK", 
      icon: <BarChart3 className="w-5 h-5 text-indigo-600" />, 
      bgColor: "var(--pastel-blue)", 
      href: "/admin/stats",
      statsText: "Lihat Analisis"
    },
    { 
      title: "Bank Soal & Kurikulum", 
      desc: "Kelola Mata Pelajaran, Bab, dan Bank Soal UTBK (LaTeX/Markdown)", 
      icon: <BookOpen className="w-5 h-5 text-purple-600" />, 
      bgColor: "var(--pastel-purple)", 
      href: "/admin/questions",
      statsText: `${stats.curriculum.subjects} Mapel · ${stats.curriculum.questions} Soal`
    },
    { 
      title: "Manajemen User", 
      desc: "Kelola akun siswa/admin, ubah role, dan atur kemampuan IRT (Theta)", 
      icon: <Users className="w-5 h-5 text-sky-600" />, 
      bgColor: "var(--pastel-blue)", 
      href: "/admin/users",
      statsText: `${stats.users.students} Siswa · ${stats.users.admins} Admin`
    },
    { 
      title: "Universitas & Jurusan", 
      desc: "Atur data universitas PTN, fakultas, daya tampung kuota, dan estimasi skor kelulusan", 
      icon: <GraduationCap className="w-5 h-5 text-emerald-600" />, 
      bgColor: "var(--pastel-green)", 
      href: "/admin/scraper",
      statsText: `${stats.ptn.universities} Universitas · ${stats.ptn.majors} Prodi`
    },
    { 
      title: "Manajemen Tryout", 
      desc: "Konfigurasi paket ujian Tryout SNBT linear beserta seksi subtes dan durasi waktu", 
      icon: <FileText className="w-5 h-5 text-rose-600" />, 
      bgColor: "var(--pastel-rose)", 
      href: "/admin/tryouts",
      statsText: `${stats.exams.tryouts} Paket · ${stats.exams.attempts} Partisipan`
    },
    { 
      title: "Pengaturan Sistem", 
      desc: "Konfigurasi parameter global untuk IRT scoring dan Try Out UTBK", 
      icon: <Settings className="w-5 h-5 text-slate-600" />, 
      bgColor: "var(--pastel-blue)", 
      href: "/admin/settings",
      statsText: "Sistem & Scoring"
    },
  ] : []

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] p-6 text-center">
        <ShieldAlert className="w-16 h-16 text-rose-500 mb-4" />
        <h3 className="text-xl font-bold text-slate-800">Akses Ditolak</h3>
        <p className="text-slate-500 max-w-sm mt-1">{error}</p>
        <button onClick={() => router.push("/dashboard")} className="mt-6 px-6 py-2.5 bg-slate-900 text-white font-medium rounded-full hover:bg-slate-800 transition-colors">
          Kembali ke Dashboard
        </button>
      </div>
    )
  }

  return (
    <div className="p-6 md:p-8 space-y-6 h-full overflow-y-auto no-scrollbar">
      {/* Top bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Panel Kontrol Admin</h1>
          <p className="text-sm text-slate-500 mt-1">Kelola seluruh konten, soal, user, dan konfigurasi ujian Lexica.</p>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <Loader2 className="w-8 h-8 text-[var(--accent)] animate-spin" />
          <p className="text-sm text-slate-400 mt-2 font-medium">Memuat data panel...</p>
        </div>
      ) : (
        <div className="space-y-10">
          {/* Quick Stats Grid - Asymmetric Bento Box */}
          <div>
            <h2 className="text-lg font-bold text-slate-700 mb-4">Statistik Sistem</h2>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
              {/* Primary Stat - Very Large */}
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="col-span-1 md:col-span-8 bg-indigo-500 rounded-3xl p-6 md:p-8 text-white relative overflow-hidden min-h-[200px] flex flex-col justify-between">
                <div className="relative z-10">
                  <h3 className="text-indigo-100 font-medium text-xs md:text-sm uppercase tracking-wider flex items-center gap-2"><Users className="w-5 h-5 text-indigo-300" /> Siswa Aktif Terdaftar</h3>
                  <p className="text-white/80 text-xs mt-2 max-w-sm leading-relaxed hidden sm:block">Total pengguna dengan role STUDENT di platform Lexica yang sedang mempersiapkan diri untuk UTBK SNBT.</p>
                </div>
                <div className="relative z-10 mt-6 flex items-baseline gap-2">
                  <span className="text-6xl md:text-7xl font-black tracking-tighter">{stats?.users.students.toLocaleString("id-ID") || 0}</span>
                  <span className="text-indigo-200 font-bold text-lg md:text-xl">Siswa</span>
                </div>
              </motion.div>
              
              {/* Secondary Stat - Question Bank */}
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.05 }} className="col-span-1 md:col-span-4 bg-white border border-slate-100 rounded-3xl p-6 md:p-8 min-h-[200px] flex flex-col justify-between group hover:border-purple-200 transition-colors">
                <div>
                  <h3 className="text-slate-500 font-bold text-xs uppercase tracking-wider flex items-center gap-2"><BookOpen className="w-4 h-4 text-purple-500" /> Bank Soal UTBK</h3>
                </div>
                <div className="mt-6 flex flex-col gap-1">
                  <span className="text-5xl md:text-6xl font-black text-slate-800 tracking-tight group-hover:text-purple-600 transition-colors">{stats?.curriculum.questions.toLocaleString("id-ID") || 0}</span>
                  <span className="text-slate-400 font-semibold text-sm">Total Soal Evaluasi</span>
                </div>
              </motion.div>

              {/* Sub Stats - Asymmetric Row */}
              <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="col-span-1 md:col-span-4 bg-white border border-slate-100 rounded-3xl p-5 hover:border-blue-200 transition-colors">
                <h3 className="text-slate-400 font-bold text-[10px] uppercase tracking-wider flex items-center gap-2 mb-4"><Layers className="w-3.5 h-3.5 text-blue-500" /> Struktur Kurikulum</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-800 font-black text-2xl">{stats?.curriculum.subjects || 0}</p>
                    <p className="text-slate-500 text-xs font-semibold">Mata Pelajaran</p>
                  </div>
                  <div className="w-px h-8 bg-slate-100"></div>
                  <div className="text-right">
                    <p className="text-slate-800 font-black text-2xl">{stats?.curriculum.chapters || 0}</p>
                    <p className="text-slate-500 text-xs font-semibold">Bab Materi</p>
                  </div>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="col-span-1 md:col-span-4 bg-white border border-slate-100 rounded-3xl p-5 hover:border-emerald-200 transition-colors">
                <h3 className="text-slate-400 font-bold text-[10px] uppercase tracking-wider flex items-center gap-2 mb-4"><GraduationCap className="w-3.5 h-3.5 text-emerald-500" /> Universitas & Jurusan</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-800 font-black text-2xl">{stats?.ptn.universities || 0}</p>
                    <p className="text-slate-500 text-xs font-semibold">Universitas PTN</p>
                  </div>
                  <div className="w-px h-8 bg-slate-100"></div>
                  <div className="text-right">
                    <p className="text-slate-800 font-black text-2xl">{stats?.ptn.majors || 0}</p>
                    <p className="text-slate-500 text-xs font-semibold">Program Studi</p>
                  </div>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="col-span-1 md:col-span-4 bg-rose-50 border border-rose-100/50 rounded-3xl p-5 flex flex-col justify-between hover:border-rose-200 transition-colors">
                <h3 className="text-rose-500 font-bold text-[10px] uppercase tracking-wider flex items-center gap-2 mb-4"><FileText className="w-3.5 h-3.5" /> Simulasi Tryout</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-rose-600 font-black text-2xl">{stats?.exams.tryouts || 0}</p>
                    <p className="text-rose-500 text-xs font-semibold opacity-80">Paket Tersedia</p>
                  </div>
                  <div className="w-px h-8 bg-rose-200/50"></div>
                  <div className="text-right">
                    <p className="text-rose-600 font-black text-2xl">{stats?.exams.attempts || 0}</p>
                    <p className="text-rose-500 text-xs font-semibold opacity-80">Sesi Selesai</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Navigasi Control Panels */}
          <div>
            <h2 className="text-lg font-bold text-slate-700 mb-4">Pengaturan Sistem</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {cards.map((c, idx) => (
                <motion.button
                  key={c.href}
                  onClick={() => router.push(c.href)}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="bg-white border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.05)] rounded-3xl p-6 text-left transition-all duration-300 group flex items-start justify-between cursor-pointer"
                >
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-105" style={{ backgroundColor: c.bgColor }}>
                      {c.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-800 text-lg group-hover:text-[var(--accent-dark)] transition-colors">{c.title}</h3>
                      <p className="text-slate-400 text-sm mt-1 leading-relaxed">{c.desc}</p>
                      <span className="inline-block mt-3 bg-slate-50 border border-slate-100 text-slate-500 font-semibold text-[11px] px-2.5 py-1 rounded-full uppercase tracking-wider">
                        {c.statsText}
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-slate-600 group-hover:translate-x-1 transition-all self-center ml-2" />
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
