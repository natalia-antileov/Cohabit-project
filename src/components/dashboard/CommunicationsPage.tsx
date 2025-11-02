import React, { useState } from 'react';
import { Bell, AlertTriangle, MessageSquare } from 'lucide-react';

type FilterType = 'all' | 'urgent' | 'maintenance' | 'meeting';

export const CommunicationsPage: React.FC = () => {
  const [filter, setFilter] = useState<FilterType>('all');

  const communicationsData = [
    { 
      id: 1, 
      title: 'Cierre temporal piscina', 
      date: '2024-10-18', 
      type: 'maintenance' as const, 
      urgent: true, 
      content: 'La piscina estará cerrada del 20 al 25 de octubre por mantenimiento preventivo.' 
    },
    { 
      id: 2, 
      title: 'Nuevas medidas de seguridad', 
      date: '2024-10-15', 
      type: 'general' as const, 
      urgent: false, 
      content: 'Se implementarán nuevos protocolos de seguridad a partir del próximo mes.' 
    },
    { 
      id: 3, 
      title: 'Reunión administración', 
      date: '2024-10-20', 
      type: 'meeting' as const, 
      urgent: false, 
      content: 'Reunión mensual de administración el viernes 25 a las 19:00 en la sala de eventos.' 
    }
  ];

  const getFilteredCommunications = () => {
    switch (filter) {
      case 'urgent':
        return communicationsData.filter(comm => comm.urgent);
      case 'maintenance':
        return communicationsData.filter(comm => comm.type === 'maintenance');
      case 'meeting':
        return communicationsData.filter(comm => comm.type === 'meeting');
      default:
        return communicationsData;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'maintenance':
        return 'Mantención';
      case 'meeting':
        return 'Reunión';
      default:
        return 'General';
    }
  };

  const filteredComms = getFilteredCommunications();

  return (
    <div className="min-h-screen bg-gray-50 p-4 pb-24">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Filters */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-bold mb-4">Filtros</h3>
          <div className="grid grid-cols-2 gap-3">
            <button 
              onClick={() => setFilter('all')}
              className={`p-3 rounded-lg font-medium transition-all ${
                filter === 'all'
                  ? 'bg-teal-600 text-white'
                  : 'bg-white border-2 border-gray-200 hover:border-teal-500 text-gray-700'
              }`}
            >
              Todos
            </button>
            <button 
              onClick={() => setFilter('urgent')}
              className={`p-3 rounded-lg font-medium transition-all flex items-center justify-center space-x-2 ${
                filter === 'urgent'
                  ? 'bg-teal-600 text-white'
                  : 'bg-white border-2 border-gray-200 hover:border-teal-500 text-gray-700'
              }`}
            >
              <AlertTriangle className="w-4 h-4" />
              <span>Urgentes</span>
            </button>
            <button 
              onClick={() => setFilter('maintenance')}
              className={`p-3 rounded-lg font-medium transition-all ${
                filter === 'maintenance'
                  ? 'bg-teal-600 text-white'
                  : 'bg-white border-2 border-gray-200 hover:border-teal-500 text-gray-700'
              }`}
            >
              Mantención
            </button>
            <button 
              onClick={() => setFilter('meeting')}
              className={`p-3 rounded-lg font-medium transition-all ${
                filter === 'meeting'
                  ? 'bg-teal-600 text-white'
                  : 'bg-white border-2 border-gray-200 hover:border-teal-500 text-gray-700'
              }`}
            >
              Reuniones
            </button>
          </div>
        </div>

        {/* Communications List */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Bell className="h-5 w-5 text-teal-600" />
            <h3 className="text-lg font-bold">Comunicados de Administración</h3>
          </div>
          
          <div className="space-y-4">
            {filteredComms.map((comm) => (
              <div 
                key={comm.id} 
                className={`border rounded-lg p-4 transition-all hover:shadow-md ${
                  comm.urgent 
                    ? 'border-red-200 bg-red-50' 
                    : 'border-gray-200 bg-white'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-2 flex-1">
                    {comm.urgent && <AlertTriangle className="h-4 w-4 text-red-600 flex-shrink-0" />}
                    <h4 className="font-semibold text-gray-900">{comm.title}</h4>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    comm.urgent 
                      ? 'bg-red-100 text-red-700' 
                      : 'bg-gray-100 text-gray-700'
                  }`}>
                    {comm.urgent ? 'Urgente' : 'Normal'}
                  </span>
                </div>
                
                <p className="text-sm text-gray-600 mb-3 leading-relaxed">
                  {comm.content}
                </p>
                
                <div className="flex items-center justify-between">
                  <p className="text-xs text-gray-500">
                    {comm.date} • {getTypeLabel(comm.type)}
                  </p>
                  <button className="flex items-center space-x-1 text-sm text-teal-600 hover:text-teal-700 font-medium">
                    <MessageSquare className="w-4 h-4" />
                    <span>Leer más</span>
                  </button>
                </div>
              </div>
            ))}

            {filteredComms.length === 0 && (
              <div className="text-center py-8">
                <Bell className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">No hay comunicados para mostrar</p>
              </div>
            )}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <div className="text-2xl font-bold text-teal-600">{communicationsData.length}</div>
            <div className="text-xs text-gray-600 mt-1">Total</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <div className="text-2xl font-bold text-red-600">
              {communicationsData.filter(c => c.urgent).length}
            </div>
            <div className="text-xs text-gray-600 mt-1">Urgentes</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">
              {communicationsData.filter(c => !c.urgent).length}
            </div>
            <div className="text-xs text-gray-600 mt-1">Normales</div>
          </div>
        </div>
      </div>
    </div>
  );
};
