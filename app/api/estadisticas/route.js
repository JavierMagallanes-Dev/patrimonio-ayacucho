import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
export async function GET() {
  try {
    const [
      totalSitios,
      sitiosPatrimonio,
      sitiosServicios,
      sitiosEmergencia,
      totalRutas,
      totalCategorias,
      sitiosMasVisitados
    ] = await Promise.all([
      prisma.sitio.count({ where: { visible: true } }),
      prisma.sitio.count({ where: { visible: true, tipoSitio: 'patrimonio' } }),
      prisma.sitio.count({ where: { visible: true, tipoSitio: 'servicio' } }),
      prisma.sitio.count({ where: { visible: true, tipoSitio: 'emergencia' } }),
      prisma.ruta.count({ where: { visible: true } }),
      prisma.categoria.count(),
      prisma.sitio.findMany({
        where: { visible: true, tipoSitio: 'patrimonio' },
        orderBy: { visitasTotales: 'desc' },
        take: 5,
        select: {
          id: true,
          slug: true,
          nombre: true,
          imagenPrincipal: true,
          visitasTotales: true,
          categoria: {
            select: {
              nombre: true,
              color: true
            }
          }
        }
      })
    ]);

    const estadisticas = {
      totalSitios,
      sitiosPatrimonio,
      sitiosServicios,
      sitiosEmergencia,
      totalRutas,
      totalCategorias,
      sitiosMasVisitados
    };

    return NextResponse.json(estadisticas);
  } catch (error) {
    console.error('Error al obtener estadísticas:', error);
    return NextResponse.json(
      { error: 'Error al obtener estadísticas' },
      { status: 500 }
    );
  }
}