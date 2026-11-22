// Esquema de la API GraphQL mock (lenguaje SDL de GraphQL).
// Define qué se puede consultar: vuelos y hoteles de un destino.
export const ESQUEMA = `
  type Vuelo {
    id: ID!
    destinoId: ID!
    aerolinea: String!
    numero: String!
    origen: String!
    destino: String!
    salida: String!
    llegada: String!
    duracionMin: Int!
    escalas: Int!
    precio: Int!
    asientosDisponibles: Int!
    disponible: Boolean!
  }

  type Hotel {
    id: ID!
    destinoId: ID!
    nombre: String!
    zona: String!
    estrellas: Int!
    valoracion: Float!
    precioNoche: Int!
    servicios: [String!]!
    disponibleDesde: String!
    disponibleHasta: String!
    habitacionesDisponibles: Int!
    disponible: Boolean!
  }

  type Query {
    "Vuelos de un destino, del más barato al más caro."
    vuelos(destinoId: ID!, soloDisponibles: Boolean = false): [Vuelo!]!
    "Hoteles de un destino, del más barato al más caro."
    hoteles(destinoId: ID!, soloDisponibles: Boolean = false): [Hotel!]!
  }
`
