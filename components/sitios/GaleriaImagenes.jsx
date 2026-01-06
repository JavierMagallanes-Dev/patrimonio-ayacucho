'use client';

import { useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { Camera, X } from 'lucide-react';

export default function GaleriaImagenes({ imagenes, titulo = "Galería" }) {
  const [abierto, setAbierto] = useState(false);
  const [indiceActual, setIndiceActual] = useState(0);

  if (!imagenes || imagenes.length === 0) return null;

  // Convertir array de objetos a formato de lightbox
  const slides = imagenes.map(img => ({
    src: img.url,
    title: img.titulo || '',
    description: img.descripcion || ''
  }));

  return (
    <section className="mb-8">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <Camera size={24} className="text-amber-700" />
        {titulo}
      </h2>

      {/* Grid de miniaturas */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {imagenes.map((imagen, index) => (
          <div
            key={index}
            onClick={() => {
              setIndiceActual(index);
              setAbierto(true);
            }}
            className="relative aspect-square cursor-pointer group overflow-hidden rounded-lg"
          >
            <img
              src={imagen.url}
              alt={imagen.titulo || `Imagen ${index + 1}`}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
            
            {/* Overlay en hover */}
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Camera size={32} className="text-white" />
            </div>

            {/* Título si existe */}
            {imagen.titulo && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
                <p className="text-white text-xs font-semibold truncate">
                  {imagen.titulo}
                </p>
              </div>
            )}
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
    </section>
  );
}