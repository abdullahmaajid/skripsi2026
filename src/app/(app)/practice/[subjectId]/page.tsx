"use client"

import { useState, useEffect, use } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import {
  ArrowLeft, ChevronRight, Loader2, CheckCircle2, XCircle,
  BookOpen, RotateCcw, Trophy
} from "lucide-react"
import { useTutorChatStore } from "@/store/useTutorChatStore"
import MarkdownRenderer from "@/components/ui/MarkdownRenderer"
import StatusSoal from "@/components/ui/StatusSoal"
import FallbackHint from "@/components/ui/FallbackHint"

interface PracticeOption {
  id: string
  label: string
  text: string
  isCorrect: boolean
}

interface PracticeQuestion {
  id: string
  text: string
  type: string
  difficulty: number
  subject: string
  subjectId: string
  chapter: string
  options: PracticeOption[]
}

export default function PracticeSessionPage({ params }: { params: Promise<{ subjectId: string }> }) {
  const { subjectId } = use(params)
  const router = useRouter()
  const searchParams = useSearchParams()
  const chapterId = searchParams.get("chapterId")

  // Questions & progress
  const [questions, setQuestions] = useState<PracticeQuestion[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null)
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const [sessionDone, setSessionDone] = useState(false)

  // Review mode
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({})
  const [showReview, setShowReview] = useState(false)
  const [reviewIndex, setReviewIndex] = useState(0)

  // Stats
  const [correctCount, setCorrectCount] = useState(0)
  const [totalAnswered, setTotalAnswered] = useState(0)

  // Learning Scaffolding attempts
  const [attemptsUsed, setAttemptsUsed] = useState(0)
  // Scaffold level is now managed by the global tutor store (useTutorChatStore)
  const [incorrectOptions, setIncorrectOptions] = useState<string[]>([])

  const currentQ = questions[currentIndex] || null
  const { setSelectedQuestion, clearQuestion, setScaffoldLevel } = useTutorChatStore()

  // Clear chat context when unmounting or leaving
  useEffect(() => {
    return () => clearQuestion()
  }, [clearQuestion])

  // Fetch questions
  useEffect(() => {
    async function load() {
      try {
        const query = chapterId 
          ? `?subjectId=${subjectId}&chapterId=${chapterId}&limit=10` 
          : `?subjectId=${subjectId}&limit=10`
        const res = await fetch(`/api/practice/questions${query}`)
        if (res.ok) {
          const data = await res.json()
          setQuestions(data.questions || [])
        }
      } catch (err) {
        console.error("Failed to load practice questions:", err)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [subjectId, chapterId])

  // Submit answer
  const handleSubmit = async () => {
    if (!selectedOptionId || !currentQ) return

    const selected = currentQ.options.find((o) => o.id === selectedOptionId)
    const correct = currentQ.options.find((o) => o.isCorrect)

    // Determine scaffold level based on attempt count BEFORE increment
    const nextAttempts = attemptsUsed + 1
    let level: 'SOCRATIC' | 'HINT' | 'SOLUTION' = 'SOCRATIC'
    if (nextAttempts === 1) level = 'SOCRATIC'
    else if (nextAttempts === 2) level = 'HINT'
    else level = 'SOLUTION'
    // Update global scaffold level for AI Tutor
    setScaffoldLevel(level)

    if (selected?.isCorrect) {
      // Track that user has practiced at least once
      localStorage.setItem("has_practiced", "true")

      if (!userAnswers[currentQ.id]) {
        setUserAnswers(prev => ({ ...prev, [currentQ.id]: selectedOptionId }))
      }
      setCorrectCount((p) => p + 1)
      setTotalAnswered((p) => p + 1)
      setHasSubmitted(true)

        setSelectedQuestion({
          questionId: currentQ.id,
          text: currentQ.text,
          subject: currentQ.subject,
          selectedAnswer: selected ? `${selected.label}. ${selected.text}` : "Tidak dijawab",
          correctAnswer: correct ? `${correct.label}. ${correct.text}` : "—",
          difficulty: currentQ.difficulty,
          options: currentQ.options,
          selectedIds: [selectedOptionId],
          isSecondChance: false,
        })
    } else {
      if (!userAnswers[currentQ.id]) {
        setUserAnswers(prev => ({ ...prev, [currentQ.id]: selectedOptionId }))
      }
      setAttemptsUsed(nextAttempts)
      setIncorrectOptions((prev) => [...prev, selectedOptionId])
      setSelectedOptionId(null)

      if (nextAttempts >= 2) {
        // Track that user has practiced at least once
        localStorage.setItem("has_practiced", "true")

        setTotalAnswered((p) => p + 1)
        setHasSubmitted(true)
        setSelectedQuestion({
          questionId: currentQ.id,
          text: currentQ.text,
          subject: currentQ.subject,
          selectedAnswer: selected ? `${selected.label}. ${selected.text}` : "Tidak dijawab",
          correctAnswer: correct ? `${correct.label}. ${correct.text}` : "—",
          difficulty: currentQ.difficulty,
          options: currentQ.options,
          selectedIds: [selectedOptionId],
          isSecondChance: false,
        })
      } else {
        // Second chance – hide answer, mark as second chance
        setSelectedQuestion({
          questionId: currentQ.id,
          text: currentQ.text,
          subject: currentQ.subject,
          selectedAnswer: selected ? `${selected.label}. ${selected.text}` : "Tidak dijawab",
          correctAnswer: "???",
          difficulty: currentQ.difficulty,
          options: currentQ.options,
          selectedIds: [selectedOptionId],
          isSecondChance: true,
        })
      }
    }
  }

  // Next question
  const handleNext = () => {
    if (currentIndex >= questions.length - 1) {
      if (chapterId) {
        fetch("/api/practice/submit-progress", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ chapterId, correctCount, totalAnswered })
        }).catch(e => console.error("Failed to submit progress", e))
      }
      setSessionDone(true)
      return
    }
    setCurrentIndex((p) => p + 1)
    setSelectedOptionId(null)
    setHasSubmitted(false)
    setAttemptsUsed(0)
    setIncorrectOptions([])
    clearQuestion()
  }

  // Loading
  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-slate-400" />
      </div>
    )
  }

  // No questions
  if (questions.length === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-8 text-center">
        <BookOpen className="w-16 h-16 text-slate-300 mb-4" />
        <h2 className="text-xl font-semibold text-slate-700 mb-2">Belum Ada Soal</h2>
        <p className="text-slate-500 mb-6">Subtes ini belum memiliki soal latihan.</p>
        <button onClick={() => router.push("/practice")} className="px-6 py-3 bg-[var(--accent)] rounded-xl text-white font-semibold hover:bg-[var(--accent-hover)] transition-colors shadow-sm">
          Kembali
        </button>
      </div>
    )
  }

  // Session complete
  if (sessionDone) {
    const pct = totalAnswered > 0 ? Math.round((correctCount / totalAnswered) * 100) : 0
    return (
      <div className="h-full flex flex-col items-center justify-center p-8 text-center">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="max-w-sm w-full bg-white rounded-[2rem] p-10 shadow-lg border border-slate-100 flex flex-col items-center">
          <div className="w-20 h-20 rounded-full bg-[var(--accent)]/10 flex items-center justify-center mb-6">
            <Trophy className="w-10 h-10 text-[var(--accent)]" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Sesi Selesai!</h2>
          <p className="text-slate-500 mb-6 text-sm">Ini adalah mode belajar — nilai tidak masuk ke dashboard.</p>

          <div className="grid grid-cols-3 gap-3 w-full mb-8">
            <div className="p-3 bg-green-50 rounded-2xl border border-green-100">
              <p className="text-[10px] uppercase tracking-wider text-green-600 font-bold mb-1">Benar</p>
              <p className="text-xl font-bold text-green-600">{correctCount}</p>
            </div>
            <div className="p-3 bg-rose-50 rounded-2xl border border-rose-100">
              <p className="text-[10px] uppercase tracking-wider text-rose-500 font-bold mb-1">Salah</p>
              <p className="text-xl font-bold text-rose-500">{totalAnswered - correctCount}</p>
            </div>
            <div className="p-3 bg-[var(--accent)]/5 rounded-2xl border border-[var(--accent)]/10">
              <p className="text-[10px] uppercase tracking-wider text-[var(--accent)] font-bold mb-1">Akurasi</p>
              <p className="text-xl font-bold text-[var(--accent)]">{pct}%</p>
            </div>
          </div>

          <div className="w-full space-y-2">
            <button onClick={() => { setSessionDone(false); setCurrentIndex(0); setCorrectCount(0); setTotalAnswered(0); setSelectedOptionId(null); setHasSubmitted(false); setAttemptsUsed(0); setIncorrectOptions([]); clearQuestion(); setUserAnswers({}); setShowReview(false); }} className="w-full py-3.5 bg-[var(--accent)] text-white font-semibold rounded-xl hover:bg-[var(--accent-hover)] transition-colors flex items-center justify-center gap-2 shadow-sm">
              <RotateCcw className="w-4 h-4" /> Ulangi Latihan
            </button>
            <button onClick={() => { setSessionDone(false); setShowReview(true); setReviewIndex(0); }} className="w-full py-3.5 bg-indigo-50 text-indigo-600 font-semibold rounded-xl hover:bg-indigo-100 transition-colors border border-indigo-100">
              Lihat Pembahasan
            </button>
            <button onClick={() => router.push("/practice")} className="w-full py-3.5 bg-slate-50 text-slate-600 font-semibold rounded-xl hover:bg-slate-100 transition-colors border border-slate-100">
              Pilih Subtes Lain
            </button>
          </div>
        </motion.div>
      </div>
    )
  }

  // Feedback after submit
  const selectedOpt = currentQ?.options.find((o) => o.id === selectedOptionId)
  const correctOpt = currentQ?.options.find((o) => o.isCorrect)
  const isCorrect = selectedOpt?.isCorrect === true

  if (showReview) {
    const revQ = questions[reviewIndex]
    const userSelectedId = userAnswers[revQ.id]
    
    return (
      <div className="h-full flex flex-col lg:flex-row overflow-hidden bg-white">
        <aside className="w-full lg:w-[320px] border-b lg:border-b-0 lg:border-r border-slate-100 bg-slate-50/50 flex flex-col shrink-0 h-[30vh] lg:h-full overflow-y-auto no-scrollbar">
          <div className="p-6">
            <button onClick={() => setShowReview(false)} className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-800 mb-6 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Kembali ke Hasil
            </button>
            <h3 className="font-bold text-slate-800 text-sm mb-4">Navigasi Review</h3>
            <div className="grid grid-cols-5 gap-2.5">
              {questions.map((q, idx) => {
                const isCurrent = idx === reviewIndex
                const ansId = userAnswers[q.id]
                const correct = q.options.find(o => o.isCorrect)?.id === ansId
                let bg = "bg-white text-slate-500 border-slate-200"
                if (correct) bg = "bg-emerald-50 text-emerald-600 border-emerald-200"
                else if (ansId) bg = "bg-rose-50 text-rose-600 border-rose-200"
                if (isCurrent) bg += " ring-2 ring-[var(--accent)] ring-offset-1 border-transparent shadow-sm"

                return (
                  <button key={q.id} onClick={() => setReviewIndex(idx)} className={`aspect-square rounded-xl flex items-center justify-center font-bold text-xs border transition-all ${bg}`}>
                    {idx + 1}
                  </button>
                )
              })}
            </div>
          </div>
        </aside>
        
        <main className="flex-1 overflow-y-auto p-6 md:p-12">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-800 mb-6 pb-4 border-b border-slate-100">Soal {reviewIndex + 1}</h2>
            <div className="text-lg text-slate-800 font-medium leading-relaxed mb-8"><MarkdownRenderer content={revQ.text} /></div>
            <div className="space-y-3 mb-10">
              {revQ.options.map(opt => {
                const isSelected = userAnswers[revQ.id] === opt.id
                let containerCls = "p-4 rounded-2xl border flex items-start gap-4 transition-all "
                let labelCls = "w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm shrink-0 border "
                let statusIcon = null

                if (opt.isCorrect && isSelected) {
                  containerCls += "bg-emerald-50 border-emerald-200 shadow-sm"
                  labelCls += "bg-emerald-500 text-white border-transparent"
                  statusIcon = <span className="text-[10px] uppercase tracking-wider font-bold text-emerald-700 bg-emerald-100 px-2 py-1 rounded-md ml-auto">Jawabanmu Benar</span>
                } else if (opt.isCorrect && !isSelected) {
                  containerCls += "bg-emerald-50/40 border-emerald-200"
                  labelCls += "bg-emerald-500 text-white border-transparent"
                  statusIcon = <span className="text-[10px] uppercase tracking-wider font-bold text-emerald-700 bg-emerald-100 px-2 py-1 rounded-md ml-auto">Kunci Jawaban</span>
                } else if (!opt.isCorrect && isSelected) {
                  containerCls += "bg-rose-50 border-rose-200 shadow-sm"
                  labelCls += "bg-rose-500 text-white border-transparent"
                  statusIcon = <span className="text-[10px] uppercase tracking-wider font-bold text-rose-700 bg-rose-100 px-2 py-1 rounded-md ml-auto">Jawabanmu Salah</span>
                } else {
                  containerCls += "bg-white border-slate-150"
                  labelCls += "bg-slate-50 text-slate-500 border-slate-200"
                }

                return (
                  <div key={opt.id} className={containerCls}>
                    <div className={labelCls}>{opt.label}</div>
                    <div className="text-sm md:text-base font-medium text-slate-700 flex-1"><MarkdownRenderer content={opt.text} /></div>
                    {statusIcon}
                  </div>
                )
              })}
            </div>
            
            <button
              onClick={() => {
                const correctO = revQ.options.find(o => o.isCorrect)
                const selectedO = revQ.options.find(o => o.id === userAnswers[revQ.id])
                setSelectedQuestion({
                  questionId: revQ.id,
                  text: revQ.text,
                  subject: revQ.subject,
                  selectedAnswer: selectedO ? `${selectedO.label}. ${selectedO.text}` : "Tidak menjawab",
                  correctAnswer: correctO ? `${correctO.label}. ${correctO.text}` : "—",
                  difficulty: revQ.difficulty,
                  options: revQ.options,
                  selectedIds: [userAnswers[revQ.id]].filter(Boolean) as string[],
                  isSecondChance: false,
                  autoTriggerExplanation: true
                })
              }}
              className="px-6 py-3 bg-[var(--accent)] text-white font-bold rounded-xl shadow-sm hover:bg-[var(--accent-hover)] transition-all flex items-center gap-2"
            >
              <BookOpen className="w-4 h-4" /> Tanya Pembahasan AI Tutor
            </button>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col overflow-hidden">

      {/* ─── Question Panel ─── */}
      <div className="flex-1 flex flex-col overflow-y-auto no-scrollbar">
        {/* Top bar */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-white/80 backdrop-blur-md sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <button onClick={() => router.push("/practice")} className="w-8 h-8 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center hover:bg-slate-100 transition-colors">
              <ArrowLeft className="w-4 h-4 text-slate-500" />
            </button>
            <div>
              <p className="text-xs font-bold text-[var(--accent)] tracking-wider uppercase">{currentQ?.subject}</p>
              <p className="text-[10px] text-slate-400 font-medium">{currentQ?.chapter} · b = {currentQ?.difficulty}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-medium">
              Soal {currentIndex + 1} / {questions.length}
            </span>
            <div className="flex gap-1">
              {questions.map((_, i) => (
                <div key={i} className={`w-2 h-2 rounded-full transition-colors ${i === currentIndex ? "bg-[var(--accent)]" : i < currentIndex ? "bg-green-400" : "bg-slate-200"}`} />
              ))}
            </div>
   {/* Status soal: gabungkan counter dan progress */}
   <StatusSoal attemptsUsed={attemptsUsed} progress={questions.length === 0 ? 0 : (currentIndex + 1) / questions.length} />
          </div>
        </div>

        {/* Question */}
        <div className="flex-1 p-6 md:p-8">
          <motion.div key={currentQ?.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }} className="max-w-2xl mx-auto">
            <div className="text-lg md:text-xl text-slate-800 font-medium leading-relaxed mb-8">
              <MarkdownRenderer content={currentQ?.text || ""} />
            </div>

            <div className="flex flex-col gap-3">
              {currentQ?.options.map((opt) => {
                const isSelected = selectedOptionId === opt.id
                const isCorrectOpt = opt.isCorrect
                const isPreviouslyWrong = incorrectOptions.includes(opt.id)

                let cls = "p-4 rounded-[1.25rem] border flex items-start gap-3 transition-all cursor-pointer "
                let labelCls = "w-8 h-8 rounded-xl shrink-0 flex items-center justify-center text-sm font-bold border transition-all "
                let statusIcon: React.ReactNode = null

                if (!hasSubmitted) {
                  // Pre-submit
                  if (isPreviouslyWrong) {
                    cls += "bg-rose-50/40 border-rose-200 opacity-60 cursor-not-allowed"
                    labelCls += "bg-rose-100 text-rose-600 border-rose-200"
                    statusIcon = <XCircle className="w-5 h-5 text-rose-400 ml-auto shrink-0" />
                  } else if (isSelected) {
                    cls += "bg-[var(--accent)]/5 border-[var(--accent)] shadow-[0_0_15px_rgba(193,119,249,0.1)]"
                    labelCls += "bg-[var(--accent)] text-white border-[var(--accent)]"
                  } else {
                    cls += "bg-white border-slate-150 hover:border-slate-300 hover:bg-slate-50"
                    labelCls += "bg-slate-50 text-slate-500 border-slate-200"
                  }
                } else {
                  // Post-submit
                  if (isCorrectOpt && isSelected) {
                    cls += "bg-[hsl(150,90%,96%)] border-[hsl(150,80%,75%)]"
                    labelCls += "bg-[hsl(150,75%,45%)] text-white border-[hsl(150,75%,40%)]"
                    statusIcon = <CheckCircle2 className="w-5 h-5 text-[hsl(150,75%,40%)] ml-auto shrink-0" />
                  } else if (isCorrectOpt && !isSelected) {
                    cls += "bg-[hsl(150,90%,96%)] border-[hsl(150,80%,75%)]"
                    labelCls += "bg-[hsl(150,75%,45%)] text-white border-[hsl(150,75%,40%)]"
                    statusIcon = <span className="text-[10px] ml-auto shrink-0 font-bold text-[hsl(150,75%,40%)]">Jawaban Benar</span>
                  } else if (!isCorrectOpt && isSelected) {
                    cls += "bg-[hsl(340,90%,96%)] border-[hsl(340,80%,85%)]"
                    labelCls += "bg-[hsl(340,75%,55%)] text-white border-[hsl(340,75%,50%)]"
                    statusIcon = <XCircle className="w-5 h-5 text-[hsl(340,75%,50%)] ml-auto shrink-0" />
                  } else {
                    cls += "bg-slate-50 border-slate-100 opacity-60"
                    labelCls += "bg-slate-100 text-slate-400 border-slate-200"
                  }
                  cls += " cursor-default"
                }

                return (
                  <motion.button
                    whileHover={{ scale: !hasSubmitted && !isPreviouslyWrong ? 1.01 : 1 }}
                    whileTap={{ scale: !hasSubmitted && !isPreviouslyWrong ? 0.98 : 1 }}
                    key={opt.id}
                    onClick={() => !hasSubmitted && !isPreviouslyWrong && setSelectedOptionId(opt.id)}
                    disabled={hasSubmitted || isPreviouslyWrong}
                    className={cls}
                  >
                    <span className={labelCls}>{opt.label}</span>
                    <div className="text-sm text-slate-700 font-medium leading-relaxed flex-1 pt-1"><MarkdownRenderer content={opt.text} /></div>
                    {statusIcon}
                  </motion.button>
                )
              })}
            </div>

            {/* Inline feedback for active second attempt */}
            {!hasSubmitted && attemptsUsed > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-4 rounded-2xl border border-amber-200 bg-amber-50"
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="animate-pulse w-2 h-2 rounded-full bg-amber-500" />
                  <span className="text-sm font-bold text-amber-700">Kesempatan Kedua Aktif</span>
                </div>
                <p className="text-xs text-amber-600 mt-1">
                  Pilihan jawaban pertamamu belum tepat. Coba pikirkan kembali konsep soal ini, atau langsung tanya dan diskusikan di **AI Tutor panel kanan** untuk petunjuk tambahan!
                </p>
              </motion.div>
            )}

            {/* Inline feedback after submit */}
            {hasSubmitted && (
              <>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mt-6 p-4 rounded-2xl border ${isCorrect ? "bg-emerald-50 border-emerald-200" : "bg-rose-50 border-rose-200"}`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    {isCorrect
                      ? <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      : <XCircle className="w-5 h-5 text-rose-500" />
                    }
                    <span className={`text-sm font-bold ${isCorrect ? "text-emerald-700" : "text-rose-600"}`}>{isCorrect ? "Benar!" : "Belum Tepat"}</span>
                  </div>
                  {!isCorrect && (
                    <div className="text-sm text-rose-600 mt-1 flex items-baseline gap-1">
                      Jawaban benar: <span className="font-semibold inline-flex items-baseline gap-1">{correctOpt?.label}. <MarkdownRenderer content={correctOpt?.text || ""} /></span>
                    </div>
                  )}
                  <p className="text-xs text-slate-500 mt-2">
                    Gunakan AI Tutor di panel kanan untuk bertanya lebih lanjut tentang soal ini.
                  </p>
                </motion.div>
                {/* Button to view explanation for current question */}
                <button
                  onClick={() => {
                    const correctO = currentQ?.options.find(o => o.isCorrect)
                    const selectedO = currentQ?.options.find(o => o.id === selectedOptionId)
                    setSelectedQuestion({
                      questionId: currentQ!.id,
                      text: currentQ!.text,
                      subject: currentQ!.subject,
                      selectedAnswer: selectedO ? `${selectedO.label}. ${selectedO.text}` : "Tidak menjawab",
                      correctAnswer: correctO ? `${correctO.label}. ${correctO.text}` : "—",
                      difficulty: currentQ!.difficulty,
                      options: currentQ!.options,
                      selectedIds: [selectedOptionId].filter(Boolean) as string[],
                      isSecondChance: false,
                      autoTriggerExplanation: true
                    })
                  }}
                  className="mt-4 px-6 py-2 bg-[var(--accent)] text-white rounded-md hover:bg-[var(--accent-hover)] transition-colors"
                >
                  Lihat Pembahasan Lengkap AI
                </button>
              </>
            )}
          </motion.div>
        </div>

        {/* Bottom action */}
        <div className="p-5 border-t border-slate-100 bg-white/80 backdrop-blur-md sticky bottom-0 z-10 flex justify-end gap-3">
          {!hasSubmitted ? (
            <button
              onClick={handleSubmit}
              disabled={!selectedOptionId}
              className="px-8 py-3 bg-[var(--accent)] text-white font-semibold rounded-xl hover:bg-[var(--accent-hover)] disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-sm flex items-center gap-2"
            >
              Jawab
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="px-8 py-3 bg-[var(--accent)] text-white font-semibold rounded-xl hover:bg-[var(--accent-hover)] transition-all shadow-sm flex items-center gap-2"
            >
              {currentIndex >= questions.length - 1 ? "Lihat Hasil" : "Soal Berikutnya"}
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
