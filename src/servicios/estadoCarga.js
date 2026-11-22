// Lleva la cuenta de cuántas peticiones están en curso.
// Es un pequeño "store" que React puede leer con useSyncExternalStore (ver hooks/useCargaGlobal.js).
let pendientes = 0
const oyentes = new Set()

function avisar() {
  oyentes.forEach((oyente) => oyente())
}

export function peticionIniciada() {
  pendientes += 1
  avisar()
}

export function peticionTerminada() {
  pendientes = Math.max(0, pendientes - 1)
  avisar()
}

export function suscribir(oyente) {
  oyentes.add(oyente)
  return () => oyentes.delete(oyente)
}

export function leerPendientes() {
  return pendientes
}
