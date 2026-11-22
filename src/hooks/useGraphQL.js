// Pide datos a la API GraphQL:  const api = useGraphQL(CONSULTA_VUELOS, { destinoId: '1' })
// Devuelve lo mismo que useApi; "datos" es el contenido del campo "data" de la respuesta.
import useConsulta from './useConsulta.js'
import { consultarGraphQL, claveGraphQL } from '../servicios/api.js'

export default function useGraphQL(consulta, variables) {
  return useConsulta(claveGraphQL(consulta, variables), (opciones) => consultarGraphQL(consulta, variables, opciones))
}
