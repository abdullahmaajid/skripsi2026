"use client"

import { useState, useEffect, use } from "react"
import { useRouter } from "next/navigation"
import { CheckCircle2, XCircle, MessageCircle, Loader2, ArrowLeft, LayoutGrid, BrainCircuit, MessageSquareShare } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import MarkdownRenderer from "@/components/ui/MarkdownRenderer"
import { useTutorChatStore } from "@/store/useTutorChatStore"

interface ReviewQuestion {
  number: number
  questionId: string
  text: string
  type: string
  difficulty: number
  subject: string
  timeSpent: number
  isCorrect: boolean | null
  selectedIds: string[]
  options: { id: string; label: string; text: string; isCorrect: boolean }[]
}

interface AttemptResult {
  attemptId: string
  templateName: string
  status: string
  rawScore: number | null
  irtScore: number | null
  scaledScore: number | null
  startedAt: string
  finishedAt: string | null
  questions: ReviewQuestion[]
}

export default function ReviewPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const [data, setData] = useState<AttemptResult | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedIndex, setSelectedIndex] = useState<number>(0)
  
  const [tutorLoading, setTutorLoading] = useState<string | null>(null)
  const [tutorResponses, setTutorResponses] = useState<Record<string, string>>({})
  const [tutorLevels, setTutorLevels] = useState<Record<string, string>>({})

  const setSelectedQuestion = useTutorChatStore(state => state.setSelectedQuestion)

  useEffect(() => {
    fetch(`/api/tryout/${id}/result`)
      .then(r => r.json())
      .then(d => {
        if (d.error) throw new Error(d.error)
        setData(d)
      })
      .catch(e => setError(e.message))
      .finally(() => setLoading(false))
  }, [id])

  const handleAskTutor = async (q: ReviewQuestion) => {
    setTutorLoading(q.questionId)
    try {
      const correctOpt = q.options.filter(o => o.isCorrect).map(o => `${o.label}. ${o.text}`).join(", ")
      const selectedOpt = q.selectedIds.map(sid => q.options.find(o => o.id === sid)?.label || "?").join(", ")
      const currentLevel = tutorLevels[q.questionId] || "SOCRATIC"

      const res = await fetch("/api/tutor/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          questionId: q.questionId,
          question: q.text,
          studentAnswer: selectedOpt || "Tidak menjawab",
          correctAnswer: correctOpt,
          currentLevel,
        }),
      })
      const result = await res.json()
      setTutorResponses(prev => ({ ...prev, [q.questionId]: result.response }))
      if (result.nextLevel) {
        setTutorLevels(prev => ({ ...prev, [q.questionId]: result.nextLevel }))
      }
    } catch {
      setTutorResponses(prev => ({ ...prev, [q.questionId]: "Maaf, AI Tutor sedang tidak tersedia." }))
    } finally {
      setTutorLoading(null)
    }
  }

  const handleOpenChat = (q: ReviewQuestion) => {
    const correctOpt = q.options.filter(o => o.isCorrect).map(o => `${o.label}. ${o.text}`).join(", ") || "—"
    const selectedOpt = q.selectedIds.map(sid => q.options.find(o => o.id === sid)?.label || "?").join(", ") || "Tidak menjawab"
    
    setSelectedQuestion({
      questionId: q.questionId,
      text: q.text,
      subject: q.subject,
      selectedAnswer: selectedOpt,
      correctAnswer: correctOpt,
      difficulty: q.difficulty,
      options: q.options,
      selectedIds: q.selectedIds
    })

    if (window.innerWidth < 1024) {
      router.push('/tutor')
    }
  }

  if (loading) return (
    <div className="h-full bg-white flex flex-col items-center justify-center font-sans">
      <Loader2 className="w-10 h-10 animate-spin text-[var(--accent)] mb-4" />
      <p className="text-slate-500 font-medium">Memuat data review...</p>
    </div>
  )

  if (error || !data) return (
    <div className="h-full bg-white flex flex-col items-center justify-center gap-4 font-sans">
      <p className="text-slate-500 font-medium">{error || "Data tidak ditemukan"}</p>
      <button onClick={() => router.push("/dashboard")} className="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold transition-colors">
        Kembali ke Dashboard
      </button>
    </div>
  )

  const correctCount = data.questions.filter(q => q.isCorrect).length
  const totalCount = data.questions.length
  const currentQ = data.questions[selectedIndex]

  return (
    <div className="h-full flex flex-col lg:flex-row font-sans overflow-hidden bg-white">
      {/* Sidebar (Grid & Score) */}
      <aside className="w-full lg:w-[340px] flex flex-col border-b lg:border-b-0 lg:border-r border-slate-100 bg-slate-50/50 shrink-0 h-[35vh] lg:h-full overflow-y-auto no-scrollbar relative">
        <div className="p-6 md:p-8">
          <button onClick={() => router.push("/dashboard")} className="text-slate-400 hover:text-slate-600 text-sm mb-6 inline-flex items-center gap-2 font-bold transition-colors">
            <ArrowLeft className="w-4 h-4" /> Kembali ke Dashboard
          </button>
          
          {/* Score Card */}
          <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.02)] mb-8">
             <h2 className="font-bold text-slate-800 text-base mb-4 leading-tight">{data.templateName}</h2>
             <div className="grid grid-cols-2 gap-3">
               <div className="bg-emerald-50/80 rounded-xl p-3 border border-emerald-100/50">
                 <p className="text-[10px] uppercase tracking-wider text-emerald-600 font-bold mb-1">Benar</p>
                 <p className="text-xl font-extrabold text-emerald-700">{correctCount}/{totalCount}</p>
               </div>
               <div className="bg-[var(--pastel-purple)] rounded-xl p-3 border border-purple-100/50">
                 <p className="text-[10px] uppercase tracking-wider text-[var(--accent-dark)] font-bold mb-1">Skor SNBT</p>
                 <p className="text-xl font-extrabold text-[var(--accent-dark)]">{data.scaledScore ? Math.round(data.scaledScore) : "—"}</p>
               </div>
             </div>
          </div>

          {/* Grid */}
          <h3 className="font-bold text-slate-800 text-sm mb-4 flex items-center gap-2">
            <LayoutGrid className="w-4 h-4 text-slate-400" /> Navigasi Soal
          </h3>
          <div className="grid grid-cols-5 gap-2.5">
             {data.questions.map((q, idx) => {
               const isCurrent = idx === selectedIndex
               const isCorrect = q.isCorrect === true
               const isWrong = q.isCorrect === false
               
               let bg = "bg-white text-slate-500 border-slate-200" // Unanswered
               if (isCorrect) bg = "bg-emerald-50 text-emerald-600 border-emerald-200"
               if (isWrong) bg = "bg-rose-50 text-rose-600 border-rose-200"
               
               if (isCurrent) {
                 bg += " ring-2 ring-[var(--accent)] ring-offset-2 ring-offset-slate-50 border-transparent shadow-sm"
               }

               return (
                 <motion.button
                   whileHover={{ scale: 1.05 }}
                   whileTap={{ scale: 0.95 }}
                   key={q.questionId}
                   onClick={() => setSelectedIndex(idx)}
                   className={`aspect-square rounded-xl flex items-center justify-center font-bold text-xs border transition-all ${bg}`}
                 >
                   {idx + 1}
                 </motion.button>
               )
             })}
          </div>
        </div>
      </aside>

      {/* Main Content (Review Detail) */}
      <main className="flex-1 flex flex-col h-[65vh] lg:h-full overflow-y-auto no-scrollbar relative bg-white p-6 md:p-12">
         {currentQ && (
           <AnimatePresence mode="wait">
             <motion.div 
               key={currentQ.questionId}
               initial={{ opacity: 0, x: 10 }}
               animate={{ opacity: 1, x: 0 }}
               exit={{ opacity: 0, x: -10 }}
               transition={{ duration: 0.3, ease: "easeOut" }}
               className="max-w-4xl mx-auto w-full pb-20"
             >
               {/* Question Header */}
               <div className="flex flex-wrap justify-between items-center mb-6 border-b border-slate-100 pb-4 gap-4">
                 <h2 className="text-2xl font-bold text-slate-800">Soal {currentQ.number}</h2>
                 <div className="flex items-center gap-2 flex-wrap">
                   <span className="text-xs bg-slate-50 text-slate-500 px-3 py-1.5 rounded-full border border-slate-200 font-bold tracking-wide">
                     {currentQ.subject}
                   </span>
                   <span className="text-xs bg-slate-50 text-slate-500 px-3 py-1.5 rounded-full border border-slate-200 font-bold tracking-wide font-mono">
                     b={currentQ.difficulty}
                   </span>
                   <span className="text-xs bg-slate-50 text-slate-500 px-3 py-1.5 rounded-full border border-slate-200 font-bold tracking-wide">
                     Waktu: {currentQ.timeSpent}s
                   </span>
                   {currentQ.isCorrect ? (
                     <span className="text-xs bg-emerald-50 text-emerald-600 px-3 py-1.5 rounded-full border border-emerald-200 font-bold tracking-wide flex items-center gap-1.5">
                       <CheckCircle2 className="w-3.5 h-3.5" /> Benar
                     </span>
                   ) : currentQ.isCorrect === false ? (
                     <span className="text-xs bg-rose-50 text-rose-600 px-3 py-1.5 rounded-full border border-rose-200 font-bold tracking-wide flex items-center gap-1.5">
                       <XCircle className="w-3.5 h-3.5" /> Salah
                     </span>
                   ) : (
                     <span className="text-xs bg-slate-100 text-slate-500 px-3 py-1.5 rounded-full border border-slate-200 font-bold tracking-wide">
                       Kosong
                     </span>
                   )}
                 </div>
               </div>
               
               {/* Question Text */}
               <div className="text-base md:text-lg leading-relaxed mb-8 text-slate-700 font-medium whitespace-pre-wrap">
                 <MarkdownRenderer content={currentQ.text} />
               </div>

               {/* Options */}
               <div className="space-y-3 mb-10">
                 {currentQ.options.map((opt) => {
                   const isSelected = currentQ.selectedIds.includes(opt.id)
                   const isCorrect = opt.isCorrect

                   let containerCls = "p-4 rounded-2xl border transition-all flex items-center gap-4 "
                   let labelCls = "w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm shrink-0 border "
                   let statusIcon = null

                   if (isCorrect && isSelected) {
                     containerCls += "bg-emerald-50 border-emerald-200 shadow-sm"
                     labelCls += "bg-emerald-500 text-white border-transparent"
                     statusIcon = <span className="text-[10px] uppercase tracking-wider font-bold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-md ml-auto shrink-0">Jawabanmu Benar</span>
                   } else if (isCorrect && !isSelected) {
                     containerCls += "bg-emerald-50/40 border-emerald-200"
                     labelCls += "bg-emerald-500 text-white border-transparent"
                     statusIcon = <span className="text-[10px] uppercase tracking-wider font-bold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-md ml-auto shrink-0">Kunci Jawaban</span>
                   } else if (!isCorrect && isSelected) {
                     containerCls += "bg-rose-50 border-rose-200 shadow-sm"
                     labelCls += "bg-rose-500 text-white border-transparent"
                     statusIcon = <span className="text-[10px] uppercase tracking-wider font-bold text-rose-700 bg-rose-100 px-2.5 py-1 rounded-md ml-auto shrink-0">Jawabanmu Salah</span>
                   } else {
                     containerCls += "bg-white border-slate-150"
                     labelCls += "bg-slate-50 text-slate-500 border-slate-200"
                   }

                   return (
                     <div key={opt.id} className={containerCls}>
                       <div className={labelCls}>{opt.label}</div>
                       <div className="text-sm md:text-base font-medium text-slate-700 flex-1 leading-relaxed"><MarkdownRenderer content={opt.text} /></div>
                       {statusIcon}
                     </div>
                   )
                 })}
               </div>

               {/* AI Tutor Section */}
               <div className="pt-6 border-t border-slate-100">
                 <h3 className="font-bold text-slate-800 text-lg mb-4 flex items-center gap-2">
                   <BrainCircuit className="w-5 h-5 text-[var(--accent)]" /> 
                   Diskusi AI Tutor
                 </h3>
                 
                 {tutorResponses[currentQ.questionId] ? (
                   <div className="space-y-4">
                     <div className="p-6 bg-[var(--pastel-purple)] border border-[var(--accent)]/10 rounded-2xl shadow-[0_4px_20px_rgba(193,119,249,0.05)]">
                       <p className="text-xs text-[var(--accent-dark)] uppercase tracking-wider font-bold mb-3 flex items-center gap-1.5">
                         <MessageCircle className="w-4 h-4" /> Bantuan AI ({tutorLevels[currentQ.questionId] || "SOCRATIC"})
                       </p>
                       <MarkdownRenderer content={tutorResponses[currentQ.questionId]} />
                     </div>
                     
                     <div className="flex flex-wrap items-center gap-3">
                       {tutorLevels[currentQ.questionId] && tutorLevels[currentQ.questionId] !== "SOLUTION" && (
                         <button
                           onClick={() => handleAskTutor(currentQ)}
                           disabled={tutorLoading === currentQ.questionId}
                           className="flex items-center gap-2 px-5 py-3 bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-xl font-bold text-sm transition-all disabled:opacity-50 shadow-sm"
                         >
                           {tutorLoading === currentQ.questionId
                             ? <><Loader2 className="w-4 h-4 animate-spin" /> Menyiapkan jawaban...</>
                             : <>Masih bingung? Minta petunjuk selanjutnya</>
                           }
                         </button>
                       )}
                       <button
                         onClick={() => handleOpenChat(currentQ)}
                         className="flex items-center gap-2 px-5 py-3 bg-[var(--accent)]/10 text-[var(--accent-dark)] hover:bg-[var(--accent)]/20 rounded-xl font-bold text-sm transition-all shadow-sm"
                       >
                         <MessageSquareShare className="w-4 h-4" />
                         Lanjutkan Diskusi di Chat Panel
                       </button>
                     </div>
                   </div>
                 ) : (
                   <button
                     onClick={() => handleAskTutor(currentQ)}
                     disabled={tutorLoading === currentQ.questionId}
                     className="flex items-center gap-2 px-6 py-3.5 bg-[var(--accent)] hover:opacity-90 text-white rounded-xl font-bold text-sm transition-all disabled:opacity-50 shadow-[0_4px_12px_rgba(193,119,249,0.2)]"
                   >
                     {tutorLoading === currentQ.questionId ? (
                       <><Loader2 className="w-4 h-4 animate-spin" /> Meminta bantuan AI...</>
                     ) : (
                       <><MessageCircle className="w-4 h-4" /> Minta Penjelasan AI Tutor</>
                     )}
                   </button>
                 )}
               </div>

             </motion.div>
           </AnimatePresence>
         )}
      </main>
    </div>
  )
}
