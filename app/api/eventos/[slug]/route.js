import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request, { params }) {
  try {
    const { slug } = await params;

    const evento = await prisma.evento.findUnique({
      where: { slug },
      include: {
        sitio: {
          include: {
            categoria: true
          }
        }
      }
    });

    if (!evento) {
      return NextResponse.json(
        { error: 'Evento no encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json(evento);
  } catch (error) {
    console.error('Error al obtener evento:', error);
    return NextResponse.json(
      { error: 'Error al obtener evento' },
      { status: 500 }
    );
  }
}