"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Loader2, Users, Plus, Edit2, Trash2, Shield, User, Key } from "lucide-react"

interface UserData {
  id: string
  name: string
  email: string
  role: "STUDENT" | "ADMIN"
  irtAbility: number
  createdAt: string
  _count: { attempts: number }
}

export default function AdminUsersPage() {
  const router = useRouter()
  const [users, setUsers] = useState<UserData[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterRole, setFilterRole] = useState("")

  // Form states
  const [showModal, setShowModal] = useState(false)
  const [editingUser, setEditingUser] = useState<UserData | null>(null)
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "STUDENT" as "STUDENT" | "ADMIN",
    irtAbility: 0.0
  })
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    fetchUsers()
  }, [])

  async function fetchUsers() {
    setLoading(true)
    try {
      const res = await fetch("/api/admin/users")
      const data = await res.json()
      setUsers(data.data || [])
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  function openAddUser() {
    setEditingUser(null)
    setForm({
      name: "",
      email: "",
      password: "",
      role: "STUDENT",
      irtAbility: 0.0
    })
    setShowModal(true)
  }

  function openEditUser(u: UserData) {
    setEditingUser(u)
    setForm({
      name: u.name,
      email: u.email,
      password: "", // Leave blank for edit unless resetting
      role: u.role,
      irtAbility: u.irtAbility
    })
    setShowModal(true)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    
    const method = editingUser ? "PUT" : "POST"
    const payload = editingUser 
      ? { id: editingUser.id, ...form } 
      : form

    try {
      const res = await fetch("/api/admin/users", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      
      const data = await res.json()
      if (res.ok) {
        setShowModal(false)
        fetchUsers()
      } else {
        alert(data.error || "Gagal menyimpan data pengguna")
      }
    } catch (err) {
      alert("Terjadi kesalahan koneksi.")
    } finally {
      setSubmitting(false)
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Hapus pengguna ini? Seluruh riwayat tryout, progres belajar, dan aktivitas belajarnya juga akan terhapus permanen.")) return
    
    try {
      const res = await fetch(`/api/admin/users?id=${id}`, { method: "DELETE" })
      const data = await res.json()
      if (res.ok) {
        fetchUsers()
      } else {
        alert(data.error || "Gagal menghapus pengguna")
      }
    } catch (err) {
      alert("Terjadi kesalahan koneksi.")
    }
  }

  // Filter & Search
  const filteredUsers = users.filter(u => {
    const matchSearch = u.name.toLowerCase().includes(searchQuery.toLowerCase()) || u.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchRole = filterRole ? u.role === filterRole : true
    return matchSearch && matchRole
  })

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-5xl mx-auto h-full overflow-y-auto no-scrollbar">
      {/* Top Navigation & Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <button onClick={() => router.push("/admin")} className="text-slate-400 hover:text-slate-600 text-xs font-bold uppercase tracking-wider mb-2 inline-flex items-center gap-1.5 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Admin Panel
          </button>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
            <Users className="w-8 h-8 text-[var(--accent)]" /> Manajemen User
          </h1>
          <p className="text-sm text-slate-500 mt-1">Kelola akun siswa dan administrator, ubah hak akses, dan pantau performa IRT siswa.</p>
        </div>
        <button onClick={openAddUser} className="flex items-center gap-2 px-5 py-2.5 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white font-bold text-sm rounded-xl transition-all shadow-sm">
          <Plus className="w-4 h-4" /> Tambah User
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="sm:col-span-2">
          <input
            type="text"
            placeholder="Cari nama atau email..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-slate-200 text-slate-800 text-sm rounded-xl px-4 py-2.5 outline-none focus:border-[var(--accent)]"
          />
        </div>
        <div>
          <select value={filterRole} onChange={e => setFilterRole(e.target.value)} className="w-full bg-white border border-slate-200 text-slate-700 text-sm rounded-xl px-3 py-2.5 outline-none cursor-pointer">
            <option value="">Semua Hak Akses (Role)</option>
            <option value="STUDENT">STUDENT (Siswa)</option>
            <option value="ADMIN">ADMIN (Administrator)</option>
          </select>
        </div>
      </div>

      {/* Users table */}
      {loading ? (
        <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 text-[var(--accent)] animate-spin" /></div>
      ) : (
        <div className="bg-white border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.01)] rounded-[2rem] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 border-b border-slate-100 text-slate-400 uppercase tracking-wider text-[10px] font-bold">
                <tr>
                  <th className="py-3.5 px-6">Nama</th>
                  <th className="py-3.5 px-6">Email</th>
                  <th className="py-3.5 px-6 text-center">Role</th>
                  <th className="py-3.5 px-6 text-center">IRT Ability (θ)</th>
                  <th className="py-3.5 px-6 text-center">Tryout</th>
                  <th className="py-3.5 px-6 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredUsers.map(u => (
                  <tr key={u.id} className="hover:bg-slate-50/40 transition-colors">
                    <td className="py-4 px-6 font-bold text-slate-800">{u.name}</td>
                    <td className="py-4 px-6 font-medium text-slate-500">{u.email}</td>
                    <td className="py-4 px-6 text-center">
                      <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full inline-flex items-center gap-1 ${u.role === "ADMIN" ? "bg-purple-50 text-purple-600 border border-purple-100" : "bg-slate-50 text-slate-500 border border-slate-100"}`}>
                        {u.role === "ADMIN" ? <Shield className="w-3 h-3" /> : <User className="w-3 h-3" />}
                        {u.role}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-center font-mono font-semibold text-slate-700">
                      {u.irtAbility.toFixed(2)}
                    </td>
                    <td className="py-4 px-6 text-center font-bold text-slate-600">{u._count.attempts}</td>
                    <td className="py-4 px-6 text-right flex justify-end gap-1.5">
                      <button onClick={() => openEditUser(u)} className="p-2 text-slate-400 hover:text-[var(--accent)] hover:bg-slate-50 rounded-xl transition-colors" title="Edit"><Edit2 className="w-4 h-4" /></button>
                      <button onClick={() => handleDelete(u.id)} className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors" title="Delete"><Trash2 className="w-4 h-4" /></button>
                    </td>
                  </tr>
                ))}
                {filteredUsers.length === 0 && (
                  <tr>
                    <td colSpan={6} className="py-10 text-center text-slate-400 font-medium">Tidak ada user ditemukan</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* --- ADD / EDIT USER DIALOG --- */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[2rem] max-w-md w-full p-6 shadow-2xl space-y-4 relative border border-slate-100">
            <h3 className="text-xl font-bold text-slate-800">{editingUser ? "Ubah Akun User" : "Tambah User Baru"}</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Nama Lengkap</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm font-semibold rounded-xl px-4 py-3 outline-none focus:border-[var(--accent)] focus:bg-white transition-all"
                  placeholder="Misal: John Doe"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Email</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm font-semibold rounded-xl px-4 py-3 outline-none focus:border-[var(--accent)] focus:bg-white transition-all"
                  placeholder="johndoe@email.com"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                  Password {editingUser && <span className="text-[10px] text-slate-400">(Kosongkan jika tidak ingin mengubah)</span>}
                </label>
                <div className="relative">
                  <input
                    type="password"
                    required={!editingUser}
                    value={form.password}
                    onChange={e => setForm({ ...form, password: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm font-semibold rounded-xl pl-10 pr-4 py-3 outline-none focus:border-[var(--accent)] focus:bg-white transition-all"
                    placeholder="Min. 6 karakter"
                  />
                  <Key className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Role / Hak Akses</label>
                  <select
                    value={form.role}
                    onChange={e => setForm({ ...form, role: e.target.value as any })}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-700 text-sm font-semibold rounded-xl px-4 py-3 outline-none focus:border-[var(--accent)] focus:bg-white transition-all cursor-pointer"
                  >
                    <option value="STUDENT">STUDENT</option>
                    <option value="ADMIN">ADMIN</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1.5">IRT Ability (Theta θ)</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={form.irtAbility}
                    onChange={e => setForm({ ...form, irtAbility: parseFloat(e.target.value) || 0.0 })}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm font-semibold rounded-xl px-4 py-3 outline-none focus:border-[var(--accent)] focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div className="flex gap-3 justify-end pt-3">
                <button type="button" onClick={() => setShowModal(false)} className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 rounded-xl text-slate-600 text-sm font-bold transition-all">Batal</button>
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
