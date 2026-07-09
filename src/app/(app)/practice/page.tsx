"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion, Variants } from "framer-motion"
import { BookOpen, Loader2, Sparkles, Brain, FlaskConical, BookOpenCheck, Languages, PenTool, Calculator } from "lucide-react"

interface SubjectInfo {
  id: string
  name: string
  cluster: string
  totalQuestions: number
}

const subjectMeta: Record<string, { icon: typeof BookOpen; bgColor: string; hsl: string }> = {
  "Penalaran Umum":                { icon: Brain,         bgColor: "bg-[hsl(240,80%,65%)]", hsl: "240" },
  "Pengetahuan Kuantitatif":       { icon: Calculator,    bgColor: "bg-[hsl(210,80%,60%)]", hsl: "210" },
  "Pemahaman Bacaan & Menulis":    { icon: BookOpenCheck,  bgColor: "bg-[hsl(150,70%,50%)]", hsl: "150" },
  "Pengetahuan & Pemahaman Umum":  { icon: FlaskConical,  bgColor: "bg-[hsl(40,80%,55%)]",  hsl: "40"  },
  "Literasi Bahasa Indonesia":     { icon: PenTool,       bgColor: "bg-[hsl(340,75%,60%)]", hsl: "340" },
  "Literasi Bahasa Inggris":       { icon: Languages,     bgColor: "bg-[hsl(25,80%,55%)]",   hsl: "25"  },
  "Penalaran Matematika":          { icon: Calculator,    bgColor: "bg-[hsl(175,70%,45%)]", hsl: "175" },
}
const defaultMeta = { icon: BookOpen, bgColor: "bg-slate-500", hsl: "0" }

const stagger: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } }
const fadeUp: Variants = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } } }

export default function PracticePage() {
  const router = useRouter()
  const [subjects, setSubjects] = useState<SubjectInfo[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/practice/subjects")
        if (res.ok) {
          const data = await res.json()
          setSubjects(data.subjects || [])
        }
      } catch (err) {
        console.error("Failed to fetch subjects:", err)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  return (
    <motion.div variants={stagger} initial="hidden" animate="show" className="h-full flex flex-col p-6 md:p-8 overflow-y-auto no-scrollbar">
      {/* Header */}
      <motion.div variants={fadeUp} className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-xl bg-[var(--accent-secondary)]/10 flex items-center justify-center border border-[var(--accent-secondary)]/20 shadow-sm">
          <Sparkles className="w-5 h-5 text-[var(--accent-secondary)]" />
        </div>
        <h1 className="text-2xl font-semibold text-slate-800 tracking-tight">Mode Belajar</h1>
      </motion.div>
      <motion.p variants={fadeUp} className="text-slate-500 mb-8 max-w-lg font-medium">
        Latihan soal per-subtes dengan feedback AI langsung di setiap soal. Nilaimu <span className="text-slate-400 italic">tidak</span> akan masuk ke dashboard atau Chancing.
      </motion.p>

      {loading ? (
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-slate-400" />
        </div>
      ) : subjects.length === 0 ? (
        <motion.div variants={fadeUp} className="flex-1 flex flex-col items-center justify-center text-slate-500">
          <BookOpen className="w-16 h-16 text-slate-300 mb-4" />
          <p className="mb-2 font-medium">Belum ada soal tersedia.</p>
          <p className="text-sm text-slate-400">Tambahkan soal lewat Admin terlebih dahulu.</p>
        </motion.div>
      ) : (
        <motion.div variants={stagger} className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {subjects.map((s) => {
            const meta = subjectMeta[s.name] || defaultMeta
            const Icon = meta.icon
            return (
              <motion.button
                variants={fadeUp}
                key={s.id}
                onClick={() => router.push(`/practice/${s.id}`)}
                disabled={s.totalQuestions === 0}
                className="group relative w-full flex flex-col text-left rounded-[1.75rem] overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed border border-slate-100 bg-white"
              >
                {/* Colored top bar */}
                <div className={`h-28 ${meta.bgColor} relative overflow-hidden`}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30 shadow-lg">
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="text-sm font-semibold text-slate-800 mb-1 group-hover:text-slate-900">{s.name}</h3>
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`text-[10px] font-bold tracking-wider px-2 py-0.5 rounded-full bg-[hsl(${meta.hsl},90%,94%)] text-[hsl(${meta.hsl},70%,40%)]`}>
                      {s.cluster}
                    </span>
                  </div>
                  <div className="mt-auto flex items-center justify-between">
                    <span className="text-xs text-slate-400 font-medium">{s.totalQuestions} soal tersedia</span>
                    <span className="text-xs text-[var(--accent)] font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                      Mulai →
                    </span>
                  </div>
                </div>
              </motion.button>
            )
          })}
        </motion.div>
      )}
    </motion.div>
  )
}
