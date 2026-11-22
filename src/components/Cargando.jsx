// Estado de carga de una sección: texto con ruedita y "esqueletos" de tarjetas
// que anticipan cómo se verá el contenido cuando lleguen los datos.
// Props: texto (mensaje) y cantidad (cuántos esqueletos mostrar).
export default function Cargando({ texto = 'Cargando...', cantidad = 6 }) {
  return (
    <div role="status" aria-live="polite" data-estado="cargando">
      <p className="mb-4 flex items-center gap-3 text-noche-700">
        <span className="h-5 w-5 animate-spin rounded-full border-2 border-cielo-100 border-t-sol-500" aria-hidden="true" />
        {texto}
      </p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" aria-hidden="true">
        {Array.from({ length: cantidad }, (_, i) => (
          <div key={i} className="h-32 animate-pulse rounded-2xl bg-cielo-100" />
        ))}
      </div>
    </div>
  )
}
