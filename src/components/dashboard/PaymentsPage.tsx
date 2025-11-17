import React, { useState } from "react";
import { ChevronDown, ChevronUp, Plus, Trash2 } from "lucide-react";
import { BottomDrawer } from "../ui/BottomDrawer";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
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
  const formatCurrency = (amount: number) => {
    return `$${amount.toLocaleString("es-CL")}`;
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
            <div className="text-center py-12">
              <div className="text-gray-400 mb-2">📋</div>
              <p className="text-gray-500 text-sm">No hay pagos registrados</p>
            </div>
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
