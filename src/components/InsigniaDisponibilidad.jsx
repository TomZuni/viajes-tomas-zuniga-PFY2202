// Etiqueta verde "Disponible" o gris "Agotado". Se reutiliza en vuelos y hoteles.
export default function InsigniaDisponibilidad({ disponible }) {
  return (
    <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${disponible ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-700'}`}>
      {disponible ? 'Disponible' : 'Agotado'}
    </span>
  )
}
