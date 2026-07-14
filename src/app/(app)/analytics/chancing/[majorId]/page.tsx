"use client"

import { useEffect, useState, use } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, GraduationCap, Loader2, AlertTriangle, Lightbulb, CheckCircle2 } from "lucide-react"

export default function ChancingDetailPage({ params }: { params: Promise<{ majorId: string }> }) {
  const { majorId } = use(params)
  const router = useRouter()
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`/api/chancing/${majorId}`)
      .then(r => r.json())
      .then(d => { setData(d); setLoading(false) })
      .catch(() => setLoading(false))
  }, [majorId])

  if (loading) {
    return (
      <div className="flex h-40 items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-slate-400" />
      </div>
    )
  }

  if (!data || data.error) {
    return (
      <div className="flex h-40 items-center justify-center text-slate-500 font-medium">
        <p>Jurusan tidak ditemukan</p>
      </div>
    )
  }

  const r = data
  const pct = r.chance.percentage
  const color = pct >= 60 ? "hsl(150,70%,45%)" : pct >= 40 ? "hsl(200,80%,50%)" : pct >= 25 ? "hsl(40,90%,50%)" : "hsl(10,80%,55%)"

  return (
    <div className="space-y-6">
        <div className="bg-white border border-slate-100 rounded-3xl p-8 mb-6 shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-[var(--pastel-purple)] flex items-center justify-center shrink-0">
              <GraduationCap className="w-5 h-5 text-[var(--accent)]" />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-slate-800 leading-tight">{r.major.name}</h1>
              <p className="text-slate-500 text-sm mt-0.5">{r.major.university}</p>
            </div>
          </div>
          {r.major.faculty && <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mt-4">{r.major.faculty} · {r.major.cluster}</p>}

          <div className="flex flex-col md:flex-row md:items-center gap-6 my-8 p-6 bg-slate-50/50 rounded-2xl border border-slate-100/50">
            <div className="text-center md:text-left shrink-0">
              <div className="text-5xl font-extrabold tracking-tight" style={{ color }}>{pct}%</div>
              <div className="text-xs text-slate-400 uppercase tracking-widest font-bold mt-1">Peluang Lolos</div>
            </div>
            <div className="flex-1">
              <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-200/40">
                <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${pct}%`, background: color }} />
              </div>
              <div className="flex justify-between text-[10px] text-slate-400 font-bold mt-1.5"><span>0%</span><span>100%</span></div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Stat label="Skor Kamu" value={r.studentScore} />
            <Stat label="Estimasi Aman" value={r.major.estimatedScore} />
            <Stat label="Selisih" value={r.chance.deficit >= 0 ? `+${r.chance.deficit}` : r.chance.deficit} color={r.chance.deficit >= 0 ? "text-emerald-600" : "text-rose-600"} />
            <Stat label="Keketatan" value={`1:${r.major.competitiveness}`} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-[0_4px_24px_rgba(0,0,0,0.01)]">
            <p className="text-slate-400 text-[10px] uppercase tracking-wider font-bold mb-1">Daya Tampung</p>
            <p className="text-xl font-bold text-slate-800">{r.major.quota} <span className="text-xs text-slate-500 font-normal">kursi</span></p>
          </div>
          <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-[0_4px_24px_rgba(0,0,0,0.01)]">
            <p className="text-slate-400 text-[10px] uppercase tracking-wider font-bold mb-1">Total Peminat</p>
            <p className="text-xl font-bold text-slate-800">{r.major.applicants.toLocaleString()} <span className="text-xs text-slate-500 font-normal">orang</span></p>
          </div>
        </div>

        {/* Weak Subjects */}
        {r.chance.weakSubjects && r.chance.weakSubjects.length > 0 && (
          <div className="bg-amber-50/50 border border-amber-100 rounded-2xl p-6 mb-6">
            <h2 className="font-bold text-amber-800 mb-3 text-sm flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
              Subtes Terlemah
            </h2>
            <div className="flex flex-wrap gap-2">
              {r.chance.weakSubjects.map((s: string) => (
                <span key={s} className="text-xs font-semibold px-3 py-1.5 bg-amber-100/50 text-amber-700 rounded-lg">{s}</span>
              ))}
            </div>
          </div>
        )}

        {/* Recommendation */}
        <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-[0_4px_24px_rgba(0,0,0,0.01)]">
          <h2 className="font-bold text-slate-800 mb-3 text-sm flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-[var(--accent)] shrink-0" />
            Rekomendasi Belajar
          </h2>
          {r.chance.recommendation ? (
            <p className="text-sm text-slate-600 leading-relaxed font-medium">{r.chance.recommendation}</p>
          ) : r.chance.deficit < 0 ? (
            <div className="space-y-2 text-sm text-slate-600 font-medium">
              <p>Kamu perlu menaikkan skor sebesar <strong className="text-rose-600">{Math.abs(r.chance.deficit)} poin</strong> untuk mencapai estimasi aman.</p>
              <p>Fokus pada subtes dengan skor terendah dan gunakan <strong>AI Tutor</strong> untuk memahami konsep yang lemah.</p>
            </div>
          ) : (
            <div className="flex items-start gap-2.5 text-sm text-emerald-600 font-medium bg-emerald-50/50 p-4 rounded-xl border border-emerald-100">
              <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
              <p>Skor kamu sudah di atas estimasi aman. Pertahankan dan terus berlatih!</p>
            </div>
          )}
        </div>
    </div>
  )
}

function Stat({ label, value, color }: { label: string; value: any; color?: string }) {
  return (
    <div>
      <p className="text-slate-400 text-[10px] uppercase tracking-wider font-bold mb-1">{label}</p>
      <p className={`text-xl font-bold text-slate-800 ${color || ""}`}>{value}</p>
    </div>
  )
}
