"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Loader2, Map, CheckCircle2, Rocket, ArrowRight, Target, Flame } from "lucide-react"

import AuthLayout from "@/components/layout/AuthLayout"

function OnboardingPlanContent() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Kita panggil API learning path untuk men-generate initial state-nya
    fetch("/api/learning-path")
      .then(res => res.json())
      .then(() => {
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-slate-500 gap-4">
        <Loader2 className="w-10 h-10 animate-spin text-[var(--accent)]" />
        <p className="font-medium animate-pulse">Menyusun rute belajarmu...</p>
      </div>
    )
  }

  return (
    <div className="w-full">
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center space-y-3 mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-[var(--accent)]/10 text-[var(--accent)] rounded-2xl mb-2">
          <Rocket className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Rencana Belajar Siap!</h1>
        <p className="text-slate-500 text-sm leading-relaxed max-w-sm mx-auto">
          Sistem telah menganalisis hasil tesmu dan menemukan area yang perlu ditingkatkan untuk mencapai target.
        </p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-slate-50 border border-slate-100 rounded-3xl p-6 space-y-6 shadow-sm mb-8 relative overflow-hidden">
        
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-[var(--pastel-purple)] rounded-full blur-3xl opacity-50 pointer-events-none translate-x-10 -translate-y-10" />

        <div className="relative">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
            <Target className="w-4 h-4 text-[var(--accent)]" /> 
            Strategi Lexica GPS
          </h2>
          
          <div className="space-y-3">
            <div className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-slate-200/60 shadow-sm">
              <div className="bg-emerald-50 text-emerald-500 p-2 rounded-xl shrink-0">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-800 text-sm mb-1">Fokus Tepat Sasaran</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Belajar hanya materi yang terbukti paling sering menjebakmu di try out, bukan dari awal.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-slate-200/60 shadow-sm">
              <div className="bg-rose-50 text-rose-500 p-2 rounded-xl shrink-0">
                <Flame className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-800 text-sm mb-1">Konsisten Sedikit demi Sedikit</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Selesaikan "Fokus Hari Ini" (1 topik spesifik) setiap hari tanpa terlewat.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-slate-200/60 shadow-sm">
              <div className="bg-blue-50 text-blue-500 p-2 rounded-xl shrink-0">
                <Map className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-800 text-sm mb-1">Peta Navigasi Terarah</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Pantau progresmu di Peta Belajar. Setiap kepingan hijau mendekatkanmu ke kampus impian.
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <button 
        onClick={() => router.push("/dashboard")} 
        className="w-full py-4 bg-[var(--accent)] hover:bg-[var(--accent-hover)] rounded-xl font-bold text-white shadow-[0_4px_15px_rgba(193,119,249,0.3)] transition-all flex items-center justify-center gap-2 group"
      >
        Mulai Belajar di Dashboard 
        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  )
}

export default function OnboardingPlanPage() {
  return (
    <AuthLayout title="Rencana Belajarmu">
      <OnboardingPlanContent />
    </AuthLayout>
  )
}
