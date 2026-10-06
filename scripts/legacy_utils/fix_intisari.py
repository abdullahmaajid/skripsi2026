import re

with open('docs/skripsi/intisari.md', 'r') as f:
    content = f.read()

content = content.replace("melalui Groq API", "melalui OpenRouter API dengan skema Model Fallback")
content = content.replace("through Groq API", "through OpenRouter API with a Model Fallback scheme")

with open('docs/skripsi/intisari.md', 'w') as f:
    f.write(content)

print("Updated intisari.md")
