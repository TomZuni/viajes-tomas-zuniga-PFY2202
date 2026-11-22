// Tarjeta de un vuelo (dato de la API GraphQL).
// Props: vuelo, elegido (true si es el vuelo del viaje), onElegir y onQuitar.
import InsigniaDisponibilidad from './InsigniaDisponibilidad.jsx'
import { tarjeta, boton, botonAcento, botonSecundario } from '../estilos.js'
import { formatoPrecio, formatoFecha, formatoHoraDe, formatoDuracion } from '../utils.js'

export default function TarjetaVuelo({ vuelo, elegido, onElegir, onQuitar }) {
  const escalas = vuelo.escalas === 0 ? 'Directo' : `${vuelo.escalas} ${vuelo.escalas === 1 ? 'escala' : 'escalas'}`

  return (
    <article className={`${tarjeta} ${elegido ? 'ring-2 ring-cielo-600' : ''}`} data-vuelo={vuelo.id}>
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <h3 className="font-bold">{vuelo.aerolinea} <span className="font-normal text-noche-700">· {vuelo.numero}</span></h3>
          <p className="text-sm text-noche-700">{formatoFecha(vuelo.salida)}</p>
        </div>
        <InsigniaDisponibilidad disponible={vuelo.disponible} />
      </div>

      <div className="mt-4 flex items-center gap-3">
        <div className="text-center">
          <p className="text-2xl font-bold">{formatoHoraDe(vuelo.salida)}</p>
          <p className="text-xs text-noche-700">{vuelo.origen}</p>
        </div>
        <div className="flex-1 text-center text-xs text-noche-700">
          <p>{formatoDuracion(vuelo.duracionMin)}</p>
          <p className="border-t border-dashed border-slate-300" aria-hidden="true"></p>
          <p>{escalas}</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold">{formatoHoraDe(vuelo.llegada)}</p>
          <p className="text-xs text-noche-700">{vuelo.destino}</p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xl font-bold text-sol-600">{formatoPrecio(vuelo.precio)}</p>
          <p className="text-xs text-noche-700">
            {vuelo.disponible
              ? `${vuelo.asientosDisponibles} ${vuelo.asientosDisponibles === 1 ? 'asiento disponible' : 'asientos disponibles'}${vuelo.asientosDisponibles <= 5 ? ' · ¡últimos!' : ''}`
              : 'Sin asientos disponibles'}
          </p>
        </div>
        {elegido ? (
          <button type="button" className={botonSecundario} onClick={onQuitar}>✓ Vuelo elegido · Quitar</button>
        ) : (
          <button type="button" className={vuelo.disponible ? botonAcento : boton} onClick={onElegir} disabled={!vuelo.disponible}>
            {vuelo.disponible ? 'Elegir este vuelo' : 'Agotado'}
          </button>
        )}
      </div>
    </article>
  )
}
