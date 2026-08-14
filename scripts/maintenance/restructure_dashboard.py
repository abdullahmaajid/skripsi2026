import re

with open("src/app/(app)/dashboard/DashboardClient.tsx", "r") as f:
    content = f.read()

# 1. Extract Target Harian
target_harian_match = re.search(r'(<motion\.div variants=\{fadeUp\} className="bg-purple-500 text-white shadow-\[0_4px_20px_rgba\(168,85,247,0\.25\)\].*?Target Harian.*?</motion\.div>)', content, re.DOTALL)
target_harian_code = target_harian_match.group(1) if target_harian_match else ""

# 2. Extract Hero Metrics (Skor & Peluang)
hero_match = re.search(r'\{/\* ═══ 2\. HERO METRICS \(2 Columns\) ═══ \*/\}.*?<motion\.div variants=\{stagger\} className="grid grid-cols-1 md:grid-cols-2 gap-4">(.*?)</motion\.div>\n\n\s*\{/\* ═══ 3\. ACTIONABLE INSIGHTS', content, re.DOTALL)
hero_inner = hero_match.group(1) if hero_match else ""

# 3. Create New Hero Section (3 Columns)
new_hero_section = f"""{{/* ═══ 2. HERO METRICS & TARGET (3 Columns) ═══ */}}
      <motion.div variants={{stagger}} className="grid grid-cols-1 md:grid-cols-3 gap-4">
{hero_inner}
        {target_harian_code}
      </motion.div>
"""

# 4. Remove Actionable Insights and Radar/Trend sections
# We need to replace from 2. HERO METRICS up to the start of AKTIVITAS & STATS
content = re.sub(r'\{/\* ═══ 2\. HERO METRICS.*?\{/\* ═══ 3\. AKTIVITAS & STATS ═══ \*/\}', new_hero_section + '\n      {/* ═══ 3. AKTIVITAS & STATS ═══ */}', content, flags=re.DOTALL)

# Also remove Radar + Tren Skor
content = re.sub(r'\{/\* ═══ 5\. RADAR \+ TREN SKOR.*?</motion\.div>\n    </motion\.div>', '</motion.div>\n    </motion.div>', content, flags=re.DOTALL)

with open("src/app/(app)/dashboard/DashboardClient.tsx", "w") as f:
    f.write(content)

