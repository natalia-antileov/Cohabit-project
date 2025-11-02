import React, { useState } from 'react';
import { Calendar, CheckCircle, AlertTriangle } from 'lucide-react';

export const ReservationsPage: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedSpace, setSelectedSpace] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [showWarning, setShowWarning] = useState<boolean>(false);

  const reservationsData = [
    { id: 1, space: 'Sala de eventos', date: '2024-10-20', time: '19:00', status: 'confirmed' },
    { id: 2, space: 'Quincho', date: '2024-10-25', time: '15:00', status: 'pending' }
  ];

  const availableSpaces = [
    { 
      id: 'eventos', 
      name: 'Sala de eventos', 
      capacity: '50 personas',
      timeSlots: [
        { time: '09:00-11:00', available: true },
        { time: '11:00-13:00', available: false },
        { time: '14:00-16:00', available: true },
        { time: '16:00-18:00', available: true },
        { time: '19:00-21:00', available: true },
        { time: '21:00-23:00', available: false }
      ]
    },
    { 
      id: 'quincho', 
      name: 'Quincho', 
      capacity: '20 personas',
      timeSlots: [
        { time: '10:00-12:00', available: true },
        { time: '12:00-14:00', available: true },
        { time: '15:00-17:00', available: false },
        { time: '17:00-19:00', available: true },
        { time: '19:00-21:00', available: true }
      ]
    },
    { 
      id: 'tenis', 
      name: 'Cancha de tenis', 
      capacity: '4 personas',
      timeSlots: [
        { time: '08:00-10:00', available: true },
        { time: '10:00-12:00', available: true },
        { time: '12:00-14:00', available: false },
        { time: '14:00-16:00', available: true },
        { time: '16:00-18:00', available: false },
        { time: '18:00-20:00', available: true }
      ]
    },
    { 
      id: 'piscina', 
      name: 'Piscina', 
      capacity: '30 personas',
      timeSlots: [
        { time: '09:00-11:00', available: true },
        { time: '11:00-13:00', available: true },
        { time: '13:00-15:00', available: false },
        { time: '15:00-17:00', available: true },
        { time: '17:00-19:00', available: false }
      ]
    }
  ];

  const handleConfirmReservation = () => {
    const space = availableSpaces.find(s => s.id === selectedSpace);
    alert(`¡Reserva confirmada! ${space?.name} reservado para el ${selectedDate.toLocaleDateString('es-CL')} de ${selectedTime}.`);
    setSelectedSpace('');
    setSelectedTime('');
    setSelectedDate(new Date());
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <div className="max-w-2xl mx-auto p-4 space-y-6">
        {/* Date Selection */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-bold mb-4">Seleccionar Fecha de Reserva</h3>
          
          <div className="mb-4">
            <input 
              type="date" 
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
              value={selectedDate.toISOString().split('T')[0]}
              onChange={(e) => setSelectedDate(new Date(e.target.value))}
              min={new Date().toISOString().split('T')[0]}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Espacio a reservar</label>
            <select 
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
              value={selectedSpace}
              onChange={(e) => setSelectedSpace(e.target.value)}
            >
              <option value="">Seleccionar espacio...</option>
              {availableSpaces.map((space) => (
                <option key={space.id} value={space.id}>
                  {space.name} - {space.capacity}
                </option>
              ))}
            </select>
          </div>

          {selectedSpace && (
            <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <AlertTriangle className="h-4 w-4 text-amber-600" />
                <span className="text-sm font-medium text-amber-800">Información Importante</span>
              </div>
              <p className="text-sm text-gray-700">
                Los espacios son gratuitos, pero se aplicarán multas por no cumplir con el horario reservado o dejar el espacio en mal estado.
              </p>
              <button 
                className="mt-2 text-sm text-teal-600 hover:text-teal-700 font-medium"
                onClick={() => setShowWarning(true)}
              >
                Ver términos y condiciones
              </button>
            </div>
          )}
        </div>

        {/* Time Selection */}
        {selectedSpace && (
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-lg font-bold mb-2">Seleccionar Horario</h3>
            <p className="text-sm text-gray-600 mb-4">
              {selectedDate.toLocaleDateString('es-CL')} - {availableSpaces.find(s => s.id === selectedSpace)?.name}
            </p>

            <div className="grid grid-cols-2 gap-3">
              {availableSpaces.find(s => s.id === selectedSpace)?.timeSlots.map((slot) => (
                <button
                  key={slot.time}
                  onClick={() => setSelectedTime(slot.time)}
                  disabled={!slot.available}
                  className={`p-3 rounded-lg font-medium transition-all ${
                    selectedTime === slot.time
                      ? 'bg-teal-600 text-white'
                      : slot.available
                      ? 'bg-white border-2 border-gray-200 hover:border-teal-500 text-gray-700'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {slot.time}
                </button>
              ))}
            </div>

            {selectedTime && (
              <div className="mt-6 p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
                <div className="flex items-center space-x-2 mb-3">
                  <CheckCircle className="h-5 w-5 text-emerald-600" />
                  <span className="font-medium text-emerald-800">Resumen de Reserva</span>
                </div>
                <div className="space-y-1 text-sm text-gray-700">
                  <p><strong>Espacio:</strong> {availableSpaces.find(s => s.id === selectedSpace)?.name}</p>
                  <p><strong>Fecha:</strong> {selectedDate.toLocaleDateString('es-CL')}</p>
                  <p><strong>Horario:</strong> {selectedTime}</p>
                  <p><strong>Duración:</strong> 2 horas</p>
                </div>
                <button 
                  className="w-full mt-4 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold py-3 px-6 rounded-lg transition-all"
                  onClick={handleConfirmReservation}
                >
                  Confirmar Reserva
                </button>
              </div>
            )}
          </div>
        )}

        {/* My Reservations */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-bold mb-4">Mis Reservas</h3>
          <div className="space-y-3">
            {reservationsData.map((reservation) => (
              <div key={reservation.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="bg-teal-100 p-2 rounded-full">
                    <Calendar className="h-5 w-5 text-teal-600" />
                  </div>
                  <div>
                    <p className="font-medium">{reservation.space}</p>
                    <p className="text-sm text-gray-500">
                      {reservation.date} a las {reservation.time}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Warning Modal */}
      {showWarning && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <div className="flex items-center space-x-2 mb-4">
              <AlertTriangle className="h-5 w-5 text-amber-600" />
              <h3 className="text-lg font-bold">Términos y Condiciones</h3>
            </div>
            <div className="space-y-3 text-sm mb-6">
              <p><strong>Multas por incumplimiento:</strong></p>
              <ul className="list-disc list-inside space-y-1 text-gray-600">
                <li>No presentarse: $15.000</li>
                <li>Exceder el horario: $5.000 por cada 30 min</li>
                <li>Dejar el espacio sucio: $25.000</li>
                <li>Daños menores: $50.000</li>
                <li>Daños mayores: Evaluación caso a caso</li>
              </ul>
              <p className="text-xs text-gray-500 mt-4">
                Al confirmar la reserva, acepta estos términos y condiciones.
              </p>
            </div>
            <div className="flex space-x-3">
              <button 
                className="flex-1 border-2 border-gray-300 text-gray-700 font-medium py-2 px-4 rounded-lg hover:bg-gray-50"
                onClick={() => setShowWarning(false)}
              >
                Cerrar
              </button>
              <button 
                className="flex-1 bg-teal-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-teal-700"
                onClick={() => setShowWarning(false)}
              >
                Entendido
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
