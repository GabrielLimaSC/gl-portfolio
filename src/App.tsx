import Window from './components/Window/Window'
import { useWindowStore } from './store/windowStore'

const App = () => {
  const { openWindow } = useWindowStore()

  return (
    <div>
      <button onClick={() => openWindow('auth')}>Abrir Auth</button>
      <button onClick={() => openWindow('portfolio')}>Abrir Portfolio</button>

      <Window id="auth">
        <p>Conteúdo do Auth aqui</p>
      </Window>

      <Window id="portfolio">
        <p>Conteúdo do Portfolio aqui</p>
      </Window>
    </div>
  )
}

export default App