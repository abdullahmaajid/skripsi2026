"use client"

import { useEffect } from "react"
import { signOut } from "next-auth/react"
import { Loader2 } from "lucide-react"

export default function LogoutPage() {
  useEffect(() => {
    // Bersihkan state/localStorage yang berhubungan dengan sesi
    localStorage.removeItem("has_visited_learning_path")
    localStorage.removeItem("has_practiced")
    localStorage.removeItem("dashboard-guide-collapsed")
    
    // Proses logout dan arahkan ke homepage
    signOut({ callbackUrl: "/" })
  }, [])

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-slate-50">
      <Loader2 className="w-10 h-10 animate-spin text-[var(--accent)] mb-4" />
      <h2 className="text-xl font-semibold text-slate-700">Sedang mengeluarkan sesi...</h2>
      <p className="text-sm text-slate-500 mt-2">Mohon tunggu sebentar.</p>
    </div>
  )
}
