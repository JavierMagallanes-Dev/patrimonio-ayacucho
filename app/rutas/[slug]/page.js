import { notFound } from 'next/navigation';
import Link from 'next/link';
import { 
  Clock, MapPin, TrendingUp, ArrowLeft, Footprints,
  Calendar, AlertCircle, Package, Navigation
} from 'lucide-react';
import Button from '@/components/ui/Button';

async function getRuta(slug) {
  const res = await fetch(`http://localhost:3000/api/rutas/${slug}`, {
    cache: 'no-store'
  });
  
  if (!res.ok) return null;
  return res.json();
}

export default async function RutaDetallePage({ params }) {
  const { slug } = await params;
  const ruta = await getRuta(slug);

  if (!ruta) {
    notFound();
  }

  const dificultadColor = {
    facil: 'bg-green-100 text-green-700 border-green-300',
    moderada: 'bg-yellow-100 text-yellow-700 border-yellow-300',
    dificil: 'bg-red-100 text-red-700 border-red-300'
  };

  return (
    <div>
      {/* Header con imagen */}
      <div className="relative h-96 bg-gray-900">
        <img 
          src={ruta.imagenPortada}
          alt={ruta.nombre}
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
          <div className="container mx-auto px-4 h-full flex flex-col justify-end pb-8">
            <Link 
              href="/rutas"
              className="text-white flex items-center gap-2 mb-4 hover:text-green-300 transition"
            >
              <ArrowLeft size={20} />
              Volver a rutas
            </Link>

            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              {ruta.nombre}
            </h1>
            
            {/* Info rápida */}
            <div className="flex flex-wrap gap-4 text-white">
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                <Clock size={20} />
                <span>{ruta.duracionHoras} horas</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                <MapPin size={20} />
                <span>{ruta.distanciaKm} km</span>
              </div>
              <div className={`px-4 py-2 rounded-full border-2 ${dificultadColor[ruta.dificultad]}`}>
                {ruta.dificultad === 'facil' ? 'Fácil' : ruta.dificultad === 'moderada' ? 'Moderada' : 'Difícil'}
              </div>
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full capitalize">
                {ruta.tipoRuta === 'a_pie' ? <Footprints size={20} /> : '🚗'}
                <span>{ruta.tipoRuta.replace('_', ' ')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Columna principal */}
          <div className="lg:col-span-2 space-y-8">
            {/* Descripción */}
            <section>
              <h2 className="text-2xl font-bold mb-4">Acerca de esta ruta</h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {ruta.descripcion}
              </p>
              
              <div className="mt-4 bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                <div className="flex items-start gap-3">
                  <AlertCircle className="text-blue-600 flex-shrink-0 mt-1" size={20} />
                  <div>
                    <p className="font-semibold text-blue-900 mb-1">Esta es una sugerencia</p>
                    <p className="text-blue-800 text-sm">
                      Puedes modificar el orden o elegir solo algunos sitios según tu tiempo e intereses. 
                      Desde el mapa puedes explorar otros sitios cercanos y planificar tu propio recorrido.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Información general */}
            <section className="grid md:grid-cols-2 gap-4">
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin size={20} className="text-green-700" />
                  <h3 className="font-semibold">Punto de inicio</h3>
                </div>
                <p className="text-gray-700">{ruta.puntoInicio}</p>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Navigation size={20} className="text-green-700" />
                  <h3 className="font-semibold">Punto final</h3>
                </div>
                <p className="text-gray-700">{ruta.puntoFin}</p>
              </div>

              {ruta.mejorEpoca && (
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar size={20} className="text-green-700" />
                    <h3 className="font-semibold">Mejor época</h3>
                  </div>
                  <p className="text-gray-700">{ruta.mejorEpoca}</p>
                </div>
              )}

              {ruta.queTraer && ruta.queTraer.length > 0 && (
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Package size={20} className="text-green-700" />
                    <h3 className="font-semibold">Qué llevar</h3>
                  </div>
                  <p className="text-gray-700 text-sm capitalize">
                    {ruta.queTraer.join(', ')}
                  </p>
                </div>
              )}
            </section>

            {/* Recomendaciones */}
            {ruta.recomendaciones && (
              <section className="bg-amber-50 p-6 rounded-lg">
                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <AlertCircle size={20} className="text-amber-700" />
                  Recomendaciones
                </h3>
                <p className="text-gray-700 whitespace-pre-line">{ruta.recomendaciones}</p>
              </section>
            )}

            {/* Itinerario */}
            <section>
              <h2 className="text-2xl font-bold mb-6">Itinerario Sugerido</h2>
              
              <div className="space-y-6">
                {ruta.sitiosEnRuta.map((parada, index) => (
                  <div key={parada.id} className="flex gap-4">
                    {/* Número de parada */}
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 rounded-full bg-green-600 text-white flex items-center justify-center font-bold text-lg flex-shrink-0">
                        {parada.orden}
                      </div>
                      {index < ruta.sitiosEnRuta.length - 1 && (
                        <div className="w-1 h-full bg-green-200 my-2"></div>
                      )}
                    </div>

                    {/* Contenido de la parada */}
                    <div className="flex-1 pb-6">
                      <div className="bg-white rounded-lg shadow p-4 hover:shadow-lg transition">
                        <div className="flex items-start gap-4">
                          <img 
                            src={parada.sitio.imagenPrincipal}
                            alt={parada.sitio.nombre}
                            className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
                          />
                          <div className="flex-1">
                            <div 
                              className="inline-block px-2 py-1 rounded text-white text-xs font-semibold mb-2"
                              style={{ backgroundColor: parada.sitio.categoria.color }}
                            >
                              {parada.sitio.categoria.nombre}
                            </div>
                            <h3 className="font-bold text-lg mb-1">
                              <Link 
                                href={`/sitios/${parada.sitio.slug}`}
                                className="hover:text-green-700 transition"
                              >
                                {parada.sitio.nombre}
                              </Link>
                            </h3>
                            <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                              <Clock size={14} />
                              <span>{parada.tiempoPermanenciaMin} minutos</span>
                            </div>
                            {parada.notas && (
                              <p className="text-sm text-gray-600 mt-2">{parada.notas}</p>
                            )}
                            <Link 
                              href={`/sitios/${parada.sitio.slug}`}
                              className="text-green-600 text-sm font-medium hover:underline mt-2 inline-block"
                            >
                              Ver detalles del sitio →
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Personaliza tu recorrido */}
            <section className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-3">¿Quieres ajustar esta ruta?</h3>
              <p className="text-gray-700 mb-4">
                Desde el mapa puedes explorar otros sitios cercanos y planificar tu propio recorrido personalizado.
              </p>
              <Button href="/mapa" variant="primary">
                Ver todos los sitios en el mapa
              </Button>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-4 space-y-6">
              <h3 className="text-xl font-bold mb-4">Resumen de la Ruta</h3>

              <div className="space-y-4">
                <div className="pb-4 border-b">
                  <p className="text-sm text-gray-600 mb-1">Duración total</p>
                  <p className="text-2xl font-bold text-green-700">{ruta.duracionHoras}h</p>
                </div>

                <div className="pb-4 border-b">
                  <p className="text-sm text-gray-600 mb-1">Distancia</p>
                  <p className="text-2xl font-bold text-green-700">{ruta.distanciaKm} km</p>
                </div>

                <div className="pb-4 border-b">
                  <p className="text-sm text-gray-600 mb-1">Número de paradas</p>
                  <p className="text-2xl font-bold text-green-700">{ruta.sitiosEnRuta.length}</p>
                </div>

                <div className="pb-4 border-b">
                  <p className="text-sm text-gray-600 mb-1">Tipo de ruta</p>
                  <p className="font-semibold capitalize">{ruta.tipoRuta.replace('_', ' ')}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-1">Dificultad</p>
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${dificultadColor[ruta.dificultad]}`}>
                    {ruta.dificultad === 'facil' ? 'Fácil' : ruta.dificultad === 'moderada' ? 'Moderada' : 'Difícil'}
                  </span>
                </div>
              </div>

              <div className="pt-6 border-t space-y-3">
                <Button href="/mapa" variant="primary" className="w-full">
                  Ver ruta en el mapa
                </Button>
                <Button variant="outline" className="w-full">
                  ❤️ Guardar ruta
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}