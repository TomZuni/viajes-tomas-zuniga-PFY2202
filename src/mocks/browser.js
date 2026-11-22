// Arranca el servidor mock dentro del navegador (Service Worker).
import { setupWorker } from 'msw/browser'
import { handlers } from './handlers.js'

export const worker = setupWorker(...handlers)

export function iniciarMock() {
  return worker.start({
    // El archivo del worker está en /public. BASE_URL funciona también en GitHub Pages.
    serviceWorker: { url: `${import.meta.env.BASE_URL}mockServiceWorker.js` },
    onUnhandledRequest: 'bypass', // lo que no es de la API (imágenes, fuentes, etc.) pasa normal
    quiet: true,
  })
}
