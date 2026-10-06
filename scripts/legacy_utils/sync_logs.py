import re

# Update scaffolding.ts
with open('src/lib/ai/scaffolding.ts', 'r') as f:
    scaffolding = f.read()

scaffolding = scaffolding.replace(
'''    const logData = {
      mode: "SCAFFOLDING",
      level,
      timestamp: new Date().toLocaleString('id-ID'),
      latencyMs: duration,
      models: shuffledModels,
      usage: data.usage,
      messages: messages,
      output: data.choices[0].message.content
    }''', 
'''    const logData = {
      mode: "SCAFFOLDING",
      level,
      timestamp: new Date().toLocaleString('id-ID'),
      latencyMs: duration,
      models: shuffledModels,
      usage: data.usage,
      messages: messages,
      output: data.choices[0].message.content,
      question_id: question.substring(0, 15) + "...", // approx
      attempt: attemptCount,
      answer_status: detectMsg,
      strategy: strategyName,
      analisis_internal: messages.map(m => `[${m.role.toUpperCase()}]\\n${m.content}`).join('\\n\\n')
    }''')

with open('src/lib/ai/scaffolding.ts', 'w') as f:
    f.write(scaffolding)

# Update AIChatPanel.tsx
with open('src/components/layout/AIChatPanel.tsx', 'r') as f:
    panel = f.read()

panel = re.sub(
r'console\.log\(`%cLevel.*?console\.log\(aiLog\.messages\);',
r'''console.log(`%cQuestion ID:%c ${aiLog.question_id || 'N/A'}`, "font-weight: bold; color: #0a84ff;", "color: inherit;");
  console.log(`%cAttempt:%c ${aiLog.attempt || 'N/A'}`, "font-weight: bold; color: #0a84ff;", "color: inherit;");
  console.log(`%cAnswer Status:%c ${aiLog.answer_status || 'N/A'}`, "font-weight: bold; color: #0a84ff;", "color: inherit;");
  console.log(`%cSelected Strategy:%c ${aiLog.strategy || 'N/A'}`, "font-weight: bold; color: #0a84ff;", "color: inherit;");
  
  console.log("%c-------------------------------------------", "color: gray;");
  console.log(`%c[Analysis Internal]:\\n%c${aiLog.analisis_internal || JSON.stringify(aiLog.messages, null, 2)}`, "color: gray; font-style: italic; font-weight: bold;", "color: inherit; font-style: normal;");''', panel, flags=re.DOTALL)

with open('src/components/layout/AIChatPanel.tsx', 'w') as f:
    f.write(panel)

print("Updated formatting")
