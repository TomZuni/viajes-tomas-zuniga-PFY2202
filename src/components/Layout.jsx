// Estructura común de todas las páginas: encabezado, menú, contenido (<Outlet />) y pie.
import { useEffect } from 'react'
import { Outlet, Link, useLocation, matchPath } from 'react-router-dom'
import IndicadorCarga from './IndicadorCarga.jsx'
import MenuPrincipal from './MenuPrincipal.jsx'
import PanelPruebas from './PanelPruebas.jsx'

const TITULOS = { '/': 'Inicio', '/destinos': 'Destinos', '/mi-viaje': 'Mi viaje' }

export default function Layout({ mockFallo }) {
  const { pathname } = useLocation()

  // Al cambiar de página: subir al inicio y actualizar el título de la pestaña.
  useEffect(() => {
    window.scrollTo(0, 0)
    const titulo = matchPath('/destinos/:id/*', pathname) ? 'Vuelos y hoteles' : (TITULOS[pathname] ?? 'Página no encontrada')
    document.title = `${titulo} | Horizonte Viajes`
  }, [pathname])

  return (
    <div className="flex min-h-screen flex-col">
      <header className="bg-noche-900 text-white">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-2 px-4 py-3">
          <Link to="/" className="flex items-center gap-2 text-lg font-extrabold">
            <span aria-hidden="true">✈️</span> Horizonte Viajes
          </Link>
          <MenuPrincipal />
        </div>
        <IndicadorCarga />
      </header>

      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8">
        {/* Si el navegador no permitió iniciar los servidores mock, se explica en vez de dejar la página en blanco */}
        {mockFallo && (
          <div role="alert" className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-red-900">
            <strong>No se pudieron iniciar las APIs mock.</strong> Este navegador bloqueó el Service Worker que las simula
            (por ejemplo, en una ventana privada). Abre el sitio en una ventana normal para ver los datos.
          </div>
        )}
        <Outlet />
      </main>

      <footer className="mx-auto w-full max-w-5xl px-4 pb-8">
        <PanelPruebas />
        <p className="mt-4 text-center text-sm text-noche-700">
          Horizonte Viajes · Proyecto de Desarrollo Frontend II (PFY2202) · Datos ficticios entregados por APIs mock (REST y GraphQL)
        </p>
      </footer>
    </div>
  )
}
