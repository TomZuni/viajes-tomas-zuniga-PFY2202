// "Base de datos" de los servidores mock (todos los datos son ficticios).
//  - DESTINOS se entrega por la API REST.
//  - VUELOS y HOTELES se entregan por la API GraphQL.
// Todos los viajes salen desde Santiago de Chile (SCL).

export const DESTINOS = [
  {
    id: 1, nombre: 'Cusco', pais: 'Perú', continente: 'América del Sur', icono: '🏔️', mejorEpoca: 'Mayo a septiembre',
    descripcion: 'Antigua capital del Imperio inca, a más de 3.300 metros de altura, puerta de entrada a Machu Picchu.',
    actividades: ['Visitar Machu Picchu', 'Recorrer el Valle Sagrado', 'Montaña de Siete Colores', 'Mercado de San Pedro'],
  },
  {
    id: 2, nombre: 'Buenos Aires', pais: 'Argentina', continente: 'América del Sur', icono: '💃', mejorEpoca: 'Marzo a mayo y septiembre a noviembre',
    descripcion: 'Una ciudad cosmopolita de grandes avenidas, café, fútbol y tango.',
    actividades: ['Show de tango en San Telmo', 'Cementerio de la Recoleta', 'Parrillada en Palermo', 'Teatro Colón'],
  },
  {
    id: 3, nombre: 'Río de Janeiro', pais: 'Brasil', continente: 'América del Sur', icono: '🏖️', mejorEpoca: 'Diciembre a marzo',
    descripcion: 'Playas famosas, cerros sobre el mar y un ambiente festivo todo el año.',
    actividades: ['Cristo Redentor', 'Pan de Azúcar', 'Playa de Ipanema', 'Escalinata Selarón'],
  },
  {
    id: 4, nombre: 'Ciudad de México', pais: 'México', continente: 'América del Norte', icono: '🌮', mejorEpoca: 'Marzo a mayo',
    descripcion: 'Una de las capitales más grandes del mundo, con historia prehispánica, arte y mucha comida.',
    actividades: ['Pirámides de Teotihuacán', 'Museo Frida Kahlo', 'Paseo en trajinera por Xochimilco', 'Tacos al pastor en el Centro'],
  },
  {
    id: 5, nombre: 'Madrid', pais: 'España', continente: 'Europa', icono: '🏰', mejorEpoca: 'Abril a junio y septiembre a octubre',
    descripcion: 'Capital de España: museos de primer nivel, parques enormes y vida nocturna.',
    actividades: ['Museo del Prado', 'Parque del Retiro', 'Palacio Real', 'Tapas en La Latina'],
  },
  {
    id: 6, nombre: 'Roma', pais: 'Italia', continente: 'Europa', icono: '🏛️', mejorEpoca: 'Abril a junio y septiembre a octubre',
    descripcion: 'La ciudad eterna: ruinas imperiales, plazas, fuentes y cocina de barrio.',
    actividades: ['Coliseo Romano', 'Fontana di Trevi', 'Museos Vaticanos', 'Cena en Trastevere'],
  },
]

// salida: fecha y hora local de salida. duracionMin: minutos de vuelo. precio en pesos chilenos (CLP).
const vuelo = (id, destinoId, aerolinea, numero, destino, salida, duracionMin, escalas, precio, asientosDisponibles) => ({
  id, destinoId, aerolinea, numero, origen: 'Santiago (SCL)', destino, salida, duracionMin, escalas, precio, asientosDisponibles,
})

export const VUELOS = [
  vuelo('v101', 1, 'AeroAndes', 'AA 301', 'Cusco (CUZ)', '2027-01-15T07:30:00', 330, 1, 289990, 14),
  vuelo('v102', 1, 'Pacífico Air', 'PA 118', 'Cusco (CUZ)', '2027-01-15T13:10:00', 420, 1, 254990, 3),
  vuelo('v103', 1, 'AeroAndes', 'AA 305', 'Cusco (CUZ)', '2027-01-22T06:45:00', 330, 1, 312990, 0),
  vuelo('v104', 1, 'Cóndor Airways', 'CO 77', 'Cusco (CUZ)', '2027-02-05T09:00:00', 390, 1, 268990, 22),

  vuelo('v201', 2, 'SurAlas', 'SA 410', 'Buenos Aires (EZE)', '2027-01-10T08:15:00', 130, 0, 149990, 31),
  vuelo('v202', 2, 'AeroAndes', 'AA 622', 'Buenos Aires (EZE)', '2027-01-10T19:40:00', 135, 0, 139990, 8),
  vuelo('v203', 2, 'Pacífico Air', 'PA 230', 'Buenos Aires (EZE)', '2027-01-24T11:05:00', 130, 0, 159990, 0),

  vuelo('v301', 3, 'Cóndor Airways', 'CO 510', 'Río de Janeiro (GIG)', '2027-01-18T23:30:00', 245, 0, 329990, 12),
  vuelo('v302', 3, 'SurAlas', 'SA 880', 'Río de Janeiro (GIG)', '2027-01-19T10:20:00', 390, 1, 279990, 25),
  vuelo('v303', 3, 'AeroAndes', 'AA 790', 'Río de Janeiro (GIG)', '2027-02-02T16:45:00', 250, 0, 349990, 2),

  vuelo('v401', 4, 'Pacífico Air', 'PA 900', 'Ciudad de México (MEX)', '2027-01-12T01:20:00', 560, 0, 539990, 9),
  vuelo('v402', 4, 'Cóndor Airways', 'CO 305', 'Ciudad de México (MEX)', '2027-01-13T22:10:00', 720, 1, 459990, 0),
  vuelo('v403', 4, 'AeroAndes', 'AA 940', 'Ciudad de México (MEX)', '2027-02-09T00:50:00', 570, 0, 579990, 17),

  vuelo('v501', 5, 'SurAlas', 'SA 1000', 'Madrid (MAD)', '2027-01-20T21:30:00', 835, 0, 789990, 6),
  vuelo('v502', 5, 'Cóndor Airways', 'CO 700', 'Madrid (MAD)', '2027-01-21T14:05:00', 1010, 1, 699990, 19),
  vuelo('v503', 5, 'Pacífico Air', 'PA 2010', 'Madrid (MAD)', '2027-02-14T22:15:00', 845, 0, 829990, 0),

  vuelo('v601', 6, 'AeroAndes', 'AA 1200', 'Roma (FCO)', '2027-01-25T20:00:00', 1100, 1, 849990, 11),
  vuelo('v602', 6, 'SurAlas', 'SA 1230', 'Roma (FCO)', '2027-02-03T18:40:00', 1180, 2, 769990, 4),
  vuelo('v603', 6, 'Cóndor Airways', 'CO 810', 'Roma (FCO)', '2027-02-20T21:10:00', 1090, 1, 889990, 0),
]

const hotel = (id, destinoId, nombre, zona, estrellas, valoracion, precioNoche, habitacionesDisponibles, servicios) => ({
  id, destinoId, nombre, zona, estrellas, valoracion, precioNoche, habitacionesDisponibles, servicios,
  disponibleDesde: '2027-01-01', disponibleHasta: '2027-03-31',
})

export const HOTELES = [
  hotel('h101', 1, 'Hotel Plaza Inca', 'Centro histórico', 4, 4.6, 89990, 8, ['Desayuno incluido', 'Wi-Fi', 'Traslado al aeropuerto']),
  hotel('h102', 1, 'Posada Valle Sagrado', 'San Blas', 3, 4.4, 54990, 5, ['Wi-Fi', 'Desayuno incluido', 'Calefacción']),
  hotel('h103', 1, 'Mirador Andino Resort', 'Sacsayhuamán', 5, 4.8, 149990, 0, ['Spa', 'Restaurante', 'Wi-Fi', 'Terraza']),

  hotel('h201', 2, 'Hotel Palermo Soho', 'Palermo', 4, 4.5, 79990, 12, ['Desayuno incluido', 'Wi-Fi', 'Gimnasio']),
  hotel('h202', 2, 'Residencial San Telmo', 'San Telmo', 3, 4.2, 49990, 6, ['Wi-Fi', 'Aire acondicionado']),
  hotel('h203', 2, 'Gran Hotel Obelisco', 'Microcentro', 5, 4.7, 139990, 3, ['Piscina', 'Spa', 'Restaurante', 'Wi-Fi']),

  hotel('h301', 3, 'Hotel Ipanema Beach', 'Ipanema', 4, 4.5, 99990, 10, ['Frente a la playa', 'Desayuno incluido', 'Piscina']),
  hotel('h302', 3, 'Pousada Santa Teresa', 'Santa Teresa', 3, 4.6, 59990, 4, ['Wi-Fi', 'Desayuno incluido', 'Terraza']),
  hotel('h303', 3, 'Grand Copacabana Resort', 'Copacabana', 5, 4.7, 169990, 0, ['Piscina', 'Spa', 'Restaurante', 'Wi-Fi']),

  hotel('h401', 4, 'Hotel Reforma Centro', 'Paseo de la Reforma', 4, 4.4, 84990, 15, ['Desayuno incluido', 'Wi-Fi', 'Gimnasio']),
  hotel('h402', 4, 'Casa Roma Boutique', 'Roma Norte', 3, 4.6, 64990, 2, ['Wi-Fi', 'Desayuno incluido']),
  hotel('h403', 4, 'Zócalo Suites', 'Centro histórico', 3, 4.1, 52990, 9, ['Wi-Fi', 'Aire acondicionado']),

  hotel('h501', 5, 'Hotel Gran Vía Plaza', 'Gran Vía', 4, 4.5, 119990, 7, ['Desayuno incluido', 'Wi-Fi', 'Gimnasio']),
  hotel('h502', 5, 'Hostal La Latina', 'La Latina', 2, 4.2, 59990, 11, ['Wi-Fi']),
  hotel('h503', 5, 'Palacio del Retiro', 'Retiro', 5, 4.9, 219990, 1, ['Spa', 'Restaurante', 'Wi-Fi', 'Traslado al aeropuerto']),

  hotel('h601', 6, 'Hotel Trastevere Antico', 'Trastevere', 3, 4.5, 94990, 6, ['Desayuno incluido', 'Wi-Fi']),
  hotel('h602', 6, 'Albergo Colosseo', 'Monti', 4, 4.6, 129990, 0, ['Desayuno incluido', 'Wi-Fi', 'Terraza']),
  hotel('h603', 6, 'Pensione Vaticano', 'Prati', 2, 4.1, 69990, 13, ['Wi-Fi', 'Aire acondicionado']),
]
