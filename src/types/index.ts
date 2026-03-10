export type WindowId = 'auth' | 'portfolio'

export interface WindowState {
  id: WindowId
  title: string
  icon: string
  isOpen: boolean
  isMinimized: boolean
  isFocused: boolean
  position: { x: number; y: number }
  defaultPosition: { x: number; y: number }
}

// TO DO: useTimeOfDay
export type TimePhase = 'dawn' | 'morning' | 'afternoon' | 'dusk' | 'night'

export interface TimeOfDay {
  isDaytime: boolean
  phase: TimePhase
  celestialX: number
  celestialY: number
}