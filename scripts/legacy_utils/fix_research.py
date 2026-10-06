import re

with open('docs/skripsi/research.md', 'r') as f:
    content = f.read()

content = content.replace("melalui Groq API (bermigrasi dari seri Llama ke **GPT OSS 20B** menyesuaikan dengan siklus pembaruan model dari penyedia layanan) (cloud inference)", "melalui OpenRouter API dengan implementasi strategi Model Fallback (Gemini, Llama, Qwen) (cloud inference)")
content = content.replace("integrasi AI (Groq API)", "integrasi AI (OpenRouter API)")

with open('docs/skripsi/research.md', 'w') as f:
    f.write(content)

print("Updated research.md")
