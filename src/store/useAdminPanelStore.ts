import { create } from 'zustand'
import { ReactNode } from 'react'

interface AdminPanelState {
  isOpen: boolean
  content: ReactNode | null
  openPanel: (content: ReactNode) => void
  closePanel: () => void
}

export const useAdminPanelStore = create<AdminPanelState>((set) => ({
  isOpen: false,
  content: null,
  openPanel: (content) => set({ isOpen: true, content }),
  closePanel: () => set({ isOpen: false, content: null }),
}))
