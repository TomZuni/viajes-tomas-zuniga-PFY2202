// Rutas de la aplicación (React Router):
//   /                         -> Inicio
//   /destinos                 -> Lista de destinos (API REST)
//   /destinos/:id             -> Destino (API REST) con rutas anidadas:
//        vuelos               -> Vuelos del destino (API GraphQL)
//        hoteles              -> Hoteles del destino (API GraphQL)
//   /mi-viaje                 -> Resumen del viaje que se está armando
//   *                         -> Página no encontrada
import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Inicio from './pages/Inicio.jsx'
import Destinos from './pages/Destinos.jsx'
import DetalleDestino from './pages/DetalleDestino.jsx'
import Vuelos from './pages/Vuelos.jsx'
import Hoteles from './pages/Hoteles.jsx'
import MiViaje from './pages/MiViaje.jsx'
import NoEncontrada from './pages/NoEncontrada.jsx'
import { ViajeProvider } from './context/ViajeContext.jsx'

export default function App({ mockFallo = false }) {
  return (
    <ViajeProvider>
      <Routes>
        <Route element={<Layout mockFallo={mockFallo} />}>
          <Route index element={<Inicio />} />
          <Route path="destinos" element={<Destinos />} />
          <Route path="destinos/:id" element={<DetalleDestino />}>
            <Route index element={<Navigate to="vuelos" replace />} />
            <Route path="vuelos" element={<Vuelos />} />
            <Route path="hoteles" element={<Hoteles />} />
          </Route>
          <Route path="mi-viaje" element={<MiViaje />} />
          <Route path="*" element={<NoEncontrada />} />
        </Route>
      </Routes>
    </ViajeProvider>
  )
}
