'use client';

import { Heart } from 'lucide-react';
import { useFavoritos } from '@/hooks/useFavoritos';
import { useState } from 'react';

export default function BotonFavorito({ sitioId, variante = 'default' }) {
  const { esFavorito, toggleFavorito } = useFavoritos();
  const [animando, setAnimando] = useState(false);
  const favorito = esFavorito(sitioId);

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const agregado = toggleFavorito(sitioId);
    
    // Animación
    setAnimando(true);
    setTimeout(() => setAnimando(false), 300);

    // Feedback visual
    if (agregado) {
      // Opcional: agregar notificación toast
    }
  };

  // Variante para cards
  if (variante === 'card') {
    return (
      <button
        onClick={handleClick}
        className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-sm transition ${
          favorito
            ? 'bg-red-500 text-white'
            : 'bg-white/90 text-gray-700 hover:bg-red-50'
        } ${animando ? 'scale-125' : 'scale-100'}`}
        aria-label={favorito ? 'Quitar de favoritos' : 'Agregar a favoritos'}
        title={favorito ? 'Quitar de favoritos' : 'Agregar a favoritos'}
      >
        <Heart
          size={20}
          fill={favorito ? 'currentColor' : 'none'}
          className="transition-transform"
        />
      </button>
    );
  }

  // Variante para páginas de detalle
  return (
    <button
      onClick={handleClick}
      className={`flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold transition ${
        favorito
          ? 'bg-red-100 text-red-700 border-2 border-red-300 hover:bg-red-200'
          : 'bg-white text-gray-700 border-2 border-gray-300 hover:bg-gray-50'
      } ${animando ? 'scale-105' : 'scale-100'}`}
      aria-label={favorito ? 'Quitar de favoritos' : 'Agregar a favoritos'}
    >
      <Heart
        size={20}
        fill={favorito ? 'currentColor' : 'none'}
        className="transition-transform"
      />
      <span>{favorito ? 'Quitar de favoritos' : 'Agregar a favoritos'}</span>
    </button>
  );
}