"use client"

import { useState } from "react"

export function UniFormPanel({ 
  editingUni, 
  onSuccess, 
  onCancel 
}: { 
  editingUni: any | null, 
  onSuccess: () => void, 
  onCancel: () => void 
}) {
  const [form, setForm] = useState({
    name: editingUni?.name || "",
    code: editingUni?.code || "",
    location: editingUni?.location || "",
    type: editingUni?.type || "NEGERI",
    logoUrl: editingUni?.logoUrl || ""
  })
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    const method = editingUni ? "PUT" : "POST"
    const payload = editingUni ? { id: editingUni.id, ...form } : form

    const res = await fetch("/api/admin/universities", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
    setSubmitting(false)
    if (res.ok) {
      onSuccess()
    } else {
      const data = await res.json()
      alert(data.error || "Gagal menyimpan universitas")
    }
  }

  return (
    <div className="h-full flex flex-col p-6 space-y-6">
      <h3 className="text-xl font-bold text-slate-800">{editingUni ? "Ubah Universitas" : "Tambah PTN Baru"}</h3>
      <form onSubmit={handleSubmit} className="flex-1 flex flex-col space-y-4">
        <div className="flex-1 space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Nama Universitas</label>
            <input
              type="text"
              required
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm font-semibold rounded-xl px-4 py-3 outline-none focus:border-[var(--accent)] focus:bg-white transition-all"
              placeholder="Misal: Universitas Indonesia"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Kode PTN</label>
              <input
                type="text"
                required
                value={form.code}
                onChange={e => setForm({ ...form, code: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm font-semibold rounded-xl px-4 py-3 outline-none focus:border-[var(--accent)] focus:bg-white transition-all"
                placeholder="Kode 3 digit (UI: 311)"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Tipe Kampus</label>
              <select
                value={form.type}
                onChange={e => setForm({ ...form, type: e.target.value as any })}
                className="w-full bg-slate-50 border border-slate-200 text-slate-700 text-sm font-semibold rounded-xl px-4 py-3 outline-none focus:border-[var(--accent)] focus:bg-white transition-all cursor-pointer"
              >
                <option value="NEGERI">NEGERI</option>
                <option value="SWASTA">SWASTA</option>
              </select>
            </div>
          </div>
          <div>
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Kota / Provinsi</label>
            <input
              type="text"
              required
              value={form.location}
              onChange={e => setForm({ ...form, location: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm font-semibold rounded-xl px-4 py-3 outline-none focus:border-[var(--accent)] focus:bg-white transition-all"
              placeholder="Misal: Depok, Jawa Barat"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1.5">URL Logo (Opsional)</label>
            <input
              type="text"
              value={form.logoUrl}
              onChange={e => setForm({ ...form, logoUrl: e.target.value })}
              className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm font-semibold rounded-xl px-4 py-3 outline-none focus:border-[var(--accent)] focus:bg-white transition-all"
              placeholder="https://link-gambar.com/logo-ui.png"
            />
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

export function MajorFormPanel({ 
  editingMajor,
  universities,
  defaultUniversityId,
  onSuccess, 
  onCancel 
}: { 
  editingMajor: any | null,
  universities: any[],
  defaultUniversityId: string,
  onSuccess: () => void, 
  onCancel: () => void 
}) {
  const [form, setForm] = useState({
    name: editingMajor?.name || "",
    code: editingMajor?.code || "",
    universityId: editingMajor?.universityId || defaultUniversityId || (universities[0]?.id || ""),
    faculty: editingMajor?.faculty || "",
    degree: editingMajor?.degree || "S1",
    quota: editingMajor?.quota || 0,
    applicants: editingMajor?.applicants || 0,
    estimatedScore: editingMajor?.estimatedScore || 600,
    cluster: editingMajor?.cluster || "SAINTEK",
    year: editingMajor?.year || 2025
  })
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    const method = editingMajor ? "PUT" : "POST"
    const payload = editingMajor ? { id: editingMajor.id, ...form } : form

    const res = await fetch("/api/admin/majors", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
    setSubmitting(false)
    if (res.ok) {
      onSuccess()
    } else {
      const data = await res.json()
      alert(data.error || "Gagal menyimpan prodi")
    }
  }

  return (
    <div className="h-full flex flex-col p-6 space-y-6">
      <h3 className="text-xl font-bold text-slate-800">{editingMajor ? "Ubah Jurusan/Prodi" : "Tambah Prodi Baru"}</h3>
      <form onSubmit={handleSubmit} className="flex-1 flex flex-col space-y-4">
        <div className="flex-1 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Universitas</label>
              <select
                required
                value={form.universityId}
                onChange={e => setForm({ ...form, universityId: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 text-slate-700 text-sm font-semibold rounded-xl px-4 py-3 outline-none focus:border-[var(--accent)] focus:bg-white transition-all cursor-pointer"
              >
                <option value="">Pilih Kampus...</option>
                {universities.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Fakultas</label>
              <input
                type="text"
                required
                value={form.faculty}
                onChange={e => setForm({ ...form, faculty: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm font-semibold rounded-xl px-4 py-3 outline-none focus:border-[var(--accent)] focus:bg-white transition-all"
                placeholder="Misal: Ilmu Komputer"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Program Studi</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm font-semibold rounded-xl px-4 py-3 outline-none focus:border-[var(--accent)] focus:bg-white transition-all"
                placeholder="Misal: Teknik Informatika"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Kode Prodi</label>
              <input
                type="text"
                required
                value={form.code}
                onChange={e => setForm({ ...form, code: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm font-semibold rounded-xl px-4 py-3 outline-none focus:border-[var(--accent)] focus:bg-white transition-all"
                placeholder="Misal: 3111025"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Jenjang</label>
              <select
                value={form.degree}
                onChange={e => setForm({ ...form, degree: e.target.value as any })}
                className="w-full bg-slate-50 border border-slate-200 text-slate-700 text-sm font-semibold rounded-xl px-4 py-3 outline-none focus:border-[var(--accent)] focus:bg-white transition-all cursor-pointer"
              >
                <option value="S1">S1</option>
                <option value="D4">D4</option>
                <option value="D3">D3</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Kelompok</label>
              <select
                value={form.cluster}
                onChange={e => setForm({ ...form, cluster: e.target.value as any })}
                className="w-full bg-slate-50 border border-slate-200 text-slate-700 text-sm font-semibold rounded-xl px-4 py-3 outline-none focus:border-[var(--accent)] focus:bg-white transition-all cursor-pointer"
              >
                <option value="SAINTEK">SAINTEK</option>
                <option value="SOSHUM">SOSHUM</option>
                <option value="CAMPURAN">CAMPURAN</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Data Tahun</label>
              <input
                type="number"
                required
                value={form.year}
                onChange={e => setForm({ ...form, year: parseInt(e.target.value) || 2025 })}
                className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm font-semibold rounded-xl px-4 py-3 outline-none focus:border-[var(--accent)] focus:bg-white transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Daya Tampung</label>
              <input
                type="number"
                required
                value={form.quota}
                onChange={e => setForm({ ...form, quota: parseInt(e.target.value) || 0 })}
                className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm font-semibold rounded-xl px-4 py-3 outline-none focus:border-[var(--accent)] focus:bg-white transition-all"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Jumlah Peminat</label>
              <input
                type="number"
                required
                value={form.applicants}
                onChange={e => setForm({ ...form, applicants: parseInt(e.target.value) || 0 })}
                className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm font-semibold rounded-xl px-4 py-3 outline-none focus:border-[var(--accent)] focus:bg-white transition-all"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Estimasi Skor</label>
              <input
                type="number"
                required
                value={form.estimatedScore}
                onChange={e => setForm({ ...form, estimatedScore: parseFloat(e.target.value) || 600 })}
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
