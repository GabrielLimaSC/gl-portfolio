import Desktop from './components/Desktop/Desktop'
import Taskbar from './components/Taskbar/Taskbar'
import Window from './components/Window/Window'
import DesktopIcon from './components/DesktopIcon/DesktopIcon'

const App = () => {
  return (
    <>
      <Desktop />

      <DesktopIcon id="auth"      label={"JWT_AUTH"}  emoji="🔑" position={{ x: 30,  y: 28 }} />
      <DesktopIcon id="portfolio" label={"PORTFOLIO"} emoji="📁" position={{ x: 116, y: 28 }} />

      <Window id="auth">
        <p>Auth aqui</p>
      </Window>
      <Window id="portfolio">
        <p>Portfolio aqui</p>
      </Window>

      <Taskbar />
    </>
  )
}

export default App