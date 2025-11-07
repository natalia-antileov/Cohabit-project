import React, { useState } from "react";
import { Calendar } from "lucide-react";

export const ReservationsPage: React.FC = () => {
  const [selectedSpace, setSelectedSpace] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");

  const spaces = [
    {
      id: "piscina",
      name: "Piscina",
      icon: "/piscina-icon.png",
      image: "/piscina.png",
      includes: "Vestuarios, duchas, quincho",
      capacity: "30 personas",
      location: "Jardín Central",
      timeSlots: [
        { time: "9:00 - 11:00", available: true },
        { time: "11:00 - 13:00", available: false },
        { time: "13:00 - 15:00", available: true },
        { time: "15:00 - 17:00", available: true },
        { time: "17:00 - 19:00", available: false },
      ],
    },
    {
      id: "quincho",
      name: "Quincho",
      icon: "/quincho-icon.png",
      image: "/quincho.png",
      includes: "Parrilla, mesas, lavamanos",
      capacity: "20 personas",
      location: "Sector Norte",
      timeSlots: [
        { time: "9:00 - 11:00", available: true },
        { time: "11:00 - 13:00", available: true },
        { time: "13:00 - 15:00", available: true },
        { time: "15:00 - 17:00", available: false },
        { time: "17:00 - 19:00", available: true },
      ],
    },
    {
      id: "reuniones",
      name: "Salón de reuniones",
      icon: "/reuniones-icon.png",
      image: "/reuniones.png",
      includes: "Proyector, pizarra, mesas",
      capacity: "10 personas",
      location: "Torre A - Piso 1",
      timeSlots: [
        { time: "9:00 - 11:00", available: true },
        { time: "11:00 - 13:00", available: true },
        { time: "13:00 - 15:00", available: false },
        { time: "15:00 - 17:00", available: true },
      ],
    },
    {
      id: "eventos",
      name: "Salón de eventos",
      icon: "/eventos-icon.png",
      image: "/eventos.png",
      includes: "Mesas, sillas, cocina equipada",
      capacity: "50 personas",
      location: "Edificio Central",
      timeSlots: [
        { time: "9:00 - 11:00", available: true },
        { time: "11:00 - 13:00", available: false },
        { time: "13:00 - 15:00", available: true },
        { time: "15:00 - 17:00", available: true },
      ],
    },
    {
      id: "gym",
      name: "Gimnasio",
      icon: "/gym-icon.png",
      image: "/gym.png",
      includes: "Caminadoras, pesas, colchonetas",
      capacity: "15 personas",
      location: "Planta baja",
      timeSlots: [
        { time: "7:00 - 9:00", available: true },
        { time: "9:00 - 11:00", available: false },
        { time: "11:00 - 13:00", available: true },
        { time: "13:00 - 15:00", available: true },
      ],
    },
    {
      id: "juegos",
      name: "Salón de juegos",
      icon: "/juegos-icon.png",
      image: "/juegos.png",
      includes: "Mesa de pool, juegos de mesa",
      capacity: "12 personas",
      location: "Subterráneo",
      timeSlots: [
        { time: "10:00 - 12:00", available: true },
        { time: "12:00 - 14:00", available: true },
        { time: "14:00 - 16:00", available: false },
        { time: "16:00 - 18:00", available: true },
      ],
    },
  ];

  const selected = spaces.find((s) => s.id === selectedSpace);

  const handleReserve = () => {
    alert(
      `¡Reserva confirmada!\n${selected?.name} - ${selectedDate}\nHorario: ${selectedTime}`
    );
    setSelectedSpace(null);
    setSelectedDate("");
    setSelectedTime("");
  };

  // --- Pantalla de detalle ---
  if (selected) {
    return (
      <div className="w-full min-h-screen bg-gray-50 flex flex-col items-center p-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-md overflow-hidden">
          <div className="relative">
            <img
              src={selected.image}
              alt={selected.name}
              className="w-full h-48 object-cover"
            />
            <button
              className="absolute top-2 right-2 bg-white rounded-full p-1 shadow"
              onClick={() => setSelectedSpace(null)}
            >
              ✕
            </button>
          </div>

          <div className="p-4">
            <h2 className="text-lg font-bold text-gray-800">
              {selected.name}
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Incluye: <span className="font-medium">{selected.includes}</span>
            </p>

            <div className="flex items-center justify-between text-sm text-gray-600 mt-2">
              <span>👥 {selected.capacity}</span>
              <span>📍 {selected.location}</span>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium mb-1">Fecha*</label>
              <div className="relative">
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500"
                />
                <Calendar className="absolute right-3 top-2.5 w-4 h-4 text-gray-400" />
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium mb-1">Horario*</label>
              <div className="grid grid-cols-2 gap-2">
                {selected.timeSlots.map((slot) => (
                  <button
                    key={slot.time}
                    disabled={!slot.available}
                    onClick={() => setSelectedTime(slot.time)}
                    className={`py-2 rounded-lg border text-sm font-medium transition-all ${
                      !slot.available
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : selectedTime === slot.time
                        ? "bg-emerald-600 text-white"
                        : "bg-white border-gray-300 hover:border-emerald-500"
                    }`}
                  >
                    {slot.time}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleReserve}
              disabled={!selectedDate || !selectedTime}
              className={`w-full mt-6 py-2 rounded-lg font-bold text-white transition-all ${
                selectedDate && selectedTime
                  ? "bg-emerald-600 hover:bg-emerald-700"
                  : "bg-gray-300 cursor-not-allowed"
              }`}
            >
              Reservar
            </button>
          </div>
        </div>
      </div>
    );
  }

  // --- Pantalla de selección de espacio ---
  return (
    <div className="w-full min-h-screen bg-gray-50 flex flex-col items-center p-4">
      <div className="w-full max-w-md">
        <h1 className="text-xl font-bold mb-1">Reservas</h1>
        <div className="flex space-x-6 mb-4 border-b border-gray-200">
          <button className="pb-2 border-b-2 border-lime-700 text-lime-700 font-medium">
            Reservar
          </button>
          <button className="pb-2 text-gray-500">Mis reservas</button>
        </div>

        <p className="text-sm text-gray-600 mb-4">
          Selecciona un espacio común:
        </p>

        <div className="grid grid-cols-2 gap-3">
          {spaces.map((space) => (
            <button
              key={space.id}
              onClick={() => setSelectedSpace(space.id)}
              className="bg-white rounded-xl shadow-sm flex flex-col items-center justify-center py-6 hover:shadow-md transition-all"
            >
              <img
                src={space.icon}
                alt={space.name}
                className="w-12 h-12 mb-2"
              />
              <span className="text-sm font-medium text-lime-700">
                {space.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

