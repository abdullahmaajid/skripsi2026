"use client"

import { useEffect, useState, use, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useCbtStore, Question } from "@/store/useCbtStore"
import { Clock, Flag, ChevronLeft, ChevronRight, LayoutGrid, CheckCircle2, Loader2, AlertTriangle, Sparkles } from "lucide-react"
import { motion } from "framer-motion"
import MarkdownRenderer from "@/components/ui/MarkdownRenderer"

function NavigationGrid({ questions, answers, flagged, currentIndex, isAdaptive, totalItems, sections, currentSectionIndex, goToQuestion }: {
  questions: Question[]
  answers: Record<string, string[]>
  flagged: Record<string, boolean>
  currentIndex: number
  isAdaptive: boolean
  totalItems: number
  sections: any[]
  currentSectionIndex: number
  goToQuestion: (idx: number) => void
}) {
  return (
    <div className="py-3">
      <h3 className="font-bold text-slate-800 flex items-center gap-2 text-xs md:text-sm mb-2 md:mb-3">
        <LayoutGrid className="w-4 h-4 md:w-5 md:h-5 text-[var(--accent)]" /> Navigasi Soal
      </h3>
      <div className="grid grid-cols-6 md:grid-cols-6 gap-1.5 md:gap-2">
        {questions.map((q, idx) => {
          const answered = (answers[q.id]?.length || 0) > 0;
          const flag = flagged[q.id];
          const isCurrent = idx === currentIndex;
          const currentSectionSubject = sections[currentSectionIndex]?.subjectName
          const isLockedSection = sections.length > 0 && currentSectionSubject && q.subject !== currentSectionSubject
          
          let bg = "bg-slate-50 hover:bg-slate-100 text-slate-500 border-slate-200"
          if (isLockedSection) bg = "bg-slate-100 text-slate-300 border-slate-100 cursor-not-allowed"
          else if (answered) bg = "bg-emerald-50 text-emerald-600 border-emerald-200"
          if (flag && !isLockedSection) bg = "bg-amber-50 text-amber-600 border-amber-200"
          if (isCurrent) bg = "bg-[var(--pastel-purple)] border-[var(--accent)] text-[var(--accent-dark)] shadow-[0_0_0_2px_rgba(193,119,249,0.15)]"

          return (
            <button
              key={q.id}
              onClick={() => {
                if (!isAdaptive && !isLockedSection) {
                  goToQuestion(idx);
                }
              }}
              disabled={isAdaptive || !!isLockedSection}
              title={isLockedSection ? `Terkunci — bagian ${q.subject}` : undefined}
              className={`aspect-square rounded-lg flex items-center justify-center font-bold text-xs md:text-sm border transition-all ${bg}`}
            >
              {idx + 1}
            </button>
          )
        })}
        {isAdaptive && Array.from({ length: Math.max(0, totalItems - questions.length) }).map((_, i) => (
          <div key={`placeholder-${i}`} className="aspect-square rounded-lg flex items-center justify-center font-bold text-xs md:text-sm border border-dashed border-slate-200 text-slate-300">
            {questions.length + i + 1}
          </div>
        ))}
      </div>
      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[10px] md:text-xs text-slate-500 font-medium">
        <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded bg-emerald-100 border border-emerald-200" /> Terjawab</div>
        <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded bg-amber-100 border border-amber-200" /> Ragu-ragu</div>
        <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded bg-slate-50 border border-slate-200" /> Belum</div>
      </div>
    </div>
  )
}

function CbtEngineContent({ templateId }: { templateId: string }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const isOnboarding = searchParams.get("onboarding") === "true"

  const { 
    attemptId, questions, currentIndex, answers, flagged, timeLeft, sectionTimeLeft, isFinished, questionTimes,
    isAdaptive, totalItems, lastQuestionTimestamp, sections, currentSectionIndex,
    initExam, decrementTime, nextQuestion, prevQuestion, goToQuestion, moveToNextSection, toggleAnswer, toggleFlag, finishExam, appendQuestion 
  } = useCbtStore()

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [result, setResult] = useState<{ rawScore: number; theta: number; scaledScore: number; correct: number; total: number } | null>(null)

  // Fetch questions from API on mount
  useEffect(() => {
    async function startExam() {
      try {
        setLoading(true)
        // TODO: get userId from session in a real app
        const res = await fetch("/api/tryout/start", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ templateId }),
        })
        const data = await res.json()
        if (!res.ok) throw new Error(data.error || "Gagal memulai ujian")

        const payload = data.data || data
        const mappedQuestions: Question[] = (payload.questions || []).map((q: any) => ({
          id: q.id,
          text: q.text,
          type: q.type,
          subject: q.subject,
          options: q.options.map((o: any) => ({ id: o.id, label: o.label, text: o.text })),
        }))
        initExam(payload.attemptId, mappedQuestions, payload.duration, payload.isAdaptive, payload.totalItems, payload.sections)
      } catch (err: any) {
        setError(err.message || "Terjadi kesalahan")
      } finally {
        setLoading(false)
      }
    }

    if (questions.length === 0) {
      startExam()
    } else {
      setLoading(false)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Timer
  useEffect(() => {
    if (loading || isFinished) return
    const timer = setInterval(() => { decrementTime() }, 1000)
    return () => clearInterval(timer)
  }, [loading, isFinished, decrementTime])

  // Submit answers when exam finishes
  useEffect(() => {
    if (!isFinished || !attemptId || result || submitting) return

    async function submitAnswers() {
      setSubmitting(true)
      try {
        const responses = questions.map((q) => ({
          questionId: q.id,
          selectedIds: answers[q.id] || [],
          timeSpent: questionTimes[q.id] || 0,
          flagged: flagged[q.id] || false,
        }))

        const res = await fetch("/api/tryout/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ attemptId, responses }),
        })
        const data = await res.json()
        if (res.ok) {
          setResult(data)
        }
      } catch (err) {
        console.error("Submit error:", err)
      } finally {
        setSubmitting(false)
      }
    }

    submitAnswers()
  }, [isFinished, attemptId, answers, flagged, result, submitting])

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600)
    const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0')
    const s = (seconds % 60).toString().padStart(2, '0')
    return h > 0 ? `${h}:${m}:${s}` : `${m}:${s}`
  }

  const [isFetchingNext, setIsFetchingNext] = useState(false)

  const handleNextClick = async () => {
    if (!isAdaptive) {
      nextQuestion()
      return
    }

    // Adaptive mode: Fetch next question
    if (isFetchingNext || !attemptId) return
    setIsFetchingNext(true)

    try {
      const currentQ = questions[currentIndex]
      const timeSpent = Math.round((Date.now() - lastQuestionTimestamp) / 1000)

      const res = await fetch("/api/tryout/next", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          attemptId,
          questionId: currentQ.id,
          selectedIds: answers[currentQ.id] || [],
          timeSpent,
          flagged: flagged[currentQ.id] || false,
        }),
      })
      const data = await res.json()

      if (res.ok) {
        if (data.finished) {
          finishExam()
        } else if (data.question) {
          const newQ: Question = {
            id: data.question.id,
            text: data.question.text,
            type: data.question.type,
            subject: data.question.subject || "",
            options: data.question.options.map((o: any) => ({ id: o.id, label: o.label, text: o.text })),
          }
          appendQuestion(newQ)
          nextQuestion()
        }
      } else {
        console.error("Failed to fetch next adaptive question:", data.error)
      }
    } catch (err) {
      console.error("Fetch next error:", err)
    } finally {
      setIsFetchingNext(false)
    }
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen w-full bg-slate-50 flex flex-col items-center justify-center p-6 font-sans">
        <AlertTriangle className="w-16 h-16 text-rose-500 mb-4" />
        <h1 className="text-2xl font-bold mb-2 text-slate-800">Gagal Memulai Ujian</h1>
        <p className="text-slate-500 mb-6 font-medium">{error}</p>
        <button onClick={() => router.push("/tryout/list")} className="px-6 py-3 bg-[var(--accent)] hover:opacity-90 text-white rounded-xl font-semibold shadow-sm transition-all">
          Kembali ke Daftar Try Out
        </button>
      </div>
    )
  }

  // Loading state
  if (loading || questions.length === 0) {
    return (
      <div className="min-h-screen w-full bg-slate-50 flex flex-col items-center justify-center gap-4 font-sans">
        <Loader2 className="w-10 h-10 animate-spin text-[var(--accent)]" />
        <p className="text-slate-500 font-medium">Menyiapkan soal ujian...</p>
      </div>
    )
  }

  // Finished state
  if (isFinished) {
    return (
      <div className="min-h-screen flex flex-col md:flex-row w-full font-sans bg-white overflow-hidden">
        {/* LEFT PANEL */}
        <div className="hidden md:flex flex-1 relative bg-slate-50 flex-col justify-between p-8 lg:p-12 overflow-hidden border-r border-slate-100">
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-60">
            <div className="absolute -top-1/4 -left-1/4 w-[800px] h-[800px] bg-[var(--pastel-purple)] rounded-full blur-[120px]" />
            <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[var(--pastel-blue)]/40 rounded-full blur-[100px]" />
          </div>

          <div className="relative z-10 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[var(--accent)]/10 flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 text-[var(--accent)]" />
            </div>
            <span className="text-2xl font-bold tracking-tight text-slate-800">Lexica</span>
          </div>

          <div className="relative z-10 flex-1 flex flex-col justify-center max-w-xl mt-8">
            <div className="w-16 h-16 bg-white border border-slate-100 shadow-sm rounded-2xl flex items-center justify-center mb-6 relative">
              <div className="absolute inset-0 bg-[var(--accent)]/10 rounded-2xl animate-pulse" />
              <Sparkles className="w-8 h-8 text-[var(--accent)] relative z-10" />
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight leading-tight">
              Kerja Bagus!
            </h1>
            <p className="text-lg md:text-xl text-slate-500 font-medium leading-relaxed">
              Kamu telah menyelesaikan uji diagnostik awal. Jawabanmu sedang dianalisis oleh AI untuk memetakan kekuatan dan kelemahanmu secara presisi.
            </p>
          </div>
          <div />
        </div>

        {/* RIGHT PANEL */}
        <div className="w-full md:w-[450px] lg:w-[500px] xl:w-[600px] shrink-0 bg-white flex flex-col relative shadow-[-20px_0_40px_rgba(0,0,0,0.05)] z-20">
          <div className="md:hidden absolute top-0 left-0 w-full p-6 flex items-center justify-center gap-2">
            <CheckCircle2 className="w-6 h-6 text-[var(--accent)]" />
            <span className="text-xl font-bold tracking-tight text-slate-800">Lexica</span>
          </div>

          <div className="w-full h-full flex flex-col items-center justify-center px-8 md:px-12 py-24">
            <div className="w-full max-w-sm flex flex-col items-center text-center">
              <CheckCircle2 className="w-20 h-20 text-[var(--accent)] mb-6" />
              <h2 className="text-3xl font-bold mb-2 text-slate-800 tracking-tight">Ujian Selesai</h2>
              
              {submitting ? (
                <div className="flex items-center gap-2 text-slate-500 mb-8 font-medium">
                  <Loader2 className="w-4 h-4 animate-spin" /> Menghitung skor IRT...
                </div>
              ) : result ? (
                <div className="w-full space-y-4 mb-8 mt-4">
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4">
                      <p className="text-[10px] uppercase tracking-wider text-emerald-600 font-bold mb-1">Benar</p>
                      <p className="text-xl font-bold text-emerald-700">{result.correct}/{result.total}</p>
                    </div>
                    <div className="bg-[var(--pastel-blue)] border border-blue-100 rounded-2xl p-4">
                      <p className="text-[10px] uppercase tracking-wider text-blue-600 font-bold mb-1">θ (IRT)</p>
                      <p className="text-xl font-bold text-blue-700">{result.theta}</p>
                    </div>
                    <div className="bg-[var(--pastel-purple)] border border-purple-100 rounded-2xl p-4">
                      <p className="text-[10px] uppercase tracking-wider text-[var(--accent-dark)] font-bold mb-1">Skor SNBT</p>
                      <p className="text-xl font-bold text-[var(--accent-dark)]">{result.scaledScore}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-slate-500 mb-8 font-medium">Jawaban telah dikirim.</p>
              )}

              <div className="w-full space-y-3">
                {isOnboarding ? (
                  <button 
                    onClick={() => router.push(`/onboarding/result?attemptId=${attemptId}`)}
                    className="w-full py-3.5 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white font-semibold rounded-xl transition-all shadow-[0_4px_12px_rgba(193,119,249,0.2)]"
                  >
                    Lihat Hasil Detail →
                  </button>
                ) : (
                  <>
                    {attemptId && (
                      <button 
                        onClick={() => router.push(`/tryout/${attemptId}/review`)}
                        className="w-full py-3.5 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white font-semibold rounded-xl transition-all shadow-[0_4px_12px_rgba(193,119,249,0.2)]"
                      >
                        Lihat Review Jawaban
                      </button>
                    )}
                    <button 
                      onClick={() => router.push(`/tutor?attemptId=${attemptId}`)}
                      className="w-full py-3.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-600 font-semibold rounded-xl transition-all"
                    >
                      Bahas dengan AI Tutor
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const currentQ = questions[currentIndex]
  const currentAnswers = answers[currentQ.id] || []
  const isFlagged = flagged[currentQ.id]

  return (
    <div className="h-screen flex w-full font-sans bg-white overflow-hidden relative">
      
      {/* LEFT PANEL */}
      <div className="flex-1 relative bg-slate-50 overflow-hidden border-r border-slate-100 flex-col">
        {/* Blurred gradient background */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-60">
          <div className="absolute -top-1/4 -left-1/4 w-[800px] h-[800px] bg-[var(--pastel-purple)] rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[var(--pastel-blue)]/40 rounded-full blur-[100px]" />
        </div>

        <div className="relative z-10 flex flex-col w-full max-w-4xl mx-auto px-3 md:px-8 lg:px-12 py-4 md:py-8 lg:py-12 justify-between">
          {/* Top: Logo */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[var(--accent)]/10 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-[var(--accent)]" />
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-800">Lexica</span>
            </div>
          </div>

          {/* Center: Soal Content */}
          <div className="flex-1 flex flex-col mt-4 md:mt-8 overflow-y-auto no-scrollbar -mx-1 px-1">
            <div className="w-full">
            {/* Soal Header */}
            <div className="flex justify-between items-center mb-3 md:mb-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Soal</span>
                <span className="text-xl md:text-2xl font-black text-slate-900">{currentIndex + 1}<span className="text-slate-300 font-medium text-sm md:text-base ml-1">/ {isAdaptive ? totalItems : questions.length}</span></span>
              </div>
              {currentQ.type === 'MULTIPLE_SELECT' && (
                <span className="text-[10px] md:text-xs bg-white text-[var(--accent-dark)] px-2.5 md:px-4 py-1 md:py-1.5 rounded-full border border-[var(--accent)]/20 font-bold tracking-wide shadow-sm">
                  Pilih &gt; 1 Jawaban
                </span>
              )}
            </div>
            
            {/* Soal Text */}
            <div className="text-sm md:text-base leading-relaxed mb-3 md:mb-4 text-slate-800 font-medium">
              <MarkdownRenderer content={currentQ.text} />
            </div>

            {/* Options */}
            <div className="space-y-2 md:space-y-2.5">
              {currentQ.options.map((opt) => {
                const isSelected = currentAnswers.includes(opt.id)
                return (
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    key={opt.id}
                    onClick={() => toggleAnswer(currentQ.id, opt.id, currentQ.type === 'MULTIPLE_SELECT')}
                    className={`w-full text-left p-2.5 md:p-3 rounded-xl border transition-all flex items-start gap-2.5 md:gap-3 ${
                      isSelected 
                        ? "bg-white border-[var(--accent)] shadow-[0_2px_15px_rgba(193,119,249,0.15)]" 
                        : "bg-white border-slate-200/60 hover:border-slate-300 shadow-sm"
                    }`}
                  >
                    <div className={`shrink-0 w-6 h-6 md:w-7 md:h-7 rounded-md flex items-center justify-center font-bold text-[10px] md:text-xs transition-colors ${
                      isSelected ? "bg-[var(--accent)] text-white" : "bg-slate-100 text-slate-500 border border-slate-200"
                    }`}>
                      {opt.label}
                    </div>
                    <div className={`pt-0.5 text-sm md:text-base font-medium leading-relaxed ${isSelected ? "text-slate-800" : "text-slate-600"}`}><MarkdownRenderer content={opt.text} /></div>
                  </motion.button>
                )
              })}
            </div>
            </div>
          </div>

          {/* Bottom: Nav Controls */}
          <div className="hidden lg:block pt-4 mt-4">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
              {!isAdaptive && (
                <button 
                  onClick={prevQuestion}
                  disabled={currentIndex === 0}
                  className="px-5 py-3 bg-white border border-slate-200/60 disabled:opacity-40 hover:bg-slate-50 rounded-xl font-bold text-slate-600 flex items-center gap-2 transition-all shadow-sm text-sm"
                >
                  <ChevronLeft className="w-4 h-4" /> Sebelumnya
                </button>
              )}
              <button 
                onClick={() => toggleFlag(currentQ.id)}
                className={`px-5 py-3 border rounded-xl font-bold flex items-center gap-2 transition-all shadow-sm text-sm ${
                  isFlagged 
                    ? "bg-amber-50 border-amber-200 text-amber-600" 
                    : "bg-white border-slate-200/60 hover:bg-slate-50 text-slate-600"
                }`}
              >
                <Flag className={`w-4 h-4 ${isFlagged ? "fill-amber-500 text-amber-500" : ""}`} /> Ragu-ragu
              </button>
            </div>

            {sections.length > 0 && currentQ && currentQ.id === questions.filter(q => q.subject === sections[currentSectionIndex]?.subjectName).slice(-1)[0]?.id && currentSectionIndex < sections.length - 1 ? (
              <button 
                onClick={moveToNextSection}
                className="px-7 py-3 bg-[var(--accent)] hover:bg-[var(--accent-hover)] rounded-xl font-bold text-white flex items-center gap-2 transition-all shadow-[0_4px_12px_rgba(193,119,249,0.25)] text-sm"
              >
                Mulai Subtes Berikutnya <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button 
                onClick={handleNextClick}
                disabled={(!isAdaptive && currentIndex === questions.length - 1) || isFetchingNext}
                className="px-7 py-3 bg-[var(--accent)] disabled:opacity-50 hover:bg-[var(--accent-hover)] rounded-xl font-bold text-white flex items-center gap-2 transition-all shadow-[0_4px_12px_rgba(193,119,249,0.25)] text-sm"
              >
                {isFetchingNext ? "Memuat..." : (isAdaptive && currentIndex === totalItems - 1 ? "Selesai" : "Selanjutnya")}
                {isFetchingNext ? <Loader2 className="w-4 h-4 animate-spin" /> : <ChevronRight className="w-4 h-4" />}
              </button>
            )}
          </div>
        </div>

        {/* Mobile: Question Navigation Grid (always visible at bottom) */}
        <div className="lg:hidden bg-white border-t border-slate-200/60 px-3 py-3 pb-[calc(8px+env(safe-area-inset-bottom))]">
          <NavigationGrid 
            questions={questions}
            answers={answers}
            flagged={flagged}
            currentIndex={currentIndex}
            isAdaptive={isAdaptive}
            totalItems={totalItems}
            sections={sections}
            currentSectionIndex={currentSectionIndex}
            goToQuestion={goToQuestion}
          />
        </div>
      </div>
    </div>

      {/* RIGHT PANEL */}
      <div className="hidden lg:flex w-full lg:w-[400px] xl:w-[500px] shrink-0 bg-white flex-col relative shadow-[-20px_0_40px_rgba(0,0,0,0.05)] z-30 h-full">
        
        {/* Scrollable Content */}
        <div className="w-full h-full overflow-y-auto no-scrollbar pt-24 lg:pt-0">
          <div className="w-full max-w-[420px] mx-auto px-6 py-8 lg:py-12 flex flex-col min-h-full justify-start">
            
            {/* Timer */}
            <div className="space-y-3">
              {/* Section block timer (primary) */}
              {sections.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-[10px] font-bold text-[var(--accent)] uppercase tracking-widest">
                      {sections[currentSectionIndex]?.subjectName || 'Subtes'}
                    </p>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      {currentSectionIndex + 1} / {sections.length}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 font-mono text-3xl font-black text-slate-800">
                    <Clock className={`w-7 h-7 ${sectionTimeLeft < 60 ? "text-rose-500 animate-pulse" : "text-[var(--accent)]"}`} />
                    <span className={sectionTimeLeft < 60 ? "text-rose-500 animate-pulse" : ""}>
                      {formatTime(sectionTimeLeft)}
                    </span>
                  </div>
                </div>
              )}
              {/* Global timer (secondary / fallback) */}
              {sections.length === 0 && (
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Sisa Waktu</p>
                  <div className="flex items-center gap-2 font-mono text-3xl font-black text-slate-800">
                    <Clock className={`w-7 h-7 ${timeLeft < 60 ? "text-rose-500 animate-pulse" : "text-[var(--accent)]"}`} />
                    <span className={timeLeft < 60 ? "text-rose-500 animate-pulse" : ""}>
                      {formatTime(timeLeft)}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Submit */}
            <button 
              onClick={() => finishExam()}
              className="w-full py-4 bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold rounded-xl border border-rose-100 transition-colors shadow-sm flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="w-5 h-5" />
              Kumpulkan Ujian
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function CbtEnginePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  
  return (
    <Suspense fallback={<div className="h-screen flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-[var(--accent)]" /></div>}>
      <CbtEngineContent templateId={id} />
    </Suspense>
  )
}
