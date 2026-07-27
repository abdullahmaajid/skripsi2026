"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, Variants } from "framer-motion";
import { Loader2, Users, BookOpen, FileText, TrendingUp, XCircle, BarChart3, GraduationCap, Crown, Activity, Trophy, Target, Lightbulb, AlertCircle, Info, AlertTriangle, CheckCircle2, Bot, Layers, Sparkles } from "lucide-react";
import MarkdownRenderer from "@/components/ui/MarkdownRenderer";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  PieChart, Pie, Cell
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
interface TopStudentData { id: string; name: string; score: number; activity: string; targetMajor?: string | null; targetUni?: string | null; }
interface TopTargetData { name: string; count: number }
interface AdvancedStatsData {
  passingProbability: number;
  timeManagement: { averageDurationMinutes: number };
  irtStats: { mudah: number; sedang: number; sulit: number };
  completionRate: { completed: number; abandoned: number; inProgress: number; timedOut: number; rate: number };
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const staggerContainer: Variants = {
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
  const [topUniversities, setTopUniversities] = useState<TopTargetData[]>([]);
  const [topMajors, setTopMajors] = useState<TopTargetData[]>([]);
  const [advancedStats, setAdvancedStats] = useState<AdvancedStatsData | null>(null);

  // Filter States
  const [universities, setUniversities] = useState<{id: string, name: string}[]>([]);
  const [majors, setMajors] = useState<{id: string, name: string}[]>([]);
  const [filterUni, setFilterUni] = useState<string>("");
  const [filterMajor, setFilterMajor] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"ringkasan" | "evaluasi" | "target" | "ai">("ringkasan");
  const [error, setError] = useState("");

  
  // AI Dummy Data
  const aiTokenDaily = [
    { date: "07-13", tokens: 12500, cost: 0.12 },
    { date: "07-14", tokens: 28400, cost: 0.28 },
    { date: "07-15", tokens: 18000, cost: 0.18 },
    { date: "07-16", tokens: 42000, cost: 0.42 },
    { date: "07-17", tokens: 35000, cost: 0.35 },
    { date: "07-18", tokens: 52000, cost: 0.52 },
  ];
  const aiContextUsage = [
    { name: "Tutor AI", value: 65, fill: "#8b5cf6" },
    { name: "Analisis Rapor", value: 20, fill: "#3b82f6" },
    { name: "Generate Soal", value: 15, fill: "#10b981" },
  ];

  useEffect(() => {
    Promise.all([
      fetch("/api/admin/stats").then(r => r.json()).then(d => setStats(d.data)).catch(() => {}),
      fetch("/api/admin/stats/user-activity-trend").then(r => r.json()).then(d => setUserActivity(d.data || [])).catch(() => {}),
      fetch("/api/admin/stats/score-distribution").then(r => r.json()).then(d => setScoreDistribution(d.data || [])).catch(() => {}),
      fetch("/api/admin/stats/subtest-performance").then(r => r.json()).then(d => setSubtestPerformance(d.data || [])).catch(() => {}),
      fetch("/api/admin/stats/wrong-answer-ranking").then(r => r.json()).then(d => setWrongAnswerRanking(d.data || [])).catch(() => {}),
      fetch("/api/admin/stats/ai-tutor-activity").then(r => r.json()).then(d => setAiTutorActivity(d.data || [])).catch(() => {}),
      
      fetch("/api/admin/stats/top-targets").then(r => r.json()).then(d => {
        setTopUniversities(d.data?.topUniversities || []);
        setTopMajors(d.data?.topMajors || []);
      }).catch(() => {}),
      fetch("/api/admin/stats/advanced").then(r => r.json()).then(d => setAdvancedStats(d.data || null)).catch(() => {}),
    ]).finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetch("/api/universities").then(r => r.json()).then(d => setUniversities(d.data || [])).catch(() => {});
  }, []);

  useEffect(() => {
    if (filterUni) {
      fetch(`/api/majors?uniId=${filterUni}`).then(r => r.json()).then(d => setMajors(d.data || [])).catch(() => {});
    } else {
      setMajors([]);
    }
  }, [filterUni]);

  useEffect(() => {
    let url = "/api/admin/stats/top-students";
    const params = new URLSearchParams();
    if (filterUni) params.append("universityId", filterUni);
    if (filterMajor) params.append("majorId", filterMajor);
    if (params.toString()) url += "?" + params.toString();
    
    fetch(url).then(r => r.json()).then(d => setTopStudents(d.data || [])).catch(() => {});
  }, [filterUni, filterMajor]);

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
    <div className="p-6 md:p-8 space-y-6 h-full overflow-y-auto no-scrollbar">
      <motion.div variants={staggerContainer} initial="hidden" animate="show" className="space-y-6">
        
        {/* Header */}
        <motion.div variants={fadeUp}>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Statistik Platform</h1>
          <p className="text-sm text-slate-500 mt-1">Ringkasan kondisi platform, metrik siswa, dan analitik ujian UTBK.</p>
        </motion.div>

        {/* Tabs Menu */}
        <div className="flex border-b border-slate-100 gap-1.5 overflow-x-auto no-scrollbar w-full">
          <button
            onClick={() => setActiveTab("ringkasan")}
            className={`px-5 py-3 text-sm font-semibold border-b-2 transition-all inline-flex items-center gap-2 shrink-0 whitespace-nowrap ${activeTab === "ringkasan" ? "border-[var(--accent)] text-[var(--accent-dark)]" : "border-transparent text-slate-400 hover:text-slate-600"}`}
          >
            <Activity className="w-4 h-4" /> Ringkasan Platform
          </button>
          <button
            onClick={() => setActiveTab("evaluasi")}
            className={`px-5 py-3 text-sm font-semibold border-b-2 transition-all inline-flex items-center gap-2 shrink-0 whitespace-nowrap ${activeTab === "evaluasi" ? "border-[var(--accent)] text-[var(--accent-dark)]" : "border-transparent text-slate-400 hover:text-slate-600"}`}
          >
            <BookOpen className="w-4 h-4" /> Evaluasi Ujian
          </button>
          <button
            onClick={() => setActiveTab("target")}
            className={`px-5 py-3 text-sm font-semibold border-b-2 transition-all inline-flex items-center gap-2 shrink-0 whitespace-nowrap ${activeTab === "target" ? "border-[var(--accent)] text-[var(--accent-dark)]" : "border-transparent text-slate-400 hover:text-slate-600"}`}
          >
            <Target className="w-4 h-4" /> Target & Siswa
          </button>
          <button
            onClick={() => setActiveTab("ai")}
            className={`px-5 py-3 text-sm font-semibold border-b-2 transition-all inline-flex items-center gap-2 shrink-0 whitespace-nowrap ${activeTab === "ai" ? "border-[var(--accent)] text-[var(--accent-dark)]" : "border-transparent text-slate-400 hover:text-slate-600"}`}
          >
            <Bot className="w-4 h-4" /> Token & AI
          </button>
        </div>

        {/* Tab Content: RINGKASAN */}
        {activeTab === "ringkasan" && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pb-12">
            
            {/* Advanced Analytics */}
            {advancedStats && (
              <>
                <motion.div variants={fadeUp} className="col-span-1 md:col-span-4 bg-indigo-500 rounded-[2rem] p-6 text-white flex flex-col justify-between relative overflow-hidden">
                  <div>
                    <h3 className="text-indigo-100 font-medium text-sm">Ketercapaian Target</h3>
                    <p className="text-indigo-50 text-xs mt-1 leading-relaxed opacity-80">Prediksi menembus passing grade PTN impian.</p>
                  </div>
                  <div className="mt-6 flex items-baseline gap-1">
                    <span className="text-4xl font-black">{Math.round(advancedStats.passingProbability)}</span>
                    <span className="text-indigo-200 font-bold">%</span>
                  </div>
                </motion.div>

                <motion.div variants={fadeUp} className="col-span-1 md:col-span-4 bg-emerald-500 rounded-[2rem] p-6 text-white flex flex-col justify-between relative overflow-hidden">
                  <div>
                    <h3 className="text-emerald-100 font-medium text-sm">Penyelesaian Ujian</h3>
                    <p className="text-emerald-50 text-xs mt-1 leading-relaxed opacity-80">Rasio siswa menuntaskan seluruh modul UTBK.</p>
                  </div>
                  <div className="mt-6 flex items-baseline gap-1">
                    <span className="text-4xl font-black">{Math.round(advancedStats.completionRate.rate)}</span>
                    <span className="text-emerald-200 font-bold">%</span>
                  </div>
                </motion.div>

                <motion.div variants={fadeUp} className="col-span-1 md:col-span-4 bg-amber-500 rounded-[2rem] p-6 text-white flex flex-col justify-between relative overflow-hidden">
                  <div>
                    <h3 className="text-amber-100 font-medium text-sm">Waktu Ujian (Rata-rata)</h3>
                    <p className="text-amber-50 text-xs mt-1 leading-relaxed opacity-80">Durasi aktual dari alokasi 195 menit SNBT.</p>
                  </div>
                  <div className="mt-6 flex items-baseline gap-1">
                    <span className="text-4xl font-black">{Math.round(advancedStats.timeManagement.averageDurationMinutes)}</span>
                    <span className="text-amber-200 font-bold">mnt</span>
                  </div>
                </motion.div>
              </>
            )}

            {/* Smart Insights Panel */}
            {(() => {
              const insights = [];
              if (advancedStats && subtestPerformance) {
                if (advancedStats.completionRate.rate < 50 && advancedStats.completionRate.rate > 0) {
                  insights.push({ type: 'critical', title: 'Tingkat Putus Ujian Sangat Tinggi', desc: `Hanya ${Math.round(advancedStats.completionRate.rate)}% siswa yang menyelesaikan ujian sampai akhir. Sebanyak ${Math.round(100 - advancedStats.completionRate.rate)}% menyerah di tengah jalan. Evaluasi durasi atau tingkat kesulitan soal awal.` });
                }
                if (advancedStats.timeManagement.averageDurationMinutes < 30 && advancedStats.timeManagement.averageDurationMinutes > 0) {
                  insights.push({ type: 'warning', title: 'Anomali Durasi Pengerjaan', desc: `Siswa rata-rata hanya menghabiskan ${Math.round(advancedStats.timeManagement.averageDurationMinutes)} menit dari alokasi waktu ujian. Ada indikasi siswa menjawab secara acak tanpa membaca soal.` });
                }
                if (advancedStats.passingProbability < 20 && advancedStats.passingProbability >= 0) {
                  insights.push({ type: 'warning', title: 'Target Kelulusan Mengkhawatirkan', desc: `Hanya ${Math.round(advancedStats.passingProbability)}% siswa yang menyentuh batas aman passing grade jurusan impian mereka. Disarankan untuk mempublikasikan materi soal tingkat dasar.` });
                } else if (advancedStats.passingProbability >= 50) {
                  insights.push({ type: 'success', title: 'Ketercapaian Sangat Baik', desc: `Lebih dari separuh siswa (${Math.round(advancedStats.passingProbability)}%) diprediksi lolos di PTN target mereka. Pertahankan kualitas bank soal!` });
                }
              }

              if (insights.length === 0) return null;

              return (
                <motion.div variants={fadeUp} className="col-span-1 md:col-span-12">
                  <div className="flex flex-col gap-3">
                    {insights.map((insight, idx) => (
                      <div key={idx} className={`p-4 rounded-r-2xl flex items-start gap-4 bg-white shadow-[0_2px_10px_rgba(0,0,0,0.02)] border-l-4 ${
                        insight.type === 'critical' ? 'border-rose-500' :
                        insight.type === 'warning' ? 'border-amber-500' :
                        insight.type === 'success' ? 'border-emerald-500' : 'border-sky-500'
                      }`}>
                        <div className="shrink-0 mt-0.5">
                          {insight.type === 'critical' ? <AlertTriangle className="w-5 h-5 text-rose-500" /> :
                           insight.type === 'warning' ? <AlertCircle className="w-5 h-5 text-amber-500" /> :
                           insight.type === 'success' ? <CheckCircle2 className="w-5 h-5 text-emerald-500" /> :
                           <Info className="w-5 h-5 text-sky-500" />}
                        </div>
                        <div>
                          <h4 className={`text-sm font-bold mb-1 ${
                            insight.type === 'critical' ? 'text-rose-700' :
                            insight.type === 'warning' ? 'text-amber-700' :
                            insight.type === 'success' ? 'text-emerald-700' : 'text-sky-700'
                          }`}>{insight.title}</h4>
                          <p className="text-xs text-slate-500 leading-relaxed max-w-4xl">{insight.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )
            })()}

            {/* Grafik Tren */}
            <motion.div variants={fadeUp} className="col-span-1 md:col-span-12 xl:col-span-8 bg-white border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.02)] rounded-[2rem] p-6 md:p-8 flex flex-col">
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
                  <div className="flex h-full items-center justify-center text-slate-400 text-sm">Belum ada data aktivitas.</div>
                )}
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="col-span-1 md:col-span-12 xl:col-span-4 bg-white border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.02)] rounded-[2rem] p-6 md:p-8 flex flex-col">
              <h2 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-fuchsia-500" /> Distribusi Skor SNBT
              </h2>
              <div className="flex-1 h-[300px] w-full">
                {scoreDistribution.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={scoreDistribution} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="scoreRange" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                    <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '1rem', border: 'none', boxShadow: '0 10px 40px -10px rgba(0,0,0,0.1)' }} />
                    <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Siswa" />
                  </BarChart>
                </ResponsiveContainer>
                ) : (
                  <div className="flex h-full items-center justify-center text-slate-400 text-sm">Belum ada ujian selesai.</div>
                )}
              </div>
            </motion.div>

          </div>
        )}

        {/* Tab Content: EVALUASI */}
        {activeTab === "evaluasi" && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pb-12">
            <motion.div variants={fadeUp} className="col-span-1 md:col-span-12 xl:col-span-8 bg-white border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.02)] rounded-[2rem] p-6 flex flex-col">
              <h2 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2">
                <XCircle className="w-4 h-4 text-rose-500" /> Soal Paling Sering Salah
              </h2>
              <div className="flex-1 space-y-3">
                {wrongAnswerRanking.map((item, idx) => (
                  <div key={item.questionId} className="flex flex-col md:flex-row md:items-start gap-4 p-4 bg-slate-50 border border-slate-100 rounded-xl hover:bg-slate-100/50 transition-colors">
                    <span className="w-6 h-6 shrink-0 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center font-bold text-xs">{idx+1}</span>
                    <div className="flex-1 min-w-0 prose prose-sm prose-slate max-w-none text-slate-600">
                      <MarkdownRenderer content={item.text} />
                    </div>
                    <span className="font-bold text-xs text-rose-600 shrink-0 self-start md:self-center bg-rose-50 px-2.5 py-1 rounded-full border border-rose-100">{item.wrongCount}x Salah</span>
                  </div>
                ))}
                {wrongAnswerRanking.length === 0 && <p className="text-xs text-slate-400 text-center py-4">Belum ada data evaluasi soal</p>}
              </div>
            </motion.div>

            <div className="col-span-1 md:col-span-12 xl:col-span-4 flex flex-col gap-6">
              <motion.div variants={fadeUp} className="bg-white border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.02)] rounded-[2rem] p-6 flex flex-col">
                <h2 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <Target className="w-4 h-4 text-rose-500" /> Subtes Terlemah
                </h2>
                <div className="space-y-3">
                  {[...subtestPerformance].sort((a,b) => a.averageScore - b.averageScore).slice(0,3).map((item, idx) => (
                    <div key={item.subtest} className="flex items-center justify-between p-3 bg-slate-50 border border-slate-100 rounded-xl">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center font-bold text-[10px]">{idx+1}</span>
                        <span className="text-[11px] font-semibold text-slate-700 leading-tight">{item.subtest}</span>
                      </div>
                      <span className="font-bold text-[10px] text-rose-600 shrink-0">Avg {Math.round(item.averageScore)}</span>
                    </div>
                  ))}
                  {subtestPerformance.length === 0 && <p className="text-xs text-slate-400 text-center py-4">Belum ada data nilai</p>}
                </div>
              </motion.div>

              {advancedStats && (
                <motion.div variants={fadeUp} className="bg-white border border-slate-100 rounded-[2rem] p-6 flex flex-col shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
                  <div>
                    <h3 className="text-slate-800 font-bold text-sm">Sebaran Tingkat Kesulitan</h3>
                    <p className="text-slate-400 text-[10px] mt-0.5">Analisis Model IRT (Item Response Theory)</p>
                  </div>
                  <div className="h-[150px] w-full flex items-center justify-center mt-2 relative">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie data={[
                          { name: 'Mudah', value: advancedStats.irtStats.mudah, color: '#34d399' },
                          { name: 'Sedang', value: advancedStats.irtStats.sedang, color: '#fbbf24' },
                          { name: 'Sulit', value: advancedStats.irtStats.sulit, color: '#f87171' }
                        ]} dataKey="value" innerRadius={40} outerRadius={60} paddingAngle={2}>
                          {[{ color: '#34d399' }, { color: '#fbbf24' }, { color: '#f87171' }].map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip contentStyle={{ borderRadius: '1rem', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', fontSize: '12px' }} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex flex-col gap-3 mt-4">
                    <div className="flex items-start gap-3 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                      <span className="w-3 h-3 rounded-full bg-emerald-400 shrink-0 mt-1 shadow-sm"></span>
                      <div>
                        <p className="text-xs font-bold text-slate-700">Mudah ({advancedStats.irtStats.mudah}%)</p>
                        <p className="text-[10px] text-slate-500 leading-relaxed mt-0.5">Terkonsentrasi pada subtes Penalaran Umum dan Literasi Bahasa Indonesia.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                      <span className="w-3 h-3 rounded-full bg-amber-400 shrink-0 mt-1 shadow-sm"></span>
                      <div>
                        <p className="text-xs font-bold text-slate-700">Sedang ({advancedStats.irtStats.sedang}%)</p>
                        <p className="text-[10px] text-slate-500 leading-relaxed mt-0.5">Merata di Pemahaman Bacaan & Menulis serta Bahasa Inggris.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                      <span className="w-3 h-3 rounded-full bg-rose-400 shrink-0 mt-1 shadow-sm"></span>
                      <div>
                        <p className="text-xs font-bold text-slate-700">Sulit ({advancedStats.irtStats.sulit}%)</p>
                        <p className="text-[10px] text-slate-500 leading-relaxed mt-0.5">Mendominasi soal-soal Penalaran Matematika dan Pengetahuan Kuantitatif.</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            <motion.div variants={fadeUp} className="col-span-1 md:col-span-12 bg-white border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.02)] rounded-[2rem] p-6 md:p-8 flex flex-col">
              <h2 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                <Target className="w-5 h-5 text-indigo-500" /> Analisis Performa Subtes
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                <div className="lg:col-span-2 h-[350px] w-full">
                  {subtestPerformance.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="70%" data={subtestPerformance.map(d => ({...d, subject: d.subtest.replace("Penalaran", "Pen.").replace("Literasi", "Lit.").replace("Pengetahuan", "Peng.")}))}>
                      <PolarGrid stroke="#e2e8f0" />
                      <PolarAngleAxis dataKey="subject" tick={{fill: '#64748b', fontSize: 12}} />
                      <PolarRadiusAxis angle={30} domain={[0, 1000]} tick={false} axisLine={false} />
                      <Radar name="Skor Rata-rata" dataKey="averageScore" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.2} />
                      <Tooltip contentStyle={{ borderRadius: '1rem', border: 'none', boxShadow: '0 10px 40px -10px rgba(0,0,0,0.1)' }} />
                    </RadarChart>
                  </ResponsiveContainer>
                  ) : (
                    <div className="flex h-full items-center justify-center text-slate-400 text-sm">Belum ada ujian.</div>
                  )}
                </div>
                
                {/* Rincian Bar Subtes */}
                <div className="lg:col-span-1 flex flex-col justify-center space-y-6">
                  <div>
                    <h3 className="text-sm font-bold text-slate-800">Rincian Skor Nasional</h3>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">Perbandingan rata-rata skor simulasi siswa Anda terhadap batas ambang kompetitif UTBK (Skor &gt; 600).</p>
                  </div>
                  <div className="space-y-4">
                    {subtestPerformance.map((item, idx) => {
                      const isGood = item.averageScore >= 600;
                      return (
                        <div key={idx} className="flex flex-col gap-1.5">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold text-slate-600 line-clamp-1 pr-2">{item.subtest}</span>
                            <span className={`text-xs font-bold ${isGood ? 'text-emerald-600' : 'text-rose-500'}`}>{Math.round(item.averageScore)}</span>
                          </div>
                          <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                            <div className={`h-full rounded-full transition-all duration-1000 ${isGood ? 'bg-emerald-500' : 'bg-rose-400'}`} style={{ width: `${Math.min(item.averageScore / 10, 100)}%` }}></div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* Tab Content: TARGET */}
        {activeTab === "target" && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pb-12">
            <motion.div variants={fadeUp} className="col-span-1 md:col-span-6 bg-white border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.02)] rounded-[2rem] p-6 flex flex-col">
              <h2 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-emerald-500" /> PTN Paling Diminati
              </h2>
              <div className="flex-1 space-y-3">
                {topUniversities.map((item, idx) => (
                  <div key={item.name} className="flex items-center justify-between p-3 bg-slate-50 border border-slate-100 rounded-xl">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-[10px]">{idx+1}</span>
                      <span className="text-xs font-semibold text-slate-700 line-clamp-1">{item.name}</span>
                    </div>
                    <span className="font-bold text-xs text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">{item.count} siswa</span>
                  </div>
                ))}
                {topUniversities.length === 0 && <p className="text-xs text-slate-400 text-center py-4">Belum ada pilihan target</p>}
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="col-span-1 md:col-span-6 bg-white border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.02)] rounded-[2rem] p-6 flex flex-col">
              <h2 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-purple-500" /> Jurusan Paling Diminati
              </h2>
              <div className="flex-1 space-y-3">
                {topMajors.map((item, idx) => (
                  <div key={item.name} className="flex items-center justify-between p-3 bg-slate-50 border border-slate-100 rounded-xl">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-bold text-[10px]">{idx+1}</span>
                      <span className="text-[11px] font-semibold text-slate-700 line-clamp-2 leading-tight">{item.name}</span>
                    </div>
                    <span className="font-bold text-[10px] text-purple-600 shrink-0 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-100">{item.count}x</span>
                  </div>
                ))}
                {topMajors.length === 0 && <p className="text-xs text-slate-400 text-center py-4">Belum ada pilihan target</p>}
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="col-span-1 md:col-span-12 bg-white border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.02)] rounded-[2rem] p-6 md:p-8 flex flex-col">
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
                        <th className="py-3 px-4 hidden sm:table-cell">Target Kampus</th>
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
                          <td className="py-3 px-4 hidden sm:table-cell">
                            {student.targetUni ? (
                              <div className="flex flex-col">
                                <span className="text-xs font-bold text-slate-700">{student.targetMajor}</span>
                                <span className="text-[10px] text-slate-500">{student.targetUni}</span>
                              </div>
                            ) : (
                              <span className="text-xs text-slate-400 italic">Belum diatur</span>
                            )}
                          </td>
                          <td className="py-3 px-4 text-center">
                            <span className="text-[var(--accent-dark)] font-bold">{Math.round(student.score)}</span>
                          </td>
                          <td className="py-3 px-4 text-right text-xs text-slate-400">{student.activity}</td>
                        </tr>
                      )) : <tr><td colSpan={5} className="py-8 text-center text-slate-400">Belum ada leaderboard.</td></tr>}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* Tab Content: AI & TOKEN */}
        {activeTab === "ai" && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pb-12">
            
            <motion.div variants={fadeUp} className="col-span-1 md:col-span-12 xl:col-span-8 bg-white border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.02)] rounded-[2rem] p-6 md:p-8 flex flex-col">
              <h2 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-indigo-500" /> Penggunaan Token Harian
              </h2>
              <div className="h-[300px] w-full mt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={aiTokenDaily} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                    <Tooltip contentStyle={{ borderRadius: '1rem', border: 'none', boxShadow: '0 10px 40px -10px rgba(0,0,0,0.1)' }} />
                    <Legend wrapperStyle={{ paddingTop: '20px' }} />
                    <Line type="monotone" dataKey="tokens" stroke="#8b5cf6" strokeWidth={3} activeDot={{ r: 6, fill: "#8b5cf6", strokeWidth: 0 }} name="Total Token" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="col-span-1 md:col-span-12 xl:col-span-4 bg-white border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.02)] rounded-[2rem] p-6 md:p-8 flex flex-col">
              <h2 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                <Bot className="w-5 h-5 text-indigo-500" /> Distribusi Fitur AI
              </h2>
              <div className="flex-1 h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={aiContextUsage} dataKey="value" innerRadius={60} outerRadius={80} paddingAngle={2}>
                      {aiContextUsage.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ borderRadius: '1rem', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', fontSize: '12px' }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex flex-col gap-2 mt-4">
                {aiContextUsage.map(item => (
                  <div key={item.name} className="flex items-center justify-between">
                    <span className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.fill }}></span>
                      {item.name}
                    </span>
                    <span className="text-xs font-bold text-slate-800">{item.value}%</span>
                  </div>
                ))}
              </div>
            </motion.div>

          </div>
        )}
      </motion.div>
    </div>
  );
}
