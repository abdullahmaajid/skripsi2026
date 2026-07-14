"use client"

import { useState, useEffect, Suspense } from "react"
import { useRouter } from "next/navigation"
import { Bot, Loader2, BookOpen } from "lucide-react"
import { motion, Variants } from "framer-motion"
import { useTutorChatStore, QuestionOption } from "@/store/useTutorChatStore"
import MarkdownRenderer from "@/components/ui/MarkdownRenderer"

interface WrongQuestion {
  questionId: string
  text: string
  subject: string
  selectedAnswer: string
  correctAnswer: string
  difficulty: number
  isCorrect?: boolean
  options: QuestionOption[]
  selectedIds: string[]
}

const subjectColors: Record<string, { border: string, shadow: string, tagBg: string, tagText: string, cardBg: string, cardHover: string }> = {
  "Penalaran Umum": { border: "border-[hsl(240,80%,90%)]", shadow: "shadow-sm", tagBg: "bg-[hsl(240,90%,92%)]", tagText: "text-[hsl(240,80%,40%)]", cardBg: "bg-[hsl(240,90%,96%)]", cardHover: "hover:bg-[hsl(240,90%,94%)]" },
  "Pengetahuan Kuantitatif": { border: "border-[hsl(210,80%,90%)]", shadow: "shadow-sm", tagBg: "bg-[hsl(210,90%,92%)]", tagText: "text-[hsl(210,80%,40%)]", cardBg: "bg-[hsl(210,90%,96%)]", cardHover: "hover:bg-[hsl(210,90%,94%)]" },
  "Pemahaman Bacaan & Menulis": { border: "border-[hsl(150,80%,90%)]", shadow: "shadow-sm", tagBg: "bg-[hsl(150,90%,92%)]", tagText: "text-[hsl(150,80%,35%)]", cardBg: "bg-[hsl(150,90%,96%)]", cardHover: "hover:bg-[hsl(150,90%,94%)]" },
  "Pengetahuan & Pemahaman Umum": { border: "border-[hsl(40,80%,90%)]", shadow: "shadow-sm", tagBg: "bg-[hsl(40,90%,92%)]", tagText: "text-[hsl(40,80%,40%)]", cardBg: "bg-[hsl(40,90%,96%)]", cardHover: "hover:bg-[hsl(40,90%,94%)]" },
  "Literasi Bahasa Indonesia": { border: "border-[hsl(340,80%,90%)]", shadow: "shadow-sm", tagBg: "bg-[hsl(340,90%,92%)]", tagText: "text-[hsl(340,80%,40%)]", cardBg: "bg-[hsl(340,90%,96%)]", cardHover: "hover:bg-[hsl(340,90%,94%)]" },
  "Literasi Bahasa Inggris": { border: "border-[hsl(25,80%,90%)]", shadow: "shadow-sm", tagBg: "bg-[hsl(25,90%,92%)]", tagText: "text-[hsl(25,80%,40%)]", cardBg: "bg-[hsl(25,90%,96%)]", cardHover: "hover:bg-[hsl(25,90%,94%)]" },
  "Penalaran Matematika": { border: "border-[hsl(175,80%,90%)]", shadow: "shadow-sm", tagBg: "bg-[hsl(175,90%,92%)]", tagText: "text-[hsl(175,80%,35%)]", cardBg: "bg-[hsl(175,90%,96%)]", cardHover: "hover:bg-[hsl(175,90%,94%)]" },
  default: { border: "border-slate-200", shadow: "shadow-sm", tagBg: "bg-[var(--accent)]/10", tagText: "text-[var(--accent-dark)]", cardBg: "bg-slate-50", cardHover: "hover:bg-slate-100" }
}

const stagger: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.05 } } }
const fadeUp: Variants = { hidden: { opacity: 0, y: 15 }, show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } } }
const scaleIn: Variants = { hidden: { opacity: 0, scale: 0.95 }, show: { opacity: 1, scale: 1, transition: { duration: 0.3, ease: "easeOut" } } }

function TutorContent({ attemptIdParam }: { attemptIdParam?: string }) {
  const router = useRouter()
  const attemptId = attemptIdParam

  const [questions, setQuestions] = useState<WrongQuestion[]>([])
  const [loadingQuestions, setLoadingQuestions] = useState(true)
  const [selectedSubjectFilter, setSelectedSubjectFilter] = useState<string | null>(null)
  const { selectedQuestion, setSelectedQuestion, clearQuestion } = useTutorChatStore()

  // Fetch questions from the specific attempt
  useEffect(() => {
    async function fetchQuestions() {
      try {
        if (attemptId) {
          const res = await fetch(`/api/tryout/${attemptId}/result`)
          if (!res.ok) throw new Error("Gagal mengambil data")
          const data = await res.json()
          
          if (data.questions) {
            const mapped: WrongQuestion[] = data.questions.map((q: any) => {
              const selectedAnswers = q.options
                .filter((o: any) => q.selectedIds?.includes(o.id))
                .map((o: any) => `${o.label}. ${o.text}`)
                .join(", ")

              return {
                questionId: q.questionId,
                text: q.text,
                subject: q.subject,
                selectedAnswer: selectedAnswers || "Tidak dijawab",
                correctAnswer: q.options
                  .filter((o: any) => o.isCorrect)
                  .map((o: any) => `${o.label}. ${o.text}`)
                  .join(", ") || "—",
                difficulty: q.difficulty,
                isCorrect: q.isCorrect,
                options: q.options as QuestionOption[],
                selectedIds: q.selectedIds ?? [],
              }
            })
            setQuestions(mapped)
          }
        } else {
          const listRes = await fetch("/api/tutor/questions")
          if (!listRes.ok) throw new Error("Gagal mengambil data")
          const listData = await listRes.json()
          
          if (listData.questions) {
            const mapped: WrongQuestion[] = listData.questions.map((q: any) => {
              const selectedAnswers = q.options
                .filter((o: any) => q.selectedIds?.includes(o.id))
                .map((o: any) => `${o.label}. ${o.text}`)
                .join(", ")

              return {
                questionId: q.questionId,
                text: q.text,
                subject: q.subject,
                selectedAnswer: selectedAnswers || "Tidak dijawab",
                correctAnswer: q.options
                  .filter((o: any) => o.isCorrect)
                  .map((o: any) => `${o.label}. ${o.text}`)
                  .join(", ") || "—",
                difficulty: q.difficulty,
                isCorrect: q.isCorrect,
                options: q.options as QuestionOption[],
                selectedIds: q.selectedIds ?? [],
              }
            })
            setQuestions(mapped)
          }
        }
      } catch (err) {
        console.error("Failed to fetch questions:", err)
      } finally {
        setLoadingQuestions(false)
      }
    }
    fetchQuestions()
  }, [attemptId])

  // Clear question from store when leaving the page
  useEffect(() => {
    return () => clearQuestion()
  }, [clearQuestion])

  const handleSelectQuestion = (q: WrongQuestion) => {
    setSelectedQuestion({
      questionId: q.questionId,
      text: q.text,
      subject: q.subject,
      selectedAnswer: q.selectedAnswer,
      correctAnswer: q.correctAnswer,
      difficulty: q.difficulty,
      options: q.options,
      selectedIds: q.selectedIds,
    })
  }

  // --- No question selected: show grid ---
  if (!selectedQuestion) {
    return (
      <motion.div variants={stagger} initial="hidden" animate="show" className="h-full flex flex-col p-6 md:p-8 overflow-y-auto no-scrollbar">
        <motion.div variants={fadeUp} className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-[var(--accent-secondary)]/10 flex items-center justify-center border border-[var(--accent-secondary)]/20 shadow-sm">
            <Bot className="w-5 h-5 text-[var(--accent-secondary)]" />
          </div>
          <h1 className="text-2xl font-semibold text-slate-800 tracking-tight">Bahas Soal Luar</h1>
        </motion.div>
        <motion.p variants={fadeUp} className="text-slate-500 mb-8 max-w-lg font-medium">
          Pilih salah satu soal salah di bawah untuk dibahas, atau ketik langsung soal eksternal (buku cetak, bimbel lain, TO sekolah) di panel AI Chat sebelah kanan.
        </motion.p>
        
        {loadingQuestions ? (
          <div className="flex-1 flex items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-slate-400" />
          </div>
        ) : questions.length === 0 ? (
          <motion.div variants={scaleIn} className="flex-1 flex flex-col items-center justify-center text-slate-500">
            <p className="mb-4 font-medium">Belum ada soal untuk dibahas.</p>
            <button onClick={() => router.push("/tryout/list")} className="px-6 py-3 bg-[var(--accent)] rounded-xl font-medium text-white shadow-sm hover:bg-[var(--accent-hover)] transition-colors">
              Kerjakan Try Out Dulu
            </button>
          </motion.div>
        ) : (
          <>
            <motion.div variants={fadeUp} className="flex gap-2 overflow-x-auto no-scrollbar mb-6 pb-2 shrink-0">
              <button
                onClick={() => setSelectedSubjectFilter(null)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedSubjectFilter === null
                    ? "bg-[var(--accent)] text-white shadow-sm"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                Semua Kategori
              </button>
              {Array.from(new Set(questions.map((q) => q.subject))).map((subject) => (
                <button
                  key={subject}
                  onClick={() => setSelectedSubjectFilter(subject)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                    selectedSubjectFilter === subject
                      ? "bg-[var(--accent)] text-white shadow-sm"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {subject}
                </button>
              ))}
            </motion.div>
            <motion.div variants={stagger} className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {questions
                .filter((q) => !selectedSubjectFilter || q.subject === selectedSubjectFilter)
                .map((q, index) => {
              const colorConfig = subjectColors[q.subject] || subjectColors.default
              return (
                <motion.button
                  variants={fadeUp}
                  key={q.questionId}
                  onClick={() => handleSelectQuestion(q)}
                  className={`w-full flex flex-col text-left p-5 border ${colorConfig.border} ${colorConfig.shadow} ${colorConfig.cardBg} ${colorConfig.cardHover} rounded-[1.5rem] transition-all hover:shadow-md hover:-translate-y-0.5 group`}
                >
                  <div className="flex items-center justify-between mb-3 w-full">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-semibold tracking-wide ${colorConfig.tagBg} ${colorConfig.tagText}`}>
                        {q.subject}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono bg-slate-50 border border-slate-100 px-1.5 py-0.5 rounded-md">b={q.difficulty}</span>
                    </div>
                    {q.isCorrect === false && (
                      <span className="text-[10px] bg-rose-50 text-rose-500 px-2 py-0.5 rounded-md font-bold tracking-wider uppercase border border-rose-100">Salah</span>
                    )}
                  </div>
                  <div className="flex-1 min-h-0 min-w-0">
                    <p className="text-sm text-slate-600 line-clamp-4 group-hover:text-slate-900 transition-colors leading-relaxed font-medium">{q.text || "Teks soal tidak tersedia"}</p>
                  </div>
                </motion.button>
              )
              })}
            </motion.div>
          </>
        )}
      </motion.div>
    )
  }

  return (
    <motion.div variants={stagger} initial="hidden" animate="show" className="h-full flex flex-col bg-white rounded-[2rem] relative overflow-hidden">
      
      {/* ─── Top Solid Purple Section ─── */}
      <motion.div variants={fadeUp} className="bg-[var(--accent)] text-white px-6 py-8 md:px-8 pb-16 relative shrink-0">
        {/* Glow effect */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/10 rounded-full blur-3xl -ml-10 -mb-10"></div>
        
        {/* Top Header */}
        <div className="flex items-center justify-between mb-8 relative z-10">
          <button onClick={clearQuestion} className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors backdrop-blur-sm shadow-sm">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          </button>
          <span className="text-sm font-semibold tracking-wider uppercase text-white/90">Konteks Soal</span>
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm shadow-sm cursor-pointer hover:bg-white/30 transition-colors">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" x2="15.42" y1="13.51" y2="17.49"/><line x1="15.41" x2="8.59" y1="6.51" y2="10.49"/></svg>
          </div>
        </div>

        {/* Center Content */}
        <div className="flex flex-col items-center text-center relative z-10 max-w-2xl mx-auto mb-2">
          {/* Icon placeholder like reference */}
          <div className="w-24 h-24 rounded-full bg-white/10 backdrop-blur-md mb-6 flex items-center justify-center shadow-lg border border-white/20 p-4">
             <BookOpen className="w-10 h-10 text-white" />
          </div>
          
          <div className="flex items-center gap-2 mb-4">
            <span className="text-[10px] font-bold tracking-wider px-3.5 py-1.5 bg-[var(--accent-dark)] rounded-full text-white shadow-sm">
              {selectedQuestion.subject}
            </span>
            <span className="text-[10px] font-mono px-3.5 py-1.5 bg-white/20 rounded-full shadow-sm text-white">b = {selectedQuestion.difficulty}</span>
          </div>
          <div className="text-lg md:text-xl font-medium leading-relaxed px-4 w-full">
            <MarkdownRenderer content={selectedQuestion.text} variant="dark" />
          </div>
        </div>
      </motion.div>

      {/* ─── Bottom White Section (Overlapping) ─── */}
      <motion.div variants={scaleIn} className="flex-1 bg-white rounded-t-[2.5rem] -mt-8 p-6 md:p-8 relative z-20 flex flex-col shadow-[0_-10px_40px_rgba(0,0,0,0.08)] overflow-y-auto no-scrollbar pb-10">
        
        {/* All Options — highlighted by role */}
        <div className="mb-8">
          <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-3 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span> Pilihan Jawaban
          </p>
          <div className="flex flex-col gap-2.5">
            {(selectedQuestion.options ?? []).length === 0 ? (
              /* fallback: no options stored — show the two-card layout */
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="p-4 bg-[hsl(340,90%,96%)] rounded-[1.25rem] border border-[hsl(340,80%,88%)]">
                  <p className="text-[10px] uppercase tracking-widest text-[hsl(340,80%,50%)] font-bold mb-1">Jawabanmu</p>
                  <p className="text-sm text-slate-700 font-medium">{selectedQuestion.selectedAnswer}</p>
                </div>
                <div className="p-4 bg-[hsl(150,90%,96%)] rounded-[1.25rem] border border-[hsl(150,80%,78%)]">
                  <p className="text-[10px] uppercase tracking-widest text-[hsl(150,80%,40%)] font-bold mb-1">Jawaban Benar</p>
                  <p className="text-sm text-slate-700 font-medium">{selectedQuestion.correctAnswer}</p>
                </div>
              </div>
            ) : (
              selectedQuestion.options.map((opt) => {
                const isSelected = selectedQuestion.selectedIds.includes(opt.id)
                const isCorrect  = opt.isCorrect

                let containerCls = "p-4 rounded-[1.25rem] border flex items-start gap-3 transition-all "
                let labelCls     = "w-7 h-7 rounded-xl shrink-0 flex items-center justify-center text-xs font-bold border "
                let statusTag: React.ReactNode = null

                if (isCorrect && isSelected) {
                  // Correct & picked — green
                  containerCls += "bg-[hsl(150,90%,96%)] border-[hsl(150,80%,78%)]"
                  labelCls     += "bg-[hsl(150,75%,45%)] text-white border-[hsl(150,75%,40%)]"
                  statusTag = <span className="text-[10px] ml-auto shrink-0 font-bold text-[hsl(150,75%,40%)] bg-[hsl(150,90%,90%)] px-2 py-0.5 rounded-full">Benar</span>
                } else if (isCorrect && !isSelected) {
                  // Correct but NOT picked — green outline
                  containerCls += "bg-[hsl(150,90%,96%)] border-[hsl(150,80%,78%)]"
                  labelCls     += "bg-[hsl(150,75%,45%)] text-white border-[hsl(150,75%,40%)]"
                  statusTag = <span className="text-[10px] ml-auto shrink-0 font-bold text-[hsl(150,75%,40%)] bg-[hsl(150,90%,90%)] px-2 py-0.5 rounded-full">Jawaban Benar</span>
                } else if (!isCorrect && isSelected) {
                  // Wrong & picked — red
                  containerCls += "bg-[hsl(340,90%,96%)] border-[hsl(340,80%,85%)]"
                  labelCls     += "bg-[hsl(340,75%,55%)] text-white border-[hsl(340,75%,50%)]"
                  statusTag = <span className="text-[10px] ml-auto shrink-0 font-bold text-[hsl(340,75%,50%)] bg-[hsl(340,90%,92%)] px-2 py-0.5 rounded-full">Jawabanmu</span>
                } else {
                  // Neutral
                  containerCls += "bg-slate-50 border-slate-100"
                  labelCls     += "bg-slate-100 text-slate-500 border-slate-200"
                }

                return (
                  <div key={opt.id} className={containerCls}>
                    <span className={labelCls}>{opt.label}</span>
                    <div className="text-sm text-slate-700 font-medium leading-relaxed flex-1">
                      <MarkdownRenderer content={opt.text} />
                    </div>
                    {statusTag}
                  </div>
                )
              })
            )}
          </div>
        </div>

        {/* Soal Lainnya (List format like reference "Lessons") */}
        <div>
          <h3 className="text-sm font-semibold text-slate-800 mb-4">Soal Lainnya</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
            {questions.filter(q => q.questionId !== selectedQuestion.questionId).slice(0, 6).map((q, idx) => {
              const cc = subjectColors[q.subject] || subjectColors.default
              return (
                <motion.button variants={fadeUp} key={q.questionId} onClick={() => handleSelectQuestion(q)} className="flex items-center gap-4 p-4 rounded-[1.5rem] border border-slate-100 bg-slate-50 hover:bg-slate-100 transition-colors text-left group">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${cc.cardBg} ${cc.tagText}`}>
                     <BookOpen className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-800 truncate mb-0.5">{q.subject}</p>
                    <div className="text-xs text-slate-500 truncate"><MarkdownRenderer content={q.text} /></div>
                  </div>
                  <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center group-hover:bg-[var(--accent)] transition-colors shadow-sm">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400 group-hover:text-white"><polyline points="9 18 15 12 9 6"/></svg>
                  </div>
                </motion.button>
              )
            })}
          </div>
        </div>

      </motion.div>
    </motion.div>
  )
}

import { use } from "react"

export default function TutorPage({ params }: { params: Promise<{ attemptId?: string[] }> }) {
  const unwrappedParams = use(params)
  const attemptIdParam = unwrappedParams.attemptId?.[0]
  
  return (
    <Suspense fallback={
      <div className="h-full flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-slate-400" />
      </div>
    }>
      <TutorContent attemptIdParam={attemptIdParam} />
    </Suspense>
  )
}
