import type { WindowId } from '../../types'
import { useWindowStore } from '../../store/windowStore'
import styles from './DesktopIcon.module.css'

interface DesktopIconProps {
  id: WindowId
  label: string
  emoji: string
  position: { x: number; y: number }
}

const DesktopIcon = ({ id, label, emoji, position }: DesktopIconProps) => {
  const { openWindow } = useWindowStore()

  const handleDoubleClick = () => {
    openWindow(id)
  }

  return (
    <div
      className={styles.icon}
      style={{ left: position.x, top: position.y }}
      onDoubleClick={handleDoubleClick}
    >
      <div className={styles.sprite}>
        <span className={styles.emoji}>{emoji}</span>
      </div>
      <span className={styles.label}>{label}</span>
    </div>
  )
}

export default DesktopIcon