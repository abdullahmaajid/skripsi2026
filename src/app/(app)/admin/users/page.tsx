"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Loader2, Users, Plus, Edit2, Trash2, Shield, User, Key, Flame, Activity } from "lucide-react"
import { useAdminPanelStore } from "@/store/useAdminPanelStore"
import { AdminPageHeader } from "@/components/layout/AdminPageHeader"
import toast from "react-hot-toast"

interface UserData {
  id: string
  name: string
  email: string
  avatar?: string | null
  role: "STUDENT" | "ADMIN"
  irtAbility: number
  createdAt: string
  _count: { attempts: number }
}

function UserFormPanel({ 
  editingUser, 
  onSuccess, 
  onCancel 
}: { 
  editingUser: UserData | null, 
  onSuccess: () => void, 
  onCancel: () => void 
}) {
  const [form, setForm] = useState({
    name: editingUser?.name || "",
    email: editingUser?.email || "",
    password: "",
    role: editingUser?.role || "STUDENT",
    irtAbility: editingUser?.irtAbility || 0.0
  })
  const [submitting, setSubmitting] = useState(false)

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
        onSuccess()
      } else {
        alert(data.error || "Gagal menyimpan data pengguna")
      }
    } catch (err) {
      alert("Terjadi kesalahan koneksi.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="h-full flex flex-col p-6 space-y-6">
      <h3 className="text-xl font-bold text-slate-800">{editingUser ? "Ubah Akun User" : "Tambah User Baru"}</h3>
      <form onSubmit={handleSubmit} className="flex-1 flex flex-col space-y-4">
        <div className="flex-1 space-y-4">
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
              Password {editingUser && <span className="text-[10px] text-slate-400">(Kosongkan jika tidak mengubah)</span>}
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
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Role</label>
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
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1.5">IRT (θ)</label>
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
        </div>

        <div className="flex gap-3 justify-end pt-3 mt-auto">
          <button type="button" onClick={onCancel} className="flex-1 px-5 py-3 bg-slate-100 hover:bg-slate-200 rounded-xl text-slate-600 text-sm font-bold transition-all">Batal</button>
          <button type="submit" disabled={submitting} className="flex-1 px-5 py-3 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white text-sm font-bold rounded-xl transition-all disabled:opacity-50">
            {submitting ? "Menyimpan..." : "Simpan"}
          </button>
        </div>
      </form>
    </div>
  )
}

export default function AdminUsersPage() {
  const router = useRouter()
  const [users, setUsers] = useState<UserData[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterRole, setFilterRole] = useState("")

  const openPanel = useAdminPanelStore(s => s.openPanel)
  const closePanel = useAdminPanelStore(s => s.closePanel)

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

  function getInitials(name: string) {
    return name.split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase()
  }

  const bgColors = ["bg-blue-100 text-blue-600", "bg-purple-100 text-purple-600", "bg-emerald-100 text-emerald-600", "bg-rose-100 text-rose-600", "bg-amber-100 text-amber-600"]
  function getAvatarStyle(name: string) {
    let hash = 0;
    for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
    return bgColors[Math.abs(hash) % bgColors.length];
  }

  function ThetaBadge({ value }: { value: number }) {
    const max = 4;
    const min = -4;
    const normalized = Math.max(0, Math.min(100, ((value - min) / (max - min)) * 100));
    let colorClass = "bg-rose-500";
    if (value > 1.0) colorClass = "bg-emerald-500";
    else if (value >= -1.0) colorClass = "bg-amber-500";
    else if (value > -2.5) colorClass = "bg-orange-500";
    return (
      <div className="flex items-center gap-2 justify-center">
        <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
          <div className={`h-full ${colorClass} rounded-full transition-all duration-500`} style={{ width: `${normalized}%` }}></div>
        </div>
        <span className="font-mono text-[10px] font-bold w-8 text-slate-600 text-left">{value > 0 ? `+${value.toFixed(2)}` : value.toFixed(2)}</span>
      </div>
    )
  }

  function openAddUser() {
    openPanel(
      <UserFormPanel 
        key="add-user"
        editingUser={null} 
        onSuccess={() => { 
          closePanel(); 
          fetchUsers(); 
          toast.success("Data berhasil disimpan!");
        }} 
        onCancel={closePanel} 
      />
    )
  }

  function openEditUser(u: UserData) {
    openPanel(
      <UserFormPanel 
        key={`edit-user-${u.id}`}
        editingUser={u} 
        onSuccess={() => { 
          closePanel(); 
          fetchUsers(); 
          toast.success("Data berhasil disimpan!");
        }} 
        onCancel={closePanel} 
      />
    )
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

  // Summary Stats
  const totalStudents = users.filter(u => u.role === "STUDENT").length
  const totalAdmins = users.filter(u => u.role === "ADMIN").length
  const activeStudentsList = users.filter(u => u.role === "STUDENT" && u._count.attempts > 0)
  const activeStudentsCount = activeStudentsList.length
  const sumTheta = activeStudentsList.reduce((acc, u) => acc + u.irtAbility, 0)
  const avgTheta = activeStudentsCount > 0 ? (sumTheta / activeStudentsCount) : 0

  return (
    <div className="p-6 md:p-8 space-y-8 h-full overflow-y-auto no-scrollbar">
      {/* Top Navigation & Header */}
      <AdminPageHeader
        title="Manajemen User"
        subtitle="Kelola akun siswa dan administrator, ubah hak akses, dan pantau performa IRT siswa."
        icon={<Users className="w-8 h-8" />}
        stats={[
          { label: "Total Siswa", value: totalStudents, icon: <User className="w-3.5 h-3.5" /> },
          { label: "Admin", value: totalAdmins, icon: <Shield className="w-3.5 h-3.5" /> },
          { label: "Rata-rata Theta", value: avgTheta.toFixed(2), icon: <Activity className="w-3.5 h-3.5" /> },
        ]}
      >
        <div className="flex-1"></div>
        <button onClick={openAddUser} className="flex items-center gap-2 px-5 py-2.5 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white font-bold text-sm rounded-xl transition-all shadow-sm shrink-0">
          <Plus className="w-4 h-4" /> Tambah User
        </button>
      </AdminPageHeader>

      {/* Summary Cards */}
      {!loading && users.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white border border-slate-100 p-4 rounded-[1.5rem] flex items-center gap-4 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shrink-0">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <p className="text-2xl font-black text-slate-800">{totalStudents}</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Siswa</p>
            </div>
          </div>
          <div className="bg-white border border-slate-100 p-4 rounded-[1.5rem] flex items-center gap-4 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
            <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center shrink-0">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <p className="text-2xl font-black text-slate-800">{totalAdmins}</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Admin</p>
            </div>
          </div>
          <div className="bg-white border border-slate-100 p-4 rounded-[1.5rem] flex items-center gap-4 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
            <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center shrink-0">
              <Flame className="w-6 h-6" />
            </div>
            <div>
              <p className="text-2xl font-black text-slate-800">{activeStudentsCount}</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Siswa Aktif</p>
            </div>
          </div>
          <div className="bg-white border border-slate-100 p-4 rounded-[1.5rem] flex items-center gap-4 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center shrink-0">
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <p className="text-2xl font-black text-slate-800">{avgTheta > 0 ? `+${avgTheta.toFixed(2)}` : avgTheta.toFixed(2)}</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Avg Theta Siswa</p>
            </div>
          </div>
        </div>
      )}

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
                  <tr key={u.id} className="hover:bg-slate-50/60 transition-colors group">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        {u.avatar ? (
                          <img src={u.avatar} alt={u.name} className="w-10 h-10 rounded-full object-cover shrink-0 border border-slate-200" />
                        ) : (
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${getAvatarStyle(u.name)}`}>
                            {getInitials(u.name)}
                          </div>
                        )}
                        <span className="font-bold text-slate-800 group-hover:text-[var(--accent)] transition-colors">{u.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 font-medium text-slate-500">{u.email}</td>
                    <td className="py-4 px-6 text-center">
                      <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full inline-flex items-center gap-1.5 ${u.role === "ADMIN" ? "bg-purple-50 text-purple-600 border border-purple-100" : "bg-slate-50 text-slate-500 border border-slate-200"}`}>
                        {u.role === "ADMIN" ? <Shield className="w-3 h-3" /> : <User className="w-3 h-3" />}
                        {u.role}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-center">
                      {u.role === "STUDENT" ? <ThetaBadge value={u.irtAbility} /> : <span className="text-slate-300">-</span>}
                    </td>
                    <td className="py-4 px-6 text-center">
                      {u.role === "STUDENT" ? (
                        <div className="flex items-center justify-center gap-1">
                          {u._count.attempts > 5 && <Flame className="w-4 h-4 text-orange-500" />}
                          <span className="font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md">{u._count.attempts}</span>
                        </div>
                      ) : <span className="text-slate-300">-</span>}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex justify-end gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => openEditUser(u)} className="p-2 text-slate-400 hover:text-[var(--accent)] hover:bg-blue-50 rounded-xl transition-all shadow-sm hover:shadow-md" title="Edit"><Edit2 className="w-4 h-4" /></button>
                        <button onClick={() => handleDelete(u.id)} className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all shadow-sm hover:shadow-md" title="Delete"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredUsers.length === 0 && (
                  <tr>
                    <td colSpan={6} className="py-16 text-center text-slate-400 font-medium">Tidak ada user ditemukan</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

