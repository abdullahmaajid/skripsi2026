"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOut } from "next-auth/react"
import { motion, Variants } from "framer-motion"
import { useState, useEffect } from "react"
import { 
  Home, FileText, BarChart2, TrendingUp, Target, Bot, Settings, 
  GraduationCap, LogOut, Sparkles, Activity, Map, Heart, Crown, User, BookOpen, MessageCircle
} from "lucide-react"

const NAV_GROUPS = [
  {
    title: "BELAJAR & LATIHAN",
    items: [
      { name: "Dashboard", href: "/dashboard", icon: Home },
      { name: "Learning Path", href: "/learning-path", icon: Map },
      { name: "Practice", href: "/practice", icon: BookOpen },
      { name: "Tryout", href: "/tryout/list", icon: FileText },
    ]
  },
  {
    title: "ANALITIK & EVALUASI",
    items: [
      { name: "Rapor & Evaluasi", href: "/analytics", icon: Activity },
    ]
  },
  {
    title: "BANTUAN AI",
    items: [
      { name: "Ruang Tutor AI", href: "/tutor", icon: Bot },
    ]
  },
  {
    title: "SISTEM",
    items: [
      { name: "Pengaturan", href: "/settings", icon: Settings },
    ]
  }
]

const ADMIN_GROUPS = [
  {
    title: "ADMIN UTAMA",
    items: [
      { name: "Panel Admin", href: "/admin", icon: Crown },

    ]
  },
  {
    title: "KELOLA DATA",
    items: [
      { name: "Kelola Pengguna", href: "/admin/users", icon: User },
      { name: "Kelola Soal", href: "/admin/questions", icon: FileText },
      { name: "Kelola PTN/Prodi", href: "/admin/scraper", icon: Map },
      { name: "Kelola Tryout", href: "/admin/tryouts", icon: BarChart2 },
    ]
  },
  {
    title: "LAPORAN",
    items: [
      { name: "Statistik", href: "/admin/stats", icon: BarChart2 },
    ]
  },
  {
    title: "SISTEM",
    items: [
      { name: "Pengaturan", href: "/admin/settings", icon: Settings },
    ]
  }
];

const stagger: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } } }
const fadeRight: Variants = { hidden: { opacity: 0, x: -15 }, show: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } } }

export default function Sidebar({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname()
  const [isAdmin, setIsAdmin] = useState(false);
const [profile, setProfile] = useState<{name:string; role:string; avatar?:string}>({name:"", role:""});

  useEffect(() => {
    fetch("/api/profile", { cache: "no-store" })
      .then(r => r.json())
      .then(d => {
        if (d?.user?.role === "ADMIN") {
          setIsAdmin(true);
        }
        // Set profile info for display
        setProfile({
          name: d?.user?.name || "",
          role: d?.user?.role || "",
          avatar: d?.user?.avatar || ""
        });
      })
      .catch(() => {})
  }, [])

  const groups = isAdmin ? ADMIN_GROUPS : [...NAV_GROUPS];

  return (
    <aside className="w-full lg:w-64 h-full shrink-0 bg-white shadow-[0_4px_24px_rgba(0,0,0,0.02)] rounded-[2rem] flex flex-col hidden lg:flex overflow-hidden">
      {/* Brand */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="p-6 border-b border-slate-900/5 flex items-center justify-between z-10 relative">
        <Link href="/admin" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-xl bg-[var(--accent)]/10 text-[var(--accent-dark)] flex items-center justify-center group-hover:scale-105 transition-transform">
            <GraduationCap className="w-4 h-4" />
          </div>
          <div>
            <h1 className="text-sm font-semibold tracking-tight text-slate-800">{isAdmin ? "Admin" : "Lexica"}</h1>
            <p className="text-[9px] text-slate-400 font-medium">{isAdmin ? "Panel Administrasi" : "Latihan Soal UTBK Cerdas"}</p>
          </div>
        </Link>
        {onClose && (
          <button onClick={onClose} className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-50 transition-colors" title="Hide Sidebar">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><path d="M9 3v18"/><path d="m16 15-3-3 3-3"/></svg>
          </button>
        )}
      </motion.div>

      {/* Navigation */}
      <motion.nav variants={stagger} initial="hidden" animate="show" className="flex-1 overflow-y-auto pt-4 pb-0 px-4 space-y-5 no-scrollbar">
        {groups.map((group) => (
          <div key={group.title} className="space-y-1">
            <h2 className="px-4 text-[10px] font-bold text-slate-400 mb-2 tracking-wider">{group.title}</h2>
            {group.items.map((item) => {
              const isActive = pathname === item.href
              return (
                <motion.div variants={fadeRight} key={item.name}>
                  <Link
                    href={item.href}
                    className={`flex items-center gap-3.5 px-4 py-2.5 rounded-2xl transition-all group font-medium ${
                      isActive
                        ? "bg-[var(--pastel-purple)] text-[var(--accent-dark)] shadow-[0_2px_10px_rgba(193,119,249,0.1)]"
                        : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                  >
                    <div className={`transition-transform duration-300 ${isActive ? "scale-110" : "group-hover:scale-110"}`}>
                      <item.icon className="w-4 h-4" />
                    </div>
                    <span className="text-sm">{item.name}</span>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        ))}

        {/* Developer Contact Card */}
        <motion.div variants={fadeRight} className="mb-4 p-3.5 rounded-2xl bg-[var(--pastel-purple)]/50 border border-purple-100/50">
          <div className="flex items-center gap-3 mb-1.5">
            <div className="w-7 h-7 rounded-xl bg-purple-500/10 text-purple-600 flex items-center justify-center">
              <MessageCircle className="w-3.5 h-3.5" />
            </div>
            <h3 className="text-[11px] font-bold text-slate-800">Bantuan Developer</h3>
          </div>
          <p className="text-[9px] text-slate-500 mb-2.5 leading-snug">
            Sampaikan kendala, pertanyaan, atau masukan untuk pengembangan sistem.
          </p>
          <a
            href="https://wa.me/6281259890076"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-2 bg-[var(--accent)] hover:bg-[#5b2bd5] text-white rounded-xl text-xs font-semibold shadow-sm shadow-[var(--accent)]/20 transition-all hover:scale-[1.02]"
          >
            WhatsApp Developer
          </a>
        </motion.div>
      </motion.nav>

      {/* Footer */}
      <div className="p-6 border-t border-slate-900/5 mt-auto relative z-10 bg-white">
        <div className="flex items-center gap-2.5">
          {profile.avatar ? (
            <img src={profile.avatar} alt="avatar" className="w-8 h-8 rounded-xl object-cover shrink-0" />
          ) : (
            <div className="w-8 h-8 rounded-xl bg-[var(--accent)]/10 flex items-center justify-center shrink-0">
              <span className="text-xs font-bold text-[var(--accent-dark)]">
                {profile.name ? profile.name.substring(0, 2).toUpperCase() : (isAdmin ? "AD" : "US")}
              </span>
            </div>
          )}
          <div className="flex flex-col min-w-0 flex-1">
            <span className="text-sm font-semibold tracking-tight text-slate-800 truncate">{profile.name || (isAdmin ? "Admin Utama" : "Siswa")}</span>
            <span className="text-[9px] text-slate-400 font-medium truncate">{profile.role}</span>
          </div>
          <button onClick={() => {
              // Clean journey-related localStorage to prevent cross-session contamination
              localStorage.removeItem("has_visited_learning_path")
              localStorage.removeItem("has_practiced")
              localStorage.removeItem("dashboard-guide-collapsed")
              signOut({ callbackUrl: "/" })
            }} className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors group" title="Keluar">
            <LogOut className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </aside>
  )
}
