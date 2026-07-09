"use client"

import { Suspense, useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import AuthLayout from "@/components/layout/AuthLayout"
import { Loader2, ArrowRight, Target, Brain, AlertCircle, TrendingUp, Sparkles, GraduationCap, Users, CheckCircle2, ShieldCheck } from "lucide-react"

type ChanceLevel = {
  level: string
  percent: number
  color: string
}

type TargetInfo = {
  label: string
  majorId: string
  majorName: string
  universityName: string
  faculty: string
  estimatedScore: number
  quota: number
  applicants: number
  chance: ChanceLevel
}

type AiRecommendation = {
  majorId: string
  majorName: string
  universityName: string
  faculty: string
  estimatedScore: number
  quota: number
  applicants: number
  chance: ChanceLevel
}

function ChanceBadge({ chance }: { chance: ChanceLevel }) {
  const colors: Record<string, string> = {
    emerald: "bg-emerald-50 text-emerald-700 border-emerald-200",
    amber: "bg-amber-50 text-amber-700 border-amber-200",
    orange: "bg-orange-50 text-orange-700 border-orange-200",
    rose: "bg-rose-50 text-rose-700 border-rose-200",
  }
  return (
    <span className={`text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full border ${colors[chance.color] || colors.rose}`}>
      {chance.level} · {chance.percent}%
    </span>
  )
}

function TargetCard({ target, highlight }: { target: TargetInfo; highlight?: boolean }) {
  return (
    <div className={`rounded-2xl border p-4 transition-all ${highlight ? "border-[var(--accent)]/30 bg-[var(--pastel-purple)]/30 shadow-sm" : "border-slate-200/60 bg-white"}`}>
      <div className="flex items-start justify-between mb-3">
        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{target.label}</span>
        <ChanceBadge chance={target.chance} />
      </div>
      <h4 className="font-bold text-slate-800 text-sm leading-snug mb-1">{target.majorName}</h4>
      <p className="text-xs text-slate-500 mb-3">{target.universityName} · {target.faculty}</p>
      <div className="grid grid-cols-3 gap-2 text-center">
        <div className="bg-slate-50 rounded-lg p-2">
          <p className="text-[9px] font-bold text-slate-400 uppercase">Target</p>
          <p className="text-sm font-bold text-slate-700">{target.estimatedScore}</p>
        </div>
        <div className="bg-slate-50 rounded-lg p-2">
          <p className="text-[9px] font-bold text-slate-400 uppercase">Kuota</p>
          <p className="text-sm font-bold text-slate-700">{target.quota}</p>
        </div>
        <div className="bg-slate-50 rounded-lg p-2">
          <p className="text-[9px] font-bold text-slate-400 uppercase">Peminat</p>
          <p className="text-sm font-bold text-slate-700">{target.applicants}</p>
        </div>
      </div>
    </div>
  )
}

function OnboardingResultContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const attemptId = searchParams?.get("attemptId")
  
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [choice, setChoice] = useState<"keep" | "ai" | null>(null)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (!attemptId) {
      router.push("/onboarding")
      return
    }

    fetch(`/api/tryout/${attemptId}/result`)
      .then(res => res.json())
      .then(res => {
        setData(res)
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setLoading(false)
      })
  }, [attemptId, router])

  const handleContinue = async () => {
    if (choice === "ai" && data?.targetAnalysis?.aiRecommendation) {
      setSaving(true)
      try {
        await fetch("/api/onboarding", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ targetMajor2Id: data.targetAnalysis.aiRecommendation.majorId }),
        })
      } catch (e) {
        console.error("Failed to update profile:", e)
      }
      setSaving(false)
    }
    router.push("/onboarding/plan")
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-slate-500 gap-4">
        <Loader2 className="w-8 h-8 animate-spin text-[var(--accent)]" />
        <p className="font-medium animate-pulse">Menganalisis hasil tesmu...</p>
      </div>
    )
  }

  if (!data || data.error) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-slate-500 gap-4">
        <AlertCircle className="w-12 h-12 text-rose-400" />
        <p className="font-medium">Gagal memuat hasil. Silakan coba lagi.</p>
        <button onClick={() => window.location.reload()} className="text-[var(--accent)] font-bold mt-2">Muat Ulang</button>
      </div>
    )
  }

  const correctAnswers = data.questions.filter((q: any) => q.isCorrect).length
  const totalQuestions = data.questions.length
  const analysis = data.targetAnalysis
  const hasTargets = analysis && analysis.targets && analysis.targets.length > 0
  const hasAiRec = analysis && analysis.aiRecommendation
  // Auto-skip choice if no targets/recommendation
  const needsChoice = hasTargets && hasAiRec
  const canContinue = !needsChoice || choice !== null

  // Calculate subject performance
  const subjects: Record<string, { total: number; correct: number }> = {}
  data.questions.forEach((q: any) => {
    if (!subjects[q.subject]) subjects[q.subject] = { total: 0, correct: 0 }
    subjects[q.subject].total++
    if (q.isCorrect) subjects[q.subject].correct++
  })

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight mb-1">Hasil Diagnostik</h2>
          <p className="text-slate-500 font-medium text-sm">Ini titik awalmu sebelum menyusun rencana belajar.</p>
        </div>
        <div className="w-12 h-12 rounded-2xl bg-[var(--accent)]/10 text-[var(--accent)] flex items-center justify-center shrink-0">
          <Brain className="w-6 h-6" />
        </div>
      </div>

      {/* Main Score Card */}
      <div className="bg-gradient-to-br from-[var(--pastel-purple)] to-[var(--pastel-blue)]/30 rounded-2xl p-5 mb-6 border border-[var(--accent)]/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--accent)]/5 rounded-full blur-2xl translate-x-10 -translate-y-10" />
        <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--accent-dark)] mb-1">Prediksi Skor SNBT</p>
        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-4xl font-black text-slate-900 tracking-tight">{data.scaledScore}</span>
          <span className="text-slate-500 font-medium text-sm">/ 1000</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-2.5 border border-white/40">
            <p className="text-[9px] uppercase font-bold text-slate-500 mb-0.5">Jawaban Benar</p>
            <p className="text-base font-bold text-slate-800">{correctAnswers} <span className="text-xs text-slate-400 font-medium">dari {totalQuestions}</span></p>
          </div>
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-2.5 border border-white/40">
            <p className="text-[9px] uppercase font-bold text-slate-500 mb-0.5">Skor IRT (θ)</p>
            <p className="text-base font-bold text-slate-800">{data.irtScore?.toFixed(2) || 0}</p>
          </div>
        </div>
      </div>

      {/* ========================================= */}
      {/* TARGET ANALYSIS — Peluang Lolos */}
      {/* ========================================= */}
      {hasTargets && (
        <div className="mb-6">
          <h3 className="font-bold text-slate-800 mb-3 flex items-center gap-2 text-sm">
            <GraduationCap className="w-4 h-4 text-[var(--accent)]" /> Radar Peluang Lolos
          </h3>
          <div className="space-y-3">
            {analysis.targets.map((t: TargetInfo) => (
              <TargetCard key={t.majorId} target={t} />
            ))}
          </div>
        </div>
      )}

      {/* AI Recommendation */}
      {hasAiRec && (
        <div className="mb-6">
          <div className="rounded-2xl border-2 border-dashed border-[var(--accent)]/30 bg-[var(--accent)]/[0.03] p-4 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[var(--accent)]/5 rounded-full blur-2xl translate-x-6 -translate-y-6" />
            <div className="flex items-center gap-2 mb-3 relative z-10">
              <div className="w-8 h-8 rounded-lg bg-[var(--accent)]/10 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-[var(--accent)]" />
              </div>
              <div>
                <p className="text-xs font-bold text-[var(--accent-dark)]">Rekomendasi AI</p>
                <p className="text-[10px] text-slate-500">Jurusan alternatif realistis berdasarkan skormu</p>
              </div>
            </div>
            <div className="relative z-10">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h4 className="font-bold text-slate-800 text-sm leading-snug">{analysis.aiRecommendation.majorName}</h4>
                  <p className="text-xs text-slate-500">{analysis.aiRecommendation.universityName} · {analysis.aiRecommendation.faculty}</p>
                </div>
                <ChanceBadge chance={analysis.aiRecommendation.chance} />
              </div>
              <div className="grid grid-cols-3 gap-2 text-center mt-3">
                <div className="bg-white/80 rounded-lg p-2">
                  <p className="text-[9px] font-bold text-slate-400 uppercase">Target</p>
                  <p className="text-sm font-bold text-slate-700">{analysis.aiRecommendation.estimatedScore}</p>
                </div>
                <div className="bg-white/80 rounded-lg p-2">
                  <p className="text-[9px] font-bold text-slate-400 uppercase">Kuota</p>
                  <p className="text-sm font-bold text-slate-700">{analysis.aiRecommendation.quota}</p>
                </div>
                <div className="bg-white/80 rounded-lg p-2">
                  <p className="text-[9px] font-bold text-slate-400 uppercase">Peminat</p>
                  <p className="text-sm font-bold text-slate-700">{analysis.aiRecommendation.applicants}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Choice Buttons */}
      {needsChoice && (
        <div className="mb-6">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Pilih Strategimu</p>
          <div className="space-y-2">
            <button
              onClick={() => setChoice("keep")}
              className={`w-full flex items-center gap-3 p-3.5 rounded-xl border-2 transition-all text-left ${
                choice === "keep"
                  ? "border-[var(--accent)] bg-[var(--pastel-purple)]/40 shadow-sm"
                  : "border-slate-200 bg-white hover:border-slate-300"
              }`}
            >
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${choice === "keep" ? "bg-[var(--accent)] text-white" : "bg-slate-100 text-slate-400"}`}>
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <p className={`font-bold text-sm ${choice === "keep" ? "text-[var(--accent-dark)]" : "text-slate-700"}`}>Tetap Gas Pilihan Awal!</p>
                <p className="text-[11px] text-slate-500">Rencana belajar akan difokuskan agar skormu naik menuju target awal.</p>
              </div>
            </button>

            <button
              onClick={() => setChoice("ai")}
              className={`w-full flex items-center gap-3 p-3.5 rounded-xl border-2 transition-all text-left ${
                choice === "ai"
                  ? "border-[var(--accent)] bg-[var(--pastel-purple)]/40 shadow-sm"
                  : "border-slate-200 bg-white hover:border-slate-300"
              }`}
            >
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${choice === "ai" ? "bg-[var(--accent)] text-white" : "bg-slate-100 text-slate-400"}`}>
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <p className={`font-bold text-sm ${choice === "ai" ? "text-[var(--accent-dark)]" : "text-slate-700"}`}>Ambil Rekomendasi AI</p>
                <p className="text-[11px] text-slate-500">Pilihan 2 akan diganti ke <strong>{analysis.aiRecommendation.majorName}</strong> yang lebih realistis.</p>
              </div>
            </button>
          </div>
        </div>
      )}

      {/* Subject Breakdown */}
      <div className="mb-8">
        <h3 className="font-bold text-slate-800 mb-3 flex items-center gap-2 text-sm">
          <Target className="w-4 h-4 text-[var(--accent)]" /> Analisis per Subtes
        </h3>
        <div className="space-y-2">
          {Object.entries(subjects).map(([subject, stats]: [string, any]) => {
            const percentage = Math.round((stats.correct / stats.total) * 100)
            let color = "bg-rose-500"
            if (percentage >= 70) color = "bg-emerald-500"
            else if (percentage >= 40) color = "bg-amber-500"

            return (
              <div key={subject} className="bg-slate-50 border border-slate-100 rounded-xl p-3">
                <div className="flex justify-between items-end mb-1.5">
                  <span className="font-semibold text-slate-700 text-xs">{subject}</span>
                  <span className="text-[10px] font-bold text-slate-500">{stats.correct}/{stats.total} Benar</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                  <div className={`h-full ${color} rounded-full transition-all duration-1000`} style={{ width: `${percentage}%` }} />
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* CTA */}
      <button 
        onClick={handleContinue}
        disabled={!canContinue || saving}
        className="w-full flex items-center justify-center gap-2 py-4 bg-[var(--accent)] hover:bg-[var(--accent-hover)] disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl font-bold shadow-[0_4px_15px_rgba(193,119,249,0.3)] transition-all"
      >
        {saving ? (
          <><Loader2 className="w-4 h-4 animate-spin" /> Menyimpan...</>
        ) : (
          <>Lanjut Buat Rencana Belajar <ArrowRight className="w-5 h-5" /></>
        )}
      </button>

      {!canContinue && (
        <p className="text-center text-[11px] text-slate-400 mt-2 font-medium">Pilih strategi di atas untuk melanjutkan</p>
      )}
    </div>
  )
}

export default function OnboardingResultPage() {
  return (
    <AuthLayout title="Hasil Uji Diagnostik">
      <Suspense fallback={<div className="py-20 flex justify-center"><Loader2 className="w-8 h-8 animate-spin text-[var(--accent)]" /></div>}>
        <OnboardingResultContent />
      </Suspense>
    </AuthLayout>
  )
}
