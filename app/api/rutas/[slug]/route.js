import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  try {
    // IMPORTANTE: En Next.js 16, params es una Promise
    const { slug } = await params;

    const ruta = await prisma.ruta.findUnique({
      where: { slug },
      include: {
        sitiosEnRuta: {
          include: {
            sitio: {
              include: {
                categoria: true
              }
            }
          },
          orderBy: { orden: 'asc' }
        }
      }
    });

    if (!ruta) {
      return NextResponse.json(
        { error: 'Ruta no encontrada' },
        { status: 404 }
      );
    }

    return NextResponse.json(ruta);
  } catch (error) {
    console.error('Error al obtener ruta:', error);
    return NextResponse.json(
      { error: 'Error al obtener ruta' },
      { status: 500 }
    );
  }
}