import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const categoria = searchParams.get('categoria');
    const tipo = searchParams.get('tipo');
    const destacados = searchParams.get('destacados');
    const limite = searchParams.get('limite');

    const where = {
      visible: true,
      ...(categoria && { categoriaId: categoria }),
      ...(tipo && { tipoSitio: tipo }),
      ...(destacados === 'true' && { destacado: true })
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
      orderBy: [
        { destacado: 'desc' },
        { orden: 'asc' },
        { nombre: 'asc' }
      ],
      ...(limite && { take: parseInt(limite) })
    });

    return NextResponse.json(sitios);
  } catch (error) {
    console.error('Error al obtener sitios:', error);
    return NextResponse.json(
      { error: 'Error al obtener sitios' },
      { status: 500 }
    );
  }
}
