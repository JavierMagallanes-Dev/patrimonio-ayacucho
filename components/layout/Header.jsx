'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, Heart, Search, MapPin } from 'lucide-react';

export default function Header() {
  const [menuAbierto, setMenuAbierto] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4">
        {/* Desktop */}
        <div className="hidden lg:flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <MapPin className="text-amber-700" size={32} />
            <div>
              <h1 className="text-xl font-bold text-amber-900">
                Patrimonio Ayacucho
              </h1>
              <p className="text-xs text-gray-600">Descubre nuestra historia</p>
            </div>
          </Link>

          {/* Navegación */}
          <nav className="flex items-center gap-6">
            <Link href="/" className="text-gray-700 hover:text-amber-700 transition">
              Inicio
            </Link>
            <Link href="/sitios" className="text-gray-700 hover:text-amber-700 transition">
              Sitios
            </Link>
            <Link href="/servicios" className="text-gray-700 hover:text-amber-700 transition">
              Servicios
            </Link>
            <Link href="/rutas" className="text-gray-700 hover:text-amber-700 transition">
              Rutas
            </Link>
            <Link 
              href="/mapa" 
              className="px-4 py-2 bg-amber-700 text-white rounded-lg hover:bg-amber-800 transition font-medium"
            >
              Mapa
            </Link>
            <Link href="/emergencias" className="text-red-600 hover:text-red-700 transition font-medium">
              Emergencias
            </Link>
          </nav>

          {/* Favoritos */}
          <Link href="/favoritos" className="relative p-2 hover:bg-gray-100 rounded-full transition">
            <Heart size={24} className="text-gray-700" />
            <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              0
            </span>
          </Link>
        </div>

        {/* Móvil */}
        <div className="lg:hidden flex items-center justify-between py-3">
          <button onClick={() => setMenuAbierto(!menuAbierto)}>
            {menuAbierto ? <X size={28} /> : <Menu size={28} />}
          </button>

          <Link href="/" className="flex items-center gap-2">
            <MapPin className="text-amber-700" size={28} />
            <span className="font-bold text-amber-900">Patrimonio Ayacucho</span>
          </Link>

          <Link href="/favoritos" className="relative">
            <Heart size={24} className="text-gray-700" />
            <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              0
            </span>
          </Link>
        </div>

        {/* Menú móvil */}
        {menuAbierto && (
          <nav className="lg:hidden pb-4 space-y-2">
            <Link href="/" className="block py-2 text-gray-700 hover:text-amber-700">
              Inicio
            </Link>
            <Link href="/sitios" className="block py-2 text-gray-700 hover:text-amber-700">
              Sitios Patrimoniales
            </Link>
            <Link href="/servicios" className="block py-2 text-gray-700 hover:text-amber-700">
              Servicios Turísticos
            </Link>
            <Link href="/rutas" className="block py-2 text-gray-700 hover:text-amber-700">
              Rutas Temáticas
            </Link>
            <Link href="/mapa" className="block py-2 bg-amber-700 text-white rounded-lg text-center font-medium">
              Ver Mapa
            </Link>
            <Link href="/emergencias" className="block py-2 text-red-600 hover:text-red-700 font-medium">
              Emergencias
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}