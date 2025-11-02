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
      id: 'eventos', name: 'Sala de eventos', capacity: '50 personas',
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
      id: 'quincho', name: 'Quincho', capacity: '20 personas',
      timeSlots: [
        { time: '10:00-12:00', available: true },
        { time: '12:00-14:00', available: true },
        { time: '15:00-17:00', available: false },
        { time: '17:00-19:00', available: true },
        { time: '19:00-21:00', available: true }
      ]
    },
    { 
      id: 'tenis', name: 'Cancha de tenis', capacity: '4 personas',
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
      id: 'piscina', name: 'Piscina', capacity: '30 personas',
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
    <div className="min-h-screen bg-gray-50 w-full flex flex-col items-center px-4 pb-24 space-y-6">
      {/* Date Selection */}
      <div className="w-full bg-white rounded-xl shadow-md p-4 sm:p-6">
        <h3 className="text-lg font-bold mb-4">Seleccionar Fecha de Reserva</h3>
        <input 
          type="date"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
          value={selectedDate.toISOString().split('T')[0]}
          onChange={(e) => setSelectedDate(new Date(e.target.value))}
          min={new Date().toISOString().split('T')[0]}
        />
        <div className="mt-4">
          <label className="block text-sm font-medium mb-2">Espacio a reservar</label>
          <select 
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
            value={selectedSpace}
            onChange={(e) => setSelectedSpace(e.target.value)}
          >
            <option value="">Seleccionar espacio...</option>
            {availableSpaces.map(space => (
              <option key={space.id} value={space.id}>
                {space.name} - {space.capacity}
              </option>
            ))}
          </select>
        </div>

        {selectedSpace && (
          <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg text-sm">
            <div className="flex items-center space-x-2 mb-1">
              <AlertTriangle className="h-4 w-4 text-amber-600" />
              <span className="font-medium text-amber-800">Información Importante</span>
            </div>
            <p className="text-gray-700">Los espacios son gratuitos, pero se aplicarán multas por no cumplir con el horario reservado o dejar el espacio en mal estado.</p>
          </div>
        )}
      </div>

      {/* Time Selection */}
      {selectedSpace && (
        <div className="w-full bg-white rounded-xl shadow-md p-4 sm:p-6 space-y-4">
          <h3 className="text-lg font-bold">Seleccionar Horario</h3>
          <p className="text-sm text-gray-600">{selectedDate.toLocaleDateString('es-CL')} - {availableSpaces.find(s => s.id === selectedSpace)?.name}</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {availableSpaces.find(s => s.id === selectedSpace)?.timeSlots.map(slot => (
              <button
                key={slot.time}
                disabled={!slot.available}
                onClick={() => setSelectedTime(slot.time)}
                className={`p-2 rounded-lg text-sm font-medium w-full transition-all ${
                  selectedTime === slot.time
                    ? 'bg-teal-600 text-white'
                    : slot.available
                    ? 'bg-white border border-gray-300 hover:border-teal-500 text-gray-700'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
              >
                {slot.time}
              </button>
            ))}
          </div>

          {selectedTime && (
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg space-y-2 text-sm w-full">
              <div className="flex items-center space-x-2 mb-1">
                <CheckCircle className="h-5 w-5 text-emerald-600" />
                <span className="font-medium text-emerald-800">Resumen de Reserva</span>
              </div>
              <p><strong>Espacio:</strong> {availableSpaces.find(s => s.id === selectedSpace)?.name}</p>
              <p><strong>Fecha:</strong> {selectedDate.toLocaleDateString('es-CL')}</p>
              <p><strong>Horario:</strong> {selectedTime}</p>
              <p><strong>Duración:</strong> 2 horas</p>
              <button 
                className="w-full mt-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold py-2 rounded-lg"
                onClick={handleConfirmReservation}
              >
                Confirmar Reserva
              </button>
            </div>
          )}
        </div>
      )}

      {/* Mis Reservas */}
      <div className="w-full bg-white rounded-xl shadow-md p-4 sm:p-6 space-y-2">
        <h3 className="text-lg font-bold">Mis Reservas</h3>
        <div className="space-y-2">
          {reservationsData.map(reservation => (
            <div key={reservation.id} className="flex items-center justify-between p-2 border border-gray-200 rounded-lg">
              <div className="flex items-center space-x-2">
                <div className="bg-teal-100 p-2 rounded-full">
                  <Calendar className="h-5 w-5 text-teal-600" />
                </div>
                <div className="text-sm">
                  <p className="font-medium">{reservation.space}</p>
                  <p className="text-gray-500">{reservation.date} a las {reservation.time}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

