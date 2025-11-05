import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PagosPage.css';

function PagosPage() {
  const navigate = useNavigate();

  const initialPayments = [
    {
      id: '1',
      month: 'Octubre 2024',
      amount: 125000,
      dueDate: '01 de Noviembre',
      status: 'pagado',
      paymentDate: '30 de Octubre 2024',
    },
    {
      id: '2',
      month: 'Noviembre 2024',
      amount: 125000,
      dueDate: '01 de Diciembre',
      status: 'pendiente',
      paymentDate: null,
    },
    {
      id: '3',
      month: 'Diciembre 2024',
      amount: 125000,
      dueDate: '01 de Enero',
      status: 'pendiente',
      paymentDate: null,
    },
    {
      id: '4',
      month: 'Enero 2025',
      amount: 125000,
      dueDate: '01 de Febrero',
      status: 'pendiente',
      paymentDate: null,
    },
  ];

  // Check if payment was completed in localStorage and apply it
  const [payments, setPayments] = useState(() => {
    const paymentData = localStorage.getItem('paymentCompleted');
    if (paymentData) {
      const { paymentId } = JSON.parse(paymentData);
      const updated = initialPayments.map((p) =>
        p.id === paymentId
          ? {
              ...p,
              status: 'pagado',
              paymentDate: new Date().toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              }),
            }
          : p
      );
      localStorage.removeItem('paymentCompleted');
      return updated;
    }
    return initialPayments;
  });

  const handlePaymentSuccess = (paymentId) => {
    setPayments(payments.map((payment) =>
      payment.id === paymentId
        ? {
            ...payment,
            status: 'pagado',
            paymentDate: new Date().toLocaleDateString('es-ES', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            }),
          }
        : payment
    ));
  };

  const paidAmount = payments
    .filter((p) => p.status === 'pagado')
    .reduce((sum, p) => sum + p.amount, 0);

  const pendingAmount = payments
    .filter((p) => p.status === 'pendiente')
    .reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="pagos-page">
      {/* Summary Cards */}
      <div className="summary-section">
        <div className="summary-card paid">
          <h3 className="summary-title">Pagado</h3>
          <p className="summary-amount">${paidAmount.toLocaleString('es-CL')}</p>
          <p className="summary-subtitle">
            {payments.filter((p) => p.status === 'pagado').length} mes(es)
          </p>
        </div>
        <div className="summary-card pending">
          <h3 className="summary-title">Pendiente</h3>
          <p className="summary-amount">${pendingAmount.toLocaleString('es-CL')}</p>
          <p className="summary-subtitle">
            {payments.filter((p) => p.status === 'pendiente').length} mes(es)
          </p>
        </div>
      </div>

      {/* Payments List */}
      <div className="payments-section">
        <h2 className="section-title">Historial de pagos</h2>
        <div className="payments-list">
          {payments.map((payment) => (
            <div
              key={payment.id}
              className={`payment-card ${payment.status}`}
            >
              <div className="payment-header">
                <div>
                  <h3 className="payment-month">{payment.month}</h3>
                  <p className="payment-duedate">
                    Vencimiento: {payment.dueDate}
                  </p>
                </div>
                <div className="payment-status">
                  <span className={`status-badge ${payment.status}`}>
                    {payment.status === 'pagado' ? '✓ Pagado' : 'Pendiente'}
                  </span>
                </div>
              </div>

              <div className="payment-details">
                <p className="payment-amount">${payment.amount.toLocaleString('es-CL')}</p>
                {payment.paymentDate && (
                  <p className="payment-date">
                    Pagado el: {payment.paymentDate}
                  </p>
                )}
              </div>

              {payment.status === 'pendiente' && (
                <button
                  className="btn-pagar"
                  onClick={() => navigate(`/payment-method?id=${payment.id}&amount=${payment.amount}&month=${payment.month}`)}
                >
                  Pagar ahora
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PagosPage;
