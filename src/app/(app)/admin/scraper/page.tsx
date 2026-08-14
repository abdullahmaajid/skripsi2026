"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Loader2, Plus, Edit2, Trash2, Search, GraduationCap, MapPin, Building, BookOpen, Layers } from "lucide-react"
import { useAdminPanelStore } from "@/store/useAdminPanelStore"
import { AdminPageHeader } from "@/components/layout/AdminPageHeader"
import { UniFormPanel, MajorFormPanel } from "./components"
import toast from "react-hot-toast"

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
  const [filterLocation, setFilterLocation] = useState("")

  const openPanel = useAdminPanelStore(s => s.openPanel)
  const closePanel = useAdminPanelStore(s => s.closePanel)

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
    openPanel(
      <UniFormPanel 
        key="add-uni"
        editingUni={null} 
        onSuccess={() => { closePanel(); fetchData(); toast.success("Data berhasil disimpan!"); }} 
        onCancel={closePanel} 
      />
    )
  }

  function openEditUni(u: University) {
    openPanel(
      <UniFormPanel 
        key={`edit-uni-${u.id}`}
        editingUni={u} 
        onSuccess={() => { closePanel(); fetchData(); toast.success("Data berhasil disimpan!"); }} 
        onCancel={closePanel} 
      />
    )
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
    openPanel(
      <MajorFormPanel 
        key="add-major"
        editingMajor={null} 
        universities={universities} 
        defaultUniversityId={filterUniId} 
        onSuccess={() => { closePanel(); fetchData(); toast.success("Data berhasil disimpan!"); }} 
        onCancel={closePanel} 
      />
    )
  }

  function openEditMajor(m: Major) {
    openPanel(
      <MajorFormPanel 
        key={`edit-major-${m.id}`}
        editingMajor={m} 
        universities={universities} 
        defaultUniversityId={m.universityId} 
        onSuccess={() => { closePanel(); fetchData(); toast.success("Data berhasil disimpan!"); }} 
        onCancel={closePanel} 
      />
    )
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
  const uniqueLocations = Array.from(new Set(universities.map(u => u.location))).sort()
  
  const filteredUnis = universities.filter(u => {
    const matchSearch = u.name.toLowerCase().includes(searchQuery.toLowerCase()) || u.code.includes(searchQuery)
    const matchLoc = filterLocation ? u.location === filterLocation : true
    return matchSearch && matchLoc
  })

  const filteredMajors = majors.filter(m => {
    const matchSearch = m.name.toLowerCase().includes(searchQuery.toLowerCase()) || m.code.includes(searchQuery)
    const matchUni = filterUniId ? m.universityId === filterUniId : true
    return matchSearch && matchUni
  })

  return (
    <div className="p-6 md:p-8 space-y-6 h-full overflow-y-auto no-scrollbar">
      {/* Top Header */}
      <AdminPageHeader
        title="Universitas & Jurusan (PTN)"
        subtitle="Kelola data universitas negeri/swasta beserta daftar program studi, kuota tampung, dan nilai passing grade."
        icon={<Building className="w-8 h-8" />}
        stats={[
          { label: "Universitas", value: universities.length, icon: <GraduationCap className="w-3.5 h-3.5" /> },
          { label: "Total Prodi", value: majors.length, icon: <BookOpen className="w-3.5 h-3.5" /> },
          { label: "Lokasi / Provinsi", value: uniqueLocations.length, icon: <MapPin className="w-3.5 h-3.5" /> },
        ]}
      />

      {/* Tabs */}
      <div className="flex border-b border-slate-100 gap-1.5">
        <button
          onClick={() => { setActiveTab("universities"); setSearchQuery(""); setFilterLocation("") }}
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
        <div className="flex flex-1 gap-4 items-center w-full max-w-4xl">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder={activeTab === "universities" ? "Cari universitas atau kode..." : "Cari prodi atau kode..."}
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-slate-200 text-slate-800 text-sm rounded-xl pl-10 pr-4 py-2.5 outline-none focus:border-[var(--accent)] shadow-sm"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          </div>

          {activeTab === "universities" && (
            <div className="w-48 shrink-0">
              <select value={filterLocation} onChange={e => setFilterLocation(e.target.value)} className="w-full bg-white border border-slate-200 text-slate-700 text-sm rounded-xl px-3 py-2.5 outline-none cursor-pointer shadow-sm">
                <option value="">Semua Lokasi</option>
                {uniqueLocations.map(loc => <option key={loc} value={loc}>{loc}</option>)}
              </select>
            </div>
          )}

          {activeTab === "majors" && (
            <div className="w-64 shrink-0">
              <select value={filterUniId} onChange={e => setFilterUniId(e.target.value)} className="w-full bg-white border border-slate-200 text-slate-700 text-sm rounded-xl px-3 py-2.5 outline-none cursor-pointer shadow-sm">
                <option value="">Semua Universitas</option>
                {universities.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
              </select>
            </div>
          )}
        </div>

        <button
          onClick={activeTab === "universities" ? openAddUni : openAddMajor}
          className="flex items-center justify-center gap-2 px-6 py-2.5 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white font-bold text-sm rounded-xl transition-all shadow-md self-start shrink-0"
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

      {/* Modals removed in favor of Sliding Panels */}
    </div>
  )
}
