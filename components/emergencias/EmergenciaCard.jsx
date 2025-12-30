import Link from 'next/link';
import { MapPin, Phone, Clock } from 'lucide-react';
import Card from '../ui/Card';

export default function EmergenciaCard({ emergencia }) {
  return (
    <Card>
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start gap-4 mb-4">
          <div 
            className="w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl flex-shrink-0"
            style={{ backgroundColor: emergencia.categoria.color }}
          >
            {emergencia.categoria.icono === 'shield' && '🛡️'}
            {emergencia.categoria.icono === 'heart-pulse' && '🏥'}
            {emergencia.categoria.icono === 'pill' && '💊'}
          </div>

          <div className="flex-1">
            <h3 className="font-bold text-lg mb-1">{emergencia.nombre}</h3>
            <p 
              className="text-xs font-semibold px-2 py-1 rounded inline-block text-white"
              style={{ backgroundColor: emergencia.categoria.color }}
            >
              {emergencia.categoria.nombre}
            </p>
          </div>
        </div>

        {/* Descripción */}
        <p className="text-gray-600 text-sm mb-4">
          {emergencia.descripcionCorta}
        </p>

        {/* Información de contacto */}
        <div className="space-y-3 mb-4">
          {emergencia.telefonoEmergencia && (
            <div className="bg-red-50 p-3 rounded-lg">
              <p className="text-xs text-red-700 font-semibold mb-1">
                EMERGENCIA
              </p>
              <a
                href={`tel:${emergencia.telefonoEmergencia}`}
                className="text-2xl font-bold text-red-700 hover:text-red-800"
              >
                {emergencia.telefonoEmergencia}
              </a>
            </div>
          )}

          {emergencia.telefono && (
            <div className="flex items-center gap-2 text-gray-700">
              <Phone size={16} className="text-gray-500" />
              <a
                href={`tel:${emergencia.telefono}`}
                className="hover:text-blue-600"
              >
                {emergencia.telefono}
              </a>
            </div>
          )}

          {emergencia.atencion24h ? (
            <div className="flex items-center gap-2 text-green-700 font-semibold">
              <Clock size={16} />
              <span>Atención 24 horas</span>
            </div>
          ) : emergencia.horario && (
            <div className="flex items-center gap-2 text-gray-700">
              <Clock size={16} className="text-gray-500" />
              <span className="text-sm">{emergencia.horario}</span>
            </div>
          )}

          <div className="flex items-start gap-2 text-gray-700">
            <MapPin size={16} className="text-gray-500 flex-shrink-0 mt-1" />
            <span className="text-sm">{emergencia.direccion}</span>
          </div>
        </div>

        {/* Botones */}
        <div className="space-y-2">
          <a
            href={`tel:${emergencia.telefonoEmergencia || emergencia.telefono}`}
            className="block w-full text-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-semibold"
          >
            📞 Llamar ahora
          </a>

          <a
            href={`https://www.google.com/maps/search/?api=1&query=${emergencia.latitud},${emergencia.longitud}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
          >
            📍 Cómo llegar
          </a>
        </div>
      </div>
    </Card>
  );
}
