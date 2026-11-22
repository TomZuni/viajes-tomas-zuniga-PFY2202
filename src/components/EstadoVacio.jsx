// Mensaje para cuando una petición sale bien pero no hay nada que mostrar.
import { tarjeta } from '../estilos.js'

export default function EstadoVacio({ icono = '📭', titulo, texto, children }) {
  return (
    <div className={`${tarjeta} py-10 text-center`} data-estado="vacio">
      <p className="text-5xl" aria-hidden="true">{icono}</p>
      <h2 className="mt-3 text-xl font-bold">{titulo}</h2>
      {texto && <p className="mx-auto mt-1 max-w-md text-noche-700">{texto}</p>}
      {children && <div className="mt-4 flex justify-center">{children}</div>}
    </div>
  )
}
