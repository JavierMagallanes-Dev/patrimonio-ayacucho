'use client';

import { useEffect, useState, Suspense } from 'react';
import EventoCard from '@/components/eventos/EventoCard';
import CalendarioEventos from '@/components/eventos/CalendarioEventos';
import Loader from '@/components/ui/Loader';
import { Calendar, Filter, Sparkles } from 'lucide-react';

function EventosContent() {
  const [eventos, setEventos] = useState([]);
  const [eventosFiltrados, setEventosFiltrados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtroTipo, setFiltroTipo] = useState('');
  const [soloProximos, setSoloProximos] = useState(true);

  useEffect(() => {
    cargarEventos();
  }, [soloProximos]);

  useEffect(() => {
    filtrarEventos();
  }, [eventos, filtroTipo]);

  async function cargarEventos() {
    setLoading(true);
    try {
      let url = '/api/eventos';
      if (soloProximos) {
        url += '?proximos=true';
      }

      const res = await fetch(url);
      const data = await res.json();
      setEventos(data);
    } catch (error) {
      console.error('Error al cargar eventos:', error);
    } finally {
      setLoading(false);
    }
  }

  function filtrarEventos() {
    if (!filtroTipo) {
      setEventosFiltrados(eventos);
      return;
    }
    setEventosFiltrados(eventos.filter(e => e.tipoEvento === filtroTipo));
  }

  if (loading) return <Loader mensaje="Cargando eventos..." />;

  const tiposEvento = [
    { valor: 'festividad', label: 'Festividades', color: 'purple' },
    { valor: 'religioso', label: 'Religiosos', color: 'amber' },
    { valor: 'cultural', label: 'Culturales', color: 'blue' },
    { valor: 'gastronomico', label: 'Gastronómicos', color: 'orange' },
    { valor: 'artistico', label: 'Artísticos', color: 'pink' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Calendar size={40} className="text-purple-600" />
            <div>
              <h1 className="text-4xl font-bold">Festividades y Eventos</h1>
              <p className="text-gray-600 text-lg">
                Descubre las celebraciones y eventos culturales de Ayacucho
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Columna principal */}
          <div className="lg:col-span-2">
            {/* Filtros */}
            <div className="mb-8 bg-white p-4 rounded-lg shadow">
              <div className="flex items-center gap-2 mb-4">
                <Filter size={20} className="text-purple-600" />
                <h3 className="font-semibold">Filtrar eventos</h3>
              </div>

              {/* Toggle próximos/todos */}
              <div className="mb-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={soloProximos}
                    onChange={(e) => setSoloProximos(e.target.checked)}
                    className="w-4 h-4"
                  />
                  <span className="text-sm">Mostrar solo eventos próximos</span>
                </label>
              </div>

              {/* Filtros por tipo */}
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setFiltroTipo('')}
                  className={`px-4 py-2 rounded-full transition ${
                    filtroTipo === '' 
                      ? 'bg-purple-600 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Todos
                </button>
                {tiposEvento.map((tipo) => (
                  <button
                    key={tipo.valor}
                    onClick={() => setFiltroTipo(tipo.valor)}
                    className={`px-4 py-2 rounded-full transition ${
                      filtroTipo === tipo.valor
                        ? `bg-${tipo.color}-600 text-white`
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {tipo.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Contador */}
            <div className="mb-6">
              <p className="text-gray-600">
                Mostrando <span className="font-semibold">{eventosFiltrados.length}</span> eventos
              </p>
            </div>

            {/* Grid de eventos */}
            {eventosFiltrados.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-lg">
                <Sparkles size={64} className="mx-auto text-gray-300 mb-4" />
                <p className="text-gray-500 text-lg">No hay eventos que coincidan con los filtros</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {eventosFiltrados.map((evento) => (
                  <EventoCard key={evento.id} evento={evento} />
                ))}
              </div>
            )}
          </div>

          {/* Sidebar con calendario */}
          <div className="lg:col-span-1">
            <div className="sticky top-4">
              <h2 className="text-2xl font-bold mb-4">Calendario</h2>
              <CalendarioEventos eventos={eventos} />

              {/* Info adicional */}
              <div className="mt-6 bg-amber-50 border-l-4 border-amber-500 p-4 rounded">
                <h3 className="font-bold text-amber-900 mb-2">💡 Tip</h3>
                <p className="text-sm text-amber-800">
                  Algunos eventos se repiten anualmente. Planifica tu visita con anticipación
                  para no perderte las celebraciones más importantes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function EventosPage() {
  return (
    <Suspense fallback={<Loader />}>
      <EventosContent />
    </Suspense>
  );
}