import Link from 'next/link';
import { MapPin, Mail, Phone, Shield, Heart, Calendar } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Columna 1: Información */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="text-amber-500" size={28} />
              <h3 className="text-white font-bold text-lg">Patrimonio Ayacucho</h3>
            </div>
            <p className="text-sm mb-4">
              Plataforma informativa del patrimonio cultural e histórico de Ayacucho, Perú.
            </p>
            <p className="text-xs text-gray-400">
              Descubre la historia viva de Huamanga
            </p>
          </div>

          {/* Columna 2: Enlaces */}
          <div>
            <h4 className="text-white font-semibold mb-4">Explora</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/sitios" className="hover:text-amber-500 transition">
                  Sitios Patrimoniales
                </Link>
              </li>
              <li>
                <Link href="/servicios" className="hover:text-amber-500 transition">
                  Servicios Turísticos
                </Link>
              </li>
              <li>
                <Link href="/rutas" className="hover:text-amber-500 transition">
                  Rutas Temáticas
                </Link>
              </li>
              {/* ⭐ NUEVO: Enlace a Eventos */}
              <li>
                <Link href="/eventos" className="hover:text-purple-400 transition flex items-center gap-2">
                  <Calendar size={14} />
                  Festividades y Eventos
                </Link>
              </li>
              <li>
                <Link href="/mapa" className="hover:text-amber-500 transition">
                  Mapa Interactivo
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 3: Emergencias */}
          <div>
            <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
              <Shield className="text-red-500" size={20} />
              Emergencias
            </h4>
            <ul className="space-y-2 text-sm">
              <li>Policía: <span className="text-white font-semibold">105</span></li>
              <li>Ambulancia: <span className="text-white font-semibold">116</span></li>
              <li>Bomberos: <span className="text-white font-semibold">116</span></li>
              <li>
                <Link href="/emergencias" className="text-red-400 hover:text-red-300 transition">
                  Ver más información →
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 4: Contacto */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contacto</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Mail size={16} />
                info@patrimonioayacucho.pe
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={16} />
                Ayacucho, Perú
              </li>
            </ul>
          </div>
        </div>

        {/* Línea divisoria */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p className="flex items-center justify-center gap-1">
            Hecho con <Heart size={16} className="text-red-500" fill="currentColor" /> para Ayacucho
          </p>
          <p className="mt-2 text-gray-500 text-xs">
            © 2024 Patrimonio Ayacucho. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}