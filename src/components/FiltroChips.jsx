// Botones para filtrar por una opción (por ejemplo, el continente).
// Props: opciones (lista de { nombre, cantidad }), activa (nombre elegido) y onCambiar(nombre).
// No guarda datos: solo muestra las opciones y avisa cuál se tocó.
export default function FiltroChips({ opciones, activa, onCambiar, etiqueta }) {
  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label={etiqueta}>
      {opciones.map((opcion) => {
        const seleccionada = opcion.nombre === activa
        return (
          <button
            key={opcion.nombre}
            type="button"
            aria-pressed={seleccionada}
            onClick={() => onCambiar(opcion.nombre)}
            className={`rounded-full border px-3 py-1.5 text-sm font-medium transition-colors ${
              seleccionada
                ? 'border-cielo-600 bg-cielo-600 text-white'
                : 'border-cielo-100 bg-white text-noche-800 hover:border-cielo-600 hover:text-cielo-700'
            }`}
          >
            {opcion.nombre} <span className={seleccionada ? 'text-cielo-100' : 'text-slate-500'}>({opcion.cantidad})</span>
          </button>
        )
      })}
    </div>
  )
}
