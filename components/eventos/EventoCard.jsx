import Link from 'next/link';
import { Calendar, MapPin, Clock, Ticket } from 'lucide-react';
import Card from '../ui/Card';

export default function EventoCard({ evento }) {
  // Formatear fechas
  const formatearFecha = (fecha) => {
    return new Date(fecha).toLocaleDateString('es-PE', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  // Calcular días hasta el evento
  const diasHasta = () => {
    const hoy = new Date();
    const inicio = new Date(evento.fechaInicio);
    const diff = Math.ceil((inicio - hoy) / (1000 * 60 * 60 * 24));
    
    if (diff < 0) return null;
    if (diff === 0) return '¡Hoy!';
    if (diff === 1) return 'Mañana';
    return `En ${diff} días`;
  };

  // Color por tipo de evento
  const colorTipo = {
    'festividad': 'bg-purple-100 text-purple-700 border-purple-300',
    'cultural': 'bg-blue-100 text-blue-700 border-blue-300',
    'religioso': 'bg-amber-100 text-amber-700 border-amber-300',
    'gastronomico': 'bg-orange-100 text-orange-700 border-orange-300',
    'artistico': 'bg-pink-100 text-pink-700 border-pink-300'
  };

  const dias = diasHasta();

  return (
    <Card>
      <Link href={`/eventos/${evento.slug}`}>
        {/* Imagen */}
        <div className="relative h-48 overflow-hidden">
          <img 
            src={evento.imagenPortada} 
            alt={evento.nombre}
            className="w-full h-full object-cover hover:scale-110 transition duration-300"
          />
          
          {/* Badge de cuenta regresiva */}
          {dias && (
            <div className="absolute top-3 right-3 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg animate-pulse">
              {dias}
            </div>
          )}

          {/* Badge de tipo */}
          <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold border-2 backdrop-blur-sm ${colorTipo[evento.tipoEvento] || 'bg-gray-100 text-gray-700'}`}>
            {evento.tipoEvento.charAt(0).toUpperCase() + evento.tipoEvento.slice(1)}
          </div>

          {/* Badge destacado */}
          {evento.destacado && (
            <div className="absolute bottom-3 right-3 bg-yellow-500 text-yellow-900 px-2 py-1 rounded-full text-xs font-bold">
              ⭐ Destacado
            </div>
          )}
        </div>

        {/* Contenido */}
        <div className="p-4">
          <h3 className="font-bold text-lg mb-2 text-gray-900 hover:text-amber-700 transition line-clamp-2">
            {evento.nombre}
          </h3>
          
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {evento.descripcionCorta}
          </p>

          {/* Información rápida */}
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-amber-700 flex-shrink-0" />
              <span>{formatearFecha(evento.fechaInicio)}</span>
            </div>
            
            {evento.ubicacionGeneral && (
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-amber-700 flex-shrink-0" />
                <span className="line-clamp-1">{evento.ubicacionGeneral}</span>
              </div>
            )}

            {evento.entrada && (
              <div className="flex items-center gap-2">
                <Ticket size={16} className="text-amber-700 flex-shrink-0" />
                <span className="line-clamp-1">{evento.entrada}</span>
              </div>
            )}
          </div>
        </div>
      </Link>
    </Card>
  );
}