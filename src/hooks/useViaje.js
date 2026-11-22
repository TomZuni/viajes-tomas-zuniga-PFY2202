// Hook para leer o modificar el viaje que arma el usuario.
import { useContext } from 'react'
import { ViajeContext } from '../context/ViajeContext.jsx'

export default function useViaje() {
  const contexto = useContext(ViajeContext)
  if (!contexto) throw new Error('useViaje debe usarse dentro de <ViajeProvider>')
  return contexto
}
