"use client"

import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { BarChart, Activity, Target, BrainCircuit, ArrowRight, BookOpen, TrendingUp, Sparkles, Trophy, ChevronRight, FileText, Timer, Crown, Users, Medal, CheckCircle2, Map, Zap, GraduationCap, ChevronDown, ChevronUp, Rocket, PartyPopper, ArrowDown, ArrowUp, AlertTriangle, Flame, Info } from "lucide-react"
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from "recharts"
import { motion, Variants, AnimatePresence } from "framer-motion"

interface JourneyProgress {
  diagnosticDone: boolean
  firstTryoutDone: boolean
  learningPathExplored: boolean
  practiceStarted: boolean
}

interface Props {
  userName: string
  targetName: string
  latestScore: number
  irtTheta: number
  totalAttempts: number
  radarData: { subject: string; score: number; target: number }[]
  recentActivities: { title: string; date: string; score: number; status: string }[]
  stats: { tryOutCount: number; soalCount: number; hariLagi: number; jamCount: number }
  fokusSubject: string
  peluangLulus: number
  trendData: { label: string; score: number }[]
  targetScoreGap: number | null
  journeyProgress: JourneyProgress
  aiRecommendation?: any
  insightData?: {
    type: string
    subject?: string
    score?: number
    target?: number
    message: string
    actionText: string
    actionUrl: string
  } | null
}

/* ─── Animated counter ─── */
function AnimatedNumber({ value, duration = 1.2 }: { value: number; duration?: number }) {
  const [display, setDisplay] = useState(0)
  useEffect(() => {
    if (value === 0) { setDisplay(0); return }
    const start = Date.now()
    const tick = () => {
      const elapsed = Date.now() - start
      const progress = Math.min(elapsed / (duration * 1000), 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(Math.round(eased * value))
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [value, duration])
  return <>{display}</>
}

/* ─── SVG Progress Ring ─── */
function ProgressRing({ progress, size = 80, stroke = 6, color = "var(--accent)" }: { progress: number; size?: number; stroke?: number; color?: string }) {
  const radius = (size - stroke) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (progress / 100) * circumference
  return (
    <svg width={size} height={size} className="transform -rotate-90 drop-shadow-sm">
      <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="rgba(0,0,0,0.05)" strokeWidth={stroke} />
      <motion.circle
        cx={size / 2} cy={size / 2} r={radius} fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round"
        initial={{ strokeDashoffset: circumference }}
        animate={{ strokeDashoffset: offset }}
        transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
        style={{ strokeDasharray: circumference }}
      />
    </svg>
  )
}

/* ─── Variants ─── */
const stagger: Variants = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } }
const fastStagger: Variants = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.04 } } }
const fadeUp: Variants = { hidden: { opacity: 0, y: 15 }, show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } } }
const scaleIn: Variants = { hidden: { opacity: 0, scale: 0.95 }, show: { opacity: 1, scale: 1, transition: { duration: 0.3, ease: "easeOut" } } }

/* ─── Getting Started Journey Steps ─── */
const journeySteps = [
  {
    key: "diagnosticDone" as const,
    icon: Target,
    title: "Uji Diagnostik Selesai",
    description: "Kamu sudah tahu titik startmu.",
    cta: "Lihat Hasil",
    href: "/analytics/radar",
    color: "emerald",
    bgGradient: "from-emerald-500 to-teal-400",
    pastel: "var(--pastel-green)",
  },
  {
    key: "learningPathExplored" as const,
    icon: Map,
    title: "Jelajahi Learning Path",
    description: "Lihat rute belajar personal berdasarkan kelemahanmu.",
    cta: "Buka Learning Path",
    href: "/learning-path",
    color: "blue",
    bgGradient: "from-blue-500 to-sky-400",
    pastel: "var(--pastel-blue)",
  },
  {
    key: "practiceStarted" as const,
    icon: Zap,
    title: "Latihan Soal Pertama",
    description: "Berlatih soal per-subtes dengan feedback AI langsung.",
    cta: "Mulai Latihan",
    href: "/practice",
    color: "orange",
    bgGradient: "from-orange-500 to-amber-400",
    pastel: "var(--pastel-orange)",
  },
  {
    key: "firstTryoutDone" as const,
    icon: GraduationCap,
    title: "Try Out Pertama",
    description: "Simulasi ujian SNBT lengkap untuk mengukur progresmu.",
    cta: "Ambil Try Out",
    href: "/tryout/list",
    color: "purple",
    bgGradient: "from-[var(--accent)] to-purple-400",
    pastel: "var(--pastel-purple)",
  },
]

/* ─── Getting Started Card Component ─── */
function GettingStartedCard({ journey, collapsed, onToggle }: { journey: JourneyProgress; collapsed: boolean; onToggle: () => void }) {
  const router = useRouter()
  const completedCount = journeySteps.filter(s => journey[s.key]).length
  const totalSteps = journeySteps.length
  const progress = (completedCount / totalSteps) * 100

  // Find the first incomplete step to highlight as "next"
  const nextStep = journeySteps.find(s => !journey[s.key])

  const colorMap: Record<string, { icon: string; border: string; bg: string; text: string }> = {
    emerald: { icon: "text-emerald-500", border: "border-emerald-200", bg: "bg-emerald-50", text: "text-emerald-700" },
    blue: { icon: "text-blue-500", border: "border-blue-200", bg: "bg-blue-50", text: "text-blue-700" },
    orange: { icon: "text-orange-500", border: "border-orange-200", bg: "bg-orange-50", text: "text-orange-700" },
    purple: { icon: "text-[var(--accent)]", border: "border-purple-200", bg: "bg-purple-50", text: "text-purple-700" },
  }

  return (
    <motion.div
      variants={fadeUp}
      className="relative bg-white shadow-[0_4px_20px_rgba(0,0,0,0.03)] rounded-[2rem] overflow-hidden border border-slate-100"
    >
      {/* Top accent bar — flat color */}
      <div className="h-1.5 bg-[var(--accent)]" />

      <div className="p-6">
        {/* Header row — clickable to toggle */}
        <button onClick={onToggle} className="flex items-center justify-between w-full text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[var(--pastel-purple)] flex items-center justify-center">
              <Rocket className="w-5 h-5 text-[var(--accent-dark)]" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[var(--text-primary)] tracking-tight">Mulai dari Sini!</h2>
              <p className="text-xs text-[var(--text-secondary)] font-medium mt-0.5 flex items-center gap-1">
                {completedCount}/{totalSteps} langkah selesai — {completedCount === totalSteps ? <><span className="text-emerald-600 font-bold">Luar biasa!</span> <PartyPopper className="w-3.5 h-3.5 text-emerald-500" /></> : "Ikuti langkah di bawah ini"}
              </p>
            </div>
          </div>
          <div className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors shrink-0">
            {collapsed ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
          </div>
        </button>

        {/* Progress bar — always visible */}
        <div className="h-2 bg-slate-100 rounded-full overflow-hidden mt-4">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
            className="h-full rounded-full bg-[var(--accent)]"
          />
        </div>

        {/* Steps — collapsible */}
        <AnimatePresence initial={false}>
          {!collapsed && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 pt-5">
                {journeySteps.map((step, i) => {
                  const isDone = journey[step.key]
                  const isNext = step.key === nextStep?.key
                  const colors = colorMap[step.color]
                  const Icon = step.icon

                  return (
                    <button
                      key={step.key}
                      onClick={() => router.push(step.href)}
                      className={`relative flex flex-col p-4 rounded-2xl border-2 text-left transition-all group ${
                        isDone
                          ? "border-emerald-200 bg-emerald-50/60"
                          : isNext
                          ? `${colors.border} ${colors.bg} shadow-sm`
                          : "border-slate-100 bg-slate-50/50 opacity-60"
                      } hover:shadow-md hover:-translate-y-0.5`}
                    >
                      {/* Step number badge */}
                      <div className="flex items-center justify-between mb-3">
                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                          isDone ? "bg-emerald-100" : isNext ? colors.bg : "bg-slate-100"
                        }`}>
                          {isDone ? (
                            <CheckCircle2 className="w-4.5 h-4.5 text-emerald-500" />
                          ) : (
                            <Icon className={`w-4 h-4 ${isNext ? colors.icon : "text-slate-400"}`} />
                          )}
                        </div>
                        <span className={`text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 ${
                          isDone ? "text-emerald-500" : isNext ? colors.text : "text-slate-400"
                        }`}>
                          {isDone ? <><CheckCircle2 className="w-3 h-3" /> Selesai</> : `Langkah ${i + 1}`}
                        </span>
                      </div>

                      {/* Title & description */}
                      <h3 className={`text-sm font-semibold mb-1 ${
                        isDone ? "text-emerald-700" : isNext ? "text-slate-800" : "text-slate-500"
                      }`}>
                        {step.title}
                      </h3>
                      <p className={`text-[11px] leading-relaxed flex-1 ${
                        isDone ? "text-emerald-600/70" : isNext ? "text-slate-500" : "text-slate-400"
                      }`}>
                        {isDone ? "Langkah ini sudah selesai." : step.description}
                      </p>

                      {/* CTA for next step */}
                      {isNext && (
                        <div className={`mt-3 flex items-center gap-1.5 text-[11px] font-bold ${colors.text} group-hover:gap-2.5 transition-all`}>
                          {step.cta} <ArrowRight className="w-3.5 h-3.5" />
                        </div>
                      )}
                    </button>
                  )
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

export default function DashboardClient({ userName, targetName, latestScore, irtTheta, totalAttempts, radarData, recentActivities, stats, fokusSubject, peluangLulus, trendData, targetScoreGap, journeyProgress, aiRecommendation, insightData }: Props) {
  const router = useRouter()
  const hasData = radarData.some(r => r.score > 0)
  const scoreProgress = latestScore > 0 ? Math.min((latestScore / 1000) * 100, 100) : 0

  // Merge server state with local state for Learning Path visit and Practice
  const [localLearningPathExplored, setLocalLearningPathExplored] = useState(false)
  const [localPracticeStarted, setLocalPracticeStarted] = useState(false)
  useEffect(() => {
    if (localStorage.getItem("has_visited_learning_path") === "true") {
      setLocalLearningPathExplored(true)
    }
    if (localStorage.getItem("has_practiced") === "true") {
      setLocalPracticeStarted(true)
    }
  }, [])

  const effectiveJourney = {
    ...journeyProgress,
    learningPathExplored: journeyProgress.learningPathExplored || localLearningPathExplored,
    practiceStarted: journeyProgress.practiceStarted || localPracticeStarted,
  }

  // Getting Started card — collapsible toggle (persisted)
  const doneCount = [effectiveJourney.diagnosticDone, effectiveJourney.firstTryoutDone, effectiveJourney.learningPathExplored, effectiveJourney.practiceStarted].filter(Boolean).length
  const allJourneyDone = doneCount === 4
  const [guideCollapsed, setGuideCollapsed] = useState(doneCount >= 3)
  useEffect(() => {
    const stored = localStorage.getItem("dashboard-guide-collapsed")
    if (stored === "true") setGuideCollapsed(true)
    else if (stored === "false") setGuideCollapsed(false)
  }, [])
  const handleToggleGuide = () => {
    const next = !guideCollapsed
    setGuideCollapsed(next)
    localStorage.setItem("dashboard-guide-collapsed", String(next))
  }

  const [focusData, setFocusData] = useState<any>(null)

  useEffect(() => {
    fetch("/api/analytics/focus-today").then(r => r.json()).then(d => setFocusData(d)).catch(() => {})
  }, [])

  // Peluang label
  const peluangLabel = peluangLulus >= 80 ? "Sangat baik!" : peluangLulus >= 60 ? "Cukup baik" : peluangLulus >= 40 ? "Perlu usaha" : peluangLulus > 0 ? "Masih jauh" : "Belum ada data"

  return (
    <motion.div variants={stagger} initial="hidden" animate="show" className="p-6 md:p-8 space-y-6 h-full overflow-y-auto no-scrollbar">

      {/* ─── Header ─── */}
      <motion.div variants={fastStagger} className="flex flex-col md:flex-row justify-between md:items-end gap-4">
        <motion.div variants={stagger}>
          <motion.h1 variants={fadeUp} className="text-3xl md:text-4xl font-semibold tracking-tight text-[var(--text-primary)]">
            Learning Overview
          </motion.h1>
          <motion.p variants={fadeUp} className="text-[var(--text-secondary)] mt-1 text-sm font-normal">
            Target: <span className="font-medium text-[var(--accent)]">{targetName}</span>
          </motion.p>
        </motion.div>
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <motion.div variants={scaleIn} className="flex items-center gap-2 px-5 py-3 bg-rose-50 border border-rose-100 text-rose-600 rounded-full font-bold text-sm shadow-sm w-full sm:w-auto justify-center">
            <Timer className="w-4 h-4" /> H-{Math.max(0, stats.hariLagi)} UTBK
          </motion.div>
          <motion.button variants={scaleIn} onClick={() => router.push("/tryout/list")} className="flex items-center justify-center gap-2 px-8 py-3 bg-[var(--accent-tertiary)] text-white hover:bg-neutral-800 rounded-full font-medium transition-all shadow-[0_4px_12px_rgba(0,0,0,0.1)] hover:scale-[1.02] active:scale-[0.98] w-full sm:w-auto">
            Start Lessons <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>
      </motion.div>

      {/* ═══ 0. ACTIONABLE INSIGHT ENGINE (SMART ALERT) ═══ */}
      <AnimatePresence>
        {insightData && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className={`relative overflow-hidden rounded-[2rem] border-2 shadow-sm ${
              insightData.type === "URGENT_REVIEW" ? "bg-rose-50 border-rose-200" 
              : insightData.type === "REVIEW" ? "bg-orange-50 border-orange-200"
              : "bg-blue-50 border-blue-200"
            } p-5 md:p-6 flex flex-col sm:flex-row items-center justify-between gap-5`}
          >
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 shrink-0 rounded-2xl flex items-center justify-center ${
                insightData.type === "URGENT_REVIEW" ? "bg-rose-100 text-rose-600" 
                : insightData.type === "REVIEW" ? "bg-orange-100 text-orange-600"
                : "bg-blue-100 text-blue-600"
              }`}>
                {insightData.type === "URGENT_REVIEW" ? <AlertTriangle className="w-6 h-6" /> 
                : insightData.type === "REVIEW" ? <Flame className="w-6 h-6" />
                : <Info className="w-6 h-6" />}
              </div>
              <div>
                <h3 className={`text-base font-bold ${
                  insightData.type === "URGENT_REVIEW" ? "text-rose-800"
                  : insightData.type === "REVIEW" ? "text-orange-800"
                  : "text-blue-800"
                }`}>
                  {insightData.type === "KEEP_GOING" ? "Langkah Selanjutnya" : "Titik Kritis Terdeteksi!"}
                </h3>
                <p className={`text-sm mt-1 font-medium ${
                  insightData.type === "URGENT_REVIEW" ? "text-rose-600/90"
                  : insightData.type === "REVIEW" ? "text-orange-700/90"
                  : "text-blue-600/90"
                }`}>
                  {insightData.message}
                </p>
              </div>
            </div>
            <button
              onClick={() => router.push(insightData.actionUrl)}
              className={`shrink-0 w-full sm:w-auto px-6 py-3 rounded-xl font-bold text-sm text-white shadow-sm transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2 ${
                insightData.type === "URGENT_REVIEW" ? "bg-rose-600 hover:bg-rose-700 shadow-rose-200"
                : insightData.type === "REVIEW" ? "bg-orange-600 hover:bg-orange-700 shadow-orange-200"
                : "bg-blue-600 hover:bg-blue-700 shadow-blue-200"
              }`}
            >
              {insightData.actionText} <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══ 1. GETTING STARTED ═══ */}
      {!allJourneyDone && (
        <GettingStartedCard journey={effectiveJourney} collapsed={guideCollapsed} onToggle={handleToggleGuide} />
      )}

      {/* ═══ 2. HERO METRICS (2 Columns) ═══ */}
      <motion.div variants={stagger} className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Skor SNBT */}
        <motion.button variants={fadeUp} onClick={() => router.push("/analytics/radar")} className="bg-white shadow-[0_4px_20px_rgba(0,0,0,0.03)] rounded-[2rem] p-6 flex flex-col md:flex-row items-center gap-6 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-all group text-center md:text-left relative overflow-hidden border border-transparent">
          <motion.div variants={scaleIn} className="relative shrink-0">
            <ProgressRing progress={scoreProgress} size={80} stroke={7} color="var(--accent)" />
            <div className="absolute inset-0 flex items-center justify-center flex-col">
              <span className="text-xl font-semibold text-[var(--text-primary)]">{latestScore > 0 ? <AnimatedNumber value={Math.round(latestScore)} /> : "—"}</span>
            </div>
          </motion.div>
          <motion.div variants={fastStagger} className="w-full">
            <motion.p variants={fadeUp} className="text-sm text-[var(--text-secondary)] mb-1 font-normal">Skor Terakhir</motion.p>
            <motion.p variants={fadeUp} className="text-2xl font-semibold text-[var(--text-primary)] tracking-tight">{latestScore > 0 ? <AnimatedNumber value={Math.round(latestScore)} /> : <span className="text-base text-[var(--text-secondary)] font-normal">Belum ada data</span>}</motion.p>
            {targetScoreGap !== null && (
              <motion.div variants={fadeUp} className={`text-xs mt-1.5 font-semibold flex items-center gap-1 ${targetScoreGap > 0 ? "text-rose-500" : "text-emerald-500"}`}>
                {targetScoreGap > 0 ? <><ArrowDown className="w-3 h-3" /> {targetScoreGap} poin dari target</> : <><ArrowUp className="w-3 h-3" /> {Math.abs(targetScoreGap)} poin (Aman)</>}
              </motion.div>
            )}
          </motion.div>
        </motion.button>

        {/* Peluang Lulus */}
        <motion.div variants={fadeUp} className="bg-sky-500 text-white shadow-[0_4px_20px_rgba(14,165,233,0.25)] rounded-[2rem] p-6 flex flex-col justify-between hover:-translate-y-1 transition-transform relative overflow-hidden">
          <motion.div variants={fastStagger} className="flex items-center justify-between relative z-10">
            <motion.div variants={scaleIn} className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-sm shadow-sm">
              <Target className="w-5 h-5 text-white" />
            </motion.div>
            <motion.span variants={scaleIn} className="text-[10px] font-semibold bg-white/20 px-3 py-1.5 rounded-full backdrop-blur-sm shadow-sm">Proyeksi SNBT</motion.span>
          </motion.div>
          <motion.div variants={fastStagger} className="mt-4 relative z-10">
            <motion.p variants={fadeUp} className="text-xs font-medium text-white/80 mb-0.5">Peluang Lulus</motion.p>
            <motion.p variants={fadeUp} className="text-4xl font-bold tracking-tight">{peluangLulus > 0 ? <><AnimatedNumber value={peluangLulus} />%</> : "—"}</motion.p>
            <motion.p variants={fadeUp} className="text-sm font-medium text-white/90 mt-1">{peluangLabel}</motion.p>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* ═══ 3. ACTIONABLE INSIGHTS (3 Columns) ═══ */}
      <motion.div variants={stagger} className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Target Harian */}
        <motion.div variants={fadeUp} className="bg-purple-500 text-white shadow-[0_4px_20px_rgba(168,85,247,0.25)] rounded-[2rem] p-6 relative overflow-hidden flex flex-col justify-between hover:-translate-y-1 transition-transform border border-transparent">
          <div>
            <div className="flex items-center gap-3 mb-5 relative z-10">
              <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-sm">
                <CheckCircle2 className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-base font-bold text-white tracking-tight">Target Harian</h3>
            </div>
            <div className="space-y-4 relative z-10">
              <div className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded-full border ${stats.soalCount >= 20 ? 'bg-white border-white text-purple-600' : 'border-white/40'} flex items-center justify-center shadow-sm`}>
                  {stats.soalCount >= 20 && <CheckCircle2 className="w-3.5 h-3.5" />}
                </div>
                <p className={`text-sm ${stats.soalCount >= 20 ? 'text-white/60 line-through' : 'text-white font-medium'}`}>Kerjakan 20 Soal ({Math.min(stats.soalCount, 20)}/20)</p>
              </div>
              <div className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded-full border ${journeyProgress.learningPathExplored ? 'bg-white border-white text-purple-600' : 'border-white/40'} flex items-center justify-center shadow-sm`}>
                  {journeyProgress.learningPathExplored && <CheckCircle2 className="w-3.5 h-3.5" />}
                </div>
                <p className={`text-sm ${journeyProgress.learningPathExplored ? 'text-white/60 line-through' : 'text-white font-medium'}`}>Jelajahi Learning Path</p>
              </div>
            </div>
          </div>
          <button onClick={() => router.push("/practice")} className="mt-6 flex items-center gap-2 text-sm font-bold text-purple-700 bg-white px-5 py-3 rounded-full hover:bg-purple-50 hover:scale-[1.02] transition-all w-full justify-center relative z-10 shadow-sm">
            Mulai Latihan <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>

        {/* Top 3 Kelemahan */}
        <motion.div variants={fadeUp} className="bg-white shadow-[0_4px_20px_rgba(0,0,0,0.03)] rounded-[2rem] p-6 relative overflow-hidden flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2.5 mb-4 relative z-10">
              <div className="w-8 h-8 rounded-xl bg-rose-50 flex items-center justify-center shadow-sm">
                <TrendingUp className="w-4 h-4 text-rose-500 transform rotate-180" />
              </div>
              <h3 className="text-sm font-semibold text-slate-800">Top 3 Kelemahan</h3>
            </div>
            <div className="space-y-3 relative z-10">
              {[...radarData].filter(r => r.score > 0).sort((a, b) => a.score - b.score).slice(0, 3).map((item, i) => (
                <div key={i} className="flex flex-col gap-1">
                  <div className="flex justify-between text-xs">
                    <span className="font-medium text-slate-600 truncate mr-2">{item.subject}</span>
                    <span className="font-bold text-rose-500 shrink-0">{item.score}</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-rose-400 rounded-full" style={{ width: `${Math.min((item.score/1000)*100, 100)}%` }}></div>
                  </div>
                </div>
              ))}
              {radarData.filter(r => r.score > 0).length === 0 && (
                <p className="text-xs text-slate-400 text-center py-4">Belum ada data tryout.</p>
              )}
            </div>
          </div>
          <button onClick={() => router.push("/learning-path")} className="mt-6 flex items-center gap-2 text-sm font-bold text-rose-600 bg-rose-50 px-5 py-3 rounded-full hover:bg-rose-100 hover:scale-[1.02] transition-all w-full justify-center relative z-10 shadow-sm border border-rose-100">
            Perbaiki Sekarang <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>

        {/* Mini Chancing Engine */}
        <motion.div variants={fadeUp} className="bg-blue-600 text-white shadow-[0_4px_20px_rgba(37,99,235,0.25)] rounded-[2rem] p-6 relative overflow-hidden flex flex-col justify-between hover:-translate-y-1 transition-transform border border-transparent">
          <div>
            <div className="flex items-center gap-3 mb-5 relative z-10">
              <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-sm">
                <BrainCircuit className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-base font-bold text-white tracking-tight">Rekomendasi AI</h3>
            </div>
            <div className="relative z-10">
              {aiRecommendation ? (
                <div className="p-4 bg-white/10 border border-white/20 rounded-2xl backdrop-blur-sm shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2.5 py-1 bg-white text-blue-600 text-[10px] font-bold uppercase rounded-full tracking-wider shadow-sm">Aman</span>
                    <span className="text-[11px] text-white/90 font-medium">Berdasarkan Skormu</span>
                  </div>
                  <p className="text-sm font-bold text-white leading-tight mb-1">{aiRecommendation.name}</p>
                  <p className="text-xs font-medium text-white/80 truncate">{aiRecommendation.universityName}</p>
                </div>
              ) : (
                <p className="text-sm text-white/90 leading-relaxed font-medium">AI akan memberikan rekomendasi cadangan jurusan setelah kamu menyelesaikan Try Out pertamamu.</p>
              )}
            </div>
          </div>
          <button onClick={() => router.push("/analytics/chancing")} className="mt-6 flex items-center gap-2 text-sm font-bold text-blue-700 bg-white px-5 py-3 rounded-full hover:bg-blue-50 hover:scale-[1.02] transition-all w-full justify-center relative z-10 shadow-sm">
            Lihat Detail Peluang <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      </motion.div>

      {/* ═══ 3. AKTIVITAS & STATS ═══ */}
      <motion.div variants={stagger} className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Aktivitas Terakhir */}
        <motion.div variants={fadeUp} className="lg:col-span-2 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.03)] rounded-[2rem] p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold text-[var(--text-primary)]">Aktivitas Terakhir</h3>
            <button onClick={() => router.push("/tryout/list")} className="text-xs text-[var(--text-secondary)] font-medium hover:text-[var(--text-primary)] flex items-center gap-1 transition-colors">Semua <ChevronRight className="w-4 h-4" /></button>
          </div>
          <div className="grid grid-cols-1 gap-3">
            {recentActivities.length > 0 ? recentActivities.map((act, i) => (
              <div key={i} onClick={() => router.push("/tryout/list")} className="flex items-center justify-between p-3 rounded-2xl border border-slate-100 hover:bg-slate-50 transition-colors cursor-pointer group">
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform ${act.status === "Selesai" ? "bg-[var(--pastel-blue)]" : "bg-[var(--pastel-orange)]"}`}>
                    {act.status === "Selesai" ? <FileText className="w-5 h-5 text-sky-600" /> : <BookOpen className="w-5 h-5 text-orange-600" />}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-slate-800 truncate">{act.title}</p>
                    <p className="text-[11px] text-slate-500 font-medium">{act.status} • {act.date}</p>
                  </div>
                </div>
                <div className="text-right shrink-0 ml-3">
                  {act.status === "Selesai" ? (
                    <>
                      <p className="text-sm font-bold text-[var(--accent)]">{act.score}</p>
                      <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Skor</p>
                    </>
                  ) : (
                    <span className="text-[11px] font-bold text-orange-500 bg-orange-50 px-2.5 py-1 rounded-full">Lanjut</span>
                  )}
                </div>
              </div>
            )) : (
              <div className="text-center py-6 text-slate-400 text-sm font-medium border border-dashed border-slate-200 rounded-xl">Belum ada aktivitas</div>
            )}
          </div>
        </motion.div>

        {/* Stats Summary */}
        <motion.div variants={fadeUp} className="bg-white shadow-[0_4px_20px_rgba(0,0,0,0.03)] rounded-[2rem] p-6 flex flex-col justify-center gap-6">
          <UnifiedStatItem value={stats.tryOutCount.toString()} label="Total Tryout" icon={<BookOpen className="w-5 h-5 text-sky-600" />} bgColor="var(--pastel-blue)" />
          <UnifiedStatItem value={stats.soalCount.toString()} label="Soal Dijawab" icon={<Target className="w-5 h-5 text-emerald-600" />} bgColor="var(--pastel-green)" />
          <UnifiedStatItem value={stats.jamCount.toString()} label="Jam Belajar" icon={<BrainCircuit className="w-5 h-5 text-purple-600" />} bgColor="var(--pastel-purple)" />
        </motion.div>
      </motion.div>

      {/* ═══ 5. RADAR + TREN SKOR — analytics, paling bawah ═══ */}
      <motion.div variants={stagger} className={`grid grid-cols-1 gap-5 pb-4 ${trendData.length >= 2 ? "lg:grid-cols-2" : ""}`}>
        {/* Radar Kemampuan */}
        <motion.div variants={fadeUp} className="bg-white shadow-[0_4px_20px_rgba(0,0,0,0.03)] rounded-[2rem] p-6 flex flex-col">
          <motion.div variants={fastStagger} className="flex items-center justify-between mb-4">
            <motion.h2 variants={fadeUp} className="text-lg font-semibold text-[var(--text-primary)]">Radar Kemampuan</motion.h2>
            <motion.button variants={fadeUp} onClick={() => router.push("/analytics/radar")} className="text-xs text-[var(--text-secondary)] font-medium hover:text-[var(--text-primary)] flex items-center gap-1 transition-colors">Detail <ChevronRight className="w-4 h-4" /></motion.button>
          </motion.div>
          {hasData ? (
            <motion.div variants={scaleIn} className="flex-1 min-h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData} margin={{ top: 10, right: 30, bottom: 10, left: 30 }}>
                  <PolarGrid stroke="#f1f1f4" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: "var(--text-secondary)", fontSize: 10, fontWeight: 500 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 1000]} tick={false} axisLine={false} />
                  <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', fontSize: '12px' }} />
                  <Radar name="Skor" dataKey="score" stroke="var(--accent)" fill="var(--accent)" fillOpacity={0.25} />
                  <Radar name="Target" dataKey="target" stroke="var(--accent-secondary)" fill="var(--accent-secondary)" fillOpacity={0.15} strokeDasharray="4 4" />
                </RadarChart>
              </ResponsiveContainer>
            </motion.div>
          ) : (
            <motion.div variants={scaleIn} className="flex-1 min-h-[280px] flex flex-col items-center justify-center text-[var(--text-secondary)]">
              <Activity className="w-12 h-12 mb-4 text-slate-200" />
              <p className="text-sm font-medium">Kerjakan Try Out pertamamu</p>
            </motion.div>
          )}
        </motion.div>

        {/* Tren Skor */}
        {trendData.length >= 2 && (
          <motion.div variants={fadeUp} className="bg-white shadow-[0_4px_20px_rgba(0,0,0,0.03)] rounded-[2rem] p-6 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-[var(--text-primary)]">Tren Skor</h3>
              <button onClick={() => router.push("/analytics/radar")} className="text-xs text-[var(--text-secondary)] font-medium hover:text-[var(--text-primary)] flex items-center gap-1 transition-colors">Detail <ChevronRight className="w-4 h-4" /></button>
            </div>
            <div className="flex-1 min-h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData} margin={{ top: 5, right: 10, bottom: 5, left: -20 }}>
                  <XAxis dataKey="label" tick={{ fill: "var(--text-secondary)", fontSize: 11, fontWeight: 500 }} axisLine={false} tickLine={false} />
                  <YAxis domain={[0, 1000]} tick={{ fill: "var(--text-secondary)", fontSize: 10 }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{ borderRadius: "1rem", border: "1px solid #f1f1f4", boxShadow: "0 4px 20px rgba(0,0,0,0.05)", fontSize: "12px", fontWeight: 600 }}
                    formatter={(value: any) => [`${value}`, "Skor"]}
                  />
                  <Line type="monotone" dataKey="score" stroke="var(--accent)" strokeWidth={2.5} dot={{ r: 4, fill: "var(--accent)", stroke: "#fff", strokeWidth: 2 }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  )
}

/* ─── Unified Stat Item ─── */
function UnifiedStatItem({ value, label, icon, bgColor }: { value: string; label: string; icon: React.ReactNode; bgColor: string }) {
  return (
    <div className="flex items-center gap-4 px-2 md:px-6 py-2 md:py-0 hover:scale-[1.02] transition-transform cursor-pointer group">
      <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 group-hover:shadow-md transition-all" style={{ backgroundColor: bgColor }}>
        {icon}
      </div>
      <div>
        <p className="text-2xl font-bold text-[var(--text-primary)] tracking-tight">{value}</p>
        <p className="text-[11px] text-[var(--text-secondary)] font-semibold uppercase tracking-wider mt-0.5">{label}</p>
      </div>
    </div>
  )
}
