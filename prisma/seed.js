const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed de la base de datos...');

  // ==========================================
  // 1. CREAR CATEGORÍAS
  // ==========================================
  console.log('📂 Creando categorías...');

  const categorias = [
    // PATRIMONIO
    { nombre: 'Iglesias Coloniales', icono: 'church', color: '#8B4513', orden: 1, tipoCategoria: 'patrimonio' },
    { nombre: 'Museos', icono: 'museum', color: '#2E86AB', orden: 2, tipoCategoria: 'patrimonio' },
    { nombre: 'Sitios Arqueológicos', icono: 'landmark', color: '#A23B72', orden: 3, tipoCategoria: 'patrimonio' },
    { nombre: 'Plazas y Espacios', icono: 'map-pin', color: '#48A14D', orden: 4, tipoCategoria: 'patrimonio' },
    { nombre: 'Casas Históricas', icono: 'home', color: '#F18F01', orden: 5, tipoCategoria: 'patrimonio' },
    
    // SERVICIOS
    { nombre: 'Hoteles', icono: 'bed', color: '#FF6B6B', orden: 6, tipoCategoria: 'servicio' },
    { nombre: 'Restaurantes', icono: 'utensils', color: '#FFA500', orden: 7, tipoCategoria: 'servicio' },
    { nombre: 'Cafeterías', icono: 'coffee', color: '#8B4513', orden: 8, tipoCategoria: 'servicio' },
    { nombre: 'Artesanías', icono: 'shopping-bag', color: '#9B59B6', orden: 9, tipoCategoria: 'servicio' },
    
    // EMERGENCIAS
    { nombre: 'Comisarías', icono: 'shield', color: '#1E3A8A', orden: 10, tipoCategoria: 'emergencia' },
    { nombre: 'Hospitales', icono: 'heart-pulse', color: '#DC2626', orden: 11, tipoCategoria: 'emergencia' },
    { nombre: 'Farmacias', icono: 'pill', color: '#059669', orden: 12, tipoCategoria: 'emergencia' }
  ];

  const categoriasCreadas = {};
  
  for (const cat of categorias) {
    const categoria = await prisma.categoria.create({ data: cat });
    categoriasCreadas[cat.nombre] = categoria.id;
    console.log(`  ✓ ${cat.nombre}`);
  }

  // ==========================================
  // 2. CREAR SITIOS PATRIMONIALES
  // ==========================================
  console.log('\n🏛️  Creando sitios patrimoniales...');

  const sitiosPatrimonio = [
    {
      slug: 'catedral-ayacucho',
      nombre: 'Catedral Basílica de Ayacucho',
      tipoSitio: 'patrimonio',
      categoriaId: categoriasCreadas['Iglesias Coloniales'],
      descripcionCorta: 'Principal templo católico de Ayacucho, construido en el siglo XVII con impresionante arquitectura barroca',
      descripcionCompleta: 'La Catedral Basílica de Ayacucho es uno de los monumentos más emblemáticos de la arquitectura colonial en el Perú. Construida entre 1612 y 1672, destaca por su impresionante fachada barroca y sus tres naves interiores adornadas con retablos dorados del siglo XVII.',
      direccion: 'Portal Municipal 44, Plaza Mayor',
      latitud: -13.163159,
      longitud: -74.223095,
      referencia: 'Frente a la Plaza Mayor de Huamanga',
      distrito: 'Huamanga',
      telefono: '(066) 312-336',
      horario: 'Lunes a Domingo 6:00 - 20:00',
      precioGeneral: 0,
      precioEstudiante: 0,
      precioNino: 0,
      tiempoVisitaMinutos: 45,
      imagenPrincipal: 'https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=800',
      imagenPrincipalAntigua: 'https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?w=800',
      anioImagenAntigua: 1920,
      fuenteImagenAntigua: 'Archivo Regional de Ayacucho',
      descripcionImagenAntigua: 'Fachada de la Catedral después del terremoto de 1920. Se observan los daños estructurales en la torre sur.',
      epocaHistorica: 'Colonial',
      anioConstruccion: 1672,
      estadoConservacion: 'Excelente',
      declaratoriaPatrimonio: 'Monumento Histórico Nacional',
      destacado: true,
      verificado: true,
      visible: true,
      orden: 1
    },
    {
      slug: 'templo-santo-domingo',
      nombre: 'Templo de Santo Domingo',
      tipoSitio: 'patrimonio',
      categoriaId: categoriasCreadas['Iglesias Coloniales'],
      descripcionCorta: 'Una de las iglesias más antiguas de Ayacucho, fundada en 1548 por los dominicos',
      descripcionCompleta: 'El Templo de Santo Domingo es una de las construcciones religiosas más antiguas de Ayacucho, fundada en 1548. Destaca por su arquitectura renacentista y sus arcos de medio punto.',
      direccion: 'Jr. 9 de Diciembre 302',
      latitud: -13.160523,
      longitud: -74.223456,
      distrito: 'Huamanga',
      horario: 'Lunes a Domingo 7:00 - 19:00',
      precioGeneral: 0,
      tiempoVisitaMinutos: 30,
      imagenPrincipal: 'https://images.unsplash.com/photo-1583479616943-e33b104b0e7a?w=800',
      imagenPrincipalAntigua: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=800',
      anioImagenAntigua: 1950,
      fuenteImagenAntigua: 'Colección Martín Chambi',
      epocaHistorica: 'Colonial',
      anioConstruccion: 1548,
      estadoConservacion: 'Bueno',
      destacado: true,
      verificado: true,
      visible: true,
      orden: 2
    },
    {
      slug: 'museo-memoria',
      nombre: 'Museo de la Memoria',
      tipoSitio: 'patrimonio',
      categoriaId: categoriasCreadas['Museos'],
      descripcionCorta: 'Espacio dedicado a la memoria histórica del conflicto armado interno en el Perú',
      descripcionCompleta: 'El Museo de la Memoria "Para que no se repita" es un espacio de reflexión sobre el conflicto armado interno que vivió el Perú entre 1980 y 2000.',
      direccion: 'Prolongación Libertad 1229',
      latitud: -13.164892,
      longitud: -74.227123,
      distrito: 'Huamanga',
      telefono: '(066) 312-459',
      email: 'museo@memoria.gob.pe',
      horario: 'Martes a Domingo 9:00 - 17:00',
      precioGeneral: 5,
      precioEstudiante: 2,
      precioNino: 0,
      tiempoVisitaMinutos: 90,
      imagenPrincipal: 'https://images.unsplash.com/photo-1580674285054-bed31e145f59?w=800',
      epocaHistorica: 'Contemporáneo',
      estadoConservacion: 'Excelente',
      destacado: true,
      verificado: true,
      visible: true,
      orden: 3
    },
    {
      slug: 'complejo-wari',
      nombre: 'Complejo Arqueológico de Wari',
      tipoSitio: 'patrimonio',
      categoriaId: categoriasCreadas['Sitios Arqueológicos'],
      descripcionCorta: 'Capital del Imperio Wari, ciudad preinca que dominó los Andes centrales',
      descripcionCompleta: 'El Complejo Arqueológico de Wari fue la capital del primer imperio andino que se desarrolló entre los años 600 y 1100 d.C. Abarca más de 2000 hectáreas.',
      direccion: 'Carretera Ayacucho-Quinua Km 22',
      latitud: -13.054167,
      longitud: -74.188889,
      distrito: 'Quinua',
      telefono: '(066) 312-056',
      horario: 'Martes a Domingo 9:00 - 17:00',
      precioGeneral: 10,
      precioEstudiante: 5,
      precioNino: 0,
      tiempoVisitaMinutos: 120,
      imagenPrincipal: 'https://images.unsplash.com/photo-1587974928442-77dc3e0dba72?w=800',
      imagenPrincipalAntigua: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=800',
      anioImagenAntigua: 1950,
      fuenteImagenAntigua: 'Universidad Nacional San Cristóbal de Huamanga',
      epocaHistorica: 'Prehispánico',
      anioConstruccion: 600,
      estadoConservacion: 'Regular',
      declaratoriaPatrimonio: 'Patrimonio Cultural de la Nación',
      destacado: true,
      verificado: true,
      visible: true,
      orden: 4
    },
    {
      slug: 'plaza-mayor-huamanga',
      nombre: 'Plaza Mayor de Huamanga',
      tipoSitio: 'patrimonio',
      categoriaId: categoriasCreadas['Plazas y Espacios'],
      descripcionCorta: 'Corazón histórico de Ayacucho, rodeada de casonas coloniales y portales',
      descripcionCompleta: 'La Plaza Mayor de Huamanga es el centro histórico y social de Ayacucho. Rodeada de portales coloniales, la Catedral y edificios históricos, es el punto de encuentro de la ciudad.',
      direccion: 'Plaza Mayor, Centro Histórico',
      latitud: -13.163333,
      longitud: -74.223611,
      distrito: 'Huamanga',
      horario: 'Abierto 24 horas',
      precioGeneral: 0,
      tiempoVisitaMinutos: 30,
      imagenPrincipal: 'https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?w=800',
      epocaHistorica: 'Colonial',
      anioConstruccion: 1540,
      estadoConservacion: 'Excelente',
      destacado: true,
      verificado: true,
      visible: true,
      orden: 5
    }
  ];

  for (const sitio of sitiosPatrimonio) {
    await prisma.sitio.create({ data: sitio });
    console.log(`  ✓ ${sitio.nombre}`);
  }

  // ==========================================
  // 3. CREAR SERVICIOS TURÍSTICOS
  // ==========================================
  console.log('\n🏨 Creando servicios turísticos...');

  const servicios = [
    {
      slug: 'hotel-plaza-armas',
      nombre: 'Hotel Plaza de Armas',
      tipoSitio: 'servicio',
      categoriaId: categoriasCreadas['Hoteles'],
      descripcionCorta: 'Hotel boutique en pleno centro histórico con vista a la Plaza Mayor',
      descripcionCompleta: 'Hotel Plaza de Armas ofrece habitaciones cómodas en una casona colonial restaurada, con vista privilegiada a la Plaza Mayor de Huamanga.',
      direccion: 'Portal Constitución 18',
      latitud: -13.163200,
      longitud: -74.223400,
      distrito: 'Huamanga',
      telefono: '(066) 312-202',
      whatsapp: '+51966123456',
      email: 'reservas@hotelplazaarmas.com',
      sitioWeb: 'www.hotelplazaarmas.com',
      horario: 'Recepción 24 horas',
      rangoPrecios: 'S/ 120-180',
      tipoAlojamiento: 'Hotel',
      numeroHabitaciones: 25,
      capacidadPersonas: 50,
      tieneEstacionamiento: true,
      aceptaTarjetas: true,
      tieneWifi: true,
      esAccesible: false,
      serviciosAdicionales: ['desayuno', 'room service', 'wifi gratuito', 'agua caliente'],
      imagenPrincipal: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
      destacado: true,
      verificado: true,
      visible: true,
      orden: 1
    },
    {
      slug: 'restaurante-monasterio',
      nombre: 'Restaurante El Monasterio',
      tipoSitio: 'servicio',
      categoriaId: categoriasCreadas['Restaurantes'],
      descripcionCorta: 'Cocina tradicional ayacuchana en ambiente colonial',
      descripcionCompleta: 'Restaurante especializado en comida típica ayacuchana, ubicado en una casona colonial del siglo XVII.',
      direccion: 'Jr. 28 de Julio 178',
      latitud: -13.163800,
      longitud: -74.223100,
      distrito: 'Huamanga',
      telefono: '(066) 312-505',
      whatsapp: '+51966789012',
      horario: 'Lunes a Domingo 12:00 - 22:00',
      rangoPrecios: 'S/ 25-50',
      especialidadCocina: 'Criolla ayacuchana',
      aceptaTarjetas: true,
      tieneWifi: true,
      serviciosAdicionales: ['menú del día', 'delivery', 'reservas'],
      imagenPrincipal: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800',
      destacado: true,
      verificado: true,
      visible: true,
      orden: 1
    },
    {
      slug: 'cafe-tradicion',
      nombre: 'Café Tradición',
      tipoSitio: 'servicio',
      categoriaId: categoriasCreadas['Cafeterías'],
      descripcionCorta: 'Café acogedor con repostería artesanal y café orgánico peruano',
      descripcionCompleta: 'Cafetería especializada en café orgánico de la región, con repostería artesanal y ambiente acogedor.',
      direccion: 'Jr. Libertad 156',
      latitud: -13.164100,
      longitud: -74.223500,
      distrito: 'Huamanga',
      telefono: '(066) 312-678',
      horario: 'Lunes a Sábado 8:00 - 20:00',
      rangoPrecios: 'S/ 8-20',
      tieneWifi: true,
      aceptaTarjetas: true,
      serviciosAdicionales: ['wifi gratuito', 'postres caseros'],
      imagenPrincipal: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800',
      verificado: true,
      visible: true,
      orden: 1
    }
  ];

  for (const servicio of servicios) {
    await prisma.sitio.create({ data: servicio });
    console.log(`  ✓ ${servicio.nombre}`);
  }

  // ==========================================
  // 4. CREAR PUNTOS DE EMERGENCIA
  // ==========================================
  console.log('\n🚨 Creando puntos de emergencia...');

  const emergencias = [
    {
      slug: 'comisaria-turismo',
      nombre: 'Comisaría de Turismo Ayacucho',
      tipoSitio: 'emergencia',
      categoriaId: categoriasCreadas['Comisarías'],
      descripcionCorta: 'Comisaría especializada en atención al turista',
      descripcionCompleta: 'Comisaría de la Policía Nacional del Perú especializada en brindar seguridad y asistencia a turistas nacionales y extranjeros.',
      direccion: 'Jr. 28 de Julio 325',
      latitud: -13.164500,
      longitud: -74.223800,
      distrito: 'Huamanga',
      telefono: '(066) 312-455',
      telefonoEmergencia: '105',
      horario: 'Atención 24 horas',
      atencion24h: true,
      imagenPrincipal: 'https://images.unsplash.com/photo-1590856029826-c7a73142bbf1?w=800',
      verificado: true,
      visible: true,
      orden: 1
    },
    {
      slug: 'hospital-regional-ayacucho',
      nombre: 'Hospital Regional de Ayacucho',
      tipoSitio: 'emergencia',
      categoriaId: categoriasCreadas['Hospitales'],
      descripcionCorta: 'Principal hospital público de la región con servicio de emergencias 24h',
      descripcionCompleta: 'Hospital de referencia regional con servicios de emergencia, hospitalización y especialidades médicas.',
      direccion: 'Av. Independencia 355',
      latitud: -13.167890,
      longitud: -74.226789,
      distrito: 'Huamanga',
      telefono: '(066) 312-180',
      telefonoEmergencia: '116',
      horario: 'Emergencias 24 horas',
      atencion24h: true,
      especialidadesMedicas: ['urgencias', 'traumatología', 'pediatría', 'medicina general'],
      imagenPrincipal: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800',
      destacado: true,
      verificado: true,
      visible: true,
      orden: 1
    },
    {
      slug: 'farmacia-universal',
      nombre: 'Farmacia Universal - 24 Horas',
      tipoSitio: 'emergencia',
      categoriaId: categoriasCreadas['Farmacias'],
      descripcionCorta: 'Farmacia con atención las 24 horas del día',
      descripcionCompleta: 'Farmacia con amplio stock de medicamentos y atención continua las 24 horas del día.',
      direccion: 'Jr. 28 de Julio 167',
      latitud: -13.163900,
      longitud: -74.223300,
      distrito: 'Huamanga',
      telefono: '(066) 312-789',
      horario: 'Abierto 24 horas',
      atencion24h: true,
      imagenPrincipal: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=800',
      verificado: true,
      visible: true,
      orden: 1
    }
  ];

  for (const emergencia of emergencias) {
    await prisma.sitio.create({ data: emergencia });
    console.log(`  ✓ ${emergencia.nombre}`);
  }

  // ==========================================
  // 5. CREAR RUTAS TEMÁTICAS
  // ==========================================
  console.log('\n🗺️  Creando rutas temáticas...');

  const ruta1 = await prisma.ruta.create({
    data: {
      slug: 'centro-historico-colonial',
      nombre: 'Ruta del Centro Histórico Colonial',
      descripcion: 'Recorrido por las principales iglesias y casonas coloniales del centro de Huamanga. Esta ruta te llevará por 400 años de historia, desde la fundación española hasta la época republicana.',
      duracionHoras: 3,
      distanciaKm: 2.5,
      dificultad: 'facil',
      tipoRuta: 'a_pie',
      puntoInicio: 'Plaza Mayor de Huamanga',
      puntoFin: 'Plaza Mayor de Huamanga',
      mejorEpoca: 'Todo el año (evitar días de lluvia intensa)',
      recomendaciones: 'Llevar cámara fotográfica, protector solar, agua. Usar calzado cómodo para caminar en empedrado.',
      queTraer: ['agua', 'cámara', 'protector solar', 'sombrero'],
      imagenPortada: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=800',
      destacada: true,
      visible: true,
      orden: 1
    }
  });

  console.log(`  ✓ ${ruta1.nombre}`);

  // ==========================================
  // 6. ASOCIAR SITIOS A LA RUTA
  // ==========================================
  console.log('\n🔗 Asociando sitios a rutas...');

  const sitio1 = await prisma.sitio.findUnique({ where: { slug: 'catedral-ayacucho' } });
  const sitio2 = await prisma.sitio.findUnique({ where: { slug: 'templo-santo-domingo' } });
  const sitio5 = await prisma.sitio.findUnique({ where: { slug: 'plaza-mayor-huamanga' } });

  await prisma.sitioRuta.create({
    data: {
      rutaId: ruta1.id,
      sitioId: sitio5.id,
      orden: 1,
      tiempoPermanenciaMin: 20,
      notas: 'Punto de inicio. Observar la arquitectura colonial de los portales.'
    }
  });

  await prisma.sitioRuta.create({
    data: {
      rutaId: ruta1.id,
      sitioId: sitio1.id,
      orden: 2,
      tiempoPermanenciaMin: 45,
      notas: 'Visitar el interior. Observar los retablos barrocos y la fachada churrigueresca.'
    }
  });

  await prisma.sitioRuta.create({
    data: {
      rutaId: ruta1.id,
      sitioId: sitio2.id,
      orden: 3,
      tiempoPermanenciaMin: 30,
      notas: 'Caminar 3 cuadras al norte. Una de las iglesias más antiguas de Ayacucho.'
    }
  });

  console.log('  ✓ Sitios asociados a la ruta');

  // ==========================================
  // RESUMEN
  // ==========================================
  console.log('\n✅ ¡Seed completado exitosamente!\n');
  console.log('📊 Resumen:');
  console.log(`   • ${categorias.length} categorías creadas`);
  console.log(`   • ${sitiosPatrimonio.length} sitios patrimoniales`);
  console.log(`   • ${servicios.length} servicios turísticos`);
  console.log(`   • ${emergencias.length} puntos de emergencia`);
  console.log(`   • 1 ruta temática con 3 paradas\n`);
}

main()
  .catch((e) => {
    console.error('❌ Error en el seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });