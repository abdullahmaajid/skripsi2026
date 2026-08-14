import React from 'react'

interface AdminPageHeaderProps {
  title: string
  subtitle: string
  icon: React.ReactNode
  stats?: { label: string; value: string | number; icon?: React.ReactNode }[]
  children?: React.ReactNode
}

export function AdminPageHeader({ title, subtitle, icon, stats, children }: AdminPageHeaderProps) {
  return (
    <div className="bg-white border-b border-slate-100 mb-8 p-6 md:p-8 relative overflow-hidden rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] border">
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[var(--pastel-purple)] to-transparent rounded-full blur-3xl opacity-50 -mr-20 -mt-20"></div>
      
      <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-[var(--pastel-purple)] text-[var(--accent)] flex items-center justify-center shrink-0">
            {icon}
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight">{title}</h1>
            <p className="text-slate-500 font-medium mt-1">{subtitle}</p>
          </div>
        </div>

        {stats && stats.length > 0 && (
          <div className="flex gap-4">
            {stats.map((stat, idx) => (
              <div key={idx} className="bg-slate-50 border border-slate-100 rounded-xl p-4 min-w-[120px]">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  {stat.icon}
                  {stat.label}
                </div>
                <div className="text-2xl font-black text-slate-800">{stat.value}</div>
              </div>
            ))}
          </div>
        )}
      </div>
      {children && (
        <div className="relative z-10 mt-6 pt-6 border-t border-slate-100/60 flex items-center justify-between">
          {children}
        </div>
      )}
    </div>
  )
}
