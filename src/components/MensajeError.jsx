// Mensaje de error para el usuario, con una explicación según el tipo de falla
// y soluciones alternativas: reintentar o ir a otra parte del sitio.
// Props: error (ErrorApi), onReintentar (función, opcional) y alternativas (enlaces).
import { Link } from 'react-router-dom'
import { boton, botonSecundario } from '../estilos.js'

const MENSAJES = {
  red: {
    titulo: 'No hay conexión con el servidor',
    texto: 'No logramos comunicarnos con la librería. Revisa tu conexión a internet e inténtalo otra vez.',
  },
  tiempo: {
    titulo: 'El servidor no responde',
    texto: 'La respuesta tardó más de 8 segundos, así que cortamos la espera. Puede ser algo momentáneo.',
  },
  'no-encontrado': {
    titulo: 'No encontramos lo que buscas',
    texto: 'Ese contenido no existe o fue retirado. Puedes volver al listado y elegir otro.',
  },
  servidor: {
    titulo: 'El servidor tuvo un problema',
    texto: 'Es un fallo de nuestra parte, no tuyo. Intenta nuevamente en unos segundos.',
  },
}
const GENERAL = {
  titulo: 'No pudimos cargar la información',
  texto: 'Ocurrió un problema inesperado al pedir los datos. Inténtalo nuevamente.',
}

export default function MensajeError({ error, onReintentar, alternativas = [] }) {
  const { titulo, texto } = MENSAJES[error.tipo] ?? GENERAL

  return (
    <div role="alert" data-estado="error" className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
      <p className="text-4xl" aria-hidden="true">⚠️</p>
      <h2 className="mt-2 text-xl font-bold text-red-900">{titulo}</h2>
      <p className="mx-auto mt-1 max-w-md text-red-800">{texto}</p>
      {error.estado && <p className="mt-1 text-sm text-red-700">Código de respuesta: {error.estado}</p>}

      <div className="mt-5 flex flex-wrap justify-center gap-3">
        {/* Un 404 no se arregla reintentando: el botón solo aparece cuando sirve */}
        {onReintentar && error.tipo !== 'no-encontrado' && (
          <button type="button" className={boton} onClick={onReintentar}>
            Reintentar
          </button>
        )}
        {alternativas.map((enlace) => (
          <Link key={enlace.a} to={enlace.a} className={botonSecundario}>
            {enlace.texto}
          </Link>
        ))}
      </div>
    </div>
  )
}
