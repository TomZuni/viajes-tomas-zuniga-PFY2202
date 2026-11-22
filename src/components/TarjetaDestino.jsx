// Tarjeta de un destino (dato de la API REST): enlaza a su página de vuelos y hoteles.
import { Link } from 'react-router-dom'
import { tarjeta } from '../estilos.js'

export default function TarjetaDestino({ destino }) {
  return (
    <Link
      to={`/destinos/${destino.id}`}
      className={`${tarjeta} group flex flex-col transition hover:-translate-y-0.5 hover:border-cielo-600 hover:shadow-md focus-visible:outline-2 focus-visible:outline-sol-500`}
    >
      <span className="text-4xl" aria-hidden="true">{destino.icono}</span>
      <h3 className="mt-3 text-lg font-bold group-hover:text-cielo-700">{destino.nombre}</h3>
      <p className="text-sm font-semibold text-sol-600">{destino.pais}</p>
      <p className="mt-2 text-sm text-noche-700">{destino.descripcion}</p>
      <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Actividades populares">
        {destino.actividades.slice(0, 3).map((actividad) => (
          <li key={actividad} className="rounded-full bg-cielo-100 px-2 py-0.5 text-xs text-noche-800">{actividad}</li>
        ))}
      </ul>
      <p className="mt-auto pt-4 text-sm font-semibold text-cielo-700">Ver vuelos y hoteles →</p>
    </Link>
  )
}
