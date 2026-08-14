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
      isReview: true
    })
  }

  // --- No question selected: show grid ---
  if (!selectedQuestion) {
    return (
      <motion.div variants={stagger} initial="hidden" animate="show" className="h-full flex flex-col p-6 md:p-8 overflow-y-auto no-scrollbar relative w-full">
        <div className="max-w-5xl mx-auto w-full">
          <motion.div variants={fadeUp} className="mb-8">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-slate-800">Ruang Tutor AI</h1>
              <p className="text-slate-500 mt-2 text-sm">
                Ketik/Paste materi yang belum kamu pahami di kolom chat AI, atau pilih salah satu soal dari riwayat belajarmu di bawah untuk dibahas kembali!
              </p>
            </div>
            
            {/* Banner Section */}
            <div className="bg-gradient-to-br from-[var(--pastel-purple)] to-white border border-[var(--accent)]/20 rounded-3xl p-6 md:p-8 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none">
                <Bot className="w-48 h-48" />
              </div>
              
              <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[var(--accent)]/10 text-[var(--accent-dark)] text-xs font-bold rounded-full uppercase tracking-wider mb-3">
                    <Bot className="w-3.5 h-3.5" /> Asisten Pintar
                  </span>
                  <h2 className="text-xl md:text-2xl font-bold text-slate-800">
                    Tanya Lexica AI
                  </h2>
                  <p className="text-slate-500 font-medium mt-1 text-sm md:text-base">AI Tutor siap membantumu memahami materi dan membedah soal yang sulit.</p>
                </div>
                
                <div className="flex gap-4">
                  <div className="bg-white/60 border border-[var(--accent)]/10 p-4 rounded-2xl text-center min-w-[120px] shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
                    <p className="text-[10px] uppercase font-bold text-slate-500 mb-1">Total Arsip</p>
                    <p className="text-2xl font-black text-slate-800">{questions.length}</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 bg-white/60 rounded-2xl p-4 md:p-5 border border-[var(--accent)]/10">
                <div className="flex items-start gap-3">
                  <div className="shrink-0 mt-0.5">
                    <Bot className="w-5 h-5 text-[var(--accent)]" />
                  </div>
                  <div className="text-slate-600 space-y-1 text-sm leading-relaxed">
                    <strong className="text-slate-800 block mb-1">Cara Menggunakan</strong>
                    <p>Ketik langsung pertanyaanmu di panel chat kanan. Atau, pilih salah satu soal yang <strong>sudah pernah kamu kerjakan</strong> (dari Try Out, Uji Diagnostik, atau Quick Drill) di bawah ini untuk dibahas secara mendalam bersama Lexica.</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        
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
            <motion.div variants={stagger} className="flex flex-col gap-6 w-full max-w-4xl relative ml-1 sm:ml-4">
              {/* Timeline Track */}
              <div className="absolute left-2 sm:left-3 top-8 bottom-8 w-0.5 bg-slate-100"></div>

              {questions
                .filter((q) => !selectedSubjectFilter || q.subject === selectedSubjectFilter)
                .map((q, index) => {
                const colorConfig = subjectColors[q.subject] || subjectColors.default
                return (
                  <motion.div variants={fadeUp} key={q.questionId} className="relative group w-full flex items-center">
                    {/* Timeline Node */}
                    <div className="absolute left-[1px] sm:left-[5px] top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-[3px] border-white bg-slate-300 shadow-sm z-10 transition-all duration-300 group-hover:bg-[var(--accent)] group-hover:scale-125"></div>

                    <div className="w-full pl-8 sm:pl-12">
                      <button
                        onClick={() => handleSelectQuestion(q)}
                        className="w-full flex flex-col sm:flex-row sm:items-center text-left p-4 sm:p-5 border transition-all duration-300 rounded-3xl relative overflow-hidden bg-white hover:bg-slate-50 border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:border-slate-200 hover:shadow-md hover:-translate-y-0.5"
                      >
                        <div className={`w-1.5 h-full absolute left-0 top-0 ${colorConfig.tagBg} transition-colors group-hover:bg-[var(--accent)]`}></div>
                        
                        <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-white border border-slate-100 shrink-0 mr-4 md:mr-5 hidden sm:flex group-hover:scale-110 group-hover:bg-[var(--accent)] group-hover:border-[var(--accent)] transition-all duration-300 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
                          <BookOpen className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors duration-300" />
                        </div>

                        <div className="flex-1 min-w-0 pr-4">
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            <span className={`text-[9px] px-2.5 py-0.5 rounded-md font-bold tracking-wider uppercase ${colorConfig.tagBg} ${colorConfig.tagText} border border-white group-hover:border-[var(--accent)]/10 transition-colors`}>
                              {q.subject}
                            </span>
                            {q.isCorrect === false && (
                              <span className="text-[9px] px-2.5 py-0.5 rounded-md font-bold tracking-wider uppercase bg-rose-50 text-rose-600 border border-rose-100">
                                Pernah Salah
                              </span>
                            )}
                            {q.difficulty >= 4 && (
                              <span className="text-[9px] px-2.5 py-0.5 rounded-md font-bold tracking-wider uppercase bg-orange-50 text-orange-600 border border-orange-100 flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse"></span> HOTS
                              </span>
                            )}
                          </div>
                          <p className="text-sm md:text-[15px] text-slate-700 line-clamp-1 sm:line-clamp-2 group-hover:text-slate-900 transition-colors font-medium leading-relaxed">
                            {q.text || "Teks soal tidak tersedia"}
                          </p>
                        </div>

                        <div className="shrink-0 mt-3 sm:mt-0 flex items-center justify-end">
                          <div className="flex items-center justify-center px-4 py-2 rounded-xl font-bold text-sm bg-slate-100 text-slate-500 group-hover:bg-[var(--accent)] group-hover:text-white transition-all duration-300 gap-1.5">
                            Bahas <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-0.5 transition-transform"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                          </div>
                        </div>
                      </button>
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>
          </>
        )}
        </div>
      </motion.div>
    )
  }

  const filteredQs = questions.filter(
    (q) => !selectedSubjectFilter || q.subject === selectedSubjectFilter
  )
  const currentIndex = filteredQs.findIndex(q => q.questionId === selectedQuestion.questionId)
  const prevQ = currentIndex > 0 ? filteredQs[currentIndex - 1] : null
  const nextQ = currentIndex !== -1 && currentIndex < filteredQs.length - 1 ? filteredQs[currentIndex + 1] : null

  return (
    <motion.div variants={stagger} initial="hidden" animate="show" className="h-full flex flex-col bg-white rounded-[2rem] relative overflow-hidden">
         {/* ─── Top Purple Section ─── */}
      <motion.div variants={fadeUp} className="bg-[var(--accent)] text-white px-8 py-8 md:px-10 md:py-10 relative shrink-0 z-10 shadow-lg">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -ml-10 -mb-10"></div>
        
        <div className="flex items-start gap-5 relative z-10">
          <button onClick={clearQuestion} className="shrink-0 mt-0.5 w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-all backdrop-blur-sm shadow-sm group">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-1 transition-transform"><path d="m15 18-6-6 6-6"/></svg>
          </button>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-[10px] font-bold tracking-widest uppercase bg-white/20 px-3 py-1.5 rounded-full shadow-sm">
                {selectedQuestion.subject}
              </span>
            </div>
            <div className="text-lg md:text-xl font-medium leading-relaxed max-h-48 overflow-y-auto no-scrollbar">
              <MarkdownRenderer content={selectedQuestion.text} variant="dark" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* ─── Options Section ─── */}
      <motion.div variants={scaleIn} className="flex-1 bg-slate-50/50 p-6 overflow-y-auto no-scrollbar">
        <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-4 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span> Pilihan Jawaban
        </p>
        <div className="flex flex-col gap-2">
          {(selectedQuestion.options ?? []).length === 0 ? (
            /* fallback */
            <div className="grid grid-cols-1 gap-2">
              <div className="p-3 bg-rose-50 rounded-xl border border-rose-100">
                <p className="text-[10px] uppercase tracking-widest text-rose-500 font-bold mb-1">Jawabanmu</p>
                <p className="text-sm text-slate-700 font-medium">{selectedQuestion.selectedAnswer}</p>
              </div>
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100">
                <p className="text-[10px] uppercase tracking-widest text-emerald-600 font-bold mb-1">Jawaban Benar</p>
                <p className="text-sm text-slate-700 font-medium">{selectedQuestion.correctAnswer}</p>
              </div>
            </div>
          ) : (
            selectedQuestion.options.map((opt) => {
              const isSelected = selectedQuestion.selectedIds.includes(opt.id)
              const isCorrect  = opt.isCorrect

              let containerCls = "p-4 md:p-5 rounded-3xl border flex items-start gap-4 transition-all duration-300 bg-white hover:bg-slate-50 border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:border-slate-200 hover:shadow-md"
              let labelCls     = "w-10 h-10 md:w-11 md:h-11 rounded-[0.85rem] shrink-0 flex items-center justify-center text-base md:text-lg font-bold border transition-colors duration-300 "
              let textCls      = "text-[15px] md:text-base text-slate-600 font-medium leading-relaxed flex-1 mt-1"
              let statusTag: React.ReactNode = null

              if (isCorrect) {
                containerCls = "p-4 md:p-5 rounded-3xl border flex items-start gap-4 transition-all duration-300 bg-emerald-50 border-emerald-200 shadow-sm opacity-90"
                labelCls = "w-10 h-10 md:w-11 md:h-11 rounded-[0.85rem] shrink-0 flex items-center justify-center text-base md:text-lg font-bold border bg-emerald-500 text-white border-emerald-600 shadow-sm"
                textCls  = "text-[15px] md:text-base text-emerald-900 font-semibold leading-relaxed flex-1 mt-1"
                statusTag = <span className="text-[10px] ml-auto shrink-0 mt-2 font-bold text-emerald-600 bg-emerald-100/80 px-3 py-1.5 rounded-full uppercase tracking-wider shadow-sm border border-emerald-200/50">Tepat</span>
              } else if (isSelected) {
                containerCls = "p-4 md:p-5 rounded-3xl border flex items-start gap-4 transition-all duration-300 bg-rose-50/50 border-rose-200 shadow-sm opacity-90"
                labelCls = "w-10 h-10 md:w-11 md:h-11 rounded-[0.85rem] shrink-0 flex items-center justify-center text-base md:text-lg font-bold border bg-rose-500 text-white border-rose-600 shadow-sm"
                textCls  = "text-[15px] md:text-base text-rose-900 font-semibold leading-relaxed flex-1 mt-1"
                statusTag = <span className="text-[10px] ml-auto shrink-0 mt-2 font-bold text-rose-600 bg-rose-100/80 px-3 py-1.5 rounded-full uppercase tracking-wider shadow-sm border border-rose-200/50">Jawabanmu</span>
              } else {
                labelCls += "bg-slate-50 text-slate-500 border-slate-200 group-hover:bg-slate-100 group-hover:text-slate-700 group-hover:border-slate-300"
              }

              return (
                <div key={opt.id} className={`${containerCls} group`}>
                  <span className={labelCls}>{opt.label}</span>
                  <div className={textCls}>
                    <MarkdownRenderer content={opt.text} />
                  </div>
                  {statusTag}
                </div>
              )
            })
          )}
        </div>

        {/* ─── Bottom Navigation Hub ─── */}
        <div className="mt-10 pt-8 border-t border-slate-100 flex flex-col gap-8">
          
          {/* Next / Prev Buttons */}
          <div className="flex items-center justify-between gap-4">
            <button
              onClick={() => prevQ && handleSelectQuestion(prevQ)}
              disabled={!prevQ}
              className={`flex-1 py-4 px-5 rounded-[1.25rem] font-bold text-sm flex items-center justify-center gap-3 transition-all ${
                prevQ ? "bg-slate-100 text-slate-700 hover:bg-slate-200" : "bg-slate-50 text-slate-300 cursor-not-allowed"
              }`}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
              Sebelumnya
            </button>
            <button
              onClick={() => nextQ && handleSelectQuestion(nextQ)}
              disabled={!nextQ}
              className={`flex-1 py-4 px-5 rounded-[1.25rem] font-bold text-sm flex items-center justify-center gap-3 transition-all ${
                nextQ ? "bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)] shadow-md hover:shadow-lg hover:-translate-y-0.5" : "bg-slate-50 text-slate-300 cursor-not-allowed"
              }`}
            >
              Selanjutnya
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            </button>
          </div>

          {/* Subject Filter & Snippets */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
              <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[var(--accent)]"></div>
                Daftar Soal
              </h3>
              <select 
                value={selectedSubjectFilter || "ALL"}
                onChange={(e) => {
                  const val = e.target.value === "ALL" ? null : e.target.value
                  setSelectedSubjectFilter(val)
                }}
                className="bg-slate-50 border border-slate-200 text-slate-700 text-xs font-semibold rounded-xl px-4 py-2.5 outline-none focus:border-[var(--accent)] transition-colors cursor-pointer hover:bg-slate-100"
              >
                <option value="ALL">Semua Kategori</option>
                {Array.from(new Set(questions.map((q) => q.subject))).map(subj => (
                  <option key={subj} value={subj}>{subj}</option>
                ))}
              </select>
            </div>
            
            <div className="flex flex-col gap-3 max-h-[360px] overflow-y-auto no-scrollbar pr-2 pb-4">
              {filteredQs.map((q, idx) => {
                const isCurrent = q.questionId === selectedQuestion.questionId;
                const colorConfig = subjectColors[q.subject] || subjectColors.default;
                return (
                  <button
                    key={q.questionId}
                    onClick={() => handleSelectQuestion(q)}
                    className={`w-full shrink-0 flex flex-col text-left p-4 border transition-all rounded-3xl group relative overflow-hidden ${
                      isCurrent 
                        ? `bg-[var(--accent)]/5 ${colorConfig.border} shadow-sm ring-1 ring-[var(--accent)]` 
                        : "bg-white border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:border-slate-200 hover:shadow-md"
                    }`}
                  >
                    <div className={`w-1.5 h-full absolute left-0 top-0 ${isCurrent ? colorConfig.tagBg : 'bg-slate-200 group-hover:bg-slate-300'} transition-colors`}></div>
                    
                    <div className="pl-3">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className={`text-[9px] px-2.5 py-0.5 rounded-md font-bold tracking-wider uppercase ${isCurrent ? colorConfig.tagBg + ' ' + colorConfig.tagText : 'bg-slate-100 text-slate-500'}`}>
                          {q.subject}
                        </span>
                      </div>
                      <p className={`text-sm line-clamp-2 transition-colors font-medium leading-relaxed ${isCurrent ? 'text-slate-900' : 'text-slate-600 group-hover:text-slate-900'}`}>
                        {q.text || "Teks soal tidak tersedia"}
                      </p>
                    </div>
                  </button>
                )
              })}
            </div>
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
