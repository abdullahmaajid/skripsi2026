import sys

def main():
    with open('docs/skripsi/bab4.md', 'r', encoding='utf-8') as f:
        lines = f.readlines()
        
    # Find the EXACT start of the duplicate section.
    # The duplicate section starts with a literal tab and "Hasil Pengujian" around line 827.
    duplicate_start_idx = -1
    for i, line in enumerate(lines):
        if line.startswith('\tHasil Pengujian') and i > 600:
            duplicate_start_idx = i
            break
            
    if duplicate_start_idx != -1:
        print(f"Found duplicate section starting at line {duplicate_start_idx+1}: {lines[duplicate_start_idx].strip()}")
        # Keep everything BEFORE this duplicate section
        new_lines = lines[:duplicate_start_idx]
        
        with open('docs/skripsi/bab4_clean.md', 'w', encoding='utf-8') as f:
            f.writelines(new_lines)
        print("Cleaned file saved as docs/skripsi/bab4_clean.md")
    else:
        print("Could not find duplicate section.")

if __name__ == '__main__':
    main()
