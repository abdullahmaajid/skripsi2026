import { create } from 'zustand'

export interface QuestionOption {
  id: string
  label: string
  text: string
  isCorrect: boolean
}

interface TutorChatState {
  // Selected question context
  selectedQuestion: {
    questionId: string
    text: string
    subject: string
    selectedAnswer: string
    correctAnswer: string
    difficulty: number
    options: QuestionOption[]
    selectedIds: string[]
    isSecondChance?: boolean
    autoTriggerExplanation?: boolean
  } | null
  scaffoldLevel: string

  // Actions
  setSelectedQuestion: (q: TutorChatState['selectedQuestion']) => void
  setScaffoldLevel: (level: string) => void
  clearQuestion: () => void
}

export const useTutorChatStore = create<TutorChatState>((set) => ({
  selectedQuestion: null,
  scaffoldLevel: 'SOCRATIC',

  setSelectedQuestion: (q) => set({ selectedQuestion: q, scaffoldLevel: 'SOCRATIC' }),
  setScaffoldLevel: (level) => set({ scaffoldLevel: level }),
  clearQuestion: () => set({ selectedQuestion: null, scaffoldLevel: 'SOCRATIC' }),
}))
