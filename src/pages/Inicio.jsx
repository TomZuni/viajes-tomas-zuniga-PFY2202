// Página de inicio: presentación, destinos destacados y cómo funciona.
// Usa la misma petición REST que la página Destinos: gracias al caché, ir de una a otra no vuelve a pedir los datos.
import { Link } from 'react-router-dom'
import useApi from '../hooks/useApi.js'
import { rutas } from '../servicios/api.js'
import Peticion from '../components/Peticion.jsx'
import TarjetaDestino from '../components/TarjetaDestino.jsx'
import { botonAcento, tarjeta } from '../estilos.js'

const PASOS = [
  { icono: '🧭', titulo: 'Elige un destino', texto: 'Mira el país y las actividades más populares de cada lugar.' },
  { icono: '✈️', titulo: 'Compara vuelos y hoteles', texto: 'Revisa precios, fechas y disponibilidad en tiempo real.' },
  { icono: '🧳', titulo: 'Arma tu viaje', texto: 'Escoge un vuelo, un hotel y las noches: te mostramos el total.' },
]

export default function Inicio() {
  const api = useApi(rutas.destinos)

  return (
    <>
      <section className="rounded-3xl bg-noche-900 px-6 py-12 text-center text-white sm:py-16" aria-labelledby="tituloInicio">
        <p className="text-5xl" aria-hidden="true">🌎</p>
        <h1 id="tituloInicio" className="mt-3 text-3xl font-extrabold sm:text-4xl">Tu próximo viaje empieza aquí</h1>
        <p className="mx-auto mt-3 max-w-xl text-cielo-100">
          Explora destinos, compara vuelos y hoteles y planifica tu viaje desde Santiago en un solo lugar.
        </p>
        <Link to="/destinos" className={`${botonAcento} mt-6`}>Explorar destinos</Link>
      </section>

      <section className="mt-10" aria-labelledby="tituloDestacados">
        <h2 id="tituloDestacados" className="mb-4 text-2xl font-bold">Destinos destacados</h2>
        <Peticion api={api} textoCarga="Cargando destinos..." cantidadEsqueletos={3} alternativas={[{ a: '/destinos', texto: 'Ir a destinos' }]}>
          {(destinos) => (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {destinos.slice(0, 3).map((destino) => (
                <TarjetaDestino key={destino.id} destino={destino} />
              ))}
            </div>
          )}
        </Peticion>
      </section>

      <section className="mt-10" aria-labelledby="tituloPasos">
        <h2 id="tituloPasos" className="mb-4 text-2xl font-bold">Así de simple</h2>
        <ol className="grid gap-4 sm:grid-cols-3">
          {PASOS.map((paso, i) => (
            <li key={paso.titulo} className={tarjeta}>
              <span className="text-3xl" aria-hidden="true">{paso.icono}</span>
              <h3 className="mt-2 font-bold">{i + 1}. {paso.titulo}</h3>
              <p className="mt-1 text-sm text-noche-700">{paso.texto}</p>
            </li>
          ))}
        </ol>
      </section>
    </>
  )
}
