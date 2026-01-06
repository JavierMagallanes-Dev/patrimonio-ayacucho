const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('🗑️  Limpiando base de datos...');

  // Eliminar en orden para respetar las relaciones
  await prisma.sitioRuta.deleteMany({});
  console.log('  ✓ SitioRuta eliminados');
  
  await prisma.sitio.deleteMany({});
  console.log('  ✓ Sitios eliminados');
  
  await prisma.ruta.deleteMany({});
  console.log('  ✓ Rutas eliminadas');
  
  await prisma.categoria.deleteMany({});
  console.log('  ✓ Categorías eliminadas');

  console.log('\n✅ Base de datos limpia. Ahora ejecuta: node prisma/seed.js');
}

main()
  .catch((e) => {
    console.error('❌ Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
