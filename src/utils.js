// Funciones para mostrar precios, fechas y duraciones en español de Chile.
const formatoCLP = new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 })
export const formatoPrecio = (valor) => formatoCLP.format(valor)

const formatoDia = new Intl.DateTimeFormat('es-CL', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })
const formatoHora = new Intl.DateTimeFormat('es-CL', { hour: '2-digit', minute: '2-digit', hour12: false })
const formatoDiaCorto = new Intl.DateTimeFormat('es-CL', { day: 'numeric', month: 'short', year: 'numeric' })

// "2027-01-15T07:30:00" -> "vie, 15 ene 2027"
export const formatoFecha = (iso) => formatoDia.format(new Date(iso))
// "2027-01-15T07:30:00" -> "07:30"
export const formatoHoraDe = (iso) => formatoHora.format(new Date(iso))
// "2027-01-01" -> "1 ene 2027"
export const formatoFechaCorta = (iso) => formatoDiaCorto.format(new Date(`${iso}T00:00:00`))
// 330 -> "5 h 30 min"
export const formatoDuracion = (minutos) => {
  const horas = Math.floor(minutos / 60)
  const resto = minutos % 60
  return resto === 0 ? `${horas} h` : `${horas} h ${resto} min`
}
