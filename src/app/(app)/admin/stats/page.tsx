"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Users, BookOpen, FileText, TrendingUp, XCircle, BarChart3, ArrowLeft, GraduationCap } from "lucide-react";
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
        <p className="text-sm text-slate-400 mt-2 font-medium">Memuat statistik...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] p-6 text-center">
        <p className="text-rose-500">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-5xl mx-auto h-full overflow-y-auto no-scrollbar">
      <div>
        <button onClick={() => router.push("/admin")} className="text-slate-400 hover:text-slate-600 text-xs font-bold uppercase tracking-wider mb-2 inline-flex items-center gap-1.5 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Panel Admin
        </button>
        <h1 className="text-3xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
          <BarChart3 className="w-8 h-8 text-[var(--accent)]" /> Statistik Platform
        </h1>
        <p className="text-sm text-slate-500 mt-1">Ringkasan kondisi platform dan metrik penting.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        <StatCard label="Total Siswa" value={stats?.users.students || 0} icon={<Users className="w-4 h-4 text-sky-600" />} bgColor="var(--pastel-blue)" />
        <StatCard label="Total Soal" value={stats?.curriculum.questions || 0} icon={<BookOpen className="w-4 h-4 text-purple-600" />} bgColor="var(--pastel-purple)" />
        <StatCard label="Total Prodi" value={stats?.ptn.majors || 0} icon={<GraduationCap className="w-4 h-4 text-emerald-600" />} bgColor="var(--pastel-green)" />
        <StatCard label="Tryout Dikerjakan" value={stats?.exams.attempts || 0} icon={<FileText className="w-4 h-4 text-rose-600" />} bgColor="var(--pastel-rose)" />
      </div>

      <div>
        <h2 className="text-lg font-bold text-slate-700 mb-4">Grafik Aktivitas Pengguna</h2>
        <div className="bg-white border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] rounded-3xl p-6 h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={userActivity} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="registrations" stroke="#8884d8" activeDot={{ r: 8 }} name="Registrasi" />
              <Line type="monotone" dataKey="activeSessions" stroke="#82ca9d" name="Sesi Aktif" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-bold text-slate-700 mb-4">Distribusi Skor SNBT</h2>
        <div className="bg-white border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] rounded-3xl p-6 h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={scoreDistribution} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="scoreRange" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#8884d8" name="Jumlah Siswa" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-bold text-slate-700 mb-4">Performa per Subtest</h2>
        <div className="bg-white border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] rounded-3xl p-6 h-80 min-w-0">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart outerRadius={90} data={subtestPerformance}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subtest" />
              <PolarRadiusAxis angle={90} domain={[0, 800]} />
              <Radar name="Rata-rata Skor" dataKey="averageScore" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
              <Tooltip />
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-bold text-slate-700 mb-4">Soal Paling Sering Salah</h2>
        <div className="bg-white border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] rounded-3xl p-6">
          <ul className="space-y-4">
            {wrongAnswerRanking.length > 0 ? wrongAnswerRanking.map((item) => (
              <li key={item.questionId} className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <XCircle className="w-5 h-5 text-rose-500" />
                  <span className="text-slate-700 text-sm font-medium">{item.text}</span>
                </div>
                <span className="text-sm font-bold text-rose-600">{item.wrongCount.toLocaleString()}x Salah</span>
              </li>
            )) : <p className="text-slate-400">Tidak ada data soal paling sering salah.</p>}
          </ul>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-bold text-slate-700 mb-4">Aktivitas AI Tutor</h2>
        <div className="bg-white border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] rounded-3xl p-6 h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={aiTutorActivity} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="level" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#8884d8" name="Jumlah Panggilan" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-bold text-slate-700 mb-4">Leaderboard / Top Students</h2>
        <div className="bg-white border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] rounded-3xl p-6">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="py-2 pr-2 font-bold text-slate-500">#</th>
                  <th className="py-2 px-2 font-bold text-slate-500">Nama Siswa</th>
                  <th className="py-2 px-2 font-bold text-slate-500">Skor Tertinggi</th>
                  <th className="py-2 pl-2 font-bold text-slate-500">Aktivitas</th>
                </tr>
              </thead>
              <tbody>
                {topStudents.length > 0 ? topStudents.map((student, index) => (
                  <tr key={`${student.id}-${index}`} className="border-b border-slate-100 last:border-b-0">
                    <td className="py-2 pr-2 text-slate-700">{index + 1}</td>
                    <td className="py-2 px-2 text-slate-700 font-medium">{student.name}</td>
                    <td className="py-2 px-2 text-slate-700">{student.score}</td>
                    <td className="py-2 pl-2 text-slate-700">{student.activity}</td>
                  </tr>
                )) : <tr><td colSpan={4} className="py-4 text-center text-slate-400">Tidak ada data siswa terbaik.</td></tr>}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, icon, bgColor }: { label: string; value: number; icon: React.ReactNode; bgColor: string }) {
  return (
    <div className="bg-white border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] rounded-3xl p-5 flex items-center gap-4">
      <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: bgColor }}>
        {icon}
      </div>
      <div>
        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{label}</p>
        <p className="text-2xl font-bold text-slate-800 tracking-tight mt-0.5">{value.toLocaleString("id-ID")}</p>
      </div>
    </div>
  );
}