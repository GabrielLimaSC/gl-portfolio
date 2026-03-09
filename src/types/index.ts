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