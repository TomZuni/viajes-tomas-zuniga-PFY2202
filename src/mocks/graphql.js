// Servidor GraphQL mock: ejecuta de verdad las consultas contra el esquema
// (con la librería "graphql"), igual que lo haría un backend real.
// Si la consulta tiene errores, la respuesta trae un arreglo "errors".
import { buildSchema, graphql, GraphQLError } from 'graphql'
import { ESQUEMA } from './esquema.js'
import { DESTINOS, VUELOS, HOTELES } from './datos.js'

const esquema = buildSchema(ESQUEMA)

// La llegada se calcula sumando la duración a la salida (sin husos horarios, es un mock).
function calcularLlegada(salida, duracionMin) {
  const fecha = new Date(`${salida}Z`)
  fecha.setUTCMinutes(fecha.getUTCMinutes() + duracionMin)
  return fecha.toISOString().slice(0, 19)
}

function verificarDestino(destinoId) {
  if (!DESTINOS.some((d) => String(d.id) === String(destinoId))) {
    throw new GraphQLError(`El destino "${destinoId}" no existe`, { extensions: { code: 'NOT_FOUND' } })
  }
}

// Resolvers: una función por cada campo de Query.
const resolvers = {
  vuelos: ({ destinoId, soloDisponibles }) => {
    verificarDestino(destinoId)
    return VUELOS.filter((v) => String(v.destinoId) === String(destinoId))
      .map((v) => ({ ...v, llegada: calcularLlegada(v.salida, v.duracionMin), disponible: v.asientosDisponibles > 0 }))
      .filter((v) => !soloDisponibles || v.disponible)
      .sort((a, b) => a.precio - b.precio)
  },
  hoteles: ({ destinoId, soloDisponibles }) => {
    verificarDestino(destinoId)
    return HOTELES.filter((h) => String(h.destinoId) === String(destinoId))
      .map((h) => ({ ...h, disponible: h.habitacionesDisponibles > 0 }))
      .filter((h) => !soloDisponibles || h.disponible)
      .sort((a, b) => a.precioNoche - b.precioNoche)
  },
}

export function ejecutarConsulta({ query, variables, operationName }) {
  return graphql({ schema: esquema, source: query, rootValue: resolvers, variableValues: variables, operationName })
}
