'use client';

import { useEffect, useState } from 'react';
import RutaCard from '@/components/rutas/RutaCard';
import Loader from '@/components/ui/Loader';
import { Route, Info } from 'lucide-react';

export default function RutasPage() {
  const [rutas, setRutas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cargarRutas();
  }, []);

  async function cargarRutas() {
    setLoading(true);
    try {
      const res = await fetch('/api/rutas');
      const data = await res.json();
      setRutas(data);
    } catch (error) {
      console.error('Error al cargar rutas:', error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <Loader />;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-600 mb-4">
        Inicio / Rutas Temáticas
      </div>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Rutas Temáticas Sugeridas</h1>
        <p className="text-gray-600 text-lg mb-6">
          Recorridos informativos organizados por temas. Explora a tu ritmo y adapta según tu tiempo e intereses.
        </p>

        {/* Info box */}
        <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
          <div className="flex items-start gap-3">
            <Info className="text-green-600 flex-shrink-0 mt-1" size={20} />
            <div>
              <p className="font-semibold text-green-900 mb-1">Estas son sugerencias</p>
              <p className="text-green-800 text-sm">
                Puedes modificar el orden, elegir solo algunos sitios o combinar rutas según tu disponibilidad.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Contador */}
      <div className="mb-6">
        <p className="text-gray-600">
          <span className="font-semibold">{rutas.length}</span> {rutas.length === 1 ? 'ruta disponible' : 'rutas disponibles'}
        </p>
      </div>

      {/* Grid de rutas */}
      {rutas.length === 0 ? (
        <div className="text-center py-20">
          <Route size={64} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500 text-lg">No hay rutas disponibles por el momento</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rutas.map((ruta) => (
            <RutaCard key={ruta.id} ruta={ruta} />
          ))}
        </div>
      )}
    </div>
  );
}