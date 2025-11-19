import React, { useState } from "react";
import { Calendar, Clock, X, Edit2, Trash2, MapPin, User, Car, Footprints } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { BottomDrawer } from "../ui/BottomDrawer";
import { TimePicker } from "@/components/ui/time-picker";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter } from "@/components/ui/alert-dialog";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { cn } from "@/lib/utils";

interface SavedVisitor {
  id: string;
  name: string;
  lastName: string;
  rut: string;
}

interface Visitor {
  id: string;
  name: string;
  arrivalTime: string;
  departureTime: string;
  date: string;
  type: string;
  plate?: string; // Solo si llega en vehículo
}

export const VisitsPage: React.FC = () => {
  const [showSavedVisitorBanner, setShowSavedVisitorBanner] = useState(true);
  const [selectedVisitor, setSelectedVisitor] = useState<string>("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [rut, setRut] = useState("");
  const [tipoVisitante, setTipoVisitante] = useState("familia");
  const [guardarVisitante, setGuardarVisitante] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [horaEntrada, setHoraEntrada] = useState("");
  const [horaSalida, setHoraSalida] = useState("");
  const [medioLlegada, setMedioLlegada] = useState("vehiculo");
  const [patente, setPatente] = useState("");
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingVisit, setEditingVisit] = useState<Visitor | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [arrivalType, setArrivalType] = useState<string>("peaton");
  
  const savedVisitors: SavedVisitor[] = [
    { id: "1", name: "Mauricio", lastName: "Ramos", rut: "12345678-9" },
    { id: "2", name: "Ana", lastName: "Silva", rut: "98765432-1" }
  ];

  const handleCloseDrawer = () => {
      setIsEditDialogOpen(false);
      setEditingVisit(null);
      setIsEditing(false);
  };

  const handleEdit = (visit: Visitor) => {
    setEditingVisit(visit);
    setIsEditing(true);
    
    // 1. Convertir la fecha string (ej. "2025-11-20") a objeto Date
    setSelectedDate(new Date(visit.date)); 
    setArrivalTime(visit.arrivalTime);
    setDepartureTime(visit.departureTime);
    
    // 2. Establecer el tipo de llegada (peaton/vehiculo)
    setArrivalType(visit.type); 

    // 3. Establecer la patente si es vehículo
    if (visit.type === 'vehiculo' && visit.plate) {
        setPatente(visit.plate);
    } else {
        setPatente(''); // Limpiar patente si no aplica
    }

    setIsEditDialogOpen(true);
  };
  
  const handleUpdateVisit = () => {
      if (!editingVisit) return;
      
      // Validación básica
      if (!selectedDate || !arrivalTime || !departureTime || !arrivalType) {
          alert("Por favor complete todos los campos requeridos.");
          return;
      }

      // Construir el objeto de visita actualizado
      const updatedVisit: Visitor = {
          ...editingVisit,
          date: format(selectedDate, 'yyyy-MM-dd'), // Formatear a string para el mock
          arrivalTime: arrivalTime,
          departureTime: departureTime,
          type: arrivalType, 
          plate: arrivalType === 'vehiculo' ? patente : undefined,
      };
      
      // SIMULACIÓN de lógica de actualización
      console.log("Visita actualizada:", updatedVisit);
      alert(`Visita de ${updatedVisit.name} actualizada para el ${updatedVisit.date}.`);
      
      // Cerrar el drawer
      handleCloseDrawer();
      
  };

  
  const [visits, setVisits] = useState<Visitor[]>([
    { 
      id: "1", 
      name: "Mauricio Ramos", 
      arrivalTime: "16:00", 
      departureTime: "20:00", 
      date: "2025-11-11", 
      type: "pie" 
    },
    { 
      id: "2", 
      name: "Xavier Lino", 
      arrivalTime: "09:00", 
      departureTime: "12:00", 
      date: "2025-11-12", 
      type: "vehiculo", 
      plate: "LLWX26" 
    },
    { 
      id: "3", 
      name: "Matías Gonzalez", 
      arrivalTime: "14:00", 
      departureTime: "18:00", 
      date: "2025-11-12", 
      type: "pie" 
    },
    { 
      id: "4", 
      name: "Mauricio Ramos", 
      arrivalTime: "14:00", 
      departureTime: "18:00", 
      date: "2025-11-12", 
      type: "pie" 
    }
  ]);

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedVisitId, setSelectedVisitId] = useState<string | null>(null);

  const handleDeleteConfirm = () => {
    if (selectedVisitId) {
      setVisits(prevVisits => prevVisits.filter(visit => visit.id !== selectedVisitId));
      setOpenDeleteDialog(false);
    }
  };

  const getArrivalTypeIcon = (type: string) => {
    if (type === "vehiculo") {
      return <Car className="w-6 h-6 text-gray-700" />;
    }
    return <Footprints className="w-6 h-6 text-gray-700" />;
  };

  const handleDeleteClick = (id: string) => {
    setSelectedVisitId(id);
    setOpenDeleteDialog(true);
  };

  const sortedVisits = visits.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const isFormValid = () => {
    const basicFieldsValid = nombre && apellido && rut && selectedDate && horaEntrada && horaSalida;
    const vehicleFieldValid = medioLlegada === "apie" || (medioLlegada === "vehiculo" && patente);
    return basicFieldsValid && vehicleFieldValid;
  };

  const handleRegister = () => {
    if (!nombre || !apellido || !rut || !selectedDate || !horaEntrada || !horaSalida) {
      alert("Por favor, completa todos los campos obligatorios");
      return;
    }
    if (medioLlegada === "vehiculo" && !patente) {
      alert("Por favor, ingresa la patente del vehículo");
      return;
    }
    alert("¡Visita registrada exitosamente!");
  };

  const handleVisitorSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const visitorId = e.target.value;
    setSelectedVisitor(visitorId);
    if (visitorId) {
      const visitor = savedVisitors.find(v => v.id === visitorId);
      if (visitor) {
        setNombre(visitor.name);
        setApellido(visitor.lastName);
        setRut(visitor.rut);
      }
    } else {
      setNombre("");
      setApellido("");
      setRut("");
    }
  };

  // Función para obtener las visitas de mañana
  const getTomorrowVisits = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return sortedVisits.filter(visit => {
      const visitDate = new Date(visit.date);
      return visitDate.toDateString() === tomorrow.toDateString();
    });
  };

  // Función para agrupar visitas por fecha (excluyendo mañana)
  const getGroupedVisits = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const otherVisits = sortedVisits.filter(visit => {
      const visitDate = new Date(visit.date);
      return visitDate.toDateString() !== tomorrow.toDateString();
    });

    const grouped: Record<string, Visitor[]> = {};
    otherVisits.forEach(visit => {
      if (!grouped[visit.date]) {
        grouped[visit.date] = [];
      }
      grouped[visit.date].push(visit);
    });

    return grouped;
  };

  const tomorrowVisits = getTomorrowVisits();
  const groupedVisits = getGroupedVisits();

  return (
    <div className="w-full min-h-screen bg-gray-50 flex flex-col items-center p-4">
      <div className="w-full max-w-md">
        <div className="flex items-center mb-4">
          <button className="mr-3">
            {/* Add icon or button */}
          </button>
          <h1 className="text-xl font-bold">Visitas</h1>
        </div>

        <Tabs defaultValue="registrar" className="w-full">
          <TabsList className="w-full grid grid-cols-2 mb-4 bg-transparent border-b border-gray-200 rounded-none h-auto p-0">
            <TabsTrigger value="registrar" className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#006E6F] data-[state=active]:text-[#006E6F] data-[state=active]:bg-transparent data-[state=active]:shadow-none pb-2">
              Registrar visita
            </TabsTrigger>
            <TabsTrigger value="proximas" className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#006E6F] data-[state=active]:text-[#006E6F] data-[state=active]:bg-transparent data-[state=active]:shadow-none pb-2">
              Próximas visitas
            </TabsTrigger>
          </TabsList>

          {/* Tab: Registrar visita */}
          <TabsContent value="registrar" className="mt-0">
            {/* Saved Visitor Banner */}
            {showSavedVisitorBanner && <div className="bg-[#DDDFA8] rounded-lg p-4 mb-4 relative">
              <button onClick={() => setShowSavedVisitorBanner(false)} className="absolute top-3 right-3">
                <X className="w-5 h-5 text-gray-700" />
              </button>
              <p className="font-medium text-gray-800 mb-3">
                ¿Quieres usar un visitante guardado?
              </p>
              <div className="relative">
                <select value={selectedVisitor} onChange={handleVisitorSelect} className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-10 text-sm bg-white focus:ring-2 focus:ring-[#006E6F] focus:border-transparent" style={{
                  appearance: 'none',
                  WebkitAppearance: 'none',
                  MozAppearance: 'none'
                }}>
                  <option value="">Seleccionar visitante</option>
                  {savedVisitors.map(visitor => <option key={visitor.id} value={visitor.id}>
                    {visitor.name} {visitor.lastName}
                  </option>)}
                </select>
                <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>}

            {/* Información del visitante */}
            <div className="mb-6">
              <h2 className="font-semibold text-gray-800 mb-4">Información del visitante</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2"> Nombre* </label>
                  <input type="text" value={nombre} onChange={e => setNombre(e.target.value)} placeholder="Ej: Mauricio" className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-[#006E6F] focus:border-[#006E6F]" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2"> Apellido* </label>
                  <input type="text" value={apellido} onChange={e => setApellido(e.target.value)} placeholder="Ej: Ramos" className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-[#006E6F] focus:border-[#006E6F]" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2"> Rut* </label>
                  <input type="text" value={rut} onChange={e => setRut(e.target.value)} placeholder="Ej: 12345678-9" className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-[#006E6F] focus:border-[#006E6F]" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3"> Tipo de visitante* </label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" value="familia" checked={tipoVisitante === "familia"} onChange={e => setTipoVisitante(e.target.value)} className="w-5 h-5 accent-[#006E6F] border-gray-300 focus:ring-[#006E6F]" />
                      <span className="text-sm text-gray-700">Familia/Amigos</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" value="servicio" checked={tipoVisitante === "servicio"} onChange={e => setTipoVisitante(e.target.value)} className="w-5 h-5 accent-[#006E6F] border-gray-300 focus:ring-[#006E6F]" />
                      <span className="text-sm text-gray-700">Servicio Externo</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" value="otro" checked={tipoVisitante === "otro"} onChange={e => setTipoVisitante(e.target.value)} className="w-5 h-5 accent-[#006E6F] border-gray-300 focus:ring-[#006E6F]" />
                      <span className="text-sm text-gray-700">Otro</span>
                    </label>
                  </div>
                </div>

                {selectedVisitor === "" && (
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="guardar"
                      checked={guardarVisitante}
                      onChange={e => setGuardarVisitante(e.target.checked)}
                      className="w-4 h-4 accent-[#006E6F] border-gray-300 rounded focus:ring-[#006E6F]"
                    />
                    <label htmlFor="guardar" className="text-sm text-gray-700">
                      Guardar visitante para futuras visitas
                    </label>
                  </div>
                )}
              </div>
            </div>

            {/* Información de la visita */}
            <div className="mb-6">
              <h2 className="font-semibold text-gray-800 mb-4">Información de la visita</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2"> Fecha* </label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <button className={cn("w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-[#006E6F] focus:border-transparent bg-white flex items-center justify-between hover:border-[#006E6F] transition-colors", !selectedDate && "text-gray-400")}>
                        <span>
                          {selectedDate ? format(selectedDate, "dd/MM/yyyy", { locale: es }) : "DD/MM/AAAA"}
                        </span>
                        <Calendar className="w-5 h-5 text-[#006E6F]" />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <CalendarComponent mode="single" selected={selectedDate} onSelect={setSelectedDate} disabled={date => date < new Date(new Date().setHours(0, 0, 0, 0))} initialFocus className="pointer-events-auto" />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2"> Hora de entrada* </label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <button className={cn("w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-[#006E6F] focus:border-transparent bg-white flex items-center justify-between hover:border-[#006E6F] transition-colors", !horaEntrada && "text-gray-400")}>
                          <span>{horaEntrada || "HH:MM"}</span>
                          <Clock className="w-5 h-5 text-[#006E6F]" />
                        </button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <TimePicker value={horaEntrada} onChange={setHoraEntrada} />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2"> Hora de salida* </label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <button className={cn("w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-[#006E6F] focus:border-transparent bg-white flex items-center justify-between hover:border-[#006E6F] transition-colors", !horaSalida && "text-gray-400")}>
                          <span>{horaSalida || "HH:MM"}</span>
                          <Clock className="w-5 h-5 text-[#006E6F]" />
                        </button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <TimePicker value={horaSalida} onChange={setHoraSalida} />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3"> Medio de llegada* </label>
                  <div className="flex gap-6">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" value="vehiculo" checked={medioLlegada === "vehiculo"} onChange={e => setMedioLlegada(e.target.value)} className="w-5 h-5 accent-[#006E6F] border-gray-300 focus:ring-[#006E6F]" />
                      <span className="text-sm text-gray-700">Vehículo</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" value="apie" checked={medioLlegada === "apie"} onChange={e => setMedioLlegada(e.target.value)} className="w-5 h-5 accent-[#006E6F] border-gray-300 focus:ring-[#006E6F]" />
                      <span className="text-sm text-gray-700">A pie</span>
                    </label>
                  </div>
                </div>

                {medioLlegada === "vehiculo" && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2"> Patente* </label>
                    <input type="text" value={patente} onChange={e => setPatente(e.target.value.toUpperCase())} placeholder="Ej: NOPQ12" className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-[#006E6F] focus:border-[#006E6F]" />
                  </div>
                )}
              </div>
            </div>

            {/* Register Button con validación */}
            <button
              onClick={handleRegister}
              disabled={!isFormValid()}
              className={`w-full py-3 sm:py-3.5 rounded-xl font-bold text-sm sm:text-base text-white transition-all mb-20 ${
                isFormValid()
                  ? "bg-[#006E6F] hover:bg-[#005a5b]"
                  : "bg-gray-300 cursor-not-allowed"
              }`}
            >
              Registrar
            </button>
          </TabsContent>

          {/* Tab: Próximas visitas */}
          <TabsContent value="proximas" className="mt-0">
            <div className="space-y-6 pb-20">
              
              {/* Sección Mañana */}
              {tomorrowVisits.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Mañana</h3>
                  <div className="space-y-3">
                    {tomorrowVisits.map((visit) => (
                      <div 
                        key={visit.id} 
                        // Estilo de card replicado (fondo blanco, borde)
                        className="bg-white border border-[#BDBE7D] rounded-lg p-4 flex flex-col transition-all duration-200 hover:shadow-md"
                      >
                        
                        {/* Primera fila: Icono, Nombre, Acciones (alineadas arriba a la derecha) */}
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            {/* Icono de tipo de llegada */}
                            <div className="pt-0.5">
                              {getArrivalTypeIcon(visit.type)}
                            </div>
                            <div className="flex-1">
                              <h3 className="text-base font-medium text-gray-800 leading-tight">
                                {visit.name}
                              </h3>
                              {/* Chip de "Mañana" - Estilo de Reserva (pequeño, debajo del nombre) */}
                              <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full mt-1 inline-block">
                                Mañana
                              </span>
                            </div>
                          </div>
                          
                          {/* Iconos de acción: Edit y Trash (alineados arriba a la derecha) */}
                          <div className="flex gap-1 ml-auto pt-1">
                            <button 
                              onClick={() => handleEdit(visit)} // <-- AÑADIDO
                              className="p-1.5 text-[#006E6F] hover:bg-[#006E6F]/10 rounded-lg transition-colors" 
                              title="Editar visita"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            {/* Icono de eliminar en verde petróleo (#006E6F) */}
                            <button 
                              onClick={() => handleDeleteClick(visit.id)} 
                              className="p-1.5 text-[#006E6F] hover:bg-[#006E6F]/10 rounded-lg transition-colors"
                              title="Eliminar visita"
                            >
                              <Trash2 className="w-4 h-4" /> 
                            </button>
                          </div>
                        </div>

                        {/* Segunda fila: Información de Fecha y Hora*/}
                        <div className="space-y-1 ml-13"> {/* Margen para alinear con el texto del nombre/chip */}
                          
                          {/* Fecha */}
                          <div className="flex items-center gap-1 text-sm text-gray-600">
                            <Calendar className="w-4 h-4 text-gray-600" />
                            <span>
                              {format(new Date(visit.date), "EEEE, d 'de' MMMM", { locale: es })}
                            </span>
                          </div>

                          {/* Horario */}
                          <div className="flex items-center gap-1 text-sm text-gray-600">
                            <Clock className="w-4 h-4 text-gray-600" />
                            <span>
                              {visit.arrivalTime} - {visit.departureTime} hrs
                            </span>
                          </div>

                          {/* Patente (si aplica) */}
                          {visit.type === "vehiculo" && (
                            <div className="text-sm text-gray-500 pl-5">
                              Patente: {visit.plate}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Otras fechas - agrupadas */}
              {Object.entries(groupedVisits).map(([date, visits]) => (
                <div key={date}>
                  {/* Título de la fecha - sin cambios */}
                  <h3 className="text-xs font-bold uppercase tracking-wide text-gray-500 mb-3 pl-1 mt-4">
                    {format(new Date(date), "EEEE, d 'de' MMMM", { locale: es })}
                  </h3>
                  <div className="space-y-3">
                    {visits.map((visit) => (
                      <div 
                        key={visit.id} 
                        // Estilo de card replicado (fondo blanco, borde)
                        className="bg-white border border-[#BDBE7D] rounded-lg p-4 flex flex-col transition-all duration-200 hover:shadow-md"
                      >
                        
                        {/* Primera fila: Icono, Nombre, Acciones (alineadas arriba a la derecha) */}
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            {/* Icono de tipo de llegada */}
                            <div className="pt-0.5">
                              {getArrivalTypeIcon(visit.type)}
                            </div>
                            <div className="flex-1">
                              <h3 className="text-base font-medium text-gray-800 leading-tight">
                                {visit.name}
                              </h3>
                              {/* Chip de fecha (Ej: "En 2 días") - Estilo de Reserva (pequeño, debajo del nombre) */}
                              <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full mt-1 inline-block">
                                {new Date(visit.date).toDateString() === new Date().toDateString() 
                                  ? "Hoy" 
                                  : `En ${Math.abs(new Date(visit.date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24) < 1 ? '1 día' : Math.floor(Math.abs(new Date(visit.date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)) + ' días'}`}
                              </span>
                            </div>
                          </div>

                          {/* Iconos de acción: Edit y Trash (alineados arriba a la derecha) */}
                          <div className="flex gap-1 ml-auto pt-1">
                            <button 
                              onClick={() => handleEdit(visit)} // <-- AÑADIDO
                              className="p-1.5 text-[#006E6F] hover:bg-[#006E6F]/10 rounded-lg transition-colors" 
                              title="Editar visita"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            {/* Icono de eliminar en verde petróleo (#006E6F) */}
                            <button 
                              onClick={() => handleDeleteClick(visit.id)} 
                              className="p-1.5 text-[#006E6F] hover:bg-[#006E6F]/10 rounded-lg transition-colors"
                              title="Eliminar visita"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        {/* Segunda fila: Información de Fecha y Hora */}
                        <div className="space-y-1 ml-13"> {/* Margen para alinear con el texto del nombre/chip */}
                          
                          {/* Fecha */}
                          <div className="flex items-center gap-1 text-sm text-gray-600">
                            <Calendar className="w-4 h-4 text-gray-600" />
                            <span>
                              {format(new Date(visit.date), "EEEE, d 'de' MMMM", { locale: es })}
                            </span>
                          </div>
                          
                          {/* Horario */}
                          <div className="flex items-center gap-1 text-sm text-gray-600">
                            <Clock className="w-4 h-4 text-gray-600" />
                            <span>
                              {visit.arrivalTime} - {visit.departureTime} hrs
                            </span>
                          </div>
                          
                          {/* Patente (si aplica) */}
                          {visit.type === "vehiculo" && (
                            <div className="text-sm text-gray-600 pl-5">
                              Patente: {visit.plate}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              {/* Mensaje cuando no hay visitas */}
              {sortedVisits.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-sm">No hay próximas visitas registradas</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Bottom Drawer para edición de visita */}
      <BottomDrawer open={isEditDialogOpen} onOpenChange={handleCloseDrawer}>
          <div className="p-4 sm:p-6 pb-16 max-h-[80vh] overflow-y-auto"> {/* pb-16 para dar espacio al botón fijo */}
              <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-900">
                      Editar Visita
                  </h2>
                  <button onClick={handleCloseDrawer} className="text-gray-400 hover:text-gray-600">
                      <X className="w-6 h-6" />
                  </button>
              </div>

              {/* Formulario de Edición de Visita */}
              <div className="space-y-6">
                  
                  {/* 1. Selector de Fecha */}
                  <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 block">Fecha</label>
                      <Popover>
                          <PopoverTrigger asChild>
                              <button
                                  className={cn(
                                      "w-full justify-start text-left font-normal border border-gray-300 rounded-lg p-3",
                                      !selectedDate && "text-gray-500"
                                  )}
                              >
                                  <Calendar className="mr-2 h-4 w-4 inline text-gray-500" />
                                  {selectedDate ? format(selectedDate, "PPP", { locale: es }) : <span>Selecciona una fecha</span>}
                              </button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                              <CalendarComponent
                                  mode="single"
                                  selected={selectedDate}
                                  onSelect={setSelectedDate}
                                  initialFocus
                                  locale={es}
                              />
                          </PopoverContent>
                      </Popover>
                  </div>

                  {/* 2. Selectores de Hora */}
                  <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-700 block">Hora de Llegada</label>
                          <TimePicker
                              selectedTime={arrivalTime}
                              onTimeChange={setArrivalTime}
                              placeholder="HH:MM"
                          />
                      </div>
                      <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-700 block">Hora de Salida</label>
                          <TimePicker
                              selectedTime={departureTime}
                              onTimeChange={setDepartureTime}
                              placeholder="HH:MM"
                          />
                      </div>
                  </div>
                  
                  {/* 3. Tipo de Llegada (Peatón/Vehículo) */}
                  <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 block">Tipo de llegada</label>
                      <div className="flex gap-4">
                          <button
                              onClick={() => setArrivalType("peaton")}
                              className={`flex-1 flex items-center justify-center p-3 rounded-xl border-2 transition-colors ${
                                  arrivalType === "peaton"
                                      ? "border-[#006E6F] bg-[#006E6F]/10 text-[#006E6F]"
                                      : "border-gray-300 text-gray-600 hover:border-gray-400"
                              }`}
                          >
                              <Footprints className="w-5 h-5 mr-2" /> Peatón
                          </button>
                          <button
                              onClick={() => setArrivalType("vehiculo")}
                              className={`flex-1 flex items-center justify-center p-3 rounded-xl border-2 transition-colors ${
                                  arrivalType === "vehiculo"
                                      ? "border-[#006E6F] bg-[#006E6F]/10 text-[#006E6F]"
                                      : "border-gray-300 text-gray-600 hover:border-gray-400"
                              }`}
                          >
                              <Car className="w-5 h-5 mr-2" /> Vehículo
                          </button>
                      </div>
                  </div>

                  {/* 4. Patente (solo si es vehículo) */}
                  {arrivalType === "vehiculo" && (
                      <div className="space-y-2">
                          <label htmlFor="patente" className="text-sm font-medium text-gray-700 block">
                              Patente
                          </label>
                          <input
                              id="patente"
                              type="text"
                              value={patente}
                              onChange={(e) => setPatente(e.target.value.toUpperCase())}
                              placeholder="ABCD12"
                              className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:border-[#006E6F] focus:ring-[#006E6F] transition-colors"
                          />
                      </div>
                  )}
              </div>

              {/* Botón de Actualizar - Fijo en la parte inferior */}
              <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 shadow-lg max-w-2xl mx-auto">
                  <button
                      onClick={handleUpdateVisit}
                      // Habilitar si todos los campos requeridos están llenos
                      disabled={!selectedDate || !arrivalTime || !departureTime} 
                      className={`w-full py-3 sm:py-3.5 rounded-xl font-bold text-sm sm:text-base text-white transition-all ${
                          selectedDate && arrivalTime && departureTime
                              ? "bg-[#006E6F] hover:bg-[#005a5b]"
                              : "bg-gray-300 cursor-not-allowed"
                      }`}
                  >
                      Actualizar Visita
                  </button>
              </div>
          </div>
      </BottomDrawer>
      
      {/* Dialogo de confirmación de eliminación */}
      <AlertDialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar visita?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. La visita será eliminada permanentemente.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setOpenDeleteDialog(false)}>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm} className="bg-red-600 hover:bg-red-700">
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
