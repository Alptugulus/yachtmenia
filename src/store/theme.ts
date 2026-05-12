import { create } from 'zustand'

const STORAGE_KEY = 'yachtmenia.theme'

export type ThemeMode = 'light' | 'dark' | 'system'

function readStored(): ThemeMode {
  if (typeof window === 'undefined') return 'system'
  try {
    const v = localStorage.getItem(STORAGE_KEY)
    if (v === 'light' || v === 'dark' || v === 'system') return v
  } catch {
    /* ignore */
  }
  return 'system'
}

export const useThemeStore = create<{
  mode: ThemeMode
  setMode: (m: ThemeMode) => void
}>((set) => ({
  mode: readStored(),
  setMode: (mode) => {
    try {
      localStorage.setItem(STORAGE_KEY, mode)
    } catch {
      /* ignore */
    }
    set({ mode })
  },
}))
