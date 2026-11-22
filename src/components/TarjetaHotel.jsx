// Tarjeta de un hotel (dato de la API GraphQL).
// Props: hotel, elegido (true si es el hotel del viaje), onElegir y onQuitar.
import Estrellas from './Estrellas.jsx'
import InsigniaDisponibilidad from './InsigniaDisponibilidad.jsx'
import { tarjeta, boton, botonAcento, botonSecundario } from '../estilos.js'
import { formatoPrecio, formatoFechaCorta } from '../utils.js'

export default function TarjetaHotel({ hotel, elegido, onElegir, onQuitar }) {
  return (
    <article className={`${tarjeta} ${elegido ? 'ring-2 ring-cielo-600' : ''}`} data-hotel={hotel.id}>
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <h3 className="font-bold">{hotel.nombre}</h3>
          <p className="text-sm text-noche-700">{hotel.zona}</p>
          <p className="text-sm"><Estrellas cantidad={hotel.estrellas} /> <span className="text-noche-700">· {hotel.valoracion.toFixed(1)} / 5</span></p>
        </div>
        <InsigniaDisponibilidad disponible={hotel.disponible} />
      </div>

      <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Servicios">
        {hotel.servicios.map((servicio) => (
          <li key={servicio} className="rounded-full bg-cielo-100 px-2 py-0.5 text-xs text-noche-800">{servicio}</li>
        ))}
      </ul>
      <p className="mt-3 text-xs text-noche-700">
        Fechas disponibles: {formatoFechaCorta(hotel.disponibleDesde)} al {formatoFechaCorta(hotel.disponibleHasta)}
      </p>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xl font-bold text-sol-600">{formatoPrecio(hotel.precioNoche)} <span className="text-sm font-normal text-noche-700">por noche</span></p>
          <p className="text-xs text-noche-700">
            {hotel.disponible
              ? `${hotel.habitacionesDisponibles} ${hotel.habitacionesDisponibles === 1 ? 'habitación disponible' : 'habitaciones disponibles'}${hotel.habitacionesDisponibles <= 3 ? ' · ¡últimas!' : ''}`
              : 'Sin habitaciones disponibles'}
          </p>
        </div>
        {elegido ? (
          <button type="button" className={botonSecundario} onClick={onQuitar}>✓ Hotel elegido · Quitar</button>
        ) : (
          <button type="button" className={hotel.disponible ? botonAcento : boton} onClick={onElegir} disabled={!hotel.disponible}>
            {hotel.disponible ? 'Elegir este hotel' : 'Agotado'}
          </button>
        )}
      </div>
    </article>
  )
}
