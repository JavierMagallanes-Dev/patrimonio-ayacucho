const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed de la base de datos...');

  // ==========================================
  // 1. CREAR CATEGORÍAS
  // ==========================================
  console.log('📂 Creando categorías...');

  const categorias = [
    { nombre: 'Iglesias Coloniales', icono: 'church', color: '#8B4513', orden: 1, tipoCategoria: 'patrimonio' },
    { nombre: 'Museos', icono: 'museum', color: '#2E86AB', orden: 2, tipoCategoria: 'patrimonio' },
    { nombre: 'Sitios Arqueológicos', icono: 'landmark', color: '#A23B72', orden: 3, tipoCategoria: 'patrimonio' },
    { nombre: 'Plazas y Espacios', icono: 'map-pin', color: '#48A14D', orden: 4, tipoCategoria: 'patrimonio' },
    { nombre: 'Casas Históricas', icono: 'home', color: '#F18F01', orden: 5, tipoCategoria: 'patrimonio' },

    { nombre: 'Hoteles', icono: 'bed', color: '#FF6B6B', orden: 6, tipoCategoria: 'servicio' },
    { nombre: 'Restaurantes', icono: 'utensils', color: '#FFA500', orden: 7, tipoCategoria: 'servicio' },
    { nombre: 'Cafeterías', icono: 'coffee', color: '#8B4513', orden: 8, tipoCategoria: 'servicio' },
    { nombre: 'Artesanías', icono: 'shopping-bag', color: '#9B59B6', orden: 9, tipoCategoria: 'servicio' },

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
  console.log('\n🏛️ Creando sitios patrimoniales...');

  const sitiosPatrimonio = [
    {
      slug: 'catedral-ayacucho',
      nombre: 'Catedral Basílica de Ayacucho',
      tipoSitio: 'patrimonio',
      categoriaId: categoriasCreadas['Iglesias Coloniales'],
      descripcionCorta: 'Principal templo católico de Ayacucho, construido en el siglo XVII',
      descripcionCompleta:
        'La Catedral Basílica de Ayacucho es uno de los monumentos más emblemáticos de la arquitectura colonial del Perú.',
      direccion: 'Portal Municipal 44, Plaza Mayor',
      latitud: -13.163159,
      longitud: -74.223095,
      referencia: 'Frente a la Plaza Mayor de Huamanga',
      distrito: 'Huamanga',
      telefono: '(066) 312-336',
      horario: 'Lunes a Domingo 6:00 - 20:00',
      precioGeneral: 0,
      tiempoVisitaMinutos: 45,
      imagenPrincipal: 'https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=800',
      imagenPrincipalAntigua: 'https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?w=800',
      anioImagenAntigua: 1920,
      fuenteImagenAntigua: 'Archivo Regional de Ayacucho',
      descripcionImagenAntigua: 'Fachada después del terremoto de 1920.',
      epocaHistorica: 'Colonial',
      anioConstruccion: 1672,
      estadoConservacion: 'Excelente',
      destacado: true,
      verificado: true,
      visible: true,
      orden: 1,

      // =========================
      // GALERÍA ACTUAL
      // =========================
      imagenesGaleriaActuales: [
        {
          url: 'https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=800',
          titulo: 'Fachada principal',
          orden: 1
        },
        {
          url: 'https://images.unsplash.com/photo-1583479616943-e33b104b0e7a?w=800',
          titulo: 'Interior - Nave central',
          orden: 2
        },
        {
          url: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=800',
          titulo: 'Altar mayor',
          orden: 3
        },
        {
          url: 'https://images.unsplash.com/photo-1580674285054-bed31e145f59?w=800',
          titulo: 'Retablos laterales',
          orden: 4
        }
      ],

      // =========================
      // GALERÍA HISTÓRICA
      // =========================
      imagenesGaleriaAntiguas: [
        {
          url: 'https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?w=800',
          anio: 1920,
          fuente: 'Archivo Regional de Ayacucho',
          descripcion: 'Fachada después del terremoto de 1920.',
          orden: 1
        },
        {
          url: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=800',
          anio: 1950,
          fuente: 'Colección Martín Chambi',
          descripcion: 'Reconstrucción completada.',
          orden: 2
        },
        {
          url: 'https://images.unsplash.com/photo-1587974928442-77dc3e0dba72?w=800',
          anio: 1980,
          fuente: 'UNSCH',
          descripcion: 'Interior durante ceremonia religiosa.',
          orden: 3
        }
      ]
    }
  ];

  for (const sitio of sitiosPatrimonio) {
    await prisma.sitio.create({ data: sitio });
    console.log(`  ✓ ${sitio.nombre}`);
  }

  console.log('\n✅ ¡Seed completado exitosamente!');
}

main()
  .catch((e) => {
    console.error('❌ Error en el seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
