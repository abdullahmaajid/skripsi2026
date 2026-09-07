import re

with open('src/components/layout/AIChatPanel.tsx', 'r') as f:
    content = f.read()

# We need to replace the entire `if (selectedQuestion) { ... }` block inside the useEffect.
# The block starts at `if (selectedQuestion) {` and ends before `} else { setMessages([ ... "Hai! Ketik/Paste soal..."`

# Let's use replace_file_content to replace exactly the lines.
