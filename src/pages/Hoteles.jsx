// Pestaña de hoteles de un destino. Los datos vienen de la API GraphQL (consulta "Hoteles").
import { useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import useGraphQL from '../hooks/useGraphQL.js'
import useViaje from '../hooks/useViaje.js'
import { CONSULTA_HOTELES } from '../servicios/consultas.js'
import Peticion from '../components/Peticion.jsx'
import TarjetaHotel from '../components/TarjetaHotel.jsx'
import EstadoVacio from '../components/EstadoVacio.jsx'

export default function Hoteles() {
  const { destino } = useOutletContext()
  const [soloDisponibles, setSoloDisponibles] = useState(false)
  const api = useGraphQL(CONSULTA_HOTELES, { destinoId: String(destino.id), soloDisponibles })
  const { viaje, elegirHotel, quitarHotel } = useViaje()

  return (
    <section aria-labelledby="tituloHoteles">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h2 id="tituloHoteles" className="text-xl font-bold">Hoteles en {destino.nombre}</h2>
        <label className="flex cursor-pointer items-center gap-2 text-sm">
          <input type="checkbox" checked={soloDisponibles} onChange={(e) => setSoloDisponibles(e.target.checked)} />
          Mostrar solo hoteles disponibles
        </label>
      </div>

      <Peticion api={api} textoCarga="Consultando hoteles..." cantidadEsqueletos={3} alternativas={[{ a: '/destinos', texto: 'Ver otros destinos' }]}>
        {({ hoteles }) =>
          hoteles.length === 0 ? (
            <EstadoVacio icono="🏨" titulo="No hay hoteles para mostrar" texto="Prueba desmarcando el filtro de disponibilidad." />
          ) : (
            <div className="grid gap-4 lg:grid-cols-2">
              {hoteles.map((hotel) => (
                <TarjetaHotel
                  key={hotel.id}
                  hotel={hotel}
                  elegido={viaje.hotel?.id === hotel.id}
                  onElegir={() => elegirHotel(destino, hotel)}
                  onQuitar={quitarHotel}
                />
              ))}
            </div>
          )
        }
      </Peticion>
    </section>
  )
}
