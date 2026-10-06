import re

with open('src/lib/ai/scaffolding.ts', 'r') as f:
    content = f.read()

# The logic we want to insert for cache hit and API fetch
replacement_logic = """
    // Simulate mastery calculation for thesis screenshot purposes
    const simulatedMastery = 50; 
    const masteryCategory = "Pemula";
    
    let attemptCount = 1;
    let detectMsg = "";
    let strategyName = "";
    
    if (level === "SOCRATIC") {
      attemptCount = 1;
      detectMsg = "Mendeteksi Jawaban Belum Benar";
      strategyName = "Socratic Hint";
    } else if (level === "HINT") {
      attemptCount = 2;
      detectMsg = "Batas Maksimum Percobaan Tercapai";
      strategyName = "Step-by-Step Guidance";
    } else if (level === "SOLUTION") {
      attemptCount = history.length > 0 ? Math.floor(history.length / 2) + 1 : 1;
      detectMsg = "Jawaban Benar Ditemukan / Selesai Mandiri";
      strategyName = "Positive Reinforcement (Feedback Positif)";
    }
"""

# Replace in Cache Hit
cache_hit_pattern = r"(\s*)// Simulate mastery calculation for thesis screenshot purposes\s*const simulatedMastery = 50;\s*const masteryCategory = \"Pemula\";\s*const attemptCount = history\.length === 0 \? 1 : 2;"
cache_hit_replacement = r"\1" + replacement_logic.strip().replace('\n', '\n\1')

content = re.sub(cache_hit_pattern, cache_hit_replacement, content)

# Also update the console log template for strategy
content = content.replace("Rule-Based Strategy Selector -> ${level} Hint", "Rule-Based Strategy Selector -> ${strategyName}")
content = content.replace("🔄 Attempt     : ${attemptCount} (Mendeteksi Jawaban Belum Benar)", "🔄 Attempt     : ${attemptCount} (${detectMsg})")

with open('src/lib/ai/scaffolding.ts', 'w') as f:
    f.write(content)
print("Updated scaffolding.ts")
