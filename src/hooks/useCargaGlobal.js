// Devuelve cuántas peticiones hay en curso en toda la aplicación.
import { useSyncExternalStore } from 'react'
import { suscribir, leerPendientes } from '../servicios/estadoCarga.js'

export default function useCargaGlobal() {
  return useSyncExternalStore(suscribir, leerPendientes)
}
