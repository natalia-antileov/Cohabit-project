import React from 'react';
import { Calendar } from 'lucide-react';

interface Communication {
  title: string;
  content: string;
  category: string;
  priority: 'normal' | 'urgent';
  date?: string;
}

interface CommunicationSectionProps {
  communication: Communication;
  onViewAll: () => void;
}

// 1. HELPER: Mapea la prioridad/categoría a color de fondo (replicando CommunicationsPage.tsx)
const getBgColor = (priority: 'normal' | 'urgent', category: string) => {
  if (priority === 'urgent') return 'bg-red-100';
  if (category === 'Mantención') return 'bg-yellow-100';
  // Valor por defecto para 'general' o 'normal'
  return 'bg-blue-100'; 
};

// 2. HELPER: Mapea la prioridad/categoría a color de texto
const getTypeColor = (priority: 'normal' | 'urgent', category: string) => {
  if (priority === 'urgent') return 'text-red-600';
  if (category === 'Mantención') return 'text-yellow-600';
  return 'text-blue-600';
};


export const CommunicationSection: React.FC<CommunicationSectionProps> = ({ 
  communication, 
  onViewAll 
}) => {
  
  const bgColor = getBgColor(communication.priority, communication.category);
  const typeColor = getTypeColor(communication.priority, communication.category);
  
  // CORRECCIÓN CLAVE: El borde es SIEMPRE gris-200, independientemente de la prioridad.
  const containerClasses = "border border-gray-200"; 
  
  const titleColor = "text-gray-900";
  const contentColor = "text-gray-600";
  
  return (
    <section className="w-full mt-[30px]">
      <h2 className="text-[rgba(11,9,43,1)] text-base font-medium leading-none mb-3">
        Comunicados
      </h2>
      
      {/* CARD CONTAINER: Borde gris-200 y fondo dinámico */}
      <div 
        className={`${containerClasses} ${bgColor} w-full overflow-hidden rounded-lg border-solid px-4 py-5`}
      >
        
        {/* FILA SUPERIOR: Título, Fecha Relativa y Tipo/Categoría */}
        <div className="flex w-full justify-between items-start mb-2"> 
          {/* Título */}
          <h3 className={`text-base font-semibold leading-tight flex-1 pr-4 ${titleColor}`}>
            {communication.title}
          </h3>
          
          {/* Fecha Relativa y Tipo/Categoría */}
          <div className="text-right">
            {/* Fecha Relativa (e.g., Hoy) - usando estándar gray-500 */}
            <div className={`text-sm text-gray-500`}>Hoy</div> 
            
            {/* Tipo/Categoría (e.g., Urgente o Mantención) */}
            <div className={`text-xs font-medium ${typeColor}`}>
              {communication.priority === 'urgent' ? 'Urgente' : communication.category} 
            </div>
          </div>
        </div>
        
        {/* CONTENIDO */}
        <p className={`text-sm mb-3 leading-relaxed ${contentColor}`}>
          {communication.content}
        </p>

        {/* DETALLE (FECHA COMPLETA): Replicando el estilo DetailItem de CommunicationsPage */}
        {communication.date && ( 
          <div className="flex flex-wrap gap-2 mb-3">
            <div className="inline-flex items-center space-x-2">
              {/* Icono de Calendario: text-gray-700 */}
              <Calendar className="w-4 h-4 text-gray-700" /> 
              {/* Etiqueta de Fecha: text-gray-700 */}
              <span className="text-sm text-gray-700">
                {communication.date}
              </span>
            </div>
          </div>
        )}
        
        {/* BOTÓN "Ver todos" */}
        <div className="flex justify-end pt-3"> 
          <button 
            onClick={onViewAll}
            className="text-[#006E6F] text-sm font-normal hover:underline transition-all"
          >
            Ver todos
          </button>
        </div>
      </div>
    </section>
  );
};
