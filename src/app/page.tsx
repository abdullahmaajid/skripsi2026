"use client"

import { useRouter } from "next/navigation"
import { GraduationCap, Zap, Brain, Target, BarChart3, ArrowRight, Sparkles, Shield } from "lucide-react"

export default function LandingPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[var(--accent)]/8 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[var(--accent)]/5 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 right-0 w-[300px] h-[300px] bg-[var(--accent)]/5 rounded-full blur-[100px]" />
      </div>

      {/* Navbar */}
      <nav className="relative z-10 flex items-center justify-between px-6 md:px-12 py-5 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <GraduationCap className="w-7 h-7 text-[var(--accent)]" />
          <span className="text-xl font-bold tracking-tight">Lexica</span>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => router.push("/auth/login")} className="px-5 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
            Masuk
          </button>
          <button onClick={() => router.push("/auth/register")} className="px-5 py-2.5 text-sm font-semibold text-white bg-[var(--accent)] hover:bg-[var(--accent-hover)] rounded-xl transition-all shadow-lg shadow-[var(--accent)]/20">
            Daftar Gratis
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pt-16 md:pt-28 pb-20">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[var(--accent)]/10 border border-[var(--accent)]/20 rounded-full text-[var(--accent-light)] text-xs font-medium mb-6">
            <Sparkles className="w-3.5 h-3.5" /> Powered by AI &amp; IRT Scoring
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6">
            Persiapan UTBK{" "}
            <span className="text-[var(--accent)]">
              yang Cerdas
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 leading-relaxed mb-10 max-w-2xl">
            Sistem Tutoring Adaptif dengan <strong className="text-slate-800">IRT Scoring</strong>, <strong className="text-slate-800">AI Scaffolding</strong>, dan <strong className="text-slate-800">Chancing Engine</strong> untuk memaksimalkan peluang lolos SNBT impianmu.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={() => router.push("/auth/register")}
              className="px-8 py-4 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white font-semibold rounded-xl transition-all shadow-xl shadow-[var(--accent)]/25 flex items-center justify-center gap-2 text-lg"
            >
              Mulai Sekarang <ArrowRight className="w-5 h-5" />
            </button>
            <button 
              onClick={() => router.push("/tryout/list")}
              className="px-8 py-4 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 shadow-sm font-semibold rounded-xl transition-all flex items-center justify-center gap-2"
            >
              Coba Demo Gratis
            </button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Kenapa Lexica?</h2>
          <p className="text-slate-600 max-w-xl mx-auto">Platform persiapan UTBK paling komprehensif dengan teknologi adaptif yang menyesuaikan level belajarmu.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          <FeatureCard
            icon={<Brain className="w-6 h-6" />}
            title="IRT Scoring"
            description="Skor berbasis Item Response Theory (Rasch 1PL) — bukan sekadar persentase, tapi estimasi kemampuan sesungguhnya."
            color="var(--accent)"
          />
          <FeatureCard
            icon={<Zap className="w-6 h-6" />}
            title="AI Scaffolding"
            description="3 level bantuan adaptif: Socratic → Hint → Solution. AI membimbing, bukan memberi jawaban langsung."
            color="hsl(45,90%,55%)"
          />
          <FeatureCard
            icon={<Target className="w-6 h-6" />}
            title="Chancing Engine"
            description="Hitung peluang lolos ke jurusan impianmu berdasarkan skor IRT, daya tampung, dan rasio keketatan."
            color="hsl(150,70%,50%)"
          />
          <FeatureCard
            icon={<BarChart3 className="w-6 h-6" />}
            title="Analytics Mendalam"
            description="Radar chart kemampuan per subtes, trend perkembangan skor, dan rekomendasi fokus belajar dari AI."
            color="#d4615f"
          />
        </div>
      </section>

      {/* How It Works */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Cara Kerja</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <StepCard step={1} title="Daftar & Pilih Target" desc="Buat akun, isi profil, dan pilih PTN serta jurusan impianmu." />
          <StepCard step={2} title="Kerjakan Try Out CBT" desc="Simulasi ujian realistis dengan timer, navigasi soal, dan flagging." />
          <StepCard step={3} title="Pelajari & Tingkatkan" desc="Lihat analisis IRT, minta bantuan AI Tutor, dan pantau peluang lolos." />
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-20">
        <div className="bg-indigo-50 border border-indigo-100 rounded-[2rem] p-12 md:p-16 text-center shadow-lg shadow-indigo-100/50">
          <Shield className="w-12 h-12 text-[var(--accent)] mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Siap Menaklukkan UTBK?</h2>
          <p className="text-slate-600 max-w-lg mx-auto mb-8">Bergabung sekarang dan mulai persiapan cerdasmu. Gratis, tanpa kartu kredit.</p>
          <button
            onClick={() => router.push("/auth/register")}
            className="px-10 py-4 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white font-semibold rounded-xl transition-all shadow-xl shadow-[var(--accent)]/25 text-lg"
          >
            Daftar Gratis Sekarang
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-200 py-8 text-center text-slate-500 text-sm">
        &copy; 2025 Lexica. Built with Next.js, Prisma, Groq Llama.
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, description, color }: { icon: React.ReactNode; title: string; description: string; color: string }) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 hover:border-slate-300 hover:shadow-lg transition-all group">
      <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: `color-mix(in srgb, ${color} 15%, transparent)`, color }}>
        {icon}
      </div>
      <h3 className="font-semibold text-slate-800 text-lg mb-2">{title}</h3>
      <p className="text-slate-600 text-sm leading-relaxed">{description}</p>
    </div>
  )
}

function StepCard({ step, title, desc }: { step: number; title: string; desc: string }) {
  return (
    <div className="text-center">
      <div className="w-14 h-14 rounded-2xl bg-[var(--accent)]/10 border border-[var(--accent)]/20 flex items-center justify-center text-[var(--accent)] font-bold text-xl mx-auto mb-4">
        {step}
      </div>
      <h3 className="font-semibold text-slate-800 text-lg mb-2">{title}</h3>
      <p className="text-slate-600 text-sm">{desc}</p>
    </div>
  )
}
