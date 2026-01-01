'use client';

import { useEffect, useState } from 'react';
import { useFavoritos } from '@/hooks/useFavoritos';
import SitioCard from '@/components/sitios/SitioCard';
import ServicioCard from '@/components/servicios/ServicioCard';
import Loader from '@/components/ui/Loader';
import { Heart, Trash2 } from 'lucide-react';
import Link from 'next/link';

export default function FavoritosPage() {
  const { favoritos, limpiarFavoritos, cargando: cargandoFavoritos } = useFavoritos();
  const [sitiosFavoritos, setSitiosFavoritos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!cargandoFavoritos) {
      cargarSitiosFavoritos();
    }
  }, [favoritos, cargandoFavoritos]);

  async function cargarSitiosFavoritos() {
    if (favoritos.length === 0) {
      setSitiosFavoritos([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      // Cargar información completa de cada favorito
      const promises = favoritos.map(async (id) => {
        try {
          // Primero intentamos buscar en todos los sitios
          const resSitios = await fetch('/api/sitios');
          const todosSitios = await resSitios.json();
          const sitio = todosSitios.find(s => s.id === id);
          return sitio;
        } catch (error) {
          console.error(`Error al cargar sitio ${id}:`, error);
          return null;
        }
      });

      const sitios = await Promise.all(promises);
      const sitiosValidos = sitios.filter(s => s !== null);
      setSitiosFavoritos(sitiosValidos);
    } catch (error) {
      console.error('Error al cargar favoritos:', error);
    } finally {
      setLoading(false);
    }
  }

  function handleLimpiar() {
    if (confirm('¿Estás seguro de que quieres eliminar todos tus favoritos?')) {
      limpiarFavoritos();
    }
  }

  if (cargandoFavoritos || loading) return <Loader />;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
              <Heart size={40} className="text-red-600" fill="currentColor" />
              Mis Favoritos
            </h1>
            <p className="text-gray-600 text-lg">
              {sitiosFavoritos.length === 0 
                ? 'Aún no tienes favoritos guardados'
                : `${sitiosFavoritos.length} ${sitiosFavoritos.length === 1 ? 'lugar guardado' : 'lugares guardados'}`
              }
            </p>
          </div>

          {sitiosFavoritos.length > 0 && (
            <button
              onClick={handleLimpiar}
              className="flex items-center gap-2 px-4 py-2 border-2 border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition"
            >
              <Trash2 size={20} />
              Limpiar todos
            </button>
          )}
        </div>
      </div>

      {/* Contenido */}
      {sitiosFavoritos.length === 0 ? (
        <div className="text-center py-20">
          <Heart size={80} className="mx-auto text-gray-300 mb-6" />
          <h2 className="text-2xl font-bold text-gray-700 mb-4">
            Aún no tienes favoritos
          </h2>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Guarda los sitios que quieres visitar y accede fácilmente a ellos desde aquí. 
            Solo haz clic en el ❤️ de cualquier sitio o servicio.
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center">
            <Link 
              href="/sitios"
              className="px-6 py-3 bg-amber-700 text-white rounded-lg hover:bg-amber-800 transition font-semibold"
            >
              Explorar sitios patrimoniales
            </Link>
            <Link 
              href="/servicios"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
            >
              Ver servicios turísticos
            </Link>
            <Link 
              href="/mapa"
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold"
            >
              Abrir mapa interactivo
            </Link>
          </div>
        </div>
      ) : (
        <>
          {/* Separar por tipo */}
          {sitiosFavoritos.filter(s => s.tipoSitio === 'patrimonio').length > 0 && (
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                🏛️ Sitios Patrimoniales
                <span className="text-lg font-normal text-gray-600">
                  ({sitiosFavoritos.filter(s => s.tipoSitio === 'patrimonio').length})
                </span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {sitiosFavoritos
                  .filter(s => s.tipoSitio === 'patrimonio')
                  .map((sitio) => (
                    <SitioCard key={sitio.id} sitio={sitio} />
                  ))}
              </div>
            </section>
          )}

          {sitiosFavoritos.filter(s => s.tipoSitio === 'servicio').length > 0 && (
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                🏨 Servicios Turísticos
                <span className="text-lg font-normal text-gray-600">
                  ({sitiosFavoritos.filter(s => s.tipoSitio === 'servicio').length})
                </span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {sitiosFavoritos
                  .filter(s => s.tipoSitio === 'servicio')
                  .map((servicio) => (
                    <ServicioCard key={servicio.id} servicio={servicio} />
                  ))}
              </div>
            </section>
          )}

          {sitiosFavoritos.filter(s => s.tipoSitio === 'emergencia').length > 0 && (
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                🚨 Emergencias
                <span className="text-lg font-normal text-gray-600">
                  ({sitiosFavoritos.filter(s => s.tipoSitio === 'emergencia').length})
                </span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {sitiosFavoritos
                  .filter(s => s.tipoSitio === 'emergencia')
                  .map((emergencia) => (
                    <SitioCard key={emergencia.id} sitio={emergencia} />
                  ))}
              </div>
            </section>
          )}
        </>
      )}
    </div>
  );
}