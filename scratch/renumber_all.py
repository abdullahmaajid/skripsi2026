import re
import sys

def main():
    with open('docs/skripsi/bab4.md', 'r', encoding='utf-8') as f:
        content = f.read()
    
    # We will decrement every Tabel 4.X where X >= 12
    for i in range(12, 25):
        old_str = f"Tabel 4.{i}"
        new_str = f"TEMP_{i-1}"
        content = content.replace(old_str, new_str)
        
    for i in range(12, 25):
        temp_str = f"TEMP_{i-1}"
        final_str = f"Tabel 4.{i-1}"
        content = content.replace(temp_str, final_str)
        
    with open('docs/skripsi/bab4.md', 'w', encoding='utf-8') as f:
        f.write(content)
        
if __name__ == '__main__':
    main()
