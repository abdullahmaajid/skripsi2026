import re
from pathlib import Path

files = ['bab1.md', 'bab2.md', 'bab3.md', 'bab4.md', 'bab5.md', 'relatedwork.md']
base_dir = Path('/Users/abdullahmaajid/Downloads/polariusmain/projects/utbkapp/docs/skripsi')

citations = set()
pattern1 = re.compile(r'\(([A-Za-z\s,&]+(?:et al\.)?(?:dkk\.)?,\s*[1-2][0-9]{3}[a-z]?)\)')
pattern2 = re.compile(r'([A-Za-z\s,&]+(?:et al\.)?(?:dkk\.)?)\s*\(([1-2][0-9]{3}[a-z]?)\)')

for filename in files:
    file_path = base_dir / filename
    if not file_path.exists():
        continue
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Exclude image/table references like (Gambar 3.1)
    for match in pattern1.findall(content):
        if not re.search(r'Gambar|Tabel', match, re.IGNORECASE):
            citations.add(match.strip())
            
    for match in pattern2.findall(content):
        # match is a tuple (Author, Year)
        author = match[0].strip()
        year = match[1]
        # Filter out common false positives
        if len(author) > 2 and len(author) < 50 and not re.search(r'Gambar|Tabel|Pada|Untuk|Dalam|Dengan|Menurut|Bahwa', author, re.IGNORECASE):
            citations.add(f"{author}, {year}")

for citation in sorted(citations):
    print(citation)

