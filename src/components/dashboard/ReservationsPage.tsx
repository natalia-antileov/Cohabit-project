import React, { useState } from "react";
// Agregamos las importaciones necesarias del segundo código
import { Calendar, MapPin, Users, Clock, Edit2, Trash2, CheckCircle2, AlertCircle, MoreVertical } from "lucide-react";
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

// Componentes y utilidades del segundo código (asumiendo rutas estándar)
import { Calendar as CalendarComponent } from "@/components/ui/calendar"; // O la ruta correcta
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"; // O la ruta correcta
import { format, differenceInDays, isPast } from "date-fns";
import { es } from "date-fns/locale";
import { cn } from "@/lib/utils"; // Utilidad para concatenar clases (Tailwind)

interface Reservation {
  id: string;
  spaceName: string;
  spaceIcon: string;
  date: string;
  time: string;
  status: "upcoming" | "completed" | "cancelled";
  confirmed?: boolean;
}

export const ReservationsPage: React.FC = () => {
  const [selectedSpace, setSelectedSpace] = useState<string | null>(null);
  // CORRECCIÓN 2: Cambiar el estado para usar un objeto Date o undefined
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
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
      // Dejamos la fecha como string para el manejo de datos de back-end
      date: "2025-11-19",
      time: "15:00 - 17:00",
      status: "upcoming",
      confirmed: true,
    },
    {
      id: "2",
      spaceName: "Quincho",
      spaceIcon: "/quincho-icon.png",
      date: "2025-11-22",
      time: "12:00 - 15:00",
      status: "upcoming",
      confirmed: true,
    },
    {
      id: "3",
      spaceName: "Gimnasio",
      spaceIcon: "/gym-icon.png",
      date: "2025-11-14",
      time: "7:00 - 9:00",
      status: "completed",
      confirmed: true,
    },
  ]);

  const spaces = [
    // ... (datos de spaces sin cambios)
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
      // Limpiar estados de fecha a undefined
      setSelectedDate(undefined); 
      setSelectedTime("");
      setIsEditing(false);
      setEditingReservationId(null);
    }, 300);
  };

  const handleReserve = () => {
    // Aseguramos que selectedDate exista y sea una fecha para formatearla
    if (!selectedDate || !selectedTime || !selected) {
      alert("Por favor, selecciona una fecha y hora válidas.");
      return;
    }
    
    // Formateamos la fecha al formato de string 'YYYY-MM-DD' antes de guardar
    const formattedDate = format(selectedDate, 'yyyy-MM-dd');

    if (isEditing && editingReservationId) {
      // Actualizar reserva existente
      setMyReservations(prev => 
        prev.map(res => 
          res.id === editingReservationId
            ? { ...res, date: formattedDate, time: selectedTime }
            : res
        )
      );
      alert(`¡Reserva actualizada!\n${selected.name} - ${formattedDate}\nHorario: ${selectedTime}`);
    } else {
      // Nueva reserva
      const newReservation: Reservation = {
        id: Date.now().toString(),
        spaceName: selected.name || "",
        spaceIcon: selected.icon || "",
        date: formattedDate,
        time: selectedTime,
        status: "upcoming",
        confirmed: true,
      };
      setMyReservations(prev => [...prev, newReservation]);
      alert(`¡Reserva confirmada!\n${selected.name} - ${formattedDate}\nHorario: ${selectedTime}`);
    }
    handleCloseDrawer();
  };

  const handleEdit = (reservation: Reservation) => {
    const space = spaces.find(s => s.name === reservation.spaceName);
    if (space) {
      setSelectedSpace(space.id);
      // CORRECCIÓN: Convertir el string de fecha a un objeto Date para la edición
      setSelectedDate(new Date(reservation.date)); 
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

  // Función de formato para la vista de Mis Reservas
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    // Usamos date-fns para un formato consistente si es necesario, pero mantenemos la lógica local si es compatible
    return date.toLocaleDateString("es-CL", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  // Función para obtener tiempo relativo (ej: "En 2 días" o "Hace 5 días")
  const getRelativeTime = (dateString: string, status: string) => {
    const date = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    date.setHours(0, 0, 0, 0);

    if (status === "completed") {
      const daysAgo = differenceInDays(today, date);
      if (daysAgo === 0) return "Hoy";
      if (daysAgo === 1) return "Ayer";
      return `Hace ${daysAgo} días`;
    }

    const daysUntil = differenceInDays(date, today);
    if (daysUntil === 0) return "Hoy";
    if (daysUntil === 1) return "Mañana";
    return `En ${daysUntil} días`;
  };

  // Función para agrupar reservas por estado
  const groupReservationsByStatus = () => {
    const upcoming = myReservations.filter(r => r.status === "upcoming");
    const completed = myReservations.filter(r => r.status === "completed");
    const cancelled = myReservations.filter(r => r.status === "cancelled");
    return { upcoming, completed, cancelled };
  };

  const getStatusBadge = (status: string, confirmed?: boolean) => {
    const statusConfig = {
      upcoming: {
        text: "Próxima",
        color: "bg-emerald-100 text-emerald-700",
        icon: <CheckCircle2 className="w-3 h-3" />
      },
      completed: {
        text: "Completada",
        color: "bg-gray-100 text-gray-500",
        icon: null
      },
      cancelled: {
        text: "Cancelada",
        color: "bg-red-100 text-red-700",
        icon: null
      },
    };
    const config = statusConfig[status as keyof typeof statusConfig];
    return (
      <div className="flex items-center gap-1.5">
        <span
          className={`px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${config.color}`}
        >
          {config.icon}
          {config.text}
        </span>
        {status === "upcoming" && !confirmed && (
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-700 flex items-center gap-1">
            <AlertCircle className="w-3 h-3" />
            Pendiente
          </span>
        )}
      </div>
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
            <p className="block text-sm font-medium text-gray-700 mb-2">
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
                  <span className="text-sm font-medium" style={{ color: '#006E6F' }}>
                    {space.name}
                  </span>
                </button>
              ))}
            </div>
          </TabsContent>

          {/* Tab: Mis Reservas */}
          <TabsContent value="mis-reservas" className="mt-0">
            {myReservations.length === 0 ? (
              <div className="text-center py-16 px-4">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                  <Calendar className="w-8 h-8" style={{ color: '#79792B' }} />
                </div>
                <h3 className="text-gray-800 font-semibold mb-1 text-base">
                  No tienes reservas aún
                </h3>
                <p className="text-gray-500 text-sm mb-4">
                  Comienza reservando un espacio común
                </p>
                <button
                  onClick={() => {
                    const tab = document.querySelector('[value="reservar"]') as HTMLElement;
                    tab?.click();
                  }}
                  className="px-4 py-2 rounded-lg text-sm font-medium transition-all"
                  style={{ backgroundColor: '#006E6F', color: 'white' }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#005a5b')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#006E6F')}
                >
                  Ver espacios disponibles
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                
                {/* Sección: Próximas Reservas */}
                {(() => {
                  const { upcoming } = groupReservationsByStatus();
                  return upcoming.length > 0 ? (
                    <div>
                      <h3 className="text-xs font-bold uppercase tracking-wide text-gray-500 mb-3 pl-1">
                        Próximas ({upcoming.length})
                      </h3>
                      <div className="space-y-3">
                        {upcoming.map((reservation) => (
                          <div
                            key={reservation.id}
                            // Estilo de card replicado (fondo blanco, borde)
                            className="bg-white border border-gray-200 rounded-lg p-4 flex flex-col transition-all duration-200 hover:shadow-md"
                          >
                            
                            {/* Primera fila: Icono, Nombre, Acciones (alineadas arriba a la derecha) */}
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex items-center gap-3">
                                {/* Icono del espacio */}
                                <img
                                  src={reservation.spaceIcon}
                                  alt={reservation.spaceName}
                                  className="w-10 h-10 rounded object-cover" // Reducido ligeramente para coincidir con el diseño de la visita
                                />
                                <div className="flex-1">
                                  <h3 className="text-base font-medium text-gray-800 leading-tight">
                                    {reservation.spaceName}
                                  </h3>
                                  {/* Replicando el estilo de chip de visitante para el Relative Time */}
                                  <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full mt-1 inline-block">
                                    {getRelativeTime(reservation.date, reservation.status)}
                                  </span>
                                </div>
                              </div>
                              
                              {/* Iconos de acción: Edit y Trash (alineados arriba a la derecha) */}
                              <div className="flex gap-1 ml-auto pt-1">
                                <button
                                  onClick={() => handleEdit(reservation)}
                                  className="p-1.5 text-[#006E6F] hover:bg-[#006E6F]/10 rounded-lg transition-colors"
                                  title="Editar reserva"
                                >
                                  <Edit2 className="w-4 h-4" /> {/* Icono de 4x4 */}
                                </button>
                                {/* El icono de eliminar debe ser verde petróleo (coherente con el resto de la app, excepto el AlertDialog) */}
                                <button
                                  onClick={() => setReservationToDelete(reservation.id)}
                                  className="p-1.5 text-[#006E6F] hover:bg-[#006E6F]/10 rounded-lg transition-colors"
                                  title="Eliminar reserva"
                                >
                                  <Trash2 className="w-4 h-4" /> {/* Icono de 4x4 */}
                                </button>
                              </div>
                            </div>

                            {/* Segunda fila: Información de Fecha y Hora (alineadas con el diseño de Visitas) */}
                            <div className="space-y-1 ml-13"> {/* Ajuste de margen para alineación */}
                              
                              {/* Fecha */}
                              <div className="flex items-center gap-1 text-sm text-gray-500">
                                <Calendar className="w-4 h-4" />
                                <span>
                                  {formatDate(reservation.date)}
                                </span>
                              </div>
                              
                              {/* Horario */}
                              <div className="flex items-center gap-1 text-sm text-gray-600">
                                <Clock className="w-4 h-4" />
                                <span>
                                  {reservation.time} hrs
                                </span>
                              </div>

                              {/* Badge de estado (lo dejamos aquí para completar la info visualmente, aunque no es del diseño de Visitas) */}
                              <div className="mt-2 pt-1">
                                {getStatusBadge(reservation.status, reservation.confirmed)}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : null;
                })()}

                {/* Sección: Reservas Completadas */}
                {(() => {
                  const { completed } = groupReservationsByStatus();
                  return completed.length > 0 ? (
                    <div>
                      <h3 className="text-xs font-bold uppercase tracking-wide text-gray-500 mb-3 pl-1 mt-4">
                        Completadas ({completed.length})
                      </h3>
                      <div className="space-y-3">
                        {completed.map((reservation) => (
                          <div
                            key={reservation.id}
                            // Estilo de card replicado (fondo blanco, borde sutil gris)
                            className="bg-white border border-gray-200 rounded-lg p-4 flex flex-col transition-all duration-200 hover:shadow-md opacity-70"
                          >
                            
                            {/* Primera fila: Icono, Nombre */}
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex items-center gap-3">
                                {/* Icono del espacio */}
                                <img
                                  src={reservation.spaceIcon}
                                  alt={reservation.spaceName}
                                  className="w-10 h-10 rounded object-cover" 
                                />
                                <div className="flex-1">
                                  <h3 className="text-base font-medium text-gray-700 leading-tight">
                                    {reservation.spaceName}
                                  </h3>
                                  {/* Chip de tiempo relativo (estilo gris para completadas) */}
                                  <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full mt-1 inline-block">
                                    {getRelativeTime(reservation.date, reservation.status)}
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* Segunda fila: Información de Fecha y Hora */}
                            <div className="space-y-1 ml-13"> 
                              
                              {/* Fecha */}
                              <div className="flex items-center gap-1 text-sm text-gray-500">
                                <Calendar className="w-4 h-4 text-gray-400" />
                                <span>
                                  {formatDate(reservation.date)}
                                </span>
                              </div>
                              
                              {/* Horario */}
                              <div className="flex items-center gap-1 text-sm text-gray-500">
                                <Clock className="w-4 h-4 text-gray-400" />
                                <span>
                                  {reservation.time} hrs
                                </span>
                              </div>

                              {/* Badge de estado */}
                              <div className="mt-2 pt-1">
                                {getStatusBadge(reservation.status, reservation.confirmed)}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : null;
                })()}

                {/* Sección: Reservas Canceladas */}
                {(() => {
                  const { cancelled } = groupReservationsByStatus();
                  return cancelled.length > 0 ? (
                    <div>
                      <h3 className="text-xs font-bold uppercase tracking-wide text-gray-500 mb-3 pl-1 mt-4">
                        Canceladas ({cancelled.length})
                      </h3>
                      <div className="space-y-3">
                        {cancelled.map((reservation) => (
                          <div
                            key={reservation.id}
                            // Estilo de card replicado (fondo blanco, borde sutil gris)
                            className="bg-white border border-gray-200 rounded-lg p-4 flex flex-col transition-all duration-200 opacity-50" // Opacidad más baja para destacar el estado 'cancelada'
                          >
                            
                            {/* Primera fila: Icono, Nombre */}
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex items-center gap-3">
                                {/* Icono del espacio (tono gris) */}
                                <img
                                  src={reservation.spaceIcon}
                                  alt={reservation.spaceName}
                                  className="w-10 h-10 rounded object-cover filter grayscale" 
                                />
                                <div className="flex-1">
                                  <h3 className="text-base font-medium text-gray-700 leading-tight">
                                    {reservation.spaceName}
                                  </h3>
                                  {/* Chip de estado (estilo gris para canceladas) */}
                                  <span className="text-xs font-semibold text-red-600 bg-red-50 px-2.5 py-1 rounded-full mt-1 inline-block">
                                    {getRelativeTime(reservation.date, reservation.status)}
                                  </span>
                                </div>
                              </div>
                            </div>
                            
                            {/* Segunda fila: Información de Fecha y Hora */}
                            <div className="space-y-1 ml-13"> 
                              
                              {/* Fecha */}
                              <div className="flex items-center gap-1 text-sm text-gray-500">
                                <Calendar className="w-4 h-4 text-gray-400" />
                                <span>
                                  {formatDate(reservation.date)}
                                </span>
                              </div>
                              
                              {/* Horario */}
                              <div className="flex items-center gap-1 text-sm text-gray-500">
                                <Clock className="w-4 h-4 text-gray-400" />
                                <span>
                                  {reservation.time} hrs
                                </span>
                              </div>

                              {/* Badge de estado */}
                              <div className="mt-2 pt-1">
                                {getStatusBadge(reservation.status, reservation.confirmed)}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : null;
                })()}
              </div>
            )}
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

          {/* CORRECCIÓN 3: Reemplazar <input type="date"> por el componente Popover */}
          <div className="mb-3">
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Fecha*
            </label>
            <Popover>
                <PopoverTrigger asChild>
                    <button
                        className={cn(
                            "w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-[#006E6F] focus:border-transparent bg-white flex items-center justify-between hover:border-[#006E6F] transition-colors min-h-[44px]",
                            !selectedDate && "text-gray-400"
                        )}
                    >
                        <span>
                            {selectedDate ? format(selectedDate, "dd/MM/yyyy", { locale: es }) : "DD/MM/AAAA"}
                        </span>
                        <Calendar className="w-5 h-5 text-[#006E6F]" />
                    </button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <CalendarComponent
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                        initialFocus
                        locale={es} // Aseguramos que el calendario use español
                        className="pointer-events-auto"
                    />
                </PopoverContent>
            </Popover>
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
                    className={`py-2.5 rounded-lg border text-xs sm:text-sm font-medium transition-all ${
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
              // El botón ahora se habilita si selectedDate es un objeto Date y selectedTime existe
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
