"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Loader2, Plus, Edit2, Trash2, Clock, Layers, NotebookPen, BookOpen, FileText, Settings, ShieldAlert, Check } from "lucide-react"
import { useAdminPanelStore } from "@/store/useAdminPanelStore"
import { AdminPageHeader } from "@/components/layout/AdminPageHeader"
import { TryoutFormPanel, SectionFormPanel } from "./components"
import toast from "react-hot-toast"

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

  const openPanel = useAdminPanelStore(s => s.openPanel)
  const closePanel = useAdminPanelStore(s => s.closePanel)

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
    openPanel(
      <TryoutFormPanel 
        key="add-tryout"
        editingTryout={null} 
        onSuccess={() => { closePanel(); fetchData(); setSelectedTryout(null); toast.success("Data berhasil disimpan!"); }} 
        onCancel={closePanel} 
      />
    )
  }

  function openEditTryout(t: ExamTemplate) {
    openPanel(
      <TryoutFormPanel 
        key={`edit-tryout-${t.id}`}
        editingTryout={t} 
        onSuccess={() => { closePanel(); fetchData(); setSelectedTryout(null); toast.success("Data berhasil disimpan!"); }} 
        onCancel={closePanel} 
      />
    )
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
    openPanel(
      <SectionFormPanel 
        key="add-section"
        editingSection={null} 
        selectedTryoutId={selectedTryout.id} 
        subjects={subjects} 
        onSuccess={() => { closePanel(); loadSections(selectedTryout); toast.success("Data berhasil disimpan!"); }} 
        onCancel={closePanel} 
      />
    )
  }

  function openEditSection(s: ExamSection) {
    if (!selectedTryout) return
    openPanel(
      <SectionFormPanel 
        key={`edit-section-${s.id}`}
        editingSection={s} 
        selectedTryoutId={selectedTryout.id} 
        subjects={subjects} 
        onSuccess={() => { closePanel(); loadSections(selectedTryout); toast.success("Data berhasil disimpan!"); }} 
        onCancel={closePanel} 
      />
    )
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
    <div className="p-6 md:p-8 space-y-6 h-full overflow-y-auto no-scrollbar">
      {/* Top Header */}
      <AdminPageHeader
        title="Manajemen Tryout"
        subtitle="Buat paket simulasi Tryout SNBT dan susun subtes/seksi materi ujian beserta alokasi waktu menitnya."
        icon={<NotebookPen className="w-8 h-8" />}
        badgeText="KELOLA UJIAN"
        stats={[
          { label: "Total Paket", value: tryouts.length },
        ]}
        infoTitle="Penting untuk diketahui saat menyusun Tryout:"
        infoList={[
          "Tryout yang diset sebagai DIAGNOSTIC TEST akan digunakan untuk kalibrasi kemampuan awal siswa.",
          "Pastikan setiap subtes memiliki alokasi waktu yang sesuai dengan standar UTBK asli.",
          "Hasil ujian akan menggunakan model IRT jika bobot soal (difficulty) sudah terkalibrasi."
        ]}
      />

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

      {/* Modals removed in favor of Sliding Panels */}
    </div>
  )
}
