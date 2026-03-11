import { useState } from 'react'
import Desktop from './components/Desktop/Desktop'
import Taskbar from './components/Taskbar/Taskbar'
import Window from './components/Window/Window'
import DesktopIcon from './components/DesktopIcon/DesktopIcon'
import AuthApp from './components/apps/AuthApp/AuthApp'

const App = () => {
  const [currentToken, setCurrentToken] = useState<string | null>(null)

  return (
    <>
      <Desktop />

      <DesktopIcon id="auth"      label={"JWT_AUTH"}  emoji="🔑" position={{ x: 30,  y: 28 }} />
      <DesktopIcon id="portfolio" label={"PORTFOLIO"} emoji="📁" position={{ x: 116, y: 28 }} />

      <Window id="auth">
        <AuthApp onTokenGenerated={(token) => setCurrentToken(token)} />
      </Window>
      <Window id="portfolio">
        <p style={{ color: 'white' }}>Token atual: {currentToken ?? 'nenhum'}</p>
      </Window>

      <Taskbar />
    </>
  )
}

export default App