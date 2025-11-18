import React, { useState } from "react";
import { ChevronDown, ChevronUp, Plus, Trash2, CheckCircle2, AlertCircle, CreditCard, TrendingUp, Calendar } from "lucide-react";
import { BottomDrawer } from "../ui/BottomDrawer";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { format, differenceInDays, parseISO } from "date-fns";
import { es } from "date-fns/locale";
interface PaymentMethod {
  id: string;
  type: "mastercard" | "visa";
  bank: string;
  lastDigits: string;
}
interface PaymentItem {
  name: string;
  amount: number;
  subcategories?: {
    name: string;
    amount: number;
  }[];
}

interface Payment {
  id: string;
  date: string; // YYYY-MM-DD
  amount: number;
  status: "completed" | "pending" | "failed";
  method: {
    type: "mastercard" | "visa";
    lastDigits: string;
    bank: string;
  };
  reference: string;
  description: string;
  period: string; // Ej: "Octubre 2025"
  items?: {
    name: string;
    amount: number;
  }[];
}
export const PaymentsPage: React.FC = () => {
  const [isCommonExpanded, setIsCommonExpanded] = useState(false);
  const [isHomeExpanded, setIsHomeExpanded] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCVV, setCardCVV] = useState("");
  const [saveCard, setSaveCard] = useState(false);
  const [expandedPaymentId, setExpandedPaymentId] = useState<string | null>(null);
  const [selectedPeriodFilter, setSelectedPeriodFilter] = useState<string>("todos");
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([{
    id: "1",
    type: "mastercard",
    bank: "Banco AB",
    lastDigits: "1234"
  }, {
    id: "2",
    type: "visa",
    bank: "Banco CD",
    lastDigits: "5678"
  }]);

  // Mock data de pagos realizados
  const [payments, setPayments] = useState<Payment[]>([
    {
      id: "PAY001",
      date: "2025-11-15",
      amount: 326000,
      status: "completed",
      method: { type: "visa", lastDigits: "5678", bank: "Banco CD" },
      reference: "TRX-20251115-001",
      description: "Pago de gastos - Octubre 2025",
      period: "Octubre 2025",
      items: [
        { name: "Gastos comunes", amount: 205000 },
        { name: "Gastos del hogar", amount: 71000 },
        { name: "Multa por retraso", amount: 50000 }
      ]
    },
    {
      id: "PAY002",
      date: "2025-10-10",
      amount: 276000,
      status: "completed",
      method: { type: "mastercard", lastDigits: "1234", bank: "Banco AB" },
      reference: "TRX-20251010-002",
      description: "Pago de gastos - Septiembre 2025",
      period: "Septiembre 2025",
      items: [
        { name: "Gastos comunes", amount: 195000 },
        { name: "Gastos del hogar", amount: 81000 }
      ]
    },
    {
      id: "PAY003",
      date: "2025-09-12",
      amount: 267500,
      status: "completed",
      method: { type: "visa", lastDigits: "5678", bank: "Banco CD" },
      reference: "TRX-20250912-003",
      description: "Pago de gastos - Agosto 2025",
      period: "Agosto 2025",
      items: [
        { name: "Gastos comunes", amount: 200000 },
        { name: "Gastos del hogar", amount: 67500 }
      ]
    },
    {
      id: "PAY004",
      date: "2025-08-08",
      amount: 282000,
      status: "completed",
      method: { type: "mastercard", lastDigits: "1234", bank: "Banco AB" },
      reference: "TRX-20250808-004",
      description: "Pago de gastos - Julio 2025",
      period: "Julio 2025",
      items: [
        { name: "Gastos comunes", amount: 205000 },
        { name: "Gastos del hogar", amount: 77000 }
      ]
    },
    {
      id: "PAY005",
      date: "2025-07-15",
      amount: 275000,
      status: "completed",
      method: { type: "visa", lastDigits: "5678", bank: "Banco CD" },
      reference: "TRX-20250715-005",
      description: "Pago de gastos - Junio 2025",
      period: "Junio 2025",
      items: [
        { name: "Gastos comunes", amount: 198000 },
        { name: "Gastos del hogar", amount: 77000 }
      ]
    },
    {
      id: "PAY006",
      date: "2025-06-10",
      amount: 150000,
      status: "failed",
      method: { type: "mastercard", lastDigits: "1234", bank: "Banco AB" },
      reference: "TRX-20250610-006",
      description: "Intento de pago - Mayo 2025",
      period: "Mayo 2025",
      items: []
    }
  ]);
  const totalAmount = 326000;
  const daysLate = 10;
  const commonExpenses: PaymentItem = {
    name: "Gastos comunes (Oct 2025)",
    amount: 205000,
    subcategories: [{
      name: "Amenidades",
      amount: 120000
    }, {
      name: "Mantención y operaciones",
      amount: 30000
    }, {
      name: "Seguridad",
      amount: 40000
    }, {
      name: "Administración",
      amount: 8000
    }, {
      name: "Fondos de reserva",
      amount: 7000
    }]
  };
  const homeExpenses: PaymentItem = {
    name: "Gastos del hogar (Oct 2025)",
    amount: 71000,
    subcategories: [{
      name: "Agua",
      amount: 23500
    }, {
      name: "Electricidad",
      amount: 15700
    }, {
      name: "Gas",
      amount: 8800
    }, {
      name: "Cable & internet",
      amount: 18000
    }, {
      name: "Lavandería",
      amount: 5000
    }]
  };
  const lateFee = 50000;

  // Funciones de utilidad para pagos
  const formatCurrency = (amount: number) => {
    return `$${amount.toLocaleString("es-CL")}`;
  };

  const getRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    date.setHours(0, 0, 0, 0);

    const daysAgo = differenceInDays(today, date);
    if (daysAgo === 0) return "Hoy";
    if (daysAgo === 1) return "Ayer";
    if (daysAgo < 7) return `Hace ${daysAgo} días`;
    if (daysAgo < 30) return `Hace ${Math.floor(daysAgo / 7)} semanas`;
    return `Hace ${Math.floor(daysAgo / 30)} meses`;
  };

  const getPaymentStatusConfig = (status: string) => {
    const configs = {
      completed: {
        label: "Completado",
        color: "bg-emerald-100 text-emerald-700",
        icon: <CheckCircle2 className="w-4 h-4" />
      },
      pending: {
        label: "Pendiente",
        color: "bg-amber-100 text-amber-700",
        icon: <AlertCircle className="w-4 h-4" />
      },
      failed: {
        label: "Rechazado",
        color: "bg-red-100 text-red-700",
        icon: <AlertCircle className="w-4 h-4" />
      }
    };
    return configs[status as keyof typeof configs];
  };

  const groupPaymentsByPeriod = () => {
    const grouped: { [key: string]: Payment[] } = {};
    payments.forEach(payment => {
      if (!grouped[payment.period]) {
        grouped[payment.period] = [];
      }
      grouped[payment.period].push(payment);
    });
    return grouped;
  };

  const getFilteredPayments = () => {
    if (selectedPeriodFilter === "todos") return payments;
    return payments.filter(p => p.period === selectedPeriodFilter);
  };

  const getPaymentStats = () => {
    const completed = payments.filter(p => p.status === "completed");
    const totalAmount = completed.reduce((sum, p) => sum + p.amount, 0);
    return {
      totalCompleted: completed.length,
      totalAmount,
      lastPayment: completed.length > 0 ? completed[0] : null
    };
  };
  const formatCardNumber = (value: string) => {
    const numbers = value.replace(/\s/g, "");
    const formatted = numbers.match(/.{1,4}/g)?.join(" ") || numbers;
    return formatted;
  };
  const formatExpiry = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    if (numbers.length >= 2) {
      return numbers.slice(0, 2) + "/" + numbers.slice(2, 4);
    }
    return numbers;
  };
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\s/g, "");
    if (value.length <= 16 && /^\d*$/.test(value)) {
      setCardNumber(value);
    }
  };
  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 4) {
      setCardExpiry(value);
    }
  };
  const handleCVVChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= 3 && /^\d*$/.test(value)) {
      setCardCVV(value);
    }
  };
  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setTimeout(() => {
      setCardNumber("");
      setCardName("");
      setCardExpiry("");
      setCardCVV("");
      setSaveCard(false);
    }, 300);
  };
  const handleAddCard = () => {
    if (cardNumber.length === 16 && cardName && cardExpiry.length === 4 && cardCVV.length === 3) {
      const newCard: PaymentMethod = {
        id: Date.now().toString(),
        type: cardNumber.startsWith("4") ? "visa" : "mastercard",
        bank: "Banco Nuevo",
        lastDigits: cardNumber.slice(-4)
      };
      setPaymentMethods([...paymentMethods, newCard]);
      handleCloseDrawer();
      alert("¡Tarjeta agregada exitosamente!");
    }
  };
  const handleDeleteCard = (cardId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setPaymentMethods(paymentMethods.filter(method => method.id !== cardId));
    if (selectedMethod === cardId) {
      setSelectedMethod(null);
    }
  };
  const handlePayment = () => {
    if (selectedMethod) {
      alert("¡Pago procesado exitosamente!");
    }
  };
  return <div className="w-full min-h-screen bg-gray-50 flex flex-col items-center p-4">
      <div className="w-full max-w-md">
        <div className="flex items-center mb-4">
          <button className="mr-3">
            
          </button>
          <h1 className="text-xl font-bold">Pagos</h1>
        </div>

        <Tabs defaultValue="pagar" className="w-full">
          <TabsList className="w-full grid grid-cols-2 mb-4 bg-transparent border-b border-gray-200 rounded-none h-auto p-0">
            <TabsTrigger value="pagar" className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#006E6F] data-[state=active]:text-[#006E6F] data-[state=active]:bg-transparent data-[state=active]:shadow-none pb-2">
              Pagar
            </TabsTrigger>
            <TabsTrigger value="historial" className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#006E6F] data-[state=active]:text-[#006E6F] data-[state=active]:bg-transparent data-[state=active]:shadow-none pb-2">
              Historial de Pagos
            </TabsTrigger>
          </TabsList>

          {/* Tab: Pagar */}
          <TabsContent value="pagar" className="mt-0">
            {/* Combined Payment Card */}
            <div className="rounded-xl shadow-sm border border-gray-200 mb-4 overflow-hidden">
              {/* Top Section - White Background */}
              <div className="bg-white p-4 text-center">
                <p className="text-sm text-gray-600 mb-1">Total a pagar</p>
                <p className="text-4xl font-bold text-[#79792B] mb-1">
                  {formatCurrency(totalAmount)}
                </p>
                <p className="text-xs text-red-600 font-medium">
                  Retrasado por {daysLate} días
                </p>
              </div>

              {/* Bottom Section - Expenses Breakdown */}
              <div className="bg-[#79792B] p-4 text-white">
              {/* Common Expenses */}
              <button onClick={() => setIsCommonExpanded(!isCommonExpanded)} className="w-full flex items-center justify-between mb-2">
                <span className="text-sm font-medium">{commonExpenses.name}</span>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{formatCurrency(commonExpenses.amount)}</span>
                  {isCommonExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </button>

              {isCommonExpanded && <div className="ml-4 mb-3 space-y-1.5">
                  {commonExpenses.subcategories?.map((item, idx) => <div key={idx} className="flex justify-between text-sm">
                      <span className="text-white/90">{item.name}</span>
                      <span className="text-white">{formatCurrency(item.amount)}</span>
                    </div>)}
                </div>}

              {/* Home Expenses */}
              <button onClick={() => setIsHomeExpanded(!isHomeExpanded)} className="w-full flex items-center justify-between mb-2">
                <span className="text-sm font-medium">{homeExpenses.name}</span>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{formatCurrency(homeExpenses.amount)}</span>
                  {isHomeExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </button>

              {isHomeExpanded && <div className="ml-4 mb-3 space-y-1.5">
                  {homeExpenses.subcategories?.map((item, idx) => <div key={idx} className="flex justify-between text-sm">
                      <span className="text-white/90">{item.name}</span>
                      <span className="text-white">{formatCurrency(item.amount)}</span>
                    </div>)}
                </div>}

              {/* Late Fee */}
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Multa por retraso de pago</span>
                <span className="font-semibold">{formatCurrency(lateFee)}</span>
              </div>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="mb-4">
              <p className="text-sm font-semibold text-gray-700 mb-3">Método de pago</p>
              
              <div className="space-y-2">
                {paymentMethods.map(method => <button key={method.id} onClick={() => setSelectedMethod(method.id)} className={`w-full flex items-center justify-between gap-3 p-3 rounded-lg border-2 transition-all ${selectedMethod === method.id ? "border-[#006E6F] bg-[#006E6F]/5" : "border-gray-200 bg-white"}`}>
                    <div className="flex items-center gap-3">
                      {method.type === "mastercard" ? <img src="/mastercard.png" alt="Mastercard" className="w-10 h-7 object-contain" /> : <img src="/visa.png" alt="Visa" className="w-10 h-7 object-contain" />}
                      <span className="text-sm font-medium text-gray-800">
                        {method.bank} *****{method.lastDigits}
                      </span>
                    </div>
                    <button onClick={e => handleDeleteCard(method.id, e)} className="p-2 hover:bg-[#006E6F]/10 rounded-lg transition-all" aria-label="Eliminar tarjeta">
                      <Trash2 className="w-4 h-4" style={{
                    color: '#006E6F'
                  }} />
                    </button>
                  </button>)}

                <button onClick={() => setIsDrawerOpen(true)} className="w-full flex items-center justify-center gap-2 p-3 rounded-lg border-2 border-dashed border-gray-300 bg-white hover:border-[#006E6F] hover:bg-[#006E6F]/5 transition-all">
                  <Plus className="w-5 h-5 text-[#006E6F]" />
                  <span className="text-sm font-medium text-[#006E6F]">Nueva tarjeta</span>
                </button>
              </div>
            </div>

            {/* Pay Button */}
            <button onClick={handlePayment} disabled={!selectedMethod} className={`w-full py-3.5 rounded-xl font-bold text-base text-white transition-all ${selectedMethod ? "bg-[#006E6F] hover:bg-[#005a5b]" : "bg-gray-300 cursor-not-allowed"} mb-20`}>
              Pagar
            </button>
          </TabsContent>

          {/* Tab: Historial */}
          <TabsContent value="historial" className="mt-0">
            {payments.length === 0 ? (
              <div className="text-center py-16 px-4">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                  <CreditCard className="w-8 h-8" style={{ color: '#79792B' }} />
                </div>
                <h3 className="text-gray-800 font-semibold mb-1 text-base">
                  No hay pagos registrados
                </h3>
                <p className="text-gray-500 text-sm">
                  Tus transacciones aparecerán aquí
                </p>
              </div>
            ) : (
              <div className="space-y-4 pb-20">
                {/* Resumen estadístico */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 rounded-xl p-4 border border-emerald-200">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="w-4 h-4 text-emerald-600" />
                      <span className="text-xs font-semibold text-emerald-700 uppercase tracking-wide">Total pagado</span>
                    </div>
                    <p className="text-lg font-bold text-emerald-800">
                      {formatCurrency(getPaymentStats().totalAmount)}
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl p-4 border border-blue-200">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle2 className="w-4 h-4 text-blue-600" />
                      <span className="text-xs font-semibold text-blue-700 uppercase tracking-wide">Transacciones</span>
                    </div>
                    <p className="text-lg font-bold text-blue-800">
                      {getPaymentStats().totalCompleted}
                    </p>
                  </div>
                </div>

                {/* Filtro de períodos */}
                {Object.keys(groupPaymentsByPeriod()).length > 1 && (
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    <button
                      onClick={() => setSelectedPeriodFilter("todos")}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                        selectedPeriodFilter === "todos"
                          ? "bg-[#006E6F] text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      Todos
                    </button>
                    {Object.keys(groupPaymentsByPeriod()).map(period => (
                      <button
                        key={period}
                        onClick={() => setSelectedPeriodFilter(period)}
                        className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                          selectedPeriodFilter === period
                            ? "bg-[#006E6F] text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {period}
                      </button>
                    ))}
                  </div>
                )}

                {/* Historial de pagos agrupado */}
                <div className="space-y-3">
                  {getFilteredPayments().length === 0 ? (
                    <div className="text-center py-8 text-gray-500 text-sm">
                      No hay pagos en este período
                    </div>
                  ) : (
                    getFilteredPayments().map((payment, idx) => {
                      const statusConfig = getPaymentStatusConfig(payment.status);
                      const isExpanded = expandedPaymentId === payment.id;
                      const borderColor = payment.status === "completed" ? "border-emerald-100" : payment.status === "failed" ? "border-red-100" : "border-amber-100";
                      const bgColor = payment.status === "completed" ? "hover:bg-emerald-50" : payment.status === "failed" ? "hover:bg-red-50" : "hover:bg-amber-50";

                      return (
                        <div key={payment.id}>
                          <button
                            onClick={() => setExpandedPaymentId(isExpanded ? null : payment.id)}
                            className={`w-full border rounded-xl p-4 transition-all duration-200 text-left ${borderColor} ${bgColor}`}
                          >
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex items-start gap-3 flex-1">
                                <div className={`mt-0.5 rounded-lg p-2.5 ${statusConfig.color}`}>
                                  <CreditCard className="w-5 h-5" />
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-1">
                                    <h4 className="font-bold text-gray-800 text-sm">
                                      {payment.description}
                                    </h4>
                                    <span className={`px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${statusConfig.color}`}>
                                      {statusConfig.icon}
                                      {statusConfig.label}
                                    </span>
                                  </div>
                                  <p className="text-xs text-gray-500 flex items-center gap-2">
                                    <Calendar className="w-3 h-3" />
                                    {format(parseISO(payment.date), "dd 'de' MMMM 'de' yyyy", { locale: es })}
                                    <span className="text-emerald-600 font-semibold">•</span>
                                    <span className="text-emerald-600">{getRelativeTime(payment.date)}</span>
                                  </p>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="font-bold text-gray-800">
                                  {formatCurrency(payment.amount)}
                                </p>
                                {isExpanded ? (
                                  <ChevronUp className="w-4 h-4 text-gray-600 ml-auto mt-1" />
                                ) : (
                                  <ChevronDown className="w-4 h-4 text-gray-600 ml-auto mt-1" />
                                )}
                              </div>
                            </div>

                            <div className="flex items-center justify-between text-xs">
                              <div className="flex items-center gap-2">
                                <img
                                  src={payment.method.type === "visa" ? "/visa.png" : "/mastercard.png"}
                                  alt={payment.method.type}
                                  className="w-6 h-4 object-contain"
                                />
                                <span className="text-gray-600">
                                  {payment.method.bank} •••• {payment.method.lastDigits}
                                </span>
                              </div>
                              <span className="text-gray-500 font-mono">
                                {payment.reference}
                              </span>
                            </div>
                          </button>

                          {/* Detalles expandibles */}
                          {isExpanded && payment.items && payment.items.length > 0 && (
                            <div className="bg-gray-50 rounded-b-xl border border-t-0 border-gray-200 p-4 space-y-2">
                              <p className="text-xs font-bold text-gray-600 uppercase tracking-wide mb-3">
                                Desglose de pago
                              </p>
                              {payment.items.map((item, itemIdx) => (
                                <div key={itemIdx} className="flex items-center justify-between text-sm">
                                  <span className="text-gray-700">{item.name}</span>
                                  <span className="font-semibold text-gray-800">
                                    {formatCurrency(item.amount)}
                                  </span>
                                </div>
                              ))}
                              <div className="border-t border-gray-300 pt-2 mt-2 flex items-center justify-between text-sm font-bold">
                                <span className="text-gray-700">Total</span>
                                <span className="text-emerald-600">
                                  {formatCurrency(payment.amount)}
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Bottom Drawer for Adding Card */}
      <BottomDrawer isOpen={isDrawerOpen} onClose={handleCloseDrawer}>
        <div className="w-full">
          <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4">
            Agregar tarjeta
          </h2>

          {/* Card Preview */}
          <div className="bg-gradient-to-br from-[#79792B] to-[#006E6F] rounded-xl p-6 mb-6 text-white shadow-lg">
            <div className="mb-8">
              <p className="text-xs uppercase tracking-wider opacity-80 mb-1">DÉBITO</p>
              <div className="flex gap-2 text-lg tracking-wider">
                {[0, 1, 2, 3].map(group => <span key={group}>
                    {cardNumber.slice(group * 4, (group + 1) * 4).padEnd(4, "*")}
                  </span>)}
              </div>
            </div>

            <div className="flex justify-between items-end">
              <div>
                <p className="text-xs uppercase opacity-80 mb-1">Nombre y apellido</p>
                <p className="font-semibold">
                  {cardName || "NOMBRE APELLIDO"}
                </p>
              </div>
              <div className="text-center">
                <p className="text-xs uppercase opacity-80 mb-1">Vence</p>
                <p className="font-semibold">{formatExpiry(cardExpiry) || "MM/AA"}</p>
              </div>
              <div className="text-right">
                <p className="text-xs uppercase opacity-80 mb-1">CVV</p>
                <p className="font-semibold">{cardCVV || "XXX"}</p>
              </div>
            </div>

            <div className="mt-4 flex justify-end">
              <div className="bg-white/20 px-3 py-1 rounded text-sm font-bold">
                VISA
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Número de tarjeta*
              </label>
              <input type="text" value={formatCardNumber(cardNumber)} onChange={handleCardNumberChange} placeholder="XXXX XXXX XXXX XXXX" className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-[#006E6F] focus:border-transparent" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nombre del titular*
              </label>
              <input type="text" value={cardName} onChange={e => setCardName(e.target.value.toUpperCase())} placeholder="NOMBRE APELLIDO" className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-[#006E6F] focus:border-transparent" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Vencimiento*
                </label>
                <input type="text" value={formatExpiry(cardExpiry)} onChange={handleExpiryChange} placeholder="MM/AA" className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-[#006E6F] focus:border-transparent" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  CVV*
                </label>
                <input type="text" value={cardCVV} onChange={handleCVVChange} placeholder="XXX" className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-[#006E6F] focus:border-transparent" />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input type="checkbox" id="saveCard" checked={saveCard} onChange={e => setSaveCard(e.target.checked)} className="w-4 h-4 text-[#006E6F] border-gray-300 rounded focus:ring-[#006E6F]" />
              <label htmlFor="saveCard" className="text-sm text-gray-700">
                Guardar tarjeta para futuros pagos
              </label>
            </div>

            <button onClick={handleAddCard} disabled={cardNumber.length !== 16 || !cardName || cardExpiry.length !== 4 || cardCVV.length !== 3} className={`w-full py-3.5 rounded-xl font-bold text-base text-white transition-all ${cardNumber.length === 16 && cardName && cardExpiry.length === 4 && cardCVV.length === 3 ? "bg-[#006E6F] hover:bg-[#005a5b]" : "bg-gray-300 cursor-not-allowed"}`}>
              Agregar tarjeta
            </button>
          </div>
        </div>
      </BottomDrawer>
    </div>;
};
