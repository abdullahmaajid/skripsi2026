"use client"

import { useState, useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { GraduationCap, Search, ArrowRight, Loader2, Target, PlayCircle, BarChart3, Compass } from "lucide-react"
import { motion } from "framer-motion"
import AuthLayout from "@/components/layout/AuthLayout"
import { signOut } from "next-auth/react"

interface University { id: string; name: string; code: string; location: string }
interface Major { id: string; name: string; code: string; faculty: string; estimatedScore: number; cluster: string; university: { name: string } }

function OnboardingForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [step, setStep] = useState(1)
  const [school, setSchool] = useState("")
  const [gradYear, setGradYear] = useState(2025)
  const [universities, setUniversities] = useState<University[]>([])
  const [majors, setMajors] = useState<Major[]>([])
  const [selectedMajor1, setSelectedMajor1] = useState("")
  const [selectedMajor2, setSelectedMajor2] = useState("")
  const [search, setSearch] = useState("")
  const [aiStyle, setAiStyle] = useState("default")
  const [aiEnergy, setAiEnergy] = useState("default")
  const [saving, setSaving] = useState(false)
  const [startingDiagnostic, setStartingDiagnostic] = useState(false)

  useEffect(() => {
    if (searchParams.get("resume") === "diagnostic") {
      setStep(5)
    }
  }, [searchParams])

  useEffect(() => {
    fetch("/api/universities").then(r => r.json()).then(d => setUniversities(d.data || []))
    fetch("/api/majors").then(r => r.json()).then(d => setMajors(d.data || []))
  }, [])

  const filtered = majors.filter(m =>
    m.name.toLowerCase().includes(search.toLowerCase()) ||
    m.university.name.toLowerCase().includes(search.toLowerCase())
  )

  async function handleFinish() {
    setSaving(true)
    try {
      await fetch("/api/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ school, graduationYear: gradYear, targetMajor1Id: selectedMajor1, targetMajor2Id: selectedMajor2, aiStyle, aiEnergy }),
      })
      setSaving(false)
      setStep(5) // Move to weighting & diagnostic
    } catch { setSaving(false) }
  }

  async function startDiagnostic() {
    setStartingDiagnostic(true)
    try {
      const res = await fetch("/api/exams/diagnostic", { method: "POST" })
      const json = await res.json()
      const data = json.data ?? json // handle both { data: {...} } and flat response

      if (data.templateId) {
        // Pass onboarding flag to return to plan page later
        router.push(`/tryout/${data.templateId}?onboarding=true`)
      } else if (data.attemptId) {
        // Sudah ada attempt yang selesai
        router.push("/onboarding/plan")
      } else {
        console.error("Unexpected diagnostic response:", json)
        setStartingDiagnostic(false)
      }
    } catch (e) {
      console.error(e)
      setStartingDiagnostic(false)
    }
  }

  const selectedMajorData = majors.find(m => m.id === selectedMajor1)

  // Target Score calculations based on estimatedScore
  const baseScore = selectedMajorData?.estimatedScore || 700
  const highTarget = Math.round(baseScore * 1.05)
  const medTarget = Math.round(baseScore * 0.95)

  // Dummy weightings based on cluster
  const isSaintek = selectedMajorData?.cluster === "SAINTEK" || selectedMajorData?.cluster === "CAMPURAN"
  const isSoshum = selectedMajorData?.cluster === "SOSHUM" || selectedMajorData?.cluster === "CAMPURAN"

  return (
    <AuthLayout title="Atur Peta Perjalananmu">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-2xl font-bold text-slate-800">Setup Profil</h2>
          <span className="text-xs font-bold px-3 py-1 bg-[var(--accent)]/10 text-[var(--accent-dark)] rounded-full">
            Langkah {Math.min(step, 4)}/4
          </span>
        </div>
        <p className="text-slate-500 text-sm font-medium">Lengkapi datamu agar AI bisa menyusun rencana belajarmu.</p>
      </div>

      {step === 1 && (
        <motion.div key="s1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-slate-700">Asal Sekolah</label>
            <input value={school} onChange={e => setSchool(e.target.value)} placeholder="Nama sekolah (SMA/SMK)" className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 outline-none focus:bg-white focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent transition-all placeholder:text-slate-400 font-medium" />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-slate-700">Tahun Lulus</label>
            <select value={gradYear} onChange={e => setGradYear(+e.target.value)} className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 outline-none focus:bg-white focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent transition-all font-medium">
              {[2024, 2025, 2026, 2027].map(y => <option key={y} value={y}>{y}</option>)}
            </select>
          </div>
          <div className="flex gap-3 mt-4">
            <button onClick={() => signOut({ callbackUrl: "/auth/login" })} className="flex-1 py-3.5 bg-slate-100 hover:bg-slate-200 rounded-xl font-bold text-slate-800 flex items-center justify-center gap-2 transition-all">
              Batal
            </button>
            <button onClick={() => setStep(2)} disabled={!school} className="flex-1 py-3.5 bg-[var(--accent)] hover:bg-[var(--accent-hover)] rounded-xl font-bold disabled:opacity-50 flex items-center justify-center gap-2 text-white shadow-[0_4px_12px_rgba(193,119,249,0.25)] transition-all">
              Lanjut <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}

      {step === 2 && (
        <motion.div key="s2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-slate-700">Pilih Jurusan Impian #1</label>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Cari jurusan atau universitas..." className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 outline-none focus:bg-white focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent transition-all font-medium placeholder:text-slate-400" />
            </div>
          </div>
          
          <div className="max-h-60 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
            {filtered.map(m => (
              <button key={m.id} onClick={() => setSelectedMajor1(m.id)} className={`w-full text-left p-4 rounded-xl border transition-all text-sm ${selectedMajor1 === m.id ? "border-[var(--accent)] bg-[var(--pastel-purple)] shadow-sm" : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"}`}>
                <p className={`font-bold ${selectedMajor1 === m.id ? "text-[var(--accent-dark)]" : "text-slate-800"}`}>{m.name}</p>
                <p className={`text-xs mt-1 ${selectedMajor1 === m.id ? "text-[var(--accent-dark)]/80" : "text-slate-500"}`}>{m.university.name} · {m.faculty} · Est. {m.estimatedScore}</p>
              </button>
            ))}
          </div>
          <div className="flex gap-3 mt-4">
            <button onClick={() => signOut({ callbackUrl: "/auth/login" })} className="flex-1 py-3.5 bg-slate-100 hover:bg-slate-200 rounded-xl font-bold text-slate-800 flex items-center justify-center gap-2 transition-all">
              Batal
            </button>
            <button onClick={() => { setSearch(""); setStep(3) }} disabled={!selectedMajor1} className="flex-1 py-3.5 bg-[var(--accent)] hover:bg-[var(--accent-hover)] rounded-xl font-bold disabled:opacity-50 text-white shadow-[0_4px_12px_rgba(193,119,249,0.25)] transition-all">Lanjut</button>
          </div>
        </motion.div>
      )}

{step === 3 && (
        <motion.div key="s3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-sm font-bold text-slate-700">Pilih Jurusan Impian #2 (Opsional)</label>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Cari jurusan..." className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 outline-none focus:bg-white focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent transition-all font-medium placeholder:text-slate-400" />
            </div>
          </div>
          
          <div className="max-h-60 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
            {filtered.filter(m => m.id !== selectedMajor1).map(m => (
              <button key={m.id} onClick={() => setSelectedMajor2(m.id)} className={`w-full text-left p-4 rounded-xl border transition-all text-sm ${selectedMajor2 === m.id ? "border-[var(--accent)] bg-[var(--pastel-purple)] shadow-sm" : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"}`}>
                <p className={`font-bold ${selectedMajor2 === m.id ? "text-[var(--accent-dark)]" : "text-slate-800"}`}>{m.name}</p>
                <p className={`text-xs mt-1 ${selectedMajor2 === m.id ? "text-[var(--accent-dark)]/80" : "text-slate-500"}`}>{m.university.name} · {m.faculty}</p>
              </button>
            ))}
          </div>
          <div className="flex gap-3 mt-4">
            <button onClick={() => signOut({ callbackUrl: "/auth/login" })} className="flex-1 py-3.5 bg-slate-100 hover:bg-slate-200 rounded-xl font-bold text-slate-800 flex items-center justify-center gap-2 transition-all">
              Batal
            </button>
            <button onClick={() => setStep(4)} className="flex-1 py-3.5 bg-[var(--accent)] hover:bg-[var(--accent-hover)] rounded-xl font-bold disabled:opacity-50 flex items-center justify-center gap-2 text-white shadow-[0_4px_12px_rgba(193,119,249,0.25)] transition-all mt-4">
              Lanjut <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <button onClick={() => setStep(4)} className="w-full py-2 text-slate-500 hover:text-slate-700 text-sm font-medium transition-colors">Lewati →</button>
        </motion.div>
      )}

      {step === 4 && (
        <motion.div key="s4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="space-y-2 mb-4">
            <h3 className="text-lg font-bold text-slate-800">Gaya & Nada AI Tutor</h3>
            <p className="text-sm text-slate-500 leading-relaxed">Atur kepribadian AI Tutor-mu. Bagaimana kamu ingin ia membantumu belajar?</p>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-bold text-slate-700">Gaya Interaksi</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                { id: "default", label: "Default", desc: "Gaya bawaan yang seimbang." },
                { id: "professional", label: "Profesional", desc: "Rapi, formal, dan presisi." },
                { id: "friendly", label: "Ramah", desc: "Hangat, akrab, menyemangati layaknya kakak kelas." },
                { id: "honest", label: "Jujur & Tegas", desc: "Terus terang, langsung koreksi jika salah." },
                { id: "quirky", label: "Nyentrik", desc: "Humoris, imajinatif, ala Gen-Z." },
                { id: "efficient", label: "Efisien", desc: "Singkat, lugas, tanpa basa-basi." }
              ].map(opt => (
                <button 
                  key={opt.id} 
                  onClick={() => setAiStyle(opt.id)}
                  className={`p-4 rounded-xl border text-left transition-all ${aiStyle === opt.id ? "border-[var(--accent)] bg-[var(--pastel-purple)] shadow-sm ring-1 ring-[var(--accent)]" : "border-slate-200 bg-white hover:border-slate-300"}`}
                >
                  <p className={`font-bold text-sm ${aiStyle === opt.id ? "text-[var(--accent-dark)]" : "text-slate-800"}`}>{opt.label}</p>
                  <p className={`text-xs mt-1 ${aiStyle === opt.id ? "text-[var(--accent-dark)]/80" : "text-slate-500"}`}>{opt.desc}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <label className="text-sm font-bold text-slate-700">Tingkat Energi</label>
            <div className="flex bg-slate-100 p-1 rounded-xl">
              {[
                { id: "low", label: "Tenang" },
                { id: "default", label: "Normal" },
                { id: "high", label: "Berenergi!" }
              ].map(opt => (
                <button
                  key={opt.id}
                  onClick={() => setAiEnergy(opt.id)}
                  className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all ${aiEnergy === opt.id ? "bg-white text-[var(--accent-dark)] shadow-sm" : "text-slate-500 hover:text-slate-700 hover:bg-slate-200/50"}`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <button onClick={() => setStep(3)} className="flex-1 py-3.5 bg-slate-100 hover:bg-slate-200 rounded-xl font-bold text-slate-800 flex items-center justify-center gap-2 transition-all">
              Kembali
            </button>
            <button onClick={handleFinish} disabled={saving} className="flex-1 py-3.5 bg-[var(--accent)] hover:bg-[var(--accent-hover)] rounded-xl font-bold disabled:opacity-50 flex items-center justify-center gap-2 text-white shadow-[0_4px_12px_rgba(193,119,249,0.25)] transition-all">
              {saving ? <><Loader2 className="w-4 h-4 animate-spin" /> Menyimpan...</> : "Simpan Profil & Lanjut"}
            </button>
          </div>
        </motion.div>
      )}

      {step === 5 && (
        <motion.div key="s5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 bg-[var(--pastel-purple)] text-[var(--accent-dark)] rounded-2xl flex items-center justify-center mx-auto mb-4 border border-[var(--accent)]/20 shadow-sm">
              <BarChart3 className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800">Analisis Target</h2>
            <p className="text-slate-500 text-sm font-medium leading-relaxed">Berdasarkan data historis, berikut prioritas materi untuk menembus <strong className="text-slate-800">{selectedMajorData?.name || "jurusan impianmu"}</strong>.</p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-4 shadow-sm">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Bobot Prioritas Tertinggi</h3>
            
            <div className="space-y-3">
              <div className="space-y-1.5">
                <div className="flex justify-between text-sm"><span className="font-bold text-slate-700">Penalaran Umum</span><span className="text-[var(--accent)] font-bold text-xs flex items-center gap-2"><span className="text-slate-400 font-medium">Target: {highTarget}</span> Tinggi</span></div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden"><div className="h-full bg-[var(--accent)] w-[90%] rounded-full"></div></div>
              </div>
              {isSaintek && (
                <div className="space-y-1.5">
                  <div className="flex justify-between text-sm"><span className="font-bold text-slate-700">Pengetahuan Kuantitatif</span><span className="text-[var(--accent)] font-bold text-xs flex items-center gap-2"><span className="text-slate-400 font-medium">Target: {highTarget}</span> Tinggi</span></div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden"><div className="h-full bg-[var(--accent)] w-[85%] rounded-full"></div></div>
                </div>
              )}
              {isSoshum && (
                <div className="space-y-1.5">
                  <div className="flex justify-between text-sm"><span className="font-bold text-slate-700">Pemahaman Bacaan & Menulis</span><span className="text-[var(--accent)] font-bold text-xs flex items-center gap-2"><span className="text-slate-400 font-medium">Target: {highTarget}</span> Tinggi</span></div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden"><div className="h-full bg-[var(--accent)] w-[80%] rounded-full"></div></div>
                </div>
              )}
              <div className="space-y-1.5">
                <div className="flex justify-between text-sm"><span className="font-bold text-slate-700">Literasi Bahasa Indonesia</span><span className="text-emerald-500 font-bold text-xs flex items-center gap-2"><span className="text-slate-400 font-medium">Target: {medTarget}</span> Sedang</span></div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden"><div className="h-full bg-emerald-400 w-[60%] rounded-full"></div></div>
              </div>
            </div>
          </div>

          <div className="bg-[var(--pastel-blue)] border border-blue-200 rounded-2xl p-5 flex gap-4">
            <Compass className="w-8 h-8 text-blue-600 shrink-0" />
            <div>
              <h4 className="font-bold text-blue-900 text-sm mb-1">Uji Diagnostik Awal</h4>
              <p className="text-xs text-blue-700 font-medium leading-relaxed">
                Sebelum menyusun rencana belajarmu, kita perlu tahu titik startmu. Kamu akan mengerjakan 15 soal adaptif (30 menit).
              </p>
            </div>
          </div>

<div className="flex gap-3">
            <button onClick={() => signOut({ callbackUrl: "/auth/login" })} className="flex-1 py-4 bg-slate-100 hover:bg-slate-200 rounded-xl font-bold text-slate-800 flex items-center justify-center gap-2 transition-all">
              Batal
            </button>
            <button onClick={startDiagnostic} disabled={startingDiagnostic} className="flex-1 py-4 bg-[var(--accent)] hover:bg-[var(--accent-hover)] rounded-xl font-bold disabled:opacity-50 flex items-center justify-center gap-2 text-white shadow-[0_4px_15px_rgba(193,119,249,0.3)] transition-all">
              {startingDiagnostic ? <Loader2 className="w-5 h-5 animate-spin" /> : <PlayCircle className="w-5 h-5" />}
              {startingDiagnostic ? "Menyiapkan Ujian..." : "Mulai Uji Diagnostik"}
            </button>
          </div>
        </motion.div>
      )}
    </AuthLayout>
  )
}

export default function OnboardingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-neutral-950 flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-[var(--accent)]" /></div>}>
      <OnboardingForm />
    </Suspense>
  )
}
