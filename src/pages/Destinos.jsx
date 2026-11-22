// Lista de destinos, pedida a la API REST (GET /api/destinos).
// El filtro por continente y el buscador trabajan sobre los datos que ya llegaron (no hacen más peticiones).
import { useState } from 'react'
import useApi from '../hooks/useApi.js'
import { rutas } from '../servicios/api.js'
import Peticion from '../components/Peticion.jsx'
import TarjetaDestino from '../components/TarjetaDestino.jsx'
import FiltroChips from '../components/FiltroChips.jsx'
import EstadoVacio from '../components/EstadoVacio.jsx'

function ListaDestinos({ destinos }) {
  const [continente, setContinente] = useState('Todos')
  const [busqueda, setBusqueda] = useState('')

  const continentes = [...new Set(destinos.map((d) => d.continente))]
  const opciones = [
    { nombre: 'Todos', cantidad: destinos.length },
    ...continentes.map((nombre) => ({ nombre, cantidad: destinos.filter((d) => d.continente === nombre).length })),
  ]

  // Datos derivados: la lista que se muestra depende de los filtros; la original no se modifica.
  const texto = busqueda.trim().toLowerCase()
  const filtrados = destinos.filter(
    (d) =>
      (continente === 'Todos' || d.continente === continente) &&
      (d.nombre.toLowerCase().includes(texto) || d.pais.toLowerCase().includes(texto)),
  )

  return (
    <>
      <FiltroChips opciones={opciones} activa={continente} onCambiar={setContinente} etiqueta="Filtrar por continente" />
      <label htmlFor="busqueda" className="sr-only">Buscar destino o país</label>
      <input
        id="busqueda"
        type="search"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        placeholder="Buscar por destino o país..."
        className="mt-4 mb-2 w-full rounded-lg border border-cielo-100 bg-white px-3 py-2 outline-none focus:border-cielo-600 focus:ring-2 focus:ring-cielo-600/30"
      />
      <p className="mb-4 text-sm text-noche-700" aria-live="polite">Mostrando {filtrados.length} de {destinos.length} destinos</p>

      {filtrados.length === 0 ? (
        <EstadoVacio icono="🔎" titulo="Sin resultados" texto="Ningún destino coincide con tu búsqueda." />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtrados.map((destino) => (
            <TarjetaDestino key={destino.id} destino={destino} />
          ))}
        </div>
      )}
    </>
  )
}

export default function Destinos() {
  const api = useApi(rutas.destinos)

  return (
    <section aria-labelledby="tituloDestinos">
      <h1 id="tituloDestinos" className="text-2xl font-bold">Destinos</h1>
      <p className="mt-1 mb-6 text-noche-700">Elige un destino para ver sus vuelos y hoteles disponibles.</p>
      <Peticion api={api} textoCarga="Cargando destinos..." alternativas={[{ a: '/', texto: 'Volver al inicio' }]}>
        {(destinos) =>
          destinos.length === 0 ? (
            <EstadoVacio titulo="Aún no hay destinos" texto="Vuelve pronto: estamos preparando nuevas opciones." />
          ) : (
            <ListaDestinos destinos={destinos} />
          )
        }
      </Peticion>
    </section>
  )
}
