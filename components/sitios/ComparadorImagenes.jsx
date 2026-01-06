'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function ComparadorImagenes({ 
  imagenActual, 
  imagenAntigua, 
  anioAntigua,
  fuenteAntigua,
  descripcionAntigua 
}) {
  const [posicionSlider, setPosicionSlider] = useState(50);
  const [arrastrando, setArrastrando] = useState(false);

  const handleMouseMove = (e) => {
    if (!arrastrando) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const porcentaje = (x / rect.width) * 100;
    setPosicionSlider(Math.max(0, Math.min(100, porcentaje)));
  };

  const handleTouchMove = (e) => {
    if (!arrastrando) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.touches[0].clientX - rect.left;
    const porcentaje = (x / rect.width) * 100;
    setPosicionSlider(Math.max(0, Math.min(100, porcentaje)));
  };

  return (
    <section className="mb-8">
      <div className="bg-gradient-to-r from-amber-900 to-orange-900 p-6 rounded-xl text-white">
        <h2 className="text-2xl font-bold mb-2">Viaje en el Tiempo</h2>
        <p className="text-amber-100 mb-6">
          Desliza para comparar cómo ha cambiado este lugar a través de los años
        </p>

        {/* Comparador */}
        <div
          className="relative w-full aspect-video rounded-lg overflow-hidden shadow-2xl cursor-ew-resize"
          onMouseDown={() => setArrastrando(true)}
          onMouseUp={() => setArrastrando(false)}
          onMouseLeave={() => setArrastrando(false)}
          onMouseMove={handleMouseMove}
          onTouchStart={() => setArrastrando(true)}
          onTouchEnd={() => setArrastrando(false)}
          onTouchMove={handleTouchMove}
        >
          {/* Imagen actual (base) */}
          <div className="absolute inset-0">
            <img
              src={imagenActual}
              alt="Imagen actual"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-4 right-4 bg-green-600 text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg">
              2024 - Actualidad
            </div>
          </div>

          {/* Imagen antigua (overlay con clip) */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ clipPath: `inset(0 ${100 - posicionSlider}% 0 0)` }}
          >
            <img
              src={imagenAntigua}
              alt={`Imagen de ${anioAntigua}`}
              className="w-full h-full object-cover sepia"
            />
            <div className="absolute bottom-4 left-4 bg-amber-900 text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg">
              {anioAntigua}
            </div>
          </div>

          {/* Slider vertical */}
          <div
            className="absolute top-0 bottom-0 w-1 bg-white shadow-lg"
            style={{ left: `${posicionSlider}%` }}
          >
            {/* Botón del slider */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-xl">
              <div className="flex gap-1">
                <ChevronLeft size={20} className="text-gray-700" />
                <ChevronRight size={20} className="text-gray-700" />
              </div>
            </div>
          </div>
        </div>

        {/* Descripción */}
        {descripcionAntigua && (
          <div className="mt-4 bg-white/10 backdrop-blur-sm rounded-lg p-4">
            <p className="text-sm text-amber-50">{descripcionAntigua}</p>
            {fuenteAntigua && (
              <p className="text-xs text-amber-200 mt-2">
                Fuente: {fuenteAntigua}
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}