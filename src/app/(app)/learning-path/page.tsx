"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { BookOpen, CheckCircle, Circle, PlayCircle, Lock, ArrowRight, Loader2, FileText, Sparkles, PenTool, X, Info } from "lucide-react"
import { useRouter } from "next/navigation"
import MarkdownRenderer from "@/components/ui/MarkdownRenderer"

function ProgressRing({ progress, size = 40, stroke = 4, color = "var(--accent)" }: { progress: number; size?: number; stroke?: number; color?: string }) {
  const radius = (size - stroke) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (progress / 100) * circumference
  return (
    <div className="relative flex items-center justify-center shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="rgba(0,0,0,0.05)" strokeWidth={stroke} />
        <motion.circle
          cx={size / 2} cy={size / 2} r={radius} fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
          style={{ strokeDasharray: circumference }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-[10px] font-bold text-slate-700">{Math.round(progress)}%</span>
      </div>
    </div>
  )
}
export default function LearningPathPage() {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedChapter, setSelectedChapter] = useState<any | null>(null)
  const router = useRouter()

  useEffect(() => {
    // Track that user has explored the learning path
    localStorage.setItem("has_visited_learning_path", "true")

    fetch("/api/learning-path")
      .then(r => r.json())
      .then(d => {
        setData(d.learningPath || [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const fadeUp = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }
  const stagger = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
      </div>
    )
  }

  return (
    <motion.div variants={stagger} initial="hidden" animate="show" className="p-6 md:p-8 space-y-8 max-w-5xl mx-auto h-full overflow-y-auto no-scrollbar relative">
      
      <motion.div variants={fadeUp}>
        <h1 className="text-3xl font-bold text-slate-800">Learning Path</h1>
        <p className="text-slate-500 mt-2 text-sm">Rute belajarmu yang disesuaikan secara personal berdasarkan hasil ujian diagnostik dan tryout.</p>
      </motion.div>

      <motion.div variants={fadeUp} className="bg-indigo-50/60 border border-indigo-100 rounded-2xl p-5 md:p-6 flex gap-4 text-sm shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
        <div className="shrink-0 mt-0.5">
          <Info className="w-5 h-5 text-indigo-500" />
        </div>
        <div className="text-slate-600 space-y-3 leading-relaxed">
          <p><strong className="text-indigo-900 font-bold">Bagaimana rute belajar ini disusun?</strong></p>
          <ul className="list-disc pl-4 space-y-2 text-[13px] md:text-sm">
            <li><strong>Prioritas Mata Pelajaran:</strong> Mata pelajaran dengan rata-rata penguasaan terendah akan otomatis ditempatkan di <strong>paling atas</strong>, sehingga kamu bisa memprioritaskan area terlemahmu.</li>
            <li><strong>Fokus pada Kelemahan Bab:</strong> Di dalam tiap mata pelajaran, bab yang paling banyak kamu jawab salah saat Tryout akan didorong ke urutan <strong>awal</strong> (dilabeli <span className="font-semibold text-blue-600">Sedang Dipelajari</span>).</li>
            <li><strong>Sistem Bertahap (Terkunci):</strong> Kamu tidak bisa melompat ke materi lanjutan jika materi dasarnya (<span className="font-semibold text-slate-500">Belum Mulai</span>) belum kamu coba pelajari.</li>
            <li><strong>Materi yang Dikuasai:</strong> Bab dengan skor penguasaan tinggi (≥70%) otomatis digeser ke urutan <strong>paling akhir</strong> agar tidak mengganggu fokus belajarmu saat ini.</li>
          </ul>
        </div>
      </motion.div>

      <div className="space-y-8">
        {data.map((subject, sIdx) => {
          const colorList = [
            { bg: "bg-rose-50", text: "text-rose-600" },
            { bg: "bg-blue-50", text: "text-blue-600" },
            { bg: "bg-emerald-50", text: "text-emerald-600" },
            { bg: "bg-amber-50", text: "text-amber-600" },
            { bg: "bg-purple-50", text: "text-purple-600" },
            { bg: "bg-teal-50", text: "text-teal-600" },
            { bg: "bg-indigo-50", text: "text-indigo-600" },
          ];
          const color = colorList[sIdx % colorList.length];

          return (
            <motion.div variants={fadeUp} key={subject.id} className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color.bg} ${color.text}`}>
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-slate-800">{subject.name}</h2>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="hidden sm:flex flex-col items-end">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Penguasaan Keseluruhan</span>
                    <span className="text-sm font-semibold text-slate-700">{Math.round(subject.averageMastery || 0)}% Selesai</span>
                  </div>
                  <ProgressRing progress={subject.averageMastery || 0} size={42} color={subject.averageMastery >= 70 ? "#10b981" : "var(--accent)"} />
                </div>
              </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {subject.chapters.map((chapter: any, idx: number) => {
                const isCompleted = chapter.status === "COMPLETED"
                const inProgress = chapter.status === "IN_PROGRESS"
                const notStarted = chapter.status === "NOT_STARTED"
                const locked = idx > 0 && subject.chapters[idx-1].status === "NOT_STARTED"

                return (
                  <div key={chapter.id} className={`relative p-5 rounded-2xl border-2 transition-all flex flex-col justify-between ${isCompleted ? 'border-emerald-100 bg-emerald-50/30' : inProgress ? 'border-blue-200 bg-blue-50/50 shadow-sm' : 'border-slate-100 bg-slate-50 opacity-80'}`}>
                    <div>
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          {isCompleted ? <CheckCircle className="w-5 h-5 text-emerald-500" /> : inProgress ? <PlayCircle className="w-5 h-5 text-blue-500" /> : locked ? <Lock className="w-4 h-4 text-slate-400" /> : <Circle className="w-4 h-4 text-slate-400" />}
                          <span className={`text-xs font-bold uppercase tracking-wider ${isCompleted ? 'text-emerald-600' : inProgress ? 'text-blue-600' : 'text-slate-500'}`}>
                            {isCompleted ? "Dikuasai" : inProgress ? "Sedang Dipelajari" : locked ? "Terkunci" : "Belum Mulai"}
                          </span>
                        </div>
                        <span className="text-xl font-black text-slate-200">
                          {String(idx + 1).padStart(2, '0')}
                        </span>
                      </div>
                      
                      <h3 className="font-semibold text-slate-800 mb-2 pr-4">{chapter.name}</h3>
                      
                      <div className="mt-4">
                        <div className="flex justify-between text-[10px] font-bold text-slate-500 mb-1.5 uppercase">
                          <span>Penguasaan</span>
                          <span className={isCompleted ? "text-emerald-600" : inProgress ? "text-blue-600" : ""}>{chapter.mastery}%</span>
                        </div>
                        <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full transition-all duration-1000 ${isCompleted ? 'bg-emerald-500' : 'bg-blue-500'}`} 
                            style={{ width: `${chapter.mastery}%` }} 
                          />
                        </div>
                      </div>
                    </div>

                    {!locked && (
                      <div className="mt-5 space-y-2">
                        {chapter.theorySummary && (
                          <button
                            onClick={() => setSelectedChapter(chapter)}
                            className="w-full py-2 bg-[var(--pastel-purple)] text-[var(--accent-dark)] hover:bg-[var(--accent)]/10 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-sm border border-[var(--accent)]/10"
                          >
                            <FileText className="w-3.5 h-3.5" /> Rangkuman Materi
                          </button>
                        )}
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            onClick={() => router.push(`/practice/${chapter.subjectId}?chapterId=${chapter.id}`)}
                            className="py-2 bg-white border border-slate-200 hover:border-emerald-300 hover:text-emerald-600 rounded-xl text-[10px] font-bold text-slate-600 transition-all flex items-center justify-center gap-1 shadow-sm"
                          >
                            <PenTool className="w-3 h-3 text-emerald-500" /> Latihan Bab
                          </button>
                          <button
                            onClick={() => router.push("/tutor")}
                            className="py-2 bg-white border border-slate-200 hover:border-blue-300 hover:text-blue-600 rounded-xl text-[10px] font-bold text-slate-600 transition-all flex items-center justify-center gap-1 shadow-sm"
                          >
                            Tanya AI <Sparkles className="w-3 h-3 text-blue-500" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </motion.div>
        )})}
      </div>

      {/* Cheat Sheet / Study Notes Modal */}
      <AnimatePresence>
        {selectedChapter && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop with premium glassmorphism blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedChapter(null)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
            />

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[85vh] z-10"
            >
              {/* Header */}
              <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[var(--pastel-purple)] flex items-center justify-center text-[var(--accent)] border border-[var(--accent)]/10">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-[var(--accent)] uppercase tracking-wider">Rangkuman Materi</span>
                    <h3 className="font-bold text-slate-800 text-base line-clamp-1">{selectedChapter.name}</h3>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedChapter(null)}
                  className="w-8 h-8 rounded-full bg-white hover:bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-800 transition-colors shadow-sm"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Scrollable Theory Summary content */}
              <div className="p-6 md:p-8 overflow-y-auto no-scrollbar flex-1 bg-white">
                {selectedChapter.theorySummary ? (
                  <MarkdownRenderer content={selectedChapter.theorySummary} />
                ) : (
                  <div className="py-12 text-center text-slate-400">
                    <FileText className="w-12 h-12 mx-auto text-slate-200 mb-3" />
                    <p className="font-semibold text-sm">Rangkuman belum tersedia untuk bab ini.</p>
                  </div>
                )}
              </div>

              {/* Footer Actions */}
              <div className="p-5 border-t border-slate-100 bg-slate-50/50 flex justify-end gap-3">
                <button
                  onClick={() => setSelectedChapter(null)}
                  className="px-5 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-600 rounded-xl transition-colors shadow-sm"
                >
                  Tutup
                </button>
                <button
                  onClick={() => {
                    const ch = selectedChapter;
                    setSelectedChapter(null);
                    router.push(`/practice/${ch.subjectId}?chapterId=${ch.id}`);
                  }}
                  className="px-5 py-2.5 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-xs font-bold text-white rounded-xl transition-all shadow-sm flex items-center gap-1.5"
                >
                  <PenTool className="w-3.5 h-3.5" /> Latihan Soal Bab Ini
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
