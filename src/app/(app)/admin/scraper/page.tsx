"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Plus, Edit2, Trash2, Loader2, GraduationCap, BookOpen, Search } from "lucide-react"

interface University {
  id: string
  name: string
  code: string
  location: string
  type: "NEGERI" | "SWASTA"
  logoUrl?: string
  _count?: { majors: number }
}

interface Major {
  id: string
  name: string
  code: string
  universityId: string
  faculty: string
  degree: "S1" | "D3" | "D4"
  quota: number
  applicants: number
  estimatedScore: number
  cluster: "SAINTEK" | "SOSHUM" | "CAMPURAN"
  year: number
  university: { name: string }
}

export default function AdminScraperPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<"universities" | "majors">("universities")
  const [loading, setLoading] = useState(true)

  // Data lists
  const [universities, setUniversities] = useState<University[]>([])
  const [majors, setMajors] = useState<Major[]>([])

  // Search & Filter
  const [searchQuery, setSearchQuery] = useState("")
  const [filterUniId, setFilterUniId] = useState("")

  // Form Modals
  const [showUniModal, setShowUniModal] = useState(false)
  const [editingUni, setEditingUni] = useState<University | null>(null)
  const [uniForm, setUniForm] = useState({
    name: "",
    code: "",
    location: "",
    type: "NEGERI" as "NEGERI" | "SWASTA",
    logoUrl: ""
  })

  const [showMajorModal, setShowMajorModal] = useState(false)
  const [editingMajor, setEditingMajor] = useState<Major | null>(null)
  const [majorForm, setMajorForm] = useState({
    name: "",
    code: "",
    universityId: "",
    faculty: "",
    degree: "S1" as "S1" | "D3" | "D4",
    quota: 0,
    applicants: 0,
    estimatedScore: 600,
    cluster: "SAINTEK" as "SAINTEK" | "SOSHUM" | "CAMPURAN",
    year: 2025
  })

  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    fetchData()
  }, [activeTab])

  async function fetchData() {
    setLoading(true)
    try {
      if (activeTab === "universities") {
        const res = await fetch("/api/admin/universities")
        const data = await res.json()
        setUniversities(data.data || [])
      } else {
        const [resMajors, resUnis] = await Promise.all([
          fetch("/api/admin/majors"),
          fetch("/api/admin/universities")
        ])
        const dataMajors = await resMajors.json()
        const dataUnis = await resUnis.json()
        setMajors(dataMajors.data || [])
        setUniversities(dataUnis.data || [])
      }
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  // --- PTN CRUD ---
  function openAddUni() {
    setEditingUni(null)
    setUniForm({ name: "", code: "", location: "", type: "NEGERI", logoUrl: "" })
    setShowUniModal(true)
  }

  function openEditUni(u: University) {
    setEditingUni(u)
    setUniForm({ name: u.name, code: u.code, location: u.location, type: u.type, logoUrl: u.logoUrl || "" })
    setShowUniModal(true)
  }

  async function handleUniSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    const method = editingUni ? "PUT" : "POST"
    const payload = editingUni ? { id: editingUni.id, ...uniForm } : uniForm

    const res = await fetch("/api/admin/universities", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
    setSubmitting(false)
    if (res.ok) {
      setShowUniModal(false)
      fetchData()
    } else {
      const data = await res.json()
      alert(data.error || "Gagal menyimpan universitas")
    }
  }

  async function handleDeleteUni(id: string) {
    if (!confirm("Hapus universitas ini? Seluruh jurusan di bawahnya juga akan ikut terhapus.")) return
    const res = await fetch(`/api/admin/universities?id=${id}`, { method: "DELETE" })
    if (res.ok) {
      fetchData()
    } else {
      alert("Gagal menghapus universitas")
    }
  }

  // --- PRODI CRUD ---
  function openAddMajor() {
    setEditingMajor(null)
    setMajorForm({
      name: "",
      code: "",
      universityId: filterUniId || (universities[0]?.id || ""),
      faculty: "",
      degree: "S1",
      quota: 0,
      applicants: 0,
      estimatedScore: 600,
      cluster: "SAINTEK",
      year: 2025
    })
    setShowMajorModal(true)
  }

  function openEditMajor(m: Major) {
    setEditingMajor(m)
    setMajorForm({
      name: m.name,
      code: m.code,
      universityId: m.universityId,
      faculty: m.faculty,
      degree: m.degree,
      quota: m.quota,
      applicants: m.applicants,
      estimatedScore: m.estimatedScore,
      cluster: m.cluster,
      year: m.year
    })
    setShowMajorModal(true)
  }

  async function handleMajorSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    const method = editingMajor ? "PUT" : "POST"
    const payload = editingMajor ? { id: editingMajor.id, ...majorForm } : majorForm

    const res = await fetch("/api/admin/majors", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
    setSubmitting(false)
    if (res.ok) {
      setShowMajorModal(false)
      fetchData()
    } else {
      const data = await res.json()
      alert(data.error || "Gagal menyimpan prodi")
    }
  }

  async function handleDeleteMajor(id: string) {
    if (!confirm("Hapus program studi ini?")) return
    const res = await fetch(`/api/admin/majors?id=${id}`, { method: "DELETE" })
    if (res.ok) {
      fetchData()
    } else {
      alert("Gagal menghapus prodi")
    }
  }

  // Filtering lists
  const filteredUnis = universities.filter(u => {
    return u.name.toLowerCase().includes(searchQuery.toLowerCase()) || u.code.includes(searchQuery)
  })

  const filteredMajors = majors.filter(m => {
    const matchSearch = m.name.toLowerCase().includes(searchQuery.toLowerCase()) || m.code.includes(searchQuery)
    const matchUni = filterUniId ? m.universityId === filterUniId : true
    return matchSearch && matchUni
  })

  return (
    <div className="p-6 md:p-8 space-y-6 h-full overflow-y-auto no-scrollbar">
      {/* Top Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Universitas &amp; Jurusan (PTN)</h1>
        <p className="text-sm text-slate-500 mt-1">Kelola data universitas negeri/swasta beserta daftar program studi, kuota tampung, dan nilai passing grade.</p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-100 gap-1.5">
        <button
          onClick={() => { setActiveTab("universities"); setSearchQuery("") }}
          className={`px-5 py-3 text-sm font-semibold border-b-2 transition-all inline-flex items-center gap-2 ${activeTab === "universities" ? "border-[var(--accent)] text-[var(--accent-dark)]" : "border-transparent text-slate-400 hover:text-slate-600"}`}
        >
          <GraduationCap className="w-4 h-4" /> Daftar Universitas
        </button>
        <button
          onClick={() => { setActiveTab("majors"); setSearchQuery(""); setFilterUniId("") }}
          className={`px-5 py-3 text-sm font-semibold border-b-2 transition-all inline-flex items-center gap-2 ${activeTab === "majors" ? "border-[var(--accent)] text-[var(--accent-dark)]" : "border-transparent text-slate-400 hover:text-slate-600"}`}
        >
          <BookOpen className="w-4 h-4" /> Daftar Program Studi (Prodi)
        </button>
      </div>

      {/* Actions & Filters */}
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex flex-1 gap-4">
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              placeholder={activeTab === "universities" ? "Cari universitas atau kode..." : "Cari prodi atau kode..."}
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-slate-200 text-slate-800 text-sm rounded-xl pl-10 pr-4 py-2.5 outline-none focus:border-[var(--accent)]"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          </div>

          {activeTab === "majors" && (
            <div>
              <select value={filterUniId} onChange={e => setFilterUniId(e.target.value)} className="bg-white border border-slate-200 text-slate-700 text-sm rounded-xl px-3 py-2.5 outline-none cursor-pointer">
                <option value="">Semua Universitas</option>
                {universities.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
              </select>
            </div>
          )}
        </div>

        <button
          onClick={activeTab === "universities" ? openAddUni : openAddMajor}
          className="flex items-center justify-center gap-2 px-5 py-2.5 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white font-bold text-sm rounded-xl transition-all shadow-sm self-start"
        >
          <Plus className="w-4 h-4" /> {activeTab === "universities" ? "Tambah PTN" : "Tambah Prodi"}
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 text-[var(--accent)] animate-spin" /></div>
      ) : (
        <div className="space-y-6">

          {/* PTN LIST */}
          {activeTab === "universities" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredUnis.map(u => (
                <div key={u.id} className="bg-white border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.01)] rounded-2xl p-5 flex justify-between items-center group">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-100 overflow-hidden">
                      {u.logoUrl ? (
                        <img src={u.logoUrl} alt="Logo" className="w-8 h-8 object-contain" />
                      ) : (
                        <GraduationCap className="w-6 h-6 text-slate-400" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-800 text-lg leading-snug">{u.name}</h3>
                      <p className="text-slate-400 text-xs mt-0.5">Kode: {u.code} · {u.location}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-[10px] bg-indigo-50 border border-indigo-100 text-indigo-600 px-2 py-0.5 rounded-full font-bold">{u.type}</span>
                        <span className="text-[10px] bg-slate-50 border border-slate-100 text-slate-500 px-2 py-0.5 rounded-full font-semibold">{u._count?.majors || 0} Jurusan</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => openEditUni(u)} className="p-2 text-slate-400 hover:text-[var(--accent)] hover:bg-slate-50 rounded-xl transition-colors"><Edit2 className="w-4 h-4" /></button>
                    <button onClick={() => handleDeleteUni(u.id)} className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </div>
              ))}
              {filteredUnis.length === 0 && (
                <div className="col-span-2 text-center py-16 text-slate-400 border border-dashed border-slate-200 rounded-2xl">Tidak ada universitas ditemukan</div>
              )}
            </div>
          )}

          {/* MAJORS LIST */}
          {activeTab === "majors" && (
            <div className="bg-white border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.01)] rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 border-b border-slate-100 text-slate-400 uppercase tracking-wider text-[10px] font-bold">
                    <tr>
                      <th className="py-3 px-5">Kode / Jenjang</th>
                      <th className="py-3 px-5">Program Studi</th>
                      <th className="py-3 px-5">Universitas</th>
                      <th className="py-3 px-5">Fakultas</th>
                      <th className="py-3 px-5 text-center">Daya Tampung</th>
                      <th className="py-3 px-5 text-center">Skor Aman</th>
                      <th className="py-3 px-5 text-center">Kelompok</th>
                      <th className="py-3 px-5 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredMajors.map(m => (
                      <tr key={m.id} className="hover:bg-slate-50/30">
                        <td className="py-3.5 px-5">
                          <span className="font-mono text-slate-600 font-semibold">{m.code}</span>
                          <span className="ml-1.5 font-bold text-indigo-600 text-[10px] bg-indigo-50 px-1.5 py-0.5 rounded-md">{m.degree}</span>
                        </td>
                        <td className="py-3.5 px-5 font-bold text-slate-800">{m.name}</td>
                        <td className="py-3.5 px-5 text-slate-600 font-semibold">{m.university.name}</td>
                        <td className="py-3.5 px-5 text-slate-500 text-xs">{m.faculty}</td>
                        <td className="py-3.5 px-5 text-center">
                          <span className="font-semibold text-slate-700">{m.quota}</span>
                          <span className="text-slate-400 text-xs block">Peminat: {m.applicants}</span>
                        </td>
                        <td className="py-3.5 px-5 text-center font-mono font-bold text-emerald-600">{m.estimatedScore}</td>
                        <td className="py-3.5 px-5 text-center">
                          <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full inline-block ${m.cluster === 'SAINTEK' ? 'bg-sky-50 text-sky-600' : m.cluster === 'SOSHUM' ? 'bg-orange-50 text-orange-600' : 'bg-purple-50 text-purple-600'}`}>
                            {m.cluster}
                          </span>
                        </td>
                        <td className="py-3.5 px-5 text-right flex justify-end gap-1.5">
                          <button onClick={() => openEditMajor(m)} className="p-2 text-slate-400 hover:text-[var(--accent)] hover:bg-slate-50 rounded-xl transition-colors"><Edit2 className="w-4 h-4" /></button>
                          <button onClick={() => handleDeleteMajor(m.id)} className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"><Trash2 className="w-4 h-4" /></button>
                        </td>
                      </tr>
                    ))}
                    {filteredMajors.length === 0 && (
                      <tr><td colSpan={8} className="py-10 text-center text-slate-400 font-medium">Belum ada jurusan ditemukan</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>
      )}

      {/* --- MODALS --- */}

      {/* 1. UNIVERSITY MODAL */}
      {showUniModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[2rem] max-w-md w-full p-6 shadow-2xl space-y-4 relative border border-slate-100">
            <h3 className="text-xl font-bold text-slate-800">{editingUni ? "Ubah Universitas" : "Tambah Universitas Baru"}</h3>
            <form onSubmit={handleUniSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Nama Universitas</label>
                <input
                  type="text"
                  required
                  value={uniForm.name}
                  onChange={e => setUniForm({ ...uniForm, name: e.target.value })}
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
                    value={uniForm.code}
                    onChange={e => setUniForm({ ...uniForm, code: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm font-semibold rounded-xl px-4 py-3 outline-none focus:border-[var(--accent)] focus:bg-white transition-all"
                    placeholder="Kode 3 digit (UI: 311)"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Tipe Kampus</label>
                  <select
                    value={uniForm.type}
                    onChange={e => setUniForm({ ...uniForm, type: e.target.value as any })}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-700 text-sm font-semibold rounded-xl px-4 py-3 outline-none focus:border-[var(--accent)] focus:bg-white transition-all cursor-pointer"
                  >
                    <option value="NEGERI">NEGERI</option>
                    <option value="SWASTA">SWASTA</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Kota / Provinsi (Lokasi)</label>
                <input
                  type="text"
                  required
                  value={uniForm.location}
                  onChange={e => setUniForm({ ...uniForm, location: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm font-semibold rounded-xl px-4 py-3 outline-none focus:border-[var(--accent)] focus:bg-white transition-all"
                  placeholder="Misal: Depok, Jawa Barat"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1.5">URL Logo (Opsional)</label>
                <input
                  type="text"
                  value={uniForm.logoUrl}
                  onChange={e => setUniForm({ ...uniForm, logoUrl: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm font-semibold rounded-xl px-4 py-3 outline-none focus:border-[var(--accent)] focus:bg-white transition-all"
                  placeholder="https://link-gambar.com/logo-ui.png"
                />
              </div>
              <div className="flex gap-3 justify-end pt-3">
                <button type="button" onClick={() => setShowUniModal(false)} className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 rounded-xl text-slate-600 text-sm font-bold transition-all">Batal</button>
                <button type="submit" disabled={submitting} className="px-5 py-2.5 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white text-sm font-bold rounded-xl transition-all disabled:opacity-50">
                  {submitting ? "Menyimpan..." : "Simpan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 2. MAJOR MODAL */}
      {showMajorModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-[2rem] max-w-xl w-full p-6 shadow-2xl space-y-4 my-8 relative border border-slate-100">
            <h3 className="text-xl font-bold text-slate-800">{editingMajor ? "Ubah Jurusan/Prodi" : "Tambah Prodi Baru"}</h3>
            <form onSubmit={handleMajorSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Universitas</label>
                  <select
                    required
                    value={majorForm.universityId}
                    onChange={e => setMajorForm({ ...majorForm, universityId: e.target.value })}
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
                    value={majorForm.faculty}
                    onChange={e => setMajorForm({ ...majorForm, faculty: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm font-semibold rounded-xl px-4 py-3 outline-none focus:border-[var(--accent)] focus:bg-white transition-all"
                    placeholder="Misal: Ilmu Komputer"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Nama Program Studi</label>
                  <input
                    type="text"
                    required
                    value={majorForm.name}
                    onChange={e => setMajorForm({ ...majorForm, name: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm font-semibold rounded-xl px-4 py-3 outline-none focus:border-[var(--accent)] focus:bg-white transition-all"
                    placeholder="Misal: Teknik Informatika"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Kode Prodi (Kode SNBT)</label>
                  <input
                    type="text"
                    required
                    value={majorForm.code}
                    onChange={e => setMajorForm({ ...majorForm, code: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm font-semibold rounded-xl px-4 py-3 outline-none focus:border-[var(--accent)] focus:bg-white transition-all"
                    placeholder="Misal: 3111025"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Jenjang</label>
                  <select
                    value={majorForm.degree}
                    onChange={e => setMajorForm({ ...majorForm, degree: e.target.value as any })}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-700 text-sm font-semibold rounded-xl px-4 py-3 outline-none focus:border-[var(--accent)] focus:bg-white transition-all cursor-pointer"
                  >
                    <option value="S1">S1</option>
                    <option value="D4">D4</option>
                    <option value="D3">D3</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Kelompok (Cluster)</label>
                  <select
                    value={majorForm.cluster}
                    onChange={e => setMajorForm({ ...majorForm, cluster: e.target.value as any })}
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
                    value={majorForm.year}
                    onChange={e => setMajorForm({ ...majorForm, year: parseInt(e.target.value) || 2025 })}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm font-semibold rounded-xl px-4 py-3 outline-none focus:border-[var(--accent)] focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Daya Tampung (Kuota)</label>
                  <input
                    type="number"
                    required
                    value={majorForm.quota}
                    onChange={e => setMajorForm({ ...majorForm, quota: parseInt(e.target.value) || 0 })}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm font-semibold rounded-xl px-4 py-3 outline-none focus:border-[var(--accent)] focus:bg-white transition-all"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Jumlah Peminat (Lalu)</label>
                  <input
                    type="number"
                    required
                    value={majorForm.applicants}
                    onChange={e => setMajorForm({ ...majorForm, applicants: parseInt(e.target.value) || 0 })}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm font-semibold rounded-xl px-4 py-3 outline-none focus:border-[var(--accent)] focus:bg-white transition-all"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Estimasi Skor Aman</label>
                  <input
                    type="number"
                    required
                    value={majorForm.estimatedScore}
                    onChange={e => setMajorForm({ ...majorForm, estimatedScore: parseFloat(e.target.value) || 600 })}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm font-semibold rounded-xl px-4 py-3 outline-none focus:border-[var(--accent)] focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div className="flex gap-3 justify-end pt-3">
                <button type="button" onClick={() => setShowMajorModal(false)} className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 rounded-xl text-slate-600 text-sm font-bold transition-all">Batal</button>
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
