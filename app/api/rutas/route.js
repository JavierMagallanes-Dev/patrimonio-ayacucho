import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const destacadas = searchParams.get('destacadas');

    const where = {
      visible: true,
      ...(destacadas === 'true' && { destacada: true })
    };

    const rutas = await prisma.ruta.findMany({
      where,
      include: {
        _count: {
          select: { sitiosEnRuta: true }
        }
      },
      orderBy: [
        { destacada: 'desc' },
        { orden: 'asc' },
        { nombre: 'asc' }
      ]
    });

    return NextResponse.json(rutas);
  } catch (error) {
    console.error('Error al obtener rutas:', error);
    return NextResponse.json(
      { error: 'Error al obtener rutas' },
      { status: 500 }
    );
  }
}