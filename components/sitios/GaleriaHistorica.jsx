'use client';

import { useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { Clock, MapPin } from 'lucide-react';

export default function GaleriaHistorica({ imagenes }) {
  const [abierto, setAbierto] = useState(false);
  const [indiceActual, setIndiceActual] = useState(0);

  if (!imagenes || imagenes.length === 0) return null;

  // Ordenar por año
  const imagenesOrdenadas = [...imagenes].sort((a, b) => (a.anio || 0) - (b.anio || 0));

  const slides = imagenesOrdenadas.map(img => ({
    src: img.url,
    title: `${img.anio || 'Fecha desconocida'} - ${img.titulo || ''}`,
    description: img.descripcion || ''
  }));

  return (
    <section className="mb-8">
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-6 rounded-xl">
        <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
          <Clock size={24} className="text-amber-700" />
          Archivo Histórico
        </h2>
        <p className="text-gray-700 mb-6">
          Fotografías antiguas que muestran cómo ha cambiado este lugar a través del tiempo
        </p>

        {/* Timeline de imágenes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {imagenesOrdenadas.map((imagen, index) => (
            <div
              key={index}
              onClick={() => {
                setIndiceActual(index);
                setAbierto(true);
              }}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow cursor-pointer group"
            >
              {/* Imagen */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={imagen.url}
                  alt={imagen.descripcion || `Foto histórica ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110 sepia"
                />
                
                {/* Badge de año */}
                <div className="absolute top-3 left-3 bg-amber-900 text-white px-3 py-1 rounded-full font-bold text-sm">
                  {imagen.anio || '?'}
                </div>
              </div>

              {/* Información */}
              <div className="p-4">
                {imagen.descripcion && (
                  <p className="text-sm text-gray-700 mb-2 line-clamp-2">
                    {imagen.descripcion}
                  </p>
                )}
                {imagen.fuente && (
                  <p className="text-xs text-gray-500 flex items-center gap-1">
                    <MapPin size={12} />
                    {imagen.fuente}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox */}
        <Lightbox
          open={abierto}
          close={() => setAbierto(false)}
          index={indiceActual}
          slides={slides}
          carousel={{ finite: true }}
        />
      </div>
    </section>
  );
}