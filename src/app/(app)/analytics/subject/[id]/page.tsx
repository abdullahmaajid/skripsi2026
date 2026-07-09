"use client"

import { useState, useEffect, use } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Loader2, BookOpen, Target } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts"

interface TopicStat {
  name: string
  total: number
  correct: number
  accuracy: number
}

interface SubjectData {
  subjectName: string
  topics: TopicStat[]
}

export default function SubjectAnalyticsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const [data, setData] = useState<SubjectData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`/api/analytics/subject/${id}`)
      .then(res => res.json())
      .then(d => setData(d))
      .catch(e => console.error(e))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <Loader2 className="w-8 h-8 text-[var(--accent)] animate-spin" />
      </div>
    )
  }

  if (!data) {
    return (
      <div className="flex h-[80vh] items-center justify-center flex-col gap-4">
        <p className="text-slate-500 font-medium">Data tidak ditemukan.</p>
        <button onClick={() => router.back()} className="px-6 py-2 bg-slate-100 rounded-xl font-bold">Kembali</button>
      </div>
    )
  }

  const sortedTopics = [...data.topics].sort((a, b) => b.accuracy - a.accuracy)
  const overallCorrect = data.topics.reduce((acc, t) => acc + t.correct, 0)
  const overallTotal = data.topics.reduce((acc, t) => acc + t.total, 0)
  const overallAccuracy = overallTotal > 0 ? Math.round((overallCorrect / overallTotal) * 100) : 0

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-5xl mx-auto h-full overflow-y-auto no-scrollbar">
      {/* Header */}
      <div>
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-[var(--accent)] transition-colors mb-2"
        >
          <ArrowLeft className="w-4 h-4" /> Kembali
        </button>
        <h1 className="text-2xl md:text-3xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-[var(--accent)]" /> {data.subjectName}
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Analisis tingkat penguasaan materi per Bab/Topik.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Total Soal Dikerjakan</p>
          <p className="text-2xl font-bold text-slate-800">{overallTotal}</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Total Benar</p>
          <p className="text-2xl font-bold text-emerald-600">{overallCorrect}</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Akurasi Rata-rata</p>
          <p className="text-2xl font-bold text-[var(--accent)]">{overallAccuracy}%</p>
        </div>
      </div>

      {sortedTopics.length > 0 ? (
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
          <h2 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
            <Target className="w-5 h-5 text-indigo-500" /> Akurasi per Topik (%)
          </h2>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sortedTopics} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f1f5f9" />
                <XAxis type="number" domain={[0, 100]} hide />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fill: "#475569", fontSize: 12, fontWeight: 500 }} width={120} />
                <Tooltip 
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ borderRadius: "12px", border: "1px solid #e2e8f0", boxShadow: "0 4px 20px rgba(0,0,0,0.06)", fontWeight: 600 }} 
                  formatter={(val: any) => [`${val}%`, 'Akurasi']}
                />
                <Bar dataKey="accuracy" radius={[0, 8, 8, 0]} barSize={24}>
                  {sortedTopics.map((entry, index) => {
                    let color = "var(--accent)"
                    if (entry.accuracy < 40) color = "#f43f5e" // rose-500
                    else if (entry.accuracy < 70) color = "#eab308" // yellow-500
                    else color = "#10b981" // emerald-500
                    return <Cell key={`cell-${index}`} fill={color} />
                  })}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            {sortedTopics.map((t, idx) => (
              <div key={idx} className="flex justify-between items-center p-4 border border-slate-100 rounded-2xl bg-slate-50/50">
                <div>
                  <h4 className="font-bold text-slate-700">{t.name}</h4>
                  <p className="text-xs text-slate-500 mt-0.5">{t.correct} benar dari {t.total} soal</p>
                </div>
                <div className="text-right">
                  <span className={`text-lg font-bold ${
                    t.accuracy < 40 ? 'text-rose-500' : t.accuracy < 70 ? 'text-amber-500' : 'text-emerald-500'
                  }`}>
                    {t.accuracy}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-12 border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex flex-col items-center justify-center text-center">
          <Target className="w-12 h-12 text-slate-200 mb-4" />
          <h3 className="text-lg font-bold text-slate-800">Belum ada data topik</h3>
          <p className="text-sm text-slate-500 mt-2">Kerjakan soal dari subtes ini untuk melihat analisis penguasaan per topik.</p>
        </div>
      )}
    </div>
  )
}
