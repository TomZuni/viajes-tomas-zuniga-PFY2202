// Punto de entrada. Primero se encienden los servidores mock (REST y GraphQL) y luego se dibuja la aplicación,
// para que ninguna petición salga antes de que las APIs falsas estén listas.
// HashRouter usa rutas con "#", así el sitio funciona en GitHub Pages aunque se recargue la página.
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from './App.jsx'
import './styles/app.css'

function dibujar(mockFallo) {
  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <HashRouter>
        <App mockFallo={mockFallo} />
      </HashRouter>
    </StrictMode>,
  )
}

// import() carga los mocks en un archivo aparte, así el código de la agencia queda liviano.
// Si el navegador no permite el Service Worker (por ejemplo, ventana privada), la app igual se dibuja y avisa.
import('./mocks/browser.js')
  .then(({ iniciarMock }) => iniciarMock())
  .then(() => dibujar(false))
  .catch((error) => {
    console.error('No se pudo iniciar el servidor mock:', error)
    dibujar(true)
  })
