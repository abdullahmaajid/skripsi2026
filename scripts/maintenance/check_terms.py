import re
from pathlib import Path
from collections import defaultdict

terms_to_check = [
    r'AI Tutor', r'Tutor AI', r'AI-Tutor',
    r'Tryout', r'TryOut', r'Try Out',
    r'Next\.js', r'Next JS', r'Nextjs',
    r'Groq API', r'Groq',
    r'UTBK-SNBT', r'UTBK SNBT',
    r'Intelligent Tutoring System', r'ITS',
    r'Chancing Engine', r'Learning Path', r'Personal Plan',
    r'Mode Belajar', r'Mode Tryout', r'Socratic Scaffolding'
]

files = ['bab1.md', 'bab2.md', 'bab3.md', 'bab4.md', 'bab5.md']
base_dir = Path('/Users/abdullahmaajid/Downloads/polariusmain/projects/utbkapp/docs/skripsi')

results = defaultdict(lambda: defaultdict(int))

for filename in files:
    file_path = base_dir / filename
    if not file_path.exists():
        continue
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
        for term in terms_to_check:
            count = len(re.findall(term, content, flags=re.IGNORECASE))
            if count > 0:
                results[filename][term] = count

for filename in files:
    print(f"\n--- {filename} ---")
    for term, count in results[filename].items():
        print(f"{term}: {count}")

