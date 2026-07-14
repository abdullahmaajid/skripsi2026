"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { ChevronDown, Search, Plus, Edit2, Trash2, BookOpen, Layers, HelpCircle, Check, Loader2, ArrowLeft, Upload } from "lucide-react"
import MarkdownRenderer from "@/components/ui/MarkdownRenderer"

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

  // Form states
  const [showSubjectModal, setShowSubjectModal] = useState(false)
  const [editingSubject, setEditingSubject] = useState<Subject | null>(null)
  const [subjectForm, setSubjectForm] = useState({ name: "", cluster: "CAMPURAN" })

  const [showChapterModal, setShowChapterModal] = useState(false)
  const [editingChapter, setEditingChapter] = useState<Chapter | null>(null)
  const [chapterForm, setChapterForm] = useState({ name: "", subjectId: "", order: 0, theorySummary: "" })

  const [showQuestionModal, setShowQuestionModal] = useState(false)
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null)
  const [questionForm, setQuestionForm] = useState({
    chapterId: "",
    text: "",
    imageUrl: "",
    difficulty: 0,
    type: "MULTIPLE_CHOICE",
    options: [
      { label: "A", text: "", isCorrect: true },
      { label: "B", text: "", isCorrect: false },
      { label: "C", text: "", isCorrect: false },
      { label: "D", text: "", isCorrect: false },
      { label: "E", text: "", isCorrect: false },
    ] as OptionData[]
  })

  const [submitting, setSubmitting] = useState(false)

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
    setEditingSubject(null)
    setSubjectForm({ name: "", cluster: "CAMPURAN" })
    setShowSubjectModal(true)
  }

  function openEditSubject(s: Subject) {
    setEditingSubject(s)
    setSubjectForm({ name: s.name, cluster: s.cluster })
    setShowSubjectModal(true)
  }

  async function handleSubjectSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    const method = editingSubject ? "PUT" : "POST"
    const payload = editingSubject ? { id: editingSubject.id, ...subjectForm } : subjectForm

    const res = await fetch("/api/admin/subjects", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
    setSubmitting(false)
    if (res.ok) {
      setShowSubjectModal(false)
      fetchData()
    } else {
      const data = await res.json()
      alert(data.error || "Gagal menyimpan mata pelajaran")
    }
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
    setEditingChapter(null)
    setChapterForm({ name: "", subjectId: filterSubjectId || (subjects[0]?.id || ""), order: 0, theorySummary: "" })
    setShowChapterModal(true)
  }

  function openEditChapter(c: Chapter) {
    setEditingChapter(c)
    setChapterForm({ name: c.name, subjectId: c.subjectId, order: c.order, theorySummary: c.theorySummary || "" })
    setShowChapterModal(true)
  }

  async function handleChapterSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    const method = editingChapter ? "PUT" : "POST"
    const payload = editingChapter ? { id: editingChapter.id, ...chapterForm } : chapterForm

    const res = await fetch("/api/admin/chapters", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
    setSubmitting(false)
    if (res.ok) {
      setShowChapterModal(false)
      fetchData()
    } else {
      const data = await res.json()
      alert(data.error || "Gagal menyimpan bab")
    }
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
    setEditingQuestion(null)
    setQuestionForm({
      chapterId: filterChapterId || (chapters[0]?.id || ""),
      text: "",
      imageUrl: "",
      difficulty: 0.0,
      type: "MULTIPLE_CHOICE",
      options: [
        { label: "A", text: "", isCorrect: true },
        { label: "B", text: "", isCorrect: false },
        { label: "C", text: "", isCorrect: false },
        { label: "D", text: "", isCorrect: false },
        { label: "E", text: "", isCorrect: false },
      ]
    })
    setShowQuestionModal(true)
  }

  function openEditQuestion(q: Question) {
    setEditingQuestion(q)
    setQuestionForm({
      chapterId: q.chapterId,
      text: q.text,
      imageUrl: q.imageUrl || "",
      difficulty: q.difficulty,
      type: q.type,
      options: q.options.map(o => ({ id: o.id, label: o.label, text: o.text, isCorrect: o.isCorrect }))
    })
    setShowQuestionModal(true)
  }

  async function handleQuestionSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    const method = editingQuestion ? "PUT" : "POST"
    const payload = editingQuestion ? { id: editingQuestion.id, ...questionForm } : questionForm

    const res = await fetch("/api/admin/questions", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
    setSubmitting(false)
    if (res.ok) {
      setShowQuestionModal(false)
      fetchData()
    } else {
      const data = await res.json()
      alert(data.error || "Gagal menyimpan soal")
    }
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

  const filteredChapters = chapters.filter(c => {
    return filterSubjectId ? c.subjectId === filterSubjectId : true
  })

  return (
    <div className="p-6 md:p-8 space-y-6 h-full overflow-y-auto no-scrollbar">
      {/* Top Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Bank Soal &amp; Kurikulum</h1>
        <p className="text-sm text-slate-500 mt-1">Kelola konten materi ujian UTBK yang mencakup mata pelajaran, bab belajar, dan detail soal.</p>
      </div>

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
                    {filteredChapters.map(c => (
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
                {filteredQuestions.map((q, idx) => (
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
                          <span className="shrink-0">{idx + 1}.</span>
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
              </div>
            </div>
          )}

        </div>
      )}

      {/* --- MODAL DIALOGS --- */}

      {/* 1. Subject Modal */}
      {showSubjectModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[2rem] max-w-md w-full p-6 shadow-2xl space-y-4 relative border border-slate-100">
            <h3 className="text-xl font-bold text-slate-800">{editingSubject ? "Ubah Mata Pelajaran" : "Tambah Mata Pelajaran"}</h3>
            <form onSubmit={handleSubjectSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Nama Mapel</label>
                <input
                  type="text"
                  required
                  value={subjectForm.name}
                  onChange={e => setSubjectForm({ ...subjectForm, name: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm font-semibold rounded-xl px-4 py-3 outline-none focus:border-[var(--accent)] focus:bg-white transition-all"
                  placeholder="Misal: Penalaran Matematika"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Kluster Kelompok</label>
                <select
                  value={subjectForm.cluster}
                  onChange={e => setSubjectForm({ ...subjectForm, cluster: e.target.value as any })}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-700 text-sm font-semibold rounded-xl px-4 py-3 outline-none focus:border-[var(--accent)] focus:bg-white transition-all cursor-pointer"
                >
                  <option value="SAINTEK">SAINTEK</option>
                  <option value="SOSHUM">SOSHUM</option>
                  <option value="CAMPURAN">CAMPURAN</option>
                </select>
              </div>
              <div className="flex gap-3 justify-end pt-3">
                <button type="button" onClick={() => setShowSubjectModal(false)} className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 rounded-xl text-slate-600 text-sm font-bold transition-all">Batal</button>
                <button type="submit" disabled={submitting} className="px-5 py-2.5 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white text-sm font-bold rounded-xl transition-all disabled:opacity-50">
                  {submitting ? "Menyimpan..." : "Simpan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 2. Chapter Modal */}
      {showChapterModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[2rem] max-w-md w-full p-6 shadow-2xl space-y-4 relative border border-slate-100">
            <h3 className="text-xl font-bold text-slate-800">{editingChapter ? "Ubah Bab" : "Tambah Bab Baru"}</h3>
            <form onSubmit={handleChapterSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Mata Pelajaran</label>
                <select
                  required
                  value={chapterForm.subjectId}
                  onChange={e => setChapterForm({ ...chapterForm, subjectId: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-700 text-sm font-semibold rounded-xl px-4 py-3 outline-none focus:border-[var(--accent)] focus:bg-white transition-all cursor-pointer"
                >
                  <option value="">Pilih Mata Pelajaran...</option>
                  {subjects.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Nama Bab</label>
                <input
                  type="text"
                  required
                  value={chapterForm.name}
                  onChange={e => setChapterForm({ ...chapterForm, name: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm font-semibold rounded-xl px-4 py-3 outline-none focus:border-[var(--accent)] focus:bg-white transition-all"
                  placeholder="Misal: Aljabar Linier"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Urutan (Order)</label>
                <input
                  type="number"
                  required
                  value={chapterForm.order}
                  onChange={e => setChapterForm({ ...chapterForm, order: parseInt(e.target.value) || 0 })}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm font-semibold rounded-xl px-4 py-3 outline-none focus:border-[var(--accent)] focus:bg-white transition-all"
                  placeholder="0"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Rangkuman Materi (Theory Summary)</label>
                <textarea
                  value={chapterForm.theorySummary}
                  onChange={e => setChapterForm({ ...chapterForm, theorySummary: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm font-medium rounded-xl px-4 py-3 outline-none focus:border-[var(--accent)] focus:bg-white transition-all min-h-[100px] resize-none"
                  placeholder="Teks markdown atau LaTeX materi ringkas..."
                />
              </div>
              <div className="flex gap-3 justify-end pt-3">
                <button type="button" onClick={() => setShowChapterModal(false)} className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 rounded-xl text-slate-600 text-sm font-bold transition-all">Batal</button>
                <button type="submit" disabled={submitting} className="px-5 py-2.5 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white text-sm font-bold rounded-xl transition-all disabled:opacity-50">
                  {submitting ? "Menyimpan..." : "Simpan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 3. Question Modal */}
      {showQuestionModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-[2rem] max-w-2xl w-full p-6 shadow-2xl space-y-4 my-8 relative border border-slate-100">
            <h3 className="text-xl font-bold text-slate-800">{editingQuestion ? "Ubah Soal" : "Tambah Soal Baru"}</h3>
            <form onSubmit={handleQuestionSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Pilih Bab</label>
                  <select
                    required
                    value={questionForm.chapterId}
                    onChange={e => setQuestionForm({ ...questionForm, chapterId: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-700 text-sm font-semibold rounded-xl px-4 py-3 outline-none focus:border-[var(--accent)] focus:bg-white transition-all cursor-pointer"
                  >
                    <option value="">Pilih Bab...</option>
                    {chapters.map(c => <option key={c.id} value={c.id}>{c.subject.name} — {c.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Kesulitan / Difficulty (b-parameter: -3 s.d +3)</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={questionForm.difficulty}
                    onChange={e => setQuestionForm({ ...questionForm, difficulty: parseFloat(e.target.value) || 0.0 })}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm font-semibold rounded-xl px-4 py-3 outline-none focus:border-[var(--accent)] focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Teks Soal (Markdown/LaTeX didukung)</label>
                <textarea
                  required
                  value={questionForm.text}
                  onChange={e => setQuestionForm({ ...questionForm, text: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm font-medium rounded-xl px-4 py-3 outline-none focus:border-[var(--accent)] focus:bg-white transition-all min-h-[100px] resize-none"
                  placeholder="Ketik soal di sini..."
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1.5">URL Gambar (Opsional)</label>
                  <input
                    type="text"
                    value={questionForm.imageUrl}
                    onChange={e => setQuestionForm({ ...questionForm, imageUrl: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm font-semibold rounded-xl px-4 py-3 outline-none focus:border-[var(--accent)] focus:bg-white transition-all"
                    placeholder="https://link-gambar.com/soal.png"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Tipe Soal</label>
                  <select
                    value={questionForm.type}
                    onChange={e => setQuestionForm({ ...questionForm, type: e.target.value as any })}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-700 text-sm font-semibold rounded-xl px-4 py-3 outline-none focus:border-[var(--accent)] focus:bg-white transition-all cursor-pointer"
                  >
                    <option value="MULTIPLE_CHOICE">Pilihan Ganda (Single Select)</option>
                    <option value="MULTIPLE_SELECT">Pilihan Ganda Kompleks (Multi Select)</option>
                    <option value="TRUE_FALSE">Benar / Salah</option>
                  </select>
                </div>
              </div>

              {/* OPSI JAWABAN */}
              <div className="space-y-2.5">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">Daftar Opsi Jawaban (Pilih Bulatan untuk Kunci Jawaban Benar)</label>
                {questionForm.options.map((o, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <input
                      type={questionForm.type === "MULTIPLE_SELECT" ? "checkbox" : "radio"}
                      name="correct_answer"
                      checked={o.isCorrect}
                      onChange={() => {
                        if (questionForm.type === "MULTIPLE_SELECT") {
                          const updated = [...questionForm.options]
                          updated[idx].isCorrect = !updated[idx].isCorrect
                          setQuestionForm({ ...questionForm, options: updated })
                        } else {
                          const updated = questionForm.options.map((opt, j) => ({
                            ...opt,
                            isCorrect: j === idx
                          }))
                          setQuestionForm({ ...questionForm, options: updated })
                        }
                      }}
                      className="accent-[var(--accent)] w-4 h-4 cursor-pointer"
                    />
                    <span className="font-bold text-slate-500 text-sm w-4">{o.label}</span>
                    <input
                      type="text"
                      required
                      value={o.text}
                      onChange={e => {
                        const updated = [...questionForm.options]
                        updated[idx].text = e.target.value
                        setQuestionForm({ ...questionForm, options: updated })
                      }}
                      className="flex-1 bg-slate-50 border border-slate-200 text-slate-800 text-sm font-medium rounded-xl px-3 py-2 outline-none focus:border-[var(--accent)] focus:bg-white transition-all"
                      placeholder={`Opsi ${o.label}`}
                    />
                  </div>
                ))}
              </div>

              <div className="flex gap-3 justify-end pt-3">
                <button type="button" onClick={() => setShowQuestionModal(false)} className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 rounded-xl text-slate-600 text-sm font-bold transition-all">Batal</button>
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
