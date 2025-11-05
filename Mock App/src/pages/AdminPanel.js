import React, { useState } from 'react';
import './AdminPanel.css';

function AdminPanel() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [comunicados, setComunicados] = useState([
    {
      id: '1',
      titulo: 'Cierre temporal piscina',
      tipo: 'Mantenimiento',
      prioridad: 'Urgente',
      fecha: '2024-11-05',
    },
    {
      id: '2',
      titulo: 'Nuevas medidas de seguridad',
      tipo: 'General',
      prioridad: 'Normal',
      fecha: '2024-11-05',
    },
  ]);

  const [formData, setFormData] = useState({
    titulo: '',
    tipo: 'General',
    prioridad: 'Normal',
    mensaje: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmitComunicado = (e) => {
    e.preventDefault();
    if (!formData.titulo || !formData.mensaje) {
      alert('Por favor completa todos los campos');
      return;
    }

    const newComunicado = {
      id: Date.now().toString(),
      titulo: formData.titulo,
      tipo: formData.tipo,
      prioridad: formData.prioridad,
      fecha: new Date().toISOString().split('T')[0],
    };

    setComunicados([newComunicado, ...comunicados]);
    setFormData({ titulo: '', tipo: 'General', prioridad: 'Normal', mensaje: '' });
    alert('¡Comunicado enviado exitosamente!');
  };

  const handleDeleteComunicado = (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este comunicado?')) {
      setComunicados(comunicados.filter((c) => c.id !== id));
      alert('Comunicado eliminado');
    }
  };

  const totalResidentes = 125;
  const pagosRecaudados = 15825000;
  const pagosPendientes = 2125000;

  return (
    <div className="admin-panel">
      {/* Header */}
      <div className="admin-header">
        <div className="admin-welcome">
          <h1>Panel Administrativo</h1>
          <p>Edificio Residencial Las Torres</p>
        </div>
        <div className="admin-stats">
          <div className="stat">
            <span className="stat-amount">$15.8M</span>
            <span className="stat-label">Recaudado</span>
          </div>
          <div className="stat">
            <span className="stat-amount">$2.1M</span>
            <span className="stat-label">Pendiente</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="admin-tabs">
        <button
          className={`tab-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
          onClick={() => setActiveTab('dashboard')}
        >
          Dashboard
        </button>
        <button
          className={`tab-btn ${activeTab === 'comunicados' ? 'active' : ''}`}
          onClick={() => setActiveTab('comunicados')}
        >
          Comunicados
        </button>
        <button
          className={`tab-btn ${activeTab === 'cuentas' ? 'active' : ''}`}
          onClick={() => setActiveTab('cuentas')}
        >
          Cuentas
        </button>
      </div>

      <div className="admin-content">
        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="dashboard-section">
            <h2>Resumen General</h2>

            <div className="metrics-grid">
              <div className="metric-card">
                <h3>Residentes</h3>
                <p className="metric-value">{totalResidentes}</p>
                <span className="metric-subtitle">Activos</span>
              </div>
              <div className="metric-card">
                <h3>Pagos Este Mes</h3>
                <p className="metric-value">${(pagosRecaudados / 1000000).toFixed(1)}M</p>
                <span className="metric-subtitle">Recaudado</span>
              </div>
              <div className="metric-card">
                <h3>Pendiente</h3>
                <p className="metric-value">${(pagosPendientes / 1000000).toFixed(1)}M</p>
                <span className="metric-subtitle">Por cobrar</span>
              </div>
            </div>

            <div className="recent-activity">
              <h3>Actividad Reciente</h3>
              <ul>
                <li>✓ 45 pagos procesados hoy</li>
                <li>⚠️ 8 residentes con pagos vencidos</li>
                <li>📢 3 comunicados enviados</li>
                <li>✓ 12 nuevas reservas de espacios</li>
              </ul>
            </div>
          </div>
        )}

        {/* Comunicados Tab */}
        {activeTab === 'comunicados' && (
          <div className="comunicados-section">
            <h2>Gestionar Comunicados</h2>

            {/* Form */}
            <form onSubmit={handleSubmitComunicado} className="comunicado-form">
              <div className="form-group">
                <label>Título</label>
                <input
                  type="text"
                  name="titulo"
                  placeholder="Título del comunicado"
                  value={formData.titulo}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Tipo</label>
                  <select name="tipo" value={formData.tipo} onChange={handleInputChange}>
                    <option>General</option>
                    <option>Urgente</option>
                    <option>Mantenimiento</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Prioridad</label>
                  <select name="prioridad" value={formData.prioridad} onChange={handleInputChange}>
                    <option>Normal</option>
                    <option>Urgente</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Mensaje</label>
                <textarea
                  name="mensaje"
                  placeholder="Contenido del comunicado..."
                  value={formData.mensaje}
                  onChange={handleInputChange}
                  rows="6"
                  required
                ></textarea>
              </div>

              <button type="submit" className="btn-send">
                🔔 Enviar Comunicado
              </button>
            </form>

            {/* Comunicados List */}
            <div className="comunicados-list">
              <h3>Comunicados Recientes</h3>
              {comunicados.map((comunicado) => (
                <div key={comunicado.id} className="comunicado-item">
                  <div className="com-header">
                    <h4>{comunicado.titulo}</h4>
                    <div className="com-badges">
                      <span className="badge">{comunicado.tipo}</span>
                      <span className={`badge priority-${comunicado.prioridad.toLowerCase()}`}>
                        {comunicado.prioridad}
                      </span>
                    </div>
                  </div>
                  <p className="com-date">{comunicado.fecha}</p>
                  <button
                    className="btn-delete"
                    onClick={() => handleDeleteComunicado(comunicado.id)}
                  >
                    Eliminar
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Cuentas Tab */}
        {activeTab === 'cuentas' && (
          <div className="cuentas-section">
            <h2>Rendición de Cuentas</h2>
            <p className="subtitle">Informes financieros y estado de pagos</p>

            <div className="cuentas-grid">
              <div className="cuenta-card">
                <h3>Ingresos Totales</h3>
                <p className="amount">${(pagosRecaudados / 1000000).toFixed(1)}M</p>
                <p className="description">Recaudado este periodo</p>
              </div>
              <div className="cuenta-card">
                <h3>Gastos Operativos</h3>
                <p className="amount">$3.2M</p>
                <p className="description">Mantenimiento y servicios</p>
              </div>
              <div className="cuenta-card">
                <h3>Balance Neto</h3>
                <p className="amount">$12.6M</p>
                <p className="description">Fondo disponible</p>
              </div>
            </div>

            <div className="action-buttons">
              <button className="btn-report">📊 Generar Reporte Mensual</button>
              <button className="btn-download">⬇️ Descargar Estado Financiero</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminPanel;
