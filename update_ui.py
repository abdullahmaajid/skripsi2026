import re

with open('src/components/layout/AIChatPanel.tsx', 'r') as f:
    content = f.read()

# Replace Attempt 1
content = re.sub(
r'\} else if \(selectedQuestion\.attemptCount === 1\) \{.*?printPrettyAILog\(data\.aiLog\);\s*\}\)\.catch\(err => console\.error\("AI Log error:", err\)\);',
r'''} else if (selectedQuestion.attemptCount === 1) {
          setMessages([
            {
              role: "assistant",
              content: `Sedang menyusun Socratic Hint...`,
            },
          ]);
          setScaffoldLevel("SOCRATIC");
          setLoading(true);
          fetch("/api/tutor/ask", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              questionId: selectedQuestion.questionId,
              question: selectedQuestion.text,
              studentAnswer: selectedQuestion.selectedAnswer,
              correctAnswer: selectedQuestion.correctAnswer,
              currentLevel: "SOCRATIC",
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

# Replace Attempt 2
content = re.sub(
r'\} else if \(selectedQuestion\.attemptCount === 2\) \{.*?printPrettyAILog\(data\.aiLog\);\s*\}\)\.catch\(err => console\.error\("AI Log error:", err\)\);',
r'''} else if (selectedQuestion.attemptCount === 2) {
          setMessages([
            {
              role: "assistant",
              content: `Sedang menyusun Step-by-Step Guidance...`,
            },
          ]);
          setScaffoldLevel("HINT");
          setLoading(true);
          fetch("/api/tutor/ask", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              questionId: selectedQuestion.questionId,
              question: selectedQuestion.text,
              studentAnswer: selectedQuestion.selectedAnswer,
              correctAnswer: selectedQuestion.correctAnswer,
              currentLevel: "HINT",
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

print("Updated AI Chat UI logic")
