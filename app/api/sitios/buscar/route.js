import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get('q');
    const tipo = searchParams.get('tipo');
    const limite = searchParams.get('limite');

    if (!q || q.length < 2) {
      return NextResponse.json([]);
    }

    const where = {
      visible: true,
      ...(tipo && { tipoSitio: tipo }),
      OR: [
        { nombre: { contains: q, mode: 'insensitive' } },
        { descripcionCorta: { contains: q, mode: 'insensitive' } },
        { direccion: { contains: q, mode: 'insensitive' } }
      ]
    };

    const sitios = await prisma.sitio.findMany({
      where,
      include: {
        categoria: {
          select: {
            nombre: true,
            color: true,
            icono: true
          }
        }
      },
      orderBy: { nombre: 'asc' },
      ...(limite && { take: parseInt(limite) })
    });

    return NextResponse.json(sitios);
  } catch (error) {
    console.error('Error en búsqueda:', error);
    return NextResponse.json(
      { error: 'Error en búsqueda' },
      { status: 500 }
    );
  }
}