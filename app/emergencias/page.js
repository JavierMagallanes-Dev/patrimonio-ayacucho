'use client';

import { useEffect, useState } from 'react';
import EmergenciaCard from '@/components/emergencias/EmergenciaCard';
import Loader from '@/components/ui/Loader';
import { Shield, AlertTriangle, Phone } from 'lucide-react';

export default function EmergenciasPage() {
  const [emergencias, setEmergencias] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtroCategoria, setFiltroCategoria] = useState('');

  useEffect(() => {
    cargarDatos();
  }, [filtroCategoria]);

  async function cargarDatos() {
    setLoading(true);
    try {
      // Cargar categorías de emergencias
      const resCategorias = await fetch('/api/categorias?tipo=emergencia');
      const dataCategorias = await resCategorias.json();
      setCategorias(dataCategorias);

      // Cargar emergencias
      let url = '/api/sitios?tipo=emergencia';
      if (filtroCategoria) {
        url += `&categoria=${filtroCategoria}`;
      }

      const resEmergencias = await fetch(url);
      const dataEmergencias = await resEmergencias.json();
      setEmergencias(dataEmergencias);
    } catch (error) {
      console.error('Error al cargar datos:', error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <Loader />;

  return (
    <div className="bg-red-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Banner de emergencia */}
        <div className="bg-red-600 text-white rounded-xl p-6 mb-8 shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <Shield size={32} />
            <h1 className="text-3xl font-bold">Información de Emergencias</h1>
          </div>
          <p className="text-red-100 text-lg">
            Números importantes y ubicación de servicios de emergencia en Ayacucho
          </p>
        </div>

        {/* Números principales de emergencia */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Phone size={28} className="text-red-600" />
            Números de Emergencia Principales
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <a 
              href="tel:105"
              className="bg-blue-900 text-white p-6 rounded-xl hover:bg-blue-800 transition shadow-lg"
            >
              <div className="text-4xl mb-2">👮</div>
              <p className="text-sm text-blue-200 mb-1">Policía Nacional</p>
              <p className="text-3xl font-bold">105</p>
            </a>

            <a 
              href="tel:116"
              className="bg-red-600 text-white p-6 rounded-xl hover:bg-red-700 transition shadow-lg"
            >
              <div className="text-4xl mb-2">🚑</div>
              <p className="text-sm text-red-200 mb-1">Ambulancia / SAMU</p>
              <p className="text-3xl font-bold">116</p>
            </a>

            <a 
              href="tel:116"
              className="bg-orange-600 text-white p-6 rounded-xl hover:bg-orange-700 transition shadow-lg"
            >
              <div className="text-4xl mb-2">🚒</div>
              <p className="text-sm text-orange-200 mb-1">Bomberos</p>
              <p className="text-3xl font-bold">116</p>
            </a>

            <a 
              href="tel:115"
              className="bg-yellow-600 text-white p-6 rounded-xl hover:bg-yellow-700 transition shadow-lg"
            >
              <div className="text-4xl mb-2">⚠️</div>
              <p className="text-sm text-yellow-200 mb-1">Defensa Civil</p>
              <p className="text-3xl font-bold">115</p>
            </a>
          </div>
        </section>

        {/* Filtros */}
        <div className="mb-8 bg-white p-4 rounded-lg shadow">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle size={20} className="text-red-600" />
            <h3 className="font-semibold">Filtrar por tipo</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFiltroCategoria('')}
              className={`px-4 py-2 rounded-full transition ${
                filtroCategoria === '' 
                  ? 'bg-red-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Todos
            </button>
            {categorias.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setFiltroCategoria(cat.id)}
                className={`px-4 py-2 rounded-full transition ${
                  filtroCategoria === cat.id
                    ? 'text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                style={{
                  backgroundColor: filtroCategoria === cat.id ? cat.color : undefined
                }}
              >
                {cat.nombre} ({cat._count.sitios})
              </button>
            ))}
          </div>
        </div>

        {/* Contador */}
        <div className="mb-6">
          <p className="text-gray-600">
            Mostrando <span className="font-semibold">{emergencias.length}</span> puntos de emergencia
          </p>
        </div>

        {/* Grid de emergencias */}
        {emergencias.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-lg">
            <Shield size={64} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500 text-lg">No se encontraron puntos de emergencia</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {emergencias.map((emergencia) => (
              <EmergenciaCard key={emergencia.id} emergencia={emergencia} />
            ))}
          </div>
        )}

        {/* Información adicional */}
        <section className="mt-12 bg-white rounded-xl p-6 shadow">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <AlertTriangle className="text-amber-600" size={28} />
            Información Útil
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold text-lg mb-3">En caso de emergencia médica:</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold">•</span>
                  <span>Mantén la calma y evalúa la situación</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold">•</span>
                  <span>Llama al 116 (SAMU) para ambulancia</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold">•</span>
                  <span>Proporciona tu ubicación exacta</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold">•</span>
                  <span>No muevas a la persona lesionada salvo peligro inminente</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-3">Recomendaciones para turistas:</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>Guarda estos números en tu celular</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>Ten a mano la dirección de tu hospedaje</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>Si no hablas español, pide ayuda a personal de tu hotel</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>La Comisaría de Turismo atiende específicamente a visitantes</span>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}