// Página de un destino (ruta /destinos/:id). Es una ruta "padre" con rutas anidadas:
//   /destinos/:id/vuelos   -> pestaña Vuelos  (API GraphQL)
//   /destinos/:id/hoteles  -> pestaña Hoteles (API GraphQL)
// La información del destino (país, actividades) viene de la API REST; las pestañas se dibujan en <Outlet />.
import { Link, NavLink, Outlet, useParams } from 'react-router-dom'
import useApi from '../hooks/useApi.js'
import useViaje from '../hooks/useViaje.js'
import { rutas } from '../servicios/api.js'
import Peticion from '../components/Peticion.jsx'
import { tarjeta, botonSecundario } from '../estilos.js'
import { formatoPrecio } from '../utils.js'

const clasePestana = ({ isActive }) =>
  `rounded-t-lg border-b-4 px-4 py-2 text-sm font-semibold transition-colors ${
    isActive ? 'border-sol-600 text-sol-600' : 'border-transparent text-noche-700 hover:text-cielo-700'
  }`

function EncabezadoDestino({ destino }) {
  const { viaje, elementosElegidos } = useViaje()
  const hayEleccion = viaje.destino?.id === destino.id && elementosElegidos > 0

  return (
    <>
      <header className={`${tarjeta} mb-6`}>
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-5xl" aria-hidden="true">{destino.icono}</span>
          <div>
            <h1 id="tituloDestino" className="text-2xl font-bold">{destino.nombre}</h1>
            <p className="font-semibold text-sol-600">{destino.pais} · {destino.continente}</p>
          </div>
        </div>
        <p className="mt-3 text-noche-700">{destino.descripcion}</p>
        <h2 className="mt-4 text-sm font-bold tracking-wide text-noche-800 uppercase">Actividades populares</h2>
        <ul className="mt-2 flex flex-wrap gap-2">
          {destino.actividades.map((actividad) => (
            <li key={actividad} className="rounded-full bg-cielo-100 px-3 py-1 text-sm text-noche-800">{actividad}</li>
          ))}
        </ul>
        <p className="mt-3 text-sm text-noche-700"><strong>Mejor época para viajar:</strong> {destino.mejorEpoca}</p>
      </header>

      {/* Renderizado condicional: resumen de lo que el usuario ya eligió para este destino */}
      {hayEleccion && (
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-cielo-600/30 bg-white px-4 py-3" role="status" data-estado="seleccion">
          <p className="text-sm">
            <strong>Tu selección:</strong>{' '}
            {viaje.vuelo ? `✈️ ${viaje.vuelo.aerolinea} ${viaje.vuelo.numero} (${formatoPrecio(viaje.vuelo.precio)})` : '✈️ falta elegir vuelo'}
            {' · '}
            {viaje.hotel ? `🏨 ${viaje.hotel.nombre}` : '🏨 falta elegir hotel'}
          </p>
          <Link to="/mi-viaje" className={botonSecundario}>Ver mi viaje</Link>
        </div>
      )}
    </>
  )
}

export default function DetalleDestino() {
  const { id } = useParams()
  const api = useApi(rutas.destino(id))

  return (
    <section aria-labelledby="tituloDestino">
      <Link to="/destinos" className="mb-4 inline-block text-sm font-semibold text-sol-600 hover:underline">← Volver a los destinos</Link>

      <Peticion api={api} textoCarga="Cargando destino..." cantidadEsqueletos={2} alternativas={[{ a: '/destinos', texto: 'Ver todos los destinos' }]}>
        {(destino) => (
          <>
            <EncabezadoDestino destino={destino} />
            <nav aria-label="Opciones del destino" className="mb-6 flex gap-1 border-b border-cielo-100">
              <NavLink to="vuelos" className={clasePestana}>✈️ Vuelos</NavLink>
              <NavLink to="hoteles" className={clasePestana}>🏨 Hoteles</NavLink>
            </nav>
            {/* Aquí se dibuja la pestaña elegida (Vuelos u Hoteles) y se le entrega el destino */}
            <Outlet context={{ destino }} />
          </>
        )}
      </Peticion>
    </section>
  )
}
