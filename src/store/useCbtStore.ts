import { create } from 'zustand'

export interface Option {
  id: string
  label: string
  text: string
}

export interface Question {
  id: string
  text: string
  options: Option[]
  type: 'MULTIPLE_CHOICE' | 'MULTIPLE_SELECT' | 'TRUE_FALSE'
  subject: string // Subtest name
}

export interface Section {
  subjectName: string
  duration: number // in minutes
  itemCount: number
}

interface CbtState {
  questions: Question[]
  sections: Section[]
  currentSectionIndex: number
  currentIndex: number
  answers: Record<string, string[]> // questionId -> array of selected optionIds
  flagged: Record<string, boolean> // questionId -> is flagged
  timeLeft: number // in seconds (global, optional)
  sectionTimeLeft: number // in seconds (current subtest timer)
  isFinished: boolean
  questionTimes: Record<string, number> // questionId -> seconds spent on this question
  lastQuestionTimestamp: number // timestamp when current question was navigated to
  
  attemptId: string | null
  isAdaptive: boolean
  totalItems: number
  
  // Actions
  initExam: (
    attemptId: string,
    questions: Question[],
    durationMinutes: number,
    isAdaptive?: boolean,
    totalItems?: number,
    sections?: Section[]
  ) => void
  appendQuestion: (q: Question) => void
  decrementTime: () => void
  nextQuestion: () => void
  prevQuestion: () => void
  goToQuestion: (index: number) => void
  moveToNextSection: () => void
  toggleAnswer: (questionId: string, optionId: string, isMulti?: boolean) => void
  toggleFlag: (questionId: string) => void
  finishExam: () => void
  resetExam: () => void
}

function trackTimeOnCurrentQuestion(state: CbtState): Record<string, number> {
  if (state.questions.length === 0) return state.questionTimes
  const currentQ = state.questions[state.currentIndex]
  if (!currentQ) return state.questionTimes
  const now = Date.now()
  const elapsed = Math.round((now - state.lastQuestionTimestamp) / 1000)
  return {
    ...state.questionTimes,
    [currentQ.id]: (state.questionTimes[currentQ.id] || 0) + elapsed,
  }
}

export const useCbtStore = create<CbtState>((set) => ({
  attemptId: null,
  isAdaptive: false,
  totalItems: 0,
  questions: [],
  sections: [],
  currentSectionIndex: 0,
  currentIndex: 0,
  answers: {},
  flagged: {},
  timeLeft: 0,
  sectionTimeLeft: 0,
  isFinished: false,
  questionTimes: {},
  lastQuestionTimestamp: Date.now(),

  initExam: (attemptId, questions, durationMinutes, isAdaptive = false, totalItems = questions.length, sections = []) => set({
    attemptId,
    isAdaptive,
    totalItems,
    questions,
    sections,
    currentSectionIndex: 0,
    currentIndex: 0,
    answers: {},
    flagged: {},
    timeLeft: durationMinutes * 60,
    sectionTimeLeft: sections.length > 0 ? sections[0].duration * 60 : durationMinutes * 60,
    isFinished: false,
    questionTimes: {},
    lastQuestionTimestamp: Date.now(),
  }),

  decrementTime: () => set((state) => {
    if (state.isFinished) return state

    const nextTimeLeft = Math.max(0, state.timeLeft - 1)
    const nextSectionTimeLeft = state.sectionTimeLeft - 1

    if (nextSectionTimeLeft <= 0) {
      // Current section time is up! Auto-advance or finish
      const hasNextSection = state.sections && state.currentSectionIndex < state.sections.length - 1
      const updatedTimes = trackTimeOnCurrentQuestion(state)
      
      if (hasNextSection) {
        const nextSecIndex = state.currentSectionIndex + 1
        const targetSubjectName = state.sections[nextSecIndex].subjectName
        const nextQuestionIdx = state.questions.findIndex(q => q.subject === targetSubjectName)
        const finalIdx = nextQuestionIdx !== -1 ? nextQuestionIdx : Math.min(state.questions.length - 1, state.currentIndex + 1)

        return {
          currentSectionIndex: nextSecIndex,
          sectionTimeLeft: state.sections[nextSecIndex].duration * 60,
          currentIndex: finalIdx,
          timeLeft: nextTimeLeft,
          questionTimes: updatedTimes,
          lastQuestionTimestamp: Date.now(),
        }
      } else {
        // No more sections: finish exam
        return {
          timeLeft: 0,
          sectionTimeLeft: 0,
          isFinished: true,
          questionTimes: updatedTimes
        }
      }
    }

    return {
      timeLeft: nextTimeLeft,
      sectionTimeLeft: nextSectionTimeLeft
    }
  }),

  appendQuestion: (q) => set((state) => ({
    questions: [...state.questions, q],
  })),

  nextQuestion: () => set((state) => {
    const nextIdx = state.currentIndex + 1
    if (nextIdx >= state.questions.length) return state

    // Block moving to next question if it crosses section boundaries
    const currentSubject = state.sections[state.currentSectionIndex]?.subjectName
    if (currentSubject && state.questions[nextIdx].subject !== currentSubject) {
      return state
    }

    const updatedTimes = trackTimeOnCurrentQuestion(state)
    return { 
      currentIndex: nextIdx,
      questionTimes: updatedTimes,
      lastQuestionTimestamp: Date.now(),
    }
  }),

  prevQuestion: () => set((state) => {
    const prevIdx = state.currentIndex - 1
    if (prevIdx < 0) return state

    // Block moving to previous question if it crosses section boundaries
    const currentSubject = state.sections[state.currentSectionIndex]?.subjectName
    if (currentSubject && state.questions[prevIdx].subject !== currentSubject) {
      return state
    }

    const updatedTimes = trackTimeOnCurrentQuestion(state)
    return { 
      currentIndex: prevIdx,
      questionTimes: updatedTimes,
      lastQuestionTimestamp: Date.now(),
    }
  }),

  goToQuestion: (index) => set((state) => {
    // Block direct jump if it crosses section boundaries
    const targetQ = state.questions[index]
    const currentSubject = state.sections[state.currentSectionIndex]?.subjectName
    if (currentSubject && targetQ && targetQ.subject !== currentSubject) {
      return state
    }

    const updatedTimes = trackTimeOnCurrentQuestion(state)
    return { 
      currentIndex: index,
      questionTimes: updatedTimes,
      lastQuestionTimestamp: Date.now(),
    }
  }),

  moveToNextSection: () => set((state) => {
    if (state.currentSectionIndex >= state.sections.length - 1) {
      // Last section: finish exam
      const updatedTimes = trackTimeOnCurrentQuestion(state)
      return { isFinished: true, questionTimes: updatedTimes }
    }

    const nextSecIndex = state.currentSectionIndex + 1
    const targetSubjectName = state.sections[nextSecIndex].subjectName
    const nextQuestionIdx = state.questions.findIndex(q => q.subject === targetSubjectName)
    const finalIdx = nextQuestionIdx !== -1 ? nextQuestionIdx : state.currentIndex
    const updatedTimes = trackTimeOnCurrentQuestion(state)

    return {
      currentSectionIndex: nextSecIndex,
      sectionTimeLeft: state.sections[nextSecIndex].duration * 60,
      currentIndex: finalIdx,
      questionTimes: updatedTimes,
      lastQuestionTimestamp: Date.now(),
    }
  }),
  
  toggleAnswer: (questionId, optionId, isMulti = false) => set((state) => {
    const currentAnswers = state.answers[questionId] || [];
    let newAnswers;
    
    if (!isMulti) {
      newAnswers = [optionId];
    } else {
      if (currentAnswers.includes(optionId)) {
        newAnswers = currentAnswers.filter(id => id !== optionId);
      } else {
        newAnswers = [...currentAnswers, optionId];
      }
    }
    
    return {
      answers: {
        ...state.answers,
        [questionId]: newAnswers
      }
    };
  }),
  
  toggleFlag: (questionId) => set((state) => ({
    flagged: {
      ...state.flagged,
      [questionId]: !state.flagged[questionId]
    }
  })),
  
  finishExam: () => set((state) => {
    const updatedTimes = trackTimeOnCurrentQuestion(state)
    return { isFinished: true, questionTimes: updatedTimes }
  }),
  
  resetExam: () => set({
    attemptId: null,
    isAdaptive: false,
    totalItems: 0,
    questions: [],
    sections: [],
    currentSectionIndex: 0,
    currentIndex: 0,
    answers: {},
    flagged: {},
    timeLeft: 0,
    sectionTimeLeft: 0,
    isFinished: false,
    questionTimes: {},
    lastQuestionTimestamp: Date.now(),
  })
}))
