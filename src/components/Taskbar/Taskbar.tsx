import { useEffect, useState } from 'react'
import { useWindowStore } from '../../store/windowStore'
import type { WindowId } from '../../types'
import styles from './Taskbar.module.css'

const Taskbar = () => {
  const { windows, openWindow, minimizeWindow, focusWindow } = useWindowStore()
  const [time, setTime] = useState('')

  useEffect(() => {
    const update = () => {
      setTime(new Date().toLocaleTimeString('pt-BR', { hour12: false }))
    }
    update()
    const interval = setInterval(update, 1000)
    return () => clearInterval(interval)
  }, [])

  const handleTaskbarClick = (id: WindowId) => {
    const win = windows[id]
    if (!win.isOpen) return
    if (win.isMinimized || !win.isFocused) {
      openWindow(id)
      focusWindow(id)
    } else {
      minimizeWindow(id)
    }
  }

  return (
    <div className={styles.taskbar}>

      <button className={styles.start}>
        ⬛ GL_OS
      </button>

      <div className={styles.apps}>
        {(Object.values(windows)).map((win) => (
          win.isOpen && (
            <div
              key={win.id}
              className={`${styles.appBtn} ${win.isFocused ? styles.active : ''}`}
              onClick={() => handleTaskbarClick(win.id)}
            >
              {win.icon} {win.title}
            </div>
          )
        ))}
      </div>

      <div className={styles.copyright}>
        © 2026 Gabriel Lima — Recife, BR
      </div>

      <div className={styles.clock}>
        {time}
      </div>

    </div>
  )
}

export default Taskbar