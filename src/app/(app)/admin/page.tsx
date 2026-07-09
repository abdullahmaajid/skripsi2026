"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { BookOpen, Users, GraduationCap, FileText, ArrowLeft, ChevronRight, Loader2, Settings, ShieldAlert } from "lucide-react"

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
    <div className="p-6 md:p-8 space-y-8 max-w-5xl mx-auto h-full overflow-y-auto no-scrollbar">
      {/* Top bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <button onClick={() => router.push("/dashboard")} className="text-slate-400 hover:text-slate-600 text-xs font-bold uppercase tracking-wider mb-2 inline-flex items-center gap-1.5 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Dashboard
          </button>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
            <Settings className="w-8 h-8 text-[var(--accent)]" /> Panel Kontrol Admin
          </h1>
          <p className="text-sm text-slate-500 mt-1">Kelola seluruh konten, soal, user, dan konfigurasi ujian Lexica.</p>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <Loader2 className="w-8 h-8 text-[var(--accent)] animate-spin" />
          <p className="text-sm text-slate-400 mt-2 font-medium">Memuat data panel...</p>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            <StatCard label="Total Siswa" value={stats?.users.students || 0} icon={<Users className="w-4 h-4 text-sky-600" />} bgColor="var(--pastel-blue)" />
            <StatCard label="Total Soal" value={stats?.curriculum.questions || 0} icon={<BookOpen className="w-4 h-4 text-purple-600" />} bgColor="var(--pastel-purple)" />
            <StatCard label="Total Prodi" value={stats?.ptn.majors || 0} icon={<GraduationCap className="w-4 h-4 text-emerald-600" />} bgColor="var(--pastel-green)" />
            <StatCard label="Tryout Dikerjakan" value={stats?.exams.attempts || 0} icon={<FileText className="w-4 h-4 text-rose-600" />} bgColor="var(--pastel-rose)" />
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

function StatCard({ label, value, icon, bgColor }: { label: string; value: number; icon: React.ReactNode; bgColor: string }) {
  return (
    <div className="bg-white border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] rounded-3xl p-5 flex items-center gap-4">
      <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: bgColor }}>
        {icon}
      </div>
      <div>
        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{label}</p>
        <p className="text-2xl font-bold text-slate-800 tracking-tight mt-0.5">{value.toLocaleString("id-ID")}</p>
      </div>
    </div>
  )
}
