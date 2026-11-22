// Pestaña de vuelos de un destino. Los datos vienen de la API GraphQL (consulta "Vuelos").
// El interruptor "solo disponibles" es una VARIABLE de la consulta: cuando cambia, se vuelve a consultar.
import { useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import useGraphQL from '../hooks/useGraphQL.js'
import useViaje from '../hooks/useViaje.js'
import { CONSULTA_VUELOS } from '../servicios/consultas.js'
import Peticion from '../components/Peticion.jsx'
import TarjetaVuelo from '../components/TarjetaVuelo.jsx'
import EstadoVacio from '../components/EstadoVacio.jsx'

export default function Vuelos() {
  const { destino } = useOutletContext()
  const [soloDisponibles, setSoloDisponibles] = useState(false)
  const api = useGraphQL(CONSULTA_VUELOS, { destinoId: String(destino.id), soloDisponibles })
  const { viaje, elegirVuelo, quitarVuelo } = useViaje()

  return (
    <section aria-labelledby="tituloVuelos">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h2 id="tituloVuelos" className="text-xl font-bold">Vuelos desde Santiago a {destino.nombre}</h2>
        <label className="flex cursor-pointer items-center gap-2 text-sm">
          <input type="checkbox" checked={soloDisponibles} onChange={(e) => setSoloDisponibles(e.target.checked)} />
          Mostrar solo vuelos disponibles
        </label>
      </div>

      <Peticion api={api} textoCarga="Consultando vuelos..." cantidadEsqueletos={3} alternativas={[{ a: '/destinos', texto: 'Ver otros destinos' }]}>
        {({ vuelos }) =>
          vuelos.length === 0 ? (
            <EstadoVacio icono="🛫" titulo="No hay vuelos para mostrar" texto="Prueba desmarcando el filtro de disponibilidad." />
          ) : (
            <div className="grid gap-4 lg:grid-cols-2">
              {vuelos.map((vuelo) => (
                <TarjetaVuelo
                  key={vuelo.id}
                  vuelo={vuelo}
                  elegido={viaje.vuelo?.id === vuelo.id}
                  onElegir={() => elegirVuelo(destino, vuelo)}
                  onQuitar={quitarVuelo}
                />
              ))}
            </div>
          )
        }
      </Peticion>
    </section>
  )
}
