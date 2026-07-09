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
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] p-6 md:p-10 font-sans h-full overflow-y-auto no-scrollbar">
      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* Header Section */}
        <div>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Analitik & Evaluasi</h1>
          <p className="text-sm text-slate-500 mt-1">
            Pantau perkembangan belajarmu, evaluasi kesalahan, dan lihat peluang lolos ke jurusan impian.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 p-1.5 bg-slate-100/80 rounded-2xl w-fit border border-slate-200/50">
          {tabs.map((tab) => {
            const isActive = pathname === tab.href || pathname.startsWith(`${tab.href}/`)
            return (
              <Link
                key={tab.name}
                href={tab.href}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 ${
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

        {/* Page Content */}
        <div className="bg-white rounded-3xl p-6 shadow-[0_4px_24px_rgba(0,0,0,0.02)] border border-slate-100">
          {children}
        </div>
      </div>
    </div>
  )
}
