"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Loader2, Plus, HelpCircle, FileText, Database, BookOpen, Layers, Edit2, Trash2, Search, Check, ChevronDown, Upload } from "lucide-react"
import MarkdownRenderer from "@/components/ui/MarkdownRenderer"
import { useAdminPanelStore } from "@/store/useAdminPanelStore"
import { AdminPageHeader } from "@/components/layout/AdminPageHeader"
import { SubjectFormPanel, ChapterFormPanel, QuestionFormPanel } from "./components"
import toast from "react-hot-toast"

interface Subject {
  id: string
  name: string
  cluster: "SAINTEK" | "SOSHUM" | "CAMPURAN"
  _count?: { chapters: number }
}

interface Chapter {
  id: string
  name: string
  subjectId: string
  order: number
  theorySummary?: string
  subject: { name: string }
}

interface OptionData {
  id?: string
  label: string
  text: string
  isCorrect: boolean
}

interface Question {
  id: string
  chapterId: string
  text: string
  imageUrl?: string
  difficulty: number
  discrimination: number
  guessing: number
  type: "MULTIPLE_CHOICE" | "MULTIPLE_SELECT" | "TRUE_FALSE"
  chapter: { name: string; subject: { id: string; name: string } }
  options: OptionData[]
}

export default function AdminQuestionsPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<"subjects" | "chapters" | "questions">("questions")

  // Data states
  const [subjects, setSubjects] = useState<Subject[]>([])
  const [chapters, setChapters] = useState<Chapter[]>([])
  const [questions, setQuestions] = useState<Question[]>([])
  const [loading, setLoading] = useState(true)

  // Filtering for questions
  const [filterSubjectId, setFilterSubjectId] = useState("")
  const [filterChapterId, setFilterChapterId] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 20

  // Reset page when filter changes
  useEffect(() => {
    setCurrentPage(1)
  }, [filterSubjectId, filterChapterId, searchQuery])

  const openPanel = useAdminPanelStore(s => s.openPanel)
  const closePanel = useAdminPanelStore(s => s.closePanel)

  // Loading triggers
  useEffect(() => {
    fetchData()
  }, [activeTab])

  async function fetchData() {
    setLoading(true)
    try {
      if (activeTab === "subjects") {
        const res = await fetch("/api/admin/subjects")
        const data = await res.json()
        setSubjects(data.data || [])
      } else if (activeTab === "chapters") {
        const [resChapters, resSubjects] = await Promise.all([
          fetch("/api/admin/chapters"),
          fetch("/api/admin/subjects")
        ])
        const dataChapters = await resChapters.json()
        const dataSubjects = await resSubjects.json()
        setChapters(dataChapters.data || [])
        setSubjects(dataSubjects.data || [])
      } else {
        const [resQuestions, resChapters, resSubjects] = await Promise.all([
          fetch("/api/admin/questions"),
          fetch("/api/admin/chapters"),
          fetch("/api/admin/subjects")
        ])
        const dataQ = await resQuestions.json()
        const dataC = await resChapters.json()
        const dataS = await resSubjects.json()
        setQuestions(dataQ.data || [])
        setChapters(dataC.data || [])
        setSubjects(dataS.data || [])
      }
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  // --- CRUD SUBJECTS ---
  function openAddSubject() {
    openPanel(
      <SubjectFormPanel 
        key="add-subject"
        editingSubject={null} 
        onSuccess={() => { closePanel(); fetchData(); toast.success("Data berhasil disimpan!"); }} 
        onCancel={closePanel} 
      />
    )
  }

  function openEditSubject(s: Subject) {
    openPanel(
      <SubjectFormPanel 
        key={`edit-subject-${s.id}`}
        editingSubject={s} 
        onSuccess={() => { closePanel(); fetchData(); toast.success("Data berhasil disimpan!"); }} 
        onCancel={closePanel} 
      />
    )
  }

  async function handleDeleteSubject(id: string) {
    if (!confirm("Hapus mata pelajaran ini? Seluruh Bab dan Soal di dalamnya juga akan terhapus.")) return
    const res = await fetch(`/api/admin/subjects?id=${id}`, { method: "DELETE" })
    if (res.ok) {
      fetchData()
    } else {
      alert("Gagal menghapus mata pelajaran")
    }
  }

  // --- CRUD CHAPTERS ---
  function openAddChapter() {
    openPanel(
      <ChapterFormPanel 
        key="add-chapter"
        editingChapter={null} 
        subjects={subjects} 
        defaultSubjectId={filterSubjectId}
        onSuccess={() => { closePanel(); fetchData(); toast.success("Data berhasil disimpan!"); }} 
        onCancel={closePanel} 
      />
    )
  }

  function openEditChapter(c: Chapter) {
    openPanel(
      <ChapterFormPanel 
        key={`edit-chapter-${c.id}`}
        editingChapter={c} 
        subjects={subjects} 
        defaultSubjectId={c.subjectId}
        onSuccess={() => { closePanel(); fetchData(); toast.success("Data berhasil disimpan!"); }} 
        onCancel={closePanel} 
      />
    )
  }

  async function handleDeleteChapter(id: string) {
    if (!confirm("Hapus bab ini beserta seluruh soal di dalamnya?")) return
    const res = await fetch(`/api/admin/chapters?id=${id}`, { method: "DELETE" })
    if (res.ok) {
      fetchData()
    } else {
      alert("Gagal menghapus bab")
    }
  }

  // --- CRUD QUESTIONS ---
  function openAddQuestion() {
    openPanel(
      <QuestionFormPanel 
        key="add-question"
        editingQuestion={null} 
        chapters={chapters}
        defaultChapterId={filterChapterId}
        onSuccess={() => { closePanel(); fetchData(); toast.success("Data berhasil disimpan!"); }} 
        onCancel={closePanel} 
      />
    )
  }

  function openEditQuestion(q: Question) {
    openPanel(
      <QuestionFormPanel 
        key={`edit-question-${q.id}`}
        editingQuestion={q} 
        chapters={chapters}
        defaultChapterId={q.chapterId}
        onSuccess={() => { closePanel(); fetchData(); toast.success("Data berhasil disimpan!"); }} 
        onCancel={closePanel} 
      />
    )
  }

  async function handleDeleteQuestion(id: string) {
    if (!confirm("Hapus soal ini?")) return
    const res = await fetch(`/api/admin/questions?id=${id}`, { method: "DELETE" })
    if (res.ok) {
      fetchData()
    } else {
      alert("Gagal menghapus soal")
    }
  }

  // Question Filters calculation
  const filteredQuestions = questions.filter(q => {
    const matchSubject = filterSubjectId ? q.chapter.subject.id === filterSubjectId : true
    const matchChapter = filterChapterId ? q.chapterId === filterChapterId : true
    const matchSearch = searchQuery ? q.text.toLowerCase().includes(searchQuery.toLowerCase()) : true
    return matchSubject && matchChapter && matchSearch
  })

  const paginatedQuestions = filteredQuestions.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
  const totalPages = Math.ceil(filteredQuestions.length / itemsPerPage)

  const filteredChapters = chapters.filter(c => {
    return filterSubjectId ? c.subjectId === filterSubjectId : true
  })
  
  const paginatedChapters = filteredChapters.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
  const totalChapterPages = Math.ceil(filteredChapters.length / itemsPerPage)

  return (
    <div className="p-6 md:p-8 space-y-6 h-full overflow-y-auto no-scrollbar">
      {/* Top Header */}
      <AdminPageHeader
        title="Bank Soal & Kurikulum"
        subtitle="Kelola konten materi ujian UTBK yang mencakup mata pelajaran, bab belajar, dan detail soal."
        icon={<Database className="w-8 h-8" />}
        badgeText="KELOLA KONTEN"
        infoTitle="Struktur Kurikulum UTBK:"
        infoList={[
          "Mata Pelajaran (Subject) adalah level teratas (Misal: Penalaran Umum, Literasi Bahasa).",
          "Setiap Subject memiliki banyak Bab Materi (Chapters) yang spesifik.",
          "Soal dikelompokkan ke dalam Bab Materi tertentu untuk memastikan sebaran tryout merata."
        ]}
        stats={[
          { label: "Total Bab", value: chapters.length },
          { label: "Total Soal", value: questions.length },
        ]}
      />

      {/* Tabs Menu */}
      <div className="flex border-b border-slate-100 gap-1.5 overflow-x-auto no-scrollbar w-full">
        <button
          onClick={() => { setActiveTab("questions"); setFilterSubjectId(""); setFilterChapterId("") }}
          className={`px-5 py-3 text-sm font-semibold border-b-2 transition-all inline-flex items-center gap-2 shrink-0 whitespace-nowrap ${activeTab === "questions" ? "border-[var(--accent)] text-[var(--accent-dark)]" : "border-transparent text-slate-400 hover:text-slate-600"}`}
        >
          <HelpCircle className="w-4 h-4" /> Daftar Soal
        </button>
        <button
          onClick={() => { setActiveTab("chapters"); setFilterSubjectId("") }}
          className={`px-5 py-3 text-sm font-semibold border-b-2 transition-all inline-flex items-center gap-2 shrink-0 whitespace-nowrap ${activeTab === "chapters" ? "border-[var(--accent)] text-[var(--accent-dark)]" : "border-transparent text-slate-400 hover:text-slate-600"}`}
        >
          <Layers className="w-4 h-4" /> Daftar Bab (Chapters)
        </button>
        <button
          onClick={() => setActiveTab("subjects")}
          className={`px-5 py-3 text-sm font-semibold border-b-2 transition-all inline-flex items-center gap-2 shrink-0 whitespace-nowrap ${activeTab === "subjects" ? "border-[var(--accent)] text-[var(--accent-dark)]" : "border-transparent text-slate-400 hover:text-slate-600"}`}
        >
          <BookOpen className="w-4 h-4" /> Mata Pelajaran
        </button>
      </div>

      {/* Loading state */}
      {loading ? (
        <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 text-[var(--accent)] animate-spin" /></div>
      ) : (
        <div className="space-y-6">
          
          {/* TAB 1: SUBJECTS */}
          {activeTab === "subjects" && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold text-slate-700">{subjects.length} Mata Pelajaran</h3>
                <button onClick={openAddSubject} className="flex items-center gap-2 px-4 py-2 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white font-bold text-sm rounded-xl transition-all shadow-sm">
                  <Plus className="w-4 h-4" /> Tambah Mapel
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {subjects.map(s => (
                  <div key={s.id} className="bg-white border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.01)] rounded-2xl p-5 flex justify-between items-center">
                    <div>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${s.cluster === 'SAINTEK' ? 'bg-sky-50 text-sky-600 border border-sky-100' : s.cluster === 'SOSHUM' ? 'bg-orange-50 text-orange-600 border border-orange-100' : 'bg-purple-50 text-purple-600 border border-purple-100'}`}>
                        {s.cluster}
                      </span>
                      <h4 className="font-bold text-slate-800 text-lg mt-1.5">{s.name}</h4>
                      <p className="text-slate-400 text-xs mt-0.5">{s._count?.chapters || 0} Bab Belajar</p>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => openEditSubject(s)} className="p-2 text-slate-400 hover:text-[var(--accent)] hover:bg-slate-50 rounded-xl transition-colors"><Edit2 className="w-4 h-4" /></button>
                      <button onClick={() => handleDeleteSubject(s.id)} className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: CHAPTERS */}
          {activeTab === "chapters" && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                {/* Filter */}
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Filter Mapel:</span>
                  <select value={filterSubjectId} onChange={e => setFilterSubjectId(e.target.value)} className="bg-white border border-slate-200 text-slate-700 text-xs font-semibold rounded-xl px-3 py-2 outline-none">
                    <option value="">Semua Mapel</option>
                    {subjects.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                  </select>
                </div>
                <button onClick={openAddChapter} className="flex items-center gap-2 px-4 py-2 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white font-bold text-sm rounded-xl transition-all shadow-sm">
                  <Plus className="w-4 h-4" /> Tambah Bab
                </button>
              </div>

              <div className="bg-white border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.01)] rounded-2xl overflow-hidden">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 border-b border-slate-100 text-slate-400 uppercase tracking-wider text-[10px] font-bold">
                    <tr>
                      <th className="py-3 px-5">Mapel</th>
                      <th className="py-3 px-5">Urutan</th>
                      <th className="py-3 px-5">Nama Bab</th>
                      <th className="py-3 px-5">Rangkuman Materi</th>
                      <th className="py-3 px-5 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {paginatedChapters.map(c => (
                      <tr key={c.id} className="hover:bg-slate-50/50">
                        <td className="py-3.5 px-5 font-semibold text-slate-500 text-xs">{c.subject.name}</td>
                        <td className="py-3.5 px-5 font-mono text-slate-600">{c.order}</td>
                        <td className="py-3.5 px-5 font-bold text-slate-800">{c.name}</td>
                        <td className="py-3.5 px-5 text-slate-400 text-xs max-w-[200px] truncate">{c.theorySummary || "-"}</td>
                        <td className="py-3.5 px-5 text-right flex justify-end gap-1.5">
                          <button onClick={() => openEditChapter(c)} className="p-2 text-slate-400 hover:text-[var(--accent)] hover:bg-slate-50 rounded-xl transition-colors"><Edit2 className="w-4 h-4" /></button>
                          <button onClick={() => handleDeleteChapter(c.id)} className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"><Trash2 className="w-4 h-4" /></button>
                        </td>
                      </tr>
                    ))}
                    {filteredChapters.length === 0 && (
                      <tr><td colSpan={5} className="py-8 text-center text-slate-400">Belum ada bab terdaftar</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
              
              {/* Pagination Controls */}
              {totalChapterPages > 1 && (
                <div className="flex justify-center items-center gap-4 py-4">
                  <button 
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="px-5 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-xl text-sm font-bold disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
                  >
                    Sebelumnya
                  </button>
                  <span className="text-sm font-bold text-slate-400">
                    Halaman <span className="text-slate-700">{currentPage}</span> dari <span className="text-slate-700">{totalChapterPages}</span>
                  </span>
                  <button 
                    onClick={() => setCurrentPage(p => Math.min(totalChapterPages, p + 1))}
                    disabled={currentPage === totalChapterPages}
                    className="px-5 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-xl text-sm font-bold disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
                  >
                    Selanjutnya
                  </button>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: QUESTIONS */}
          {activeTab === "questions" && (
            <div className="space-y-4">
              {/* Filter and search bar */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div className="sm:col-span-2">
                  <input
                    type="text"
                    placeholder="Cari teks soal..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="w-full bg-white border border-slate-200 text-slate-800 text-sm rounded-xl px-4 py-2.5 outline-none focus:border-[var(--accent)]"
                  />
                </div>
                <div>
                  <select value={filterSubjectId} onChange={e => { setFilterSubjectId(e.target.value); setFilterChapterId("") }} className="w-full bg-white border border-slate-200 text-slate-700 text-sm rounded-xl px-3 py-2.5 outline-none">
                    <option value="">Semua Mapel</option>
                    {subjects.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                  </select>
                </div>
                <div>
                  <select value={filterChapterId} onChange={e => setFilterChapterId(e.target.value)} className="w-full bg-white border border-slate-200 text-slate-700 text-sm rounded-xl px-3 py-2.5 outline-none">
                    <option value="">Semua Bab</option>
                    {chapters.filter(c => !filterSubjectId || c.subjectId === filterSubjectId).map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">{filteredQuestions.length} Soal Ditemukan</h3>
                <button onClick={openAddQuestion} className="flex items-center gap-2 px-4 py-2 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white font-bold text-sm rounded-xl transition-all shadow-sm">
                  <Plus className="w-4 h-4" /> Tambah Soal
                </button>
              </div>

              <div className="space-y-4">
                {paginatedQuestions.map((q, idx) => (
                  <div key={q.id} className="bg-white border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.01)] rounded-2xl p-5 hover:border-slate-200 transition-all">
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex-1 space-y-3">
                        <div className="flex flex-wrap items-center gap-2 text-[10px] font-bold">
                          <span className="bg-purple-50 text-purple-600 px-2.5 py-0.5 rounded-full">{q.chapter.subject.name}</span>
                          <span className="bg-slate-100 text-slate-500 px-2.5 py-0.5 rounded-full">{q.chapter.name}</span>
                          <span className="bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-full">Bobot (b) = {q.difficulty}</span>
                          <span className="bg-orange-50 text-orange-600 px-2 py-0.5 rounded-full">{q.type}</span>
                        </div>
                        
                        <div className="text-slate-800 text-sm font-medium flex gap-2">
                          <span className="shrink-0">{(currentPage - 1) * itemsPerPage + idx + 1}.</span>
                          <div className="flex-1 min-w-0"><MarkdownRenderer content={q.text} /></div>
                        </div>
                        {q.imageUrl && (
                          <div className="max-w-[200px] border border-slate-100 rounded-lg overflow-hidden my-2">
                            <img src={q.imageUrl} alt="Gambar Soal" className="object-contain max-h-32" />
                          </div>
                        )}

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3 pl-4">
                          {q.options.map(o => (
                            <div key={o.id} className={`text-xs p-2 rounded-xl flex items-center gap-2 border ${o.isCorrect ? "bg-emerald-50 text-emerald-700 border-emerald-100 font-semibold" : "bg-slate-50/50 text-slate-500 border-transparent"}`}>
                              <span className="w-5 font-bold uppercase">{o.label}.</span>
                              <span className="flex-1"><MarkdownRenderer content={o.text} /></span>
                              {o.isCorrect && <Check className="w-3.5 h-3.5 text-emerald-600" />}
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex flex-col gap-1">
                        <button onClick={() => openEditQuestion(q)} className="p-2 text-slate-400 hover:text-[var(--accent)] hover:bg-slate-50 rounded-xl transition-colors"><Edit2 className="w-4.5 h-4.5" /></button>
                        <button onClick={() => handleDeleteQuestion(q.id)} className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"><Trash2 className="w-4.5 h-4.5" /></button>
                      </div>
                    </div>
                  </div>
                ))}
                {filteredQuestions.length === 0 && (
                  <div className="text-center py-16 text-slate-400 border border-dashed border-slate-200 rounded-2xl">Tidak ada soal yang sesuai filter</div>
                )}
                
                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center gap-4 py-6">
                    <button 
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="px-5 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-xl text-sm font-bold disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                      Sebelumnya
                    </button>
                    <span className="text-sm font-bold text-slate-400">
                      Halaman <span className="text-slate-700">{currentPage}</span> dari <span className="text-slate-700">{totalPages}</span>
                    </span>
                    <button 
                      onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                      className="px-5 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-xl text-sm font-bold disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                      Selanjutnya
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

        </div>
      )}
      {/* Modals removed in favor of Sliding Panels */}
    </div>
  )
}
