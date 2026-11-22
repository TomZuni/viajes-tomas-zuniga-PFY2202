// Componente reutilizable que muestra el estado de una petición.
// Recibe el resultado de useApi y decide qué dibujar:
//   cargando   -> <Cargando />
//   error      -> <MensajeError />
//   éxito      -> los hijos (una función que recibe los datos)
//   respaldo   -> aviso + los hijos con los datos guardados
// Así cada página solo se preocupa de cómo se ven los datos.
import Cargando from './Cargando.jsx'
import MensajeError from './MensajeError.jsx'
import AvisoRespaldo from './AvisoRespaldo.jsx'

export default function Peticion({ api, textoCarga, cantidadEsqueletos, alternativas, children }) {
  if (api.cargando) return <Cargando texto={textoCarga} cantidad={cantidadEsqueletos} />
  if (api.error && api.datos === null) {
    return <MensajeError error={api.error} onReintentar={api.reintentar} alternativas={alternativas} />
  }
  return (
    <>
      {api.desdeRespaldo && <AvisoRespaldo onReintentar={api.reintentar} />}
      {children(api.datos)}
    </>
  )
}
