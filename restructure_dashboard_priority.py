import re

with open("src/app/(app)/dashboard/DashboardClient.tsx", "r") as f:
    content = f.read()

# EXTRACT COMPONENTS

# 1. Header
header_match = re.search(r'\{/\* ─── Header ─── \*/\}(.*?)</motion\.div>\n\n\s*\{/\* ═══ 0\.', content, re.DOTALL)
header_code = "{/* ─── Header ─── */}" + header_match.group(1) + "</motion.div>" if header_match else ""

# 2. Smart Alert (0. ACTIONABLE INSIGHT)
alert_match = re.search(r'\{/\* ═══ 0\. ACTIONABLE INSIGHT ENGINE.*?<AnimatePresence>(.*?)</AnimatePresence>', content, re.DOTALL)
alert_code = "{/* ═══ SMART ALERT ═══ */}\n      <AnimatePresence>" + alert_match.group(1) + "</AnimatePresence>" if alert_match else ""

# 3. Getting Started (1. GETTING STARTED)
getting_started_match = re.search(r'\{/\* ═══ 1\. GETTING STARTED ═══ \*/\}(.*?)\{/\* ═══ 2\.', content, re.DOTALL)
getting_started_code = "{/* ═══ GETTING STARTED ═══ */}" + getting_started_match.group(1).strip() if getting_started_match else ""

# 4. Skor & Peluang (from 2. HERO METRICS & TARGET)
skor_match = re.search(r'\{/\* Skor SNBT \*/\}(.*?)</motion\.button>', content, re.DOTALL)
skor_code = "{/* Skor SNBT */}" + skor_match.group(1) + "</motion.button>" if skor_match else ""

peluang_match = re.search(r'\{/\* Peluang Lulus \*/\}(.*?)</motion\.div>\n\s*<motion\.div variants=\{fadeUp\} className="bg-purple-500', content, re.DOTALL)
peluang_code = "{/* Peluang Lulus */}" + peluang_match.group(1) + "</motion.div>" if peluang_match else ""

# 5. Target Harian (from 2. HERO METRICS & TARGET)
target_match = re.search(r'(<motion\.div variants=\{fadeUp\} className="bg-purple-500 text-white shadow-\[0_4px_20px_rgba\(168,85,247,0\.25\)\].*?Target Harian.*?Mulai Latihan.*?)</motion\.div>\n\s*</motion\.div>', content, re.DOTALL)
target_code = target_match.group(1) + "</motion.div>" if target_match else ""

# 6. Aktivitas Terakhir (from 3. AKTIVITAS & STATS)
aktivitas_match = re.search(r'\{/\* Aktivitas Terakhir \*/\}(.*?)</motion\.div>\n\n\s*\{/\* Stats Summary \*/\}', content, re.DOTALL)
aktivitas_code = "{/* Aktivitas Terakhir */}" + aktivitas_match.group(1) + "</motion.div>" if aktivitas_match else ""

# 7. Stats Summary (from 3. AKTIVITAS & STATS)
stats_match = re.search(r'\{/\* Stats Summary \*/\}(.*?)</motion\.div>\n\s*</motion\.div>', content, re.DOTALL)
stats_code = "{/* Stats Summary */}" + stats_match.group(1) + "</motion.div>" if stats_match else ""

# ASSEMBLE NEW LAYOUT

new_layout = f"""{header_code}

      {{/* ═══ 1. HERO LEVEL (PRIORITAS UTAMA) ═══ */}}
      <motion.div variants={{stagger}} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {skor_code}
        {peluang_code}
      </motion.div>

      {{/* ═══ 2. ALERTS & GUIDES ═══ */}}
      {alert_code}
      {getting_started_code}

      {{/* ═══ 3. ACTION & STATS LEVEL (PRIORITAS KEDUA) ═══ */}}
      <motion.div variants={{stagger}} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {target_code}
        {stats_code}
      </motion.div>

      {{/* ═══ 4. HISTORY LEVEL (PRIORITAS KETIGA) ═══ */}}
      <motion.div variants={{stagger}} className="grid grid-cols-1 gap-6">
        {aktivitas_code}
      </motion.div>
"""

# REPLACE IN FILE
# We replace from the Header comment all the way to the end of AKTIVITAS & STATS
content = re.sub(r'\{/\* ─── Header ─── \*/\}.*?\{/\* Stats Summary \*/\}.*?</motion\.div>\n      </motion\.div>', new_layout, content, flags=re.DOTALL)

with open("src/app/(app)/dashboard/DashboardClient.tsx", "w") as f:
    f.write(content)

