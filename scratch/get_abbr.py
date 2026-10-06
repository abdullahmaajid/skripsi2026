import re
import glob
import os

files = glob.glob('docs/skripsi/bab*.md')
abbreviations = {}

pattern = re.compile(r'\b([A-Z][a-zA-Z\s\-]+)\s+\(([A-Z]{2,})\)')
pattern2 = re.compile(r'\b([A-Z]{2,})\b')

for f in files:
    with open(f, 'r', encoding='utf-8') as file:
        text = file.read()
        
        # Match "Intelligent Tutoring System (ITS)"
        matches = pattern.findall(text)
        for full, abbr in matches:
            abbreviations[abbr] = full.strip()
            
        # Match standalone acronyms
        for abbr in pattern2.findall(text):
            if abbr not in abbreviations:
                abbreviations[abbr] = "UNKNOWN"

for k in sorted(abbreviations.keys()):
    if len(k) > 1 and not k.isnumeric():
        print(f"{k}: {abbreviations[k]}")
