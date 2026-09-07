"use client"

import { useState } from "react"
import { Check } from "lucide-react"

export function SubjectFormPanel({ 
  editingSubject, 
  onSuccess, 
  onCancel 
}: { 
  editingSubject: any | null, 
  onSuccess: () => void, 
  onCancel: () => void 
}) {
  const [form, setForm] = useState({ 
    name: editingSubject?.name || "", 
    cluster: editingSubject?.cluster || "CAMPURAN" 
  })
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    const method = editingSubject ? "PUT" : "POST"
    const payload = editingSubject ? { id: editingSubject.id, ...form } : form

    const res = await fetch("/api/admin/subjects", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
    setSubmitting(false)
    if (res.ok) {
      onSuccess()
    } else {
      const data = await res.json()
      alert(data.error || "Gagal menyimpan mata pelajaran")
    }
  }

  return (
    <div className="h-full flex flex-col p-6 space-y-6">
      <h3 className="text-xl font-bold text-slate-800">{editingSubject ? "Ubah Mata Pelajaran" : "Tambah Mata Pelajaran"}</h3>
      <form onSubmit={handleSubmit} className="flex-1 flex flex-col min-h-0 space-y-4">
        <div className="flex-1 space-y-5 overflow-y-auto no-scrollbar pr-2 pb-20">
          <div className="bg-slate-50/50 border border-slate-100 rounded-2xl p-5 space-y-4">
            <h4 className="text-xs font-extrabold text-slate-500 uppercase tracking-wider mb-3">Informasi Mata Pelajaran</h4>
            <div>
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Nama Mapel</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                className="w-full bg-white border border-slate-200 text-slate-800 text-sm font-semibold rounded-xl px-4 py-3 outline-none focus:border-[var(--accent)] focus:bg-white transition-all shadow-sm"
                placeholder="Misal: Penalaran Matematika"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Kluster Kelompok</label>
              <select
                value={form.cluster}
                onChange={e => setForm({ ...form, cluster: e.target.value as any })}
                className="w-full bg-white border border-slate-200 text-slate-700 text-sm font-semibold rounded-xl px-4 py-3 outline-none focus:border-[var(--accent)] focus:bg-white transition-all cursor-pointer shadow-sm"
              >
                <option value="SAINTEK">SAINTEK</option>
                <option value="SOSHUM">SOSHUM</option>
                <option value="CAMPURAN">CAMPURAN</option>
              </select>
            </div>
          </div>
        </div>
        <div className="flex gap-3 justify-end pt-4 mt-auto border-t border-slate-100">
          <button type="button" onClick={onCancel} className="flex-1 px-5 py-3 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl text-slate-600 text-sm font-bold transition-all shadow-sm">Batal</button>
          <button type="submit" disabled={submitting} className="flex-1 px-5 py-3 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white text-sm font-bold rounded-xl transition-all shadow-sm disabled:opacity-50">
            {submitting ? "Menyimpan..." : "Simpan"}
          </button>
        </div>
      </form>
    </div>
  )
}

export function ChapterFormPanel({ 
  editingChapter, 
  subjects,
  defaultSubjectId,
  onSuccess, 
  onCancel 
}: { 
  editingChapter: any | null,
  subjects: any[],
  defaultSubjectId: string,
  onSuccess: () => void, 
  onCancel: () => void 
}) {
  const [form, setForm] = useState({ 
    name: editingChapter?.name || "", 
    subjectId: editingChapter?.subjectId || defaultSubjectId || (subjects[0]?.id || ""), 
    order: editingChapter?.order || 0, 
    theorySummary: editingChapter?.theorySummary || "" 
  })
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    const method = editingChapter ? "PUT" : "POST"
    const payload = editingChapter ? { id: editingChapter.id, ...form } : form

    const res = await fetch("/api/admin/chapters", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
    setSubmitting(false)
    if (res.ok) {
      onSuccess()
    } else {
      const data = await res.json()
      alert(data.error || "Gagal menyimpan bab")
    }
  }

  return (
    <div className="h-full flex flex-col p-6 space-y-6">
      <h3 className="text-xl font-bold text-slate-800">{editingChapter ? "Ubah Bab" : "Tambah Bab Baru"}</h3>
      <form onSubmit={handleSubmit} className="flex-1 flex flex-col min-h-0 space-y-4">
        <div className="flex-1 space-y-5 overflow-y-auto no-scrollbar pr-2 pb-20">
          
          <div className="bg-slate-50/50 border border-slate-100 rounded-2xl p-5 space-y-4">
            <h4 className="text-xs font-extrabold text-slate-500 uppercase tracking-wider mb-3">Detail Bab</h4>
            <div>
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Mata Pelajaran</label>
              <select
                required
                value={form.subjectId}
                onChange={e => setForm({ ...form, subjectId: e.target.value })}
                className="w-full bg-white border border-slate-200 text-slate-700 text-sm font-semibold rounded-xl px-4 py-3 outline-none focus:border-[var(--accent)] focus:bg-white transition-all cursor-pointer shadow-sm"
              >
                <option value="">Pilih Mata Pelajaran...</option>
                {subjects.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
              </select>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div className="sm:col-span-3">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Nama Bab</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-white border border-slate-200 text-slate-800 text-sm font-semibold rounded-xl px-4 py-3 outline-none focus:border-[var(--accent)] focus:bg-white transition-all shadow-sm"
                  placeholder="Misal: Aljabar Linier"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Urutan (Order)</label>
                <input
                  type="number"
                  required
                  value={form.order}
                  onChange={e => setForm({ ...form, order: parseInt(e.target.value) || 0 })}
                  className="w-full bg-white border border-slate-200 text-slate-800 text-sm font-semibold rounded-xl px-4 py-3 outline-none focus:border-[var(--accent)] focus:bg-white transition-all shadow-sm"
                  placeholder="0"
                />
              </div>
            </div>
          </div>

          <div className="bg-slate-50/50 border border-slate-100 rounded-2xl p-5 space-y-4">
            <h4 className="text-xs font-extrabold text-slate-500 uppercase tracking-wider mb-3">Materi Bacaan</h4>
            <div>
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Rangkuman Materi</label>
              <textarea
                value={form.theorySummary}
                onChange={e => setForm({ ...form, theorySummary: e.target.value })}
                className="w-full bg-white border border-slate-200 text-slate-800 text-sm font-medium rounded-xl px-4 py-3 outline-none focus:border-[var(--accent)] focus:bg-white transition-all min-h-[150px] resize-none shadow-sm"
                placeholder="Teks markdown atau LaTeX materi ringkas..."
              />
            </div>
          </div>

        </div>
        <div className="flex gap-3 justify-end pt-4 mt-auto border-t border-slate-100">
          <button type="button" onClick={onCancel} className="flex-1 px-5 py-3 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl text-slate-600 text-sm font-bold transition-all shadow-sm">Batal</button>
          <button type="submit" disabled={submitting} className="flex-1 px-5 py-3 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white text-sm font-bold rounded-xl transition-all shadow-sm disabled:opacity-50">
            {submitting ? "Menyimpan..." : "Simpan"}
          </button>
        </div>
      </form>
    </div>
  )
}

export function QuestionFormPanel({ 
  editingQuestion, 
  chapters,
  defaultChapterId,
  onSuccess, 
  onCancel 
}: { 
  editingQuestion: any | null,
  chapters: any[],
  defaultChapterId: string,
  onSuccess: () => void, 
  onCancel: () => void 
}) {
  const [form, setForm] = useState({
    chapterId: editingQuestion?.chapterId || defaultChapterId || (chapters[0]?.id || ""),
    text: editingQuestion?.text || "",
    imageUrl: editingQuestion?.imageUrl || "",
    difficulty: editingQuestion?.difficulty || 0.0,
    type: editingQuestion?.type || "MULTIPLE_CHOICE",
    options: editingQuestion?.options?.map((o: any) => ({ id: o.id, label: o.label, text: o.text, isCorrect: o.isCorrect })) || [
      { label: "A", text: "", isCorrect: true },
      { label: "B", text: "", isCorrect: false },
      { label: "C", text: "", isCorrect: false },
      { label: "D", text: "", isCorrect: false },
      { label: "E", text: "", isCorrect: false },
    ]
  })
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    const method = editingQuestion ? "PUT" : "POST"
    const payload = editingQuestion ? { id: editingQuestion.id, ...form } : form

    const res = await fetch("/api/admin/questions", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
    setSubmitting(false)
    if (res.ok) {
      onSuccess()
    } else {
      const data = await res.json()
      alert(data.error || "Gagal menyimpan soal")
    }
  }

  return (
    <div className="h-full flex flex-col p-6 space-y-6">
      <h3 className="text-xl font-bold text-slate-800">{editingQuestion ? "Ubah Soal" : "Tambah Soal Baru"}</h3>
      <form onSubmit={handleSubmit} className="flex-1 flex flex-col min-h-0 space-y-4">
        <div className="flex-1 space-y-5 overflow-y-auto no-scrollbar pr-2 pb-20">
          
          <div className="bg-slate-50/50 border border-slate-100 rounded-2xl p-5 space-y-4">
            <h4 className="text-xs font-extrabold text-slate-500 uppercase tracking-wider mb-3">Kategori Soal</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Pilih Bab</label>
                <div className="mt-auto">
                  <select
                    required
                    value={form.chapterId}
                    onChange={e => setForm({ ...form, chapterId: e.target.value })}
                    className="w-full bg-white border border-slate-200 text-slate-700 text-sm font-semibold rounded-xl px-4 py-3 outline-none focus:border-[var(--accent)] focus:bg-white transition-all cursor-pointer shadow-sm"
                  >
                    <option value="">Pilih Bab...</option>
                    {chapters.map(c => <option key={c.id} value={c.id}>{c.subject.name} — {c.name}</option>)}
                  </select>
                </div>
              </div>
              <div className="flex flex-col">
                <div className="mb-1.5 flex items-center justify-between gap-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Kesulitan (b-param)</label>
                  <span className="text-[9px] font-bold text-blue-600 bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-md whitespace-nowrap shadow-sm">
                    -3.0 s/d +3.0
                  </span>
                </div>
                <div className="mt-auto">
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={form.difficulty}
                    onChange={e => setForm({ ...form, difficulty: parseFloat(e.target.value) || 0.0 })}
                    className="w-full bg-white border border-slate-200 text-slate-800 text-sm font-semibold rounded-xl px-4 py-3 outline-none focus:border-[var(--accent)] focus:bg-white transition-all shadow-sm"
                    placeholder="0.0"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-50/50 border border-slate-100 rounded-2xl p-5 space-y-4">
            <h4 className="text-xs font-extrabold text-slate-500 uppercase tracking-wider mb-3">Isi Pertanyaan</h4>
            <div>
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Teks Soal</label>
              <textarea
                required
                value={form.text}
                onChange={e => setForm({ ...form, text: e.target.value })}
                className="w-full bg-white border border-slate-200 text-slate-800 text-sm font-medium rounded-xl px-4 py-3 outline-none focus:border-[var(--accent)] focus:bg-white transition-all min-h-[150px] resize-none shadow-sm"
                placeholder="Ketik soal di sini..."
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1.5">URL Gambar</label>
                <input
                  type="text"
                  value={form.imageUrl}
                  onChange={e => setForm({ ...form, imageUrl: e.target.value })}
                  className="w-full bg-white border border-slate-200 text-slate-800 text-sm font-semibold rounded-xl px-4 py-3 outline-none focus:border-[var(--accent)] focus:bg-white transition-all shadow-sm"
                  placeholder="https://link.com/img.png"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Tipe Soal</label>
                <select
                  value={form.type}
                  onChange={e => setForm({ ...form, type: e.target.value as any })}
                  className="w-full bg-white border border-slate-200 text-slate-700 text-sm font-semibold rounded-xl px-4 py-3 outline-none focus:border-[var(--accent)] focus:bg-white transition-all cursor-pointer shadow-sm"
                >
                  <option value="MULTIPLE_CHOICE">Pilihan Ganda</option>
                  <option value="MULTIPLE_SELECT">Pilihan Ganda Kompleks</option>
                  <option value="TRUE_FALSE">Benar / Salah</option>
                </select>
              </div>
            </div>
          </div>

          <div className="bg-slate-50/50 border border-slate-100 rounded-2xl p-5 space-y-4">
            <h4 className="text-xs font-extrabold text-slate-500 uppercase tracking-wider mb-3">Opsi Jawaban</h4>
            <div className="space-y-3">
              {form.options.map((o: any, idx: number) => (
                <div key={idx} className="flex items-center gap-3">
                  <input
                    type={form.type === "MULTIPLE_SELECT" ? "checkbox" : "radio"}
                    name="correct_answer"
                    checked={o.isCorrect}
                    onChange={() => {
                      if (form.type === "MULTIPLE_SELECT") {
                        const updated = [...form.options]
                        updated[idx].isCorrect = !updated[idx].isCorrect
                        setForm({ ...form, options: updated })
                      } else {
                        const updated = form.options.map((opt: any, j: number) => ({
                          ...opt,
                          isCorrect: j === idx
                        }))
                        setForm({ ...form, options: updated })
                      }
                    }}
                    className="accent-[var(--accent)] w-5 h-5 cursor-pointer shrink-0"
                  />
                  <span className="font-bold text-slate-500 text-sm w-4 shrink-0">{o.label}</span>
                  <input
                    type="text"
                    required
                    value={o.text}
                    onChange={e => {
                      const updated = [...form.options]
                      updated[idx].text = e.target.value
                      setForm({ ...form, options: updated })
                    }}
                    className={`flex-1 bg-white border text-sm font-medium rounded-xl px-4 py-2.5 outline-none transition-all shadow-sm ${o.isCorrect ? "border-[var(--accent)] text-slate-800" : "border-slate-200 text-slate-600 focus:border-slate-300"}`}
                    placeholder={`Opsi ${o.label}`}
                  />
                </div>
              ))}
            </div>
          </div>

        </div>

        <div className="flex gap-3 justify-end pt-4 mt-auto border-t border-slate-100">
          <button type="button" onClick={onCancel} className="flex-1 px-5 py-3 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl text-slate-600 text-sm font-bold transition-all shadow-sm">Batal</button>
          <button type="submit" disabled={submitting} className="flex-1 px-5 py-3 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white text-sm font-bold rounded-xl transition-all shadow-sm disabled:opacity-50">
            {submitting ? "Menyimpan..." : "Simpan"}
          </button>
        </div>
      </form>
    </div>
  )
}
