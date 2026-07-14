"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Loader2, Users, BookOpen, FileText, TrendingUp, XCircle, BarChart3, GraduationCap, Crown, Activity, Target } from "lucide-react";
import MarkdownRenderer from "@/components/ui/MarkdownRenderer";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from "recharts";

interface StatsData {
  users: { students: number; admins: number; total: number }
  curriculum: { subjects: number; chapters: number; questions: number }
  ptn: { universities: number; majors: number }
  exams: { tryouts: number; attempts: number }
}

interface UserActivityData { date: string; registrations: number; activeSessions: number }
interface ScoreDistributionData { scoreRange: string; count: number }
interface SubtestPerformanceData { subtest: string; averageScore: number }
interface WrongAnswerRankingData { questionId: string; text: string; wrongCount: number }
interface AiTutorActivityData { level: string; count: number }
interface TopStudentData { id: string; name: string; score: number; activity: string }

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

export default function AdminStatsPage() {
  const router = useRouter();
  const [stats, setStats] = useState<StatsData | null>(null);
  const [userActivity, setUserActivity] = useState<UserActivityData[]>([]);
  const [scoreDistribution, setScoreDistribution] = useState<ScoreDistributionData[]>([]);
  const [subtestPerformance, setSubtestPerformance] = useState<SubtestPerformanceData[]>([]);
  const [wrongAnswerRanking, setWrongAnswerRanking] = useState<WrongAnswerRankingData[]>([]);
  const [aiTutorActivity, setAiTutorActivity] = useState<AiTutorActivityData[]>([]);
  const [topStudents, setTopStudents] = useState<TopStudentData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([
      fetch("/api/admin/stats").then(r => r.json()).then(d => setStats(d.data)).catch(() => {}),
      fetch("/api/admin/stats/user-activity-trend").then(r => r.json()).then(d => setUserActivity(d.data || [])).catch(() => {}),
      fetch("/api/admin/stats/score-distribution").then(r => r.json()).then(d => setScoreDistribution(d.data || [])).catch(() => {}),
      fetch("/api/admin/stats/subtest-performance").then(r => r.json()).then(d => setSubtestPerformance(d.data || [])).catch(() => {}),
      fetch("/api/admin/stats/wrong-answer-ranking").then(r => r.json()).then(d => setWrongAnswerRanking(d.data || [])).catch(() => {}),
      fetch("/api/admin/stats/ai-tutor-activity").then(r => r.json()).then(d => setAiTutorActivity(d.data || [])).catch(() => {}),
      fetch("/api/admin/stats/top-students").then(r => r.json()).then(d => setTopStudents(d.data || [])).catch(() => {}),
    ]).finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <Loader2 className="w-8 h-8 text-[var(--accent)] animate-spin" />
        <p className="text-sm text-slate-400 mt-2 font-medium">Memuat metrik analitik...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] p-6 text-center">
        <XCircle className="w-16 h-16 text-rose-500 mb-4" />
        <h3 className="text-xl font-bold text-slate-800">Gagal Memuat Data</h3>
        <p className="text-rose-500 text-sm mt-1">{error}</p>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8 h-full overflow-y-auto no-scrollbar">
      <motion.div variants={staggerContainer} initial="hidden" animate="show" className="space-y-8 max-w-7xl mx-auto">
        
        {/* Header */}
        <motion.div variants={fadeUp} className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight flex items-center gap-3">
            <div className="p-2.5 bg-[var(--accent)]/10 rounded-2xl text-[var(--accent)]">
              <BarChart3 className="w-7 h-7" />
            </div>
            Statistik Platform
          </h1>
          <p className="text-sm text-slate-500 mt-2 font-medium ml-1">Ringkasan kondisi platform, metrik siswa, dan analitik ujian UTBK.</p>
        </motion.div>

        {/* Quick Stats */}
        <motion.div variants={fadeUp} className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          <StatCard label="Total Siswa Aktif" value={stats?.users.students || 0} icon={<Users className="w-5 h-5 text-sky-600" />} bgColor="var(--pastel-blue)" />
          <StatCard label="Bank Soal" value={stats?.curriculum.questions || 0} icon={<BookOpen className="w-5 h-5 text-purple-600" />} bgColor="var(--pastel-purple)" />
          <StatCard label="Program Studi" value={stats?.ptn.majors || 0} icon={<GraduationCap className="w-5 h-5 text-emerald-600" />} bgColor="var(--pastel-green)" />
          <StatCard label="Total Simulasi" value={stats?.exams.attempts || 0} icon={<FileText className="w-5 h-5 text-rose-600" />} bgColor="var(--pastel-rose)" />
        </motion.div>

        {/* Charts Row 1 */}
        <motion.div variants={staggerContainer} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          <motion.div variants={fadeUp} className="bg-white border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.02)] rounded-[2rem] p-6 md:p-8 flex flex-col">
            <h2 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
              <Activity className="w-5 h-5 text-blue-500" /> Grafik Aktivitas Pengguna
            </h2>
            <div className="h-[300px] w-full mt-2">
              {userActivity.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={userActivity} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                  <Tooltip contentStyle={{ borderRadius: '1rem', border: 'none', boxShadow: '0 10px 40px -10px rgba(0,0,0,0.1)' }} />
                  <Legend wrapperStyle={{ paddingTop: '20px' }} />
                  <Line type="monotone" dataKey="registrations" stroke="#8b5cf6" strokeWidth={3} activeDot={{ r: 6, fill: "#8b5cf6", strokeWidth: 0 }} name="Registrasi" />
                  <Line type="monotone" dataKey="activeSessions" stroke="#10b981" strokeWidth={3} activeDot={{ r: 6, fill: "#10b981", strokeWidth: 0 }} name="Sesi Aktif" />
                </LineChart>
              </ResponsiveContainer>
              ) : (
                <div className="flex items-center justify-center h-full text-slate-400 text-sm font-medium"><Activity className="w-5 h-5 mr-2 opacity-40" />Belum ada data aktivitas</div>
              )}
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="bg-white border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.02)] rounded-[2rem] p-6 md:p-8 flex flex-col">
            <h2 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
              <Target className="w-5 h-5 text-emerald-500" /> Distribusi Skor SNBT
            </h2>
            <div className="h-[300px] w-full mt-2">
              {scoreDistribution.some(d => d.count > 0) ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={scoreDistribution} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="scoreRange" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                  <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '1rem', border: 'none', boxShadow: '0 10px 40px -10px rgba(0,0,0,0.1)' }} />
                  <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Jumlah Siswa" />
                </BarChart>
              </ResponsiveContainer>
              ) : (
                <div className="flex items-center justify-center h-full text-slate-400 text-sm font-medium"><Target className="w-5 h-5 mr-2 opacity-40" />Belum ada data skor</div>
              )}
            </div>
          </motion.div>
        </motion.div>

        {/* Charts Row 2 */}
        <motion.div variants={staggerContainer} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          <motion.div variants={fadeUp} className="bg-white border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.02)] rounded-[2rem] p-6 md:p-8 flex flex-col col-span-1">
            <h2 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-purple-500" /> Performa Subtes
            </h2>
            <div className="h-[250px] w-full flex items-center justify-center mt-2">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart outerRadius="70%" data={subtestPerformance}>
                  <PolarGrid stroke="#e2e8f0" />
                  <PolarAngleAxis dataKey="subtest" tick={{ fill: '#64748b', fontSize: 10, fontWeight: 600 }} />
                  <PolarRadiusAxis angle={90} domain={[0, 800]} tick={false} axisLine={false} />
                  <Radar name="Rata-rata Skor" dataKey="averageScore" stroke="#8b5cf6" strokeWidth={2} fill="#8b5cf6" fillOpacity={0.2} />
                  <Tooltip contentStyle={{ borderRadius: '1rem', border: 'none', boxShadow: '0 10px 40px -10px rgba(0,0,0,0.1)' }} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="bg-white border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.02)] rounded-[2rem] p-6 md:p-8 flex flex-col col-span-1 lg:col-span-2">
            <h2 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
              <XCircle className="w-5 h-5 text-rose-500" /> Soal Paling Sering Salah
            </h2>
            <div className="flex-1 bg-slate-50/50 rounded-2xl border border-slate-100 overflow-hidden">
              <ul className="divide-y divide-slate-100">
                {wrongAnswerRanking.length > 0 ? wrongAnswerRanking.map((item, idx) => (
                  <li key={item.questionId} className="p-4 flex items-center gap-4 hover:bg-white transition-colors">
                    <div className="w-8 h-8 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center font-bold text-xs shrink-0">
                      {idx + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-slate-700 text-sm font-medium line-clamp-2 leading-snug"><MarkdownRenderer content={item.text} /></div>
                    </div>
                    <div className="shrink-0 text-right">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-rose-50 text-rose-600 rounded-full text-xs font-bold border border-rose-100">
                        {item.wrongCount.toLocaleString()}x Salah
                      </span>
                    </div>
                  </li>
                )) : (
                  <li className="p-8 text-center text-slate-400 font-medium">Tidak ada data soal salah.</li>
                )}
              </ul>
            </div>
          </motion.div>
        </motion.div>

        {/* Row 3 */}
        <motion.div variants={staggerContainer} className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-12">
          
          <motion.div variants={fadeUp} className="bg-white border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.02)] rounded-[2rem] p-6 md:p-8 flex flex-col">
            <h2 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
              <Crown className="w-5 h-5 text-amber-500" /> Leaderboard Siswa
            </h2>
            <div className="flex-1 overflow-hidden rounded-2xl border border-slate-100 bg-slate-50/30">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[10px] font-bold border-b border-slate-100">
                    <tr>
                      <th className="py-3 px-4 w-12 text-center">Rank</th>
                      <th className="py-3 px-4">Nama Siswa</th>
                      <th className="py-3 px-4 text-center">Skor Tertinggi</th>
                      <th className="py-3 px-4 text-right">Aktivitas</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-600 font-medium">
                    {topStudents.length > 0 ? topStudents.map((student, index) => (
                      <tr key={`${student.id}-${index}`} className="hover:bg-white transition-colors">
                        <td className="py-3 px-4 text-center">
                          {index === 0 ? <span className="w-6 h-6 mx-auto rounded-full bg-amber-100 text-amber-600 flex items-center justify-center font-bold text-xs border border-amber-200">1</span> :
                           index === 1 ? <span className="w-6 h-6 mx-auto rounded-full bg-slate-200 text-slate-600 flex items-center justify-center font-bold text-xs border border-slate-300">2</span> :
                           index === 2 ? <span className="w-6 h-6 mx-auto rounded-full bg-orange-100 text-orange-700 flex items-center justify-center font-bold text-xs border border-orange-200">3</span> :
                           <span className="text-slate-400">{index + 1}</span>}
                        </td>
                        <td className="py-3 px-4 text-slate-800 font-semibold">{student.name}</td>
                        <td className="py-3 px-4 text-center">
                          <span className="text-[var(--accent-dark)] font-bold">{Math.round(student.score)}</span>
                        </td>
                        <td className="py-3 px-4 text-right text-xs text-slate-400">{student.activity}</td>
                      </tr>
                    )) : <tr><td colSpan={4} className="py-8 text-center text-slate-400">Belum ada leaderboard.</td></tr>}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="bg-white border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.02)] rounded-[2rem] p-6 md:p-8 flex flex-col">
            <h2 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-indigo-500" /> Penggunaan AI Tutor
            </h2>
            <div className="flex-1 h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={aiTutorActivity} margin={{ top: 5, right: 10, left: -20, bottom: 5 }} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                  <XAxis type="number" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                  <YAxis type="category" dataKey="level" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12, fontWeight: 500}} width={80} />
                  <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '1rem', border: 'none', boxShadow: '0 10px 40px -10px rgba(0,0,0,0.1)' }} />
                  <Bar dataKey="count" fill="#8b5cf6" radius={[0, 4, 4, 0]} name="Panggilan AI" barSize={32} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

        </motion.div>
      </motion.div>
    </div>
  );
}

function StatCard({ label, value, icon, bgColor }: { label: string; value: number; icon: React.ReactNode; bgColor: string }) {
  return (
    <div className="bg-white border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] rounded-[2rem] p-5 flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4 transition-all hover:-translate-y-1">
      <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0" style={{ backgroundColor: bgColor }}>
        {icon}
      </div>
      <div>
        <p className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider">{label}</p>
        <p className="text-2xl sm:text-3xl font-bold text-slate-800 tracking-tight mt-1">{value.toLocaleString("id-ID")}</p>
      </div>
    </div>
  );
}