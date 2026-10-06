import re

with open('src/components/layout/AIChatPanel.tsx', 'r') as f:
    content = f.read()

helper = """
const printPrettyAILog = (aiLog: any) => {
  if (!aiLog) return;
  console.log("%c===========================================", "color: #bf5af2; font-weight: bold;");
  console.log(`%c🧠 [AI TUTOR LOG - ${aiLog.mode}]`, "color: #bf5af2; font-weight: bold; font-size: 14px;");
  console.log("%c===========================================", "color: #bf5af2; font-weight: bold;");
  
  console.log(`%cLevel:%c ${aiLog.level || 'N/A'}`, "font-weight: bold; color: #0a84ff;", "color: inherit;");
  console.log(`%cLatency:%c ${aiLog.latencyMs || 0}ms`, "font-weight: bold; color: #0a84ff;", "color: inherit;");
  console.log(`%cTokens:%c Prompt (${aiLog.usage?.prompt_tokens}) | Completion (${aiLog.usage?.completion_tokens})`, "font-weight: bold; color: #0a84ff;", "color: inherit;");
  console.log(`%cModels:%c ${aiLog.models?.join(' -> ')}`, "font-weight: bold; color: #0a84ff;", "color: inherit;");
  
  console.log("%c-------------------------------------------", "color: gray;");
  console.log(`%c[Payload / Messages]:`, "color: gray; font-style: italic; font-weight: bold;");
  console.log(aiLog.messages);
  
  console.log("%c-------------------------------------------", "color: gray;");
  console.log(`%c[AI Response]:\\n%c${aiLog.output}`, "color: #32d74b; font-weight: bold;", "color: inherit; font-size: 13px;");
  console.log("%c===========================================", "color: #bf5af2; font-weight: bold;");
};

"""

# Insert helper after the imports
content = re.sub(r'(import .*?\n\n)', r'\1' + helper, content, count=1)

# Replace all occurrences of the if (data.aiLog) block
pattern = r'if \(data\.aiLog\) \{\s*console\.groupCollapsed.*?console\.groupEnd\(\);\s*\}'

content = re.sub(pattern, 'printPrettyAILog(data.aiLog);', content, flags=re.DOTALL)

with open('src/components/layout/AIChatPanel.tsx', 'w') as f:
    f.write(content)

print("Updated AIChatPanel.tsx")
