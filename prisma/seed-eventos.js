const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('🎉 Iniciando seed de eventos y festividades...');

  // Obtener algunos sitios para relacionar
  const catedral = await prisma.sitio.findUnique({ where: { slug: 'catedral-ayacucho' } });
  const plazaMayor = await prisma.sitio.findUnique({ where: { slug: 'plaza-mayor-huamanga' } });

  const eventos = [
    {
      slug: 'semana-santa-ayacucho',
      nombre: 'Semana Santa en Ayacucho',
      descripcionCorta: 'La celebración religiosa más importante del Perú con procesiones espectaculares',
      descripcion: `La Semana Santa de Ayacucho es considerada una de las celebraciones religiosas más importantes y espectaculares del Perú y de toda América Latina. Durante 10 días, la ciudad se viste de fiesta con procesiones diarias, alfombras de flores, ceremonias religiosas y manifestaciones culturales que atraen a miles de visitantes nacionales y extranjeros.`,
      tipoEvento: 'religioso',
      fechaInicio: new Date('2025-04-13'),
      fechaFin: new Date('2025-04-20'),
      esAnual: true,
      mesEvento: 4, // Abril (varía según calendario litúrgico)
      sitioId: catedral?.id,
      ubicacionGeneral: 'Centro Histórico de Ayacucho',
      horario: 'Actividades desde las 6:00 AM hasta las 11:00 PM',
      programacion: [
        { dia: 'Domingo de Ramos', actividades: 'Bendición de palmas y procesión', hora: '10:00 AM' },
        { dia: 'Lunes Santo', actividades: 'Procesión del Señor del Huerto', hora: '7:00 PM' },
        { dia: 'Martes Santo', actividades: 'Procesión de la Virgen Dolorosa', hora: '7:00 PM' },
        { dia: 'Miércoles Santo', actividades: 'Procesión del Señor del Prendimiento', hora: '7:00 PM' },
        { dia: 'Jueves Santo', actividades: 'Visita a las 7 iglesias, Última Cena', hora: '6:00 PM' },
        { dia: 'Viernes Santo', actividades: 'Vía Crucis y Santo Sepulcro', hora: '3:00 PM' },
        { dia: 'Sábado de Gloria', actividades: 'Vigilia Pascual', hora: '8:00 PM' },
        { dia: 'Domingo de Resurrección', actividades: 'Procesión de Pascua', hora: '6:00 AM' }
      ],
      imagenPortada: 'https://images.unsplash.com/photo-1584361853901-dd1904a95ccd?w=1200',
      imagenesGaleria: [
        { url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800', titulo: 'Procesión nocturna' },
        { url: 'https://images.unsplash.com/photo-1533094602939-d13cea5e7d8b?w=800', titulo: 'Alfombras de flores' },
        { url: 'https://images.unsplash.com/photo-1601933973783-43cf8a7d4c5f?w=800', titulo: 'Fieles en procesión' }
      ],
      entrada: 'Gratuito (actividades religiosas), algunos eventos culturales pueden tener costo',
      recomendaciones: 'Reservar alojamiento con meses de anticipación. Usar ropa cómoda y respetuosa. Llevar agua y protector solar. Las calles están muy concurridas.',
      queTraer: ['agua', 'protector solar', 'cámara', 'ropa cómoda', 'efectivo'],
      organizador: 'Arquidiócesis de Ayacucho',
      telefono: '(066) 312-336',
      destacado: true,
      visible: true,
      orden: 1
    },
    {
      slug: 'carnavales-ayacucho',
      nombre: 'Carnavales de Ayacucho',
      descripcionCorta: 'Celebración con música, danza, yunzas y tradición ayacuchana',
      descripcion: `Los Carnavales de Ayacucho son una fiesta colorida y alegre que se celebra en febrero o marzo. Durante estos días, la ciudad se llena de música, bailes, juegos con agua, las tradicionales yunzas (corta monte) y mucha alegría. Es una de las festividades más esperadas por los ayacuchanos.`,
      tipoEvento: 'festividad',
      fechaInicio: new Date('2025-02-28'),
      fechaFin: new Date('2025-03-05'),
      esAnual: true,
      mesEvento: 2, // Febrero/Marzo (varía)
      sitioId: plazaMayor?.id,
      ubicacionGeneral: 'Todo Ayacucho',
      horario: 'Actividades durante todo el día',
      programacion: [
        { dia: 'Sábado', actividades: 'Corso de Carnaval, yunza', hora: '3:00 PM' },
        { dia: 'Domingo', actividades: 'Yunza, juegos tradicionales', hora: '11:00 AM' },
        { dia: 'Lunes', actividades: 'Yunza familiar', hora: '2:00 PM' },
        { dia: 'Martes', actividades: 'Carnaval de compadres', hora: '4:00 PM' }
      ],
      imagenPortada: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1200',
      imagenesGaleria: [
        { url: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800', titulo: 'Yunza' },
        { url: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800', titulo: 'Danzantes' }
      ],
      entrada: 'Gratuito (eventos públicos)',
      recomendaciones: 'Llevar ropa que pueda mojarse. Participar con respeto de las tradiciones. Cuidar pertenencias en lugares concurridos.',
      queTraer: ['ropa para mojarse', 'toalla', 'cambio de ropa', 'cámara impermeable', 'buen humor'],
      organizador: 'Municipalidad Provincial de Huamanga',
      destacado: true,
      visible: true,
      orden: 2
    },
    {
      slug: 'dia-ayacucho',
      nombre: 'Aniversario de Ayacucho',
      descripcionCorta: 'Celebración del aniversario de fundación española de la ciudad',
      descripcion: `El 25 de abril se celebra el aniversario de la fundación española de Ayacucho (Huamanga). Durante toda la semana se realizan actividades culturales, desfiles cívicos, concursos, ferias gastronómicas y eventos artísticos que resaltan la identidad y cultura ayacuchana.`,
      tipoEvento: 'cultural',
      fechaInicio: new Date('2025-04-20'),
      fechaFin: new Date('2025-04-27'),
      esAnual: true,
      mesEvento: 4,
      ubicacionGeneral: 'Centro de Ayacucho',
      horario: 'Eventos durante toda la semana',
      programacion: [
        { dia: '25 de abril', actividades: 'Desfile cívico militar, Serenata', hora: '9:00 AM' },
        { dia: 'Semana', actividades: 'Ferias, concursos, eventos culturales', hora: 'Todo el día' }
      ],
      imagenPortada: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=1200',
      entrada: 'Gratuito',
      recomendaciones: 'Participar en las actividades culturales. Probar la gastronomía local en las ferias.',
      queTraer: ['cámara', 'ropa cómoda', 'efectivo para ferias'],
      organizador: 'Municipalidad Provincial de Huamanga',
      telefono: '(066) 312-210',
      destacado: true,
      visible: true,
      orden: 3
    },
    {
      slug: 'todos-santos-ayacucho',
      nombre: 'Todos los Santos',
      descripcionCorta: 'Celebración tradicional visitando cementerios y honrando a los difuntos',
      descripcion: `El 1 y 2 de noviembre, Ayacucho celebra el Día de Todos los Santos con tradiciones únicas. Las familias visitan los cementerios llevando flores, velas y ofrendas. Es una celebración que mezcla la fe católica con costumbres ancestrales andinas.`,
      tipoEvento: 'religioso',
      fechaInicio: new Date('2025-11-01'),
      fechaFin: new Date('2025-11-02'),
      esAnual: true,
      mesEvento: 11,
      ubicacionGeneral: 'Cementerios y templos de Ayacucho',
      horario: 'Desde las 8:00 AM',
      imagenPortada: 'https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=1200',
      entrada: 'Gratuito',
      recomendaciones: 'Respetar las ceremonias y momentos de recogimiento. Llevar flores si desea participar.',
      queTraer: ['flores', 'velas', 'agua'],
      destacado: false,
      visible: true,
      orden: 4
    },
    {
      slug: 'festival-tupac-amaru',
      nombre: 'Festival de la Cultura Inca - Túpac Amaru',
      descripcionCorta: 'Festival cultural que rememora la cultura inca y la figura de Túpac Amaru',
      descripcion: `Festival anual que celebra la herencia inca de Ayacucho, con presentaciones de danza, música, teatro y exposiciones sobre la cultura andina. Se realizan homenajes a Túpac Amaru II y se promueve la identidad cultural ayacuchana.`,
      tipoEvento: 'cultural',
      fechaInicio: new Date('2025-05-18'),
      fechaFin: new Date('2025-05-18'),
      esAnual: true,
      mesEvento: 5,
      ubicacionGeneral: 'Plaza Mayor y espacios culturales',
      horario: '10:00 AM - 8:00 PM',
      imagenPortada: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1200',
      entrada: 'Gratuito',
      recomendaciones: 'Llegar temprano para buenos lugares. Participar en talleres culturales.',
      organizador: 'Dirección Desconcentrada de Cultura de Ayacucho',
      destacado: false,
      visible: true,
      orden: 5
    }
  ];

  for (const evento of eventos) {
    await prisma.evento.create({ data: evento });
    console.log(`  ✓ ${evento.nombre}`);
  }

  console.log('\n✅ Seed de eventos completado!');
  console.log(`📊 Total: ${eventos.length} eventos creados\n`);
}

main()
  .catch((e) => {
    console.error('❌ Error en el seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });