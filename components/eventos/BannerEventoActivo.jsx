'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Calendar, X } from 'lucide-react';

export default function BannerEventoActivo() {
  const [evento, setEvento] = useState(null);
  const [cerrado, setCerrado] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cargarEventoActivo();
  }, []);

  async function cargarEventoActivo() {
    try {
      // Obtener eventos próximos y destacados
      const res = await fetch('/api/eventos?proximos=true&destacados=true');
      const eventos = await res.json();
      
      if (eventos && eventos.length > 0) {
        // Tomar el más próximo
        setEvento(eventos[0]);
      }
    } catch (error) {
      console.error('Error al cargar evento activo:', error);
    } finally {
      setLoading(false);
    }
  }

  if (loading || !evento || cerrado) return null;

  // Verificar si el evento es dentro de los próximos 30 días
  const diasHasta = Math.ceil((new Date(evento.fechaInicio) - new Date()) / (1000 * 60 * 60 * 24));
  if (diasHasta > 30) return null;

  return (
    <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-4 relative">
      <div className="container mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-1">
          <Calendar size={24} className="flex-shrink-0" />
          <div className="flex-1">
            <p className="font-bold">
              {diasHasta === 0 && '¡HOY! '}
              {diasHasta === 1 && '¡MAÑANA! '}
              {diasHasta > 1 && `En ${diasHasta} días: `}
              {evento.nombre}
            </p>
            <p className="text-sm text-purple-100">
              {new Date(evento.fechaInicio).toLocaleDateString('es-PE', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              })}
            </p>
          </div>
        </div>

        <Link
          href={`/eventos/${evento.slug}`}
          className="px-4 py-2 bg-white text-purple-600 rounded-lg font-semibold hover:bg-purple-50 transition whitespace-nowrap"
        >
          Ver detalles
        </Link>

        <button
          onClick={() => setCerrado(true)}
          className="p-1 hover:bg-white/20 rounded transition"
        >
          <X size={20} />
        </button>
      </div>
    </div>
  );
}