import { create } from 'zustand'
import type { WindowId, WindowState } from '../types'

interface WindowStore {
  windows: Record<WindowId, WindowState>
  openWindow: (id: WindowId) => void
  closeWindow: (id: WindowId) => void
  minimizeWindow: (id: WindowId) => void
  focusWindow: (id: WindowId) => void
  moveWindow: (id: WindowId, x: number, y: number) => void
}

const initialWindows: Record<WindowId, WindowState> = {
  auth: {
    id: 'auth',
    title: 'JWT_AUTH',
    icon: '🔑',
    isOpen: false,
    isMinimized: false,
    isFocused: false,
    position: { x: 50, y: 50 },
    defaultPosition: { x: 50, y: 50 },
  },
  portfolio: {
    id: 'portfolio',
    title: 'PORTFOLIO',
    icon: '📁',
    isOpen: false,
    isMinimized: false,
    isFocused: false,
    position: { x: 180, y: 70 },
    defaultPosition: { x: 180, y: 70 },
  },
}

export const useWindowStore = create<WindowStore>((set) => ({
  windows: initialWindows,

  openWindow: (id) =>
    set((state) => ({
      windows: {
        ...state.windows,
        [id]: {
          ...state.windows[id],
          isOpen: true,
          isMinimized: false,
          isFocused: true,
        },
      },
    })),

  closeWindow: (id) =>
    set((state) => ({
      windows: {
        ...state.windows,
        [id]: {
          ...state.windows[id],
          isOpen: false,
          isFocused: false,
        },
      },
    })),

  minimizeWindow: (id) =>
    set((state) => ({
      windows: {
        ...state.windows,
        [id]: {
          ...state.windows[id],
          isMinimized: true,
          isFocused: false,
        },
      },
    })),

  focusWindow: (id) =>
    set((state) => {
      const updated = { ...state.windows }
      // focus in all
      Object.keys(updated).forEach((key) => {
        updated[key as WindowId] = { ...updated[key as WindowId], isFocused: false }
      })
      // focus on click
      updated[id] = { ...updated[id], isFocused: true }
      return { windows: updated }
    }),

  moveWindow: (id, x, y) =>
    set((state) => ({
      windows: {
        ...state.windows,
        [id]: {
          ...state.windows[id],
          position: { x, y },
        },
      },
    })),
}))