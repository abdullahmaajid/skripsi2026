"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, FileText, Map, Activity, Menu } from "lucide-react"

const MOBILE_NAV_ITEMS = [
  { name: "Home", href: "/dashboard", icon: Home },
  { name: "Belajar", href: "/learning-path", icon: Map },
  { name: "Try Out", href: "/tryout/list", icon: FileText },
  { name: "Rapor", href: "/analytics", icon: Activity },
]

export default function MobileNavbar({ onMenuClick }: { onMenuClick: () => void }) {
  const pathname = usePathname()
  
  // Hide bottom navbar on tryout session so they can focus on test
  const isTryoutSession = pathname?.startsWith("/tryout/") && pathname !== "/tryout/list" && !pathname?.includes("/review")
  if (isTryoutSession) return null

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 px-6 py-3 pb-[calc(12px+env(safe-area-inset-bottom))] flex items-center justify-between z-[40] shadow-[0_-10px_40px_rgba(0,0,0,0.04)]">
      {MOBILE_NAV_ITEMS.map((item) => {
        const isActive = pathname?.startsWith(item.href)
        return (
          <Link key={item.name} href={item.href} className={`flex flex-col items-center gap-1 transition-colors ${isActive ? 'text-[var(--accent)]' : 'text-slate-400 hover:text-slate-600'}`}>
            <div className={`p-1.5 rounded-xl ${isActive ? 'bg-[var(--accent)]/10 text-[var(--accent)]' : ''}`}>
              <item.icon className="w-5 h-5 stroke-[2]" />
            </div>
            <span className="text-[10px] font-bold tracking-wide">{item.name}</span>
          </Link>
        )
      })}
      
      <button onClick={onMenuClick} className="flex flex-col items-center gap-1 text-slate-400 hover:text-slate-600 transition-colors">
        <div className="p-1.5 rounded-xl">
          <Menu className="w-5 h-5 stroke-[2]" />
        </div>
        <span className="text-[10px] font-bold tracking-wide">Menu</span>
      </button>
    </div>
  )
}
