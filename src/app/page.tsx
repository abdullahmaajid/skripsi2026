"use client"

import { useRouter } from "next/navigation"
import { GraduationCap, Zap, Brain, Target, BarChart3, ArrowRight, Sparkles, Shield, ChevronRight, PlayCircle, CheckCircle2, Star, TrendingUp, Search, MessageCircle, Phone, Mail, MapPin, ChevronDown } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"

export default function LandingPage() {
  const router = useRouter()
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  }

  const stagger = {
    visible: { transition: { staggerChildren: 0.1 } }
  }

  const faqs = [
    { q: "Apakah Lexica benar-benar gratis?", a: "Ya! 100% gratis selamanya. Platform ini dibangun khusus dengan dedikasi untuk membantu semua pejuang PTN dari berbagai kalangan, terutama bagi teman-teman yang memiliki keterbatasan dana atau memilih untuk belajar mandiri tanpa bimbel." },
    { q: "Bagaimana cara kerja IRT Scoring di Lexica?", a: "Sistem kami menggunakan algoritma Item Response Theory (Rasch Model) persis seperti UTBK asli. Skormu dihitung bukan dari persentase benar, melainkan bobot kesulitan setiap soal yang berhasil kamu jawab." },
    { q: "Apakah AI Tutor langsung memberikan jawaban?", a: "Tidak. Sesuai prinsip Socratic Scaffolding, AI Tutor kami dirancang untuk membimbing alur berpikirmu dengan petunjuk (hint) bertahap, sehingga kamu benar-benar paham konsepnya." },
    { q: "Seberapa akurat prediksi Chancing Engine?", a: "Chancing Engine kami memadukan data historis keketatan jurusan, daya tampung terbaru, dan kurva distribusi normal peserta nasional. Meski berupa estimasi, model prediksinya sangat mendekati rasio realistis SNPMB." }
  ]

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx)
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans overflow-hidden selection:bg-[var(--accent)] selection:text-white">
      {/* Dynamic Grid Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_-30%,var(--accent)_0%,transparent_100%)] opacity-[0.08]"></div>
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[100px]" />
        <div className="absolute top-40 -left-40 w-[600px] h-[600px] bg-[var(--accent)]/10 rounded-full blur-[100px]" />
      </div>

      {/* Navbar */}
      <nav className="relative z-50 flex items-center justify-between px-6 md:px-12 py-6 max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2 cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--accent)] to-purple-600 flex items-center justify-center shadow-lg shadow-[var(--accent)]/20">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700">Lexica</span>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-4"
        >
          <button onClick={() => router.push("/auth/login")} className="hidden md:block px-5 py-2.5 text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors">
            Masuk
          </button>
          <button onClick={() => router.push("/auth/register")} className="group relative px-6 py-2.5 text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-full transition-all shadow-xl hover:shadow-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--accent)] to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <span className="relative flex items-center gap-2">Daftar Gratis <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></span>
          </button>
        </motion.div>
      </nav>

      {/* Hero */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pt-12 md:pt-20 pb-20 lg:pb-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Left: Copy */}
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="max-w-3xl"
          >
            <motion.div variants={fadeIn} className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-200/60 rounded-full text-slate-700 text-sm font-medium mb-8 shadow-sm backdrop-blur-sm">
              <span className="flex h-2 w-2 rounded-full bg-[var(--accent)] animate-pulse"></span>
              Platform UTBK Berbasis <span className="font-bold text-[var(--accent)]">AI & IRT</span>
            </motion.div>
            
            <motion.div variants={fadeIn}>
              <h1 className="text-5xl md:text-6xl lg:text-[72px] font-extrabold tracking-tight leading-[1.05] mb-6 text-slate-900">
                Lolos PTN dengan <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent)] to-purple-600 inline-block mt-2">
                  Cara yang Cerdas.
                </span>
              </h1>
            </motion.div>
            
            <motion.p variants={fadeIn} className="text-lg md:text-xl text-slate-600 leading-relaxed mb-10 max-w-xl">
              Tinggalkan cara belajar lama. Lexica menganalisis kelemahanmu dengan <strong>IRT Scoring</strong>, dan membimbingmu step-by-step menggunakan <strong>Socratic AI Tutor</strong>.
            </motion.p>
            
            <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-4 mb-12">
              <button 
                onClick={() => router.push("/auth/register")}
                className="group relative px-8 py-4 bg-gradient-to-r from-[var(--accent)] to-purple-600 text-white font-bold rounded-2xl transition-all shadow-[0_8px_30px_rgb(139,92,246,0.3)] hover:shadow-[0_8px_40px_rgb(139,92,246,0.5)] hover:-translate-y-1 flex items-center justify-center gap-2 text-lg overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>
                <span className="relative flex items-center gap-2">Mulai Belajar Sekarang <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" /></span>
              </button>
              
              <button 
                onClick={() => router.push("/tryout/list")}
                className="px-8 py-4 bg-white hover:bg-slate-50 text-slate-700 font-semibold rounded-2xl transition-all flex items-center justify-center gap-3 text-lg border border-slate-200 shadow-sm hover:shadow-md"
              >
                <PlayCircle className="w-5 h-5 text-slate-400" /> Lihat Demo
              </button>
            </motion.div>

            {/* Social Proof */}
            <motion.div variants={fadeIn} className="flex items-center gap-4 text-sm font-medium text-slate-500">
              <div className="flex -space-x-3">
                {[1,2,3,4].map((i) => (
                  <div key={i} className={`w-10 h-10 rounded-full border-2 border-slate-50 bg-slate-200 flex items-center justify-center overflow-hidden z-[${5-i}]`}>
                    <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${i}&backgroundColor=e2e8f0`} alt="Avatar" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1 text-amber-500">
                  <Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" />
                </div>
                <span>Dipercaya <strong>10.000+</strong> Pejuang PTN</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Premium Mockup Graphic */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
            className="relative hidden lg:block"
          >
            <div className="relative w-full aspect-[4/3] bg-white/40 backdrop-blur-3xl border border-white/60 rounded-[2.5rem] shadow-2xl p-6 overflow-hidden">
              {/* Inner App Mockup */}
              <div className="absolute inset-0 bg-slate-50/50 m-6 rounded-2xl border border-slate-200/50 overflow-hidden flex flex-col shadow-inner">
                {/* Mock Header */}
                <div className="h-14 border-b border-slate-200/50 bg-white/80 flex items-center px-4 justify-between">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  </div>
                  <div className="h-6 w-32 bg-slate-100 rounded-md"></div>
                </div>
                {/* Mock Content */}
                <div className="flex-1 p-6 flex gap-6">
                  {/* Left Sidebar */}
                  <div className="w-1/3 flex flex-col gap-4">
                    <div className="h-24 bg-gradient-to-br from-[var(--accent)]/10 to-purple-500/10 border border-[var(--accent)]/20 rounded-xl p-4 flex flex-col justify-center">
                      <div className="text-[var(--accent)] font-bold text-sm mb-1">Peluang Lolos</div>
                      <div className="text-3xl font-extrabold text-slate-800">78% <span className="text-sm text-green-500 font-medium">↑ Naik</span></div>
                    </div>
                    <div className="flex-1 bg-white rounded-xl border border-slate-100 p-4">
                      <div className="h-4 w-1/2 bg-slate-100 rounded mb-4"></div>
                      <div className="space-y-3">
                        <div className="h-8 w-full bg-slate-50 rounded-lg"></div>
                        <div className="h-8 w-full bg-slate-50 rounded-lg"></div>
                        <div className="h-8 w-full bg-slate-50 rounded-lg"></div>
                      </div>
                    </div>
                  </div>
                  {/* Right Main Content (AI Chat Mockup) */}
                  <div className="w-2/3 flex flex-col gap-4">
                    <div className="h-32 bg-white rounded-xl border border-slate-100 p-5 shadow-sm">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center"><Brain className="w-4 h-4 text-indigo-600"/></div>
                        <div className="font-semibold text-sm">AI Tutor</div>
                      </div>
                      <div className="text-sm text-slate-600 leading-relaxed">"Pilihan A salah karena mengasumsikan variabel x konstan. Coba ingat kembali sifat eksponensial saat grafiknya menurun..."</div>
                    </div>
                    <div className="h-12 w-3/4 self-end bg-[var(--accent)] text-white rounded-xl p-3 px-4 text-sm shadow-md">
                      "Oh, jadi harus diturunkan dulu ya fungsinya?"
                    </div>
                    <div className="mt-auto h-12 w-full bg-slate-100 rounded-xl flex items-center px-4">
                      <div className="text-slate-400 text-sm flex items-center gap-2"><Sparkles className="w-4 h-4"/> Ketik pertanyaan ke AI...</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Badges */}
            <motion.div 
              animate={{ y: [0, -10, 0] }} 
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute -right-6 top-12 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center"><CheckCircle2 className="w-5 h-5 text-green-600" /></div>
              <div>
                <div className="text-xs font-semibold text-slate-500">Skor IRT</div>
                <div className="font-bold text-slate-800 text-lg">715.4</div>
              </div>
            </motion.div>

            <motion.div 
              animate={{ y: [0, 10, 0] }} 
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
              className="absolute -left-8 bottom-20 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center"><TrendingUp className="w-5 h-5 text-blue-600" /></div>
              <div>
                <div className="text-xs font-semibold text-slate-500">Peluang Lolos UI</div>
                <div className="font-bold text-slate-800 text-lg">Aman</div>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </section>

      {/* Partners / Trusted by */}
      <section className="relative z-10 border-y border-slate-200/50 bg-white/50 backdrop-blur-md py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale">
          <div className="text-xl font-bold font-serif">Universitas Indonesia</div>
          <div className="text-xl font-bold font-serif">Institut Teknologi Bandung</div>
          <div className="text-xl font-bold font-serif">Universitas Gadjah Mada</div>
          <div className="text-xl font-bold font-serif">Universitas Airlangga</div>
        </div>
      </section>

      {/* Features */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-24">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 text-[var(--accent)] rounded-full text-sm font-semibold mb-4 border border-indigo-100">
            <Sparkles className="w-4 h-4" /> Keunggulan
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6">Senjata Rahasiamu Menuju PTN</h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">Sistem yang dirancang dengan landasan sains kognitif untuk memastikan setiap menit belajarmu berdampak pada kenaikan skor.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <FeatureCard
            icon={<Brain className="w-7 h-7" />}
            title="IRT Scoring Asli"
            description="Bukan sekadar persentase benar/salah. Sistem menilai kemampuan latenmu menggunakan algoritma Rasch 1PL standar UTBK."
            color="var(--accent)"
            delay={0.1}
          />
          <FeatureCard
            icon={<Zap className="w-7 h-7" />}
            title="Socratic AI Tutor"
            description="Mentok di soal susah? AI tidak akan menyuapimu jawaban instan, melainkan memberi petunjuk tahap demi tahap agar logikamu jalan."
            color="hsl(45,90%,50%)"
            delay={0.2}
          />
          <FeatureCard
            icon={<Target className="w-7 h-7" />}
            title="Chancing Engine"
            description="Simulasikan peluang lulusmu secara matematis dengan membandingkan skor IRT-mu dengan ribuan data pesaing & daya tampung."
            color="hsl(150,70%,45%)"
            delay={0.3}
          />
          <FeatureCard
            icon={<BarChart3 className="w-7 h-7" />}
            title="Personal Analytics"
            description="Dapatkan laporan kelemahan spesifik per sub-materi dan kurikulum belajar otomatis yang diformulasikan khusus untukmu."
            color="hsl(0,70%,60%)"
            delay={0.4}
          />
        </div>
      </section>

      {/* How It Works (Cara Kerja) */}
      <section className="relative z-10 bg-white/60 border-y border-slate-200/50 py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold mb-6">3 Langkah Menuju Kampus Impian</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">Ekosistem belajar terstruktur yang menuntunmu dari evaluasi awal hingga siap tempur menghadapi hari H.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-10">
            <div className="relative flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center text-3xl font-black text-slate-300 mb-6 border-4 border-white shadow-lg relative z-10">1</div>
              <div className="absolute top-10 left-[50%] w-full h-[2px] bg-slate-200 -z-0 hidden md:block"></div>
              <h3 className="text-xl font-bold mb-3">Diagnostic Test</h3>
              <p className="text-slate-600 leading-relaxed">Ikuti pre-test untuk mengukur *baseline* awal kemapuanmu menggunakan kalkulasi IRT yang presisi.</p>
            </div>
            <div className="relative flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full bg-[var(--accent)] flex items-center justify-center text-3xl font-black text-white mb-6 border-4 border-white shadow-[0_0_20px_var(--accent)] relative z-10">2</div>
              <div className="absolute top-10 left-[50%] w-full h-[2px] bg-slate-200 -z-0 hidden md:block"></div>
              <h3 className="text-xl font-bold mb-3">AI Scaffolding</h3>
              <p className="text-slate-600 leading-relaxed">Berlatih di Mode Belajar. Saat terjebak, biarkan AI membedah logikamu lewat metode tanya-jawab Socratic.</p>
            </div>
            <div className="relative flex flex-col items-center text-center">
              <div className="w-20 h-20 rounded-full bg-slate-900 flex items-center justify-center text-3xl font-black text-white mb-6 border-4 border-white shadow-lg relative z-10">3</div>
              <h3 className="text-xl font-bold mb-3">Chancing & Evaluasi</h3>
              <p className="text-slate-600 leading-relaxed">Pantau terus perkembangan probabilitas lulusmu ke Universitas & Jurusan target secara real-time.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold mb-6">Apa Kata Pejuang PTN?</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">Mereka yang telah merasakan peningkatan signifikan lewat AI Tutoring.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          <TestimonialCard 
            text="Fitur AI Tutornya gila banget. Bukannya ngasih contekan, malah mancing kita buat mikir sendiri sampe ketemu jawabannya. Otak jadi berasa encer!"
            name="Salsa R."
            role="Siswa SMA, Diterima di Kedokteran UGM"
          />
          <TestimonialCard 
            text="Skor IRT dan Chancing Engine-nya bener-bener akurat. Pas simulasi dapet 710, pas UTBK beneran nembus segitu. Bye bye bimbel konvensional!"
            name="Farel A."
            role="Gap Year, Diterima di FTI ITB"
          />
          <TestimonialCard 
            text="UI-nya cakep, ngga lag sama sekali. Paling suka mode review soalnya, bener-bener dikasih tau kelemahan spesifik ada di materi mana."
            name="Khiara B."
            role="Siswa SMA, Pejuang SNBT 2026"
          />
        </div>
      </section>

      {/* FAQ */}
      <section className="relative z-10 bg-slate-100/50 py-24">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-extrabold mb-6">Pertanyaan Populer (FAQ)</h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white border border-slate-200 rounded-2xl overflow-hidden transition-all duration-300">
                <button 
                  onClick={() => toggleFaq(i)} 
                  className="w-full flex items-center justify-between p-6 text-left font-bold text-slate-800 hover:text-[var(--accent)]"
                >
                  {faq.q}
                  <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${openFaq === i ? 'rotate-180 text-[var(--accent)]' : 'text-slate-400'}`} />
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-6 pb-6 text-slate-600 leading-relaxed"
                    >
                      {faq.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-24">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-[3rem] p-12 md:p-20 text-center shadow-2xl bg-slate-900"
        >
          {/* CTA Background */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,var(--accent),transparent_50%)] opacity-20"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,purple,transparent_50%)] opacity-20"></div>
          
          <div className="relative z-10">
            <Shield className="w-16 h-16 text-[var(--accent)] mx-auto mb-8 drop-shadow-[0_0_15px_rgba(139,92,246,0.5)]" />
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-white">Berhenti Belajar Membabi Buta.</h2>
            <p className="text-slate-300 text-lg max-w-2xl mx-auto mb-10">Bergabung dengan ribuan siswa lainnya yang telah beralih ke persiapan UTBK berbasis data dan AI. Saatnya kamu yang memegang kendali.</p>
            <button
              onClick={() => router.push("/auth/register")}
              className="px-12 py-5 bg-white hover:bg-slate-100 text-slate-900 font-bold rounded-2xl transition-transform hover:scale-105 shadow-xl text-lg flex items-center gap-2 mx-auto"
            >
              Buat Akun Gratis Sekarang <ArrowRight className="w-5 h-5" />
            </button>
            <p className="mt-6 text-slate-400 text-sm">Tidak butuh kartu kredit. Langsung bisa coba Tryout hari ini juga.</p>
          </div>
        </motion.div>
      </section>

      {/* Comprehensive Footer */}
      <footer className="relative z-10 border-t border-slate-200 bg-white pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 rounded-lg bg-[var(--accent)] flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-white" />
                </div>
                <span className="text-2xl font-bold tracking-tight text-slate-800">Lexica</span>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed mb-6">
                Platform persiapan UTBK generasi baru. Menghadirkan kecerdasan buatan langsung ke ruang belajarmu.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold text-slate-900 mb-4">Eksplorasi</h4>
              <ul className="space-y-3 text-slate-500 text-sm">
                <li><a href="#" className="hover:text-[var(--accent)] transition-colors">Bank Soal & Tryout</a></li>
                <li><a href="#" className="hover:text-[var(--accent)] transition-colors">Chancing Engine</a></li>
                <li><a href="#" className="hover:text-[var(--accent)] transition-colors">AI Tutor Chat</a></li>
                <li><a href="#" className="hover:text-[var(--accent)] transition-colors">Dukung & Donasi</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 mb-4">Informasi</h4>
              <ul className="space-y-3 text-slate-500 text-sm">
                <li><a href="#" className="hover:text-[var(--accent)] transition-colors">Tentang Kami</a></li>
                <li><a href="#" className="hover:text-[var(--accent)] transition-colors">Kebijakan Privasi</a></li>
                <li><a href="#" className="hover:text-[var(--accent)] transition-colors">Syarat & Ketentuan</a></li>
                <li><a href="#" className="hover:text-[var(--accent)] transition-colors">Panduan Sistem</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 mb-4">Hubungi Developer</h4>
              <ul className="space-y-4 text-slate-600 text-sm font-medium">
                <li className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0"><CheckCircle2 className="w-4 h-4 text-slate-600" /></div>
                  <div>
                    <span className="block text-xs text-slate-400 mb-0.5">Developed by</span>
                    Abdullah "Jediy" Maajid
                  </div>
                </li>
                <li className="flex items-center gap-3 hover:text-green-600 transition-colors">
                  <a href="https://wa.me/6281259890076" target="_blank" rel="noreferrer" className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center shrink-0"><Phone className="w-4 h-4 text-green-600" /></div>
                    0812-5989-0076 (WA)
                  </a>
                </li>
                <li className="flex items-center gap-3 hover:text-pink-600 transition-colors">
                  <a href="https://instagram.com/jediyarc" target="_blank" rel="noreferrer" className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-pink-50 flex items-center justify-center shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-pink-600">
                        <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                      </svg>
                    </div>
                    @jediyarc
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-sm">
            <div>
              &copy; {new Date().getFullYear()} Lexica Intelligent Tutoring. All rights reserved.
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              Sistem beroperasi normal
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, description, color, delay }: { icon: React.ReactNode; title: string; description: string; color: string, delay: number }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay }}
      className="bg-white border border-slate-200 rounded-[2rem] p-8 hover:border-[var(--accent)]/30 hover:shadow-2xl hover:shadow-[var(--accent)]/5 transition-all group relative overflow-hidden h-full flex flex-col"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-transparent to-black opacity-[0.02] rounded-bl-[100%] transition-transform group-hover:scale-150"></div>
      
      <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-sm transition-transform group-hover:-translate-y-1" style={{ backgroundColor: `color-mix(in srgb, ${color} 15%, transparent)`, color }}>
        {icon}
      </div>
      <h3 className="font-bold text-slate-900 text-xl mb-3">{title}</h3>
      <p className="text-slate-600 text-sm leading-relaxed mt-auto">{description}</p>
    </motion.div>
  )
}

function TestimonialCard({ text, name, role }: { text: string; name: string; role: string }) {
  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm flex flex-col h-full hover:shadow-md transition-shadow relative">
      <div className="absolute top-6 right-6 opacity-10">
        <MessageCircle className="w-12 h-12" />
      </div>
      <div className="flex gap-1 text-amber-400 mb-6">
        <Star className="w-5 h-5 fill-current" /><Star className="w-5 h-5 fill-current" /><Star className="w-5 h-5 fill-current" /><Star className="w-5 h-5 fill-current" /><Star className="w-5 h-5 fill-current" />
      </div>
      <p className="text-slate-700 font-medium leading-relaxed mb-8 flex-1 italic">"{text}"</p>
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-slate-200 rounded-full overflow-hidden">
          <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${name}&backgroundColor=e2e8f0`} alt={name} className="w-full h-full object-cover" />
        </div>
        <div>
          <div className="font-bold text-slate-900">{name}</div>
          <div className="text-xs text-slate-500 font-medium mt-0.5">{role}</div>
        </div>
      </div>
    </div>
  )
}
