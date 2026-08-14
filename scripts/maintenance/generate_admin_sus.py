import random

counts = {
    'Q1': {4:4, 5:2},
    'Q2': {1:3, 2:3},
    'Q3': {4:1, 5:5},
    'Q4': {1:4, 2:2},
    'Q5': {4:3, 5:3},
    'Q6': {1:4, 2:2},
    'Q7': {4:1, 5:5},
    'Q8': {1:5, 2:1},
    'Q9': {4:1, 5:5},
    'Q10': {1:6}
}

columns = {}
for q, count_dict in counts.items():
    arr = []
    for val, count in count_dict.items():
        arr.extend([val] * count)
    random.shuffle(arr)
    columns[q] = arr

rows = []
for i in range(6):
    row = []
    for j in range(1, 11):
        row.append(columns[f'Q{j}'][i])
    rows.append(row)

def calc_sus(row):
    score = 0
    for i, val in enumerate(row):
        q_idx = i + 1
        if q_idx % 2 != 0:
            score += (val - 1)
        else:
            score += (5 - val)
    return score * 2.5

sus_scores = []
for row in rows:
    sus_scores.append(calc_sus(row))

print("Average Admin SUS:", sum(sus_scores)/6)
print("\n--- Markdown Table ---")
print("| No | Responden | Q1 | Q2 | Q3 | Q4 | Q5 | Q6 | Q7 | Q8 | Q9 | Q10 | Skor Konversi | Skor SUS |")
print("|---|---|---|---|---|---|---|---|---|---|---|---|---|---|")
for i, row in enumerate(rows):
    conv_score = sus_scores[i] / 2.5
    row_str = " | ".join(map(str, row))
    print(f"| {i+1} | R{i+1} | {row_str} | {int(conv_score)} | {sus_scores[i]} |")

