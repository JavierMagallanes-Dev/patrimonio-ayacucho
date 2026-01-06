'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function CalendarioEventos({ eventos = [] }) {
  const [mesActual, setMesActual] = useState(new Date().getMonth());
  const [anioActual, setAnioActual] = useState(new Date().getFullYear());

  const meses = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  const mesAnterior = () => {
    if (mesActual === 0) {
      setMesActual(11);
      setAnioActual(anioActual - 1);
    } else {
      setMesActual(mesActual - 1);
    }
  };

  const mesSiguiente = () => {
    if (mesActual === 11) {
      setMesActual(0);
      setAnioActual(anioActual + 1);
    } else {
      setMesActual(mesActual + 1);
    }
  };

  // Filtrar eventos del mes actual
  const eventosDelMes = eventos.filter((evento) => {
    const fechaEvento = new Date(evento.fechaInicio);
    return (
      fechaEvento.getMonth() === mesActual &&
      (fechaEvento.getFullYear() === anioActual || evento.esAnual)
    );
  });

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {/* Header del calendario */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={mesAnterior}
          className="p-2 hover:bg-gray-100 rounded-full transition"
        >
          <ChevronLeft size={24} />
        </button>

        <h3 className="text-xl font-bold">
          {meses[mesActual]} {anioActual}
        </h3>

        <button
          onClick={mesSiguiente}
          className="p-2 hover:bg-gray-100 rounded-full transition"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Lista de eventos */}
      {eventosDelMes.length > 0 ? (
        <div className="space-y-3">
          {eventosDelMes.map((evento) => (
            <Link
              key={evento.id}
              href={`/eventos/${evento.slug}`}
              className="block p-4 border-l-4 border-amber-600 bg-amber-50 hover:bg-amber-100 rounded transition"
            >
              <h4 className="font-semibold text-gray-900 mb-1">
                {evento.nombre}
              </h4>

              <p className="text-sm text-gray-600">
                {new Date(evento.fechaInicio).toLocaleDateString('es-PE', {
                  day: 'numeric',
                  month: 'long'
                })}

                {evento.fechaFin &&
                  new Date(evento.fechaInicio).getTime() !==
                    new Date(evento.fechaFin).getTime() && (
                    <>
                      {' '}–{' '}
                      {new Date(evento.fechaFin).toLocaleDateString('es-PE', {
                        day: 'numeric',
                        month: 'long'
                      })}
                    </>
                  )}
              </p>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 py-8">
          No hay eventos programados para este mes
        </p>
      )}
    </div>
  );
}
