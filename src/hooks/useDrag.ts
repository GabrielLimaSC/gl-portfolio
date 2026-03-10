import { useRef, useCallback } from 'react'
import type { WindowId } from '../types'
import { useWindowStore } from '../store/windowStore'

export const useDrag = (id: WindowId, initialX: number, initialY: number) => {
  const moveWindow = useWindowStore((state) => state.moveWindow)
  const focusWindow = useWindowStore((state) => state.focusWindow)

  const isDragging = useRef(false)
  const offset = useRef({ x: 0, y: 0 })

  const onMouseDown = useCallback(
    (e: React.MouseEvent) => {
      isDragging.current = true
      offset.current = {
        x: e.clientX - initialX,
        y: e.clientY - initialY,
      }
      focusWindow(id)

      const onMouseMove = (e: MouseEvent) => {
        if (!isDragging.current) return
        moveWindow(
          id,
          Math.max(0, e.clientX - offset.current.x),
          Math.max(0, e.clientY - offset.current.y)
        )
      }

      const onMouseUp = () => {
        isDragging.current = false
        window.removeEventListener('mousemove', onMouseMove)
        window.removeEventListener('mouseup', onMouseUp)
      }

      window.addEventListener('mousemove', onMouseMove)
      window.addEventListener('mouseup', onMouseUp)
    },
    [id, initialX, initialY, moveWindow, focusWindow]
  )

  return { onMouseDown }
}