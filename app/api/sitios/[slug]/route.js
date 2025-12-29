import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  try {
    // IMPORTANTE: En Next.js 16, params es una Promise
    const { slug } = await params;

    const sitio = await prisma.sitio.findUnique({
      where: { slug },
      include: {
        categoria: true
      }
    });

    if (!sitio) {
      return NextResponse.json(
        { error: 'Sitio no encontrado' },
        { status: 404 }
      );
    }

    // Incrementar contador de visitas
    await prisma.sitio.update({
      where: { slug },
      data: {
        visitasTotales: {
          increment: 1
        }
      }
    });

    return NextResponse.json(sitio);
  } catch (error) {
    console.error('Error al obtener sitio:', error);
    return NextResponse.json(
      { error: 'Error al obtener sitio' },
      { status: 500 }
    );
  }
}