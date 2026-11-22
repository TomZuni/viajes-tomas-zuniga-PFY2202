// Hook base para pedir datos desde un componente (lo usan useApi y useGraphQL).
//   const { datos, cargando, error, desdeRespaldo, reintentar } = useConsulta(clave, ejecutar)
//
// - clave: texto que identifica la consulta (si cambia, se vuelve a pedir).
// - ejecutar(opciones): función que hace la petición (obtener o consultarGraphQL).
// - cargando: true mientras se espera la respuesta.
// - error: un ErrorApi si la petición falló y no hay datos que mostrar.
// - desdeRespaldo: true si la petición falló pero se muestran los últimos datos guardados.
// - reintentar(): vuelve a pedir los datos saltándose el caché.
import { useCallback, useEffect, useRef, useState } from 'react'
import { leerCache, leerRespaldo } from '../servicios/api.js'

const SIN_RESPUESTA = { clave: null, datos: null, error: null, desdeRespaldo: false, reintentando: false }

export default function useConsulta(clave, ejecutar) {
  const [intento, setIntento] = useState(0)
  const [estado, setEstado] = useState(SIN_RESPUESTA)

  // Se guarda la función más reciente sin que su cambio vuelva a disparar la petición.
  const ejecutarRef = useRef(ejecutar)
  useEffect(() => {
    ejecutarRef.current = ejecutar
  })

  useEffect(() => {
    let activo = true // evita actualizar el estado si el componente ya cambió de consulta o se desmontó

    ejecutarRef.current({ forzar: intento > 0 }).then(
      (datos) => {
        if (activo) setEstado({ clave, datos, error: null, desdeRespaldo: false, reintentando: false })
      },
      (error) => {
        if (!activo) return
        // Solución alternativa: si el fallo es de conexión o del servidor, se muestran los últimos datos guardados.
        const respaldo = error.recuperable ? leerRespaldo(clave) : null
        setEstado({ clave, datos: respaldo, error, desdeRespaldo: respaldo !== null, reintentando: false })
      },
    )
    return () => {
      activo = false
    }
  }, [clave, intento])

  const reintentar = useCallback(() => {
    setEstado({ ...SIN_RESPUESTA, reintentando: true })
    setIntento((n) => n + 1)
  }, [])

  // Si el estado guardado es de otra consulta, todavía no llegó la respuesta de esta.
  if (estado.clave !== clave) {
    // Si los datos ya están en caché se muestran de inmediato, sin parpadeo de "cargando".
    const enCache = estado.reintentando ? undefined : leerCache(clave)
    if (enCache !== undefined) {
      return { datos: enCache, error: null, desdeRespaldo: false, cargando: false, reintentar }
    }
    return { datos: null, error: null, desdeRespaldo: false, cargando: true, reintentar }
  }
  return { datos: estado.datos, error: estado.error, desdeRespaldo: estado.desdeRespaldo, cargando: false, reintentar }
}
