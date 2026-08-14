"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion, Variants } from "framer-motion"
import { BookOpen, Loader2, Sparkles, Brain, FlaskConical, BookOpenCheck, Languages, PenTool, Calculator, ArrowRight, PlayCircle, Zap, Target, Clock, Info } from "lucide-react"

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
    <div className="h-full flex flex-col p-6 md:p-8 overflow-y-auto no-scrollbar relative w-full">
      <div className="max-w-5xl mx-auto w-full">
      
      {/* 1. Header & Big Banner */}
      <motion.div variants={fadeUp} initial="hidden" animate="show" className="mb-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-slate-800">Practice</h1>
          <p className="text-slate-500 mt-2 text-sm">Latihan soal per-subtes secara acak untuk melatih insting dan kecepatan.</p>
        </div>

        <div className="bg-gradient-to-br from-[var(--pastel-purple)] to-white border border-[var(--accent)]/20 rounded-3xl p-6 md:p-8 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none">
            <Target className="w-48 h-48" />
          </div>
          
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[var(--accent)]/10 text-[var(--accent-dark)] text-xs font-bold rounded-full uppercase tracking-wider mb-3">
                <Zap className="w-3.5 h-3.5" /> Mode Latihan
              </span>
              <h2 className="text-xl md:text-2xl font-bold text-slate-800">
                Quick Drill
              </h2>
              <p className="text-slate-500 font-medium mt-1">Nilaimu tidak akan masuk ke grafik rapor atau Chancing.</p>
            </div>
            
            <div className="flex gap-4">
              <div className="bg-white/60 border border-white/40 p-4 rounded-2xl text-center min-w-[120px]">
                <p className="text-[10px] uppercase font-bold text-slate-500 mb-1">Total Subtes</p>
                <p className="text-2xl font-black text-slate-800">{subjects.length || 0}</p>
              </div>
            </div>
          </div>

          <div className="mt-6 bg-white/60 rounded-2xl p-4 md:p-5 border border-[var(--accent)]/10">
            <div className="flex items-start gap-3">
              <div className="shrink-0 mt-0.5">
                <Info className="w-5 h-5 text-[var(--accent)]" />
              </div>
              <div className="text-slate-600 space-y-1 text-sm leading-relaxed">
                <strong className="text-slate-800 block mb-1">Tips Latihan</strong>
                <p>Sistem memberikan soal acak dari seluruh bab pada subtes pilihanmu. Manfaatkan <strong>AI Tutor</strong> jika kamu kebingungan, tapi cobalah berpikir mandiri minimal 1 menit!</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* 2. Main Content / Grid */}
      {loading ? (
        <div className="flex-1 flex items-center justify-center min-h-[200px]">
          <Loader2 className="w-8 h-8 animate-spin text-slate-400" />
        </div>
      ) : subjects.length === 0 ? (
        <motion.div variants={fadeUp} initial="hidden" animate="show" className="flex-1 flex flex-col items-center justify-center text-slate-500 bg-white rounded-3xl border border-slate-100 p-8 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
          <BookOpen className="w-16 h-16 text-slate-300 mb-4" />
          <p className="mb-2 font-medium text-slate-700">Belum ada soal tersedia.</p>
          <p className="text-sm text-slate-400">Tambahkan soal lewat Admin terlebih dahulu.</p>
        </motion.div>
      ) : (
        <motion.div variants={stagger} initial="hidden" animate="show" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 pb-8">
          {subjects.map((s, sIdx) => {
            const colorList = [
              { bg: "bg-rose-50", text: "text-rose-600", hover: "hover:border-rose-300", badgeBg: "bg-rose-100/50", badgeText: "text-rose-600" },
              { bg: "bg-blue-50", text: "text-blue-600", hover: "hover:border-blue-300", badgeBg: "bg-blue-100/50", badgeText: "text-blue-600" },
              { bg: "bg-emerald-50", text: "text-emerald-600", hover: "hover:border-emerald-300", badgeBg: "bg-emerald-100/50", badgeText: "text-emerald-600" },
              { bg: "bg-amber-50", text: "text-amber-600", hover: "hover:border-amber-300", badgeBg: "bg-amber-100/50", badgeText: "text-amber-600" },
              { bg: "bg-purple-50", text: "text-purple-600", hover: "hover:border-purple-300", badgeBg: "bg-purple-100/50", badgeText: "text-purple-600" },
              { bg: "bg-indigo-50", text: "text-indigo-600", hover: "hover:border-indigo-300", badgeBg: "bg-indigo-100/50", badgeText: "text-indigo-600" },
              { bg: "bg-orange-50", text: "text-orange-600", hover: "hover:border-orange-300", badgeBg: "bg-orange-100/50", badgeText: "text-orange-600" },
            ];
            const color = colorList[sIdx % colorList.length];
            const Icon = subjectMeta[s.name]?.icon || BookOpen;

            return (
              <motion.button
                variants={fadeUp}
                key={s.id}
                onClick={() => router.push(`/practice/${s.id}`)}
                disabled={s.totalQuestions === 0}
                className={`group relative flex flex-col text-left bg-white rounded-3xl p-5 border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:border-slate-200 hover:shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                <div className="flex items-start justify-between mb-6 w-full">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${color.bg} ${color.text}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className={`text-[9px] font-bold tracking-wider px-2 py-1 rounded-md uppercase ${color.badgeBg} ${color.badgeText}`}>
                    {s.cluster}
                  </span>
                </div>

                <h3 className="font-bold text-slate-800 text-[15px] mb-1.5 group-hover:text-[var(--accent)] transition-colors pr-2 leading-snug line-clamp-2 min-h-[44px]">
                  {s.name}
                </h3>
                <p className="text-xs font-medium text-slate-500 mb-6 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 opacity-70" /> {s.totalQuestions} Soal
                </p>

                <div className="mt-auto flex items-center justify-between w-full pt-4 border-t border-slate-50">
                  <span className="text-[11px] font-bold text-slate-500 group-hover:text-[var(--accent)] transition-colors uppercase tracking-wider">
                    Drill Sekarang
                  </span>
                  <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-[var(--accent)] transition-colors shrink-0">
                     <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
                  </div>
                </div>
              </motion.button>
            )
          })}
        </motion.div>
      )}
      </div>
    </div>
  )
}
