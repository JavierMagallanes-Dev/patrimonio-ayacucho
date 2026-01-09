import Link from 'next/link';
import { MapPin, Church, Building2, Route, Shield, Calendar } from 'lucide-react';

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-amber-900 to-amber-700 text-white">
        <div className="container mx-auto px-4 py-20 lg:py-32">
          <div className="max-w-3xl">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              Descubre el Patrimonio Cultural de Ayacucho
            </h1>
            <p className="text-xl lg:text-2xl mb-8 text-amber-100">
              Explora iglesias coloniales, museos, sitios arqueológicos y la rica historia de Huamanga
            </p>
            <div className="flex flex-wrap gap-4">
              <Link 
                href="/sitios"
                className="px-8 py-4 bg-white text-amber-900 rounded-lg font-semibold hover:bg-amber-50 transition"
              >
                Explorar Sitios
              </Link>
              <Link 
                href="/mapa"
                className="px-8 py-4 bg-amber-800 text-white rounded-lg font-semibold hover:bg-amber-900 transition border-2 border-white"
              >
                Ver Mapa Interactivo
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categorías */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">
          Explora por Categoría
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          <Link href="/sitios?tipo=patrimonio" className="group">
            <div className="bg-amber-50 p-8 rounded-xl border-2 border-amber-200 hover:border-amber-400 transition text-center">
              <Church size={48} className="mx-auto mb-4 text-amber-700 group-hover:scale-110 transition" />
              <h3 className="text-xl font-bold mb-2">Patrimonio</h3>
              <p className="text-gray-600 text-sm">Iglesias, museos y sitios históricos</p>
            </div>
          </Link>

          <Link href="/servicios" className="group">
            <div className="bg-blue-50 p-8 rounded-xl border-2 border-blue-200 hover:border-blue-400 transition text-center">
              <Building2 size={48} className="mx-auto mb-4 text-blue-700 group-hover:scale-110 transition" />
              <h3 className="text-xl font-bold mb-2">Servicios</h3>
              <p className="text-gray-600 text-sm">Hoteles, restaurantes y más</p>
            </div>
          </Link>

          <Link href="/rutas" className="group">
            <div className="bg-green-50 p-8 rounded-xl border-2 border-green-200 hover:border-green-400 transition text-center">
              <Route size={48} className="mx-auto mb-4 text-green-700 group-hover:scale-110 transition" />
              <h3 className="text-xl font-bold mb-2">Rutas</h3>
              <p className="text-gray-600 text-sm">Recorridos temáticos sugeridos</p>
            </div>
          </Link>

          {/* ⭐ NUEVO: Card de Eventos */}
          <Link href="/eventos" className="group">
            <div className="bg-purple-50 p-8 rounded-xl border-2 border-purple-200 hover:border-purple-400 transition text-center">
              <Calendar size={48} className="mx-auto mb-4 text-purple-700 group-hover:scale-110 transition" />
              <h3 className="text-xl font-bold mb-2">Eventos</h3>
              <p className="text-gray-600 text-sm">Festividades y celebraciones</p>
            </div>
          </Link>

          <Link href="/emergencias" className="group">
            <div className="bg-red-50 p-8 rounded-xl border-2 border-red-200 hover:border-red-400 transition text-center">
              <Shield size={48} className="mx-auto mb-4 text-red-700 group-hover:scale-110 transition" />
              <h3 className="text-xl font-bold mb-2">Emergencias</h3>
              <p className="text-gray-600 text-sm">Información de contactos útiles</p>
            </div>
          </Link>
        </div>
      </section>

      {/* Estadísticas */}
      <section className="bg-amber-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">11+</div>
              <div className="text-amber-200">Sitios Registrados</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">12</div>
              <div className="text-amber-200">Categorías</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">1+</div>
              <div className="text-amber-200">Rutas Temáticas</div>
            </div>
            {/* ⭐ NUEVO: Estadística de eventos */}
            <div>
              <div className="text-4xl font-bold mb-2">5+</div>
              <div className="text-amber-200">Eventos Anuales</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">5</div>
              <div className="text-amber-200">Sitios Patrimoniales</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">
          ¿Listo para explorar Ayacucho?
        </h2>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Toda la información que necesitas para descubrir el patrimonio cultural de Huamanga
        </p>
        <Link 
          href="/mapa"
          className="inline-flex items-center gap-2 px-8 py-4 bg-amber-700 text-white rounded-lg font-semibold hover:bg-amber-800 transition text-lg"
        >
          <MapPin size={24} />
          Abrir Mapa Interactivo
        </Link>
      </section>
    </div>
  );
}