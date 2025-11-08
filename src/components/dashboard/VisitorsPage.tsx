import React, { useState } from 'react';
import { Users, UserPlus, CheckCircle, Clock, Calendar, MapPin } from 'lucide-react';

export const VisitorsPage: React.FC = () => {
  const [transportType, setTransportType] = useState<'foot' | 'vehicle'>('foot');
  const [showCalendar, setShowCalendar] = useState(false);
  const [showTime, setShowTime] = useState(false);
  const [selectedVisit, setSelectedVisit] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    rut: '',
    date: '',
    time: '',
    reason: '',
    licensePlate: ''
  });

  const visitorsData = [
    { id: 1, name: 'Carlos Pérez', date: '2024-10-18', time: '14:30', status: 'approved', transport: 'vehicle', plate: 'ABC-1234' },
    { id: 2, name: 'María González', date: '2024-10-19', time: '10:00', status: 'pending', transport: 'foot', plate: null }
  ];

  const handleRegisterVisitor = () => {
    if (!formData.name || !formData.rut || !formData.date || !formData.time) {
      alert('Por favor, completa todos los campos obligatorios');
      return;
    }
    if (transportType === 'vehicle' && !formData.licensePlate) {
      alert('Por favor, ingresa la matrícula del vehículo');
      return;
    }
    alert('¡Visita registrada! La visita ha sido registrada exitosamente en el sistema.');
    setFormData({ name: '', rut: '', date: '', time: '', reason: '', licensePlate: '' });
    setTransportType('foot');
  };

  const handleVisitClick = (visitId: number) => {
    setSelectedVisit(selectedVisit === visitId ? null : visitId);
  };

  const handleFormChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
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
                  value={formData.name}
                  onChange={(e) => handleFormChange('name', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">RUT</label>
                <input
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="12.345.678-9"
                  value={formData.rut}
                  onChange={(e) => handleFormChange('rut', e.target.value)}
                />
              </div>
            </div>

            {/* Transport Type Selection */}
            <div>
              <label className="block text-sm font-medium mb-2">Medio de transporte</label>
              <div className="flex gap-4">
                <button
                  onClick={() => setTransportType('foot')}
                  className={`flex-1 p-3 rounded-lg border-2 transition-all font-medium ${
                    transportType === 'foot'
                      ? 'border-teal-600 bg-teal-50 text-teal-700'
                      : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-center space-x-2">
                    <MapPin className="w-4 h-4" />
                    <span>A pie</span>
                  </div>
                </button>
                <button
                  onClick={() => setTransportType('vehicle')}
                  className={`flex-1 p-3 rounded-lg border-2 transition-all font-medium ${
                    transportType === 'vehicle'
                      ? 'border-teal-600 bg-teal-50 text-teal-700'
                      : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-center space-x-2">
                    <span>🚗</span>
                    <span>Vehículo</span>
                  </div>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Fecha</label>
                <div className="relative">
                  <button
                    onClick={() => setShowCalendar(!showCalendar)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white flex items-center justify-between hover:border-teal-300 transition-colors"
                  >
                    <span className="text-gray-600">{formData.date || 'Seleccionar fecha'}</span>
                    <Calendar className="w-5 h-5 text-teal-600" />
                  </button>
                  {showCalendar && (
                    <input
                      type="date"
                      autoFocus
                      className="absolute top-12 left-0 w-full p-3 border border-gray-300 rounded-lg z-10"
                      min={new Date().toISOString().split('T')[0]}
                      value={formData.date}
                      onChange={(e) => {
                        handleFormChange('date', e.target.value);
                        setShowCalendar(false);
                      }}
                    />
                  )}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Hora</label>
                <div className="relative">
                  <button
                    onClick={() => setShowTime(!showTime)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white flex items-center justify-between hover:border-teal-300 transition-colors"
                  >
                    <span className="text-gray-600">{formData.time || 'Seleccionar hora'}</span>
                    <Clock className="w-5 h-5 text-teal-600" />
                  </button>
                  {showTime && (
                    <input
                      type="time"
                      autoFocus
                      className="absolute top-12 right-0 w-full p-3 border border-gray-300 rounded-lg z-10"
                      value={formData.time}
                      onChange={(e) => {
                        handleFormChange('time', e.target.value);
                        setShowTime(false);
                      }}
                    />
                  )}
                </div>
              </div>
            </div>

            {/* License Plate Field - Only show if vehicle is selected */}
            {transportType === 'vehicle' && (
              <div>
                <label className="block text-sm font-medium mb-1">Matrícula / Patente</label>
                <input
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  placeholder="ABC-1234"
                  value={formData.licensePlate}
                  onChange={(e) => handleFormChange('licensePlate', e.target.value)}
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium mb-1">Motivo de visita (opcional)</label>
              <textarea
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
                rows={3}
                placeholder="Describe brevemente el motivo de la visita..."
                value={formData.reason}
                onChange={(e) => handleFormChange('reason', e.target.value)}
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
              <div key={visitor.id} className="border border-gray-200 rounded-lg overflow-hidden transition-all">
                <button
                  onClick={() => handleVisitClick(visitor.id)}
                  className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors text-left"
                >
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
                </button>

                {/* Details Section */}
                {selectedVisit === visitor.id && (
                  <div className="border-t p-4 space-y-3" style={{ backgroundColor: '#DDDFA8' }}>
                    <div className="space-y-2">
                      <p className="text-sm font-semibold" style={{ color: '#79792B' }}>Detalles de la Visita</p>

                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <p className="text-xs font-medium" style={{ color: '#79792B' }}>RUT Visitante</p>
                          <p style={{ color: '#006E6F' }} className="font-medium">12.345.678-9</p>
                        </div>
                        <div>
                          <p className="text-xs font-medium" style={{ color: '#79792B' }}>Motivo</p>
                          <p style={{ color: '#006E6F' }} className="font-medium">Visita familiar</p>
                        </div>
                      </div>

                      {/* Transport Details */}
                      <div className="pt-2 border-t" style={{ borderColor: '#79792B' }}>
                        <p className="text-xs font-medium mb-2" style={{ color: '#79792B' }}>Transporte</p>
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div>
                            <p className="text-xs font-medium" style={{ color: '#79792B' }}>Medio</p>
                            <p style={{ color: '#006E6F' }} className="font-medium">
                              {visitor.transport === 'foot' ? 'A pie' : 'Vehículo'}
                            </p>
                          </div>
                          {visitor.plate && (
                            <div>
                              <p className="text-xs font-medium" style={{ color: '#79792B' }}>Matrícula</p>
                              <p style={{ color: '#006E6F' }} className="font-medium">{visitor.plate}</p>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="pt-3 flex gap-2">
                        <button
                          className="flex-1 py-2 px-3 rounded text-sm font-medium transition-all"
                          style={{ backgroundColor: '#006E6F', color: 'white' }}
                          onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.9')}
                          onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
                        >
                          Aprobar
                        </button>
                        <button
                          className="flex-1 py-2 px-3 rounded text-sm font-medium transition-all"
                          style={{ backgroundColor: '#79792B', color: 'white' }}
                          onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.9')}
                          onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
                        >
                          Rechazar
                        </button>
                      </div>
                    </div>
                  </div>
                )}
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
