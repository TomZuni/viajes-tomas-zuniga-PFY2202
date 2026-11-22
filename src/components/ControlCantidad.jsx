// Control "− número +" para subir o bajar una cantidad (por ejemplo, las noches de hotel).
// Props: valor, etiqueta (para lectores de pantalla), onRestar, onSumar, restarDeshabilitado, sumarDeshabilitado.
const BOTON = 'px-3 py-1.5 hover:bg-cielo-50 disabled:cursor-not-allowed disabled:text-slate-300 disabled:hover:bg-transparent'

export default function ControlCantidad({ valor, etiqueta, onRestar, onSumar, restarDeshabilitado = false, sumarDeshabilitado = false }) {
  return (
    <div className="flex w-fit items-center overflow-hidden rounded-lg border border-cielo-100 bg-white" role="group" aria-label={etiqueta}>
      <button type="button" className={BOTON} onClick={onRestar} disabled={restarDeshabilitado} aria-label={`Restar uno (${etiqueta})`}>−</button>
      <span className="min-w-10 bg-cielo-50 px-2 py-1.5 text-center font-bold" aria-live="polite">{valor}</span>
      <button type="button" className={BOTON} onClick={onSumar} disabled={sumarDeshabilitado} aria-label={`Sumar uno (${etiqueta})`}>+</button>
    </div>
  )
}
