import sys

def main():
    with open('docs/skripsi/bab4_clean.md', 'r', encoding='utf-8') as f:
        lines = f.readlines()
        
    tiara_idx = -1
    for i, line in enumerate(lines):
        if "PUNYA TIARA" in line:
            tiara_idx = i
            break
            
    if tiara_idx != -1:
        print(f"Found PUNYA TIARA at line {tiara_idx+1}")
        new_lines = lines[:tiara_idx]
        with open('docs/skripsi/bab4.md', 'w', encoding='utf-8') as f:
            f.writelines(new_lines)
        print("Successfully saved final clean version to docs/skripsi/bab4.md")
    else:
        print("PUNYA TIARA not found")

if __name__ == '__main__':
    main()
