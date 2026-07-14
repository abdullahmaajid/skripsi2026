"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, TrendingUp, Brain, Sparkles, CheckCircle2 } from "lucide-react"
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer,
  Legend, Area, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip
} from "recharts"

export default function AnalyticsRadarPage() {
  const router = useRouter()
  const [radarData, setRadarData] = useState<any[]>([])
  const [trendData, setTrendData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      fetch("/api/analytics/radar").then(r => r.json()),
      fetch("/api/analytics/trend").then(r => r.json()),
    ]).then(([radar, trend]) => {
      setRadarData(radar.data || [])
      setTrendData(trend.data || [])
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [])

  // Derive subject breakdown from radar data
  const subjectBreakdown = radarData.map(s => {
    const diff = s.score - s.target
    const status = diff >= 0 ? "good" : diff >= -50 ? "warning" : "danger"
    return { ...s, diff, status }
  })

  const hasRadarData = radarData.some(r => r.score > 0)
  const hasTrendData = trendData.length > 0

  return (
    <div className="space-y-4 md:space-y-6">
        <h1 className="text-xl md:text-3xl font-bold tracking-tight mb-1 text-slate-800">Analisis Kemampuan</h1>
        <p className="text-[var(--text-secondary)] text-sm mb-4 md:mb-8">Detail performa per subtes dan perkembangan skor IRT-mu.</p>

        {hasRadarData && (
          <div className="bg-[var(--pastel-blue)]/30 border border-[var(--accent)]/10 rounded-2xl md:rounded-3xl p-4 md:p-6 mb-4 md:mb-8 flex flex-col sm:flex-row gap-3 md:gap-5">
            <div className="w-12 h-12 rounded-2xl bg-[var(--accent)]/10 flex items-center justify-center shrink-0 shadow-sm border border-[var(--accent)]/20">
              <Sparkles className="w-6 h-6 text-[var(--accent)]" />
            </div>
            <div>
              <h3 className="text-slate-800 font-bold mb-2 flex items-center gap-2">
                Insight Analisis Cerdas
              </h3>
              {(() => {
                const validSubjects = subjectBreakdown.filter(s => s.score > 0)
                if (validSubjects.length === 0) return null

                const sortedByDiff = [...validSubjects].sort((a, b) => a.diff - b.diff)
                const worstSubject = sortedByDiff[0]
                const bestSubject = sortedByDiff[sortedByDiff.length - 1]

                const totalScore = validSubjects.reduce((acc, curr) => acc + curr.score, 0)
                const avgScore = Math.round(totalScore / validSubjects.length)

                let trendSentence = ""
                if (trendData.length >= 2) {
                  const latest = trendData[trendData.length - 1].scaled
                  const previous = trendData[trendData.length - 2].scaled
                  const diff = latest - previous
                  if (diff > 0) {
                    trendSentence = `Kerja bagus! Tren skormu menunjukkan peningkatan sebesar +${Math.round(diff)} poin dari tryout sebelumnya.`
                  } else if (diff < 0) {
                    trendSentence = `Perhatian, skor tryout terakhirmu turun ${Math.round(Math.abs(diff))} poin. Jangan patah semangat, perbanyak latihan!`
                  } else {
                    trendSentence = `Tren skormu cenderung stabil. Tingkatkan intensitas belajar untuk mendongkrak nilaimu.`
                  }
                }

                return (
                  <div className="space-y-2">
                    <p className="text-slate-600 text-sm leading-relaxed">
                      Berdasarkan data terkini, rata-rata skor penguasaan materimu berada di angka <strong>{avgScore}</strong>. 
                      Untuk mengejar target jurusanmu, mata uji yang <strong className="text-rose-600">paling harus kamu prioritaskan</strong> saat ini adalah <strong>{worstSubject.subject}</strong> karena masih terpaut {Math.abs(worstSubject.diff)} poin dari target.
                    </p>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      Kabar baiknya, performamu di <strong className="text-emerald-600">{bestSubject.subject}</strong> sudah cukup solid dan paling mendekati target. {trendSentence}
                    </p>
                  </div>
                )
              })()}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-4 md:mb-8">
          {/* Radar */}
          <div className="bg-white border border-slate-100 rounded-2xl md:rounded-3xl p-3 md:p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
            <h2 className="text-base md:text-lg font-semibold mb-4 md:mb-6 text-slate-800">Radar Kemampuan vs Target</h2>
            <div className="h-[260px] md:h-[350px]">
              {hasRadarData ? (
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={radarData}>
                    <PolarGrid stroke="#e2e8f0" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 9 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 1000]} tick={false} axisLine={false} />
                    <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }} />
                    <Radar name="Skor Kamu" dataKey="score" stroke="var(--accent)" fill="var(--accent)" fillOpacity={0.25} />
                    <Radar name="Target PTN" dataKey="target" stroke="#94a3b8" fill="#94a3b8" fillOpacity={0.1} strokeDasharray="4 4" />
                    <Legend wrapperStyle={{ fontSize: 12, color: '#64748b' }} />
                  </RadarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center text-slate-400">
                  <p>Kerjakan Try Out pertamamu untuk melihat radar kemampuan.</p>
                </div>
              )}
            </div>
          </div>

          {/* Trend */}
          <div className="bg-white border border-slate-100 rounded-2xl md:rounded-3xl p-3 md:p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
            <h2 className="text-base md:text-lg font-semibold mb-4 md:mb-6 flex items-center gap-2 text-slate-800">
              <TrendingUp className="w-5 h-5 text-[var(--accent)]" /> Tren Skor SNBT
            </h2>
            <div className="h-[260px] md:h-[350px]">
              {hasTrendData ? (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={trendData}>
                    <defs>
                      <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--accent)" stopOpacity={0.2} />
                        <stop offset="95%" stopColor="var(--accent)" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="date" tick={{ fill: '#64748b', fontSize: 12 }} />
                    <YAxis domain={[300, 800]} tick={{ fill: '#64748b', fontSize: 12 }} />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', fontSize: 13, boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}
                      labelStyle={{ color: '#64748b' }}
                    />
                    <Area type="monotone" dataKey="scaled" stroke="var(--accent)" fill="url(#colorScore)" strokeWidth={2.5} dot={{ r: 5, fill: 'var(--accent)', stroke: '#fff', strokeWidth: 2 }} />
                  </AreaChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center text-slate-400">
                  <p>Belum ada data trend. Selesaikan beberapa Try Out terlebih dahulu.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Subject Breakdown Table */}
        <div className="bg-white border border-slate-100 rounded-2xl md:rounded-3xl p-3 md:p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
          <h2 className="text-base md:text-lg font-semibold mb-4 md:mb-6 text-slate-800">Detail Per Subtes</h2>
          {hasRadarData ? (
            <div className="overflow-x-auto">
              <table className="w-full text-xs md:text-sm">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-400">
                    <th className="text-left py-3 px-2 font-medium">Subtes</th>
                    <th className="text-center py-3 px-2 font-medium">Skor Kamu</th>
                    <th className="text-center py-3 px-2 font-medium">Target</th>
                    <th className="text-center py-3 px-2 font-medium">Selisih</th>
                    <th className="text-center py-3 px-2 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {subjectBreakdown.map((s) => {
                    const statusColors: Record<string, string> = {
                      good: "text-emerald-600 bg-emerald-50",
                      warning: "text-amber-600 bg-amber-50",
                      danger: "text-rose-600 bg-rose-50",
                    }
                    const statusLabels: Record<string, string> = {
                      good: "Aman",
                      warning: "Perlu Latihan",
                      danger: "Fokus Utama!",
                    }
                    return (
                      <tr key={s.subject} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                        <td className="py-3 px-2 text-slate-700 font-medium">{s.subject}</td>
                        <td className="py-3 px-2 text-center font-semibold text-slate-800">{s.score > 0 ? s.score : "—"}</td>
                        <td className="py-3 px-2 text-center text-slate-400">{s.target}</td>
                        <td className={`py-3 px-2 text-center font-medium ${s.score > 0 ? (s.diff >= 0 ? "text-emerald-600" : "text-rose-500") : "text-slate-300"}`}>
                          {s.score > 0 ? (s.diff >= 0 ? `+${s.diff}` : s.diff) : "—"}
                        </td>
                        <td className="py-3 px-2 text-center">
                          {s.score > 0 ? (
                            <span className={`inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full font-medium ${statusColors[s.status]}`}>
                              {statusLabels[s.status]}
                              {s.status === "good" && <CheckCircle2 className="w-3 h-3" />}
                            </span>
                          ) : (
                            <span className="text-xs text-slate-300">—</span>
                          )}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-slate-400 text-center py-8">Belum ada data. Kerjakan Try Out untuk melihat detail per subtes.</p>
          )}
        </div>
    </div>
  )
}
