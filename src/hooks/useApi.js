// Pide datos a la API REST:  const api = useApi('/destinos')
import useConsulta from './useConsulta.js'
import { obtener, claveRest } from '../servicios/api.js'

export default function useApi(ruta) {
  return useConsulta(claveRest(ruta), (opciones) => obtener(ruta, opciones))
}
