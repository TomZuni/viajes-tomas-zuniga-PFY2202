// Resumen del viaje que el usuario fue armando: vuelo, hotel, noches y costo total.
// El viaje vive en el estado global (ViajeContext), por eso aquí aparece lo que se eligió en otras páginas.
import { useState } from 'react'
import { Link } from 'react-router-dom'
import useViaje from '../hooks/useViaje.js'
import EstadoVacio from '../components/EstadoVacio.jsx'
import ControlCantidad from '../components/ControlCantidad.jsx'
import { botonAcento, botonSecundario, tarjeta } from '../estilos.js'
import { formatoPrecio, formatoFecha, formatoHoraDe } from '../utils.js'

export default function MiViaje() {
  const { viaje, cambiarNoches, quitarVuelo, quitarHotel, reiniciar } = useViaje()
  const [confirmado, setConfirmado] = useState(null) // datos del viaje confirmado (simulado)

  const { destino, vuelo, hotel, noches } = viaje
  const costoHotel = hotel ? hotel.precioNoche * noches : 0
  const total = (vuelo?.precio ?? 0) + costoHotel
  const completo = Boolean(vuelo && hotel)

  const confirmar = () => {
    setConfirmado({ destino: destino.nombre, total })
    reiniciar()
  }

  // Renderizado condicional: viaje confirmado, viaje vacío o viaje en armado
  if (confirmado) {
    return (
      <EstadoVacio icono="🎉" titulo="¡Viaje confirmado!" texto={`Tu viaje a ${confirmado.destino} por ${formatoPrecio(confirmado.total)} quedó registrado. (Es una simulación: no se realizó ningún cobro.)`}>
        <Link to="/destinos" className={botonAcento}>Planificar otro viaje</Link>
      </EstadoVacio>
    )
  }
  if (!destino) {
    return (
      <EstadoVacio icono="🧳" titulo="Aún no armas tu viaje" texto="Elige un destino y selecciona un vuelo y un hotel para ver aquí tu resumen.">
        <Link to="/destinos" className={botonAcento}>Explorar destinos</Link>
      </EstadoVacio>
    )
  }

  const base = `/destinos/${destino.id}`

  return (
    <section aria-labelledby="tituloViaje">
      <h1 id="tituloViaje" className="text-2xl font-bold">Mi viaje a {destino.nombre} {destino.icono}</h1>
      <p className="mt-1 mb-6 text-noche-700">{destino.pais} · saliendo desde Santiago</p>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          <article className={tarjeta} data-seccion="vuelo">
            <h2 className="font-bold">✈️ Vuelo</h2>
            {vuelo ? (
              <>
                <p className="mt-1">{vuelo.aerolinea} · {vuelo.numero}</p>
                <p className="text-sm text-noche-700">{formatoFecha(vuelo.salida)} · {formatoHoraDe(vuelo.salida)} → {formatoHoraDe(vuelo.llegada)}</p>
                <p className="text-sm text-noche-700">{vuelo.origen} → {vuelo.destino}</p>
                <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                  <p className="font-bold text-sol-600">{formatoPrecio(vuelo.precio)}</p>
                  <button type="button" className={botonSecundario} onClick={quitarVuelo}>Quitar vuelo</button>
                </div>
              </>
            ) : (
              <p className="mt-1 text-noche-700">Todavía no eliges un vuelo. <Link className="font-semibold text-sol-600 underline" to={`${base}/vuelos`}>Ver vuelos</Link></p>
            )}
          </article>

          <article className={tarjeta} data-seccion="hotel">
            <h2 className="font-bold">🏨 Hotel</h2>
            {hotel ? (
              <>
                <p className="mt-1">{hotel.nombre} · {hotel.zona}</p>
                <p className="text-sm text-noche-700">{formatoPrecio(hotel.precioNoche)} por noche</p>
                <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                  <label className="flex items-center gap-3 text-sm">
                    Noches
                    <ControlCantidad
                      valor={noches}
                      etiqueta="Noches de hotel"
                      onRestar={() => cambiarNoches(noches - 1)}
                      onSumar={() => cambiarNoches(noches + 1)}
                      restarDeshabilitado={noches <= 1}
                      sumarDeshabilitado={noches >= 30}
                    />
                  </label>
                  <button type="button" className={botonSecundario} onClick={quitarHotel}>Quitar hotel</button>
                </div>
              </>
            ) : (
              <p className="mt-1 text-noche-700">Todavía no eliges un hotel. <Link className="font-semibold text-sol-600 underline" to={`${base}/hoteles`}>Ver hoteles</Link></p>
            )}
          </article>
        </div>

        <aside className={`${tarjeta} h-fit lg:sticky lg:top-6`} aria-label="Resumen de costos">
          <h2 className="mb-3 text-lg font-semibold">Resumen</h2>
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between gap-2"><dt className="text-noche-700">Vuelo</dt><dd className="font-semibold">{vuelo ? formatoPrecio(vuelo.precio) : '—'}</dd></div>
            <div className="flex justify-between gap-2"><dt className="text-noche-700">Hotel ({noches} {noches === 1 ? 'noche' : 'noches'})</dt><dd className="font-semibold">{hotel ? formatoPrecio(costoHotel) : '—'}</dd></div>
            <div className="flex justify-between gap-2 border-t border-cielo-100 pt-2 text-lg"><dt className="font-semibold">Total</dt><dd className="font-bold text-sol-600" data-total>{formatoPrecio(total)}</dd></div>
          </dl>
          <button type="button" className={`${botonAcento} mt-5 w-full`} onClick={confirmar} disabled={!completo}>Confirmar viaje</button>
          {!completo && <p className="mt-2 text-xs text-noche-700">Elige un vuelo y un hotel para poder confirmar.</p>}
          <button type="button" className={`${botonSecundario} mt-2 w-full`} onClick={reiniciar}>Empezar de nuevo</button>
        </aside>
      </div>
    </section>
  )
}
