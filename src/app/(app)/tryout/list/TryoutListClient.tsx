"use client"

import { useRouter } from "next/navigation"
import { Clock, FileText, Sparkles, ArrowRight, BookOpen, CheckCircle2, ArrowLeft, Info, Target, Zap } from "lucide-react"
import { motion } from "framer-motion"

import { useCbtStore } from "@/store/useCbtStore"

interface Template {
  id: string; name: string; description: string; duration: number; totalItems: number
  cluster: string; isAdaptive: boolean; attempts: number; isCompleted?: boolean; bestScore?: number
}

const clusterColors: Record<string, string> = {
  SAINTEK: "bg-sky-50 text-sky-600 border-sky-200",
  SOSHUM: "bg-amber-50 text-amber-600 border-amber-200",
  CAMPURAN: "bg-purple-50 text-purple-600 border-purple-200",
}

export default function TryoutListClient({ templates }: { templates: Template[] }) {
  const router = useRouter()

  const handleStart = (id: string) => {
    useCbtStore.getState().resetExam()
    router.push(`/tryout/${id}`)
  }

  return (
    <div className="h-full flex flex-col p-6 md:p-8 overflow-y-auto no-scrollbar relative w-full">
      <div className="max-w-5xl mx-auto w-full">
        {/* 1. Header & Big Banner */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-slate-800">Paket Try Out</h1>
            <p className="text-slate-500 mt-2 text-sm">Pilih paket simulasi untuk mengukur kemampuan UTBK-mu.</p>
          </div>

          <div className="bg-gradient-to-br from-[var(--pastel-purple)] to-white border border-[var(--accent)]/20 rounded-3xl p-6 md:p-8 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none">
              <FileText className="w-48 h-48" />
            </div>
            
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[var(--accent)]/10 text-[var(--accent-dark)] text-xs font-bold rounded-full uppercase tracking-wider mb-3">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Ujian Simulasi
                </span>
                <h2 className="text-xl md:text-2xl font-bold text-slate-800">
                  Uji Kemampuanmu
                </h2>
                <p className="text-slate-500 font-medium mt-1">Tryout ini menggunakan standar soal dan <strong className="text-slate-700">sistem penilaian IRT</strong> asli.</p>
              </div>
              
              <div className="flex gap-4">
                <div className="bg-white/60 border border-white/40 p-4 rounded-2xl text-center min-w-[120px]">
                  <p className="text-[10px] uppercase font-bold text-slate-500 mb-1">Total Paket</p>
                  <p className="text-2xl font-black text-slate-800">{templates.length}</p>
                </div>
              </div>
            </div>

            <div className="mt-6 bg-white/60 rounded-2xl p-4 md:p-5 border border-[var(--accent)]/10">
              <div className="flex items-start gap-3">
                <div className="shrink-0 mt-0.5">
                  <Info className="w-5 h-5 text-[var(--accent)]" />
                </div>
                <div className="text-slate-600 space-y-1 text-sm leading-relaxed">
                  <strong className="text-slate-800 block mb-1">Persiapan Penting</strong>
                  <p>Pastikan kamu memiliki waktu yang cukup dan koneksi internet yang stabil sebelum memulai tryout. Hasil ujian akan dihitung secara otomatis saat waktu habis.</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {templates.map((t, i) => {
            const isCompleted = t.isCompleted;
            const cardHover = isCompleted ? "hover:border-emerald-300" : "hover:border-[var(--accent)]/40";
            const iconBg = isCompleted ? "bg-emerald-50 text-emerald-600" : "bg-[var(--pastel-purple)] text-[var(--accent)]";
            const btnText = isCompleted ? "text-emerald-600 group-hover:text-emerald-700" : "text-slate-500 group-hover:text-[var(--accent)]";
            const btnIconBg = isCompleted ? "bg-emerald-50 group-hover:bg-emerald-500" : "bg-slate-50 group-hover:bg-[var(--accent)]";

            return (
              <motion.button
                key={t.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => handleStart(t.id)}
                className={`group relative flex flex-col text-left bg-white rounded-3xl p-5 md:p-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-slate-100 ${cardHover} transition-all hover:shadow-md`}
              >
                <div className="flex items-start justify-between mb-5 w-full">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${iconBg}`}>
                    {t.isAdaptive ? <Sparkles className="w-6 h-6" /> : <FileText className="w-6 h-6" />}
                  </div>
                  <div className="flex flex-col items-end gap-1.5">
                    <span className={`text-[9px] font-bold tracking-wider px-2 py-1 rounded-md uppercase ${clusterColors[t.cluster] || clusterColors.CAMPURAN}`}>
                      {t.cluster}
                    </span>
                    {isCompleted && t.bestScore !== undefined && (
                      <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-md flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Skor: {Math.round(t.bestScore)}
                      </span>
                    )}
                  </div>
                </div>

                <div className="mb-4">
                  <h3 className="font-bold text-slate-800 text-[16px] md:text-lg mb-1.5 group-hover:text-[var(--accent)] transition-colors pr-2 leading-snug">
                    {t.name}
                  </h3>
                  {t.isAdaptive && (
                    <span className="inline-block text-[10px] font-bold bg-[var(--accent)]/10 text-[var(--accent-dark)] px-2 py-0.5 rounded-md mb-2">
                      ⚡ Ujian Adaptif
                    </span>
                  )}
                  <p className="text-xs font-medium text-slate-500 line-clamp-2 leading-relaxed" title={t.description}>
                    {t.description || "Paket simulasi UTBK-SNBT."}
                  </p>
                </div>

                <div className="flex items-center gap-4 text-xs font-bold text-slate-400 mb-6 mt-auto">
                  <span className="flex items-center gap-1.5 bg-slate-50 px-2 py-1 rounded-md"><Clock className="w-3.5 h-3.5" /> {t.duration} menit</span>
                  <span className="flex items-center gap-1.5 bg-slate-50 px-2 py-1 rounded-md"><Target className="w-3.5 h-3.5" /> {t.totalItems} soal</span>
                </div>

                <div className="flex items-center justify-between w-full pt-4 border-t border-slate-50">
                  <span className={`text-[11px] font-bold transition-colors uppercase tracking-wider ${btnText}`}>
                    {isCompleted ? "Ulangi Latihan" : "Mulai Ujian"}
                  </span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors shrink-0 ${btnIconBg}`}>
                     <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
                  </div>
                </div>
              </motion.button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
