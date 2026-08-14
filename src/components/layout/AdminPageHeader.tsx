import React from 'react'
import { Sparkles, Info } from 'lucide-react'

interface AdminPageHeaderProps {
  title: string
  subtitle: string
  icon: React.ReactNode
  stats?: { label: string; value: string | number; icon?: React.ReactNode }[]
  children?: React.ReactNode // Usually action buttons (Tambah, etc.)
  infoTitle?: string
  infoList?: React.ReactNode[]
  badgeText?: string
}

export function AdminPageHeader({ 
  title, 
  subtitle, 
  icon, 
  stats, 
  children,
  infoTitle,
  infoList,
  badgeText = "ADMIN PANEL"
}: AdminPageHeaderProps) {
  return (
    <div className="bg-gradient-to-br from-[var(--pastel-purple)] to-white border border-[var(--accent)]/20 rounded-3xl p-6 md:p-8 shadow-sm relative overflow-hidden mb-8">
      {/* Background Icon */}
      <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none -mr-4 -mt-4 [&>svg]:w-48 [&>svg]:h-48">
        {icon}
      </div>
      
      <div className="relative z-10 space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[var(--accent)]/10 text-[var(--accent-dark)] text-xs font-bold rounded-full uppercase tracking-wider mb-3 shadow-sm border border-[var(--accent)]/10">
              <Sparkles className="w-3.5 h-3.5" /> {badgeText}
            </span>
            <h2 className="text-xl md:text-2xl font-black text-slate-800 tracking-tight">
              {title}
            </h2>
            <p className="text-slate-500 font-medium mt-1 leading-relaxed">{subtitle}</p>
            {children && (
              <div className="mt-4">
                {children}
              </div>
            )}
          </div>
          
          {stats && stats.length > 0 && (
            <div className="flex gap-4">
                {stats.map((stat, idx) => (
                  <div key={idx} className="bg-white/70 backdrop-blur-sm border border-white/60 shadow-[0_4px_20px_rgba(0,0,0,0.02)] p-4 rounded-2xl text-center min-w-[120px] transition-all hover:bg-white/90">
                    <p className={`text-[10px] uppercase font-bold mb-1 flex items-center justify-center gap-1.5 ${idx % 2 === 0 ? "text-slate-500" : "text-[var(--accent)]"}`}>
                      {stat.icon}
                      {stat.label}
                    </p>
                    <p className={`text-2xl font-black ${idx % 2 === 0 ? "text-slate-800" : "text-[var(--accent-dark)]"}`}>
                      {stat.value}
                    </p>
                  </div>
                ))}
            </div>
          )}
        </div>

        {infoTitle && infoList && (
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-5 border border-[var(--accent)]/10 shadow-sm mt-6">
            <div className="flex items-start gap-3">
              <div className="shrink-0 mt-0.5">
                <Info className="w-5 h-5 text-[var(--accent)]" />
              </div>
              <div className="text-slate-600 space-y-3 text-sm leading-relaxed">
                <div>
                  <strong className="text-slate-800 block mb-1">{infoTitle}</strong>
                </div>
                <ul className="list-disc pl-4 space-y-2 text-[13px] text-slate-500 font-medium">
                  {infoList.map((item, idx) => (
                    <li key={idx} className="pl-1 leading-relaxed">{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
