"use client"

import { useRouter } from "next/navigation"
import { Clock, FileText, Sparkles, ArrowRight, BookOpen } from "lucide-react"
import { motion } from "framer-motion"

import { useCbtStore } from "@/store/useCbtStore"

interface Template {
  id: string; name: string; description: string; duration: number; totalItems: number
  cluster: string; isAdaptive: boolean; attempts: number
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
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] p-6 md:p-10 font-sans">
      <div className="max-w-5xl mx-auto">
        <button onClick={() => router.push("/dashboard")} className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] text-sm mb-4 inline-block transition-colors">&larr; Dashboard</button>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Paket Try Out</h1>
        <p className="text-[var(--text-secondary)] mb-10">Pilih paket simulasi untuk mengukur kemampuan UTBK-mu.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {templates.map((t, i) => (
            <motion.div key={t.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
              className="bg-white border border-slate-100 hover:border-[var(--accent)]/30 rounded-2xl p-6 transition-all cursor-pointer shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] flex flex-col justify-between h-full"
              onClick={() => handleStart(t.id)}
            >
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[var(--pastel-purple)] flex items-center justify-center">
                      {t.isAdaptive ? <Sparkles className="w-5 h-5 text-[var(--accent)]" /> : <BookOpen className="w-5 h-5 text-[var(--accent)]" />}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-slate-800">{t.name}</h3>
                      <span className={`text-xs px-2 py-0.5 rounded-full border ${clusterColors[t.cluster] || clusterColors.CAMPURAN}`}>{t.cluster}</span>
                    </div>
                  </div>
                  {t.isAdaptive && <span className="text-xs bg-[var(--pastel-purple)] text-[var(--accent)] px-2.5 py-1 rounded-full border border-purple-200 font-medium">Adaptif</span>}
                </div>
                <p className="text-slate-500 text-sm mb-5 line-clamp-1" title={t.description}>{t.description}</p>
                <div className="flex items-center gap-6 text-slate-400 text-sm mb-5">
                  <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {t.duration} menit</span>
                  <span className="flex items-center gap-1.5"><FileText className="w-4 h-4" /> {t.totalItems} soal</span>
                </div>
              </div>
              <button className="w-full py-3 bg-[var(--accent)] hover:opacity-90 text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2 shadow-[0_4px_12px_rgba(0,0,0,0.1)]">
                Mulai <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
