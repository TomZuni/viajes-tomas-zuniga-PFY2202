// Estado global del viaje que el usuario va armando: destino, vuelo, hotel y noches.
// Con Context + useState, cualquier página (detalle del destino, menú, "Mi viaje") lee y modifica el mismo viaje.
// Con useEffect el viaje se guarda en el navegador para que no se pierda al recargar.
import { createContext, useCallback, useEffect, useMemo, useState } from 'react'

export const ViajeContext = createContext(null)

const CLAVE = 'viajes:mi-viaje'
const VIAJE_VACIO = { destino: null, vuelo: null, hotel: null, noches: 5 }

function leerViajeGuardado() {
  try {
    const guardado = JSON.parse(localStorage.getItem(CLAVE))
    return guardado && typeof guardado === 'object' ? { ...VIAJE_VACIO, ...guardado } : VIAJE_VACIO
  } catch {
    return VIAJE_VACIO
  }
}

export function ViajeProvider({ children }) {
  const [viaje, setViaje] = useState(leerViajeGuardado)

  useEffect(() => {
    try {
      localStorage.setItem(CLAVE, JSON.stringify(viaje))
    } catch {
      /* sin almacenamiento: el viaje solo dura mientras la página esté abierta */
    }
  }, [viaje])

  // Si el usuario elige algo de otro destino, se empieza un viaje nuevo.
  const elegir = useCallback((destino, campo, valor) => {
    setViaje((actual) => {
      const mismoDestino = actual.destino?.id === destino.id
      const base = mismoDestino ? actual : { ...VIAJE_VACIO, noches: actual.noches }
      return { ...base, destino: { id: destino.id, nombre: destino.nombre, pais: destino.pais, icono: destino.icono }, [campo]: valor }
    })
  }, [])

  const valor = useMemo(
    () => ({
      viaje,
      elementosElegidos: (viaje.vuelo ? 1 : 0) + (viaje.hotel ? 1 : 0),
      elegirVuelo: (destino, vuelo) => elegir(destino, 'vuelo', vuelo),
      elegirHotel: (destino, hotel) => elegir(destino, 'hotel', hotel),
      quitarVuelo: () => setViaje((v) => ({ ...v, vuelo: null })),
      quitarHotel: () => setViaje((v) => ({ ...v, hotel: null })),
      cambiarNoches: (noches) => setViaje((v) => ({ ...v, noches: Math.min(30, Math.max(1, noches)) })),
      reiniciar: () => setViaje(VIAJE_VACIO),
    }),
    [viaje, elegir],
  )

  return <ViajeContext.Provider value={valor}>{children}</ViajeContext.Provider>
}
