import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const tipo = searchParams.get('tipo');
    const destacados = searchParams.get('destacados');
    const proximos = searchParams.get('proximos');
    const mes = searchParams.get('mes');

    let where = { visible: true };

    if (tipo) {
      where.tipoEvento = tipo;
    }

    if (destacados === 'true') {
      where.destacado = true;
    }

    if (mes) {
      where.mesEvento = parseInt(mes);
    }

    let orderBy = [
      { destacado: 'desc' },
      { fechaInicio: 'asc' },
      { orden: 'asc' }
    ];

    // Si pide próximos, filtrar por fecha futura
    if (proximos === 'true') {
      where.fechaInicio = {
        gte: new Date()
      };
    }

    const eventos = await prisma.evento.findMany({
      where,
      include: {
        sitio: {
          select: {
            id: true,
            slug: true,
            nombre: true,
            direccion: true
          }
        }
      },
      orderBy
    });

    return NextResponse.json(eventos);
  } catch (error) {
    console.error('Error al obtener eventos:', error);
    return NextResponse.json(
      { error: 'Error al obtener eventos' },
      { status: 500 }
    );
  }
}