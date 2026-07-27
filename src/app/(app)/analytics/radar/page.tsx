"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { TrendingUp, Sparkles, CheckCircle2, AlertCircle, Target, Activity } from "lucide-react"
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer,
  Legend, Area, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip
} from "recharts"
import { motion } from "framer-motion"

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100, damping: 15 } }
  }

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-4 md:space-y-6"
    >
      <motion.div variants={itemVariants}>
        <h2 className="text-xl md:text-2xl font-bold mb-2 text-slate-800">
          Analisis Kemampuan
        </h2>
        <p className="text-[var(--text-secondary)] text-sm mb-4 md:mb-8">Detail performa per subtes dan tren perkembangan skor IRT-mu.</p>
      </motion.div>

      {hasRadarData && (
        <motion.div variants={itemVariants} className="bg-gradient-to-br from-[var(--pastel-blue)]/40 to-white border border-[var(--accent)]/15 rounded-3xl p-5 md:p-8 mb-4 md:mb-8 flex flex-col sm:flex-row gap-4 md:gap-6 shadow-sm overflow-hidden relative group hover:shadow-md transition-all duration-300">
          <div className="absolute -right-10 -top-10 opacity-5 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none">
            <Sparkles className="w-64 h-64 text-[var(--accent)]" />
          </div>
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[var(--accent)] to-[var(--accent-dark)] flex items-center justify-center shrink-0 shadow-lg shadow-[var(--accent)]/20 text-white z-10">
            <Sparkles className="w-7 h-7" />
          </div>
          <div className="z-10 flex-1">
            <h3 className="text-slate-800 text-lg font-bold mb-3 flex items-center gap-2">
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
                  trendSentence = `Kerja bagus! Tren skormu menunjukkan peningkatan sebesar +${Math.round(diff)} poin dari tryout sebelumnya. 🚀`
                } else if (diff < 0) {
                  trendSentence = `Perhatian, skor tryout terakhirmu turun ${Math.round(Math.abs(diff))} poin. Jangan patah semangat, perbanyak latihan! 💪`
                } else {
                  trendSentence = `Tren skormu cenderung stabil. Tingkatkan intensitas belajar untuk mendongkrak nilaimu. 📈`
                }
              }

              return (
                <div className="space-y-3">
                  <p className="text-slate-600 text-sm md:text-[15px] leading-relaxed">
                    Berdasarkan data terkini, rata-rata skor penguasaan materimu berada di angka <strong className="text-slate-800 bg-slate-100 px-2 py-0.5 rounded-md">{avgScore}</strong>. 
                    Untuk mengejar target jurusanmu, mata uji yang <strong className="text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md font-semibold">paling harus kamu prioritaskan</strong> saat ini adalah <strong>{worstSubject.subject}</strong> karena masih terpaut {Math.abs(worstSubject.diff)} poin dari target.
                  </p>
                  <p className="text-slate-600 text-sm md:text-[15px] leading-relaxed">
                    Kabar baiknya, performamu di <strong className="text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md font-semibold">{bestSubject.subject}</strong> sudah cukup solid dan paling mendekati target. {trendSentence}
                  </p>
                </div>
              )
            })()}
          </div>
        </motion.div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-4 md:mb-8">
        {/* Radar Chart */}
        <motion.div variants={itemVariants} className="bg-white border border-slate-100 rounded-3xl p-5 md:p-6 shadow-[0_8px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-shadow duration-300">
          <h2 className="text-base md:text-lg font-semibold mb-4 md:mb-6 text-slate-800 flex items-center gap-2">
            <Target className="w-5 h-5 text-[var(--accent)]" /> Radar Kemampuan vs Target
          </h2>
          <div className="h-[280px] md:h-[350px]">
            {hasRadarData ? (
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData} margin={{ top: 10, right: 30, bottom: 10, left: 30 }}>
                  <PolarGrid stroke="#f1f5f9" strokeWidth={1.5} />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 10, fontWeight: 600 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 1000]} tick={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '16px', border: '1px solid #f1f5f9', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)', padding: '12px' }}
                    itemStyle={{ fontWeight: 600 }}
                  />
                  <Radar name="Skor Kamu" dataKey="score" stroke="var(--accent)" strokeWidth={3} fill="var(--accent)" fillOpacity={0.3} />
                  <Radar name="Target PTN" dataKey="target" stroke="#cbd5e1" strokeWidth={2} fill="#cbd5e1" fillOpacity={0.1} strokeDasharray="4 4" />
                  <Legend wrapperStyle={{ fontSize: 12, fontWeight: 600, color: '#475569', paddingTop: '10px' }} />
                </RadarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-slate-400 bg-slate-50/50 rounded-2xl border border-slate-100 border-dashed">
                <Target className="w-10 h-10 mb-3 text-slate-300" />
                <p className="font-medium text-sm">Kerjakan Try Out pertamamu.</p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Trend Area Chart */}
        <motion.div variants={itemVariants} className="bg-white border border-slate-100 rounded-3xl p-5 md:p-6 shadow-[0_8px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-shadow duration-300">
          <h2 className="text-base md:text-lg font-semibold mb-4 md:mb-6 flex items-center gap-2 text-slate-800">
            <TrendingUp className="w-5 h-5 text-[var(--accent)]" /> Tren Skor SNBT
          </h2>
          <div className="h-[280px] md:h-[350px]">
            {hasTrendData ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--accent)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="var(--accent)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="4 4" stroke="#f1f5f9" vertical={false} />
                  <XAxis dataKey="date" tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 500 }} axisLine={false} tickLine={false} dy={10} />
                  <YAxis domain={[300, 800]} tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 500 }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#fff', border: '1px solid #f1f5f9', borderRadius: '16px', fontSize: 13, boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)', padding: '12px' }}
                    labelStyle={{ color: '#64748b', fontWeight: 600, marginBottom: '4px' }}
                    itemStyle={{ fontWeight: 700, color: 'var(--accent)' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="scaled" 
                    stroke="var(--accent)" 
                    fill="url(#colorScore)" 
                    strokeWidth={4} 
                    activeDot={{ r: 7, fill: 'var(--accent)', stroke: '#fff', strokeWidth: 3, style: { filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' } }} 
                  />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-slate-400 bg-slate-50/50 rounded-2xl border border-slate-100 border-dashed">
                <TrendingUp className="w-10 h-10 mb-3 text-slate-300" />
                <p className="font-medium text-sm text-center px-6">Belum ada data trend.<br/>Selesaikan Try Out terlebih dahulu.</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Subject Breakdown Table */}
      <motion.div variants={itemVariants} className="bg-white border border-slate-100 rounded-3xl p-5 md:p-6 shadow-[0_8px_30px_rgba(0,0,0,0.03)] overflow-hidden">
        <h2 className="text-base md:text-lg font-semibold mb-4 md:mb-6 text-slate-800">Detail Per Subtes</h2>
        {hasRadarData ? (
          <div className="overflow-x-auto no-scrollbar">
            <table className="w-full text-xs md:text-sm">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400">
                  <th className="text-left py-4 px-3 font-semibold uppercase tracking-wider text-[10px] md:text-xs">Subtes</th>
                  <th className="text-center py-4 px-3 font-semibold uppercase tracking-wider text-[10px] md:text-xs">Skor Kamu</th>
                  <th className="text-center py-4 px-3 font-semibold uppercase tracking-wider text-[10px] md:text-xs">Target PTN</th>
                  <th className="text-center py-4 px-3 font-semibold uppercase tracking-wider text-[10px] md:text-xs">Selisih</th>
                  <th className="text-center py-4 px-3 font-semibold uppercase tracking-wider text-[10px] md:text-xs">Status</th>
                </tr>
              </thead>
              <tbody>
                {subjectBreakdown.map((s) => {
                  const statusConfig: Record<string, { color: string, bg: string, label: string, icon: any }> = {
                    good: { color: "text-emerald-700", bg: "bg-emerald-50 border-emerald-100", label: "Aman", icon: CheckCircle2 },
                    warning: { color: "text-amber-700", bg: "bg-amber-50 border-amber-100", label: "Perlu Latihan", icon: AlertCircle },
                    danger: { color: "text-rose-700", bg: "bg-rose-50 border-rose-100", label: "Fokus Utama!", icon: AlertCircle },
                  }
                  const config = statusConfig[s.status]
                  const Icon = config.icon

                  return (
                    <tr key={s.subject} className="border-b border-slate-50 hover:bg-slate-50 transition-colors group">
                      <td className="py-4 px-3 text-slate-700 font-medium group-hover:text-slate-900 transition-colors">{s.subject}</td>
                      <td className="py-4 px-3 text-center">
                        {s.score > 0 ? (
                          <span className="font-semibold text-slate-800 text-sm md:text-base">{s.score}</span>
                        ) : (
                          <span className="text-[10px] text-slate-400 font-medium italic bg-slate-100 px-2 py-1 rounded-md">Kosong</span>
                        )}
                      </td>
                      <td className="py-4 px-3 text-center text-slate-500 font-medium">{s.target}</td>
                      <td className="py-4 px-3 text-center">
                        {s.score > 0 ? (
                          <span className={`font-semibold text-sm md:text-base ${s.diff >= 0 ? "text-emerald-600" : "text-rose-500"}`}>
                            {s.diff >= 0 ? `+${s.diff}` : s.diff}
                          </span>
                        ) : (
                          <span className="text-slate-300">—</span>
                        )}
                      </td>
                      <td className="py-4 px-3 text-center">
                        {s.score > 0 ? (
                          <div className={`inline-flex items-center justify-center gap-1.5 text-xs px-3 py-1.5 rounded-lg font-bold border ${config.bg} ${config.color}`}>
                            {config.label}
                            <Icon className="w-3.5 h-3.5" />
                          </div>
                        ) : (
                          <span className="text-[10px] text-slate-400 bg-slate-50 border border-slate-100 px-2.5 py-1 rounded-md font-medium">Belum Ujian</span>
                        )}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
            <div className="w-16 h-16 bg-slate-50 border border-slate-100 rounded-full flex items-center justify-center mb-4">
              <Activity className="w-8 h-8 text-slate-300" />
            </div>
            <h3 className="text-slate-800 font-semibold mb-1">Belum Ada Data Tersedia</h3>
            <p className="text-slate-500 text-sm max-w-sm">Kerjakan Try Out terlebih dahulu untuk melihat analisis detail per subtes.</p>
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}
