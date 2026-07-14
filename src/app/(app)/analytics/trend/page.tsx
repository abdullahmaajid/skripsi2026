"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  TrendingUp,
  Sparkles,
  Trophy,
  Crown,
  Medal,
  Target,
  Users,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  ChevronRight,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

export default function AnalyticsTrendPage() {
  const router = useRouter();
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/analytics/trend?t=${Date.now()}`, { cache: "no-store" })
      .then((r) => r.json())
      .then((d) => {
        setData(d.data || d);
        setLoading(false);
      });
  }, []);

  const chartData = data;

  // Compute insight
  const getInsight = () => {
    if (chartData.length < 2) return null;
    const latest = chartData[chartData.length - 1];
    const previous = chartData[chartData.length - 2];
    const first = chartData[0];
    const diff = latest.scaled - previous.scaled;
    const totalGrowth = latest.scaled - first.scaled;
    const avgScore = Math.round(
      chartData.reduce((a: number, d: any) => a + d.scaled, 0) /
        chartData.length,
    );

    let trendText = "";
    if (diff > 50) {
      trendText = `Lompatan luar biasa! Skormu naik ${diff} poin dari percobaan sebelumnya. Momentum ini sangat bagus untuk dipertahankan.`;
    } else if (diff > 0) {
      trendText = `Skor naik +${diff} poin dari percobaan sebelumnya. Peningkatan yang stabil dan konsisten, pertahankan!`;
    } else if (diff === 0) {
      trendText = `Skormu stagnan (tidak berubah). Coba variasikan strategi belajarmu atau fokus pada subtes yang paling lemah.`;
    } else if (diff > -50) {
      trendText = `Skor turun ${Math.abs(diff)} poin. Ini hal yang wajar selama proses belajar. Review kembali soal yang salah dan perbaiki konsep yang lemah.`;
    } else {
      trendText = `Skor turun cukup signifikan (${Math.abs(diff)} poin). Jangan panik, cek apakah kamu menjawab terburu-buru atau ada materi baru yang belum dikuasai.`;
    }

    let growthText = "";
    if (chartData.length >= 3) {
      if (totalGrowth > 0) {
        growthText = ` Secara keseluruhan dari ${chartData.length} percobaan, skor totalmu sudah tumbuh +${totalGrowth} poin.`;
      } else if (totalGrowth < 0) {
        growthText = ` Secara keseluruhan, skor totalmu masih turun ${Math.abs(totalGrowth)} poin dari awal. Butuh upaya lebih untuk membalikkan tren.`;
      }
    }

    return { trendText, growthText, avgScore, diff, latest, totalGrowth };
  };

  const insight = getInsight();



  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] p-6 md:p-10 font-sans">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-2 text-slate-800">
          <TrendingUp className="w-7 h-7 text-[var(--accent)]" /> Tren
          Perkembangan Skor
        </h1>
        <p className="text-[var(--text-secondary)] mb-8">
          Grafik perkembangan skor SNBT dan θ (theta) dari waktu ke waktu.
        </p>

        {/* === INSIGHT BOX === */}
        {insight && (
          <div className="bg-[var(--pastel-purple)]/30 border border-[var(--accent)]/10 rounded-3xl p-6 mb-8 flex gap-5">
            <div className="w-12 h-12 rounded-2xl bg-[var(--accent)]/10 flex items-center justify-center shrink-0 shadow-sm border border-[var(--accent)]/20">
              <Sparkles className="w-6 h-6 text-[var(--accent)]" />
            </div>
            <div>
              <h3 className="text-slate-800 font-bold mb-2">
                Insight Tren Skormu
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-1.5">
                {insight.trendText}
                {insight.growthText}
              </p>
              <div className="flex flex-wrap gap-3 mt-3">
                <div className="flex items-center gap-1.5 text-xs font-semibold bg-white border border-slate-100 rounded-xl px-3 py-1.5 shadow-sm">
                  {insight.diff > 0 ? (
                    <ArrowUpRight className="w-3.5 h-3.5 text-emerald-500" />
                  ) : insight.diff < 0 ? (
                    <ArrowDownRight className="w-3.5 h-3.5 text-rose-500" />
                  ) : (
                    <Minus className="w-3.5 h-3.5 text-slate-400" />
                  )}
                  <span
                    className={
                      insight.diff > 0
                        ? "text-emerald-600"
                        : insight.diff < 0
                          ? "text-rose-600"
                          : "text-slate-500"
                    }
                  >
                    {insight.diff > 0 ? `+${insight.diff}` : insight.diff} poin
                    terakhir
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-semibold bg-white border border-slate-100 rounded-xl px-3 py-1.5 shadow-sm text-slate-600">
                  Rata-rata: {insight.avgScore}
                </div>
                <div className="flex items-center gap-1.5 text-xs font-semibold bg-white border border-slate-100 rounded-xl px-3 py-1.5 shadow-sm text-slate-600">
                  {chartData.length} percobaan
                </div>
              </div>
            </div>
          </div>
        )}

        {/* === CHARTS === */}
        <div className="flex items-center justify-between mt-8 mb-4">
          <h2 className="text-xl font-bold text-slate-800">
            Grafik Perkembangan
          </h2>
          <button
            onClick={() => router.push("/analytics/explorer")}
            className="text-xs font-bold text-[var(--accent)] bg-[var(--accent)]/10 px-4 py-2 rounded-xl hover:bg-[var(--accent)] hover:text-white transition-colors flex items-center gap-1.5"
          >
            Lihat Detail <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
        <div className="w-full">
          <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
            <h2 className="text-lg font-semibold mb-6 text-slate-800">
              Skor SNBT (Scaled)
            </h2>
            <p className="text-xs text-slate-400 -mt-4 mb-4 leading-relaxed">
              Skor SNBT dihitung melalui pembobotan tingkat kesulitan soal IRT
              untuk setiap subtes. Skala nilai berkisar antara 200 hingga 1000.
            </p>
            <div className="h-[280px]">
              {chartData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient
                        id="colorScaled"
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
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis
                      dataKey="label"
                      tick={{ fill: "#64748b", fontSize: 11 }}
                    />
                    <YAxis
                      domain={[200, 800]}
                      tick={{ fill: "#64748b", fontSize: 12 }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#fff",
                        border: "1px solid #e2e8f0",
                        borderRadius: "12px",
                        boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="scaled"
                      stroke="var(--accent)"
                      fill="url(#colorScaled)"
                      strokeWidth={2.5}
                      dot={{
                        r: 5,
                        fill: "var(--accent)",
                        stroke: "#fff",
                        strokeWidth: 2,
                      }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center text-slate-400">
                  <p>Kerjakan Try Out untuk melihat grafik skor.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* === RIWAYAT TABLE === */}
        <div className="bg-white border border-slate-100 rounded-3xl p-6 mt-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
          <h2 className="text-lg font-semibold mb-2 text-slate-800">
            Riwayat Try Out
          </h2>
          <p className="text-xs text-slate-400 mb-5">
            Catatan lengkap seluruh percobaan Try Out yang telah kamu kerjakan.
          </p>
          {chartData.length > 0 ? (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400">
                  <th className="text-left py-3 px-2 font-medium">Try Out</th>
                  <th className="text-center py-3 px-2 font-medium">Tanggal</th>
                  <th className="text-center py-3 px-2 font-medium">
                    Skor SNBT
                  </th>
                  <th className="text-center py-3 px-2 font-medium">
                    θ (Theta)
                  </th>
                  <th className="text-center py-3 px-2 font-medium">
                    Perubahan
                  </th>
                  <th className="text-center py-3 px-2 font-medium">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody>
                {chartData.map((d: any, i: number) => {
                  const prev = i > 0 ? chartData[i - 1].scaled : d.scaled;
                  const diff = d.scaled - prev;
                  return (
                    <tr
                      key={i}
                      className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors"
                    >
                      <td className="py-3 px-2 text-slate-700 font-medium">
                        {d.attempt}
                      </td>
                      <td className="py-3 px-2 text-center text-slate-400">
                        {d.date}
                      </td>
                      <td className="py-3 px-2 text-center font-semibold text-slate-800">
                        {d.scaled}
                      </td>
                      <td className="py-3 px-2 text-center font-mono text-slate-500">
                        {d.theta?.toFixed(2) ?? "-"}
                      </td>
                      <td
                        className={`py-3 px-2 text-center font-medium ${diff > 0 ? "text-emerald-600" : diff < 0 ? "text-rose-500" : "text-slate-400"}`}
                      >
                        {i === 0 ? "-" : diff > 0 ? `+${diff}` : diff}
                      </td>
                      <td className="py-3 px-2 text-center">
                        {d.attemptId ? (
                          <button
                            onClick={() => router.push(`/tryout/${d.attemptId}/review`)}
                            className="text-[11px] font-bold text-[var(--accent)] bg-[var(--accent)]/10 hover:bg-[var(--accent)] hover:text-white px-3 py-1.5 rounded-lg transition-colors inline-flex items-center gap-1"
                          >
                            Bahas Soal <ChevronRight className="w-3 h-3" />
                          </button>
                        ) : (
                          <span className="text-xs text-slate-300">-</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <p className="text-slate-400 text-center py-8">
              Belum ada riwayat. Kerjakan Try Out untuk melihat datanya.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
