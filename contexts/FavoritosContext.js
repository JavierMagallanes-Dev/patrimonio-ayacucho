'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const FavoritosContext = createContext();

export function FavoritosProvider({ children }) {
  const [favoritos, setFavoritos] = useState([]);
  const [cargando, setCargando] = useState(true);

  // Cargar favoritos del localStorage al montar
  useEffect(() => {
    try {
      const stored = localStorage.getItem('favoritos-ayacucho');
      if (stored) {
        setFavoritos(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Error al cargar favoritos:', error);
      setFavoritos([]);
    } finally {
      setCargando(false);
    }
  }, []);

  // Guardar en localStorage cada vez que cambian
  useEffect(() => {
    if (!cargando) {
      try {
        localStorage.setItem('favoritos-ayacucho', JSON.stringify(favoritos));
      } catch (error) {
        console.error('Error al guardar favoritos:', error);
      }
    }
  }, [favoritos, cargando]);

  function agregarFavorito(sitioId) {
    if (!favoritos.includes(sitioId)) {
      setFavoritos([...favoritos, sitioId]);
      return true;
    }
    return false;
  }

  function quitarFavorito(sitioId) {
    setFavoritos(favoritos.filter(id => id !== sitioId));
  }

  function esFavorito(sitioId) {
    return favoritos.includes(sitioId);
  }

  function toggleFavorito(sitioId) {
    if (esFavorito(sitioId)) {
      quitarFavorito(sitioId);
      return false;
    } else {
      agregarFavorito(sitioId);
      return true;
    }
  }

  function limpiarFavoritos() {
    setFavoritos([]);
  }

  const value = {
    favoritos,
    agregarFavorito,
    quitarFavorito,
    esFavorito,
    toggleFavorito,
    limpiarFavoritos,
    cantidadFavoritos: favoritos.length,
    cargando
  };

  return (
    <FavoritosContext.Provider value={value}>
      {children}
    </FavoritosContext.Provider>
  );
}

export function useFavoritos() {
  const context = useContext(FavoritosContext);
  if (!context) {
    throw new Error('useFavoritos debe usarse dentro de FavoritosProvider');
  }
  return context;
}