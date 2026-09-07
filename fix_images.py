import sys
import re

with open('scratch/act_diagram.md', 'r') as f:
    replacement = f.read()

with open('docs/skripsi/bab3.md', 'r') as f:
    lines = f.readlines()

start_idx = -1
end_idx = -1

for i, line in enumerate(lines):
    if line.startswith('### 3.3.2 Activity Diagram'):
        start_idx = i
    elif line.startswith('### 3.3.3 Perancangan Basis Data'):
        end_idx = i
        break

if start_idx != -1 and end_idx != -1:
    # Get the lines after the activity diagram
    tail = lines[end_idx:]
    tail_text = ''.join(tail)
    
    # Replace Gambar references in tail
    tail_text = re.sub(r'Gambar 3\.6\b', 'Gambar 3.66', tail_text)
    tail_text = re.sub(r'Gambar 3\.5\b', 'Gambar 3.65', tail_text)
    tail_text = re.sub(r'Gambar 3\.4\b', 'Gambar 3.64', tail_text)
    
    new_lines = lines[:start_idx] + [replacement, '\n\n'] + [tail_text]
    with open('docs/skripsi/bab3.md', 'w') as f:
        f.writelines(new_lines)
    print("Success")
else:
    print("Could not find sections")

