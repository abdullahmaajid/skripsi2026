import re

with open('src/components/layout/AIChatPanel.tsx', 'r') as f:
    content = f.read()

# Replace isCorrect
content = re.sub(
r'if \(isCorrect\) \{.*?printPrettyAILog\(data\.aiLog\);\s*\}\)\.catch\(err => console\.error\("AI Log error:", err\)\);',
r'''if (isCorrect) {
          setMessages([
            {
              role: "assistant",
              content: `Sedang menyusun Positive Reinforcement...`,
            },
          ]);
          setScaffoldLevel("SOLUTION");
          setLoading(true);
          
          fetch("/api/tutor/ask", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              questionId: selectedQuestion.questionId,
              question: selectedQuestion.text,
              studentAnswer: selectedQuestion.selectedAnswer,
              correctAnswer: selectedQuestion.correctAnswer,
              currentLevel: "SOLUTION",
              history: []
            })
          }).then(res => res.json()).then(data => {
            printPrettyAILog(data.aiLog);
            setMessages([
              {
                role: "assistant",
                content: data.response,
              },
            ]);
          }).catch(err => console.error("AI Log error:", err)).finally(() => setLoading(false));''', content, flags=re.DOTALL)

with open('src/components/layout/AIChatPanel.tsx', 'w') as f:
    f.write(content)

print("Updated isCorrect block")
