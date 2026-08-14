import re

with open("src/app/(app)/dashboard/DashboardClient.tsx", "r") as f:
    content = f.read()

# Main container
content = content.replace('className="p-6 md:p-8 space-y-6 h-full overflow-y-auto no-scrollbar"', 'className="p-4 md:p-6 space-y-4 h-full overflow-y-auto no-scrollbar"')

# Header
content = content.replace('text-3xl md:text-4xl', 'text-2xl md:text-3xl')
content = content.replace('px-8 py-3', 'px-6 py-2.5 text-sm')

# Actionable Insight
content = content.replace('rounded-[2rem] border-2 shadow-sm', 'rounded-3xl border-2 shadow-sm')
content = content.replace('p-5 md:p-6 flex flex-col sm:flex-row items-center justify-between gap-5', 'p-4 flex flex-col sm:flex-row items-center justify-between gap-4')
content = content.replace('w-12 h-12 shrink-0 rounded-2xl', 'w-10 h-10 shrink-0 rounded-xl')
content = content.replace('className="w-6 h-6"', 'className="w-5 h-5"')
content = content.replace('px-6 py-3 rounded-xl font-bold text-sm', 'px-4 py-2.5 rounded-xl font-bold text-xs')

# Getting Started
content = content.replace('className="p-6"', 'className="p-5"')
content = content.replace('className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 pt-5"', 'className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 pt-4"')

# Hero Metrics
content = content.replace('gap-5', 'gap-4')
content = content.replace('rounded-[2rem] p-6', 'rounded-[1.5rem] p-5')
content = content.replace('size={80} stroke={7}', 'size={64} stroke={6}')
content = content.replace('text-4xl font-bold', 'text-3xl font-bold')

# Actionable Insights (3 cols)
content = content.replace('mt-6 flex items-center', 'mt-4 flex items-center')
content = content.replace('px-5 py-3 rounded-full', 'px-4 py-2.5 text-xs rounded-full')
content = content.replace('w-10 h-10 rounded-xl', 'w-8 h-8 rounded-lg')
content = content.replace('className="w-5 h-5 text-white"', 'className="w-4 h-4 text-white"')
content = content.replace('className="w-5 h-5 text-white" />', 'className="w-4 h-4 text-white" />')
content = content.replace('min-h-[280px]', 'min-h-[220px]')

# Unified Stat Item
content = content.replace('gap-4 px-2 md:px-6', 'gap-3 px-2 md:px-4')
content = content.replace('w-12 h-12 rounded-2xl', 'w-10 h-10 rounded-xl')
content = content.replace('text-2xl font-bold text-[var(--text-primary)]', 'text-xl font-bold text-[var(--text-primary)]')

with open("src/app/(app)/dashboard/DashboardClient.tsx", "w") as f:
    f.write(content)
