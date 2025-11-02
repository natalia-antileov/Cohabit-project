import React, { useState } from 'react';
import { DollarSign, ChevronDown, ChevronUp } from 'lucide-react';

export const PaymentsPage: React.FC = () => {
  const [selectedPaymentItems, setSelectedPaymentItems] = useState<string[]>(['gastos_comunes']);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('');
  const [installments, setInstallments] = useState<number>(1);
  const [expandedPaymentItem, setExpandedPaymentItem] = useState<string | null>(null);

  const paymentData = {
    pending: 125000,
    dueDate: '15 Oct 2024',
    status: 'pending'
  };

  const paymentMethods = [
    { id: 'tarjeta_1', name: 'Tarjeta **** 1234', type: 'Visa' },
    { id: 'tarjeta_2', name: 'Tarjeta **** 5678', type: 'Mastercard' },
  ];

  const paymentItems = [
    { 
      id: 'gastos_comunes', 
      name: 'Gastos Comunes', 
      amount: 95000,
      breakdown: [
        { name: 'Administración', amount: 35000 },
        { name: 'Mantención general', amount: 25000 },
        { name: 'Servicios básicos', amount: 20000 },
        { name: 'Seguridad', amount: 15000 }
      ]
    },
    { id: 'fondo_reserva', name: 'Fondo de Reserva', amount: 20000 },
    { id: 'multa', name: 'Multa por Atraso', amount: 10000 },
  ];

  const handlePayment = () => {
    const selectedItems = paymentItems.filter(item => selectedPaymentItems.includes(item.id));
    const total = selectedItems.reduce((sum, item) => sum + item.amount, 0);
    const totalWithInstallments = installments > 1 ? total / installments : total;
    
    alert(`Pago de $${totalWithInstallments.toLocaleString()} procesado exitosamente${installments > 1 ? ` (Cuota 1 de ${installments})` : ''}`);
  };

  const totalSelected = paymentItems
    .filter(item => selectedPaymentItems.includes(item.id))
    .reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="min-h-screen bg-gray-50 p-4 pb-24">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header Card */}
        <div className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold">Pagos</h3>
              <p className="opacity-90">Octubre 2024</p>
            </div>
            <DollarSign className="h-8 w-8 opacity-80" />
          </div>
          <div className="text-3xl font-bold mb-2">${paymentData.pending.toLocaleString()}</div>
          <p className="text-sm opacity-90">Vence el {paymentData.dueDate}</p>
        </div>

        {/* Payment Items */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold">Desglose de Pagos</h3>
            <button 
              className="text-sm text-teal-600 hover:text-teal-700 font-medium"
              onClick={() => {
                if (selectedPaymentItems.length === paymentItems.length) {
                  setSelectedPaymentItems([]);
                } else {
                  setSelectedPaymentItems(paymentItems.map(item => item.id));
                }
              }}
            >
              {selectedPaymentItems.length === paymentItems.length ? 'Deseleccionar Todo' : 'Seleccionar Todo'}
            </button>
          </div>
          
          <div className="space-y-4">
            {paymentItems.map((item) => (
              <div key={item.id} className="border border-gray-200 rounded-lg">
                <div className="flex items-center justify-between p-4">
                  <div className="flex items-center space-x-3 flex-1">
                    <input
                      type="checkbox"
                      checked={selectedPaymentItems.includes(item.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedPaymentItems([...selectedPaymentItems, item.id]);
                        } else {
                          setSelectedPaymentItems(selectedPaymentItems.filter(id => id !== item.id));
                        }
                      }}
                      className="w-4 h-4 text-teal-600 rounded"
                    />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">{item.name}</span>
                        {item.breakdown && (
                          <button
                            onClick={() => setExpandedPaymentItem(expandedPaymentItem === item.id ? null : item.id)}
                            className="p-1 hover:bg-gray-100 rounded"
                          >
                            {expandedPaymentItem === item.id ? (
                              <ChevronUp className="h-4 w-4" />
                            ) : (
                              <ChevronDown className="h-4 w-4" />
                            )}
                          </button>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        {item.id === 'gastos_comunes' && 'Mantención, servicios básicos, administración'}
                        {item.id === 'fondo_reserva' && 'Fondo para reparaciones mayores'}
                        {item.id === 'multa' && 'Por retraso en pago anterior'}
                      </p>
                    </div>
                  </div>
                  <span className="font-bold ml-4">${item.amount.toLocaleString()}</span>
                </div>
                
                {item.breakdown && expandedPaymentItem === item.id && (
                  <div className="px-4 pb-4">
                    <div className="bg-gray-50 rounded-lg p-3 space-y-2">
                      <p className="text-sm font-medium text-gray-600">Desglose:</p>
                      {item.breakdown.map((subItem, index) => (
                        <div key={index} className="flex justify-between items-center text-sm">
                          <span>{subItem.name}</span>
                          <span className="font-medium">${subItem.amount.toLocaleString()}</span>
                        </div>
                      ))}
                      <hr className="my-2" />
                      <div className="flex justify-between items-center text-sm font-bold">
                        <span>Total</span>
                        <span>${item.amount.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
            
            <div className="border-t-2 pt-4">
              <div className="flex justify-between font-bold text-lg">
                <span>Total Seleccionado</span>
                <span>${totalSelected.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Method */}
        <div className="bg-white rounded-xl shadow-md p-6 space-y-4">
          <h3 className="text-lg font-bold">Método de Pago</h3>
          
          <div>
            <label className="block text-sm font-medium mb-2">Tarjetas guardadas</label>
            <select 
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              value={selectedPaymentMethod}
              onChange={(e) => setSelectedPaymentMethod(e.target.value)}
            >
              <option value="">Seleccionar tarjeta...</option>
              {paymentMethods.map((method) => (
                <option key={method.id} value={method.id}>
                  {method.name} ({method.type})
                </option>
              ))}
              <option value="new">Agregar nueva tarjeta</option>
            </select>
          </div>

          {selectedPaymentMethod === 'new' && (
            <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Número de tarjeta</label>
                  <input className="w-full p-2 border border-gray-300 rounded-lg" placeholder="1234 5678 9012 3456" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Nombre del titular</label>
                  <input className="w-full p-2 border border-gray-300 rounded-lg" placeholder="Roberto González" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Vencimiento</label>
                  <input className="w-full p-2 border border-gray-300 rounded-lg" placeholder="MM/AA" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">CVV</label>
                  <input className="w-full p-2 border border-gray-300 rounded-lg" placeholder="123" />
                </div>
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-2">Cuotas</label>
            <select 
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              value={installments}
              onChange={(e) => setInstallments(parseInt(e.target.value))}
            >
              <option value={1}>1 cuota (sin interés)</option>
              <option value={3}>3 cuotas (sin interés)</option>
              <option value={6}>6 cuotas (+2% interés)</option>
              <option value={12}>12 cuotas (+5% interés)</option>
            </select>
          </div>
        </div>

        {/* Pay Button */}
        <button 
          className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          onClick={handlePayment}
          disabled={selectedPaymentItems.length === 0 || !selectedPaymentMethod}
        >
          Pagar ${installments > 1 ? 
            Math.round(totalSelected / installments).toLocaleString() 
            : totalSelected.toLocaleString()}
          {installments > 1 && ` (Cuota 1 de ${installments})`}
        </button>
      </div>
    </div>
  );
};
