"use client"

import { useRouter } from "next/navigation"
import { GraduationCap, Zap, Brain, Target, BarChart3, ArrowRight, Sparkles, Shield } from "lucide-react"

export default function LandingPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-neutral-950 text-white font-sans overflow-hidden">
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
          <button onClick={() => router.push("/auth/login")} className="px-5 py-2 text-sm font-medium text-neutral-300 hover:text-white transition-colors">
            Masuk
          </button>
          <button onClick={() => router.push("/auth/register")} className="px-5 py-2.5 text-sm font-semibold bg-[var(--accent)] hover:bg-[var(--accent-hover)] rounded-xl transition-all shadow-lg shadow-[color:var(--accent-glow)]">
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
          <p className="text-lg md:text-xl text-neutral-400 leading-relaxed mb-10 max-w-2xl">
            Sistem Tutoring Adaptif dengan <strong className="text-neutral-200">IRT Scoring</strong>, <strong className="text-neutral-200">AI Scaffolding</strong>, dan <strong className="text-neutral-200">Chancing Engine</strong> untuk memaksimalkan peluang lolos SNBT impianmu.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={() => router.push("/auth/register")}
              className="px-8 py-4 bg-[var(--accent)] hover:bg-[var(--accent-hover)] font-semibold rounded-xl transition-all shadow-xl shadow-[var(--accent)]/25 flex items-center justify-center gap-2 text-lg"
            >
              Mulai Sekarang <ArrowRight className="w-5 h-5" />
            </button>
            <button 
              onClick={() => router.push("/tryout/list")}
              className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 font-semibold rounded-xl transition-all flex items-center justify-center gap-2"
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
          <p className="text-neutral-400 max-w-xl mx-auto">Platform persiapan UTBK paling komprehensif dengan teknologi adaptif yang menyesuaikan level belajarmu.</p>
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
        <div className="bg-[var(--accent)]/15 border border-white/10 rounded-[2rem] p-12 md:p-16 text-center">
          <Shield className="w-12 h-12 text-[var(--accent)] mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Siap Menaklukkan UTBK?</h2>
          <p className="text-neutral-400 max-w-lg mx-auto mb-8">Bergabung sekarang dan mulai persiapan cerdasmu. Gratis, tanpa kartu kredit.</p>
          <button
            onClick={() => router.push("/auth/register")}
            className="px-10 py-4 bg-[var(--accent)] hover:bg-[var(--accent-hover)] font-semibold rounded-xl transition-all shadow-xl shadow-[var(--accent)]/25 text-lg"
          >
            Daftar Gratis Sekarang
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 py-8 text-center text-neutral-600 text-sm">
        &copy; 2025 Lexica. Built with Next.js, Prisma, Groq Llama.
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, description, color }: { icon: React.ReactNode; title: string; description: string; color: string }) {
  return (
    <div className="bg-neutral-900/50 backdrop-blur-sm border border-white/5 rounded-2xl p-6 hover:border-white/10 transition-all group">
      <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: `color-mix(in srgb, ${color} 15%, transparent)`, color }}>
        {icon}
      </div>
      <h3 className="font-semibold text-lg mb-2">{title}</h3>
      <p className="text-neutral-400 text-sm leading-relaxed">{description}</p>
    </div>
  )
}

function StepCard({ step, title, desc }: { step: number; title: string; desc: string }) {
  return (
    <div className="text-center">
      <div className="w-14 h-14 rounded-2xl bg-[var(--accent)]/10 border border-[var(--accent)]/20 flex items-center justify-center text-[var(--accent)] font-bold text-xl mx-auto mb-4">
        {step}
      </div>
      <h3 className="font-semibold text-lg mb-2">{title}</h3>
      <p className="text-neutral-400 text-sm">{desc}</p>
    </div>
  )
}
