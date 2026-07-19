"use client"

import { useRouter } from "next/navigation"
import { TrendingUp, TrendingDown, GraduationCap, Star, CheckCircle2, AlertCircle, AlertTriangle, XCircle, Sparkles, ArrowUpRight, Minus, Info, Lightbulb } from "lucide-react"
import { motion } from "framer-motion"

interface Result {
  majorId: string; name: string; university: string; estimatedScore: number
  quota: number; applicants: number; competitiveness: number
  percentage: number; label: string; deficit: number; isTarget: boolean
  aiType: string | null; aiReason: string | null
}

interface BehaviorContext {
  scoreTrend: 'rising' | 'stable' | 'declining' | 'unknown'
  attemptCount: number
  strongSubjects: string[]
}

const labelCfg: Record<string, { color: string; bg: string; icon: any; text: string }> = {
  AMAN: { color: "text-emerald-600", bg: "border-emerald-200", icon: CheckCircle2, text: "AMAN" },
  BERSAING: { color: "text-blue-600", bg: "border-blue-200", icon: ArrowUpRight, text: "BERSAING" },
  PELUANG_CUKUP: { color: "text-amber-600", bg: "border-amber-200", icon: AlertCircle, text: "PELUANG CUKUP" },
  SULIT: { color: "text-orange-600", bg: "border-orange-200", icon: AlertTriangle, text: "SULIT" },
  SANGAT_SULIT: { color: "text-rose-600", bg: "border-rose-200", icon: XCircle, text: "SANGAT SULIT" },
}

const trendCfg: Record<string, { icon: any; color: string; label: string }> = {
  rising: { icon: TrendingUp, color: "text-emerald-600 bg-emerald-50 border-emerald-100", label: "Skor naik" },
  stable: { icon: Minus, color: "text-slate-500 bg-slate-50 border-slate-100", label: "Skor stabil" },
  declining: { icon: TrendingDown, color: "text-rose-500 bg-rose-50 border-rose-100", label: "Skor turun" },
}

export default function ChancingClient({
  results, studentScore, behaviorContext
}: {
  results: Result[]; studentScore: number; behaviorContext: BehaviorContext
}) {
  const router = useRouter()
  const trend = trendCfg[behaviorContext.scoreTrend]

  const targetNeedsHelp = results.some(r => r.isTarget && r.percentage < 70)

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl md:text-2xl font-bold mb-2 text-slate-800">Chancing Engine</h2>
        <p className="text-[var(--text-secondary)] text-sm">Estimasi peluang lolos berdasarkan skor SNBT-mu ({studentScore}).</p>
      </div>

      {/* Behavior Context Banner */}
      {behaviorContext.attemptCount > 0 && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap items-center gap-2.5 p-3.5 bg-white border border-slate-100 rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.02)]"
        >
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
            <Info className="w-3.5 h-3.5" /> Berdasarkan {behaviorContext.attemptCount} Try Out
          </div>
          {trend && (
            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-[10px] font-bold border ${trend.color}`}>
              <trend.icon className="w-3 h-3" /> {trend.label}
            </span>
          )}
          {behaviorContext.strongSubjects.length > 0 && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-[10px] font-bold bg-purple-50 text-purple-600 border border-purple-100">
              <Star className="w-3 h-3 fill-purple-500" /> Terkuat: {behaviorContext.strongSubjects[0]}
            </span>
          )}
        </motion.div>
      )}

      {/* Bridge to Learning Path if Target chance is low */}
      {targetNeedsHelp && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-rose-50 border border-rose-200 rounded-2xl shadow-sm"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center shrink-0 text-rose-600">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-rose-800">Peluang Lolos Target Rendah!</h3>
              <p className="text-xs text-rose-600 mt-0.5">Sistem telah menyesuaikan prioritas belajarmu berdasarkan target ini.</p>
            </div>
          </div>
          <button
            onClick={() => router.push('/learning-path')}
            className="w-full sm:w-auto px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl shadow-sm transition-colors flex items-center justify-center gap-2"
          >
            Tambal Kelemahan <ArrowUpRight className="w-4 h-4" />
          </button>
        </motion.div>
      )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {results.map((r, i) => {
            const cfg = labelCfg[r.label] || labelCfg.SANGAT_SULIT
            const barColor = r.percentage >= 60 ? "hsl(150,70%,45%)" : r.percentage >= 40 ? "hsl(200,80%,50%)" : r.percentage >= 25 ? "hsl(45,90%,50%)" : "hsl(10,80%,55%)"
            return (
              <motion.div key={r.majorId} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                className={`bg-white border rounded-2xl p-6 cursor-pointer hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-all shadow-[0_4px_20px_rgba(0,0,0,0.03)] ${cfg.bg}`}
                onClick={() => router.push(`/analytics/chancing/${r.majorId}`)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="mb-2">
                      {r.isTarget ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-50 text-indigo-600 border border-indigo-100 uppercase tracking-wider">
                          <Star className="w-3 h-3 fill-indigo-600" /> Target Jurusanmu
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-purple-50 text-purple-600 border border-purple-100 uppercase tracking-wider">
                          <Sparkles className="w-3 h-3 text-purple-600" /> Rekomendasi AI: {r.aiType}
                        </span>
                      )}
                    </div>
                    <div className="flex items-start gap-2 mb-1">
                      <GraduationCap className="w-5 h-5 text-[var(--accent)] shrink-0 mt-0.5" />
                      <h3 className="font-semibold text-slate-800 leading-tight">{r.name}</h3>
                    </div>
                    <p className="text-slate-400 text-sm ml-7">{r.university}</p>
                  </div>
                  <div className="text-right">
                    <div className={`text-3xl font-bold ${cfg.color}`}>{r.percentage}%</div>
                    <div className={`text-xs mt-1 font-bold tracking-wider flex items-center justify-end gap-1.5 ${cfg.color}`}>
                      <cfg.icon className="w-3.5 h-3.5" strokeWidth={3} /> {cfg.text}
                    </div>
                  </div>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full mb-4">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${r.percentage}%` }} transition={{ duration: 0.8, delay: i * 0.1 }}
                    className="h-2 rounded-full" style={{ background: barColor }} />
                </div>

                {/* AI Reasoning */}
                {r.aiReason && (
                  <p className="text-[11px] text-slate-500 mb-3 leading-relaxed bg-slate-50/50 px-3 py-2 rounded-xl border border-slate-100/50 font-medium flex items-start gap-1.5">
                    <Lightbulb className="w-3.5 h-3.5 text-amber-500 shrink-0" /> {r.aiReason}
                  </p>
                )}

                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div><span className="text-slate-400 text-xs">Skor Kamu</span><p className="font-semibold text-slate-800">{studentScore}</p></div>
                  <div><span className="text-slate-400 text-xs">Estimasi Aman</span><p className="font-semibold text-slate-800">{r.estimatedScore}</p></div>
                  <div><span className="text-slate-400 text-xs">Selisih</span><p className={`font-semibold flex items-center gap-1 ${r.deficit >= 0 ? "text-emerald-600" : "text-rose-500"}`}>
                    {r.deficit >= 0 ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}{r.deficit >= 0 ? `+${r.deficit}` : r.deficit}
                  </p></div>
                  <div><span className="text-slate-400 text-xs">Keketatan</span><p className="font-semibold text-slate-800">1:{r.competitiveness}</p></div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {results.length > 0 && results.every(r => r.label === 'SANGAT_SULIT') && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="mt-8 p-5 bg-indigo-50/50 border border-indigo-100 rounded-2xl flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5 text-indigo-500" />
            </div>
            <div>
              <h4 className="font-bold text-slate-800 mb-1">Skor kamu masih di tahap awal pembentukan!</h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                Jangan khawatir melihat semuanya merah. Ini wajar di awal persiapan. Fokus kerjakan modul <strong>'Belum Mulai'</strong> di <em>Learning Path</em> untuk mendongkrak skormu bulan depan. Kamu pasti bisa!
              </p>
            </div>
          </motion.div>
        )}
    </div>
  )
}
