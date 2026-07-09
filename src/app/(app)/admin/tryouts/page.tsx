"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Plus, Edit2, Trash2, Loader2, FileText, Layers, Clock, Settings, ShieldAlert, Check } from "lucide-react"

interface Subject {
  id: string
  name: string
  cluster: string
}

interface ExamSection {
  id: string
  templateId: string
  subjectId: string
  itemCount: number
  order: number
  duration: number
  subject: { name: string }
}

interface ExamTemplate {
  id: string
  name: string
  description?: string
  duration: number
  totalItems: number
  cluster: "SAINTEK" | "SOSHUM" | "CAMPURAN"
  isDiagnostic: boolean
  sections: ExamSection[]
  _count: { attempts: number }
}

export default function AdminTryoutsPage() {
  const router = useRouter()
  const [tryouts, setTryouts] = useState<ExamTemplate[]>([])
  const [subjects, setSubjects] = useState<Subject[]>([])
  const [loading, setLoading] = useState(true)

  // Selected tryout for section management
  const [selectedTryout, setSelectedTryout] = useState<ExamTemplate | null>(null)
  const [sections, setSections] = useState<ExamSection[]>([])
  const [loadingSections, setLoadingSections] = useState(false)

  // Tryout Form Modal
  const [showTryoutModal, setShowTryoutModal] = useState(false)
  const [editingTryout, setEditingTryout] = useState<ExamTemplate | null>(null)
  const [tryoutForm, setTryoutForm] = useState({
    name: "",
    description: "",
    duration: 195, // default standard UTBK
    totalItems: 155, // default standard UTBK
    cluster: "CAMPURAN" as "SAINTEK" | "SOSHUM" | "CAMPURAN",
    isDiagnostic: false
  })

  // Section Form Modal
  const [showSectionModal, setShowSectionModal] = useState(false)
  const [editingSection, setEditingSection] = useState<ExamSection | null>(null)
  const [sectionForm, setSectionForm] = useState({
    subjectId: "",
    itemCount: 15,
    order: 1,
    duration: 15
  })

  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    setLoading(true)
    try {
      const [resTryouts, resSubjects] = await Promise.all([
        fetch("/api/admin/tryouts"),
        fetch("/api/admin/subjects")
      ])
      const dataT = await resTryouts.json()
      const dataS = await resSubjects.json()
      setTryouts(dataT.data || [])
      setSubjects(dataS.data || [])
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  // Fetch sections of a selected tryout
  async function loadSections(tryout: ExamTemplate) {
    setSelectedTryout(tryout)
    setLoadingSections(true)
    try {
      const res = await fetch(`/api/admin/tryouts/sections?templateId=${tryout.id}`)
      const data = await res.json()
      setSections(data.data || [])
    } catch (e) {
      console.error(e)
    } finally {
      setLoadingSections(false)
    }
  }

  // --- TRYOUT CRUD ---
  function openAddTryout() {
    setEditingTryout(null)
    setTryoutForm({
      name: "",
      description: "",
      duration: 195,
      totalItems: 155,
      cluster: "CAMPURAN",
      isDiagnostic: false
    })
    setShowTryoutModal(true)
  }

  function openEditTryout(t: ExamTemplate) {
    setEditingTryout(t)
    setTryoutForm({
      name: t.name,
      description: t.description || "",
      duration: t.duration,
      totalItems: t.totalItems,
      cluster: t.cluster,
      isDiagnostic: t.isDiagnostic
    })
    setShowTryoutModal(true)
  }

  async function handleTryoutSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    const method = editingTryout ? "PUT" : "POST"
    const payload = editingTryout ? { id: editingTryout.id, ...tryoutForm } : tryoutForm

    const res = await fetch("/api/admin/tryouts", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
    setSubmitting(false)
    if (res.ok) {
      setShowTryoutModal(false)
      fetchData()
      setSelectedTryout(null)
    } else {
      const data = await res.json()
      alert(data.error || "Gagal menyimpan tryout")
    }
  }

  async function handleDeleteTryout(id: string) {
    if (!confirm("Hapus paket Tryout ini? Seluruh subtes dan data hasil attempt siswa di dalamnya juga akan terhapus.")) return
    const res = await fetch(`/api/admin/tryouts?id=${id}`, { method: "DELETE" })
    if (res.ok) {
      fetchData()
      setSelectedTryout(null)
    } else {
      alert("Gagal menghapus tryout")
    }
  }

  // --- SECTION CRUD ---
  function openAddSection() {
    if (!selectedTryout) return
    setEditingSection(null)
    setSectionForm({
      subjectId: subjects[0]?.id || "",
      itemCount: 15,
      order: sections.length + 1,
      duration: 15
    })
    setShowSectionModal(true)
  }

  function openEditSection(s: ExamSection) {
    setEditingSection(s)
    setSectionForm({
      subjectId: s.subjectId,
      itemCount: s.itemCount,
      order: s.order,
      duration: s.duration
    })
    setShowSectionModal(true)
  }

  async function handleSectionSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!selectedTryout) return
    setSubmitting(true)
    const method = editingSection ? "PUT" : "POST"
    const payload = editingSection 
      ? { id: editingSection.id, ...sectionForm } 
      : { templateId: selectedTryout.id, ...sectionForm }

    const res = await fetch("/api/admin/tryouts/sections", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
    setSubmitting(false)
    if (res.ok) {
      setShowSectionModal(false)
      loadSections(selectedTryout)
    } else {
      const data = await res.json()
      alert(data.error || "Gagal menyimpan subtes")
    }
  }

  async function handleDeleteSection(id: string) {
    if (!confirm("Hapus subtes ini dari paket Tryout?")) return
    const res = await fetch(`/api/admin/tryouts/sections?id=${id}`, { method: "DELETE" })
    if (res.ok && selectedTryout) {
      loadSections(selectedTryout)
    } else {
      alert("Gagal menghapus subtes")
    }
  }

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-5xl mx-auto h-full overflow-y-auto no-scrollbar">
      {/* Top Header */}
      <div>
        <button onClick={() => router.push("/admin")} className="text-slate-400 hover:text-slate-600 text-xs font-bold uppercase tracking-wider mb-2 inline-flex items-center gap-1.5 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Admin Panel
        </button>
        <h1 className="text-3xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
          <FileText className="w-8 h-8 text-[var(--accent)]" /> Manajemen Tryout
        </h1>
        <p className="text-sm text-slate-500 mt-1">Buat paket simulasi Tryout SNBT dan susun subtes/seksi materi ujian beserta alokasi waktu menitnya.</p>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 text-[var(--accent)] animate-spin" /></div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* TRYOUT TEMPLATE LIST (Left column - takes 2 cols on lg) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold text-slate-700">{tryouts.length} Paket Simulasi</h2>
              <button onClick={openAddTryout} className="flex items-center gap-2 px-4 py-2 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white font-bold text-sm rounded-xl transition-all shadow-sm">
                <Plus className="w-4 h-4" /> Tambah Paket
              </button>
            </div>

            <div className="space-y-4">
              {tryouts.map(t => (
                <div 
                  key={t.id} 
                  onClick={() => loadSections(t)}
                  className={`bg-white border rounded-[2rem] p-5 cursor-pointer transition-all flex justify-between items-center group ${selectedTryout?.id === t.id ? "border-[var(--accent)] shadow-[0_8px_30px_rgba(193,119,249,0.06)]" : "border-slate-100 hover:border-slate-200 shadow-[0_4px_20px_rgba(0,0,0,0.01)]"}`}
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${t.isDiagnostic ? "bg-rose-50 text-rose-600 border border-rose-100" : "bg-purple-50 text-purple-600 border border-purple-100"}`}>
                        {t.isDiagnostic ? "DIAGNOSTIC TEST" : "REGULAR TRYOUT"}
                      </span>
                      <span className="text-[9px] bg-slate-50 text-slate-500 px-2 py-0.5 rounded-full font-bold border border-slate-100 uppercase tracking-wider">{t.cluster}</span>
                    </div>
                    <h3 className="font-bold text-slate-800 text-lg leading-tight group-hover:text-[var(--accent-dark)] transition-colors">{t.name}</h3>
                    <p className="text-slate-400 text-xs">{t.description || "Tidak ada deskripsi."}</p>
                    <div className="flex items-center gap-4 text-xs font-semibold text-slate-500 pt-1">
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-slate-400" /> {t.duration} Menit</span>
                      <span className="flex items-center gap-1"><Layers className="w-3.5 h-3.5 text-slate-400" /> {t.totalItems} Soal</span>
                      <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-[10px] font-bold">{t._count.attempts} Kali Dikerjakan</span>
                    </div>
                  </div>

                  <div className="flex gap-1" onClick={e => e.stopPropagation()}>
                    <button onClick={() => openEditTryout(t)} className="p-2 text-slate-400 hover:text-[var(--accent)] hover:bg-slate-50 rounded-xl transition-colors" title="Ubah"><Edit2 className="w-4 h-4" /></button>
                    <button onClick={() => handleDeleteTryout(t.id)} className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors" title="Hapus"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </div>
              ))}
              {tryouts.length === 0 && (
                <div className="text-center py-16 text-slate-400 border border-dashed border-slate-200 rounded-[2rem]">Belum ada paket Tryout terdaftar</div>
              )}
            </div>
          </div>

          {/* SUBTESTS SECTIONS LIST (Right column - active when tryout selected) */}
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-slate-700">Subtes / Seksi Ujian</h2>
            
            {selectedTryout ? (
              <div className="bg-white border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] rounded-[2rem] p-5 space-y-4">
                <div className="pb-3 border-b border-slate-50 flex justify-between items-center">
                  <div>
                    <h3 className="font-bold text-slate-800 text-sm">{selectedTryout.name}</h3>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">{sections.length} Subtes Ditambahkan</p>
                  </div>
                  <button onClick={openAddSection} className="flex items-center gap-1 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-all shadow-sm">
                    <Plus className="w-3.5 h-3.5" /> Subtes
                  </button>
                </div>

                {loadingSections ? (
                  <div className="flex justify-center py-10"><Loader2 className="w-6 h-6 text-[var(--accent)] animate-spin" /></div>
                ) : (
                  <div className="space-y-3">
                    {sections.map(s => (
                      <div key={s.id} className="p-3 border border-slate-50 hover:border-slate-100 bg-slate-50/30 rounded-2xl flex justify-between items-center group">
                        <div className="space-y-1">
                          <span className="text-[9px] font-bold text-slate-400">Order: #{s.order}</span>
                          <h4 className="font-bold text-slate-800 text-xs leading-snug">{s.subject.name}</h4>
                          <div className="flex gap-2 text-[10px] font-semibold text-slate-500">
                            <span>{s.itemCount} Soal</span>
                            <span>•</span>
                            <span>{s.duration} Menit</span>
                          </div>
                        </div>
                        <div className="flex gap-1.5 opacity-60 group-hover:opacity-100 transition-opacity">
                          <button onClick={() => openEditSection(s)} className="p-1.5 text-slate-400 hover:text-[var(--accent)] hover:bg-white rounded-lg transition-colors"><Edit2 className="w-3.5 h-3.5" /></button>
                          <button onClick={() => handleDeleteSection(s.id)} className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
                        </div>
                      </div>
                    ))}
                    {sections.length === 0 && (
                      <div className="text-center py-10 text-slate-400 text-xs border border-dashed border-slate-100 rounded-2xl">
                        Belum ada subtes. Klik "+ Subtes" untuk menambahkan materi ujian.
                      </div>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-slate-50/50 border border-dashed border-slate-200 rounded-[2rem] p-8 text-center text-slate-400 flex flex-col items-center justify-center min-h-[300px]">
                <Layers className="w-12 h-12 text-slate-200 mb-4" />
                <p className="text-xs font-bold uppercase tracking-wider">Pilih Paket Tryout</p>
                <p className="text-[11px] text-slate-400 max-w-[180px] mt-1.5 leading-relaxed">Pilih salah satu simulasi tryout di sebelah kiri untuk melihat dan menyusun subtes di dalamnya.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* --- DIALOG MODALS --- */}

      {/* 1. TRYOUT MODAL */}
      {showTryoutModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[2rem] max-w-md w-full p-6 shadow-2xl space-y-4 relative border border-slate-100">
            <h3 className="text-xl font-bold text-slate-800">{editingTryout ? "Ubah Paket Tryout" : "Tambah Paket Tryout"}</h3>
            <form onSubmit={handleTryoutSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Nama Paket</label>
                <input
                  type="text"
                  required
                  value={tryoutForm.name}
                  onChange={e => setTryoutForm({ ...tryoutForm, name: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm font-semibold rounded-xl px-4 py-3 outline-none focus:border-[var(--accent)] focus:bg-white transition-all"
                  placeholder="Misal: Try Out UTBK Nasional #1"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Deskripsi Paket</label>
                <textarea
                  value={tryoutForm.description}
                  onChange={e => setTryoutForm({ ...tryoutForm, description: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm font-medium rounded-xl px-4 py-3 outline-none focus:border-[var(--accent)] focus:bg-white transition-all min-h-[80px] resize-none"
                  placeholder="Deskripsi singkat tryout..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Durasi (Menit)</label>
                  <input
                    type="number"
                    required
                    value={tryoutForm.duration}
                    onChange={e => setTryoutForm({ ...tryoutForm, duration: parseInt(e.target.value) || 0 })}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm font-semibold rounded-xl px-4 py-3 outline-none focus:border-[var(--accent)] focus:bg-white transition-all"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Jumlah Soal</label>
                  <input
                    type="number"
                    required
                    value={tryoutForm.totalItems}
                    onChange={e => setTryoutForm({ ...tryoutForm, totalItems: parseInt(e.target.value) || 0 })}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm font-semibold rounded-xl px-4 py-3 outline-none focus:border-[var(--accent)] focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Kluster</label>
                  <select
                    value={tryoutForm.cluster}
                    onChange={e => setTryoutForm({ ...tryoutForm, cluster: e.target.value as any })}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-700 text-sm font-semibold rounded-xl px-4 py-3 outline-none focus:border-[var(--accent)] focus:bg-white transition-all cursor-pointer"
                  >
                    <option value="CAMPURAN">CAMPURAN</option>
                    <option value="SAINTEK">SAINTEK</option>
                    <option value="SOSHUM">SOSHUM</option>
                  </select>
                </div>
                <div className="flex items-center gap-2 pt-6">
                  <input
                    type="checkbox"
                    id="isDiagnostic"
                    checked={tryoutForm.isDiagnostic}
                    onChange={e => setTryoutForm({ ...tryoutForm, isDiagnostic: e.target.checked })}
                    className="accent-[var(--accent)] w-4.5 h-4.5 cursor-pointer"
                  />
                  <label htmlFor="isDiagnostic" className="text-xs font-bold text-slate-600 cursor-pointer select-none">Diagnostic Test</label>
                </div>
              </div>

              <div className="flex gap-3 justify-end pt-3">
                <button type="button" onClick={() => setShowTryoutModal(false)} className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 rounded-xl text-slate-600 text-sm font-bold transition-all">Batal</button>
                <button type="submit" disabled={submitting} className="px-5 py-2.5 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white text-sm font-bold rounded-xl transition-all disabled:opacity-50">
                  {submitting ? "Menyimpan..." : "Simpan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 2. SECTION MODAL */}
      {showSectionModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[2rem] max-w-md w-full p-6 shadow-2xl space-y-4 relative border border-slate-100">
            <h3 className="text-xl font-bold text-slate-800">{editingSection ? "Ubah Subtes" : "Tambah Subtes Baru"}</h3>
            <form onSubmit={handleSectionSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Mata Pelajaran</label>
                <select
                  required
                  value={sectionForm.subjectId}
                  onChange={e => setSectionForm({ ...sectionForm, subjectId: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-700 text-sm font-semibold rounded-xl px-4 py-3 outline-none focus:border-[var(--accent)] focus:bg-white transition-all cursor-pointer"
                >
                  <option value="">Pilih Mapel...</option>
                  {subjects.map(s => <option key={s.id} value={s.id}>{s.name} ({s.cluster})</option>)}
                </select>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Soal</label>
                  <input
                    type="number"
                    required
                    value={sectionForm.itemCount}
                    onChange={e => setSectionForm({ ...sectionForm, itemCount: parseInt(e.target.value) || 0 })}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm font-semibold rounded-xl px-4 py-3 outline-none focus:border-[var(--accent)] focus:bg-white transition-all"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Menit</label>
                  <input
                    type="number"
                    required
                    value={sectionForm.duration}
                    onChange={e => setSectionForm({ ...sectionForm, duration: parseInt(e.target.value) || 0 })}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm font-semibold rounded-xl px-4 py-3 outline-none focus:border-[var(--accent)] focus:bg-white transition-all"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Urutan</label>
                  <input
                    type="number"
                    required
                    value={sectionForm.order}
                    onChange={e => setSectionForm({ ...sectionForm, order: parseInt(e.target.value) || 1 })}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm font-semibold rounded-xl px-4 py-3 outline-none focus:border-[var(--accent)] focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div className="flex gap-3 justify-end pt-3">
                <button type="button" onClick={() => setShowSectionModal(false)} className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 rounded-xl text-slate-600 text-sm font-bold transition-all">Batal</button>
                <button type="submit" disabled={submitting} className="px-5 py-2.5 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white text-sm font-bold rounded-xl transition-all disabled:opacity-50">
                  {submitting ? "Menyimpan..." : "Simpan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
