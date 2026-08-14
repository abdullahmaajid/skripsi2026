import re
from pathlib import Path

files = ['bab1.md', 'bab2.md', 'bab3.md', 'bab4.md', 'bab5.md']
base_dir = Path('/Users/abdullahmaajid/Downloads/polariusmain/projects/utbkapp/docs/skripsi')

replacements = [
    (r'\bTryOut\b', 'Tryout'),
    (r'\btryOut\b', 'tryout'),
    (r'\bTry Out\b', 'Tryout'),
    (r'\btry out\b', 'tryout'),
    (r'\bUTBK-SNBT\b', 'UTBK SNBT'),
    (r'\bNextjs\b', 'Next.js'),
    (r'\bNext JS\b', 'Next.js'),
    (r'\bTutor AI\b', 'AI Tutor')
]

for filename in files:
    file_path = base_dir / filename
    if not file_path.exists():
        continue
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    for pattern, repl in replacements:
        content = re.sub(pattern, repl, content) # case-sensitive for these specific patterns
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)

print("Terminology standardized.")
