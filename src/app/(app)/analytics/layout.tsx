"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart2, Activity, Target } from "lucide-react"

const tabs = [
  { name: "Rapor & Tren", href: "/analytics/radar", icon: BarChart2 },
  { name: "Evaluasi Soal", href: "/analytics/evaluation", icon: Activity },
  { name: "Peluang Lulus", href: "/analytics/chancing", icon: Target },
]

export default function AnalyticsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="h-full flex flex-col p-6 md:p-8 overflow-y-auto overflow-x-hidden no-scrollbar relative w-full">
      <div className="max-w-5xl mx-auto w-full flex flex-col space-y-6">
        
        {/* Header & Tabs Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Analitik & Evaluasi</h1>
            <p className="text-slate-500 mt-2 text-sm max-w-xl">
              Pantau perkembangan belajarmu, evaluasi kesalahan, dan lihat peluang lolos ke jurusan impian.
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex items-center gap-1 p-1 bg-slate-100/80 rounded-xl border border-slate-200/50 shrink-0 overflow-x-auto no-scrollbar">
            {tabs.map((tab) => {
              const isActive = pathname === tab.href || pathname.startsWith(`${tab.href}/`)
              return (
                <Link
                  key={tab.name}
                  href={tab.href}
                  className={`flex items-center justify-center gap-2 px-3 py-2 rounded-lg font-semibold text-xs md:text-sm whitespace-nowrap transition-all duration-300 ${
                    isActive 
                      ? "bg-white text-[var(--accent-dark)] shadow-[0_2px_10px_rgba(0,0,0,0.06)]" 
                      : "text-slate-500 hover:text-slate-700 hover:bg-slate-200/50"
                  }`}
                >
                  <tab.icon className={`w-4 h-4 ${isActive ? "text-[var(--accent)]" : ""}`} />
                  {tab.name}
                </Link>
              )
            })}
          </div>
        </div>

        {/* Banner Section */}
        <div className="bg-gradient-to-br from-[var(--pastel-blue)] to-white border border-blue-500/20 rounded-3xl p-6 md:p-8 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none">
            <BarChart2 className="w-48 h-48" />
          </div>
          
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-600 text-xs font-bold rounded-full uppercase tracking-wider mb-3">
                <Activity className="w-3.5 h-3.5" /> Pusat Data
              </span>
              <h2 className="text-xl md:text-2xl font-bold text-slate-800">
                Rapor Belajarmu
              </h2>
              <p className="text-slate-500 font-medium mt-1 text-sm md:text-base">Sistem AI memproses riwayat latihanmu untuk menghitung <strong className="text-slate-700">prediksi kelulusan PTN</strong>.</p>
            </div>

            <div className="flex gap-4">
              <div className="bg-white/60 border border-white/40 p-4 rounded-2xl text-center min-w-[120px] shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
                <p className="text-[10px] uppercase font-bold text-slate-500 mb-1">Status AI</p>
                <p className="text-2xl font-black text-emerald-600">Aktif</p>
              </div>
            </div>
          </div>

          <div className="mt-6 bg-white/60 rounded-2xl p-4 md:p-5 border border-blue-500/10">
            <div className="flex items-start gap-3">
              <div className="shrink-0 mt-0.5">
                <BarChart2 className="w-5 h-5 text-blue-500" />
              </div>
              <div className="text-slate-600 space-y-1 text-sm leading-relaxed">
                <strong className="text-slate-800 block mb-1">Info Pemrosesan Data</strong>
                <p>Nilai tryout-mu diproses menggunakan algoritma <strong className="font-semibold text-slate-800">Item Response Theory (IRT)</strong> standar SNPMB. Selesaikan lebih banyak ujian untuk meningkatkan akurasi grafik dan prediksi kelulusan jurusan.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="bg-white rounded-2xl md:rounded-3xl p-3 md:p-6 shadow-[0_4px_24px_rgba(0,0,0,0.02)] border border-slate-100 overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  )
}
