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

// 1. HELPER: Mapea la prioridad/categoría a color de fondo y borde (replicando CommunicationsPage.tsx)
const getBgColor = (priority: 'normal' | 'urgent', category: string) => {
  if (priority === 'urgent') return 'bg-red-100';
  // En CommunicationsPage, 'general' es blue-100. Usamos blue-100 para 'normal'
  if (category === 'Mantención') return 'bg-yellow-100';
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
  
  // Clase de fondo basada en la prioridad/categoría
  const bgColor = getBgColor(communication.priority, communication.category);
  // Clase de texto para el tipo de comunicado
  const typeColor = getTypeColor(communication.priority, communication.category);
  
  // El borde es siempre gris-200 (excepto para urgente)
  const containerClasses = communication.priority === 'urgent' 
    ? "border-2 border-red-300" // Borde más fuerte para urgente
    : "border border-gray-200"; // Borde sutil como en CommunicationsPage.tsx
  
  const titleColor = "text-gray-900";
  const contentColor = "text-gray-600";
  
  return (
    <section className="w-full mt-[30px]">
      <h2 className="text-[rgba(11,9,43,1)] text-base font-medium leading-none mb-3">
        Comunicados
      </h2>
      
      {/* CARD CONTAINER: Incluye la clase de fondo y el borde gris-200 */}
      <div 
        className={`${containerClasses} ${bgColor} w-full overflow-hidden rounded-lg border-solid bg-white px-4 py-5`}
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
              {/* Aquí se muestra la categoría. Se usa Urgente o la categoría proporcionada. */}
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
