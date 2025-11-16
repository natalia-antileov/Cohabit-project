import React, { useState } from 'react';
import { Bell, AlertTriangle, Clock, Calendar } from 'lucide-react';

type FilterType = 'all' | 'urgent' | 'maintenance' | 'general';

export const CommunicationsPage: React.FC = () => {
  const [filter, setFilter] = useState<FilterType>('all');

  // Datos estructurados según la imagen
  const communicationsData = [
    { 
      id: 1, 
      title: 'Arriendo de departamento', 
      date: 'Ayer',
      time: 'Oferta',
      type: 'general' as const, 
      pinned: true,
      content: 'Se arrienda departamento 5B Torre Norte. Interesados contactar a Maribel Olivares +56912345678',
      details: [
        { label: 'Disponible desde: 4 Nov', icon: 'calendar' as const, type: 'detail' as const }
      ]
    },
    { 
      id: 2, 
      title: 'Ascensor Torre Norte fuera de servicio', 
      date: 'Hoy',
      time: 'Urgente • Mantención',
      type: 'urgent' as const, 
      pinned: false,
      content: 'Estimados residentes, Les informamos que debido a fallos técnico del ascensor, este se encontrará fuera de servicio hasta mañana.',
      details: [
        { label: 'Mar, 4 - Mie, 5 Nov', icon: 'calendar' as const, type: 'detail' as const }
      ]
    },
    { 
      id: 3, 
      title: 'Mantención programada de piscina', 
      date: 'Hoy',
      time: 'Mantención',
      type: 'maintenance' as const, 
      pinned: false,
      content: 'Estimados residentes, Les informamos que como cada semana, la piscina estará cerrada el día de hoy entre 07:00 y las 09:00 hrs',
      details: [
        { label: '07:00 - 09:00 hrs', icon: 'clock' as const, type: 'actionable' as const },
        { label: 'Mar, 4 Nov', icon: 'calendar' as const, type: 'detail' as const }
      ]
    },
    { 
      id: 4, 
      title: 'Completada en Quincho', 
      date: 'Lun, 3 Nov',
      time: 'Oferta',
      type: 'general' as const, 
      pinned: false,
      content: 'Se realizará completada el viernes en el quincho del Jardín Central. A $2500 los completos.',
      details: [
        { label: 'Vie, 7 Nov', icon: 'calendar' as const, type: 'detail' as const },
        { label: '12:00 - 18:00 hrs', icon: 'clock' as const, type: 'actionable' as const }
      ]
    },
    { 
      id: 5, 
      title: 'Evento de Recaudación', 
      date: 'Dom, 2 Nov',
      time: 'Evento',
      type: 'general' as const, 
      pinned: false,
      content: 'Estimados residentes, Les informamos que el Lunes 17 de noviembre se realizará el evento de recaudación anual. Quedan todos cordialmente invitados',
      details: [
        { label: 'Lun, 17 Nov', icon: 'calendar' as const, type: 'detail' as const },
        { label: '16:00 - 20:00 hrs', icon: 'clock' as const, type: 'actionable' as const }
      ]
    },
    { 
      id: 6, 
      title: 'Ascensor Torre Sur fuera de servicio', 
      date: 'Dom, 2 Nov',
      time: 'Urgente • Mantención',
      type: 'urgent' as const, 
      pinned: false,
      content: 'Estimados residentes, Les informamos que debido a fallos técnico del ascensor, este se encontrará fuera de servicio hasta mañana.',
      details: [
        { label: 'Dom, 2 - Lun, 3 Nov', icon: 'calendar' as const, type: 'detail' as const }
      ]
    }
  ];

  const getFilteredCommunications = () => {
    switch (filter) {
      case 'urgent':
        return communicationsData.filter(comm => comm.type === 'urgent');
      case 'maintenance':
        return communicationsData.filter(comm => comm.type === 'maintenance');
      case 'general':
        return communicationsData.filter(comm => comm.type === 'general');
      default:
        return communicationsData;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'urgent':
        return 'text-red-600';
      case 'maintenance':
        return 'text-yellow-600';
      case 'general':
        return 'text-blue-600';
      default:
        return 'text-gray-600';
    }
  };

  const getBorderColor = (type: string) => {
    switch (type) {
      case 'urgent':
        return 'border-red-300';
      case 'maintenance':
        return 'border-yellow-300';
      case 'general':
        return 'border-blue-300';
      default:
        return 'border-gray-300';
    }
  };

  const getTimeColor = (time: string) => {
    if (time.includes('Urgente')) return 'text-red-600';
    if (time.includes('Mantención')) return 'text-yellow-600';
    return 'text-blue-600';
  };

  const filteredComms = getFilteredCommunications();
  const pinnedComms = filteredComms.filter(comm => comm.pinned);
  const todayComms = filteredComms.filter(comm => comm.date === 'Hoy' && !comm.pinned);
  const yesterdayComms = filteredComms.filter(comm => comm.date === 'Ayer' && !comm.pinned);
  const olderComms = filteredComms.filter(comm => !['Hoy', 'Ayer'].includes(comm.date) && !comm.pinned);

  const DetailItem = ({ label, type, icon }: { 
    label: string; 
    type: 'actionable' | 'detail';
    icon: 'clock' | 'calendar';
  }) => (
    <div className="inline-flex items-center space-x-2 text-[#79792B]">
      {icon === 'clock' ? (
        <Clock className="w-4 h-4" />
      ) : (
        <Calendar className="w-4 h-4" />
      )}
      <span className="text-sm">{label}</span>
    </div>
  );

  const CommunicationSection = ({ title, communications }: { title: string; communications: any[] }) => {
    if (communications.length === 0) return null;

    return (
      <div className="mb-6">
        <h2 className="text-lg font-bold text-gray-900 mb-3">{title}</h2>
        <div className="space-y-4">
          {communications.map((comm) => (
            <div 
              key={comm.id} 
              className={`bg-white border-2 rounded-lg p-4 ${getBorderColor(comm.type)}`}
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-gray-900">{comm.title}</h3>
                <div className="text-right">
                  <div className="text-sm text-gray-500">{comm.date}</div>
                  <div className={`text-xs font-medium ${getTimeColor(comm.time)}`}>
                    {comm.time}
                  </div>
                </div>
              </div>
              
              <p className="text-sm text-gray-600 mb-3 leading-relaxed">
                {comm.content}
              </p>
              
              <div className="flex flex-wrap gap-2">
                {comm.details.map((detail: any, index: number) => (
                  <DetailItem
                    key={index}
                    label={detail.label}
                    type={detail.type}
                    icon={detail.icon}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 pb-24">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Comunicados</h1>
          
          {/* Filters */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">Filtrar</h3>
            <div className="flex flex-wrap gap-2">
              {(['all', 'urgent', 'maintenance', 'general'] as FilterType[]).map((filterType) => (
                <button
                  key={filterType}
                  onClick={() => setFilter(filterType)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    filter === filterType
                      ? 'bg-[#006E6F] text-white'
                      : 'bg-white border border-gray-300 text-gray-700 hover:border-[#006E6F]'
                  }`}
                >
                  {filterType === 'all' && 'Todos'}
                  {filterType === 'urgent' && 'Urgente'}
                  {filterType === 'maintenance' && 'Mantención'}
                  {filterType === 'general' && 'General'}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Communications Sections */}
        <div className="space-y-6">
          <CommunicationSection title="Fijados" communications={pinnedComms} />
          <CommunicationSection title="Hoy" communications={todayComms} />
          <CommunicationSection title="Ayer" communications={yesterdayComms} />
          
          {/* Older communications grouped by date */}
          {olderComms.reduce((groups: any[], comm) => {
            const existingGroup = groups.find(group => group.date === comm.date);
            if (existingGroup) {
              existingGroup.communications.push(comm);
            } else {
              groups.push({
                date: comm.date,
                communications: [comm]
              });
            }
            return groups;
          }, []).map((group) => (
            <CommunicationSection 
              key={group.date} 
              title={group.date} 
              communications={group.communications} 
            />
          ))}
        </div>

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
          <div className="max-w-2xl mx-auto flex justify-around">
            {['Reservas', 'Visitas', 'Inicio', 'Pagos', 'Comunicados'].map((item) => (
              <button
                key={item}
                className={`text-sm font-medium ${
                  item === 'Comunicados' ? 'text-[#006E6F]' : 'text-gray-600'
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
