import React, { useState } from 'react';
import './RendicionPage.css';

function RendicionPage() {
  const [selectedMonth, setSelectedMonth] = useState('Octubre');

  const reports = [
    {
      name: 'Roberto Silva',
      email: 'roberto.silva@email.com',
      amount: '$125,000',
      status: 'Pagado',
      statusColor: 'paid',
    },
    {
      name: 'María González',
      email: 'maria.gonzalez@email.com',
      amount: '$125,000',
      status: 'Pendiente',
      statusColor: 'pending',
    },
    {
      name: 'Carlos Pérez',
      email: 'carlos.perez@email.com',
      amount: '$125,000',
      status: 'Pagado',
      statusColor: 'paid',
    },
    {
      name: 'Ana Morales',
      email: 'ana.morales@email.com',
      amount: '$125,000',
      status: 'Vencido',
      statusColor: 'overdue',
    },
  ];

  const months = ['Octubre', 'Noviembre', 'Diciembre', 'Enero'];

  const stats = {
    paid: 3,
    pending: 2,
    overdue: 1,
  };

  return (
    <div className="rendicion-page">
      <div className="rendicion-content">
        {/* Header */}
        <div className="rendicion-header">
          <h1>Rendición de Cuentas</h1>
          <p className="subtitle">Informes financieros mensuales</p>
        </div>

        {/* Month Selector */}
        <div className="month-selector">
          <label>Seleccionar Mes:</label>
          <select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
            {months.map((month) => (
              <option key={month} value={month}>
                {month} 2024
              </option>
            ))}
          </select>
        </div>

        {/* Statistics Summary */}
        <div className="stats-section">
          <h2>Estado de Pagos por Departamento</h2>

          <div className="stats-grid">
            <div className="stat-card paid">
              <p className="stat-number">{stats.paid}</p>
              <p className="stat-label">Pagados</p>
            </div>
            <div className="stat-card pending">
              <p className="stat-number">{stats.pending}</p>
              <p className="stat-label">Pendientes</p>
            </div>
            <div className="stat-card overdue">
              <p className="stat-number">{stats.overdue}</p>
              <p className="stat-label">Vencidos</p>
            </div>
          </div>
        </div>

        {/* Residents Payment Status */}
        <div className="residents-section">
          <h2>Estado de Pagos por Departamento</h2>

          <div className="residents-list">
            {reports.map((report, index) => (
              <div key={index} className="resident-item">
                <div className="resident-avatar">
                  <span>{report.name.substring(0, 2).toUpperCase()}</span>
                </div>

                <div className="resident-info">
                  <h3>{report.name}</h3>
                  <p className="resident-email">{report.email}</p>
                </div>

                <div className="resident-payment">
                  <p className="resident-amount">{report.amount}</p>
                  <span className={`status-badge ${report.statusColor}`}>
                    {report.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="action-buttons">
          <button className="btn-report">📊 Generar Reporte Completo</button>
          <button className="btn-download">⬇️ Descargar PDF</button>
        </div>
      </div>
    </div>
  );
}

export default RendicionPage;
