import React, { useState } from "react";
import { Calendar, Clock, X, Edit2, Trash2, MapPin, User, Car, Footprints } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
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
  
  const savedVisitors: SavedVisitor[] = [
    { id: "1", name: "Mauricio", lastName: "Ramos", rut: "12345678-9" },
    { id: "2", name: "Ana", lastName: "Silva", rut: "98765432-1" }
  ];

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
      return <Car className="w-5 h-5 text-[#79792B]" />;
    }
    return <Footprints className="w-5 h-5 text-[#79792B]" />;
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
            <div className="space-y-6">
              {/* Sección Mañana */}
              {tomorrowVisits.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Mañana</h3>
                  <div className="space-y-3">
                    {tomorrowVisits.map((visit) => (
                      <div key={visit.id} className="bg-white border border-gray-200 rounded-lg p-4 flex justify-between items-center">
                        <div className="flex items-start gap-3 w-full">
                          <div className="mt-0.5">
                            {getArrivalTypeIcon(visit.type)}
                          </div>
                          <div className="flex-1">
                            <h3 className="text-base font-medium text-gray-800">{visit.name}</h3>
                            <div className="flex items-center gap-1 text-sm text-gray-600 mt-1">
                              <Clock className="w-4 h-4" />
                              <span>{visit.arrivalTime} - {visit.departureTime} hrs</span>
                            </div>
                            <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                              <Calendar className="w-4 h-4" />
                              <span>{format(new Date(visit.date), "EEE, d 'de' MMMM", { locale: es })}</span>
                            </div>
                            {visit.type === "vehiculo" && (
                              <div className="text-sm text-gray-500 mt-1">
                                {visit.plate}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-2 ml-2">
                          <button className="p-2 text-[#006E6F] hover:bg-[#006E6F]/10 rounded-lg">
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleDeleteClick(visit.id)} 
                            className="p-2 text-[#006E6F] hover:bg-[#006E6F]/10 rounded-lg"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Otras fechas - agrupadas */}
              {Object.entries(groupedVisits).map(([date, visits]) => (
                <div key={date}>
                  <h3 className="text-xs font-bold uppercase tracking-wide text-gray-500 mb-3 pl-1 mt-4">
                    {format(new Date(date), "EEEE, d 'de' MMMM", { locale: es })}
                  </h3>
                  <div className="space-y-3">
                    {visits.map((visit) => (
                      <div key={visit.id} className="bg-white border border-gray-200 rounded-lg p-4 flex justify-between items-center">
                        <div className="flex items-start gap-3 w-full">
                          <div className="mt-0.5">
                            {getArrivalTypeIcon(visit.type)}
                          </div>
                          <div className="flex-1">
                            <h3 className="text-base font-medium text-gray-800">{visit.name}</h3>
                            <div className="flex items-center gap-1 text-sm text-gray-600 mt-1">
                              <Clock className="w-4 h-4" />
                              <span>{visit.arrivalTime} - {visit.departureTime} hrs</span>
                            </div>
                            <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                              <Calendar className="w-4 h-4" />
                              <span>{format(new Date(visit.date), "EEE, d 'de' MMMM", { locale: es })}</span>
                            </div>
                            {visit.type === "vehiculo" && (
                              <div className="text-sm text-gray-500 mt-1">
                                {visit.plate}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-2 ml-2">
                          <button className="p-2 text-[#006E6F] hover:bg-[#006E6F]/10 rounded-lg">
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleDeleteClick(visit.id)} 
                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
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
