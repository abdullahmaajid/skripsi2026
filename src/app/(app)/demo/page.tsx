"use client"

import { useRouter } from "next/navigation"
import { BookOpen, Target, Sparkles, ArrowRight, Brain, FileText } from "lucide-react"
import { motion } from "framer-motion"

export default function DemoPage() {
  const router = useRouter()

  return (
    <div className="h-full flex flex-col p-6 md:p-8 overflow-y-auto no-scrollbar relative w-full">
      <div className="max-w-4xl mx-auto w-full">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10 text-center">
          <h1 className="text-3xl font-bold text-slate-800 mb-4">Pilih Mode Demo</h1>
          <p className="text-slate-500 text-sm md:text-base max-w-2xl mx-auto">
            Rasakan pengalaman belajar adaptif dengan AI Tutor atau uji kemampuanmu dengan simulasi ujian berstandar UTBK asli.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card Mode Belajar */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            onClick={() => router.push("/practice")}
            className="group relative flex flex-col text-left bg-white rounded-3xl p-8 border-2 border-[var(--pastel-purple)] shadow-sm hover:border-[var(--accent)] hover:shadow-xl hover:-translate-y-1 transition-all overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-10 transition-opacity">
              <Brain className="w-48 h-48 text-[var(--accent)]" />
            </div>

            <div className="relative z-10 flex flex-col h-full">
              <div className="w-16 h-16 rounded-2xl bg-[var(--pastel-purple)] text-[var(--accent)] flex items-center justify-center mb-6">
                <Sparkles className="w-8 h-8" />
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold text-slate-800 mb-3 group-hover:text-[var(--accent)] transition-colors">
                  Mode Belajar
                </h2>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[var(--accent)]/10 text-[var(--accent-dark)] text-xs font-bold rounded-full uppercase tracking-wider">
                    Dengan AI Tutor
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100 text-amber-700 text-xs font-bold rounded-full uppercase tracking-wider">
                    🔒 Wajib Login
                  </span>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Latihan soal per-subtes dengan bimbingan Socratic AI. Saat kamu salah jawab, AI tidak akan memberikan kunci jawaban, melainkan memberikan petunjuk (hint) secara step-by-step.
                </p>
              </div>

              <div className="mt-auto flex items-center justify-between text-[var(--accent)] font-bold">
                Coba AI Tutor Sekarang
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </motion.button>

          {/* Card Mode Tryout */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            onClick={() => router.push("/tryout/list")}
            className="group relative flex flex-col text-left bg-white rounded-3xl p-8 border-2 border-slate-100 shadow-sm hover:border-slate-300 hover:shadow-xl hover:-translate-y-1 transition-all overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-8 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity">
              <FileText className="w-48 h-48 text-slate-800" />
            </div>

            <div className="relative z-10 flex flex-col h-full">
              <div className="w-16 h-16 rounded-2xl bg-slate-100 text-slate-600 flex items-center justify-center mb-6 group-hover:bg-slate-200 transition-colors">
                <Target className="w-8 h-8" />
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold text-slate-800 mb-3 group-hover:text-slate-900 transition-colors">
                  Mode Tryout
                </h2>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 text-slate-600 text-xs font-bold rounded-full uppercase tracking-wider mb-4">
                  Simulasi UTBK
                </span>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Uji kesiapanmu dengan simulasi tryout lengkap tanpa bantuan AI. Dapatkan skor akhir berdasarkan sistem penilaian IRT (Item Response Theory) dan ketahui peluang lolosmu.
                </p>
              </div>

              <div className="mt-auto flex items-center justify-between text-slate-700 font-bold">
                Mulai Ujian Simulasi
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </motion.button>
        </div>
      </div>
    </div>
  )
}
