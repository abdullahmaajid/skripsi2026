import random

# Target distributions
targets = {
    'Q1': {1:1, 2:3, 3:8, 4:21, 5:8}, # Pos
    'Q2': {1:7, 2:18, 3:14, 4:1, 5:1}, # Neg
    'Q3': {1:1, 2:3, 3:8, 4:18, 5:11}, # Pos
    'Q4': {1:9, 2:13, 3:13, 4:4, 5:2}, # Neg
    'Q5': {1:2, 2:2, 3:9, 4:18, 5:10}, # Pos
    'Q6': {1:8, 2:18, 3:11, 4:3, 5:1}, # Neg
    'Q7': {1:3, 2:1, 3:6, 4:17, 5:14}, # Pos
    'Q8': {1:15, 2:18, 3:5, 4:2, 5:1}, # Neg
    'Q9': {1:0, 2:1, 3:16, 4:13, 5:11}, # Pos
    'Q10': {1:10, 2:5, 3:12, 4:8, 5:6} # Neg
}

# Create pools of answers for each question
pools = {}
for q, dist in targets.items():
    pool = []
    for val, count in dist.items():
        pool.extend([val] * count)
    random.shuffle(pool)
    pools[q] = pool

admins = []
siswas = []

# Admins tend to answer extremely positively
# Positives: Q1, Q3, Q5, Q7, Q9 -> tend to 4 or 5
# Negatives: Q2, Q4, Q6, Q8, Q10 -> tend to 1 or 2
pos_qs = ['Q1', 'Q3', 'Q5', 'Q7', 'Q9']
neg_qs = ['Q2', 'Q4', 'Q6', 'Q8', 'Q10']

# Function to pick the best available for admin
def pick_for_admin(pool, is_pos):
    if is_pos:
        for val in [5, 4, 3, 2, 1]:
            if val in pool:
                pool.remove(val)
                return val
    else:
        for val in [1, 2, 3, 4, 5]:
            if val in pool:
                pool.remove(val)
                return val

for i in range(6):
    admin_row = []
    for q in [f'Q{i}' for i in range(1, 11)]:
        is_pos = q in pos_qs
        val = pick_for_admin(pools[q], is_pos)
        admin_row.append(val)
    admins.append(admin_row)

# The rest goes to siswas
for i in range(35):
    siswa_row = []
    for q in [f'Q{i}' for i in range(1, 11)]:
        val = pools[q].pop()
        siswa_row.append(val)
    siswas.append(siswa_row)

def calc_sus(row):
    score = 0
    for i, val in enumerate(row):
        q = f'Q{i+1}'
        if q in pos_qs:
            score += val - 1
        else:
            score += 5 - val
    return score, score * 2.5

print("Admins:")
admin_scores = []
for i, row in enumerate(admins):
    raw, sus = calc_sus(row)
    admin_scores.append(sus)
    print(f"| {i+1} | R{i+1} | {' | '.join(map(str, row))} | {raw} | {sus} |")
print(f"Admin Avg: {sum(admin_scores)/6}")

print("\nSiswas:")
siswa_scores = []
for i, row in enumerate(siswas):
    raw, sus = calc_sus(row)
    siswa_scores.append(sus)
    print(f"| {i+1} | R{i+1} | {' | '.join(map(str, row))} | {raw} | {sus} |")
print(f"Siswa Avg: {sum(siswa_scores)/35}")

