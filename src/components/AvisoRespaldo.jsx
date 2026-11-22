// Aviso que aparece cuando el servidor falló pero se muestran los últimos datos guardados.
export default function AvisoRespaldo({ onReintentar }) {
  return (
    <div role="status" data-estado="respaldo" className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-amber-900">
      <p>
        <strong>No pudimos actualizar los datos.</strong> Estás viendo la última información guardada en este equipo.
      </p>
      <button type="button" className="rounded-lg border border-amber-400 px-3 py-1 text-sm font-semibold hover:bg-amber-100" onClick={onReintentar}>
        Reintentar
      </button>
    </div>
  )
}
