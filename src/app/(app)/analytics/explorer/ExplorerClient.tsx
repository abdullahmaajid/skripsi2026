"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  AreaChart,
  Area,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Filter,
  TrendingUp,
  TrendingDown,
  Activity,
  Calendar,
} from "lucide-react";

interface AttemptData {
  attemptId: string;
  date: string;
  displayDate: string;
  templateName: string;
  overall: {
    scaledScore: number;
    irtTheta: number;
  };
  subjects: Record<
    string,
    {
      name: string;
      scaledScore: number;
      irtTheta: number;
    }
  >;
}

interface Subject {
  id: string;
  name: string;
}

export default function ExplorerClient() {
  const router = useRouter();
  const [data, setData] = useState<AttemptData[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>("ALL");
  const [dateRange, setDateRange] = useState<string>("ALL"); // 7D, 30D, 3M, ALL

  useEffect(() => {
    fetch(`/api/analytics/explorer?t=${Date.now()}`, {
      cache: "no-store",
      credentials: "include",
    })
      .then((r) => r.json())
      .then((d) => {
        setData(d.data || []);
        setSubjects(d.subjects || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Apply filters
  const filteredData = useMemo(() => {
    let filtered = [...data];

    // Date Range Filter
    const now = new Date();
    if (dateRange !== "ALL") {
      filtered = filtered.filter((a) => {
        const d = new Date(a.date);
        const diffDays = (now.getTime() - d.getTime()) / (1000 * 3600 * 24);
        if (dateRange === "7D") return diffDays <= 7;
        if (dateRange === "30D") return diffDays <= 30;
        if (dateRange === "3M") return diffDays <= 90;
        return true;
      });
    }

    return filtered;
  }, [data, dateRange]);

  // Map to chart format
  const chartData = useMemo(() => {
    return filteredData.map((a, idx) => {
      let scaled = a.overall.scaledScore;
      let theta = a.overall.irtTheta;

      if (selectedSubjectId !== "ALL" && a.subjects[selectedSubjectId]) {
        scaled = Math.round(a.subjects[selectedSubjectId].scaledScore || 0);
        theta =
          Math.round((a.subjects[selectedSubjectId].irtTheta || 0) * 100) / 100;
      } else if (selectedSubjectId !== "ALL") {
        scaled = 0;
        theta = 0;
      }

      return {
        label: `TO #${idx + 1}`,
        date: a.displayDate,
        templateName: a.templateName,
        scaled,
        theta,
      };
    });
  }, [filteredData, selectedSubjectId]);

  // Calculate insights
  const insight = useMemo(() => {
    if (chartData.length === 0) return null;
    const latest = chartData[chartData.length - 1];
    const oldest = chartData[0];

    const diffScaled = latest.scaled - oldest.scaled;
    const diffTheta = latest.theta - oldest.theta;

    const maxScaled = Math.max(...chartData.map((d) => d.scaled));
    const avgScaled = Math.round(
      chartData.reduce((acc, d) => acc + d.scaled, 0) / chartData.length,
    );

    return { diffScaled, diffTheta, maxScaled, avgScaled };
  }, [chartData]);

  if (loading) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <Activity className="w-8 h-8 text-[var(--accent)] animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto h-full overflow-y-auto no-scrollbar">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-800 tracking-tight flex items-center gap-2">
            <Filter className="w-6 h-6 text-[var(--accent)]" /> Eksplorasi Data
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Gunakan filter untuk menganalisis perkembangan skormu secara lebih
            mendalam.
          </p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-2xl p-4 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-100 flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 block">
            Subtes (Mata Uji)
          </label>
          <select
            value={selectedSubjectId}
            onChange={(e) => setSelectedSubjectId(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 text-slate-700 text-sm font-medium rounded-xl px-4 py-2.5 outline-none focus:border-[var(--accent)] transition-colors cursor-pointer"
          >
            <option value="ALL">🌟 Semua Subtes (Keseluruhan)</option>
            {subjects.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>
        <div className="sm:w-64">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 block">
            Rentang Waktu
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Calendar className="w-4 h-4 text-slate-400" />
            </div>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 text-slate-700 text-sm font-medium rounded-xl pl-9 pr-4 py-2.5 outline-none focus:border-[var(--accent)] transition-colors cursor-pointer"
            >
              <option value="7D">7 Hari Terakhir</option>
              <option value="30D">30 Hari Terakhir</option>
              <option value="3M">3 Bulan Terakhir</option>
              <option value="ALL">Semua Waktu</option>
            </select>
          </div>
        </div>
      </div>

      {/* Insights */}
      {insight && chartData.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
              Total Tryout
            </p>
            <p className="text-2xl font-bold text-slate-800">
              {chartData.length}
            </p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
              Rata-rata Skor
            </p>
            <p className="text-2xl font-bold text-[var(--accent)]">
              {insight.avgScaled}
            </p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
              Skor Tertinggi
            </p>
            <p className="text-2xl font-bold text-slate-800">
              {insight.maxScaled}
            </p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex flex-col justify-between">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
              Perkembangan
            </p>
            <div className="flex items-center gap-2">
              {insight.diffScaled >= 0 ? (
                <>
                  <TrendingUp className="w-6 h-6 text-emerald-500" />
                  <span className="text-2xl font-bold text-emerald-600">
                    +{insight.diffScaled}
                  </span>
                </>
              ) : (
                <>
                  <TrendingDown className="w-6 h-6 text-rose-500" />
                  <span className="text-2xl font-bold text-rose-600">
                    {insight.diffScaled}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Charts */}
      {chartData.length > 0 ? (
        <div className="space-y-6">
          {/* Scaled Score Chart */}
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
            <h2 className="text-lg font-bold text-slate-800 mb-6">
              Distribusi Skor SNBT (Scaled)
            </h2>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={chartData}
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                >
                  <defs>
                    <linearGradient
                      id="colorScaledExp"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="5%"
                        stopColor="var(--accent)"
                        stopOpacity={0.2}
                      />
                      <stop
                        offset="95%"
                        stopColor="var(--accent)"
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#f1f5f9"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="label"
                    tick={{ fill: "#94a3b8", fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    domain={[0, 1000]}
                    tick={{ fill: "#94a3b8", fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      borderRadius: "12px",
                      border: "1px solid #e2e8f0",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
                      fontWeight: 600,
                    }}
                    labelStyle={{
                      color: "#64748b",
                      fontWeight: 500,
                      fontSize: "11px",
                      marginBottom: "4px",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="scaled"
                    stroke="var(--accent)"
                    strokeWidth={3}
                    fill="url(#colorScaledExp)"
                    dot={{
                      r: 4,
                      fill: "var(--accent)",
                      stroke: "#fff",
                      strokeWidth: 2,
                    }}
                    activeDot={{ r: 6 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-12 border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex flex-col items-center justify-center text-center">
          <Activity className="w-12 h-12 text-slate-200 mb-4" />
          <h3 className="text-lg font-bold text-slate-800">Tidak Ada Data</h3>
          <p className="text-sm text-slate-500 mt-2">
            Tidak ada riwayat tryout pada filter yang dipilih.
          </p>
        </div>
      )}
    </div>
  );
}
