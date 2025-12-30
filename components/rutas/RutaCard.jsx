import Link from 'next/link';
import { Clock, MapPin, TrendingUp, Footprints } from 'lucide-react';
import Card from '../ui/Card';

export default function RutaCard({ ruta }) {
  const dificultadColor = {
    facil: 'bg-green-100 text-green-700',
    moderada: 'bg-yellow-100 text-yellow-700',
    dificil: 'bg-red-100 text-red-700'
  };

  const tipoRutaIcono = {
    a_pie: <Footprints size={16} />,
    vehicular: '🚗',
    mixta: '🚶‍♂️🚗'
  };

  return (
    <Card>
      <Link href={`/rutas/${ruta.slug}`}>
        {/* Imagen */}
        <div className="relative h-48 overflow-hidden">
          <img 
            src={ruta.imagenPortada} 
            alt={ruta.nombre}
            className="w-full h-full object-cover hover:scale-110 transition duration-300"
          />
          
          {/* Badge de dificultad */}
          <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold ${dificultadColor[ruta.dificultad]}`}>
            {ruta.dificultad === 'facil' ? 'Fácil' : ruta.dificultad === 'moderada' ? 'Moderada' : 'Difícil'}
          </div>

          {/* Badge destacada */}
          {ruta.destacada && (
            <div className="absolute top-3 right-3 bg-amber-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
              ⭐ Destacada
            </div>
          )}
        </div>

        {/* Contenido */}
        <div className="p-4">
          <h3 className="font-bold text-lg mb-2 text-gray-900 hover:text-green-700 transition">
            {ruta.nombre}
          </h3>
          
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {ruta.descripcion}
          </p>

          {/* Información rápida */}
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="flex items-center gap-2 text-gray-600">
              <Clock size={16} className="text-green-600" />
              <span>{ruta.duracionHoras}h</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <MapPin size={16} className="text-green-600" />
              <span>{ruta.distanciaKm} km</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              {tipoRutaIcono[ruta.tipoRuta]}
              <span className="capitalize">{ruta.tipoRuta.replace('_', ' ')}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <TrendingUp size={16} className="text-green-600" />
              <span>{ruta._count?.sitiosEnRuta || 0} paradas</span>
            </div>
          </div>
        </div>
      </Link>
    </Card>
  );
}