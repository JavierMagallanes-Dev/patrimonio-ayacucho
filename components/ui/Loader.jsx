import { Loader2 } from 'lucide-react';

export default function Loader({ mensaje = 'Cargando...' }) {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <Loader2 className="animate-spin text-amber-700 mb-4" size={48} />
      <p className="text-gray-600 font-medium">{mensaje}</p>
    </div>
  );
}