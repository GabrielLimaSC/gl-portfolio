import { useRef, useEffect } from 'react'
import type { WindowId } from '../../types'
import { useWindowStore } from '../../store/windowStore'
import { useDrag } from '../../hooks/useDrag'
import styles from './Window.module.css'

interface WindowProps {
  id: WindowId
  children: React.ReactNode
}

const Window = ({ id, children }: WindowProps) => {
  const { windows, closeWindow, minimizeWindow, focusWindow } = useWindowStore()
  const win = windows[id]
  const { onMouseDown } = useDrag(id, win.position.x, win.position.y)
  const isClosing = useRef(false)

  useEffect(() => {
    if (win.isOpen) isClosing.current = false
  }, [win.isOpen])

  if (!win.isOpen && !isClosing.current) return null

  return (
    <div
      className={`${styles.window} ${win.isFocused ? styles.focused : ''} ${win.isOpen ? styles.opening : styles.closing}`}
      style={{ left: win.position.x, top: win.position.y }}
      onMouseDown={() => focusWindow(id)}
    >
      {/* Title Bar */}
      <div className={styles.titlebar} onMouseDown={onMouseDown}>
        <span className={styles.title}>
          {win.icon} {win.title}
        </span>
        <div className={styles.buttons}>
          <button
            className={`${styles.btn} ${styles.minimize}`}
            onMouseDown={(e) => e.stopPropagation()}
            onClick={() => minimizeWindow(id)}
          >
            _
          </button>
          <button
            className={`${styles.btn} ${styles.close}`}
            onMouseDown={(e) => e.stopPropagation()}
            onClick={() => closeWindow(id)}
          >
            ✕
          </button>
        </div>
      </div>

      {/* Content */}
      <div className={styles.body}>
        {children}
      </div>
    </div>
  )
}

export default Window