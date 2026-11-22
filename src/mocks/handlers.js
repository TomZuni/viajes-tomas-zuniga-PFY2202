// Servidores mock. MSW (Mock Service Worker) intercepta las peticiones fetch del navegador
// y responde como lo haría un backend real, con códigos HTTP y JSON.
//
// API REST (destinos):
//   GET  /api/destinos       -> lista de destinos (país y actividades populares)
//   GET  /api/destinos/:id   -> un destino (404 si no existe)
// API GraphQL (vuelos y hoteles):
//   POST /graphql            -> consultas { vuelos(...) } y { hoteles(...) }
import { http, HttpResponse, delay } from 'msw'
import { DESTINOS } from './datos.js'
import { ejecutarConsulta } from './graphql.js'
import { leerModo } from './modo.js'

const LATENCIA = 700 // milisegundos: simula el tiempo de un servidor real

// Aplica el modo de pruebas elegido. Devuelve una respuesta si debe fallar, o null si todo sigue normal.
async function simularEstadoDelServidor() {
  const modo = leerModo()
  if (modo === 'lento') await delay(4000)
  else if (modo === 'colgado') await delay('infinite')
  else await delay(LATENCIA)

  if (modo === 'error500') return HttpResponse.json({ mensaje: 'Error interno del servidor' }, { status: 500 })
  if (modo === 'sinConexion') return HttpResponse.error()
  return null
}

export const handlers = [
  // ---------------------------------------------------------------- REST
  http.get('*/api/destinos', async () => {
    const falla = await simularEstadoDelServidor()
    if (falla) return falla
    return HttpResponse.json(DESTINOS)
  }),

  http.get('*/api/destinos/:id', async ({ params }) => {
    const falla = await simularEstadoDelServidor()
    if (falla) return falla

    const destino = DESTINOS.find((d) => String(d.id) === params.id)
    if (!destino) return HttpResponse.json({ mensaje: `El destino ${params.id} no existe` }, { status: 404 })
    return HttpResponse.json(destino)
  }),

  // ---------------------------------------------------------------- GraphQL
  http.post('*/graphql', async ({ request }) => {
    const falla = await simularEstadoDelServidor()
    if (falla) return falla

    // En GraphQL un fallo del servicio viaja dentro del JSON (con código 200), en el campo "errors".
    if (leerModo() === 'errorGraphQL') {
      return HttpResponse.json({
        data: null,
        errors: [{ message: 'El servicio de vuelos y hoteles no está disponible', extensions: { code: 'INTERNAL_SERVER_ERROR' } }],
      })
    }

    let cuerpo
    try {
      cuerpo = await request.json()
    } catch {
      return HttpResponse.json({ errors: [{ message: 'La petición no es un JSON válido' }] }, { status: 400 })
    }
    if (typeof cuerpo.query !== 'string') {
      return HttpResponse.json({ errors: [{ message: 'Falta el campo "query"' }] }, { status: 400 })
    }
    return HttpResponse.json(await ejecutarConsulta(cuerpo))
  }),
]
