// Consultas GraphQL de la aplicación. Cada una tiene un nombre y el texto de la consulta.
// En GraphQL el cliente decide QUÉ campos quiere recibir: aquí se piden solo los que la pantalla muestra.
// Las variables ($destinoId, $soloDisponibles) se envían aparte, sin armar el texto a mano.

export const CONSULTA_VUELOS = {
  nombre: 'Vuelos',
  texto: `
    query Vuelos($destinoId: ID!, $soloDisponibles: Boolean) {
      vuelos(destinoId: $destinoId, soloDisponibles: $soloDisponibles) {
        id
        aerolinea
        numero
        origen
        destino
        salida
        llegada
        duracionMin
        escalas
        precio
        asientosDisponibles
        disponible
      }
    }
  `,
}

export const CONSULTA_HOTELES = {
  nombre: 'Hoteles',
  texto: `
    query Hoteles($destinoId: ID!, $soloDisponibles: Boolean) {
      hoteles(destinoId: $destinoId, soloDisponibles: $soloDisponibles) {
        id
        nombre
        zona
        estrellas
        valoracion
        precioNoche
        servicios
        disponibleDesde
        disponibleHasta
        habitacionesDisponibles
        disponible
      }
    }
  `,
}
