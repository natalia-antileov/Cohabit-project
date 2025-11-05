import React, { useState } from 'react';
import VisitForm from '../components/VisitForm';
import VisitsList from '../components/VisitsList';
import './VisitasPage.css';

function VisitasPage({ visits, onAddVisit, onUpdateVisit, onDeleteVisit }) {
  const [activeTab, setActiveTab] = useState('registrar');
  const [editingVisit, setEditingVisit] = useState(null);
  const [showAlertBox, setShowAlertBox] = useState(true);

  const handleSubmit = (formData) => {
    if (editingVisit) {
      const updated = {
        ...editingVisit,
        ...formData,
        nombre: `${formData.nombre} ${formData.apellido}`,
        fechaFormato: new Date(formData.fecha).toLocaleDateString('es-ES', {
          weekday: 'short',
          day: '2-digit',
          month: 'long',
        }),
      };
      onUpdateVisit(editingVisit.id, updated);
      setEditingVisit(null);
      alert('Visita actualizada correctamente');
    } else {
      const newVisit = {
        nombre: `${formData.nombre} ${formData.apellido}`,
        horaEntrada: formData.horaEntrada,
        horaSalida: formData.horaSalida,
        fecha: formData.fecha,
        fechaFormato: new Date(formData.fecha).toLocaleDateString('es-ES', {
          weekday: 'short',
          day: '2-digit',
          month: 'long',
        }),
        tipo: formData.tipo,
        patente: formData.patente,
        medio: formData.medio,
        section: 'Próximas visitas',
      };
      onAddVisit(newVisit);
      alert('Visita registrada correctamente');
    }
    setActiveTab('proximas');
  };

  const handleEdit = (visit) => {
    setEditingVisit(visit);
    setActiveTab('registrar');
  };

  const handleDelete = (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta visita?')) {
      onDeleteVisit(id);
      alert('Visita eliminada correctamente');
    }
  };

  return (
    <div className="visitas-page">
      {/* Tabs */}
      <div className="visitas-tabs">
        <button
          className={`tab-btn ${activeTab === 'registrar' ? 'active' : ''}`}
          onClick={() => {
            setActiveTab('registrar');
            setEditingVisit(null);
          }}
        >
          Registrar visita
        </button>
        <button
          className={`tab-btn ${activeTab === 'proximas' ? 'active' : ''}`}
          onClick={() => setActiveTab('proximas')}
        >
          Próximas visitas
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'registrar' ? (
        <div className="tab-content">
          <div className="form-container">
            {showAlertBox && (
              <div className="alert-box">
                <button
                  className="alert-close"
                  onClick={() => setShowAlertBox(false)}
                >
                  ✕
                </button>
                <p className="alert-text">¿Quieres usar un visitante guardado?</p>
                <select className="visitor-select">
                  <option>Seleccionar visitante</option>
                </select>
              </div>
            )}
            <VisitForm
              onSubmit={handleSubmit}
              editingVisit={editingVisit}
            />
          </div>
        </div>
      ) : (
        <div className="tab-content">
          <VisitsList
            visits={visits}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      )}
    </div>
  );
}

export default VisitasPage;
