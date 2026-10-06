import { use } from "react"
import PracticeSession from "@/components/practice/PracticeSession"

export default function LearningPathPracticePage({ params }: { params: Promise<{ subjectId: string }> }) {
  const { subjectId } = use(params)
  
  return <PracticeSession subjectId={subjectId} source="learning-path" />
}
