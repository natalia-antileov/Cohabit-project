import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import './PaymentMethodPage.css';

function PaymentMethodPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const paymentId = searchParams.get('id');
  const amount = searchParams.get('amount') || 125000;
  const month = searchParams.get('month') || 'Noviembre 2024';

  const paymentMethods = [
    {
      id: 'credit-card',
      name: 'Tarjeta de Crédito',
      description: 'Visa, Mastercard, American Express',
      icon: '💳',
    },
    {
      id: 'debit-card',
      name: 'Tarjeta de Débito',
      description: 'Débito directo desde tu cuenta',
      icon: '🏧',
    },
    {
      id: 'bank-transfer',
      name: 'Transferencia Bancaria',
      description: 'Transporte directo entre cuentas',
      icon: '🏦',
    },
    {
      id: 'wallet',
      name: 'Billetera Digital',
      description: 'PayPal, Apple Pay, Google Pay',
      icon: '📱',
    },
  ];

  const handleSelectMethod = (methodId) => {
    setSelectedMethod(methodId);
  };

  const handleConfirmPayment = () => {
    if (!selectedMethod) {
      alert('Por favor selecciona un método de pago');
      return;
    }

    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      // Store payment confirmation in localStorage
      if (paymentId) {
        localStorage.setItem('paymentCompleted', JSON.stringify({
          paymentId: paymentId,
          timestamp: new Date().toISOString(),
        }));
      }
      alert('¡Pago procesado exitosamente!');
      navigate('/pagos');
    }, 2000);
  };

  const handleBack = () => {
    navigate('/pagos');
  };

  return (
    <div className="payment-method-page">
      <div className="payment-header">
        <button className="back-btn" onClick={handleBack}>
          ← Atrás
        </button>
        <h1>Métodos de Pago</h1>
      </div>

      <div className="payment-content">
        <div className="payment-info">
          <h2>Selecciona tu método de pago</h2>
          <p className="amount-display">Monto a pagar: <span className="amount">${parseInt(amount).toLocaleString('es-CL')}</span></p>
          <p className="month-display">Mes: {month}</p>
        </div>

        <div className="methods-grid">
          {paymentMethods.map((method) => (
            <div
              key={method.id}
              className={`method-card ${selectedMethod === method.id ? 'selected' : ''}`}
              onClick={() => handleSelectMethod(method.id)}
            >
              <div className="method-icon">{method.icon}</div>
              <h3>{method.name}</h3>
              <p>{method.description}</p>
              <div className="method-radio">
                <input
                  type="radio"
                  name="payment-method"
                  value={method.id}
                  checked={selectedMethod === method.id}
                  onChange={() => handleSelectMethod(method.id)}
                />
              </div>
            </div>
          ))}
        </div>

        {selectedMethod && (
          <div className="payment-details">
            <h3>Detalles del Pago</h3>
            <div className="detail-row">
              <span className="detail-label">Concepto:</span>
              <span className="detail-value">Cuota Condominio - {month}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Monto:</span>
              <span className="detail-value">${parseInt(amount).toLocaleString('es-CL')}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Método:</span>
              <span className="detail-value">
                {paymentMethods.find(m => m.id === selectedMethod)?.name}
              </span>
            </div>
          </div>
        )}

        <div className="payment-actions">
          <button
            className="btn-cancel"
            onClick={handleBack}
            disabled={isProcessing}
          >
            Cancelar
          </button>
          <button
            className="btn-confirm"
            onClick={handleConfirmPayment}
            disabled={isProcessing || !selectedMethod}
          >
            {isProcessing ? 'Procesando...' : 'Confirmar Pago'}
          </button>
        </div>

        <div className="security-info">
          <p>🔒 Tu información de pago está protegida con encriptación SSL</p>
        </div>
      </div>
    </div>
  );
}

export default PaymentMethodPage;
