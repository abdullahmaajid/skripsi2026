import re

with open('src/lib/ai/scaffolding.ts', 'r') as f:
    text = f.read()

# Replace any character outside standard printable ascii with a space just in case
cleaned = ""
for char in text:
    if ord(char) < 32 and char not in ['\n', '\r', '\t']:
        cleaned += ' '
    else:
        cleaned += char

with open('src/lib/ai/scaffolding.ts', 'w') as f:
    f.write(cleaned)
print("Cleaned invisible characters")
