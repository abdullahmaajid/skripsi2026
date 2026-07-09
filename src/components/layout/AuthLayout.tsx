"use client"

import { ReactNode } from "react"
import { motion } from "framer-motion"
import { GraduationCap, Sparkles, Map, Target } from "lucide-react"

export default function AuthLayout({ children, title = "Mulai Perjalanan UTBK-mu Bersama Lexica" }: { children: ReactNode, title?: string }) {
  return (
    <div className="min-h-screen flex w-full font-sans bg-white overflow-hidden">
      {/* Left Panel - Marketing / Branding (Light Mode) */}
      <div className="hidden lg:flex flex-1 relative bg-slate-50 flex-col justify-between p-12 overflow-hidden border-r border-slate-100">
        {/* Blurred gradient background */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-60">
          <div className="absolute -top-1/4 -left-1/4 w-[800px] h-[800px] bg-[var(--pastel-purple)] rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[var(--pastel-blue)]/40 rounded-full blur-[100px]" />
        </div>

        {/* Top Logo */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[var(--accent)]/10 flex items-center justify-center">
            <GraduationCap className="w-6 h-6 text-[var(--accent)]" />
          </div>
          <span className="text-2xl font-bold tracking-tight text-slate-800">Lexica</span>
        </div>

        {/* Center Content */}
        <div className="relative z-10 max-w-lg mt-auto mb-32">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl lg:text-5xl font-bold text-slate-900 leading-[1.15] tracking-tight mb-6"
          >
            {title}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-slate-500 text-lg leading-relaxed mb-12 font-medium"
          >
            Platform belajar UTBK cerdas yang menyesuaikan dengan gaya belajar dan target kampus impianmu secara otomatis.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex gap-4"
          >
            <div className="flex-1 bg-white border border-slate-200/60 shadow-sm rounded-2xl p-4">
              <div className="w-8 h-8 rounded-lg bg-[var(--accent)]/10 text-[var(--accent)] flex items-center justify-center mb-3">
                <Map className="w-4 h-4" />
              </div>
              <h3 className="text-slate-800 font-bold text-sm mb-1">Rute Personal</h3>
              <p className="text-slate-500 text-xs font-medium">Belajar hanya yang diperlukan.</p>
            </div>
            <div className="flex-1 bg-white border border-slate-200/60 shadow-sm rounded-2xl p-4">
              <div className="w-8 h-8 rounded-lg bg-[var(--accent)]/10 text-[var(--accent)] flex items-center justify-center mb-3">
                <Sparkles className="w-4 h-4" />
              </div>
              <h3 className="text-slate-800 font-bold text-sm mb-1">AI Tutor</h3>
              <p className="text-slate-500 text-xs font-medium">Tanya apa saja kapan saja.</p>
            </div>
            <div className="flex-1 bg-white border border-slate-200/60 shadow-sm rounded-2xl p-4">
              <div className="w-8 h-8 rounded-lg bg-[var(--accent)]/10 text-[var(--accent)] flex items-center justify-center mb-3">
                <Target className="w-4 h-4" />
              </div>
              <h3 className="text-slate-800 font-bold text-sm mb-1">Analitik Akurat</h3>
              <p className="text-slate-500 text-xs font-medium">Pantau peluang kelulusanmu.</p>
            </div>
          </motion.div>
        </div>

        {/* Bottom Footer */}
        <div className="relative z-10 flex justify-between text-xs font-medium text-slate-400">
          <p>© 2026 Lexica Education.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-slate-600 transition-colors">Privacy</a>
            <a href="#" className="hover:text-slate-600 transition-colors">Terms</a>
          </div>
        </div>
      </div>

      {/* Right Panel - Form Area (Light Mode for consistency with dashboard) */}
      <div className="w-full lg:w-[500px] xl:w-[600px] shrink-0 bg-white flex flex-col justify-center relative shadow-[-20px_0_40px_rgba(0,0,0,0.05)] z-20">
        
        {/* Mobile Logo Header */}
        <div className="lg:hidden absolute top-0 left-0 w-full p-6 flex items-center justify-center gap-2">
          <GraduationCap className="w-6 h-6 text-[var(--accent)]" />
          <span className="text-xl font-bold tracking-tight text-slate-800">Lexica</span>
        </div>

        {/* Scrollable Form Container */}
        <div className="w-full max-h-screen overflow-y-auto no-scrollbar">
          <div className="w-full max-w-[420px] mx-auto px-6 py-24 md:py-12 flex flex-col min-h-full justify-center">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
