// Indicador GLOBAL de carga: aparece bajo el encabezado cada vez que hay una petición en curso
// (sea de la página que sea) y desaparece solo cuando todas terminan.
import useCargaGlobal from '../hooks/useCargaGlobal.js'

export default function IndicadorCarga() {
  const pendientes = useCargaGlobal()

  return (
    <div className="relative h-1 overflow-hidden bg-noche-900" role="status" aria-live="polite">
      {pendientes > 0 && (
        <>
          <div className="barra-carga absolute inset-y-0 left-0 w-1/4 rounded-full bg-sol-500" />
          <span className="sr-only">
            Cargando datos del servidor ({pendientes} {pendientes === 1 ? 'petición' : 'peticiones'} en curso)
          </span>
        </>
      )}
    </div>
  )
}
