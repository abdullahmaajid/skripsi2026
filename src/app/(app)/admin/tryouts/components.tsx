"use client"

import { useState } from "react"

export function TryoutFormPanel({ 
  editingTryout, 
  onSuccess, 
  onCancel 
}: { 
  editingTryout: any | null, 
  onSuccess: () => void, 
  onCancel: () => void 
}) {
  const [form, setForm] = useState({
    name: editingTryout?.name || "",
    description: editingTryout?.description || "",
    duration: editingTryout?.duration || 195,
    totalItems: editingTryout?.totalItems || 155,
    cluster: editingTryout?.cluster || "CAMPURAN",
    isDiagnostic: editingTryout?.isDiagnostic || false
  })
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    const method = editingTryout ? "PUT" : "POST"
    const payload = editingTryout ? { id: editingTryout.id, ...form } : form

    const res = await fetch("/api/admin/tryouts", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
    setSubmitting(false)
    if (res.ok) {
      onSuccess()
    } else {
      const data = await res.json()
      alert(data.error || "Gagal menyimpan tryout")
    }
  }

  return (
    <div className="h-full flex flex-col p-6 space-y-6">
      <h3 className="text-xl font-bold text-slate-800">{editingTryout ? "Ubah Paket Tryout" : "Tambah Paket Tryout"}</h3>
      <form onSubmit={handleSubmit} className="flex-1 flex flex-col space-y-4">
        <div className="flex-1 space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Nama Paket</label>
            <input
              type="text"
              required
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm font-semibold rounded-xl px-4 py-3 outline-none focus:border-[var(--accent)] focus:bg-white transition-all"
              placeholder="Misal: Try Out UTBK Nasional #1"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Deskripsi Paket</label>
            <textarea
              value={form.description}
              onChange={e => setForm({ ...form, description: e.target.value })}
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
                value={form.duration}
                onChange={e => setForm({ ...form, duration: parseInt(e.target.value) || 0 })}
                className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm font-semibold rounded-xl px-4 py-3 outline-none focus:border-[var(--accent)] focus:bg-white transition-all"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Jumlah Soal</label>
              <input
                type="number"
                required
                value={form.totalItems}
                onChange={e => setForm({ ...form, totalItems: parseInt(e.target.value) || 0 })}
                className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm font-semibold rounded-xl px-4 py-3 outline-none focus:border-[var(--accent)] focus:bg-white transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Kluster</label>
              <select
                value={form.cluster}
                onChange={e => setForm({ ...form, cluster: e.target.value as any })}
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
                checked={form.isDiagnostic}
                onChange={e => setForm({ ...form, isDiagnostic: e.target.checked })}
                className="accent-[var(--accent)] w-4.5 h-4.5 cursor-pointer"
              />
              <label htmlFor="isDiagnostic" className="text-xs font-bold text-slate-600 cursor-pointer select-none">Diagnostic Test</label>
            </div>
          </div>
        </div>

        <div className="flex gap-3 justify-end pt-3 mt-auto pb-6">
          <button type="button" onClick={onCancel} className="flex-1 px-5 py-3 bg-slate-100 hover:bg-slate-200 rounded-xl text-slate-600 text-sm font-bold transition-all">Batal</button>
          <button type="submit" disabled={submitting} className="flex-1 px-5 py-3 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white text-sm font-bold rounded-xl transition-all disabled:opacity-50">
            {submitting ? "Menyimpan..." : "Simpan"}
          </button>
        </div>
      </form>
    </div>
  )
}

export function SectionFormPanel({ 
  editingSection,
  selectedTryoutId,
  subjects,
  onSuccess, 
  onCancel 
}: { 
  editingSection: any | null,
  selectedTryoutId: string,
  subjects: any[],
  onSuccess: () => void, 
  onCancel: () => void 
}) {
  const [form, setForm] = useState({
    subjectId: editingSection?.subjectId || subjects[0]?.id || "",
    itemCount: editingSection?.itemCount || 15,
    order: editingSection?.order || 1,
    duration: editingSection?.duration || 15
  })
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    const method = editingSection ? "PUT" : "POST"
    const payload = editingSection 
      ? { id: editingSection.id, ...form } 
      : { templateId: selectedTryoutId, ...form }

    const res = await fetch("/api/admin/tryouts/sections", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
    setSubmitting(false)
    if (res.ok) {
      onSuccess()
    } else {
      const data = await res.json()
      alert(data.error || "Gagal menyimpan subtes")
    }
  }

  return (
    <div className="h-full flex flex-col p-6 space-y-6">
      <h3 className="text-xl font-bold text-slate-800">{editingSection ? "Ubah Subtes" : "Tambah Subtes Baru"}</h3>
      <form onSubmit={handleSubmit} className="flex-1 flex flex-col space-y-4">
        <div className="flex-1 space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Mata Pelajaran</label>
            <select
              required
              value={form.subjectId}
              onChange={e => setForm({ ...form, subjectId: e.target.value })}
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
                value={form.itemCount}
                onChange={e => setForm({ ...form, itemCount: parseInt(e.target.value) || 0 })}
                className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm font-semibold rounded-xl px-4 py-3 outline-none focus:border-[var(--accent)] focus:bg-white transition-all"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Menit</label>
              <input
                type="number"
                required
                value={form.duration}
                onChange={e => setForm({ ...form, duration: parseInt(e.target.value) || 0 })}
                className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm font-semibold rounded-xl px-4 py-3 outline-none focus:border-[var(--accent)] focus:bg-white transition-all"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Urutan</label>
              <input
                type="number"
                required
                value={form.order}
                onChange={e => setForm({ ...form, order: parseInt(e.target.value) || 1 })}
                className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm font-semibold rounded-xl px-4 py-3 outline-none focus:border-[var(--accent)] focus:bg-white transition-all"
              />
            </div>
          </div>
        </div>

        <div className="flex gap-3 justify-end pt-3 mt-auto pb-6">
          <button type="button" onClick={onCancel} className="flex-1 px-5 py-3 bg-slate-100 hover:bg-slate-200 rounded-xl text-slate-600 text-sm font-bold transition-all">Batal</button>
          <button type="submit" disabled={submitting} className="flex-1 px-5 py-3 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white text-sm font-bold rounded-xl transition-all disabled:opacity-50">
            {submitting ? "Menyimpan..." : "Simpan"}
          </button>
        </div>
      </form>
    </div>
  )
}
