import React from 'react';
import { Users, UserPlus, CheckCircle, Clock } from 'lucide-react';

export const VisitorsPage: React.FC = () => {
  const visitorsData = [
    { id: 1, name: 'Carlos Pérez', date: '2024-10-18', time: '14:30', status: 'approved' },
    { id: 2, name: 'María González', date: '2024-10-19', time: '10:00', status: 'pending' }
  ];

  const handleRegisterVisitor = () => {
    alert('¡Visita registrada! La visita ha sido registrada exitosamente en el sistema.');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 pb-24">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Register New Visit */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-bold mb-4">Registrar Nueva Visita</h3>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Nombre</label>
                <input 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent" 
                  placeholder="Nombre del visitante" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">RUT</label>
                <input 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent" 
                  placeholder="12.345.678-9" 
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Fecha</label>
                <input 
                  type="date" 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Hora</label>
                <input 
                  type="time" 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent" 
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Motivo de visita (opcional)</label>
              <textarea 
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none" 
                rows={3}
                placeholder="Describe brevemente el motivo de la visita..."
              />
            </div>
            
            <button 
              className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center space-x-2 transition-all"
              onClick={handleRegisterVisitor}
            >
              <UserPlus className="w-5 h-5" />
              <span>Registrar Visita</span>
            </button>
          </div>
        </div>

        {/* Scheduled Visits */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-bold mb-4">Visitas Programadas</h3>
          
          <div className="space-y-3">
            {visitorsData.map((visitor) => (
              <div key={visitor.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-teal-300 transition-colors">
                <div className="flex items-center space-x-3 flex-1">
                  <div className="bg-teal-100 p-3 rounded-full">
                    <Users className="h-5 w-5 text-teal-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{visitor.name}</p>
                    <p className="text-sm text-gray-500">
                      {visitor.date} a las {visitor.time}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {visitor.status === 'approved' ? (
                    <div className="flex items-center space-x-1 bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full">
                      <CheckCircle className="h-4 w-4" />
                      <span className="text-xs font-medium">Aprobado</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-1 bg-amber-100 text-amber-700 px-3 py-1 rounded-full">
                      <Clock className="h-4 w-4" />
                      <span className="text-xs font-medium">Pendiente</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {visitorsData.length === 0 && (
            <div className="text-center py-8">
              <Users className="h-12 w-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">No hay visitas programadas</p>
            </div>
          )}
        </div>

        {/* Information Card */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start space-x-3">
            <div className="bg-blue-100 p-2 rounded-full mt-0.5">
              <svg className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-blue-900 mb-1">Información Importante</h4>
              <p className="text-sm text-blue-800">
                Todas las visitas deben ser registradas con anticipación. El personal de seguridad verificará la identidad del visitante al momento de ingreso.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
