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

// Datos Mock (simplificado)
const MOCK_VISITS: Visitor[] = [
  { id: "v1", name: "Mauricio Ramos", arrivalTime: "16:00", departureTime: "20:00", date: "2025-11-20", type: "vehiculo", plate: "HTXJ34" },
  { id: "v2", name: "Valentina Soto", arrivalTime: "10:30", departureTime: "12:00", date: "2025-11-25", type: "peaton" },
];

const MOCK_SAVED_VISITORS: SavedVisitor[] = [
  { id: "s1", name: "María", lastName: "Gómez", rut: "11.111.111-1" },
  { id: "s2", name: "Juan", lastName: "Pérez", rut: "22.222.222-2" },
];

const formatCurrency = (amount: number) => {
  return amount.toLocaleString('es-CL', { style: 'currency', currency: 'CLP', minimumFractionDigits: 0 });
};

const getArrivalTypeIcon = (type: string) => {
  if (type === "vehiculo") {
    return <Car className="w-5 h-5 text-gray-700" />;
  }
  return <Footprints className="w-5 h-5 text-gray-700" />;
};


export const VisitsPage: React.FC = () => {
  const [showSavedVisitorBanner, setShowSavedVisitorBanner] = useState(true);
  const [selectedVisitor, setSelectedVisitor] = useState<string>("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [rut, setRut] = useState("");
  const [tipoVisitante, setTipoVisitante] = useState("familia");
  const [medioLlegada, setMedioLlegada] = useState("a pie");

  // ESTADOS DEL FORMULARIO DE REGISTRO/EDICIÓN - CORREGIDOS
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [arrivalTime, setArrivalTime] = useState<string>("");
  const [departureTime, setDepartureTime] = useState<string>("");
  const [patente, setPatente] = useState<string>("");
  // FIN ESTADOS DEL FORMULARIO

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [visitToDelete, setVisitToDelete] = useState<string | null>(null);
  
  // NUEVOS ESTADOS PARA EDICIÓN
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingVisit, setEditingVisit] = useState<Visitor | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [arrivalType, setArrivalType] = useState<string>("peaton"); // Para manejar Peatón/Vehículo en el formulario de edición

  const [visits, setVisits] = useState<Visitor[]>(MOCK_VISITS);

  // Funciones de manejo de visitas (mock)
  const handleDeleteClick = (id: string) => {
    setVisitToDelete(id);
    setOpenDeleteDialog(true);
  };

  const handleDeleteConfirm = () => {
    setVisits(visits.filter(v => v.id !== visitToDelete));
    setOpenDeleteDialog(false);
    setVisitToDelete(null);
  };

  // FUNCIONES PARA EDICIÓN
  const handleCloseDrawer = () => {
      setIsEditDialogOpen(false);
      setEditingVisit(null);
      setIsEditing(false);
  };

  const handleEdit = (visit: Visitor) => {
    setEditingVisit(visit);
    setIsEditing(true);
    
    // CORRECCIÓN DE FECHA: Reemplazar '-' con '/' para forzar el análisis en hora local (o UTC 00:00:00 local).
    // Esto es crucial para evitar errores de Invalid Date o de un día menos por problemas de zona horaria.
    const dateToParse = visit.date.replace(/-/g, '/');
    setSelectedDate(new Date(dateToParse)); 
    
    setArrivalTime(visit.arrivalTime);
    setDepartureTime(visit.departureTime);
    setArrivalType(visit.type); 

    if (visit.type === 'vehiculo' && visit.plate) {
        setPatente(visit.plate);
    } else {
        setPatente('');
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

      const updatedVisit: Visitor = {
          ...editingVisit,
          // Asegurar que selectedDate es un objeto Date antes de formatear
          date: format(selectedDate, 'yyyy-MM-dd'), 
          arrivalTime: arrivalTime,
          departureTime: departureTime,
          type: arrivalType, 
          plate: arrivalType === 'vehiculo' ? patente : undefined,
      };
      
      // SIMULACIÓN: Reemplazar la visita en el mock de visitas
      setVisits(visits.map(v => v.id === updatedVisit.id ? updatedVisit : v));
      
      alert(`Visita de ${updatedVisit.name} actualizada.`);
      
      handleCloseDrawer();
  };
  // FIN FUNCIONES DE EDICIÓN
  
  // Lógica de agrupamiento (sin cambios)
  const sortedVisits = visits.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  
  const tomorrowVisits = sortedVisits.filter(visit => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const visitDate = new Date(visit.date);
    return format(visitDate, 'yyyy-MM-dd') === format(tomorrow, 'yyyy-MM-dd');
  });

  const getGroupedVisits = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const otherVisits = sortedVisits.filter(visit => {
      const visitDate = new Date(visit.date);
      // Incluye solo visitas que no son mañana
      return new Date(visit.date) > tomorrow; 
    });

    return otherVisits.reduce((groups, visit) => {
      const date = format(new Date(visit.date), 'yyyy-MM-dd');
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(visit);
      return groups;
    }, {} as { [key: string]: Visitor[] });
  };

  const groupedVisits = getGroupedVisits();

  // Lógica de chip de tiempo
  const getRelativeTime = (dateString: string) => {
    const now = new Date();
    const visitDate = new Date(dateString.replace(/-/g, '/'));
    const diffTime = visitDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Hoy";
    if (diffDays === 1) return "Mañana";
    if (diffDays > 1) return `En ${diffDays} días`;
    return format(visitDate, "dd/MM");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-4 pt-8 max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Registro de Visitas</h1>

        <Tabs defaultValue="proximas" className="w-full">
          <TabsList className="grid w-full grid-cols-2 h-10 bg-gray-200">
            <TabsTrigger value="proximas" className="text-sm font-semibold data-[state=active]:bg-[#006E6F] data-[state=active]:text-white">Próximas</TabsTrigger>
            <TabsTrigger value="registro" className="text-sm font-semibold data-[state=active]:bg-[#006E6F] data-[state=active]:text-white">Registrar</TabsTrigger>
          </TabsList>

          {/* Tab: Próximas visitas */}
          <TabsContent value="proximas" className="mt-0">
            <div className="space-y-6 pb-20"> {/* pb-20 para evitar solapamiento con bottom bar */}
              
              {/* Sección Mañana */}
              {tomorrowVisits.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Mañana</h3>
                  <div className="space-y-3">
                    {tomorrowVisits.map((visit) => (
                      <div 
                        key={visit.id} 
                        className="bg-white border border-[#BDBE7D] rounded-lg p-4 flex flex-col transition-all duration-200 hover:shadow-md"
                      >
                        
                        {/* Primera fila: Icono, Nombre, Acciones (alineadas arriba a la derecha) */}
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="pt-0.5">
                              {getArrivalTypeIcon(visit.type)}
                            </div>
                            <div className="flex-1">
                              <h3 className="text-base font-medium text-gray-800 leading-tight">
                                {visit.name}
                              </h3>
                              <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full mt-1 inline-block">
                                Mañana
                              </span>
                            </div>
                          </div>
                          
                          {/* Iconos de acción: Edit y Trash (alineados arriba a la derecha) */}
                          <div className="flex gap-1 ml-auto pt-1">
                            {/* APLICANDO EL HANDLER DE EDICIÓN */}
                            <button 
                                onClick={() => handleEdit(visit)} 
                                className="p-1.5 text-[#006E6F] hover:bg-[#006E6F]/10 rounded-lg transition-colors" 
                                title="Editar visita"
                            >
                              <Edit2 className="w-4 h-4" /> 
                            </button>
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
                        <div className="space-y-1 ml-13"> 
                          
                          {/* Fecha */}
                          <div className="flex items-center gap-1 text-sm text-gray-500">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            <span>
                              {format(new Date(visit.date.replace(/-/g, '/')), "EEEE, d 'de' MMMM", { locale: es })}
                            </span>
                          </div>

                          {/* Horario */}
                          <div className="flex items-center gap-1 text-sm text-gray-600">
                            <Clock className="w-4 h-4 text-gray-400" />
                            <span>
                              {visit.arrivalTime} - {visit.departureTime} hrs
                            </span>
                          </div>

                          {/* Patente (si aplica) */}
                          {visit.type === "vehiculo" && (
                            <div className="text-sm text-gray-500 pl-5">
                              Patente: **{visit.plate}**
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
                  <h3 className="text-xs font-bold uppercase tracking-wide text-gray-500 mb-3 pl-1 mt-4">
                    {format(new Date(date.replace(/-/g, '/')), "EEEE, d 'de' MMMM", { locale: es })}
                  </h3>
                  <div className="space-y-3">
                    {visits.map((visit) => (
                      <div 
                        key={visit.id} 
                        className="bg-white border border-[#BDBE7D] rounded-lg p-4 flex flex-col transition-all duration-200 hover:shadow-md"
                      >
                        
                        {/* Primera fila: Icono, Nombre, Acciones (alineadas arriba a la derecha) */}
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="pt-0.5">
                              {getArrivalTypeIcon(visit.type)}
                            </div>
                            <div className="flex-1">
                              <h3 className="text-base font-medium text-gray-800 leading-tight">
                                {visit.name}
                              </h3>
                              <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full mt-1 inline-block">
                                {getRelativeTime(visit.date)}
                              </span>
                            </div>
                          </div>

                          {/* Iconos de acción: Edit y Trash (alineados arriba a la derecha) */}
                          <div className="flex gap-1 ml-auto pt-1">
                            {/* APLICANDO EL HANDLER DE EDICIÓN */}
                            <button 
                                onClick={() => handleEdit(visit)} 
                                className="p-1.5 text-[#006E6F] hover:bg-[#006E6F]/10 rounded-lg transition-colors" 
                                title="Editar visita"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
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
                        <div className="space-y-1 ml-13"> 
                          
                          {/* Fecha */}
                          <div className="flex items-center gap-1 text-sm text-gray-500">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            <span>
                              {format(new Date(visit.date.replace(/-/g, '/')), "EEEE, d 'de' MMMM", { locale: es })}
                            </span>
                          </div>
                          
                          {/* Horario */}
                          <div className="flex items-center gap-1 text-sm text-gray-600">
                            <Clock className="w-4 h-4 text-gray-400" />
                            <span>
                              {visit.arrivalTime} - {visit.departureTime} hrs
                            </span>
                          </div>
                          
                          {/* Patente (si aplica) */}
                          {visit.type === "vehiculo" && (
                            <div className="text-sm text-gray-500 pl-5">
                              Patente: **{visit.plate}**
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

          {/* Tab: Registrar */}
          <TabsContent value="registro" className="mt-0">
            {/* Lógica de registro existente (dejada para el usuario) */}
          </TabsContent>
        </Tabs>
      </div>

      {/* Bottom Drawer para edición de visita */}
      <BottomDrawer open={isEditDialogOpen} onOpenChange={handleCloseDrawer}>
          <div className="p-4 sm:p-6 pb-16 max-h-[80vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-900">
                      Editar Visita
                  </h2>
                  <button onClick={handleCloseDrawer} className="text-gray-400 hover:text-gray-600">
                      <X className="w-6 h-6" />
                  </button>
              </div>

              {/* Formulario de Edición de Visita (Solo Información de la Visita) */}
              <div className="space-y-6">
                  
                  {/* Nombre de la persona que se edita (solo display) */}
                  {editingVisit && (
                    <div className="text-lg font-semibold text-gray-800 border-b pb-2">
                        {editingVisit.name}
                    </div>
                  )}

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
