"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, FileText, Map, Bot, Activity, Users, Crown, BarChart2 } from "lucide-react"

const STUDENT_MOBILE_NAV_ITEMS = [
  { name: "Home", href: "/dashboard", icon: Home },
  { name: "Belajar", href: "/learning-path", icon: Map },
  { name: "Try Out", href: "/tryout/list", icon: FileText },
  { name: "Rapor", href: "/analytics", icon: Activity },
  { name: "Bahas Soal", href: "/tutor", icon: Bot },
]

const ADMIN_MOBILE_NAV_ITEMS = [
  { name: "Admin", href: "/admin", icon: Crown },
  { name: "Users", href: "/admin/users", icon: Users },
  { name: "Soal", href: "/admin/questions", icon: FileText },
  { name: "Tryouts", href: "/admin/tryouts", icon: BarChart2 },
  { name: "Stats", href: "/admin/stats", icon: Activity },
]

export default function MobileNavbar() {
  const pathname = usePathname()
  
  const isAdminRoute = pathname?.startsWith("/admin")
  const NAV_ITEMS = isAdminRoute ? ADMIN_MOBILE_NAV_ITEMS : STUDENT_MOBILE_NAV_ITEMS

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 px-4 py-3 pb-[calc(12px+env(safe-area-inset-bottom))] flex items-center justify-between z-[40] shadow-[0_-10px_40px_rgba(0,0,0,0.04)]">
      {NAV_ITEMS.map((item) => {
        // For admin dashboard (/admin), exact match is better so it doesn't stay highlighted on /admin/users
        const isActive = item.href === "/admin" 
          ? pathname === "/admin" 
          : pathname?.startsWith(item.href)
          
        return (
          <Link key={item.name} href={item.href} className={`flex flex-col items-center gap-1.5 transition-colors ${isActive ? 'text-[var(--accent)]' : 'text-slate-400 hover:text-slate-600'}`}>
            <div className={`p-3 rounded-3xl transition-colors ${isActive ? 'bg-[var(--accent)]/15 text-[var(--accent)]' : ''}`}>
              <item.icon className="w-6 h-6 stroke-[2]" />
            </div>
            {/* Optional: label <span className="text-[10px] font-medium">{item.name}</span> */}
          </Link>
        )
      })}
    </nav>
  )
}
