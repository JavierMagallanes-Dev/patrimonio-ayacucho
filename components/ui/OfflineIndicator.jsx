'use client';

import { useState, useEffect } from 'react';
import { WifiOff, Wifi } from 'lucide-react';

export default function OfflineIndicator() {
  const [isOnline, setIsOnline] = useState(true); // Estado inicial por defecto
  const [mostrarMensaje, setMostrarMensaje] = useState(false);
  const [montado, setMontado] = useState(false); // Nuevo: controlar si está montado

  useEffect(() => {
    // Marcar como montado
    setMontado(true);
    
    // Verificar estado inicial solo en el cliente
    if (typeof window !== 'undefined') {
      const estadoInicial = navigator.onLine;
      setIsOnline(estadoInicial);
    }

    const handleOnline = () => {
      setIsOnline(true);
      setMostrarMensaje(true);
      setTimeout(() => setMostrarMensaje(false), 3000);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setMostrarMensaje(true);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // No renderizar hasta que esté montado en el cliente
  if (!montado || !mostrarMensaje) return null;

  return (
    <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[9999] animate-slide-down">
      <div className={`px-6 py-3 rounded-full shadow-lg flex items-center gap-3 ${
        isOnline 
          ? 'bg-green-500 text-white' 
          : 'bg-yellow-500 text-white'
      }`}>
        {isOnline ? (
          <>
            <Wifi size={20} />
            <span className="font-semibold">Conexión restaurada</span>
          </>
        ) : (
          <>
            <WifiOff size={20} />
            <span className="font-semibold">Sin conexión - Modo offline</span>
          </>
        )}
      </div>
    </div>
  );
}