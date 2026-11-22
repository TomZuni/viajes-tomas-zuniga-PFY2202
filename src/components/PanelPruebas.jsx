// Panel para PROBAR la aplicación: cambia cómo responde el servidor mock
// (error 500, sin conexión, lento, sin respuesta) y recarga para ver qué pasa.
import { MODOS, leerModo, guardarModo } from '../mocks/modo.js'
import { borrarRespaldos } from '../servicios/api.js'
import { botonSecundario } from '../estilos.js'

export default function PanelPruebas() {
  const modoActual = leerModo()

  const elegir = (modo) => {
    guardarModo(modo)
    window.location.reload() // se recarga para empezar sin la caché en memoria
  }
  const olvidarRespaldo = () => {
    borrarRespaldos()
    window.location.reload()
  }

  return (
    <details className="rounded-xl border border-cielo-100 bg-white p-4 text-sm">
      <summary className="cursor-pointer font-semibold text-noche-800">
        🧪 Panel de pruebas del servidor mock
        {modoActual !== 'normal' && (
          <span className="ml-2 rounded-full bg-sol-600 px-2 py-0.5 text-xs text-white">
            {MODOS.find((m) => m.id === modoActual)?.texto}
          </span>
        )}
      </summary>
      <p className="mt-3 text-noche-700">
        Simula fallas del servidor para comprobar cómo responde la aplicación. Al elegir una opción, la página se recarga.
      </p>
      <fieldset className="mt-3 grid gap-2 sm:grid-cols-2">
        <legend className="sr-only">Comportamiento del servidor</legend>
        {MODOS.map((modo) => (
          <label key={modo.id} className="flex cursor-pointer items-start gap-2 rounded-lg border border-cielo-100 p-2 hover:border-sol-500">
            <input type="radio" name="modo" className="mt-1" checked={modoActual === modo.id} onChange={() => elegir(modo.id)} />
            <span>
              <span className="font-semibold">{modo.texto}</span>
              <span className="block text-xs text-noche-700">{modo.detalle}</span>
            </span>
          </label>
        ))}
      </fieldset>
      <button type="button" className={`${botonSecundario} mt-3`} onClick={olvidarRespaldo}>
        Borrar datos guardados (respaldo)
      </button>
    </details>
  )
}
