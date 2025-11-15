import React, { useState } from "react";
import { Calendar, MapPin, Users, Clock, Edit2, Trash2 } from "lucide-react";
import { BottomDrawer } from "../ui/BottomDrawer";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";

interface Reservation {
  id: string;
  spaceName: string;
  spaceIcon: string;
  date: string;
  time: string;
  status: "upcoming" | "completed" | "cancelled";
}

export const ReservationsPage: React.FC = () => {
  const [selectedSpace, setSelectedSpace] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingReservationId, setEditingReservationId] = useState<string | null>(null);
  const [reservationToDelete, setReservationToDelete] = useState<string | null>(null);

  // Simulación de reservas existentes
  const [myReservations, setMyReservations] = useState<Reservation[]>([
    {
      id: "1",
      spaceName: "Piscina",
      spaceIcon: "/piscina-icon.png",
      date: "2024-11-15",
      time: "15:00 - 17:00",
      status: "upcoming",
    },
    {
      id: "2",
      spaceName: "Quincho",
      spaceIcon: "/quincho-icon.png",
      date: "2024-11-20",
      time: "11:00 - 13:00",
      status: "upcoming",
    },
    {
      id: "3",
      spaceName: "Gimnasio",
      spaceIcon: "/gym-icon.png",
      date: "2024-11-01",
      time: "7:00 - 9:00",
      status: "completed",
    },
  ]);

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

  const handleSpaceClick = (spaceId: string) => {
    setSelectedSpace(spaceId);
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setTimeout(() => {
      setSelectedSpace(null);
      setSelectedDate("");
      setSelectedTime("");
      setIsEditing(false);
      setEditingReservationId(null);
    }, 300);
  };

  const handleReserve = () => {
    if (isEditing && editingReservationId) {
      // Actualizar reserva existente
      setMyReservations(prev => 
        prev.map(res => 
          res.id === editingReservationId
            ? { ...res, date: selectedDate, time: selectedTime }
            : res
        )
      );
      alert(`¡Reserva actualizada!\n${selected?.name} - ${selectedDate}\nHorario: ${selectedTime}`);
    } else {
      // Nueva reserva
      const newReservation: Reservation = {
        id: Date.now().toString(),
        spaceName: selected?.name || "",
        spaceIcon: selected?.icon || "",
        date: selectedDate,
        time: selectedTime,
        status: "upcoming",
      };
      setMyReservations(prev => [...prev, newReservation]);
      alert(`¡Reserva confirmada!\n${selected?.name} - ${selectedDate}\nHorario: ${selectedTime}`);
    }
    handleCloseDrawer();
  };

  const handleEdit = (reservation: Reservation) => {
    const space = spaces.find(s => s.name === reservation.spaceName);
    if (space) {
      setSelectedSpace(space.id);
      setSelectedDate(reservation.date);
      setSelectedTime(reservation.time);
      setIsEditing(true);
      setEditingReservationId(reservation.id);
      setIsDrawerOpen(true);
    }
  };

  const handleDeleteConfirm = () => {
    if (reservationToDelete) {
      setMyReservations(prev => prev.filter(res => res.id !== reservationToDelete));
      setReservationToDelete(null);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-CL", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      upcoming: { text: "Próxima", color: "bg-blue-100 text-blue-700" },
      completed: { text: "Completada", color: "bg-gray-100 text-gray-600" },
      cancelled: { text: "Cancelada", color: "bg-red-100 text-red-700" },
    };
    const config = statusConfig[status as keyof typeof statusConfig];
    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${config.color}`}
      >
        {config.text}
      </span>
    );
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 flex flex-col items-center p-4">
      <div className="w-full max-w-md">
        <h1 className="text-xl font-bold mb-4">Reservas</h1>

        <Tabs defaultValue="reservar" className="w-full">
          <TabsList className="w-full grid grid-cols-2 mb-4 bg-transparent border-b border-gray-200 rounded-none h-auto p-0">
            <TabsTrigger
              value="reservar"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#006E6F] data-[state=active]:text-[#006E6F] data-[state=active]:bg-transparent data-[state=active]:shadow-none pb-2"
            >
              Reservar
            </TabsTrigger>
            <TabsTrigger
              value="mis-reservas"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#006E6F] data-[state=active]:text-[#006E6F] data-[state=active]:bg-transparent data-[state=active]:shadow-none pb-2"
            >
              Mis reservas
            </TabsTrigger>
          </TabsList>

          {/* Tab: Reservar */}
          <TabsContent value="reservar" className="mt-0">
            <p className="text-sm text-gray-600 mb-4">
              Selecciona un espacio común:
            </p>

            <div className="grid grid-cols-2 gap-3">
              {spaces.map((space) => (
                <button
                  key={space.id}
                  onClick={() => handleSpaceClick(space.id)}
                  className="bg-white rounded-xl shadow-sm flex flex-col items-center justify-center py-6 hover:shadow-md transition-all"
                >
                  <img
                    src={space.icon}
                    alt={space.name}
                    className="w-12 h-12 mb-2"
                  />
                  <span className="text-sm font-medium" style={{ color: '#79792B' }}>
                    {space.name}
                  </span>
                </button>
              ))}
            </div>
          </TabsContent>

          {/* Tab: Mis Reservas */}
          <TabsContent value="mis-reservas" className="mt-0">
            <div className="space-y-3">
              {myReservations.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-gray-400 mb-2">📅</div>
                  <p className="text-gray-500 text-sm">
                    No tienes reservas aún
                  </p>
                </div>
              ) : (
                myReservations.map((reservation) => (
                  <div
                    key={reservation.id}
                    className="bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition-all"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={reservation.spaceIcon}
                          alt={reservation.spaceName}
                          className="w-10 h-10"
                        />
                        <div>
                          <h3 className="font-semibold text-gray-800">
                            {reservation.spaceName}
                          </h3>
                          {getStatusBadge(reservation.status)}
                        </div>
                      </div>
                      
                      {reservation.status === "upcoming" && (
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(reservation)}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            title="Editar"
                          >
                            <Edit2 className="w-4 h-4 text-gray-600" />
                          </button>
                          <button
                            onClick={() => setReservationToDelete(reservation.id)}
                            className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                            title="Eliminar"
                          >
                            <Trash2 className="w-4 h-4 text-red-600" />
                          </button>
                        </div>
                      )}
                    </div>

                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span>{formatDate(reservation.date)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span>{reservation.time}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Bottom Drawer */}
      <BottomDrawer isOpen={isDrawerOpen} onClose={handleCloseDrawer}>
        {selected && (
          <div className="w-full">
            <div className="relative mb-3">
              <img
                src={selected.image}
                alt={selected.name}
                className="w-full h-36 sm:h-40 object-cover rounded-xl"
              />
            </div>

            <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">
              {selected.name}
            </h2>

            <div className="bg-gray-50 rounded-lg p-2.5 mb-3">
              <p className="text-xs sm:text-sm text-gray-600">
                <span className="font-semibold">Incluye:</span>{" "}
                {selected.includes}
              </p>
            </div>

            <div className="flex items-start justify-between text-sm mb-4">
              <div className="flex items-start gap-2">
                <Users className="w-5 h-5 mt-0.5" style={{ color: '#79792B' }} />
                <div>
                  <p className="text-xs text-[#757575] uppercase tracking-wide mb-0.5">
                    Capacidad
                  </p>
                  <p className="font-medium text-gray-800">{selected.capacity}</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-5 h-5 mt-0.5" style={{ color: '#79792B' }} />
                <div>
                  <p className="text-xs text-[#757575] uppercase tracking-wide mb-0.5">
                    Localización
                  </p>
                  <p className="font-medium text-gray-800 text-right">{selected.location}</p>
                </div>
              </div>
            </div>

          <div className="mb-3">
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Fecha*
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-3 text-sm focus:ring-2 focus:ring-[#006E6F] focus:border-transparent min-h-[44px]"
                />
                <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Horario*
              </label>
              <div className="grid grid-cols-2 gap-2">
                {selected.timeSlots.map((slot) => (
                  <button
                    key={slot.time}
                    disabled={!slot.available}
                    onClick={() => setSelectedTime(slot.time)}
                    className={`py-2.5 rounded-lg border-2 text-xs sm:text-sm font-medium transition-all ${
                      !slot.available
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200"
                        : selectedTime === slot.time
                        ? "border-[#006E6F] bg-[#006E6F]/20 text-gray-800"
                        : "bg-white border-gray-300 hover:border-[#006E6F]"
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
              className={`w-full py-3 sm:py-3.5 rounded-xl font-bold text-sm sm:text-base text-white transition-all ${
                selectedDate && selectedTime
                  ? "bg-[#006E6F] hover:bg-[#005a5b]"
                  : "bg-gray-300 cursor-not-allowed"
              }`}
            >
              {isEditing ? "Actualizar reserva" : "Reservar"}
            </button>
          </div>
        )}
      </BottomDrawer>

      {/* Alert Dialog para confirmación de eliminación */}
      <AlertDialog open={!!reservationToDelete} onOpenChange={(open) => !open && setReservationToDelete(null)}>
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar reserva?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. La reserva será eliminada permanentemente.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-red-600 hover:bg-red-700"
            >
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
