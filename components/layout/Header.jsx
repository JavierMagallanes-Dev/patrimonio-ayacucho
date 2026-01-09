'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Heart, MapPin, Calendar } from 'lucide-react';

import BuscadorGlobal from './BuscadorGlobal';
import { useFavoritos } from '@/hooks/useFavoritos';

export default function Header() {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const { cantidadFavoritos } = useFavoritos();

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4">
        {/* ================= DESKTOP ================= */}
        <div className="hidden lg:flex items-center justify-between py-4 gap-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <MapPin className="text-amber-700" size={32} />
            <div>
              <h1 className="text-xl font-bold text-amber-900">
                Patrimonio Ayacucho
              </h1>
              <p className="text-xs text-gray-600">
                Descubre nuestra historia
              </p>
            </div>
          </Link>

          {/* Buscador */}
          <div className="flex-1 max-w-xl">
            <BuscadorGlobal />
          </div>

          {/* Navegación */}
          <nav className="flex items-center gap-4 flex-shrink-0">
            <Link href="/" className="text-gray-700 hover:text-amber-700 transition text-sm">
              Inicio
            </Link>
            <Link href="/sitios" className="text-gray-700 hover:text-amber-700 transition text-sm">
              Sitios
            </Link>
            <Link href="/servicios" className="text-gray-700 hover:text-amber-700 transition text-sm">
              Servicios
            </Link>
            <Link href="/rutas" className="text-gray-700 hover:text-amber-700 transition text-sm">
              Rutas
            </Link>
            
            {/* ⭐ NUEVO: Enlace a Eventos */}
            <Link 
              href="/eventos" 
              className="flex items-center gap-1 text-gray-700 hover:text-purple-600 transition text-sm"
            >
              <Calendar size={16} />
              Eventos
            </Link>
            
            <Link
              href="/mapa"
              className="px-4 py-2 bg-amber-700 text-white rounded-lg hover:bg-amber-800 transition font-medium text-sm"
            >
              Mapa
            </Link>
            <Link
              href="/emergencias"
              className="text-red-600 hover:text-red-700 transition font-medium text-sm"
            >
              Emergencias
            </Link>
          </nav>

          {/* Favoritos - Desktop */}
          <Link
            href="/favoritos"
            className="relative p-2 hover:bg-gray-100 rounded-full transition flex-shrink-0"
          >
            <Heart size={24} className="text-gray-700" />
            {cantidadFavoritos > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cantidadFavoritos}
              </span>
            )}
          </Link>
        </div>

        {/* ================= MÓVIL ================= */}
        <div className="lg:hidden py-3">
          <div className="flex items-center justify-between mb-3">
            <button onClick={() => setMenuAbierto(!menuAbierto)}>
              {menuAbierto ? <X size={28} /> : <Menu size={28} />}
            </button>

            <Link href="/" className="flex items-center gap-2">
              <MapPin className="text-amber-700" size={28} />
              <span className="font-bold text-amber-900">
                Patrimonio Ayacucho
              </span>
            </Link>

            {/* Favoritos - Móvil */}
            <Link href="/favoritos" className="relative">
              <Heart size={24} className="text-gray-700" />
              {cantidadFavoritos > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cantidadFavoritos}
                </span>
              )}
            </Link>
          </div>

          {/* Buscador móvil */}
          <BuscadorGlobal />
        </div>

        {/* ================= MENÚ MÓVIL ================= */}
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
            
            {/* ⭐ NUEVO: Enlace a Eventos en móvil */}
            <Link 
              href="/eventos" 
              className="flex items-center gap-2 py-2 text-gray-700 hover:text-purple-600"
            >
              <Calendar size={20} />
              Festividades y Eventos
            </Link>
            
            <Link
              href="/mapa"
              className="block py-2 bg-amber-700 text-white rounded-lg text-center font-medium"
            >
              Ver Mapa
            </Link>
            <Link
              href="/emergencias"
              className="block py-2 text-red-600 hover:text-red-700 font-medium"
            >
              Emergencias
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}