import re

with open('src/components/layout/AIChatPanel.tsx', 'r') as f:
    content = f.read()

# Add globalLastFetchedKey at the top, outside the component
if "let globalLastFetchedKey = '';" not in content:
    content = content.replace('export default function AIChatPanel({ onClose }: { onClose?: () => void }) {',
    "let globalLastFetchedKey = '';\n\nexport default function AIChatPanel({ onClose }: { onClose?: () => void }) {")

# Replace prevQuestionRef.current with globalLastFetchedKey
content = content.replace('if (cacheKey !== prevQuestionRef.current) {', 'if (cacheKey !== globalLastFetchedKey) {')
content = content.replace('prevQuestionRef.current = cacheKey;', 'globalLastFetchedKey = cacheKey;')

with open('src/components/layout/AIChatPanel.tsx', 'w') as f:
    f.write(content)

print("Fixed double fetch")
