import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const lat = parseFloat(searchParams.get('lat'));
    const lng = parseFloat(searchParams.get('lng'));
    const radio = parseFloat(searchParams.get('radio') || '2'); // km
    const tipo = searchParams.get('tipo');

    if (!lat || !lng) {
      return NextResponse.json(
        { error: 'Se requieren parámetros lat y lng' },
        { status: 400 }
      );
    }

    const where = {
      visible: true,
      ...(tipo && { tipoSitio: tipo })
    };

    const todosSitios = await prisma.sitio.findMany({
      where,
      include: {
        categoria: {
          select: {
            nombre: true,
            color: true,
            icono: true
          }
        }
      }
    });

    // Calcular distancia usando fórmula de Haversine
    const sitiosCercanos = todosSitios
      .map(sitio => {
        const distanciaKm = calcularDistancia(lat, lng, sitio.latitud, sitio.longitud);
        return {
          sitio,
          distanciaKm: Math.round(distanciaKm * 100) / 100,
          distanciaMetros: Math.round(distanciaKm * 1000)
        };
      })
      .filter(item => item.distanciaKm <= radio)
      .sort((a, b) => a.distanciaKm - b.distanciaKm);

    return NextResponse.json(sitiosCercanos);
  } catch (error) {
    console.error('Error al buscar sitios cercanos:', error);
    return NextResponse.json(
      { error: 'Error al buscar sitios cercanos' },
      { status: 500 }
    );
  }
}

// Fórmula de Haversine para calcular distancia entre dos puntos
function calcularDistancia(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radio de la Tierra en km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRad(valor) {
  return (valor * Math.PI) / 180;
}