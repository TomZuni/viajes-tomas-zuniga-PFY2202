// Cliente de las dos APIs. Todas las páginas piden sus datos a través de este archivo.
//   obtener('/destinos')                  -> API REST (GET)
//   consultarGraphQL(consulta, variables) -> API GraphQL (POST)
//
// Qué resuelve este archivo:
//  - Errores claros: clasifica cada falla (sin conexión, tiempo agotado, 404, 500, error GraphQL...).
//  - Eficiencia: guarda las respuestas en memoria (caché) y evita pedir dos veces lo mismo.
//  - Carga: avisa a la interfaz cuando una petición empieza y termina.
//  - Respaldo: guarda la última respuesta buena para poder mostrarla si el servidor falla.
import { peticionIniciada, peticionTerminada } from './estadoCarga.js'

const URL_REST = `${import.meta.env.BASE_URL}api`
const URL_GRAPHQL = `${import.meta.env.BASE_URL}graphql`
const TIEMPO_MAXIMO = 8000 // ms: si el servidor no responde en 8 s, se corta la petición
const VIGENCIA_CACHE = 5 * 60 * 1000 // 5 minutos

// ---------------------------------------------------------------- errores
export class ErrorApi extends Error {
  constructor(tipo, estado, mensaje) {
    super(mensaje)
    this.tipo = tipo // 'red' | 'tiempo' | 'no-encontrado' | 'servidor' | 'graphql' | 'cliente' | 'respuesta'
    this.estado = estado // código HTTP (si hubo respuesta)
  }

  // ¿Tiene sentido mostrar datos guardados y reintentar? Un 404 no se arregla reintentando.
  get recuperable() {
    return ['red', 'tiempo', 'servidor', 'graphql'].includes(this.tipo)
  }
}

function errorPorEstado(estado) {
  if (estado === 404) return new ErrorApi('no-encontrado', 404, 'El recurso pedido no existe.')
  if (estado >= 500) return new ErrorApi('servidor', estado, `El servidor tuvo un problema (error ${estado}).`)
  return new ErrorApi('cliente', estado, `No se pudo completar la petición (error ${estado}).`)
}

// En GraphQL los errores llegan dentro del JSON (campo "errors"), normalmente con código HTTP 200.
function errorDeGraphQL(errores) {
  const primero = errores[0] ?? {}
  if (primero.extensions?.code === 'NOT_FOUND') return new ErrorApi('no-encontrado', null, primero.message)
  if (primero.extensions?.code === 'INTERNAL_SERVER_ERROR') return new ErrorApi('graphql', null, primero.message)
  return new ErrorApi('cliente', null, primero.message ?? 'La consulta GraphQL no es válida.')
}

// ---------------------------------------------------------------- caché
const cache = new Map() // clave -> { datos, guardado }
const enCurso = new Map() // clave -> promesa de una petición que aún no termina

const CLAVE_RESPALDO = 'viajes:respaldo:'

function guardarRespaldo(clave, datos) {
  try {
    localStorage.setItem(CLAVE_RESPALDO + clave, JSON.stringify(datos))
  } catch {
    /* si no hay almacenamiento, simplemente no hay respaldo */
  }
}

export function leerRespaldo(clave) {
  try {
    const texto = localStorage.getItem(CLAVE_RESPALDO + clave)
    return texto ? JSON.parse(texto) : null
  } catch {
    return null
  }
}

// Borra los datos guardados como respaldo (se usa en el panel de pruebas).
export function borrarRespaldos() {
  try {
    Object.keys(localStorage)
      .filter((clave) => clave.startsWith(CLAVE_RESPALDO))
      .forEach((clave) => localStorage.removeItem(clave))
  } catch {
    /* sin almacenamiento no hay nada que borrar */
  }
}

// Devuelve lo que hay en caché para una clave (si sigue vigente) o undefined.
// Permite mostrar datos ya conocidos en el mismo instante, sin pasar por "cargando".
export function leerCache(clave) {
  const guardado = cache.get(clave)
  return guardado && Date.now() - guardado.guardado < VIGENCIA_CACHE ? guardado.datos : undefined
}

// ---------------------------------------------------------------- peticiones
// Hace un fetch con tiempo máximo y convierte cualquier falla en un ErrorApi.
async function pedir(url, opciones = {}) {
  const controlador = new AbortController()
  const temporizador = setTimeout(() => controlador.abort(), TIEMPO_MAXIMO)
  try {
    const respuesta = await fetch(url, { ...opciones, signal: controlador.signal })
    let cuerpo = null
    try {
      cuerpo = await respuesta.json()
    } catch {
      if (respuesta.ok) throw new ErrorApi('respuesta', respuesta.status, 'El servidor respondió con datos que no se pueden leer.')
    }
    if (!respuesta.ok) {
      // GraphQL también puede responder 4xx con un arreglo "errors"; se usa si existe.
      throw cuerpo?.errors && respuesta.status < 500 && respuesta.status !== 404
        ? errorDeGraphQL(cuerpo.errors)
        : errorPorEstado(respuesta.status)
    }
    return cuerpo
  } catch (error) {
    if (error instanceof ErrorApi) throw error
    if (error.name === 'AbortError') throw new ErrorApi('tiempo', null, 'El servidor tardó demasiado en responder.')
    throw new ErrorApi('red', null, 'No se pudo conectar con el servidor.')
  } finally {
    clearTimeout(temporizador)
  }
}

// Lógica común a REST y GraphQL:
// - Si ya está en caché y vigente, responde al instante sin tocar la red.
// - Si ya hay una petición idéntica en curso, comparte esa misma (no se repite).
// - forzar: true se salta el caché (lo usa el botón "Reintentar").
function solicitar(clave, ejecutar, { forzar = false } = {}) {
  const enCache = leerCache(clave)
  if (!forzar && enCache !== undefined) return Promise.resolve(enCache)
  if (enCurso.has(clave)) return enCurso.get(clave)

  peticionIniciada()
  const promesa = ejecutar()
    .then((datos) => {
      cache.set(clave, { datos, guardado: Date.now() })
      guardarRespaldo(clave, datos)
      return datos
    })
    .finally(() => {
      enCurso.delete(clave)
      peticionTerminada()
    })
  enCurso.set(clave, promesa)
  return promesa
}

// ---- API REST: GET a una ruta, por ejemplo "/destinos"
export function claveRest(ruta) {
  return `rest:${ruta}`
}

export function obtener(ruta, opciones) {
  return solicitar(claveRest(ruta), () => pedir(`${URL_REST}${ruta}`), opciones)
}

// ---- API GraphQL: POST con la consulta y sus variables. Devuelve el contenido de "data".
export function claveGraphQL(consulta, variables = {}) {
  return `graphql:${consulta.nombre}:${JSON.stringify(variables)}`
}

export function consultarGraphQL(consulta, variables = {}, opciones) {
  const ejecutar = async () => {
    const cuerpo = await pedir(URL_GRAPHQL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: consulta.texto, variables, operationName: consulta.nombre }),
    })
    if (cuerpo.errors?.length) throw errorDeGraphQL(cuerpo.errors)
    return cuerpo.data
  }
  return solicitar(claveGraphQL(consulta, variables), ejecutar, opciones)
}

// Rutas de la API REST
export const rutas = {
  destinos: '/destinos',
  destino: (id) => `/destinos/${encodeURIComponent(id)}`,
}
