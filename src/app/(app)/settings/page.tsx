"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Settings, Save, Loader2, UserCircle, GraduationCap, Target } from "lucide-react"

interface Major {
  id: string
  name: string
  cluster: string
}

interface University {
  id: string
  name: string
  majors: Major[]
}

interface UserProfile {
  name: string
  email: string
  avatar?: string
  school: string
  graduationYear: string
  targetMajor1Id: string
  targetMajor2Id: string
}

export default function SettingsPage() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [universities, setUniversities] = useState<University[]>([])
  const [profile, setProfile] = useState<UserProfile>({
    name: "",
    email: "",
    school: "",
    graduationYear: "",
    targetMajor1Id: "",
    targetMajor2Id: ""
  })
  
  // To handle dependent dropdowns
  const [target1UniId, setTarget1UniId] = useState<string>("")
  const [target2UniId, setTarget2UniId] = useState<string>("")

  const [message, setMessage] = useState<{ type: "success" | "error", text: string } | null>(null)

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    try {
      const res = await fetch("/api/profile")
      if (res.ok) {
        const data = await res.json()
        setUniversities(data.universities || [])
        
        const p = data.profile || {}
        setProfile({
          name: data.user?.name || "",
          email: data.user?.email || "",
          avatar: data.user?.avatar || "",
          school: p.school || "",
          graduationYear: p.graduationYear ? p.graduationYear.toString() : "",
          targetMajor1Id: p.targetMajor1Id || "",
          targetMajor2Id: p.targetMajor2Id || ""
        })

        if (p.targetMajor1) setTarget1UniId(p.targetMajor1.universityId)
        if (p.targetMajor2) setTarget2UniId(p.targetMajor2.universityId)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setMessage({ type: "error", text: "Ukuran foto maksimal 2MB" })
        setTimeout(() => setMessage(null), 3000)
        return
      }
      const reader = new FileReader()
      reader.onloadend = async () => {
        const base64Data = reader.result as string
        setProfile({ ...profile, avatar: base64Data })
        
        // Auto-save the avatar directly
        try {
          const res = await fetch("/api/profile", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...profile, avatar: base64Data })
          })
          if (res.ok) {
            setMessage({ type: "success", text: "Foto profil berhasil diunggah!" })
          } else {
            setMessage({ type: "error", text: "Gagal menyimpan foto profil." })
          }
        } catch (err) {
          setMessage({ type: "error", text: "Terjadi kesalahan koneksi." })
        }
        setTimeout(() => setMessage(null), 3000)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setMessage(null)

    try {
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile)
      })

      if (res.ok) {
        setMessage({ type: "success", text: "Profil berhasil disimpan!" })
      } else {
        setMessage({ type: "error", text: "Gagal menyimpan profil." })
      }
    } catch (err) {
      setMessage({ type: "error", text: "Terjadi kesalahan koneksi." })
    } finally {
      setSaving(false)
      setTimeout(() => setMessage(null), 3000)
    }
  }

  if (loading) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <Loader2 className="w-8 h-8 text-[var(--accent)] animate-spin" />
      </div>
    )
  }

  const majorsForUni1 = universities.find(u => u.id === target1UniId)?.majors || []
  const majorsForUni2 = universities.find(u => u.id === target2UniId)?.majors || []

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-4xl mx-auto h-full overflow-y-auto no-scrollbar">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
          <Settings className="w-6 h-6 text-[var(--accent)]" /> Pengaturan Profil & Target
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Sesuaikan profil dan jurusan targetmu untuk mengoptimalkan rekomendasi AI dan fitur Chancing.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        
        {/* Akun Section */}
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
          <h2 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2 pb-4 border-b border-slate-100">
            <UserCircle className="w-5 h-5 text-indigo-500" /> Profil Akun
          </h2>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex flex-col items-center gap-3 shrink-0">
              <div className="relative group">
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-slate-50 bg-slate-100 flex items-center justify-center shadow-[0_4px_15px_rgba(0,0,0,0.05)]">
                  {profile.avatar ? (
                    <img src={profile.avatar} alt="Avatar" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-2xl font-bold text-[var(--accent)]">
                      {profile.name ? profile.name.substring(0, 2).toUpperCase() : "US"}
                    </span>
                  )}
                </div>
                <label className="absolute inset-0 bg-black/50 text-white flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-all cursor-pointer font-bold text-[10px] uppercase tracking-wider backdrop-blur-sm">
                  Ubah Foto
                  <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                </label>
              </div>
              <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Maks. 2MB</span>
            </div>

            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Nama Lengkap</label>
                <input 
                  type="text" 
                  value={profile.name}
                  onChange={e => setProfile({...profile, name: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm font-medium rounded-xl px-4 py-3 outline-none focus:border-[var(--accent)] focus:bg-white transition-all"
                  required
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Email</label>
                <input 
                  type="email" 
                  value={profile.email}
                  disabled
                  className="w-full bg-slate-100 border border-slate-200 text-slate-500 text-sm font-medium rounded-xl px-4 py-3 outline-none cursor-not-allowed"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Pendidikan Section */}
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
          <h2 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2 pb-4 border-b border-slate-100">
            <GraduationCap className="w-5 h-5 text-emerald-500" /> Data Pendidikan
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Asal Sekolah</label>
              <input 
                type="text" 
                value={profile.school}
                onChange={e => setProfile({...profile, school: e.target.value})}
                placeholder="Misal: SMAN 1 Jakarta"
                className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm font-medium rounded-xl px-4 py-3 outline-none focus:border-[var(--accent)] focus:bg-white transition-all"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Tahun Lulus (Gap Year / Kelas 12)</label>
              <input 
                type="number" 
                value={profile.graduationYear}
                onChange={e => setProfile({...profile, graduationYear: e.target.value})}
                placeholder="Misal: 2025"
                className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm font-medium rounded-xl px-4 py-3 outline-none focus:border-[var(--accent)] focus:bg-white transition-all"
              />
            </div>
          </div>
        </div>

        {/* Target Jurusan */}
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
          <h2 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2 pb-4 border-b border-slate-100">
            <Target className="w-5 h-5 text-rose-500" /> Pilihan Target UTBK
          </h2>
          
          <div className="space-y-8">
            {/* Target 1 */}
            <div className="p-5 rounded-2xl border border-indigo-100 bg-indigo-50/30">
              <h3 className="text-sm font-bold text-indigo-800 mb-4 uppercase tracking-wide">Pilihan 1</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-500 mb-1.5 block">Universitas</label>
                  <select 
                    value={target1UniId}
                    onChange={(e) => {
                      setTarget1UniId(e.target.value)
                      setProfile({...profile, targetMajor1Id: ""}) // Reset major if uni changes
                    }}
                    className="w-full bg-white border border-slate-200 text-slate-700 text-sm font-medium rounded-xl px-4 py-2.5 outline-none focus:border-indigo-400 transition-colors cursor-pointer"
                  >
                    <option value="">Pilih Universitas</option>
                    {universities.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 mb-1.5 block">Program Studi</label>
                  <select 
                    value={profile.targetMajor1Id}
                    onChange={(e) => setProfile({...profile, targetMajor1Id: e.target.value})}
                    disabled={!target1UniId}
                    className="w-full bg-white border border-slate-200 text-slate-700 text-sm font-medium rounded-xl px-4 py-2.5 outline-none focus:border-indigo-400 transition-colors cursor-pointer disabled:bg-slate-100 disabled:text-slate-400"
                  >
                    <option value="">Pilih Jurusan</option>
                    {majorsForUni1.map(m => <option key={m.id} value={m.id}>{m.name} ({m.cluster})</option>)}
                  </select>
                </div>
              </div>
            </div>

            {/* Target 2 */}
            <div className="p-5 rounded-2xl border border-slate-200 bg-slate-50">
              <h3 className="text-sm font-bold text-slate-700 mb-4 uppercase tracking-wide">Pilihan 2</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-500 mb-1.5 block">Universitas</label>
                  <select 
                    value={target2UniId}
                    onChange={(e) => {
                      setTarget2UniId(e.target.value)
                      setProfile({...profile, targetMajor2Id: ""})
                    }}
                    className="w-full bg-white border border-slate-200 text-slate-700 text-sm font-medium rounded-xl px-4 py-2.5 outline-none focus:border-slate-400 transition-colors cursor-pointer"
                  >
                    <option value="">Pilih Universitas</option>
                    {universities.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 mb-1.5 block">Program Studi</label>
                  <select 
                    value={profile.targetMajor2Id}
                    onChange={(e) => setProfile({...profile, targetMajor2Id: e.target.value})}
                    disabled={!target2UniId}
                    className="w-full bg-white border border-slate-200 text-slate-700 text-sm font-medium rounded-xl px-4 py-2.5 outline-none focus:border-slate-400 transition-colors cursor-pointer disabled:bg-slate-100 disabled:text-slate-400"
                  >
                    <option value="">Pilih Jurusan</option>
                    {majorsForUni2.map(m => <option key={m.id} value={m.id}>{m.name} ({m.cluster})</option>)}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action / Save */}
        <div className="flex items-center justify-between pt-4">
          <div className="flex-1">
            {message && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`text-sm font-bold px-4 py-2 rounded-xl inline-block ${message.type === 'success' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                {message.text}
              </motion.div>
            )}
          </div>
          <button 
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-8 py-3.5 bg-[var(--accent)] text-white font-bold rounded-xl hover:bg-[var(--accent-hover)] transition-all shadow-[0_4px_15px_rgba(193,119,249,0.3)] disabled:opacity-50"
          >
            {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
            Simpan Perubahan
          </button>
        </div>

      </form>
    </div>
  )
}
