import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const tipo = searchParams.get('tipo');

    const where = tipo ? { tipoCategoria: tipo } : {};

    const categorias = await prisma.categoria.findMany({
      where,
      include: {
        _count: {
          select: { sitios: true }
        }
      },
      orderBy: { orden: 'asc' }
    });

    return NextResponse.json(categorias);
  } catch (error) {
    console.error('Error al obtener categorías:', error);
    return NextResponse.json(
      { error: 'Error al obtener categorías' },
      { status: 500 }
    );
  }
}