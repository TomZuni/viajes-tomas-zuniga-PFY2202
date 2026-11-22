// Menú de navegación principal. Usa NavLink de React Router: cambia de página sin recargar y
// marca con otro estilo la opción activa. "Mi viaje" muestra una insignia con lo que se ha elegido.
import { NavLink } from 'react-router-dom'
import useViaje from '../hooks/useViaje.js'

const claseEnlace = ({ isActive }) =>
  `relative rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${
    isActive ? 'bg-white text-noche-900' : 'text-cielo-100 hover:bg-noche-700'
  }`

export default function MenuPrincipal() {
  const { elementosElegidos } = useViaje()

  return (
    <nav aria-label="Navegación principal" className="flex gap-1">
      <NavLink to="/" end className={claseEnlace}>Inicio</NavLink>
      <NavLink to="/destinos" className={claseEnlace}>Destinos</NavLink>
      <NavLink to="/mi-viaje" className={claseEnlace}>
        Mi viaje
        {/* Renderizado condicional: la insignia solo aparece si ya se eligió algo */}
        {elementosElegidos > 0 && (
          <span className="ml-1.5 inline-block min-w-5 rounded-full bg-sol-600 px-1 text-center text-[11px] leading-5 font-bold text-white" aria-label={`${elementosElegidos} elementos elegidos`}>
            {elementosElegidos}
          </span>
        )}
      </NavLink>
    </nav>
  )
}
