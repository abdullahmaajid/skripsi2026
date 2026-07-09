"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { 
  AlertTriangle, Filter, Loader2, Bookmark, CheckCircle2, 
  XCircle, BrainCircuit, ChevronDown, ChevronUp, MessageSquareShare
} from "lucide-react"
import { useTutorChatStore } from "@/store/useTutorChatStore"

interface EvaluationOption {
  id: string
  label: string
  text: string
  isCorrect: boolean
}

interface EvaluationQuestion {
  id: string
  text: string
  type: string
  difficulty: number
  subject: string
  subjectId: string
  chapter: string
  flagged: boolean
  lastAnsweredCorrectly: boolean
  options: EvaluationOption[]
}

interface Subject {
  id: string
  name: string
}

export default function EvaluationPage() {
  const router = useRouter()
  const [questions, setQuestions] = useState<EvaluationQuestion[]>([])
  const [subjects, setSubjects] = useState<Subject[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>("ALL")
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const { setSelectedQuestion } = useTutorChatStore()

  useEffect(() => {
    fetchQuestions()
  }, [selectedSubjectId])

  const fetchQuestions = async () => {
    setLoading(true)
    try {
      const res = await fetch(`/api/evaluation/questions?subjectId=${selectedSubjectId}`)
      if (res.ok) {
        const data = await res.json()
        setQuestions(data.questions || [])
        if (subjects.length === 0) {
          setSubjects(data.subjects || [])
        }
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleDiscuss = (q: EvaluationQuestion) => {
    const correctOpt = q.options.find(o => o.isCorrect)
    setSelectedQuestion({
      questionId: q.id,
      text: q.text,
      subject: q.subject,
      selectedAnswer: "Tidak menjawab",
      correctAnswer: correctOpt ? `${correctOpt.label}. ${correctOpt.text}` : "—",
      difficulty: q.difficulty,
      options: q.options,
      selectedIds: [],
      isSecondChance: false
    })
    
    if (window.innerWidth < 1024) {
      router.push('/tutor')
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-rose-500" /> Bank Soal Salah
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Soal Try Out yang dijawab salah atau ditandai.
          </p>
        </div>
      </div>

      {/* Filter */}
      <div className="bg-white rounded-2xl p-4 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-100 flex flex-col sm:flex-row gap-4 items-center">
        <Filter className="w-5 h-5 text-slate-400 hidden sm:block" />
        <div className="flex-1 w-full">
          <select 
            value={selectedSubjectId}
            onChange={(e) => setSelectedSubjectId(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 text-slate-700 text-sm font-medium rounded-xl px-4 py-2.5 outline-none focus:border-[var(--accent)] transition-colors cursor-pointer"
          >
            <option value="ALL">Semua Subtes (Keseluruhan)</option>
            {subjects.map(s => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* List */}
      {loading ? (
        <div className="flex h-40 items-center justify-center">
          <Loader2 className="w-8 h-8 text-[var(--accent)] animate-spin" />
        </div>
      ) : questions.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex flex-col items-center justify-center text-center">
          <CheckCircle2 className="w-16 h-16 text-emerald-400 mb-4" />
          <h3 className="text-lg font-bold text-slate-800">Tidak ada soal evaluasi</h3>
          <p className="text-sm text-slate-500 mt-2">Hebat! Belum ada riwayat soal yang dijawab salah atau ditandai pada filter ini.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {questions.map((q, idx) => (
            <div key={q.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all">
              <div 
                className="p-5 cursor-pointer flex items-start gap-4"
                onClick={() => setExpandedId(expandedId === q.id ? null : q.id)}
              >
                <div className="shrink-0 w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold text-xs">
                  {idx + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                      {q.subject}
                    </span>
                    <span className="text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                      {q.chapter}
                    </span>
                    {q.flagged && (
                      <span className="text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 flex items-center gap-1">
                        <Bookmark className="w-3 h-3" /> Flagged
                      </span>
                    )}
                    {!q.lastAnsweredCorrectly && (
                      <span className="text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-700">
                        Salah
                      </span>
                    )}
                  </div>
                  <p className="text-sm font-medium text-slate-800 line-clamp-2 leading-relaxed">
                    {q.text}
                  </p>
                </div>
                <div className="shrink-0 text-slate-400">
                  {expandedId === q.id ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </div>
              </div>

              <AnimatePresence>
                {expandedId === q.id && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="border-t border-slate-100 bg-slate-50/50 px-5 pb-5 pt-4"
                  >
                    <p className="text-sm font-medium text-slate-800 mb-6 leading-relaxed whitespace-pre-wrap">
                      {q.text}
                    </p>
                    <div className="space-y-2 mb-6">
                      {q.options.map(opt => (
                        <div 
                          key={opt.id} 
                          className={`p-3 rounded-xl border flex items-start gap-3 ${
                            opt.isCorrect 
                              ? "bg-emerald-50 border-emerald-200" 
                              : "bg-white border-slate-200"
                          }`}
                        >
                          <div className={`w-6 h-6 rounded flex items-center justify-center font-bold text-xs shrink-0 ${
                            opt.isCorrect ? "bg-emerald-500 text-white" : "bg-slate-100 text-slate-600"
                          }`}>
                            {opt.label}
                          </div>
                          <p className={`text-sm flex-1 ${opt.isCorrect ? "text-emerald-800 font-medium" : "text-slate-600"}`}>
                            {opt.text}
                          </p>
                          {opt.isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />}
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex justify-end">
                      <button
                        onClick={(e) => { e.stopPropagation(); handleDiscuss(q); }}
                        className="flex items-center gap-2 px-5 py-2.5 bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)] rounded-xl font-bold text-sm transition-all shadow-[0_4px_12px_rgba(193,119,249,0.2)]"
                      >
                        <MessageSquareShare className="w-4 h-4" />
                        Diskusikan di AI Tutor
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
