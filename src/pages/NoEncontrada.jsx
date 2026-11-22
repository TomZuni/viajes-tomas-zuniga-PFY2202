// Ruta comodín (*): se muestra cuando la dirección no existe.
import { Link } from 'react-router-dom'
import EstadoVacio from '../components/EstadoVacio.jsx'
import { botonAcento } from '../estilos.js'

export default function NoEncontrada() {
  return (
    <EstadoVacio icono="🧭" titulo="Página no encontrada" texto="La dirección que escribiste no existe en Horizonte Viajes.">
      <Link to="/" className={botonAcento}>Volver al inicio</Link>
    </EstadoVacio>
  )
}
